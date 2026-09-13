// Requêtes de lecture pour les pages /courses — un point d'entrée par type
// de donnée, pour rester lisible et facile à étendre.
import { query } from "./db";

export async function getSeasonSchedule(season) {
  return query(
    `SELECT r.race_id, r.round, r.race_name, r.race_date, c.name AS circuit_name, c.country
     FROM races r JOIN circuits c ON c.circuit_id = r.circuit_id
     WHERE r.season = $1 ORDER BY r.round`,
    [season]
  );
}

export async function getRace(season, round) {
  const rows = await query(
    `SELECT r.race_id, r.round, r.season, r.race_name, r.race_date, c.name AS circuit_name, c.country
     FROM races r JOIN circuits c ON c.circuit_id = r.circuit_id
     WHERE r.season = $1 AND r.round = $2`,
    [season, round]
  );
  return rows[0] || null;
}

// Vainqueur de chaque course de la saison (round -> family_name), pour
// confronter les pronostics "Pick de PTW" (web/lib/ptwPicks.js) aux
// résultats réels sur toute la saison, pas seulement le round courant —
// nécessaire pour le bilan cumulé ("X/Y corrects") affiché dans Raw data.
// Une seule requête pour toute la saison (13-14 lignes) plutôt qu'un
// aller-retour par round.
export async function getRaceWinners(season) {
  const rows = await query(
    `SELECT r.round, d.family_name
     FROM results res
     JOIN races r ON r.race_id = res.race_id
     JOIN drivers d ON d.driver_id = res.driver_id
     WHERE r.season = $1 AND res.finish_position = 1`,
    [season]
  );
  const byRound = {};
  for (const row of rows) byRound[row.round] = row.family_name;
  return byRound;
}

export async function getResults(raceId) {
  return query(
    `SELECT res.finish_position, res.grid, res.car_number, res.points, res.status, res.time_text,
            res.fastest_lap_rank, d.given_name, d.family_name, d.driver_id, c.name AS team_name
     FROM results res
     JOIN drivers d ON d.driver_id = res.driver_id
     JOIN constructors c ON c.constructor_id = res.constructor_id
     WHERE res.race_id = $1
     ORDER BY COALESCE(res.finish_position, 99)`,
    [raceId]
  );
}

// Codes de statut piste "sales" (course pas dans des conditions
// représentatives) — cf. schema_fastf1.sql : 4=SC, 5=rouge, 6/7=VSC. Un tour
// qui chevauche un de ces états n'est pas représentatif du rythme réel d'un
// pilote, même filtrage que la référence du secteur (f1pace.com, benchmark
// du 09/09/2026) : "removed the laps that were not raced under green or
// yellow flag conditions."
const DIRTY_TRACK_STATUS_CODES = new Set(["4", "5", "6", "7"]);

// Reconstruit les intervalles [début, fin] (en secondes de session_time)
// pendant lesquels la piste était dans un état "sale" (SC/VSC/rouge), à
// partir de la séquence chronologique brute des changements de statut.
// Un intervalle sans retransition au vert avant la fin de la course (piste
// encore SC au moment du dernier événement connu, rare) reste ouvert
// jusqu'à +Infinity plutôt que d'être ignoré.
function buildDirtyIntervals(statusEvents) {
  const intervals = [];
  let start = null;
  for (const e of statusEvents) {
    const t = Number(e.t);
    const dirty = DIRTY_TRACK_STATUS_CODES.has(String(e.status_code));
    if (dirty && start == null) start = t;
    if (!dirty && start != null) {
      intervals.push([start, t]);
      start = null;
    }
  }
  if (start != null) intervals.push([start, Infinity]);
  return intervals;
}

export async function getLapTimesByDriver(raceId) {
  // Un point par tour, temps converti en secondes pour le graphique.
  // session_time (temps écoulé dans la session au moment où le tour est
  // bouclé) sert aussi de base au graphique de position par tour côté
  // client (RawDataTab) : trier tous les pilotes par ce temps cumulé à un
  // tour donné donne directement leur position sur la piste à ce moment,
  // sans avoir besoin d'ingérer un flux "position" séparé côté OpenF1.
  //
  // prev_session_seconds (LAG côté SQL, par voiture) donne l'instant de
  // début de CE tour = fin du tour précédent — nécessaire pour savoir si un
  // tour chevauche un intervalle "sale" (cf. buildDirtyIntervals), sans
  // requêter lap_times une deuxième fois.
  const [rows, statusEvents] = await Promise.all([
    query(
      `SELECT d.family_name, res.car_number, lt.lap_number,
              EXTRACT(EPOCH FROM lt.lap_time) AS lap_seconds,
              EXTRACT(EPOCH FROM lt.session_time) AS session_seconds,
              EXTRACT(EPOCH FROM LAG(lt.session_time) OVER (PARTITION BY lt.car_number ORDER BY lt.lap_number)) AS prev_session_seconds,
              lt.pit_in_time IS NOT NULL AS pit_in,
              lt.pit_out_time IS NOT NULL AS pit_out
       FROM lap_times lt
       JOIN results res ON res.race_id = lt.race_id AND res.car_number = lt.car_number
       JOIN drivers d ON d.driver_id = res.driver_id
       WHERE lt.race_id = $1 AND lt.lap_time IS NOT NULL
       ORDER BY d.family_name, lt.lap_number`,
      [raceId]
    ),
    query(
      `SELECT EXTRACT(EPOCH FROM session_time) AS t, status_code
       FROM track_status_events WHERE race_id = $1 ORDER BY session_time`,
      [raceId]
    ),
  ]);
  const dirtyIntervals = buildDirtyIntervals(statusEvents);

  const byDriver = {};
  for (const row of rows) {
    if (!byDriver[row.family_name]) byDriver[row.family_name] = [];
    const t = Number(row.session_seconds);
    const prevT = row.prev_session_seconds != null ? Number(row.prev_session_seconds) : 0;
    const dirty = dirtyIntervals.some(([s, e]) => t >= s && prevT <= e);
    // "propre" : ni tour d'entrée/sortie stands (temps gonflé par la voie
    // des stands), ni 1er tour (pas représentatif du rythme, cf. f1pace),
    // ni tour chevauchant SC/VSC/drapeau rouge — c'est ce filtre en amont,
    // pas un recadrage d'échelle a posteriori, qui écarte les tours non
    // représentatifs des comparaisons de rythme (Temps au tour, Meilleur
    // tour, Temps moyen par tranche de 5 tours dans RaceTabs.jsx). Un
    // décrochage isolé (erreur de pilotage, accrochage) hors de ces cas
    // reste dans les données : trimmedGapDomain s'en charge côté affichage.
    const clean = !row.pit_in && !row.pit_out && row.lap_number > 1 && !dirty;
    byDriver[row.family_name].push({
      lap: row.lap_number,
      seconds: row.lap_seconds ? Number(row.lap_seconds) : null,
      sessionSeconds: row.session_seconds != null ? Number(row.session_seconds) : null,
      pitIn: row.pit_in,
      clean,
    });
  }
  return byDriver;
}

// --- Télémétrie vitesse/distance par tour (feature "Vitesse par tour") --
// lap_telemetry est ingérée à la demande, un round à la fois (cf.
// scripts/ingest_openf1_telemetry.py) — jamais garanti disponible pour un
// round donné. getHasTelemetry sert de garde côté page pour ne proposer le
// sélecteur de tour que quand il y a vraiment quelque chose à afficher.

export async function getHasTelemetry(raceId) {
  const rows = await query(
    `SELECT EXISTS(SELECT 1 FROM lap_telemetry WHERE race_id = $1) AS has_data`,
    [raceId]
  );
  return rows[0]?.has_data === true;
}

export async function getLapTelemetry(raceId, lapNumber) {
  const rows = await query(
    `SELECT d.family_name, lt.distance_m, lt.speed_kmh, lt.x_m, lt.y_m, lt.t_s
     FROM lap_telemetry lt
     JOIN results res ON res.race_id = lt.race_id AND res.car_number = lt.car_number
     JOIN drivers d ON d.driver_id = res.driver_id
     WHERE lt.race_id = $1 AND lt.lap_number = $2
     ORDER BY d.family_name`,
    [raceId, lapNumber]
  );
  const byDriver = {};
  for (const row of rows) {
    const distances = row.distance_m || [];
    const speeds = row.speed_kmh || [];
    const xs = row.x_m || [];
    const ys = row.y_m || [];
    const ts = row.t_s || [];
    byDriver[row.family_name] = distances.map((d, i) => ({
      distance: Number(d),
      speed: speeds[i] != null ? Number(speeds[i]) : null,
      x: xs[i] != null ? Number(xs[i]) : null,
      y: ys[i] != null ? Number(ys[i]) : null,
      t: ts[i] != null ? Number(ts[i]) : null,
    }));
  }
  return byDriver;
}

// Télémétrie d'une séance d'essais/qualification (practice_telemetry,
// alimentée par ingest_openf1_telemetry.py --session "<nom>") pour un duel
// ciblé — pas la séance entière : on connaît à l'avance les tours (car
// leur numéro vient de practice_laps, ex. le meilleur tour de chacun) et
// les pilotes qu'on veut comparer, contrairement à getLapTelemetry (course)
// qui laisse choisir le tour dans un sélecteur. Jointure sur
// practice_drivers (pas `results`) : c'est la liste des pilotes ayant
// réellement roulé CETTE séance précise, cf. docstring de
// ingest_openf1_practice.py (pilote de réserve).
export async function getPracticeTelemetryLaps(sessionKey, carLapPairs) {
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

// Point d'entrée unique pour un "duel" de réplay ciblé (ex. bataille pour
// la pole) : résout la séance et le meilleur tour de chaque pilote demandé,
// puis récupère leur télémétrie — le composant appelant n'a besoin de
// connaître ni session_key ni numéro de tour à l'avance.
export async function getQualiDuelReplay(raceId, sessionName, carNumbers) {
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

// Variante course de getQualiDuelReplay, même forme de retour (clé courte,
// teamName/carNumber/points) — pour GhostLapReplay quand aucune séance
// d'essais/qualification n'a encore de télémétrie ingérée (ex. panne
// ponctuelle de l'API OpenF1) mais qu'un tour de course existe déjà en
// base. family_name sert de clé plutôt que name_acronym : lap_telemetry
// (course) n'a pas de lien vers practice_drivers, seulement vers
// results/drivers.
export async function getRaceLapReplay(raceId, lapNumber, familyNames) {
  const rows = await query(
    `SELECT d.family_name, c.name AS team_name, lt.car_number, lt.distance_m, lt.speed_kmh, lt.x_m, lt.y_m, lt.t_s
     FROM lap_telemetry lt
     JOIN results res ON res.race_id = lt.race_id AND res.car_number = lt.car_number
     JOIN drivers d ON d.driver_id = res.driver_id
     JOIN constructors c ON c.constructor_id = res.constructor_id
     WHERE lt.race_id = $1 AND lt.lap_number = $2 AND d.family_name = ANY($3::text[])`,
    [raceId, lapNumber, familyNames]
  );
  const byDriver = {};
  for (const row of rows) {
    const distances = row.distance_m || [];
    const speeds = row.speed_kmh || [];
    const xs = row.x_m || [];
    const ys = row.y_m || [];
    const ts = row.t_s || [];
    byDriver[row.family_name] = {
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

export async function getTyreStints(raceId) {
  return query(
    `SELECT d.family_name, res.car_number, ts.stint_number, ts.compound, ts.is_new,
            MIN(ts.lap_number) AS start_lap, MAX(ts.total_laps) AS age_laps
     FROM tyre_stints ts
     JOIN results res ON res.race_id = ts.race_id AND res.car_number = ts.car_number
     JOIN drivers d ON d.driver_id = res.driver_id
     WHERE ts.race_id = $1 AND ts.compound IS NOT NULL
     GROUP BY d.family_name, res.car_number, ts.stint_number, ts.compound, ts.is_new
     ORDER BY d.family_name, ts.stint_number`,
    [raceId]
  );
}

export async function getWeatherSeries(raceId) {
  const rows = await query(
    `SELECT EXTRACT(EPOCH FROM session_time) AS t, air_temp, track_temp, humidity, rainfall, wind_speed
     FROM weather_readings WHERE race_id = $1 ORDER BY session_time`,
    [raceId]
  );
  return rows.map((r) => ({
    minute: Math.round(Number(r.t) / 60),
    airTemp: r.air_temp !== null ? Number(r.air_temp) : null,
    trackTemp: r.track_temp !== null ? Number(r.track_temp) : null,
    humidity: r.humidity !== null ? Number(r.humidity) : null,
    rainfall: r.rainfall,
  }));
}

export async function getRaceControlMessages(raceId) {
  return query(
    `SELECT message_time, category, message, flag, car_number, lap_number
     FROM race_control_messages WHERE race_id = $1 ORDER BY message_time`,
    [raceId]
  );
}

// --- Essais libres (EL1/EL2/EL3) --------------------------------------
// Schéma séparé (practice_*, indexé par session_key) des tables course
// ci-dessus : cf. commentaire en tête de ces tables dans
// db/schema_fastf1.sql. On résout le pilote depuis practice_drivers
// (spécifique à la séance) plutôt que results/drivers, qui reflète la
// grille de course et se tromperait sur un pilote de réserve (ex. séance
// rookie obligatoire).

export async function getPracticeSessions(raceId) {
  return query(
    `SELECT session_key, session_name, date_start, date_end
     FROM practice_sessions WHERE race_id = $1 ORDER BY date_start`,
    [raceId]
  );
}

export async function getPracticeClassification(sessionKey) {
  return query(
    `SELECT pl.car_number, COALESCE(pd.full_name, 'Pilote #' || pl.car_number) AS full_name,
            pd.name_acronym, pd.team_name, MIN(pl.lap_time) AS best_lap,
            COUNT(*) FILTER (WHERE pl.lap_time IS NOT NULL) AS timed_laps,
            COUNT(*) AS total_laps
     FROM practice_laps pl
     LEFT JOIN practice_drivers pd ON pd.session_key = pl.session_key AND pd.car_number = pl.car_number
     WHERE pl.session_key = $1
     GROUP BY pl.car_number, pd.full_name, pd.name_acronym, pd.team_name
     ORDER BY best_lap ASC NULLS LAST`,
    [sessionKey]
  );
}

export async function getPracticeLapTimesByDriver(sessionKey) {
  const rows = await query(
    `SELECT COALESCE(pd.name_acronym, pd.full_name, 'P#' || pl.car_number) AS label,
            pl.lap_number, pl.lap_time, pl.is_pit_out_lap
     FROM practice_laps pl
     LEFT JOIN practice_drivers pd ON pd.session_key = pl.session_key AND pd.car_number = pl.car_number
     WHERE pl.session_key = $1 AND pl.lap_time IS NOT NULL
     ORDER BY label, pl.lap_number`,
    [sessionKey]
  );
  const byDriver = {};
  for (const row of rows) {
    if (!byDriver[row.label]) byDriver[row.label] = [];
    byDriver[row.label].push({
      lap: row.lap_number,
      seconds: row.lap_time !== null ? Number(row.lap_time) : null,
      pitOut: row.is_pit_out_lap,
    });
  }
  return byDriver;
}

export async function getPracticeStints(sessionKey) {
  return query(
    `SELECT COALESCE(pd.name_acronym, pd.full_name, 'P#' || ps.car_number) AS label,
            ps.stint_number, ps.compound, ps.lap_start, ps.lap_end, ps.tyre_age_at_start
     FROM practice_stints ps
     LEFT JOIN practice_drivers pd ON pd.session_key = ps.session_key AND pd.car_number = ps.car_number
     WHERE ps.session_key = $1
     ORDER BY label, ps.stint_number`,
    [sessionKey]
  );
}

export async function getPracticeWeather(sessionKey) {
  const rows = await query(
    `SELECT EXTRACT(EPOCH FROM session_time) AS t, air_temp, track_temp, humidity, rainfall, wind_speed
     FROM practice_weather WHERE session_key = $1 ORDER BY session_time`,
    [sessionKey]
  );
  return rows.map((r) => ({
    minute: Math.round(Number(r.t) / 60),
    airTemp: r.air_temp !== null ? Number(r.air_temp) : null,
    trackTemp: r.track_temp !== null ? Number(r.track_temp) : null,
    humidity: r.humidity !== null ? Number(r.humidity) : null,
    rainfall: r.rainfall,
  }));
}

// --- Classements généraux (feature anti-spoiler) -----------------------
// driver_standings/constructor_standings sont un instantané PAR ROUND
// (alimenté par ingest_jolpica.py) — jamais interrogé côté web jusqu'ici.
// On récupère tous les rounds d'un coup (13 rounds x ~23 pilotes reste
// minuscule) pour que le composant client puisse choisir la bonne coupe
// selon le round "frontière" anti-spoiler sans aller-retour serveur.

export async function getDriverStandingsAllRounds(season) {
  const rows = await query(
    `SELECT ds.round, ds.position, ds.points, ds.wins, d.given_name, d.family_name, c.name AS team_name
     FROM driver_standings ds
     JOIN drivers d ON d.driver_id = ds.driver_id
     LEFT JOIN LATERAL (
       SELECT co.name FROM results res
       JOIN constructors co ON co.constructor_id = res.constructor_id
       JOIN races r ON r.race_id = res.race_id
       WHERE r.season = ds.season AND r.round = ds.round AND res.driver_id = ds.driver_id
       LIMIT 1
     ) c ON true
     WHERE ds.season = $1
     ORDER BY ds.round, ds.position NULLS LAST`,
    [season]
  );
  const byRound = {};
  for (const row of rows) {
    if (!byRound[row.round]) byRound[row.round] = [];
    byRound[row.round].push(row);
  }
  return byRound;
}

export async function getConstructorStandingsAllRounds(season) {
  const rows = await query(
    `SELECT cs.round, cs.position, cs.points, cs.wins, c.name AS team_name
     FROM constructor_standings cs
     JOIN constructors c ON c.constructor_id = cs.constructor_id
     WHERE cs.season = $1
     ORDER BY cs.round, cs.position NULLS LAST`,
    [season]
  );
  const byRound = {};
  for (const row of rows) {
    if (!byRound[row.round]) byRound[row.round] = [];
    byRound[row.round].push(row);
  }
  return byRound;
}

// Donnée dérivée (voir docs/DATA_SOURCES.md, "Données dérivées côté web") :
// l'endpoint overtakes d'OpenF1 émet parfois, pour deux voitures quasi à
// égalité (bruit GPS/calcul de position), une paire réciproque en moins
// d'une seconde (A dépasse B, puis B dépasse A) — physiquement impossible
// pour un vrai dépassement suivi d'un contre (constaté sur les vraies
// données Monza : Verstappen/Russell 0.179s, Gasly/Hamilton 0.082s,
// Norris/Hamilton 0.036s, Bortoleto/Albon 0.111s d'écart). Une vraie passe
// et contre-passe lors d'une bagarre serrée prend plusieurs secondes
// (ex. 3.318s observé, conservé). On retire donc les deux lignes de toute
// paire réciproque (mêmes pilotes, sens inversé) à moins de 500ms d'écart —
// aucune des deux directions n'étant vérifiable comme "la vraie", on ne
// garde ni l'une ni l'autre plutôt que de deviner.
function dedupeOvertakeFlaps(rows, thresholdMs = 500) {
  const toDrop = new Set();
  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 1; j < rows.length; j++) {
      const dt = Math.abs(new Date(rows[j].overtake_time) - new Date(rows[i].overtake_time));
      if (dt > thresholdMs) break; // rows déjà triées par overtake_time
      const reciprocal =
        rows[i].overtaking_driver === rows[j].overtaken_driver &&
        rows[i].overtaken_driver === rows[j].overtaking_driver;
      if (reciprocal) {
        toDrop.add(i);
        toDrop.add(j);
      }
    }
  }
  return rows.filter((_, idx) => !toDrop.has(idx));
}

export async function getOvertakes(raceId) {
  // Jointure sur results deux fois (voiture dépassante / dépassée) pour
  // afficher des noms de pilotes plutôt que des numéros de voiture bruts.
  const rows = await query(
    `SELECT o.overtake_time, o.position,
            d1.family_name AS overtaking_driver, d2.family_name AS overtaken_driver
     FROM overtakes o
     JOIN results r1 ON r1.race_id = o.race_id AND r1.car_number = o.overtaking_car_number
     JOIN drivers d1 ON d1.driver_id = r1.driver_id
     JOIN results r2 ON r2.race_id = o.race_id AND r2.car_number = o.overtaken_car_number
     JOIN drivers d2 ON d2.driver_id = r2.driver_id
     WHERE o.race_id = $1
     ORDER BY o.overtake_time`,
    [raceId]
  );
  return dedupeOvertakeFlaps(rows);
}
