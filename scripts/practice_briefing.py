"""
Génère un briefing factuel d'une séance d'essais libres (classement par
meilleur tour, secteurs, relais pneus, météo) depuis les tables practice_*
(db/schema_fastf1.sql), pour servir de matière première à un article. Lecture
seule.

Usage : python scripts/practice_briefing.py --season 2026 --round 13 --session "Practice 1"
"""
import argparse
import os
import sys

import psycopg


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--season", type=int, required=True)
    parser.add_argument("--round", type=int, required=True)
    parser.add_argument("--session", default="Practice 1")
    parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
    args = parser.parse_args()

    if not args.database_url:
        print("DATABASE_URL manquant.", file=sys.stderr)
        sys.exit(1)

    with psycopg.connect(args.database_url) as conn, conn.pipeline():
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT ps.session_key, ps.session_name, ps.date_start, ps.date_end,
                       r.race_name, r.circuit_id
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
        session_key, session_name, date_start, date_end, race_name, circuit_id = row
        print(f"=== {race_name} ({circuit_id}) — {session_name} — round {args.round} ===")
        print(f"    {date_start} -> {date_end} (session_key={session_key})\n")

        print("--- CLASSEMENT PAR MEILLEUR TOUR ---")
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT pd.car_number, COALESCE(pd.full_name, 'inconnu'), pd.team_name,
                       MIN(pl.lap_time) AS best_lap,
                       COUNT(*) FILTER (WHERE pl.lap_time IS NOT NULL) AS laps_chronometres,
                       COUNT(*) AS laps_total
                FROM practice_laps pl
                LEFT JOIN practice_drivers pd ON pd.session_key = pl.session_key AND pd.car_number = pl.car_number
                WHERE pl.session_key = %s
                GROUP BY pd.car_number, pd.full_name, pd.team_name
                ORDER BY best_lap NULLS LAST
                """,
                (session_key,),
            )
            for i, (car, name, team, best, chrono, total) in enumerate(cur.fetchall(), start=1):
                print(f"  {i:2d}. #{car:<3} {name:<22} {team or '':<16} "
                      f"meilleur tour {best if best is not None else '—'}  "
                      f"({chrono}/{total} tours chronométrés)")

        print("\n--- MEILLEUR SECTEUR PAR PILOTE (informatif, pas forcément sur le même tour) ---")
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT pd.car_number, COALESCE(pd.full_name, 'inconnu'),
                       MIN(pl.sector1_time), MIN(pl.sector2_time), MIN(pl.sector3_time)
                FROM practice_laps pl
                LEFT JOIN practice_drivers pd ON pd.session_key = pl.session_key AND pd.car_number = pl.car_number
                WHERE pl.session_key = %s
                GROUP BY pd.car_number, pd.full_name
                ORDER BY pd.car_number
                """,
                (session_key,),
            )
            for car, name, s1, s2, s3 in cur.fetchall():
                print(f"  #{car:<3} {name:<22} S1={s1} S2={s2} S3={s3}")

        print("\n--- RELAIS PNEUS (composé, tours, âge au départ du relais) ---")
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT pd.car_number, COALESCE(pd.full_name, 'inconnu'), ps2.stint_number,
                       ps2.compound, ps2.lap_start, ps2.lap_end, ps2.tyre_age_at_start
                FROM practice_stints ps2
                LEFT JOIN practice_drivers pd ON pd.session_key = ps2.session_key AND pd.car_number = ps2.car_number
                WHERE ps2.session_key = %s
                ORDER BY pd.car_number, ps2.stint_number
                """,
                (session_key,),
            )
            for car, name, stint_n, compound, lap_start, lap_end, age in cur.fetchall():
                laps = f"{lap_start}-{lap_end}" if lap_start is not None else "?"
                print(f"  #{car:<3} {name:<22} relais {stint_n}: {compound or '?':<12} "
                      f"tours {laps} (âge au départ: {age if age is not None else '?'})")

        print("\n--- MÉTÉO (série temporelle) ---")
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT session_time, air_temp, track_temp, humidity, rainfall, wind_speed
                FROM practice_weather WHERE session_key = %s ORDER BY session_time
                """,
                (session_key,),
            )
            rows = cur.fetchall()
            if not rows:
                print("  (aucune donnée météo)")
            else:
                t0 = rows[0][0]
                for session_time, air, track, hum, rain, wind in rows:
                    minute = int(session_time.total_seconds() // 60)
                    print(f"  t+{minute:3d} min : air {air}°C, piste {track}°C, humidité {hum}%, "
                          f"pluie {rain}, vent {wind} m/s")

    print("\n(fin du briefing)")


if __name__ == "__main__":
    main()
