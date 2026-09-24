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
