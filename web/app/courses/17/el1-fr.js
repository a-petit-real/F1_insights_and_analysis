// Analyse EL1 — Grand Prix de Singapour, round 17, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py (session_key
// 11378, 2026-10-09 08:30->09:30 UTC, soit 16:30->17:30 heure locale de Singapour).
// Classement, écarts au centième et déroulé de séance recoupés avec le rapport
// officiel Formula1.com (fetché en primaire via fetch-url.yml, URL en sources
// ci-dessous) : les temps du top 5 concordent exactement à la milliseconde avec
// la base (Russell 1:32,274, Leclerc +0,198s, Norris +0,273s, Hamilton +0,499s,
// Piastri +0,564s), de même que l'ordre complet du classement jusqu'à la 22e
// position. Deuxième source indépendante, PlanetF1 (fetché en primaire via
// fetch-url.yml), publie le même classement chiffré des 22 pilotes à la
// milliseconde près, sans aucun écart — contrairement à la Sprint Qualifying de
// ce même round, où le recoupement à deux sources a révélé une correction
// nécessaire (cf. sprint-quali-fr.js). Citations de Russell ("the car feels very
// stiff") et de Hülkenberg ("something bad happened on the gearbox") reprises
// telles quelles de Formula1.com, seule source où elles apparaissent. Aucune
// pré-analyse n'existe pour ce round. Aucune donnée inventée.
export const ROUND17_EL1_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Singapour · Marina Bay · EL1 — vendredi 9 octobre</p>
    <p class="verdict">Russell signe le meilleur temps de l'unique séance d'essais du week-end à Marina Bay — mais le Britannique partira dimanche depuis le fond de la grille, pénalité moteur déjà actée avant même d'avoir roulé.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">1:32,274</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,198s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+0,273s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,499s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">+0,564s</span></div>
    </div>
    <p class="subverdict">Feu vert à 16h30 heure locale (8h30 UTC), sur un asphalte poussiéreux et à faible adhérence, dans la lumière déclinante du crépuscule tropical. Format resserré à l'extrême : une seule heure d'essais avant d'attaquer directement les qualifications sprint, plus tard ce même vendredi — pas d'EL2, pas d'EL3 à Marina Bay cette année. Russell boucle la séance en tête, mais son week-end est déjà écrit avant le premier tour chronométré : changement de groupe propulseur, départ du fond de grille dimanche.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el1-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Russell devant, mais une pénalité déjà actée avant de rouler</h2>
    <p>Le meilleur temps du jour revient à George Russell, auteur d'un 1:32,274 qui ne sera plus battu de la séance, 0,198s devant la Ferrari de Leclerc et 0,273s devant la McLaren de Norris. Mais la nouvelle la plus lourde de consé­quence pour le week-end n'a rien à voir avec le chronomètre : Mercedes a changé le groupe propulseur du Britannique, ce qui lui vaut un départ dimanche depuis le fond de la grille, quel que soit le résultat des qualifications. Sur un circuit urbain où les dépassements sont rares et précieux, remonter depuis l'arrière du peloton s'annonce comme le vrai défi du week-end — bien plus que cette première place en EL1, obtenue sur un tracé que Russell lui-même juge peu amène : "la voiture est très raide", a-t-il rapporté sur les ondes en préparant la course de dimanche.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el1-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Un asphalte poussiéreux qui n'a pardonné à personne</h2>
    <p>Avec seulement une heure pour peaufiner les réglages et apprivoiser l'exigeant circuit de Marina Bay, les écuries se sont élancées dès le début de la séance malgré une piste poussiéreuse et peu optimale — la plupart des monoplaces chaussant d'abord le pneu dur. Les sorties de piste ont suivi : l'Aston Martin de Lance Stroll au virage 1, puis la McLaren de Norris au virage 16, toutes deux dans les premières minutes. Plus tard dans la séance, Norris a connu un second incident, cette fois un évitement de justesse contre le mur du virage 9 qui l'a contraint à se dérouter dans le dégagement — sans incidence sur son chrono final, puisqu'il conserve la 3<sup>e</sup> place. Au 15<sup>e</sup> minute de roulage, c'est Norris qui détenait la référence provisoire avec un 1:34,367, les conditions de piste s'améliorant progressivement tandis que les températures amorçaient leur baisse avec l'arrivée du soir.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el1-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Virtual Safety Car pour Hülkenberg, puis la bagarre des pneus tendres</h2>
    <p>Leclerc est devenu le premier pilote à passer sous la barre des 1:34 avec un 1:33,969, avant qu'Antonelli ne reprenne la référence en 1:33,830. À moins de 20 minutes du drapeau, Nico Hülkenberg s'est arrêté sur le circuit après avoir signalé par radio qu'"il s'est passé quelque chose de grave au niveau de la boîte de vitesses" — l'Audi a été ramenée aux stands sous un bref Virtual Safety Car, mettant un terme prématuré à sa séance (18<sup>e</sup>, 14/16 tours chronométrés). Une fois la piste rouverte, Russell a été le premier à chausser le pneu tendre et a immédiatement repris la tête avec un 1:32,864, Piastri échouant à seulement 0,034s derrière lui, tandis que Leclerc abandonnait sa première tentative après s'être plaint d'un gêneur au virage 5. Hamilton a ensuite signé la meilleure référence du jour (1:32,821) avant que Russell n'impose définitivement son autorité dans les cinq dernières minutes avec son 1:32,274 final, qui tiendra jusqu'au drapeau à damier devant Leclerc et Norris.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el1-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Verstappen 6<sup>e</sup> sans jamais toucher au pneu tendre</h2>
    <p>Hamilton termine 4<sup>e</sup>, devant Piastri et la Red Bull de Max Verstappen, 6<sup>e</sup> — et seul pilote du top 6 à avoir signé son meilleur temps avec le pneu medium plutôt que le tendre. Un choix qui, comme à Sepang quinze jours plus tôt, mérite d'être gardé en tête avant de juger l'écart final (+0,732s) : Verstappen n'a jamais eu besoin de la gomme la plus rapide pour rester dans le wagon de tête. Antonelli complète le top 7 sur pneu tendre lui aussi, après être sorti large au virage 16 sur son ultime tentative. Le top 10 est bouclé par la Red Bull d'Isack Hadjar, l'Alpine de Pierre Gasly et la Racing Bulls de Liam Lawson.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-el1-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Classement complet EL1</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:32,274</td><td>— (pénalité moteur : départ dimanche depuis le fond de la grille)</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:32,472</td><td>+0,198s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:32,547</td><td>+0,273s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:32,773</td><td>+0,499s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:32,838</td><td>+0,564s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:33,006</td><td>+0,732s (meilleur tour sur pneu medium)</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:33,525</td><td>+1,251s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:33,723</td><td>+1,449s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:34,038</td><td>+1,764s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:34,155</td><td>+1,881s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:34,331</td><td>+2,057s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:34,476</td><td>+2,202s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:34,481</td><td>+2,207s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:34,495</td><td>+2,221s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:34,651</td><td>+2,377s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:34,736</td><td>+2,462s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:34,805</td><td>+2,531s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:34,884</td><td>+2,610s (arrêt sur piste, panne de boîte de vitesses, VSC)</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:34,983</td><td>+2,709s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:35,268</td><td>+2,994s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:35,299</td><td>+3,025s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:35,620</td><td>+3,346s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el1-6">
  <details class="sources">
    <summary>Sources utilisées — EL1 Singapour (2 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Recoupement et contexte narratif</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/fp1-russell-beats-leclerc-and-norris-to-top-spot-in-sole-practice-ahead-of-singapore-gp.6gZxy1UbfI5R8VLWXUBwZu" data-desc="Rapport officiel EL1 : déroulé complet, citations de Russell et Hülkenberg, classement — concorde exactement avec la base à la milliseconde près.">Formula1.com — rapport EL1</a><span class="desc">Formula1.com — primaire</span></li>
        <li><a href="https://www.planetf1.com/news/f1-results-singapore-grand-prix-2026-fp1" data-desc="Classement chiffré des 22 pilotes, fetché en primaire — confirme sans le moindre écart le classement de Formula1.com et de la base.">PlanetF1 — résultats détaillés</a><span class="desc">PlanetF1 — primaire</span></li>
      </ul>
    </div>
  </details>
</section>
`;
