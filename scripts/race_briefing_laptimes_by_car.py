"""Briefing complémentaire : temps au tour et pneus par NUMÉRO DE VOITURE
directement (sans jointure sur results), pour les rounds où lap_times/
tyre_stints sont déjà ingérés côté OpenF1 mais où results (pipeline
Jolpica, résultats officiels) ne l'est pas encore. race_briefing.py et
race_briefing_laptimes.py dépendent tous deux d'une jointure sur results
pour résoudre le nom du pilote ; sans cette jointure ils ne retournent
rien même quand lap_times contient des données exploitables. Lecture
seule. Les numéros de voiture doivent être fournis en argument (lus par
exemple dans les race_control_messages déjà disponibles pour le round).

Usage : python scripts/race_briefing_laptimes_by_car.py --season 2026 --round 17 \
    --cars 3:VER 16:LEC 12:ANT 1:NOR 81:PIA 44:HAM 63:RUS 18:STR 6:HAD
"""
import argparse
import os
import sys

import psycopg

parser = argparse.ArgumentParser()
parser.add_argument("--season", type=int, required=True)
parser.add_argument("--round", type=int, required=True)
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
        cur.execute("SELECT race_id FROM races WHERE season=%s AND round=%s", (args.season, args.round))
        race_id = cur.fetchone()[0]

    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT car_number, lap_number, lap_time, sector1_time, sector2_time, sector3_time,
                   speed_i1, speed_i2, speed_fl, speed_st,
                   pit_in_time IS NOT NULL, pit_out_time IS NOT NULL
            FROM lap_times
            WHERE race_id = %s AND car_number = ANY(%s)
            ORDER BY car_number, lap_number
            """,
            (race_id, list(car_labels.keys())),
        )
        laps = cur.fetchall()

    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT car_number, stint_number, compound, is_new, MIN(lap_number), MAX(lap_number), MAX(total_laps)
            FROM tyre_stints
            WHERE race_id = %s AND car_number = ANY(%s)
            GROUP BY car_number, stint_number, compound, is_new
            ORDER BY car_number, stint_number
            """,
            (race_id, list(car_labels.keys())),
        )
        stints = cur.fetchall()

from collections import defaultdict
laps_by_car = defaultdict(list)
for car, lap, lt, s1, s2, s3, si1, si2, sfl, sst, pit_in, pit_out in laps:
    laps_by_car[car].append((lap, lt, s1, s2, s3, si1, si2, sfl, sst, pit_in, pit_out))

stints_by_car = defaultdict(list)
for car, stint_n, comp, is_new, lap_start, lap_end, total_laps in stints:
    stints_by_car[car].append((stint_n, comp, is_new, lap_start, lap_end, total_laps))

for car, label in car_labels.items():
    print(f"\n=== {label} (#{car}) ===")
    print("  -- Relais (tyre_stints) --")
    for stint_n, comp, is_new, lap_start, lap_end, total_laps in stints_by_car.get(car, []):
        print(f"    S{stint_n}: {comp or '?'}{' (neuf)' if is_new else ''} laps {lap_start}-{lap_end} (âge cumulé max {total_laps})")
    print("  -- Tours (lap_times) --")
    for lap, lt, s1, s2, s3, si1, si2, sfl, sst, pit_in, pit_out in laps_by_car.get(car, []):
        tag = " [IN]" if pit_in else (" [OUT]" if pit_out else "")
        print(f"    L{lap:>2}: lap={lt} s1={s1} s2={s2} s3={s3} speedST={sst} speedFL={sfl}{tag}")
