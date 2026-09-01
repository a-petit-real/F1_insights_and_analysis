"""
Décode et charge les données FastF1 détaillées (temps au tour, pneus,
météo, messages de course, statut piste) dans la base de données de
production.

Contrairement à scripts/ingest_jolpica.py, ce script ne fait AUCUNE
requête réseau vers livetiming.formula1.com (bloqué depuis le cloud —
voir The Garage, carte c7). Il prend en entrée les fichiers bruts déjà
récupérés manuellement (scripts/mobile_fastf1_fetch.py, exécuté depuis un
appareil personnel), et réutilise le moteur de parsing interne de la
librairie FastF1 (fastf1._api) pour les décoder — la même logique que la
librairie utiliserait normalement après un téléchargement réseau, mais
appliquée ici à des fichiers déjà en local.

Usage :
    python scripts/ingest_fastf1_detailed.py --raw-dir chemin/vers/fastf1_raw --season 2026

Le dossier --raw-dir doit contenir un sous-dossier par course, nommé
"R<round à 2 chiffres>_<Nom_De_La_Course>" (c'est exactement la structure
produite par mobile_fastf1_fetch.py une fois le zip extrait), chacun
contenant TimingData.jsonStream, TimingAppData.jsonStream,
WeatherData.jsonStream, RaceControlMessages.jsonStream et
TrackStatus.jsonStream.
"""
import argparse
import datetime
import json
import os
import re
import sys

import pandas as pd
import psycopg

import fastf1._api as api
from fastf1 import Cache

# Cf. scripts/decode_raw_export.py (prototype développé pour valider cette
# approche) : le cache disque de FastF1 se base sur `path` comme clé, or on
# appelle ces fonctions avec des `response` déjà en mémoire (pas de requête
# réseau) — le cache n'a aucune utilité ici et provoquerait un bug (un
# `path` réutilisé d'une course à l'autre renverrait les résultats mis en
# cache de la première course). On le désactive totalement.
Cache.set_disabled()

ROUND_DIR_RE = re.compile(r"^R(\d+)_")


# ---------------------------------------------------------------------
# DÉCODAGE — réutilise fastf1._api, aucune requête réseau
# ---------------------------------------------------------------------

def parse_jsonstream(path, is_z=False):
    raw = open(path, "rb").read().decode("utf-8-sig")
    records = raw.split("\r\n")[:-1]
    tl = 12
    ret = []
    for e in records:
        try:
            ret.append([e[:tl], api.parse(e[tl:], zipped=is_z)])
        except json.JSONDecodeError:
            continue
    return ret


def decode_round(round_dir):
    """Retourne (laps_data, tyres, weather, race_control, track_status),
    chacun un DataFrame pandas."""
    td_response = parse_jsonstream(os.path.join(round_dir, "TimingData.jsonStream"))
    laps_data, _, _ = api._extended_timing_data("", response=td_response)

    tad_response = parse_jsonstream(os.path.join(round_dir, "TimingAppData.jsonStream"))
    tyres = api.timing_app_data("", response=tad_response)

    wx_response = parse_jsonstream(os.path.join(round_dir, "WeatherData.jsonStream"))
    weather = pd.DataFrame(api.weather_data("", response=wx_response))

    rcm_response = parse_jsonstream(os.path.join(round_dir, "RaceControlMessages.jsonStream"))
    race_control = pd.DataFrame(api.race_control_messages("", response=rcm_response))

    ts_response = parse_jsonstream(os.path.join(round_dir, "TrackStatus.jsonStream"))
    track_status = pd.DataFrame(api.track_status_data("", response=ts_response))

    return laps_data, tyres, weather, race_control, track_status


# ---------------------------------------------------------------------
# TRANSFORM — DataFrame pandas -> valeurs prêtes pour psycopg
# ---------------------------------------------------------------------

def _td(value):
    """pandas.Timedelta (ou NaT) -> datetime.timedelta (ou None)."""
    if pd.isna(value):
        return None
    return value.to_pytimedelta() if hasattr(value, "to_pytimedelta") else value


def _num(value):
    if pd.isna(value):
        return None
    return float(value)


def _int(value):
    if pd.isna(value):
        return None
    return int(value)


def _bool(value):
    if pd.isna(value):
        return None
    return bool(value)


def _text(value):
    if pd.isna(value):
        return None
    return str(value)


# ---------------------------------------------------------------------
# LOAD — upserts idempotents dans la base de production
# ---------------------------------------------------------------------

def load_laps(cur, race_id, laps_data):
    n = 0
    for _, row in laps_data.iterrows():
        car_number = _int(row.get("Driver"))
        lap_number = _int(row.get("NumberOfLaps"))
        if car_number is None or lap_number is None:
            continue
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
                "session_time": _td(row.get("Time")), "lap_time": _td(row.get("LapTime")),
                "sector1_time": _td(row.get("Sector1Time")), "sector2_time": _td(row.get("Sector2Time")),
                "sector3_time": _td(row.get("Sector3Time")),
                "sector1_session_time": _td(row.get("Sector1SessionTime")),
                "sector2_session_time": _td(row.get("Sector2SessionTime")),
                "sector3_session_time": _td(row.get("Sector3SessionTime")),
                "speed_i1": _num(row.get("SpeedI1")), "speed_i2": _num(row.get("SpeedI2")),
                "speed_fl": _num(row.get("SpeedFL")), "speed_st": _num(row.get("SpeedST")),
                "pit_in_time": _td(row.get("PitInTime")), "pit_out_time": _td(row.get("PitOutTime")),
                "number_of_pit_stops": _int(row.get("NumberOfPitStops")),
            },
        )
        n += 1
    return n


def load_tyres(cur, race_id, tyres):
    # Pas de clé unique naturelle (une même monte peut être mise à jour
    # plusieurs fois) : on repart de zéro à chaque ingestion de cette
    # course pour rester idempotent.
    cur.execute("DELETE FROM tyre_stints WHERE race_id = %s", (race_id,))
    n = 0
    for _, row in tyres.iterrows():
        car_number = _int(row.get("Driver"))
        stint_number = _int(row.get("Stint"))
        if car_number is None or stint_number is None:
            continue
        cur.execute(
            """
            INSERT INTO tyre_stints (race_id, car_number, stint_number, session_time,
                                      lap_number, compound, is_new, total_laps)
            VALUES (%(race_id)s, %(car_number)s, %(stint_number)s, %(session_time)s,
                    %(lap_number)s, %(compound)s, %(is_new)s, %(total_laps)s)
            """,
            {
                "race_id": race_id, "car_number": car_number, "stint_number": stint_number,
                "session_time": _td(row.get("Time")), "lap_number": _num(row.get("LapNumber")),
                "compound": _text(row.get("Compound")), "is_new": _bool(row.get("New")),
                "total_laps": _num(row.get("TotalLaps")),
            },
        )
        n += 1
    return n


def load_weather(cur, race_id, weather):
    n = 0
    for _, row in weather.iterrows():
        session_time = _td(row.get("Time"))
        if session_time is None:
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
                "race_id": race_id, "session_time": session_time,
                "air_temp": _num(row.get("AirTemp")), "humidity": _num(row.get("Humidity")),
                "pressure": _num(row.get("Pressure")), "rainfall": _bool(row.get("Rainfall")),
                "track_temp": _num(row.get("TrackTemp")), "wind_direction": _int(row.get("WindDirection")),
                "wind_speed": _num(row.get("WindSpeed")),
            },
        )
        n += 1
    return n


def load_race_control(cur, race_id, race_control):
    # Pas de clé naturelle non plus (deux messages peuvent partager la
    # même seconde) : on repart de zéro pour rester idempotent.
    cur.execute("DELETE FROM race_control_messages WHERE race_id = %s", (race_id,))
    n = 0
    for _, row in race_control.iterrows():
        message_time = row.get("Time")
        message = _text(row.get("Message"))
        if pd.isna(message_time) or message is None:
            continue
        cur.execute(
            """
            INSERT INTO race_control_messages (race_id, message_time, category, message, status,
                                                flag, scope, sector, car_number, lap_number)
            VALUES (%(race_id)s, %(message_time)s, %(category)s, %(message)s, %(status)s,
                    %(flag)s, %(scope)s, %(sector)s, %(car_number)s, %(lap_number)s)
            """,
            {
                "race_id": race_id, "message_time": message_time, "category": _text(row.get("Category")),
                "message": message, "status": _text(row.get("Status")), "flag": _text(row.get("Flag")),
                "scope": _text(row.get("Scope")), "sector": _num(row.get("Sector")),
                "car_number": _int(row.get("RacingNumber")), "lap_number": _int(row.get("Lap")),
            },
        )
        n += 1
    return n


def load_track_status(cur, race_id, track_status):
    cur.execute("DELETE FROM track_status_events WHERE race_id = %s", (race_id,))
    n = 0
    for _, row in track_status.iterrows():
        session_time = _td(row.get("Time"))
        if session_time is None:
            continue
        cur.execute(
            """
            INSERT INTO track_status_events (race_id, session_time, status_code, message)
            VALUES (%(race_id)s, %(session_time)s, %(status_code)s, %(message)s)
            """,
            {
                "race_id": race_id, "session_time": session_time,
                "status_code": _text(row.get("Status")), "message": _text(row.get("Message")),
            },
        )
        n += 1
    return n


# ---------------------------------------------------------------------
# ORCHESTRATION
# ---------------------------------------------------------------------

def get_race_id(cur, season, round_number):
    cur.execute("SELECT race_id FROM races WHERE season = %s AND round = %s", (season, round_number))
    row = cur.fetchone()
    return row[0] if row else None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--raw-dir", required=True, help="Dossier contenant les sous-dossiers R01_..., R02_...")
    parser.add_argument("--season", type=int, required=True)
    parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
    args = parser.parse_args()

    if not args.database_url:
        print("DATABASE_URL manquant (variable d'environnement ou --database-url).", file=sys.stderr)
        sys.exit(1)

    round_dirs = sorted(
        d for d in os.listdir(args.raw_dir)
        if os.path.isdir(os.path.join(args.raw_dir, d)) and ROUND_DIR_RE.match(d)
    )
    print(f"{len(round_dirs)} course(s) trouvée(s) dans {args.raw_dir}.")

    with psycopg.connect(args.database_url) as conn:
        for d in round_dirs:
            round_number = int(ROUND_DIR_RE.match(d).group(1))
            with conn.cursor() as cur:
                race_id = get_race_id(cur, args.season, round_number)
            if race_id is None:
                print(f"  [{d}] round {round_number} introuvable dans races (saison {args.season}) — ignoré. "
                      f"Lancez d'abord scripts/ingest_jolpica.py pour cette saison.")
                continue

            print(f"\n=== {d} (race_id={race_id}) ===")
            laps_data, tyres, weather, race_control, track_status = decode_round(
                os.path.join(args.raw_dir, d)
            )

            with conn.cursor() as cur:
                n = load_laps(cur, race_id, laps_data)
                print(f"  lap_times : {n} lignes")
                n = load_tyres(cur, race_id, tyres)
                print(f"  tyre_stints : {n} lignes")
                n = load_weather(cur, race_id, weather)
                print(f"  weather_readings : {n} lignes")
                n = load_race_control(cur, race_id, race_control)
                print(f"  race_control_messages : {n} lignes")
                n = load_track_status(cur, race_id, track_status)
                print(f"  track_status_events : {n} lignes")
            conn.commit()

    print("\nINGESTION TERMINÉE.")


if __name__ == "__main__":
    main()
