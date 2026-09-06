import {
  getSeasonSchedule,
  getResults,
  getDriverStandingsAllRounds,
  getConstructorStandingsAllRounds,
} from "../lib/raceData";
import { CIRCUIT_GEO, FALLBACK_GEO, raceStatus } from "../lib/circuitGeo";
import HomeDashboard from "./HomeDashboard";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const season = 2026;
  const today = new Date();

  const schedule = await getSeasonSchedule(season);
  const races = schedule.map((r) => ({
    ...r,
    status: raceStatus(r.race_date, today),
    geo: CIRCUIT_GEO[r.circuit_name] || FALLBACK_GEO,
  }));

  const [driversByRound, constructorsByRound] = await Promise.all([
    getDriverStandingsAllRounds(season),
    getConstructorStandingsAllRounds(season),
  ]);

  // "Dernier résultat" / "Prochain GP" : déterminé par la présence réelle de
  // données (round présent dans driver_standings, alimenté par la même
  // ingestion jolpica que les résultats) plutôt que par la date du calendrier
  // comparée à aujourd'hui. raceStatus() classe un Grand Prix disputé LE JOUR
  // MÊME comme "live", jamais "done" — ce qui, une fois les résultats
  // réellement ingérés dans l'après-midi, laissait la page d'accueil afficher
  // l'avant-dernière course comme "dernier résultat" et la course déjà
  // disputée comme "prochain GP" jusqu'au lendemain. La présence réelle de
  // données est la seule source de vérité qui ne prend jamais ce genre de
  // retard.
  const completedRounds = Object.keys(driversByRound).map(Number);
  const lastCompletedRound = completedRounds.length ? Math.max(...completedRounds) : null;
  const lastCompletedRace = lastCompletedRound ? races.find((r) => r.round === lastCompletedRound) : null;
  const nextRace = races.find((r) => (lastCompletedRound ? r.round > lastCompletedRound : true));

  const lastResults = lastCompletedRace ? await getResults(lastCompletedRace.race_id) : [];
  const lastCompleted = lastCompletedRace ? { ...lastCompletedRace, results: lastResults } : null;

  return (
    <HomeDashboard
      lastCompleted={lastCompleted}
      nextRace={nextRace}
      races={races}
      driversByRound={driversByRound}
      constructorsByRound={constructorsByRound}
    />
  );
}
