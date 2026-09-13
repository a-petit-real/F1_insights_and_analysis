"use client";

// Réplay comparatif 2D d'un duel qualif ciblé (ex. bataille pour la pole),
// pas un remplacement de l'ancienne feature "Réplay animé" retirée du Raw
// data (générique, tous pilotes, jugée peu utile) : ici, pilotes et séance
// sont choisis à l'avance côté article, la valeur vient de l'angle
// éditorial ("ce duel précis"), pas de l'outil en lui-même. Cf.
// docs/DATA_SOURCES.md (note sur x_m/y_m) et le commentaire de
// practice_telemetry dans db/schema_fastf1.sql pour l'historique.
//
// Rendu en SVG + requestAnimationFrame fait main (pas de lib 3D/canvas) —
// même choix que documenté pour l'ancienne feature dans
// docs/ARCHITECTURE.md : la donnée est une position 2D sur un tracé, pas un
// besoin de moteur 3D.
import { useEffect, useMemo, useRef, useState } from "react";
import { fetchQualiDuelReplay, fetchRaceLapReplay } from "./telemetryActions";

const TEAM_COLORS = [
  [/red bull/i, "#1B3A93"],
  [/ferrari/i, "#E8002D"],
  [/mercedes/i, "#00A19B"],
  [/mclaren/i, "#FF8000"],
  [/aston martin/i, "#229971"],
  [/alpine/i, "#FF87BC"],
  [/williams/i, "#6C98FF"],
  [/haas/i, "#B6BABD"],
  [/racing bulls/i, "#2B4562"],
  [/audi|sauber/i, "#00302B"],
  [/cadillac/i, "#C9A24B"],
];

function teamColorFor(teamName) {
  const hit = TEAM_COLORS.find(([re]) => re.test(teamName || ""));
  return hit ? hit[1] : "#888";
}

// Éclaircit une couleur hex de `amount` (0-1) vers le blanc — même fonction
// que RaceTabs.jsx (useDriverColors), pour distinguer deux coéquipiers
// (Antonelli/Russell, Norris/Piastri...) sans sortir de la couleur de leur
// écurie. Indispensable ici : deux points de la même couleur exacte sur le
// tracé seraient impossibles à distinguer pendant l'animation.
function lighten(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const mix = (c) => Math.round(c + (255 - c) * amount);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

// Recherche par dichotomie de l'intervalle [i, i+1] encadrant `value` dans
// un tableau croissant `arr` (lu via `key`) — utilisée à la fois pour
// interpoler par le temps (position d'un pilote à l'instant t) et par la
// distance (à quel instant un pilote a atteint telle distance).
function bisect(arr, value, key) {
  let lo = 0, hi = arr.length - 1;
  if (value <= key(arr[0])) return 0;
  if (value >= key(arr[hi])) return hi - 1;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (key(arr[mid]) <= value) lo = mid; else hi = mid;
  }
  return lo;
}

function lerp(a, b, frac) {
  return a + (b - a) * frac;
}

// Position/vitesse/distance d'un pilote à l'instant t (secondes écoulées
// depuis le départ de SON tour) — clampé aux bornes plutôt qu'extrapolé.
function pointAtTime(points, t) {
  const clamped = Math.max(points[0].t, Math.min(points[points.length - 1].t, t));
  const i = bisect(points, clamped, (p) => p.t);
  const p0 = points[i], p1 = points[i + 1];
  const frac = p1.t === p0.t ? 0 : (clamped - p0.t) / (p1.t - p0.t);
  return {
    x: lerp(p0.x, p1.x, frac),
    y: lerp(p0.y, p1.y, frac),
    speed: lerp(p0.speed, p1.speed, frac),
    distance: lerp(p0.distance, p1.distance, frac),
  };
}

// Instant où un pilote atteint telle distance sur SON tour — sert au calcul
// d'écart en temps "au même endroit sur la piste" (pas un écart de
// distance à instant fixe, qui ne veut rien dire entre deux tours de durées
// différentes).
function timeAtDistance(points, distance) {
  const clamped = Math.max(points[0].distance, Math.min(points[points.length - 1].distance, distance));
  const i = bisect(points, clamped, (p) => p.distance);
  const p0 = points[i], p1 = points[i + 1];
  const frac = p1.distance === p0.distance ? 0 : (clamped - p0.distance) / (p1.distance - p0.distance);
  return lerp(p0.t, p1.t, frac);
}

function formatLapClock(seconds) {
  const m = Math.floor(seconds / 60);
  const s = (seconds % 60).toFixed(1).padStart(4, "0");
  return m > 0 ? `${m}:${s}` : `${s}s`;
}

const PLAYBACK_RATE = 3; // accéléré x3 — un tour de ~1min30 tient en ~30s, sans dénaturer les écarts (tous les temps restent calculés sur les données réelles, seule la vitesse de lecture est compressée)

// source="quali" : sessionName + carNumbers (numéro de voiture), résout la
// séance et le meilleur tour de chacun (cf. getQualiDuelReplay).
// source="race" : lapNumber + driverNames (family_name), lit directement
// lap_telemetry — utilisé quand la télémétrie d'une séance de
// qualification/essais n'est pas encore disponible (ex. panne ponctuelle
// de l'API OpenF1) mais qu'un tour de course existe déjà en base.
export default function GhostLapReplay({ raceId, source = "quali", sessionName, carNumbers, lapNumber, driverNames, title }) {
  const [telemetry, setTelemetry] = useState(null); // undefined tant que non chargé, null si indisponible
  const [playing, setPlaying] = useState(false);
  const [virtualT, setVirtualT] = useState(0);
  const rafRef = useRef(null);
  const lastNowRef = useRef(null);

  const carNumbersKey = (carNumbers || []).join(",");
  const driverNamesKey = (driverNames || []).join(",");
  useEffect(() => {
    let cancelled = false;
    const promise = source === "race"
      ? fetchRaceLapReplay(raceId, lapNumber, driverNames)
      : fetchQualiDuelReplay(raceId, sessionName, carNumbers);
    promise.then((data) => {
      if (!cancelled) setTelemetry(data);
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- *Key (chaînes stables) remplacent les tableaux carNumbers/driverNames (référence instable d'un rendu à l'autre)
  }, [raceId, source, sessionName, carNumbersKey, lapNumber, driverNamesKey]);

  // Tri par durée de tour réelle (dernier point t_s) plutôt qu'un champ
  // séparé "meilleur temps" — fiable depuis que t_s est calé sur l'instant
  // OFFICIEL de passage sur la ligne (date_start de l'endpoint laps) plutôt
  // que sur le premier échantillon location du tour, cf. correctif détaillé
  // dans ingest_openf1_telemetry.py (le calage précédent inversait l'ordre
  // réel pour un écart serré, ex. la pole de Madring décidée à 11ms).
  const drivers = useMemo(() => {
    if (!telemetry) return null;
    const list = Object.entries(telemetry)
      .filter(([, d]) => d.points && d.points.length >= 2)
      .map(([label, d]) => ({ label, ...d }))
      .sort((a, b) => a.points[a.points.length - 1].t - b.points[b.points.length - 1].t);
    const seenPerTeam = {};
    for (const d of list) {
      const base = teamColorFor(d.teamName);
      const seen = seenPerTeam[d.teamName] || 0;
      seenPerTeam[d.teamName] = seen + 1;
      d.color = seen === 0 ? base : lighten(base, 0.42);
    }
    return list.length >= 2 ? list : null;
  }, [telemetry]);

  const leader = drivers?.[0];
  const leaderDuration = leader ? leader.points[leader.points.length - 1].t : 0;

  // Boucle d'animation : avance virtualT en temps réel * PLAYBACK_RATE,
  // s'arrête (pause) à la fin du tour du leader plutôt que de boucler —
  // un réplay qui recommence tout seul serait plus difficile à lire pour
  // comparer un point précis du tour.
  useEffect(() => {
    if (!playing || !leader) return;
    lastNowRef.current = null;
    function tick(now) {
      if (lastNowRef.current == null) lastNowRef.current = now;
      const dt = ((now - lastNowRef.current) / 1000) * PLAYBACK_RATE;
      lastNowRef.current = now;
      setVirtualT((t) => {
        const next = t + dt;
        if (next >= leaderDuration) {
          setPlaying(false);
          return leaderDuration;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, leader, leaderDuration]);

  function togglePlay() {
    if (!leader) return;
    if (!playing && virtualT >= leaderDuration) setVirtualT(0); // relance depuis le départ si le tour est fini
    setPlaying((p) => !p);
  }

  // Tracé de référence (silhouette du circuit) : les points du leader,
  // normalisés dans un viewBox couvrant TOUS les pilotes (pas seulement le
  // leader) pour que personne ne sorte du cadre sur les portions où les
  // lignes divergent (freinage, sortie de virage).
  //
  // Y INVERSÉ (-p.y partout ci-dessous) : OpenF1 donne x/y dans un repère où
  // Y croît "vers le haut" au sens cartésien standard (confirmé en traçant
  // le tour réel d'un pilote à Monza hors du site : les virages connus pour
  // être des courbes à droite — Curva Grande, Lesmo 1 et 2 — ne ressortent
  // dans le bon sens qu'avec Y non inversé dans ce repère-là). Le SVG, lui,
  // a un axe Y qui croît vers le BAS — sans cette inversion, le tracé
  // rendu est le miroir vertical du circuit réel (signalé par l'utilisateur
  // : "le circuit est inversé").
  const { pathD, viewBox, dotRadius } = useMemo(() => {
    if (!drivers) return { pathD: "", viewBox: "0 0 100 100", dotRadius: 1 };
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (const d of drivers) {
      for (const p of d.points) {
        const y = -p.y;
        if (p.x < minX) minX = p.x; if (p.x > maxX) maxX = p.x;
        if (y < minY) minY = y; if (y > maxY) maxY = y;
      }
    }
    const span = Math.max(maxX - minX, maxY - minY);
    const pad = span * 0.06;
    const vb = `${minX - pad} ${minY - pad} ${maxX - minX + 2 * pad} ${maxY - minY + 2 * pad}`;
    const d = leader.points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${(-p.y).toFixed(1)}`).join(" ");
    // Rayon des points en unités du viewBox (mètres) — proportionnel à
    // l'étendue du tracé plutôt qu'une valeur fixe, pour rester visible
    // aussi bien sur un petit circuit urbain que sur un tracé étendu.
    return { pathD: d, viewBox: vb, dotRadius: span * 0.012 };
  }, [drivers, leader]);

  if (telemetry === null) return null; // pas de télémétrie ingérée pour ce duel — silencieux, pas une erreur affichée
  if (!drivers) {
    return (
      <div className="ghostlap-loading prose">
        <p className="scrollhint">Chargement du réplay…</p>
      </div>
    );
  }

  const leaderNow = pointAtTime(leader.points, virtualT);
  const rows = drivers.map((d) => {
    if (d === leader) return { ...d, speed: leaderNow.speed, gap: null };
    const tAtLeaderDistance = timeAtDistance(d.points, leaderNow.distance);
    const gap = tAtLeaderDistance - virtualT;
    const pos = pointAtTime(d.points, virtualT);
    return { ...d, speed: pos.speed, gap };
  });

  return (
    <div className="ghostlap">
      {title && <p className="ghostlap-title">{title}</p>}
      <div className="ghostlap-cards">
        {rows.map((d) => (
          <div key={d.label} className="ghostlap-card" style={{ borderColor: d.color }}>
            <span className="ghostlap-drv"><span className="dot" style={{ background: d.color }} />{d.label}</span>
            <span className="ghostlap-gap">{d.gap == null ? "LEADER" : `+${d.gap.toFixed(3)}`}</span>
            <span className="ghostlap-speed">{Math.round(d.speed)} <small>km/h</small></span>
          </div>
        ))}
      </div>
      <svg viewBox={viewBox} className="ghostlap-track" preserveAspectRatio="xMidYMid meet">
        <path d={pathD} className="ghostlap-line" />
        {rows.map((d) => {
          const p = pointAtTime(d.points, virtualT);
          return (
            <circle key={d.label} cx={p.x} cy={-p.y} r={dotRadius} fill={d.color}
                    stroke="var(--surface)" strokeWidth={dotRadius * 0.25} />
          );
        })}
      </svg>
      <div className="ghostlap-controls">
        <button type="button" onClick={togglePlay} className="ghostlap-playbtn" aria-label={playing ? "Pause" : "Lecture"}>
          {playing ? "⏸" : "▶"}
        </button>
        <input
          type="range"
          min={0}
          max={leaderDuration}
          step={0.05}
          value={virtualT}
          onChange={(e) => { setPlaying(false); setVirtualT(Number(e.target.value)); }}
          className="ghostlap-scrub"
        />
        <span className="ghostlap-clock">{formatLapClock(virtualT)} / {formatLapClock(leaderDuration)}</span>
      </div>
      <p className="scrollhint" style={{ textAlign: "center" }}>
        Réplay animé (×{PLAYBACK_RATE}) à partir de la télémétrie réelle OpenF1 — écart en temps calculé au même point du tracé, pas un écart de distance.
      </p>
    </div>
  );
}
