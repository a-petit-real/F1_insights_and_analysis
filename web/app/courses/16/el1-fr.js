// Analyse EL1 — Grand Prix de Bahreïn (couru en Malaisie), round 16, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py (session_key
// 11727, 2026-10-02 04:30->05:30 UTC, soit 12:30->13:30 heure locale de Kuala
// Lumpur — horaire qui concorde exactement avec le timetable officiel Formula1.com,
// fetché en primaire via fetch-url.yml). Contexte de la relocalisation (GP de
// Bahreïn initialement prévu à Sakhir en avril, reporté puis déplacé à Sepang pour
// cause de conflit au Moyen-Orient, premier passage de la F1 à Sepang depuis 2017)
// confirmé par ce même timetable et recoupé par la presse francophone (dhnet.be,
// lesvoitures.fr). Pénalité de grille de Colapinto (5 places, collision avec Gasly
// et Norris au redémarrage de Bakou) sourcée depuis l'article dédié Formula1.com
// (fetché en primaire via fetch-url.yml), avec citations exactes de Colapinto,
// Gasly et Norris. Le compte-rendu "live" officiel de l'EL1 elle-même
// (formula1.com, live-coverage-first-practice-in-bahrain-2026) est rendu en
// JavaScript côté client et n'a pas pu être récupéré en texte par fetch_url.py :
// aucun incident ni citation spécifique à la séance n'est donc avancé au-delà de ce
// que montrent les données de course elles-mêmes (classement, secteurs, relais,
// météo). Analyse par secteur (temps théorique optimal vs tour réel) calculée à
// partir des temps de secteur individuels déjà en base, non reprise d'une source
// externe. Aucune pré-analyse n'existe pour ce round. Aucune donnée inventée.
export const ROUND16_EL1_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Bahreïn (couru en Malaisie) · Sepang · EL1 — vendredi 2 octobre</p>
    <p class="verdict">Verstappen signe le meilleur temps d'un retour de la F1 à Sepang qui n'avait plus eu lieu depuis 2017 — Red Bull verrouille les positions 1 et 3 avec Hadjar, mais sur une piste à la grippe bien meilleure que prévu : la plupart des références du jour sont déjà des tours quasi parfaits.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">1:37,520</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,383s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Hadjar</span> <span class="gap">+0,783s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,847s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+1,060s</span></div>
    </div>
    <p class="subverdict">Feu vert à 12h30 heure locale (4h30 UTC) sous une chaleur étouffante — 32°C dans l'air, une piste qui grimpe de 51°C à 58°C sur l'heure de roulage, sans la moindre goutte de pluie au compteur. Premier retour du plateau sur ce tracé depuis 2017, pour un Grand Prix qui ne devrait même pas s'y tenir : annulé à Sakhir en avril pour cause de conflit au Moyen-Orient, le Grand Prix de Bahreïn a été relogé ici, à 6 000 kilomètres de son adresse habituelle, entre l'Azerbaïdjan et Singapour. Verstappen boucle la séance uniquement en pneu tendre, du premier au dernier relais — un choix qui mérite d'être gardé en tête avant de surinterpréter son avance.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el1-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Red Bull devant et 3<sup>e</sup>, mais tout sur pneu tendre</h2>
    <p>Verstappen prend la tête avec un 1:37,520 qui tient jusqu'au drapeau à damier, Hadjar — de retour dans le baquet Red Bull — complétant un rare doublé de l'écurie en 3<sup>e</sup> position à 0,783s. Le détail des relais en base montre toutefois que la Red Bull n°3 n'a jamais chaussé le pneu medium de la séance : trois relais, SOFT du premier au dernier tour. Un choix qui facilite mécaniquement un chrono de référence, puisque la gomme tendre offre plusieurs dixièmes sur un tour lancé — à comparer avec Russell (2<sup>e</sup>, +0,383s), qui a lui alterné medium et tendre sur ses cinq relais, pour un résultat obtenu avec une charge de travail de pneus plus représentative d'un week-end de course.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el1-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Une grippe bien meilleure que redoutée pour un retour après neuf ans</h2>
    <p>Un tracé abandonné par le calendrier F1 depuis 2017 laissait craindre une séance d'adaptation, trajectoires à apprivoiser et grip en hausse progressive au fil des relais — le scénario classique d'un "retour" de circuit. Les données en base racontent une autre histoire : en additionnant le meilleur secteur de chaque pilote toutes voitures confondues (25,132 de Gasly en secteur 1, 32,496 de Russell en secteur 2, 39,721 de Verstappen en secteur 3), le tour théorique parfait tombe à 1:37,349 — seulement 0,171s de mieux que le 1:37,520 réellement signé par Verstappen en tête du classement. Pour cinq des six premiers du classement (Verstappen, Hadjar, Antonelli, Hamilton — et Russell à 0,005s près), le meilleur tour final correspond exactement à la somme de leurs trois meilleurs secteurs personnels : un tour sans le moindre dixième laissé sur la table, dès la première heure d'essais sur un circuit que le plateau ne connaît que par la simulation ou de lointains souvenirs de 2017.</p>
    <p>Curiosité au passage : c'est Gasly, pourtant seulement 7<sup>e</sup> au général (+1,195s), qui détient le meilleur secteur 1 du plateau — une indication qu'Alpine n'est peut-être pas aussi loin du rythme que sa position finale ne le suggère.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el1-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Un Grand Prix qui n'aurait pas dû avoir lieu ici — et une pénalité qui plane sur Colapinto</h2>
    <p>Le Grand Prix de Bahreïn 2026 devait initialement se courir à Sakhir en avril. Le conflit au Moyen-Orient en a empêché la tenue, et un accord entre Bahreïn, la Malaisie, la Formule 1 et la FIA a donné à l'épreuve un nouveau foyer : le circuit international de Sepang, casé entre l'Azerbaïdjan et Singapour — sans que le nom "Grand Prix de Bahreïn" ne change, d'où l'intitulé à double détente de ce week-end. Un détail qui pèsera sur le reste du programme : Franco Colapinto aborde la séance avec une pénalité de 5 places sur la grille, décidée après sa collision du redémarrage à Bakou (round 15), où il avait heurté par l'arrière son coéquipier Gasly au virage 1, provoquant l'abandon des deux Alpine — Gasly ayant lui-même percuté la McLaren de Norris dans la foulée. Les commissaires ont jugé Colapinto "entièrement ou principalement responsable" de l'accident ; l'Argentin, alors en délicatesse sur la grille (+3,011s, 19<sup>e</sup> de cette EL1), s'était excusé publiquement après l'incident : "Juste un peu de déception, pour moi, pour l'équipe. [...] On était tous les deux en position de marquer des points, c'était un grand jour pour l'équipe et j'ai fait une grosse erreur." Norris, de son côté, avait résumé plus sèchement : "Je me suis juste fait sortir... certains pilotes ne devraient pas être en F1, pour être honnête."</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el1-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> McLaren hors du top 10 — à surveiller plus que la seule EL1</h2>
    <p>Les deux McLaren pointent en dehors du top 10 à l'issue de cette première heure : Piastri 11<sup>e</sup> (+1,756s) et Norris 12<sup>e</sup> (+1,773s), sur une séance d'une seule heure où les programmes diffèrent trop d'une équipe à l'autre pour en tirer une conclusion définitive. Rien dans les données de course ne permet d'en identifier la cause — pas de relais écourté, pas d'anomalie de secteur particulière par rapport au reste du plateau — mais le signal mérite d'être suivi en EL2 et EL3 avant les qualifications de samedi.</p>
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
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:37,520</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:37,903</td><td>+0,383s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:38,303</td><td>+0,783s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:38,367</td><td>+0,847s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:38,580</td><td>+1,060s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:38,590</td><td>+1,070s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:38,715</td><td>+1,195s (meilleur secteur 1 du plateau)</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:39,106</td><td>+1,586s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:39,197</td><td>+1,677s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:39,211</td><td>+1,691s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:39,276</td><td>+1,756s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:39,293</td><td>+1,773s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:39,548</td><td>+2,028s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:39,683</td><td>+2,163s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:40,158</td><td>+2,638s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:40,311</td><td>+2,791s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:40,321</td><td>+2,801s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:40,413</td><td>+2,893s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:40,531</td><td>+3,011s (pénalité de 5 places sur la grille ce week-end, incident de Bakou)</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:40,605</td><td>+3,085s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:40,800</td><td>+3,280s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:40,820</td><td>+3,300s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el1-6">
  <details class="sources">
    <summary>Sources utilisées — EL1 Sepang (2 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Recoupement et contexte narratif</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/formula-1-gulf-air-bahrain-grand-prix-in-malaysia-2026.1IHoy7D2dfCIugb5mH78cE" data-desc="Timetable officiel du week-end : horaires EL1-EL2-EL3-qualifs-course, confirmant l'heure exacte de l'EL1 (12h30-13h30 heure locale) et le contexte Sepang/Kuala Lumpur.">Formula1.com — timetable officiel du week-end</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/colapinto-hit-with-five-place-grid-penalty-for-bahrain-gp-in-malaysia-after-baku-collision.3gWVfzDMMr5hReiwTt1fPD" data-desc="Pénalité de grille de Colapinto pour ce week-end, décision complète des commissaires et citations de Colapinto, Gasly et Norris sur l'incident de Bakou.">Formula1.com — pénalité de grille de Colapinto</a><span class="desc">Formula1.com</span></li>
      </ul>
    </div>
  </details>
</section>
`;
