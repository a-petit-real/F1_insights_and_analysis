"""Dump les dernières lignes de la table feedback (db/schema_app.sql) —
vérifie qu'une soumission via le formulaire du site atterrit bien en base,
avec les bonnes valeurs. Lecture seule.

Usage : python scripts/debug_feedback_dump.py --limit 5
"""
import argparse
import os
import sys

import psycopg

parser = argparse.ArgumentParser()
parser.add_argument("--limit", type=int, default=5)
parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
args = parser.parse_args()

if not args.database_url:
    print("DATABASE_URL manquant.", file=sys.stderr)
    sys.exit(1)

with psycopg.connect(args.database_url) as conn:
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT id, created_at, type, message, contact_email, page_url, status
            FROM feedback
            ORDER BY id DESC
            LIMIT %s
            """,
            (args.limit,),
        )
        rows = cur.fetchall()

if not rows:
    print("Aucune ligne dans feedback.")
else:
    for id_, created_at, type_, message, email, page_url, status in rows:
        print(f"#{id_} [{status}] {created_at} · type={type_} · page={page_url} · email={email or '—'}")
        print(f"    message: {message}")
