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

export async function getLapTimesByDriver(raceId) {
  // Un point par tour, temps converti en secondes pour le graphique.
  const rows = await query(
    `SELECT d.family_name, res.car_number, lt.lap_number,
            EXTRACT(EPOCH FROM lt.lap_time) AS lap_seconds,
            lt.pit_in_time IS NOT NULL AS pit_in
     FROM lap_times lt
     JOIN results res ON res.race_id = lt.race_id AND res.car_number = lt.car_number
     JOIN drivers d ON d.driver_id = res.driver_id
     WHERE lt.race_id = $1 AND lt.lap_time IS NOT NULL
     ORDER BY d.family_name, lt.lap_number`,
    [raceId]
  );
  const byDriver = {};
  for (const row of rows) {
    if (!byDriver[row.family_name]) byDriver[row.family_name] = [];
    byDriver[row.family_name].push({
      lap: row.lap_number,
      seconds: row.lap_seconds ? Number(row.lap_seconds) : null,
      pitIn: row.pit_in,
    });
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

export async function getOvertakes(raceId) {
  // Jointure sur results deux fois (voiture dépassante / dépassée) pour
  // afficher des noms de pilotes plutôt que des numéros de voiture bruts.
  return query(
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
}
