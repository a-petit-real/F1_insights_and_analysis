// Analyse Qualifications — Grand Prix de Bahreïn (couru en Malaisie), round 16, saison 2026.
//
// Sourcing : donnée primaire pour le classement chiffré = pipeline OpenF1
// (scripts/ingest_openf1_practice.py --session "Qualifying", session_key confirmé
// via practice_briefing.py, 2026-10-03 08:00->09:00 UTC = 16:00->17:00 heure locale
// de Kuala Lumpur), classement par meilleur tour sur l'ensemble de l'heure de
// qualifications — qui recolle exactement, à la milliseconde près, avec les temps
// du Top 5 publiés par Formula1.com (Verstappen 1:35,130, Hamilton 1:35,428,
// Hadjar 1:35,558, Antonelli 1:35,631, Leclerc 1:35,666). Ce classement brut par
// meilleur temps NE reproduit PAS exactement le classement officiel par phase
// Q1/Q2/Q3 : Formula1.com confirme que Colapinto, classé 12e en brut, a choisi de
// ne pas pousser en Q2 à cause de ses pénalités déjà connues et termine en réalité
// 15e, derrière Alonso (12e), Sainz (13e) et Stroll (14e) — seule inversion
// identifiée par rapport au classement brut. Le déroulé complet Q1/Q2/Q3, les
// éliminations, la citation de Verstappen et les pénalités de grille (Hadjar 5
// places, Colapinto 5+10 places, Lindblad fond de grille pour changement de
// moteur) sont sourcés depuis le rapport officiel Formula1.com (fetch-url.yml,
// primaire, récupéré en HTML statique cette fois — contrairement aux comptes-rendus
// EL1/EL2 de ce round, non récupérables). Analyse par secteur (temps théorique
// optimal vs tour réel) calculée à partir des temps de secteur individuels déjà en
// base, non reprise d'une source externe. Aucune donnée inventée.
export const ROUND16_QUALI_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Bahreïn (couru en Malaisie) · Sepang · Qualifications — samedi 3 octobre</p>
    <p class="verdict">Max Verstappen signe sa première pole position de la saison 2026, devançant Lewis Hamilton de 0,298s — mais la séance restera aussi celle du coéquipier de Verstappen, Isack Hadjar : 3<sup>e</sup> sur la piste, il s'élancera 8<sup>e</sup> après une pénalité de cinq places.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">Pole</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">1:35,130</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,298s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Hadjar</span> <span class="gap">+0,428s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,501s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,536s</span></div>
    </div>
    <p class="subverdict">Chacune des trois séances d'essais avait vu une écurie différente en tête (Red Bull en EL1, Ferrari en EL2, Mercedes en EL3) : les qualifications tranchent enfin, Verstappen s'imposant dans les trois phases Q1/Q2/Q3. Premières qualifications disputées à Sepang depuis 2017, elles ont aussi été marquées par le temps supprimé d'Antonelli en Q2 (limites de piste) et par l'élimination de toute l'écurie Racing Bulls, pourtant solide tout le week-end.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-q-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Q1 — démarrage poussif, Verstappen prend le large</h2>
    <p>La séance démarre sur un rythme très calme — Haas est la première écurie à envoyer ses pilotes en piste, suivie par la majorité du plateau douze minutes plus tard. En pneus tendres pour tout le monde sauf Ferrari et Audi, c'est Antonelli qui fixe la première référence sérieuse en 1:37,041, aussitôt effacée par un Verstappen déjà une demi-seconde plus rapide — son coéquipier Hadjar prenant la deuxième place provisoire. Le pneu medium se révèle compétitif pour Ferrari : Hamilton puis Leclerc s'intercalent en 2<sup>e</sup> et 3<sup>e</sup> position.</p>
    <p>Dans les dernières minutes, les quatre grandes écuries restent à l'abri dans les stands, libérant la piste pour les autres. Chez Alpine, Gasly tracte Colapinto dans son aspiration pour assurer leur qualification pour la Q2. Stroll réalise un tour solide pour remonter en P11, et Bortoleto signe le meilleur premier secteur de la séance pour se classer 8<sup>e</sup> — mais son coéquipier Hülkenberg est éliminé en P17, à seulement 0,087s du cut. Hülkenberg confie sur les ondes : « c'est tout ce qu'elle a dans le ventre », tandis qu'Ocon, chez Haas, conteste la stratégie de son écurie l'ayant envoyé en piste trop tôt.</p>
    <p>Éliminés en Q1 : <strong>Hülkenberg, Bearman, Ocon, Albon, Bottas, Pérez</strong>.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-q-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Q2 — temps supprimé pour Antonelli, Racing Bulls calé</h2>
    <p>Verstappen reprend la tête dès le début de la phase en 1:35,696, premier pilote sous la barre des 1:36 — Leclerc l'imite peu après, à deux dixièmes. Le tour d'Antonelli est ensuite supprimé pour dépassement des limites de piste, le reléguant au second plan avec seulement un train de pneus tendres neufs en réserve pour une éventuelle Q3. Son tour suivant, plus prudent, suffit tout de même à le hisser en P2 derrière Verstappen, mettant la pression sur les écuries de milieu de tableau pour décrocher une place dans le top 10.</p>
    <p>Chez Racing Bulls, Lindblad — déjà assuré d'un départ en fond de grille pour changement de moteur — renonce à chercher un temps représentatif et tracte son coéquipier Lawson, qui bondit provisoirement en P10. Un nouveau tour de Bortoleto, encore une fois décisif, relègue finalement Lawson en P11, à 0,209s. Toute l'écurie Racing Bulls manque donc la Q3, malgré une bonne forme affichée tout le week-end.</p>
    <p>Éliminés en Q2 : <strong>Lawson, Alonso, Sainz, Stroll, Colapinto, Lindblad</strong> — les deux derniers, déjà sous le coup de pénalités de grille connues (respectivement changement moteur, et cumul de cinq places pour l'incident de Bakou plus dix pour nouveau moteur), n'ont pas cherché à pousser un tour représentatif.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-q-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Q3 — Verstappen décroche enfin sa première pole de la saison</h2>
    <p>Russell ouvre les débats en 1:36,032, rapidement effacé par Hadjar, puis par Hamilton et Leclerc qui s'installent en 2<sup>e</sup> et 3<sup>e</sup>. Verstappen réplique avec un tour qui lui offre la pole provisoire, trois dixièmes devant son propre coéquipier. Piastri s'intercale entre les deux Ferrari, Norris prend la P6, et Antonelli attend que tous les autres aient bouclé leur premier relais avant de s'engager — en vain : son tour ne lui offre que la P3 provisoire, sans approcher Verstappen.</p>
    <p>Le Néerlandais repart pour un ultime relais et abaisse son temps à 1:35,130, verrouillant la pole, tandis que Hamilton signe le meilleur tour de son week-end pour sécuriser la première ligne. Hadjar retombe en 3<sup>e</sup> position sur la piste — une place qui deviendra la 8<sup>e</sup> une fois sa pénalité de grille appliquée — devant Antonelli, 4<sup>e</sup>. Leclerc referme la deuxième Ferrari en 5<sup>e</sup>, devant le duo McLaren Norris-Piastri (6<sup>e</sup> et 7<sup>e</sup>), Russell se classant 8<sup>e</sup> avec un déficit qui le laisse perplexe. Gasly et Bortoleto complètent le top 10 pour Alpine et Audi.</p>
    <blockquote class="pull-quote">« C'est fantastique. On a essayé d'aller chercher la pole sur de nombreux Grands Prix, parfois en étant un peu plus proches que d'autres fois, mais réussir à l'obtenir enfin, vu d'où on est partis cette saison, c'est assez incroyable. » <cite>— Max Verstappen</cite></blockquote>
  </div>
</section>

<section class="block" data-num="04" id="sec-q-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Pole théorique : Verstappen laisse très peu sur la table</h2>
    <p>Si l'on isole uniquement les meilleurs secteurs individuels de Verstappen sur l'ensemble de la séance — secteur 1 en 24,504 (déjà le meilleur du plateau), secteur 2 en 31,456, secteur 3 en 39,016 (également le meilleur du plateau) — son propre tour théorique s'établit à 1:34,976, à seulement 0,154s de son tour de pole réel (1:35,130). Un écart cohérent avec celui observé lors des trois séances d'essais du week-end (0,171s en EL1, 0,222s en EL2, 0,163s en EL3).</p>
    <p>L'écart se creuse nettement si l'on prend le meilleur secteur 2 de tout le plateau, signé par Hamilton (31,201, sur un tour différent de celui de Verstappen) : le temps théorique optimal toutes voitures confondues tombe alors à 1:34,721, soit 0,409s sous la pole. Contrairement à une heure d'essais continue, les trois phases Q1/Q2/Q3 sont disputées à des moments différents, sur des pneus et une évolution de piste différents — ce qui disperse davantage les meilleurs secteurs individuels entre plusieurs pilotes et plusieurs tours.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-q-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Pénalités et grille de départ</h2>
    <p>Isack Hadjar s'élancera 8<sup>e</sup> dimanche après une pénalité de cinq places de grille qui le relègue depuis sa 3<sup>e</sup> place sur la piste — Antonelli, Leclerc, Norris et Russell remontent chacun d'un rang pour combler l'écart. Franco Colapinto cumule deux pénalités distinctes (cinq places pour son accrochage de Bakou, dix places supplémentaires pour un changement de moteur) qui l'envoient en fond de grille depuis sa 15<sup>e</sup> place de qualification. Arvid Lindblad s'élancera lui aussi en fond de grille, pour un changement de moteur distinct, après avoir pourtant disputé une Q2 solide (16<sup>e</sup>) au prix d'un tour sacrifié pour tracter son coéquipier Lawson.</p>
  </div>
</section>

<section class="block" data-num="06" id="sec-q-6">
  <div class="sec-marker"><span class="n">06</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">06</span> Classement complet par meilleur tour (séance entière)</h2>
    <p>Classement par meilleur temps chronométré sur l'ensemble de l'heure de qualifications. Il recolle exactement aux temps officiels du Top 5, mais diffère de la classification officielle par phase à une position : Colapinto, classé 12<sup>e</sup> ici par simple meilleur temps brut, termine en réalité 15<sup>e</sup> au classement officiel de la Q2 (n'ayant pas poussé un tour représentatif, déjà sous le coup de pénalités connues), derrière Alonso, Sainz et Stroll. La colonne « Écart » signale la grille de départ définitive quand elle diffère de ce classement brut.</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:35,130</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:35,428</td><td>+0,298s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:35,558</td><td>+0,428s (8<sup>e</sup> sur la grille, pénalité de 5 places)</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:35,631</td><td>+0,501s (3<sup>e</sup> sur la grille)</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:35,666</td><td>+0,536s (4<sup>e</sup> sur la grille)</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:35,757</td><td>+0,627s (5<sup>e</sup> sur la grille)</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:35,762</td><td>+0,632s (6<sup>e</sup> sur la grille)</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:35,871</td><td>+0,741s (7<sup>e</sup> sur la grille)</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:36,410</td><td>+1,280s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:36,814</td><td>+1,684s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:37,023</td><td>+1,893s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:37,179</td><td>+2,049s (15<sup>e</sup> au classement officiel Q2, n'a pas poussé ; fond de grille après pénalité cumulée de 15 places)</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:37,220</td><td>+2,090s (12<sup>e</sup> au classement officiel Q2)</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:37,527</td><td>+2,397s (13<sup>e</sup> au classement officiel Q2)</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:37,566</td><td>+2,436s (14<sup>e</sup> au classement officiel Q2)</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:37,883</td><td>+2,753s (16<sup>e</sup> au classement officiel Q2 ; fond de grille pour changement de moteur)</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:37,970</td><td>+2,840s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:37,980</td><td>+2,850s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:38,233</td><td>+3,103s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:38,600</td><td>+3,470s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:38,611</td><td>+3,481s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:38,933</td><td>+3,803s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-q-7">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en course</h2>
    <p>Verstappen, en pole, part avec Hamilton à ses côtés en première ligne — mais c'est bien son propre coéquipier qui représente la menace la plus immédiate : Hadjar s'élance 8<sup>e</sup> après sa pénalité, avec un rythme de qualification qui le plaçait pourtant à seulement 0,428s de la pole. S'il retrouve rapidement le peloton de tête, Red Bull pourrait disputer sa propre bataille interne pour la victoire. Antonelli, remonté en P3 sur la grille grâce à la pénalité de Hadjar, part devant Leclerc et le duo McLaren — une position de départ nettement meilleure que son résultat brut en Q3 ne le suggérait.</p>
    <p>Côté stratégie, Colapinto et Lindblad s'élanceront tous deux en fond de grille malgré un rythme de qualification correct (12<sup>e</sup> et 16<sup>e</sup> au classement brut) : les deux pourraient remonter rapidement si leur rythme de course confirme leur potentiel affiché sur un tour. Racing Bulls, étonnamment solide tout le week-end mais absente de la Q3, part avec Lawson 11<sup>e</sup> comme meilleur espoir de points.</p>
    <div class="callout">Rappel de méthode : le classement par meilleur tour de cette page couvre l'ensemble de la séance et recolle exactement aux temps officiels du Top 5, mais diffère du classement officiel par phase à la 12<sup>e</sup>-15<sup>e</sup> position (Colapinto, voir section 06) et a été remanié par les pénalités de grille de Hadjar, Colapinto et Lindblad — reconstitué ici uniquement à partir des éléments explicitement confirmés par Formula1.com.</div>
  </div>
</section>

<section class="block" id="sec-q-8">
  <details class="sources">
    <summary>Sources utilisées — Qualifications Sepang (1 lien externe)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py --session "Qualifying"), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Déroulé Q1/Q2/Q3, citation et pénalités de grille</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/verstappen-seizes-first-pole-position-of-the-season-in-qualifying-for-bahrain-gp-in-malaysia.3BW0zzYBLhG54bsQoNKFvP" data-desc="Rapport officiel des qualifications, fetché en primaire — déroulé complet par phase, citation de Verstappen, pénalités de grille de Hadjar/Colapinto/Lindblad.">Formula1.com — rapport qualifications</a><span class="desc">Formula1.com — primaire</span></li>
      </ul>
    </div>
  </details>
</section>
`;
