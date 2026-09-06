"use client";

import Link from "next/link";
import { useRoundSpoilerState, useFrontierRound } from "../lib/spoilerGuard";
import { teamColor } from "../lib/teamColors";
import SeasonCalendar from "./courses/SeasonCalendar";

const DAY_MS = 86400000;

function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((new Date(dateStr) - today) / DAY_MS);
}

// Tableau de bord de l'accueil — remplace l'ancien contenu figé
// (content.js) qui hébergeait lui-même l'analyse de la dernière course et
// la pré-analyse du prochain GP. Ces deux textes vivent désormais chacun
// à leur unique adresse (/courses/[round]) ; cette page ne fait plus que
// pointer vers eux avec les faits qui ne spoilent rien (nom, date,
// circuit) plus, pour le dernier résultat, le podium — protégé par le
// même anti-spoiler que les pages de course.
export default function HomeDashboard({ lastCompleted, nextRace, races, driversByRound, constructorsByRound }) {
  return (
    <main style={{ paddingTop: 32 }}>
      <div className="dash-grid">
        {lastCompleted && <LastResultCard race={lastCompleted} />}
        {nextRace && <NextRaceCard race={nextRace} />}
      </div>

      <section style={{ marginTop: 40 }}>
        <h2 style={{ fontSize: 22, marginBottom: 4 }}>Calendrier de la saison</h2>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 18 }}>
          Vue liste ou carte, avec le tracé de la tournée mondiale.
        </p>
        <SeasonCalendar races={races} />
      </section>

      <section style={{ marginTop: 40, marginBottom: 40 }}>
        <StandingsSnapshot driversByRound={driversByRound} constructorsByRound={constructorsByRound} />
      </section>
    </main>
  );
}

function LastResultCard({ race }) {
  const spoiler = useRoundSpoilerState(race.round);
  const podium = race.results.slice(0, 3);

  return (
    <div className="dash-card">
      <p className="eyebrow" style={{ marginBottom: 8 }}>Dernier résultat</p>
      <h3 className="dash-card-title">
        <span className="geo-code">{race.geo.code}</span> {race.race_name}
      </h3>
      <p className="dash-card-meta">
        {race.circuit_name}, {race.country} · {new Date(race.race_date).toLocaleDateString("fr-FR")}
      </p>

      {!spoiler.hydrated ? null : spoiler.isWatched("Race") ? (
        <>
          <div className="resultstrip" style={{ marginTop: 14 }}>
            {podium.map((r) => (
              <div className="chip" key={r.driver_id}>
                <span className="pos">P{r.finish_position}</span>
                <span className="dot" style={{ background: teamColor(r.team_name) }} />
                <span className="drv">{r.family_name}</span>
                <span className="gap">{r.team_name}</span>
              </div>
            ))}
          </div>
          <Link href={`/courses/${race.round}`} className="bridge-btn" style={{ textDecoration: "none", display: "inline-block", marginTop: 16 }}>
            Lire l'analyse complète →
          </Link>
        </>
      ) : (
        <div style={{ marginTop: 14 }}>
          <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12 }}>
            🙈 Résultat masqué par l'anti-spoiler.
          </p>
          <button className="bridge-btn" onClick={() => spoiler.markWatched("Race")}>
            J'ai regardé — afficher
          </button>
        </div>
      )}
    </div>
  );
}

function NextRaceCard({ race }) {
  const days = daysUntil(race.race_date);
  const when = race.status === "live" ? "Ce week-end" : days === 0 ? "Aujourd'hui" : days === 1 ? "Demain" : `Dans ${days} jours`;
  return (
    <div className="dash-card">
      <p className="eyebrow" style={{ marginBottom: 8 }}>Prochain Grand Prix</p>
      <h3 className="dash-card-title">
        <span className="geo-code">{race.geo.code}</span> {race.race_name}
      </h3>
      <p className="dash-card-meta">
        {race.circuit_name}, {race.country} · {new Date(race.race_date).toLocaleDateString("fr-FR")}
      </p>
      <div className="resultstrip" style={{ marginTop: 14 }}>
        <div className="chip">
          <span className="pos">{when}</span>
        </div>
      </div>
      <Link href={`/courses/${race.round}`} className="bridge-btn" style={{ textDecoration: "none", display: "inline-block", marginTop: 16 }}>
        Voir le programme du week-end →
      </Link>
    </div>
  );
}

function StandingsSnapshot({ driversByRound, constructorsByRound }) {
  const availableRounds = Object.keys(driversByRound).map(Number).sort((a, b) => a - b);
  const { frontier, hydrated } = useFrontierRound(availableRounds);
  if (!hydrated || !availableRounds.length) return null;

  const drivers = (driversByRound[frontier] || []).slice(0, 3);
  const constructors = (constructorsByRound[frontier] || []).slice(0, 3);
  if (!drivers.length) return null;

  return (
    <div className="dash-card">
      <p className="eyebrow" style={{ marginBottom: 8 }}>Classement (après round {frontier})</p>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <div>
          <p className="dash-card-meta" style={{ marginBottom: 8 }}>Pilotes</p>
          <ol style={{ margin: 0, paddingLeft: 20, fontSize: 14 }}>
            {drivers.map((d, i) => (
              <li key={i} style={{ marginBottom: 4 }}>
                <span className="dot" style={{ background: teamColor(d.team_name), marginRight: 6 }} />
                {d.given_name} {d.family_name} — <span className="mono">{d.points} pts</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <p className="dash-card-meta" style={{ marginBottom: 8 }}>Constructeurs</p>
          <ol style={{ margin: 0, paddingLeft: 20, fontSize: 14 }}>
            {constructors.map((c, i) => (
              <li key={i} style={{ marginBottom: 4 }}>
                <span className="dot" style={{ background: teamColor(c.team_name), marginRight: 6 }} />
                {c.team_name} — <span className="mono">{c.points} pts</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <Link href="/classement" className="bridge-btn" style={{ textDecoration: "none", display: "inline-block", marginTop: 16 }}>
        Voir le classement complet →
      </Link>
    </div>
  );
}
