// Analyse EL1 — Grand Prix d'Azerbaïdjan (Bakou), round 15, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py (session_key
// 11370, 2026-09-24 08:30->09:30 UTC, soit 12:30->13:30 heure locale de Bakou).
// Le temps de Russell (1:45,387) et les écarts du top 5 concordent exactement avec
// le rapport officiel Formula1.com (fetché en primaire via fetch-url.yml), qui donne
// aussi Verstappen +0,400s, Leclerc +0,404s, Hamilton +0,437s, Antonelli +0,878s —
// mêmes valeurs qu'en base à la milliseconde près. Deuxième source (Crash.net,
// fetch-url.yml) recoupée pour préciser les incidents Piastri/Norris/Hadjar (le
// rapport F1.com les mentionne sans toujours nommer la cause exacte) et pour le
// contexte championnat. Classement pilotes 2026 après round 14 (Antonelli 292 pts,
// Russell 211 pts, écart 81 pts) vérifié directement en base via
// scripts/standings_briefing.py — concorde exactement avec le chiffre de Crash.net.
// Analyse par secteur (temps théorique optimal vs tour réel) calculée à partir des
// temps de secteur individuels déjà en base, non repris d'une source externe.
// Aucune pré-analyse n'existe pour ce round (pas de comparaison pronostic/résultat,
// contrairement aux rounds 13/14). Aucune donnée inventée.
export const ROUND15_EL1_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix d'Azerbaïdjan · Bakou · EL1 — jeudi 24 septembre</p>
    <p class="verdict">Russell prend la tête de la première heure d'essais à Bakou, aidé d'un aspiration dans la ligne droite principale — mais la séance restera surtout marquée par l'abandon d'Antonelli, qui menait au moment de sa panne hydraulique, et qui aborde ce week-end avec 81 points d'avance au championnat sur Russell.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">1:45,387</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,400s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,404s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,437s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,878s</span></div>
    </div>
    <p class="subverdict">Feu vert à 12h30 heure locale sur un circuit urbain poussiéreux et glissant en début de séance, comme toujours à la reprise annuelle à Bakou. Deux Voitures de Sécurité Virtuelle ont ponctué l'heure — la première pour récupérer la Mercedes d'Antonelli, sortie de piste après une panne hydraulique alors qu'il menait la séance ; la seconde dans les cinq dernières minutes, pour Lindblad et Hülkenberg. Russell termine devant au prix d'un aspiration dans la ligne droite principale, Verstappen devenant entre-temps le premier à passer sous la barre des 1:46 sur pneu tendre — mais aucun des deux n'a assemblé un tour parfait : le détail par secteur plus bas montre encore 0,5s laissés sur la table.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el1-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> L'abandon d'Antonelli, qui menait au moment de sa panne — et un souci qui va peser sur l'EL2</h2>
    <p>Après un premier relais sur pneu dur, Antonelli fait partie des premiers à chausser le pneu tendre — et prend la tête provisoire de la séance en 1:46,265, à l'approche de la 25<sup>e</sup> minute. L'avance ne dure pas : sur son tour de sortie des stands avec ce même train tendre, le pilote Mercedes signale par radio une panne hydraulique et immobilise sa monoplace au virage 7. Sa voiture est évacuée sous Voiture de Sécurité Virtuelle, et il ne reprendra pas la piste — séance terminée après seulement 25 minutes de roulage, mais un chrono resté suffisamment rapide (+0,878s) pour le maintenir en 5<sup>e</sup> position au drapeau à damier malgré cette moitié de séance manquée.</p>
    <p>L'épisode a une suite qui ne figure pas au classement de l'EL1 : selon Crash.net, la voiture immobilisée d'Antonelli a été aspergée par un extincteur de la sécurité incendie par précaution, ce qui a imposé un changement moteur avant l'EL2 — Antonelli partira donc en retard pour la deuxième séance. Un vrai enjeu pour le leader du championnat : il aborde ce week-end avec 292 points contre 211 pour Russell, soit 81 points d'avance (classement pilotes après le round 14, vérifié en base) — une marge confortable, mais qui n'empêche pas une panne mécanique de coûter cher en préparation avant les qualifications.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el1-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Russell devant, aidé par l'aspiration — Leclerc n'a pas encore tout donné</h2>
    <p>Les organisations remontent dès la reprise de piste : Verstappen et Russell sortent tous deux dans le dégagement, respectivement aux virages 1 et 3, sans y laisser de temps avant de rejoindre la piste. Verstappen devient le premier pilote à passer sous la barre symbolique des 1:46 avec un 1:45,787 sur pneu tendre (le train à flanc rouge), avant d'être devancé par le 1:45,387 de Russell — la référence finale, obtenue avec l'aide d'un aspiration dans la longue ligne droite principale du circuit urbain. Verstappen termine à seulement 0,400s, juste devant les deux Ferrari de Leclerc (+0,404s) et Hamilton (+0,437s), toutes deux signées sur le pneu medium — Leclerc, selon Crash.net, n'a même pas complété de relais sur pneu tendre en EL1, ce qui laisse planer le doute sur une marge encore en réserve chez Ferrari.</p>
    <p>Une seconde Voiture de Sécurité Virtuelle est déployée dans les cinq dernières minutes : Lindblad a dû reculer depuis le dégagement du virage 7, tandis que la monoplace Audi de Hülkenberg s'immobilisait simultanément à la sortie du virage 4, récupérée derrière les glissières.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el1-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> McLaren : un problème de bargeboard, pas seulement des vibrations</h2>
    <p>La séance démarre sur une piste décrite comme poussiéreuse et glissante, comme chaque année lors du retour annuel du plateau sur ce tracé urbain — plusieurs pilotes se plaignent de freins dès les premiers tours. Côté McLaren, l'équipe traverse une séance nettement plus compliquée que ne le suggère la seule position de Piastri (6<sup>e</sup>) : selon Crash.net, l'écurie roule dans une configuration mise à jour mais "à problèmes" (<em>scrappy</em>), Piastri perdant du temps de piste pour un souci sur sa monoplace tandis que Norris doit compléter toute l'EL1 avec une réparation temporaire d'un problème de bargeboard — pas de simples vibrations comme le laissait entendre le compte-rendu initial, mais un vrai défaut aérodynamique bricolé en piste, qui l'a relégué à la 14<sup>e</sup> place.</p>
    <p>Isack Hadjar, de retour après trois rounds d'absence pour une blessure au poignet, se plaint dès les premiers tours de freins qui tirent d'un côté sur sa Red Bull ; Crash.net précise que c'est en réalité un problème de <strong>moteur thermique</strong>, distinct du souci de freins, qui lui a fait perdre le plus de temps de piste — il termine 20<sup>e</sup>. Carlos Sainz, lui, doit ramener sa Williams — pourtant lourdement mise à jour pour ce week-end — au stand après seulement 15 minutes, freins arrière en feu.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el1-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Personne n'a assemblé le tour parfait</h2>
    <p>Décomposer le tour en secteurs donne une lecture différente du classement brut. Le meilleur temps possible sur cette EL1, en additionnant le meilleur secteur de chaque pilote toutes voitures confondues, est de 1:44,871 (37,151 de Leclerc en secteur 1 + 42,988 de Verstappen en secteur 2 + 24,732 de Russell en secteur 3) — soit 0,516s de mieux que le 1:45,387 réellement signé par Russell en tête du classement. Autrement dit : aucun pilote n'a réuni sur un seul tour ses meilleurs morceaux de piste, ce qui est cohérent avec une première heure d'essais où les repères de trajectoire restent à affiner sur un circuit que le plateau ne retrouve qu'une fois par an.</p>
    <p>Le détail éclaire aussi les forces en présence : Leclerc, malgré sa 3<sup>e</sup> place finale, détient le meilleur secteur 1 du plateau — cohérent avec le rythme "en réserve" évoqué plus haut (Ferrari n'a pas fini de relais tendre). Verstappen possède le meilleur secteur 2, la plus longue portion du tour. Russell, lui, domine le secteur 3 — la zone qui précède la ligne droite principale où son tour de référence a bénéficié d'une aspiration, cohérent avec l'avantage qu'il y affiche.</p>
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
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:45,791</td><td>+0,404s (n'a pas fini de relais tendre)</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:45,824</td><td>+0,437s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:46,265</td><td>+0,878s (panne hydraulique, arrêt après 25 min, changement moteur avant l'EL2)</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:46,398</td><td>+1,011s (temps de piste perdu, souci monoplace)</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:46,440</td><td>+1,053s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:46,601</td><td>+1,214s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:46,624</td><td>+1,237s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:46,688</td><td>+1,301s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:46,871</td><td>+1,484s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:46,893</td><td>+1,506s (freins arrière en feu, arrêt à 15 min)</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:46,939</td><td>+1,552s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:46,981</td><td>+1,594s (réparation temporaire d'un problème de bargeboard)</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:46,994</td><td>+1,607s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:47,043</td><td>+1,656s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:47,253</td><td>+1,866s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:47,523</td><td>+2,136s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:47,835</td><td>+2,448s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:47,873</td><td>+2,486s (problème de moteur thermique)</td></tr>
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
    <p>Trois points issus de cette EL1 à suivre dès la reprise : la fiabilité de la Mercedes d'Antonelli, qui aborde l'EL2 avec un moteur changé et donc un programme d'essais raccourci — un vrai coût de préparation pour le leader du championnat avant les qualifications. Le rythme réel de McLaren, dont le problème de bargeboard côté Norris reste à résoudre durablement plutôt que rafistolé. Et la marge que Ferrari semble garder en poche après une EL1 sans relais tendre complet pour Leclerc — confirmée ou non dès que les deux Rouges pousseront pour de vrai.</p>
    <div class="callout">Rappel de méthode : un classement EL1 mélange des programmes d'essais différents (réglages, carburant, moment du relais tendre) et ne prédit pas fiablement la hiérarchie de qualification. Il fournit un premier point de donnée réel, à recouper avec l'EL2 et l'EL3 plutôt qu'à extrapoler seul.</div>
  </div>
</section>

<section class="block" id="sec-el1-7">
  <details class="sources">
    <summary>Sources utilisées — EL1 Bakou (3 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire. Analyse par secteur (temps théorique optimal) calculée directement à partir de ces données.</span></li>
        <li><span class="desc">The Pit Wall — classement pilotes 2026 après round 14 (scripts/standings_briefing.py), pour le contexte championnat (écart Antonelli/Russell).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Recoupement et contexte narratif</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/fp1-russell-leads-opening-azerbaijan-gp-practice-from-verstappen-as-antonelli-suffers-hydraulic-issue.1vpwyIqrue0aq0qtifIKCC" data-desc="Déroulé de séance, abandon d'Antonelli, incidents, classement complet — concorde exactement avec la base à la milliseconde près.">Formula1.com — rapport EL1</a><span class="desc">Formula1.com — primaire</span></li>
        <li><a href="https://www.crash.net/f1/results/1105168/1/2026-f1-azerbaijan-grand-prix-full-thursday-practice-results-baku" data-desc="Précisions sur les causes réelles des incidents Piastri (bargeboard, McLaren), Hadjar (moteur thermique), le relais tendre incomplet de Leclerc, et l'écart au championnat (81 points).">Crash.net — résultats et analyse du jeudi</a><span class="desc">Crash.net — secondaire</span></li>
      </ul>
    </div>
  </details>
</section>
`;
