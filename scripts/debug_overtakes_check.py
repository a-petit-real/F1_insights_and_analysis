"""Contrôle de plausibilité de la table overtakes (Raw data) : reproduit
EXACTEMENT getOvertakes + dedupeOvertakeFlaps (web/lib/raceData.js) pour
montrer ce que le site affiche réellement après filtrage, puis signale
séparément d'autres motifs de quasi-doublon (même paire, même sens,
horodatages très proches) qui ne sont pas des flip-flops réciproques et
donc pas retirés par dedupeOvertakeFlaps.
"""
import argparse
import os
import sys

import psycopg

parser = argparse.ArgumentParser()
parser.add_argument("--season", type=int, required=True)
parser.add_argument("--round", type=int, required=True)
parser.add_argument("--threshold-ms", type=int, default=500, help="Seuil de dedupeOvertakeFlaps (doit matcher raceData.js)")
parser.add_argument("--same-direction-window-s", type=float, default=3.0,
                     help="Fenêtre pour signaler une même paire/même sens répétée (motif distinct du flip-flop réciproque)")
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

print(f"race_id={race_id}, {len(rows)} ligne(s) brutes au total.\n")


def dedupe_overtake_flaps(rows, threshold_ms):
    """Miroir exact de dedupeOvertakeFlaps (raceData.js) : retire les deux
    lignes de toute paire réciproque (mêmes pilotes, sens inversé) à moins
    de threshold_ms d'écart. rows : liste de tuples
    (overtake_time, position, overtaking, overtaken, c1, c2), déjà triée."""
    to_drop = set()
    for i in range(len(rows)):
        for j in range(i + 1, len(rows)):
            dt_ms = abs((rows[j][0] - rows[i][0]).total_seconds()) * 1000
            if dt_ms > threshold_ms:
                break  # déjà trié par overtake_time
            reciprocal = rows[i][2] == rows[j][3] and rows[i][3] == rows[j][2]
            if reciprocal:
                to_drop.add(i)
                to_drop.add(j)
    return [r for idx, r in enumerate(rows) if idx not in to_drop]


after = dedupe_overtake_flaps(rows, args.threshold_ms)
removed = len(rows) - len(after)
print(f"Après dedupeOvertakeFlaps (seuil {args.threshold_ms}ms, flip-flops réciproques) : "
      f"{len(after)} ligne(s) restantes, {removed} retirée(s).\n")

if removed:
    dropped_pairs = set()
    keep_idx = {id(r) for r in after}
    # Ré-identifie les lignes retirées pour les lister (comparaison par contenu, pas par id).
    after_set = set(after)
    for r in rows:
        if r not in after_set:
            dropped_pairs.add((r[2], r[3]))
    print("Paires retirées (flip-flop réciproque) :")
    for over, overed in sorted(dropped_pairs):
        print(f"  {over} <-> {overed}")
    print()

print(f"--- Ce que Raw data affiche maintenant ({len(after)} lignes) — recherche d'autres motifs de doublon ---\n")

# Un motif DIFFÉRENT du flip-flop réciproque : la même paire, dans le MÊME
# sens, répétée à quelques secondes d'écart (pas assez pour être deux
# dépassements distincts plausibles). dedupeOvertakeFlaps ne traite pas ce
# cas (il ne retire que les paires de sens opposé) — à vérifier séparément.
same_direction_flags = 0
prev_by_pair = {}
for row in after:
    t, pos, over, overed, c1, c2 = row
    key = (over, overed)
    prev_t = prev_by_pair.get(key)
    flag = prev_t is not None and (t - prev_t).total_seconds() < args.same_direction_window_s
    marker = f"  <-- MÊME SENS RÉPÉTÉ ({(t - prev_t).total_seconds():.3f}s après la précédente)" if flag else ""
    if flag:
        same_direction_flags += 1
    print(f"{t}  pos={pos}  {over} <- dépasse <- {overed}  (#{c1} <- #{c2}){marker}")
    prev_by_pair[key] = t

print(f"\n{same_direction_flags} ligne(s) signalée(s) comme même paire/même sens répété "
      f"à moins de {args.same_direction_window_s}s d'écart, sur {len(after)} lignes affichées.")
