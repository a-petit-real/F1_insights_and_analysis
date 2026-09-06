// Analyse Qualifications — GP d'Italie (Monza), round 13, saison 2026.
//
// Sourcing : donnée primaire pour le classement chiffré = pipeline OpenF1
// (scripts/ingest_openf1_practice.py --session "Qualifying", même schéma que
// les EL, tables practice_*), classement par meilleur tour sur l'ensemble de
// la séance — qui recolle exactement, au millième, avec les temps du Top 10
// publiés par Formula1.com (Gasly 1:21,786, Russell 1:21,846, Piastri
// 1:21,966, Leclerc 1:22,004, Hamilton 1:22,011). Ce classement brut par
// temps NE reproduit PAS forcément l'ordre officiel Q1/Q2/Q3 (les pilotes
// éliminés tôt roulent moins et n'ont pas la même fenêtre de piste dégagée) :
// le déroulé Q1/Q2/Q3, les éliminations et les pénalités de grille sont donc
// sourcés depuis le rapport officiel Formula1.com (fetché en primaire via
// fetch-url.yml), seule source disposant du détail par phase. Grille de
// départ définitive : seuls les éléments explicitement confirmés par cette
// source sont indiqués (pole, 2e rang Ferrari, Verstappen 5e, la pénalité de
// Piastri, les départs du fond de grille/de la voie des stands) — le reste de
// l'ordre exact n'est pas reconstitué pour éviter d'inventer une position non
// confirmée. Aucune donnée inventée.
export const ROUND13_QUALI_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix d'Italie · Monza · Qualifications — samedi 5 septembre</p>
    <p class="verdict">Pierre Gasly décroche la première pole position de sa carrière, devant Russell et Piastri — le nom que personne n'avait dans son scénario du week-end.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">Pole</span> <span class="dot" style="background:#FF87BC"></span><span class="drv">Gasly</span> <span class="gap">1:21,786</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,060s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">+0,180s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,218s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,225s</span></div>
    </div>
    <p class="subverdict">Aucune des trois séances d'essais n'avait placé Gasly ni Alpine en position de jouer la pole — neuvième en EL3 à 0,679s de la référence, quelques heures plus tôt. Le tour décisif tombe au meilleur moment possible, sur la dernière tentative de Q3, et prive Russell d'une pole qu'il occupait provisoirement. Piastri complète un Top 3 à trois écuries différentes, avant qu'une pénalité de grille ne le renvoie plus bas dans l'ordre de départ.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-q-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Q1 — Gasly déjà devant, les jeux d'aspiration commencent</h2>
    <p>Trois pilotes savaient avant même le départ de Q1 qu'ils partiraient plus bas dimanche à cause de pénalités moteur : Antonelli (leader du championnat), Albon et Lawson — ce qui a immédiatement posé la question de savoir si Mercedes et Red Bull les utiliseraient pour remorquer Russell et Verstappen sur leur tour de Q3. Gasly (1:22,612) et Colapinto (1:22,662) prennent rapidement les commandes, encadrant la Red Bull de Verstappen, avant qu'Antonelli (P4) et Russell (P5, sur medium plutôt que tendre) ne s'invitent dans le groupe de tête.</p>
    <p>Éliminés en Q1 : <strong>Tsunoda, Albon, Bottas, Perez, Alonso, Stroll</strong>. Norris se plaint dès cette phase d'un manque de confiance au freinage (« Il n'y a rien d'autre que je peux faire pour ces freins maintenant ? Je pense juste que ça va mal se passer au virage 1 »), un souci qui affecte également Piastri, provisoirement P11 derrière les Mercedes, les Ferrari et la Haas de Bearman avant de passer sans encombre en Q2.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-q-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Q2 — Antonelli en tête, Hamilton se sauve au millième</h2>
    <p>Verstappen alerte son ingénieur dès son tour de préparation (« La voiture est encore cassée à l'arrière. C'est vraiment impossible à conduire dans les virages 2, 4 et 5 »). Piastri prend provisoirement la tête, devant Norris, avant qu'une salve d'améliorations ne renvoie Antonelli en tête de la séance (1:21,882) — la dernière fois qu'il jouera un temps de référence ce week-end avant sa pénalité de grille.</p>
    <p>Le moment le plus tendu de la séance concerne Hamilton, qualifié pour Q3 avec seulement 0,001s d'avance sur la Audi de Bortoleto — une marge microscopique qui aurait envoyé le septuple champion du monde en Q2 pour la première fois du week-end. Éliminés en Q2 : <strong>Bortoleto, Bearman, Hülkenberg, Lawson, Sainz, Ocon</strong> — Lawson visiblement irrité après avoir été gêné par Piastri à la sortie de la première chicane sur son tour final, incident noté puis sanctionné par les commissaires.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-q-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Q3 — le tour qui change tout</h2>
    <p>Russell prend la tête provisoire (1:21,929) sur un tour aidé par le remorquage d'Antonelli, prévu de longue date par Mercedes. Leclerc mène les Ferrari en 4<sup>e</sup> position sur les premiers relais, devant Verstappen, Norris, Lindblad, Hamilton et Colapinto — Antonelli complète alors un tour décalé du reste du peloton (après avoir remorqué Russell) pour remonter provisoirement 6<sup>e</sup>.</p>
    <p>Russell lui-même reconnaît ne pas se sentir à l'aise au volant : « Je suis vraiment en difficulté avec la voiture par rapport à l'EL3. Ça bloque à l'avant et il y a de l'instabilité à haute vitesse. » Piastri manque une nouvelle fois son entrée dans la première chicane au début du dernier relais, mais plusieurs secteurs verts et violets s'enchaînent derrière lui — notamment chez Gasly et son Alpine. Sur ce dernier relais, Gasly boucle un 1:21,786 qui le propulse devant Piastri et Russell (pourtant lui-même amélioré) : première pole position de sa carrière, neuf ans après ses débuts en Formule 1 et sur le même circuit que sa première victoire, en 2020. Leclerc et Hamilton doivent se contenter des 4<sup>e</sup> et 5<sup>e</sup> temps, devant Verstappen, Antonelli (avant sa pénalité), Colapinto, Norris (qui ne progresse pas sur son ultime tentative) et Lindblad.</p>
    <blockquote class="pull-quote">« C'était incroyable. Une Qualification incroyable. Dès le premier tour en Q1, je me suis senti très bien dans la voiture. J'essayais de grappiller un petit quelque chose à chaque séance, et à la fin [en Q3], ça donnait l'impression d'un très bon tour. Je suis tellement heureux. Ça fait neuf ans que je cours après l'opportunité de décrocher une pole position. J'ai gagné ma première course à Monza, et obtenir ma première pole position sur ce circuit... je pense que c'est quelque chose de spécial ici. » <cite>— Pierre Gasly</cite></blockquote>
  </div>
</section>

<section class="block" data-num="04" id="sec-q-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Pénalités et grille de départ</h2>
    <p>Le classement brut de Q3 ne dit pas tout : Piastri, provisoirement 3<sup>e</sup>, est reculé de trois places sur la grille pour avoir gêné Lawson lors de son tour final de Q2 — une sanction qui promeut les deux Ferrari sur la deuxième ligne (Leclerc et Hamilton) et place Verstappen 5<sup>e</sup>. Antonelli, lui, s'élance du fond de grille comme annoncé avant le week-end (changement complet de groupe propulseur) ; Albon subit le même sort pour une pénalité moteur, tout comme Lawson, contraint en plus de s'élancer depuis la voie des stands après une modification de l'aileron arrière de sa Red Bull sous conditions de parc fermé — rejoint dans la voie des stands par Alonso, qui a lui aussi changé de groupe propulseur après les qualifications.</p>
    <p>Franco Colapinto place la seconde Alpine en Q3 pour la première fois du week-end (8<sup>e</sup> sur le classement brut), devant Norris — freins toujours en cause pour les deux McLaren — et Lindblad, auteur d'une belle progression après une EL3 déjà solide (7<sup>e</sup>).</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-q-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Classement complet par meilleur tour (séance entière)</h2>
    <p>Classement par meilleur temps chronométré sur l'ensemble de l'heure de qualifications — il recolle exactement aux temps du Top 5 publiés par Formula1.com, mais ne reflète pas nécessairement l'ordre officiel Q1/Q2/Q3 ni la grille définitive après pénalités (voir section précédente).</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:21,786</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:21,846</td><td>+0,060s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:21,882</td><td>+0,096s (départ fond de grille)</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:21,966</td><td>+0,180s (−3 places de grille)</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:22,004</td><td>+0,218s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:22,011</td><td>+0,225s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:22,067</td><td>+0,281s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:22,070</td><td>+0,284s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:22,220</td><td>+0,434s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:22,286</td><td>+0,500s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:22,517</td><td>+0,731s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:22,756</td><td>+0,970s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:22,779</td><td>+0,993s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Lawson</td><td>Red Bull Racing</td><td>1:22,821</td><td>+1,035s (départ voie des stands)</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:23,453</td><td>+1,667s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:23,454</td><td>+1,668s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Tsunoda</td><td>Racing Bulls</td><td>1:23,755</td><td>+1,969s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:24,356</td><td>+2,570s (pénalité moteur)</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:24,364</td><td>+2,578s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:24,595</td><td>+2,809s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:25,150</td><td>+3,364s (départ voie des stands)</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:25,222</td><td>+3,436s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-q-6">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en course</h2>
    <p>Gasly convertira-t-il sa première pole en une opportunité de victoire, sur un circuit qu'il connaît déjà pour y avoir gagné en 2020 ? Antonelli, parti du fond de grille, peut-il rééditer une remontée spectaculaire sur une piste où les dépassements restent plus accessibles qu'ailleurs ? Et Piastri, reculé sur la grille malgré le 4<sup>e</sup> temps brut, peut-il limiter la casse face à des Ferrari désormais devant lui au départ ?</p>
    <div class="callout">Rappel de méthode : le classement par meilleur tour de cette page couvre l'ensemble de la séance et recolle exactement aux temps officiels du Top 5 — mais la grille de départ réelle, remaniée par les pénalités, est reconstituée ici uniquement à partir des éléments explicitement confirmés par Formula1.com plutôt que d'une supposition ligne par ligne.</div>
  </div>
</section>

<section class="block" id="sec-q-7">
  <details class="sources">
    <summary>Sources utilisées — Qualifications Monza (2 liens)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py --session "Qualifying"), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Déroulé Q1/Q2/Q3, pénalités et citations</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/gasly-charges-to-sensational-maiden-f1-pole-at-monza-over-russell-and-piastri.4CKkkbvgmqL04ijMNBfuXF" data-desc="Rapport officiel des qualifications, fetché en primaire — déroulé complet par phase, éliminations, pénalités, citations.">Formula1.com — rapport qualifications</a><span class="desc">Formula1.com — primaire</span></li>
      </ul>
    </div>
  </details>
</section>
`;
