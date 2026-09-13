"""Contrôle de plausibilité de la table overtakes : cherche des lignes
quasi-identiques (même paire de pilotes, horodatage très proche) qui
seraient perçues comme des redondances côté Raw data — reproduit
getOvertakes (web/lib/raceData.js) puis groupe par paire de pilotes pour
repérer les doublons.
"""
import argparse
import os
import sys

import psycopg

parser = argparse.ArgumentParser()
parser.add_argument("--season", type=int, required=True)
parser.add_argument("--round", type=int, required=True)
parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
args = parser.parse_args()

if not args.database_url:
    print("DATABASE_URL manquant.", file=sys.stderr)
    sys.exit(1)

with psycopg.connect(args.database_url) as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT race_id FROM races WHERE season=%s AND round=%s", (args.season, args.round))
        race_id = cur.fetchone()[0]

    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT o.overtake_time, o.position, d1.family_name, d2.family_name,
                   o.overtaking_car_number, o.overtaken_car_number
            FROM overtakes o
            JOIN results r1 ON r1.race_id = o.race_id AND r1.car_number = o.overtaking_car_number
            JOIN drivers d1 ON d1.driver_id = r1.driver_id
            JOIN results r2 ON r2.race_id = o.race_id AND r2.car_number = o.overtaken_car_number
            JOIN drivers d2 ON d2.driver_id = r2.driver_id
            WHERE o.race_id = %s
            ORDER BY o.overtake_time
            """,
            (race_id,),
        )
        rows = cur.fetchall()

print(f"race_id={race_id}, {len(rows)} ligne(s) au total.\n")

# Groupe par paire de pilotes consécutive à moins de 5s d'écart — un doublon
# probable (même dépassement rapporté plusieurs fois par OpenF1) plutôt
# qu'un vrai second dépassement (un retour de position prend plus de temps).
prev = None
dup_groups = 0
dup_rows = 0
for row in rows:
    t, pos, over, overed, c1, c2 = row
    is_dup = prev is not None and prev[2] == over and prev[3] == overed and abs((t - prev[0]).total_seconds()) < 5
    marker = "  <-- DOUBLON PROBABLE" if is_dup else ""
    if is_dup:
        dup_rows += 1
        if marker and not (prev and prev[-1]):
            dup_groups += 1
    print(f"{t}  pos={pos}  {over} <- dépasse <- {overed}  (#{c1} <- #{c2}){marker}")
    prev = (t, pos, over, overed, is_dup)

print(f"\n{dup_rows} ligne(s) signalée(s) comme doublon probable (même paire, <5s d'écart) sur {len(rows)} au total.")
