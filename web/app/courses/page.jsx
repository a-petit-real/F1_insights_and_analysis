import Link from "next/link";
import { getSeasonSchedule } from "../../lib/raceData";

export const dynamic = "force-dynamic"; // toujours les données à jour, pas de cache statique

export default async function CoursesIndex() {
  const season = 2026;
  const races = await getSeasonSchedule(season);
  const today = new Date();

  return (
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 28, marginBottom: 4 }}>Saison {season}</h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        <Link href="/">← Retour à The Pit Wall</Link> · <Link href="/classement">Classement</Link>
      </p>
      <div style={{ display: "grid", gap: 10 }}>
        {races.map((r) => {
          const raced = new Date(r.race_date) <= today;
          return (
            <Link
              key={r.round}
              href={`/courses/${r.round}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 18px",
                border: "1px solid #ddd",
                borderRadius: 8,
                textDecoration: "none",
                color: "inherit",
                opacity: raced ? 1 : 0.5,
              }}
            >
              <span>
                <strong>Round {r.round}</strong> — {r.race_name}
                <span style={{ color: "#888" }}> · {r.circuit_name}, {r.country}</span>
              </span>
              <span style={{ color: "#888", fontSize: 14 }}>
                {new Date(r.race_date).toLocaleDateString("fr-FR")}
                {!raced && " · à venir"}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
