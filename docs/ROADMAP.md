# Roadmap — macro-étapes de construction

Principe directeur : ne pas paralléliser la Phase 2 (données structurées) et la Phase 5 (prédiction) trop tôt — la qualité d'un modèle de prédiction dépend directement de la profondeur de l'historique de données accumulé en Phase 2.

État réel par phase à jour au 7 septembre 2026 — voir [`ARCHITECTURE.md`](ARCHITECTURE.md) pour le détail technique de ce qui est décrit ✅ ci-dessous, et [`OPERATIONS.md`](OPERATIONS.md) pour le runbook. Le suivi tâche par tâche au jour le jour se fait sur "The Garage" (tableau kanban, cf. `OPERATIONS.md`) — ce document reste la vue macro.

## Phase 0 — Fondations ✅ fait

- ✅ Stack choisi et repo en place — pas tout à fait celui envisagé (voir `ARCHITECTURE.md` : pas de monorepo backend/frontend séparé, tout est dans `web/` + `scripts/` + `db/`).
- ✅ Premier jet de design system — posé dans `web/app/globals.css`, documenté dans [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md).
- ⚠️ Pas de CI de lint/build : `npm run build` se lance manuellement avant chaque push, aucun workflow GitHub Actions ne le fait (voir "CI/CD" dans `ARCHITECTURE.md`).

## Phase 1 — MVP éditorial ✅ fait, sur un format différent de celui envisagé

- ✅ Publication des analyses dans le format déjà pratiqué (verdict global, contexte, dynamique de course, décisions stratégiques, bilan pilote par pilote et équipe par équipe, sources) — 13 comptes-rendus de course publiés (rounds 1-13), pré-analyses pour les rounds 13 et 14, articles EL1/EL2/EL3/Qualifs pour le round 13. Rounds 12 et 13 traduits en anglais.
- ❌ **Pas de contenu en Markdown versionné en base** — chaque article est un module JS statique (`web/app/courses/<round>/*.js`), pas du Markdown, pas en base de données. Choix assumé de simplicité, documenté dans `ARCHITECTURE.md` §2.
- ❌ **Pas d'authentification par invitation** — le site est public (accessible à quiconque a l'URL Vercel). Reste à faire avant toute diffusion plus large — voir `ARCHITECTURE.md` §5.
- ✅ Déploiement (Vercel), mais public plutôt que privé (cf. point précédent).

## Phase 2 — Données structurées ✅ fait pour l'essentiel

- ✅ Intégration Jolpica-F1 (résultats, classements) — **automatisée**, cron quotidien.
- ✅ Intégration OpenF1 (temps au tour avec secteurs, stints pneus, météo, messages de course, dépassements) — course ET séances d'essais/qualifs — mais **déclenchement manuel uniquement**, pas de cron (voir `OPERATIONS.md`).
- ✅ Modélisation PostgreSQL — deux fichiers de schéma (`db/schema.sql`, `db/schema_fastf1.sql`), hébergés sur Neon.
- ✅ Pages dynamiques : classement pilotes/constructeurs (`/classement`), fiche course avec graphiques Recharts (temps au tour, météo) et tableaux (stratégie pneus, RCM, dépassements) sous l'onglet "Raw data" de chaque round.
- ❌ Pas de comparateur dédié (pilotes/stratégies/circuits) — envisagé, non construit.

## Phase 3 — Agrégation élargie — non commencé

- ❌ Veille automatisée Pirelli et presse spécialisée (Motorsport.com, The Race, Reuters) — aucun scraping construit, malgré `docs/DATA_SOURCES.md` qui les liste comme sources cibles.
- ❌ Système de fiches sources automatisé — chaque article a sa propre section `<details class="sources">` écrite à la main, pas de système transverse.
- ❌ Recherche interne, tags thématiques — non construits.

## Phase 4 — Design et UX avancés — en cours, au-delà de ce qui était prévu

- ✅ Data visualisation (Recharts — temps au tour, météo), pas encore de timeline de course animée ni de comparateur visuel.
- ⚠️ Thème clair/sombre : le CSS existe (`:root[data-theme="dark"]`, `prefers-color-scheme`) mais aucune bascule n'est exposée dans l'UI — bascule automatique système uniquement.
- ✅ Optimisation mobile — travail approfondi le 7 septembre 2026 (tableaux responsive, repère de section, largeur de page), voir [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) pour le détail.
- **Fonctionnalités ajoutées, non prévues dans cette roadmap initiale** :
  - Anti-spoiler par séance (`web/lib/spoilerGuard.js`), actif à partir du round 13.
  - Bascule bilingue FR/EN (`web/lib/langPref.js`), pour les rounds/séances traduits.
  - Calendrier de saison avec carte interactive (`SeasonCalendar.jsx`).
  - Tableau de bord d'accueil (dernier résultat + prochain GP, déterminé par présence réelle de données).

## Phase 5 — Interactivité : simulation et prédiction — non commencé

Rien n'a été codé. Reste cohérent avec le principe directeur ci-dessus : la Phase 2 tourne depuis peu (saison 2026 en cours), l'historique accumulé est encore trop mince pour justifier un modèle de prédiction sérieux.

## Phase 6 — Industrialisation légère — très partiel

- ❌ Tests automatisés — aucun test n'existe sur les pipelines de données ni sur le site.
- ❌ Monitoring/alerting (Sentry ou équivalent) — rien de configuré ; un échec d'ingestion silencieux ne serait détecté qu'en le remarquant sur le site.
- ✅ Documentation technique tenue à jour — cette révision du 7 septembre 2026 (`ARCHITECTURE.md`, `OPERATIONS.md`, `DESIGN_SYSTEM.md`, ce document) vise précisément ça. À maintenir à chaque changement structurel, pas seulement en rattrapage périodique.
- N/A Gestion multi-utilisateurs — sans authentification (Phase 1), la question ne se pose pas encore.

## Écarts notables

Classés par risque produit réel, pas par écart avec la vision initiale :

1. **Pas de monitoring d'ingestion** — le cron Jolpica quotidien peut échouer silencieusement ; personne n'est alerté.
2. **Pas de CI** — un `npm run build` cassé n'est détecté qu'au moment de le lancer soi-même avant de pousser.
3. **Authentification absente** — écart avec `VISION.md`, mais **décision assumée, pas un risque en l'état** : le site n'est pas indexé (pas de `sitemap.xml`, jamais soumis à Google), l'URL n'a été partagée qu'à un cercle restreint de confiance (3 personnes), et le contenu n'a rien de confidentiel (analyses F1 à partir de données publiques — résultats officiels, API OpenF1 — pas de données personnelles, pas de compte utilisateur). À reconsidérer seulement si la diffusion de l'URL s'élargit sensiblement au-delà de ce cercle.
