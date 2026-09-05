"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

// Projection équirectangulaire simple (lat/lon réelles -> position dans un
// viewBox 1000x500) — pas besoin de plus précis pour des points sur une
// carte volontairement stylisée, sans tracé de côtes exact.
function project(lat, lon) {
  return { x: ((lon + 180) / 360) * 1000, y: ((90 - lat) / 180) * 500 };
}

// Masses continentales approximatives, en aplats flous — un repère visuel
// pour orienter le regard, pas une carte politique précise.
const LANDMASSES = [
  { cx: 240, cy: 168, rx: 150, ry: 95 }, // Amérique du Nord
  { cx: 380, cy: 320, rx: 75, ry: 95 }, // Amérique du Sud
  { cx: 515, cy: 118, rx: 95, ry: 58 }, // Europe
  { cx: 540, cy: 270, rx: 95, ry: 135 }, // Afrique
  { cx: 750, cy: 190, rx: 210, ry: 115 }, // Asie
  { cx: 870, cy: 350, rx: 80, ry: 45 }, // Océanie
];

const STATUS_LABEL = { done: "Disputée", live: "Ce week-end", upcoming: "À venir" };

export default function SeasonCalendar({ races }) {
  const [view, setView] = useState("list");
  const [tooltip, setTooltip] = useState(null);

  // Chaque course, enrichie de sa position sur la carte — un seul calcul,
  // réutilisé par la liste (pour le drapeau) et par la carte (pour le pin).
  const points = useMemo(
    () => races.map((r) => ({ ...r, ...project(r.geo.lat, r.geo.lon) })),
    [races]
  );

  const doneCount = races.filter((r) => r.status === "done").length;
  const liveRace = races.find((r) => r.status === "live");
  const upcomingCount = races.filter((r) => r.status === "upcoming").length;

  // Le tracé de saison se coupe juste après la dernière course disputée
  // (ou en cours) : trait plein derrière, pointillé devant.
  const splitIdx = Math.max(
    doneCount - 1,
    liveRace ? points.findIndex((r) => r.status === "live") : -1
  );
  const donePts = points.slice(0, Math.max(splitIdx, 0) + 1);
  const todoPts = points.slice(Math.max(splitIdx, 0));

  // Anime le tracé "parcouru" : dessin progressif du round 1 jusqu'à la
  // course courante au montage, plutôt qu'un trait statique.
  const doneRef = useRef(null);
  useEffect(() => {
    const line = doneRef.current;
    if (!line || view !== "map") return;
    const len = line.getTotalLength();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    line.style.strokeDasharray = String(len);
    if (reduceMotion) {
      line.style.strokeDashoffset = "0";
      return;
    }
    line.style.transition = "none";
    line.style.strokeDashoffset = String(len);
    void line.getBoundingClientRect(); // force le reflow avant d'animer
    requestAnimationFrame(() => {
      line.style.transition = "stroke-dashoffset 1.6s cubic-bezier(.4,0,.2,1)";
      line.style.strokeDashoffset = "0";
    });
  }, [view, points]);

  return (
    <div>
      <div className="cal-status">
        <span><b>{races.length}</b> courses</span>
        <span><span className="cal-dot done" /> <b>{doneCount}</b> disputée{doneCount > 1 ? "s" : ""}</span>
        {liveRace && (
          <span><span className="cal-dot live" /> <b>{liveRace.geo.flag} {liveRace.race_name}</b> ce week-end</span>
        )}
        <span><span className="cal-dot upcoming" /> <b>{upcomingCount}</b> à venir</span>
      </div>

      <div className="cal-toggle" role="tablist" aria-label="Vue du calendrier">
        <button type="button" role="tab" aria-selected={view === "list"} onClick={() => setView("list")}>
          ☰ Liste
        </button>
        <button type="button" role="tab" aria-selected={view === "map"} onClick={() => setView("map")}>
          🌐 Carte
        </button>
      </div>

      {view === "list" ? (
        <div>
          {points.map((r) => (
            <Link key={r.round} href={`/courses/${r.round}`} className="cal-row">
              <span className="rnd">R{r.round}</span>
              <span className="gp">
                {r.geo.flag} {r.race_name}
                <span className="circ">{r.circuit_name}, {r.country}</span>
              </span>
              <span className={`cal-badge ${r.status}`}>
                <span className="cal-dot" style={{ width: 6, height: 6 }} />
                {STATUS_LABEL[r.status]}
              </span>
              <span className="when">{new Date(r.race_date).toLocaleDateString("fr-FR")}</span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="cal-map">
          <svg viewBox="0 0 1000 500" role="img" aria-label="Carte du calendrier de la saison">
            <g opacity="0.5">
              {Array.from({ length: 11 }, (_, i) => (
                <line key={`v${i}`} x1={i * 100} y1={0} x2={i * 100} y2={500} stroke="var(--border)" strokeWidth="1" />
              ))}
              {Array.from({ length: 6 }, (_, i) => (
                <line key={`h${i}`} x1={0} y1={i * 100} x2={1000} y2={i * 100} stroke="var(--border)" strokeWidth="1" />
              ))}
            </g>
            <g opacity="0.5">
              {LANDMASSES.map((b, i) => (
                <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill="var(--surface-raised)" />
              ))}
            </g>
            <polyline ref={doneRef} className="cal-route-done" points={donePts.map((p) => `${p.x},${p.y}`).join(" ")} />
            <polyline className="cal-route-todo" points={todoPts.map((p) => `${p.x},${p.y}`).join(" ")} />
            {points.map((r) => (
              <a
                key={r.round}
                href={`/courses/${r.round}`}
                className={`cal-pin is-${r.status}`}
                aria-label={`Round ${r.round} — ${r.race_name}, ${STATUS_LABEL[r.status]}`}
                onMouseEnter={() => setTooltip(r)}
                onMouseLeave={() => setTooltip((t) => (t?.round === r.round ? null : t))}
                onFocus={() => setTooltip(r)}
                onBlur={() => setTooltip((t) => (t?.round === r.round ? null : t))}
              >
                <g>
                  {r.status === "live" && <circle className="ring" cx={r.x} cy={r.y} r={7} />}
                  <circle
                    className="core"
                    cx={r.x}
                    cy={r.y}
                    r={r.status === "upcoming" ? 5 : 6}
                    fill={r.status === "upcoming" ? "var(--surface)" : r.status === "live" ? "var(--bad)" : "var(--accent)"}
                    stroke={r.status === "upcoming" ? "var(--text-muted)" : "none"}
                    strokeWidth={r.status === "upcoming" ? 1.6 : 0}
                  />
                </g>
              </a>
            ))}
          </svg>
          {tooltip && (
            <div className="cal-tooltip show" style={{ left: `${tooltip.x / 10}%`, top: `${tooltip.y / 5}%` }}>
              <span className="rnd">Round {tooltip.round} · {STATUS_LABEL[tooltip.status]}</span>
              {tooltip.geo.flag} {tooltip.race_name} — {new Date(tooltip.race_date).toLocaleDateString("fr-FR")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
