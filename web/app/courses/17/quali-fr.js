// Analyse Qualifications — Grand Prix de Singapour, round 17, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py
// --session "Qualifying"), classement/secteurs/relais vérifiés directement depuis
// la base via scripts/practice_briefing.py (session_key 11384, 2026-10-10
// 13:30->14:30 UTC, soit 21:30->22:30 heure locale de Singapour, sous les
// projecteurs). Classement complet du top 10 confirmé à la milliseconde près par
// le rapport officiel PlanetF1 (fetché en primaire via fetch-url.yml, daté du
// 10 octobre 2026) : Verstappen 1:31,373, Leclerc +0,054s, Hamilton +0,123s,
// Antonelli, Norris, Russell, Piastri, Gasly, Lawson, Lindblad — concordance
// totale avec la base, y compris le tour anormal de Hadjar (263,003s, 2/3 tours
// chronométrés) qui correspond exactement à sa panne moteur relatée dans
// l'article. Déroulé complet Q1/Q2/Q3 et citations (Ocon, Hadjar, Verstappen,
// Colapinto) repris de cette même source. Recoupement supplémentaire via
// WebSearch : plusieurs autres médias datés du même jour (grandprix247,
// total-motorsport, f1oversteer, pitdebrief) confirment indépendamment le même
// temps de pole et la panne moteur de Hadjar en Q1 — aucun écart.
//
// ATTENTION SOURCING — piège détecté et évité : une recherche initiale a fait
// remonter deux articles Formula1.com au titre et à l'URL presque identiques
// ("Russell denies Verstappen and Piastri pole" / "Official grid... Gasly and
// Albon start from pit lane") qui semblaient concerner ce week-end. La lecture
// du contenu réellement récupéré (fetch-url.yml) a révélé qu'il s'agit en
// réalité d'articles datés d'octobre 2025, relatant la VRAIE édition 2025 du
// Grand Prix de Singapour (pole de Russell, pas de Verstappen) — un cas quasi
// identique au précédent "Suzuka vs Madring" déjà rencontré sur ce projet. Les
// deux articles ont été écartés sans être utilisés. Aucune donnée inventée.
export const ROUND17_QUALI_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Singapour · Marina Bay · Qualifications — samedi 10 octobre</p>
    <p class="verdict">Verstappen conclut une journée parfaite : après sa victoire en Sprint le matin même, il décroche la pole position du Grand Prix — sa 50<sup>e</sup> en carrière, la première à Marina Bay — en devançant les deux Ferrari. Hadjar, lui, enchaîne une deuxième avarie moteur en deux séances et ne signe aucun temps en Q1.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">Pole</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">1:31,373</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,054s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,123s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,189s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+0,339s</span></div>
    </div>
    <p class="subverdict">Entre le Sprint du matin et ces qualifications, les mécaniciens n'ont pas chômé : Mercedes a réparé la monoplace de Russell accidentée en Sprint, McLaren a changé la boîte de vitesses de Piastri, et Red Bull a remplacé le groupe propulseur de Hadjar — sans succès, puisque le Français retombe en panne dès la Q1. Russell et Hadjar s'élanceront tous les deux depuis le fond de la grille dimanche, pénalités de groupe propulseur actées pour l'un comme pour l'autre.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-q-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Q1 — drapeaux jaunes en rafale, Hadjar à nouveau à l'arrêt</h2>
    <p>Avant même le premier temps de la séance, les drapeaux jaunes sont déjà de sortie : Ocon verrouille ses freins et part en tête-à-queue, évitant de peu le mur du virage 13 — "je n'avais pas de freins", se plaint-il à la radio. Stroll se retrouve lui aussi en travers d'une voie de dégagement. Puis c'est Hadjar qui part tout droit au virage 8, avant de regagner les stands au ralenti en expliquant : "le moteur est coupé".</p>
    <p>McLaren réplique en prenant le 1-2 provisoire (Norris devant Piastri, 1:33,047), Verstappen 3<sup>e</sup> à deux dixièmes. Hadjar retente sa chance avec sept minutes à jouer, toujours sans le moindre temps au compteur, mais doit à nouveau rentrer : "mêmes problèmes. Pas de vitesses." Sur une piste qui continue de s'améliorer, Hamilton prend la tête, Antonelli voit un temps amélioré supprimé pour dépassement des limites de piste, et Bearman sort de la zone d'élimination avec le 5<sup>e</sup> temps. La séance se termine sur un 1:32,680 d'Hamilton, 0,094s devant Leclerc, Norris complétant le podium provisoire.</p>
    <p>Éliminés en Q1 : <strong>Alonso, Albon, Stroll, Pérez, Bottas, Hadjar</strong> — ce dernier sans le moindre temps chronométré.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-q-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Q2 — Hamilton prend l'ascendant, Colapinto tape le mur</h2>
    <p>Russell est le premier à boucler un tour de référence (1:32,323) mais se retrouve relégué en 4<sup>e</sup> position à mesure que le reste du plateau s'élance. Antonelli passe provisoirement en tête avant d'être devancé par Hamilton, qui signe un 1:31,766 — quatre dixièmes de mieux que le leader du championnat à ce moment de la séance. Verstappen remonte en 3<sup>e</sup> position tout en pestant sur les ondes : "des passages de rapports incroyablement, incroyablement mauvais."</p>
    <p>Bortoleto et son coéquipier Hülkenberg frôlent tous les deux les murs, l'Audi n°5 reculant en 15<sup>e</sup> position tandis que Hülkenberg reste aux portes de la zone d'élimination en 10<sup>e</sup>. Hamilton boucle un second relais lancé pour porter son avance sur Norris à trois dixièmes, avant que Gasly ne s'empare de la 10<sup>e</sup> place, reléguant Hülkenberg en zone rouge — Colapinto, de son côté, percute le mur : "j'ai complètement perdu la voiture", rapporte-t-il à Alpine. La Q2 se termine avec Hamilton en tête, devant Verstappen et Norris.</p>
    <p>Éliminés en Q2 : <strong>Hülkenberg, Bearman, Ocon, Sainz, Bortoleto, Colapinto</strong>.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-q-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Q3 — 50<sup>e</sup> pole en carrière pour Verstappen</h2>
    <p>Verstappen, Leclerc, Antonelli et Russell sont les premiers à s'élancer pour le money time, Hamilton et Gasly attendant jusqu'au dernier moment. Verstappen impose d'emblée le rythme avec un 1:31,373, un dixième devant Hamilton et Leclerc 3<sup>e</sup>. Mercedes est la première écurie à relancer ses deux pilotes pour un second relais : Antonelli améliore mais ne grimpe qu'en 3<sup>e</sup> position provisoire, tandis que Russell, alors provisoirement 7<sup>e</sup>, ne parvient pas à faire mieux.</p>
    <p>Hamilton, aux prises avec sa Ferrari, ne trouve pas davantage de rythme et reste 2<sup>e</sup> derrière Verstappen — avant de retomber 3<sup>e</sup> lorsque Leclerc devance son coéquipier de 0,07s. Verstappen, déjà assuré de la pole, renonce à boucler son ultime tour lancé : il s'élancera dimanche en P1, devant Leclerc, Hamilton et Antonelli. C'est sa 50<sup>e</sup> pole position en carrière, la première à Marina Bay — et la deuxième séance de pole de la journée après celle du Sprint, quelques heures plus tôt.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-q-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Classement complet et grille de dimanche</h2>
    <p>Russell (pénalité de groupe propulseur actée avant même la séance) et Hadjar (nouveau remplacement de groupe propulseur après sa panne de Sprint Qualifying) s'élanceront tous les deux depuis le fond de la grille pour le Grand Prix de dimanche, quel que soit leur temps réel ici — reclassant mécaniquement tout le peloton derrière eux. Le détail exact de la grille de départ définitive sera confirmé dans l'article de course.</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:31,373</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:31,427</td><td>+0,054s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:31,496</td><td>+0,123s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:31,562</td><td>+0,189s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:31,712</td><td>+0,339s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:31,747</td><td>+0,374s (fond de grille dimanche, pénalité moteur)</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:31,860</td><td>+0,487s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:32,225</td><td>+0,852s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:32,319</td><td>+0,946s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:32,498</td><td>+1,125s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:32,784</td><td>+1,411s (éliminé en Q2)</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:32,908</td><td>+1,535s (éliminé en Q2)</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:33,261</td><td>+1,888s (éliminé en Q2, accrochage avec le mur)</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:33,323</td><td>+1,950s (éliminé en Q2)</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:33,526</td><td>+2,153s (éliminé en Q2)</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:33,658</td><td>+2,285s (éliminé en Q2)</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:34,223</td><td>+2,850s (éliminé en Q1)</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:34,289</td><td>+2,916s (éliminé en Q1)</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:34,946</td><td>+3,573s (éliminé en Q1)</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:35,123</td><td>+3,750s (éliminé en Q1)</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:35,984</td><td>+4,611s (éliminé en Q1)</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>— (pas de temps)</td><td>Panne de groupe propulseur en Q1 — fond de grille dimanche</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-q-5">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en course</h2>
    <p>Verstappen signe sa 50<sup>e</sup> pole en carrière le jour même de sa victoire en Sprint — un week-end parfait en vue, sur un circuit où dépasser reste rare. Derrière lui, les deux Ferrari se tiennent à moins de sept centièmes : Leclerc et Hamilton peuvent-ils exploiter le moindre accroc de Red Bull au départ ou lors des arrêts aux stands ? Mais la vraie question du dimanche se joue plus loin dans la grille : Russell ET Hadjar s'élancent tous deux depuis le fond, sur un tracé où chaque dépassement coûte cher — de quoi transformer la course en une remontée à suspense pour l'un comme pour l'autre, pendant que Verstappen tente de conclure un week-end sans la moindre faute.</p>
  </div>
</section>

<section class="block" id="sec-q-6">
  <details class="sources">
    <summary>Sources utilisées — Qualifications Singapour (1 lien externe)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py --session "Qualifying"), classement/secteurs/relais, primaire.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Déroulé Q1/Q2/Q3 et citations</h5>
      <ul>
        <li><a href="https://www.planetf1.com/news/singapore-grand-prix-2026-qualifying-report" data-desc="Rapport officiel des qualifications, fetché en primaire — déroulé complet par phase, citations de Ocon/Hadjar/Verstappen/Colapinto, classement détaillé. Daté du 10 octobre 2026, vérifié après avoir écarté deux articles Formula1.com en réalité datés de 2025 et concernant l'édition précédente du Grand Prix.">PlanetF1 — rapport qualifications</a><span class="desc">PlanetF1 — primaire</span></li>
      </ul>
    </div>
  </details>
</section>
`;
