# The Pit Wall — web

Application Next.js (App Router, React 19) qui constitue l'intégralité du site "The Pit Wall" : pas de backend séparé, les Server Components interrogent directement PostgreSQL (voir [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md)).

## Développement

```bash
cd web
npm install
DATABASE_URL="postgres://..." npm run dev
```

Ouvrir http://localhost:3000

`DATABASE_URL` est **requis** pour la quasi-totalité des pages (`/`, `/courses`, `/courses/[round]`, `/classement`) : elles font toutes des requêtes SQL directes via `lib/raceData.js` → `lib/db.js`, sans mode dégradé/mock. Chaîne de connexion PostgreSQL Neon de production ou d'un environnement de dev séparé selon ce que tu veux tester — voir [`../docs/OPERATIONS.md`](../docs/OPERATIONS.md) pour comment l'obtenir/la faire tourner.

## Build de production

```bash
npm run build
npm start
```

Aucune CI ne lance `npm run build` automatiquement — à faire manuellement avant tout push (voir [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) §7, "CI/CD").

`npm run lint` existe (`next lint`) mais n'est branché ni sur un hook ni sur une CI.

## Structure

```
app/
  page.jsx                  # accueil — dernier résultat + prochain GP
  courses/page.jsx          # calendrier de saison (liste + carte)
  courses/[round]/page.jsx  # fiche course — onglets Pré-analyse/EL1-3/Quali/Analyse/Raw data
  courses/<round>/*.js      # contenu des articles (HTML écrit à la main, une constante exportée par fichier)
  classement/page.jsx       # classement pilotes/constructeurs (protégé anti-spoiler)
  components/SiteHeader.jsx # masthead : nav, sélecteur de langue
  globals.css                # tout le CSS du site (pas de Tailwind)
lib/
  db.js           # pool de connexions pg
  raceData.js     # toutes les requêtes SQL (Server Components uniquement)
  spoilerGuard.js # anti-spoiler par séance, localStorage
  langPref.js     # préférence de langue FR/EN, localStorage
  circuitGeo.js   # géolocalisation des circuits (carte de saison) + statut course
  teamColors.js   # couleurs par écurie
```

Détail de chaque page/fonctionnalité : [`../docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md) §4. Comment publier un nouvel article : [`../docs/OPERATIONS.md`](../docs/OPERATIONS.md#publier-un-article-compte-rendu-pré-analyse-elquali). Système CSS et pièges connus : [`../docs/DESIGN_SYSTEM.md`](../docs/DESIGN_SYSTEM.md).

## État

Pas d'authentification, pas de base de données mock pour le dev sans réseau — voir [`../docs/ROADMAP.md`](../docs/ROADMAP.md) pour l'état réel d'avancement du projet et les écarts connus par rapport à la vision initiale.
