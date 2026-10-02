// Analyse EL2 — Grand Prix de Bahreïn (couru en Malaisie), round 16, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py (session_key
// 11728, 2026-10-02 08:00->09:00 UTC, soit 16:00->17:00 heure locale de Kuala
// Lumpur — horaire qui concorde exactement avec le timetable officiel Formula1.com
// déjà vérifié pour l'EL1 de ce round). Analyse par secteur (temps théorique
// optimal vs tour réel) calculée à partir des temps de secteur individuels déjà en
// base, non reprise d'une source externe. Aucune information narrative
// supplémentaire (citation, cause technique précise pour Colapinto) n'a pu être
// vérifiée pour cette séance — le compte-rendu "live" officiel de l'EL2 est, comme
// pour l'EL1 de ce round, rendu en JavaScript côté client et non récupérable en
// texte par fetch_url.py. L'écart de Colapinto est donc rapporté comme un fait de
// données (près de 6s, sur les trois secteurs) sans cause avancée. Aucune
// pré-analyse n'existe pour ce round. Aucune donnée inventée.
export const ROUND16_EL2_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Bahreïn (couru en Malaisie) · Sepang · EL2 — vendredi 2 octobre</p>
    <p class="verdict">Ferrari répond à Red Bull : Leclerc prend la tête de l'EL2, Norris se reprend spectaculairement après une EL1 à oublier — mais la séance restera surtout marquée par la perte sèche de Colapinto, à près de 6 secondes du meilleur temps.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">1:37,528</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Hadjar</span> <span class="gap">+0,099s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+0,137s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,257s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,305s</span></div>
    </div>
    <p class="subverdict">Deuxième heure d'essais sous la même chaleur écrasante qu'à l'EL1 — jusqu'à 34°C dans l'air, une piste qui a dépassé les 62°C en tout début de séance avant de redescendre progressivement vers 52°C. Le classement se redistribue complètement par rapport à l'EL1 : la Ferrari de Leclerc devance désormais la Red Bull de Hadjar, et les deux McLaren (3<sup>e</sup> et 6<sup>e</sup>) referment l'écart après une première séance décevante. Le haut du classement reste extrêmement resserré — huit pilotes en 0,532s — mais Franco Colapinto referme la marche à plus de 5,8 secondes, une anomalie que rien dans les données de course ne permet d'expliquer.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el2-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Ferrari répond à Red Bull, Hadjar confirme</h2>
    <p>Après le doublé Red Bull de l'EL1 (Verstappen devant, Hadjar 3<sup>e</sup>), c'est au tour de Ferrari de prendre la tête avec Leclerc, en 1:37,528 — à peine 0,008s de mieux que le temps de référence de Verstappen la veille, une heure plus tôt dans la journée. Hadjar confirme la bonne forme de Red Bull en terminant 2<sup>e</sup> à seulement 0,099s, cette fois-ci devant son coéquipier Verstappen, relégué 4<sup>e</sup> (+0,257s) — l'ordre interne de l'écurie s'inverse d'une séance à l'autre. Hamilton referme l'écart pour la deuxième Ferrari, 5<sup>e</sup> à 0,305s, confirmant une Scuderia en net progrès par rapport à l'EL1, où ses deux pilotes pointaient 4<sup>e</sup> et 6<sup>e</sup>.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el2-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Norris efface sa pire séance du week-end</h2>
    <p>Après une EL1 anonyme (12<sup>e</sup>, +1,773s, en dehors du top 10), Norris signe l'un des plus gros bonds du plateau : 3<sup>e</sup> de l'EL2 à seulement 0,137s de Leclerc, son meilleur résultat des deux séances du vendredi. Piastri suit la tendance avec une 6<sup>e</sup> place (+0,371s), contre 11<sup>e</sup> la veille — les deux McLaren quittent la zone de danger qu'elles occupaient après l'EL1, sans que les données de course n'indiquent la nature du changement opéré entre les deux séances (réglages, carburant, ou simple adaptation au tracé).</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el2-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> La séance à oublier de Colapinto</h2>
    <p>Déjà sous le coup d'une pénalité de 5 places sur la grille ce week-end pour son accrochage de Bakou (voir l'analyse de l'EL1), Franco Colapinto referme la marche de l'EL2 à 1:43,391 — 5,863s derrière Leclerc, plus de deux secondes derrière le 21<sup>e</sup>, Pérez. L'écart n'est pas localisé sur un seul passage : ses meilleurs temps de secteur (26,168 / 35,274 / 41,371) sont, chacun pris isolément, les plus lents de tout le plateau sur cette séance — y compris son secteur 2, à 35,274, loin du 32,229 d'Hadjar en tête de cette portion. Rien dans les relais pneus enregistrés (deux relais medium puis un relais tendre, une gestion de pneus classique) n'indique de cause technique précise ; aucune confirmation externe n'a pu être trouvée pour cette séance. Le constat reste celui des chiffres : une Alpine n°43 hors du rythme sur l'ensemble du tour, à la veille d'un week-end qui s'annonçait déjà compliqué pour son pilote.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el2-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Sepang reste une piste étonnamment "propre"</h2>
    <p>Comme à l'EL1, le tour théorique optimal — en combinant le meilleur secteur de chaque pilote toutes voitures confondues (25,186 de Verstappen en secteur 1, 32,229 d'Hadjar en secteur 2, 39,891 de Leclerc en secteur 3, soit 1:37,306) — reste très proche du meilleur tour réellement signé : 0,222s d'écart avec le 1:37,528 de Leclerc, contre 0,171s la veille en EL1. Deux séances, deux marges de progression théoriques sous le quart de seconde : ce retour aux affaires de Sepang, neuf ans après sa dernière apparition au calendrier, ne ressemble décidément pas à l'adaptation poussive qu'un tel délai pouvait laisser craindre.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-el2-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Classement complet EL2</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:37,528</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:37,627</td><td>+0,099s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:37,665</td><td>+0,137s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:37,785</td><td>+0,257s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:37,833</td><td>+0,305s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:37,899</td><td>+0,371s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:38,020</td><td>+0,492s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:38,060</td><td>+0,532s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:38,496</td><td>+0,968s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:38,588</td><td>+1,060s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:38,678</td><td>+1,150s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:39,051</td><td>+1,523s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:39,109</td><td>+1,581s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:39,361</td><td>+1,833s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:39,478</td><td>+1,950s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:39,706</td><td>+2,178s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:39,930</td><td>+2,402s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:40,150</td><td>+2,622s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:40,186</td><td>+2,658s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:40,221</td><td>+2,693s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:40,938</td><td>+3,410s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:43,391</td><td>+5,863s (le plus lent sur les trois secteurs du tour)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el2-6">
  <details class="sources">
    <summary>Sources utilisées — EL2 Sepang (0 lien externe)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
