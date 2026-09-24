// Analyse EL1 — Grand Prix d'Azerbaïdjan (Bakou), round 15, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py (session_key
// 11370, 2026-09-24 08:30->09:30 UTC, soit 12:30->13:30 heure locale de Bakou).
// Le temps de Russell (1:45,387) et les écarts du top 5 concordent exactement avec
// le rapport officiel Formula1.com (fetché en primaire via fetch-url.yml), qui donne
// aussi Verstappen +0,400s, Leclerc +0,404s, Hamilton +0,437s, Antonelli +0,878s —
// mêmes valeurs qu'en base à la milliseconde près. Aucune pré-analyse n'existe pour
// ce round (pas de comparaison pronostic/résultat dans cet article, contrairement aux
// rounds 13/14). Contexte narratif (abandon d'Antonelli, doubles VSC, incidents
// Hadjar/Piastri/Sainz) sourcé depuis ce même article Formula1.com. Aucune donnée
// inventée.
export const ROUND15_EL1_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix d'Azerbaïdjan · Bakou · EL1 — jeudi 24 septembre</p>
    <p class="verdict">Russell prend la tête de la première heure d'essais à Bakou, aidé d'un aspiration dans la ligne droite principale — mais la séance restera surtout marquée par l'abandon d'Antonelli, qui menait au moment de sa panne hydraulique.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">1:45,387</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,400s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,404s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,437s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,878s</span></div>
    </div>
    <p class="subverdict">Feu vert à 12h30 heure locale sur un circuit urbain poussiéreux et glissant en début de séance, comme toujours à la reprise annuelle à Bakou. Deux Voitures de Sécurité Virtuelle ont ponctué l'heure — la première pour récupérer la Mercedes d'Antonelli, sortie de piste après une panne hydraulique alors qu'il menait la séance ; la seconde dans les cinq dernières minutes, pour Lindblad et Hülkenberg. Russell termine devant au prix d'un aspiration dans la ligne droite principale, Verstappen devenant entre-temps le premier à passer sous la barre des 1:46 sur pneu tendre.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el1-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> L'abandon d'Antonelli, qui menait au moment de sa panne</h2>
    <p>Après un premier relais sur pneu dur, Antonelli fait partie des premiers à chausser le pneu tendre — et prend la tête provisoire de la séance en 1:46,265, à l'approche de la 25<sup>e</sup> minute. La avance ne dure pas : sur son tour de sortie des stands avec ce même train tendre, le pilote Mercedes signale par radio une panne hydraulique et immobilise sa monoplace au virage 7. Sa voiture est évacuée sous Voiture de Sécurité Virtuelle, et il ne reprendra pas la piste — séance terminée après seulement 25 minutes de roulage, mais un chrono resté suffisamment rapide (+0,878s) pour le maintenir en 5<sup>e</sup> position au drapeau à damier malgré cette moitié de séance manquée.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el1-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Russell devant, aidé par l'aspiration</h2>
    <p>Les organisations remontent dès la reprise de piste : Verstappen et Russell sortent tous deux dans le dégagement, respectivement aux virages 1 et 3, sans y laisser de temps avant de rejoindre la piste. Verstappen devient le premier pilote à passer sous la barre symbolique des 1:46 avec un 1:45,787 sur pneu tendre (le train à flanc rouge), avant d'être devancé par le 1:45,387 de Russell — la référence finale, obtenue avec l'aide d'un aspiration dans la longue ligne droite principale du circuit urbain. Verstappen termine à seulement 0,400s, juste devant les deux Ferrari de Leclerc (+0,404s) et Hamilton (+0,437s), toutes deux signées sur le pneu medium.</p>
    <p>Une seconde Voiture de Sécurité Virtuelle est déployée dans les cinq dernières minutes : Lindblad a dû reculer depuis le dégagement du virage 7, tandis que la monoplace Audi de Hülkenberg s'immobilisait simultanément à la sortie du virage 4, récupérée derrière les glissières. <a href="https://www.formula1.com/en/latest/article/fp1-russell-leads-opening-azerbaijan-gp-practice-from-verstappen-as-antonelli-suffers-hydraulic-issue.1vpwyIqrue0aq0qtifIKCC" data-desc="Rapport officiel EL1 : déroulé complet, incidents, classement.">Formula1.com — rapport EL1</a></p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el1-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Freins en question : Hadjar, Sainz, et une piste sale au démarrage</h2>
    <p>La séance démarre sur une piste décrite comme poussiéreuse et glissante, comme chaque année lors du retour annuel du plateau sur ce tracé urbain. Isack Hadjar, de retour après trois rounds d'absence pour une blessure au poignet, se plaint dès les premiers tours de freins qui tirent d'un côté sur sa Red Bull — un souci de moteur thermique viendra ensuite limiter davantage son roulage, le reléguant à la 20<sup>e</sup> place finale. Oscar Piastri signale des vibrations dans les premières minutes côté McLaren. Carlos Sainz, lui, doit ramener sa Williams — pourtant lourdement mise à jour pour ce week-end — au stand après seulement 15 minutes, freins arrière en feu.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el1-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> McLaren en délicatesse, Norris privé de la majorité de la séance</h2>
    <p>Derrière le top 5, les Racing Bulls de Liam Lawson et Arvid Lindblad, la Haas d'Esteban Ocon et l'Audi de Gabriel Bortoleto complètent le top 10. La seconde Audi de Hülkenberg prend la 11<sup>e</sup> place, devant le duo Williams Sainz/Albon. Lando Norris ne pointe qu'en 14<sup>e</sup> position après avoir manqué l'essentiel de la séance pour un problème sur sa monoplace — McLaren traverse une séance difficile des deux côtés du garage, entre les vibrations rapportées par Piastri (6<sup>e</sup>, mais avec du temps de piste perdu pendant la réparation) et l'arrêt prolongé de Norris. Bearman (Haas) mène ensuite Gasly, la Cadillac de Pérez, l'Alpine de Colapinto et Alonso, avant Hadjar, Stroll et Bottas en fin de classement.</p>
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
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:45,387</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:45,787</td><td>+0,400s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:45,791</td><td>+0,404s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:45,824</td><td>+0,437s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:46,265</td><td>+0,878s (panne hydraulique, arrêt après 25 min)</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:46,398</td><td>+1,011s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:46,440</td><td>+1,053s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:46,601</td><td>+1,214s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:46,624</td><td>+1,237s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:46,688</td><td>+1,301s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:46,871</td><td>+1,484s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:46,893</td><td>+1,506s (freins arrière en feu, arrêt à 15 min)</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:46,939</td><td>+1,552s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:46,981</td><td>+1,594s (a manqué l'essentiel de la séance)</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:46,994</td><td>+1,607s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:47,043</td><td>+1,656s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:47,253</td><td>+1,866s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:47,523</td><td>+2,136s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:47,835</td><td>+2,448s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:47,873</td><td>+2,486s (freins puis problème moteur thermique)</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:48,547</td><td>+3,160s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:49,315</td><td>+3,928s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el1-6">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en EL2</h2>
    <p>Trois points issus de cette EL1 à suivre dès la reprise : la fiabilité de la Mercedes d'Antonelli, après un abandon sur panne hydraulique alors qu'il menait la séance — un souci technique à surveiller avant les qualifications. Le rythme réel de McLaren, entre les vibrations de Piastri et l'arrêt prolongé de Norris, qui n'a pas permis à l'équipe de livrer un point de comparaison fiable sur cette première heure. Et les freins, sujet à double titre après le début de séance compliqué de Hadjar et l'incendie côté Williams de Sainz — un point de vigilance sur un circuit réputé exigeant pour le freinage, entre ses longues lignes droites et ses freinages tardifs.</p>
    <div class="callout">Rappel de méthode : un classement EL1 mélange des programmes d'essais différents (réglages, carburant, moment du relais tendre) et ne prédit pas fiablement la hiérarchie de qualification. Il fournit un premier point de donnée réel, à recouper avec l'EL2 et l'EL3 plutôt qu'à extrapoler seul.</div>
  </div>
</section>

<section class="block" id="sec-el1-7">
  <details class="sources">
    <summary>Sources utilisées — EL1 Bakou (2 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Recoupement et contexte narratif</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/fp1-russell-leads-opening-azerbaijan-gp-practice-from-verstappen-as-antonelli-suffers-hydraulic-issue.1vpwyIqrue0aq0qtifIKCC" data-desc="Déroulé de séance, abandon d'Antonelli, incidents Hadjar/Piastri/Sainz, classement complet — concorde exactement avec la base à la milliseconde près.">Formula1.com — rapport EL1</a><span class="desc">Formula1.com — primaire</span></li>
      </ul>
    </div>
  </details>
</section>
`;
