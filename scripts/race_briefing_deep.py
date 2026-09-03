"""Briefing complémentaire : météo en série temporelle complète (pas
seulement le résumé min/max de race_briefing.py) et temps de secteur par
tour et par pilote — deux angles qu'on n'exploitait pas encore alors
qu'ils sont disponibles depuis la bascule vers OpenF1. Lecture seule.

Usage : python scripts/race_briefing_deep.py --season 2026 --round 1
"""
import argparse
import os
import sys

import psycopg

parser = argparse.ArgumentParser()
parser.add_argument("--season", type=int, required=True)
parser.add_argument("--round", type=int, required=True)
parser.add_argument("--drivers", nargs="*", help="Limite les temps de secteur à ces pilotes (optionnel, sinon tous)")
parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
args = parser.parse_args()

if not args.database_url:
    print("DATABASE_URL manquant.", file=sys.stderr)
    sys.exit(1)

with psycopg.connect(args.database_url) as conn, conn.pipeline():
    with conn.cursor() as cur:
        cur.execute("SELECT race_id FROM races WHERE season=%s AND round=%s", (args.season, args.round))
        race_id = cur.fetchone()[0]

    print("--- MÉTÉO (série temporelle complète) ---")
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT session_time, air_temp, track_temp, humidity, rainfall, wind_speed
            FROM weather_readings WHERE race_id = %s ORDER BY session_time
            """,
            (race_id,),
        )
        rows = cur.fetchall()
        for t, air, track, hum, rain, wind in rows:
            print(f"  [{t}] air={air}°C piste={track}°C humidité={hum}% pluie={rain} vent={wind}km/h")
        print(f"  ({len(rows)} relevés)")

    print("\n--- TEMPS DE SECTEUR (par tour, par pilote) ---")
    filt = ""
    params = [race_id]
    if args.drivers:
        filt = "AND d.family_name = ANY(%s)"
        params.append(args.drivers)
    with conn.cursor() as cur:
        cur.execute(
            f"""
            SELECT d.family_name, lt.lap_number, lt.sector1_time, lt.sector2_time, lt.sector3_time,
                   lt.pit_in_time IS NOT NULL, lt.pit_out_time IS NOT NULL
            FROM lap_times lt
            JOIN results res ON res.race_id = lt.race_id AND res.car_number = lt.car_number
            JOIN drivers d ON d.driver_id = res.driver_id
            WHERE lt.race_id = %s {filt}
            ORDER BY d.family_name, lt.lap_number
            """,
            params,
        )
        from collections import defaultdict
        by_driver = defaultdict(list)
        for fam, lap, s1, s2, s3, pit_in, pit_out in cur.fetchall():
            by_driver[fam].append((lap, s1, s2, s3, pit_in, pit_out))
    for fam, laps in sorted(by_driver.items()):
        print(f"\n=== {fam} ===")
        for lap, s1, s2, s3, pit_in, pit_out in laps:
            tag = " [IN]" if pit_in else (" [OUT]" if pit_out else "")
            print(f"  L{lap:>2}: S1={s1} S2={s2} S3={s3}{tag}")
