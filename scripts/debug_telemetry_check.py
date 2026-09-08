"""Contrôle de plausibilité de lap_telemetry : distance croissante, ordre
de grandeur cohérent avec la longueur réelle du circuit (Monza ~5.79km)."""
import argparse
import os
import sys

import psycopg

parser = argparse.ArgumentParser()
parser.add_argument("--season", type=int, required=True)
parser.add_argument("--round", type=int, required=True)
parser.add_argument("--lap", type=int, default=10)
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
            SELECT d.family_name, lt.car_number, lt.distance_m, lt.speed_kmh
            FROM lap_telemetry lt
            JOIN results res ON res.race_id = lt.race_id AND res.car_number = lt.car_number
            JOIN drivers d ON d.driver_id = res.driver_id
            WHERE lt.race_id = %s AND lt.lap_number = %s
            ORDER BY d.family_name
            """,
            (race_id, args.lap),
        )
        rows = cur.fetchall()

print(f"Tour {args.lap} — {len(rows)} pilote(s) avec télémétrie.\n")
for fam, car, dist, speed in rows:
    n = len(dist)
    monotonic = all(dist[i] <= dist[i+1] for i in range(n-1))
    vmin, vmax = min(speed), max(speed)
    print(f"{fam:<15} #{car:<3} {n:>4} points | distance 0 -> {dist[-1]:7.1f}m | "
          f"croissante={monotonic} | vitesse {vmin:.0f}-{vmax:.0f} km/h")
