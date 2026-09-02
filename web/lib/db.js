// Connexion à la base de données de production, réutilisée entre les
// requêtes (pool). N'est appelé que côté serveur (Server Components / route
// handlers) — DATABASE_URL n'est jamais exposé au navigateur.
import { Pool } from "pg";

let pool;

export function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL manquant : à ajouter dans Vercel (Project Settings → Environment Variables)."
      );
    }
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }, // Neon exige TLS
    });
  }
  return pool;
}

export async function query(text, params) {
  const client = await getPool().connect();
  try {
    const res = await client.query(text, params);
    return res.rows;
  } finally {
    client.release();
  }
}
