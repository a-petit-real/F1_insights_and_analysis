"""
Ingère les données détaillées F1 (temps au tour avec secteurs, pneus,
météo, messages de course) depuis l'API OpenF1 — remplace intégralement
l'ancien pipeline FastF1 (scripts/ingest_fastf1_detailed.py).

Contrairement à FastF1/livetiming.formula1.com, qui bloque les IP de
datacenter (voir The Garage, carte c7, et scripts/mobile_fastf1_fetch.py)
et nécessitait donc une étape manuelle depuis un appareil personnel,
l'API OpenF1 (api.openf1.org) est accessible sans restriction depuis un
runner GitHub Actions — confirmé en conditions réelles avant d'écrire ce
script. Ce script fait donc de vraies requêtes réseau, contrairement à
ingest_fastf1_detailed.py qui ne faisait que décoder des fichiers déjà
récupérés manuellement.

Le schéma cible (db/schema_fastf1.sql) est réutilisé tel quel : il
identifie déjà les pilotes par car_number plutôt que par une résolution
driver_id à l'ingestion, ce qui correspond exactement à la façon dont
OpenF1 identifie les pilotes (driver_number — lié au pilote, pas à la
voiture, comme sur la grille officielle).

Couverture, et son origine OpenF1 :
  - lap_times          <- laps (temps de secteur, vitesses aux pièges) ;
                           pit_in_time déduit de l'endpoint pit (lap_number
                           du relais), pit_out_time de is_pit_out_lap.
  - tyre_stints         <- stints
  - weather_readings    <- weather
  - race_control_messages <- race_control
  - track_status_events : PAS d'équivalent direct dans OpenF1 (pas de flux
    "TrackStatus" séparé comme chez FastF1). Dérivé du champ `flag` des
    messages race_control quand il indique un changement d'état piste
    (drapeau, safety car, VSC) — approximation raisonnable, mais une
    source dérivée et non primaire ; documenté ici pour rester honnête
    sur son origine plutôt que de la faire passer pour équivalente.

Usage :
    python scripts/ingest_openf1.py --season 2026
    python scripts/ingest_openf1.py --season 2026 --rounds 13 14
"""
import argparse
import datetime
import os
import sys
import time

import psycopg
import requests

BASE = "https://api.openf1.org/v1"
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; ThePitWall/1.0)"}

# Valeurs de `flag` (race_control) qui indiquent un changement d'état
# piste — utilisées pour dériver track_status_events, faute d'équivalent
# direct dans OpenF1 (cf. docstring du module).
TRACK_STATUS_FLAGS = {
    "GREEN", "YELLOW", "DOUBLE YELLOW", "RED", "CHEQUERED",
    "SAFETY CAR", "VIRTUAL SAFETY CAR", "VIRTUAL SAFETY CAR ENDING",
}


def api_get(path, **params):
    for attempt in range(4):
        try:
            resp = requests.get(f"{BASE}/{path}", params=params, headers=HEADERS, timeout=30)
            resp.raise_for_status()
            return resp.json()
        except requests.RequestException as exc:
            if attempt == 3:
                raise
            wait = 2 ** attempt
            print(f"  [retry] {path} ({exc}) — nouvelle tentative dans {wait}s", file=sys.stderr)
            time.sleep(wait)


def iso(value):
    if not value:
        return None
    return datetime.datetime.fromisoformat(value.replace("Z", "+00:00"))


def interval(seconds):
    if seconds is None:
        return None
    return datetime.timedelta(seconds=float(seconds))


# ---------------------------------------------------------------------
# Résolution course -> session OpenF1 (par date, la clé la moins ambiguë)
# ---------------------------------------------------------------------

def load_season_sessions(season):
    """{date ISO (YYYY-MM-DD) -> session dict} pour les courses de la saison."""
    sessions = api_get("sessions", year=season, session_name="Race")
    by_date = {}
    for s in sessions:
        if s.get("is_cancelled"):
            continue
        by_date[s["date_start"][:10]] = s
    return by_date


def get_race(cur, season, round_number):
    cur.execute("SELECT race_id, race_date FROM races WHERE season = %s AND round = %s", (season, round_number))
    row = cur.fetchone()
    return row if row else (None, None)


# ---------------------------------------------------------------------
# LOAD — mêmes tables/colonnes que ingest_fastf1_detailed.py, pour ne
# rien changer côté web/lib/raceData.js.
# ---------------------------------------------------------------------

def load_laps(cur, race_id, laps, pit_laps_by_driver, session_start):
    n = 0
    pit_count = {}
    for row in sorted(laps, key=lambda r: (r.get("driver_number") or 0, r.get("lap_number") or 0)):
        car_number = row.get("driver_number")
        lap_number = row.get("lap_number")
        if car_number is None or lap_number is None:
            continue

        lap_duration = row.get("lap_duration")
        s1, s2, s3 = row.get("duration_sector_1"), row.get("duration_sector_2"), row.get("duration_sector_3")
        date_start = iso(row.get("date_start"))
        lap_start_t = (date_start - session_start) if date_start else None

        sector1_st = (lap_start_t + interval(s1)) if (lap_start_t is not None and s1 is not None) else None
        sector2_st = (sector1_st + interval(s2)) if (sector1_st is not None and s2 is not None) else None
        sector3_st = (sector2_st + interval(s3)) if (sector2_st is not None and s3 is not None) else None
        session_t = (lap_start_t + interval(lap_duration)) if (lap_start_t is not None and lap_duration is not None) else None

        is_pit_in = lap_number in pit_laps_by_driver.get(car_number, set())
        if is_pit_in:
            pit_count[car_number] = pit_count.get(car_number, 0) + 1

        cur.execute(
            """
            INSERT INTO lap_times (race_id, car_number, lap_number, session_time, lap_time,
                                    sector1_time, sector2_time, sector3_time,
                                    sector1_session_time, sector2_session_time, sector3_session_time,
                                    speed_i1, speed_i2, speed_fl, speed_st,
                                    pit_in_time, pit_out_time, number_of_pit_stops)
            VALUES (%(race_id)s, %(car_number)s, %(lap_number)s, %(session_time)s, %(lap_time)s,
                    %(sector1_time)s, %(sector2_time)s, %(sector3_time)s,
                    %(sector1_session_time)s, %(sector2_session_time)s, %(sector3_session_time)s,
                    %(speed_i1)s, %(speed_i2)s, %(speed_fl)s, %(speed_st)s,
                    %(pit_in_time)s, %(pit_out_time)s, %(number_of_pit_stops)s)
            ON CONFLICT (race_id, car_number, lap_number) DO UPDATE SET
                session_time = EXCLUDED.session_time, lap_time = EXCLUDED.lap_time,
                sector1_time = EXCLUDED.sector1_time, sector2_time = EXCLUDED.sector2_time,
                sector3_time = EXCLUDED.sector3_time,
                sector1_session_time = EXCLUDED.sector1_session_time,
                sector2_session_time = EXCLUDED.sector2_session_time,
                sector3_session_time = EXCLUDED.sector3_session_time,
                speed_i1 = EXCLUDED.speed_i1, speed_i2 = EXCLUDED.speed_i2,
                speed_fl = EXCLUDED.speed_fl, speed_st = EXCLUDED.speed_st,
                pit_in_time = EXCLUDED.pit_in_time, pit_out_time = EXCLUDED.pit_out_time,
                number_of_pit_stops = EXCLUDED.number_of_pit_stops
            """,
            {
                "race_id": race_id, "car_number": car_number, "lap_number": lap_number,
                "session_time": session_t, "lap_time": interval(lap_duration),
                "sector1_time": interval(s1), "sector2_time": interval(s2), "sector3_time": interval(s3),
                "sector1_session_time": sector1_st, "sector2_session_time": sector2_st,
                "sector3_session_time": sector3_st,
                "speed_i1": row.get("i1_speed"), "speed_i2": row.get("i2_speed"),
                "speed_fl": None,  # pas d'équivalent OpenF1 (vitesse ligne d'arrivée)
                "speed_st": row.get("st_speed"),
                "pit_in_time": interval(lap_duration) if is_pit_in else None,
                "pit_out_time": interval(lap_duration) if row.get("is_pit_out_lap") else None,
                "number_of_pit_stops": pit_count.get(car_number, 0),
            },
        )
        n += 1
    return n


def load_tyres(cur, race_id, stints):
    # Une ligne par relais (pas de mises à jour répétées comme dans le
    # flux FastF1) : repartir de zéro reste la façon la plus simple de
    # rester idempotent.
    cur.execute("DELETE FROM tyre_stints WHERE race_id = %s", (race_id,))
    n = 0
    for row in stints:
        car_number = row.get("driver_number")
        stint_number = row.get("stint_number")
        if car_number is None or stint_number is None:
            continue
        lap_start, lap_end = row.get("lap_start"), row.get("lap_end")
        total_laps = (lap_end - lap_start + 1) if (lap_start is not None and lap_end is not None) else None
        cur.execute(
            """
            INSERT INTO tyre_stints (race_id, car_number, stint_number, session_time,
                                      lap_number, compound, is_new, total_laps)
            VALUES (%(race_id)s, %(car_number)s, %(stint_number)s, NULL,
                    %(lap_number)s, %(compound)s, %(is_new)s, %(total_laps)s)
            """,
            {
                "race_id": race_id, "car_number": car_number, "stint_number": stint_number,
                "lap_number": lap_start, "compound": row.get("compound"),
                "is_new": (row.get("tyre_age_at_start") == 0) if row.get("tyre_age_at_start") is not None else None,
                "total_laps": total_laps,
            },
        )
        n += 1
    return n


def load_weather(cur, race_id, weather, session_start):
    n = 0
    for row in weather:
        date = iso(row.get("date"))
        if date is None:
            continue
        cur.execute(
            """
            INSERT INTO weather_readings (race_id, session_time, air_temp, humidity, pressure,
                                           rainfall, track_temp, wind_direction, wind_speed)
            VALUES (%(race_id)s, %(session_time)s, %(air_temp)s, %(humidity)s, %(pressure)s,
                    %(rainfall)s, %(track_temp)s, %(wind_direction)s, %(wind_speed)s)
            ON CONFLICT (race_id, session_time) DO UPDATE SET
                air_temp = EXCLUDED.air_temp, humidity = EXCLUDED.humidity, pressure = EXCLUDED.pressure,
                rainfall = EXCLUDED.rainfall, track_temp = EXCLUDED.track_temp,
                wind_direction = EXCLUDED.wind_direction, wind_speed = EXCLUDED.wind_speed
            """,
            {
                "race_id": race_id, "session_time": date - session_start,
                "air_temp": row.get("air_temperature"), "humidity": row.get("humidity"),
                "pressure": row.get("pressure"),
                "rainfall": bool(row.get("rainfall")) if row.get("rainfall") is not None else None,
                "track_temp": row.get("track_temperature"),
                "wind_direction": row.get("wind_direction"), "wind_speed": row.get("wind_speed"),
            },
        )
        n += 1
    return n


def load_race_control(cur, race_id, race_control):
    cur.execute("DELETE FROM race_control_messages WHERE race_id = %s", (race_id,))
    n = 0
    for row in race_control:
        message_time = iso(row.get("date"))
        message = row.get("message")
        if message_time is None or message is None:
            continue
        cur.execute(
            """
            INSERT INTO race_control_messages (race_id, message_time, category, message, status,
                                                flag, scope, sector, car_number, lap_number)
            VALUES (%(race_id)s, %(message_time)s, %(category)s, %(message)s, NULL,
                    %(flag)s, %(scope)s, %(sector)s, %(car_number)s, %(lap_number)s)
            """,
            {
                "race_id": race_id, "message_time": message_time, "category": row.get("category"),
                "message": message, "flag": row.get("flag"), "scope": row.get("scope"),
                "sector": row.get("sector"), "car_number": row.get("driver_number"),
                "lap_number": row.get("lap_number"),
            },
        )
        n += 1
    return n


def load_track_status(cur, race_id, race_control, session_start):
    # Dérivé de race_control (cf. docstring) — pas de flux TrackStatus
    # séparé dans OpenF1.
    cur.execute("DELETE FROM track_status_events WHERE race_id = %s", (race_id,))
    n = 0
    for row in race_control:
        flag = row.get("flag")
        if flag not in TRACK_STATUS_FLAGS:
            continue
        date = iso(row.get("date"))
        if date is None:
            continue
        cur.execute(
            """
            INSERT INTO track_status_events (race_id, session_time, status_code, message)
            VALUES (%(race_id)s, %(session_time)s, %(status_code)s, %(message)s)
            """,
            {
                "race_id": race_id, "session_time": date - session_start,
                "status_code": flag, "message": row.get("message"),
            },
        )
        n += 1
    return n


# ---------------------------------------------------------------------
# ORCHESTRATION
# ---------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--season", type=int, required=True)
    parser.add_argument("--rounds", type=int, nargs="*",
                         help="Rounds à ingérer (défaut : toutes les courses déjà disputées de la saison, "
                              "présentes dans `races`).")
    parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
    args = parser.parse_args()

    if not args.database_url:
        print("DATABASE_URL manquant (variable d'environnement ou --database-url).", file=sys.stderr)
        sys.exit(1)

    sessions_by_date = load_season_sessions(args.season)
    print(f"{len(sessions_by_date)} session(s) course trouvée(s) sur OpenF1 pour {args.season}.")

    with psycopg.connect(args.database_url) as conn:
        if args.rounds:
            rounds = args.rounds
        else:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT round FROM races WHERE season = %s AND race_date <= CURRENT_DATE ORDER BY round",
                    (args.season,),
                )
                rounds = [r[0] for r in cur.fetchall()]

        for round_number in rounds:
            with conn.cursor() as cur:
                race_id, race_date = get_race(cur, args.season, round_number)
            if race_id is None:
                print(f"  [round {round_number}] introuvable dans races (saison {args.season}) — ignoré. "
                      f"Lancez d'abord scripts/ingest_jolpica.py.")
                continue

            session = sessions_by_date.get(race_date.isoformat())
            if session is None:
                print(f"  [round {round_number}] aucune session OpenF1 pour la date {race_date} — ignoré.")
                continue

            session_key = session["session_key"]
            session_start = iso(session["date_start"])
            print(f"\n=== Round {round_number} — {session.get('circuit_short_name')} "
                  f"(session_key={session_key}) ===")

            laps = api_get("laps", session_key=session_key)
            stints = api_get("stints", session_key=session_key)
            weather = api_get("weather", session_key=session_key)
            race_control = api_get("race_control", session_key=session_key)
            pit = api_get("pit", session_key=session_key)

            pit_laps_by_driver = {}
            for row in pit:
                driver, lap = row.get("driver_number"), row.get("lap_number")
                if driver is not None and lap is not None:
                    pit_laps_by_driver.setdefault(driver, set()).add(lap)

            # Mode pipeline psycopg3 : cf. ingest_fastf1_detailed.py — les
            # insertions unitaires vers Neon en aller-retour un par un sont
            # beaucoup trop lentes sur plusieurs milliers de lignes.
            with conn.pipeline(), conn.cursor() as cur:
                n = load_laps(cur, race_id, laps, pit_laps_by_driver, session_start)
                print(f"  lap_times : {n} lignes")
                n = load_tyres(cur, race_id, stints)
                print(f"  tyre_stints : {n} lignes")
                n = load_weather(cur, race_id, weather, session_start)
                print(f"  weather_readings : {n} lignes")
                n = load_race_control(cur, race_id, race_control)
                print(f"  race_control_messages : {n} lignes")
                n = load_track_status(cur, race_id, race_control, session_start)
                print(f"  track_status_events : {n} lignes (dérivé de race_control, cf. docstring)")
            conn.commit()

            time.sleep(0.5)  # correct vis-à-vis du rate limit OpenF1

    print("\nINGESTION TERMINÉE.")


if __name__ == "__main__":
    main()
