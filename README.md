# F1 Insights & Analysis — "The Pit Wall"

Plateforme privée d'analyse sportive Formule 1 : comptes-rendus de course, pré-analyses de Grand Prix, données de course détaillées (temps au tour, stratégie pneus, météo). Déployée sous le nom **The Pit Wall**.

## Pourquoi ce projet

Les plateformes existantes sont soit généralistes et publicitaires, soit spécialisées mais dispersées (résultats officiels d'un côté, analyse pneus Pirelli de l'autre, télémétrie ailleurs). L'objectif est d'agréger ces sources dans un seul endroit, sans publicité, avec un niveau d'exigence éditoriale et de design élevé, réservé à un cercle restreint d'utilisateurs.

Le projet couvre uniquement la partie **sportive** de la F1 (courses, stratégies, performances) — pas le paddock, le business ou les potins.

## État actuel (7 septembre 2026)

Le site est **en production et publié** — pas en phase de cadrage. Saison 2026 couverte : 13 comptes-rendus de course rédigés (rounds 1-13, dont deux traduits en anglais), pré-analyses pour les rounds 13 et 14, articles de séance (EL1-3, Qualifs) pour le round 13. Ingestion automatisée des résultats/classements (Jolpica) et semi-automatisée des données détaillées de course (OpenF1 — temps au tour, pneus, météo). Anti-spoiler, bascule bilingue FR/EN, calendrier de saison interactif.

**Écart notable à connaître** : le site est actuellement **public** (aucune authentification), alors que la vision produit prévoit un accès par invitation — voir [`docs/ROADMAP.md`](docs/ROADMAP.md#écarts-notables-à-traiter-en-priorité).

## Développement

```bash
cd web
npm install
DATABASE_URL="postgres://..." npm run dev
```

La plupart des pages nécessitent une vraie connexion PostgreSQL (pas de mode dégradé sans base) — voir [`docs/OPERATIONS.md`](docs/OPERATIONS.md#développement-local-du-site).

## Documentation

- [`docs/VISION.md`](docs/VISION.md) — vision produit et principes directeurs
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — architecture technique réelle, par couche
- [`docs/OPERATIONS.md`](docs/OPERATIONS.md) — runbook : ingérer des données, publier un article, diagnostiquer un problème
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — système de design CSS du site, pièges connus à ne pas réintroduire
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — macro-étapes de construction et état réel d'avancement
- [`docs/DATA_SOURCES.md`](docs/DATA_SOURCES.md) — sources de données externes, ce qui est réellement ingéré vs. utilisé à la main, et méthodologie de sourcing

Chacun de ces documents a été relu et corrigé le 7 septembre 2026 pour refléter l'implémentation réelle plutôt que la vision initiale du projet — les écarts entre les deux sont documentés explicitement plutôt que masqués.
