"use client";

import { useMemo, useState } from "react";
import { ROUND1_ANALYSE_FR_HTML } from "../1/analyse-fr";
import { ROUND2_ANALYSE_FR_HTML } from "../2/analyse-fr";
import { ROUND3_ANALYSE_FR_HTML } from "../3/analyse-fr";
import { ROUND4_ANALYSE_FR_HTML } from "../4/analyse-fr";
import { ROUND5_ANALYSE_FR_HTML } from "../5/analyse-fr";
import { ROUND6_ANALYSE_FR_HTML } from "../6/analyse-fr";
import { ROUND7_ANALYSE_FR_HTML } from "../7/analyse-fr";
import { ROUND8_ANALYSE_FR_HTML } from "../8/analyse-fr";
import { ROUND9_ANALYSE_FR_HTML } from "../9/analyse-fr";
import { ROUND10_ANALYSE_FR_HTML } from "../10/analyse-fr";
import { ROUND11_ANALYSE_FR_HTML } from "../11/analyse-fr";
import { ROUND12_ANALYSE_FR_HTML } from "../12/analyse-fr";
import { ROUND13_EL1_FR_HTML } from "../13/el1-fr";
import { ROUND13_PREANALYSE_FR_HTML } from "../13/preanalyse-fr";
import { useRoundSpoilerState } from "../../../lib/spoilerGuard";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const COMPOUND_COLORS = {
  SOFT: "#E01A1A",
  MEDIUM: "#F5C400",
  HARD: "#D9D9D9",
  INTERMEDIATE: "#3CA845",
  WET: "#1F6FEB",
};

const DRIVER_LINE_COLORS = [
  "#E8002D", "#00A19B", "#FF8000", "#1B3A93", "#B01030",
  "#229971", "#FF87BC", "#6C98FF", "#C9A24B", "#555555",
];

function formatLap(seconds) {
  if (seconds == null) return "";
  const m = Math.floor(seconds / 60);
  const s = (seconds % 60).toFixed(3);
  return `${m}:${s.padStart(6, "0")}`;
}

// "Practice 1" (libellé OpenF1) -> "EL1" (libellé maison) — dans cet ordre
// d'affichage des sous-onglets, quelles que soient les séances déjà
// ingérées pour ce round.
const PRACTICE_LABELS = { "Practice 1": "EL1", "Practice 2": "EL2", "Practice 3": "EL3" };
const PRACTICE_ORDER = ["Practice 1", "Practice 2", "Practice 3"];

// Pré-analyses disponibles par round — écrites avant le week-end, donc
// jamais gatées par l'anti-spoiler (rien à spoiler dans un pronostic).
const PREANALYSE_HTML = { 13: ROUND13_PREANALYSE_FR_HTML };

export default function RaceTabs({ round, results, lapTimes, tyreStints, weather, rcm, overtakes, practiceData }) {
  const practiceSessions = PRACTICE_ORDER.filter((name) => practiceData && practiceData[name]);
  const hasPreAnalyse = Boolean(PREANALYSE_HTML[round]);
  const hasResults = results && results.length > 0;
  // Onglet par défaut : la dernière chose qui s'est réellement passée pour
  // ce round — l'analyse si la course a eu lieu, sinon la dernière séance
  // d'essais ingérée, sinon la pré-analyse.
  const [tab, setTab] = useState(() => {
    if (hasResults) return "analyse";
    if (practiceSessions.length) return practiceSessions[practiceSessions.length - 1];
    return hasPreAnalyse ? "preanalyse" : "analyse";
  });
  // Une seule source de vérité pour tout le round, partagée entre les
  // icônes 🔒 des onglets et les panneaux qui bloquent le contenu — cf.
  // le commentaire de useRoundSpoilerState sur le bug de désynchronisation
  // que ça évite.
  const spoiler = useRoundSpoilerState(round);

  return (
    <div>
      <div className="tabs" style={{ marginBottom: 24, flexWrap: "wrap" }}>
        {hasPreAnalyse && (
          <TabButton active={tab === "preanalyse"} onClick={() => setTab("preanalyse")}>
            Pré-analyse
          </TabButton>
        )}
        {practiceSessions.map((name) => (
          <GatedTabButton key={name} spoiler={spoiler} session={PRACTICE_LABELS[name]} active={tab === name} onClick={() => setTab(name)}>
            {PRACTICE_LABELS[name]}
          </GatedTabButton>
        ))}
        <GatedTabButton spoiler={spoiler} session="Race" active={tab === "analyse"} onClick={() => setTab("analyse")}>
          Analyse
        </GatedTabButton>
        <GatedTabButton spoiler={spoiler} session="Race" active={tab === "raw"} onClick={() => setTab("raw")}>
          Raw data
        </GatedTabButton>
      </div>

      {tab === "preanalyse" && hasPreAnalyse && (
        <div className="prose" dangerouslySetInnerHTML={{ __html: PREANALYSE_HTML[round] }} />
      )}
      {tab === "analyse" && (
        <SpoilerGate spoiler={spoiler} session="Race" label="l'analyse de cette course">
          <AnalyseTab round={round} />
        </SpoilerGate>
      )}
      {tab === "raw" && (
        <SpoilerGate spoiler={spoiler} session="Race" label="les données de course">
          <RawDataTab
            results={results}
            lapTimes={lapTimes}
            tyreStints={tyreStints}
            weather={weather}
            rcm={rcm}
            overtakes={overtakes}
          />
        </SpoilerGate>
      )}
      {practiceSessions.includes(tab) && (
        <SpoilerGate spoiler={spoiler} session={PRACTICE_LABELS[tab]} label={PRACTICE_LABELS[tab]}>
          <PracticeTab round={round} sessionName={tab} data={practiceData[tab]} />
        </SpoilerGate>
      )}
    </div>
  );
}

// Enveloppe une bascule tab standard d'un petit indicateur 🔒 si la séance
// n'est pas encore marquée vue — purement indicatif, le clic garde son
// comportement normal ; c'est SpoilerGate qui bloque réellement le contenu.
function GatedTabButton({ spoiler, session, active, onClick, children }) {
  const locked = spoiler.hydrated && !spoiler.isWatched(session);
  return (
    <TabButton active={active} onClick={onClick}>
      {children}
      {locked ? " 🔒" : ""}
    </TabButton>
  );
}

// Bloque l'affichage d'un panneau tant que sa séance n'est pas marquée vue.
// Un clic sur l'onglet ne suffit donc pas à révéler le contenu : il faut
// confirmer explicitement via ce bouton.
function SpoilerGate({ spoiler, session, label, children }) {
  if (!spoiler.hydrated) return null; // évite un flash de contenu avant l'hydratation
  if (spoiler.isWatched(session)) return children;
  return (
    <div style={{
      border: "1px dashed var(--border-strong)", borderRadius: 8, padding: "48px 24px",
      textAlign: "center", color: "var(--text-muted)", background: "var(--surface-raised)",
    }}>
      <p style={{ fontSize: 15, marginBottom: 16 }}>
        🙈 Anti-spoiler activé pour <strong>{label}</strong>.
      </p>
      <button className="bridge-btn" onClick={() => spoiler.markWatched(session)}>
        J'ai regardé — afficher
      </button>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button className="tabbtn" aria-selected={active} onClick={onClick}>
      {children}
    </button>
  );
}

function AnalyseTab({ round }) {
  if (round === 1) {
    return (
      <div className="prose" dangerouslySetInnerHTML={{ __html: ROUND1_ANALYSE_FR_HTML }} />
    );
  }
  if (round === 2) {
    return (
      <div className="prose" dangerouslySetInnerHTML={{ __html: ROUND2_ANALYSE_FR_HTML }} />
    );
  }
  if (round === 3) {
    return (
      <div className="prose" dangerouslySetInnerHTML={{ __html: ROUND3_ANALYSE_FR_HTML }} />
    );
  }
  if (round === 4) {
    return (
      <div className="prose" dangerouslySetInnerHTML={{ __html: ROUND4_ANALYSE_FR_HTML }} />
    );
  }
  if (round === 5) {
    return (
      <div className="prose" dangerouslySetInnerHTML={{ __html: ROUND5_ANALYSE_FR_HTML }} />
    );
  }
  if (round === 6) {
    return (
      <div className="prose" dangerouslySetInnerHTML={{ __html: ROUND6_ANALYSE_FR_HTML }} />
    );
  }
  if (round === 7) {
    return (
      <div className="prose" dangerouslySetInnerHTML={{ __html: ROUND7_ANALYSE_FR_HTML }} />
    );
  }
  if (round === 8) {
    return (
      <div className="prose" dangerouslySetInnerHTML={{ __html: ROUND8_ANALYSE_FR_HTML }} />
    );
  }
  if (round === 9) {
    return (
      <div className="prose" dangerouslySetInnerHTML={{ __html: ROUND9_ANALYSE_FR_HTML }} />
    );
  }
  if (round === 10) {
    return (
      <div className="prose" dangerouslySetInnerHTML={{ __html: ROUND10_ANALYSE_FR_HTML }} />
    );
  }
  if (round === 11) {
    return (
      <div className="prose" dangerouslySetInnerHTML={{ __html: ROUND11_ANALYSE_FR_HTML }} />
    );
  }
  if (round === 12) {
    return (
      <div className="prose" dangerouslySetInnerHTML={{ __html: ROUND12_ANALYSE_FR_HTML }} />
    );
  }
  return (
    <p style={{ color: "#888", lineHeight: 1.6, fontStyle: "italic" }}>
      Analyse pas encore rédigée pour cette course.
    </p>
  );
}

function PracticeAnalysis({ round, sessionName }) {
  if (round === 13 && sessionName === "Practice 1") {
    return <div className="prose" dangerouslySetInnerHTML={{ __html: ROUND13_EL1_FR_HTML }} />;
  }
  return (
    <p style={{ color: "#888", lineHeight: 1.6, fontStyle: "italic", marginBottom: 24 }}>
      Analyse pas encore rédigée pour cette séance — données brutes disponibles ci-dessous.
    </p>
  );
}

function PracticeTab({ round, sessionName, data }) {
  const { classification, laps, stints, weather } = data;
  const driverLabels = Object.keys(laps).sort();
  const defaultSelected = useMemo(() => {
    const top5 = classification.slice(0, 5).map((r) => r.name_acronym || r.full_name);
    return new Set(top5.length ? top5 : driverLabels.slice(0, 5));
  }, [classification, driverLabels]);
  const [selected, setSelected] = useState(defaultSelected);

  function toggleDriver(name) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  const chartData = useMemo(() => {
    const maxLap = Math.max(0, ...Object.values(laps).flatMap((l) => l.map((entry) => entry.lap)));
    const rows = [];
    for (let lap = 1; lap <= maxLap; lap++) {
      const row = { lap };
      for (const name of selected) {
        const entry = (laps[name] || []).find((l) => l.lap === lap);
        if (entry && entry.seconds && !entry.pitOut) row[name] = entry.seconds;
      }
      rows.push(row);
    }
    return rows;
  }, [laps, selected]);

  const stintsByDriver = useMemo(() => {
    const map = {};
    for (const s of stints) {
      if (!map[s.label]) map[s.label] = [];
      map[s.label].push(s);
    }
    return map;
  }, [stints]);
  const maxStintLap = Math.max(1, ...stints.map((s) => (s.lap_end ?? 0) - (s.lap_start ?? 0) + 1));

  return (
    <div style={{ display: "grid", gap: 36 }}>
      <PracticeAnalysis round={round} sessionName={sessionName} />

      <Section title="Classement par meilleur tour">
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {["Pos", "#", "Pilote", "Écurie", "Meilleur tour", "Tours chronométrés"].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classification.map((r, i) => (
                <tr key={r.car_number}>
                  <td style={tdStyle}>{i + 1}</td>
                  <td style={tdStyle}>{r.car_number}</td>
                  <td style={tdStyle}>{r.full_name}</td>
                  <td style={tdStyle}>{r.team_name || ""}</td>
                  <td style={tdStyle}>{r.best_lap != null ? formatLap(Number(r.best_lap)) : ""}</td>
                  <td style={tdStyle}>{r.timed_laps}/{r.total_laps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Temps au tour">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {driverLabels.map((name) => (
            <label key={name} style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
              <input type="checkbox" checked={selected.has(name)} onChange={() => toggleDriver(name)} />
              {name}
            </label>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="lap" label={{ value: "Tour", position: "insideBottom", offset: -4 }} />
            <YAxis domain={["dataMin - 1", "dataMax + 1"]} tickFormatter={formatLap} width={82} />
            <Tooltip formatter={(v) => formatLap(v)} labelFormatter={(l) => `Tour ${l}`} />
            <Legend />
            {[...selected].map((name, i) => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={DRIVER_LINE_COLORS[i % DRIVER_LINE_COLORS.length]}
                dot={false}
                connectNulls
                strokeWidth={1.5}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Section>

      <Section title="Relais pneus">
        <div style={{ display: "grid", gap: 6 }}>
          {Object.entries(stintsByDriver).map(([name, driverStints]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 90, fontSize: 13, flexShrink: 0 }}>{name}</span>
              <div style={{ display: "flex", flex: 1, height: 20, borderRadius: 4, overflow: "hidden", border: "1px solid #ccc" }}>
                {driverStints.map((s, i) => {
                  const laps = (s.lap_end ?? 0) - (s.lap_start ?? 0) + 1;
                  const width = Math.max(4, (laps / maxStintLap) * 100);
                  return (
                    <div
                      key={i}
                      title={`${s.compound} — tours ${s.lap_start}-${s.lap_end} (âge au départ : ${s.tyre_age_at_start ?? "?"})`}
                      style={{
                        width: `${width}%`,
                        background: COMPOUND_COLORS[s.compound] || "#999",
                        borderRight: "1px solid rgba(0,0,0,0.15)",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 12, fontSize: 12, color: "#666" }}>
          {Object.entries(COMPOUND_COLORS).map(([k, c]) => (
            <span key={k} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 10, height: 10, background: c, display: "inline-block", borderRadius: 2 }} />
              {k}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Météo (température piste/air)">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={weather} margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="minute" label={{ value: "Minute de session", position: "insideBottom", offset: -4 }} />
            <YAxis unit="°C" width={50} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="trackTemp" name="Température piste" stroke="#E8002D" dot={false} />
            <Line type="monotone" dataKey="airTemp" name="Température air" stroke="#1F6FEB" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Section>
    </div>
  );
}

function RawDataTab({ results, lapTimes, tyreStints, weather, rcm, overtakes }) {
  const driverNames = Object.keys(lapTimes).sort();
  const defaultSelected = useMemo(() => {
    const top5 = results.slice(0, 5).map((r) => r.family_name);
    return new Set(top5.length ? top5 : driverNames.slice(0, 5));
  }, [results, driverNames]);
  const [selected, setSelected] = useState(defaultSelected);

  function toggleDriver(name) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  // Fusionne les temps au tour de chaque pilote sélectionné en une seule série,
  // indexée par numéro de tour (format attendu par recharts).
  const chartData = useMemo(() => {
    const maxLap = Math.max(0, ...Object.values(lapTimes).flatMap((laps) => laps.map((l) => l.lap)));
    const rows = [];
    for (let lap = 1; lap <= maxLap; lap++) {
      const row = { lap };
      for (const name of selected) {
        const entry = (lapTimes[name] || []).find((l) => l.lap === lap);
        if (entry && entry.seconds && !entry.pitIn) row[name] = entry.seconds;
      }
      rows.push(row);
    }
    return rows;
  }, [lapTimes, selected]);

  const stintsByDriver = useMemo(() => {
    const map = {};
    for (const s of tyreStints) {
      if (!map[s.family_name]) map[s.family_name] = [];
      map[s.family_name].push(s);
    }
    return map;
  }, [tyreStints]);
  const maxAge = Math.max(1, ...tyreStints.map((s) => Number(s.age_laps) || 0));

  return (
    <div style={{ display: "grid", gap: 36 }}>
      <Section title="Résultats">
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {["Pos", "Pilote", "Écurie", "Grille", "Points", "Statut", "Écart"].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.driver_id}>
                  <td style={tdStyle}>{r.finish_position ?? "NC"}</td>
                  <td style={tdStyle}>{r.given_name} {r.family_name}</td>
                  <td style={tdStyle}>{r.team_name}</td>
                  <td style={tdStyle}>{r.grid}</td>
                  <td style={tdStyle}>{r.points}</td>
                  <td style={tdStyle}>{r.status}</td>
                  <td style={tdStyle}>{r.time_text || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Temps au tour">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
          {driverNames.map((name) => (
            <label key={name} style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
              <input type="checkbox" checked={selected.has(name)} onChange={() => toggleDriver(name)} />
              {name}
            </label>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="lap" label={{ value: "Tour", position: "insideBottom", offset: -4 }} />
            <YAxis
              domain={["dataMin - 1", "dataMax + 1"]}
              tickFormatter={formatLap}
              width={82}
            />
            <Tooltip formatter={(v) => formatLap(v)} labelFormatter={(l) => `Tour ${l}`} />
            <Legend />
            {[...selected].map((name, i) => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={DRIVER_LINE_COLORS[i % DRIVER_LINE_COLORS.length]}
                dot={false}
                connectNulls
                strokeWidth={1.5}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Section>

      <Section title="Stratégie pneus">
        <div style={{ display: "grid", gap: 6 }}>
          {Object.entries(stintsByDriver).map(([name, stints]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 110, fontSize: 13, flexShrink: 0 }}>{name}</span>
              <div style={{ display: "flex", flex: 1, height: 20, borderRadius: 4, overflow: "hidden", border: "1px solid #ccc" }}>
                {stints.map((s, i) => {
                  const width = Math.max(4, (Number(s.age_laps) / maxAge) * 100);
                  return (
                    <div
                      key={i}
                      title={`${s.compound}${s.is_new ? " (neuf)" : ""} — ${s.age_laps ?? "?"} tours`}
                      style={{
                        width: `${width}%`,
                        background: COMPOUND_COLORS[s.compound] || "#999",
                        borderRight: "1px solid rgba(0,0,0,0.15)",
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 12, fontSize: 12, color: "#666" }}>
          {Object.entries(COMPOUND_COLORS).map(([k, c]) => (
            <span key={k} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 10, height: 10, background: c, display: "inline-block", borderRadius: 2 }} />
              {k}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Météo (température piste/air)">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={weather} margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="minute" label={{ value: "Minute de session", position: "insideBottom", offset: -4 }} />
            <YAxis unit="°C" width={50} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="trackTemp" name="Température piste" stroke="#E8002D" dot={false} />
            <Line type="monotone" dataKey="airTemp" name="Température air" stroke="#1F6FEB" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Section>

      <Section title={`Messages de course (${rcm.length})`}>
        <div style={{ maxHeight: 320, overflowY: "auto", border: "1px solid #eee", borderRadius: 6 }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {["Heure", "Catégorie", "Message"].map((h) => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rcm.map((m, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{new Date(m.message_time).toLocaleTimeString("fr-FR")}</td>
                  <td style={tdStyle}>{m.category || ""}</td>
                  <td style={tdStyle}>{m.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {overtakes && overtakes.length > 0 && (
        <Section title={`Dépassements (${overtakes.length})`}>
          <div style={{ maxHeight: 320, overflowY: "auto", border: "1px solid #eee", borderRadius: 6 }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  {["Heure", "Dépasse", "Dépassé", "Position résultante"].map((h) => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {overtakes.map((o, i) => (
                  <tr key={i}>
                    <td style={tdStyle}>{new Date(o.overtake_time).toLocaleTimeString("fr-FR")}</td>
                    <td style={tdStyle}>{o.overtaking_driver}</td>
                    <td style={tdStyle}>{o.overtaken_driver}</td>
                    <td style={tdStyle}>{o.position ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <h2 style={{ fontSize: 18, marginBottom: 10 }}>{title}</h2>
      {children}
    </section>
  );
}

const tableStyle = { width: "100%", borderCollapse: "collapse", fontSize: 13 };
const thStyle = { textAlign: "left", padding: "6px 10px", borderBottom: "2px solid var(--border-strong)", background: "var(--surface-raised)", color: "var(--text-muted)" };
const tdStyle = { padding: "6px 10px", borderBottom: "1px solid var(--border)" };
