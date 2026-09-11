// Analyse EL2 — GP d'Espagne (Madring, Madrid), round 14, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py. Le temps
// d'Antonelli (1:33,662) et les écarts du top 10 (Leclerc +0,113s, Hamilton
// +0,149s, Lindblad +0,228s, Russell +0,337s, Verstappen +0,401s) concordent
// exactement avec le classement officiel Formula1.com/PlanetF1 (fetchés en
// primaire via fetch-url.yml). Le cas Norris (2 tours chronométrés seulement,
// aucun temps représentatif) est confirmé et cité mot pour mot depuis l'article
// Formula1.com dédié (citations de Mark Temple, directeur technique performance
// McLaren, et d'Oscar Piastri). L'accrochage de Lindblad (P4 "au mérite" avant sa
// sortie de piste au virage 13) est sourcé et cité depuis Formula1.com. Aucune
// donnée inventée.
export const ROUND14_EL2_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix d'Espagne · Madring (Madrid) · EL2 — vendredi 11 septembre</p>
    <p class="verdict">Antonelli prend le relais de Russell en tête, Ferrari colle toujours d'aussi près — mais la séance restera surtout celle du gros coup dur McLaren et de la sortie de piste de Lindblad, alors qu'il tournait "au mérite" en P4.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">1:33,662</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,113s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,149s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#2B4562"></span><span class="drv">Lindblad</span> <span class="gap">+0,228s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,337s</span></div>
    </div>
    <p class="subverdict">L'EL1 avait donné Russell devant Antonelli ; l'EL2 inverse l'ordre chez Mercedes, toujours devant, avec Ferrari toujours aussi proche (deux dixièmes à peine séparent Leclerc et Hamilton du sommet). Mais la donnée brute occulte les deux vrais événements de la séance : Lando Norris, sixième en EL1, ne boucle que deux tours avant une panne de boîte de vitesses qui le renvoie au garage pour le reste de l'heure ; Arvid Lindblad, auteur d'un rythme de P4 "au mérite" selon ses propres mots, part à la faute au virage 13 et déclenche le drapeau rouge de la séance.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el2-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Mercedes toujours devant, Ferrari toujours aussi proche</h2>
    <p>Antonelli boucle son tour de référence en 1:33,662, une progression nette sur son propre chrono d'EL1 (1:34,363) qui illustre à quel point la piste évolue vite sur ce tracé tout juste découvert. Leclerc (+0,113s) et Hamilton (+0,149s) referment l'écart encore un peu plus qu'en EL1, où ils pointaient déjà à moins d'un demi-seconde du sommet — deux séances, même verdict : la lutte Mercedes-Ferrari reste totalement ouverte à l'approche des qualifications. Russell, décalé en 5<sup>e</sup> position cette fois (+0,337s), et Verstappen (6<sup>e</sup>, +0,401s) complètent un groupe de tête resserré en quatre dixièmes.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el2-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> McLaren : d'un doute à une vraie inquiétude</h2>
    <p>Norris n'aura roulé que deux tours en EL2 avant de rentrer au stand avec un problème mécanique jamais résolu avant la fin de la séance — la panne de boîte reste sans temps représentatif en base (2<sup>e</sup> tour chronométré à 2:00,105, très loin d'un tour lancé). Mark Temple, directeur technique performance de McLaren, confirme après coup : <em>« Problème de boîte de vitesses pour Lando, c'est évidemment un gros coup dur pour lui. En EL3, on va essayer de faire le maximum pour lui redonner du temps en piste. »</em> Temple ajoute que la journée s'est révélée "techniquement exigeante" pour tout le plateau, entre l'apprentissage du tracé et la gestion des pneus par forte chaleur. <a href="https://www.formula1.com/en/latest/article/a-big-setback-mclaren-confirm-gearbox-issue-as-norris-misses-fp2-in-madrid.5xJCa0u4fR3K9KuY4GPVcC" data-desc="Confirmation McLaren, citations complètes de Mark Temple et d'Oscar Piastri.">Formula1.com — panne de boîte de Norris</a></p>
    <p>Piastri, lui, a bouclé l'intégralité du programme des deux séances (P8 puis P7) sans pour autant trouver le rythme espéré : <em>« On s'est un peu rapprochés en EL2, ce qui est bien, mais il nous manque encore un peu de rythme. […] C'est un circuit street pas facile à exploiter — c'est notre plus gros problème pour l'instant. »</em> Deux séances après une pré-analyse qui pointait déjà un McLaren "sans étincelle récente", le week-end madrilène tourne à la vraie source d'inquiétude plutôt qu'au simple doute.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el2-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Lindblad : le meilleur rythme de la séance, terminé dans le mur</h2>
    <p>Passé la mi-séance, Arvid Lindblad pointait en P4 sur un rythme que lui-même qualifie de mérité — avant de perdre l'arrière de sa Racing Bulls à l'entrée du virage 13, la voiture pivotant et venant percuter le muret, dommages importants à l'avant-droit et à l'arrière. Le pilote britannique s'en sort indemne, mais la séance est interrompue par un drapeau rouge le temps de dégager la monoplace. Lindblad reconnaît l'ampleur des dégâts sans minimiser sa performance : <em>« C'est pas mal de dégâts, mais rien d'irréparable. Je m'excuse auprès des ingénieurs, et surtout des mécaniciens, qui vont avoir un peu de travail en plus ce soir. […] La vitesse était là. On était P4 au mérite, chaque tour qu'on a fait en EL2 était rapide — c'est le plus important. »</em> <a href="https://www.formula1.com/en/latest/article/i-was-running-p4-on-merit-lindblad-highlights-positives-after-fp2-crash-in-spain.1HE4r0a1dAJuY7Swpc4udc" data-desc="Citations complètes de Lindblad après son accrochage.">Formula1.com — Lindblad après son accrochage</a></p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el2-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Une chaleur qui continue de monter</h2>
    <p>La température de piste grimpe encore par rapport à l'EL1 : de 48,5°C à 53,1°C sur l'heure d'EL2 (contre 46,7-52,2°C le matin), pour un air ambiant proche de 30°C et une humidité en baisse continue (11 à 17%). Rien d'étonnant à ce que Mark Temple évoque explicitement la gestion thermique des pneus dans ses commentaires d'après-séance — une contrainte que Pirelli anticipait déjà en optant pour sa gamme la plus dure de la saison sur ce tracé (C2/C3/C4, cf. pré-analyse).</p>
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
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:33,662</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:33,775</td><td>+0,113s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:33,811</td><td>+0,149s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:33,890</td><td>+0,228s (P4 au mérite, sortie de piste et drapeau rouge plus tard en séance)</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:33,999</td><td>+0,337s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:34,063</td><td>+0,401s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:34,200</td><td>+0,538s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Tsunoda</td><td>Racing Bulls</td><td>1:34,758</td><td>+1,096s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:34,867</td><td>+1,205s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Lawson</td><td>Red Bull Racing</td><td>1:34,938</td><td>+1,276s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:34,959</td><td>+1,297s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:35,060</td><td>+1,398s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:35,170</td><td>+1,508s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:35,203</td><td>+1,541s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:35,886</td><td>+2,224s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:36,291</td><td>+2,629s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:36,780</td><td>+3,118s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:36,936</td><td>+3,274s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:37,195</td><td>+3,533s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:37,273</td><td>+3,611s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:37,727</td><td>+4,065s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>—</td><td>2 tours seulement, panne de boîte de vitesses (« false neutral »)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el2-6">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en EL3</h2>
    <p>Deux séances, deux ordres chez Mercedes (Russell puis Antonelli) mais toujours la même écurie devant, et toujours Ferrari à moins de deux dixièmes. La vraie question de l'EL3 samedi matin n'est plus la hiérarchie de tête — remarquablement stable sur cet aspect — mais McLaren : Norris récupère-t-il assez de tours pour arriver en qualifications avec un minimum de réglages validés, et Racing Bulls repart-elle sans Lindblad si la réparation ne suit pas ? À surveiller aussi : Verstappen, qui grappille du terrain séance après séance (0,626s puis 0,401s), et l'évolution des limites de piste sur un tracé où les tours continuent de tomber vite d'une session à l'autre.</p>
    <div class="callout">Rappel de méthode : comme pour l'EL1, un classement EL2 mélange encore des programmes d'essais différents (relais longs, tours de qualification simulée, gestion d'un incident). Deux séances de vendredi ne referment en rien le débat Mercedes-Ferrari — un signal en soi, qui invite à attendre l'EL3 et les qualifications plutôt qu'à trancher.</div>
  </div>
</section>

<section class="block" id="sec-el2-7">
  <details class="sources">
    <summary>Sources utilisées — EL2 Madring (3 liens)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Recoupement et citations</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/a-big-setback-mclaren-confirm-gearbox-issue-as-norris-misses-fp2-in-madrid.5xJCa0u4fR3K9KuY4GPVcC" data-desc="Panne de boîte de Norris confirmée par McLaren, citations de Mark Temple et Oscar Piastri.">Formula1.com — panne de boîte de Norris</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/i-was-running-p4-on-merit-lindblad-highlights-positives-after-fp2-crash-in-spain.1HE4r0a1dAJuY7Swpc4udc" data-desc="Détail et citations de Lindblad après sa sortie de piste au virage 13.">Formula1.com — Lindblad après son accrochage</a><span class="desc">Formula1.com</span></li>
      </ul>
    </div>
  </details>
</section>
`;
