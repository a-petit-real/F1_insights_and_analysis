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

  const lastCompletedRace = [...races].reverse().find((r) => r.status === "done");
  const nextRace = races.find((r) => r.status !== "done");

  const [lastResults, driversByRound, constructorsByRound] = await Promise.all([
    lastCompletedRace ? getResults(lastCompletedRace.race_id) : Promise.resolve([]),
    getDriverStandingsAllRounds(season),
    getConstructorStandingsAllRounds(season),
  ]);

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
