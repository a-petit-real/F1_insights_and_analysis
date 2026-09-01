"""One-off inspection of the Jolpica API response shape, used to design the
database schema (db/schema.sql). Not part of the ingestion pipeline itself.
"""
import json

import requests

ENDPOINTS = {
    "race_results": "https://api.jolpi.ca/ergast/f1/2024/1/results.json",
    "race_schedule": "https://api.jolpi.ca/ergast/f1/2024.json",
    "driver_standings": "https://api.jolpi.ca/ergast/f1/2024/1/driverStandings.json",
    "constructor_standings": "https://api.jolpi.ca/ergast/f1/2024/1/constructorStandings.json",
}

for name, url in ENDPOINTS.items():
    print(f"\n{'=' * 20} {name} {'=' * 20}")
    r = requests.get(url, timeout=20)
    print("status:", r.status_code)
    data = r.json()
    print(json.dumps(data, indent=2)[:3000])
