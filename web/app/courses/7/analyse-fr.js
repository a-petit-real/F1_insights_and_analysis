// Analyse Round 7 — Grand Prix de Barcelone-Catalogne 2026 (Circuit de
// Barcelona-Catalunya, Montmeló). Rédigé à partir de scripts/race_briefing*.py
// (base de données The Pit Wall, alimentée par OpenF1 : résultats, grille,
// arrêts, relais pneus, temps au tour et de secteur, météo en série
// temporelle — 300 relevés —, chronologie complète des messages de course y
// compris les deux périodes de Virtual Safety Car) et de recherches web
// ciblées (WebSearch) pour tout ce que la base ne capture pas : causes
// techniques précises des sept abandons, citations d'après-course, détail
// des pénalités infligées après l'arrivée. La base de données restitue déjà
// le classement final AJUSTÉ après pénalités (Colapinto rétrogradé de la P8
// à la P10, RB F1 Team promue d'un rang chacun) — c'est ce classement qui
// sert de référence pour l'ensemble de l'article. La source Pirelli sur
// cette course précise (tyre-strategy-delivers-hamiltons-first-win-in-red)
// est une lecture primaire (press.pirelli.com, récupérée via fetch-url.yml)
// et fait aussi office de source sur l'allocation de gommes, comme les
// nombreux articles F1.com cités (course, qualifications, réactions
// pilotes) — les autres sources de presse sont secondaires, citées comme
// telles. Le meilleur tour de la course (Hamilton, tour 44, 1:20.122) est
// confirmé indépendamment par trois sources : le champ fastest_lap agrégé
// de la base, notre propre relevé tour par tour (race_briefing_laptimes.py,
// qui montre aussi qu'aucun des cinq autres pilotes interrogés n'a fait
// mieux), et la page officielle des meilleurs tours de formula1.com — même
// niveau de rigueur que le tour d'Antonelli au Round 2. Une anomalie
// investiguée explicitement : la seconde période de VSC (tours ~60-62)
// coïncide avec la chronologie des abandons tardifs de Leclerc, Bearman et
// Antonelli sans qu'aucune source consultée ne nomme précisément la voiture
// ayant motivé son déclenchement (marshals signalés au virage 5, qui ne
// correspond à l'emplacement exact d'aucun des trois abandons documentés) —
// le texte le signale comme incertain plutôt que de trancher au hasard.
export const ROUND7_ANALYSE_FR_HTML = `
<div class="hero prose">
  <p class="eyebrow">Grand Prix de Barcelone-Catalogne · Circuit de Barcelona-Catalunya · 2026</p>
  <p class="verdict">Hamilton signe sa première victoire chez Ferrari grâce à un troisième arrêt joué sous Virtual Safety Car — et met fin à la série de cinq victoires d'Antonelli, contraint à l'abandon alors qu'il venait tout juste de reprendre la deuxième place.</p>
  <div class="resultstrip">
    <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari</span></div>
    <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes · +19,561s</span></div>
    <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren · +23,719s</span></div>
    <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · +40,497s</span></div>
    <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">McLaren · +58,661s</span></div>
  </div>
  <p class="subverdict">Première édition sous le nom Barcelone-Catalogne, première victoire de Lewis Hamilton en rouge — à 41 ans, le plus vieux vainqueur en F1 depuis Jack Brabham en 1970. Ferrari a différencié ses deux stratégies dès le départ : Leclerc, parti P10 après un accident en Q3, en deux arrêts ; Hamilton en trois, avec un premier passage largement anticipé par rapport aux fenêtres recommandées pour forcer l'undercut. L'abandon d'Alonso au tour 41 a déclenché le seul VSC vraiment décisif de la course, exploité par Ferrari pour caler le troisième arrêt de Hamilton sans perdre la tête. Mais la course a aussi été la plus chaotique de la saison côté fiabilité : sept abandons, dont Antonelli — qui venait de reprendre la P2 à Russell — lâché par une perte de pression d'huile à trois tours de l'arrivée, et Leclerc par une panne hydraulique quatre tours plus tôt alors qu'il tenait le top 6. Hamilton ramène l'écart au championnat à 41 points sur Antonelli, toujours en tête malgré son premier abandon de la saison.</p>
</div>

<section class="block" data-num="01" id="sec-r1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Le contexte avant la course</h2>
    <p>Le Circuit de Barcelona-Catalunya accueille pour la première fois un Grand Prix sous ce nom — la marque « Grand Prix d'Espagne » a été abandonnée pour cette édition, sans changement de tracé. Les qualifications ont livré une grille resserrée en tête : Russell décroche la pole en 1:14,679, devant Hamilton (+0,064s) et Antonelli (+0,319s), puis Norris et Verstappen. Mais la séance a surtout été marquée par la sortie de piste de Leclerc en Q3 : sur son premier tour lancé, un survirage brutal à la sortie du virage 4 l'envoie dans le gravier puis dans le mur, drapeau rouge, séance interrompue. Leclerc en ressort indemne mais « très honteux », selon ses propres mots après coup, et s'élance dixième — loin de son rythme réel du week-end.</p>
    <p>Pirelli avait nominé une allocation plus tendre que d'habitude pour ce circuit — C2, C3 et C4 (dur/medium/tendre), un cran plus tendre que la sélection habituelle à Barcelone — en anticipant des températures de piste élevées et en visant délibérément à multiplier les arrêts et à intégrer le train dur dans les stratégies. Le pari était fondé : la piste a dépassé les 50°C en continu (48,4 à 52,3°C sur nos relevés, jusqu'à 53°C selon Pirelli), l'air oscillant entre 29,8 et 31,1°C sans la moindre goutte de pluie sur les 300 relevés météo de la course.</p>
    <p>Autre singularité de la grille : Alonso, crédité d'une P22 aux qualifications, a en réalité pris le départ depuis la voie des stands. Aston Martin a monté dans la nuit un quatrième MGU-K et un nouveau boîtier de contrôle électronique sur son AMR26, dépassant son quota saisonnier de pièces — une pénalité qui l'a renvoyé en fond de peloton avant même le tour de formation.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-r2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

    <h3 class="subtitle">Un début de course sage, puis les premières pannes s'enchaînent</h3>
    <p>Le départ ne produit aucun incident majeur : deux enquêtes ouvertes au premier virage (Hülkenberg et Lindblad, sortie de piste avec avantage) et une au virage 12 (Bearman/Hadjar, puis Ocon/Bortoleto, chacun accusé d'avoir poussé un rival hors piste) sont toutes classées sans suite. La fiabilité, elle, commence à craquer très tôt : Stroll rentre au stand dès le tour 6 avec un problème de boîte de vitesses — « je ne passais plus la troisième ni la quatrième depuis quelques tours », expliquera-t-il —, premier abandon de la course. Bottas suit au tour 16-17, rappelé par précaution par Cadillac pour un problème de surchauffe non détaillé publiquement — son troisième abandon de la saison. Puis, vers le tour 30, Hülkenberg est victime de l'abandon le plus improbable du week-end : un gravillon soulevé par la voiture de Lawson, sorti large au virage 12, vient frapper le coupe-circuit ERS logé sous la prise d'air de son Audi et coupe instantanément le moteur. Hülkenberg qualifiera l'incident d'« à peine croyable » — il pointait vers les points pour la première fois de sa saison.</p>

    <h3 class="subtitle">L'abandon d'Alonso déclenche le seul VSC qui compte</h3>
    <p>Vers le tour 41 (VSC actif de 15:59:03 à 16:01:20, heure de piste), Alonso s'immobilise en roulant sur l'herbe avant le virage 9, victime d'une défaillance de batterie — nouveau coup dur pour une monoplace déjà pénalisée avant le départ. Des commissaires sont signalés au virage 9, en cohérence directe avec la localisation de sa panne. C'est cette fenêtre de VSC que Ferrari attendait : Hamilton, qui venait d'anticiper largement son premier arrêt par rapport aux fenêtres recommandées pour lancer un undercut, rentre chausser son troisième train — des durs — sans perdre la tête de la course. Colapinto, lui, est signalé pour ne pas avoir suffisamment ralenti sous drapeau jaune dans cette même fenêtre ; une pénalité de 10 secondes tombera après l'arrivée.</p>

    <h3 class="subtitle">Le pari Ferrari : un troisième arrêt presque gratuit</h3>
    <p>Hamilton a démarré en tendres usés, chaussé des durs au tour 11, des mediums au tour 27, puis de nouveaux durs au tour 41 sous VSC — trois arrêts, quand Russell et Norris n'en ont fait que deux (medium puis dur à deux reprises). Le communiqué Pirelli d'après-course est explicite : Ferrari a « significativement anticipé le premier arrêt par rapport aux fenêtres recommandées » pour maximiser l'undercut et forcer ses rivaux à réagir sur la même stratégie — un plan que l'écurie avait probablement identifié dès l'avant-course comme le plus compétitif pour Hamilton, et dont l'avantage a ensuite été géré jusqu'au drapeau à damier, avec un bonus de temps gagné pendant le VSC. Leclerc, lui, est resté sur un plan à deux arrêts et n'a pas pu suivre le rythme de son coéquipier sur le troisième relais, selon Pirelli — avant que sa course ne tourne court de toute façon.</p>

    <h3 class="subtitle">Antonelli lâche la P2 à trois tours de l'arrivée</h3>
    <p>Antonelli négociait une belle remontée depuis la P3 sur la grille et venait de reprendre la deuxième place à Russell au virage 1 lorsque sa Mercedes s'est brutalement arrêtée au virage 10, à trois tours du drapeau à damier. Mercedes a confirmé une coupure électrique provoquée par une perte de pression d'huile en fin de relais — le tout premier abandon d'Antonelli de la saison 2026, qui met fin à sa série de cinq victoires consécutives. Ironie de la soirée : les commissaires ont ensuite établi, après course, qu'Antonelli aurait dû recevoir un avertissement drapeau noir et blanc dès sa troisième sortie de piste plutôt que sa quatrième — un détail procédural qui lui a valu une pénalité de 5 secondes pour limites de piste, totalement sans effet puisqu'il avait déjà abandonné.</p>

    <h3 class="subtitle">Leclerc et Bearman, deux fins de course qui tournent court</h3>
    <p>Quatre tours avant l'arrivée, Leclerc part à la faute à la sortie du virage 2 : « plus de freins, plus de direction assistée, plus de rapports », décrira-t-il — une défaillance hydraulique liée à un problème de turbo/MGU-H selon la presse spécialisée, qui met fin à une remontée solide depuis la P10 (il pointait dans le top 6 avant la panne). Bearman, de son côté, est rappelé aux stands trois tours avant la fin pour un problème de fiabilité non détaillé : il roulait alors en P13, une position qui serait devenue une P11 à l'arrivée avec les deux abandons qui l'ont précédé.</p>

    <h3 class="subtitle">Une seconde période de VSC dans le money time, sans cause clairement établie</h3>
    <p>Une deuxième neutralisation intervient en fin de course (VSC actif de 16:29:52 à 16:33:35, heure de piste, commissaires signalés au virage 5) — une fenêtre qui coïncide avec la vague d'abandons tardifs de Leclerc, Bearman et Antonelli. Aucune des sources consultées ne nomme précisément la voiture à l'origine de ce second VSC, et le virage 5 mentionné dans les messages de course ne correspond exactement à l'emplacement d'aucun des trois abandons documentés (virage 2 pour Leclerc, virage 10 pour Antonelli, cause non localisée pour Bearman). Le texte le signale comme une incertitude plutôt que de trancher au hasard.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-r3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

    <h3 class="subtitle">Ferrari — la stratégie différenciée qui a payé</h3>
    <p>Séparer les plans de course de ses deux pilotes est rarement anodin, mais Ferrari l'a fait sciemment : Leclerc (parti P10) en deux arrêts pour maximiser le rythme pur, Hamilton (parti P2) en trois pour jouer l'undercut le plus agressif possible. Le pari s'est retourné à l'avantage de l'écurie de la façon la plus nette qui soit — Hamilton gagne, quand Leclerc, qui n'avait de toute façon pas pu suivre le rythme de son coéquipier sur le troisième relais selon Pirelli, abandonne sur panne mécanique avant même de pouvoir conclure sa propre stratégie.</p>

    <h3 class="subtitle">Mercedes — le doublé qui s'effondre à trois tours de la fin</h3>
    <p>Russell a fait une course sans reproche stratégique — deux arrêts, medium puis dur à deux reprises comme Norris — mais s'est fait doubler par l'undercut de Hamilton puis n'a jamais pu recoller. Antonelli, positionné pour un podium voire une remontée jusqu'à la deuxième place qu'il venait tout juste de reprendre, a vu sa course s'arrêter net sur une panne mécanique hors de son contrôle. Sans cet abandon, Mercedes aurait probablement signé un résultat proche du doublé du Round 2 ; au lieu de ça, l'écurie repart de Catalogne avec 18 points au lieu d'un potentiel podium à deux voitures.</p>

    <h3 class="subtitle">McLaren — solidité tranquille, pas de drame ni d'éclat</h3>
    <p>Norris (P3) et Piastri (P5) ont couru une stratégie classique à deux arrêts sans le moindre incident ni pari stratégique notable — une course XXL en termes de rythme d'équipe, sans être la voiture la plus rapide du plateau ce dimanche-là. McLaren engrange 25 points à deux, sans jamais figurer au cœur du récit de la course.</p>

    <h3 class="subtitle">Red Bull et Aston Martin — une remontée solide, une hécatombe de fiabilité</h3>
    <p>Verstappen a couru un programme à trois arrêts assez proche de celui de Hamilton (tendres puis medium, dur, medium) pour signer une quatrième place solide, sans être associé à un tournant particulier de la course. Aston Martin, en revanche, aligne un week-end noir : Alonso pénalisé avant le départ pour dépassement de quota de pièces, puis contraint à l'abandon par une panne de batterie qui a directement provoqué le VSC décisif de la course ; Stroll, éliminé dès le tour 6 sur casse de boîte. Aucun point marqué pour l'écurie.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-r4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
    <p>L'évaluation porte sur la course de dimanche, en tenant compte de la position de départ, de la voiture et des circonstances. Classement final tel qu'ajusté après les pénalités post-course (source : base de données The Pit Wall, résultats/arrêts/pneus/temps au tour, complétée par la recherche web pour les causes d'abandon, les pénalités et les citations).</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table class="verdict-table">
      <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
      <tbody>
        <tr><td><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>P2 → P1</td><td>Première victoire chez Ferrari, plus vieux vainqueur en F1 depuis Jack Brabham (1970) à 41 ans. Trois arrêts avec un premier passage largement anticipé pour lancer l'undercut ; troisième arrêt calé sur le VSC du tour 41. Meilleur tour de la course au tour 44 en 1:20,122, triple-vérifié (base, relevé tour par tour, page officielle F1.com).</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Russell</td><td>P1 → P2</td><td>Pole position, mais doublé par l'undercut de Hamilton et jamais en mesure de recoller ensuite. Deux arrêts, medium puis dur à deux reprises.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Norris</td><td>P4 → P3</td><td>Course solide, deux arrêts sans incident notable, meilleur résultat McLaren du week-end.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>P5 → P4</td><td>Stratégie à trois arrêts (tendres, medium, dur, medium), course propre sans être associée à un tournant particulier.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Piastri</td><td>P7 → P5</td><td>Deux arrêts, course sans éclat ni incident, deuxième voiture McLaren dans les points.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>P6 → P6*</td><td>Trois arrêts (15, 32, 58), points marqués sans être au cœur du récit de la course. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>P14 → P7*</td><td>Belle remontée depuis la P14, deux arrêts (14, 40), meilleur résultat Alpine du week-end. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lawson</td><td>P8 → P8*</td><td>Deux arrêts (11, 35). Promu d'un rang après la pénalité de Colapinto ; son passage large au virage 12 est aussi, indirectement, à l'origine de l'abandon de Hülkenberg (gravillon projeté). *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>P11 → P9*</td><td>Deux arrêts (22, 37), promu d'un rang après la pénalité de Colapinto. Signalé au virage 1 au premier tour pour une sortie de piste avec avantage, classé sans suite. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>P13 → P10*</td><td>Deux arrêts (12, 34) ; classé initialement P8 mais rétrogradé de deux places par une pénalité de 10 secondes pour ne pas avoir suffisamment ralenti sous drapeau jaune pendant la panne d'Alonso — un point de pénalité au permis inclus. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>P12 → P11*</td><td>Trois arrêts (15, 33, 53), hors des points sur une course sans histoire notable. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>P16 → P12*</td><td>Trois arrêts (14, 30, 55). Une infraction à la procédure de départ (une boîte laissée sur l'herbe à côté de la grille) a valu une amende à l'équipe Williams, sans pénalité sportive pour le pilote. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>P17 → P13*</td><td>Trois arrêts (13, 34, 58), hors des points, course discrète. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>P19 → P14*</td><td>Trois arrêts (12, 31, 39), en délégation hors des points pour Cadillac. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>P10 → Abandon</td><td>Accident en Q3 (survirage sortie du virage 4, mur) qui le renvoie en P10 malgré un rythme de podium. Belle remontée en course, dans le top 6 avant une défaillance hydraulique totale (« plus de freins, plus de direction assistée, plus de rapports ») liée à un problème de turbo/MGU-H selon la presse, qui le sort de la piste au virage 2 à quatre tours de l'arrivée.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>P3 → Abandon</td><td>Venait de reprendre la P2 à Russell au virage 1 lorsqu'une perte de pression d'huile a provoqué une coupure électrique au virage 10, à trois tours du drapeau à damier. Premier abandon de sa saison, fin de sa série de cinq victoires consécutives. Pénalité de 5 secondes pour limites de piste infligée après course, sans effet puisqu'il avait déjà abandonné.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>P15 → Abandon</td><td>Rappelé aux stands pour un problème de fiabilité non détaillé, trois tours avant l'arrivée, alors qu'il occupait une P13 qui serait devenue une P11 avec les abandons de Leclerc et Antonelli.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Albon</td><td>P18 → Lapped</td><td>Quatre arrêts (13, 29, 34, 50). Une infraction à la procédure de départ (couverture chauffante mal retirée) a valu une amende à l'équipe Williams, sans pénalité sportive pour le pilote.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Alonso</td><td>Pit lane → Abandon</td><td>Parti de la voie des stands après une pénalité pour dépassement de quota de pièces (quatrième MGU-K et boîtier électronique montés dans la nuit). Un arrêt (21) avant une panne de batterie qui l'immobilise sur l'herbe avant le virage 9 au tour 41 — l'abandon qui déclenche directement le VSC décisif de la course.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>P9 → Abandon</td><td>Pointait vers les points pour la première fois de sa saison lorsqu'un gravillon soulevé par la voiture de Lawson est venu frapper le coupe-circuit ERS de son Audi, coupant instantanément le moteur — l'abandon le plus improbable du week-end, qualifié d'« à peine croyable » par le pilote lui-même.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>P20 → Abandon</td><td>Rappelé par précaution au tour 16-17 pour un problème de surchauffe, troisième abandon de sa saison, tous liés à des soucis mécaniques.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Stroll</td><td>P21 → Abandon</td><td>Premier abandon de la course, dès le tour 6, sur casse de boîte de vitesses — incapable de passer la troisième ou la quatrième vitesse dans les tours précédents selon ses propres mots.</td></tr>
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
        <tr><td><span class="dot" style="background:#E8002D"></span> Ferrari</td><td>Stratégies volontairement différenciées entre les deux pilotes — payantes à 100% : victoire de Hamilton via un undercut agressif exploité sous VSC, tandis que Leclerc, resté sur un plan plus conservateur, abandonne sur panne mécanique avant de pouvoir conclure sa propre course.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Mercedes</td><td>Doublé annoncé qui s'effondre à trois tours de l'arrivée : Russell tient la P2 sans jamais menacer Hamilton, mais Antonelli — qui venait de reprendre cette même P2 — abandonne sur panne d'huile, son tout premier DNF de la saison et la fin d'une série de cinq victoires.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> McLaren</td><td>Norris et Piastri dans les points sans le moindre incident ni pari stratégique notable — une course de gestion pure, 25 points engrangés à deux.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Red Bull</td><td>Verstappen quatrième sur une stratégie à trois arrêts propre ; Hadjar dans les points, son passage large au virage 12 provoquant indirectement l'abandon de Hülkenberg chez Audi.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Alpine F1 Team</td><td>Gasly signe le meilleur résultat de l'écurie (P7) ; Colapinto, initialement P8, rétrogradé P10 par une pénalité pour infraction aux drapeaux jaunes pendant l'abandon d'Alonso.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> RB F1 Team</td><td>Lawson et Lindblad tous deux promus d'un rang par la pénalité de Colapinto, week-end sans incident propre à l'écurie.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Audi</td><td>Hors des points : Bortoleto discret en P11, Hülkenberg victime de l'abandon le plus improbable du week-end (gravillon dans le coupe-circuit) alors qu'il pointait vers ses premiers points de la saison.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Williams</td><td>Sainz et Albon hors des points ; l'équipe écope de deux amendes de 5 000€ pour infractions à la procédure de départ (matériel laissé sur la grille), sans pénalité sportive pour les pilotes.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Haas F1 Team</td><td>Ocon hors des points ; Bearman, qui roulait en position à points, contraint à l'abandon trois tours avant l'arrivée sur un problème de fiabilité.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Cadillac F1 Team</td><td>Pérez hors des points ; Bottas retiré par précaution au tour 16-17 pour surchauffe, son troisième abandon mécanique de la saison.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Aston Martin</td><td>Week-end noir sans le moindre point : Alonso pénalisé avant le départ (dépassement de quota de pièces, parti de la voie des stands) puis lâché par une panne de batterie qui déclenche le VSC décisif de la course ; Stroll éliminé dès le tour 6 sur casse de boîte.</td></tr>
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
          <li><strong>Hamilton et Ferrari</strong>, pour une stratégie à trois arrêts pensée pour l'undercut dès l'avant-course, parfaitement exécutée jusqu'au VSC providentiel du tour 41.</li>
          <li><strong>Gasly</strong>, pour une remontée solide de la P14 à la P7, meilleur résultat Alpine du week-end.</li>
          <li><strong>RB F1 Team</strong>, doublement promue par la pénalité de Colapinto, pour un week-end sans le moindre accroc.</li>
        </ul>
      </div>
      <div class="verdictcol lose">
        <h4>Perdants</h4>
        <ul>
          <li><strong>Antonelli</strong>, qui venait de reprendre la P2 lorsqu'une panne d'huile a mis fin à sa série de cinq victoires — son tout premier abandon de la saison.</li>
          <li><strong>Aston Martin</strong>, pour un week-end sans point : Alonso pénalisé avant le départ puis lâché par la batterie, Stroll éliminé dès le tour 6.</li>
          <li><strong>Hülkenberg</strong>, privé de ses premiers points de la saison par l'abandon le plus improbable du plateau — un gravillon dans le coupe-circuit.</li>
        </ul>
      </div>
    </div>
    <div class="callout">Sept abandons, deux périodes de VSC et une pénalité post-course ont fait de Barcelone la course la plus chaotique de la saison — mais le résultat s'est joué sur un seul geste stratégique : l'undercut anticipé de Ferrari sur Hamilton, calé sur le VSC provoqué par la panne d'Alonso. Antonelli reste en tête du championnat malgré son premier abandon de l'année, mais l'écart n'est plus que de 41 points sur un Hamilton qui vient de prouver, à 41 ans, qu'il peut encore gagner en rouge.</div>
  </div>
</section>

<section class="block" id="sec-r-next">
  <div class="prose">
    <h2 class="sectitle">Enseignements pour la suite</h2>
    <p>Trois points issus de Barcelone à surveiller dans les prochaines courses :</p>
    <ol style="padding-left:20px; margin:0 0 16px;">
      <li style="margin-bottom:10px;">La <strong>fiabilité</strong> est redevenue un sujet transversal : sept abandons en une seule course, touchant Mercedes (Antonelli, une première en 2026), Ferrari (Leclerc), Aston Martin (les deux voitures) et Audi (Hülkenberg, de la manière la plus improbable qui soit). À surveiller si ces pannes restent isolées ou deviennent une tendance.</li>
      <li style="margin-bottom:10px;"><strong>Ferrari</strong> a démontré qu'elle pouvait différencier ses stratégies entre pilotes avec succès. Reste à voir si l'écurie répète ce schéma quand les deux voitures ont une carte à jouer simultanément.</li>
      <li><strong>Hamilton</strong> revient à 41 points d'Antonelli après cette victoire. Le championnat, qui semblait verrouillé après le triplé de victoires Mercedes des premières manches, redevient une vraie course à deux — voire trois, avec Russell troisième et seulement 50 points derrière le leader.</li>
    </ol>
  </div>
</section>

<section class="block" id="sec-r7">
  <details class="sources">
    <summary>Sources utilisées — GP de Barcelone-Catalogne (20 liens)</summary>
    <div class="srcgroup">
      <h5>Base de données The Pit Wall</h5>
      <ul>
        <li><span class="desc">Résultats (classement final ajusté après pénalités), grille, arrêts, relais pneus, temps au tour et de secteur, météo en série temporelle, chronologie complète des messages de course (dont les deux VSC) — alimentés depuis l'API OpenF1 (scripts/ingest_openf1.py). Source primaire pour l'ensemble des faits chiffrés de cet article.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Course et stratégie pneus — source primaire</h5>
      <ul>
        <li><a href="https://press.pirelli.com/tyre-strategy-delivers-hamiltons-first-win-in-red-0/" data-desc="Compte rendu officiel Pirelli de la course, détail des stratégies pneus des principaux pilotes et citation du directeur motorsport.">Tyre strategy delivers Hamilton's first win in red</a><span class="desc">Pirelli Press — communiqué officiel, lu directement</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/hamilton-claims-stellar-maiden-grand-prix-victory-for-ferrari-in-barcelona-as-antonelli-suffers-shock-retirement.4yCXiPLHUdcnl2BwNpqUIa" data-desc="Compte rendu officiel de la course.">Hamilton claims stellar maiden Grand Prix victory for Ferrari</a><span class="desc">Formula1.com — source officielle</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/russell-storms-to-barcelona-catalunya-gp-pole-ahead-of-hamilton-and-antonelli-as-leclerc-crashes-out.5TO9HsowvlMjmFJBPVP3qv" data-desc="Compte rendu officiel des qualifications, dont l'accident de Leclerc.">Russell storms to Barcelona-Catalunya GP pole</a><span class="desc">Formula1.com — source officielle</span></li>
        <li><a href="https://www.formula1.com/en/results/2026/races/1287/barcelona-catalunya/fastest-laps" data-desc="Classement officiel des meilleurs tours de la course, confirmant le tour de Hamilton.">Meilleurs tours — GP de Barcelone-Catalogne 2026</a><span class="desc">Formula1.com — résultats officiels</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Qualifications et réactions pilotes — source primaire</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/no-excuses-leclerc-feeling-very-ashamed-after-barcelona-catalunya-gp-qualifying-crash.4HZI6GRiDiGw5zMAFVOuZX" data-desc="Réaction de Leclerc après son accident en Q3.">« No excuses » : Leclerc se dit très honteux</a><span class="desc">Formula1.com — source officielle</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/i-feel-a-bit-empty-antonelli-reflects-on-late-barcelona-catalunya-gp-retirement.6wpFZCfvdQgU4FKe3q1dic" data-desc="Réaction d'Antonelli après son abandon.">« I feel a bit empty » : Antonelli sur son abandon</a><span class="desc">Formula1.com — source officielle</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/leclerc-laments-tough-barcelona-catalunya-gp-weekend-as-hydraulic-issue-forces-ferrari-drivers-retirement.r3xcs2T1P6prQlDhLD7Uq" data-desc="Cause officielle de l'abandon de Leclerc (panne hydraulique).">Leclerc lâché par une panne hydraulique</a><span class="desc">Formula1.com — source officielle</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/the-unusual-and-unfortunate-reason-why-hulkenbergs-race-in-barcelona-came-to-an-abrupt-end.1OZl98HX2B0gFbbrL2SSZa" data-desc="Explication détaillée de l'abandon de Hülkenberg (gravillon dans le coupe-circuit).">La raison inhabituelle de l'abandon de Hülkenberg</a><span class="desc">Formula1.com — source officielle</span></li>
        <li><a href="https://www.formula1.com/en/video/bottas-explains-the-reason-for-his-precautionary-dnf-on-lap-17.1867983555520802438" data-desc="Bottas explique son abandon par précaution.">Bottas explique son DNF « précautionnel »</a><span class="desc">Formula1.com — source officielle</span></li>
        <li><a href="https://www.formula1.com/en/video/stroll-reveals-gearbox-issue-caused-his-dnf-in-barcelona.1867979214293277888" data-desc="Stroll explique son abandon sur casse de boîte.">Stroll révèle la cause de son abandon</a><span class="desc">Formula1.com — source officielle</span></li>
        <li><a href="https://www.formula1.com/en/video/bearman-was-running-further-forward-than-we-were-meant-to-be-before-lap-63-dnf.1867986287895824986" data-desc="Réactions de Bearman après son abandon tardif.">Bearman sur son abandon à trois tours de l'arrivée</a><span class="desc">Formula1.com — source officielle</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Pénalités post-course</h5>
      <ul>
        <li><a href="https://www.crash.net/f1/news/1098880/1/explained-why-kimi-antonelli-was-hit-post-race-f1-penalty-despite-retiring" data-desc="Explication de la pénalité infligée à Antonelli malgré son abandon.">Pourquoi Antonelli a été pénalisé malgré son abandon</a><span class="desc">Crash.net</span></li>
        <li><a href="https://www.racefans.net/2026/06/14/stewards-reveal-antonelli-should-have-received-five-second-time-penalty-before-pit-stop/" data-desc="Détail procédural sur la quatrième infraction aux limites de piste d'Antonelli.">Les commissaires révèlent une erreur de procédure</a><span class="desc">RaceFans</span></li>
        <li><a href="https://www.the-race.com/formula-1/f1-2026-barcelona-grand-prix-results-as-hamilton-wins-for-ferrari/" data-desc="Classement final après la pénalité infligée à Colapinto.">Classement final après la pénalité de Colapinto</a><span class="desc">The Race</span></li>
        <li><a href="https://www.racefans.net/2026/06/14/colapinto-loses-eighth-place-and-receives-penalty-point-for-yellow-flag-error/" data-desc="Détail de la pénalité de Colapinto pour infraction aux drapeaux jaunes.">Colapinto perd la P8 pour une erreur sous drapeau jaune</a><span class="desc">RaceFans</span></li>
        <li><a href="https://racingnews365.com/williams-handed-double-punishment-after-bizarre-barcelona-gp-error" data-desc="Détail des deux amendes infligées à Williams pour infraction à la procédure de départ.">Williams écope d'une double sanction</a><span class="desc">RacingNews365</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Contexte technique et abandons — sources secondaires</h5>
      <ul>
        <li><a href="https://www.autosport.com/f1/news/leclerc-spanish-gp-exit-caused-by-ferrari-turbo-mgu-h-failure/10309763/" data-desc="Détail technique de la panne hydraulique de Leclerc (turbo/MGU-H).">La panne de Leclerc liée au turbo/MGU-H</a><span class="desc">Autosport</span></li>
        <li><a href="https://racingnews365.com/mercedes-reveal-cause-of-title-damaging-kimi-antonelli-retirement" data-desc="Mercedes détaille la cause technique de l'abandon d'Antonelli.">Mercedes détaille la cause de l'abandon d'Antonelli</a><span class="desc">RacingNews365</span></li>
        <li><a href="https://www.planetf1.com/news/fernando-alonso-retirement-aston-martin-fans-barcelona-battery-failure" data-desc="Détail de la panne de batterie d'Alonso et de son départ depuis la voie des stands.">Alonso lâché par une panne de batterie</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://www.espn.com/f1/story/_/id/49028342/barcelona-catalunya-grand-prix-formula-1-ferraris-charles-leclerc-ashamed-qualifying-crash" data-desc="Contexte complémentaire sur l'accident de Leclerc en qualifications.">Leclerc « ashamed » après son accident</a><span class="desc">ESPN</span></li>
      </ul>
    </div>
  </details>
</section>
`;
