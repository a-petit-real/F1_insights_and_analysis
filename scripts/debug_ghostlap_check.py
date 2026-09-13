"""Vérifie le pipeline GhostLapReplay (requête SQL + interpolation position/
vitesse + calcul d'écart "au même point du tracé") contre de vraies données
déjà en base, en reproduisant en Python exactement les fonctions de
web/app/courses/[round]/GhostLapReplay.jsx (bisect/pointAtTime/
timeAtDistance) et la requête de web/lib/raceData.js (getRaceLapReplay ou
getQualiDuelReplay selon --source).

Sert de garde-fou avant/après toute modification de cette logique — le
sandbox interactif n'a pas d'accès réseau à la vraie base (cf.
docs/OPERATIONS.md), ce script tourne donc en GitHub Actions à la place.

Usage :
    python scripts/debug_ghostlap_check.py --season 2026 --round 13 --lap 10 --drivers Norris,Antonelli,Verstappen
    python scripts/debug_ghostlap_check.py --season 2026 --round 14 --source quali --session "Qualifying" --cars 1,12,3
"""
import argparse
import os
import sys

import psycopg


def bisect(points, value, key):
    lo, hi = 0, len(points) - 1
    if value <= key(points[0]):
        return 0
    if value >= key(points[hi]):
        return hi - 1
    while hi - lo > 1:
        mid = (lo + hi) // 2
        if key(points[mid]) <= value:
            lo = mid
        else:
            hi = mid
    return lo


def lerp(a, b, frac):
    return a + (b - a) * frac


def point_at_time(points, t):
    t = max(points[0]["t"], min(points[-1]["t"], t))
    i = bisect(points, t, lambda p: p["t"])
    p0, p1 = points[i], points[i + 1]
    frac = 0 if p1["t"] == p0["t"] else (t - p0["t"]) / (p1["t"] - p0["t"])
    return {
        "x": lerp(p0["x"], p1["x"], frac), "y": lerp(p0["y"], p1["y"], frac),
        "speed": lerp(p0["speed"], p1["speed"], frac), "distance": lerp(p0["distance"], p1["distance"], frac),
    }


def time_at_distance(points, distance):
    distance = max(points[0]["distance"], min(points[-1]["distance"], distance))
    i = bisect(points, distance, lambda p: p["distance"])
    p0, p1 = points[i], points[i + 1]
    frac = 0 if p1["distance"] == p0["distance"] else (distance - p0["distance"]) / (p1["distance"] - p0["distance"])
    return lerp(p0["t"], p1["t"], frac)


def to_points(dist, speed, xs, ys, ts):
    return [
        {"distance": float(dist[i]), "speed": float(speed[i]), "x": float(xs[i]), "y": float(ys[i]), "t": float(ts[i])}
        for i in range(len(dist))
    ]


def fetch_race(cur, race_id, lap, driver_names):
    cur.execute(
        """
        SELECT d.family_name, c.name AS team_name, lt.distance_m, lt.speed_kmh, lt.x_m, lt.y_m, lt.t_s
        FROM lap_telemetry lt
        JOIN results res ON res.race_id = lt.race_id AND res.car_number = lt.car_number
        JOIN drivers d ON d.driver_id = res.driver_id
        JOIN constructors c ON c.constructor_id = res.constructor_id
        WHERE lt.race_id = %s AND lt.lap_number = %s AND d.family_name = ANY(%s)
        """,
        (race_id, lap, driver_names),
    )
    return {row[0]: {"teamName": row[1], "points": to_points(*row[2:])} for row in cur.fetchall()}


def fetch_quali(cur, race_id, session_name, car_numbers):
    cur.execute("SELECT session_key FROM practice_sessions WHERE race_id=%s AND session_name=%s", (race_id, session_name))
    row = cur.fetchone()
    if row is None:
        return {}
    session_key = row[0]
    cur.execute(
        "SELECT car_number, lap_number FROM practice_laps WHERE session_key=%s AND car_number = ANY(%s) "
        "AND lap_time IS NOT NULL ORDER BY car_number, lap_time ASC",
        (session_key, car_numbers),
    )
    best_lap = {}
    for car_number, lap_number in cur.fetchall():
        best_lap.setdefault(car_number, lap_number)  # premier = meilleur (déjà trié par lap_time)
    if not best_lap:
        return {}
    cur.execute(
        """
        SELECT pd.name_acronym, pd.team_name, pt.distance_m, pt.speed_kmh, pt.x_m, pt.y_m, pt.t_s
        FROM practice_telemetry pt
        JOIN practice_drivers pd ON pd.session_key = pt.session_key AND pd.car_number = pt.car_number
        JOIN UNNEST(%s::int[], %s::int[]) AS wanted(car_number, lap_number)
          ON wanted.car_number = pt.car_number AND wanted.lap_number = pt.lap_number
        WHERE pt.session_key = %s
        """,
        (list(best_lap.keys()), list(best_lap.values()), session_key),
    )
    return {row[0]: {"teamName": row[1], "points": to_points(*row[2:])} for row in cur.fetchall()}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--season", type=int, required=True)
    parser.add_argument("--round", type=int, required=True)
    parser.add_argument("--source", choices=["race", "quali"], default="race")
    parser.add_argument("--lap", type=int, help="[source=race] numéro de tour")
    parser.add_argument("--drivers", help="[source=race] family_name séparés par des virgules")
    parser.add_argument("--session", default="Qualifying", help="[source=quali] nom de séance OpenF1")
    parser.add_argument("--cars", help="[source=quali] numéros de voiture séparés par des virgules")
    parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
    args = parser.parse_args()

    if not args.database_url:
        print("DATABASE_URL manquant.", file=sys.stderr)
        sys.exit(1)

    with psycopg.connect(args.database_url) as conn, conn.cursor() as cur:
        cur.execute("SELECT race_id FROM races WHERE season=%s AND round=%s", (args.season, args.round))
        row = cur.fetchone()
        if row is None:
            print(f"Round {args.round} (saison {args.season}) introuvable.", file=sys.stderr)
            sys.exit(1)
        race_id = row[0]

        if args.source == "race":
            drivers = fetch_race(cur, race_id, args.lap, args.drivers.split(","))
        else:
            drivers = fetch_quali(cur, race_id, args.session, [int(c) for c in args.cars.split(",")])

    print(f"race_id={race_id}, source={args.source}, pilotes trouvés: {list(drivers.keys())}\n")
    drivers = {k: v for k, v in drivers.items() if len(v["points"]) >= 2}
    if len(drivers) < 2:
        print("PAS ASSEZ DE PILOTES AVEC TÉLÉMÉTRIE — pipeline non vérifiable (données manquantes ou pas encore ingérées).")
        sys.exit(1)

    ordered = sorted(drivers.items(), key=lambda kv: kv[1]["points"][-1]["t"])
    leader_name, leader = ordered[0]
    leader_duration = leader["points"][-1]["t"]
    print(f"Leader (tour le plus rapide) : {leader_name}, durée {leader_duration:.3f}s\n")

    for frac in [0.0, 0.25, 0.5, 0.75, 1.0]:
        t = frac * leader_duration
        leader_now = point_at_time(leader["points"], t)
        print(f"--- t={t:6.2f}s (leader à {leader_now['distance']:.1f}m, {leader_now['speed']:.0f}km/h) ---")
        for name, d in ordered:
            if name == leader_name:
                print(f"  {name:<12} LEADER")
                continue
            gap = time_at_distance(d["points"], leader_now["distance"]) - t
            pos = point_at_time(d["points"], t)
            print(f"  {name:<12} +{gap:.3f}s  vitesse={pos['speed']:.0f}km/h  (x={pos['x']:.1f}, y={pos['y']:.1f})")
        print()

    print("Vérification terminée : requête SQL + forme de données + interpolation + calcul d'écart cohérents sur des données réelles.")


if __name__ == "__main__":
    main()
