"""Ingère la télémétrie vitesse/distance par tour depuis OpenF1
(endpoint `car_data`), pour le graphique "Vitesse par tour" du Raw data.

OpenF1 ne fournit pas de champ distance : `car_data` donne des échantillons
speed/rpm/throttle/brake/n_gear/drs à ~3-5 Hz, horodatés (`date`), sans
position sur le tour. distance_m est donc calculée ici par intégration
trapézoïdale de la vitesse sur le temps écoulé depuis le début du tour —
une approximation standard (celle qu'utilisent aussi les outils de
télémétrie F1 grand public en l'absence de position GPS exploitée), pas
une mesure directe. Les bornes de chaque tour (date_start, lap_duration)
viennent de l'endpoint `laps`, déjà utilisé par ingest_openf1.py — refetché
ici plutôt que relu depuis lap_times pour disposer du date_start précis de
CHAQUE tour (lap_times ne stocke que le temps cumulé de FIN de tour).

Contrairement à ingest_openf1.py (toute la saison en une commande),
--round est obligatoire ici : car_data pèse plusieurs Mo par pilote (vs.
quelques Ko pour laps/stints/weather), donc un round à la fois, sur
déclenchement manuel après chaque course — cf. docs/OPERATIONS.md.

Usage :
    python scripts/ingest_openf1_telemetry.py --season 2026 --round 13
"""
import argparse
import os
import sys
import time

import psycopg

from ingest_openf1 import api_get, iso, load_season_sessions, get_race

KMH_TO_MS = 1000 / 3600


def compute_lap_windows(laps, session_start):
    """{car_number: [(lap_number, start_t, end_t), ...]} triés par lap_number,
    temps en secondes écoulées depuis le début de session."""
    windows = {}
    for row in laps:
        car_number = row.get("driver_number")
        lap_number = row.get("lap_number")
        date_start = iso(row.get("date_start"))
        lap_duration = row.get("lap_duration")
        if car_number is None or lap_number is None or date_start is None or lap_duration is None:
            continue
        start_t = (date_start - session_start).total_seconds()
        end_t = start_t + float(lap_duration)
        windows.setdefault(car_number, []).append((lap_number, start_t, end_t))
    for car_number in windows:
        windows[car_number].sort(key=lambda w: w[0])
    return windows


def integrate_distance(samples):
    """[(t, speed_kmh), ...] triés par t (>= 2 points) -> (distance_m[], speed_kmh[])
    par intégration trapézoïdale de la vitesse — distance cumulée depuis le
    premier échantillon du tour."""
    distances = [0.0]
    speeds = [float(samples[0][1])]
    cumulative = 0.0
    for (t0, v0), (t1, v1) in zip(samples, samples[1:]):
        dt = t1 - t0
        if dt <= 0:
            continue
        cumulative += (v0 + v1) / 2 * KMH_TO_MS * dt
        distances.append(cumulative)
        speeds.append(float(v1))
    return distances, speeds


def load_telemetry(cur, race_id, windows, car_data_by_driver):
    n = 0
    for car_number, laps in windows.items():
        samples = car_data_by_driver.get(car_number, [])
        if not samples:
            continue
        for lap_number, start_t, end_t in laps:
            in_lap = [(t, v) for t, v in samples if v is not None and start_t <= t <= end_t]
            if len(in_lap) < 2:
                continue  # tour sans assez d'échantillons pour tracer une courbe
            distances, speeds = integrate_distance(in_lap)
            cur.execute(
                """
                INSERT INTO lap_telemetry (race_id, car_number, lap_number, distance_m, speed_kmh)
                VALUES (%(race_id)s, %(car_number)s, %(lap_number)s, %(distance_m)s, %(speed_kmh)s)
                ON CONFLICT (race_id, car_number, lap_number) DO UPDATE SET
                    distance_m = EXCLUDED.distance_m, speed_kmh = EXCLUDED.speed_kmh
                """,
                {
                    "race_id": race_id, "car_number": car_number, "lap_number": lap_number,
                    "distance_m": distances, "speed_kmh": speeds,
                },
            )
            n += 1
    return n


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--season", type=int, required=True)
    parser.add_argument("--round", type=int, required=True)
    parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
    args = parser.parse_args()

    if not args.database_url:
        print("DATABASE_URL manquant (variable d'environnement ou --database-url).", file=sys.stderr)
        sys.exit(1)

    sessions_by_date = load_season_sessions(args.season)

    with psycopg.connect(args.database_url) as conn:
        with conn.cursor() as cur:
            race_id, race_date = get_race(cur, args.season, args.round)
        if race_id is None:
            print(f"Round {args.round} introuvable dans races (saison {args.season}) — ignoré.", file=sys.stderr)
            sys.exit(1)

        session = sessions_by_date.get(race_date.isoformat())
        if session is None:
            print(f"Aucune session OpenF1 pour la date {race_date} — ignoré.", file=sys.stderr)
            sys.exit(1)

        session_key = session["session_key"]
        session_start = iso(session["date_start"])
        print(f"Round {args.round} — {session.get('circuit_short_name')} (session_key={session_key})")

        laps = api_get("laps", session_key=session_key)
        windows = compute_lap_windows(laps, session_start)
        car_numbers = sorted(windows.keys())
        total_laps = sum(len(v) for v in windows.values())
        print(f"{len(car_numbers)} voiture(s), {total_laps} tour(s) au total (bornes issues de l'endpoint laps).")

        car_data_by_driver = {}
        for car_number in car_numbers:
            print(f"  car_data voiture #{car_number}...")
            samples_raw = api_get("car_data", session_key=session_key, driver_number=car_number)
            samples = sorted(
                (
                    ((iso(s["date"]) - session_start).total_seconds(), s.get("speed"))
                    for s in samples_raw if s.get("date") is not None
                ),
                key=lambda s: s[0],
            )
            car_data_by_driver[car_number] = samples
            print(f"    {len(samples)} échantillon(s)")
            time.sleep(0.3)  # rate limit OpenF1 (cf. ingest_openf1.py)

        with conn.pipeline(), conn.cursor() as cur:
            n = load_telemetry(cur, race_id, windows, car_data_by_driver)
        conn.commit()
        print(f"\nlap_telemetry : {n} ligne(s) (une par tour/voiture, tours sans assez d'échantillons ignorés)")


if __name__ == "__main__":
    main()
