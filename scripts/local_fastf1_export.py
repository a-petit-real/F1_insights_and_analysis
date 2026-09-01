"""
Récupération locale des données FastF1 détaillées (temps au tour, pneus,
météo, messages de course, résultats) pour la saison en cours.

À exécuter sur un ORDINATEUR PERSONNEL (IP résidentielle) : les serveurs
livetiming.formula1.com bloquent les IP de datacenter/cloud, ce qui
empêche ce script de fonctionner depuis GitHub Actions ou un serveur.
Voir The Garage, carte c7, pour le détail de cette contrainte.

Usage (invite de commande) :
    python local_fastf1_export.py
    python local_fastf1_export.py --year 2026
    python local_fastf1_export.py --year 2026 --rounds 1 2 3
    python local_fastf1_export.py --telemetry     (ajoute la télémétrie
        détaillée seconde par seconde : vitesse/gaz/frein par voiture.
        Beaucoup plus long et volumineux — à activer seulement si besoin.)

Sans --rounds, le script détecte automatiquement les courses déjà
disputées de la saison indiquée. Le résultat est un dossier
fastf1_export/ rempli de fichiers CSV (un sous-dossier par course et par
session), zippé à la fin en fastf1_export_<année>.zip — c'est ce fichier
qu'il faut renvoyer.
"""
import argparse
import datetime
import os
import shutil
import sys
import warnings
import zipfile

warnings.filterwarnings("ignore")

try:
    import fastf1
    import pandas as pd
except ImportError:
    print("Un module nécessaire n'est pas installé.")
    print("Ouvrez une invite de commande et tapez : pip install fastf1")
    sys.exit(1)

# Identifiants de session essayés pour chaque week-end. Un week-end classique
# n'a que FP1/FP2/FP3/Q/R ; un week-end sprint a SQ/S en plus. On essaie tout
# et on ignore proprement ce qui n'existe pas pour ce format de week-end.
SESSION_CODES = ["FP1", "FP2", "FP3", "SQ", "S", "Q", "R"]


def _timedeltas_to_text(df):
    """Convertit les colonnes de type durée en texte lisible avant export CSV."""
    for col in df.select_dtypes(include=["timedelta64[ns]"]).columns:
        df[col] = df[col].astype(str)
    return df


def export_session(event, session_code, out_dir, with_telemetry):
    try:
        session = event.get_session(session_code)
    except Exception:
        return  # ce format de week-end n'a pas cette session, rien d'anormal

    try:
        session.load(laps=True, telemetry=with_telemetry, weather=True, messages=True)
    except Exception as e:
        print(f"    [{session_code}] échec du chargement : {e}")
        return

    session_dir = os.path.join(out_dir, session_code)
    os.makedirs(session_dir, exist_ok=True)

    if session.results is not None and len(session.results):
        session.results.to_csv(os.path.join(session_dir, "results.csv"), index=False)

    if session.laps is not None and len(session.laps):
        laps = _timedeltas_to_text(session.laps.copy())
        laps.to_csv(os.path.join(session_dir, "laps.csv"), index=False)

    if session.weather_data is not None and len(session.weather_data):
        wx = _timedeltas_to_text(session.weather_data.copy())
        wx.to_csv(os.path.join(session_dir, "weather.csv"), index=False)

    try:
        msgs = session.race_control_messages
        if msgs is not None and len(msgs):
            msgs.to_csv(os.path.join(session_dir, "race_control_messages.csv"), index=False)
    except Exception:
        pass

    if with_telemetry and session.laps is not None and len(session.laps):
        frames = []
        for drv in session.laps["Driver"].unique():
            try:
                car_data = session.laps.pick_driver(drv).get_car_data().add_distance()
                car_data["Driver"] = drv
                frames.append(car_data)
            except Exception:
                continue
        if frames:
            telemetry = _timedeltas_to_text(pd.concat(frames, ignore_index=True))
            telemetry.to_csv(os.path.join(session_dir, "telemetry.csv"), index=False)

    print(f"    [{session_code}] exporté.")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--year", type=int, default=datetime.date.today().year)
    parser.add_argument("--rounds", type=int, nargs="*", default=None)
    parser.add_argument("--telemetry", action="store_true",
                         help="Inclure la télémétrie détaillée par voiture (fichiers beaucoup plus lourds).")
    args = parser.parse_args()

    base_dir = os.path.dirname(os.path.abspath(__file__))
    cache_dir = os.path.join(base_dir, ".fastf1_cache")
    os.makedirs(cache_dir, exist_ok=True)
    fastf1.Cache.enable_cache(cache_dir)

    out_root = os.path.join(base_dir, "fastf1_export")
    if os.path.exists(out_root):
        shutil.rmtree(out_root)
    os.makedirs(out_root)

    schedule = fastf1.get_event_schedule(args.year)
    today = datetime.date.today()

    if args.rounds:
        rounds = args.rounds
    else:
        completed = schedule[schedule["EventDate"].dt.date <= today]
        rounds = [int(r) for r in completed["RoundNumber"] if r > 0]  # round 0 = essais de pré-saison

    print(f"Saison {args.year} — rounds à exporter : {rounds}")
    if args.telemetry:
        print("Télémétrie détaillée activée : ce sera plus long et plus volumineux.")

    for round_number in rounds:
        event = fastf1.get_event(args.year, round_number)
        event_name = event["EventName"]
        print(f"\n=== Round {round_number} — {event_name} ===")
        out_dir = os.path.join(out_root, f"{args.year}_R{round_number:02d}_{event_name.replace(' ', '_')}")
        os.makedirs(out_dir, exist_ok=True)
        for code in SESSION_CODES:
            export_session(event, code, out_dir, args.telemetry)

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
