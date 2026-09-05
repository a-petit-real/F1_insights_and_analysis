import Link from "next/link";
import { getDriverStandingsAllRounds, getConstructorStandingsAllRounds } from "../../lib/raceData";
import StandingsView from "./StandingsView";

export const dynamic = "force-dynamic";

export default async function StandingsPage() {
  const season = 2026;
  const [driversByRound, constructorsByRound] = await Promise.all([
    getDriverStandingsAllRounds(season),
    getConstructorStandingsAllRounds(season),
  ]);

  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px", fontFamily: "system-ui, sans-serif" }}>
      <p style={{ color: "#666", marginBottom: 4 }}>
        <Link href="/">← The Pit Wall</Link>
      </p>
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>Classement — saison {season}</h1>
      <p style={{ color: "#888", marginBottom: 24 }}>
        Protégé par l'anti-spoiler : figé au dernier Grand Prix que vous avez marqué comme vu.
      </p>
      <StandingsView driversByRound={driversByRound} constructorsByRound={constructorsByRound} />
    </main>
  );
}
