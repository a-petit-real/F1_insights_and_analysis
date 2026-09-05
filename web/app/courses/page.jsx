import { getSeasonSchedule } from "../../lib/raceData";
import { CIRCUIT_GEO, FALLBACK_GEO, raceStatus } from "../../lib/circuitGeo";
import SeasonCalendar from "./SeasonCalendar";

export const dynamic = "force-dynamic"; // toujours les données à jour, pas de cache statique

export default async function CoursesIndex() {
  const season = 2026;
  const schedule = await getSeasonSchedule(season);
  const today = new Date();

  // Statut (disputée / ce week-end / à venir) et géolocalisation du circuit
  // calculés une fois ici, puis partagés par la vue liste et la vue carte.
  const races = schedule.map((r) => ({
    ...r,
    status: raceStatus(r.race_date, today),
    geo: CIRCUIT_GEO[r.circuit_name] || FALLBACK_GEO,
  }));

  return (
    <main style={{ paddingTop: 32 }}>
      <h1 style={{ fontSize: 28, marginBottom: 24 }}>Saison {season}</h1>
      <SeasonCalendar races={races} />
    </main>
  );
}
