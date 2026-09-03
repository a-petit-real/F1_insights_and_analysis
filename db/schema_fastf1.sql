-- Schéma PostgreSQL — données détaillées de course (temps au tour avec
-- secteurs, pneus, météo, messages de course), en complément de
-- schema.sql (résultats et classements Jolpica).
--
-- Alimenté depuis l'API OpenF1 (scripts/ingest_openf1.py), accessible
-- sans restriction depuis un runner GitHub Actions — contrairement à
-- FastF1/livetiming.formula1.com, qui bloque les IP de datacenter (voir
-- The Garage, carte c7) et nécessitait une étape manuelle depuis un
-- appareil personnel. Ce pipeline FastF1 a été abandonné au profit
-- d'OpenF1, entièrement automatisable.
--
-- On identifie le pilote par son numéro de course (car_number, lié au
-- pilote et non à la voiture — driver_number côté OpenF1) plutôt que de
-- résoudre driver_id à l'ingestion : la correspondance se fait par
-- jointure sur results(race_id, car_number) au moment des requêtes. Ça
-- évite de dupliquer une logique de résolution fragile dans le script de
-- chargement, et reste correct même si un numéro change de titulaire
-- d'une course à l'autre (le lien passe toujours par la course en
-- question).

CREATE TABLE IF NOT EXISTS lap_times (
    id                    SERIAL PRIMARY KEY,
    race_id               INTEGER NOT NULL REFERENCES races(race_id) ON DELETE CASCADE,
    car_number            INTEGER NOT NULL,
    lap_number            INTEGER NOT NULL,
    session_time          INTERVAL,            -- temps écoulé dans la session au moment où le tour est bouclé
    lap_time              INTERVAL,             -- durée du tour
    sector1_time          INTERVAL,
    sector2_time          INTERVAL,
    sector3_time          INTERVAL,
    sector1_session_time  INTERVAL,
    sector2_session_time  INTERVAL,
    sector3_session_time  INTERVAL,
    speed_i1              NUMERIC(6, 2),        -- vitesse au 1er piège (km/h)
    speed_i2              NUMERIC(6, 2),
    speed_fl              NUMERIC(6, 2),        -- vitesse ligne d'arrivée
    speed_st              NUMERIC(6, 2),        -- vitesse sur la plus longue ligne droite
    pit_in_time            INTERVAL,             -- non NULL si ce tour est un tour d'entrée aux stands
    pit_out_time           INTERVAL,             -- non NULL si ce tour est un tour de sortie des stands
    number_of_pit_stops     INTEGER,
    UNIQUE (race_id, car_number, lap_number)
);

CREATE INDEX IF NOT EXISTS idx_lap_times_race ON lap_times(race_id);
CREATE INDEX IF NOT EXISTS idx_lap_times_race_car ON lap_times(race_id, car_number);

CREATE TABLE IF NOT EXISTS tyre_stints (
    id             SERIAL PRIMARY KEY,
    race_id        INTEGER NOT NULL REFERENCES races(race_id) ON DELETE CASCADE,
    car_number     INTEGER NOT NULL,
    stint_number   INTEGER NOT NULL,
    session_time   INTERVAL,           -- horodatage de cette mesure (un relais peut être mis à jour plusieurs fois)
    lap_number      NUMERIC,            -- numéro du tour au moment de la mesure (peut être fractionnaire/absent)
    compound       TEXT,               -- SOFT / MEDIUM / HARD / INTERMEDIATE / WET
    is_new         BOOLEAN,
    total_laps      NUMERIC            -- âge du train de pneus en tours (cumulé, toutes sessions comprises)
);

CREATE INDEX IF NOT EXISTS idx_tyre_stints_race_car ON tyre_stints(race_id, car_number);

CREATE TABLE IF NOT EXISTS weather_readings (
    id              SERIAL PRIMARY KEY,
    race_id         INTEGER NOT NULL REFERENCES races(race_id) ON DELETE CASCADE,
    session_time    INTERVAL NOT NULL,
    air_temp        NUMERIC(5, 2),
    humidity        NUMERIC(5, 2),
    pressure        NUMERIC(7, 2),
    rainfall        BOOLEAN,
    track_temp      NUMERIC(5, 2),
    wind_direction  INTEGER,
    wind_speed      NUMERIC(5, 2),
    UNIQUE (race_id, session_time)
);

CREATE INDEX IF NOT EXISTS idx_weather_readings_race ON weather_readings(race_id);

CREATE TABLE IF NOT EXISTS race_control_messages (
    id             SERIAL PRIMARY KEY,
    race_id        INTEGER NOT NULL REFERENCES races(race_id) ON DELETE CASCADE,
    message_time   TIMESTAMP NOT NULL,
    category       TEXT,
    message        TEXT NOT NULL,
    status         TEXT,
    flag           TEXT,
    scope          TEXT,
    sector         NUMERIC,
    car_number     INTEGER,           -- concerné si le message cible une voiture précise, NULL sinon
    lap_number      INTEGER
);

CREATE INDEX IF NOT EXISTS idx_race_control_messages_race ON race_control_messages(race_id);

CREATE TABLE IF NOT EXISTS track_status_events (
    id             SERIAL PRIMARY KEY,
    race_id        INTEGER NOT NULL REFERENCES races(race_id) ON DELETE CASCADE,
    session_time   INTERVAL NOT NULL,
    status_code    TEXT,              -- code brut FastF1 (1=vert, 2=jaune, 4=SC, 5=rouge, 6/7=VSC...)
    message        TEXT
);

CREATE INDEX IF NOT EXISTS idx_track_status_events_race ON track_status_events(race_id);
