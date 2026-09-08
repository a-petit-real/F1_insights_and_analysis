# Architecture technique

Vue en couches, **à jour de l'implémentation réelle** (dernière relecture : 7 septembre 2026). Ce document a longtemps décrit une architecture cible (backend Python/FastAPI séparé, Redis, Tailwind) qui n'a jamais été construite ainsi — ce qui a réellement été codé est plus simple, et documenté ci-dessous tel quel. Voir [`ROADMAP.md`](ROADMAP.md) pour ce qui reste à faire.

## Vue d'ensemble

Il n'y a **pas de backend séparé**. Next.js (App Router) fait tout : rendu des pages côté serveur, requêtes SQL directes à PostgreSQL depuis les Server Components (`web/lib/raceData.js` → `web/lib/db.js` → `pg`), et le peu d'interactivité côté client (onglets, anti-spoiler, sélecteur de langue) en composants `"use client"`. Une seule exception à "tout se charge au rendu de la page" : le graphique "Vitesse par tour" (`courses/[round]/telemetryActions.js`) utilise une **Server Action** (`"use server"`) pour aller chercher la télémétrie d'un seul tour à la demande, plutôt que d'envoyer toute la télémétrie de la course au chargement — reste dans le même modèle (Next.js → Postgres directement, pas de route API/backend séparé), juste déclenché depuis le clic plutôt qu'au rendu initial. L'ingestion de données est un ensemble de scripts Python déclenchés par GitHub Actions, qui écrivent directement dans la même base PostgreSQL — aucune API intermédiaire entre l'ingestion et le site.

```
Sources externes (Jolpica, OpenF1)
        │
        ▼
scripts/*.py  ──(GitHub Actions, cron + manuel)──►  PostgreSQL (Neon)
                                                            │
                                                            ▼
                                          Next.js Server Components (web/lib/raceData.js)
                                                            │
                                                            ▼
                                                   Pages rendues (Vercel)
```

## 1. Ingestion de données

| Source | Donnée récupérée | Script | Déclenchement |
|---|---|---|---|
| [Jolpica-F1](https://github.com/jolpica/jolpica-f1) (fork Ergast) | Calendrier, résultats de course, classements pilotes/constructeurs | `scripts/ingest_jolpica.py` | **Automatique** — cron quotidien (`ingest-production.yml`, `0 6 * * *` UTC) + déclenchement manuel |
| [OpenF1](https://openf1.org) | Temps au tour (avec secteurs), stints pneus, météo, messages de course, statuts piste, dépassements — course uniquement | `scripts/ingest_openf1.py` | Manuel (`ingest-openf1.yml`, `workflow_dispatch`) |
| OpenF1 | Mêmes données que ci-dessus, mais par séance (EL1/EL2/EL3/Qualifs/Sprint) | `scripts/ingest_openf1_practice.py` | Manuel (`ingest-openf1-practice.yml`, `workflow_dispatch`) |

**Sources abandonnées** : un premier pipeline basé sur FastF1/`livetiming.formula1.com` a été abandonné — cette source bloque les IP de datacenter et exigeait une étape manuelle depuis un appareil personnel. OpenF1 le remplace intégralement et tourne sans restriction depuis un runner GitHub Actions (confirmé en conditions réelles). Le fichier `db/schema_fastf1.sql` garde ce nom pour des raisons historiques, mais ne contient plus que le schéma alimenté par OpenF1.

Principes réellement appliqués :
- Les upserts sont idempotents (`INSERT ... ON CONFLICT DO UPDATE`) — relancer un script plusieurs fois ou faire tourner le cron un jour sans nouvelle donnée ne casse rien.
- Les pilotes sont identifiés par numéro de course (`car_number`/`driver_number`) plutôt que par résolution `driver_id` à l'ingestion — la correspondance se fait par jointure au moment des requêtes (cf. commentaire en tête de `db/schema_fastf1.sql`).
- Pas d'orchestrateur (Prefect/Dagster) : GitHub Actions (cron + déclenchement manuel) suffit largement au volume F1.
- **Sources non implémentées à ce jour**, malgré la vision initiale : scraping formula1.com, Pirelli press, presse spécialisée (Motorsport.com/The Race/Reuters), API météo dédiée, Reddit. Voir [`ROADMAP.md`](ROADMAP.md) Phase 3.

Détail des scripts et du runbook d'ingestion : [`OPERATIONS.md`](OPERATIONS.md).

## 2. Stockage

- **PostgreSQL, hébergé chez [Neon](https://neon.tech)** (pas d'auto-hébergement Railway/Fly.io/Hetzner envisagé initialement — Neon a été retenu pour sa simplicité et son offre gratuite adaptée à ce volume). Connexion via `DATABASE_URL`, seul secret nécessaire à tout le projet (GitHub Actions + Vercel).
- Deux fichiers de schéma, appliqués séparément :
  - `db/schema.sql` — calendrier, courses, pilotes, écuries, résultats, classements (alimenté par Jolpica).
  - `db/schema_fastf1.sql` — temps au tour, pneus, météo, messages de course, dépassements, séances d'essais (alimenté par OpenF1).
- **Contenu éditorial : PAS en base de données.** Chaque analyse (compte-rendu de course, pré-analyse, EL1-3, Qualifs) est un module JS statique sous `web/app/courses/<round>/*.js`, exportant une constante `ROUND<N>_<TYPE>_<LANG>_HTML` (une chaîne HTML écrite à la main), importée et injectée via `dangerouslySetInnerHTML` par `RaceTabs.jsx`. Pas de CMS, pas d'éditeur, pas d'historique de versions au-delà de Git lui-même. C'est un choix délibéré de simplicité pour un cercle restreint d'utilisateurs et un rythme de publication d'un article par session — voir [`ROADMAP.md`](ROADMAP.md) si ça doit changer.
- **Pas de Redis** : aucune page ne le justifie à ce volume (toutes les pages sont `export const dynamic = "force-dynamic"`, requêtées à chaque visite, sans mise en cache applicative).
- **Pas de stockage objet** (pas d'images/assets uploadés — les seules images externes sont les polices Google Fonts).

## 3. "Backend"

Il n'y a pas de backend au sens d'un service séparé. La couche d'accès aux données est `web/lib/raceData.js` (fonctions `async` exécutant des requêtes SQL directement, appelées depuis les Server Components) — voir la liste complète des fonctions exportées dans ce fichier. Pas de couche ORM, pas de validation de schéma runtime (les requêtes SQL sont écrites à la main).

`web/lib/db.js` gère un pool de connexions `pg` réutilisé entre les requêtes, initialisé paresseusement au premier appel.

## 4. Frontend

**Réel : Next.js 16 (App Router, Turbopack) + React 19.** Pas de Tailwind — CSS écrit à la main dans un unique `web/app/globals.css` (custom properties pour les tokens : couleurs, `--measure` pour la mesure de lecture, `--panel`/`--panel-w` pour le plafond de largeur du site). Voir [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) pour le détail de ce système et des pièges CSS déjà rencontrés (à relire avant toute modification de layout).

- **Data visualisation** : [Recharts](https://recharts.org) (`LineChart` pour les temps au tour, la météo, la position/vitesse par tour, les comparaisons de meilleur tour) — pas Observable Plot/D3 comme envisagé initialement ; Recharts a suffi aux besoins actuels. Exception : le réplay animé du circuit (Raw data) est du SVG + `requestAnimationFrame` fait main (`RaceReplay` dans `RaceTabs.jsx`), Recharts n'étant pas conçu pour une animation position-sur-tracé — cf. skill dataviz du projet pour la méthode de rendu (petits multiples abandonnés au profit d'un seul tracé + points colorés par pilote après retour utilisateur : une carte statique colorée par vitesse ne permettait pas de distinguer les pilotes entre eux).
- **Polices** : Big Shoulders Display (titres), Source Serif 4 (corps de texte), IBM Plex Mono (labels/métadonnées) — chargées via Google Fonts dans `layout.jsx`.
- **Thème** : clair/sombre pris en charge via `prefers-color-scheme` + un attribut `data-theme` (cf. `:root[data-theme="dark"]` dans `globals.css`), pas de bouton de bascule visible dans l'UI actuellement (bascule automatique système uniquement).

Pages réellement implémentées (routes App Router sous `web/app/`) :

| Route | Fichier | Contenu |
|---|---|---|
| `/` | `page.jsx` + `HomeDashboard.jsx` | Dernier résultat + prochain GP (déterminé par présence réelle de données en base, pas par comparaison de date — cf. commentaire dans `page.jsx`) |
| `/courses` | `courses/page.jsx` + `SeasonCalendar.jsx` | Calendrier de la saison : vue liste + carte interactive (SVG, zoom, statut disputée/ce week-end/à venir) |
| `/courses/[round]` | `courses/[round]/page.jsx` + `RaceTabs.jsx` | Fiche course complète : onglets Pré-analyse / EL1 / EL2 / EL3 / Quali / Analyse / Raw data (temps au tour + meilleur tour par gomme + moyenne par tranche de 5 tours, position et vitesse par tour, réplay animé jusqu'à 5 pilotes [SVG, pas Recharts], pneus, météo, RCM, dépassements en graphiques Recharts + tableaux) |
| `/classement` | `classement/page.jsx` + `StandingsView.jsx` | Classement pilotes/constructeurs, protégé par l'anti-spoiler (figé au dernier GP marqué "vu") |

**Pages envisagées mais non implémentées** : fiches pilotes/écuries individuelles avec historique, comparateur, page "Sources & méthodologie" dédiée (chaque article a sa propre section sources en `<details>`, pas de page transverse).

**Fonctionnalités transverses non prévues dans la vision initiale, ajoutées en cours de route** :
- **Anti-spoiler** (`web/lib/spoilerGuard.js`) : granularité par séance (EL1/EL2/EL3/Quali/Race), déclarée manuellement par l'utilisateur, stockée en `localStorage` (pas de compte), effective à partir du round `SPOILER_FROM_ROUND` (13 actuellement). Contenu masqué derrière un bouton "J'ai regardé" tant que la séance n'est pas marquée vue.
- **Bilingue FR/EN** (`web/lib/langPref.js`) : bascule stockée en `localStorage`, uniquement pour les rounds/séances qui ont réellement une traduction (sinon note explicite + repli en français, jamais de mélange silencieux).

## 5. Authentification et accès

**Pas d'authentification implémentée.** Le site est accessible publiquement à quiconque a l'URL de déploiement Vercel — la vision d'un accès par invitation (liste blanche + magic link, Auth.js ou équivalent) reste un principe directeur (cf. [`VISION.md`](VISION.md)) mais n'a jamais été codée. À corriger avant toute diffusion plus large de l'URL du site.

## 6. Interactivité — simulation et prédiction (vision à terme, non commencé)

Rien n'a été codé sur ce plan : pas de modèle de prédiction, pas de simulateur de stratégie. Reste une vision de Phase 5 (voir [`ROADMAP.md`](ROADMAP.md)) — l'historique de données accumulé (Phase 2) est encore trop récent (saison 2026 en cours) pour la justifier.

## 7. Infrastructure

- **Frontend + rendu des pages** : Vercel (déploiement automatique sur push vers la branche par défaut du dépôt GitHub, confirmé par le hash du bundle CSS servi qui change à chaque déploiement).
- **Base de données** : Neon (PostgreSQL managé), un seul environnement de production — pas de staging séparé.
- **CI/CD** : GitHub Actions — mais uniquement pour l'ingestion de données et des utilitaires de debug/lecture (voir [`OPERATIONS.md`](OPERATIONS.md)). **Aucun workflow de lint/test/build n'existe pour le code du site** (`web/`) : la validation (`npm run build`) se fait manuellement avant de pousser.
- **Monitoring** : aucun (pas de Sentry, pas d'analytics). Les erreurs d'ingestion se voient en consultant manuellement les logs du run GitHub Actions concerné.

Pas de Kubernetes, pas de microservices — confirmé, l'audience reste un cercle restreint et rien ne justifie cette complexité à ce stade.
