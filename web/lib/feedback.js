// Accès DB pour la table feedback (db/schema_app.sql) — même pattern que
// lib/raceData.js (query() partagé, cf. lib/db.js), séparé dans son propre
// fichier car sans rapport avec les données de course.
import { query } from "./db";

const TYPES = new Set(["bug", "idee", "question"]);
const MESSAGE_MAX = 2000;

export async function insertFeedback({ type, message, contactEmail, pageUrl }) {
  if (!TYPES.has(type)) {
    throw new Error(`Type de retour invalide : ${type}`);
  }
  const trimmedMessage = (message || "").trim();
  if (!trimmedMessage) {
    throw new Error("Message vide.");
  }
  const rows = await query(
    `INSERT INTO feedback (type, message, contact_email, page_url)
     VALUES ($1, $2, $3, $4)
     RETURNING id`,
    [
      type,
      trimmedMessage.slice(0, MESSAGE_MAX),
      (contactEmail || "").trim().slice(0, 320) || null,
      (pageUrl || "").trim().slice(0, 500) || null,
    ]
  );
  return rows[0].id;
}
