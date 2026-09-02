"""Briefing complémentaire : temps au tour détaillés par pilote pour une
course, afin de calculer de vraies comparaisons de rythme (ex. "sept
dixièmes au tour plus rapide sur un relais comparable")."""
import argparse
import os
import sys

import psycopg

parser = argparse.ArgumentParser()
parser.add_argument("--season", type=int, required=True)
parser.add_argument("--round", type=int, required=True)
parser.add_argument("--drivers", nargs="*", help="Noms de famille à filtrer (optionnel)")
parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
args = parser.parse_args()

if not args.database_url:
    print("DATABASE_URL manquant.", file=sys.stderr)
    sys.exit(1)

with psycopg.connect(args.database_url) as conn, conn.pipeline():
    with conn.cursor() as cur:
        cur.execute("SELECT race_id FROM races WHERE season=%s AND round=%s", (args.season, args.round))
        race_id = cur.fetchone()[0]

    filt = ""
    params = [race_id]
    if args.drivers:
        filt = "AND d.family_name = ANY(%s)"
        params.append(args.drivers)

    with conn.cursor() as cur:
        cur.execute(
            f"""
            SELECT d.family_name, lt.lap_number, lt.lap_time, lt.pit_in_time IS NOT NULL,
                   lt.pit_out_time IS NOT NULL
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
        for fam, lap, laptime, pit_in, pit_out in cur.fetchall():
            by_driver[fam].append((lap, laptime, pit_in, pit_out))

    for fam, laps in sorted(by_driver.items()):
        print(f"\n=== {fam} ===")
        for lap, laptime, pit_in, pit_out in laps:
            tag = " [IN]" if pit_in else (" [OUT]" if pit_out else "")
            print(f"  L{lap:>2}: {laptime}{tag}")
