"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { fetchLapTelemetry } from "./telemetryActions";
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
import { ROUND12_ANALYSE_EN_HTML } from "../12/analyse-en";
import { ROUND13_EL1_FR_HTML } from "../13/el1-fr";
import { ROUND13_EL1_EN_HTML } from "../13/el1-en";
import { ROUND13_EL2_FR_HTML } from "../13/el2-fr";
import { ROUND13_EL2_EN_HTML } from "../13/el2-en";
import { ROUND13_EL3_FR_HTML } from "../13/el3-fr";
import { ROUND13_EL3_EN_HTML } from "../13/el3-en";
import { ROUND13_QUALI_FR_HTML } from "../13/quali-fr";
import { ROUND13_QUALI_EN_HTML } from "../13/quali-en";
import { ROUND13_ANALYSE_FR_HTML } from "../13/analyse-fr";
import { ROUND13_ANALYSE_EN_HTML } from "../13/analyse-en";
import { ROUND13_PREANALYSE_FR_HTML } from "../13/preanalyse-fr";
import { ROUND13_PREANALYSE_EN_HTML } from "../13/preanalyse-en";
import { ROUND14_PREANALYSE_FR_HTML } from "../14/preanalyse-fr";
import { ROUND14_PREANALYSE_EN_HTML } from "../14/preanalyse-en";
import { useRoundSpoilerState } from "../../../lib/spoilerGuard";
import { useLangPref } from "../../../lib/langPref";
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
// ingérées pour ce round. "Qualifying" est ingérée dans les mêmes tables
// practice_* (cf. commentaire d'ingest_openf1_practice.py) et réutilise donc
// le même composant PracticeTab — seul le libellé "Quali" et son ordre
// d'affichage (après l'EL3, avant l'Analyse) sont spécifiques.
const PRACTICE_LABELS = { "Practice 1": "EL1", "Practice 2": "EL2", "Practice 3": "EL3", "Qualifying": "Quali" };
const PRACTICE_ORDER = ["Practice 1", "Practice 2", "Practice 3", "Qualifying"];

// Pré-analyses disponibles par round — écrites avant le week-end, donc
// jamais gatées par l'anti-spoiler (rien à spoiler dans un pronostic).
const PREANALYSE_FR_HTML = { 13: ROUND13_PREANALYSE_FR_HTML, 14: ROUND14_PREANALYSE_FR_HTML };
const PREANALYSE_EN_HTML = { 13: ROUND13_PREANALYSE_EN_HTML, 14: ROUND14_PREANALYSE_EN_HTML };

// Traductions disponibles par round pour l'onglet Analyse — seuls les
// rounds listés ici ont une version anglaise ; les autres restent en
// français avec une note plutôt que de faire semblant d'avoir traduit.
const ANALYSE_EN_HTML = { 12: ROUND12_ANALYSE_EN_HTML, 13: ROUND13_ANALYSE_EN_HTML };

// Traductions anglaises des séances d'essais/qualifications écrites par
// round+séance — mêmes règles que ANALYSE_EN_HTML : pas de traduction
// listée ici, pas de mélange silencieux, une note explicite à la place.
const PRACTICE_EN_HTML = {
  13: {
    "Practice 1": ROUND13_EL1_EN_HTML,
    "Practice 2": ROUND13_EL2_EN_HTML,
    "Practice 3": ROUND13_EL3_EN_HTML,
    "Qualifying": ROUND13_QUALI_EN_HTML,
  },
};

export default function RaceTabs({ round, raceId, results, lapTimes, tyreStints, weather, rcm, overtakes, hasTelemetry, practiceData }) {
  const practiceSessions = PRACTICE_ORDER.filter((name) => practiceData && practiceData[name]);
  const hasPreAnalyse = Boolean(PREANALYSE_FR_HTML[round]);
  const hasResults = results && results.length > 0;
  const { lang, hydrated: langHydrated } = useLangPref();
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
        <PreAnalyseTab round={round} lang={lang} langHydrated={langHydrated} />
      )}
      {tab === "analyse" && (
        <SpoilerGate spoiler={spoiler} session="Race" label="l'analyse de cette course">
          <AnalyseTab round={round} lang={lang} langHydrated={langHydrated} />
        </SpoilerGate>
      )}
      {tab === "raw" && (
        <SpoilerGate spoiler={spoiler} session="Race" label="les données de course">
          <RawDataTab
            raceId={raceId}
            results={results}
            lapTimes={lapTimes}
            tyreStints={tyreStints}
            weather={weather}
            rcm={rcm}
            overtakes={overtakes}
            hasTelemetry={hasTelemetry}
          />
        </SpoilerGate>
      )}
      {practiceSessions.includes(tab) && (
        <SpoilerGate spoiler={spoiler} session={PRACTICE_LABELS[tab]} label={PRACTICE_LABELS[tab]}>
          <PracticeTab round={round} sessionName={tab} data={practiceData[tab]} lang={lang} langHydrated={langHydrated} />
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

function PreAnalyseTab({ round, lang, langHydrated }) {
  const enHtml = PREANALYSE_EN_HTML[round];
  const showEn = lang === "en" && Boolean(enHtml);
  return (
    <div className="prose">
      {langHydrated && lang === "en" && !showEn && (
        <p className="note" style={{ marginBottom: 16 }}>This preview isn't translated to English yet — showing the French version.</p>
      )}
      <div dangerouslySetInnerHTML={{ __html: showEn ? enHtml : PREANALYSE_FR_HTML[round] }} />
    </div>
  );
}

// Le repère "dans quel chapitre suis-je" (numéro de section collant dans la
// marge) est entièrement géré en CSS — cf. .sec-marker dans globals.css —
// depuis l'abandon d'un premier essai en bandeau JS sous l'en-tête, qui
// gênait la lecture et donnait l'impression de basculer de section trop
// tôt. Rien à faire ici : le HTML des articles (dangerouslySetInnerHTML)
// pose déjà .sec-marker en premier enfant de chaque <section data-num>.

// FR obligatoire pour tout round rédigé ; EN seulement pour ceux qui ont
// une vraie traduction (cf. commentaire sur ANALYSE_EN_HTML plus haut).
const ANALYSE_FR_HTML = {
  1: ROUND1_ANALYSE_FR_HTML,
  2: ROUND2_ANALYSE_FR_HTML,
  3: ROUND3_ANALYSE_FR_HTML,
  4: ROUND4_ANALYSE_FR_HTML,
  5: ROUND5_ANALYSE_FR_HTML,
  6: ROUND6_ANALYSE_FR_HTML,
  7: ROUND7_ANALYSE_FR_HTML,
  8: ROUND8_ANALYSE_FR_HTML,
  9: ROUND9_ANALYSE_FR_HTML,
  10: ROUND10_ANALYSE_FR_HTML,
  11: ROUND11_ANALYSE_FR_HTML,
  12: ROUND12_ANALYSE_FR_HTML,
  13: ROUND13_ANALYSE_FR_HTML,
};

function AnalyseTab({ round, lang, langHydrated }) {
  const frHtml = ANALYSE_FR_HTML[round];
  if (!frHtml) {
    return (
      <p style={{ color: "#888", lineHeight: 1.6, fontStyle: "italic" }}>
        Analyse pas encore rédigée pour cette course.
      </p>
    );
  }
  const enHtml = ANALYSE_EN_HTML[round];
  const showEn = lang === "en" && Boolean(enHtml);
  return (
    <div className="prose">
      {langHydrated && lang === "en" && !showEn && (
        <p className="note" style={{ marginBottom: 16 }}>This article isn't translated to English yet — showing the French version.</p>
      )}
      <div dangerouslySetInnerHTML={{ __html: showEn ? enHtml : frHtml }} />
    </div>
  );
}

// FR obligatoire pour toute séance rédigée ; EN seulement pour celles
// listées dans PRACTICE_EN_HTML (même règle que ANALYSE_EN_HTML).
const PRACTICE_FR_HTML = {
  13: {
    "Practice 1": ROUND13_EL1_FR_HTML,
    "Practice 2": ROUND13_EL2_FR_HTML,
    "Practice 3": ROUND13_EL3_FR_HTML,
    "Qualifying": ROUND13_QUALI_FR_HTML,
  },
};

function PracticeAnalysis({ round, sessionName, lang, langHydrated }) {
  const frHtml = PRACTICE_FR_HTML[round]?.[sessionName];
  if (!frHtml) {
    return (
      <p style={{ color: "#888", lineHeight: 1.6, fontStyle: "italic", marginBottom: 24 }}>
        Analyse pas encore rédigée pour cette séance — données brutes disponibles ci-dessous.
      </p>
    );
  }
  const enHtml = PRACTICE_EN_HTML[round]?.[sessionName];
  const showEn = lang === "en" && Boolean(enHtml);
  return (
    <div className="prose">
      {langHydrated && lang === "en" && !showEn && (
        <p className="note" style={{ marginBottom: 16 }}>This article isn't translated to English yet — showing the French version.</p>
      )}
      <div dangerouslySetInnerHTML={{ __html: showEn ? enHtml : frHtml }} />
    </div>
  );
}

function PracticeTab({ round, sessionName, data, lang, langHydrated }) {
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
  const hasAnyData = classification.length > 0 || driverLabels.length > 0 || stints.length > 0 || weather.length > 0;

  return (
    <div style={{ display: "grid", gap: 36 }}>
      <PracticeAnalysis round={round} sessionName={sessionName} lang={lang} langHydrated={langHydrated} />
      {!hasAnyData && (
        <NoRaceDataYet message="Données de séance pas encore disponibles — cette page se mettra à jour automatiquement une fois l'ingestion effectuée." />
      )}
      {hasAnyData && (
      <>

      <Section title="Classement par meilleur tour">
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                {["Pos", "#", "Pilote", "Écurie", "Meilleur tour", "Tours chronométrés"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classification.map((r, i) => (
                <tr key={r.car_number}>
                  <td>{i + 1}</td>
                  <td>{r.car_number}</td>
                  <td>{r.full_name}</td>
                  <td>{r.team_name || ""}</td>
                  <td>{r.best_lap != null ? formatLap(Number(r.best_lap)) : ""}</td>
                  <td>{r.timed_laps}/{r.total_laps}</td>
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
      </>
      )}
    </div>
  );
}

// Aucune des 6 sources (résultats, temps au tour, pneus, météo, RCM,
// dépassements) n'est disponible : le round n'a simplement pas encore été
// disputé, ou son ingestion n'a pas encore eu lieu. Plutôt que de laisser
// s'afficher des tableaux et graphiques recharts vides (silencieusement
// cassés, pas franchement "pas de données"), un message explicite — la
// demande initiale du site sur ce point : montrer clairement quand une
// source n'est pas encore disponible plutôt que de le laisser deviner.
function NoRaceDataYet({ message }) {
  return (
    <div style={{
      border: "1px dashed var(--border-strong)", borderRadius: 8, padding: "48px 24px",
      textAlign: "center", color: "var(--text-muted)", background: "var(--surface-raised)",
    }}>
      <p style={{ fontSize: 15 }}>📭 {message || "Données de course pas encore disponibles — cette page se mettra à jour automatiquement une fois la course disputée et les données ingérées."}</p>
    </div>
  );
}

// Sélection de pilotes pour UN graphique — un Set + toggle indépendants,
// pour que chaque section de Raw data garde son propre état plutôt que de
// partager une case à cocher globale (source de confusion : cocher un
// pilote pour comparer les temps au tour ne devrait pas aussi l'ajouter à
// la carte du circuit).
function useDriverSelection(defaultNames, maxSelected) {
  const [selected, setSelected] = useState(() => new Set(defaultNames));
  function toggle(name) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        if (maxSelected && next.size >= maxSelected) return prev; // plafond atteint, clic ignoré
        next.add(name);
      }
      return next;
    });
  }
  return [selected, toggle];
}

function DriverCheckboxes({ names, selected, onToggle, max }) {
  const atMax = max != null && selected.size >= max;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
      {names.map((name) => {
        const checked = selected.has(name);
        const disabled = !checked && atMax;
        return (
          <label
            key={name}
            style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 4, opacity: disabled ? 0.4 : 1 }}
          >
            <input type="checkbox" checked={checked} disabled={disabled} onChange={() => onToggle(name)} />
            {name}
          </label>
        );
      })}
    </div>
  );
}

function LapSelector({ value, onChange, maxLap }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 13 }}>
      <label>Tour :</label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #ccc" }}
      >
        {Array.from({ length: maxLap }, (_, i) => i + 1).map((lap) => (
          <option key={lap} value={lap}>{`Tour ${lap}`}</option>
        ))}
      </select>
    </div>
  );
}

// Charge la télémétrie d'UN tour à la demande (Server Action, cf.
// telemetryActions.js) — jamais au chargement de la page. `cancelled`
// évite d'écraser l'état avec la réponse d'une requête devenue obsolète
// si l'utilisateur change de tour rapidement. Un seul hook pour les deux
// sections qui en ont besoin (Vitesse par tour, Carte du circuit) : elles
// ont chacune leur propre tour choisi, donc chacune son propre appel.
function useLapTelemetry(raceId, lap, enabled) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!enabled || !raceId) return;
    let cancelled = false;
    setData(null);
    setError(false);
    fetchLapTelemetry(raceId, lap)
      .then((d) => { if (!cancelled) setData(d); })
      .catch(() => { if (!cancelled) setError(true); });
    return () => { cancelled = true; };
  }, [raceId, lap, enabled]);
  return { data, error };
}

// Interpole (x, y, distance, speed) à l'instant t depuis un tableau de
// points triés par point.t (recherche linéaire : ~300 points par tour,
// largement assez rapide à 60 fps pour 5 pilotes). Reste sur la première/
// dernière valeur hors plage plutôt que d'extrapoler.
function interpolateAt(points, t) {
  if (!points || points.length === 0) return null;
  if (t <= points[0].t) return points[0];
  const last = points[points.length - 1];
  if (t >= last.t) return last;
  let i = 1;
  while (i < points.length && points[i].t < t) i++;
  const p0 = points[i - 1], p1 = points[i];
  const frac = p1.t === p0.t ? 0 : (t - p0.t) / (p1.t - p0.t);
  return {
    x: p0.x + (p1.x - p0.x) * frac,
    y: p0.y + (p1.y - p0.y) * frac,
    distance: p0.distance + (p1.distance - p0.distance) * frac,
    speed: (p0.speed ?? 0) + ((p1.speed ?? 0) - (p0.speed ?? 0)) * frac,
  };
}

// Horloge de lecture : le tour réel dure ~1-2 minutes, bien trop long à
// regarder tel quel — compressé sur PLAYBACK_SECONDS de lecture quelle que
// soit la durée réelle du tour, pour un temps de visionnage constant.
const PLAYBACK_SECONDS = 14;

function useAnimationClock(maxDuration) {
  const [simTime, setSimTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {
    if (!playing || maxDuration <= 0) return;
    const scale = maxDuration / PLAYBACK_SECONDS;
    function step(now) {
      if (lastRef.current == null) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setSimTime((t) => {
        const next = t + dt * scale;
        if (next >= maxDuration) {
          setPlaying(false);
          return maxDuration;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastRef.current = null;
    };
  }, [playing, maxDuration]);

  return { simTime, setSimTime, playing, setPlaying };
}

// Réplay animé : jusqu'à 5 pilotes (plafond géré par DriverCheckboxes
// max={5}), positions synchronisées sur t_s (secondes depuis le début du
// tour, cf. schéma) plutôt que sur le numéro de tour seul — répond
// directement au retour "on ne distingue pas les différences" sur
// l'ancienne carte statique colorée par vitesse : ici l'écart entre
// pilotes se voit directement (points qui se dépassent) plutôt que par une
// nuance de couleur à deviner. Un seul tracé de circuit (pas de petits
// multiples) puisque la couleur code maintenant l'identité du pilote, pas
// la vitesse.
function RaceReplay({ telemetryData, selected }) {
  const names = useMemo(
    () => Object.keys(telemetryData).filter((n) => selected.has(n) && telemetryData[n]?.length > 1).sort(),
    [telemetryData, selected]
  );
  const colorOf = (name) => DRIVER_LINE_COLORS[names.indexOf(name) % DRIVER_LINE_COLORS.length];

  const { project, W, H, casingPoints } = useMemo(() => {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const name of names) {
      for (const p of telemetryData[name]) {
        if (p.x == null || p.y == null) continue;
        minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
        minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
      }
    }
    if (!isFinite(minX)) return { project: () => [0, 0], W: 480, H: 360, casingPoints: "" };
    const spanX = maxX - minX || 1;
    const spanY = maxY - minY || 1;
    const width = 480;
    const height = width * (spanY / spanX);
    const proj = (x, y) => [((x - minX) / spanX) * width, height - ((y - minY) / spanY) * height];
    // Tracé de fond = le pilote avec le plus d'échantillons (trajectoire la
    // plus complète), simple repère visuel du circuit.
    const ref = [...names].sort((a, b) => telemetryData[b].length - telemetryData[a].length)[0];
    const casing = ref
      ? telemetryData[ref].filter((p) => p.x != null && p.y != null).map((p) => proj(p.x, p.y).join(",")).join(" ")
      : "";
    return { project: proj, W: width, H: height, casingPoints: casing };
  }, [telemetryData, names]);

  const maxDuration = useMemo(
    () => Math.max(0, ...names.map((n) => telemetryData[n]?.at(-1)?.t ?? 0)),
    [telemetryData, names]
  );

  const { simTime, setSimTime, playing, setPlaying } = useAnimationClock(maxDuration);
  useEffect(() => { setSimTime(0); setPlaying(false); }, [telemetryData, setSimTime, setPlaying]);

  if (names.length === 0) return <p className="note">Aucun pilote sélectionné (5 maximum).</p>;

  const positionsNow = names.map((name) => ({
    name,
    color: colorOf(name),
    point: interpolateAt(telemetryData[name], simTime),
  }));
  const ranking = positionsNow.filter((d) => d.point).sort((a, b) => b.point.distance - a.point.distance);
  const pad = 16;

  return (
    <div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 320px", minWidth: 260 }}>
          <svg
            viewBox={`${-pad} ${-pad} ${W + pad * 2} ${H + pad * 2}`}
            style={{ width: "100%", height: "auto", aspectRatio: `${W + pad * 2} / ${H + pad * 2}`, background: "var(--surface-raised)", borderRadius: 8 }}
          >
            <polyline
              points={casingPoints}
              fill="none"
              stroke="var(--text-muted)"
              strokeOpacity={0.4}
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {positionsNow.map((d) => d.point && (
              <circle
                key={d.name}
                cx={project(d.point.x, d.point.y)[0]}
                cy={project(d.point.x, d.point.y)[1]}
                r={8}
                fill={d.color}
                stroke="#fff"
                strokeWidth={1.5}
              >
                <title>{`${d.name} — ${Math.round(d.point.speed)} km/h`}</title>
              </circle>
            ))}
          </svg>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8, fontSize: 12 }}>
            {positionsNow.map((d) => (
              <span key={d.name} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: d.color, display: "inline-block" }} />
                {d.name}
              </span>
            ))}
          </div>
        </div>
        <div style={{ flex: "0 0 160px" }}>
          <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 6 }}>Ordre à cet instant</p>
          <ol style={{ margin: 0, paddingLeft: 18, fontSize: 13 }}>
            {ranking.map((d) => (
              <li key={d.name} style={{ color: d.color, fontWeight: 600 }}>{d.name}</li>
            ))}
          </ol>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 16 }}>
        <button className="bridge-btn" onClick={() => setPlaying((p) => !p)}>
          {playing ? "⏸ Pause" : "▶ Lecture"}
        </button>
        <input
          type="range"
          min={0}
          max={maxDuration}
          step={0.05}
          value={simTime}
          onChange={(e) => { setPlaying(false); setSimTime(Number(e.target.value)); }}
          style={{ flex: 1 }}
        />
        <span style={{ fontSize: 12, color: "var(--text-muted)", width: 46, textAlign: "right" }}>{simTime.toFixed(1)}s</span>
      </div>
    </div>
  );
}

function RawDataTab({ raceId, results, lapTimes, tyreStints, weather, rcm, overtakes, hasTelemetry }) {
  const driverNames = Object.keys(lapTimes).sort();
  const top5 = useMemo(() => {
    const t = results.slice(0, 5).map((r) => r.family_name);
    return t.length ? t : driverNames.slice(0, 5);
  }, [results, driverNames]);
  const top2 = useMemo(() => (top5.length ? top5.slice(0, 2) : driverNames.slice(0, 2)), [top5, driverNames]);

  // Sélection de pilotes INDÉPENDANTE par graphique — cocher un pilote sur
  // "Temps au tour" n'affecte pas "Position par tour" ni les deux
  // graphiques de télémétrie : chacun garde son propre état, chacun
  // démarre avec un défaut raisonnable (top 5, top 2 pour la carte du
  // circuit dont chaque pilote coché ajoute un panneau entier).
  const [selectedLapTimes, toggleLapTimesDriver] = useDriverSelection(top5);
  const [selectedPosition, togglePositionDriver] = useDriverSelection(top5);
  const [selectedSpeed, toggleSpeedDriver] = useDriverSelection(top5);
  // 5 maximum pour le réplay animé : au-delà, les points se chevauchent
  // trop pour rester lisibles (cf. DriverCheckboxes max={5} plus bas).
  const [selectedMap, toggleMapDriver] = useDriverSelection(top2, 5);

  // Fusionne les temps au tour de chaque pilote sélectionné en une seule série,
  // indexée par numéro de tour (format attendu par recharts).
  const chartData = useMemo(() => {
    const maxLap = Math.max(0, ...Object.values(lapTimes).flatMap((laps) => laps.map((l) => l.lap)));
    const rows = [];
    for (let lap = 1; lap <= maxLap; lap++) {
      const row = { lap };
      for (const name of selectedLapTimes) {
        const entry = (lapTimes[name] || []).find((l) => l.lap === lap);
        if (entry && entry.seconds && !entry.pitIn) row[name] = entry.seconds;
      }
      rows.push(row);
    }
    return rows;
  }, [lapTimes, selectedLapTimes]);

  // Position sur piste tour par tour : pas un flux OpenF1 dédié (jamais
  // ingéré, cf. docs/DATA_SOURCES.md) mais dérivée de session_time (temps
  // cumulé dans la session à chaque tour, déjà ingéré pour le graphique de
  // temps au tour ci-dessus) — trier TOUS les pilotes ayant couru ce tour
  // par ce temps cumulé donne directement leur position à ce moment-là.
  // Le classement est calculé sur l'ensemble des pilotes (pas seulement
  // ceux cochés) avant de filtrer sur `selectedPosition`, pour rester exact
  // même quand un pilote non affiché reste dans le peloton.
  const positionData = useMemo(() => {
    const maxLap = Math.max(0, ...Object.values(lapTimes).flatMap((laps) => laps.map((l) => l.lap)));
    const rows = [];
    for (let lap = 1; lap <= maxLap; lap++) {
      const atLap = [];
      for (const [name, laps] of Object.entries(lapTimes)) {
        const entry = laps.find((l) => l.lap === lap);
        if (entry && entry.sessionSeconds != null) atLap.push({ name, t: entry.sessionSeconds });
      }
      atLap.sort((a, b) => a.t - b.t);
      const row = { lap };
      atLap.forEach((d, i) => {
        if (selectedPosition.has(d.name)) row[d.name] = i + 1;
      });
      rows.push(row);
    }
    return rows;
  }, [lapTimes, selectedPosition]);
  const driverCount = driverNames.length;
  const maxLap = useMemo(
    () => Math.max(0, ...Object.values(lapTimes).flatMap((laps) => laps.map((l) => l.lap))),
    [lapTimes]
  );

  // Gomme utilisée à chaque tour, par pilote — dérivée de tyreStints
  // (start_lap + age_laps = longueur du relais, cf. commentaire de
  // getTyreStints) plutôt qu'ingérée séparément : la donnée existe déjà.
  const compoundAtLap = useMemo(() => {
    const map = {};
    for (const s of tyreStints) {
      if (!map[s.family_name]) map[s.family_name] = {};
      const start = s.start_lap;
      const len = Number(s.age_laps) || 0;
      for (let lap = start; lap < start + len; lap++) map[s.family_name][lap] = s.compound;
    }
    return map;
  }, [tyreStints]);
  const compoundsUsed = useMemo(() => {
    const set = new Set(tyreStints.map((s) => s.compound).filter(Boolean));
    return Object.keys(COMPOUND_COLORS).filter((c) => set.has(c));
  }, [tyreStints]);

  // Meilleur tour, toutes gommes confondues puis par gomme — même
  // sélection de pilotes que "Temps au tour" juste au-dessus (c'est une
  // extension directe de cette comparaison, pas un graphique séparé).
  const bestLapRows = useMemo(() => {
    return [...selectedLapTimes].map((name) => {
      const laps = (lapTimes[name] || []).filter((l) => l.seconds && !l.pitIn);
      const overall = laps.length ? Math.min(...laps.map((l) => l.seconds)) : null;
      const byCompound = {};
      for (const c of compoundsUsed) {
        const compLaps = laps.filter((l) => compoundAtLap[name]?.[l.lap] === c);
        byCompound[c] = compLaps.length ? Math.min(...compLaps.map((l) => l.seconds)) : null;
      }
      return { name, overall, byCompound };
    });
  }, [selectedLapTimes, lapTimes, compoundsUsed, compoundAtLap]);

  // Temps moyen par tranche de 5 tours (non glissant : tours 1-5, 6-10, …)
  // — lisse le trafic, une erreur isolée ou une bataille/dépassement sur
  // UN tour, qui rendent la comparaison tour par tour bruyante.
  const bucketAvgData = useMemo(() => {
    const bucketSize = 5;
    const rows = [];
    for (let start = 1; start <= maxLap; start += bucketSize) {
      const end = Math.min(start + bucketSize - 1, maxLap);
      const row = { bucket: start === end ? `T${start}` : `T${start}-${end}` };
      for (const name of selectedLapTimes) {
        const laps = (lapTimes[name] || []).filter((l) => l.lap >= start && l.lap <= end && l.seconds && !l.pitIn);
        if (laps.length) row[name] = laps.reduce((a, l) => a + l.seconds, 0) / laps.length;
      }
      rows.push(row);
    }
    return rows;
  }, [lapTimes, selectedLapTimes, maxLap]);

  // Vitesse par tour + carte du circuit : chargées à la demande via Server
  // Action (pas au chargement de la page — cf. commentaire de
  // telemetryActions.js), chacune pour le seul tour choisi dans SON PROPRE
  // sélecteur — les deux graphiques sont indépendants l'un de l'autre,
  // comme la sélection de pilotes.
  const [speedLap, setSpeedLap] = useState(1);
  const { data: speedData, error: speedError } = useLapTelemetry(raceId, speedLap, hasTelemetry);
  const [mapLap, setMapLap] = useState(1);
  const { data: mapData, error: mapError } = useLapTelemetry(raceId, mapLap, hasTelemetry);

  const stintsByDriver = useMemo(() => {
    const map = {};
    for (const s of tyreStints) {
      if (!map[s.family_name]) map[s.family_name] = [];
      map[s.family_name].push(s);
    }
    return map;
  }, [tyreStints]);
  const maxAge = Math.max(1, ...tyreStints.map((s) => Number(s.age_laps) || 0));

  const hasAnyData = results.length > 0 || driverNames.length > 0 || tyreStints.length > 0
    || weather.length > 0 || rcm.length > 0 || (overtakes && overtakes.length > 0);
  if (!hasAnyData) return <NoRaceDataYet />;

  return (
    <div style={{ display: "grid", gap: 36 }}>
      <Section title="Résultats">
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                {["Pos", "Pilote", "Écurie", "Grille", "Points", "Statut", "Écart"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.driver_id}>
                  <td>{r.finish_position ?? "NC"}</td>
                  <td>{r.given_name} {r.family_name}</td>
                  <td>{r.team_name}</td>
                  <td>{r.grid}</td>
                  <td>{r.points}</td>
                  <td>{r.status}</td>
                  <td>{r.time_text || ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Temps au tour">
        <DriverCheckboxes names={driverNames} selected={selectedLapTimes} onToggle={toggleLapTimesDriver} />
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
            {[...selectedLapTimes].map((name, i) => (
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

        <p style={{ fontSize: 13, fontWeight: 600, margin: "24px 0 10px" }}>Meilleur tour</p>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Pilote</th>
                <th>Toutes gommes</th>
                {compoundsUsed.map((c) => <th key={c}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {bestLapRows.map((r) => (
                <tr key={r.name}>
                  <td>{r.name}</td>
                  <td>{r.overall != null ? formatLap(r.overall) : "—"}</td>
                  {compoundsUsed.map((c) => (
                    <td key={c}>{r.byCompound[c] != null ? formatLap(r.byCompound[c]) : "—"}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ fontSize: 13, fontWeight: 600, margin: "24px 0 10px" }}>Temps moyen par tranche de 5 tours</p>
        <p className="note" style={{ marginBottom: 12 }}>
          Lisse les effets de trafic, d'une erreur isolée ou d'une bataille/dépassement sur un seul tour — moyenne par groupe de 5 tours (1-5, 6-10, …), pas une moyenne glissante.
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={bucketAvgData} margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="bucket" />
            <YAxis domain={["dataMin - 1", "dataMax + 1"]} tickFormatter={formatLap} width={82} />
            <Tooltip formatter={(v) => formatLap(v)} />
            <Legend />
            {[...selectedLapTimes].map((name, i) => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={DRIVER_LINE_COLORS[i % DRIVER_LINE_COLORS.length]}
                dot={{ r: 3 }}
                connectNulls
                strokeWidth={1.5}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </Section>

      <Section title="Position par tour">
        <p className="note" style={{ marginBottom: 12 }}>
          Calculée à partir du temps cumulé sur piste à chaque tour (pas un flux de position officiel — jamais ingéré, cf. docs/DATA_SOURCES.md) : peut différer ponctuellement du classement officiel autour d'une neutralisation ou d'un drapeau rouge.
        </p>
        <DriverCheckboxes names={driverNames} selected={selectedPosition} onToggle={togglePositionDriver} />
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={positionData} margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="lap" label={{ value: "Tour", position: "insideBottom", offset: -4 }} />
            <YAxis
              type="number"
              domain={[1, Math.max(1, driverCount)]}
              reversed
              allowDecimals={false}
              width={40}
            />
            <Tooltip formatter={(v) => `P${v}`} labelFormatter={(l) => `Tour ${l}`} />
            <Legend />
            {[...selectedPosition].map((name, i) => (
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

      {hasTelemetry && (
        <Section title="Vitesse par tour">
          <p className="note" style={{ marginBottom: 12 }}>
            Distance depuis le début du tour, mesurée par la position réelle sur circuit (endpoint OpenF1 `location`) — pas une approximation par intégration de la vitesse. Vitesse interpolée sur cette même grille de position (grilles temporelles `location`/`car_data` indépendantes côté OpenF1) — cf. docs/DATA_SOURCES.md.
          </p>
          <LapSelector value={speedLap} onChange={setSpeedLap} maxLap={maxLap} />
          <DriverCheckboxes names={driverNames} selected={selectedSpeed} onToggle={toggleSpeedDriver} />
          {speedError && <p className="note">Erreur de chargement de la télémétrie pour ce tour.</p>}
          {!speedError && !speedData && <p className="note">Chargement…</p>}
          {speedData && (
            <ResponsiveContainer width="100%" height={360}>
              <LineChart margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis
                  dataKey="distance"
                  type="number"
                  domain={["dataMin", "dataMax"]}
                  unit=" m"
                  label={{ value: "Distance depuis le début du tour (m)", position: "insideBottom", offset: -4 }}
                />
                <YAxis dataKey="speed" domain={["dataMin - 10", "dataMax + 10"]} unit=" km/h" width={70} />
                <Tooltip formatter={(v) => `${Math.round(v)} km/h`} labelFormatter={(l) => `${Math.round(l)} m`} />
                <Legend />
                {[...selectedSpeed].map((name, i) => (
                  speedData[name] ? (
                    <Line
                      key={name}
                      data={speedData[name]}
                      dataKey="speed"
                      name={name}
                      type="monotone"
                      stroke={DRIVER_LINE_COLORS[i % DRIVER_LINE_COLORS.length]}
                      dot={false}
                      strokeWidth={1.5}
                      isAnimationActive={false}
                    />
                  ) : null
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}
        </Section>
      )}

      {hasTelemetry && (
        <Section title="Réplay animé">
          <p className="note" style={{ marginBottom: 12 }}>
            Position réelle sur circuit (endpoint OpenF1 `location`), jusqu'à 5 pilotes, synchronisés sur le temps écoulé depuis le début du tour choisi — pour voir directement qui est devant à quel moment, plutôt que de deviner une différence de couleur. Lecture compressée sur {PLAYBACK_SECONDS}s quelle que soit la durée réelle du tour.
          </p>
          <LapSelector value={mapLap} onChange={setMapLap} maxLap={maxLap} />
          <DriverCheckboxes names={driverNames} selected={selectedMap} onToggle={toggleMapDriver} max={5} />
          {mapError && <p className="note">Erreur de chargement de la télémétrie pour ce tour.</p>}
          {!mapError && !mapData && <p className="note">Chargement…</p>}
          {mapData && <RaceReplay telemetryData={mapData} selected={selectedMap} />}
        </Section>
      )}

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
        <div className="tablewrap" style={{ maxHeight: 320, overflowY: "auto" }}>
          <table>
            <thead>
              <tr>
                {["Heure", "Catégorie", "Message"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rcm.map((m, i) => (
                <tr key={i}>
                  <td>{new Date(m.message_time).toLocaleTimeString("fr-FR")}</td>
                  <td>{m.category || ""}</td>
                  <td>{m.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {overtakes && overtakes.length > 0 && (
        <Section title={`Dépassements (${overtakes.length})`}>
          <div className="tablewrap" style={{ maxHeight: 320, overflowY: "auto" }}>
            <table>
              <thead>
                <tr>
                  {["Heure", "Dépasse", "Dépassé", "Position résultante"].map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {overtakes.map((o, i) => (
                  <tr key={i}>
                    <td>{new Date(o.overtake_time).toLocaleTimeString("fr-FR")}</td>
                    <td>{o.overtaking_driver}</td>
                    <td>{o.overtaken_driver}</td>
                    <td>{o.position ?? ""}</td>
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
