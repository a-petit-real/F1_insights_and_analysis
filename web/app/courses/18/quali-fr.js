// Analyse Qualifications — Grand Prix des États-Unis (Austin, COTA), round 18,
// saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py
// --session "Qualifying"), classement brut par meilleur tour/secteurs/relais
// vérifiés directement depuis la base via scripts/practice_briefing.py
// (session_key 11392, 2026-10-24 21:00->22:00 UTC). Point de méthode déjà
// documenté pour les rounds précédents (round 16 notamment) : le classement
// brut par meilleur temps sur l'ensemble de l'heure NE reproduit PAS le
// classement officiel par phase Q1/Q2/Q3 ni la grille de départ réelle une
// fois les pénalités appliquées — les deux reconstructions ci-dessous
// (déroulé par phase, grille de départ) viennent de sources externes
// recoupées, détaillées plus bas, jamais du classement brut seul.
//
// Déroulé Q1/Q2/Q3, citations de contexte, et détail des tours supprimés en
// Q2/Q3 : Grandprix.com, « Qualifying Report - Antonelli beats Verstappen to
// Austin pole » (24 oct. 2026), lu intégralement via fetch-url.yml. Les temps
// qu'il cite (Antonelli 1:34,035 / 1:34,278 / 1:35,390 selon la phase,
// Verstappen 1:34,214, Hadjar 1:34,250, etc.) concordent exactement avec le
// classement officiel Formula1.com (formula1.com/en/results/2026/races/1297/
// united-states/qualifying, fetché en primaire) pour les trois colonnes
// Q1/Q2/Q3 — recoupement complet, pas seulement sur le top 5.
//
// Grille de départ APRÈS pénalités : la page officielle Formula1.com
// "Starting Grid" pour ce Grand Prix a été fetchée directement et renvoie
// explicitement "Error — No results available" au moment de la rédaction (la
// course n'a pas encore été disputée) — grille non encore publiée côté
// Formula1.com, limite de sourcing documentée honnêtement plutôt que
// masquée. La grille présentée ci-dessous vient donc de F1-Fansite.com
// (« 2026 US F1 GP Starting Grid with Antonelli on Pole in Austin », lu
// intégralement via fetch-url.yml), qui la qualifie elle-même explicitement
// de « Provisional: qualifying result with the known grid penalties applied,
// pending the official FIA starting grid » — à traiter comme la meilleure
// reconstruction disponible au moment de la rédaction, pas comme un document
// FIA définitif. Le détail composant par composant des pénalités moteur de
// Bortoleto (5e ICE, 5e TC, 5e EXH, 5e ES, 5e CE, 4e MGU-K et 7e PU-ANC) et de
// Colapinto (4e CE) vient de cette même page. ⚠️ Écart de sourcing non résolu,
// signalé tel quel plutôt que masqué : Grandprix.com chiffre la pénalité
// cumulée de Bortoleto à "80-place drop" dans son rapport qualifications,
// alors que F1-Fansite.com détaille un total de "60 place grid penalty" à
// partir de la liste précise des composants — les deux sources s'accordent
// sur l'effet pratique (dernière place sur la grille, Colapinto juste devant)
// mais pas sur le chiffre exact ; aucune des deux n'a pu être vérifiée auprès
// d'un document FIA officiel au moment de la rédaction.
//
// Analyse technique quantifiée : temps théorique optimal par secteur calculé
// directement à partir des minimums individuels déjà en base (pas repris
// d'une source externe) ; composés de pneus par relais (Antonelli et Russell
// seuls à avoir démarré la Q1 en medium plutôt qu'en tendre) lus directement
// dans practice_stints. Aucune donnée inventée.
//
// Recherches avec effort réel mais sans résultat exploitable pour cette
// séance précise (documenté honnêtement, pas masqué, même limite déjà
// rencontrée pour les EL1/EL2/EL3 de ce round — séance disputée quelques
// heures avant la rédaction) : The Race et Crash.net n'ont publié, dans ce qui
// a pu être trouvé, aucun article de réaction dédié à cette qualification
// précise (au-delà de l'article plancher déjà cité pour les EL1/EL2/EL3) ;
// Craig Scarborough/ScarbsTech, Matthew Somerfield/SomersF1, la chronique Gary
// Anderson (The Race), RaceFans.net et les illustrations Giorgio Piola n'ont
// renvoyé aucun résultat propre à ce week-end. r/F1Technical a été retenté
// spécifiquement pour cet article — sujet plus technique que EL1/EL2 (limites
// de piste multi-virages, pénalités moteur chiffrées) jugé plus prometteur
// pour cette communauté — mais aucun fil daté de ce week-end n'a été trouvé,
// ni via une recherche web générale ni via l'API de recherche Reddit
// elle-même (de nouveau injoignable depuis le contexte de recherche
// disponible). Aucun pronostiqueur/pundit nommé et attribué n'a été trouvé
// commentant spécifiquement cette séance ; aucune opinion n'a donc été
// inventée ou attribuée pour compenser ce manque.
export const ROUND18_QUALI_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix des États-Unis · Austin (COTA) · Qualifications — samedi 24 octobre</p>
    <p class="verdict">Kimi Antonelli décroche sa 7<sup>e</sup> pole de la saison devant les deux Red Bull, mettant fin à la série parfaite de Ferrari sur les trois essais libres — mais la vraie bascule de la grille vient des pénalités moteur : Bortoleto et Colapinto, tous deux solidement qualifiés, s'élanceront en fond de grille.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">Pole</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">1:34,035</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,179s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Hadjar</span> <span class="gap">+0,215s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,232s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,276s</span></div>
    </div>
    <p class="subverdict">Trois séances d'essais dominées par Ferrari, et c'est pourtant Mercedes qui signe la pole : Antonelli devance Verstappen de 0,179s sur son tout premier tour de Q3, un temps que ni lui-même ni les deux Red Bull derrière lui n'ont pu améliorer ensuite — leurs tentatives finales ont même été supprimées pour limites de piste au virage 19, sans que cela change quoi que ce soit au classement pour Verstappen et Hadjar. Pour Norris, en revanche, la même suppression au même virage coûte potentiellement deux places : son tour qui l'aurait classé 6<sup>e</sup> est parti à la trappe, le laissant 8<sup>e</sup> sur la grille. Antonelli aborde dimanche avec, mathématiquement, la possibilité d'être sacré champion du monde dès cette course — mais Hamilton s'élance 5<sup>e</sup> et Russell 6<sup>e</sup>, deux positions de départ qui rendent peu probable que les conditions requises (victoire d'Antonelli, Hamilton 5<sup>e</sup> ou pire, Russell 9<sup>e</sup> ou pire à l'arrivée) soient réunies dès dimanche soir.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-q-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Q1 — Norris en tête sur son dernier relais, Williams et Cadillac sortent</h2>
    <p>Leclerc impose d'abord le rythme en 1:35,200, suivi de près par Verstappen (1:35,215), Hadjar (1:35,286) et Hamilton (1:35,355) — Antonelli, de son côté, a besoin d'un second tour lancé pour descendre sous la barre à 1:35,390, après avoir démarré la phase sur un train de pneus medium plutôt que tendre, comme son coéquipier Russell : les deux seuls pilotes du plateau à avoir fait ce choix en Q1, d'après les relais enregistrés en base. Norris reprend la tête sur son ultime tentative avec un 1:35,029, Leclerc et Verstappen restant 2<sup>e</sup> et 3<sup>e</sup> — les quatre grandes écuries passent sans encombre en Q2. Plus loin dans la feuille de temps, Williams et Cadillac perdent chacune leurs deux voitures : Ocon est le premier éliminé (17<sup>e</sup>, 1:36,531) devant Stroll (18<sup>e</sup>), puis Sainz (19<sup>e</sup>), Albon (20<sup>e</sup>), Pérez (21<sup>e</sup>) et Bottas (22<sup>e</sup>) ferment la marche.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-q-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Q2 — Ferrari reprend l'avantage, et un tour supprimé qui aurait tout changé pour Bearman</h2>
    <p>Ferrari rétablit sa hiérarchie habituelle en Q2 : Leclerc améliore à 1:34,198 sur son dernier relais, devançant Antonelli (1:34,278) de 0,080s ; Russell complète un podium provisoire Mercedes/Ferrari en 1:34,305, suffisamment proche pour laisser planer une vraie menace sur la Q3. Verstappen se qualifie 4<sup>e</sup> (1:34,471), Norris 5<sup>e</sup> (1:34,539). La lutte la plus serrée de la phase se joue pour la dixième et dernière place qualificative : Lawson décroche la Q3 pour Racing Bulls avec un 1:35,058, devançant de seulement 0,022s la tentative de Gasly chez Alpine (1:35,080) — Lindblad, déjà solidement installé, rejoint son coéquipier en Q3.</p>
    <p>Hülkenberg est éliminé en 12<sup>e</sup> position (1:35,158), suivi de Bortoleto (1:35,691), Colapinto (1:35,722) et Alonso (1:35,818). Oliver Bearman termine 16<sup>e</sup> et dernier de la phase avec un 1:36,031 — mais son véritable tour de la séance, un 1:35,592, a été supprimé pour limites de piste au virage 11. Sans cette suppression, Bearman aurait devancé Alonso (1:35,818) de 0,226s et se serait qualifié pour la Q3 à sa place — un deuxième « et si » de cette séance, après celui de Verstappen/Hadjar en Q3 (voir section 03), qui rappelle qu'une qualification entière peut basculer sur un seul tour effacé.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-q-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Q3 — Antonelli ne retouche pas à son premier tour, et le virage 19 frappe trois fois</h2>
    <p>Antonelli signe directement la référence sur sa première tentative, 1:34,035 — un temps qu'il ne retrouvera jamais sur son second relais, perdant du temps dans le dernier secteur après avoir pourtant amélioré dans les deux premiers. Verstappen répond en 1:34,214, Hadjar en 1:34,250, plaçant provisoirement les deux Red Bull devant les deux Ferrari (Leclerc 1:34,336 sur son premier essai). Sur leurs tours suivants, ni Verstappen (1:34,482) ni Hadjar (1:34,363) ne font mieux que leurs propres premiers temps — et les deux tours sont de surcroît supprimés pour limites de piste au virage 19, sans incidence sur leurs positions respectives puisqu'ils n'auraient de toute façon rien changé. Leclerc et Hamilton améliorent sur leurs derniers relais (1:34,267 et 1:34,311) sans pouvoir refermer l'écart creusé en Q2 : les cinq premiers du classement sont séparés de seulement 0,276s.</p>
    <p>Le virage 19 frappe une troisième fois, et cette fois avec de vraies conséquences : le dernier tour de Norris, un 1:34,379 qui l'aurait classé 6<sup>e</sup> — devant Russell (1:34,476) et Piastri (1:34,803) — est lui aussi supprimé au virage 19. Norris reste donc sur son temps précédent, 1:35,049, et se retrouve 8<sup>e</sup>, derrière son propre coéquipier. Trois suppressions au même virage en une seule séance de qualifications, après celle de Verstappen en EL1 et les trois suppressions aux virages 9/10 de l'EL3 (voir l'article EL3 de ce round) : sur l'ensemble du week-end, les limites de piste à Austin n'ont épargné aucune des trois grandes écuries de tête. Lawson, enfin, n'a pas retenté de tour en Q3 et termine 10<sup>e</sup> sans temps amélioré.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-q-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Pole théorique : Russell, pas Antonelli, détient le meilleur secteur 1 de la séance</h2>
    <p>En isolant le meilleur temps de chaque secteur sur l'ensemble de la séance (toutes phases confondues), le tour théorique optimal s'établit à 1:33,843 — nettement sous la pole réelle d'Antonelli (1:34,035), pour un écart de 0,192s. Le détail est plus parlant que le total : le meilleur secteur 1 de toute la séance n'appartient ni à Antonelli ni à Verstappen, mais à George Russell (25,230), qui n'a pourtant terminé que 6<sup>e</sup> sur la grille — à 0,441s de la pole. Antonelli, lui, signe les meilleurs secteurs 2 (37,185) et 3 (31,428) de la séance. Le signal est net : Mercedes dispose, sur ce week-end, d'un rythme sur un tour qui dépasse ce que son propre résultat final suggère — un point à surveiller dimanche si Russell parvient à assembler un tour plus complet dès le départ.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-q-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Pénalités moteur : Bortoleto et Colapinto renvoyés en fond de grille</h2>
    <p>Deux pilotes qualifiés confortablement en Q2 — Bortoleto 13<sup>e</sup> (1:35,691) et Colapinto 14<sup>e</sup> (1:35,722) — s'élanceront en réalité des deux dernières places de la grille. Colapinto écope d'une pénalité de 10 places pour un quatrième boîtier électronique de contrôle (CE) ; Bortoleto, lui, cumule une pénalité beaucoup plus lourde pour tout un lot de composants moteur changés (5<sup>e</sup> bloc moteur thermique, 5<sup>e</sup> turbocompresseur, 5<sup>e</sup> échappement, 5<sup>e</sup> stockage d'énergie, 5<sup>e</sup> boîtier électronique, 4<sup>e</sup> MGU-K et 7<sup>e</sup> composant annexe de l'unité de puissance), chiffrée à 60 places par F1-Fansite.com à partir du détail des composants — mais à 80 places par Grandprix.com dans son propre rapport qualifications. Les deux sources s'accordent sur l'effet concret (Bortoleto dernier, juste derrière Colapinto) sans s'accorder sur le chiffre exact ; aucun document FIA officiel n'a pu être consulté directement pour trancher, l'écart est donc signalé tel quel. Seul bénéficiaire mécanique de ces deux reculs : tous les pilotes classés entre la 15<sup>e</sup> et la 22<sup>e</sup> position en Q1/Q2 remontent de deux rangs sur la grille réelle. Autre dossier moteur de ce week-end, sans conséquence cette fois : la FIA a retiré un document de pénalité moteur qui visait Lindblad, lequel conserve donc sa 9<sup>e</sup> place de Q3 (1:36,049) intacte sur la grille.</p>
  </div>
</section>

<section class="block" data-num="06" id="sec-q-6">
  <div class="sec-marker"><span class="n">06</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">06</span> Grille de départ complète (provisoire, en attente de confirmation FIA)</h2>
    <p>Classement par phase Q1/Q2/Q3 une fois les pénalités de grille connues appliquées — provisoire selon la source elle-même (F1-Fansite.com), la page officielle Formula1.com « Starting Grid » n'étant pas encore publiée au moment de la rédaction (voir le commentaire de sourcing en tête de fichier).</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Grille</th><th>Pilote</th><th>Écurie</th><th>Meilleur temps</th><th>Écart / note</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:34,035</td><td>Pole (Q3)</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:34,214</td><td>+0,179s (tour suivant, 1:34,482, supprimé au virage 19, sans incidence)</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:34,250</td><td>+0,215s (tour suivant, 1:34,363, supprimé au virage 19, sans incidence)</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:34,267</td><td>+0,232s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:34,311</td><td>+0,276s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:34,476</td><td>+0,441s (meilleur secteur 1 de la séance, voir section 04)</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:34,803</td><td>+0,768s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:35,049</td><td>+1,014s (tour à 1:34,379, qui l'aurait classé 6<sup>e</sup>, supprimé au virage 19)</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:36,049</td><td>+2,014s (Q3 ; pénalité moteur initialement annoncée puis retirée par la FIA)</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:35,058</td><td>Q3, sans tour amélioré</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:35,080</td><td>Q2 (éliminé pour 0,022s)</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>1:35,158</td><td>Q2</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:35,818</td><td>Q2 (remonte de 2 rangs après les pénalités Bortoleto/Colapinto)</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:36,031</td><td>Q2 (tour réel 1:35,592 supprimé au virage 11 — aurait valu la Q3, voir section 02)</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:36,531</td><td>Q1</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:36,677</td><td>Q1</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:36,770</td><td>Q1</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:36,967</td><td>Q1</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>1:37,433</td><td>Q1</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:37,523</td><td>Q1</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:35,722</td><td>Q2 ; pénalité de 10 places (4<sup>e</sup> boîtier de contrôle électronique)</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:35,691</td><td>Q2 ; pénalité cumulée de composants moteur (60 places selon F1-Fansite.com, 80 selon Grandprix.com — écart de sourcing non résolu)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-q-7">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en course</h2>
    <p>Antonelli part en pole, mais les deux Red Bull s'alignent directement derrière lui en 2<sup>e</sup> et 3<sup>e</sup> — Verstappen a quatre fois gagné à Austin et connaît la montée abrupte du virage 1 mieux que quiconque sur cette grille, et Hadjar lui offre une seconde option d'attaque dès le départ. C'est là que se niche la vraie tension de ce week-end entre la grille et le rythme réel : le relais long le plus propre et le plus comparable de tout le week-end — celui de l'EL2, à charge de carburant réaliste — plaçait Verstappen, Leclerc et Norris dans un mouchoir de 0,07s, avec Antonelli nettement moins bon (1:41,704, contre 1:41,481 pour Verstappen) malgré sa domination sur un tour en Q3. Si ce rythme de course tient la route dimanche, la pole d'Antonelli pourrait valoir moins qu'elle ne le laisse penser face à des Red Bull directement à ses trousses.</p>
    <p>Côté stratégie, F1-Fansite.com évoque un scénario à deux arrêts comme le plus probable, sans exclure un pari à un seul arrêt pour certaines écuries — une incertitude qui pourrait peser autant que le premier freinage. Les pénalités de Bortoleto et Colapinto, enfin, envoient en fond de grille deux pilotes pourtant qualifiés dans le top 15 sur un tour : si leur rythme de course s'avère proche de celui affiché en Q2, l'un comme l'autre pourrait grappiller plusieurs places dès les premiers relais.</p>
    <div class="callout">Rappel de méthode : la grille ci-dessus reste provisoire selon sa propre source (F1-Fansite.com), en attente de la publication officielle Formula1.com — non disponible au moment de la rédaction. Le chiffre exact de la pénalité de Bortoleto (60 ou 80 places selon la source) reste lui aussi non tranché ; les deux sources s'accordent toutefois sur l'effet pratique (dernière position) retenu pour le tableau ci-dessus.</div>
  </div>
</section>

<section class="block" id="sec-q-8">
  <details class="sources">
    <summary>Sources utilisées — Qualifications Austin (3 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py --session "Qualifying"), classement brut/secteurs/relais, primaire. Base du calcul de pole théorique (section 04) et du constat Antonelli/Russell sur pneu medium en Q1.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1297/united-states/qualifying" data-desc="Classement officiel par phase Q1/Q2/Q3, concorde exactement avec Grandprix.com.">Formula1.com — résultats officiels qualifications</a><span class="desc">Formula1.com</span></li>
        <li><span class="desc">Formula1.com — page « Starting Grid » du Grand Prix, fetchée directement : renvoie "Error — No results available" au moment de la rédaction (grille pas encore publiée côté F1.com) — limite de sourcing documentée explicitement, voir commentaire en tête de fichier.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Recoupement, narratif et grille de départ</h5>
      <ul>
        <li><a href="https://www.grandprix.com/races/united-states-gp-2026-qualifying-report.html" data-desc="Déroulé complet Q1/Q2/Q3, détail des tours supprimés (Verstappen/Hadjar/Norris au virage 19), pénalités moteur de Bortoleto/Colapinto et rappel de celle de Lindblad. Chiffre la pénalité de Bortoleto à 80 places (écart avec F1-Fansite.com, signalé en section 05). Lu intégralement via fetch-url.yml.">Grandprix.com — rapport qualifications</a><span class="desc">Grandprix.com, 24 oct. 2026</span></li>
        <li><a href="https://www.f1-fansite.com/f1-result/starting-grid-2026-united-states-formula-1-grand-prix/" data-desc="Grille de départ provisoire avec détail composant par composant des pénalités moteur (Bortoleto : 60 places ; Colapinto : 10 places pour 4e CE), explicitement qualifiée de provisoire par la source elle-même. Lu intégralement via fetch-url.yml.">F1-Fansite.com — grille de départ 2026 GP des États-Unis</a><span class="desc">F1-Fansite.com (Leopold Pleijsier), 24-25 oct. 2026</span></li>
      </ul>
    </div>
  </details>
</section>
`;
