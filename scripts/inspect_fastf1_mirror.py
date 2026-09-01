"""
One-off inspection: how does the installed FastF1 package reference
livetiming.formula1.com internally, and does it expose any documented way
to point at the community mirror (livetiming-mirror.fastf1.dev)?

Also determines the most recent *already-run* race of the current season
via Jolpica, so the actual mirror retry (scripts/fetch_session.py) targets
a recent event rather than a 2024 archive race.
"""
import datetime
import os

import fastf1
import requests

print("fastf1 version:", fastf1.__version__)
pkg_dir = os.path.dirname(fastf1.__file__)
print("fastf1 package dir:", pkg_dir)

print("\n=== Occurrences of 'formula1.com' or 'fastf1.dev' in the installed package ===")
for root, _, files in os.walk(pkg_dir):
    for fn in files:
        if not fn.endswith(".py"):
            continue
        path = os.path.join(root, fn)
        try:
            with open(path, encoding="utf-8") as f:
                for i, line in enumerate(f, 1):
                    if "formula1.com" in line or "fastf1.dev" in line.lower():
                        print(f"{path}:{i}: {line.rstrip()}")
        except Exception as e:
            print(f"  (could not read {path}: {e})")

print("\n=== Most recent already-run race of the current season (via Jolpica) ===")
year = datetime.date.today().year
today = datetime.date.today()
resp = requests.get(f"https://api.jolpi.ca/ergast/f1/{year}.json", timeout=20)
resp.raise_for_status()
races = resp.json()["MRData"]["RaceTable"]["Races"]
past = [r for r in races if datetime.date.fromisoformat(r["date"]) <= today]
if not past:
    print(f"No completed race found for {year} yet; falling back to {year - 1}.")
    resp = requests.get(f"https://api.jolpi.ca/ergast/f1/{year - 1}.json", timeout=20)
    resp.raise_for_status()
    races = resp.json()["MRData"]["RaceTable"]["Races"]
    past = races
last = past[-1]
print("season:", last["season"])
print("round:", last["round"])
print("raceName:", last["raceName"])
print("date:", last["date"])
print("circuitId:", last["Circuit"]["circuitId"])
