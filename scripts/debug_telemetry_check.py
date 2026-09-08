"""Contrôle de plausibilité de lap_telemetry : distance croissante, ordre
de grandeur cohérent avec la longueur réelle du circuit (Monza ~5.79km),
et cohérence x_m/y_m (présence, écart type recalculé contre distance_m)."""
import argparse
import math
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
            SELECT d.family_name, lt.car_number, lt.distance_m, lt.speed_kmh, lt.x_m, lt.y_m
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
for fam, car, dist, speed, xs, ys in rows:
    n = len(dist)
    monotonic = all(dist[i] <= dist[i + 1] for i in range(n - 1))
    vmin, vmax = min(speed), max(speed)
    has_xy = bool(xs) and bool(ys) and len(xs) == n and len(ys) == n
    # Recalcule la distance à partir de x_m/y_m et compare à distance_m
    # stockée — doivent coïncider exactement (même calcul à l'ingestion).
    xy_check = ""
    if has_xy:
        recomputed = 0.0
        for i in range(1, n):
            recomputed += math.hypot(xs[i] - xs[i - 1], ys[i] - ys[i - 1])
        xy_check = f" | recalcul x/y={recomputed:7.1f}m (écart {abs(recomputed - dist[-1]):.3f}m)"
    print(f"{fam:<15} #{car:<3} {n:>4} points | distance 0 -> {dist[-1]:7.1f}m | "
          f"croissante={monotonic} | vitesse {vmin:.0f}-{vmax:.0f} km/h | x/y présents={has_xy}{xy_check}")
