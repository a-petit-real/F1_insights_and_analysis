"""Cherche la VRAIE cause d'un doublon persistant dans le tableau "Qui
dépasse qui" (Raw data) après le fix d'affichage des millisecondes
(RaceTabs.jsx) : dedupeOvertakeFlaps (raceData.js) ne retire que les paires
RÉCIPROQUES (A dépasse B puis B dépasse A) à moins de 500ms d'écart — il ne
retire PAS deux lignes identiques (même sens, même paire, même horodatage)
qui proviendraient soit d'une double-insertion dans la table `overtakes`,
soit d'une multiplication de lignes côté JOIN si `results` contient plus
d'une ligne pour le même (race_id, car_number).

Trois vérifications indépendantes, pour tous les rounds ingérés de la
saison :
  1. Doublons EXACTS dans la table `overtakes` elle-même (sans JOIN) —
     même race_id/overtake_time/overtaking_car_number/overtaken_car_number.
  2. Doublons dans `results` (même race_id + car_number en double) — la
     cause qui multiplierait chaque dépassement via le JOIN de getOvertakes.
  3. Doublons APRÈS le JOIN complet (exactement la requête de getOvertakes)
     mais AVANT dedupeOvertakeFlaps, sur (overtake_time, overtaking_driver,
     overtaken_driver, position) — ce que l'utilisateur verrait réellement
     dans le tableau si les deux vérifications précédentes ne suffisent pas
     à expliquer le symptôme.
"""
import argparse
import os
import sys
from collections import Counter

import psycopg

parser = argparse.ArgumentParser()
parser.add_argument("--season", type=int, default=2026)
parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
args = parser.parse_args()

if not args.database_url:
    print("DATABASE_URL manquant.", file=sys.stderr)
    sys.exit(1)

with psycopg.connect(args.database_url) as conn:
    with conn.cursor() as cur:
        cur.execute(
            "SELECT race_id, round, race_name FROM races WHERE season=%s ORDER BY round",
            (args.season,),
        )
        races = cur.fetchall()

    print(f"=== 1. Doublons EXACTS dans overtakes (sans JOIN), saison {args.season} ===\n")
    any_raw_dupe = False
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT race_id, overtake_time, overtaking_car_number, overtaken_car_number, COUNT(*) AS n
            FROM overtakes
            WHERE race_id IN (SELECT race_id FROM races WHERE season=%s)
            GROUP BY race_id, overtake_time, overtaking_car_number, overtaken_car_number
            HAVING COUNT(*) > 1
            ORDER BY race_id, overtake_time
            """,
            (args.season,),
        )
        rows = cur.fetchall()
        race_names = {r[0]: (r[1], r[2]) for r in races}
        for race_id, t, c1, c2, n in rows:
            any_raw_dupe = True
            rnd, name = race_names.get(race_id, ("?", "?"))
            print(f"  round {rnd} ({name}) : {t}  voiture #{c1} -> #{c2}  x{n}")
    if not any_raw_dupe:
        print("  Aucun doublon exact trouvé dans la table overtakes elle-même.")

    print(f"\n=== 2. Doublons dans results (race_id + car_number), saison {args.season} ===\n")
    any_results_dupe = False
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT race_id, car_number, COUNT(*) AS n
            FROM results
            WHERE race_id IN (SELECT race_id FROM races WHERE season=%s)
            GROUP BY race_id, car_number
            HAVING COUNT(*) > 1
            ORDER BY race_id, car_number
            """,
            (args.season,),
        )
        rows = cur.fetchall()
        for race_id, car_number, n in rows:
            any_results_dupe = True
            rnd, name = race_names.get(race_id, ("?", "?"))
            print(f"  round {rnd} ({name}) : voiture #{car_number}  x{n} lignes dans results")
    if not any_results_dupe:
        print("  Aucun doublon (race_id, car_number) trouvé dans results.")

    print(f"\n=== 3. Doublons APRÈS le JOIN complet de getOvertakes (avant dedupeOvertakeFlaps) ===\n")
    any_join_dupe = False
    for race_id, rnd, name in races:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT o.overtake_time, o.position,
                       d1.family_name AS overtaking_driver, d2.family_name AS overtaken_driver
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
        if not rows:
            continue
        counts = Counter(rows)
        dupes = {k: v for k, v in counts.items() if v > 1}
        if dupes:
            any_join_dupe = True
            print(f"  round {rnd} ({name}) : {len(rows)} lignes après JOIN, {len(dupes)} valeur(s) dupliquée(s) :")
            for (t, pos, over, overed), n in sorted(dupes.items()):
                print(f"    {t}  pos={pos}  {over} <- dépasse <- {overed}  x{n}")
    if not any_join_dupe:
        print("  Aucun doublon après le JOIN complet, sur tous les rounds ingérés.")

print("\n=== Conclusion ===")
if not any_raw_dupe and not any_results_dupe and not any_join_dupe:
    print("Aucune des 3 causes recherchées n'explique un doublon — le symptôme rapporté")
    print("nécessite d'identifier précisément le round/les lignes vues par l'utilisateur.")
