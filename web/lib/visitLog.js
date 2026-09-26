// Journalisation des visites (table site_visits, db/schema_app.sql),
// appelée depuis middleware.js via event.waitUntil — donc déjà hors du
// chemin de réponse, mais on avale quand même toute exception par
// prudence : une panne d'écriture ne doit jamais faire échouer une page.
//
// Géolocalisation : lue depuis les en-têtes que Vercel ajoute
// automatiquement à chaque requête en production (x-vercel-ip-*), sans
// dépendance externe ni clé API. En dev local (hors Vercel), ces en-têtes
// sont absents — pays/région/ville restent simplement NULL.
import crypto from "node:crypto";
import { query } from "./db";

function decodeHeader(value) {
  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function logVisit(request) {
  try {
    const headers = request.headers;
    const path = new URL(request.url).pathname;

    const forwardedFor = headers.get("x-forwarded-for") || "";
    const ip = headers.get("x-real-ip") || forwardedFor.split(",")[0].trim() || null;
    const userAgent = headers.get("user-agent") || null;

    const visitorId = ip
      ? crypto.createHash("sha256").update(`${ip}|${userAgent || ""}`).digest("hex").slice(0, 32)
      : null;

    const latitude = headers.get("x-vercel-ip-latitude");
    const longitude = headers.get("x-vercel-ip-longitude");

    await query(
      `INSERT INTO site_visits (path, ip, country, region, city, latitude, longitude, user_agent, referrer, visitor_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        path,
        ip,
        headers.get("x-vercel-ip-country") || null,
        headers.get("x-vercel-ip-country-region") || null,
        decodeHeader(headers.get("x-vercel-ip-city")),
        latitude ? Number(latitude) : null,
        longitude ? Number(longitude) : null,
        userAgent,
        headers.get("referer") || null,
        visitorId,
      ]
    );
  } catch (err) {
    console.error("logVisit a échoué (ignoré) :", err);
  }
}
