// Analyse Sprint — Grand Prix de Singapour, round 17, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py
// --session "Sprint"), tours/relais/météo vérifiés directement depuis la base via
// scripts/practice_briefing.py (session_key 11383, 2026-10-10 09:00->10:00 UTC,
// soit 17:00->18:00 heure locale de Singapour — départ en réalité retardé d'une
// trentaine de minutes par un gros orage, confirmé par les deux sources externes).
// Le classement par meilleur tour/tours chronométrés de la base confirme à lui
// seul les grandes masses du récit (Pérez 0/2 tours, Stroll 0/1 tour, Russell
// 1/2 tours, Hadjar et Colapinto 2/3 tours, Bortoleto et Bottas 6/7 tours, Albon
// 14/15 tours, Piastri 19/20 tours — soit très exactement les 9 classés
// "abandon/retardataire" du rapport officiel) mais ne donne NI la grille de
// départ NI le classement final avec écarts/points, puisque cette séance est
// ingérée comme une séance d'essais (classement par tour) et non comme une
// course. Classement final, écarts, points et déroulé complet (drapeau rouge
// pluie, Safety Car de 6 tours, carambolage Albon/Bortoleto/Bottas au restart,
// accrochage Norris/Piastri) recoupés entre le rapport officiel Formula1.com et
// le tableau chiffré de PlanetF1 (les deux fetchés en primaire via fetch-url.yml)
// — concordance totale entre les deux sur toutes les positions et tous les
// écarts, aucune divergence cette fois. Citation de Verstappen reprise telle
// quelle de Formula1.com, seule source où elle apparaît. Aucune donnée inventée.
export const ROUND17_SPRINT_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Singapour · Marina Bay · Sprint — samedi 10 octobre</p>
    <p class="verdict">Verstappen remporte un Sprint chaotique, retardé par l'orage puis bouleversé dès le premier tour par la sortie de piste de Russell — qui l'avait pourtant doublé au départ. Cinq abandons en cinq tours, un carambolage au restart, et un accrochage Norris/Piastri qui a coûté le podium à McLaren.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">39:48,162</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+2,591s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+16,871s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+17,238s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#2B4562"></span><span class="drv">Lawson</span> <span class="gap">+20,632s</span></div>
    </div>
    <p class="subverdict">Un orage tombé une dizaine de minutes avant l'heure prévue a décalé le départ d'une trentaine de minutes et trempé les secteurs 1 et 3 du circuit (le secteur 2 restant lui à peine humide) — tout le plateau s'élance en pneu intermédiaire derrière la voiture de sécurité, pour un départ arrêté après deux tours de formation. Verstappen conserve sa pole en pointant d'emblée vers la victoire, mais le vrai scénario de ce Sprint s'écrit ailleurs : sur la piste qui sèche progressivement, sans qu'aucun pilote ne prenne le risque de passer au pneu sec avant le drapeau à damier.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-sprint-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Russell double Verstappen puis sort au tout dernier virage</h2>
    <p>Au feu vert, Russell profite des conditions glissantes pour doubler le poleman Verstappen dans le premier virage, Hamilton bondissant lui aussi à la 3<sup>e</sup> place devant Leclerc, Piastri et Norris. Aucun drame dans les premiers virages — jusqu'à ce que, au tout dernier virage du premier tour, Russell ne perde le contrôle de sa Mercedes en sortie de courbe, glisse en travers de la piste et percute le mur en béton. "Je vais bien. Pardon, pardon, pardon", lâche le Britannique à la radio. Verstappen récupère la tête par la même occasion.</p>
    <p>Russell n'est pas le seul pilote à abandonner dans la foulée : Pérez et Stroll se touchent au freinage du virage 16, l'Aston Martin s'arrêtant sur place et la Cadillac regagnant les stands au ralenti. Hadjar (à l'arrêt au virage 5) puis Colapinto (stoppé au virage 14) portent le total à cinq abandons en cinq tours, tous sous voiture de sécurité. Lindblad part lui aussi en tête-à-queue mais parvient à repartir, désormais dernier — 17<sup>e</sup> après ces abandons en chaîne.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-sprint-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Le restart tourne au carambolage pour trois voitures</h2>
    <p>La voiture de sécurité rentre à la fin du tour 6, Verstappen conservant la tête devant Hamilton, Leclerc, Piastri, Norris et Antonelli — Bearman se montrant déjà opportuniste en dépassant Gasly pour la 8<sup>e</sup> place, alors dernière position qualificative pour les points. Mais le restart lui-même tourne mal plus loin dans le peloton : les ralentis montrent la Williams d'Albon percuter l'arrière de l'Audi de Bortoleto, puis la Cadillac de Bottas percuter à son tour l'arrière de la Williams. Bortoleto et Bottas abandonnent sur-le-champ ; Albon, lui, repart mais sera contraint à l'abandon plus tard dans la course — les commissaires annonçant une enquête post-course sur cet accrochage par l'arrière. Hamilton, de son côté, est noté pour un possible manquement au drapeau jaune — décision des commissaires : aucune sanction supplémentaire.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-sprint-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> L'accrochage Norris-Piastri qui coûte le podium à McLaren</h2>
    <p>À mi-course, Verstappen compte 1,3s d'avance sur Hamilton, qui juge la piste "de plus en plus proche du sec, mais encore trop humide par endroits" — personne ne prend le risque de passer au pneu sec. Leclerc, 3<sup>e</sup>, voit ses pneus avant "détruits" sous la pression grandissante de Piastri et Norris, les deux McLaren refermant l'écart dans les derniers tours. L'espoir d'un podium pour l'écurie de Woking s'effondre lorsque Norris tente un dépassement sur son coéquipier au virage 5 — contact entre les deux voitures, Piastri part en tête-à-queue. L'Australien perd dix positions d'un coup et termine à un tour, classé 14<sup>e</sup> ; Norris s'en sort avec la 8<sup>e</sup> place, mais laisse planer la question d'éventuelles suites disciplinaires.</p>
    <p>Cet incident reclasse tout le monde derrière Leclerc, qui conserve la 3<sup>e</sup> place devant Antonelli (monté à la 4<sup>e</sup> position), Lawson, Bearman et Hulkenberg — Gasly complétant le top 9 après avoir vu son offensive initiale pour les points s'essouffler, devant Ocon, Alonso, Sainz et Lindblad, tous relégués eux aussi au tour par l'accrochage Norris/Piastri.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-sprint-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Verstappen gère, Ferrari signe un doublé 2<sup>e</sup>-3<sup>e</sup></h2>
    <p>Devant, Verstappen ne revoit jamais ses adversaires : il gère ses pneus intermédiaires sur une piste qui sèche progressivement et franchit la ligne avec 2,591s d'avance sur Hamilton, Leclerc complétant un podium entièrement Ferrari-Red Bull à 16,871s. C'est la première victoire du Néerlandais en Sprint cette saison, un mois seulement après son premier succès de l'année en Malaisie.</p>
    <blockquote class="pull-quote">« Le départ a encore été horrible, honnêtement, donc c'est clairement un point à travailler, parce que si ça se reproduit demain, c'est la course qui est terminée si rien de fou ne se passe. Donc pas idéal, mais on a eu un peu de chance avec ce qui est arrivé à George au dernier virage. Après ça, on a juste voulu rester calme et garder le contrôle, parce qu'on sait qu'on ne peut pas dépasser ici, surtout dans ces conditions avec les intermédiaires. Donc on a juste essayé de ramener la voiture, et bien sûr je suis content de gagner ce Sprint, mais je sais aussi que je veux gagner demain, pas aujourd'hui. » <cite>— Max Verstappen</cite></blockquote>
  </div>
</section>

<section class="block" data-num="05" id="sec-sprint-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Classement complet et points marqués</h2>
    <p>Barème Sprint (8 premiers uniquement) : 8-7-6-5-4-3-2-1. Russell perd cinq points supplémentaires au classement pilotes face à son coéquipier Antonelli, désormais 89 points devant lui.</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Écart</th><th>Points</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>39:48,162</td><td>8</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>+2,591s</td><td>7</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>+16,871s</td><td>6</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>+17,238s</td><td>5</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>+20,632s</td><td>4</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>+24,321s</td><td>3</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>+27,525s</td><td>2</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>+28,272s</td><td>1</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>+36,220s</td><td>—</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>+37,640s</td><td>—</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>+50,464s</td><td>—</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>+52,467s</td><td>—</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>+55,792s</td><td>—</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>+1 tour (accrochage avec Norris, virage 5)</td><td>—</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>+6 tours (abandon tardif, enquête post-course)</td><td>—</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>+14 tours (abandon, percuté par Albon au restart)</td><td>—</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>+14 tours (abandon, carambolage du restart)</td><td>—</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>+18 tours (abandon, virage 5, tour 1-2)</td><td>—</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>+18 tours (abandon, virage 14, tour 1-2)</td><td>—</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>+19 tours (sortie de piste, dernier virage du tour 1)</td><td>—</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>+19 tours (accrochage avec Stroll, tour 1)</td><td>—</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>+19 tours (accrochage avec Pérez, tour 1)</td><td>—</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-sprint-6">
  <details class="sources">
    <summary>Sources utilisées — Sprint Singapour (2 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py --session "Sprint"), tours/relais/météo, primaire — confirme les tours chronométrés par pilote (abandons/retardataires) mais pas le classement final avec écarts et points.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Déroulé complet, classement final et citation</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/verstappen-wins-dramatic-rain-hit-singapore-sprint-as-russell-crashes-and-mclarens-collide.4r90mH2skljBa5sinFAsyp" data-desc="Rapport officiel du Sprint, fetché en primaire — déroulé complet, citation de Verstappen, classement avec points.">Formula1.com — rapport Sprint</a><span class="desc">Formula1.com — primaire</span></li>
        <li><a href="https://www.planetf1.com/news/f1-results-singapore-grand-prix-2026-sprint-race" data-desc="Classement chiffré complet avec écarts, fetché en primaire — concorde exactement avec Formula1.com sur toutes les positions.">PlanetF1 — résultats détaillés</a><span class="desc">PlanetF1 — primaire</span></li>
      </ul>
    </div>
  </details>
</section>
`;
