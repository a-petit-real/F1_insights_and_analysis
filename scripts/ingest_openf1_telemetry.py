"""Ingère la télémétrie position/vitesse par tour depuis OpenF1 (endpoints
`location` et `car_data`), pour le graphique "Vitesse par tour" (Raw data)
et pour un réplay comparatif ciblé (duel qualif, ex. bataille pour la pole)
publié dans un article.

--session distingue la destination : "Race" (défaut, comportement
historique de ce script) écrit dans `lap_telemetry` (clé race_id), toute
autre valeur ("Qualifying", "Practice 1"...) écrit dans
`practice_telemetry` (clé session_key) — cf. commentaire de cette table
dans db/schema_fastf1.sql pour la raison de cette séparation (collision de
lap_number possible entre course et séance d'essais/qualification sur un
race_id partagé).

Deux flux OpenF1, fusionnés ici :
  - `location` : position (x, y, z, en mètres, origine arbitraire par
    circuit) échantillonnée à ~3-5 Hz. Sert à la fois à tracer la carte du
    circuit ET à calculer distance_m par somme des écarts euclidiens
    consécutifs — une mesure directe, pas une approximation.
  - `car_data` : vitesse (et rpm/gaz/frein/rapport, non retenus ici) à ~3-5
    Hz, sur sa PROPRE grille temporelle, indépendante de `location`.
    speed_kmh est donc interpolé linéairement sur les horodatages de
    `location` plutôt que d'être une mesure native à chaque point.

Première version de cette table (cf. historique git) calculait distance_m
par intégration trapézoïdale de speed_kmh — abandonnée : trop imprécise
(dérive visible en sortie de virage/freinage, où l'hypothèse de vitesse
linéaire entre deux échantillons est la plus fausse). `location` donne
une mesure de position directe, nettement plus fidèle.

Les bornes de chaque tour (date_start, lap_duration) viennent de
l'endpoint `laps`, comme dans la version précédente.

--round est obligatoire : `location` et `car_data` pèsent chacun plusieurs
Mo par pilote (deux fois plus de requêtes que la version précédente), donc
un round à la fois, sur déclenchement manuel après chaque course — cf.
docs/OPERATIONS.md.

Usage :
    python scripts/ingest_openf1_telemetry.py --season 2026 --round 13
    python scripts/ingest_openf1_telemetry.py --season 2026 --round 14 --session "Qualifying"
"""
import argparse
import bisect
import math
import os
import sys
import time

import psycopg

from ingest_openf1 import api_get, iso, load_season_sessions, get_race


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


def interp_speed(t, speed_times, speed_values):
    """Vitesse interpolée linéairement à l'instant t depuis la grille
    temporelle (triée) de car_data. None si t est hors de la plage
    couverte plutôt que d'extrapoler."""
    i = bisect.bisect_left(speed_times, t)
    if i == 0 or i >= len(speed_times):
        return speed_values[0] if i == 0 and speed_times and speed_times[0] == t else None
    t0, t1 = speed_times[i - 1], speed_times[i]
    if t1 == t0:
        return speed_values[i]
    v0, v1 = speed_values[i - 1], speed_values[i]
    frac = (t - t0) / (t1 - t0)
    return v0 + (v1 - v0) * frac


def build_lap_series(loc_in_lap, speed_times, speed_values):
    """loc_in_lap : [(t, x, y), ...] triés par t, >= 2 points.
    -> (distance_m[], speed_kmh[], x_m[], y_m[], t_s[]) — distance cumulée
    par écart euclidien consécutif (x, y), vitesse interpolée sur car_data,
    t_s = secondes écoulées depuis le premier échantillon du tour (sert au
    réplay animé multi-pilotes, cf. RaceTabs.jsx)."""
    distances, speeds, xs, ys, ts = [0.0], [], [], [], []
    cumulative = 0.0
    t_lap_start = loc_in_lap[0][0]
    for idx, (t, x, y) in enumerate(loc_in_lap):
        if idx > 0:
            t0, x0, y0 = loc_in_lap[idx - 1]
            cumulative += math.hypot(x - x0, y - y0)
            distances.append(cumulative)
        xs.append(x)
        ys.append(y)
        ts.append(t - t_lap_start)
        v = interp_speed(t, speed_times, speed_values)
        speeds.append(v)
    # Un point de vitesse manquant (hors plage car_data) est comblé par la
    # valeur connue la plus proche (forward puis backward-fill) plutôt que
    # laissé à None : lap_telemetry exige des tableaux pleins (REAL[], pas
    # d'élément NULL individuel géré côté front). Fait par une passe avant
    # puis arrière plutôt que `next(...) or next(...)` : une vitesse
    # connue de 0.0 (voiture à l'arrêt) est une valeur valide, pas une
    # absence — un `or` l'aurait confondue avec "rien trouvé".
    last_known = None
    for i in range(len(speeds)):
        if speeds[i] is not None:
            last_known = speeds[i]
        elif last_known is not None:
            speeds[i] = last_known
    last_known = None
    for i in range(len(speeds) - 1, -1, -1):
        if speeds[i] is not None:
            last_known = speeds[i]
        elif last_known is not None:
            speeds[i] = last_known
    speeds = [v if v is not None else 0.0 for v in speeds]
    return distances, speeds, xs, ys, ts


def load_telemetry(cur, table, key_column, key_value, windows, location_by_driver, car_data_by_driver):
    # table/key_column sont des constantes internes ("lap_telemetry"/"race_id"
    # ou "practice_telemetry"/"session_key", jamais une valeur passée par
    # l'utilisateur) : l'interpolation dans le SQL ci-dessous ne rejoue donc
    # pas le risque d'injection qu'aurait un nom de table/colonne arbitraire.
    n = 0
    for car_number, laps in windows.items():
        locations = location_by_driver.get(car_number, [])
        speed_times, speed_values = car_data_by_driver.get(car_number, ([], []))
        if not locations:
            continue
        for lap_number, start_t, end_t in laps:
            loc_in_lap = [(t, x, y) for t, x, y in locations if start_t <= t <= end_t]
            if len(loc_in_lap) < 2:
                continue  # tour sans assez d'échantillons pour tracer une courbe
            distances, speeds, xs, ys, ts = build_lap_series(loc_in_lap, speed_times, speed_values)
            cur.execute(
                f"""
                INSERT INTO {table} ({key_column}, car_number, lap_number, distance_m, speed_kmh, x_m, y_m, t_s)
                VALUES (%(key_value)s, %(car_number)s, %(lap_number)s, %(distance_m)s, %(speed_kmh)s, %(x_m)s, %(y_m)s, %(t_s)s)
                ON CONFLICT ({key_column}, car_number, lap_number) DO UPDATE SET
                    distance_m = EXCLUDED.distance_m, speed_kmh = EXCLUDED.speed_kmh,
                    x_m = EXCLUDED.x_m, y_m = EXCLUDED.y_m, t_s = EXCLUDED.t_s
                """,
                {
                    "key_value": key_value, "car_number": car_number, "lap_number": lap_number,
                    "distance_m": distances, "speed_kmh": speeds, "x_m": xs, "y_m": ys, "t_s": ts,
                },
            )
            n += 1
    return n


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--season", type=int, required=True)
    parser.add_argument("--round", type=int, required=True)
    parser.add_argument("--session", default="Race",
                         help="Nom de séance OpenF1. 'Race' (défaut) écrit dans lap_telemetry (comportement "
                              "historique) ; toute autre valeur ('Practice 1', 'Practice 2', 'Practice 3', "
                              "'Qualifying', 'Sprint Qualifying', 'Sprint') écrit dans practice_telemetry.")
    parser.add_argument("--cars", default=None,
                         help="Numéros de voiture à ingérer, séparés par des virgules (ex. '4,12'). Par défaut, "
                              "toutes les voitures de la séance — à réserver à la course (déjà fait une fois par "
                              "round). Pour un duel qualif ciblé, restreindre ici évite de multiplier par 10 le "
                              "volume de requêtes (location + car_data pour ~20 pilotes) pour 2-3 pilotes utiles.")
    parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
    args = parser.parse_args()

    if not args.database_url:
        print("DATABASE_URL manquant (variable d'environnement ou --database-url).", file=sys.stderr)
        sys.exit(1)

    with psycopg.connect(args.database_url) as conn:
        with conn.cursor() as cur:
            race_id, race_date = get_race(cur, args.season, args.round)
        if race_id is None:
            print(f"Round {args.round} introuvable dans races (saison {args.season}) — ignoré.", file=sys.stderr)
            sys.exit(1)

        if args.session == "Race":
            sessions_by_date = load_season_sessions(args.season)
            session = sessions_by_date.get(race_date.isoformat())
            if session is None:
                print(f"Aucune session OpenF1 pour la date {race_date} — ignoré.", file=sys.stderr)
                sys.exit(1)
            table, key_column, key_value = "lap_telemetry", "race_id", race_id
        else:
            # Même filtrage par proximité de date qu'ingest_openf1_practice.py
            # (plus robuste aux libellés de circuit qu'un match sur
            # circuit_short_name) plutôt qu'un lookup par date exacte de
            # course, puisque cette séance a lieu un autre jour du week-end.
            candidates = api_get("sessions", year=args.season, session_name=args.session)
            session = next(
                (s for s in candidates if abs((iso(s["date_start"]).date() - race_date).days) <= 3),
                None,
            )
            if session is None:
                print(f"Aucune session '{args.session}' OpenF1 trouvée à proximité du {race_date} "
                      f"(round {args.round}). La séance n'a peut-être pas encore eu lieu.", file=sys.stderr)
                sys.exit(1)
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO practice_sessions (session_key, race_id, session_name, date_start, date_end)
                    VALUES (%(session_key)s, %(race_id)s, %(session_name)s, %(date_start)s, %(date_end)s)
                    ON CONFLICT (session_key) DO UPDATE SET
                        session_name = EXCLUDED.session_name, date_start = EXCLUDED.date_start,
                        date_end = EXCLUDED.date_end
                    """,
                    {
                        "session_key": session["session_key"], "race_id": race_id, "session_name": args.session,
                        "date_start": iso(session.get("date_start")), "date_end": iso(session.get("date_end")),
                    },
                )
            conn.commit()
            table, key_column, key_value = "practice_telemetry", "session_key", session["session_key"]

        session_key = session["session_key"]
        session_start = iso(session["date_start"])
        print(f"Round {args.round} — {session.get('circuit_short_name')} — {args.session} "
              f"(session_key={session_key})")

        laps = api_get("laps", session_key=session_key)
        windows = compute_lap_windows(laps, session_start)
        if args.cars:
            wanted = {int(c.strip()) for c in args.cars.split(",") if c.strip()}
            windows = {c: w for c, w in windows.items() if c in wanted}
        car_numbers = sorted(windows.keys())
        total_laps = sum(len(v) for v in windows.values())
        print(f"{len(car_numbers)} voiture(s), {total_laps} tour(s) au total (bornes issues de l'endpoint laps).")

        location_by_driver = {}
        car_data_by_driver = {}
        for car_number in car_numbers:
            print(f"  voiture #{car_number}...")

            loc_raw = api_get("location", session_key=session_key, driver_number=car_number)
            # OpenF1 donne x/y en DIXIÈMES DE MÈTRE (décimètres), pas en
            # mètres malgré ce que documentation/discussions laissent parfois
            # croire — confirmé empiriquement (cf. scripts/debug_telemetry_check.py) :
            # une distance de tour calculée sans cette conversion sortait à
            # ~10x la longueur réelle du circuit (~57500m pour un tour de
            # Monza qui en fait ~5793m). /10 restaure des mètres réels.
            DM_TO_M = 0.1
            loc_samples = sorted(
                (
                    ((iso(s["date"]) - session_start).total_seconds(), s.get("x") * DM_TO_M, s.get("y") * DM_TO_M)
                    for s in loc_raw if s.get("date") is not None and s.get("x") is not None and s.get("y") is not None
                ),
                key=lambda s: s[0],
            )
            location_by_driver[car_number] = loc_samples
            print(f"    location : {len(loc_samples)} échantillon(s)")
            time.sleep(0.3)  # rate limit OpenF1 (cf. ingest_openf1.py)

            speed_raw = api_get("car_data", session_key=session_key, driver_number=car_number)
            speed_pairs = sorted(
                (
                    ((iso(s["date"]) - session_start).total_seconds(), float(s["speed"]))
                    for s in speed_raw if s.get("date") is not None and s.get("speed") is not None
                ),
                key=lambda s: s[0],
            )
            car_data_by_driver[car_number] = (
                [t for t, _ in speed_pairs],
                [v for _, v in speed_pairs],
            )
            print(f"    car_data : {len(speed_pairs)} échantillon(s)")
            time.sleep(0.3)

        with conn.pipeline(), conn.cursor() as cur:
            n = load_telemetry(cur, table, key_column, key_value, windows, location_by_driver, car_data_by_driver)
        conn.commit()
        print(f"\n{table} : {n} ligne(s) (une par tour/voiture, tours sans assez d'échantillons ignorés)")


if __name__ == "__main__":
    main()
