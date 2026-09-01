"""
Ingestion des données F1 depuis l'API Jolpica vers PostgreSQL (Phase 2).

Séparé en trois étapes indépendantes pour rester testable :
  - FETCH     : appels HTTP bruts vers Jolpica, aucune logique métier.
  - TRANSFORM : JSON Jolpica -> dicts prêts pour l'upsert (mapping de champs,
                casts de types).
  - LOAD      : upserts SQL (INSERT ... ON CONFLICT DO UPDATE) dans les
                tables définies par db/schema.sql.

Usage:
    python scripts/ingest_jolpica.py --season 2024 [--rounds 1 2 3]

  --rounds omis => ingère tous les rounds du calendrier de la saison dont
  la date est déjà passée (les rounds futurs n'ont pas encore de résultats
  ni de classement sur Jolpica : ils sont ignorés proprement, pas en erreur).

Connexion DB via la variable d'environnement DATABASE_URL (ou --database-url).
"""
import argparse
import datetime
import os
import sys
import time

import psycopg
import requests

BASE_URL = "https://api.jolpi.ca/ergast/f1"
REQUEST_TIMEOUT = 20
# Jolpica ne documente pas de limite de débit précise : on temporise par
# prudence entre les appels plutôt que de risquer un blocage.
RATE_LIMIT_DELAY_S = 0.3


# ---------------------------------------------------------------------
# FETCH
# ---------------------------------------------------------------------

def fetch_json(path):
    url = f"{BASE_URL}/{path}"
    r = requests.get(url, timeout=REQUEST_TIMEOUT)
    r.raise_for_status()
    time.sleep(RATE_LIMIT_DELAY_S)
    return r.json()


def fetch_schedule(season):
    return fetch_json(f"{season}.json")["MRData"]["RaceTable"]["Races"]


def fetch_race_results(season, round_):
    races = fetch_json(f"{season}/{round_}/results.json")["MRData"]["RaceTable"]["Races"]
    return races[0] if races else None


def fetch_driver_standings(season, round_):
    lists = fetch_json(f"{season}/{round_}/driverStandings.json")["MRData"]["StandingsTable"]["StandingsLists"]
    return lists[0]["DriverStandings"] if lists else []


def fetch_constructor_standings(season, round_):
    lists = fetch_json(f"{season}/{round_}/constructorStandings.json")["MRData"]["StandingsTable"]["StandingsLists"]
    return lists[0]["ConstructorStandings"] if lists else []


# ---------------------------------------------------------------------
# TRANSFORM
# ---------------------------------------------------------------------

def _session_datetime(entry):
    """Un sous-objet {"date": ..., "time": ...} Jolpica, ou None si absent."""
    if not entry:
        return None, None
    return entry.get("date"), entry.get("time")


def transform_circuit(circuit_json):
    loc = circuit_json.get("Location", {})
    return {
        "circuit_id": circuit_json["circuitId"],
        "name": circuit_json["circuitName"],
        "locality": loc.get("locality"),
        "country": loc.get("country"),
        "latitude": loc.get("lat"),
        "longitude": loc.get("long"),
        "wiki_url": circuit_json.get("url"),
    }


def transform_race(race_json):
    fp1_date, fp1_time = _session_datetime(race_json.get("FirstPractice"))
    fp2_date, fp2_time = _session_datetime(race_json.get("SecondPractice"))
    fp3_date, fp3_time = _session_datetime(race_json.get("ThirdPractice"))
    q_date, q_time = _session_datetime(race_json.get("Qualifying"))
    sprint_date, sprint_time = _session_datetime(race_json.get("Sprint"))
    return {
        "season": int(race_json["season"]),
        "round": int(race_json["round"]),
        "race_name": race_json["raceName"],
        "circuit_id": race_json["Circuit"]["circuitId"],
        "race_date": race_json["date"],
        "race_time": race_json.get("time"),
        "fp1_date": fp1_date, "fp1_time": fp1_time,
        "fp2_date": fp2_date, "fp2_time": fp2_time,
        "fp3_date": fp3_date, "fp3_time": fp3_time,
        "qualifying_date": q_date, "qualifying_time": q_time,
        "sprint_date": sprint_date, "sprint_time": sprint_time,
        "wiki_url": race_json.get("url"),
    }


def transform_driver(driver_json):
    permanent_number = driver_json.get("permanentNumber")
    return {
        "driver_id": driver_json["driverId"],
        "code": driver_json.get("code"),
        "permanent_number": int(permanent_number) if permanent_number else None,
        "given_name": driver_json["givenName"],
        "family_name": driver_json["familyName"],
        "date_of_birth": driver_json.get("dateOfBirth"),
        "nationality": driver_json.get("nationality"),
        "wiki_url": driver_json.get("url"),
    }


def transform_constructor(constructor_json):
    return {
        "constructor_id": constructor_json["constructorId"],
        "name": constructor_json["name"],
        "nationality": constructor_json.get("nationality"),
        "wiki_url": constructor_json.get("url"),
    }


def transform_result(result_json):
    time_obj = result_json.get("Time") or {}
    fastest = result_json.get("FastestLap") or {}
    fastest_time_obj = fastest.get("Time") or {}
    fastest_speed_obj = fastest.get("AverageSpeed") or {}
    car_number = result_json.get("number")
    millis = time_obj.get("millis")
    return {
        "driver_id": result_json["Driver"]["driverId"],
        "constructor_id": result_json["Constructor"]["constructorId"],
        "car_number": int(car_number) if car_number else None,
        "grid": int(result_json["grid"]) if result_json.get("grid") not in (None, "") else None,
        "finish_position": int(result_json["position"]) if result_json.get("position") else None,
        "finish_position_text": result_json.get("positionText"),
        "points": float(result_json.get("points", 0)),
        "laps_completed": int(result_json["laps"]) if result_json.get("laps") not in (None, "") else None,
        "status": result_json.get("status"),
        "time_millis": int(millis) if millis else None,
        "time_text": time_obj.get("time"),
        "fastest_lap_rank": int(fastest["rank"]) if fastest.get("rank") else None,
        "fastest_lap_number": int(fastest["lap"]) if fastest.get("lap") else None,
        "fastest_lap_time": fastest_time_obj.get("time"),
        "fastest_lap_avg_speed_kph": float(fastest_speed_obj["speed"]) if fastest_speed_obj.get("speed") else None,
    }


def transform_driver_standing(entry, season, round_):
    return {
        "season": season,
        "round": round_,
        "driver_id": entry["Driver"]["driverId"],
        "position": int(entry["position"]),
        "position_text": entry.get("positionText"),
        "points": float(entry["points"]),
        "wins": int(entry.get("wins", 0)),
    }


def transform_constructor_standing(entry, season, round_):
    return {
        "season": season,
        "round": round_,
        "constructor_id": entry["Constructor"]["constructorId"],
        "position": int(entry["position"]),
        "position_text": entry.get("positionText"),
        "points": float(entry["points"]),
        "wins": int(entry.get("wins", 0)),
    }


# ---------------------------------------------------------------------
# LOAD — un upsert par entité, idempotent (ré-exécutable sans dupliquer)
# ---------------------------------------------------------------------

def load_circuit(cur, c):
    cur.execute(
        """
        INSERT INTO circuits (circuit_id, name, locality, country, latitude, longitude, wiki_url)
        VALUES (%(circuit_id)s, %(name)s, %(locality)s, %(country)s, %(latitude)s, %(longitude)s, %(wiki_url)s)
        ON CONFLICT (circuit_id) DO UPDATE SET
            name = EXCLUDED.name, locality = EXCLUDED.locality, country = EXCLUDED.country,
            latitude = EXCLUDED.latitude, longitude = EXCLUDED.longitude, wiki_url = EXCLUDED.wiki_url
        """,
        c,
    )


def load_race(cur, r):
    cur.execute(
        """
        INSERT INTO races (season, round, race_name, circuit_id, race_date, race_time,
                            fp1_date, fp1_time, fp2_date, fp2_time, fp3_date, fp3_time,
                            qualifying_date, qualifying_time, sprint_date, sprint_time, wiki_url)
        VALUES (%(season)s, %(round)s, %(race_name)s, %(circuit_id)s, %(race_date)s, %(race_time)s,
                %(fp1_date)s, %(fp1_time)s, %(fp2_date)s, %(fp2_time)s, %(fp3_date)s, %(fp3_time)s,
                %(qualifying_date)s, %(qualifying_time)s, %(sprint_date)s, %(sprint_time)s, %(wiki_url)s)
        ON CONFLICT (season, round) DO UPDATE SET
            race_name = EXCLUDED.race_name, circuit_id = EXCLUDED.circuit_id,
            race_date = EXCLUDED.race_date, race_time = EXCLUDED.race_time,
            fp1_date = EXCLUDED.fp1_date, fp1_time = EXCLUDED.fp1_time,
            fp2_date = EXCLUDED.fp2_date, fp2_time = EXCLUDED.fp2_time,
            fp3_date = EXCLUDED.fp3_date, fp3_time = EXCLUDED.fp3_time,
            qualifying_date = EXCLUDED.qualifying_date, qualifying_time = EXCLUDED.qualifying_time,
            sprint_date = EXCLUDED.sprint_date, sprint_time = EXCLUDED.sprint_time,
            wiki_url = EXCLUDED.wiki_url
        RETURNING race_id
        """,
        r,
    )
    return cur.fetchone()[0]


def load_driver(cur, d):
    cur.execute(
        """
        INSERT INTO drivers (driver_id, code, permanent_number, given_name, family_name,
                              date_of_birth, nationality, wiki_url)
        VALUES (%(driver_id)s, %(code)s, %(permanent_number)s, %(given_name)s, %(family_name)s,
                %(date_of_birth)s, %(nationality)s, %(wiki_url)s)
        ON CONFLICT (driver_id) DO UPDATE SET
            code = EXCLUDED.code, permanent_number = EXCLUDED.permanent_number,
            given_name = EXCLUDED.given_name, family_name = EXCLUDED.family_name,
            date_of_birth = EXCLUDED.date_of_birth, nationality = EXCLUDED.nationality,
            wiki_url = EXCLUDED.wiki_url
        """,
        d,
    )


def load_constructor(cur, c):
    cur.execute(
        """
        INSERT INTO constructors (constructor_id, name, nationality, wiki_url)
        VALUES (%(constructor_id)s, %(name)s, %(nationality)s, %(wiki_url)s)
        ON CONFLICT (constructor_id) DO UPDATE SET
            name = EXCLUDED.name, nationality = EXCLUDED.nationality, wiki_url = EXCLUDED.wiki_url
        """,
        c,
    )


def load_result(cur, race_id, r):
    params = dict(r, race_id=race_id)
    cur.execute(
        """
        INSERT INTO results (race_id, driver_id, constructor_id, car_number, grid,
                              finish_position, finish_position_text, points, laps_completed, status,
                              time_millis, time_text, fastest_lap_rank, fastest_lap_number,
                              fastest_lap_time, fastest_lap_avg_speed_kph)
        VALUES (%(race_id)s, %(driver_id)s, %(constructor_id)s, %(car_number)s, %(grid)s,
                %(finish_position)s, %(finish_position_text)s, %(points)s, %(laps_completed)s, %(status)s,
                %(time_millis)s, %(time_text)s, %(fastest_lap_rank)s, %(fastest_lap_number)s,
                %(fastest_lap_time)s, %(fastest_lap_avg_speed_kph)s)
        ON CONFLICT (race_id, driver_id) DO UPDATE SET
            constructor_id = EXCLUDED.constructor_id, car_number = EXCLUDED.car_number,
            grid = EXCLUDED.grid, finish_position = EXCLUDED.finish_position,
            finish_position_text = EXCLUDED.finish_position_text, points = EXCLUDED.points,
            laps_completed = EXCLUDED.laps_completed, status = EXCLUDED.status,
            time_millis = EXCLUDED.time_millis, time_text = EXCLUDED.time_text,
            fastest_lap_rank = EXCLUDED.fastest_lap_rank, fastest_lap_number = EXCLUDED.fastest_lap_number,
            fastest_lap_time = EXCLUDED.fastest_lap_time,
            fastest_lap_avg_speed_kph = EXCLUDED.fastest_lap_avg_speed_kph
        """,
        params,
    )


def load_driver_standing(cur, s):
    cur.execute(
        """
        INSERT INTO driver_standings (season, round, driver_id, position, position_text, points, wins)
        VALUES (%(season)s, %(round)s, %(driver_id)s, %(position)s, %(position_text)s, %(points)s, %(wins)s)
        ON CONFLICT (season, round, driver_id) DO UPDATE SET
            position = EXCLUDED.position, position_text = EXCLUDED.position_text,
            points = EXCLUDED.points, wins = EXCLUDED.wins
        """,
        s,
    )


def load_constructor_standing(cur, s):
    cur.execute(
        """
        INSERT INTO constructor_standings (season, round, constructor_id, position, position_text, points, wins)
        VALUES (%(season)s, %(round)s, %(constructor_id)s, %(position)s, %(position_text)s, %(points)s, %(wins)s)
        ON CONFLICT (season, round, constructor_id) DO UPDATE SET
            position = EXCLUDED.position, position_text = EXCLUDED.position_text,
            points = EXCLUDED.points, wins = EXCLUDED.wins
        """,
        s,
    )


# ---------------------------------------------------------------------
# ORCHESTRATION
# ---------------------------------------------------------------------

def ingest_season(conn, season, rounds=None):
    schedule = fetch_schedule(season)
    print(f"Calendrier {season} : {len(schedule)} courses.")

    today = datetime.date.today()
    with conn.cursor() as cur:
        for race_json in schedule:
            load_circuit(cur, transform_circuit(race_json["Circuit"]))
            load_race(cur, transform_race(race_json))
    conn.commit()
    print("Circuits + calendrier chargés.")

    if rounds is None:
        rounds = [
            int(r["round"]) for r in schedule
            if datetime.date.fromisoformat(r["date"]) <= today
        ]
        print(f"Rounds déjà courus détectés : {rounds}")

    for round_ in rounds:
        print(f"\n--- Round {round_} ---")
        race_json = fetch_race_results(season, round_)
        if race_json is None or not race_json.get("Results"):
            print(f"  Pas de résultats disponibles pour le round {round_} (course pas encore courue ?), ignoré.")
            continue

        with conn.cursor() as cur:
            race_id = load_race(cur, transform_race(race_json))
            for result_json in race_json["Results"]:
                load_driver(cur, transform_driver(result_json["Driver"]))
                load_constructor(cur, transform_constructor(result_json["Constructor"]))
                load_result(cur, race_id, transform_result(result_json))
        conn.commit()
        print(f"  {len(race_json['Results'])} résultats chargés.")

        driver_standings = fetch_driver_standings(season, round_)
        constructor_standings = fetch_constructor_standings(season, round_)
        with conn.cursor() as cur:
            for entry in driver_standings:
                load_driver_standing(cur, transform_driver_standing(entry, season, round_))
            for entry in constructor_standings:
                load_constructor_standing(cur, transform_constructor_standing(entry, season, round_))
        conn.commit()
        print(f"  Classements chargés ({len(driver_standings)} pilotes, {len(constructor_standings)} écuries).")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--season", type=int, required=True)
    parser.add_argument("--rounds", type=int, nargs="*", default=None,
                         help="Rounds spécifiques à ingérer. Omis = tous les rounds déjà courus de la saison.")
    parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
    args = parser.parse_args()

    if not args.database_url:
        print("DATABASE_URL manquant (variable d'environnement ou --database-url).", file=sys.stderr)
        sys.exit(1)

    with psycopg.connect(args.database_url) as conn:
        ingest_season(conn, args.season, args.rounds)

    print("\nINGESTION TERMINÉE.")


if __name__ == "__main__":
    main()
