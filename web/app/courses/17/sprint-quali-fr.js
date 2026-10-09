// Analyse Sprint Qualifying — Grand Prix de Singapour, round 17, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py
// --session "Sprint Qualifying"), classement/secteurs/relais/météo vérifiés
// directement depuis la base via scripts/practice_briefing.py (session_key 11379,
// 2026-10-09 12:30->13:14 UTC, soit 20:30->21:14 heure locale de Singapour, sous
// les projecteurs). Classement et écarts du top 7 concordent exactement à la
// milliseconde avec le rapport officiel Formula1.com (fetché en primaire via
// fetch-url.yml) : Verstappen 1:31,156, Russell +0,120s, Leclerc +0,243s, Piastri
// +0,298s, Norris +0,431s, Hamilton +0,546s, Antonelli +0,693s. Citation de
// Verstappen reprise telle quelle de cet article, seule source où elle apparaît.
//
// Recoupement à deux sources (Formula1.com + PlanetF1, fetch-url.yml en primaire
// pour les deux) qui a révélé une correction nécessaire par rapport au premier
// jet de cet article : le classement par "meilleur tour toutes phases confondues"
// issu du pipeline OpenF1 plaçait Hadjar 8e (1:32,048) devant Lawson et Gasly —
// mais PlanetF1 publie le détail chiffré SQ1/SQ2/SQ3 (table complète par phase)
// qui montre que ce tour de 1:32,048 a été supprimé pour dépassement des limites
// de piste au dernier virage (confirmé aussi par la formule de Formula1.com,
// "Hadjar failing to record a lap in SQ3 after breaching track limits") : Hadjar
// n'a donc OFFICIELLEMENT aucun temps en SQ3 et se classe 10e, derrière Lawson
// (8e, 1:32,341) et Gasly (9e, 1:33,319 — son temps de SQ3, plus lent que son
// propre temps de SQ2 à 1:33,155, mais c'est la phase SQ3 qui fait foi pour le
// classement, pas le meilleur tour toutes phases confondues). Corrigé ci-dessous
// par rapport à la version initialement publiée.
//
// Un second écart entre les deux sources, cette fois non résolu : PlanetF1 classe
// Pérez 20e (1:36,760) et Sainz 22e (1:37,376) sur les positions d'élimination en
// SQ1, alors que Formula1.com affirme explicitement que "Sainz partagera la
// dernière ligne de la grille avec Pérez" ce week-end (soit 21e/22e) — ce que
// confirme indépendamment notre propre base (meilleur tour valide de Pérez à
// 1:37,830, plus lent que celui de Sainz à 1:37,376). Les positions 19/20/21/22
// ci-dessous suivent donc Formula1.com + la base (Albon 19e, Bottas 20e, Sainz
// 21e, Pérez 22e) plutôt que le tableau chiffré de PlanetF1 sur ce point précis,
// qui semble en contradiction avec son propre article Formula1.com et avec notre
// classement par tour valide — à vérifier au prochain passage si une source
// tierce permet de trancher. Pas de pénalité de grille annoncée pour ce Sprint à
// l'heure de la rédaction — l'enquête pour drapeaux jaunes en SQ1 s'est conclue
// sans sanction, décision confirmée par les deux sources. Aucune donnée inventée.
export const ROUND17_SPRINTQUALI_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Singapour · Marina Bay · Sprint Qualifying — vendredi 9 octobre</p>
    <p class="verdict">Verstappen décroche sa première pole de l'histoire à Marina Bay, toutes catégories de qualification confondues — un dernier tour écrasant qui enterre une SQ3 où Ferrari et McLaren se neutralisaient pour la tête.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">Pole</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">1:31,156</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,120s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,243s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">+0,298s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+0,431s</span></div>
    </div>
    <p class="subverdict">Une heure seulement après la fin de l'unique séance d'essais libres, place à la Sprint Qualifying, sous les projecteurs de Marina Bay. Rouge dès les six premières minutes de la SQ1 — Pérez plante sa Cadillac dans les barrières du virage 4 — puis une SQ3 où quatre écuries se tiennent à quatre dixièmes : Norris puis Piastri prennent la tête provisoire, Leclerc les devance de 19 millièmes, avant que Verstappen ne vienne tout balayer sur son unique tentative lancée.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-sq-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> SQ1 — Pérez percute les barrières, Verstappen frôle une pénalité</h2>
    <p>Pneu medium obligatoire pour tout le monde en SQ1 : Cadillac ouvre la file des monoplaces, prêtes à affronter des conditions très différentes de celles de l'après-midi. Le premier drapeau jaune tombe vite : Sergio Pérez percute le mur du virage 4, endommageant son aileron avant, puis traîne la pièce sous sa voiture en tentant de regagner son garage — des débris se répandent sur la trajectoire, provoquant un drapeau rouge à six minutes du terme. Seule une poignée de pilotes avait alors signé un temps représentatif ; Hamilton menait provisoirement en 1:33,748, environ 1,5s derrière le meilleur tour de Russell en EL1.</p>
    <p>Les ralentis montrent aussi Verstappen doubler la Ferrari de Hamilton sous drapeaux jaunes pendant cet incident — le Néerlandais n'avait alors pas encore signé de tour représentatif. Convoqué chez les commissaires, il est blanchi : leur décision retient qu'il s'agit d'une "conséquence malheureuse" de la différence de vitesse entre les deux voitures, pas d'une manœuvre dangereuse.</p>
    <p>Une fois l'action relancée, la plupart des pilotes misent sur une seule tentative lancée, provoquant une rafale d'améliorations dans les dernières minutes : Leclerc s'installe en P2 derrière son coéquipier, suivi des deux Mercedes puis de la Audi de Hülkenberg en P4. Norris s'empare ensuite du podium provisoire, mais Piastri, sorti de son premier essai, doit batailler près de la zone d'élimination. Verstappen, lui aussi sous pression dans les dernières secondes, boucle finalement le meilleur temps du segment en 1:33,477, Hadjar et Piastri se qualifiant également.</p>
    <p>Éliminés en SQ1 : <strong>Lindblad, Stroll, Albon, Bottas, Perez, Sainz</strong> — Albon signalant par radio que sa monoplace se sentait "complètement différente de la séance d'essais".</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-sq-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> SQ2 — Ferrari s'envole, Russell se sauve de justesse</h2>
    <p>Toujours en pneu medium, Verstappen frôle les murs en signant d'entrée un nouveau temps de référence (1:32,724), profitant de l'évolution de la piste pour effacer nettement son chrono précédent. De quoi devancer Antonelli et Russell dans un premier temps — jusqu'à ce que Hamilton reprenne l'avantage, puis que Leclerc fasse mieux encore avec un 1:32,457. Hamilton rapporte "deux gros décrochages" en fin de tour qui lui coûtent du temps — un indice qu'il restait de la marge à trouver pour la Ferrari.</p>
    <p>Russell, victime d'un blocage de roues, doit repartir sur des pneus en moins bon état et pointe alors en zone d'élimination, P8. Hadjar s'installe en P5, Lawson et Colapinto progressant également et reléguant le Britannique. Mais Russell arrache la P4 au moment décisif, renvoyant l'Alpine de Colapinto en P11.</p>
    <p>Éliminés en SQ2 : <strong>Colapinto, Hülkenberg, Bearman, Bortoleto, Alonso, Ocon</strong>.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-sq-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> SQ3 — Verstappen rafle la pole dans les dernières secondes</h2>
    <p>Feu vert pour le dernier acte, mais Ferrari, Red Bull et le duo Lawson/Gasly patientent dans leurs garages plutôt que de s'engager immédiatement. L'attente laisse le champ libre à Norris, qui pousse ses pneus tendres jusqu'à leur limite pour s'emparer provisoirement de la tête en 1:31,587, Piastri lui collant aux basques en P2 — aucune des deux Mercedes ne peut alors répondre à l'offensive McLaren.</p>
    <p>Leclerc vient ensuite devancer Norris de seulement 0,019s, mais malgré ses efforts, Hamilton ne peut faire mieux que la P3 derrière lui, son temps retombant en fin de tour. Il reste alors juste assez de temps pour que Red Bull vienne tout renverser : Verstappen frappe fort dès le premier secteur et conserve cet élan sur l'ensemble du tour pour s'emparer de la pole du Sprint, sans qu'aucun rival ne puisse répondre à son 1:31,156 final. Russell se classe au plus près pour Mercedes, suivi de Leclerc, Piastri et Norris. Hamilton termine finalement à un demi-seconde en P6, devant Antonelli.</p>
    <p>Derrière ces sept premiers, Lawson complète le top 8 (1:32,341), devant Gasly (1:33,319) — plus lent que son propre temps de SQ2 (1:33,155), mais c'est bien le temps signé en SQ3 qui compte pour le classement, pas le meilleur chrono toutes phases confondues. Hadjar, lui, ferme le top 10 sans le moindre temps officiel en SQ3 : son tour, pourtant plus rapide que ceux de Lawson et Gasly, a été supprimé pour dépassement des limites de piste au tout dernier virage de sa tentative finale.</p>
    <blockquote class="pull-quote">« C'est toujours serré ici à Singapour. Et le tour lui-même aussi — on pousse aussi fort qu'on pense que c'est possible, en frôlant les murs à certains endroits. Une fois les pneus tendres montés, la voiture a clairement pris vie, mais je ne m'attendais pas à ça. Évidemment, très content d'être devant. » <cite>— Max Verstappen</cite></blockquote>
  </div>
</section>

<section class="block" data-num="04" id="sec-sq-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Classement complet Sprint Qualifying</h2>
    <p>La grille du Sprint de samedi (21 tours, départ à 17h00 heure locale) reprend directement ce classement — aucune pénalité de grille n'a été annoncée à l'heure de la rédaction. Classement officiel par phase (SQ1/SQ2/SQ3), recoupé entre Formula1.com et PlanetF1 ; voir le commentaire de sourcing en tête de fichier pour le détail des deux corrections qu'a imposées ce recoupement (positions 8-10, et un désaccord non résolu sur les positions 20/22).</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:31,156</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:31,276</td><td>+0,120s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:31,399</td><td>+0,243s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:31,454</td><td>+0,298s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:31,587</td><td>+0,431s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:31,702</td><td>+0,546s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:31,849</td><td>+0,693s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:32,341</td><td>+1,185s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:33,319</td><td>+2,163s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>— (pas de temps)</td><td>Tour de SQ3 supprimé pour limites de piste au dernier virage — classé devant les éliminés de SQ2</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:33,249</td><td>+2,093s (éliminé en SQ2)</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:33,420</td><td>+2,264s (éliminé en SQ2)</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:33,423</td><td>+2,267s (éliminé en SQ2)</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:33,466</td><td>+2,310s (éliminé en SQ2)</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:33,734</td><td>+2,578s (éliminé en SQ2)</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:34,368</td><td>+3,212s (éliminé en SQ2)</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:35,136</td><td>+3,980s (éliminé en SQ1)</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:35,662</td><td>+4,506s (éliminé en SQ1)</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:36,130</td><td>+4,974s (éliminé en SQ1, "voiture complètement différente de la séance d'essais")</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:36,868</td><td>+5,712s (éliminé en SQ1)</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:37,376</td><td>+6,220s (éliminé en SQ1)</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:37,830</td><td>+6,674s (accident virage 4, drapeau rouge en SQ1 ; PlanetF1 publie 1:36,760 et le classe 20<sup>e</sup>, en contradiction avec son propre papier Formula1.com qui place Pérez et Sainz sur la dernière ligne de la grille — voir note de sourcing)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-sq-5">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller pour le Sprint</h2>
    <p>Verstappen signe sa première pole toutes catégories confondues à Marina Bay, un mois seulement après sa première victoire de la saison en Malaisie — l'élan continue-t-il sur un tracé où dépasser reste un exercice rare ? Russell s'élance juste derrière, mais rappel : le Britannique partira dimanche depuis le fond de la grille pour la course principale, pénalité moteur déjà actée ; le Sprint de samedi reste donc sa seule vraie occasion de marquer gros ce week-end. Entre Leclerc, Piastri et Norris, séparés de moins de deux dixièmes, la bataille pour le podium s'annonce aussi disputée que la SQ3 elle-même.</p>
  </div>
</section>

<section class="block" id="sec-sq-6">
  <details class="sources">
    <summary>Sources utilisées — Sprint Qualifying Singapour (2 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py --session "Sprint Qualifying"), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Déroulé SQ1/SQ2/SQ3, enquête et citation</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/verstappen-clinches-pole-position-in-singapore-sprint-qualifying-ahead-of-russell.4dvkvpkCXftdhX7sLI2dcQ" data-desc="Rapport officiel de la Sprint Qualifying, fetché en primaire — déroulé complet par phase, enquête sur le drapeau jaune de Verstappen, citation.">Formula1.com — rapport Sprint Qualifying</a><span class="desc">Formula1.com — primaire</span></li>
        <li><a href="https://www.planetf1.com/news/f1-results-singapore-grand-prix-2026-sprint-qualifying" data-desc="Classement chiffré détaillé des trois phases SQ1/SQ2/SQ3, fetché en primaire — a révélé la suppression du tour de Hadjar en SQ3 et un désaccord avec Formula1.com sur les positions 20/22.">PlanetF1 — résultats détaillés par phase</a><span class="desc">PlanetF1 — primaire</span></li>
      </ul>
    </div>
  </details>
</section>
`;
