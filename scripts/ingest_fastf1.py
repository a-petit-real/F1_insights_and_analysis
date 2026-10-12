"""Ingère les canaux de télémétrie que l'offre gratuite d'OpenF1 n'expose
PAS : accélérateur (%), frein (bool), rapport engagé, régime moteur, statut
DRS — depuis FastF1 (qui lit livetiming.formula1.com).

Pourquoi un script séparé plutôt qu'une extension d'ingest_openf1_telemetry.py :
livetiming.formula1.com bloque les plages IP datacenter (confirmé pour les
runners GitHub-hébergés ET pour ce sandbox) — c'est précisément la raison
pour laquelle le pipeline position/vitesse de ce projet est passé à OpenF1
il y a plusieurs mois (cf. commentaire en tête de db/schema_fastf1.sql).
Ce script n'est donc PAS destiné à tourner sur un runner GitHub standard :
il doit tourner sur un runner auto-hébergé par l'utilisateur (sa propre
box/4G), déclaré dans le workflow associé (.github/workflows/ingest-fastf1.yml)
avec `runs-on: [self-hosted, fastf1]`. Si ce runner n'est pas en ligne, le
job reste simplement en attente côté GitHub — ce n'est jamais bloquant pour
le reste du pipeline (ingestion OpenF1/Jolpica), qui continue de tourner
dans le cloud comme avant.

Ne retouche JAMAIS les colonnes déjà alimentées par OpenF1 (distance_m,
speed_kmh, x_m, y_m, t_s) : ce script fait un UPDATE ciblé sur les
nouvelles colonnes FastF1 uniquement (throttle_pct, brake, n_gear, rpm,
drs, t_s_fastf1 — grille temporelle propre à FastF1, à ne jamais mélanger
par index avec t_s qui vient d'OpenF1, échantillonnage différent). Un tour
pour lequel la ligne OpenF1 n'existe pas encore (lap_telemetry n'a pas
encore été alimenté pour ce round) est ignoré et compté à part plutôt que
de tenter un INSERT : distance_m/speed_kmh sont NOT NULL côté schéma,
cette ingestion ne doit donc jamais tourner avant ingest_openf1_telemetry.py
pour le même round.

Usage (depuis le runner auto-hébergé, après installation de
requirements-fastf1.txt) :
    python scripts/ingest_fastf1.py --season 2026 --round 17
    python scripts/ingest_fastf1.py --season 2026 --round 17 --session Q --cars 1,4,16
"""
import argparse
import os
import sys

import fastf1
import psycopg


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--season", type=int, required=True)
    parser.add_argument("--round", type=int, required=True)
    parser.add_argument("--session", default="R",
                         help="Code de séance FastF1 : R (course, défaut), Q, S, SQ, FP1, FP2, FP3.")
    parser.add_argument("--cars", default=None,
                         help="Numéros de voiture à ingérer, séparés par des virgules. Par défaut, tout le "
                              "plateau — réservé à la course ; restreindre ici pour un duel qualif ciblé.")
    parser.add_argument("--cache-dir", default=os.path.expanduser("~/.cache/fastf1"))
    parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
    args = parser.parse_args()

    if not args.database_url:
        print("DATABASE_URL manquant (variable d'environnement ou --database-url).", file=sys.stderr)
        sys.exit(1)

    os.makedirs(args.cache_dir, exist_ok=True)
    fastf1.Cache.enable_cache(args.cache_dir)

    with psycopg.connect(args.database_url) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT race_id FROM races WHERE season=%s AND round=%s", (args.season, args.round))
            row = cur.fetchone()
        if row is None:
            print(f"Round {args.round} introuvable dans races (saison {args.season}).", file=sys.stderr)
            sys.exit(1)
        race_id = row[0]

        print(f"Chargement FastF1 : saison {args.season}, round {args.round}, séance {args.session}...")
        session = fastf1.get_session(args.season, args.round, args.session)
        session.load(laps=True, telemetry=True, weather=False, messages=False)

        car_numbers = session.drivers if args.cars is None else [
            c.strip() for c in args.cars.split(",") if c.strip()
        ]

        if args.session != "R":
            print(f"Séance '{args.session}' ignorée pour l'écriture en base : seule la course (R) écrit "
                  f"dans lap_telemetry pour l'instant (practice_telemetry n'a pas encore ces colonnes).",
                  file=sys.stderr)
            sys.exit(1)

        updated = 0
        skipped_no_openf1_row = 0
        with conn.cursor() as cur:
            for car_number in car_numbers:
                laps = session.laps.pick_drivers(car_number)
                if laps.empty:
                    continue
                print(f"  voiture #{car_number} — {len(laps)} tour(s)...")
                for _, lap in laps.iterlaps():
                    lap_number = int(lap["LapNumber"])
                    try:
                        car_data = lap.get_car_data()
                    except Exception as exc:  # télémétrie manquante pour ce tour précis (hors-piste, etc.)
                        print(f"    tour {lap_number} : télémétrie indisponible ({exc})", file=sys.stderr)
                        continue
                    if car_data.empty:
                        continue
                    lap_start = lap["LapStartTime"]
                    t_s_fastf1 = (car_data["SessionTime"] - lap_start).dt.total_seconds().tolist()
                    throttle_pct = car_data["Throttle"].astype(float).tolist()
                    brake = car_data["Brake"].astype(bool).tolist()
                    n_gear = car_data["nGear"].astype(int).tolist()
                    rpm = car_data["RPM"].astype(float).tolist()
                    drs = car_data["DRS"].astype(int).tolist()

                    cur.execute(
                        """
                        UPDATE lap_telemetry
                        SET throttle_pct = %(throttle_pct)s, brake = %(brake)s, n_gear = %(n_gear)s,
                            rpm = %(rpm)s, drs = %(drs)s, t_s_fastf1 = %(t_s_fastf1)s
                        WHERE race_id = %(race_id)s AND car_number = %(car_number)s AND lap_number = %(lap_number)s
                        """,
                        {
                            "race_id": race_id, "car_number": int(car_number), "lap_number": lap_number,
                            "throttle_pct": throttle_pct, "brake": brake, "n_gear": n_gear,
                            "rpm": rpm, "drs": drs, "t_s_fastf1": t_s_fastf1,
                        },
                    )
                    if cur.rowcount == 0:
                        skipped_no_openf1_row += 1
                    else:
                        updated += 1
        conn.commit()
        print(f"\n{updated} tour(s) mis à jour avec les canaux FastF1 "
              f"({skipped_no_openf1_row} ignoré(s), pas de ligne OpenF1 correspondante — "
              f"lancer ingest_openf1_telemetry.py pour ce round avant celui-ci).")


if __name__ == "__main__":
    main()
