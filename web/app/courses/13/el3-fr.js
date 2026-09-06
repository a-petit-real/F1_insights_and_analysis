// Analyse EL3 — GP d'Italie (Monza), round 13, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1, classement/secteurs/relais/
// météo lus directement en base (practice_briefing.py). Contrairement à
// l'EL2, la somme des trois meilleurs secteurs de chaque pilote ne recolle
// pas exactement à son meilleur tour ici (ex. Russell : 27,094+27,709+
// 27,339 = 82,142, contre un meilleur tour de 82,219) — signe que les
// meilleurs secteurs ne proviennent pas tous du même tour ce jour-là. Traité
// comme une donnée informative distincte, pas comme une reconstitution du
// tour de référence, conformément à l'avertissement du script source
// lui-même. Recoupement externe : Formula1.com confirme indépendamment le
// podium Russell/Hamilton/Verstappen de cette séance dans son compte-rendu
// des qualifications, cohérent au pilote près avec le classement en base.
// Aucune donnée inventée.
export const ROUND13_EL3_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix d'Italie · Monza · EL3 — samedi 5 septembre</p>
    <p class="verdict">Russell confirme, Verstappen revient dans le coup : la dernière séance avant les qualifications resserre l'écart plutôt qu'elle ne le clarifie.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">1:22,219</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,226s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,350s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,361s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+0,406s</span></div>
    </div>
    <p class="subverdict">Après une EL1 à l'avantage de Ferrari puis une EL2 à celui de Mercedes, l'EL3 confirme la tendance de l'après-midi de vendredi (Russell devant) sans offrir de nouvelle certitude : les six premiers tiennent en 0,4s, et Verstappen, à son meilleur chrono du week-end, referme brutalement l'écart qui semblait s'installer entre Red Bull et le trio de tête.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el3-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Russell confirme, sur une séance plus courte</h2>
    <p>Russell signe le meilleur temps de la matinée (1:22,219) avec seulement 12 tours chronométrés sur les 14 accomplis — la séance la moins « roulée » du week-end pour lui, ce qui n'empêche pas la référence. Hamilton referme l'écart avec Ferrari à 0,226s, mais c'est Verstappen qui produit le fait marquant de la séance : troisième à 0,350s, son meilleur résultat du week-end après une EL1 manquée et une EL2 discrète (P9). Antonelli et Norris, respectivement 4<sup>e</sup> et 5<sup>e</sup>, ferment un groupe de tête très resserré.</p>
    <p>À la différence de l'EL2, les meilleurs secteurs relevés par pilote ne recollent pas exactement à leur meilleur tour ce samedi matin (l'écart est d'environ un dixième pour Russell comme pour Hamilton) : plusieurs tours rapides ont donc contribué à ces références plutôt qu'un seul tour parfait, une nuance que le classement brut ne montre pas mais que la base permet de vérifier.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el3-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> McLaren toujours en retrait, Leclerc discret</h2>
    <p>Norris (+0,406s) et Piastri (8<sup>e</sup>, +0,554s) referment un peu l'écart par rapport à l'EL2 sans intégrer le trio de tête — troisième séance de suite où McLaren reste hors du podium virtuel, cohérent avec le déficit en virages lents assumé par l'équipe avant le week-end. Leclerc, auteur du meilleur temps de l'EL1, referme cette EL3 seulement 6<sup>e</sup> à 0,489s — sans qu'aucun élément en base ne permette de savoir si c'est un choix de programme (relais plus long, réglage à valider) ou un vrai signal de perte de rythme avant les qualifications de l'après-midi.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el3-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Météo stable, toujours sous Heat Hazard</h2>
    <p>Conditions proches de celles de l'EL2 : air entre 30,1 et 31,9°C sur l'heure (légèrement plus frais qu'en EL2, la séance ayant lieu en matinée plutôt qu'en début d'après-midi), piste entre 48,8 et 54,0°C, aucune pluie relevée. Les prévisions annonçaient une hausse progressive vers les qualifications et la course — cette EL3 se situe dans la fourchette basse du week-end, ce qui invite à la prudence sur la comparaison directe des temps avec l'EL2 ou les qualifications, disputées dans des conditions plus chaudes.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el3-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Classement complet EL3</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:22,219</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:22,445</td><td>+0,226s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:22,569</td><td>+0,350s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:22,580</td><td>+0,361s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:22,625</td><td>+0,406s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:22,708</td><td>+0,489s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:22,724</td><td>+0,505s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:22,773</td><td>+0,554s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:22,898</td><td>+0,679s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:23,101</td><td>+0,882s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:23,126</td><td>+0,907s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Lawson</td><td>Red Bull Racing</td><td>1:23,203</td><td>+0,984s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:23,298</td><td>+1,079s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:23,585</td><td>+1,366s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Tsunoda</td><td>Racing Bulls</td><td>1:23,817</td><td>+1,598s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:23,875</td><td>+1,656s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:24,020</td><td>+1,801s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:24,437</td><td>+2,218s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:24,919</td><td>+2,700s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:25,004</td><td>+2,785s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:25,031</td><td>+2,812s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:25,555</td><td>+3,336s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el3-5">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en qualifications</h2>
    <p>Trois séances, trois configurations différentes en tête : Ferrari (EL1), Mercedes (EL2), Mercedes à nouveau mais avec un Verstappen relancé (EL3). Rien ne permet d'anticiper la hiérarchie des qualifications avec certitude — les six premiers de l'EL3 tiennent en quatre dixièmes, une marge que l'aspiration et le choix du moment de départ peuvent facilement inverser sur un tour unique à Monza.</p>
    <div class="callout">Rappel de méthode : l'EL3 se rapproche des conditions de qualification (piste évacuée, réglages figés pour la plupart), mais reste une séance d'essais — programmes de relais encore mélangés avec les tours rapides, comme le montrent les stratégies pneus enregistrées en base.</div>
  </div>
</section>

<section class="block" id="sec-el3-6">
  <details class="sources">
    <summary>Sources utilisées — EL3 Monza (2 liens)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Recoupement</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/gasly-charges-to-sensational-maiden-f1-pole-at-monza-over-russell-and-piastri.4CKkkbvgmqL04ijMNBfuXF" data-desc="Le compte-rendu des qualifications rappelle en ouverture le podium EL3 (Russell, Hamilton, Verstappen), cohérent avec le classement en base.">Formula1.com — rapport qualifications (rappel EL3)</a><span class="desc">Formula1.com — recoupement</span></li>
      </ul>
    </div>
  </details>
</section>
`;
