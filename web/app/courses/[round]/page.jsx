import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getRace,
  getResults,
  getLapTimesByDriver,
  getTyreStints,
  getWeatherSeries,
  getRaceControlMessages,
  getOvertakes,
  getPracticeSessions,
  getPracticeClassification,
  getPracticeLapTimesByDriver,
  getPracticeStints,
  getPracticeWeather,
} from "../../../lib/raceData";
import RaceTabs from "./RaceTabs";

export const dynamic = "force-dynamic";

export default async function RacePage({ params }) {
  const { round } = await params;
  const season = 2026;
  const race = await getRace(season, Number(round));
  if (!race) notFound();

  const [results, lapTimes, tyreStints, weather, rcm, overtakes, practiceSessions] = await Promise.all([
    getResults(race.race_id),
    getLapTimesByDriver(race.race_id),
    getTyreStints(race.race_id),
    getWeatherSeries(race.race_id),
    getRaceControlMessages(race.race_id),
    getOvertakes(race.race_id),
    getPracticeSessions(race.race_id),
  ]);

  // Une entrée par séance ingérée (0 à 3 : EL1/EL2/EL3) — vide pour tous
  // les rounds hormis ceux dont le week-end est en cours.
  const practiceData = {};
  await Promise.all(
    practiceSessions.map(async (session) => {
      const [classification, laps, stints, sessionWeather] = await Promise.all([
        getPracticeClassification(session.session_key),
        getPracticeLapTimesByDriver(session.session_key),
        getPracticeStints(session.session_key),
        getPracticeWeather(session.session_key),
      ]);
      practiceData[session.session_name] = { session, classification, laps, stints, weather: sessionWeather };
    })
  );

  return (
    <main style={{ paddingTop: 32 }}>
      <p style={{ color: "var(--text-muted)", marginBottom: 4 }}>
        <Link href="/courses">← Toutes les courses</Link>
      </p>
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>
        Round {race.round} — {race.race_name}
      </h1>
      <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>
        {race.circuit_name}, {race.country} · {new Date(race.race_date).toLocaleDateString("fr-FR")}
      </p>
      <RaceTabs
        round={race.round}
        results={results}
        lapTimes={lapTimes}
        tyreStints={tyreStints}
        weather={weather}
        rcm={rcm}
        overtakes={overtakes}
        practiceData={practiceData}
      />
    </main>
  );
}
