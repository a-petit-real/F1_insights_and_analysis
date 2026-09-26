// Analyse Qualifications — Grand Prix d'Azerbaïdjan (Bakou), round 15, saison 2026.
//
// Sourcing : donnée primaire pour le classement chiffré = pipeline OpenF1
// (scripts/ingest_openf1_practice.py --session "Qualifying", session_key confirmé
// via practice_briefing.py), classement par meilleur tour sur l'ensemble de l'heure
// de qualifications — qui recolle exactement, au millième, avec les temps du Top 5
// publiés par Formula1.com et PlanetF1 (Russell 1:42,526, Leclerc 1:43,363, Piastri
// 1:43,364, Hadjar 1:43,500, Norris 1:43,672). Ce classement brut par meilleur temps
// NE reproduit PAS exactement l'ordre officiel de la grille : PlanetF1 publie le
// détail chiffré des trois phases Q1/Q2/Q3 (fetché en primaire via fetch-url.yml),
// qui montre une seule inversion par rapport au classement brut — Hamilton (6e),
// Gasly (7e) et Verstappen (8e) sur la grille officielle, alors que le classement
// brut par meilleur tour de la séance entière les classe Verstappen-Hamilton-Gasly.
// Le déroulé Q1/Q2/Q3, les éliminations et la citation de Russell sont sourcés
// depuis le rapport officiel Formula1.com (fetch-url.yml, primaire). Pénalité de
// grille d'Alonso/Stroll et clôture de l'enquête Hamilton/EL2 confirmées par
// PlanetF1 (deux articles séparés). Pénalité de grille de Sainz (5 places, P9→P14,
// non-ralentissement sous drapeaux jaunes — distincte de sa réprimande EL3) ajoutée
// après coup, confirmée par RaceFans (fetch-url.yml, primaire) et le rapport de
// course Formula1.com. Analyse par secteur (temps théorique optimal
// vs tour réel) calculée à partir des temps de secteur individuels déjà en base,
// non reprise d'une source externe — elle révèle que le tour de pole de Russell
// EST le temps théorique optimal du plateau, à la milliseconde près. Aucune
// donnée inventée.
//
// Marqueur <!--GHOST_LAP_REPLAY--> après la section Q3 : RaceTabs.jsx coupe le
// HTML à cet endroit pour intercaler GhostLapReplay (Russell/Leclerc/Piastri, le
// podium de qualification séparé d'un millième entre les deux derniers).
export const ROUND15_QUALI_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix d'Azerbaïdjan · Bakou · Qualifications — vendredi 25 septembre</p>
    <p class="verdict">George Russell signe la pole la plus dominante de sa carrière — 0,837s d'avance sur Leclerc, une marge colossale sur un circuit où le dixième se joue d'habitude à l'usure. La séance restera aussi celle du choc Antonelli : le leader du championnat, large de 81 points d'avance avant ce week-end, tape le mur au virage 1 dès la Q1 et ne prend plus part aux qualifications.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">Pole</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">1:42,526</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,837s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">+0,838s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Hadjar</span> <span class="gap">+0,974s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+1,146s</span></div>
    </div>
    <p class="subverdict">Après une EL3 disputée à onze centièmes entre trois écuries différentes (cf. article précédent), l'heure de qualifications tranche dans le vif : Russell améliore à chaque tentative de Q3 pour finir par écraser le peloton, pendant que Leclerc et Piastri se neutralisent pour la P2 à un millième près. Sainz et Lindblad, réprimandés en EL3, roulent sans incident supplémentaire ; Alonso et Stroll, eux, s'élanceront en fond de grille après une nouvelle pénalité de groupe propulseur.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-q-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Q1 — Antonelli tape le mur, Russell s'en sort au bout</h2>
    <p>Bottas ouvre le bal de cette phase de 18 minutes, aussitôt suivi d'un premier drapeau jaune : Stroll verrouille ses freins et part à la faute, sans toucher les barrières. Colapinto et Gasly, solides tout le vendredi, comptent parmi les premiers à boucler un tour de référence au pneu tendre, mais c'est Hadjar — de retour en Q1 pour la première fois depuis la Hongrie — qui prend l'avantage initial en 1:44,702. Verstappen peste très tôt sur les ondes : « elle tape complètement à l'avant, je ne peux pas freiner ».</p>
    <p>Russell, lui aussi gêné par du verrouillage à l'avant, voit son coéquipier Antonelli heurter le mur intérieur du virage 1 — dégâts irréparables à la suspension de sa Mercedes en quelques minutes seulement, son ingénieur de course Pete Bonnington confirmant par radio qu'aucun nouveau tour ne sera possible. Antonelli avait déjà bouclé un temps (16<sup>e</sup>, à 1,889s) avant l'accident, suffisant sur le papier pour passer le cap de la Q1, mais son week-end de qualification s'arrête là. Seul Mercedes restant en piste, Russell est un temps relégué par Verstappen puis Hadjar et Hamilton, avant de retrouver la tête sur son ultime tentative, au millième près.</p>
    <p>Éliminés en Q1 : <strong>Bortoleto, Hülkenberg, Alonso, Pérez, Stroll, Bottas</strong> — les deux Audi en tête de cette liste malgré d'importantes mises à jour amenées pour ce Grand Prix. Bearman se qualifie de justesse grâce à un tour référence sous pression, reléguant les deux Audi dans la zone d'élimination.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-q-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Q2 — Russell résiste, les deux Racing Bulls calent</h2>
    <p>La phase démarre sur une erreur de Lindblad. Comme en Q1, Hadjar colle Verstappen de près — sa première campagne de qualification complète depuis juillet — pendant que Russell impose d'emblée un temps de référence (1:43,686 sur son premier relais, amélioré à 1:43,462 par la suite), devant Leclerc, les deux McLaren et Hamilton. Hadjar bondit ensuite en P3, à seulement 0,194s de Russell — quatre écuries différentes aux avant-postes, promesse d'une bagarre serrée pour la pole. Gasly, tiré par l'aspiration de son coéquipier, grimpe jusqu'en P7.</p>
    <p>Dans le money-time, la bataille se joue chez Racing Bulls : Lawson et Lindblad doivent tous deux nettement progresser pour rallier la Q3. Lindblad, auteur d'une nouvelle erreur, renonce à repartir. Piastri et Lindblad se neutralisent presque au sommet du classement, sans conséquence pour l'un comme pour l'autre puisque le second est de toute façon hors du coup.</p>
    <p>Éliminés en Q2 : <strong>Bearman, Lawson, Albon, Ocon, Lindblad, Antonelli</strong> (sans temps, déjà hors course depuis la Q1).</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-q-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Q3 — Russell explose l'échelle des valeurs</h2>
    <p>Quatre écuries se tiennent en jeu pour la pole — Mercedes, Red Bull, McLaren, Ferrari — avec Russell en position de favori après avoir fini la Q2 deux dixièmes devant Verstappen. Il est le premier à boucler un tour, mais sans retrouver ses temps précédents : la porte s'ouvre pour McLaren, Norris s'emparant de la pole provisoire avant que Piastri ne profite d'un aspiration pour prendre l'avantage à 0,101s. Hadjar s'invite en P3 sur une piste redevenue plus dégagée.</p>
    <p>Plus loin dans le peloton, Russell repart et signe un tour spectaculaire qui le renvoie en tête, avec près de quatre dixièmes d'avance sur la Ferrari de Leclerc. Ses adversaires ne sont pourtant pas encore battus — sauf que l'ultime relais de Russell efface tout le monde : pole position par une marge colossale de 0,837s sur Leclerc, devant Piastri et Hadjar. Norris, pénalisé par un verrouillage sur son tour final, se contente de la P5, devant Hamilton, Gasly, Verstappen, Sainz et Colapinto.</p>
    <blockquote class="pull-quote">« Ça faisait un moment, donc ça fait clairement du bien. C'est probablement la plus grosse marge de toute ma carrière, même en comptant la F2 et la F3 — ce tour, il avait un goût particulier. La voiture est excellente ce week-end, et sur un circuit comme celui-ci, quand tu arrives à tout enchaîner comme ça, c'est vraiment incroyable. » <cite>— George Russell</cite></blockquote>
  </div>
</section>

<!--GHOST_LAP_REPLAY-->

<section class="block" data-num="04" id="sec-q-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Le tour de pole de Russell EST le temps théorique optimal</h2>
    <p>En additionnant le meilleur secteur individuel de chaque pilote toutes tentatives confondues, le temps théorique optimal de la séance s'établit à 1:42,526 (secteur 1 : Russell, 36,009 ; secteur 2 : Russell, 41,659 ; secteur 3 : Russell, 24,858). C'est très exactement — à la milliseconde près — le temps affiché par Russell pour sa pole position : il détient les trois meilleurs secteurs de la séance ET les a assemblés sur un seul et même tour, un cas de figure rare qui confirme littéralement sa propre description d'un tour où « tout s'est enchaîné ».</p>
    <p>Leclerc, à l'opposé de l'échelle des regrets, ne laisse presque rien sur la table non plus : ses propres meilleurs secteurs (36,079 + 42,065 + 25,160 = 1:43,304) ne sont qu'à 0,059s de son temps réel de qualification (1:43,363). L'écart de 0,837s qui le sépare de Russell n'est donc pas une marge de progression cachée chez le pilote Ferrari — c'est un écart de performance pure, sur un tour où les deux pilotes ont chacun approché leur propre plafond.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-q-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Pénalités et grille de départ</h2>
    <p>Alonso écope d'une pénalité supplémentaire pour changement de composants du groupe propulseur, qui renvoie sa Aston Martin — et celle de son coéquipier Stroll, également concerné — en fond de grille. Cette double relégation promeut les deux Cadillac : Sergio Pérez récupère la P19 et Valtteri Bottas la P20 sur la grille de départ définitive, à la place d'Alonso et Stroll qui ferment le peloton dimanche.</p>
    <p>Kimi Antonelli, non classé après son accident de Q1, s'élance 16<sup>e</sup> — sa pire position de qualification de la saison, mais sur une avance au championnat suffisamment large (292 points contre 211 pour Russell avant Bakou, soit 81 points) pour absorber un accroc ponctuel. Sainz écope en plus d'une pénalité de cinq places sur la grille pour ne pas avoir suffisamment ralenti sous drapeaux jaunes en qualifications, ce qui le renvoie de la P9 brute à la P14 définitive — une sanction distincte de sa réprimande pour l'incident d'EL3. Lindblad, réprimandé pour un incident séparé en EL3 (cf. article précédent), n'est en revanche concerné par aucune sanction de grille : sa réprimande reste un avertissement administratif, sans effet sur sa position de départ.</p>
  </div>
</section>

<section class="block" data-num="06" id="sec-q-6">
  <div class="sec-marker"><span class="n">06</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">06</span> Classement complet par meilleur tour (séance entière)</h2>
    <p>Classement par meilleur temps chronométré sur l'ensemble de l'heure de qualifications. Il recolle exactement aux temps officiels du Top 5, mais diffère de la grille officielle à trois positions : Formula1.com et PlanetF1 classent Hamilton 6<sup>e</sup>, Gasly 7<sup>e</sup> et Verstappen 8<sup>e</sup>, alors que le meilleur tour de Verstappen sur l'ensemble de la séance (temps affiché ci-dessous) devance légèrement ceux de Hamilton et Gasly — signe que son tour le plus rapide de la séance n'a pas été celui de son ultime relais de Q3, décisif pour le classement officiel. La colonne « Écart » signale la grille de départ définitive quand elle diffère de ce classement brut.</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:42,526</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:43,363</td><td>+0,837s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:43,364</td><td>+0,838s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:43,500</td><td>+0,974s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:43,672</td><td>+1,146s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:43,706</td><td>+1,180s (8<sup>e</sup> sur la grille officielle Q3)</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:43,858</td><td>+1,332s (6<sup>e</sup> sur la grille officielle Q3)</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:44,047</td><td>+1,521s (7<sup>e</sup> sur la grille officielle Q3)</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:44,566</td><td>+2,040s (14<sup>e</sup> sur la grille, pénalité 5 places pour drapeaux jaunes)</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:44,683</td><td>+2,157s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:44,775</td><td>+2,249s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:44,860</td><td>+2,334s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:45,001</td><td>+2,475s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:45,016</td><td>+2,490s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:45,106</td><td>+2,580s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:45,504</td><td>+2,978s (accrochage virage 1 en Q1, non classé au-delà)</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:45,799</td><td>+3,273s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:45,920</td><td>+3,394s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:46,593</td><td>+4,067s (21<sup>e</sup> ou 22<sup>e</sup> sur la grille, pénalité groupe propulseur)</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:46,658</td><td>+4,132s (19<sup>e</sup> sur la grille)</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:47,147</td><td>+4,621s (20<sup>e</sup> sur la grille)</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:47,337</td><td>+4,811s (21<sup>e</sup> ou 22<sup>e</sup> sur la grille, pénalité groupe propulseur)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-q-7">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en course</h2>
    <p>Russell peut-il convertir la plus grosse marge de sa carrière en victoire, sur un circuit où l'aspiration dans la ligne droite principale (2,2 km, la plus longue du calendrier) peut réduire les écarts dès le premier tour ? Leclerc et Piastri, séparés d'un millième pour la P2, partagent la deuxième ligne — un dépassement pour la 2<sup>e</sup> place dès le départ n'est pas à exclure. Et surtout : Antonelli, relégué en P16 après son accident, doit désormais remonter tout un peloton pour limiter la casse — avec 81 points d'avance au championnat avant ce Grand Prix, la marge est confortable, mais une course blanche pendant que Russell gagne referme vite l'écart.</p>
    <div class="callout">Rappel de méthode : le classement par meilleur tour de cette page couvre l'ensemble de la séance et recolle exactement aux temps officiels du Top 5, mais la grille réelle diffère à trois positions (6<sup>e</sup>-8<sup>e</sup>, voir section 06) et a été remaniée par les pénalités de Sainz (drapeaux jaunes) et d'Alonso/Stroll (groupe propulseur) — reconstituée ici uniquement à partir des éléments explicitement confirmés par Formula1.com et PlanetF1.</div>
  </div>
</section>

<section class="block" id="sec-q-8">
  <details class="sources">
    <summary>Sources utilisées — Qualifications Bakou (5 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py --session "Qualifying"), classement/secteurs/relais/météo, primaire.</span></li>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_telemetry.py --session "Qualifying"), position/vitesse par tour du replay Russell/Leclerc/Piastri ci-dessus, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Déroulé Q1/Q2/Q3, citation et classement par phase</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/russell-charges-to-pole-position-as-antonelli-suffers-shock-exit-in-qualifying-for-azerbaijan-gp.6vFe7216mR8JZuWE4QIB4w" data-desc="Rapport officiel des qualifications, fetché en primaire — déroulé complet par phase, citation de Russell.">Formula1.com — rapport qualifications</a><span class="desc">Formula1.com — primaire</span></li>
        <li><a href="https://www.planetf1.com/news/f1-results-azerbaijan-grand-prix-2026-qualifying" data-desc="Classement chiffré détaillé des trois phases Q1/Q2/Q3, fetché en primaire.">PlanetF1 — résultats détaillés par phase</a><span class="desc">PlanetF1 — primaire</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Pénalités et championnat</h5>
      <ul>
        <li><a href="https://www.planetf1.com/news/fia-aston-martin-azerbaijan-grand-prix-2026-penalty" data-desc="Pénalité de groupe propulseur d'Alonso et Stroll, promotion de Pérez et Bottas.">PlanetF1 — pénalité Aston Martin</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://www.racefans.net/2026/09/25/2026-azerbaijan-grand-prix-grid/" data-desc="Liste des pénalités de grille de la session, dont celle de Sainz pour non-ralentissement sous drapeaux jaunes.">RaceFans — grille et pénalités</a><span class="desc">RaceFans — primaire</span></li>
        <li><span class="desc">The Pit Wall — scripts/standings_briefing.py (round 14), classement pilotes avant le Grand Prix d'Azerbaïdjan (Antonelli 292 pts, Russell 211 pts), primaire.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
