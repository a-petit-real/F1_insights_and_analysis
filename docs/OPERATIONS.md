# Opérations — runbook

Comment faire tourner ce projet au quotidien : ingérer des données, publier un article, diagnostiquer un problème. Complète [`ARCHITECTURE.md`](ARCHITECTURE.md) (le "quoi/pourquoi") par le "comment, concrètement". À jour au 7 septembre 2026.

## Secrets et accès

Un seul secret pour tout le projet : **`DATABASE_URL`** (chaîne de connexion PostgreSQL Neon), configuré :
- dans les secrets du dépôt GitHub (`Settings → Secrets and variables → Actions`) pour les workflows d'ingestion,
- dans les variables d'environnement du projet Vercel pour le site en production.

Il n'y a pas d'autre secret : pas de clé API pour Jolpica ou OpenF1 (les deux sont des API publiques sans authentification), pas de service tiers configuré (pas de Sentry, pas d'analytics).

## Ingérer des données

### Résultats, calendrier, classements (Jolpica) — automatique

Le workflow **`Ingest F1 data (production)`** (`.github/workflows/ingest-production.yml`) tourne **tous les jours à 6h UTC**. Il applique `db/schema.sql` (idempotent) puis lance `scripts/ingest_jolpica.py` pour la saison en cours. Rien à faire en temps normal.

Pour forcer une ingestion (rattraper un round publié en retard, ré-ingérer après un correctif) : déclencher le workflow manuellement (`workflow_dispatch`), avec en entrée optionnelle `season` (vide = saison en cours) et `rounds` (vide = tous les rounds déjà disputés du calendrier).

```bash
# En local, équivalent direct du script lancé par le workflow :
export DATABASE_URL="postgres://..."
psql "$DATABASE_URL" -f db/schema.sql
python scripts/ingest_jolpica.py --season 2026 --rounds 13 14
```

### Temps au tour, pneus, météo, messages de course (OpenF1) — manuel

**Ce pipeline n'est PAS automatisé.** Après chaque course (ou séance d'essais/qualifs si on veut publier une analyse EL/Quali avant la course), déclencher manuellement :

- **`Ingestion OpenF1 (temps au tour, pneus, météo, messages de course)`** (`ingest-openf1.yml`) pour la session de course — entrées : `season` (défaut 2026), `rounds` (vide = toutes les courses déjà disputées).
- **`Ingestion OpenF1 — séance par session`** (`ingest-openf1-practice.yml`) pour EL1/EL2/EL3/Qualifs/Sprint — entrées : `season`, `round` (obligatoire), `session` (menu déroulant : `Practice 1/2/3`, `Qualifying`, `Sprint Qualifying`, `Sprint`, `Race`). **Un round + une séance à la fois** — relancer le workflow pour chaque séance à ingérer.
- **`Ingestion OpenF1 — télémétrie vitesse/distance par tour`** (`ingest-openf1-telemetry.yml`) pour "Vitesse par tour" du Raw data — entrées : `season`, `round` (obligatoire, **un seul round par lancement** : les endpoints `location` et `car_data` pèsent chacun plusieurs Mo par pilote, contrairement aux autres endpoints OpenF1). Nécessite que `ingest-openf1.yml` ait déjà tourné pour ce round (bornes de tour lues depuis l'endpoint `laps`, refetché indépendamment de `lap_times`).

Les trois appliquent `db/schema_fastf1.sql` avant d'ingérer (idempotent, sans risque de le relancer).

**Piège connu** : la séance rookie obligatoire peut faire courir un pilote de réserve absent de la table `drivers` (résultats course) — `ingest_openf1_practice.py` résout donc les pilotes directement depuis l'endpoint `drivers` d'OpenF1 filtré par séance, jamais depuis `results`. Ne pas "simplifier" ce point si on retouche le script.

### Vérifier qu'une ingestion a fonctionné

Scripts de lecture seule, à lancer en local (`DATABASE_URL` exporté) ou via leur workflow GitHub Actions équivalent (`practice-briefing.yml`, `race-briefing*.yml`, `standings-briefing.yml`) :

```bash
python scripts/race_briefing.py --season 2026 --round 13       # résultats, grille, arrêts, pneus, météo, RCM
python scripts/practice_briefing.py --season 2026 --round 13 --session "Practice 1"
python scripts/standings_briefing.py --season 2026 --round 12  # classements pilotes/constructeurs
```

Ces scripts servent un double usage : vérifier que l'ingestion a bien peuplé les tables, **et** fournir la matière première factuelle pour rédiger un article (cf. section suivante). Trois variantes plus ciblées existent pour des besoins de debug ponctuels : `race_briefing_deep.py` (météo en série temporelle + secteurs), `race_briefing_laptimes.py`, `race_briefing_full_rcm.py`.

### Scripts one-off (historiques, pas à relancer en routine)

`scripts/inspect_jolpica.py` et `scripts/debug_standing_shape.py` ont servi à explorer la forme des réponses Jolpica lors de la conception du schéma / au diagnostic d'un bug d'ingestion précis. Conservés pour référence, pas partie du pipeline régulier.

## Publier un article (compte-rendu, pré-analyse, EL/Quali)

Il n'y a pas d'interface d'édition ni de CMS. Un article est un fichier JS statique sous `web/app/courses/<round>/`, qui exporte une constante contenant du HTML écrit à la main :

- `analyse-fr.js` / `analyse-en.js` — compte-rendu de course (`ROUND<N>_ANALYSE_<FR|EN>_HTML`)
- `preanalyse-fr.js` / `preanalyse-en.js` — pré-analyse du GP à venir
- `el1-fr.js`, `el2-fr.js`, `el3-fr.js`, `quali-fr.js` (+ `-en.js`) — analyses de séance

**Étapes pour publier un nouvel article** :

1. Ingérer les données nécessaires (section précédente) et lancer le briefing correspondant pour avoir la matière factuelle sous les yeux.
2. Écrire le HTML dans le fichier du round/type/langue concerné, en suivant le même gabarit que les articles existants (`<section class="block" data-num="01" id="sec-...">`, `.sec-marker`, `h2.sectitle`, `.tablewrap.prose` pour les tableaux, `.callout`, `details.sources` pour les sources) — copier un article récent (round 13) plutôt que repartir de zéro. Voir [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) pour ce que chaque classe fait et pourquoi.
3. Enregistrer le nouveau round dans `RaceTabs.jsx` : ajouter l'import, l'entrée dans `ANALYSE_FR_HTML`/`ANALYSE_EN_HTML` (ou `PRACTICE_FR_HTML`/`PRACTICE_EN_HTML`/`PREANALYSE_FR_HTML`/`PREANALYSE_EN_HTML` selon le type). Un round sans entrée FR affiche "Analyse pas encore rédigée" ; un round sans entrée EN affiche une note + repli en français (jamais de mélange silencieux).
4. `cd web && npm run build` pour valider avant de pousser — pas de CI qui le fait à ta place (voir "CI/CD" dans `ARCHITECTURE.md`).
5. Commit + push vers la branche déployée sur Vercel. Le déploiement est automatique ; se vérifie en observant le hash du bundle CSS/JS servi changer (`/_next/static/immutable/chunks/*.css`), ou simplement en rechargeant la page après ~30-60s.

**Anti-spoiler** : tout round ≥ `SPOILER_FROM_ROUND` (13 actuellement, dans `web/lib/spoilerGuard.js`) est masqué par défaut derrière le bouton "J'ai regardé". Rien à faire côté publication — c'est purement client-side (`localStorage`), pas une option de l'article.

## Passer à une nouvelle saison

`season = 2026` est **codé en dur** à quatre endroits : `web/app/page.jsx`, `web/app/courses/page.jsx`, `web/app/courses/[round]/page.jsx`, `web/app/classement/page.jsx`. Pas de variable d'environnement ni de détection automatique. Au changement de saison, mettre à jour les quatre (et le `default: "2026"` des deux workflows OpenF1).

## Contourner le sandbox interactif (accès réseau restreint)

Le sandbox Claude Code (session interactive) est derrière un proxy qui bloque la plupart des domaines externes (formula1.com, Pirelli, l'API Jolpica/OpenF1 en direct, le site Vercel lui-même). Le workflow **`Fetch URL`** (`fetch-url.yml`) contourne ça : il tourne sur un runner GitHub Actions (accès réseau normal) et retourne le contenu d'une URL (texte nettoyé par défaut, `--raw` pour le HTML/JSON brut). Utile pour vérifier qu'un déploiement Vercel a bien pris en compte un changement (comparer le hash du bundle CSS avant/après push), ou pour aller chercher une page qui servira de source à un article.

```bash
# via gh CLI ou l'UI GitHub Actions, workflow_dispatch avec inputs :
#   url: https://f1platform.vercel.app/courses/13
#   raw: true
#   max_chars: 400000
```

## Développement local du site

```bash
cd web
npm install
DATABASE_URL="postgres://..." npm run dev   # la plupart des pages nécessitent une vraie connexion DB
```

Sans `DATABASE_URL`, les Server Components qui appellent `web/lib/raceData.js` lèvent une erreur explicite (`db.js` refuse de créer un pool sans cette variable) — il n'y a pas de mode dégradé/mock pour le dev local sans base.

`npm run build` avant tout push (aucune CI ne le fait). `npm run lint` existe (`next lint`) mais n'est pas branché sur un hook ni une CI.

## Suivi du backlog produit

Le backlog/roadmap de travail au jour le jour est tenu sur un tableau kanban publié en tant que Claude Artifact ("The Garage"), pas dans ce dépôt — référencé dans les commentaires de code (`db/schema_fastf1.sql`, `scripts/ingest_openf1.py`) sous la forme "voir The Garage, carte cXX".

URL : https://claude.ai/code/artifact/ca80bada-c27d-489a-9ffd-d562cf90bbea (à retrouver aussi via `Artifact({action:"list"})` si l'URL a changé — c'est un Artifact possédé par l'utilisateur, modifiable directement).

Ce document (`docs/ROADMAP.md`) reste la référence des macro-étapes à long terme ; The Garage suit les tâches plus fines, en cours.
