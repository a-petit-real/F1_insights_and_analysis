// Analyse EL1 — GP d'Italie (Monza), round 13, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql) — classement par meilleur tour,
// secteurs et relais pneus vérifiés directement depuis la base. Le temps de
// Leclerc (1:23,008) est triple-vérifié : (1) champ agrégé de la requête
// practice_briefing.py, (2) somme des trois secteurs en base
// (27,224 + 28,105 + 27,679 = 83,008 très exactement), (3) concordance au
// millième avec le rapport officiel Formula1.com (fetché en primaire via
// fetch-url.yml) — qui donne aussi Hamilton +0,173s et Russell +0,304s,
// deux écarts qui recoupent exactement les temps bruts de la base.
// Contexte narratif (drapeau rouge Herta, casque spécial d'Antonelli,
// pilotes en séance rookie) sourcé depuis ce même article Formula1.com et
// des sources secondaires (Crash.net, Motorsport.com) via recherche
// ciblée. Aucune donnée inventée.
export const ROUND13_EL1_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix d'Italie · Monza · EL1 — vendredi 4 septembre</p>
    <p class="verdict">Ferrari mène un 1-2 sur le meilleur tour, Mercedes juste derrière — la <em>pré-analyse</em> tenait sa prémisse, pas son pronostic.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">1:23,008</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,173s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,304s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Lawson</span> <span class="gap">+0,425s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,636s</span></div>
    </div>
    <p class="subverdict">La pré-analyse annonçait une lutte à quatre équipes avec Russell en tête de peloton théorique. La première heure d'essais livre une réponse partielle : Ferrari devant, sur un tour signé au tour 17 sur pneu <strong>medium</strong> — pas le tendre C5 pourtant essayé par neuf pilotes — ce qui suggère un rythme réel plutôt qu'un coup ponctuel sur gomme tendre. À prendre avec la prudence qui s'impose sur une EL1 : programmes d'essais différents, charges d'essence inconnues, une seule heure de roulage.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el1-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> La pré-analyse face à la réalité de la piste</h2>
    <p>Trois jours plus tôt, la pré-analyse plaçait Russell en tête du groupe de favoris théoriques, Norris en 2<sup>e</sup> position, Hamilton/Leclerc en 3<sup>e</sup>, Verstappen en outsider proche. La séance livre un classement différent sur presque tous les points :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Rang prédit (pré-analyse)</th><th>Rang réel EL1</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td class="driver">Russell — pole probable</td><td>P3 (+0,304s)</td><td>Devancé par les deux Ferrari</td></tr>
        <tr><td class="driver">Norris — 2<sup>e</sup></td><td>P6 (+0,711s)</td><td>McLaren nettement plus loin qu'annoncé</td></tr>
        <tr><td class="driver">Hamilton/Leclerc — 3<sup>e</sup></td><td>P1-P2</td><td>Ferrari devant, pas troisième</td></tr>
        <tr><td class="driver">Verstappen — outsider proche</td><td>N'a pas roulé</td><td>Séance rookie obligatoire (Iwasa, P17)</td></tr>
        <tr><td class="driver">Piastri — 5<sup>e</sup></td><td>P11 (+1,176s)</td><td>Loin derrière le pronostic</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
  <div class="prose">
    <p>Deux prédictions se vérifient exactement : la météo (30,2 à 31,8 °C d'air relevés en piste sur l'heure, quasi identiques à la fourchette annoncée) et l'absence de Verstappen, remplacé comme prévu par Ayumu Iwasa pour la séance rookie du règlement — Iwasa termine P17, à 1,865s de Leclerc. <strong>Ce que la pré-analyse n'avait pas anticipé</strong> : l'ampleur de l'avance Ferrari, et un McLaren visiblement en délicatesse — les deux points qu'elle plaçait justement comme les plus incertains du week-end.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el1-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Ferrari devant, sur un temps qui n'a pas besoin du pneu tendre</h2>
    <p>Leclerc boucle son tour de référence à la mi-séance, au 17<sup>e</sup> tour de son relais medium entamé au tour 17 (le compteur de relais total, lui, en est à son 4<sup>e</sup>) — 1:23,008, décomposé en 27,224 / 28,105 / 27,679 aux trois secteurs, qui recolle exactement au temps total en base. C'est ce détail qui donne du poids au chrono : neuf pilotes du plateau avaient déjà chaussé le C5 tendre à ce stade de la séance pour tenter un temps de référence, sans faire mieux que Ferrari sur medium. Hamilton signe le 2<sup>e</sup> temps (1:23,181, +0,173s), pour un 1-2 Ferrari qui n'a plus grand-chose de la prudence affichée par Leclerc lui-même la veille (« le moteur reste notre point faible assumé »).</p>
    <p>Russell referme le podium provisoire à 0,304s, après avoir brièvement occupé la tête sur pneu tendre pendant que Leclerc roulait encore sur medium — l'ordre s'est inversé dès que le Monégasque a amélioré. Antonelli, methodical malgré une pénalité qui l'enverra en fond de grille dimanche, place la seconde Mercedes en P5 (+0,636s), avec un casque spécial inspiré de Valentino Rossi pour sa course à domicile. <a href="https://www.formula1.com/en/latest/article/fp1-leclerc-leads-hamilton-and-russell-during-first-practice-at-the-italian-grand-prix.7DUTqVtZlb4zvqNfBsyl1t" data-desc="Rapport officiel EL1, temps et contexte complet.">Formula1.com — rapport EL1</a></p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el1-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> McLaren : la faiblesse annoncée se matérialise, avec prudence</h2>
    <p>La pré-analyse rapportait un aveu d'équipe — un déficit McLaren qualifié en interne de « dingue » en virages lents, et une simulation où la MCL40 ressortait plus lente sur la ligne droite de Monza que sur celle de Hongrie. La première heure d'essais fournit un premier point de donnée compatible avec cette inquiétude : Norris 6<sup>e</sup> à 0,711s, Piastri 11<sup>e</sup> à 1,176s — McLaren hors du calcul pour le meilleur temps, quand l'équipe reste sur deux victoires consécutives entrant dans le week-end.</p>
    <p>La prudence s'impose néanmoins : une EL1 mélange des programmes différents (réglages, charge d'essence, moment choisi pour l'essai en pneu tendre), et Norris a même brièvement mené la séance à la reprise post-drapeau rouge, sur un tour resté la référence provisoire pendant plusieurs minutes avant que Leclerc ne l'efface. Un seul point de données ne confirme rien à lui seul — mais il ne contredit pas non plus le signal externe recueilli avant le week-end, ce qui en fait un fil à suivre dès l'EL2.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el1-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Drapeau rouge : la panne hydraulique de Herta</h2>
    <p>La séance a été interrompue après seulement cinq tours pour Colton Herta (Cadillac), immobilisé en piste sur suspicion de panne hydraulique — Voiture de Sécurité Virtuelle immédiate, puis drapeau rouge le temps de dégager la MAC-26. Herta ne reprendra pas la piste avant la fin de la séance et clôt le classement, seulement 3 de ses 5 tours ayant été chronométrés. À la reprise, la piste s'est révélée dense, chaque écurie cherchant à compléter son programme dans le temps restant. <a href="https://www.formula1.com/en/latest/article/fp1-leclerc-leads-hamilton-and-russell-during-first-practice-at-the-italian-grand-prix.7DUTqVtZlb4zvqNfBsyl1t" data-desc="Détail de l'incident Herta et de la reprise de séance.">Formula1.com</a></p>
    <p>Plusieurs écuries ont profité de cette EL1 pour faire rouler un pilote en séance rookie obligatoire du règlement, au-delà du seul cas Iwasa/Verstappen chez Red Bull : la grille de pilotes de cette séance (résolue directement depuis l'endpoint <code>drivers</code> d'OpenF1, filtré par séance, plutôt que supposée depuis la grille de course) inclut notamment Paul Aron (Alpine, P10) et Luke Browning (Williams, P15), aux côtés des titulaires habituels.</p>
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
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:23,008</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:23,181</td><td>+0,173s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:23,312</td><td>+0,304s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Lawson</td><td>Red Bull Racing</td><td>1:23,433</td><td>+0,425s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:23,644</td><td>+0,636s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:23,719</td><td>+0,711s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:23,802</td><td>+0,794s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:24,006</td><td>+0,998s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:24,028</td><td>+1,020s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Aron</td><td>Alpine</td><td>1:24,177</td><td>+1,169s (rookie)</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:24,184</td><td>+1,176s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Tsunoda</td><td>Racing Bulls</td><td>1:24,571</td><td>+1,563s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:24,626</td><td>+1,618s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:24,646</td><td>+1,638s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Browning</td><td>Williams</td><td>1:24,740</td><td>+1,732s (rookie)</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:24,827</td><td>+1,819s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Iwasa</td><td>Red Bull Racing</td><td>1:24,873</td><td>+1,865s (rookie, pour Verstappen)</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:25,780</td><td>+2,772s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:25,852</td><td>+2,844s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:25,984</td><td>+2,976s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:26,066</td><td>+3,058s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Herta</td><td>Cadillac</td><td>1:29,922</td><td>+6,914s (arrêt anticipé, panne hydraulique)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el1-6">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en EL2</h2>
    <p>Trois points issus de l'EL1 à suivre dès la reprise de 16h00 locale : <strong>Ferrari</strong> confirme-t-elle son rythme sur un relais plus long, loin des tours isolés de fin de séance ? <strong>McLaren</strong> corrige-t-elle son déficit en virages lents, ou l'écart se confirme-t-il sur une séance complète ? Et la <strong>MAC-26</strong> de Herta repart-elle sans séquelle après l'arrêt anticipé de l'EL1 ?</p>
    <div class="callout">Rappel de méthode : un classement EL1 mélange des programmes d'essais différents (réglages, carburant, moment du relais tendre) et ne prédit pas fiablement la hiérarchie de qualification. Il fournit un premier point de donnée réel, à recouper avec l'EL2 et l'EL3 plutôt qu'à extrapoler seul.</div>
  </div>
</section>

<section class="block" id="sec-el1-7">
  <details class="sources">
    <summary>Sources utilisées — EL1 Monza (4 liens)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Contexte et vérification</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/fp1-leclerc-leads-hamilton-and-russell-during-first-practice-at-the-italian-grand-prix.7DUTqVtZlb4zvqNfBsyl1t" data-desc="Rapport officiel EL1, fetché en primaire — chronologie, écarts, incident Herta.">Formula1.com — rapport EL1</a><span class="desc">Formula1.com — primaire</span></li>
        <li><a href="https://www.crash.net/f1/results/1103508/1/2026-f1-italian-grand-prix-monza-friday-practice-results" data-desc="Classement complet des séances du vendredi.">Résultats des essais du vendredi</a><span class="desc">Crash.net — secondaire</span></li>
        <li><a href="https://www.motorsport.com/f1/news/f1-italian-gp-fp1-report-10852135/10852135/" data-desc="Rapport EL1 indépendant, recoupement des écarts.">Ferrari mène un 1-2 en EL1</a><span class="desc">Motorsport.com — secondaire</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Méthodologie</h5>
      <ul>
        <li><span class="desc">Aucune discussion Reddit r/formula1 spécifique à cette séance n'a été retrouvée au moment de la rédaction — recherche effectuée mais infructueuse, mentionnée ici par transparence plutôt que passée sous silence.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
