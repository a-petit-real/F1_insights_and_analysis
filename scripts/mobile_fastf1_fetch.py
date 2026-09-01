"""
Récupération automatisée des fichiers bruts de données F1 (temps au tour,
pneus, météo, messages de course, statut piste) — pensé pour tourner sur
un téléphone Android via Termux, en Python standard pur (aucune
dépendance tierce à installer : seulement urllib/json/zipfile, inclus
avec Python).

Contexte : livetiming.formula1.com bloque les IP de datacenter/cloud
(voir The Garage, carte c7), mais pas les connexions résidentielles ou
mobiles classiques — confirmé en accédant directement à Index.json
depuis un navigateur. Ce script automatise ce que l'utilisateur ferait
sinon à la main, fichier par fichier.

Usage (dans Termux) :
    python mobile_fastf1_fetch.py
    python mobile_fastf1_fetch.py --year 2026
    python mobile_fastf1_fetch.py --year 2026 --rounds 1 2 3
    python mobile_fastf1_fetch.py --session Q      (par défaut : Race)

Sans --rounds, récupère automatiquement toutes les courses déjà
disputées de la saison indiquée (calendrier obtenu via l'API Jolpica,
déjà utilisée ailleurs dans ce projet). Le résultat : un dossier avec un
sous-dossier par course, zippé à la fin — c'est ce zip qu'il faut
renvoyer, il sera décodé côté serveur avec le moteur FastF1.
"""
import argparse
import datetime
import json
import os
import shutil
import urllib.error
import urllib.request
import zipfile

BASE = "https://livetiming.formula1.com/static"
JOLPICA = "https://api.jolpi.ca/ergast/f1"
HEADERS = {"User-Agent": "Mozilla/5.0"}

# Flux essentiels pour temps au tour + stratégie pneus + contexte de course.
# Chaque flux a deux fichiers : ".json" (état de départ) et ".jsonStream"
# (toutes les mises à jour pendant la session) — les deux sont nécessaires
# pour reconstituer l'historique complet, ce que fera le décodage côté serveur.
FEEDS = [
    "SessionInfo.json",
    "DriverList.json",
    "TimingData.json", "TimingData.jsonStream",
    "TimingAppData.json", "TimingAppData.jsonStream",
    "WeatherData.json", "WeatherData.jsonStream",
    "RaceControlMessages.json", "RaceControlMessages.jsonStream",
    "TrackStatus.json", "TrackStatus.jsonStream",
    "TyreStintSeries.json", "TyreStintSeries.jsonStream",
    "PitStopSeries.json", "PitStopSeries.jsonStream",
]

SESSION_FOLDER_SUFFIX = {
    "R": "Race",
    "Q": "Qualifying",
    "S": "Sprint",
    "SQ": "Sprint_Qualifying",
    "FP1": "Practice_1",
    "FP2": "Practice_2",
    "FP3": "Practice_3",
}


def fetch_json(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=20) as r:
        return json.loads(r.read().decode("utf-8"))


def get_schedule(year):
    data = fetch_json(f"{JOLPICA}/{year}.json")
    return data["MRData"]["RaceTable"]["Races"]


def download_file(url, dest_path):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            with open(dest_path, "wb") as f:
                shutil.copyfileobj(r, f)
        return True
    except urllib.error.HTTPError as e:
        print(f"    échec ({e.code}) : {os.path.basename(dest_path)}")
        return False
    except Exception as e:
        print(f"    échec ({e}) : {os.path.basename(dest_path)}")
        return False


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--year", type=int, default=datetime.date.today().year)
    parser.add_argument("--rounds", type=int, nargs="*", default=None)
    parser.add_argument("--session", default="R", choices=list(SESSION_FOLDER_SUFFIX))
    args = parser.parse_args()

    print("Récupération du calendrier...")
    schedule = get_schedule(args.year)
    today = datetime.date.today()

    if args.rounds:
        races = [r for r in schedule if int(r["round"]) in args.rounds]
    else:
        races = [r for r in schedule if datetime.date.fromisoformat(r["date"]) <= today]

    print(f"Saison {args.year} — {len(races)} course(s) à récupérer, session '{args.session}'.")

    out_root = "fastf1_raw_export"
    if os.path.exists(out_root):
        shutil.rmtree(out_root)
    os.makedirs(out_root)

    for race in races:
        round_number = int(race["round"])
        race_name = race["raceName"].replace(" ", "_")
        race_date = race["date"]  # date de course : suffit pour la session Race
        session_folder = f"{race_date}_{SESSION_FOLDER_SUFFIX[args.session]}"
        event_folder = f"{race_date}_{race_name}"
        url_base = f"{BASE}/{args.year}/{event_folder}/{session_folder}/"

        dest_dir = os.path.join(out_root, f"R{round_number:02d}_{race_name}")
        os.makedirs(dest_dir, exist_ok=True)

        print(f"\n=== Round {round_number} — {race['raceName']} ===")
        ok_count = 0
        for filename in FEEDS:
            dest_path = os.path.join(dest_dir, filename)
            if download_file(url_base + filename, dest_path):
                ok_count += 1
        print(f"  {ok_count}/{len(FEEDS)} fichiers récupérés.")

    zip_path = f"{out_root}_{args.year}.zip"
    if os.path.exists(zip_path):
        os.remove(zip_path)
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for root, _, files in os.walk(out_root):
            for f in files:
                full = os.path.join(root, f)
                zf.write(full, os.path.relpath(full, out_root))

    print(f"\nTERMINÉ. Fichier à renvoyer : {zip_path}")


if __name__ == "__main__":
    main()
