"use client";

import { useEffect, useMemo, useState } from "react";
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
import { ROUND14_EL1_FR_HTML } from "../14/el1-fr";
import { ROUND14_EL2_FR_HTML } from "../14/el2-fr";
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
import { PTW_PICKS } from "../../../lib/ptwPicks";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  Cell,
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

// Repli catégorique pour un pilote dont l'écurie n'est pas reconnue par
// TEAM_COLORS (pilote de réserve, libellé inhabituel) — ne devrait
// normalement jamais servir sur le Raw data, cf. useDriverColors.
const DRIVER_LINE_COLORS = [
  "#E8002D", "#00A19B", "#FF8000", "#1B3A93", "#B01030",
  "#229971", "#FF87BC", "#6C98FF", "#C9A24B", "#555555",
];

// Couleurs officielles par écurie (grille 2026) — le second pilote d'une
// écurie reçoit une teinte éclaircie de la même couleur plutôt qu'une
// couleur arbitraire : l'écurie se reconnaît au premier coup d'œil, comme
// sur les graphiques de télémétrie officiels, et les deux coéquipiers
// restent visuellement liés d'un graphique à l'autre. Correspondance par
// mot-clé (pas une égalité stricte) : team_name suit la nomenclature de
// la source Jolpica, qui peut varier légèrement ("RB F1 Team",
// "Racing Bulls", ...) — cf. docs/DESIGN_SYSTEM.md.
const TEAM_COLORS = [
  [/red bull/i, "#1B3A93"],
  [/ferrari/i, "#E8002D"],
  [/mercedes/i, "#00A19B"],
  [/mclaren/i, "#FF8000"],
  [/aston martin/i, "#229971"],
  [/alpine/i, "#FF87BC"],
  [/williams/i, "#6C98FF"],
  [/haas/i, "#8C9096"],
  [/\brb\b|racing bulls/i, "#4E5AE8"],
  [/audi|sauber/i, "#2B2B2B"],
  [/cadillac/i, "#C9A24B"],
];

function teamColorFor(teamName) {
  if (!teamName) return null;
  const hit = TEAM_COLORS.find(([re]) => re.test(teamName));
  return hit ? hit[1] : null;
}

// Éclaircit une couleur hex de `amount` (0-1) vers le blanc — distingue
// les deux pilotes d'une même écurie sans sortir de sa couleur.
function lighten(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const mix = (c) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

// Une couleur PAR PILOTE (pas par position dans la sélection courante) :
// un pilote garde la même couleur sur les 4 graphiques du Raw data, qu'il
// soit coché seul ou aux côtés de 4 autres — l'inverse de l'ancien schéma
// (couleur = index dans `selected`), qui changeait la couleur d'un pilote
// d'un graphique à l'autre selon qui d'autre était coché ailleurs.
function useDriverColors(driverNames, results) {
  const key = driverNames.join("|");
  return useMemo(() => {
    const teamOf = {};
    for (const r of results) teamOf[r.family_name] = r.team_name;
    const seenPerTeam = {};
    const colors = {};
    let fallbackIndex = 0;
    for (const name of driverNames) {
      const team = teamOf[name];
      const base = teamColorFor(team);
      if (base) {
        const seen = seenPerTeam[team] || 0;
        seenPerTeam[team] = seen + 1;
        colors[name] = seen === 0 ? base : lighten(base, 0.42);
      } else {
        colors[name] = DRIVER_LINE_COLORS[fallbackIndex % DRIVER_LINE_COLORS.length];
        fallbackIndex++;
      }
    }
    return colors;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, results]);
}

// Un temps de tour dans l'absolu (1:27.532) ne se compare pas d'un coup
// d'œil — c'est l'ÉCART qui compte (retour utilisateur : "un temps dans
// l'absolu c'est useless"). Les trois comparaisons de temps au tour
// (Temps au tour, Meilleur tour, Temps moyen par tranche de 5 tours)
// affichent donc l'écart au plus rapide du groupe sélectionné (0 pour le
// plus rapide, +0.312 pour les autres) plutôt que le temps brut — même
// convention que les écrans de chronométrage officiels F1. Un ralentissement
// général (safety car, drapeau rouge) touche tout le monde à peu près
// pareil et s'annule donc naturellement dans l'écart, sans recadrage
// d'échelle nécessaire.
function toGapRows(valuesByKey) {
  const vals = Object.values(valuesByKey).filter((v) => v != null);
  const min = vals.length ? Math.min(...vals) : null;
  const gaps = {};
  for (const [key, v] of Object.entries(valuesByKey)) {
    if (v == null || min == null) continue;
    gaps[key] = v - min;
    gaps[`${key}__abs`] = v;
  }
  return gaps;
}

function formatGap(seconds) {
  if (seconds == null) return "";
  return seconds < 0.0005 ? "au plus rapide" : `+${seconds.toFixed(3)}s`;
}

// Domaine d'axe borné au 95e percentile des écarts plutôt qu'à leur max
// brut : le plancher reste fixé à 0 (le plus rapide, par construction),
// seul le haut est recadré pour qu'un décrochage isolé (accrochage,
// erreur de pilotage) n'écrase pas la lisibilité du reste du peloton.
function trimmedGapDomain(values, pad = 0.15) {
  const sorted = values.filter((v) => v != null).sort((a, b) => a - b);
  if (sorted.length === 0) return [0, 1];
  const hi = sorted[Math.min(sorted.length - 1, Math.floor(0.95 * (sorted.length - 1)))];
  return [0, hi + pad];
}

// Infobulle partagée par les 3 comparaisons : écart en premier (ce qui
// compte), temps absolu entre parenthèses pour qui le veut quand même —
// lu depuis la clé jumelle `<nom>__abs` posée par toGapRows.
function GapTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const rows = payload.filter((p) => !p.dataKey.endsWith("__abs") && p.value != null);
  if (!rows.length) return null;
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border-strong)", borderRadius: 8, padding: "8px 10px", fontSize: 12 }}>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {[...rows].sort((a, b) => a.value - b.value).map((p) => {
        const abs = p.payload[`${p.dataKey}__abs`];
        return (
          <div key={p.dataKey}>
            <strong>{p.dataKey}</strong> : {formatGap(p.value)}{abs != null ? ` (${formatLap(abs)})` : ""}
          </div>
        );
      })}
    </div>
  );
}

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

export default function RaceTabs({ round, raceId, results, lapTimes, tyreStints, weather, rcm, overtakes, hasTelemetry, practiceData, raceWinners }) {
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
            qualiClassification={practiceData?.Qualifying?.classification}
            round={round}
            raceWinners={raceWinners}
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
      <PtwPickBadge round={round} />
      <div dangerouslySetInnerHTML={{ __html: showEn ? enHtml : PREANALYSE_FR_HTML[round] }} />
    </div>
  );
}

// "Pick de PTW" — pronostic assumé du site pour le vainqueur, affiché AVANT
// la course (donc jamais un spoiler : c'est une prédiction, pas un
// résultat) dans la Pré-analyse. `PTW_PICKS` est un import statique
// (cf. web/lib/ptwPicks.js), pas une prop : contenu éditorial écrit à la
// main comme le reste de la Pré-analyse, pas une donnée qui transite par la
// page serveur.
function PtwPickBadge({ round }) {
  const pick = PTW_PICKS[round];
  if (!pick) return null;
  return (
    <p className="note" style={{ marginBottom: 16 }}>
      🎯 <strong>Pick de PTW :</strong> {pick}
    </p>
  );
}

// Révèle si le pick était bon, une fois la course disputée — placé dans
// Raw data (déjà derrière SpoilerGate côté RaceTabs) plutôt que dans
// l'Analyse : révéler juste/faux revient à révéler le vainqueur, donc ça
// doit vivre derrière le même verrou anti-spoiler que le reste de la
// course, jamais dans un composant non gaté.
function PtwPickReveal({ round, winner }) {
  const pick = PTW_PICKS[round];
  if (!pick) return null;
  if (!winner) {
    return (
      <p className="note" style={{ marginBottom: 16 }}>
        🎯 <strong>Pick de PTW :</strong> {pick} — résultat pas encore disponible.
      </p>
    );
  }
  const correct = pick === winner;
  return (
    <p className="note" style={{ marginBottom: 16 }}>
      {correct ? "✅" : "❌"} <strong>Pick de PTW :</strong> {pick}
      {correct ? " — correct !" : ` — c'est ${winner} qui l'a emporté.`}
    </p>
  );
}

// Bilan cumulé sur la saison : combien de picks confirmés (round disputé ET
// pronostic écrit pour ce round) étaient corrects. N'affiche rien tant
// qu'aucun pick n'a encore de résultat en face — pas la peine d'un "0/0"
// creux dès le round 1.
function PtwTrackRecord({ raceWinners }) {
  const rounds = Object.keys(PTW_PICKS)
    .map(Number)
    .filter((r) => raceWinners && raceWinners[r] != null);
  if (rounds.length === 0) return null;
  const correct = rounds.filter((r) => PTW_PICKS[r] === raceWinners[r]).length;
  return (
    <p className="note" style={{ marginBottom: 16 }}>
      📊 Bilan des pronostics PTW cette saison : {correct}/{rounds.length} corrects.
    </p>
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
  14: {
    "Practice 1": ROUND14_EL1_FR_HTML,
    "Practice 2": ROUND14_EL2_FR_HTML,
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

function DriverCheckboxes({ names, selected, onToggle, colors, max }) {
  const atMax = max != null && selected.size >= max;
  return (
    <div className="chip-row">
      {names.map((name) => {
        const checked = selected.has(name);
        const disabled = !checked && atMax;
        const color = colors?.[name] || "#999";
        return (
          <label key={name} className={`chip${checked ? " active" : ""}${disabled ? " disabled" : ""}`}>
            <input type="checkbox" checked={checked} disabled={disabled} onChange={() => onToggle(name)} />
            <span className="dot" style={{ background: color, borderColor: color }} />
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
      <label style={{ color: "var(--text-muted)" }}>Tour :</label>
      <select className="lap-select" value={value} onChange={(e) => onChange(Number(e.target.value))}>
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

// Matrice delta pilote × pilote : la case (ligne, colonne) donne l'écart
// ligne − colonne (négatif = la ligne est plus rapide que la colonne) — sur
// une métrique donnée (meilleur tour course, meilleur tour qualif, …).
// Complète le "gap au plus rapide" des graphiques : celui-ci ne compare
// chaque pilote qu'au meilleur du groupe, la matrice permet de comparer
// n'importe QUELLE paire directement (cf. "Race pace delta" de f1pace.com,
// benchmark du 09/09/2026 — même principe). Pilotes triés par valeur
// croissante (le plus rapide en premier) pour rester lisible sans avoir à
// chercher qui est qui.
function DeltaMatrix({ names, valueByName, colors }) {
  const ordered = [...names]
    .filter((n) => valueByName[n] != null)
    .sort((a, b) => valueByName[a] - valueByName[b]);
  if (ordered.length < 2) {
    return <p className="note">Pas assez de pilotes avec un temps valide pour cette comparaison.</p>;
  }
  return (
    <div className="tablewrap">
      <table className="delta-matrix">
        <thead>
          <tr>
            <th></th>
            {ordered.map((c) => (
              <th key={c} style={{ color: colors?.[c] }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ordered.map((row) => (
            <tr key={row}>
              <th style={{ color: colors?.[row] }}>{row}</th>
              {ordered.map((col) => {
                if (row === col) return <td key={col} className="diag">—</td>;
                const d = valueByName[row] - valueByName[col];
                return (
                  <td key={col} className={d < 0 ? "neg" : "pos"}>
                    {d > 0 ? "+" : ""}{d.toFixed(3)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RawDataTab({ raceId, results, lapTimes, tyreStints, weather, rcm, overtakes, hasTelemetry, qualiClassification, round, raceWinners }) {
  const driverNames = Object.keys(lapTimes).sort();
  // Vainqueur DE CE round, dérivé de `results` (déjà chargé pour le tableau
  // "Résultats" juste en dessous) — pas besoin de relire raceWinners[round],
  // qui sert seulement au bilan cumulé sur toute la saison.
  const winner = results.find((r) => r.finish_position === 1)?.family_name;
  const top5 = useMemo(() => {
    const t = results.slice(0, 5).map((r) => r.family_name);
    return t.length ? t : driverNames.slice(0, 5);
  }, [results, driverNames]);
  // Une couleur par pilote (écurie officielle), partagée par les 4
  // graphiques du Raw data — cf. useDriverColors.
  const driverColors = useDriverColors(driverNames, results);

  // Sélection de pilotes INDÉPENDANTE par graphique — cocher un pilote sur
  // "Temps au tour" n'affecte pas "Position par tour" ni les deux
  // graphiques de télémétrie : chacun garde son propre état, chacun
  // démarre avec un défaut raisonnable (top 5).
  const [selectedLapTimes, toggleLapTimesDriver] = useDriverSelection(top5);
  const [selectedPosition, togglePositionDriver] = useDriverSelection(top5);
  const [selectedSpeed, toggleSpeedDriver] = useDriverSelection(top5);
  const [selectedQualiRace, toggleQualiRaceDriver] = useDriverSelection(top5);

  // Fusionne les temps au tour de chaque pilote sélectionné en une seule
  // série, indexée par numéro de tour — en ÉCART au pilote le plus rapide
  // DE CE TOUR (cf. toGapRows), pas en temps absolu. Seuls les tours
  // "propres" entrent en jeu (cf. `clean` posé par getLapTimesByDriver :
  // ni 1er tour, ni entrée/sortie stands, ni SC/VSC/drapeau rouge) — un
  // filtrage en amont plutôt qu'un recadrage d'échelle après coup.
  const chartData = useMemo(() => {
    const maxLap = Math.max(0, ...Object.values(lapTimes).flatMap((laps) => laps.map((l) => l.lap)));
    const rows = [];
    for (let lap = 1; lap <= maxLap; lap++) {
      const valuesByDriver = {};
      for (const name of selectedLapTimes) {
        const entry = (lapTimes[name] || []).find((l) => l.lap === lap);
        if (entry && entry.seconds && entry.clean) valuesByDriver[name] = entry.seconds;
      }
      rows.push({ lap, ...toGapRows(valuesByDriver) });
    }
    return rows;
  }, [lapTimes, selectedLapTimes]);
  const lapTimeDomain = useMemo(
    () => trimmedGapDomain(chartData.flatMap((row) => [...selectedLapTimes].map((name) => row[name]))),
    [chartData, selectedLapTimes]
  );

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
      const laps = (lapTimes[name] || []).filter((l) => l.seconds && l.clean);
      const overall = laps.length ? Math.min(...laps.map((l) => l.seconds)) : null;
      const byCompound = {};
      for (const c of compoundsUsed) {
        const compLaps = laps.filter((l) => compoundAtLap[name]?.[l.lap] === c);
        byCompound[c] = compLaps.length ? Math.min(...compLaps.map((l) => l.seconds)) : null;
      }
      return { name, overall, byCompound };
    });
  }, [selectedLapTimes, lapTimes, compoundsUsed, compoundAtLap]);

  // Reformatage pour le BarChart : une ligne par pilote, une clé par série
  // de barres (le meilleur tour toutes gommes + un par gomme utilisée) —
  // même famille de composant Recharts que les deux graphiques en ligne
  // juste au-dessus, pour une expérience visuelle harmonisée plutôt qu'un
  // tableau HTML à part. En ÉCART au meilleur temps DU GROUPE SÉLECTIONNÉ
  // (toutes gommes confondues, puis par gomme séparément — le repère "le
  // plus rapide" n'est pas le même pilote d'une colonne à l'autre) : un
  // temps de tour dans l'absolu ne se compare pas d'un coup d'œil.
  const bestLapChartData = useMemo(() => {
    const overallGaps = toGapRows(Object.fromEntries(bestLapRows.map((r) => [r.name, r.overall])));
    const compoundGaps = {};
    for (const c of compoundsUsed) {
      compoundGaps[c] = toGapRows(Object.fromEntries(bestLapRows.map((r) => [r.name, r.byCompound[c]])));
    }
    return bestLapRows.map((r) => ({
      name: r.name,
      "Toutes gommes": overallGaps[r.name],
      "Toutes gommes__abs": overallGaps[`${r.name}__abs`],
      ...Object.fromEntries(compoundsUsed.flatMap((c) => [
        [c, compoundGaps[c][r.name]],
        [`${c}__abs`, compoundGaps[c][`${r.name}__abs`]],
      ])),
    }));
  }, [bestLapRows, compoundsUsed]);
  const bestLapDomain = useMemo(() => {
    const vals = bestLapChartData.flatMap((row) => ["Toutes gommes", ...compoundsUsed].map((k) => row[k]));
    return trimmedGapDomain(vals, 0.1);
  }, [bestLapChartData, compoundsUsed]);

  // Temps moyen par tranche de 5 tours (non glissant : tours 1-5, 6-10, …)
  // — lisse le trafic, une erreur isolée ou une bataille/dépassement sur
  // UN tour, qui rendent la comparaison tour par tour bruyante. En écart
  // au plus rapide DE CHAQUE TRANCHE, même logique que les deux graphiques
  // ci-dessus.
  const bucketAvgData = useMemo(() => {
    const bucketSize = 5;
    const rows = [];
    for (let start = 1; start <= maxLap; start += bucketSize) {
      const end = Math.min(start + bucketSize - 1, maxLap);
      const avgByDriver = {};
      for (const name of selectedLapTimes) {
        const laps = (lapTimes[name] || []).filter((l) => l.lap >= start && l.lap <= end && l.seconds && l.clean);
        if (laps.length) avgByDriver[name] = laps.reduce((a, l) => a + l.seconds, 0) / laps.length;
      }
      const bucket = start === end ? `T${start}` : `T${start}-${end}`;
      rows.push({ bucket, ...toGapRows(avgByDriver) });
    }
    return rows;
  }, [lapTimes, selectedLapTimes, maxLap]);
  const bucketDomain = useMemo(
    () => trimmedGapDomain(bucketAvgData.flatMap((row) => [...selectedLapTimes].map((name) => row[name]))),
    [bucketAvgData, selectedLapTimes]
  );

  // Vitesse par tour : chargée à la demande via Server Action (pas au
  // chargement de la page — cf. commentaire de telemetryActions.js), pour
  // le seul tour choisi dans son sélecteur.
  const [speedLap, setSpeedLap] = useState(1);
  const { data: speedData, error: speedError } = useLapTelemetry(raceId, speedLap, hasTelemetry);

  // Meilleur tour qualif vs course — le numéro de voiture (stable entre
  // séances d'un même week-end) sert de pont entre les pilotes de la
  // qualification (car_number côté practice_drivers/practice_laps, labellés
  // par acronyme) et ceux de la course (family_name côté résultats), qui ne
  // partagent pas le même identifiant textuel.
  const carNumberToName = useMemo(() => {
    const map = {};
    for (const r of results) map[r.car_number] = r.family_name;
    return map;
  }, [results]);

  const qualiVsRaceRows = useMemo(() => {
    const qualiBest = {};
    for (const q of qualiClassification || []) {
      const name = carNumberToName[q.car_number];
      if (name && q.best_lap != null) qualiBest[name] = Number(q.best_lap);
    }
    const raceBest = {};
    for (const name of driverNames) {
      const laps = (lapTimes[name] || []).filter((l) => l.seconds && l.clean);
      if (laps.length) raceBest[name] = Math.min(...laps.map((l) => l.seconds));
    }
    return { qualiBest, raceBest };
  }, [qualiClassification, carNumberToName, driverNames, lapTimes]);

  // Une colonne "Qualif", une colonne "Course" — chacune en écart au
  // meilleur temps DE SA PROPRE séance (pas forcément le même pilote d'une
  // colonne à l'autre, comme pour "Meilleur tour" plus haut). `delta` =
  // écart course moins écart qualif : négatif (le pilote a progressé par
  // rapport au reste du groupe entre les deux séances), positif (il a
  // reculé) — répond directement à la demande de prioriser cette
  // comparaison plutôt que le réplay animé (cf. benchmark du 09/09/2026).
  const qualiVsRaceChartData = useMemo(() => {
    const names = [...selectedQualiRace].filter(
      (n) => qualiVsRaceRows.qualiBest[n] != null || qualiVsRaceRows.raceBest[n] != null
    );
    const qualiGaps = toGapRows(Object.fromEntries(names.map((n) => [n, qualiVsRaceRows.qualiBest[n]])));
    const raceGaps = toGapRows(Object.fromEntries(names.map((n) => [n, qualiVsRaceRows.raceBest[n]])));
    return names.map((name) => ({
      name,
      "Qualif": qualiGaps[name],
      "Qualif__abs": qualiGaps[`${name}__abs`],
      "Course": raceGaps[name],
      "Course__abs": raceGaps[`${name}__abs`],
      delta: raceGaps[name] != null && qualiGaps[name] != null ? raceGaps[name] - qualiGaps[name] : null,
    }));
  }, [selectedQualiRace, qualiVsRaceRows]);
  const qualiVsRaceDomain = useMemo(
    () => trimmedGapDomain(qualiVsRaceChartData.flatMap((r) => [r["Qualif"], r["Course"]])),
    [qualiVsRaceChartData]
  );
  const deltaAbsMax = Math.max(0.2, ...qualiVsRaceChartData.map((r) => Math.abs(r.delta ?? 0)));

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
        <PtwPickReveal round={round} winner={winner} />
        <PtwTrackRecord raceWinners={raceWinners} />
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

      <Section title="Qualif vs Course : meilleur tour">
        <p className="note" style={{ marginBottom: 12 }}>
          Écart au meilleur temps DE LA SÉANCE — qualification et course, chacune comparée séparément (le repère "le plus rapide" peut ne pas être le même pilote d'une colonne à l'autre). Les écarts sont typiquement resserrés en qualif (souvent &lt;0.2s en tête) et bien plus larges en course, où l'usure des pneus et le niveau de carburant pèsent — cf. benchmark f1pace.com du 09/09/2026. Meilleur tour course calculé sur les tours propres uniquement (hors 1er tour, entrée/sortie stands, SC/VSC/drapeau rouge — cf. "Temps au tour" plus bas).
        </p>
        <DriverCheckboxes names={driverNames} selected={selectedQualiRace} onToggle={toggleQualiRaceDriver} colors={driverColors} />
        {qualiVsRaceChartData.length === 0 && (
          <p className="note">Qualification pas encore ingérée pour ce round, ou aucun pilote sélectionné n'a de meilleur tour valide.</p>
        )}
        {qualiVsRaceChartData.length > 0 && (
          <>
            <ResponsiveContainer width="100%" height={Math.max(140, qualiVsRaceChartData.length * 34 + 50)}>
              <BarChart data={qualiVsRaceChartData} layout="vertical" margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
                <XAxis type="number" domain={qualiVsRaceDomain} tickFormatter={(v) => `${v.toFixed(1)}s`} />
                <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 12 }} />
                <Tooltip content={<GapTooltip />} />
                <Legend />
                <Bar dataKey="Qualif" fill="var(--text-muted)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="Course" radius={[0, 4, 4, 0]}>
                  {qualiVsRaceChartData.map((row) => <Cell key={row.name} fill={driverColors[row.name]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <p style={{ fontSize: 13, fontWeight: 600, margin: "24px 0 10px" }}>Δ rythme qualif → course</p>
            <p className="note" style={{ marginBottom: 12 }}>
              Écart au plus rapide en course moins écart au plus rapide en qualif. Négatif (vert) : a relativement progressé entre les deux séances. Positif (rouge) : a relativement reculé.
            </p>
            <ResponsiveContainer width="100%" height={Math.max(120, qualiVsRaceChartData.length * 30 + 40)}>
              <BarChart data={qualiVsRaceChartData} layout="vertical" margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
                <XAxis type="number" domain={[-deltaAbsMax, deltaAbsMax]} tickFormatter={(v) => `${v > 0 ? "+" : ""}${v.toFixed(1)}s`} />
                <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => (v == null ? "" : `${v > 0 ? "+" : ""}${v.toFixed(3)}s`)} />
                <Bar dataKey="delta" radius={[4, 4, 4, 4]}>
                  {qualiVsRaceChartData.map((row) => (
                    <Cell key={row.name} fill={row.delta == null ? "var(--border)" : row.delta < 0 ? "var(--good)" : "var(--bad)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <p style={{ fontSize: 13, fontWeight: 600, margin: "24px 0 10px" }}>Qui bat qui</p>
            <p className="note" style={{ marginBottom: 12 }}>
              Case (ligne, colonne) = temps de la ligne moins temps de la colonne — négatif : la ligne est plus rapide que la colonne. Permet de comparer n'importe quelle paire de pilotes, pas seulement chacun contre le meilleur du groupe.
            </p>
            <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              <div>
                <p className="note" style={{ marginBottom: 6, fontWeight: 600 }}>Qualif</p>
                <DeltaMatrix names={[...selectedQualiRace]} valueByName={qualiVsRaceRows.qualiBest} colors={driverColors} />
              </div>
              <div>
                <p className="note" style={{ marginBottom: 6, fontWeight: 600 }}>Course</p>
                <DeltaMatrix names={[...selectedQualiRace]} valueByName={qualiVsRaceRows.raceBest} colors={driverColors} />
              </div>
            </div>
          </>
        )}
      </Section>

      <Section title="Temps au tour">
        <p className="note" style={{ marginBottom: 12 }}>
          Écart au pilote le plus rapide DE CE TOUR parmi les pilotes cochés (0 = au plus rapide) — un temps de tour dans l'absolu (mm:ss.mmm) ne se compare pas d'un coup d'œil, contrairement à un écart en secondes. Temps absolu quand même visible en survolant un point. Tours d'entrée/sortie stands, 1er tour et tours SC/VSC/drapeau rouge exclus (pas représentatifs du rythme réel — même filtrage que f1pace.com).
        </p>
        <DriverCheckboxes names={driverNames} selected={selectedLapTimes} onToggle={toggleLapTimesDriver} colors={driverColors} />
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={chartData} margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="lap" label={{ value: "Tour", position: "insideBottom", offset: -4 }} />
            <YAxis domain={lapTimeDomain} tickFormatter={(v) => `${v.toFixed(1)}s`} width={50} />
            <Tooltip content={<GapTooltip />} labelFormatter={(l) => `Tour ${l}`} />
            <Legend />
            {[...selectedLapTimes].map((name) => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={driverColors[name]}
                dot={false}
                connectNulls
                strokeWidth={1.5}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>

        <p style={{ fontSize: 13, fontWeight: 600, margin: "24px 0 10px" }}>Meilleur tour</p>
        <p className="note" style={{ marginBottom: 12 }}>
          Écart au meilleur temps du groupe sélectionné — toutes gommes confondues, puis par gomme (le repère "le plus rapide" change de colonne en colonne : ce n'est pas forcément le même pilote).
        </p>
        <ResponsiveContainer width="100%" height={Math.max(140, bestLapChartData.length * 34 + 50)}>
          <BarChart data={bestLapChartData} layout="vertical" margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} horizontal={false} />
            <XAxis type="number" domain={bestLapDomain} tickFormatter={(v) => `${v.toFixed(1)}s`} />
            <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 12 }} />
            <Tooltip content={<GapTooltip />} />
            <Legend />
            <Bar dataKey="Toutes gommes" radius={[0, 4, 4, 0]}>
              {bestLapChartData.map((row) => <Cell key={row.name} fill={driverColors[row.name]} />)}
            </Bar>
            {compoundsUsed.map((c) => (
              <Bar key={c} dataKey={c} name={c} fill={COMPOUND_COLORS[c]} radius={[0, 4, 4, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>

        <p style={{ fontSize: 13, fontWeight: 600, margin: "24px 0 10px" }}>Qui bat qui (toutes gommes)</p>
        <p className="note" style={{ marginBottom: 12 }}>
          Case (ligne, colonne) = meilleur tour de la ligne moins meilleur tour de la colonne — négatif : la ligne est plus rapide que la colonne.
        </p>
        <DeltaMatrix
          names={[...selectedLapTimes]}
          valueByName={Object.fromEntries(bestLapRows.map((r) => [r.name, r.overall]))}
          colors={driverColors}
        />

        <p style={{ fontSize: 13, fontWeight: 600, margin: "24px 0 10px" }}>Temps moyen par tranche de 5 tours</p>
        <p className="note" style={{ marginBottom: 12 }}>
          Lisse les effets de trafic, d'une erreur isolée ou d'une bataille/dépassement sur un seul tour — moyenne par groupe de 5 tours (1-5, 6-10, …), pas une moyenne glissante. Écart au plus rapide DE CHAQUE TRANCHE, même logique que "Temps au tour" ci-dessus.
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={bucketAvgData} margin={{ top: 8, right: 24, bottom: 8, left: 8 }}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="bucket" />
            <YAxis domain={bucketDomain} tickFormatter={(v) => `${v.toFixed(1)}s`} width={50} />
            <Tooltip content={<GapTooltip />} />
            <Legend />
            {[...selectedLapTimes].map((name) => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={driverColors[name]}
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
        <DriverCheckboxes names={driverNames} selected={selectedPosition} onToggle={togglePositionDriver} colors={driverColors} />
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
            {[...selectedPosition].map((name) => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={driverColors[name]}
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
          <DriverCheckboxes names={driverNames} selected={selectedSpeed} onToggle={toggleSpeedDriver} colors={driverColors} />
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
                {[...selectedSpeed].map((name) => (
                  speedData[name] ? (
                    <Line
                      key={name}
                      data={speedData[name]}
                      dataKey="speed"
                      name={name}
                      type="monotone"
                      stroke={driverColors[name]}
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
