"""
Récupère une page web bloquée depuis le sandbox interactif (formula1.com,
press.pirelli.com, Wikipedia, api.openf1.org, etc.) en tournant sur un
runner GitHub Actions, qui a un accès internet normal (contrairement au
sandbox de la session interactive, derrière un proxy restrictif).

Usage :
    python scripts/fetch_url.py --url "https://press.pirelli.com/..."
    python scripts/fetch_url.py --url "https://..." --raw          # HTML brut, pas de nettoyage
    python scripts/fetch_url.py --url "https://api.openf1.org/v1/stints?..." --raw
    python scripts/fetch_url.py --url "https://..." --selector "article"

Par défaut, le texte est extrait et nettoyé (balises supprimées, espaces
condensés) pour rester lisible dans les logs d'un job GitHub Actions et
tenir sous la limite de troncature des logs. --raw retourne le corps de la
réponse tel quel (utile pour du JSON d'API, ou pour inspecter le HTML brut).
"""
import argparse
import sys

import requests
from bs4 import BeautifulSoup

DEFAULT_HEADERS = {
    # Certains sites (Pirelli, F1) renvoient une page dégradée ou bloquent
    # les clients sans User-Agent de navigateur.
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
}


def extract_text(html, selector=None):
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "footer", "noscript"]):
        tag.decompose()
    root = soup.select_one(selector) if selector else soup
    if root is None:
        print(f"[avertissement] sélecteur '{selector}' introuvable, extraction sur la page entière.",
              file=sys.stderr)
        root = soup
    text = root.get_text(separator="\n")
    lines = [line.strip() for line in text.splitlines()]
    lines = [line for line in lines if line]
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--url", required=True)
    parser.add_argument("--raw", action="store_true", help="Corps de la réponse tel quel, sans extraction de texte.")
    parser.add_argument("--selector", help="Sélecteur CSS pour ne garder qu'une portion de la page (ex: 'article').")
    parser.add_argument("--max-chars", type=int, default=25000,
                         help="Tronque la sortie à N caractères (défaut 25000, pour rester lisible dans les logs).")
    args = parser.parse_args()

    resp = requests.get(args.url, headers=DEFAULT_HEADERS, timeout=30)
    print(f"URL: {args.url}", file=sys.stderr)
    print(f"HTTP {resp.status_code} — {len(resp.content)} octets — content-type: {resp.headers.get('content-type')}",
          file=sys.stderr)
    resp.raise_for_status()

    if args.raw or "json" in resp.headers.get("content-type", ""):
        output = resp.text
    else:
        output = extract_text(resp.text, args.selector)

    if len(output) > args.max_chars:
        print(f"[note] sortie tronquée à {args.max_chars} caractères sur {len(output)} — "
              f"relancer avec --max-chars plus grand si besoin.", file=sys.stderr)
        output = output[:args.max_chars]

    print(output)


if __name__ == "__main__":
    main()
