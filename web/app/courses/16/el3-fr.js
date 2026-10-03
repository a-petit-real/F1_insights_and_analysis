// Analyse EL3 — Grand Prix de Bahreïn (couru en Malaisie), round 16, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py (session_key
// 11729, 2026-10-03 04:30->05:30 UTC, soit 12:30->13:30 heure locale de Kuala
// Lumpur — horaire qui concorde avec le timetable officiel Formula1.com déjà
// vérifié pour l'EL1/EL2 de ce round). Classement et écarts recoupés et confirmés
// à la milliseconde près par deux sources indépendantes (planetf1.com, résultats
// complets FP3 ; speedweek.com, compte-rendu + classement partiel) — toutes deux
// concordantes avec la base. Le drapeau rouge (débris détaché de la Haas de
// Bearman), le relâchement volontaire de McLaren avant les qualifications, le
// tour chronométré d'Antonelli réalisé sur un train de pneus tendres déjà usé, et
// le "joker" utilisé par Audi pour réparer la voiture de Bortoleto hors couvre-feu
// sont confirmés par ces deux mêmes sources. Analyse par secteur (temps théorique
// optimal vs tour réel) calculée à partir des temps de secteur individuels déjà en
// base, non reprise d'une source externe. Aucune donnée inventée.
export const ROUND16_EL3_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Bahreïn (couru en Malaisie) · Sepang · EL3 — samedi 3 octobre</p>
    <p class="verdict">Antonelli signe la référence de la séance sur un train de pneus tendres déjà usé, Red Bull vient se glisser entre les deux Mercedes — mais la séance restera surtout marquée par un drapeau rouge (débris de la Haas de Bearman) et par un McLaren visiblement en retenue avant les qualifications.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">1:36,302</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,278s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Hadjar</span> <span class="gap">+0,558s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,610s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,714s</span></div>
    </div>
    <p class="subverdict">Troisième référence différente en trois séances (Verstappen en EL1, Leclerc en EL2, Antonelli en EL3) : à l'approche des qualifications, aucune écurie n'a encore pris un avantage net sur la totalité du week-end. La séance, démarrée sur un rythme inhabituellement calme, a été interrompue en son milieu par un drapeau rouge, avant une dernière demi-heure où les temps sont tombés bien plus bas qu'au vendredi (1:37,52 en EL1/EL2, 1:36,30 ici).</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el3-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Mercedes devant, Red Bull s'intercale</h2>
    <p>Antonelli boucle la référence de la séance en 1:36,302 dans les cinq dernières minutes — et le fait sur un train de pneus tendres déjà entamé, un indice encourageant sur le rythme sous-jacent de la W18 dotée cette semaine d'un paquet d'évolutions conséquent. Verstappen et Hadjar s'intercalent entre les deux Mercedes (2<sup>e</sup> à 0,278s et 3<sup>e</sup> à 0,558s), reléguant Russell en 4<sup>e</sup> position (+0,610s) : Red Bull confirme ainsi qu'elle reste dans le coup sans toutefois revenir à portée de la référence. Leclerc (5<sup>e</sup>, +0,714s) et Hamilton (6<sup>e</sup>, +0,739s) referment l'écart pour Ferrari, qui n'a jamais dépassé les huit dixièmes de la tête sur l'ensemble des trois séances du week-end.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el3-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Hadjar, la valeur sûre du week-end</h2>
    <p>Au-delà du résultat brut de cette EL3, c'est la constance d'Isack Hadjar qui ressort sur l'ensemble du week-end : 3<sup>e</sup> en EL1 (+0,783s), 2<sup>e</sup> en EL2 (+0,099s), 3<sup>e</sup> à nouveau ici (+0,558s) — le seul pilote à avoir figuré dans le top 3 des trois séances. Verstappen, lui, n'a connu qu'un passage à vide (4<sup>e</sup> en EL2) avant de revenir en 2<sup>e</sup> position ici, confirmant que Red Bull aborde les qualifications en forme, sans toutefois avoir signé le meilleur temps depuis l'EL1.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el3-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Drapeau rouge et "joker" Audi</h2>
    <p>La séance a démarré sur un rythme inhabituellement calme — seuls Lawson, Pérez, Gasly, Lindblad et Colapinto étaient sortis dans le premier quart d'heure, la plupart des autres équipes patientant en attendant que la piste monte en température. Elle a ensuite été interrompue par un drapeau rouge après qu'un élément s'est détaché de la roue avant droite de la Haas d'Oliver Bearman ; l'objet a rapidement été récupéré et la séance a repris après une brève coupure, sans conséquence sur le programme des équipes. Autre fait notable en coulisses : Audi a enfreint le couvre-feu nocturne pour réparer la voiture de Gabriel Bortoleto, contrainte à l'arrêt en fin d'EL2 — utilisant ainsi l'un des quatre "jokers" autorisés sur la saison pour ce type de dérogation.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el3-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> McLaren en retenue, Sepang toujours aussi propre</h2>
    <p>Norris (7<sup>e</sup>, +0,859s) et Piastri (8<sup>e</sup>, +1,064s) referment la séance à plus d'une seconde de la référence, après avoir pourtant signé le meilleur temps provisoire en milieu de séance (Norris en 1:37,161, sur pneus médiums) avant la bascule générale vers les tendres neufs en fin d'heure. L'écart final paraît trop large pour refléter le rythme réel de la MCL40 sur ce circuit, où l'écurie a été compétitive aux deux séances de vendredi (3<sup>e</sup> et 6<sup>e</sup> en EL2) — un signe probable de réglages non définitifs plutôt que d'un recul de performance. Par ailleurs, l'analyse par secteur (minimum de chaque secteur toutes voitures confondues : S1 Verstappen 24,911, S2 Antonelli 31,661, S3 Norris 39,567, soit un tour théorique optimal de 1:36,139) ne laisse que 0,163s d'écart avec le meilleur tour réel — l'écart le plus resserré des trois séances du week-end (0,171s en EL1, 0,222s en EL2), confirmant une nouvelle fois que Sepang continue de livrer un revêtement étonnamment homogène pour un retour au calendrier après neuf ans d'absence.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-el3-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Classement complet EL3</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:36,302</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:36,580</td><td>+0,278s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:36,860</td><td>+0,558s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:36,912</td><td>+0,610s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:37,016</td><td>+0,714s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:37,041</td><td>+0,739s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:37,161</td><td>+0,859s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:37,366</td><td>+1,064s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:37,920</td><td>+1,618s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:38,084</td><td>+1,782s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:38,204</td><td>+1,902s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:38,223</td><td>+1,921s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:38,241</td><td>+1,939s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:38,252</td><td>+1,950s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:38,266</td><td>+1,964s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:38,356</td><td>+2,054s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:38,692</td><td>+2,390s (drapeau rouge après un débris détaché de sa roue avant droite)</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:38,716</td><td>+2,414s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:38,811</td><td>+2,509s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:39,049</td><td>+2,747s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:39,931</td><td>+3,629s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:40,223</td><td>+3,921s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el3-6">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en qualifications</h2>
    <p>Trois séances, trois pilotes différents en tête (Verstappen, puis Leclerc, puis Antonelli) : aucune écurie n'a encore pris le dessus sur l'ensemble du week-end, mais un nom revient dans le haut du classement à chaque fois — Isack Hadjar, seul pilote classé dans le top 3 des trois séances (3<sup>e</sup>, 2<sup>e</sup>, 3<sup>e</sup>), fait figure de valeur la plus sûre pour la bataille en tête. Mercedes aborde les qualifications en confiance après avoir signé la référence de l'EL3 sur un train de pneus déjà usé — un indicateur généralement de bon augure pour le rythme sur pneus neufs en Q3 — tandis que Red Bull, qui n'a jamais quitté le top 4 du week-end, reste l'écurie la plus régulière. La vraie inconnue reste McLaren : clairement en retenue dans cette dernière demi-heure (plus d'une seconde du meilleur temps, après avoir brièvement occupé la tête de la séance sur pneus médiums), l'écurie papaye a instillé le doute sur son rythme réel après un vendredi pourtant solide.</p>
    <p>Le pneu tendre, déjà identifié comme fragile sur ce tracé abrasif à grande vitesse, pourrait aussi peser sur la stratégie des qualifications elles-mêmes : plusieurs équipes ont attendu la toute fin de la séance pour chausser un train neuf, signe que la fenêtre de performance du tendre reste courte sur ce revêtement.</p>
    <div class="callout">Rappel de méthode : l'EL3 se rapproche des conditions de qualification, mais un drapeau rouge en milieu de séance et un relâchement visible de plusieurs écuries en fin d'heure limitent la portée des écarts observés ici — à confirmer sur un tour lancé sans trafic ni interruption.</div>
  </div>
</section>

<section class="block" id="sec-el3-7">
  <details class="sources">
    <summary>Sources utilisées — EL3 Sepang (2 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Contexte narratif</h5>
      <ul>
        <li><a href="https://www.planetf1.com/news/f1-results-bahrain-gp-malaysia-2026-practice-3-sepang" data-desc="Classement complet FP3, débris de la Haas de Bearman, pneu tendre fragile, McLaren en retenue.">PlanetF1 — Bahrain GP in Malaysia 2026, Practice 3 F1 results (Sepang)</a><span class="desc">Mat Coch, 3 octobre 2026</span></li>
        <li><a href="https://www.speedweek.com/en/a/formula-1/3rd-practice-session-sepang-red-flag-antonelli-ahead-of-verstappen" data-desc="Compte-rendu de séance, démarrage calme, drapeau rouge, pneu tendre usé d'Antonelli, joker Audi pour Bortoleto.">Speedweek.com — 3rd practice session, Sepang: Red flag! Kimi Antonelli ahead of Max Verstappen</a><span class="desc">3 octobre 2026</span></li>
      </ul>
    </div>
  </details>
</section>
`;
