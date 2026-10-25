// Analyse EL3 — Grand Prix des États-Unis (Austin, COTA), round 18, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py
// (session_key 11391, 2026-10-24 17:30->18:30 UTC). Analyse technique quantifiée :
// requête dédiée sur practice_laps/practice_stints (scripts/
// practice_briefing_laptimes_by_car.py) pour Leclerc, Hamilton, Verstappen,
// Antonelli, Russell, Norris, Piastri, Hadjar, Hulkenberg et Gasly — même
// méthode que les rounds précédents (tours d'entrée/sortie de stand et tours
// anormaux exclus avant toute moyenne de relais). Constat honnête qui ressort
// de cette requête et documenté en section 03 : contrairement aux EL1/EL2 de ce
// round, la plupart des pilotes de tête n'ont PAS fait de vrai relais long en
// EL3 (programme dominé par des tours isolés à faible charge, cohérent avec une
// dernière séance axée réglages/qualification plutôt que rythme de course) —
// seul le relais de Gasly (pneu medium, tours 7 à 17) constitue un relais long
// propre et continu dans l'échantillon demandé ; aucune comparaison de rythme
// de course multi-équipes n'a donc été inventée pour combler ce manque.
//
// Classement officiel et tours supprimés confirmés par recoupement de trois
// sources concordantes : le classement officiel Formula1.com
// (formula1.com/en/results/2026/races/1297/united-states/practice/3, fetché en
// primaire), le rapport Grandprix.com daté du 24 octobre 2026 ("Practice 3
// Report - Hamilton completes Ferrari practice sweep", lu intégralement) et —
// recoupement le plus solide — la base de données du projet elle-même : le
// meilleur tour BRUT enregistré en base pour Leclerc (94.810), Antonelli
// (95.015) et Norris (95.244) concorde à la milliseconde exacte avec les trois
// tours que Grandprix.com décrit comme supprimés pour limites de piste
// (virage 10 pour Leclerc et Norris, virage 9 pour Antonelli) — la même
// réserve méthodologique déjà documentée pour Verstappen/virage 19 en EL1 de ce
// round s'applique ici trois fois de plus, sur un total de trois virages
// différents (9, 10, et toujours 19 — cf. qualifications le même jour). Le
// classement officiel ci-dessous est donc bien le classement POST-suppressions.
//
// Analyse technique : continuité directe du dossier plancher Ferrari déjà
// sourcé pour les EL1/EL2 de ce round (voir le commentaire de sourcing de
// el1-fr.js pour le détail complet des sources techniques cherchées/trouvées/
// écartées sur ce point précis, non répété ici). Nouvel apport propre à cette
// passe EL3, lu intégralement via fetch-url.yml avant usage :
// - Grandprix.com, « Ferrari, McLaren and Red Bull lead Austin upgrade push »
//   (24 oct. 2026) : détail officiel FIA des pièces déclarées pour ce Grand
//   Prix — plancher (corps, planche, diffuseur) ET carrosserie sidepod/zone
//   coke-bottle pour Ferrari ; coins avant/arrière et diffuseur pour McLaren ;
//   volet d'extrados d'aileron arrière optionnel (option circuit-spécifique)
//   et soufflet de suspension avant (fiabilité, pas performance) pour Red
//   Bull ; confirme aussi, via le directeur sportif Audi Allan McNish, que
//   Bortoleto a roulé en EL1 avec une spécification de plancher plus récente
//   que celle d'Hulkenberg, l'écart de données/chrono observé ayant convaincu
//   l'équipe de basculer les deux voitures sur la nouvelle pièce pour l'EL2 —
//   évaluation interne de l'équipe, présentée comme telle, pas une mesure
//   indépendante.
// - Vitesses de pointe (speed_st, practice_laps) : comparaison calculée sur les
//   tours propres (hors tour de sortie de stand et tours aberrants) des dix
//   pilotes interrogés — Ferrari et Mercedes atteignent toutes deux 328 km/h
//   de pointe en EL3, McLaren jusqu'à 329 km/h, contre un maximum de 322 km/h
//   relevé chez les deux Red Bull sur la même séance. Cohérent avec l'objectif
//   de réduction de traînée déjà documenté pour le paquet Ferrari (The Race,
//   Crash.net, cf. sourcing EL1/EL2) : ce n'est pas une preuve isolée du gain
//   du plancher (effet d'aspiration non contrôlé sur un relais de practice),
//   mais un premier indice chiffré, sur piste, cohérent avec le narratif déjà
//   établi plutôt qu'un fait nouveau non recoupé.
// - Recherches avec effort réel mais sans résultat exploitable pour cette
//   séance précise, retentées cette passe (documenté honnêtement, pas
//   masqué) : The Race et Crash.net n'ont publié, dans ce qui a pu être
//   trouvé, aucun article dédié à cette EL3 spécifique (au-delà de l'article
//   plancher déjà cité pour EL1/EL2) ; Craig Scarborough/ScarbsTech, Matthew
//   Somerfield/SomersF1, la chronique Gary Anderson (The Race), RaceFans.net
//   et les illustrations Giorgio Piola n'ont renvoyé aucun résultat propre à
//   ce week-end lors d'une nouvelle recherche ciblée ; r/F1Technical a été
//   retenté spécifiquement pour cette passe (sujet plus technique — limites
//   de piste multi-virages, pénalités moteur — jugé plus prometteur pour cette
//   communauté par l'utilisateur) mais la recherche n'a renvoyé aucun fil daté
//   de ce week-end, ni via l'API de recherche Reddit (de nouveau en échec
//   depuis le runner) ni via une recherche web générale.
export const ROUND18_EL3_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix des États-Unis · Austin (COTA) · EL3 — samedi 24 octobre</p>
    <p class="verdict">Hamilton boucle le triplé Ferrari du week-end, mais le tour le plus rapide de la séance — un 1:34,810 de Leclerc — est supprimé pour limites de piste au virage 10 : la troisième suppression de ce type en trois séances pour Ferrari et consorts, cette fois sur un virage différent de celui qui avait piégé Verstappen en EL1.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">1:34,893</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,168s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,234s*</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,303s*</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,488s</span></div>
    </div>
    <p class="subverdict">Dernière heure avant les qualifications, et Ferrari referme le week-end comme elle l'avait ouvert : en tête des trois séances d'essais, Hamilton cette fois plutôt que Leclerc. Mais le détail compte plus que jamais à quelques heures de la Q3 — le tour le plus rapide de l'heure est supprimé pour Leclerc (virage 10), tout comme ceux d'Antonelli (virage 9) et de Norris (virage 10) plus loin dans la feuille de temps : trois limites de piste de plus, sur deux virages différents de celui qui avait piégé Verstappen vendredi, sur un circuit où la marge d'erreur continue de se payer cash. En coulisses, la direction de course a ouvert trois enquêtes (un incident de voie des stands entre Hülkenberg et Stroll, un possible gêne de Bortoleto sur Hamilton au virage 12, une conduite jugée erratique de Hadjar au virage 1) et Audi a confirmé avoir roulé avec deux spécifications de plancher différentes entre Bortoleto et Hülkenberg avant de basculer les deux voitures sur la plus récente.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el3-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Ferrari devant pour la troisième fois — mais trois tours supprimés sur trois virages</h2>
    <p>La hiérarchie officielle, une fois les suppressions appliquées, reste ultra-compacte en tête : Hamilton 1:34,893, Verstappen à 0,168s, Leclerc à 0,234s, Antonelli à 0,303s, Russell à 0,488s — moins d'un demi-point de seconde pour cinq voitures de trois écuries différentes. Mais le classement officiel masque une donnée plus brute : Leclerc a réellement signé le tour le plus rapide de la séance, un 1:34,810 qui aurait battu Hamilton de 0,083s, supprimé pour une sortie de piste au virage 10. Même sort pour Antonelli, dont le 1:35,015 (qui l'aurait classé 3<sup>e</sup>) est retombé à 1:35,196 après suppression au virage 9 ; et pour Norris, dont le 1:35,244 (qui l'aurait classé 5<sup>e</sup>) retombe à 1:35,706 après suppression au virage 10 — le laissant finalement 8<sup>e</sup>. Trois suppressions, deux virages différents (9 et 10, dans l'enchaînement rapide des Esses), à ajouter à celle de Verstappen au virage 19 en EL1 : sur ce circuit et ce week-end précis, les limites de piste ne se concentrent pas sur un seul point délicat mais sur plusieurs zones distinctes du tracé.</p>
    <p>Hamilton n'a d'ailleurs laissé que peu de marge sur la table : ses trois meilleurs secteurs personnels de la séance, additionnés, donnent 1:34,866 — seulement 0,027s plus rapide que son tour qui compte. Le temps théorique optimal toutes voitures confondues (meilleur secteur 1 de Verstappen 25,423, meilleur secteur 2 de Hamilton 37,550, meilleur secteur 3 de Leclerc 31,402) s'établit à 1:34,375, soit 0,518s sous la référence officielle — un écart plus large qu'en EL1/EL2, cohérent avec une séance plus perturbée par les suppressions et moins homogène sur l'ensemble du plateau.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el3-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Vitesse de pointe : un indice chiffré pour la thèse de la traînée réduite</h2>
    <p>Le dossier plancher Ferrari, déjà documenté en détail pour les EL1/EL2 de ce round (révision avant→diffuseur, objectif explicite de réduction de traînée pour compenser un déficit de puissance moteur, solution « waterslides » façon Red Bull étudiée puis écartée), trouve ici un premier indice chiffré directement sur piste. En comparant la vitesse de pointe maximale relevée sur un tour propre (hors tour de sortie des stands et tours anormalement lents) pour les pilotes de tête :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Écurie</th><th>Vitesse de pointe max. (tour propre)</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>329 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>329 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>328 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>328 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>325 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>327 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>324 km/h<em> (sur le tour supprimé)</em></td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>322 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>322 km/h</td></tr>
      </tbody>
    </table>
  </div>
  <div class="prose">
    <p>Les deux Ferrari et les deux Mercedes atteignent 324 à 328 km/h en pointe, McLaren culmine à 329 km/h — contre un plafond de seulement 322 km/h relevé chez les deux Red Bull sur cette même séance. Rien ne permet d'isoler ici l'effet pur du plancher de l'effet d'aspiration (ces chronos ne sont pas tous pris sur un tour sans trafic), mais le constat va dans le sens de ce que The Race et Crash.net décrivaient sur la base des déclarations d'équipe : une SF-26 qui cherche sa compétitivité sur la ligne droite moins par la puissance pure — toujours jugée inférieure à celle de Mercedes et Red Bull — que par une traînée réduite. Red Bull, à l'inverse, plafonne ici nettement plus bas qu'en EL1 (où Verstappen avait pourtant signé le tour le plus rapide, depuis supprimé) — un signal à surveiller en qualifications plutôt qu'une conclusion déjà écrite.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el3-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Pas de vrai relais long cette fois — sauf chez Gasly</h2>
    <p>Contrairement aux EL1/EL2 de ce round, la requête dédiée sur les relais des dix pilotes interrogés (Ferrari, Red Bull, Mercedes, McLaren, Hülkenberg, Gasly) ne fait apparaître quasiment aucun relais long continu comparable à charge de carburant réaliste : la plupart des tours s'enchaînent en allers-retours courts (tour de sortie, un ou deux tours chronométrés, retour au stand), signe d'un programme axé sur les réglages et la préparation des qualifications plutôt que sur le rythme de course pur — cohérent avec le format d'une EL3 de samedi matin. La seule exception nette dans l'échantillon demandé : Pierre Gasly, qui a enchaîné onze tours consécutifs sur un train de pneus medium (tours 7 à 17), avec un rythme glissant de 1:40,4 en début de relais à 1:41,8 en fin — une dégradation modeste d'environ 1,4s sur l'ensemble du relais, sans signal alarmant pour Alpine. Faute d'un relais comparable chez les autres écuries lors de cette séance précise, aucune comparaison de rythme de course inter-équipes n'est présentée ici — un vrai manque de données plutôt qu'une conclusion maquillée.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el3-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Trois enquêtes ouvertes, et Audi confirme deux spécifications de plancher en parallèle</h2>
    <p>La direction de course a renvoyé trois incidents aux commissaires après le drapeau à damier : un accrochage en voie des stands entre Hülkenberg et Stroll, une possible gêne de Bortoleto sur Hamilton au virage 12, et une conduite jugée erratique de Hadjar au virage 1 en fin de séance — aucune décision n'avait encore été communiquée au moment de la rédaction. Par ailleurs, la liste officielle des pièces aérodynamiques déclarées à la FIA pour ce Grand Prix confirme que Ferrari, McLaren et Red Bull ne sont pas les seuls à évoluer ce week-end : Red Bull a elle-même déclaré un volet d'extrados d'aileron arrière optionnel (une option circuit-spécifique) et un nouveau soufflet de suspension avant, ce dernier explicitement présenté comme une mesure de fiabilité plutôt que de performance — un détail qui tempère la lecture purement aérodynamique de l'écart Ferrari/Red Bull en vitesse de pointe ci-dessus. Chez Audi, le directeur sportif Allan McNish a confirmé que Bortoleto avait roulé en EL1 avec une spécification de plancher plus récente que celle d'Hülkenberg : l'écart de données et de chrono observé a convaincu l'équipe de basculer les deux voitures sur la nouvelle pièce dès l'EL2 — une évaluation interne de l'équipe, présentée comme telle plutôt que comme un gain mesuré de façon indépendante.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-el3-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Classement complet EL3 (officiel, après suppressions)</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:34,893</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:35,061</td><td>+0,168s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:35,127</td><td>+0,234s (tour le plus rapide, 1:34,810, supprimé pour limites de piste au virage 10)</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:35,196</td><td>+0,303s (tour à 1:35,015 supprimé au virage 9)</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:35,381</td><td>+0,488s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:35,531</td><td>+0,638s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>1:35,591</td><td>+0,698s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:35,706</td><td>+0,813s (tour à 1:35,244 supprimé au virage 10)</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:35,904</td><td>+1,011s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:35,930</td><td>+1,037s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:35,931</td><td>+1,038s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:36,081</td><td>+1,188s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:36,176</td><td>+1,283s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:36,235</td><td>+1,342s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:36,251</td><td>+1,358s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:36,455</td><td>+1,562s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:36,742</td><td>+1,849s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:37,131</td><td>+2,238s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:37,668</td><td>+2,775s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:37,711</td><td>+2,818s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>1:37,884</td><td>+2,991s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:38,765</td><td>+3,872s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el3-6">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en qualifications</h2>
    <p>Sur les trois séances d'essais du week-end, Ferrari a signé le meilleur temps officiel chaque fois (Leclerc en EL1 et EL2, Hamilton en EL3) — une série parfaite qui, si elle se confirmait samedi, devrait logiquement déboucher sur la première pole position de la saison pour la Scuderia. Mais le fil rouge des trois séances dit aussi l'inverse : l'écart de Ferrari sur Red Bull et Mercedes n'a cessé de se resserrer d'une session à l'autre (0,084s puis 0,042s en EL1/EL2 côté Red Bull avant même la bascule de tête en EL3), et le tour réellement le plus rapide de cette EL3 — supprimé — appartenait à Leclerc, pas à Hamilton. Antonelli et Verstappen restent les deux menaces les plus crédibles pour priver Ferrari d'une pole qu'elle n'a jamais décrochée cette saison 2026 : Antonelli a topé l'EL2, Verstappen n'a jamais quitté le trio de tête des trois séances, et les deux Mercedes/Red Bull abordent samedi avec un rythme en vitesse de pointe très proche des Ferrari sur cette dernière heure. Sur gomme tendre à faible charge, l'écart devrait se jouer à quelques centièmes plutôt qu'à quelques dixièmes.</p>
    <div class="callout">Rappel de méthode : les trois tours les plus rapides retirés de cette séance (Leclerc, Antonelli, Norris) ne changent rien au classement officiel ci-dessus, mais rappellent que le véritable potentiel sur un tour reste, comme en EL1, supérieur à ce que le tableau des temps affiche — un facteur à surveiller directement en qualifications, où la même règle s'applique sans filet.</div>
  </div>
</section>

<section class="block" id="sec-el3-7">
  <details class="sources">
    <summary>Sources utilisées — EL3 Austin (2 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
        <li><span class="desc">The Pit Wall — requête dédiée tours bruts par voiture (scripts/practice_briefing_laptimes_by_car.py) : base de la comparaison de vitesses de pointe (section 02) et du constat d'absence de relais long comparable (section 03).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1297/united-states/practice/3" data-desc="Classement officiel post-suppressions, confirmé par recoupement avec Grandprix.com et la base du projet.">Formula1.com — résultats officiels EL3</a><span class="desc">Formula1.com</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Recoupement, narratif et technique</h5>
      <ul>
        <li><a href="https://www.grandprix.com/races/united-states-gp-2026-practice-3-report.html" data-desc="Déroulé complet, détail des trois tours supprimés (Leclerc T10, Antonelli T9, Norris T10), enquêtes ouvertes (Hülkenberg/Stroll, Bortoleto/Hamilton, Hadjar), contexte météo. Concorde à la milliseconde avec les tours bruts de la base du projet pour les trois suppressions. Lu intégralement via fetch-url.yml.">Grandprix.com — rapport EL3</a><span class="desc">Grandprix.com, 24 oct. 2026</span></li>
        <li><a href="https://www.grandprix.com/races/ferrari-mclaren-and-red-bull-lead-austin-upgrade-push.html" data-desc="Détail officiel FIA des pièces déclarées par équipe pour ce Grand Prix (plancher/sidepods Ferrari, coins/diffuseur McLaren, volet d'aileron optionnel + soufflet de suspension Red Bull), citation d'Allan McNish (Audi) sur le test A/B de plancher Bortoleto/Hülkenberg. Lu intégralement via fetch-url.yml.">Grandprix.com — Ferrari, McLaren et Red Bull mènent la course aux évolutions à Austin</a><span class="desc">Grandprix.com, 24 oct. 2026</span></li>
      </ul>
    </div>
  </details>
</section>
`;
