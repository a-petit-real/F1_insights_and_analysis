# Roadmap — macro-étapes de construction

Principe directeur : ne pas paralléliser la Phase 2 (données structurées) et la Phase 5 (prédiction) trop tôt — la qualité d'un modèle de prédiction dépend directement de la profondeur de l'historique de données accumulé en Phase 2.

## Phase 0 — Fondations (1-2 semaines)

- Cadrage précis du MVP (quelles pages, quel contenu au lancement)
- Choix de stack définitif et setup du repo (structure monorepo backend/frontend)
- CI de base (lint, build)
- Premier jet de design system (palette, typographie, composants de base)

## Phase 1 — MVP éditorial (3-4 semaines)

- Publication des analyses dans le format déjà pratiqué (verdict global, contexte, dynamique de course, décisions stratégiques, bilan pilote par pilote et équipe par équipe, sources) via Next.js, contenu en Markdown versionné
- Authentification par invitation
- Déploiement privé accessible au cercle restreint
- Objectif : remplacer l'usage actuel (document/ébauche manuelle) par une vraie plateforme consultable, sans encore de données structurées automatisées

## Phase 2 — Données structurées (4-6 semaines)

- Intégration FastF1 (télémétrie, temps au tour, stints pneus) et Jolpica-F1 (résultats, classements)
- Modélisation PostgreSQL (courses, pilotes, écuries, résultats, arrêts, stratégies)
- Pipeline d'ingestion planifié après chaque session (essais, qualifications, sprint, course)
- Pages dynamiques : classements, comparateurs, graphiques d'écarts tour par tour

## Phase 3 — Agrégation élargie (continu)

- Veille automatisée Pirelli et presse spécialisée (Motorsport.com, The Race, Reuters)
- Système de fiches sources automatisé par article (traçabilité systématique)
- Recherche interne et tags thématiques (stratégie, pneus, moteur, réglementation)

## Phase 4 — Design et UX avancés (en parallèle des phases 2-3)

- Data visualisation interactive (timeline de course animée, comparateurs visuels)
- Thèmes clair/sombre, optimisation mobile
- Itération continue sur le design system posé en Phase 0

## Phase 5 — Interactivité : simulation et prédiction (3+ mois, une fois la Phase 2 solide)

- Premier modèle de prédiction (probabilités de podium/points) basé sur l'historique accumulé
- Simulateur "what-if" de stratégie pneus/pit stop basé sur un modèle de dégradation
- Intégration dans l'UI via un module interactif dédié

## Phase 6 — Industrialisation légère (continu)

- Tests automatisés sur les pipelines de données et l'API
- Monitoring (Sentry) et alerting sur échec d'ingestion
- Documentation technique tenue à jour
- Gestion multi-utilisateurs affinée si le cercle d'accès grandit
