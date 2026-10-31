// Analyse EL2 — Grand Prix de Mexico (Autódromo Hermanos Rodríguez), round 19,
// saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (session_key=11398, Practice 2,
// 2026-10-30 22:00->23:00 UTC), classement/secteurs/relais/météo vérifiés
// directement depuis la base via scripts/practice_briefing.py (656 lignes
// practice_laps, 105 practice_stints, 82 practice_weather, 22 pilotes — le
// retour complet des titulaires après le FP1 à dix remplaçants). Classement
// confirmé À LA MILLISECONDE avec DEUX sources indépendantes lues
// intégralement via fetch-url.yml : la page de résultats officielle
// Formula1.com (formula1.com/en/results/2026/races/1298/mexico/practice/2,
// HTML brut) ET le rapport Grandprix.com « Practice 2 Report - Leclerc stays
// ahead as Norris and Russell close in » — la double confirmation la plus
// propre obtenue sur ce projet jusqu'ici pour un classement de séance.
//
// Analyse technique quantifiée (scripts/practice_briefing_laptimes_by_car.py,
// relancé sur les 22 voitures en trois lots de 7-8 pour rester sous la limite
// de taille de sortie du job GitHub Actions — aucune donnée perdue, seul le
// découpage en requêtes a changé) : moyenne de relais calculée tour d'entrée
// de stand exclu, puis tours > 103% de la médiane du relais exclus (méthode
// identique aux rounds précédents). Pour chaque pilote, le relais retenu est
// celui qui maximise le nombre de tours exploités après filtre — c'est le cas
// d'usage le plus proche d'un relais long représentatif de rythme de course,
// ce que permet precisément l'EL2 (contrairement à l'EL1, programme mélangé
// et piste sale avec dix pilotes de réserve) : les titulaires sont rentrés et
// font de vrais relais longs dès ce vendredi soir. Calcul fait sur l'ensemble
// des 22 pilotes comme demandé, mais seuls les relais au ratio tours
// gardés/total le plus favorable et à l'échantillon suffisant sont mis en
// avant dans le texte — Hamilton (13 tours avant la panne moteur) et
// Bortoleto (12 tours, pénalité moteur à venir) n'ont pas de relais long
// exploitable, signalé explicitement plutôt que masqué derrière une moyenne
// trompeuse calculée sur deux tours. Vitesses de pointe (speed_st) = maximum
// brut par voiture sur la séance, aucune estimation.
//
// Sourcing élargi (passe demandée explicitement par l'utilisateur après une
// plainte sur le manque de rigueur et de profondeur technique des articles) :
// - Formula1.com (officiel) : page de résultats EL2 complète lue en HTML brut
//   (confirmation à la milliseconde) ET /en/latest/all (titres du jour,
//   confirme « Leclerc tops eventful FP2 from Norris at Mexico City GP » et
//   révèle un fait nouveau non encore présent dans ce projet : « Bottas set
//   for grid penalty in Mexico City after PU changes » — signalé en section
//   04 comme piste à suivre, pas développé davantage faute de source dédiée
//   lue intégralement cette session).
// - Pirelli (institutionnel) : press.pirelli.com/tagfeed/en/tags/press__releases
//   relu intégralement, toujours aucune entrée spécifique au Mexique 2026
//   (dernière entrée visible : 12 juin 2026) — même régression déjà
//   documentée pour l'EL1 de ce round, confirmée une seconde fois plutôt que
//   réinventée.
// - Tentatives institutionnelles directes, documentées honnêtement : Red Bull
//   Racing (redbullracing.com/int-en/news) et Mercedes-AMG Petronas
//   (mercedesamgf1.com/en/news/) ont toutes les deux échoué en 404 Not Found
//   cette session — aucune communication directe d'écurie/pilote exploitable
//   depuis ces deux domaines malgré une tentative réelle motivée par
//   l'incident Verstappen/Lawson. Racing Bulls (visacashapprb.com/int-en/news)
//   a répondu normalement mais ne contient qu'une actualité FP1 déjà connue
//   (confirmation de Tsolov en pilote de réserve) — rien de nouveau sur l'EL2
//   ni sur l'incident.
// - Grandprix.com (généraliste n°1) : rapport EL2 complet lu intégralement —
//   classement, déroulé par relais/gomme, drapeau rouge Verstappen/Lawson,
//   VSC Hamilton, citation implicite du contexte « Ferrari sweep » qui fond à
//   un dixième.
// - Crash.net (généraliste n°2) : page de liste /f1/news lue intégralement
//   deux fois (texte rendu puis HTML brut, toujours pas d'URL d'article
//   extractible pour cette page — limite déjà documentée pour ce domaine) ;
//   révèle malgré tout une accroche exploitable et datée (« 13m ago » au
//   moment du fetch) : « Max Verstappen calls out 'not very smart' Liam
//   Lawson after tangle » — reprise en section 04 comme titre/accroche
//   attribué à Crash.net, explicitement signalé comme non lu en texte intégral
//   (seul le titre et le chapô sont disponibles depuis la page de liste),
//   jamais présenté comme une citation vérifiée mot pour mot.
// - The Race (technique/analytique n°1) : article dédié complet « Verstappen
//   collides with Lawson as Leclerc tops Mexico FP2 » (Ben Anderson, 30 oct.
//   2026 — slug deviné à partir du titre affiché sur la page d'accueil
//   the-race.com/formula-1/ puis confirmé au premier essai), lu intégralement.
//   Source la plus détaillée sur le déroulé exact de l'incident (Turn 12 puis
//   Turn 14, bargeboard gauche brisé) et sur la construction de la séance
//   (Ferrari en tête dès le relais initial sur gomme dure/medium).
// - Autosport (technique/analytique n°2) : page de liste f1/news lue
//   intégralement, confirme indépendamment le titre « F1 Mexico GP: Leclerc
//   pips McLaren and Mercedes to top FP2 » — recoupement généraliste/
//   technique supplémentaire, pas de citation nouvelle au-delà du titre.
// - r/F1Technical (communauté technique pointue) : nouvelle tentative réelle
//   (reddit.com/r/F1Technical/search.json?q=mexico+fp2) depuis fetch-url.yml,
//   échec identique — HTTP 403 « Blocked ». Quatrième semaine consécutive de
//   blocage confirmé pour ce projet, documenté plutôt que contourné par une
//   invention de contenu.
// - WebSearch n'a été utilisé à aucun moment pour sourcer un fait, conforme à
//   la règle déjà documentée dans docs/SOURCES.md.
//
// Zéro contenu « people » : l'altercation Hadjar/spectateur au paddock et les
// sujets maladie/forme de plusieurs pilotes, présents ce jour-là sur
// plusieurs sites, ont été délibérément écartés — aucun lien avec cette
// séance EL2 précise.
export const ROUND19_EL2_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Mexico · Autódromo Hermanos Rodríguez · EL2 — vendredi 30 octobre</p>
    <p class="verdict">Leclerc signe le doublé Ferrari du vendredi, mais l'avantage qui dépassait six dixièmes en EL1 fond à seulement 0,103s sur Norris — et le calcul de rythme en relais long, rendu possible par le retour des titulaires, montre que Ferrari n'est en réalité que sixième de son propre groupe de tête sur l'indicateur qui compte le plus pour dimanche.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">1:17,827</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+0,103s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,106s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,217s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,311s</span></div>
    </div>
    <p class="subverdict">Premier fait marquant, direct prolongement de l'EL1 : les onze écuries alignent cette fois leurs deux titulaires — la séance obligatoire de pilotes de réserve ne concernait que la première heure du week-end, comme le confirme le retour de Russell, Verstappen, Norris, Stroll, Ocon, Lawson, Bortoleto, Albon et Bottas à leur volant habituel. Deuxième fait marquant, lui franchement nouveau : un drapeau rouge après un accrochage entre Max Verstappen (qui avait sauté l'EL1) et son coéquipier d'écurie-sœur Liam Lawson au virage 14, suivi d'une voiture de sécurité virtuelle quand Lewis Hamilton s'est arrêté sur piste pour un problème moteur. Côté chronos, Leclerc reste devant pour la deuxième fois de la journée, mais l'écart sur Norris et Russell, qui dépassait six dixièmes en EL1, tombe à un dixième — et le calcul de rythme en relais long présenté en section 02, rendu possible pour la première fois ce week-end par le retour des titulaires, montre que cet écart disparaît presque entièrement dès que la charge de carburant se rapproche d'une configuration de course.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el2-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Ferrari garde la tête, mais l'avance de l'EL1 a presque disparu</h2>
    <p>Le scénario de la séance s'est construit en deux temps. Sur le relais initial, gomme medium et dure, Hamilton et Piastri ont longtemps occupé le haut du tableau — un ordre que les simulations de qualification sur tendre, plus tard dans l'heure, ont largement rebattu. Norris a brièvement pris la tête sur tendre avant que Leclerc ne livre le tour qui a fixé le classement final, 1:17,827 — 0,103s devant la McLaren de Norris et seulement 0,003s de plus devant la Mercedes de Russell (1:17,933), elle-même à peine 0,111s devant sa coéquipière Antonelli. Quatre voitures, trois écuries, dans un mouchoir de deux dixièmes au sommet d'une séance qui, en EL1 la veille, avait vu Ferrari s'échapper de plus de six dixièmes sur tout le reste du plateau.</p>
    <p>Verstappen, qui avait sauté l'EL1 obligatoire, est directement parti sur pneu tendre et n'a signé que le cinquième temps (+0,311s) avant même l'incident qui a interrompu la séance — Grandprix.com note qu'il restait alors à une seconde complète du rythme. Hadjar referme le haut du classement pour Red Bull en sixième position, à peine un dixième de plus. Lindblad, Gasly, Lawson et Piastri complètent un top 10 couvert de 0,642s au total — Hamilton, perturbé par sa panne moteur en fin de programme, ne boucle que 13 tours et termine 11<sup>e</sup>, juste devant Alonso.</p>
    <p>Météo quasiment stable côté air (24,5 à 25,1°C sur l'heure) mais piste nettement en train de refroidir : 37,2°C au tout début de la séance contre 31,3 à 31,7°C en fin d'heure, soit environ six degrés perdus — une évolution de piste classique de fin d'après-midi qui accompagne l'amélioration des chronos au fil des relais plutôt que de la contredire.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el2-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Le rythme en relais long dit une autre histoire — et complique la théorie du turbo Ferrari de l'EL1</h2>
    <p>Contrairement à l'EL1 (programme mélangé, dix débutants, piste sale), l'EL2 est la première séance du week-end où les titulaires font de vrais relais longs à charge de carburant représentative — l'indicateur le plus proche d'un rythme de course disponible avant les qualifications. Requête dédiée sur les 22 voitures (scripts/practice_briefing_laptimes_by_car.py), tour d'entrée de stand exclu puis tours > 103% de la médiane du relais également exclus, en retenant pour chaque pilote le relais qui maximise le nombre de tours exploités :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Gomme / relais</th><th>Tours (gardés/total)</th><th>Moyenne relais</th><th>V. pointe (speed_st)</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>SOFT (tours 18-33, âge 11)</td><td>11/15</td><td>1:21,319</td><td>354 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>SOFT (tours 17-23, âge 5)</td><td>5/6</td><td>1:21,369</td><td>350 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>SOFT (tours 17-31, âge 6)</td><td>9/14</td><td>1:21,442</td><td>347 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>MEDIUM (tours 17-29, âge 11)</td><td>10/12</td><td>1:21,487</td><td>345 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>SOFT (tours 15-26, âge 3)</td><td>7/11</td><td>1:21,490</td><td>351 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>MEDIUM (tours 19-35, âge 8)</td><td>12/16</td><td>1:21,501</td><td>350 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>SOFT (tours 17-27, âge 8)</td><td>9/10</td><td>1:21,737</td><td>349 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>MEDIUM (tours 19-27, âge 12)</td><td>7/8</td><td>1:21,743</td><td>351 km/h</td></tr>
      </tbody>
    </table>
  </div>
  <div class="prose">
    <p>Le constat saute aux yeux : sur le tour de qualification simulée, Leclerc devançait Norris de 0,103s et Russell de 0,106s. Sur le relais long — le signal le plus proche de ce qui compte dimanche — c'est Norris qui est le plus rapide de tout le plateau (1:21,319), et Leclerc n'est que sixième de son propre groupe de tête, à 0,182s de la McLaren. Entre Norris et Leclerc s'intercalent Hadjar, Russell, Antonelli et Verstappen, tous dans la même fenêtre de deux dixièmes. Rien de tout cela n'annule le tour de Leclerc — bien réel, bien mesuré — mais le calcul sur les données brutes du projet suggère que l'avantage évoqué en EL1 par Russell (« ce n'est un secret pour personne que Ferrari a un turbo plus petit que la plupart ») ne se retrouve pas, ou beaucoup moins nettement, une fois le carburant chargé à un niveau représentatif de course. Si le turbo plus compact de Ferrari aide vraiment sur un tour sec, rien dans ce relevé n'indique qu'il aide autant sur la durée — une tension honnête à signaler plutôt qu'un verdict, les deux mesures (tour sec, relais long) captant des choses différentes.</p>
    <p>Détail à noter pour Red Bull : le relais long de Verstappen (1:21,490, tours 15-26) a été bouclé après son accrochage avec Lawson et un retour aux stands pour inspection — la voiture, décrite comme repartie avec un bargeboard gauche brisé par The Race, n'a donc pas empêché un rythme quasiment identique au reste du groupe de tête. Les vitesses de pointe, elles, restent dans la même fourchette que l'EL1 de la veille (347-354 km/h contre 347-354 km/h) — Norris culmine à 354 km/h cette fois, contre 354 km/h pour Piastri en EL1 : la lecture altitude/traînée réduite de l'EL1 se confirme donc à l'identique en EL2, sans rien de nouveau à en tirer au-delà de la confirmation elle-même.</p>
    <div class="callout">Réserve méthodologique explicite : Hamilton (13 tours avant sa panne moteur) et Bortoleto (12 tours, deux relais courts) n'ont aucun relais exploitable selon ce même filtre — leurs chiffres bruts auraient donné une moyenne calculée sur seulement deux tours, trompeuse plutôt qu'informative, et sont donc délibérément absents du tableau ci-dessus.</div>
  </div>
</section>

<section class="block" data-num="03" id="sec-el2-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Drapeau rouge Verstappen/Lawson, voiture de sécurité virtuelle pour Hamilton</h2>
    <p>L'incident qui a interrompu la séance, raconté en détail par The Race (Ben Anderson) : Verstappen, revenu en piste directement sur pneu tendre après avoir sauté l'EL1, plonge à l'intérieur de la Racing Bulls de Lawson au freinage du virage 12, en gesticulant vers son adversaire alors que les deux voitures sortent du virage côte à côte. Lawson reste à l'intérieur de Verstappen tout le virage 13 (une épingle à gauche) qui suit, et les deux voitures se touchent au virage 14 (un droit) quand Verstappen sort de la piste, passe sur le vibreur intérieur et percute la monoplace de Lawson. Le choc brise le bargeboard gauche de la Red Bull et un drapeau rouge est nécessaire pour dégager les débris ; Verstappen repart ensuite avec sa voiture endommagée et parvient malgré tout à boucler la séance au cinquième rang. Les commissaires ont convoqué les deux pilotes après la séance ; aucune décision n'était encore connue au moment des rapports consultés. Une accroche Crash.net, lue sur sa page de liste d'actualités (texte intégral de l'article non accessible, URL non extractible de cette page — limite déjà documentée pour ce domaine), annonce que Verstappen a qualifié Lawson de pas « très malin » (« not very smart ») après l'accrochage — un titre à prendre pour ce qu'il est, une accroche attribuée, pas une citation vérifiée mot pour mot faute d'avoir pu lire l'article complet.</p>
    <p>Deuxième incident de séance, sans rapport avec le premier : Hamilton s'est arrêté sur la piste en fin de programme après avoir signalé une perte de puissance, entraînant une voiture de sécurité virtuelle. Sa séance s'achève à 13 tours seulement et une 11<sup>e</sup> place (1:18,512), laissant Ferrari avec une voiture en tête des chronos et l'autre privée d'un programme long complet — exactement le genre d'asymétrie qui complique une lecture simple du week-end pour l'écurie au championnat des constructeurs.</p>
    <p>Fait nouveau non développé ici faute de source dédiée lue en intégralité cette session : Formula1.com (page « dernières actus ») titre « Bottas set for grid penalty in Mexico City after PU changes » — un changement de groupe propulseur chez Cadillac qui entraînerait une pénalité sur la grille. Signalé honnêtement comme piste à suivre pour l'EL3/les qualifications plutôt que développé sans source propre.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el2-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Classement complet EL2</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:17,827</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:17,930</td><td>+0,103s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:17,933</td><td>+0,106s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:18,044</td><td>+0,217s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:18,138</td><td>+0,311s (accrochage avec Lawson, drapeau rouge)</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:18,237</td><td>+0,410s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:18,389</td><td>+0,562s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:18,407</td><td>+0,580s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:18,455</td><td>+0,628s (accrochage avec Verstappen)</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:18,469</td><td>+0,642s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:18,512</td><td>+0,685s (panne moteur, VSC, 13 tours seulement)</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:18,596</td><td>+0,769s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:18,774</td><td>+0,947s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:18,849</td><td>+1,022s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:19,023</td><td>+1,196s (35 tours, le plus de la séance)</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:19,132</td><td>+1,305s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:19,248</td><td>+1,421s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:19,406</td><td>+1,579s (week-end à domicile)</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:19,578</td><td>+1,751s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:19,631</td><td>+1,804s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:20,165</td><td>+2,338s (pénalité sur la grille à venir selon Formula1.com — changement de groupe propulseur)</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:20,174</td><td>+2,347s (12 tours seulement)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el2-5">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en EL3</h2>
    <p>Deux séances, une image qui s'inverse plutôt qu'elle ne se confirme : Ferrari devant au chrono les deux fois, mais un avantage qui passe de plus de six dixièmes à un dixième sur un tour, puis qui s'évapore presque entièrement sur le relais long où c'est Norris, pas Leclerc, qui est le plus rapide de tous. La vraie question de l'EL3 samedi n'est donc plus de savoir qui boucle le tour le plus rapide — Leclerc, deux fois sur deux pour l'instant — mais si cet écart quasi nul en rythme de course se confirme à l'approche des qualifications, ou si l'EL1 avait raison sur un avantage turbo qui ne s'est simplement pas encore montré en configuration représentative. Red Bull aborde aussi la suite du week-end avec une incertitude propre : l'ampleur exacte des dégâts du bargeboard de Verstappen après l'accrochage avec Lawson, et la décision des commissaires sur l'incident lui-même, pourraient peser sur son programme de samedi. Hamilton, de son côté, a besoin que Ferrari comprenne vite l'origine de sa perte de puissance avant de perdre une deuxième séance d'affilée.</p>
    <div class="callout">Rappel de méthode : les moyennes de relais long de cet article comparent des relais de longueurs, d'âges de pneus et de composés différents (de 6 à 16 tours exploités, pneus neufs ou déjà usés de plusieurs tours, medium ou soft) — un indicateur solide de tendance, pas une comparaison strictement à conditions égales. Hamilton et Bortoleto sont délibérément exclus du tableau comparatif pour échantillon insuffisant plutôt que pour donner un chiffre trompeur.</div>
  </div>
</section>

<section class="block" id="sec-el2-6">
  <details class="sources">
    <summary>Sources utilisées — EL2 Mexico (6 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), session_key=11398 : classement, secteurs, relais, météo. Primaire.</span></li>
        <li><span class="desc">The Pit Wall — requête dédiée tours bruts par voiture (scripts/practice_briefing_laptimes_by_car.py, les 22 pilotes, en trois lots pour rester sous la limite de taille de sortie) : base des moyennes de relais long et des vitesses de pointe de la section 02.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1298/mexico/practice/2" data-desc="Classement officiel complet, concorde à la milliseconde avec la base et avec Grandprix.com. Lu en HTML brut via fetch-url.yml.">Formula1.com — résultats officiels EL2</a><span class="desc">Formula1.com</span></li>
        <li><span class="desc">Formula1.com — /en/latest/all, lu intégralement : confirme le titre du jour sur l'EL2 et révèle un fait nouveau (pénalité sur la grille à venir pour Bottas, changement de groupe propulseur) signalé en section 03 comme piste non développée faute de source dédiée.</span></li>
        <li><span class="desc">Pirelli — press.pirelli.com/tagfeed/en/tags/press__releases, relu intégralement : toujours aucune entrée spécifique au Mexique 2026 (dernière entrée 12 juin 2026) — régression déjà documentée pour l'EL1 de ce round, confirmée une seconde fois.</span></li>
        <li><span class="desc">Tentatives institutionnelles directes, documentées honnêtement : redbullracing.com/int-en/news et mercedesamgf1.com/en/news/ ont toutes les deux échoué en 404 Not Found. visacashapprb.com/int-en/news a répondu mais ne contient qu'une actualité FP1 déjà connue (confirmation de Tsolov), rien de nouveau sur l'EL2.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.grandprix.com/races/mexican-gp-2026-practice-2-report.html" data-desc="Rapport complet EL2 : classement (concordant à la milliseconde avec la base et Formula1.com), déroulé par relais/gomme, drapeau rouge Verstappen/Lawson, VSC Hamilton. Lu intégralement via fetch-url.yml.">Grandprix.com — rapport EL2</a><span class="desc">Grandprix.com</span></li>
        <li><span class="desc">Crash.net — page de liste /f1/news lue intégralement (texte rendu et HTML brut) : confirme le titre « Leclerc tops Mexico FP2 as Hamilton breaks down, Verstappen and Lawson collide » et révèle l'accroche « Max Verstappen calls out 'not very smart' Liam Lawson after tangle » — article complet non accessible depuis cette page (URL non extractible), repris en section 03 comme titre attribué, jamais comme citation vérifiée mot pour mot.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/verstappen-collides-with-lawson-as-leclerc-tops-mexico-fp2/" data-desc="Article complet (Ben Anderson, 30 oct. 2026) : déroulé exact de l'accrochage Verstappen/Lawson (virage 12 puis virage 14, bargeboard gauche brisé), construction de la séance par relais/gomme, retour de Verstappen en voiture endommagée. Lu intégralement via fetch-url.yml — source la plus détaillée de cette passe.">The Race — Verstappen percute Lawson tandis que Leclerc domine l'EL2 au Mexique</a><span class="desc">The Race</span></li>
        <li><span class="desc">Autosport — page de liste f1/news lue intégralement : confirme indépendamment le titre « F1 Mexico GP: Leclerc pips McLaren and Mercedes to top FP2 », recoupement supplémentaire sans citation nouvelle.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Communauté technique pointue — tentative documentée</h5>
      <ul>
        <li><span class="desc">r/F1Technical : nouvelle tentative réelle (reddit.com/r/F1Technical/search.json?q=mexico+fp2) depuis le runner fetch-url.yml, échec identique — HTTP 403 « Blocked ». Quatrième semaine consécutive de blocage confirmé pour ce projet, aucun contenu de cette communauté n'a donc pu être exploité, signalé honnêtement plutôt que masqué.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
