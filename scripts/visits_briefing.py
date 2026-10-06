"""
Récap de fréquentation du site (table site_visits, db/schema_app.sql),
alimentée par web/middleware.js à chaque visite (IP, géolocalisation
Vercel, user-agent). Lecture seule.

Regroupe les lignes par visiteur unique (hash IP + user-agent, colonne
visitor_id) sur une fenêtre de temps donnée, pour le récap quotidien
demandé par l'utilisateur — objectif : voir si les quelques personnes à
qui l'accès au site a été donné l'utilisent réellement.

Usage :
    python scripts/visits_briefing.py --hours 24
    python scripts/visits_briefing.py --since 2026-09-26
"""
import argparse
import os
import re
import sys
from datetime import datetime, timedelta, timezone

import psycopg

BOT_PATTERN = re.compile(
    r"bot|crawler|spider|slurp|pingdom|uptimerobot|facebookexternalhit|bingpreview|headlesschrome|nomorevibe",
    re.IGNORECASE,
)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--hours", type=int, default=24, help="Fenêtre glissante en heures (par défaut 24)")
    parser.add_argument(
        "--since",
        type=str,
        default=None,
        help="Date ISO (YYYY-MM-DD) — remplace --hours, compte depuis minuit UTC ce jour-là",
    )
    parser.add_argument("--database-url", default=os.environ.get("DATABASE_URL"))
    args = parser.parse_args()

    if not args.database_url:
        print("DATABASE_URL manquant.", file=sys.stderr)
        sys.exit(1)

    if args.since:
        since = datetime.fromisoformat(args.since).replace(tzinfo=timezone.utc)
    else:
        since = datetime.now(timezone.utc) - timedelta(hours=args.hours)

    with psycopg.connect(args.database_url) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT visited_at, path, ip, country, region, city, user_agent, referrer, visitor_id
                FROM site_visits
                WHERE visited_at >= %s
                ORDER BY visited_at ASC
                """,
                (since,),
            )
            rows = cur.fetchall()

    real_rows = [r for r in rows if not (r[6] and BOT_PATTERN.search(r[6]))]
    bot_count = len(rows) - len(real_rows)

    print(f"=== Fréquentation depuis {since.isoformat()} ===")
    print(f"Pages vues : {len(real_rows)} (+ {bot_count} requêtes de bots/crawlers écartées)")

    if not real_rows:
        print("Aucune visite humaine détectée sur cette fenêtre.")
        return

    visitors = {}
    for visited_at, path, ip, country, region, city, user_agent, referrer, visitor_id in real_rows:
        key = visitor_id or ip or "inconnu"
        v = visitors.setdefault(
            key,
            {
                "ip": ip,
                "country": country,
                "region": region,
                "city": city,
                "user_agent": user_agent,
                "first": visited_at,
                "last": visited_at,
                "paths": [],
                "referrers": set(),
            },
        )
        v["last"] = visited_at
        v["paths"].append(path)
        if referrer:
            v["referrers"].add(referrer)

    print(f"Visiteurs uniques : {len(visitors)}\n")

    for v in sorted(visitors.values(), key=lambda x: x["last"], reverse=True):
        loc = ", ".join(x for x in [v["city"], v["region"], v["country"]] if x) or "localisation inconnue"
        paths_preview = ", ".join(v["paths"][:8]) + (" …" if len(v["paths"]) > 8 else "")
        print(f"- IP {v['ip'] or '?'} — {loc}")
        print(f"    vu de {v['first']} à {v['last']} · {len(v['paths'])} page(s) : {paths_preview}")
        if v["referrers"]:
            print(f"    provenance : {', '.join(sorted(v['referrers']))}")
        if v["user_agent"]:
            print(f"    user-agent : {v['user_agent']}")


if __name__ == "__main__":
    main()
