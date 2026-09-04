"""
Ingère les données de séances d'essais libres (EL1/EL2/EL3) depuis l'API
OpenF1 — complète ingest_openf1.py, qui ne couvre que la session de course.

Schéma cible : db/schema_fastf1.sql, tables practice_* (ajoutées
spécifiquement pour les essais libres — une course a une seule session de
course mais jusqu'à trois séances d'essais, donc les tables course
existantes, indexées par race_id seul, ne conviennent pas). Voir le
commentaire en tête de ces tables dans le schéma pour le détail du choix.

Point d'attention spécifique aux essais libres, absent du pipeline course :
la séance rookie obligatoire du règlement peut confier une voiture à un
pilote de réserve (ex. Iwasa à la place de Verstappen) qui n'apparaît pas
forcément dans la grille de course ni dans notre table `drivers`. On ne
réutilise donc PAS results/drivers pour résoudre car_number -> pilote :
practice_drivers est rempli directement depuis l'endpoint `drivers`
d'OpenF1, filtré par session_key, qui reflète qui a réellement roulé dans
cette séance précise.

Usage :
    python scripts/ingest_openf1_practice.py --season 2026 --round 13 --session "Practice 1"
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


def api_get(path, **params):
    # Même logique de retry/429/404 qu'ingest_openf1.py — cf. sa docstring
    # pour le détail (404 = pas encore de données, pas une erreur).
    max_attempts = 8
    for attempt in range(max_attempts):
        try:
            resp = requests.get(f"{BASE}/{path}", params=params, headers=HEADERS, timeout=30)
            if resp.status_code == 404:
                return []
            if resp.status_code == 429 and attempt < max_attempts - 1:
                wait = float(resp.headers.get("Retry-After", min(2 ** attempt, 60)))
                print(f"  [retry] {path} (429 rate limit) — nouvelle tentative dans {wait:.0f}s", file=sys.stderr)
                time.sleep(wait)
                continue
            resp.raise_for_status()
            return resp.json()
        except requests.RequestException as exc:
            if attempt == max_attempts - 1:
                raise
            wait = min(2 ** attempt, 60)
            print(f"  [retry] {path} ({exc}) — nouvelle tentative dans {wait}s", file=sys.stderr)
            time.sleep(wait)


def iso(value):
    if not value:
        return None
    return datetime.datetime.fromisoformat(value.replace("Z", "+00:00"))


def load_session(cur, race_id, session):
    session_key = session["session_key"]
    cur.execute(
        """
        INSERT INTO practice_sessions (session_key, race_id, session_name, date_start, date_end)
        VALUES (%(session_key)s, %(race_id)s, %(session_name)s, %(date_start)s, %(date_end)s)
        ON CONFLICT (session_key) DO UPDATE SET
            session_name = EXCLUDED.session_name, date_start = EXCLUDED.date_start, date_end = EXCLUDED.date_end
        """,
        {
            "session_key": session_key, "race_id": race_id, "session_name": session["session_name"],
            "date_start": iso(session.get("date_start")), "date_end": iso(session.get("date_end")),
        },
    )
    return session_key


def load_drivers(cur, session_key, drivers):
    cur.execute("DELETE FROM practice_drivers WHERE session_key = %s", (session_key,))
    n = 0
    for row in drivers:
        car_number = row.get("driver_number")
        if car_number is None:
            continue
        cur.execute(
            """
            INSERT INTO practice_drivers (session_key, car_number, full_name, name_acronym, team_name)
            VALUES (%(session_key)s, %(car_number)s, %(full_name)s, %(name_acronym)s, %(team_name)s)
            ON CONFLICT (session_key, car_number) DO UPDATE SET
                full_name = EXCLUDED.full_name, name_acronym = EXCLUDED.name_acronym, team_name = EXCLUDED.team_name
            """,
            {
                "session_key": session_key, "car_number": car_number,
                "full_name": row.get("full_name"), "name_acronym": row.get("name_acronym"),
                "team_name": row.get("team_name"),
            },
        )
        n += 1
    return n


def load_laps(cur, session_key, laps):
    cur.execute("DELETE FROM practice_laps WHERE session_key = %s", (session_key,))
    n = 0
    for row in laps:
        car_number, lap_number = row.get("driver_number"), row.get("lap_number")
        if car_number is None or lap_number is None:
            continue
        cur.execute(
            """
            INSERT INTO practice_laps (session_key, car_number, lap_number, lap_start_time, lap_time,
                                        sector1_time, sector2_time, sector3_time,
                                        speed_i1, speed_i2, speed_st, is_pit_out_lap)
            VALUES (%(session_key)s, %(car_number)s, %(lap_number)s, %(lap_start_time)s, %(lap_time)s,
                    %(sector1_time)s, %(sector2_time)s, %(sector3_time)s,
                    %(speed_i1)s, %(speed_i2)s, %(speed_st)s, %(is_pit_out_lap)s)
            """,
            {
                "session_key": session_key, "car_number": car_number, "lap_number": lap_number,
                "lap_start_time": iso(row.get("date_start")), "lap_time": row.get("lap_duration"),
                "sector1_time": row.get("duration_sector_1"), "sector2_time": row.get("duration_sector_2"),
                "sector3_time": row.get("duration_sector_3"),
                "speed_i1": row.get("i1_speed"), "speed_i2": row.get("i2_speed"), "speed_st": row.get("st_speed"),
                "is_pit_out_lap": bool(row.get("is_pit_out_lap")),
            },
        )
        n += 1
    return n


def load_stints(cur, session_key, stints):
    cur.execute("DELETE FROM practice_stints WHERE session_key = %s", (session_key,))
    n = 0
    for row in stints:
        car_number, stint_number = row.get("driver_number"), row.get("stint_number")
        if car_number is None or stint_number is None:
            continue
        cur.execute(
            """
            INSERT INTO practice_stints (session_key, car_number, stint_number, compound,
                                          lap_start, lap_end, tyre_age_at_start)
            VALUES (%(session_key)s, %(car_number)s, %(stint_number)s, %(compound)s,
                    %(lap_start)s, %(lap_end)s, %(tyre_age_at_start)s)
            """,
            {
                "session_key": session_key, "car_number": car_number, "stint_number": stint_number,
                "compound": row.get("compound"), "lap_start": row.get("lap_start"),
                "lap_end": row.get("lap_end"), "tyre_age_at_start": row.get("tyre_age_at_start"),
            },
        )
        n += 1
    return n


def load_weather(cur, session_key, weather, session_start):
    n = 0
    for row in weather:
        date = iso(row.get("date"))
        if date is None:
            continue
        cur.execute(
            """
            INSERT INTO practice_weather (session_key, session_time, air_temp, track_temp,
                                           humidity, rainfall, wind_speed)
            VALUES (%(session_key)s, %(session_time)s, %(air_temp)s, %(track_temp)s,
                    %(humidity)s, %(rainfall)s, %(wind_speed)s)
            ON CONFLICT (session_key, session_time) DO UPDATE SET
                air_temp = EXCLUDED.air_temp, track_temp = EXCLUDED.track_temp,
                humidity = EXCLUDED.humidity, rainfall = EXCLUDED.rainfall, wind_speed = EXCLUDED.wind_speed
            """,
            {
                "session_key": session_key, "session_time": date - session_start,
                "air_temp": row.get("air_temperature"), "track_temp": row.get("track_temperature"),
                "humidity": row.get("humidity"),
                "rainfall": bool(row.get("rainfall")) if row.get("rainfall") is not None else None,
                "wind_speed": row.get("wind_speed"),
            },
        )
        n += 1
    return n


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--season", type=int, required=True)
    parser.add_argument("--round", type=int, required=True)
    parser.add_argument("--session", default="Practice 1",
                         help="Nom de séance OpenF1 : 'Practice 1', 'Practice 2' ou 'Practice 3'.")
    parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
    args = parser.parse_args()

    if not args.database_url:
        print("DATABASE_URL manquant.", file=sys.stderr)
        sys.exit(1)

    with psycopg.connect(args.database_url) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT race_id, race_date FROM races WHERE season = %s AND round = %s",
                        (args.season, args.round))
            row = cur.fetchone()
        if row is None:
            print(f"Round {args.round} (saison {args.season}) introuvable dans races.", file=sys.stderr)
            sys.exit(1)
        race_id, race_date = row

        candidates = api_get("sessions", year=args.season, session_name=args.session)
        # Filtre par date proche de la course (même week-end) plutôt que par
        # circuit_short_name, pour rester robuste aux libellés OpenF1.
        session = next(
            (s for s in candidates if abs((iso(s["date_start"]).date() - race_date).days) <= 3),
            None,
        )
        if session is None:
            print(f"Aucune session '{args.session}' OpenF1 trouvée à proximité du {race_date} "
                  f"(round {args.round}). La séance n'a peut-être pas encore eu lieu.", file=sys.stderr)
            sys.exit(1)

        session_start = iso(session["date_start"])
        print(f"=== Round {args.round} — {session.get('circuit_short_name')} — {args.session} "
              f"(session_key={session['session_key']}) ===")

        drivers = api_get("drivers", session_key=session["session_key"])
        time.sleep(0.3)
        laps = api_get("laps", session_key=session["session_key"])
        time.sleep(0.3)
        stints = api_get("stints", session_key=session["session_key"])
        time.sleep(0.3)
        weather = api_get("weather", session_key=session["session_key"])

        with conn.pipeline(), conn.cursor() as cur:
            session_key = load_session(cur, race_id, session)
            n = load_drivers(cur, session_key, drivers)
            print(f"  practice_drivers : {n} lignes")
            n = load_laps(cur, session_key, laps)
            print(f"  practice_laps : {n} lignes")
            n = load_stints(cur, session_key, stints)
            print(f"  practice_stints : {n} lignes")
            n = load_weather(cur, session_key, weather, session_start)
            print(f"  practice_weather : {n} lignes")
        conn.commit()

    print("\nINGESTION TERMINÉE.")


if __name__ == "__main__":
    main()
