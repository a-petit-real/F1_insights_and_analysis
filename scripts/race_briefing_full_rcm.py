"""One-off : tous les messages de course (sans filtre) pour une course, afin
de ne rien manquer (VSC, drapeaux, abandons) lors du briefing factuel."""
import argparse
import os
import sys

import psycopg

parser = argparse.ArgumentParser()
parser.add_argument("--season", type=int, required=True)
parser.add_argument("--round", type=int, required=True)
parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
args = parser.parse_args()

if not args.database_url:
    print("DATABASE_URL manquant.", file=sys.stderr)
    sys.exit(1)

with psycopg.connect(args.database_url) as conn, conn.pipeline():
    with conn.cursor() as cur:
        cur.execute("SELECT race_id FROM races WHERE season=%s AND round=%s", (args.season, args.round))
        race_id = cur.fetchone()[0]
    with conn.cursor() as cur:
        cur.execute(
            "SELECT message_time, message FROM race_control_messages WHERE race_id=%s ORDER BY message_time",
            (race_id,),
        )
        for t, msg in cur.fetchall():
            print(f"[{t}] {msg}")
