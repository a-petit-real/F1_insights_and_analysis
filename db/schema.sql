-- Schéma PostgreSQL — Phase 2 (données structurées)
--
-- Conçu à partir de la forme réelle de l'API Jolpica-F1 (fork Ergast,
-- compatible), inspectée via scripts/inspect_jolpica.py (voir
-- .github/workflows/jolpica-inspect.yml pour la preuve d'exécution).
-- Reprend les identifiants texte de Jolpica (driverId, constructorId,
-- circuitId...) comme clés primaires plutôt que de générer nos propres ID :
-- ça simplifie l'ingestion (upsert direct sur la clé source) et garde une
-- correspondance 1:1 lisible avec l'API d'origine.
--
-- Portée volontairement limitée à ce que Jolpica fournit (résultats de
-- course, classements pilotes/écuries, calendrier). Les données
-- détaillées (temps au tour, stratégie pneus, météo, messages de
-- course) ont leurs propres tables dans schema_fastf1.sql, alimentées
-- depuis l'API OpenF1 (voir scripts/ingest_openf1.py).

-- ---------------------------------------------------------------------
-- Référentiels
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS circuits (
    circuit_id    TEXT PRIMARY KEY,        -- ex. "bahrain"
    name          TEXT NOT NULL,
    locality      TEXT,
    country       TEXT,
    latitude      NUMERIC(9, 5),
    longitude     NUMERIC(9, 5),
    wiki_url      TEXT
);

CREATE TABLE IF NOT EXISTS drivers (
    driver_id         TEXT PRIMARY KEY,    -- ex. "max_verstappen"
    code              TEXT,                -- ex. "VER" (peut changer d'une saison à l'autre pour un pilote donné, donc pas unique dans le temps)
    permanent_number  INTEGER,
    given_name        TEXT NOT NULL,
    family_name       TEXT NOT NULL,
    date_of_birth     DATE,
    nationality       TEXT,
    wiki_url          TEXT
);

CREATE TABLE IF NOT EXISTS constructors (
    constructor_id  TEXT PRIMARY KEY,      -- ex. "red_bull"
    name            TEXT NOT NULL,
    nationality     TEXT,
    wiki_url        TEXT
);

-- ---------------------------------------------------------------------
-- Calendrier
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS races (
    race_id           SERIAL PRIMARY KEY,
    season            INTEGER NOT NULL,
    round             INTEGER NOT NULL,
    race_name         TEXT NOT NULL,
    circuit_id        TEXT NOT NULL REFERENCES circuits(circuit_id),
    race_date         DATE NOT NULL,
    race_time         TIME,                -- UTC, nullable (pas toujours connu à l'avance)
    fp1_date          DATE,
    fp1_time          TIME,
    fp2_date          DATE,
    fp2_time          TIME,
    fp3_date          DATE,
    fp3_time          TIME,
    qualifying_date   DATE,
    qualifying_time   TIME,
    sprint_date       DATE,
    sprint_time       TIME,
    wiki_url          TEXT,
    UNIQUE (season, round)
);

CREATE INDEX IF NOT EXISTS idx_races_season ON races(season);

-- ---------------------------------------------------------------------
-- Résultats de course
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS results (
    result_id             SERIAL PRIMARY KEY,
    race_id               INTEGER NOT NULL REFERENCES races(race_id) ON DELETE CASCADE,
    driver_id             TEXT NOT NULL REFERENCES drivers(driver_id),
    constructor_id        TEXT NOT NULL REFERENCES constructors(constructor_id),
    car_number            INTEGER,
    grid                  INTEGER,             -- position sur la grille de départ
    finish_position        INTEGER,             -- NULL si non classé (abandon, etc.)
    finish_position_text   TEXT,                -- Jolpica renvoie parfois "R" (retired), "DQ"... conservé tel quel
    points                 NUMERIC(5, 2) NOT NULL DEFAULT 0,
    laps_completed          INTEGER,
    status                TEXT,                -- "Finished", "+1 Lap", "Accident", ...
    time_millis            BIGINT,              -- temps total en ms, NULL si non classé sur le même tour
    time_text              TEXT,                -- ex. "1:31:44.742"
    fastest_lap_rank        INTEGER,
    fastest_lap_number      INTEGER,
    fastest_lap_time        TEXT,                -- ex. "1:32.608" (texte : pas d'arithmétique prévue dessus pour l'instant)
    fastest_lap_avg_speed_kph  NUMERIC(6, 3),
    UNIQUE (race_id, driver_id)
);

CREATE INDEX IF NOT EXISTS idx_results_race ON results(race_id);
CREATE INDEX IF NOT EXISTS idx_results_driver ON results(driver_id);
CREATE INDEX IF NOT EXISTS idx_results_constructor ON results(constructor_id);

-- ---------------------------------------------------------------------
-- Classements (snapshot après chaque round — c'est la forme que Jolpica
-- expose : /driverStandings et /constructorStandings sont scopés à une
-- saison ET un round donnés, pas juste un état "courant")
-- ---------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS driver_standings (
    id             SERIAL PRIMARY KEY,
    season         INTEGER NOT NULL,
    round          INTEGER NOT NULL,
    driver_id      TEXT NOT NULL REFERENCES drivers(driver_id),
    position       INTEGER,             -- NULL si non classé (Jolpica omet "position" pour un pilote à 0 point, positionText="-")
    position_text  TEXT,
    points         NUMERIC(6, 2) NOT NULL,
    wins           INTEGER NOT NULL DEFAULT 0,
    UNIQUE (season, round, driver_id)
);

CREATE INDEX IF NOT EXISTS idx_driver_standings_season_round ON driver_standings(season, round);

CREATE TABLE IF NOT EXISTS constructor_standings (
    id               SERIAL PRIMARY KEY,
    season           INTEGER NOT NULL,
    round            INTEGER NOT NULL,
    constructor_id   TEXT NOT NULL REFERENCES constructors(constructor_id),
    position         INTEGER,           -- NULL si non classé (même raison que driver_standings.position)
    position_text    TEXT,
    points           NUMERIC(6, 2) NOT NULL,
    wins             INTEGER NOT NULL DEFAULT 0,
    UNIQUE (season, round, constructor_id)
);

CREATE INDEX IF NOT EXISTS idx_constructor_standings_season_round ON constructor_standings(season, round);

-- Filet de sécurité pour une base déjà créée avant que "position" ne soit
-- rendu nullable ci-dessus (CREATE TABLE IF NOT EXISTS n'aurait pas modifié
-- une table existante). Sans effet si la colonne est déjà nullable.
ALTER TABLE driver_standings ALTER COLUMN position DROP NOT NULL;
ALTER TABLE constructor_standings ALTER COLUMN position DROP NOT NULL;

-- ---------------------------------------------------------------------
-- Note : un pilote peut courir pour plusieurs écuries dans une même
-- saison (transfert en cours d'année) — la table results capture ça
-- correctement course par course puisque constructor_id y est stocké
-- par résultat, pas rattaché au pilote lui-même.
-- ---------------------------------------------------------------------
