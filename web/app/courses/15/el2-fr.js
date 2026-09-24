// Analyse EL2 — Grand Prix d'Azerbaïdjan (Bakou), round 15, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py (session_key
// 11371, 2026-09-24 12:00->13:00 UTC, soit 16:00->17:00 heure locale de Bakou).
// Le temps de Russell (1:43,347) et les écarts du top 5 concordent exactement avec
// le rapport officiel Formula1.com (fetch-url.yml), à la milliseconde près — y
// compris l'ordre complet du classement (position par position, du 6e au 22e rang)
// recoupé phrase par phrase avec le récit de l'article. Citations directes
// (Verstappen sur son train arrière, Lindblad après son accident, Bearman sur sa
// panne moteur) reprises telles quelles depuis cette même source. Deuxième source
// (Crash.net) recoupée pour le retard d'Antonelli en début de séance (conséquence du
// changement moteur imposé par la panne hydraulique de l'EL1) et pour l'ouverture
// d'une enquête des commissaires contre Hamilton (impeding sur Lawson) — épisode que
// l'article F1.com mentionne à peine, traité ici avec la citation radio complète de
// Lawson et les articles réglementaires cités par Crash.net. Troisième source
// (Motorsport Week) pour l'analyse technique de la domination Mercedes (équilibre
// entre les trois secteurs, efficacité en ligne droite). Analyse par secteur (temps
// théorique optimal vs tour réel) calculée à partir des temps de secteur individuels
// déjà en base, non reprise d'une source externe. Aucune donnée inventée.
export const ROUND15_EL2_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix d'Azerbaïdjan · Bakou · EL2 — jeudi 24 septembre</p>
    <p class="verdict">Russell signe le doublé EL1-EL2, avec une demi-seconde d'avance sur Antonelli — parti en retard après le changement moteur imposé par sa panne de l'EL1. La séance restera aussi marquée par l'accident de Lindblad (drapeau rouge), la panne moteur de Bearman, et l'ouverture d'une enquête des commissaires contre Hamilton pour un quasi-accrochage avec Lawson.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">1:43,347</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,552s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,827s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+1,126s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+1,318s</span></div>
    </div>
    <p class="subverdict">Feu vert à 16h00 heure locale, sous 30°C d'air et un soleil déclinant sur le circuit urbain. Verstappen se plaint tôt d'un train arrière qui décolle du sol ; à une vingtaine de minutes de la fin, un drapeau rouge interrompt la séance après l'accident de Lindblad au virage 8/9 (secteur "château"). À la reprise, la panne moteur de Bearman ajoute un nouvel incident à une séance déjà chargée — Russell conclut malgré tout par un nouveau tour de référence sur pneu tendre, à seulement 0,106s du temps théorique optimal du plateau (le détail par secteur plus bas).</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el2-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Russell double la mise, Antonelli limite la casse malgré un départ retardé</h2>
    <p>Premier relais sur pneu medium ou dur pour la majorité du plateau : Verstappen pose un premier repère à 1:45,115, tout en se plaignant aussitôt sur la radio d'une monoplace difficile à tenir — <em>« Je contre-braque en permanence parce que mon essieu arrière décolle du sol »</em>, lâche le quadruple champion du monde, avant d'améliorer à 1:44,492 sur le même train medium, quelques centièmes devant Russell sur la même gomme.</p>
    <p>Antonelli, lui, n'a pas pris le départ de l'EL2 à l'heure : conséquence directe de sa panne hydraulique en EL1, sa monoplace a dû recevoir un changement moteur après avoir été aspergée par précaution par la sécurité incendie, selon Crash.net. Malgré ce programme amputé, le pilote Mercedes livre une remontée impressionnante : un 1:43,899 qui le hisse en 2<sup>e</sup> position, à 0,552s de son coéquipier. La confirmation de Russell vient plus tard, sur pneu tendre : un premier 1:43,759 devance Verstappen de quatre dixièmes, avant qu'un tour suivant ne l'amène à 1:43,347 — la référence qui tiendra jusqu'au drapeau à damier, pendant que Verstappen est relégué au 3<sup>e</sup> rang devant Leclerc, Hamilton et Norris (qui a renoncé à pousser un tour plus rapide).</p>
    <p>Selon Motorsport Week, le paquet Mercedes est apparu le plus équilibré des trois secteurs du circuit ce jeudi, gérant efficacement le déploiement d'énergie pour maximiser la vitesse de pointe sur les 2,2 km de la ligne droite principale — la plus longue du calendrier F1. Mercedes signe ainsi le doublé EL1-EL2 pour Russell, la première fois cette saison qu'un pilote domine les deux premières séances d'un même week-end après Antonelli en Autriche.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el2-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Drapeau rouge : Lindblad tape le mur au secteur "château"</h2>
    <p>À une vingtaine de minutes de la fin de l'heure, Arvid Lindblad pousse trop fort dans l'enchaînement des virages 8/9 (le secteur surnommé "château" du circuit de Bakou) et heurte le mur, immobilisant sa Racing Bulls avec des dégâts importants côté droit — drapeau rouge immédiat. <em>« Je suis vraiment désolé »</em>, confie le jeune pilote britannique sur la radio, avant d'ajouter : <em>« Je pense l'avoir littéralement frôlé de peut-être un millimètre »</em> — sa monoplace est évacuée par la voiture médicale. C'est le deuxième accident consécutif de Lindblad en EL2, après celui de Madrid au week-end précédent.</p>
    <p>La piste dégagée, la séance reprend à 16h29 heure locale, l'attention se tournant alors vers des simulations façon qualifications sur pneu tendre — premier vrai aperçu de la hiérarchie sur un tour lancé ce week-end.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el2-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> La panne moteur de Bearman, juste après la reprise</h2>
    <p>À peine la piste rouverte, nouveau coup dur : Oliver Bearman doit garer sa Haas au bout d'une voie d'évitement après une panne moteur soudaine. <em>« Mon moteur s'est coupé et... a juste cassé »</em>, soupire le pilote britannique, qui parvient au moins à faciliter le travail des commissaires en s'arrêtant hors piste plutôt qu'en pleine trajectoire — sa séance s'arrête après seulement 7 tours chronométrés sur 10.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el2-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Hamilton convoqué chez les commissaires après un quasi-accrochage avec Lawson</h2>
    <p>L'incident le plus sérieux de la séance ne se voit pas dans le classement. Dans l'enchaînement rapide qui mène à la ligne droite principale — une zone où les vitesses dépassent 300 km/h — Liam Lawson, lancé dans un tour chronométré, se retrouve nez à nez avec la Ferrari de Hamilton, qui roule lentement en tour de sortie pour récupérer de l'énergie (une contrainte des groupes propulseurs 2026). Lawson doit se dérouter en urgence pour éviter l'accrochage et explose sur la radio : <em>« C'est tellement dangereux »</em>.</p>
    <p>La FIA annonce à la fin de l'EL2 que Hamilton sera convoqué chez les commissaires pour une possible infraction à l'article 27 des notes de course du directeur de course et/ou à l'article B4.1.1 du règlement sportif — les textes qui encadrent le fait de gêner un autre pilote. Ce n'est pas un cas isolé pour le septuple champion du monde : selon Crash.net, il avait déjà été critiqué pour des incidents similaires lors du week-end de Madrid, où Hülkenberg l'avait qualifié de "vilain" sans toutefois de sanction à la clé. Ce type d'incident en essais libres se solde généralement par un avertissement plutôt qu'une pénalité sur la grille — réservées aux cas similaires en qualifications. Hamilton termine cette EL2 en 5<sup>e</sup> position, à 1,318s de Russell ; Lawson, lui, ne remonte qu'en 12<sup>e</sup>.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-el2-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> McLaren toujours rafistolé, Audi et Williams en apprentissage, Alonso limité</h2>
    <p>Les deux McLaren de Norris et Piastri roulent avec une solution de fortune pour leur problème de plancher constaté en EL1 : des colliers de serrage en plastique, en attendant une réparation plus définitive. Derrière le top 5, Gasly place son Alpine en 7<sup>e</sup> position, devant Piastri, Hadjar et la seule Haas encore en piste d'Esteban Ocon (Bearman étant sorti), puis Colapinto, Lawson et Pérez.</p>
    <p>Bortoleto et Hülkenberg (14<sup>e</sup> et 15<sup>e</sup>) poursuivent chez Audi l'apprentissage d'un lot de mises à jour important, devant les Williams tout aussi renouvelées d'Albon et Sainz, puis Lindblad, l'autre Cadillac de Bottas, Bearman, et les deux Aston Martin — le roulage d'Alonso étant limité par une fuite d'huile suspectée, ce qui explique ses seulement 7 tours chronométrés sur 9.</p>
  </div>
</section>

<section class="block" data-num="06" id="sec-el2-6">
  <div class="sec-marker"><span class="n">06</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">06</span> Russell à 0,106s du tour théorique optimal — l'écart se resserre nettement depuis l'EL1</h2>
    <p>Même exercice qu'en EL1 : additionner le meilleur secteur de chaque pilote donne un temps théorique optimal de 1:43,241 (36,510 de Norris en secteur 1 + 42,235 de Russell en secteur 2 + 24,496 de Russell en secteur 3). Le tour réel de Russell, 1:43,347, n'en est qu'à 0,106s — contre un écart de 0,516s entre le meilleur temps et l'optimal théorique lors de l'EL1. Le plateau, et Russell en particulier, s'est donc rapproché très nettement du tour parfait entre les deux séances, cohérent avec des simulations de qualification plus abouties que les tours isolés de la première heure.</p>
    <p>Signe supplémentaire de la marge McLaren malgré le plancher rafistolé : Norris détient le meilleur secteur 1 du plateau en EL2, alors qu'il n'était que 6<sup>e</sup> sur ce même secteur en EL1 — la McLaren semble compétitive sur la portion technique du circuit, mais perd du terrain ensuite (Norris ne finit que 6<sup>e</sup> au général). Russell, de son côté, possède les meilleurs secteurs 2 et 3 — la confirmation que son avantage tient autant à l'efficacité en ligne droite (secteur 2, la plus longue portion) qu'à la sortie du dernier virage avant la ligne (secteur 3).</p>
  </div>
</section>

<section class="block" data-num="07" id="sec-el2-7">
  <div class="sec-marker"><span class="n">07</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">07</span> Classement complet EL2</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:43,347</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:43,899</td><td>+0,552s (départ retardé, changement moteur)</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:44,174</td><td>+0,827s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:44,473</td><td>+1,126s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:44,665</td><td>+1,318s (enquête commissaires, impeding sur Lawson)</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:44,831</td><td>+1,484s (plancher rafistolé, meilleur secteur 1)</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:44,843</td><td>+1,496s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:44,857</td><td>+1,510s (plancher rafistolé, colliers de serrage)</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:44,868</td><td>+1,521s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:45,290</td><td>+1,943s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:45,479</td><td>+2,132s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:45,681</td><td>+2,334s (quasi-accrochage avec Hamilton en secteur 3)</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:45,760</td><td>+2,413s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:45,794</td><td>+2,447s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:45,854</td><td>+2,507s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:46,123</td><td>+2,776s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:46,221</td><td>+2,874s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:46,391</td><td>+3,044s (accident virage 8/9, drapeau rouge)</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:46,737</td><td>+3,390s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:46,801</td><td>+3,454s (panne moteur à la reprise)</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:47,403</td><td>+4,056s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:47,889</td><td>+4,542s (fuite d'huile suspectée)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el2-8">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en EL3</h2>
    <p>Quatre points issus de ces deux premières séances à suivre avant les qualifications : la confirmation ou non de l'avance Mercedes sur un relais complet plutôt que sur des tours isolés — Russell et Antonelli ont dominé les deux séances, avec un paquet jugé équilibré sur les trois secteurs, mais Red Bull comme Ferrari restent à moins d'une seconde. L'état du plancher McLaren, toujours rafistolé aux colliers de serrage après l'EL1 — une vraie réparation est-elle possible avant la troisième séance, alors que Norris a montré le meilleur secteur 1 du plateau ? La décision des commissaires sur l'incident Hamilton/Lawson, qui pourrait influer sur la prudence des pilotes lors des tours de sortie en EL3. Et la fiabilité, sujet déjà chargé après l'abandon d'Antonelli en EL1 (panne hydraulique, changement moteur), l'accident de Lindblad et la panne moteur de Bearman en EL2.</p>
    <div class="callout">Rappel de méthode : un classement d'essais libres mélange des programmes différents (réglages, carburant, moment du relais tendre) et ne prédit pas fiablement la hiérarchie de qualification. Il fournit un point de donnée réel, à recouper d'une séance à l'autre plutôt qu'à extrapoler seul.</div>
  </div>
</section>

<section class="block" id="sec-el2-9">
  <details class="sources">
    <summary>Sources utilisées — EL2 Bakou (4 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire. Analyse par secteur (temps théorique optimal) calculée directement à partir de ces données.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Recoupement et contexte narratif</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/fp2-russell-leads-antonelli-and-verstappen-in-second-azerbaijan-gp-practice.37CqNf2uaAyxvDPmvbt3Iw" data-desc="Déroulé de séance, citations Verstappen/Lindblad/Bearman, classement complet position par position — concorde exactement avec la base à la milliseconde près.">Formula1.com — rapport EL2</a><span class="desc">Formula1.com — primaire</span></li>
        <li><a href="https://www.crash.net/f1/results/1105168/1/2026-f1-azerbaijan-grand-prix-full-thursday-practice-results-baku" data-desc="Détail du retard d'Antonelli en début d'EL2 (changement moteur après la panne de l'EL1).">Crash.net — résultats et analyse du jeudi</a><span class="desc">Crash.net — secondaire</span></li>
        <li><a href="https://www.crash.net/f1/news/1105234/1/lewis-hamilton-investigated-dangerous-incident-angered-f1-rival-azerbaijan-gp" data-desc="Citation radio complète de Lawson, articles réglementaires cités par la FIA, précédent de Madrid avec Hülkenberg.">Crash.net — Hamilton convoqué chez les commissaires</a><span class="desc">Crash.net — secondaire</span></li>
        <li><a href="https://www.motorsportweek.com/2026/09/24/russell-paces-incident-packed-fp2-session/" data-desc="Analyse technique de la domination Mercedes (équilibre entre secteurs, efficacité en ligne droite).">Motorsport Week — Russell mène une séance riche en incidents</a><span class="desc">Motorsport Week — secondaire</span></li>
      </ul>
    </div>
  </details>
</section>
`;
