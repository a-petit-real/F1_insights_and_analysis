# Architecture technique

Vue en couches. Chaque couche est pensée pour rester simple tant que le volume d'utilisateurs et de données reste celui d'un cercle restreint — pas de sur-ingénierie pour une échelle qu'on n'atteindra pas.

## 1. Ingestion de données

| Source | Donnée récupérée | Méthode |
|---|---|---|
| [Jolpica-F1](https://github.com/jolpica/jolpica-f1) (fork Ergast) | Résultats, grilles, classements historiques et courants | API REST |
| [FastF1](https://github.com/theOehrly/Fast-F1) (Python) | Télémétrie, temps au tour, stints pneus, données de timing officielles | Librairie Python, cache local |
| formula1.com | Comptes-rendus officiels, communiqués, résultats détaillés (arrêts aux stands, meilleurs tours) | Scraping structuré respectueux (robots.txt, rate limit) |
| Pirelli press | Analyses pneus, choix de gommes, données de dégradation | Scraping/RSS |
| Presse spécialisée (Motorsport.com, The Race, Reuters) | Contexte, déclarations pilotes/équipes, analyses techniques | RSS/scraping léger, citée comme source secondaire |
| API météo (ex. OpenWeatherMap) | Conditions par circuit et par session | API REST |
| Reddit (optionnel) | Perception communautaire, débats — jamais utilisé comme preuve factuelle | API Reddit, usage éditorial uniquement |

Principes :
- Chaque enregistrement ingéré conserve sa source et son horodatage.
- Distinction stricte entre donnée factuelle (résultats, temps, données officielles) et contenu d'opinion/analyse (presse, réseaux sociaux).
- Orchestration par jobs planifiés (cron simple pour démarrer ; Prefect/Dagster seulement si la complexité de dépendances le justifie).

## 2. Stockage

- **PostgreSQL** : entité centrale pour tout ce qui est structuré — saisons, courses, pilotes, écuries, résultats, arrêts aux stands, stratégies pneus, évolutions techniques. Le volume F1 (quelques Go par saison au grand maximum) ne justifie pas un data warehouse séparé.
- **Contenu éditorial** : les analyses (comptes-rendus, pré-analyses) en Markdown versionné — soit directement en base avec historique de versions, soit en repo Git séparé si on veut profiter du diff Git nativement.
- **Redis** : cache pour les requêtes coûteuses et les résultats de simulation (Phase 5).
- **Stockage objet** (Cloudflare R2 ou MinIO auto-hébergé) : images, exports, assets.

## 3. Backend

**Choix : Python + FastAPI.**

Justification : l'écosystème de données F1 (FastF1, pandas, numpy, et plus tard scikit-learn/XGBoost pour la prédiction) est Python-natif. Faire le backend en Python évite une couche de traduction entre le service d'ingestion/calcul et l'API, et permet de réutiliser directement le même langage pour la Phase 5 (simulation/prédiction).

Découpage en services (modules dans un même backend au départ, séparables plus tard si besoin) :
- **Ingestion** : jobs de collecte et normalisation des sources externes
- **Analytique** : calculs dérivés (gain d'undercut, dégradation pneus, écarts tour par tour, comparaisons de rythme)
- **Éditorial** : gestion du contenu (articles, sources associées, statut de publication)
- **Auth** : gestion des invitations et sessions

## 4. Frontend

**Choix : Next.js (React).**

- Design system dédié dès la Phase 1 : Tailwind CSS + composants sur-mesure plutôt qu'un template générique, cohérent avec la priorité donnée au design.
- Data visualisation : Observable Plot ou D3 pour les graphiques spécifiques au domaine (écarts tour par tour, fenêtres de stratégie, timeline de course) — les librairies de graphiques génériques seront vite limitantes pour ce type de visualisation.
- Pages clés :
  - Accueil : dernière course analysée + pré-analyse du prochain GP
  - Fiche course complète (verdict, contexte, dynamique de course, décisions stratégiques, bilan pilote par pilote et équipe par équipe — format déjà pratiqué)
  - Fiches pilotes / écuries avec historique
  - Comparateur (pilotes, stratégies, circuits)
  - Page "Sources & méthodologie" : transparence sur l'origine de chaque donnée/analyse

## 5. Authentification et accès

Cercle restreint → pas de système de rôles complexe :
- Authentification par invitation (liste blanche d'emails + magic link), via Auth.js ou équivalent.
- Un seul niveau d'accès au départ ; granularité par rôle seulement si le besoin apparaît réellement.

## 6. Interactivité — simulation et prédiction (vision à terme)

- **Prédiction** : modèles de gradient boosting (XGBoost/LightGBM) entraînés sur l'historique accumulé (grille de départ, choix pneus, météo, historique circuit) pour estimer des probabilités de podium/points.
- **Simulation stratégique** : modèle de dégradation pneus + simulation Monte Carlo pour tester des scénarios alternatifs d'arrêts aux stands (dans l'esprit des analyses de type RaceOptiData déjà citées en source).
- Ces traitements tournent en jobs asynchrones distincts du flux éditorial principal, consomment les données de la Phase 2, et exposent leurs résultats via l'API pour affichage interactif côté frontend.

## 7. Infrastructure

- Frontend : Vercel.
- Backend + PostgreSQL + Redis : Railway, Fly.io, ou VPS unique (Hetzner) selon le budget et le contrôle souhaité sur les données.
- CI/CD : GitHub Actions (lint, tests, déploiement automatique).
- Monitoring léger : Sentry pour les erreurs applicatives ; analytics respectueux de la vie privée (Plausible/Umami) optionnel vu la taille du cercle d'utilisateurs.

Pas de besoin de scalabilité horizontale, de Kubernetes, ou d'architecture microservices distribuée tant que l'audience reste un cercle restreint — ces choix seraient de la sur-ingénierie prématurée.
