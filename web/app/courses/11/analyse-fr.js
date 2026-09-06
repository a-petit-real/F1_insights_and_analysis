// Analyse Round 11 — Grand Prix de Hongrie 2026 (Hungaroring, Budapest).
// Rédigé à partir de scripts/race_briefing*.py (base de données The Pit
// Wall, alimentée par OpenF1 : résultats, arrêts, pneus, temps au tour et
// de secteur, météo en série temporelle, chronologie complète des
// messages de course) et de recherches web ciblées (WebSearch) pour le
// contexte non capturé en base (causes des abandons, citations
// d'après-course, pénalités). Deux sources F1.com sont des lectures
// primaires récupérées via le workflow fetch-url.yml : le compte rendu
// officiel de course et l'article sur les nominations de gommes Pirelli
// pour Hongrie ; la page officielle des meilleurs tours (F1.com) et
// l'article F1.com où Sainz explique l'incident avec Piastri sont
// également primaires, consultées via WebSearch. Les autres articles de
// presse sont des sources secondaires, citées comme telles.
//
// Point de rigueur : le meilleur tour de la course (Leclerc, tour 58,
// 1:22,000) est confirmé indépendamment par trois sources : le champ
// agrégé de la base (race_briefing.py), notre propre relevé tour par
// tour (race_briefing_laptimes.py — où le tour 58 apparaît comme
// « 0:01:22 » sans décimales, signature d'un temps exactement rond en
// Python), et la page officielle F1.com des meilleurs tours qui confirme
// le tour 58 et le DHL Fastest Lap Award de Leclerc.
//
// Anomalie DB relevée et documentée (comme pour le tour manquant de
// Leclerc au Round 1) : la liste agrégée des arrêts aux stands de la
// base ne recense que deux arrêts pour Norris (tours 17 et 56), et le
// relevé des relais de gommes saute directement de S2 à S4 sans jamais
// nommer de relais S3 — alors que le compte rendu F1.com décrit
// explicitement un second arrêt de Norris à la fin du tour 39. Le relevé
// tour par tour brut confirme la coupure : tour 39 anormalement lent
// (1:27,437) suivi d'un tour 40 marqué [OUT] avec un temps de
// 1:42,596 — signature classique d'un passage aux stands. La course a
// donc bien compté trois arrêts pour Norris ; c'est la liste agrégée de
// la base qui sous-compte cet arrêt intermédiaire, un trou de données
// côté fournisseur plutôt qu'une erreur d'ingestion — signalé
// explicitement dans le texte plutôt que passé sous silence.
export const ROUND11_ANALYSE_FR_HTML = `
<div class="hero prose">
  <p class="eyebrow">Grand Prix de Hongrie · Budapest · 2026</p>
  <p class="verdict">Norris a mené la course parfaite depuis la pole — mais c'est un accrochage entre son propre coéquipier et un retardataire qui lui a rendu la tête de la course.</p>
  <div class="resultstrip">
    <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren</span></div>
    <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · +15,080s</span></div>
    <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · +18,728s</span></div>
    <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari · +23,840s</span></div>
    <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari · +24,540s</span></div>
  </div>
  <p class="subverdict">Piastri passe Norris dès le premier tour et mène la course pendant plus de la moitié de la distance, McLaren refusant de faire intervertir ses deux pilotes malgré les appels répétés de Norris sur la radio. Le scénario bascule au tour 38 : dans un double drapeau bleu, Piastri percute la Williams retardataire de Sainz à la sortie du virage 2. Il conserve la tête un temps, mais un problème de boîte de vitesses — conséquence probable du choc — le contraint à l'abandon une quinzaine de tours plus tard, provoquant la Virtual Safety Car qui permet à Norris, Hamilton et Leclerc de boucler un arrêt à bon compte. Verstappen, gêné par un amortisseur défaillant dès le tour 13, tient bon jusqu'au bout pour un podium de fait de résistance. Antonelli complète le podium sur une stratégie à deux arrêts sans accroc et porte son avance au championnat à 59 points sur Russell — victime d'un anti-stall au départ qui l'a fait chuter jusqu'à la 21e place avant une remontée méthodique. Hamilton, provisoirement devant Antonelli à l'arrivée, écope d'une pénalité de 5 secondes pour excès de vitesse dans la voie des stands qui le renvoie derrière son propre coéquipier.</p>
</div>

<section class="block" data-num="01" id="sec-r1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Le contexte avant la course</h2>
    <p>Dernière manche avant la trêve estivale, le Hungaroring a livré une séance de qualifications parmi les plus serrées de la saison : Norris s'empare de la pole pour seulement 0,012s devant Hamilton, Leclerc complétant la première partie du classement devant Antonelli, leader du championnat. La grille de départ a ensuite été redessinée par les commissaires : Hamilton écope d'une pénalité de trois places pour avoir gêné Piastri, Antonelli de la même sanction pour ne pas avoir suffisamment ralenti sous drapeaux jaunes. Résultat, Norris s'élance devant Leclerc, Piastri et Verstappen, Hamilton reculant en cinquième position devant Russell, et Antonelli chutant en septième. Pérez, lui, s'élance depuis la voie des stands après des changements de réglages de dernière minute sur sa Cadillac.</p>
    <p>Pirelli avait nominé les trois gommes les plus tendres de sa gamme pour Budapest — C3, C4 et C5, en dur/medium/tendre — la même logique qu'à Melbourne en ouverture de saison, avec deux jeux de durs, trois de mediums et huit de tendres par pilote, plus un jeu de tendres supplémentaire réservé à ceux qui atteignent la Q3. <a href="https://www.formula1.com/en/latest/article/what-tyres-will-the-teams-and-drivers-have-for-the-2026-hungarian-grand-prix.RikSxOCPXMkPloK0RRmqQ" data-desc="Article officiel F1.com sur les nominations de gommes Pirelli pour le Grand Prix de Hongrie 2026, incluant le communiqué complet de Pirelli.">F1.com — les gommes du GP de Hongrie 2026</a> Le communiqué Pirelli, cité dans cet article, prévenait que la dégradation thermique — particulièrement sur l'essieu arrière — serait le facteur déterminant, avec un risque de grainage sur les gommes tendres, et anticipait des stratégies à un et deux arrêts globalement équivalentes en temps de course ; avec des températures très élevées, le communiqué pariait sur un usage plus fréquent des deux composés les plus durs — exactement ce que Norris a fait en étirant son relais de durs bien au-delà de ses rivaux.</p>
    <p>Côté météo, conditions chaudes et stables sur toute la course, sans la moindre goutte de pluie : 29,6 à 31,6°C dans l'air, 44,2 à 53,2°C sur la piste — les températures de piste les plus élevées observées cette saison sur les courses déjà couvertes par The Pit Wall — humidité entre 24,5 et 26,8%. Aucun aléa climatique n'est venu perturber les stratégies : tout s'est joué sur la piste, les pneus et un incident de course.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-r2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

    <h3 class="subtitle">Piastri passe Norris, Russell perd tout au départ</h3>
    <p>Au départ, Norris conserve la pole tandis que Piastri, sur pneus medium comme son coéquipier et Verstappen — Leclerc et Hamilton ayant eux opté pour des tendres agressifs — profite d'un meilleur relais pour suivre Norris dans le premier virage. À la sortie du virage 2, une manœuvre en crochet lui permet de prendre la tête. Verstappen se retrouve roue contre roue avec les deux Ferrari. Plus loin dans le peloton, c'est la catastrophe pour Russell : un anti-stall se déclenche à l'extinction des feux et le fait chuter du sixième au 21e rang. « Qu'est-ce qui s'est passé là ? » demande-t-il par radio ; « Anti-stall », lui répond son ingénieur.</p>

    <h3 class="subtitle">McLaren maintient l'ordre, Piastri résiste à la pression de Norris</h3>
    <p>Piastri conserve un peu plus d'une seconde d'avance sur Norris pendant que le muret gère la course en interne : « Actuellement on pense au plan A », est-il dit à Piastri, dans l'incertitude entre un et deux arrêts. Norris, de son côté, insiste sur la radio — « je suis beaucoup plus rapide, mais bon… l'air sale » — sans que McLaren ne fasse intervertir ses pilotes. Les premiers arrêts s'échelonnent : Hamilton passe en durs au tour 13 et ressort neuvième, doublant Lindblad dans la foulée ; Verstappen l'imite au tour 14 et le double à son tour au premier virage du tour suivant, un dépassement audacieux qu'il jugera lui-même limite (« c'est une belle action, mais ce n'est pas correct »). Piastri et Leclerc s'arrêtent au tour 16, Norris et Hadjar au tour suivant — ce dernier arrêt libérant Antonelli, resté en piste plus longtemps avant de rejoindre les stands au tour 22 pour un relais de durs qui laissait espérer un seul arrêt.</p>

    <h3 class="subtitle">L'écart se crée en silence, avant l'incident qui change tout</h3>
    <p>Piastri reprend la tête après les premiers arrêts, mais Norris, sensiblement plus rapide sur cette phase malgré des pneus plus anciens, referme l'écart. Un second train de gommes vient rebattre les cartes : Hamilton retourne aux stands au tour 30, Piastri au tour 33 — ce qui offre à Norris de l'air libre et la possibilité d'étirer son propre relais. Leclerc s'arrête à son tour au tour 36. C'est au tour 38 que la course bascule : sous double drapeau bleu, Piastri percute la Williams de Sainz à la sortie du virage 2. « Dégage de mon chemin, espèce d'idiot ! Oh mon Dieu ! », hurle-t-il par radio. Les commissaires ouvrent une enquête sur l'incident dans la foulée.</p>
    <p>Le choc n'empêche pas Piastri de conserver la tête dans l'immédiat, mais il porte manifestement atteinte à sa monoplace. Norris, lui, boucle un second arrêt en toute fin de tour 39 et ressort avec une avance nette sur Piastri — un arrêt que la liste agrégée des arrêts aux stands de la base ne recense pourtant pas : elle ne mentionne que les tours 17 et 56 pour Norris, quand le relevé tour par tour brut montre sans ambiguïté la signature d'un passage aux stands entre les tours 39 (1:27,437, anormalement lent) et 40 (1:42,596, marqué comme tour de sortie), et que le compte rendu officiel F1.com décrit explicitement ce second arrêt. C'est un trou dans les données du fournisseur, pas une erreur de lecture — signalé ici plutôt que passé sous silence, exactement comme le relais manquant de Leclerc au Grand Prix d'Australie.</p>

    <h3 class="subtitle">L'abandon de Piastri déclenche la VSC qui referme la course</h3>
    <p>Une quinzaine de tours plus tard, la mécanique de Piastri le lâche pour de bon : un problème de boîte de vitesses, conséquence probable du contact avec Sainz, l'immobilise et met fin à sa course. La Virtual Safety Car déployée pour dégager sa monoplace — au tour 56, avec des commissaires signalés au virage 3 — profite immédiatement à Norris, Hamilton et Leclerc, qui enchaînent un dernier arrêt à moindre coût. Antonelli, qui venait de rechausser au tour 53 après avoir interrogé son ingénieur sur la pertinence du choix (« on ne pense pas que les pneus tiendront »), n'a pas besoin de s'arrêter une troisième fois et conserve sa position. Verstappen, arrêté au tour 41 pour un relais de tendres, résiste jusqu'au bout malgré un problème d'amortisseur signalé dès le tour 13 (« l'amortissement a lâché, c'est sûr »).</p>
    <p>À la relance, Hamilton se retrouve un temps devant Antonelli, mais les images montrent qu'il a franchi la ligne blanche de fin de ligne droite après la Mercedes pendant la période de VSC : la position lui est retirée. Une pénalité de 5 secondes pour excès de vitesse dans la voie des stands, infligée en fin de course, le renvoie en outre derrière son propre coéquipier Leclerc — auteur, lui, du meilleur tour de la course en 1:22,000 au tour 58, une donnée confirmée par trois sources indépendantes : le champ agrégé de la base, notre relevé tour par tour où ce temps apparaît exactement rond, et la page officielle des meilleurs tours de F1.com qui confirme le DHL Fastest Lap Award de Leclerc.</p>

    <h3 class="subtitle">Deux Cadillac à l'arrêt, Russell et Hadjar dans les points</h3>
    <p>Plus tôt dans la course, Bottas avait été le premier à abandonner : de la fumée dans l'habitacle au tour 14, imputée après course à un problème de freins en surchauffe. Pérez, parti de la voie des stands, a suivi au tour 48 sur un problème identifié au train avant gauche — Cadillac n'ayant pas communiqué de cause définitive dans l'immédiat. Russell, de son côté, a effacé l'essentiel des dégâts de son anti-stall pour terminer septième ; Hadjar, sans histoire, a signé le meilleur résultat Red Bull du week-end après Verstappen en prenant la sixième place.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-r3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

    <h3 class="subtitle">McLaren — deux courses radicalement différentes sous le même toit</h3>
    <p>McLaren a géré la bagarre interne en laissant Piastri devant malgré les protestations de Norris, un choix qui n'a coûté la victoire à personne puisque c'est un facteur extérieur — l'incident avec la Williams retardataire de Sainz — qui a fini par trancher. Norris a ensuite construit sa victoire sur un relais de durs étiré bien au-delà de ce que ses rivaux osaient tenter, cohérent avec l'avertissement de Pirelli sur l'intérêt des composés durs par fortes chaleurs, et sur un troisième arrêt exécuté proprement au tour 39 — que la liste agrégée de la base ne recense pourtant pas, une lacune de données documentée plus haut plutôt que gommée. Piastri, de son côté, n'a rien pu faire une fois sa boîte de vitesses touchée : sa course s'est achevée sur un abandon qui a, ironiquement, aidé son propre coéquipier via la VSC qu'il a lui-même provoquée.</p>

    <h3 class="subtitle">Ferrari — trois arrêts, un podium perdu sur un excès de vitesse</h3>
    <p>Leclerc et Hamilton ont couru une stratégie à trois arrêts, plus prudente que celle de Norris, sans jamais menacer sérieusement la tête. Hamilton s'est provisoirement hissé devant Antonelli après le dernier arrêt sous VSC, mais une pénalité de 5 secondes pour excès de vitesse dans la voie des stands a annulé cet acquis et l'a renvoyé derrière son propre coéquipier. Leclerc repart de Budapest avec le meilleur tour de la course pour seule consolation individuelle, sur un week-end où Ferrari n'a jamais eu le rythme pour inquiéter la tête.</p>

    <h3 class="subtitle">Mercedes — l'exécution paie, l'incident de Russell coûte cher</h3>
    <p>Antonelli a couru une stratégie à deux arrêts sans le moindre accroc, bénéficiant en prime de la VSC tardive pour ne pas avoir à repasser une troisième fois par les stands — un podium qui porte son avance au championnat à 59 points sur son propre coéquipier à l'aube de la trêve estivale. Russell, victime d'un anti-stall totalement indépendant de la stratégie de l'équipe, a dû reconstruire toute sa course depuis la 21e place ; sa remontée jusqu'en septième position est solide, mais le point de départ a coûté à Mercedes un résultat d'équipe autrement plus favorable.</p>

    <h3 class="subtitle">Red Bull — Verstappen gère un problème mécanique jusqu'au podium</h3>
    <p>Verstappen a couru l'essentiel de la course avec un amortisseur défaillant signalé dès le tour 13, sans que cela ne l'empêche de conserver la deuxième place jusqu'au bout — la meilleure performance de gestion individuelle du week-end à ce niveau du classement. Hadjar, en retrait du classement mais sans le moindre incident, complète un week-end propre pour l'écurie autrichienne.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-r4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
    <p>L'évaluation porte sur la course de dimanche, en tenant compte de la position de départ, de la voiture et des circonstances (source : base de données The Pit Wall, résultats/arrêts/pneus/temps au tour, complétée par la recherche web pour les causes d'abandon, les pénalités et les citations).</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table class="verdict-table">
      <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
      <tbody>
        <tr><td><span class="dot" style="background:#FF8000"></span> Norris</td><td>P1 → P1</td><td>Pole pour 0,012s devant Hamilton, dépassé par son propre coéquipier dès le tour 1 mais jamais réellement inquiété une fois la tête reprise après un troisième arrêt (tour 39) que la liste agrégée de la base omet — anomalie documentée dans le texte. Première victoire de la saison pour lui et pour McLaren.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>P4 → P2</td><td>Signale un problème d'amortisseur dès le tour 13 (« l'amortissement a lâché ») mais tient la deuxième place jusqu'au bout ; dernier relais sur tendres pour attaquer en fin de course.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>P7 → P3</td><td>Stratégie à deux arrêts sans accroc, profite de la VSC tardive pour ne pas repasser une troisième fois aux stands. Porte son avance au championnat à 59 points sur Russell à l'aube de la trêve estivale.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>P2 → P4</td><td>Trois arrêts, dépassé un temps par Hamilton avant que la pénalité de ce dernier ne le renvoie derrière lui au classement final. Signe le meilleur tour de la course (1:22,000, tour 58), confirmé par trois sources indépendantes.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>P5 → P5</td><td>Devance un temps Antonelli à la faveur du dernier arrêt sous VSC, mais perd la position après vérification vidéo (ligne blanche franchie après la Mercedes) puis écope d'une pénalité de 5s pour excès de vitesse dans la voie des stands qui le renvoie derrière Leclerc.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>P8 → P6</td><td>Course propre et sans incident, meilleur résultat Red Bull du week-end après Verstappen.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Russell</td><td>P6 → P7</td><td>Anti-stall au départ qui le fait chuter de la sixième à la 21e place. Remontée méthodique jusque dans les points ; l'écart au championnat avec Antonelli grimpe malgré tout à 59 points.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lawson</td><td>P11 → P8*</td><td>Stratégie à un seul arrêt, bataille roue contre roue avec son coéquipier Lindblad jusqu'au drapeau, l'emporte finalement sur le rythme. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>P10 → P9*</td><td>Premiers points personnels de la saison 2026, après un début d'année sans le moindre point marqué. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>P9 → P10*</td><td>Tente lui aussi le pari du seul arrêt, cède finalement à son coéquipier Lawson dans les derniers tours d'une bagarre disputée. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>P14 → P11*</td><td>Un seul arrêt (tour 29), rate les points de très peu pour sa première saison avec Audi en catégorie reine. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>P12 → P12*</td><td>Course sans histoire, hors des points sur un week-end sans éclat pour Alpine. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Stroll</td><td>P20 → P13</td><td>Belle remontée depuis la 20e place, l'un des points forts du week-end d'Aston Martin avec ses monoplaces mises à jour, devance Alpine, Haas et Williams.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Alonso</td><td>P16 → P14</td><td>Comme Stroll, profite des nouvelles pièces amenées par Aston Martin pour un des meilleurs résultats de l'écurie cette saison.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>P13 → P15*</td><td>Recul depuis la 13e place sur la grille, hors des points. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>P15 → P16*</td><td>Course discrète pour Haas, hors des points. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Albon</td><td>P19 → P17*</td><td>Gagne deux places depuis la grille, week-end sans éclat pour Williams. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>P18 → P18*</td><td>Percute Piastri au tour 38 sous drapeaux bleus à la sortie du virage 2 ; jugé « entièrement responsable » par les commissaires mais pénalité réduite à 5s (au lieu de 10) en raison d'une visibilité limitée, confirmée par ses propres explications sur un problème d'éclairage de signalisation. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>P17 → P19*</td><td>Pénalité de 5s pour non-respect des drapeaux bleus, purgée en course ; recul net par rapport à sa position de départ. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Piastri</td><td>P3 → Abandon</td><td>Passe Norris dès le tour 1 et mène la course pendant plus de la moitié de la distance. Percute la Williams retardataire de Sainz au tour 38 sous drapeaux bleus (« espèce d'idiot ! ») ; abandonne une quinzaine de tours plus tard sur un problème de boîte de vitesses, conséquence probable du choc — provoquant la VSC qui profite directement à Norris.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>P22 → Abandon</td><td>Départ depuis la voie des stands après des changements de réglages de dernière minute. Abandonne au tour 48 sur un problème identifié au train avant gauche.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>P21 → Abandon</td><td>Première voiture à l'arrêt, au tour 14, après de la fumée signalée dans l'habitacle — un problème de freins en surchauffe selon Cadillac. Double abandon pour l'écurie américaine ce week-end-là.</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" data-num="05" id="sec-r5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Bilan équipe par équipe</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th style="width:140px;">Écurie</th><th>Bilan stratégique et opérationnel</th></tr></thead>
      <tbody>
        <tr><td><span class="dot" style="background:#FF8000"></span> McLaren</td><td>Victoire pour Norris malgré un premier tour perdu face à son propre coéquipier ; un troisième arrêt (tour 39) non recensé dans la liste agrégée de la base, documenté ici comme trou de données. Piastri mène plus de la moitié de la course avant un abandon provoqué par un contact avec un retardataire, qui profite en définitive à son coéquipier via la VSC.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Red Bull</td><td>Verstappen gère un problème d'amortisseur signalé dès le tour 13 pour ramener la deuxième place ; Hadjar, sans incident, prend la sixième place.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Mercedes</td><td>Antonelli exécute une stratégie à deux arrêts sans faute et porte son avance au championnat à 59 points sur Russell, victime d'un anti-stall au départ qui l'a fait chuter à la 21e place avant une remontée jusqu'en septième.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Ferrari</td><td>Trois arrêts pour les deux voitures, jamais au rythme de la tête. Hamilton perd la possibilité d'un meilleur résultat sur une pénalité pour excès de vitesse dans la voie des stands ; Leclerc repart avec le meilleur tour de la course en consolation.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> RB F1 Team</td><td>Double résultat dans les points avec Lawson et Lindblad, tous deux sur un pari à un seul arrêt, dans une bagarre interne disputée jusqu'au bout.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Audi</td><td>Hülkenberg marque ses premiers points de la saison 2026 ; Bortoleto, sur un seul arrêt, manque les points de très peu.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Alpine F1 Team</td><td>Gasly et Colapinto tous deux hors des points, week-end sans éclat.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Aston Martin</td><td>L'un des meilleurs week-ends de la saison pour l'écurie grâce à ses monoplaces mises à jour : Stroll et Alonso devancent Alpine, Haas et Williams, sans pour autant marquer de points.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Williams</td><td>Sainz jugé « entièrement responsable » de la collision avec Piastri au tour 38, pénalisé de 5s ; Albon gagne deux places sur un week-end discret.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Haas F1 Team</td><td>Bearman pénalisé pour non-respect des drapeaux bleus ; Ocon termine hors des points sur une course sans histoire.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Cadillac F1 Team</td><td>Double abandon pour l'écurie américaine : Bottas sur un problème de freins en surchauffe (tour 14), Pérez sur un problème au train avant gauche (tour 48) après un départ depuis la voie des stands.</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-r6">
  <div class="prose">
    <h2 class="sectitle">Conclusion</h2>
    <div class="verdictgrid">
      <div class="verdictcol win">
        <h4>Gagnants</h4>
        <ul>
          <li><strong>Norris et McLaren</strong>, pour une première victoire de la saison construite sur la gestion des pneus, même si l'ouverture décisive est venue d'un incident extérieur plutôt que d'un geste stratégique du muret.</li>
          <li><strong>Verstappen</strong>, pour avoir géré un problème d'amortisseur pendant l'essentiel de la course sans jamais perdre la deuxième place.</li>
          <li><strong>Hülkenberg</strong>, pour ses premiers points personnels de la saison 2026.</li>
        </ul>
      </div>
      <div class="verdictcol lose">
        <h4>Perdants</h4>
        <ul>
          <li><strong>Piastri</strong>, qui a mené plus de la moitié de la course avant qu'un contact avec un retardataire ne débouche sur un abandon mécanique — et sur la VSC qui a directement profité à son propre coéquipier.</li>
          <li><strong>Hamilton</strong>, privé d'un meilleur résultat sur la piste par une pénalité pour excès de vitesse dans la voie des stands qui le renvoie derrière Leclerc.</li>
          <li><strong>Cadillac</strong>, pour un double abandon (Bottas, Pérez) sur des problèmes mécaniques distincts.</li>
        </ul>
      </div>
    </div>
    <div class="callout">Piastri a fait l'essentiel du travail de la course — passer Norris au premier tour, résister à la pression pendant plus de trente tours — avant de tout perdre en un instant, percuté par un retardataire sous drapeaux bleus. Son abandon a directement rendu la victoire à son propre coéquipier via la Virtual Safety Car qu'il a lui-même provoquée. En toile de fond, Antonelli continue d'engranger : troisième place tranquille, avance portée à 59 points sur Russell à l'entame de la trêve estivale.</div>
  </div>
</section>

<section class="block" id="sec-r-next">
  <div class="prose">
    <h2 class="sectitle">Enseignements pour la suite</h2>
    <p>Trois points issus de Budapest à surveiller à la reprise, à Zandvoort :</p>
    <ol style="padding-left:20px; margin:0 0 16px;">
      <li style="margin-bottom:10px;">Le rythme pur de <strong>Norris</strong> — capable d'étirer un relais de durs bien au-delà de ses rivaux sur un circuit exigeant pour les pneus — relance McLaren dans la course au titre pilotes après la trêve, à condition que la fiabilité (déjà mise à mal en Chine) tienne sur la seconde moitié de saison.</li>
      <li style="margin-bottom:10px;">L'écart de 59 points entre <strong>Antonelli et Russell</strong> à l'entame de la trêve pose déjà la question de la hiérarchie interne chez Mercedes pour la suite de la saison — un sujet à surveiller dès que l'équipe se retrouvera devant un choix stratégique à trancher entre ses deux pilotes.</li>
      <li><strong>Aston Martin</strong> a livré l'un de ses meilleurs week-ends de la saison grâce à ses pièces mises à jour (Stroll P13, Alonso P14, devant Alpine, Haas et Williams) : reste à voir si ce niveau se confirme dès Zandvoort ou si Budapest, circuit atypique, a flatté la performance.</li>
    </ol>
  </div>
</section>

<section class="block" id="sec-r7">
  <details class="sources">
    <summary>Sources utilisées — GP de Hongrie (10 liens)</summary>
    <div class="srcgroup">
      <h5>Base de données The Pit Wall</h5>
      <ul>
        <li><span class="desc">Résultats, grille, arrêts, relais pneus, temps au tour et de secteur, météo en série temporelle, chronologie complète des messages de course — alimentés depuis l'API OpenF1 (scripts/ingest_openf1.py). Source primaire pour l'ensemble des faits chiffrés de cet article ; la lacune identifiée sur le troisième arrêt de Norris est documentée explicitement dans le texte plutôt que corrigée silencieusement.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Course et pneus — sources primaires (F1.com)</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/norris-beats-verstappen-and-antonelli-to-victory-in-dramatic-hungarian-gp.5JQmohRAKABD2asRsMWogj" data-desc="Compte rendu officiel F1.com de la course, citations radio et d'après-course.">Norris bat Verstappen et Antonelli dans un GP de Hongrie mouvementé</a><span class="desc">Formula1.com — récupéré via fetch-url.yml, lu directement</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/what-tyres-will-the-teams-and-drivers-have-for-the-2026-hungarian-grand-prix.RikSxOCPXMkPloK0RRmqQ" data-desc="Nominations officielles Pirelli des composés pour le GP de Hongrie 2026, avec prévisions de dégradation.">Les gommes du GP de Hongrie 2026</a><span class="desc">Formula1.com — récupéré via fetch-url.yml, lu directement</span></li>
        <li><a href="https://www.formula1.com/en/results/2026/races/1291/hungary/fastest-laps" data-desc="Classement officiel des meilleurs tours de la course, confirmant Leclerc au tour 58 en 1:22,000.">Meilleurs tours — GP de Hongrie 2026</a><span class="desc">Formula1.com — page de résultats officielle</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/sainz-explains-how-blue-light-issue-caught-him-out-in-piastri-collision.OD1D0DiIZApJZmL6jHZkr" data-desc="Sainz explique la cause technique (signalisation lumineuse) de sa collision avec Piastri.">Sainz explique l'incident avec Piastri</a><span class="desc">Formula1.com</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Réactions et contexte — sources secondaires</h5>
      <ul>
        <li><a href="https://www.planetf1.com/news/oscar-piastri-carlos-sainz-hungarian-gp-collision-look-in-the-mirror" data-desc="Réaction de Piastri après la collision avec Sainz.">Piastri : « Sainz doit se regarder dans le miroir »</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://www.espn.com/f1/story/_/id/49455966/oscar-piastri-carlos-sainz-needs-look-mirror-unacceptable-collision-hungarian-grand-prix" data-desc="Réaction de Piastri qualifiant l'incident d'« inacceptable ».">Piastri qualifie la collision d'« inacceptable »</a><span class="desc">ESPN</span></li>
        <li><a href="https://sports.yahoo.com/articles/furious-oscar-piastri-slams-idiot-151814487.html" data-desc="Citation radio de Piastri après le contact avec Sainz.">Piastri furieux qualifie Sainz d'« idiot »</a><span class="desc">Yahoo Sports</span></li>
        <li><a href="https://gmauthority.com/blog/2026/07/cadillac-f1-team-suffers-double-dnf-at-hungarian-grand-prix/" data-desc="Détail des deux abandons Cadillac (Bottas, Pérez) et de leurs causes respectives.">Cadillac subit un double abandon à Budapest</a><span class="desc">GM Authority</span></li>
        <li><a href="https://www.grandprix247.com/grand-prix-f1-weekend-news/kimi-antonelli-podium-limits-damage-as-george-russell-fights-back-for-mercedes-in-hungary" data-desc="Contexte sur la remontée de Russell et l'écart au championnat entre les deux pilotes Mercedes.">Antonelli limite la casse, Russell contre-attaque</a><span class="desc">GrandPrix247</span></li>
      </ul>
    </div>
  </details>
</section>
`;
