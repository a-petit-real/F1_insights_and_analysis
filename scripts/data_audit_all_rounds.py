"""Audit transversal de la donnée disponible pour chaque round déjà disputé
de la saison — pas de modification, lecture seule.

Objectif : poser un diagnostic chiffré (plutôt qu'une impression) sur le
désordre signalé par l'utilisateur dans les données course par course,
avant de construire quoi que ce soit dessus (télémétrie visuelle, race
replay, section data transversale). Pour chaque round :
  - `results` (Jolpica) : rempli ou vide (connu vide pour certains rounds,
    cf. contournements via race_briefing_laptimes_by_car.py).
  - `lap_times`/`tyre_stints` (OpenF1, course) : nombre de lignes.
  - `lap_telemetry` : nombre de tours avec télémétrie position/vitesse
    (OpenF1, quasi toujours dispo), et nombre de tours avec les canaux
    FastF1 (throttle_pct non NULL) — ces derniers dépendent du runner
    auto-hébergé de l'utilisateur, jamais garantis.
  - `practice_sessions`/`practice_laps` : séances d'essais couvertes.

Résumé en fin de sortie : pour chaque brique (télémétrie visuelle, race
replay, section transversale), la liste des rounds réellement exploitables
aujourd'hui, sans supposition.
"""
import argparse
import os
import sys

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
        rounds = cur.fetchall()

    rows = []
    for race_id, round_no, race_name in rounds:
        with conn.cursor() as cur:
            cur.execute("SELECT count(*) FROM results WHERE race_id=%s", (race_id,))
            n_results = cur.fetchone()[0]

            cur.execute("SELECT count(*) FROM lap_times WHERE race_id=%s", (race_id,))
            n_laps = cur.fetchone()[0]

            cur.execute("SELECT count(*) FROM tyre_stints WHERE race_id=%s", (race_id,))
            n_stints = cur.fetchone()[0]

            cur.execute("SELECT count(*) FROM lap_telemetry WHERE race_id=%s", (race_id,))
            n_telemetry = cur.fetchone()[0]

            cur.execute(
                "SELECT count(*) FROM lap_telemetry WHERE race_id=%s AND throttle_pct IS NOT NULL",
                (race_id,),
            )
            n_fastf1 = cur.fetchone()[0]

            cur.execute(
                """SELECT count(*) FROM practice_sessions ps
                   JOIN practice_laps pl ON pl.session_key = ps.session_key
                   WHERE ps.race_id=%s""",
                (race_id,),
            )
            n_practice_laps = cur.fetchone()[0]

            cur.execute(
                """SELECT count(*) FROM practice_sessions ps
                   JOIN practice_telemetry pt ON pt.session_key = ps.session_key
                   WHERE ps.race_id=%s""",
                (race_id,),
            )
            n_practice_telemetry = cur.fetchone()[0]

        rows.append(
            dict(
                round=round_no,
                race_name=race_name,
                results=n_results,
                lap_times=n_laps,
                tyre_stints=n_stints,
                telemetry_laps=n_telemetry,
                telemetry_fastf1_laps=n_fastf1,
                practice_laps=n_practice_laps,
                practice_telemetry_laps=n_practice_telemetry,
            )
        )

print(f"=== Audit transversal — saison {args.season}, {len(rows)} round(s) ===\n")
header = f"{'R':>3} {'GP':<28} {'results':>8} {'laps':>6} {'stints':>7} {'telem(OpenF1)':>14} {'telem(FastF1)':>14} {'EL laps':>8} {'EL telem':>9}"
print(header)
print("-" * len(header))
for r in rows:
    print(
        f"{r['round']:>3} {r['race_name'][:28]:<28} {r['results']:>8} {r['lap_times']:>6} "
        f"{r['tyre_stints']:>7} {r['telemetry_laps']:>14} {r['telemetry_fastf1_laps']:>14} "
        f"{r['practice_laps']:>8} {r['practice_telemetry_laps']:>9}"
    )

print("\n=== Résumé par brique ===\n")

rounds_results_ok = [r["round"] for r in rows if r["results"] > 0]
rounds_results_empty = [r["round"] for r in rows if r["results"] == 0]
print(f"results (Jolpica) peuplé : rounds {rounds_results_ok}")
print(f"results (Jolpica) VIDE   : rounds {rounds_results_empty}  <- contournement par car_number requis pour ces rounds\n")

rounds_telemetry_openf1 = [r["round"] for r in rows if r["telemetry_laps"] > 0]
rounds_telemetry_fastf1 = [r["round"] for r in rows if r["telemetry_fastf1_laps"] > 0]
print(f"Télémétrie visuelle course (vitesse/position OpenF1) exploitable  : rounds {rounds_telemetry_openf1}")
print(f"Télémétrie visuelle course (+ gaz/frein/rapport/régime/DRS FastF1) : rounds {rounds_telemetry_fastf1}\n")

rounds_practice_telemetry = [r["round"] for r in rows if r["practice_telemetry_laps"] > 0]
print(f"Race replay / comparatif EL-Quali (practice_telemetry peuplée) : rounds {rounds_practice_telemetry}\n")

rounds_full_pipeline = [r["round"] for r in rows if r["lap_times"] > 0 and r["tyre_stints"] > 0]
print(f"Section transversale (lap_times + tyre_stints dispo, indépendant de results) : rounds {rounds_full_pipeline}")
