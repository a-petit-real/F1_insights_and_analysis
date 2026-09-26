-- Schéma PostgreSQL — tables propres au site (pas de source de données
-- externe), par opposition à schema.sql (Jolpica) et schema_fastf1.sql
-- (OpenF1). Première table : feedback, alimentée par le bouton "Feedback"
-- du header (web/app/components/FeedbackButton.jsx) via une Server Action
-- (web/app/feedbackActions.js).
--
-- Processus de suivi (convenu avec l'utilisateur) : une veille quotidienne
-- (routine planifiée, même mécanisme que "Veille séances F1") relit les
-- lignes status='new', les analyse (claude_notes), passe leur statut à
-- 'reviewed', et propose un point quotidien. Une fois une idée validée et
-- ajoutée à The Garage (backlog Kanban, cf. docs/OPERATIONS.md), la ligne
-- passe à 'planned' avec garage_card_id renseigné ; si déclinée, 'archived'.

CREATE TABLE IF NOT EXISTS feedback (
    id              SERIAL PRIMARY KEY,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    type            TEXT NOT NULL CHECK (type IN ('bug', 'idee', 'question')),
    message         TEXT NOT NULL,
    contact_email   TEXT,
    page_url        TEXT,
    status          TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'planned', 'archived')),
    claude_notes    TEXT,
    garage_card_id  TEXT
);

CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);

-- Suivi de fréquentation, alimenté par web/proxy.js à chaque requête
-- HTTP (hors assets statiques, cf. le matcher du middleware). Demandé par
-- l'utilisateur : un récap quotidien des visiteurs uniques avec IP et
-- géolocalisation, pour voir si les quelques personnes à qui l'accès au
-- site a été donné l'utilisent réellement (pas de compte utilisateur sur
-- ce site, donc pas d'autre moyen de les distinguer). "Visiteur unique" =
-- hash(IP + user-agent) calculé côté application, colonne visitor_id
-- (web/lib/visitLog.js) — regroupé côté lecture par scripts/visits_briefing.py.
-- Géolocalisation lue depuis les en-têtes que Vercel ajoute automatiquement
-- à chaque requête (x-vercel-ip-*), sans dépendance externe.
--
-- Donnée personnelle (IP, géolocalisation) : jamais exposée sur le site
-- lui-même, accessible uniquement via la base de production et le
-- workflow GitHub Actions en lecture seule (visits-briefing.yml).
CREATE TABLE IF NOT EXISTS site_visits (
    id          BIGSERIAL PRIMARY KEY,
    visited_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    path        TEXT NOT NULL,
    ip          TEXT,
    country     TEXT,
    region      TEXT,
    city        TEXT,
    latitude    DOUBLE PRECISION,
    longitude   DOUBLE PRECISION,
    user_agent  TEXT,
    referrer    TEXT,
    visitor_id  TEXT
);

CREATE INDEX IF NOT EXISTS idx_site_visits_visited_at ON site_visits(visited_at);
CREATE INDEX IF NOT EXISTS idx_site_visits_visitor_id ON site_visits(visitor_id);
