"""One-off: inspect the exact driverStandings entries for 2026 round 1 to
understand why one is missing the 'position' key (real production bug hit
during the first live ingestion run)."""
import json

import requests

r = requests.get("https://api.jolpi.ca/ergast/f1/2026/1/driverStandings.json", timeout=20)
r.raise_for_status()
data = r.json()
lists = data["MRData"]["StandingsTable"]["StandingsLists"]
entries = lists[0]["DriverStandings"] if lists else []
print(f"Total entries: {len(entries)}")
for e in entries:
    if "position" not in e:
        print("MISSING 'position' in entry:")
        print(json.dumps(e, indent=2))
print("\nFull first list dump:")
print(json.dumps(lists, indent=2)[:6000])
