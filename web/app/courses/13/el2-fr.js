// Analyse EL2 — GP d'Italie (Monza), round 13, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py),
// classement par meilleur tour et secteurs vérifiés directement depuis la
// base — le temps de Russell (1:22,559) est triple-vérifié : (1) champ
// agrégé de practice_briefing.py, (2) somme des trois meilleurs secteurs en
// base (27,044 + 27,794 + 27,721 = 82,559 très exactement, donc les trois
// meilleurs secteurs de Russell appartiennent bien au même tour), (3) écart
// de Leclerc (+0,120s) et Antonelli (+0,141s) cohérent avec les temps bruts.
// Relais pneus et météo lus directement en base. Aucune donnée inventée.
export const ROUND13_EL2_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix d'Italie · Monza · EL2 — vendredi 4 septembre</p>
    <p class="verdict">Russell reprend la tête à Ferrari sous une chaleur qui ne faiblit pas — la théorie de la pré-analyse retrouve ses couleurs.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">1:22,559</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,120s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,141s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+0,384s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,457s</span></div>
    </div>
    <p class="subverdict">L'EL1 avait donné un 1-2 Ferrari sans appel. L'EL2 referme largement l'écart : Russell signe le meilleur temps de la journée, avec les deux Mercedes dans le top 3 — exactement la configuration que la pré-analyse plaçait en tête de son scénario central, avant que la première séance ne semble la contredire. Deux points de données, deux hiérarchies différentes : la prudence reste de mise avant l'EL3 et les qualifications.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el2-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Mercedes efface l'écart de l'EL1</h2>
    <p>Le classement s'inverse presque terme à terme par rapport à l'EL1 : Leclerc, qui menait avec 0,304s d'avance sur Russell le matin, se retrouve à 0,120s derrière lui l'après-midi. Antonelli, cinquième en EL1, remonte troisième. Le tour de référence de Russell (1:22,559) est décomposé en 27,044 / 27,794 / 27,721 aux trois secteurs — une somme qui recolle exactement au temps total en base, preuve que ses trois meilleurs secteurs appartiennent bien au même tour, pas à une reconstitution théorique.</p>
    <p>Norris progresse nettement par rapport à l'EL1 (+0,711s le matin, +0,384s l'après-midi) mais reste hors du podium virtuel, cohérent avec le déficit en virages lents que McLaren reconnaissait elle-même avant le week-end. Piastri, onzième en EL1, referme l'écart à 0,469s (P6) sans pour autant rejoindre son coéquipier.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el2-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Verstappen de retour, discret au classement</h2>
    <p>Privé d'EL1 par la séance rookie obligatoire (remplacé par Ayumu Iwasa), Verstappen retrouve son baquet pour l'EL2 et referme la séance neuvième, à 0,818s de Russell — loin de la référence, mais sur une séance où le pilote a enchaîné deux longs relais medium (11 puis 7 tours) plutôt que de chercher un tour rapide isolé. Rien dans ce classement ne permet de trancher si le déficit est réel ou seulement un choix de programme : une heure de retard sur ses adversaires en termes de tours roulés au général du week-end reste un désavantage en soi avant les qualifications.</p>
    <p>Lindblad confirme la bonne forme entrevue en EL1 (P7 en EL1, P7 également en EL2, à 0,790s), pendant que Bearman signe une belle EL2 (P8, à 0,811s) avec la Haas — deux pilotes qui n'étaient pas annoncés parmi les habitués du haut de tableau avant le week-end.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el2-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Une chaleur qui confirme le Heat Hazard annoncé</h2>
    <p>La météo relevée pendant l'EL2 confirme intégralement le scénario de la pré-analyse : température de l'air comprise entre 33,3 et 34,4°C sur l'heure, piste jusqu'à 57,5°C en début de séance avant de refroidir progressivement vers 52°C en fin d'heure — cohérent avec le « Heat Hazard » déclaré par la FIA pour ce week-end (indice de chaleur prévu au-dessus du seuil de déclenchement de 31°C). Aucune goutte de pluie relevée sur l'ensemble de la séance.</p>
    <p>Les stratégies de relais observées en base vont dans le sens d'un travail de fond plutôt que d'une chasse au chrono permanente : plusieurs pilotes (Norris, Antonelli, Verstappen) ont alterné de longs relais medium ou hard avec une ou deux incursions courtes en tendre, plutôt que de multiplier les tours de qualification simulée — une gestion cohérente avec une piste chaude où la fenêtre de performance du pneu tendre se referme vite.</p>
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
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:22,559</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:22,679</td><td>+0,120s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:22,700</td><td>+0,141s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:22,943</td><td>+0,384s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:23,016</td><td>+0,457s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:23,028</td><td>+0,469s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:23,349</td><td>+0,790s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:23,370</td><td>+0,811s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:23,377</td><td>+0,818s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Tsunoda</td><td>Racing Bulls</td><td>1:23,455</td><td>+0,896s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:23,619</td><td>+1,060s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Lawson</td><td>Red Bull Racing</td><td>1:23,660</td><td>+1,101s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:23,732</td><td>+1,173s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:23,773</td><td>+1,214s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:23,776</td><td>+1,217s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:23,853</td><td>+1,294s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:23,900</td><td>+1,341s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:24,407</td><td>+1,848s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:25,027</td><td>+2,468s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:25,082</td><td>+2,523s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:25,149</td><td>+2,590s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:25,253</td><td>+2,694s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el2-5">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en EL3</h2>
    <p>Deux séances, deux hiérarchies : Ferrari devant le matin, Mercedes devant l'après-midi. L'EL3 de samedi matin, dans des conditions plus proches de celles des qualifications, sera le vrai point de bascule avant de trancher. À suivre également : Verstappen confirme-t-il un rythme plus proche de la référence sur une séance sans contrainte de programme rookie, et McLaren comble-t-elle l'écart qui subsiste en fin de journée ?</p>
    <div class="callout">Rappel de méthode : comme pour l'EL1, un classement EL2 mélange encore des programmes d'essais différents. Les deux séances de vendredi se contredisent déjà sur la hiérarchie du week-end — un signal en soi, qui invite à attendre l'EL3 et les qualifications plutôt qu'à trancher sur une seule séance.</div>
  </div>
</section>

<section class="block" id="sec-el2-6">
  <details class="sources">
    <summary>Sources utilisées — EL2 Monza (1 lien)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
