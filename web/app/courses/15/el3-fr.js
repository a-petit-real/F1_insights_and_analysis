// Analyse EL3 — Grand Prix d'Azerbaïdjan (Bakou), round 15, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py (session_key
// 11372, 2026-09-25 08:30->09:30 UTC, soit 12:30->13:30 heure locale de Bakou).
// Le temps de Verstappen (1:43,922) et les écarts du top 5 concordent exactement
// avec le rapport officiel Formula1.com (fetch-url.yml), à la milliseconde près —
// y compris l'ordre complet du classement (Verstappen, Russell, Hamilton, Antonelli,
// Leclerc, Gasly, Piastri, Norris, Hadjar, Colapinto, Sainz, Bearman, Bortoleto,
// Ocon, Hülkenberg, Perez, Albon, Lawson, Lindblad, Alonso, Bottas, Stroll) recoupé
// phrase par phrase avec le récit de cette même source. Citations et incidents
// (Verstappen sur le train arrière au virage 16, Stroll sortant au virage 1)
// repris tels quels depuis Formula1.com. Les réprimandes de Sainz (non-respect
// d'un drapeau jaune) et Lindblad (sortie de piste injustifiée) pendant cette
// séance sont sourcées via une recherche croisée confirmant l'article FIA/PlanetF1
// dédié aux sanctions du week-end. Analyse par secteur (temps théorique optimal
// vs tour réel, y compris celui de Verstappen lui-même) calculée à partir des
// temps de secteur individuels déjà en base, non reprise d'une source externe.
// Aucune donnée inventée.
export const ROUND15_EL3_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix d'Azerbaïdjan · Bakou · EL3 — vendredi 25 septembre</p>
    <p class="verdict">Verstappen prive Russell d'un sweep des trois séances d'essais, mais l'écart est microscopique — onze centièmes seulement séparent la Red Bull de la Mercedes, et Hamilton n'est pas loin derrière. La vraie information de la séance est ailleurs : Ferrari et McLaren, favoris annoncés du week-end, referment nettement plus loin que prévu à l'approche des qualifications.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">1:43,922</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,099s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,111s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,351s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,622s</span></div>
    </div>
    <p class="subverdict">Piste couverte de poussière et de feuilles après plusieurs jours de vent fort, la dernière heure avant les qualifications a vu les organisations hésiter à sortir tôt puis se livrer une bataille au dixième de seconde près — trois passages par les zones de dégagement (Hamilton, Antonelli, Verstappen), un accrochage avec le mur pour Stroll, et deux réprimandes infligées en marge de la séance. Leclerc n'est que 5<sup>e</sup>, Piastri et Norris 7<sup>e</sup> et 8<sup>e</sup> — un classement qui ouvre grand les qualifications plutôt que de les refermer.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el3-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Verstappen prive Russell du sweep, au prix d'un tour patient</h2>
    <p>Comme lors de chaque séance du week-end, les organisations tardent à sortir sur une piste chargée de poussière — il faut attendre la 20<sup>e</sup> minute pour voir les premiers relais chronométrés au pneu tendre, Hamilton (1:46,168) puis Leclerc (1:45,564) prenant provisoirement la tête. Antonelli et Russell s'installent en 3<sup>e</sup> et 4<sup>e</sup> position dès leur premier tour lancé, tous deux partis au pneu medium ; Verstappen grimpe brièvement au sommet grâce à un double aspiration dans le dernier secteur, avant que Hamilton n'abaisse la référence à 1:45,093 aux environs de la mi-séance.</p>
    <p>Le vent continue de perturber tout le plateau — Verstappen le premier, qui alerte son ingénieur : « la voiture est complètement molle au virage 16 ». Les deux Mercedes passent au pneu tendre à un peu plus de 15 minutes du drapeau à damier ; Russell descend à 1:44,177 puis 1:44,021, laissant Antonelli à deux dixièmes. Verstappen s'intercale entre les deux pilotes Mercedes après avoir plusieurs fois frôlé les murs sur son tour, avant de signer un ultime 1:43,922 dans les dernières minutes — suffisant pour terminer devant Russell, Hamilton et Antonelli, qui ne progressent plus.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el3-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Trois sorties de piste évitées, une qui ne l'est pas</h2>
    <p>Hamilton, Antonelli et Verstappen s'aventurent chacun dans une zone de dégagement — respectivement aux virages 1, 4 et 15 — sans conséquence, tous rejoignant la piste normalement. Russell, lui, frôle un tête-à-queue au virage 7 en fonçant tout droit et évite de justesse un choc frontal avec le mur. Lance Stroll n'a pas cette chance : sa séance se termine prématurément après avoir accroché le mur intérieur au virage 1, endommageant une roue de son Aston Martin avant de s'arrêter derrière les barrières — d'où son classement inhabituel (22<sup>e</sup>, seulement 7 tours chronométrés sur 9).</p>
    <p>En marge de la séance, les commissaires infligent deux réprimandes : Carlos Sainz pour ne pas avoir ralenti sous drapeau jaune, et Arvid Lindblad pour être sorti de piste sans raison justifiable — deux sanctions administratives qui n'affectent pas le classement de ce jour, mais s'ajoutent au dossier disciplinaire du week-end. Une clôture, au passage, pour l'enquête ouverte contre Hamilton après son quasi-accrochage avec Lawson en EL2 (cf. article EL2) : les commissaires ont tranché pour un simple avertissement (« reprimand ») pour gêne « sévère », sans pénalité de grille.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el3-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Personne n'a assemblé le tour parfait — pas même Verstappen</h2>
    <p>Le temps théorique optimal de la séance, obtenu en additionnant le meilleur secteur de chaque pilote toutes tentatives confondues, s'établit à 1:43,190 (secteur 1 : Leclerc, 36,483 ; secteur 2 : Verstappen et Russell, à égalité parfaite au millième, 42,053 ; secteur 3 : Gasly, 24,654). Verstappen, pourtant en tête du classement officiel, en reste à 0,732s — et il ne détient lui-même ni le meilleur secteur 1 ni le meilleur secteur 3 de la séance. Même en combinant uniquement ses propres meilleurs secteurs (36,536 + 42,053 + 25,132 = 1:43,721), le Néerlandais aurait pu faire 0,201s de mieux que son propre chrono officiel : sa pole provisoire du jour n'est donc pas son meilleur tour possible, simplement le plus rapide effectivement assemblé.</p>
    <p>Ce type d'écart — un dixième par-ci, deux dixièmes par-là entre le tour réel et le tour théorique — est monnaie courante en essais libres, où chaque pilote explore des réglages et des lignes différentes d'un relais à l'autre. Mais sur un tracé aussi punitif que Bakou, où le moindre attentisme dans un secteur peut coûter la confiance nécessaire pour attaquer le suivant, l'écart mesuré ici (plus de sept dixièmes entre le meilleur temps réel et le temps théorique du plateau) est un indice supplémentaire que personne n'a encore trouvé la configuration idéale avant les qualifications.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el3-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Un vendredi plus discret pour Ferrari et McLaren</h2>
    <p>Leclerc referme le top 5 (+0,622s) — meilleur résultat Ferrari du jour, mais net recul par rapport aux marges plus courtes observées en EL1/EL2 (cf. articles précédents). Gasly signe le 6<sup>e</sup> temps pour Alpine, devant les deux McLaren : Piastri 7<sup>e</sup> (+0,824s) et Norris 8<sup>e</sup> (+0,977s), aucun des deux ne s'approchant du dixième de seconde du sommet. Hadjar complète le top 9 pour Red Bull et Colapinto le top 10 pour Alpine — un ordre qui, pour la première fois du week-end, ne place ni Ferrari ni McLaren en position de favoris évidents pour la pole.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-el3-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Vent fort, températures stables</h2>
    <p>Séance disputée sous un ciel dégagé et un vent soutenu (pointes à 4,5 m/s) qui explique la poussière signalée en piste dès l'ouverture. Air quasi stable autour de 25,0-25,6°C sur toute l'heure ; piste partie de 39,6°C pour grimper progressivement jusqu'à un pic proche de 46,7°C en fin de séance — un profil de chauffe continu, sans aucune trace de pluie, cohérent avec les deux séances précédentes du week-end.</p>
  </div>
</section>

<section class="block" data-num="06" id="sec-el3-6">
  <div class="sec-marker"><span class="n">06</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">06</span> Classement complet EL3</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:43,922</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:44,021</td><td>+0,099s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:44,033</td><td>+0,111s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:44,273</td><td>+0,351s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:44,544</td><td>+0,622s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:44,637</td><td>+0,715s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:44,746</td><td>+0,824s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:44,899</td><td>+0,977s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:45,176</td><td>+1,254s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:45,592</td><td>+1,670s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:45,605</td><td>+1,683s (réprimande — drapeau jaune non respecté)</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:45,692</td><td>+1,770s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:45,854</td><td>+1,932s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:45,918</td><td>+1,996s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:45,998</td><td>+2,076s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:46,004</td><td>+2,082s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:46,076</td><td>+2,154s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:46,222</td><td>+2,300s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:46,271</td><td>+2,349s (réprimande — sortie de piste injustifiée)</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:46,512</td><td>+2,590s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:48,587</td><td>+4,665s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:49,279</td><td>+5,357s (accrochage au virage 1, roue endommagée, séance écourtée à 7 tours)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el3-7">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en qualifications</h2>
    <p>Verstappen, Russell et Hamilton se tiennent en onze centièmes à l'issue des essais — la bagarre pour la pole s'annonce resserrée entre Red Bull, Mercedes et Ferrari, sans favori évident. Mais c'est la position de Ferrari et McLaren qui interroge le plus : sur les trois séances du week-end, jamais Leclerc, Piastri et Norris ne se sont autant éloignés du sommet qu'en EL3 — un accident de parcours isolé, ou le signe que ces deux écuries n'ont pas encore trouvé le bon compromis sur ce tracé pour un tour de qualification ? L'écart de plus de sept dixièmes entre le meilleur temps réel et le temps théorique du plateau (cf. section 03) suggère qu'il reste de la marge à trouver pour tout le monde, y compris en tête.</p>
    <p>Le facteur qui pourrait tout rebattre reste le vent et la poussière : trois pilotes ont frôlé les murs sans conséquence en EL3, mais Stroll a payé cash sa sortie au virage 1 — sur un circuit qui n'offre aucune marge d'erreur, un tour de qualification unique est un pari plus risqué ici qu'ailleurs, y compris pour les habitués du haut du tableau.</p>
    <div class="callout">Rappel de méthode : l'EL3 se rapproche des conditions de qualification (réglages figés pour la plupart des équipes), mais reste une séance d'essais — les écarts observés ici, notamment pour Ferrari et McLaren, restent à confirmer sur un tour lancé sans trafic ni exploration de réglages.</div>
  </div>
</section>

<section class="block" id="sec-el3-8">
  <details class="sources">
    <summary>Sources utilisées — EL3 Bakou (2 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Déroulé de séance et citations</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/fp3-verstappen-beats-russell-and-hamilton-in-final-practice-for-azerbaijan-gp.4BuODmX7lLpgRKnIK4oMXg" data-desc="Rapport officiel de la séance, fetché en primaire — déroulé complet, citation de Verstappen, classement.">Formula1.com — rapport EL3</a><span class="desc">Formula1.com — primaire</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Réprimandes et clôture de l'enquête Hamilton/Lawson</h5>
      <ul>
        <li><a href="https://www.planetf1.com/news/fia-azerbaijan-grand-prix-2026-investigation" data-desc="Réprimandes de Sainz et Lindblad confirmées par les commissaires pour des incidents en EL3.">PlanetF1 — sanctions du week-end</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://www.planetf1.com/news/lewis-hamilton-fia-azerbaijan-grand-prix-2026-penalty" data-desc="Issue de l'enquête ouverte contre Hamilton en EL2 : réprimande pour gêne « sévère », sans pénalité de grille.">PlanetF1 — décision FIA sur Hamilton</a><span class="desc">PlanetF1</span></li>
      </ul>
    </div>
  </details>
</section>
`;
