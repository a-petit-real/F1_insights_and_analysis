// Analyse EL2 — Grand Prix des États-Unis (Austin, COTA), round 18, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py
// (session_key 11390, 2026-10-23 21:00->22:00 UTC). Classement et déroulé de
// séance confirmés et recoupés avec le classement officiel Formula1.com
// (formula1.com/en/results/2026/races/1297/united-states/practice/2, fetché
// en primaire) et avec le rapport Grandprix.com daté du 23 octobre 2026
// ("Practice 2 Report - Leclerc completes Austin Friday sweep"), lu
// intégralement et confirmé comme portant bien sur ce round (mention
// explicite de la date, du circuit, des pilotes 2026 et du contexte "Russell
// lower than eighth" cohérent avec le compte-rendu EL1 du même jour). Voir le
// commentaire de sourcing de web/app/courses/18/el1-fr.js pour le détail des
// pièges écartés et des limites de sourcing documentées pour ce round (très
// peu de temps écoulé entre la séance et la rédaction). Même limite ici :
// aucune citation de pilote n'a pu être recoupée sur un second média
// indépendant de Grandprix.com pour cette séance précise — signalé comme tel.
//
// Analyse technique quantifiée : les moyennes de rythme en relais long et la
// comparaison de vitesses de pointe citées plus bas viennent d'une requête
// dédiée sur practice_laps/practice_stints (scripts/
// practice_briefing_laptimes_by_car.py), même méthode que pour EL1 (et que le
// round 17 côté course) : moyenne des tours d'un relais donné, tour de sortie
// de stand exclu, puis tours encore supérieurs à 103% de la médiane du relais
// également exclus. Aucune donnée inventée.
//
// Passe d'enrichissement technique (2026-10-24) — voir le commentaire détaillé
// de sourcing de web/app/courses/18/el1-fr.js pour le détail complet des
// sources cherchées/trouvées/écartées sur le plancher Ferrari et la plainte
// de direction de Verstappen (même recherche, pas répétée ici). Deux apports
// propres à EL2, tous deux lus intégralement via fetch-url.yml avant usage :
// - Crash.net, « Charles Leclerc casts judgement on much-hyped Ferrari US GP
//   upgrade » (Lewis Larkam, 24 oct. 2026) : citation directe de Leclerc après
//   les deux séances — « ce n'est définitivement pas ce que tout le monde
//   imagine en termes d'évolution et de gain au tour » — qui recoupe
//   directement, et de façon non triviale, le constat déjà fait par calcul
//   sur les données brutes du projet en section 02 (écart de rythme en relais
//   long resté quasi nul face à Red Bull/Mercedes) : la retenue de Leclerc
//   n'est pas qu'une posture médiatique, elle colle au chiffre. Le même
//   article confirme aussi que Leclerc identifie lui-même Verstappen et
//   Antonelli (pas McLaren) comme la vraie menace de rythme — même lecture
//   que la section 02 ci-dessous, par une voie totalement indépendante
//   (le pilote lui-même, pas notre requête SQL).
// - Crash.net, « George Russell gets rare warning for Charles Leclerc US GP
//   practice near-miss » (Lewis Larkam, 24 oct. 2026) : correction d'une
//   imprécision de la version précédente de cet article, qui décrivait deux
//   incidents distincts (un drapeau noir et blanc pour avoir « poussé un
//   autre pilote » puis un accrochage séparé avec Leclerc au virage 18). Le
//   verdict des commissaires cité texto par Crash.net montre qu'il s'agit en
//   réalité d'un seul et même épisode, en plusieurs étapes administratives
//   (drapeau noir et blanc → renvoi aux commissaires → classement sans
//   suite) : Leclerc tente de dépasser Russell au virage 18 sur un tour de
//   préparation, Russell se déplace vers la gauche, Leclerc sort de piste et
//   se rabat devant lui. Corrigé ci-dessous en section 04. L'article ajoute
//   un angle technique réel absent de la version précédente : le consultant
//   Sky Sports F1 Anthony Davidson (ex-pilote F1) attribue en partie
//   l'incident à un écart de puissance entre les deux monoplaces à cet
//   instant — une hypothèse technique nommée et attribuée, pas une
//   affirmation établie, présentée comme telle dans le texte.
export const ROUND18_EL2_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix des États-Unis · Austin (COTA) · EL2 — vendredi 23 octobre</p>
    <p class="verdict">Leclerc complète le doublé Ferrari du vendredi, mais l'écart à Antonelli fond à quatre centièmes — et la vraie leçon du relais long est que Mercedes et Red Bull referment déjà l'essentiel de l'écart sur un tour de qualification.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">1:35,291</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,042s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,189s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,615s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,744s</span></div>
    </div>
    <p class="subverdict">La piste a gagné près de huit dixièmes par rapport à l'EL1 (1:36,052 à 1:35,291 pour Leclerc), mais la hiérarchie de tête, elle, se resserre : Ferrari reste devant, cette fois sur pneu tendre, mais Antonelli n'est plus qu'à 0,042s et Verstappen à 0,189s — contre 0,084s et 0,245s en EL1. L'analyse des relais longs (section 02) montre que ce resserrement est réel, pas un artefact de trafic : Ferrari, Red Bull et Mercedes tournent à un rythme quasiment identique à charge de carburant plus réaliste. Russell écope d'un drapeau noir et blanc après un quasi-accrochage avec Leclerc au virage 18, classé sans suite après enquête. Côté Williams, Sainz qualifie sa monoplace de « catastrophe » tandis qu'Albon continue de lutter contre un fort décrochage dans les virages Esses.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el2-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Ferrari conserve la tête, mais l'avantage a presque disparu</h2>
    <p>Le scénario de la séance s'est construit en plusieurs étapes : Verstappen a posé la première référence sur medium (1:36,581), Leclerc a répondu sur dur, Norris a brièvement pris la tête sur dur (1:36,373), puis Russell est passé devant sur medium (1:36,035) avant le tour de qualification simulée sur tendre. Verstappen a abaissé la cible à 1:35,480 — aidé par l'aspiration de son coéquipier Hadjar sur la ligne droite arrière — avant que Leclerc ne reprenne la tête avec encore 0,189s de marge, pour un chrono final de 1:35,291. L'analyse par secteur distribue les forces : Verstappen le plus rapide en secteur 1, Antonelli en secteur 2, Leclerc en secteur 3 — qui assemble ses trois meilleurs secteurs sur le tour qui compte, tout comme Antonelli ; le tour idéal de Verstappen (1:35,438) reste quatre centièmes plus lent que ce qu'il a réellement signé.</p>
    <p>Séance disputée dans des conditions plus chaudes qu'en EL1 côté air : 29-30°C (85-86°F) contre 27-28°C en EL1, pour une température de piste qui, elle, redescend progressivement de 42°C à 39°C sur l'heure à mesure que le soleil décline. Comme en EL1, aucun drapeau rouge n'est venu interrompre le programme.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el2-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Le relais long confirme : l'écart s'est bel et bien resserré</h2>
    <p>Pour vérifier si le resserrement du tour de qualification simulée se retrouve aussi à charge réaliste, voici les moyennes de relais long (tours de sortie de stand exclus, puis tours au-delà de 103% de la médiane du relais également exclus) :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Gomme / relais</th><th>Tours exploités</th><th>Moyenne relais</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>SOFT usé (14 tours)</td><td>11</td><td>1:41,481</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>HARD usé (10 tours)</td><td>9</td><td>1:41,544</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>SOFT neuf (18 tours !)</td><td>13</td><td>1:41,508</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>MEDIUM usé</td><td>10</td><td>1:41,704</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>SOFT usé</td><td>6</td><td>1:42,130</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>MEDIUM usé (11 tours)</td><td>11</td><td>1:42,524 <em>(dégradation nette : 1:41,4 → 1:43,2 sur le relais)</em></td></tr>
        <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>SOFT usé</td><td>8</td><td>1:44,038</td></tr>
      </tbody>
    </table>
  </div>
  <div class="prose">
    <p>Le plus frappant n'est pas l'ordre — Verstappen, Leclerc et Norris restent dans un mouchoir de 0,07s — mais l'endurance : Leclerc a fait durer un même train de pneus tendres sur 18 tours, pour une moyenne (1:41,508) à peine moins bonne que Verstappen sur un relais deux fois plus court. Lawson, à l'inverse, illustre une vraie courbe de dégradation sur ses pneus medium usés, passant de 1:41,4 à 1:43,2 sur onze tours — soit près de deux secondes perdues, un signal à surveiller pour Racing Bulls en vue d'une course qui s'annonce à un seul arrêt selon Pirelli.</p>
    <p>Ce resserrement calculé sur les données brutes du projet n'est pas qu'une lecture interne : Leclerc, interrogé après les deux séances sur le plancher révisé de sa Ferrari, tient le même discours que le chiffre. <em>« Le ressenti est plutôt bon mais il faut rester prudent, on n'est que vendredi »</em>, a-t-il déclaré, avant d'ajouter : <em>« On voit ce qu'on attendait, mais ce n'est clairement pas ce que tout le monde imagine en termes d'évolution et de gain au tour. »</em> Mieux : invité à nommer la vraie menace du week-end, Leclerc écarte McLaren (<em>« je ne pense pas qu'ils aient encore tout assemblé »</em>) et pointe exactement les deux équipes que les relais longs désignent ici — <em>« Kimi et Max semblent très, très forts »</em> — une convergence entre le ressenti du pilote et le calcul qui vaut d'être relevée, plutôt qu'un simple commentaire d'après-séance à prendre pour argent comptant.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el2-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Antonelli gêné par son baquet, Hamilton perd l'adhérence</h2>
    <p>Séance pas totalement confortable pour Antonelli, qui a alerté son ingénieur avant un arrêt dédié : <em>« Le baquet bouge dans tous les sens. »</em> Une fois mieux fixé, l'Italien a livré le relais long le plus convaincant sur pneu medium — cohérent avec son deuxième temps au tour. Hamilton, de son côté, s'est plaint de la perte de grip en fin de séance : <em>« Je n'arrive pas à garder la voiture sur la piste. »</em> Ferrari a alors basculé la seconde monoplace sur gomme dure.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el2-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Russell averti pour un quasi-accrochage avec Leclerc, Williams en difficulté</h2>
    <p>Russell et Leclerc sont passés tout près du contact au virage 18 : Leclerc, sur un tour de préparation, tentait de dépasser la Mercedes ; Russell s'est déplacé vers la gauche, forçant Leclerc à sortir de la piste pour se rabattre finalement devant lui. La direction de course a sanctionné Russell d'un drapeau noir et blanc pour avoir forcé un autre pilote à sortir de la piste, puis renvoyé l'incident aux commissaires pour enquête formelle — classée sans suite, les commissaires jugeant la manœuvre <em>« sans rien de dangereux »</em> dans le contexte d'une séance d'essais, les deux monoplaces étant alors sur des tours de préparation. Anthony Davidson, consultant Sky Sports F1 et ancien pilote de F1, avance une explication technique à ce quasi-accrochage plutôt qu'un simple excès d'agressivité : <em>« Je pense qu'il y avait une différence de puissance entre les deux voitures à ce moment-là »</em> — une hypothèse nommée et attribuée, pas un fait établi, mais plus spécifique que le simple constat de l'incident. Côté Williams, la séance reste compliquée : Sainz a qualifié sa monoplace de <em>« catastrophe »</em>, tandis qu'Albon a lutté contre un fort décrochage dans l'enchaînement rapide des virages Esses, terminant dernier (1:43,426) après la suppression d'un tour à 1:38,035 pour limites de piste au virage 15.</p>
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
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:35,291</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:35,333</td><td>+0,042s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:35,480</td><td>+0,189s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:35,906</td><td>+0,615s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:36,035</td><td>+0,744s (drapeau noir et blanc ; incident virage 18 avec Leclerc classé sans suite)</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:36,331</td><td>+1,040s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:36,373</td><td>+1,082s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:36,387</td><td>+1,096s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:36,411</td><td>+1,120s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:36,536</td><td>+1,245s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:36,832</td><td>+1,541s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:36,840</td><td>+1,549s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:36,959</td><td>+1,668s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:37,111</td><td>+1,820s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:37,201</td><td>+1,910s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:37,235</td><td>+1,944s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:37,269</td><td>+1,978s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>1:37,430</td><td>+2,139s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:38,422</td><td>+3,131s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:38,446</td><td>+3,155s (« une catastrophe » selon le pilote)</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:39,036</td><td>+3,745s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:43,426</td><td>+8,135s (tour à 1:38,035 supprimé pour limites de piste au virage 15)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el2-6">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en EL3</h2>
    <p>Deux séances, un motif qui se précise plutôt qu'il ne se tranche : Ferrari devant à chaque fois, mais avec un matelas qui fond de 0,084s à 0,042s face à Mercedes côté chrono, et qui disparaît presque entièrement côté relais long face à Red Bull. La vraie question de l'EL3 samedi n'est donc plus de savoir qui a le tour le plus rapide — Leclerc, deux fois sur deux — mais si Ferrari peut transformer son avantage sur un tour en un avantage de course, face à un Verstappen dont le rythme à charge semble déjà très proche. McLaren, elle, recule nettement entre les deux séances : Norris passe de la 3<sup>e</sup> place en EL1 à la 7<sup>e</sup> en EL2, Piastri de la 7<sup>e</sup> à la 8<sup>e</sup> — un contraste frappant avec leur rythme de relais long très correct (1:41,5 pour Norris, meilleur que celui de Leclerc) qui laisse penser que la marge sur un tour se joue ailleurs que sur le seul rythme pur. Russell et Antonelli, eux, abordent les qualifications avec le contexte du championnat en toile de fond : Antonelli peut en théorie être sacré dès dimanche, un scénario qui dépend directement de la façon dont Russell et Hamilton se classeront.</p>
    <div class="callout">Rappel de méthode : les moyennes de relais long de cet article comparent des relais de longueurs et d'âges de pneus différents (de 4 à 18 tours, pneus neufs ou déjà usés de plusieurs tours) — un indicateur solide de tendance, pas une comparaison strictement à conditions égales. Les deux séances de vendredi restent par ailleurs des programmes d'essais mélangés (réglages non figés), à confirmer par l'EL3 et les qualifications.</div>
  </div>
</section>

<section class="block" id="sec-el2-7">
  <details class="sources">
    <summary>Sources utilisées — EL2 Austin (4 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
        <li><span class="desc">The Pit Wall — requête dédiée tours bruts par voiture (scripts/practice_briefing_laptimes_by_car.py) : base des moyennes de relais long et de la courbe de dégradation de Lawson, section 02.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1297/united-states/practice/2" data-desc="Classement officiel, concorde à la milliseconde avec Grandprix.com.">Formula1.com — résultats officiels EL2</a><span class="desc">Formula1.com</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Recoupement et contexte narratif</h5>
      <ul>
        <li><a href="https://www.grandprix.com/races/united-states-gp-2026-practice-2-report.html" data-desc="Déroulé complet par secteurs, citations d'Antonelli, Hamilton et Sainz, incidents Russell.">Grandprix.com — rapport EL2</a><span class="desc">Grandprix.com</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique (nouveau cette passe)</h5>
      <ul>
        <li><a href="https://www.crash.net/f1/news/1108213/1/charles-leclerc-casts-judgement-much-hyped-ferrari-us-gp-upgrade" data-desc="Citations directes de Leclerc après les deux séances sur le plancher révisé et sur Verstappen/Antonelli comme menaces de rythme — recoupe directement le calcul de la section 02. Daté du 24 oct. 2026 (Lewis Larkam), lu intégralement via fetch-url.yml.">Crash.net — le jugement de Leclerc sur l'évolution Ferrari</a><span class="desc">Crash.net</span></li>
        <li><a href="https://www.crash.net/f1/news/1108139/1/george-russell-gets-rare-warning-charles-leclerc-us-gp-practice-near-miss" data-desc="Verdict texto des commissaires et commentaire technique d'Anthony Davidson (Sky Sports F1, ex-pilote) sur l'incident Russell/Leclerc au virage 18 — corrige la description en deux incidents distincts de la version précédente. Daté du 24 oct. 2026 (Lewis Larkam), lu intégralement via fetch-url.yml.">Crash.net — l'avertissement de Russell pour son quasi-accrochage avec Leclerc</a><span class="desc">Crash.net</span></li>
      </ul>
    </div>
  </details>
</section>
`;
