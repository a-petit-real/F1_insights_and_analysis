"use server";

// Server Action plutôt qu'une route /api : le reste du projet n'a pas de
// backend séparé (Next.js -> Postgres directement, cf.
// docs/ARCHITECTURE.md) — un point d'entrée par requête à la demande suffit,
// pas besoin d'une nouvelle surface de routes pour ce seul usage. Appelée
// depuis RawDataTab (Client Component) quand l'utilisateur choisit un tour
// à comparer : lap_telemetry peut représenter plusieurs dizaines de Ko par
// tour (tous pilotes confondus), pas question de tout envoyer au chargement
// de la page pour chaque tour de la course.
import { getLapTelemetry } from "../../../lib/raceData";

export async function fetchLapTelemetry(raceId, lapNumber) {
  return getLapTelemetry(raceId, lapNumber);
}
