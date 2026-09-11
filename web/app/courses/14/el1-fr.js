// Analyse EL1 — GP d'Espagne (Madring, Madrid), round 14, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py (session_key
// 11362, 2026-09-11 11:30->12:30 UTC). Le temps de Russell (1:34,077) et les écarts
// du top 5 concordent exactement avec le rapport officiel Formula1.com (fetché en
// primaire via fetch-url.yml), qui donne Antonelli +0,286s, Leclerc +0,459s,
// Hamilton +0,543s, Verstappen +0,626s — mêmes valeurs qu'en base à la milliseconde
// près. Contexte narratif (incidents Perez/Tsunoda, citation d'Ocon, dépassements
// de limites de piste) sourcé depuis ce même article. La comparaison à la
// pré-analyse s'appuie sur web/app/courses/14/preanalyse-fr.js (rédigée avant tout
// roulage sur ce circuit inédit). Aucune donnée inventée.
export const ROUND14_EL1_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix d'Espagne · Madring (Madrid) · EL1 — vendredi 11 septembre</p>
    <p class="verdict">Russell signe le meilleur temps de la toute première séance de F1 sur ce circuit — Mercedes devant, exactement comme l'annonçait la pré-analyse, mais Ferrari colle de bien plus près qu'espéré.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">1:34,077</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,286s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,459s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,543s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,626s</span></div>
    </div>
    <p class="subverdict">Une heure d'essais sans le moindre repère chronométrique antérieur — la première fois qu'une monoplace de F1 boucle un tour de course sur ce tracé, hors journée de tournage encadrée de Ferrari. Mercedes prend la tête comme annoncé (Russell, puis Antonelli), Ferrari referme l'écart bien plus vite que la pré-analyse ne le laissait attendre, et McLaren — déjà en délicatesse à Monza — n'apparaît qu'en 6<sup>e</sup> et 8<sup>e</sup> positions. Prudence de rigueur : programmes d'essais mélangés, charges d'essence inconnues, une seule heure de roulage sur un circuit que personne ne connaît.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el1-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> La pré-analyse tenait sa prémisse centrale</h2>
    <p>Rédigée sans le moindre point de donnée réel sur ce circuit, la pré-analyse plaçait Mercedes (Antonelli/Russell) en "favori logique", Ferrari en 2<sup>e</sup> groupe, McLaren en 3<sup>e</sup>, Verstappen en outsider et Alpine (Gasly) en joker. La première heure d'essais confirme la structure générale, avec des nuances :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pronostic (pré-analyse)</th><th>Résultat EL1</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td class="driver">Mercedes — favori logique</td><td>P1-P2 (Russell, Antonelli)</td><td>Confirmé, dans l'ordre inverse (Russell devant Antonelli)</td></tr>
        <tr><td class="driver">Ferrari — 2<sup>e</sup> groupe</td><td>P3-P4, à 0,459s/0,543s</td><td>Confirmé, mais bien plus proche que prévu</td></tr>
        <tr><td class="driver">McLaren — 3<sup>e</sup> groupe</td><td>P6 (Norris, +0,870s), P8 (Piastri, +1,071s)</td><td>Confirmé au rang, mais l'écart réel inquiète</td></tr>
        <tr><td class="driver">Verstappen — outsider</td><td>P5 (+0,626s)</td><td>Conforme au pronostic</td></tr>
        <tr><td class="driver">Alpine (Gasly) — joker</td><td>P12 (+1,680s)</td><td>Le pari ne paie pas, au moins sur cette séance</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
  <div class="prose">
    <p>Le point que la pré-analyse ne pouvait pas anticiper — elle le disait elle-même explicitement — c'est l'ampleur des écarts. Sur un circuit totalement inédit, la hiérarchie de groupe se confirme ; les marges à l'intérieur de cette hiérarchie, elles, restent une pure inconnue jusqu'au premier tour chronométré.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el1-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Russell devant, au terme d'une séance mouvementée</h2>
    <p>À 13h30 heure locale, une vague de monoplaces s'est élancée pour la toute première fois sur les 22 virages du Madring, chaque équipe cherchant avant tout à engranger de l'information plutôt qu'à viser un chrono. Premiers accrocs : Sergio Pérez a dû changer de volant après un problème en tout début de séance, tandis que les deux Alpine de Pierre Gasly et Franco Colapinto sont restées au garage durant le premier quart d'heure. Esteban Ocon, l'un des premiers en piste, décrivait "un grip élevé" — le trafic, lui, restait omniprésent sur un tracé où personne n'a de repère.</p>
    <p>Hamilton a un temps occupé la tête (1:34,620) avant que Russell ne prenne le dessus en fin de séance sur pneu tendre, avec un premier chrono à 1:34,145 amélioré à 1:34,077 dans les dernières minutes — la référence qui tiendra jusqu'au drapeau à damier. Antonelli, également passé au tendre, se hisse à moins de trois dixièmes derrière juste avant la fin. Leclerc, en délicatesse pour améliorer sur sa propre monte tendre, est même sorti dans le dégagement du virage 17 sans y laisser de temps. <a href="https://www.formula1.com/en/latest/article/fp1-russell-leads-antonelli-and-leclerc-as-cars-hit-madring-for-first-time.1CiLnqKjDFMohqIlyx5uAm" data-desc="Rapport officiel EL1 : déroulé complet, citations, classement.">Formula1.com — rapport EL1</a></p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el1-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> McLaren : le doute de Monza ne se dissipe pas</h2>
    <p>La pré-analyse notait un McLaren "sans étincelle récente" sortant de Monza, sans savoir si les sections lentes du Madring corrigeraient ou aggraveraient ce profil. Premier indice, pas franchement rassurant : Norris 6<sup>e</sup> à 0,870s, Piastri 8<sup>e</sup> à 1,071s — une McLaren hors du calcul pour la référence, sur une équipe qui reste pourtant sur deux victoires consécutives entrant dans le week-end. Verstappen, en délicatesse sur la gestion de ses pneus médiums en fin de séance (léger grainage rapporté), referme malgré tout l'écart à 0,626s.</p>
    <p>Deux autres incidents ont marqué la séance côté fiabilité/pilotage : Yuki Tsunoda a vu sa Racing Bulls rentrer au garage avec 20 minutes à courir, victime d'une panne de direction assistée qui a mis fin prématurément à sa séance (18<sup>e</sup>, +2,862s) ; Antonelli, de son côté, est sorti large au virage 13 sans conséquence sur son chrono final.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el1-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Un circuit qui punit déjà les limites de piste</h2>
    <p>Sans surprise pour un tracé inédit, plusieurs pilotes ont vu des tours supprimés pour dépassement des limites de piste au fil de la séance — notamment aux virages 5 et 17, où plusieurs monoplaces ont coupé ou dépassé la trajectoire autorisée. Les deux Audi de Gabriel Bortoleto et Nico Hülkenberg ont coupé la chicane du virage 5 ; Leclerc, on l'a vu, a fini large au 17. Rien d'anormal pour une première séance sur un tracé que personne ne connaît, mais un signal que les limites précises de la piste — en particulier autour des zones resserrées héritées du site d'exposition IFEMA — restent à apprivoiser avant les qualifications.</p>
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
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:34,077</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:34,363</td><td>+0,286s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:34,536</td><td>+0,459s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:34,620</td><td>+0,543s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:34,703</td><td>+0,626s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:34,947</td><td>+0,870s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:35,033</td><td>+0,956s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:35,148</td><td>+1,071s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:35,529</td><td>+1,452s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Lawson</td><td>Red Bull Racing</td><td>1:35,539</td><td>+1,462s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:35,652</td><td>+1,575s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:35,757</td><td>+1,680s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:35,834</td><td>+1,757s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:35,933</td><td>+1,856s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:36,473</td><td>+2,396s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:36,757</td><td>+2,680s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:36,870</td><td>+2,793s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Tsunoda</td><td>Racing Bulls</td><td>1:36,939</td><td>+2,862s (panne direction assistée, arrêt anticipé)</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:37,254</td><td>+3,177s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:37,591</td><td>+3,514s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:38,150</td><td>+4,073s (volant changé en début de séance)</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:38,818</td><td>+4,741s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el1-6">
  <details class="sources">
    <summary>Sources utilisées — EL1 Madring (2 liens)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Recoupement et contexte narratif</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/fp1-russell-leads-antonelli-and-leclerc-as-cars-hit-madring-for-first-time.1CiLnqKjDFMohqIlyx5uAm" data-desc="Déroulé de séance, citation d'Ocon, incidents Perez/Tsunoda, classement complet — concorde exactement avec la base à la milliseconde près.">Formula1.com — rapport EL1</a><span class="desc">Formula1.com</span></li>
      </ul>
    </div>
  </details>
</section>
`;
