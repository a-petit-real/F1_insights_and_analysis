// Analyse Round 6 — Grand Prix de Monaco 2026 (Monte-Carlo).
// Rédigé à partir de scripts/race_briefing*.py (base de données The Pit
// Wall, alimentée par OpenF1 : résultats, grille, arrêts, relais pneus,
// temps au tour et de secteur, météo en série temporelle, chronologie
// complète des messages de course — y compris le drapeau rouge et les
// six pénalités pour excès de vitesse dans la voie des stands) et de
// recherches web ciblées (WebSearch) pour le contexte non capturé en
// base : cause technique de l'abandon de Verstappen, séquence exacte
// des deux sorties de piste au virage 19, et surtout le droit de
// révision post-course d'Alpine — un événement FIA postérieur à la
// course qui a changé le classement final (Gasly P3, Hadjar rétrogradé
// P4) et que la base, alimentée une seule fois après course, restitue
// déjà dans sa forme définitive. Monaco 2026 n'était pas un week-end
// Sprint (calendrier officiel confirmé par recherche web) : aucune
// réserve à faire ici, contrairement à Shanghai (Round 2). Sources
// primaires : la base de données, deux communiqués Pirelli
// (press.pirelli.com, récupérés via fetch-url.yml), la page officielle
// des meilleurs tours sur formula1.com et le compte rendu de course
// publié par Mercedes-AMG F1 ; le reste est secondaire, cité comme tel.
// Le meilleur tour d'Antonelli (tour 76, 1:13.481) est triple-vérifié :
// champ agrégé de la base (race_briefing.py), relevé tour par tour brut
// (race_briefing_laptimes.py, confirmé indépendamment par la somme des
// trois secteurs du tour 76 dans race_briefing_deep.py) et page
// officielle formula1.com/en/results/2026/races/1286/monaco/fastest-laps
// — même rigueur de triple vérification que le tour d'Antonelli au
// Round 2, appliquée ici à Antonelli une nouvelle fois pour un fait
// distinct de sa propre course.
export const ROUND6_ANALYSE_FR_HTML = `
<div class="hero prose">
  <p class="eyebrow">Grand Prix de Monaco · Monte-Carlo · 2026</p>
  <p class="verdict">Antonelli signe un grand chelem sans accroc — pole, victoire, meilleur tour, chaque tour en tête — pendant qu'un revêtement flambant neuf se désintègre sous les roues au virage 19 et suspend la course 35 minutes.</p>
  <div class="resultstrip">
    <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes</span></div>
    <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari · +6,271s</span></div>
    <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#FF87BC"></span><span class="drv">Gasly</span> <span class="gap">Alpine · +20,369s</span></div>
    <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Hadjar</span> <span class="gap">Red Bull · +23,394s</span></div>
    <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">McLaren · +24,261s</span></div>
  </div>
  <p class="subverdict">Sept abandons à Monaco — un chiffre rare sur ce tracé où l'attrition vient d'habitude plutôt des qualifications que de la course. Verstappen ouvre le bal dès la fin du premier tour, moteur mort sur la grille. Puis, en fin de course, le revêtement tout juste refait du virage 19 commence à se déliter : Stroll y part à la faute et déclenche une Safety Car, puis Leclerc — troisième à ce moment-là — s'écrase au même endroit dès la relance. Le drapeau rouge tombe pour inspecter la piste, 35 minutes d'arrêt, la première suspension de course pour un revêtement endommagé depuis 2008. Sur cette même relance, une défaillance du système de chronométrage de la FIA fausse le calcul de vitesse dans la voie des stands et distribue cinq pénalités de 5 secondes injustifiées ; seule Alpine conteste, et Gasly récupère son podium par droit de révision post-course, reléguant Hadjar — provisoirement sur le podium le jour même — à la quatrième place. Mercedes, de son côté, se saborde une pénalité mal servie qui coûte à Russell tout espoir de points. Antonelli n'a rien vu de tout cela depuis la tête : cinquième victoire en six courses, plus jeune vainqueur de l'histoire du Grand Prix de Monaco, 66 points d'avance au championnat.</p>
</div>

<section class="block" data-num="01" id="sec-r1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Le contexte avant la course</h2>
    <p>Antonelli décroche la pole devant Verstappen, Hamilton, Leclerc et Hadjar — cinquième sur la grille pour sa deuxième course chez Red Bull. Russell n'est que sixième, Piastri septième et Norris huitième : ni l'un ni l'autre des deux favoris habituels de McLaren ne partait en position de force à Monaco, un tracé où dépasser en piste reste presque impossible et où la grille de qualification préfigure largement le classement final.</p>
    <p>Pirelli avait nominé sa gamme la plus tendre de la saison pour Monte-Carlo — C3, C4 et C5, en dur/medium/tendre — avec une allocation généreuse de huit jeux de tendres par pilote, pensée pour maximiser l'adhérence sur l'asphalte lisse du circuit. <a href="https://press.pirelli.com/the-tyre-compound-selections-for-monte-carlo-and-barcelona/" data-desc="Communiqué officiel Pirelli sur les nominations de gommes pour Monaco et Barcelone.">Communiqué Pirelli — nominations Monaco/Barcelone</a> Sur ce point, la course n'a réservé aucune surprise : Pirelli notera après coup une dégradation plus marquée que les jours précédents, la plupart des pilotes s'élançant en medium avant de passer au dur pour le second relais.</p>
    <p>Côté météo, rien à signaler non plus — et c'est un point à souligner tant le reste du week-end fut chaotique : conditions stables du début à la fin de la course, 22,6 à 24,5°C dans l'air, 28,1 à 46,0°C sur la piste, aucune pluie, humidité entre 56,7 et 68,9%. Le drame du jour n'est venu ni de la pluie ni de la stratégie, mais du bitume lui-même : un virage 19 tout juste resurfacé avant le week-end, qui allait se déliter sous la contrainte en fin de course.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-r2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

    <h3 class="subtitle">Verstappen, hors course avant même le premier virage</h3>
    <p>Deuxième sur la grille, Verstappen est directement en délicatesse au départ et rentre aux stands dès la fin du tour 1, moteur éteint. Aucun arrêt supplémentaire n'est enregistré ensuite dans les données de la base : la voiture ne reprendra jamais la piste. Red Bull confirmera après course qu'il s'agissait bien d'une panne moteur — le tout premier bloc de la saison pour Verstappen, dont le remplacement était de toute façon prévu avant Barcelone — sans donner plus de détails techniques. Verstappen lui-même, interrogé par Sky Sports F1, résume : « il n'y avait aucune régularité, et puis le moteur est juste mort ».</p>

    <h3 class="subtitle">Antonelli domine, une bagarre à quatre s'installe derrière</h3>
    <p>En tête depuis le départ, Antonelli ne sera plus jamais inquiété de toute la course — pas un seul tour cédé. Hamilton s'arrête le premier des pilotes de tête, tour 28, pour passer du medium au dur ; Antonelli attend le tour 37 pour effectuer le même changement. Le reste du peloton de tête (Gasly, Hadjar, Leclerc, Piastri) suit un schéma proche, sans qu'aucun ne menace sérieusement la tête de course.</p>

    <h3 class="subtitle">Une défaillance de chronométrage distribue cinq pénalités injustifiées</h3>
    <p>Cinq pilotes — Hamilton (15:39), Russell (15:43), Piastri (16:06), Colapinto (15:49) et Gasly, touché à deux reprises (16:02 et 16:22) — reçoivent chacun une pénalité de 5 secondes pour excès de vitesse dans la voie des stands, toutes purgées en course. Il faudra plusieurs jours pour comprendre pourquoi autant de pénalités identiques sont tombées le même après-midi : Formula One Management avait mal calibré la distance entre les boucles de chronométrage de la voie des stands (26,92 mètres annoncés, 0,77 mètre de trop en réalité), ce qui a mécaniquement surestimé la vitesse de tous les pilotes qui y sont passés. Seule Alpine conteste officiellement, et obtient l'annulation des deux pénalités de Gasly par droit de révision après la course — les quatre autres pénalités, pourtant issues de la même erreur de mesure, ne sont jamais rejugées.</p>

    <h3 class="subtitle">Stroll puis Leclerc : deux sorties au même virage, un drapeau rouge de 35 minutes</h3>
    <p>Stroll part à la faute au virage 19 (Anthony-Noghès), la Safety Car est déployée. Le peloton profite de cette fenêtre pour s'arrêter en masse — la quasi-totalité des pilotes encore en course rentrent aux stands entre les tours 58 et 59. À peine la piste redégagée, coup de tonnerre : Leclerc, troisième à ce moment précis et sur un rythme de podium, part à son tour dans le mur exactement au même virage. Deuxième Safety Car, puis drapeau rouge à 14:35 (heure de session) : la piste, resurfacée avant le week-end, montre des signes de délitement au virage 19. Il faudra 35 minutes d'inspection avant que la direction de course n'autorise la reprise — la première suspension de course pour un problème de revêtement depuis 2008. Leclerc évoquera après coup une possible défaillance mécanique côté freins, sans que cette explication ne change le diagnostic officiel porté sur l'asphalte.</p>

    <h3 class="subtitle">Redémarrage sur tendres, et l'erreur qui coûte tout à Russell</h3>
    <p>Tous les pilotes encore en course chaussent des pneus tendres pour le redémarrage arrêté, Antonelli en tête. Mercedes profite de l'arrêt prolongé pour faire de même sur la Mercedes de tête sans perdre de position — un arrêt presque gratuit, comme celui de Melbourne en ouverture de saison. Mais l'écurie se saborde elle-même sur l'autre voiture : la pénalité de 5 secondes infligée à Russell pour excès de vitesse en course n'est pas purgée au bon arrêt, ce que Toto Wolff reconnaîtra sans détour après course comme « clairement notre erreur ». Russell, remonté jusqu'à la troisième place après la relance, écope alors d'un drive-through au moment du drapeau rouge, retombe à la quatorzième place à son retour en piste, et ne terminera la course qu'en douzième position, hors des points.</p>

    <h3 class="subtitle">La fin de course : Sainz sacrifié dans le chaos du dernier restart</h3>
    <p>Sur la relance qui suit le drapeau rouge, Sainz — dixième et en position de marquer des points pour la troisième course consécutive — est percuté par Hülkenberg au virage du Loews, puis, déjà endommagé, tapé une seconde fois par Colapinto au virage 8. Sa Williams, trop abîmée, doit abandonner. Hülkenberg écope d'une pénalité de 10 secondes pour le contact initial (« CAUSING A COLLISION », confirmée par la base) ; l'incident impliquant Colapinto est classé sans suite après enquête. Albon, lui, ramène des points pour Williams (huitième), mais l'écurie perd un doublé qui semblait acquis.</p>

    <h3 class="subtitle">Le meilleur tour, triple vérifié : Antonelli, tour 76, 1:13,481</h3>
    <p>Une fois la piste dégagée en fin de course, Antonelli, déjà hors de portée, signe le meilleur tour de la course au tour 76 en 1:13,481 — une valeur confirmée par trois sources indépendantes : le champ agrégé de la base de données, notre propre relevé tour par tour (recoupé avec la somme des trois secteurs du même tour dans le détail par secteur), et la page officielle des meilleurs tours sur formula1.com. Antonelli complète ainsi le grand chelem — pole, victoire, meilleur tour, chaque tour en tête — et devient, selon Mercedes-AMG F1, le plus jeune vainqueur de l'histoire du Grand Prix de Monaco.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-r3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

    <h3 class="subtitle">Mercedes — la course parfaite d'un côté du garage, l'erreur qui ruine l'autre</h3>
    <p>Rien à redire côté Antonelli : arrêt unique au tour 37, redémarrage impeccable, aucune remise en cause de la tête de course sur 78 tours. Mais l'écurie, qui avait pourtant l'occasion d'un doublé avec Russell revenu en troisième position après la relance, se saborde elle-même en ne purgeant pas correctement une pénalité de 5 secondes — Wolff assume l'erreur sans détour. Le contraste entre les deux voitures du même garage, le même jour, résume à lui seul l'écart entre exécution et improvisation chez Mercedes cette saison.</p>

    <h3 class="subtitle">Ferrari — Hamilton solide, Leclerc perd son pari au pire moment</h3>
    <p>Hamilton livre une course sans accroc : premier arrêt propre au tour 28, rythme constant, deuxième place assurée derrière une Mercedes hors de portée. Leclerc, lui, était sur un rythme de podium — troisième au moment de son accident — avant de perdre sa monoplace exactement là où Stroll venait de perdre la sienne quelques minutes plus tôt. Sur un circuit où la position en piste vaut de l'or, cette sortie de piste a coûté à Ferrari la chance réelle d'un résultat à deux voitures dans le top 3.</p>

    <h3 class="subtitle">Alpine — un podium arraché deux fois, sur la piste puis au bureau des commissaires</h3>
    <p>Gasly termine troisième sur la piste, perd sa place à cause d'une pénalité injustifiée issue d'une erreur de mesure de la FIA, puis la récupère par droit de révision — la seule écurie à avoir engagé la démarche alors que quatre autres pilotes subissaient la même défaillance de chronométrage sans jamais voir leur pénalité rejugée. Un vrai succès de gestion de course pour Alpine, mais qui souligne, en creux, l'incohérence d'un système où seule l'écurie qui conteste obtient réparation.</p>

    <h3 class="subtitle">Red Bull — Hadjar confirme, Verstappen jamais entré en course</h3>
    <p>Hadjar signe une course sans faute et termine quatrième — sur le podium le jour même, avant de le perdre par effet de bord de la révision Gasly. Une performance solide pour sa deuxième course sous les couleurs Red Bull, qui contraste fortement avec l'autre côté du garage : Verstappen n'a jamais vraiment pris part à la course, moteur mort dès le premier tour.</p>

    <h3 class="subtitle">McLaren — Piastri retrouve des couleurs, Norris trahi par sa batterie</h3>
    <p>Après un début de saison sans le moindre tour disputé en course (sortie de piste en Australie, panne électrique en Chine), Piastri boucle enfin un week-end complet et termine cinquième — son meilleur résultat de la saison. Norris, lui, est prié par son ingénieur d'abandonner au tour 46 après avoir signalé ne plus avoir de batterie : une panne d'énergie électrique, sans lien avec le drame du virage 19, qui prive de nouveau McLaren d'un résultat à deux voitures.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-r4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
    <p>L'évaluation porte sur la course de dimanche, en tenant compte de la position de départ, de la voiture et des circonstances (source : base de données The Pit Wall, résultats/arrêts/pneus/temps au tour, complétée par la recherche web pour les causes d'abandon, les pénalités et le droit de révision post-course). Le classement ci-dessous est déjà celui, définitif, issu du droit de révision d'Alpine.</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table class="verdict-table">
      <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
      <tbody>
        <tr><td><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>P1 → P1</td><td>Grand chelem : pole, victoire, meilleur tour (1:13,481, tour 76, triple vérifié), chaque tour en tête. Plus jeune vainqueur de l'histoire du Grand Prix de Monaco, cinquième victoire en six courses.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>P3 → P2</td><td>Premier des pilotes de tête à s'arrêter (tour 28), rythme constant tout au long de la course. Deuxième place nette derrière une Mercedes hors de portée.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>P9 → P3</td><td>Troisième sur la piste, déclassé par une pénalité de 5 secondes issue d'une erreur de calibration du système de chronométrage FIA, puis réintégré sur le podium par droit de révision post-course — seule écurie à avoir contesté.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>P5 → P4</td><td>Course sans faute, sur le podium le jour même avant de le perdre par effet de bord de la révision Gasly. Solide pour sa deuxième course chez Red Bull.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Piastri</td><td>P7 → P5</td><td>Meilleur résultat de sa saison, et surtout premier week-end complet disputé en 2026 après deux forfaits consécutifs en Australie et en Chine.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lawson</td><td>P10 → P6</td><td>Course propre dans les points pour RB F1 Team.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>P15 → P7</td><td>Belle remontée depuis la P15 ; plus long relais de la course sur le composé medium (65 tours), selon Pirelli.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Albon</td><td>P11 → P8</td><td>Points pour Williams malgré la perte de son coéquipier en fin de course dans le chaos du dernier restart.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>P17 → P9</td><td>Belle remontée pour Haas ; plus long relais de la course sur le composé dur (50 tours), selon Pirelli.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Alonso</td><td>P21 → P10</td><td>Remontée depuis la P21 ; plus long relais de la course sur le composé tendre (55 tours), selon Pirelli.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>P16 → P11</td><td>Hors des points, course discrète pour Audi.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Russell</td><td>P6 → P12</td><td>Remonté jusqu'à la P3 après la relance, avant que Mercedes ne serve trop tard sa pénalité de 5 secondes — drive-through au moment du drapeau rouge, chute à la P14, remontée limitée jusqu'à la P12. Erreur d'équipe reconnue par Toto Wolff.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>P13 → P13</td><td>Pénalité de 10 secondes pour avoir percuté Sainz au restart final (« causing a collision »), sans conséquence sur son classement final hors des points.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>P14 → P14</td><td>Pénalité de 5 secondes pour excès de vitesse aux stands (même défaillance de chronométrage que Gasly, jamais contestée par l'écurie pour cette voiture) ; impliqué sans pénalité dans le second contact avec Sainz en fin de course.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>P18 → P15</td><td>Parti de la mauvaise case de grille selon les commissaires ; termine hors des points pour Cadillac.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>P12 → Abandon</td><td>En position de marquer des points pour la troisième course de suite avant d'être percuté par Hülkenberg au Loews puis par Colapinto au virage 8 lors du restart final. Dégâts trop importants pour continuer.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>P4 → Abandon</td><td>Troisième et sur un rythme de podium au moment de sa sortie de piste au virage 19, exactement là où Stroll venait de partir à la faute quelques minutes plus tôt. Évoque après course une possible défaillance des freins.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Stroll</td><td>P22 → Abandon</td><td>Sortie de piste au virage 19 (Anthony-Noghès), à l'origine de la première Safety Car — et, indirectement, de tout l'enchaînement qui a mené au drapeau rouge.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Norris</td><td>P8 → Abandon</td><td>Invité par son ingénieur à abandonner au tour 46 après avoir signalé ne plus avoir de batterie — panne d'énergie électrique sans lien avec le drame du virage 19.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>P19 → Abandon</td><td>Arrêt dès le tour 1 pour un nouvel aileron avant après un contact au départ, avant d'abandonner autour du tour 30 pour un problème de fiabilité distinct.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>P20 → Abandon</td><td>Cadillac a souffert de températures de freins excessives tout le week-end ; ce problème a fini par contraindre Bottas à l'abandon.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>P2 → Abandon</td><td>Rentre aux stands dès la fin du tour 1, moteur mort. Red Bull confirmera une panne moteur après course — le tout premier bloc de la saison pour Verstappen, dont le remplacement était de toute façon prévu avant Barcelone.</td></tr>
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
        <tr><td><span class="dot" style="background:#00A19B"></span> Mercedes</td><td>Grand chelem sans accroc pour Antonelli, doublé manqué de peu côté Russell à cause d'une pénalité mal purgée par le muret — erreur reconnue publiquement par Toto Wolff.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Ferrari</td><td>Hamilton solide en P2 ; Leclerc perd une vraie chance de podium en s'écrasant au virage 19, au pire moment possible de la course.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Alpine F1 Team</td><td>Podium de Gasly perdu puis récupéré par droit de révision post-course après une pénalité injustifiée — seule écurie à avoir engagé la démarche. Colapinto termine hors des points, pénalisé par la même défaillance de chronométrage sans contestation.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Red Bull</td><td>Hadjar solide en P4 (sur le podium le jour même) ; Verstappen jamais vraiment entré en course, panne moteur dès le premier tour.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> McLaren</td><td>Meilleur résultat de la saison pour Piastri (P5), premier week-end complet après deux forfaits ; Norris abandonne sur une panne de batterie au tour 46.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> RB F1 Team</td><td>Lawson et Lindblad tous deux dans les points, week-end propre. Lindblad signe le plus long relais de la course sur le medium (65 tours), selon Pirelli.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Williams</td><td>Albon marque des points (P8) mais l'écurie perd un doublé qui semblait acquis : Sainz, en position de scorer pour la troisième course de suite, est percuté par Hülkenberg puis Colapinto lors du restart final et doit abandonner.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Haas F1 Team</td><td>Ocon remonte dans les points (P9) et signe le plus long relais de la course sur le dur (50 tours) ; Bearman, endommagé dès le tour 1, abandonne sur un problème de fiabilité distinct autour du tour 30.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Aston Martin</td><td>Alonso remonte de la P21 jusqu'aux points (P10) et signe le plus long relais de la course sur le tendre (55 tours) ; Stroll sort de piste au virage 19 et déclenche la première Safety Car de la chaîne d'événements qui mènera au drapeau rouge.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Audi</td><td>Bortoleto hors des points (P11) ; Hülkenberg pénalisé de 10 secondes pour avoir percuté Sainz lors du restart final, sans conséquence sur son classement.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Cadillac F1 Team</td><td>Aucun point marqué : Pérez, parti de la mauvaise case de grille, termine P15 ; Bottas abandonne sur des problèmes de températures de freins qui ont affecté l'écurie tout le week-end.</td></tr>
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
          <li><strong>Antonelli</strong>, pour un grand chelem sans faute et le titre de plus jeune vainqueur de l'histoire du Grand Prix de Monaco — cinquième victoire en six courses.</li>
          <li><strong>Gasly et Alpine</strong>, pour avoir été la seule écurie à contester une pénalité injustifiée et à récupérer un podium par droit de révision post-course.</li>
          <li><strong>Piastri</strong>, pour son premier week-end complet de la saison et le meilleur résultat de son année après deux forfaits consécutifs.</li>
        </ul>
      </div>
      <div class="verdictcol lose">
        <h4>Perdants</h4>
        <ul>
          <li><strong>Verstappen</strong>, pour une panne moteur qui a mis fin à sa course dès le premier tour, sans qu'il n'ait rien pu y faire.</li>
          <li><strong>Leclerc</strong>, pour avoir perdu une vraie chance de podium en s'écrasant au virage 19 exactement là où Stroll venait de sortir de piste quelques minutes plus tôt.</li>
          <li><strong>Russell et Sainz</strong>, victimes chacun d'une erreur qui n'était pas la leur — une pénalité mal purgée par son propre muret pour l'un, deux contacts subis lors du dernier restart pour l'autre.</li>
        </ul>
      </div>
    </div>
    <div class="callout">Monaco 2026 restera comme la course où un revêtement flambant neuf a réussi à interrompre un Grand Prix pour la première fois depuis 2008, et où une défaillance de chronométrage a distribué cinq pénalités injustifiées dont une seule a été corrigée. Au milieu de ce chaos, Antonelli n'a pas cédé un seul tour de tête : cinquième victoire en six courses, 66 points d'avance au championnat, et un statut de plus jeune vainqueur de l'histoire à Monaco que rien, ce jour-là, n'est venu contester.</div>
  </div>
</section>

<section class="block" id="sec-r-next">
  <div class="prose">
    <h2 class="sectitle">Enseignements pour la suite</h2>
    <p>Trois points issus de Monaco à surveiller dans les prochaines courses :</p>
    <ol style="padding-left:20px; margin:0 0 16px;">
      <li style="margin-bottom:10px;">La domination d'<strong>Antonelli</strong> — cinq victoires en six courses, 66 points d'avance — pose déjà la question d'une saison verrouillée tôt. À surveiller aussi : la gestion interne Mercedes après une erreur de pénalité qui a coûté cher à Russell, un scénario qui, s'il se répète, deviendra vite un sujet d'équipe.</li>
      <li style="margin-bottom:10px;">L'erreur de calibration du système de chronométrage FIA/FOM dans la voie des stands a coûté une pénalité injustifiée à cinq pilotes, mais une seule — celle de Gasly, contestée par Alpine — a été corrigée. Reste à voir si la FIA revoit sa procédure de révision pour que la correction ne dépende plus du bon vouloir d'une seule écurie.</li>
      <li><strong>Verstappen</strong> repart de Monaco avec un abandon dès le premier tour sur panne moteur, sur un bloc déjà promis au remplacement avant Barcelone. Sa première victoire de la saison — toujours attendue — devra passer par une fiabilité qui n'a pas tenu ici.</li>
    </ol>
  </div>
</section>

<section class="block" id="sec-r7">
  <details class="sources">
    <summary>Sources utilisées — GP de Monaco (13 liens)</summary>
    <div class="srcgroup">
      <h5>Base de données The Pit Wall</h5>
      <ul>
        <li><span class="desc">Résultats, grille, arrêts, relais pneus, temps au tour et de secteur, météo en série temporelle, chronologie complète des messages de course (drapeau rouge, Safety Car, pénalités, enquêtes) — alimentés depuis l'API OpenF1 (scripts/ingest_openf1.py). Source primaire pour l'ensemble des faits chiffrés de cet article ; le classement restitué est déjà celui, définitif, issu du droit de révision d'Alpine.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Course et pneus — sources primaires</h5>
      <ul>
        <li><a href="https://press.pirelli.com/kimi-antonelli-wins-the-monaco-grand-prix/" data-desc="Compte rendu officiel Pirelli de la course, stratégies pneus et citation du directeur motorsport.">Antonelli remporte le Grand Prix de Monaco</a><span class="desc">Pirelli Press — communiqué officiel, lu directement</span></li>
        <li><a href="https://press.pirelli.com/the-tyre-compound-selections-for-monte-carlo-and-barcelona/" data-desc="Nominations officielles des composés pour Monaco et Barcelone.">Nominations de gommes — Monaco et Barcelone</a><span class="desc">Pirelli Press — communiqué officiel, lu directement</span></li>
        <li><a href="https://www.formula1.com/en/results/2026/races/1286/monaco/fastest-laps" data-desc="Page officielle des meilleurs tours de course, confirmant le tour 76 d'Antonelli en 1:13.481.">Meilleurs tours — GP de Monaco 2026</a><span class="desc">Formula1.com — document de chronométrage officiel</span></li>
        <li><a href="https://www.mercedesamgf1.com/reports/race-report-kimi-makes-history-with-victory-in-monaco" data-desc="Compte rendu officiel de l'écurie Mercedes-AMG F1, confirmant le statut de plus jeune vainqueur à Monaco.">Antonelli entre dans l'histoire à Monaco</a><span class="desc">Mercedes-AMG F1 — compte rendu officiel de l'écurie</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Le virage 19 : deux sorties de piste et un revêtement qui se délite</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/monaco-gp-red-flagged-after-f1-cars-crash-on-broken-track-surface/" data-desc="Séquence complète des deux accidents au virage 19 et cause officielle du drapeau rouge.">Monaco GP red-flagged after cars crash on broken track surface</a><span class="desc">The Race</span></li>
        <li><a href="https://sports.yahoo.com/articles/lance-stroll-crashes-monaco-gp-143720349.html" data-desc="Détail de la sortie de piste de Stroll et de la Safety Car qu'elle a provoquée.">Lance Stroll crashes out of Monaco GP</a><span class="desc">Yahoo Sports</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>L'abandon de Verstappen</h5>
      <ul>
        <li><a href="https://www.espn.com/f1/story/_/id/48965023/monaco-grand-prix-formula-1-max-verstappen-retires-stalling-grid" data-desc="Récit de l'abandon de Verstappen dès la fin du premier tour.">Verstappen retires after stalling on the grid</a><span class="desc">ESPN</span></li>
        <li><a href="https://www.autosport.com/f1/news/max-verstappen-reveals-cause-of-shock-monaco-gp-retirement-engine-just-dropped-dead/10827939/" data-desc="Citation de Verstappen sur la panne moteur qui a mis fin à sa course.">Verstappen : « the engine just dropped dead »</a><span class="desc">Autosport</span></li>
        <li><a href="https://www.crash.net/f1/news/1097571/1/red-bull-identifies-cause-max-verstappens-f1-monaco-gp-retirement" data-desc="Confirmation par Red Bull de la panne moteur et du contexte du remplacement de bloc prévu avant Barcelone.">Red Bull identifies cause of Verstappen's retirement</a><span class="desc">Crash.net</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>La défaillance de chronométrage et ses suites</h5>
      <ul>
        <li><a href="https://www.planetf1.com/features/formula-1-monaco-penalty-reversal-fia-fom-breakdown" data-desc="Explication détaillée de l'erreur de calibration des boucles de chronométrage dans la voie des stands.">Monaco penalty reversal exposes FIA-FOM breakdown</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/gasly-regains-monaco-grand-prix-podium-place-after-alpines-right-of-review-successful.74q7jouVAIQxtDv4oGdEgz" data-desc="Détail du droit de révision d'Alpine et de son effet sur le classement final (Gasly P3, Hadjar P4).">Gasly regains Monaco Grand Prix podium place</a><span class="desc">Formula1.com — article éditorial</span></li>
        <li><a href="https://www.the-race.com/formula-1/george-russell-double-penalty-f1-monaco-gp-explained/" data-desc="Explication de la double pénalité de Russell et de l'erreur de Mercedes dans son exécution.">Russell's double penalty that ruined Monaco GP explained</a><span class="desc">The Race</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Le restart final et le double contact sur Sainz</h5>
      <ul>
        <li><a href="https://sports.yahoo.com/articles/james-vowles-reveals-costly-carlos-081537171.html" data-desc="Réaction de James Vowles sur les dégâts subis par Sainz lors du restart final.">James Vowles reveals costly Carlos Sainz blow after Monaco GP crash</a><span class="desc">Yahoo Sports</span></li>
      </ul>
    </div>
  </details>
</section>
`;
