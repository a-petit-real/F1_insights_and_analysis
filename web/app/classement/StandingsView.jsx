"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useFrontierRound } from "../../lib/spoilerGuard";

export default function StandingsView({ driversByRound, constructorsByRound }) {
  const availableRounds = useMemo(
    () => Object.keys(driversByRound).map(Number).sort((a, b) => a - b),
    [driversByRound]
  );
  const { frontier, hydrated } = useFrontierRound(availableRounds);
  const maxAvailable = availableRounds.length ? Math.max(...availableRounds) : 0;
  const [selected, setSelected] = useState(null); // round choisi manuellement, borné à la frontière

  if (!hydrated) return null; // évite un flash du classement complet avant hydratation

  const shownRound = selected != null ? Math.min(selected, frontier) : frontier;
  const hiddenCount = availableRounds.filter((r) => r > frontier).length;

  return (
    <div style={{ display: "grid", gap: 28 }}>
      {hiddenCount > 0 && (
        <div style={{ background: "#f6effa", border: "1px solid #d9c2e8", borderRadius: 8, padding: "14px 18px", fontSize: 14, color: "#5a3b6b" }}>
          🙈 {hiddenCount} Grand{hiddenCount > 1 ? "s Prix" : " Prix"} plus récent{hiddenCount > 1 ? "s" : ""} masqué{hiddenCount > 1 ? "s" : ""} par l'anti-spoiler.
          {" "}Marquez la course correspondante comme vue sur sa page pour débloquer le classement à jour.
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
        <label htmlFor="round-picker" style={{ color: "#666" }}>Classement après :</label>
        <select
          id="round-picker"
          value={shownRound}
          onChange={(e) => setSelected(Number(e.target.value))}
          style={{ padding: "6px 10px", borderRadius: 6, border: "1px solid #ccc" }}
        >
          {availableRounds
            .filter((r) => r <= frontier)
            .map((r) => (
              <option key={r} value={r}>Round {r}</option>
            ))}
        </select>
        {shownRound !== maxAvailable && (
          <span style={{ color: "#888" }}>({maxAvailable - shownRound} course{maxAvailable - shownRound > 1 ? "s" : ""} plus récente{maxAvailable - shownRound > 1 ? "s" : ""} en base, non affichée{maxAvailable - shownRound > 1 ? "s" : ""} ici)</span>
        )}
      </div>

      <section>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Pilotes</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>{["Pos", "Pilote", "Écurie", "Points", "Victoires"].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {(driversByRound[shownRound] || []).map((d, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{d.position ?? "—"}</td>
                  <td style={tdStyle}>{d.given_name} {d.family_name}</td>
                  <td style={tdStyle}>{d.team_name || ""}</td>
                  <td style={tdStyle}>{d.points}</td>
                  <td style={tdStyle}>{d.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Constructeurs</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>{["Pos", "Écurie", "Points", "Victoires"].map((h) => <th key={h} style={thStyle}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {(constructorsByRound[shownRound] || []).map((c, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{c.position ?? "—"}</td>
                  <td style={tdStyle}>{c.team_name}</td>
                  <td style={tdStyle}>{c.points}</td>
                  <td style={tdStyle}>{c.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {hiddenCount > 0 && (
        <p style={{ fontSize: 13, color: "#888" }}>
          <Link href={`/courses/${frontier + 1}`}>→ Aller à la page du Round {frontier + 1}</Link> pour la marquer comme vue.
        </p>
      )}
    </div>
  );
}

const tableStyle = { width: "100%", borderCollapse: "collapse", fontSize: 13 };
const thStyle = { textAlign: "left", padding: "6px 10px", borderBottom: "2px solid #ddd", background: "#fafafa" };
const tdStyle = { padding: "6px 10px", borderBottom: "1px solid #eee" };
