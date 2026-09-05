"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

// Projection équirectangulaire simple (lat/lon réelles -> position dans un
// plan 1000x500) — pas besoin de plus précis pour des points sur une carte
// volontairement stylisée, sans tracé de côtes exact.
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

const MIN_ZOOM = 1;
const MAX_ZOOM = 10;
const LABEL_ZOOM_THRESHOLD = 2.8;
// Repère grossier de l'Europe (en coordonnées du plan, avant zoom) pour le
// raccourci "Zoomer sur l'Europe" — c'est la zone la plus dense du
// calendrier (8 courses sur 23 dans un rayon de quelques centaines de km).
const EUROPE_BOX = { minX: 470, maxX: 570, minY: 90, maxY: 150 };

export default function SeasonCalendar({ races }) {
  const [view, setView] = useState("list");
  const [tooltip, setTooltip] = useState(null);
  const [cam, setCam] = useState({ zoom: MIN_ZOOM, panX: 0, panY: 0 });
  const svgRef = useRef(null);
  const dragRef = useRef(null); // { lastX, lastY, moved } pendant un glisser
  const suppressClickRef = useRef(false); // vrai le temps du clic qui suit un glisser réel
  const [isDragging, setIsDragging] = useState(false);

  // Chaque course, enrichie de sa position sur le plan — un seul calcul,
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

  // --- Caméra (zoom/pan) --------------------------------------------
  // On ne touche jamais au viewBox : on projette nous-mêmes chaque point
  // du plan vers l'espace écran (screen = pan + point * zoom), et on
  // recalcule pan à chaque zoom pour garder le point visé sous le
  // curseur. Ça évite tout le folklore des transform SVG imbriqués, et
  // ça permet de garder les points/traits à taille CONSTANTE à l'écran
  // (on ne les met pas dans un groupe mis à l'échelle) — c'est ce qui
  // manquait pour lire l'Europe : agrandir la géographie sans agrandir
  // les pins jusqu'à l'illisible.
  const toScreen = useCallback((x, y) => ({ sx: cam.panX + x * cam.zoom, sy: cam.panY + y * cam.zoom }), [cam]);
  const toWorld = useCallback((sx, sy) => ({ x: (sx - cam.panX) / cam.zoom, y: (sy - cam.panY) / cam.zoom }), [cam]);

  function vbPointFromEvent(e) {
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  }

  function zoomAt(vbX, vbY, factor) {
    setCam((prev) => {
      const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev.zoom * factor));
      const world = { x: (vbX - prev.panX) / prev.zoom, y: (vbY - prev.panY) / prev.zoom };
      return { zoom: nextZoom, panX: vbX - world.x * nextZoom, panY: vbY - world.y * nextZoom };
    });
  }

  function zoomToBox(box, padding = 30) {
    const w = box.maxX - box.minX + padding * 2;
    const h = box.maxY - box.minY + padding * 2;
    const zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.min(1000 / w, 500 / h)));
    const cx = (box.minX + box.maxX) / 2;
    const cy = (box.minY + box.maxY) / 2;
    setCam({ zoom, panX: 500 - cx * zoom, panY: 250 - cy * zoom });
  }

  // Molette = zoom centré sur le curseur. Écouteur natif (pas onWheel
  // React) pour pouvoir bloquer le scroll de la page pendant l'usage —
  // React attache ses listeners wheel en passif par défaut, ce qui
  // empêche preventDefault() depuis un simple onWheel JSX.
  useEffect(() => {
    const el = svgRef.current;
    if (!el || view !== "map") return;
    function onWheel(e) {
      e.preventDefault();
      const p = vbPointFromEvent(e);
      zoomAt(p.x, p.y, e.deltaY < 0 ? 1.18 : 1 / 1.18);
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  function onPointerDown(e) {
    if (e.button !== undefined && e.button !== 0) return;
    // Un appui qui démarre sur un pin ne doit jamais engager le mode
    // glisser (ni capturer le pointeur) : sinon un simple clic sur un pin
    // se retrouve traité comme un micro-drag et sa navigation est bloquée
    // par guardClick plus bas. Seul un appui sur le fond de carte panne.
    if (e.target.closest && e.target.closest(".cal-pin")) return;
    const p = vbPointFromEvent(e);
    dragRef.current = { lastX: p.x, lastY: p.y, moved: false };
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e) {
    if (!dragRef.current) return;
    const p = vbPointFromEvent(e);
    const dx = p.x - dragRef.current.lastX;
    const dy = p.y - dragRef.current.lastY;
    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) dragRef.current.moved = true;
    dragRef.current.lastX = p.x;
    dragRef.current.lastY = p.y;
    setCam((prev) => ({ ...prev, panX: prev.panX + dx, panY: prev.panY + dy }));
  }
  function onPointerUp() {
    // Un glisser qui a réellement déplacé la carte ne doit pas aussi
    // déclencher la navigation du pin relâché sous le curseur — le flag
    // survit jusqu'au clic de souris qui suit immédiatement le pointerup.
    if (dragRef.current?.moved) suppressClickRef.current = true;
    dragRef.current = null;
    setIsDragging(false);
  }
  function guardClick(e) {
    if (suppressClickRef.current) {
      e.preventDefault();
      suppressClickRef.current = false;
    }
  }

  function onDoubleClick(e) {
    const p = vbPointFromEvent(e);
    zoomAt(p.x, p.y, 1.8);
  }

  const resetView = () => setCam({ zoom: MIN_ZOOM, panX: 0, panY: 0 });
  const isDefaultView = cam.zoom === MIN_ZOOM && cam.panX === 0 && cam.panY === 0;

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
    // Ne rejoue pas l'animation à chaque pan/zoom, seulement à l'entrée
    // dans la vue carte ou si le jeu de points change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, points]);

  const showLabels = cam.zoom >= LABEL_ZOOM_THRESHOLD;

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

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 18 }}>
        <div className="cal-toggle" role="tablist" aria-label="Vue du calendrier">
          <button type="button" role="tab" aria-selected={view === "list"} onClick={() => setView("list")}>
            ☰ Liste
          </button>
          <button type="button" role="tab" aria-selected={view === "map"} onClick={() => setView("map")}>
            🌐 Carte
          </button>
        </div>
        {view === "map" && (
          <div className="cal-zoomctl">
            <button type="button" onClick={() => zoomAt(500, 250, 1 / 1.6)} aria-label="Dézoomer">−</button>
            <span className="mono">{Math.round(cam.zoom * 100)}%</span>
            <button type="button" onClick={() => zoomAt(500, 250, 1.6)} aria-label="Zoomer">+</button>
            <button type="button" className="cal-zoomctl-preset" onClick={() => zoomToBox(EUROPE_BOX)}>
              🔍 Vue Europe
            </button>
            {!isDefaultView && (
              <button type="button" className="cal-zoomctl-preset" onClick={resetView}>
                ↺ Réinitialiser
              </button>
            )}
          </div>
        )}
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
          <svg
            ref={svgRef}
            viewBox="0 0 1000 500"
            role="img"
            aria-label="Carte du calendrier de la saison — molette pour zoomer, glisser pour déplacer"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            onDoubleClick={onDoubleClick}
            onClickCapture={guardClick}
            style={{ cursor: isDragging ? "grabbing" : "grab", touchAction: "none" }}
          >
            <g transform={`translate(${cam.panX} ${cam.panY}) scale(${cam.zoom})`}>
              <g opacity="0.5">
                {Array.from({ length: 11 }, (_, i) => (
                  <line key={`v${i}`} x1={i * 100} y1={0} x2={i * 100} y2={500} stroke="var(--border)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                ))}
                {Array.from({ length: 6 }, (_, i) => (
                  <line key={`h${i}`} x1={0} y1={i * 100} x2={1000} y2={i * 100} stroke="var(--border)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                ))}
              </g>
              <g opacity="0.5">
                {LANDMASSES.map((b, i) => (
                  <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} fill="var(--surface-raised)" />
                ))}
              </g>
            </g>

            {/* Traits et pins hors du groupe mis à l'échelle : leurs
                positions suivent le zoom/pan (calculées nous-mêmes),
                mais leur épaisseur/rayon restent constants à l'écran —
                c'est ce qui garde les pins cliquables et lisibles même
                très zoomé, plutôt que de devenir des pâtés. */}
            <polyline
              ref={doneRef}
              className="cal-route-done"
              points={donePts.map((p) => { const s = toScreen(p.x, p.y); return `${s.sx},${s.sy}`; }).join(" ")}
            />
            <polyline
              className="cal-route-todo"
              points={todoPts.map((p) => { const s = toScreen(p.x, p.y); return `${s.sx},${s.sy}`; }).join(" ")}
            />

            {points.map((r) => {
              const { sx, sy } = toScreen(r.x, r.y);
              return (
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
                    {r.status === "live" && <circle className="ring" cx={sx} cy={sy} r={7} />}
                    <circle
                      className="core"
                      cx={sx}
                      cy={sy}
                      r={r.status === "upcoming" ? 5 : 6}
                      fill={r.status === "upcoming" ? "var(--surface)" : r.status === "live" ? "var(--bad)" : "var(--accent)"}
                      stroke={r.status === "upcoming" ? "var(--text-muted)" : "none"}
                      strokeWidth={r.status === "upcoming" ? 1.6 : 0}
                    />
                    {showLabels && (
                      <>
                        <text x={sx + 10} y={sy + 4} className="cal-pin-label-halo">{r.geo.flag} R{r.round}</text>
                        <text x={sx + 10} y={sy + 4} className="cal-pin-label">{r.geo.flag} R{r.round}</text>
                      </>
                    )}
                  </g>
                </a>
              );
            })}
          </svg>
          <p className="cal-maphint mono">molette pour zoomer · glisser pour déplacer · double-clic pour zoomer</p>
          {tooltip && (
            <div
              className="cal-tooltip show"
              style={(() => {
                const s = toScreen(tooltip.x, tooltip.y);
                return { left: `${s.sx / 10}%`, top: `${s.sy / 5}%` };
              })()}
            >
              <span className="rnd">Round {tooltip.round} · {STATUS_LABEL[tooltip.status]}</span>
              {tooltip.geo.flag} {tooltip.race_name} — {new Date(tooltip.race_date).toLocaleDateString("fr-FR")}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
