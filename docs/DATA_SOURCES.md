# Sources de données et méthodologie

Reprend et généralise l'approche de sourcing déjà pratiquée dans les analyses manuelles (comptes-rendus de course, pré-analyses de GP) : chaque donnée ou affirmation doit être reliée à sa source, avec une hiérarchie claire entre fait officiel, analyse de presse spécialisée, et interprétation communautaire.

## Sources primaires (faits officiels)

| Source | Type de donnée | Usage |
|---|---|---|
| formula1.com | Résultats, grilles, classements, communiqués, comptes-rendus officiels | Source de vérité pour les faits de course |
| Jolpica-F1 (fork Ergast) | Historique de résultats et classements, format API | Alimentation base de données |
| FastF1 | Télémétrie, temps au tour, stints pneus, timing détaillé | Alimentation base de données, calculs dérivés |
| Pirelli press | Choix de gommes, analyses de dégradation officielles | Analyse stratégie pneus |
| FIA (communiqués, ADUO) | Réglementation, pénalités, évaluations techniques officielles (ex. classement moteurs) | Contexte réglementaire et technique |

## Sources secondaires (presse spécialisée)

| Source | Usage |
|---|---|
| Reuters | Vérification indépendante des faits, déclarations |
| Motorsport.com | Analyses techniques, informations sur évolutions non encore officielles (à toujours qualifier comme "rapporté", pas confirmé) |
| The Race | Analyses techniques approfondies, faiblesses/forces par équipe |
| Autres médias spécialisés | Complément, à citer explicitement |

## Sources tertiaires (contexte communautaire)

| Source | Usage |
|---|---|
| Reddit (r/formula1) | Perception et débats des passionnés — jamais utilisé pour établir un fait technique, seulement pour signaler des interprétations ou controverses à mentionner |

**Exclusions explicites** : publications Instagram/Facebook/YouTube non vérifiées ne sont pas utilisées comme preuve factuelle, conformément à la méthodologie déjà appliquée.

## Règles de sourcing pour le contenu publié

1. Toute affirmation factuelle (résultat, temps, décision stratégique confirmée) doit être reliée à une source primaire.
2. Toute information encore non confirmée officiellement (ex. gain de puissance moteur annoncé par la presse) doit être explicitement qualifiée comme telle, jamais présentée comme un fait établi.
3. Les discussions communautaires (Reddit) servent à identifier des débats ou perceptions, jamais à trancher un point technique.
4. Chaque article publié inclut une section "Sources utilisées" listant les liens, dans le même esprit que les analyses déjà rédigées.

## Contraintes de collecte

- Respect du `robots.txt` et des CGU de chaque source scrapée.
- Rate limiting et mise en cache pour éviter toute charge excessive sur les sites tiers.
- Pas de republication de contenu intégral protégé par droit d'auteur — citation et lien vers la source, synthèse et analyse originale côté plateforme.
