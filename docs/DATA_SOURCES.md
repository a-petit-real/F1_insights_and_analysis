# Sources de données et méthodologie

Reprend et généralise l'approche de sourcing déjà pratiquée dans les analyses manuelles (comptes-rendus de course, pré-analyses de GP) : chaque donnée ou affirmation doit être reliée à sa source, avec une hiérarchie claire entre fait officiel, analyse de presse spécialisée, et interprétation communautaire.

**État réel au 7 septembre 2026** : seules Jolpica-F1 et OpenF1 sont réellement ingérées en base de données, de façon automatisée ou semi-automatisée (voir [`OPERATIONS.md`](OPERATIONS.md)). Les autres sources listées ci-dessous ne sont utilisées qu'à la main, en lisant la page/l'article au moment de rédiger un article — aucun scraping ni pipeline automatisé ne les collecte. Colonne "Ingestion" ajoutée pour lever toute ambiguïté.

## Sources primaires (faits officiels)

| Source | Type de donnée | Usage | Ingestion |
|---|---|---|---|
| Jolpica-F1 (fork Ergast) | Historique de résultats et classements, format API | Alimentation base de données | ✅ Automatisée (`scripts/ingest_jolpica.py`, cron quotidien) |
| OpenF1 | Temps au tour (avec secteurs), stints pneus, météo, messages de course, timing détaillé, séances d'essais, télémétrie voiture (vitesse/RPM/gaz/frein instantanés), position sur circuit (x/y/z) | Alimentation base de données, calculs dérivés | ✅ Semi-automatisée (`scripts/ingest_openf1*.py`, déclenchement manuel après chaque session/course) |
| formula1.com | Résultats, grilles, classements, communiqués, comptes-rendus officiels | Source de vérité pour les faits de course, lue à la main en rédigeant un article | ❌ Pas de scraping — lecture manuelle uniquement |
| Pirelli press | Choix de gommes, analyses de dégradation officielles | Analyse stratégie pneus | ❌ Pas de scraping/RSS construit |
| FIA (communiqués, ADUO) | Réglementation, pénalités, évaluations techniques officielles (ex. classement moteurs) | Contexte réglementaire et technique | ❌ Pas de pipeline |

### Données dérivées côté web (Raw data)

Deux graphiques de l'onglet Raw data ne correspondent à aucun flux OpenF1 direct — calculés côté site à partir d'un flux primaire, documenté ici pour ne pas les faire passer pour une mesure officielle :

- **Position par tour** — OpenF1 n'a pas de flux "position" continu (seulement `overtakes`, ponctuel). Dérivée en triant tous les pilotes par leur temps cumulé sur piste (`lap_times.session_time`) à un tour donné.
- **Vitesse par tour** et **Réplay animé** (distance/position depuis le début du tour) — OpenF1 n'a pas de champ distance dans `car_data`, mais l'endpoint `location` donne la position réelle (x, y, z en mètres, ~3-5 Hz). distance_m, x_m/y_m et t_s (secondes depuis le début du tour, utilisé pour synchroniser le réplay animé) viennent donc directement de `location` (somme des écarts euclidiens consécutifs entre points de position pour distance_m) — une mesure directe, pas une approximation. `location` et `car_data` ont des grilles temporelles indépendantes côté OpenF1 : speed_kmh est interpolé linéairement sur les horodatages de `location` (cf. `scripts/ingest_openf1_telemetry.py`), donc pas une mesure native à chaque point affiché. Première version de cette table (intégration trapézoïdale de la vitesse, sans `location`) abandonnée — trop imprécise en sortie de virage/freinage. Réplay limité à 5 pilotes (lisibilité) et compressé sur une durée de lecture fixe quelle que soit la durée réelle du tour.

Les trois affichent une note explicite sur la page plutôt que de se présenter comme une donnée officielle.

## Sources secondaires (presse spécialisée)

Aucune n'est ingérée automatiquement — citées à la main, article par article, quand elles apportent un élément factuel ou une déclaration.

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

## Source abandonnée : FastF1 / livetiming.formula1.com

Un premier pipeline basé sur la librairie FastF1 (qui interroge `livetiming.formula1.com`) a été tenté avant OpenF1, puis abandonné : ce domaine bloque les requêtes depuis des IP de datacenter, ce qui aurait exigé une étape manuelle systématique depuis un appareil personnel pour chaque ingestion. OpenF1 couvre le même besoin (temps au tour, pneus, météo, messages de course) et est accessible sans restriction depuis un runner GitHub Actions — confirmé en conditions réelles avant la bascule. Le fichier `db/schema_fastf1.sql` garde ce nom pour des raisons historiques, mais ne contient plus que le schéma alimenté par OpenF1.

## Règles de sourcing pour le contenu publié

1. Toute affirmation factuelle (résultat, temps, décision stratégique confirmée) doit être reliée à une source primaire.
2. Toute information encore non confirmée officiellement (ex. gain de puissance moteur annoncé par la presse) doit être explicitement qualifiée comme telle, jamais présentée comme un fait établi.
3. Les discussions communautaires (Reddit) servent à identifier des débats ou perceptions, jamais à trancher un point technique.
4. Chaque article publié inclut une section "Sources utilisées" listant les liens, dans le même esprit que les analyses déjà rédigées.

## Contraintes de collecte

- Respect du `robots.txt` et des CGU de chaque source scrapée.
- Rate limiting et mise en cache pour éviter toute charge excessive sur les sites tiers.
- Pas de republication de contenu intégral protégé par droit d'auteur — citation et lien vers la source, synthèse et analyse originale côté plateforme.
