// Analyse Qualifications — GP d'Espagne (Madring, Madrid), round 14, saison 2026.
//
// Sourcing : donnée primaire pour le classement chiffré = pipeline OpenF1
// (scripts/ingest_openf1_practice.py --session "Qualifying", session_key=11365),
// classement par meilleur tour sur l'ensemble de l'heure de qualifications — qui
// recolle exactement, au millième, avec les temps du Top 5 publiés par
// Formula1.com (Norris 1:31,824, Antonelli 1:31,835, Verstappen 1:31,964,
// Hamilton 1:32,013, Leclerc 1:32,019). Particularité de ce week-end : à la
// différence de Monza (round 13), ce classement brut par meilleur temps
// reproduit ici exactement les trois groupes Q1/Q2/Q3 tels que confirmés par
// le rapport officiel (Top 10 = qualifiés en Q3, positions 11-16 = éliminés en
// Q2, positions 17-21 = éliminés en Q1) — Bearman en est absent car sa Haas,
// accidentée en EL3, n'a pas pu être réparée à temps et n'a donc roulé aucun
// tour. Déroulé Q1/Q2/Q3, citations et grille définitive après pénalité
// sourcés depuis deux rapports Formula1.com fetchés en primaire via
// fetch-url.yml (rapport de qualifications + article dédié à la pénalité de
// Sainz). Aucune donnée inventée.
//
// Marqueur <!--GHOST_LAP_REPLAY--> après la section Q3 : RaceTabs.jsx coupe
// le HTML à cet endroit pour intercaler un composant React vivant
// (GhostLapReplay) plutôt que du HTML statique — un réplay animé Norris vs
// Antonelli vs Verstappen sur leur tour de pole, télémétrie réelle OpenF1.
// Voir GhostLapReplay.jsx pour le détail (interpolation position/écart) et
// db/schema_fastf1.sql (table practice_telemetry) pour pourquoi ce n'est
// pas la même table que le "Vitesse par tour" du Raw data.
export const ROUND14_QUALI_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix d'Espagne · Madring (Madrid) · Qualifications — samedi 12 septembre</p>
    <p class="verdict">Lando Norris arrache la pole sur son ultime tentative de Q3, devant un Antonelli battu à onze millièmes — la première pole position de l'histoire du Madring, décrochée après un week-end où le Britannique n'avait jamais semblé le plus rapide.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">Pole</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">1:31,824</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,011s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,140s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,189s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,195s</span></div>
    </div>
    <p class="subverdict">Après trois séances d'essais marquées par autant de drapeaux rouges (Lindblad en EL2, puis Hamilton et Bearman en EL3), l'heure de qualifications tient toutes ses promesses : cinq écuries différentes dans le Top 6, onze millièmes seulement entre la pole et la P2, et un peloton encore loin d'avoir percé tous les secrets d'un circuit inédit. Sainz et Alonso, les deux pilotes espagnols de ce Grand Prix disputé à domicile, sont éliminés dès la Q1 sous les yeux de leur public.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-q-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Q1 — Mercedes brille, les deux Espagnols éliminés à domicile</h2>
    <p>Avec seulement 18 minutes au chronomètre et le risque d'un nouveau drapeau rouge toujours présent après les incidents des essais, la majorité du plateau part chercher son tour de référence dès l'ouverture de la voie des stands — les deux Cadillac en tête d'une longue file. Bearman, lui, n'y participera pas du tout : Haas confirme que les dégâts subis par sa VF-26 plus tôt dans la journée sont trop importants pour être réparés avant les qualifications.</p>
    <p>Antonelli signe le premier temps de référence (1:33,566 en tendre) devant Verstappen, parti en médium (+0,178s). Bortoleto confirme la bonne forme d'Audi en EL avec une P3 provisoire, avant que Norris puis surtout Lawson ne prennent la tête du chronométrage. Russell connaît un moment de flottement, effleurant le muret dans une réplique presque exacte de l'incident qui avait endommagé la suspension d'Albon en EL3 — sans conséquence, son tour suffit pour une P7 provisoire. Sainz est également noté pour avoir gêné Bottas, un incident renvoyé à l'examen des commissaires pour plus tard dans la journée. Insatisfait de son premier tour, Russell repart et signe finalement le meilleur temps de la phase (1:33,211), devant Antonelli et les deux Red Bull.</p>
    <p>Éliminés en Q1 : <strong>Sainz, Alonso, Pérez, Bottas, Bearman, Stroll</strong> — une élimination synonyme de déception pour le public local, Sainz et Alonso disputant tous deux leur Grand Prix à domicile. Stroll ne boucle qu'un seul tour très lent avant qu'Aston Martin ne le rappelle aux stands pour un problème suspecté de pression d'eau.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-q-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Q2 — Verstappen prend l'avantage, les deux Audi recalées</h2>
    <p>Antonelli signe une nouvelle fois le temps de référence en ouverture de Q2 (1:32,603), avant que Verstappen ne démontre que le rythme affiché en Q1 par Red Bull n'était pas un accident de parcours : 0,046s d'avance sur le leader du championnat, Lawson complétant un temps un doublé prometteur en P4. Gasly et Colapinto, les deux Alpine, attendent les quatre dernières minutes pour s'élancer — Colapinto manquant de peu un tête-à-queue à La Monumental qui l'aurait contraint à abandonner sa tentative.</p>
    <p>Sur les derniers tours, Colapinto s'empare provisoirement de la P7 pendant que les deux Audi, Ocon, un Gasly "triste" et plaintif sur le manque d'adhérence de son Alpine, Tsunoda et Albon basculent tour à tour dans la zone d'élimination. Lindblad et Piastri se qualifient de justesse pour la Q3 avec un temps strictement identique, pendant que Verstappen conserve la référence de la phase.</p>
    <p>Éliminés en Q2 : <strong>Hülkenberg, Bortoleto, Ocon, Gasly, Tsunoda, Albon</strong>.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-q-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Q3 — le tour phénoménal de Norris</h2>
    <p>Sur les premiers relais, Antonelli tient la tête jusqu'à ce que Hamilton, revanchard après son accident d'EL3, franchisse la ligne en 1:32,079 pour s'emparer de la pole provisoire devant les deux Mercedes. Après un premier passage propre pour l'ensemble du Top 10, Leclerc mène alors Verstappen, les deux McLaren de Norris et Piastri, Lawson, Colapinto et Lindblad — reste à savoir si quelqu'un ira chercher plus loin sur le relais final.</p>
    <p>Antonelli, toujours le premier à boucler son tour, reprend la tête ; Hamilton, lui, ne progresse pas sur sa seconde tentative. Peu avaient anticipé ce qui allait suivre : un tour d'exception de Norris, qui devance l'Italien de seulement 0,011s pour décrocher sa troisième pole de la saison — la première de l'histoire du Madring. Verstappen trouve lui aussi un peu de temps sur la fin pour sécuriser la P3, devant Hamilton et Leclerc. Russell, encore battu par ses adversaires directs au championnat, referme le Top 6 devant Piastri, Lawson, puis Colapinto et Lindblad, "meilleurs des autres" en clôture du Top 10.</p>
    <blockquote class="pull-quote">« Je suis sous le choc, un peu surpris d'être ici maintenant, mais bon sang, c'était probablement l'un des meilleurs tours de toute ma carrière. Très, très content, très fier, très content pour l'équipe. C'est un de ces tours où tout s'est mis en place. Je savais ce que je voulais faire, restait à savoir si mon cerveau allait me laisser le faire sur le dernier tour, et pratiquement tout a fonctionné à la perfection. Je suis juste très content — un de ces tours où tu regardes le chrono à la fin et tu te dis : "Ah, ça, c'était plutôt pas mal." » <cite>— Lando Norris</cite></blockquote>
  </div>
</section>

<!--GHOST_LAP_REPLAY-->

<section class="block" data-num="04" id="sec-q-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Pénalités et grille de départ</h2>
    <p>Les commissaires examinent plusieurs incidents en marge de la séance — dont ceux impliquant Antonelli, Russell, Leclerc et Bortoleto — mais seul Sainz est finalement sanctionné : trois places de recul sur la grille pour avoir gêné Bottas dans le tour 7 en fin de Q1, Williams n'ayant pas prévenu son pilote de l'arrivée de la Cadillac lancée. Sainz s'élancera donc 20<sup>e</sup> dimanche au lieu de sa 17<sup>e</sup> place sur la feuille de temps brute, ce qui promeut Alonso, Pérez et Bottas d'un rang chacun sur la grille définitive.</p>
    <p>Bearman ne prend pas le départ des qualifications (VF-26 irréparable après son accident d'EL3) et ne figure donc pas au classement ci-dessous.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-q-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Classement complet par meilleur tour (séance entière)</h2>
    <p>Classement par meilleur temps chronométré sur l'ensemble de l'heure de qualifications — il recolle exactement aux temps du Top 5 publiés par Formula1.com, et reproduit ici, fait rare, l'ordre exact des trois phases Q1/Q2/Q3 (voir note de méthode en tête d'article). La colonne « Écart » signale la grille de départ définitive quand elle diffère du classement brut.</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:31,824</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:31,835</td><td>+0,011s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:31,964</td><td>+0,140s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:32,013</td><td>+0,189s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:32,019</td><td>+0,195s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:32,149</td><td>+0,325s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:32,294</td><td>+0,470s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Lawson</td><td>Red Bull Racing</td><td>1:32,316</td><td>+0,492s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:32,903</td><td>+1,079s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:33,041</td><td>+1,217s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:33,223</td><td>+1,399s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:33,388</td><td>+1,564s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:33,667</td><td>+1,843s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:33,753</td><td>+1,929s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Tsunoda</td><td>Racing Bulls</td><td>1:34,084</td><td>+2,260s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:35,307</td><td>+3,483s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:35,312</td><td>+3,488s (20<sup>e</sup> sur la grille, −3 places pour avoir gêné Bottas)</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:35,388</td><td>+3,564s (17<sup>e</sup> sur la grille)</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:35,913</td><td>+4,089s (18<sup>e</sup> sur la grille)</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:38,011</td><td>+6,187s (19<sup>e</sup> sur la grille)</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:43,709</td><td>+11,885s (un seul tour, problème de pression d'eau)</td></tr>
        <tr><td>—</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>—</td><td>Non classé (VF-26 irréparable après l'accident d'EL3)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-q-6">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en course</h2>
    <p>Norris tiendra-t-il sa pole au premier freinage, sur un tracé où trois séances d'essais ont déjà produit autant d'accrochages ? La marge de onze millièmes sur Antonelli, et les moins de deux dixièmes qui séparent les cinq premiers, promettent un départ disputé plutôt qu'une fuite en tête tranquille — d'autant que Verstappen, Hamilton et Leclerc partent tous à portée d'aspiration immédiate. Piastri, une nouvelle fois décroché de son coéquipier en qualifications (P7, +0,470s), devra une fois de plus compter sur la course pour limiter la casse au championnat. Et Sainz, relégué 20<sup>e</sup> devant son public après sa pénalité, mesure l'ampleur de la remontée qu'il lui reste à faire sur un circuit où les dépassements restent encore une inconnue pour tout le plateau.</p>
    <div class="callout">Rappel de méthode : à la différence du round 13 (Monza), le classement par meilleur tour de cette page reproduit ici l'intégralité des trois phases Q1/Q2/Q3 confirmées par Formula1.com — Top 10 qualifié en Q3, positions 11 à 16 éliminées en Q2, positions 17 à 21 éliminées en Q1. Seule la pénalité de Sainz modifie l'ordre de la grille par rapport à ce classement brut.</div>
  </div>
</section>

<section class="block" id="sec-q-7">
  <details class="sources">
    <summary>Sources utilisées — Qualifications Madring (2 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py --session "Qualifying"), classement/secteurs/relais/météo, primaire.</span></li>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_telemetry.py --session "Qualifying"), position/vitesse par tour du replay Norris/Antonelli/Verstappen ci-dessus, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Déroulé Q1/Q2/Q3, citations et pénalité</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/norris-denies-antonelli-pole-position-for-spanish-gp-in-closely-fought-qualifying-in-madrid.5AqJXaE8s1sLfv8dJVLqty" data-desc="Rapport officiel des qualifications, fetché en primaire — déroulé complet par phase, classement, citation de Norris.">Formula1.com — rapport qualifications</a><span class="desc">Formula1.com — primaire</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/sainz-handed-grid-penalty-for-spanish-gp-after-qualifying-infringement.4yL2CwTMI2kOZGXlPZsTtr" data-desc="Détail de la pénalité de Sainz et de la grille de départ définitive.">Formula1.com — pénalité de Sainz</a><span class="desc">Formula1.com — primaire</span></li>
      </ul>
    </div>
  </details>
</section>
`;
