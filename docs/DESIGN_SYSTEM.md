# Système de design

Comment `web/app/globals.css` est construit, et surtout **pourquoi** — plusieurs comportements ont l'air arbitraires à la lecture mais corrigent des bugs réels, découverts et validés au pixel près (Playwright, pas au jugé). À lire avant toute modification de mise en page du site. À jour au 7 septembre 2026.

## Tokens (`:root`)

| Variable | Valeur | Rôle |
|---|---|---|
| `--bg`, `--surface`, `--surface-raised`, `--text`, `--text-muted`, `--border`, `--border-strong`, `--accent`, `--accent-ink`, `--amber`, `--good`, `--bad` | couleurs | Palette. Redéfinie entièrement sous `@media (prefers-color-scheme:dark)` (guardée par `:not([data-theme="light"])`) et sous `:root[data-theme="dark"]` — un thème clair/sombre existe, mais rien dans l'UI ne pose l'attribut `data-theme` aujourd'hui (bascule automatique système uniquement). |
| `--measure` | `66ch` | Largeur maximale de la colonne de LECTURE (paragraphes, callouts, sources) — ~50-90 caractères par ligne, bonne pratique typographique standard, ne bouge quasiment jamais. |
| `--panel` | `min(100%, 1200px)` | Plafond de largeur de `main` (donc de toute la page). Passé de 960px à 1200px le 7 septembre 2026 — 960px était le standard "container" Bootstrap ~2012-2018 ; 1200-1280px est le repère actuel (Tailwind `max-w-7xl`, GitHub, Bootstrap 5 `xxl`). |
| `--panel-w` | `min(100vw, 1200px)` | Même plafond que `--panel`, mais en unités `vw` plutôt que `%` — nécessaire pour être utilisé dans un `calc()` à l'intérieur d'un élément dont le `%` résoudrait contre son propre conteneur (pas contre le viewport). Garder les deux variables synchronisées si le plafond change encore. |
| `--header-h` | `112px` | Hauteur supposée du masthead sticky — sert de décalage vertical à tout élément sticky/à ancre sous l'en-tête (`.sec-marker`, `scroll-margin-top`). Valeur fixe, pas mesurée dynamiquement : si le masthead change de hauteur (nouvel élément, wrap sur mobile), ce nombre doit être mis à jour à la main. |

## Palier de largeur : deux colonnes, pas une

Le piège le plus facile à réintroduire dans ce fichier : confondre la colonne de **lecture** et le plafond du **site**.

- `main{max-width:var(--panel)}` (1200px) borne toute la page.
- `.prose{max-width:var(--measure)}` (66ch ≈ 577px) borne le texte — hero, paragraphes, callouts, `details.sources`. Ces éléments sont TOUJOURS plus étroits que `main`, avec beaucoup d'espace libre autour sur un écran large. **C'est voulu** : une ligne de texte plus longue que ~90 caractères devient difficile à lire.
- Les tableaux de données (`.tablewrap.prose`) sont l'exception délibérée : ils ont besoin de largeur, pas de mesure de lecture. Ils "sortent" de la colonne de 66ch pour utiliser jusqu'à la largeur de `main` — cf. section suivante.

## Un seul bord de lecture à gauche

Tout le contenu (hero, repère de section, titres, paragraphes, tableaux) partage la **même position du bord gauche**, quelle que soit la largeur d'écran. C'est un principe qui a fallu deux itérations pour établir correctement (voir l'historique de commits "zigzag") : dès qu'un élément est décalé horizontalement pour une raison de mise en page (une colonne de grille dédiée, un élargissement centré au lieu d'ancré à gauche), l'œil perçoit un décrochage en scrollant d'un bloc à l'autre — même quand chaque bloc pris isolément est correctement positionné.

**Conséquence pratique** : si un nouvel élément doit s'écarter de la largeur de `.prose` (66ch), il doit grandir en gardant son bord GAUCHE fixe (= celui de `.prose`), jamais en se recentrant sur `main`. Voir la technique `.tablewrap.prose` ci-dessous, réutilisable telle quelle.

## Élargir un élément au-delà de `.prose` sans décaler son bord gauche

Technique utilisée par `.tablewrap.prose` (`@media (min-width:641px)`) :

```css
.tablewrap.prose{
  max-width:none !important;   /* voir piège n°2 ci-dessous */
  width:calc((var(--panel-w) / 2) + 268.75px);
  margin-left:0;
  margin-right:calc(100% - (var(--panel-w) / 2) - 268.75px);
}
```

`268.75` est une constante dérivée géométriquement (pas devinée) : elle dépend de `--measure` (577.5px) et de la marge de `main` (20px de chaque côté) — voir le commentaire complet dans `globals.css` juste au-dessus de cette règle pour le détail du calcul, et refaire la dérivation plutôt que de recopier ce nombre si `--measure` ou le padding de `main` changent un jour.

## Pièges déjà rencontrés (lire avant de toucher au layout)

Chacun a été découvert en observant un comportement réel qui contredisait l'intuition — pas en le devinant. Toujours **valider au pixel** (voir méthodologie plus bas) avant de considérer un changement de layout comme correct.

1. **Un enfant de grille avec une largeur CHIFFRÉE (`width:200px`, ou un `calc()` sans terme en `%`) plus grande que sa piste force la piste elle-même à grandir pour l'accueillir** (`grid-template-columns:1fr`), et fait déborder tout le conteneur. Rencontré sur `.tablewrap.prose`. Fix : `minmax(0,1fr)` plutôt que `1fr` nu sur `section.block` — le `0` plancher empêche ce gonflement. Un `transform:translateX(...)` (utilisé pour `.sec-marker`) n'a PAS ce problème : un transform ne participe jamais au calcul de mise en page, seulement au rendu final.

2. **Un style inline (`style="max-width:100%"`, posé dans le HTML des articles) bat n'importe quelle règle externe par spécificité**, quel que soit le nombre de classes de cette dernière — seul `!important` (ou éditer le HTML lui-même) passe outre. `.tablewrap.prose` en a besoin pour ça précisément.

3. **`[hidden]` peut être silencieusement neutralisé.** Une règle d'auteur qui pose `display:flex` (ou tout autre `display`) sur une classe bat TOUJOURS le `display:none` de la feuille de style par défaut du navigateur pour l'attribut `[hidden]` — l'origine "user-agent" est plus faible que l'origine "auteur" dans la cascade, indépendamment de la spécificité comparée des deux sélecteurs. Si un élément peut être cette fois masqué via `hidden` plutôt que démonté du DOM, prévoir explicitement `.ma-classe[hidden]{display:none}`.

4. **`position:sticky` reste borné aux limites de son propre parent** — un élément sticky ne peut jamais s'afficher au-delà de la boîte de son parent direct, même si son `top` voudrait le maintenir plus bas. C'est ce qui fait fonctionner `.sec-marker` SANS JavaScript : posé comme premier enfant de chaque `<section class="block" data-num="...">`, il reste épinglé tant que CETTE section est à l'écran, et cède naturellement la place au repère de la section suivante une fois qu'elle a entièrement défilé. À réutiliser pour tout futur indicateur "où en est le scroll" — pas de scroll-listener JS custom nécessaire pour ce genre de cas.

5. **Un enfant ne peut jamais dépasser la largeur réellement RENDUE de son parent**, quel que soit son propre `max-width`. `style="max-width:100%"` sur un enfant n'agrandit jamais rien au-delà de son parent — un piège qui a produit un débordement horizontal permanent la première fois qu'il a été mal compris (`min-width` forcé au-delà du vrai plafond du conteneur réel).

## Le tableau `.verdict-table` (bilan pilote / bilan équipe)

Trois colonnes (Pilote / Départ→arrivée / Analyse), la troisième portant de la prose longue :

- **Desktop (≥641px)** : `table-layout:fixed` avec des proportions dédiées (24/20/56%) — sans ça, l'algorithme de layout auto du navigateur donne aux deux premières colonnes (contenu court, `white-space:nowrap`) toute la place qu'elles réclament et écrase la troisième.
- **Mobile (≤640px)** : la table devient une liste de fiches empilées (`display:block` sur `table`/`tr`/`td`, `<thead>` masqué) plutôt que de forcer un défilement horizontal en plus du texte qui wrappe déjà — illisible en combinaison. `.tablewrap:has(table.verdict-table){overflow-x:visible}` désactive le défilement horizontal de la boîte englobante dans ce mode (devenu inutile).
- Les largeurs desktop sont scopées DANS leur propre `@media (min-width:641px)`, jamais en règle générale : une règle générale avec `:nth-child` bat en spécificité le `width:auto` du bloc mobile, même déclaré après dans la feuille — piège déjà tombé dessus une fois.

## Sélecteurs pilotes/tour et couleur des pilotes (Raw data)

Retour utilisateur direct (sélection "moche", couleurs de pilotes arbitraires,
3 expériences visuelles différentes entre temps au tour / meilleur tour /
moyenne 5 tours) — trois conventions posées depuis pour tout le Raw data
(`RaceTabs.jsx`) :

- **Chips `.chip`/`.chip-row`** (globals.css) plutôt qu'une case à cocher nue
  + label : un `<label class="chip">` contenant l'`<input type="checkbox">`
  visuellement masqué (pas `display:none`, qui casserait le focus clavier),
  un point de couleur (`.dot`, déjà utilisé ailleurs pour les classements) et
  le nom. États `active`/`disabled` en classes, pas en style inline. Le
  sélecteur de tour (`<select>`) suit `.lap-select` — avant ça, son bord
  `#ccc` codé en dur ignorait le thème sombre (`--border`) et devenait
  quasi invisible en dark mode.
- **Couleur par pilote = couleur d'écurie officielle**, pas un index dans la
  sélection courante : `TEAM_COLORS` (mots-clés, pas égalité stricte —
  `team_name` suit la nomenclature Jolpica, ex. "RB F1 Team") donne la
  couleur de base, le second pilote d'une écurie reçoit cette même couleur
  éclaircie (`lighten()`) plutôt qu'une teinte arbitraire. `useDriverColors`
  construit UNE table {pilote -> couleur} partagée par les 4 graphiques —
  un pilote garde la même couleur qu'il soit seul coché ou entouré d'autres,
  contrairement à l'ancien schéma (couleur = position dans `selected`, donc
  changeante d'un graphique à l'autre). Écurie non reconnue -> repli sur
  l'ancienne palette catégorielle cyclique (`DRIVER_LINE_COLORS`).
- **Écart au plus rapide, pas temps absolu** (`toGapRows`/`GapTooltip`) : les
  trois comparaisons de rythme (Temps au tour, Meilleur tour, Temps moyen
  par tranche de 5 tours) ainsi que Qualif vs Course affichent l'ÉCART au
  pilote le plus rapide du groupe/de la séance sélectionnée (0 = au plus
  rapide, +0.322s pour les autres) — même convention que les écrans de
  chronométrage officiels F1. Un temps de tour absolu (mm:ss.mmm) ne se
  compare pas d'un coup d'œil, quelle que soit l'échelle choisie (retour
  utilisateur répété deux fois avant ce changement). Le temps absolu reste
  visible entre parenthèses dans `GapTooltip`, via la clé jumelle
  `<nom>__abs` posée par `toGapRows`. `trimmedGapDomain` recadre encore le
  haut de l'axe (au 95e percentile, plancher fixé à 0) pour amortir un
  décrochage isolé (erreur de pilotage, accrochage) — mais plus les tours
  SC/VSC/drapeau rouge, désormais exclus en amont (cf. `clean` posé par
  `getLapTimesByDriver`, `docs/DATA_SOURCES.md`) plutôt que recadrés après
  coup : un ralentissement général qui reste dans les données s'annule de
  toute façon naturellement dans un écart, mais le retirer en amont évite
  qu'il pollue "Meilleur tour" et les moyennes par tranche.
- **"Meilleur tour" et "Qualif vs Course" en `BarChart` recharts**, pas un
  tableau HTML à part : même famille de composant que les graphiques en
  ligne juste au-dessus (mêmes marges, même `tickFormatter`, mêmes styles
  de grille) — barres colorées par gomme (`COMPOUND_COLORS`, déjà utilisé
  pour la stratégie pneus) pour la comparaison par gomme, et par couleur de
  pilote (via `<Cell>`) pour "toutes gommes" / "Course" — deux langages
  couleur cohérents avec le reste de la page plutôt qu'une troisième
  couleur inventée pour ces graphiques.
- **Matrice delta pilote × pilote** (`DeltaMatrix`) : sous "Meilleur tour"
  et "Qualif vs Course", une case (ligne, colonne) = temps de la ligne
  moins temps de la colonne (négatif/vert = la ligne est plus rapide,
  positif/rouge = plus lente), diagonale vide. Complète le graphique en
  écart-au-plus-rapide (qui ne compare chaque pilote qu'au meilleur du
  groupe) en permettant de comparer n'importe QUELLE paire directement —
  benchmark concurrentiel (f1pace.com, "Race pace delta") qui a confirmé
  l'intérêt du pattern. Couleurs négatif/positif réutilisent `--good`/
  `--bad` (mêmes tokens que `.delta`, badges de verdict), pas une nouvelle
  paire de couleurs.

## Gabarit HTML d'un article

Tous les articles (`web/app/courses/<round>/*.js`) suivent la même structure, injectée via `dangerouslySetInnerHTML` :

```html
<div class="hero prose">...</div>          <!-- verdict, chips résultats -->
<div class="prose"><p class="subverdict">...</p></div>

<section class="block" data-num="01" id="sec-r1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Titre de la section</h2>
    <p>...</p>
    <div class="callout">...</div>
    <div class="tablewrap prose" style="max-width:100%;">
      <table class="verdict-table">...</table>   <!-- ou une table sans cette classe -->
    </div>
    <div class="scrollhint">glisser pour voir la suite →</div>
  </div>
</section>

<!-- ... autres sections ... -->

<details class="sources">
  <summary>Sources</summary>
  <div class="srcgroup"><h5>...</h5><ul><li>...</li></ul></div>
</details>
```

Points non négociables si on ajoute une nouvelle section : `.sec-marker` avant `.prose` dans le DOM (pour le mécanisme sticky, cf. piège n°4), `data-num` sur deux chiffres (`"01"`, pas `"1"`), le `style="max-width:100%"` inline sur tout nouveau `.tablewrap` (cf. piège n°2 — sans lui, aucune des règles d'élargissement ne peut agir).

## Méthodologie de validation

Le contenu de l'onglet Analyse (et EL/Quali/Raw data) est gaté par l'anti-spoiler et ne se rend JAMAIS dans le HTML statique/SSR (`SpoilerGate` retourne `null` tant que `spoiler.hydrated` est faux, ce qui est toujours vrai côté serveur) — impossible de le vérifier par un simple fetch de la page en production. La méthode qui a fonctionné, à réutiliser :

1. Extraire le HTML réel d'un article (ex. `ROUND13_ANALYSE_FR_HTML`) et le reproduire dans une page de test autonome, avec la VRAIE structure (`<main><div class="prose">…</div></main>`, masthead à la vraie hauteur `--header-h`) et le vrai `globals.css` inliné — pas un conteneur arbitraire (`<body style="max-width:900px">`) qui ne correspond à aucune largeur réelle du site.
2. Piloter cette page avec Playwright (Chromium à `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` dans le sandbox) : `page.evaluate(...)` pour lire `getBoundingClientRect()` des éléments concernés à plusieurs largeurs de viewport réalistes (mobile ~375, tablette ~700-980, desktop ~1024-1920), vérifier `document.documentElement.scrollWidth - clientWidth === 0` (pas de débordement horizontal).
3. Ne jamais conclure "corrigé" sur la seule lecture du CSS — mesurer. Plusieurs correctifs de cette page ont paru corrects à la lecture et se sont révélés faux une fois mesurés (cf. pièges ci-dessus).
4. Une fois déployé, confirmer que le changement est réellement en ligne en comparant le hash du bundle CSS servi (`/_next/static/immutable/chunks/*.css`, récupérable via le workflow `Fetch URL`, cf. [`OPERATIONS.md`](OPERATIONS.md)) avant/après — pas seulement en supposant que le déploiement Vercel a eu le temps de se terminer.
