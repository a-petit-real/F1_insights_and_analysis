"""
Vérifie/affiche le classement pilotes et constructeurs après un round donné
(tables driver_standings / constructor_standings, alimentées par
ingest_jolpica.py). Lecture seule — sert à valider que ces tables sont bien
peuplées avant de les exposer côté web (feature anti-spoiler / classement).

Usage : python scripts/standings_briefing.py --season 2026 --round 12
"""
import argparse
import os
import sys

import psycopg


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--season", type=int, required=True)
    parser.add_argument("--round", type=int, required=True)
    parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
    args = parser.parse_args()

    if not args.database_url:
        print("DATABASE_URL manquant.", file=sys.stderr)
        sys.exit(1)

    with psycopg.connect(args.database_url) as conn, conn.pipeline():
        print(f"=== Classement pilotes après round {args.round} (saison {args.season}) ===")
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT ds.position, d.given_name, d.family_name, ds.points, ds.wins
                FROM driver_standings ds JOIN drivers d ON d.driver_id = ds.driver_id
                WHERE ds.season = %s AND ds.round = %s ORDER BY ds.position NULLS LAST
                """,
                (args.season, args.round),
            )
            rows = cur.fetchall()
            if not rows:
                print("  (AUCUNE LIGNE — table vide pour ce round)")
            for pos, given, family, points, wins in rows:
                print(f"  {pos if pos is not None else '—':>2}  {given} {family:<20} {points} pts  ({wins} victoires)")

        print(f"\n=== Classement constructeurs après round {args.round} ===")
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT cs.position, c.name, cs.points, cs.wins
                FROM constructor_standings cs JOIN constructors c ON c.constructor_id = cs.constructor_id
                WHERE cs.season = %s AND cs.round = %s ORDER BY cs.position NULLS LAST
                """,
                (args.season, args.round),
            )
            rows = cur.fetchall()
            if not rows:
                print("  (AUCUNE LIGNE — table vide pour ce round)")
            for pos, name, points, wins in rows:
                print(f"  {pos if pos is not None else '—':>2}  {name:<20} {points} pts  ({wins} victoires)")


if __name__ == "__main__":
    main()
