"use server";

// Server Action plutôt qu'une route /api : le reste du projet n'a pas de
// backend séparé (Next.js -> Postgres directement, cf.
// docs/ARCHITECTURE.md) — un point d'entrée par requête à la demande suffit,
// pas besoin d'une nouvelle surface de routes pour ce seul usage. Appelée
// depuis RawDataTab (Client Component) quand l'utilisateur choisit un tour
// à comparer : lap_telemetry peut représenter plusieurs dizaines de Ko par
// tour (tous pilotes confondus), pas question de tout envoyer au chargement
// de la page pour chaque tour de la course.
import { getLapTelemetry, getQualiDuelReplay, getRaceLapReplay } from "../../../lib/raceData";

export async function fetchLapTelemetry(raceId, lapNumber) {
  return getLapTelemetry(raceId, lapNumber);
}

// Même logique de chargement à la demande, pour le réplay comparatif ciblé
// (GhostLapReplay) embarqué dans un article — appelé au montage du
// composant plutôt qu'au chargement de la page, la télémétrie d'un tour de
// qualification pesant déjà plusieurs Ko par pilote.
export async function fetchQualiDuelReplay(raceId, sessionName, carNumbers) {
  return getQualiDuelReplay(raceId, sessionName, carNumbers);
}

// Variante course (GhostLapReplay source="race") — cf. getRaceLapReplay.
export async function fetchRaceLapReplay(raceId, lapNumber, driverNames) {
  return getRaceLapReplay(raceId, lapNumber, driverNames);
}
