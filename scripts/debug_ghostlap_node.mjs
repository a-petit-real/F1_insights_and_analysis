// Vérifie getQualiDuelReplay (web/lib/raceData.js) avec le VRAI driver
// utilisé en production (`pg`, pas psycopg) — capture toute exception
// silencieuse spécifique au driver Node/Vercel que les scripts Python
// (debug_ghostlap_check.py) ne peuvent pas révéler. GhostLapReplay.jsx
// n'a pas de .catch() sur l'appel au Server Action : une rejection ici
// laisserait le composant bloqué à "rien affiché" indéfiniment, côté
// production, sans qu'aucun test côté Python ne le détecte.
//
// Usage : node scripts/debug_ghostlap_node.mjs --season 2026 --round 14 --session Qualifying --cars 1,12,3
import { Pool } from "pg";

function parseArgs() {
  const args = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      args[argv[i].slice(2)] = argv[i + 1];
      i++;
    }
  }
  return args;
}

const args = parseArgs();
const databaseUrl = args["database-url"] || process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL manquant.");
  process.exit(1);
}

const pool = new Pool({ connectionString: databaseUrl, ssl: { rejectUnauthorized: false } });

async function query(text, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res.rows;
  } finally {
    client.release();
  }
}

// Miroir EXACT de getPracticeTelemetryLaps (raceData.js).
async function getPracticeTelemetryLaps(sessionKey, carLapPairs) {
  if (!carLapPairs.length) return {};
  const carNumbers = carLapPairs.map((p) => p.carNumber);
  const lapNumbers = carLapPairs.map((p) => p.lapNumber);
  const rows = await query(
    `SELECT pd.name_acronym, pd.full_name, pd.team_name, pt.car_number, pt.distance_m, pt.speed_kmh, pt.x_m, pt.y_m, pt.t_s
     FROM practice_telemetry pt
     JOIN practice_drivers pd ON pd.session_key = pt.session_key AND pd.car_number = pt.car_number
     JOIN UNNEST($2::int[], $3::int[]) AS wanted(car_number, lap_number)
       ON wanted.car_number = pt.car_number AND wanted.lap_number = pt.lap_number
     WHERE pt.session_key = $1`,
    [sessionKey, carNumbers, lapNumbers]
  );
  const byDriver = {};
  for (const row of rows) {
    const distances = row.distance_m || [];
    const speeds = row.speed_kmh || [];
    const xs = row.x_m || [];
    const ys = row.y_m || [];
    const ts = row.t_s || [];
    byDriver[row.name_acronym] = {
      fullName: row.full_name,
      teamName: row.team_name,
      carNumber: row.car_number,
      points: distances.map((d, i) => ({
        distance: Number(d),
        speed: speeds[i] != null ? Number(speeds[i]) : null,
        x: xs[i] != null ? Number(xs[i]) : null,
        y: ys[i] != null ? Number(ys[i]) : null,
        t: ts[i] != null ? Number(ts[i]) : null,
      })),
    };
  }
  return byDriver;
}

// Miroir EXACT de getQualiDuelReplay (raceData.js).
async function getQualiDuelReplay(raceId, sessionName, carNumbers) {
  const sessionRows = await query(
    `SELECT session_key FROM practice_sessions WHERE race_id = $1 AND session_name = $2`,
    [raceId, sessionName]
  );
  const sessionKey = sessionRows[0]?.session_key;
  if (!sessionKey) return null;

  const bestLapRows = await query(
    `SELECT DISTINCT ON (car_number) car_number, lap_number, lap_time
     FROM practice_laps
     WHERE session_key = $1 AND car_number = ANY($2::int[]) AND lap_time IS NOT NULL
     ORDER BY car_number, lap_time ASC`,
    [sessionKey, carNumbers]
  );
  if (!bestLapRows.length) return null;

  const telemetry = await getPracticeTelemetryLaps(
    sessionKey,
    bestLapRows.map((r) => ({ carNumber: r.car_number, lapNumber: r.lap_number }))
  );
  const bestLapTimeByCarNumber = Object.fromEntries(bestLapRows.map((r) => [r.car_number, Number(r.lap_time)]));
  for (const acronym of Object.keys(telemetry)) {
    telemetry[acronym].bestLapTime = bestLapTimeByCarNumber[telemetry[acronym].carNumber] ?? null;
  }
  return telemetry;
}

async function main() {
  const season = Number(args.season);
  const round = Number(args.round);
  const sessionName = args.session || "Qualifying";
  const carNumbers = (args.cars || "").split(",").map((c) => parseInt(c.trim(), 10));

  const raceRows = await query("SELECT race_id FROM races WHERE season=$1 AND round=$2", [season, round]);
  if (!raceRows.length) {
    console.error(`Round ${round} (saison ${season}) introuvable.`);
    process.exit(1);
  }
  const raceId = raceRows[0].race_id;
  console.log(`race_id=${raceId}, session=${sessionName}, cars=${carNumbers.join(",")}`);

  try {
    const telemetry = await getQualiDuelReplay(raceId, sessionName, carNumbers);
    if (telemetry === null) {
      console.log("RÉSULTAT: null (session_key ou bestLapRows introuvable côté SQL)");
    } else {
      const keys = Object.keys(telemetry);
      console.log(`RÉSULTAT: objet avec ${keys.length} pilote(s): ${keys.join(", ")}`);
      for (const k of keys) {
        const d = telemetry[k];
        console.log(`  ${k}: team=${d.teamName}, car=${d.carNumber}, bestLapTime=${d.bestLapTime}, points=${d.points.length}`);
      }
      const validDrivers = keys.filter((k) => telemetry[k].points.length >= 2);
      console.log(`\nPilotes avec >=2 points (condition du filtre frontend) : ${validDrivers.length}`);
      if (validDrivers.length < 2) {
        console.log("!!! MOINS DE 2 PILOTES VALIDES -> le composant resterait bloqué sur 'Chargement du réplay…' !!!");
      } else {
        console.log("OK : le composant devrait s'afficher normalement avec ces données.");
      }
    }
  } catch (err) {
    console.error("EXCEPTION LEVÉE PAR getQualiDuelReplay (ce qui expliquerait un rendu vide en production, car GhostLapReplay.jsx n'a pas de .catch()) :");
    console.error(err);
    process.exit(2);
  } finally {
    await pool.end();
  }
}

main();
