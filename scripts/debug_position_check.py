"""Validation de la logique de position par tour (RawDataTab, web) contre
les vraies données en base — reproduit exactement le calcul fait côté
client (classement par session_time cumulé à un lap donné) en Python, puis
compare la position calculée au dernier tour à results.finish_position.

Sert de garde-fou avant/après toute modification de cette logique : le
sandbox interactif n'a pas d'accès réseau à la vraie base (cf.
docs/OPERATIONS.md), ce script tourne donc en GitHub Actions à la place.
"""
import argparse
import os
import sys
from collections import defaultdict

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
        row = cur.fetchone()
        if not row:
            print(f"Aucune course season={args.season} round={args.round}.", file=sys.stderr)
            sys.exit(1)
        race_id = row[0]

    # Même requête que getLapTimesByDriver (web/lib/raceData.js).
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT d.family_name, lt.lap_number,
                   EXTRACT(EPOCH FROM lt.session_time) AS session_seconds
            FROM lap_times lt
            JOIN results res ON res.race_id = lt.race_id AND res.car_number = lt.car_number
            JOIN drivers d ON d.driver_id = res.driver_id
            WHERE lt.race_id = %s AND lt.lap_time IS NOT NULL
            ORDER BY d.family_name, lt.lap_number
            """,
            (race_id,),
        )
        rows = cur.fetchall()

    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT d.family_name, res.finish_position, res.status
            FROM results res JOIN drivers d ON d.driver_id = res.driver_id
            WHERE res.race_id = %s
            ORDER BY COALESCE(res.finish_position, 99)
            """,
            (race_id,),
        )
        official = cur.fetchall()

total_laps = len(rows)
null_session = sum(1 for _, _, s in rows if s is None)
print(f"Course season={args.season} round={args.round} (race_id={race_id})")
print(f"{total_laps} lignes lap_times (lap_time non NULL), dont {null_session} sans session_time.")

# Reproduit exactement la logique de positionData dans RawDataTab (RaceTabs.jsx) :
# regrouper par lap_number, trier par sessionSeconds croissant, classer.
by_lap = defaultdict(list)  # lap_number -> [(sessionSeconds, family_name)]
for fam, lap, secs in rows:
    if secs is None:
        continue
    by_lap[lap].append((float(secs), fam))

if not by_lap:
    print("Aucun lap exploitable (session_time toujours NULL) — logique non vérifiable pour cette course.")
    sys.exit(0)

last_lap = max(by_lap)
ranking = sorted(by_lap[last_lap], key=lambda t: t[0])
print(f"\nClassement calculé au dernier tour observé (L{last_lap}) :")
for pos, (secs, fam) in enumerate(ranking, start=1):
    print(f"  P{pos:>2}  {fam:<15} session_time={secs:.3f}s")

print("\nClassement officiel (results.finish_position) :")
for fam, pos, status in official:
    print(f"  P{pos if pos is not None else '—':>2}  {fam:<15} status={status}")

calc_order = [fam for _, fam in ranking]
official_classified = [fam for fam, pos, status in official if pos is not None]
match = calc_order[: len(official_classified)] == official_classified
print(f"\nOrdre calculé (dernier tour) == ordre officiel (classés) : {match}")
if not match:
    print("ÉCART — attendu dans une certaine mesure (tours restants différents en cas de tour(s) de retard,")
    print("drapeau à damier atteint à des lap_number différents) ; à examiner si l'écart est important.")
