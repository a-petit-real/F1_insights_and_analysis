"""
Génère un briefing factuel complet pour une course, à partir de la base de
données de production, pour servir de matière première à la rédaction
d'un article The Pit Wall (résultats, grille, arrêts, pneus, météo,
messages de course). Lecture seule.

Usage : python scripts/race_briefing.py --season 2026 --round 1
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
        with conn.cursor() as cur:
            cur.execute(
                "SELECT race_id, race_name, circuit_id, race_date FROM races WHERE season=%s AND round=%s",
                (args.season, args.round),
            )
            race_id, race_name, circuit_id, race_date = cur.fetchone()
        print(f"=== {race_name} ({circuit_id}), {race_date} — round {args.round} ===\n")

        print("--- RÉSULTATS (grille -> arrivée) ---")
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT res.finish_position, res.grid, d.family_name, d.given_name, c.name,
                       res.car_number, res.points, res.status, res.time_text,
                       res.fastest_lap_rank, res.fastest_lap_time
                FROM results res
                JOIN drivers d ON d.driver_id = res.driver_id
                JOIN constructors c ON c.constructor_id = res.constructor_id
                WHERE res.race_id = %s
                ORDER BY COALESCE(res.finish_position, 99)
                """,
                (race_id,),
            )
            for row in cur.fetchall():
                pos, grid, fam, giv, team, num, pts, status, time_text, fl_rank, fl_time = row
                pos_s = pos if pos is not None else "NC"
                print(f"  P{pos_s:>3} (grille P{grid}) #{num} {giv} {fam} ({team}) — {pts}pts — {status} — {time_text or ''}"
                      + (f" — meilleur tour {fl_time} (#{fl_rank})" if fl_rank == 1 else ""))

        print("\n--- CLASSEMENT PILOTES APRÈS CETTE COURSE (top 8) ---")
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT ds.position, d.family_name, ds.points, ds.wins
                FROM driver_standings ds JOIN drivers d ON d.driver_id = ds.driver_id
                WHERE ds.season=%s AND ds.round=%s ORDER BY ds.position LIMIT 8
                """,
                (args.season, args.round),
            )
            for pos, fam, pts, wins in cur.fetchall():
                print(f"  P{pos} {fam} — {pts}pts ({wins} victoire(s))")

        print("\n--- ARRÊTS AUX STANDS (tour d'entrée par pilote) ---")
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT d.family_name, res.car_number, lt.lap_number, lt.pit_in_time IS NOT NULL AS pit_in
                FROM lap_times lt
                JOIN results res ON res.race_id = lt.race_id AND res.car_number = lt.car_number
                JOIN drivers d ON d.driver_id = res.driver_id
                WHERE lt.race_id = %s AND lt.pit_in_time IS NOT NULL
                ORDER BY d.family_name, lt.lap_number
                """,
                (race_id,),
            )
            from collections import defaultdict
            stops = defaultdict(list)
            for fam, num, lap, _ in cur.fetchall():
                stops[fam].append(lap)
            for fam, laps in sorted(stops.items()):
                print(f"  {fam}: tours {laps}")

        print("\n--- PNEUS (composé par relais, par pilote) ---")
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT d.family_name, ts.stint_number, ts.compound, ts.is_new, MIN(ts.lap_number), MAX(ts.total_laps)
                FROM tyre_stints ts
                JOIN results res ON res.race_id = ts.race_id AND res.car_number = ts.car_number
                JOIN drivers d ON d.driver_id = res.driver_id
                WHERE ts.race_id = %s AND ts.compound IS NOT NULL
                GROUP BY d.family_name, ts.stint_number, ts.compound, ts.is_new
                ORDER BY d.family_name, ts.stint_number
                """,
                (race_id,),
            )
            from collections import defaultdict
            tyres = defaultdict(list)
            for fam, stint, comp, is_new, lap_start, total_laps in cur.fetchall():
                tyres[fam].append(f"S{stint}:{comp}{'(neuf)' if is_new else ''}@L{lap_start}")
            for fam, stints in sorted(tyres.items()):
                print(f"  {fam}: {' | '.join(stints)}")

        print("\n--- MÉTÉO (résumé) ---")
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT MIN(air_temp), MAX(air_temp), MIN(track_temp), MAX(track_temp),
                       BOOL_OR(rainfall), MIN(humidity), MAX(humidity)
                FROM weather_readings WHERE race_id = %s
                """,
                (race_id,),
            )
            air_min, air_max, track_min, track_max, rain, hum_min, hum_max = cur.fetchone()
            print(f"  Air: {air_min}-{air_max}°C | Piste: {track_min}-{track_max}°C | Pluie: {rain} | Humidité: {hum_min}-{hum_max}%")

        print("\n--- MESSAGES DE COURSE (drapeaux, SC/VSC, pénalités, incidents) ---")
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT message_time, message FROM race_control_messages
                WHERE race_id = %s
                  AND (message ILIKE '%%SAFETY CAR%%' OR message ILIKE '%%RED FLAG%%'
                       OR message ILIKE '%%PENALTY%%' OR message ILIKE '%%INCIDENT%%'
                       OR message ILIKE '%%DELETED%%' OR message ILIKE '%%INVESTIGAT%%'
                       OR message ILIKE '%%DISQUALIF%%' OR message ILIKE '%%RETIR%%')
                ORDER BY message_time
                """,
                (race_id,),
            )
            for t, msg in cur.fetchall():
                print(f"  [{t}] {msg}")


if __name__ == "__main__":
    main()
