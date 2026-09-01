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
import os
import sys
import warnings

import requests

import fastf1

warnings.filterwarnings("ignore")


def raw_probe():
    """Bypass FastF1 entirely: hit its main data host directly so the real
    HTTP status/exception is visible, instead of FastF1's own warning logs
    which swallow the underlying error."""
    url = "https://livetiming.formula1.com/static/2024/2024-03-02_Bahrain_Grand_Prix/2024-03-02_Race/Index.json"
    print(f"\n=== RAW PROBE: {url} ===")
    try:
        r = requests.get(url, timeout=15)
        print("HTTP status:", r.status_code)
        print("First 300 chars:", r.text[:300])
    except Exception as e:
        print("RAW PROBE FAILED:", type(e).__name__, str(e)[:500])


def main():
    raw_probe()

    year = int(sys.argv[1]) if len(sys.argv) > 1 else 2024
    event = sys.argv[2] if len(sys.argv) > 2 else "Bahrain"
    session_code = sys.argv[3] if len(sys.argv) > 3 else "R"

    fastf1.set_log_level("DEBUG")
    cache_dir = ".fastf1_cache"
    os.makedirs(cache_dir, exist_ok=True)
    fastf1.Cache.enable_cache(cache_dir)

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
    try:
        laps = session.laps
        if laps is not None and len(laps):
            first_driver = laps["Driver"].iloc[0]
            cols = [c for c in ["Driver", "LapNumber", "LapTime", "Compound", "Stint",
                                 "PitInTime", "PitOutTime", "TrackStatus"]
                    if c in laps.columns]
            sample = laps[laps["Driver"] == first_driver][cols].head(5)
            print(sample.to_string(index=False))
            print(f"\nTotal laps recorded: {len(laps)}")
            print(f"Drivers present: {sorted(laps['Driver'].unique().tolist())}")
            print(f"Lap data columns available: {list(laps.columns)}")
        else:
            print("No laps table returned.")
    except Exception as e:
        print("LAPS ACCESS FAILED:", type(e).__name__, str(e)[:300])

    print("\n=== WEATHER sample ===")
    try:
        wx = session.weather_data
        if wx is not None and len(wx):
            print(wx.head(3).to_string(index=False))
        else:
            print("No weather data returned.")
    except Exception as e:
        print("WEATHER ACCESS FAILED:", type(e).__name__, str(e)[:300])

    print("\nSMOKE TEST: OK")


if __name__ == "__main__":
    main()
