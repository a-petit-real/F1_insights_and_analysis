"""Briefing complémentaire — essais libres/qualifs : temps au tour bruts par
NUMÉRO DE VOITURE, directement depuis practice_laps (tables practice_*, cf.
db/schema_fastf1.sql). Équivalent pour les séances d'essais de
scripts/race_briefing_laptimes_by_car.py (même principe, même limite
volontaire : ce script ne fait QUE dumper les tours bruts — c'est à la
rédaction de l'article de calculer ensuite les moyennes de relais en excluant
les tours d'entrée/sortie de stand et les tours > 103% de la médiane du
relais, cf. méthode déjà documentée dans le commentaire de sourcing de
web/app/courses/17/analyse-fr.js). Lecture seule.

Les numéros de voiture sont fournis en argument (lus par exemple dans le
classement par meilleur tour déjà retourné par scripts/practice_briefing.py).

Usage : python scripts/practice_briefing_laptimes_by_car.py --season 2026 \
    --round 18 --session "Practice 1" --cars 3:VER 16:LEC 1:NOR 63:RUS
"""
import argparse
import os
import sys
from collections import defaultdict

import psycopg

parser = argparse.ArgumentParser()
parser.add_argument("--season", type=int, required=True)
parser.add_argument("--round", type=int, required=True)
parser.add_argument("--session", default="Practice 1")
parser.add_argument("--cars", nargs="+", required=True, help="Paires numéro:label, ex. 3:VER 16:LEC")
parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
args = parser.parse_args()

if not args.database_url:
    print("DATABASE_URL manquant.", file=sys.stderr)
    sys.exit(1)

car_labels = {}
for pair in args.cars:
    num, label = pair.split(":", 1)
    car_labels[int(num)] = label

with psycopg.connect(args.database_url) as conn, conn.pipeline():
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT ps.session_key
            FROM practice_sessions ps
            JOIN races r ON r.race_id = ps.race_id
            WHERE r.season = %s AND r.round = %s AND ps.session_name = %s
            """,
            (args.season, args.round, args.session),
        )
        row = cur.fetchone()
        if row is None:
            print(f"Aucune séance '{args.session}' ingérée pour round {args.round} saison {args.season}.",
                  file=sys.stderr)
            sys.exit(1)
        session_key = row[0]

    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT car_number, lap_number, lap_time, sector1_time, sector2_time, sector3_time,
                   speed_i1, speed_i2, speed_st, is_pit_out_lap
            FROM practice_laps
            WHERE session_key = %s AND car_number = ANY(%s)
            ORDER BY car_number, lap_number
            """,
            (session_key, list(car_labels.keys())),
        )
        laps = cur.fetchall()

    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT car_number, stint_number, compound, lap_start, lap_end, tyre_age_at_start
            FROM practice_stints
            WHERE session_key = %s AND car_number = ANY(%s)
            ORDER BY car_number, stint_number
            """,
            (session_key, list(car_labels.keys())),
        )
        stints = cur.fetchall()

laps_by_car = defaultdict(list)
for car, lap, lt, s1, s2, s3, si1, si2, sst, pit_out in laps:
    laps_by_car[car].append((lap, lt, s1, s2, s3, si1, si2, sst, pit_out))

stints_by_car = defaultdict(list)
for car, stint_n, comp, lap_start, lap_end, age in stints:
    stints_by_car[car].append((stint_n, comp, lap_start, lap_end, age))

print(f"=== session_key={session_key} ===")
for car, label in car_labels.items():
    print(f"\n=== {label} (#{car}) ===")
    print("  -- Relais (practice_stints) --")
    for stint_n, comp, lap_start, lap_end, age in stints_by_car.get(car, []):
        print(f"    S{stint_n}: {comp or '?'} laps {lap_start}-{lap_end} (âge au départ {age})")
    print("  -- Tours (practice_laps) --")
    for lap, lt, s1, s2, s3, si1, si2, sst, pit_out in laps_by_car.get(car, []):
        tag = " [OUT]" if pit_out else ""
        print(f"    L{lap:>2}: lap={lt} s1={s1} s2={s2} s3={s3} speedI1={si1} speedI2={si2} speedST={sst}{tag}")
