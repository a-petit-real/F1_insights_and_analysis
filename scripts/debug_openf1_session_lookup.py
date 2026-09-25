"""Diagnostic ponctuel : pourquoi ingest_openf1_practice.py ne retrouve plus
la séance 'Practice 3' du round 15 (Baku) via sessions?year=&session_name=,
alors que la toute première tentative avait réussi. Lecture seule, appelle
OpenF1 directement (deux stratégies) pour comparer.

Usage : python scripts/debug_openf1_session_lookup.py --season 2026 --round 15 --session "Practice 3" --session-key 11372
"""
import argparse
import sys

import requests

BASE = "https://api.openf1.org/v1"
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; ThePitWall/1.0)"}

parser = argparse.ArgumentParser()
parser.add_argument("--season", type=int, required=True)
parser.add_argument("--round", type=int, required=True)
parser.add_argument("--session", default="Practice 3")
parser.add_argument("--session-key", type=int, default=None)
args = parser.parse_args()

print(f"--- Stratégie actuelle du script (year + session_name) ---")
resp = requests.get(f"{BASE}/sessions", params={"year": args.season, "session_name": args.session},
                     headers=HEADERS, timeout=30)
print(f"status={resp.status_code}")
if resp.status_code == 200:
    data = resp.json()
    print(f"{len(data)} candidat(s) retourné(s) pour year={args.season} session_name='{args.session}'")
    baku = [s for s in data if "aku" in (s.get("circuit_short_name") or "").lower()
            or "aku" in (s.get("location") or "").lower()
            or "zerbaijan" in (s.get("country_name") or "").lower()]
    print(f"  dont {len(baku)} lié(s) à Baku/Azerbaïdjan :")
    for s in baku:
        print(f"    {s}")
    if not baku:
        print("  Aucun candidat Baku dans cette liste. Aperçu des 3 premiers/derniers éléments :")
        for s in data[:3]:
            print(f"    {s}")
        print("    ...")
        for s in data[-3:]:
            print(f"    {s}")
else:
    print(f"body={resp.text[:500]}")

if args.session_key:
    print(f"\n--- Stratégie alternative : requête directe par session_key={args.session_key} ---")
    resp2 = requests.get(f"{BASE}/sessions", params={"session_key": args.session_key},
                          headers=HEADERS, timeout=30)
    print(f"status={resp2.status_code}")
    if resp2.status_code == 200:
        print(resp2.json())
    else:
        print(f"body={resp2.text[:500]}")

print(f"\n--- Stratégie alternative : requête par circuit + année (sans filtre session_name) ---")
resp3 = requests.get(f"{BASE}/sessions", params={"year": args.season, "country_name": "Azerbaijan"},
                      headers=HEADERS, timeout=30)
print(f"status={resp3.status_code}")
if resp3.status_code == 200:
    data3 = resp3.json()
    print(f"{len(data3)} session(s) trouvée(s) pour Azerbaijan {args.season} :")
    for s in data3:
        print(f"  session_key={s.get('session_key')} session_name={s.get('session_name')!r} "
              f"date_start={s.get('date_start')} date_end={s.get('date_end')}")
else:
    print(f"body={resp3.text[:500]}")
