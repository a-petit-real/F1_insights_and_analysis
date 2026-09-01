"""
Smoke test for the FastF1 data source (Phase 2 — données structurées).

This script does NOT run inside the Claude Code sandbox: that environment's
network policy blocks livetiming.formula1.com and the Jolpica API. It runs
as a GitHub Actions job instead, where outbound internet access is normal,
so we can prove the real data pipeline actually works before building a
database schema and ingestion service around it.

Usage: python scripts/fetch_session.py [year] [event] [session]
Defaults to a known, fully-archived race (2024 Bahrain GP) rather than the
current 2026 season, since this is purely a connectivity/shape smoke test.
"""
import sys
import warnings

import fastf1

warnings.filterwarnings("ignore")


def main():
    year = int(sys.argv[1]) if len(sys.argv) > 1 else 2024
    event = sys.argv[2] if len(sys.argv) > 2 else "Bahrain"
    session_code = sys.argv[3] if len(sys.argv) > 3 else "R"

    fastf1.Cache.enable_cache(".fastf1_cache")

    print(f"Loading {year} {event} — session '{session_code}'...")
    session = fastf1.get_session(year, event, session_code)
    session.load(laps=True, telemetry=False, weather=True, messages=False)

    print("\n=== EVENT ===")
    print(session.event["EventName"], "-", session.event["EventDate"])

    print("\n=== RESULTS (top 5) ===")
    if session.results is not None and len(session.results):
        cols = [c for c in ["Position", "Abbreviation", "TeamName", "Time", "Status"]
                if c in session.results.columns]
        print(session.results[cols].head(5).to_string(index=False))
    else:
        print("No results table returned.")

    print("\n=== LAPS sample (first driver, first 5 laps) ===")
    if session.laps is not None and len(session.laps):
        first_driver = session.laps["Driver"].iloc[0]
        cols = [c for c in ["Driver", "LapNumber", "LapTime", "Compound", "Stint",
                             "PitInTime", "PitOutTime", "TrackStatus"]
                if c in session.laps.columns]
        sample = session.laps[session.laps["Driver"] == first_driver][cols].head(5)
        print(sample.to_string(index=False))
        print(f"\nTotal laps recorded: {len(session.laps)}")
        print(f"Drivers present: {sorted(session.laps['Driver'].unique().tolist())}")
        print(f"Lap data columns available: {list(session.laps.columns)}")
    else:
        print("No laps table returned.")

    print("\n=== WEATHER sample ===")
    if session.weather_data is not None and len(session.weather_data):
        print(session.weather_data.head(3).to_string(index=False))
    else:
        print("No weather data returned.")

    print("\nSMOKE TEST: OK")


if __name__ == "__main__":
    main()
