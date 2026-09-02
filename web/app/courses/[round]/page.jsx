import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getRace,
  getResults,
  getLapTimesByDriver,
  getTyreStints,
  getWeatherSeries,
  getRaceControlMessages,
} from "../../../lib/raceData";
import RaceTabs from "./RaceTabs";

export const dynamic = "force-dynamic";

export default async function RacePage({ params }) {
  const { round } = await params;
  const season = 2026;
  const race = await getRace(season, Number(round));
  if (!race) notFound();

  const [results, lapTimes, tyreStints, weather, rcm] = await Promise.all([
    getResults(race.race_id),
    getLapTimesByDriver(race.race_id),
    getTyreStints(race.race_id),
    getWeatherSeries(race.race_id),
    getRaceControlMessages(race.race_id),
  ]);

  return (
    <main style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 20px", fontFamily: "system-ui, sans-serif" }}>
      <p style={{ color: "#666", marginBottom: 4 }}>
        <Link href="/courses">← Toutes les courses</Link>
      </p>
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>
        Round {race.round} — {race.race_name}
      </h1>
      <p style={{ color: "#888", marginBottom: 24 }}>
        {race.circuit_name}, {race.country} · {new Date(race.race_date).toLocaleDateString("fr-FR")}
      </p>
      <RaceTabs
        round={race.round}
        results={results}
        lapTimes={lapTimes}
        tyreStints={tyreStints}
        weather={weather}
        rcm={rcm}
      />
    </main>
  );
}
