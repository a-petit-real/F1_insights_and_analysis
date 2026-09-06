// Analyse Round 3 — Grand Prix du Japon 2026 (Suzuka).
// Rédigé à partir de scripts/race_briefing*.py (base de données The Pit
// Wall, alimentée par OpenF1 : résultats, arrêts, pneus, temps au tour
// et de secteur, météo en série temporelle, chronologie complète des
// messages de course) et de recherches web ciblées (WebSearch) pour le
// contexte non capturé en base (cause du crash de Bearman, citations
// d'après-course, explication du programme d'essais de Williams sur la
// voiture d'Albon). Ce n'était pas un week-end Sprint (calendrier 2026 :
// le premier Sprint de la saison a lieu à Shanghai — vérifié, cf. Round
// 2 — la manche suivante est Miami début mai). Deux sources primaires
// externes : le communiqué Pirelli sur les nominations de gommes pour
// les trois premières courses (press.pirelli.com, déjà cité en Round 1
// et 2, relu ici pour la section spécifique à Suzuka) et le compte
// rendu officiel de course sur formula1.com — tous deux récupérés via
// fetch-url.yml. Les autres articles de presse (PlanetF1, RacingNews365,
// Sky Sports, Crash.net, Motorsport.com/Yahoo, RaceFans) sont des
// sources secondaires, citées comme telles. Le tour le plus rapide
// d'Antonelli (tour 49, 1:32,432) est confirmé indépendamment par trois
// sources : le champ fastest_lap de la base, notre propre relevé tour
// par tour, et la page officielle des meilleurs tours de formula1.com —
// même niveau de triple vérification que pour Antonelli en Round 2.
export const ROUND3_ANALYSE_FR_HTML = `
<div class="hero prose">
  <p class="eyebrow">Grand Prix du Japon · Suzuka · 2026</p>
  <p class="verdict">Antonelli signe sa deuxième victoire consécutive — offerte par le crash à 50G de Bearman, pas construite sur le rythme de course.</p>
  <div class="resultstrip">
    <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes</span></div>
    <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">McLaren · +13,722s</span></div>
    <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari · +15,270s</span></div>
    <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes · +15,754s</span></div>
    <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren · +23,479s</span></div>
  </div>
  <p class="subverdict">Piastri prend un envol parfait et mène la course entière jusqu'au tour 18, poursuivi sans relâche par les deux Mercedes en pleine remontée après un départ raté d'Antonelli. Mais la course bascule au tour 22 : un choc à 50G d'Oliver Bearman à Spoon Curve, provoqué par un écart de vitesse de clôture avec la voiture de Colapinto en mode de récupération d'énergie, déclenche la Safety Car pile au moment où Antonelli — encore chaussé de ses pneus de départ, provisoirement en tête sur la piste — n'avait pas encore effectué son arrêt. Le pilote Mercedes plonge dans les stands sous neutralisation et ressort en tête pour ne plus jamais être inquiété. Russell, qui venait de s'arrêter une poignée de tours plus tôt en conditions de course normale, n'a pas eu cette chance et l'a fait savoir après l'arrivée. Piastri décroche malgré tout le premier podium de la saison pour lui et pour McLaren ; Bearman s'en sort sans fracture.</p>
</div>

<section class="block" data-num="01" id="sec-r1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Le contexte avant la course</h2>
    <p>Antonelli signe la pole devant Russell, à un peu moins de trois dixièmes — un doublé Mercedes en qualifications qui masque un accroc plus grave un peu plus loin sur la grille : Verstappen est sorti en Q2, la grande histoire du samedi, et s'élance onzième, loin de son standing habituel. Piastri complète la première ligne en troisième position, devant Leclerc, Norris et Hamilton. Le départ est retardé de dix minutes, le temps de réparer des barrières endommagées lors d'une course de soutien.</p>
    <p>Pirelli avait nominé la sélection la plus dure de ses trois premières courses de la saison pour Suzuka — C1, C2 et C3, en dur/medium/tendre — présentée par le manufacturier comme la plus exigeante des trois week-ends d'ouverture pour les pneus, du fait des changements d'appuis à haute vitesse qui sollicitent fortement la gomme. <a href="https://press.pirelli.com/complete-f1-tyre-range-for-the-first-three-grands-prix-of-2026/" data-desc="Communiqué officiel Pirelli sur les nominations de gommes pour les trois premières courses de 2026.">Communiqué Pirelli — nominations Melbourne/Shanghai/Suzuka</a> Le communiqué rappelait qu'en 2025 les faibles températures de piste et une bonne résistance au grainage avaient permis une course à un seul arrêt sur cette même allocation — un scénario que la grille a très largement suivi cette année encore : au retrait des couvertures chauffantes, 21 des 22 pilotes s'élancent en medium, seul Bottas partant en dur.</p>
    <p>Côté météo, rien à signaler : conditions stables et sèches sur toute la course, air entre 17,3 et 19,5°C, piste entre 29,2 et 38,3°C, humidité entre 44,7 et 62,8%, aucune pluie. Comme à Melbourne, la stratégie s'est jouée sur la piste et le hasard du chronométrage, pas sur un pari météo.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-r2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

    <h3 class="subtitle">Piastri s'envole, Antonelli recule</h3>
    <p>Au départ, Piastri prend un envol superbe et s'empare de la tête dès le premier virage pendant que les deux Mercedes, pourtant premières sur la grille, reculent nettement — Antonelli chute jusqu'à la sixième place. Leclerc profite lui aussi d'un bon départ pour prendre la deuxième position, avant que Russell n'entame une remontée méthodique : troisième au tour 3 en doublant Norris, deuxième au tour 4 en passant Leclerc. Antonelli suit le même chemin un peu plus loin dans le peloton.</p>

    <h3 class="subtitle">La bagarre à trois pour la tête</h3>
    <p>Au huitième tour, Russell revient à quelques dixièmes de Piastri et tente une manœuvre au dernier virage — reprise aussitôt par le pilote McLaren au premier virage suivant. Derrière eux, Norris retient Antonelli tout en cherchant lui-même une ouverture sur Leclerc, les trois hommes verrouillés dans une bagarre à couteaux tirés. Antonelli finit par passer Norris au tour 11, dans un mouvement qui rappelle celui de Russell sur Piastri quelques tours plus tôt, puis tente Leclerc à plusieurs reprises sans succès — le Monégasque referme la porte à chaque fois.</p>

    <h3 class="subtitle">La fenêtre des stands avant le drame</h3>
    <p>La première vague d'arrêts s'étale entre les tours 16 et 19, en conditions de course normales : Norris et Bearman au tour 16, Leclerc et Colapinto au 17 (Leclerc en profite pour ressortir devant Norris), Lindblad et Piastri au 18, puis Hadjar, Ocon et Bottas au 19. Russell s'arrête au tour 21, en tête de course avec Antonelli et redoutant déjà d'y perdre du temps : « je pense que je vais perdre beaucoup de temps de course à prolonger », confie-t-il par radio peu avant. Stroll s'arrête au même tour, mais dans des conditions manifestement anormales — son passage aux stands dure plus d'une minute quarante, signe avant-coureur du problème qui mettra fin à sa course.</p>

    <h3 class="subtitle">Le crash à 50G de Bearman et l'arrêt gratuit d'Antonelli</h3>
    <p>Au tour 22, Bearman percute le mur extérieur de Spoon Curve (virage 13) à 50G. Il aborde la courbe plein gaz dans le sillage de la voiture de Colapinto, elle-même en mode de récupération d'énergie — un écart de vitesse de clôture d'environ 50 km/h entre les deux voitures roulant dans la même direction, sans que Bearman n'ait été prévenu. Pour éviter l'accrochage, il part sur l'herbe, perd le contrôle et heurte la barrière de plein fouet. Les commissaires signalent l'incident (« TURN 13 INCIDENT INVOLVING CARS 43 (COL) AND 87 (BEA) »), l'examinent et le classent sans suite. La Safety Car est déployée à 05:48:11 (heure de session), avec un véhicule de récupération engagé au virage 13.</p>
    <p>C'est le tournant de la course. Antonelli, qui n'avait pas encore effectué son arrêt et occupait provisoirement la tête sur la piste, plonge dans la voie des stands sous neutralisation et en ressort premier — un arrêt rendu quasiment gratuit par le resserrement des écarts sous SC, exactement le même mécanisme que celui qui avait offert la course à Mercedes à Melbourne via le VSC. Hamilton, Gasly, Verstappen, Lawson, Bortoleto, Sainz et le premier des six arrêts d'Albon suivent tous au même tour. Piastri, arrêté une fenêtre plus tôt en conditions normales, ressort sixième après son propre passage — la course se rejoue entièrement autour de cette synchronisation de hasard.</p>

    <h3 class="subtitle">Relance et fin de course</h3>
    <p>La relance se déroule sans accroc pour Antonelli, qui prend le large et ne sera plus jamais inquiété : il franchit la ligne avec 13,722 secondes d'avance sur Piastri, signant au passage le meilleur tour de la course au tour 49 en 1:32,432 — une donnée confirmée de manière redondante par trois sources indépendantes (le classement officiel en base, notre propre relevé tour par tour, et la page officielle des meilleurs tours de formula1.com). Piastri conserve la deuxième place jusqu'à l'arrivée pour son premier résultat classé de la saison — après avoir manqué le départ en Australie puis en Chine — et le premier podium de McLaren cette année. Leclerc résiste à un featherweight Russell revenu dans ses roues et prend la troisième place, laissant le pilote Mercedes en quatrième position, visiblement frustré du minutage de la Safety Car après l'arrivée. Norris règle Hamilton dans les derniers tours pour la cinquième place, tandis que Gasly repousse un Verstappen revenu de la onzième place sur la grille pour seulement 0,337 seconde à l'arrivée.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-r3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

    <h3 class="subtitle">Mercedes — deux stratégies, une seule gagnante</h3>
    <p>Les deux Mercedes n'ont pas couru la même course de stands. Antonelli, resté dehors plus longtemps, a profité malgré lui de la synchronisation parfaite entre son arrêt encore à venir et la Safety Car provoquée par Bearman. Russell, arrêté un tour plus tôt en conditions normales pour ne pas perdre davantage de temps sur la piste, n'a bénéficié d'aucun de ces avantages et a vu la course lui échapper sur un simple concours de circonstances. Le résultat — deuxième victoire consécutive pour Antonelli, qui prend la tête du championnat, contre une quatrième place frustrante pour Russell — tient entièrement à ce hasard de calendrier, pas à un choix stratégique différenciant du muret.</p>

    <h3 class="subtitle">McLaren — Piastri transforme enfin l'essai</h3>
    <p>Après deux manches sans le moindre tour disputé (sortie de piste au tour de reconnaissance en Australie, panne électrique avant le départ en Chine), Piastri signe un envol parfait, mène dix-sept tours et conserve la deuxième place jusqu'à l'arrivée malgré un arrêt un cran moins favorable que celui d'Antonelli. Premier résultat de la saison, premier podium de l'écurie. Norris, engagé dans la bagarre à trois pour la tête puis dans un arrêt précoce avant la Safety Car, termine cinquième après avoir dû batailler jusqu'au bout pour tenir Hamilton à distance.</p>

    <h3 class="subtitle">Ferrari — Leclerc gère, Hamilton suit</h3>
    <p>Leclerc a repoussé la pression d'Antonelli en piste avant son arrêt, puis a profité d'un passage aux stands efficace pour ressortir devant Norris et conserver cet avantage jusqu'au podium, résistant enfin à un Russell revenu dans ses échappements en fin de course. Hamilton, plus discret, termine sixième après avoir cédé la cinquième place à Norris dans les derniers tours.</p>

    <h3 class="subtitle">Red Bull — Verstappen répare une qualification manquée, Hadjar recule</h3>
    <p>Sorti en Q2 pour la première fois du week-end — « the big story » du samedi selon la presse spécialisée — Verstappen s'élance onzième et remonte méthodiquement jusqu'à la huitième place, à 0,337 seconde de Gasly à l'arrivée : la meilleure performance de pilotage pur du peloton ce dimanche-là. Hadjar, parti huitième, recule jusqu'à la douzième place sans que rien dans les données ne pointe vers un incident particulier — un simple déficit de rythme sur ce tracé.</p>

    <h3 class="subtitle">Haas et Aston Martin — deux abandons, deux histoires très différentes</h3>
    <p>Le crash de Bearman est l'événement qui a façonné toute la seconde moitié de course, jusqu'à décider du vainqueur — sans qu'aucune faute ne lui soit imputée par les commissaires, malgré ses propres critiques publiques après course sur la manœuvre défensive de Colapinto. Il s'en sort sans fracture. Chez Aston Martin, Stroll a lutté contre un problème suspecté de pression d'eau dès son premier arrêt (tour 21, anormalement long), multiplié les passages aux stands pour tenter d'y remédier, avant d'abandonner autour du tour 30 — une deuxième alerte fiabilité pour l'écurie après un début de saison déjà compliqué pour la marque.</p>

    <h3 class="subtitle">Williams — la fin de course d'Albon transformée en séance d'essais</h3>
    <p>Une fois hors de portée des points, Williams a délibérément transformé les derniers tours d'Albon en séance de test en conditions réelles, multipliant les arrêts (six au total) pour évaluer des réglages d'aileron avant — une décision assumée publiquement par le directeur d'équipe James Vowles après la course plutôt qu'un signe de difficulté mécanique.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-r4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
    <p>L'évaluation porte sur la course de dimanche, en tenant compte de la position de départ, de la voiture et des circonstances (source : base de données The Pit Wall, résultats/arrêts/pneus/temps au tour, complétée par la recherche web pour les causes d'incident et les citations).</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table class="verdict-table">
      <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
      <tbody>
        <tr><td><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>P1 → P1</td><td>Pole en qualifications mais départ raté (P6 au premier virage). Remontée jusqu'à la tête sur la piste avant son propre arrêt, synchronisé presque à la perfection avec la Safety Car du crash de Bearman. Meilleur tour de la course au tour 49 (1:32,432), triple-vérifié. Deuxième victoire consécutive, prend la tête du championnat.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Piastri</td><td>P3 → P2</td><td>Envol parfait, tête de course pendant dix-sept tours. Arrêt tour 18 en conditions normales — un cran moins favorable que celui d'Antonelli. Premier résultat classé de la saison après deux manches sans disputer un tour ; premier podium de McLaren cette année.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>P4 → P3</td><td>Repousse la pression d'Antonelli en piste, arrêt efficace au tour 17 qui le fait ressortir devant Norris. Résiste à un Russell revenu dans ses roues en fin de course pour conserver le podium.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Russell</td><td>P2 → P4</td><td>Remontée de P6 à P2 en quatre tours, tente de prendre la tête à Piastri au tour 8. Arrêt tour 21 en conditions normales, juste avant la Safety Car qui aurait pu le rendre gratuit — frustration exprimée après course sur le minutage.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Norris</td><td>P5 → P5</td><td>Engagé dans la bagarre à trois pour la tête avec Leclerc et Antonelli, arrêt précoce au tour 16 avant la Safety Car. Règle Hamilton dans les derniers tours pour conserver la cinquième place.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>P6 → P6</td><td>Course discrète, cède la cinquième place à Norris en fin de course. Incident au virage 16 (sortie de piste avec avantage) noté puis classé sans suite par les commissaires.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>P7 → P7</td><td>Repousse Verstappen jusqu'à la ligne pour seulement 0,337s d'écart, meilleur résultat Alpine du week-end.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>P11 → P8</td><td>Sorti en Q2 pour la première fois du week-end — élément marquant du samedi — repart onzième et remonte méthodiquement jusqu'à la huitième place, à 0,337s de Gasly. Meilleure performance de pilotage pur du peloton.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lawson</td><td>P14 → P9</td><td>Un seul arrêt (tour 22, dans la fenêtre de Safety Car), points marqués pour RB F1 Team.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>P12 → P10</td><td>Arrêt précoce (tour 19), course propre et sans incident jusqu'aux points, contrastant avec l'abandon de son coéquipier.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>P13 → P11</td><td>Stratégie étirée avec un arrêt tardif (tour 23, après le groupe de la Safety Car) ; termine juste devant les points sans les marquer.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>P8 → P12</td><td>Recul net depuis la P8 sans incident identifiable dans les données ; simple déficit de rythme sur ce tracé.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>P9 → P13</td><td>Arrêt dans la fenêtre de la Safety Car (tour 22) sans pouvoir remonter jusqu'aux points.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>P10 → P14</td><td>Arrêt précoce (tour 18), avertissement drapeau noir et blanc pour mouvement sous freinage en cours de course, sans conséquence sur le classement.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>P16 → P15</td><td>Course discrète pour Williams, classé sans être doublé.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>P15 → P16</td><td>Impliqué dans l'incident de Spoon Curve avec Bearman (tour 22), classé sans suite par les commissaires ; devancé par son coéquipier Gasly tout le week-end.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>P19 → P17</td><td>Lead Cadillac du week-end, un seul arrêt (tour 21), course sans incident notable.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Alonso</td><td>P21 → P18*</td><td>Deux arrêts (21, 23), course discrète loin des points. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>P20 → P19*</td><td>Seul pilote à s'élancer en pneus durs ; arrêt tour 19. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Albon</td><td>P17 → P20*</td><td>Six arrêts au total — Williams a transformé sa fin de course en séance d'essais de réglages d'aileron avant une fois hors de portée des points, selon les explications données par l'équipe après course. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Stroll</td><td>P22 → Abandon</td><td>Problème suspecté de pression d'eau dès le premier arrêt (tour 21, anormalement long) ; multiplie les passages aux stands pour tenter d'y remédier avant d'abandonner autour du tour 30.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>P18 → Abandon</td><td>Choc à 50G contre le mur extérieur de Spoon Curve (virage 13) au tour 22, provoqué par un écart de vitesse de clôture avec la voiture de Colapinto en mode de récupération d'énergie ; l'incident déclenche la Safety Car qui décide de la course. S'en sort sans fracture, incident classé sans suite par les commissaires.</td></tr>
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
        <tr><td><span class="dot" style="background:#00A19B"></span> Mercedes</td><td>Deuxième victoire consécutive pour Antonelli, mais deux stratégies de stand très différentes selon le pilote : Antonelli profite d'une Safety Car providentielle, Russell arrêté juste avant en paie le prix et termine frustré en P4.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> McLaren</td><td>Premier résultat classé et premier podium de la saison grâce à l'envol parfait de Piastri ; Norris cinquième après avoir tenu Hamilton à distance dans les derniers tours.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Ferrari</td><td>Leclerc troisième après avoir résisté à la pression d'Antonelli puis à celle de Russell ; Hamilton discret en sixième position.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Red Bull</td><td>Verstappen répare une élimination en Q2 par une remontée de P11 à P8, à 0,337s de Gasly ; Hadjar recule nettement depuis la P8 sans cause identifiée.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Alpine F1 Team</td><td>Gasly tient Verstappen à distance pour la septième place ; Colapinto impliqué dans l'incident de Spoon Curve avec Bearman, classé sans suite.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> RB F1 Team</td><td>Lawson marque des points (P9) ; Lindblad recule après un arrêt précoce et un avertissement en course sans conséquence.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Haas F1 Team</td><td>Ocon marque des points (P10) dans une course propre ; Bearman abandonne après un choc à 50G qui a directement décidé du vainqueur de la course, sans faute retenue contre lui.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Audi</td><td>Hülkenberg termine juste devant les points avec une stratégie étirée ; Bortoleto plus loin, tous deux hors du top 10.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Williams</td><td>Sainz discret en P15 ; Albon transforme sa fin de course en séance d'essais assumée (six arrêts) une fois hors de portée des points.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Aston Martin</td><td>Stroll abandonne après un problème suspecté de pression d'eau et plusieurs arrêts pour tenter d'y remédier ; Alonso termine loin des points, classé avec un tour de retard.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Cadillac F1 Team</td><td>Pérez lead Cadillac du week-end en P17 ; Bottas, seul pilote parti en pneus durs, classé avec un tour de retard. Aucun point marqué.</td></tr>
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
          <li><strong>Antonelli</strong>, pour une deuxième victoire consécutive et la tête du championnat, offerte par un tour de chance de calendrier plutôt que construite en piste ce dimanche-là.</li>
          <li><strong>Piastri et McLaren</strong>, pour un premier résultat classé et un premier podium de la saison après deux manches sans disputer un tour de course.</li>
          <li><strong>Verstappen</strong>, pour la remontée de pilotage la plus convaincante du peloton (P11 → P8) après une élimination en Q2.</li>
        </ul>
      </div>
      <div class="verdictcol lose">
        <h4>Perdants</h4>
        <ul>
          <li><strong>Russell</strong>, pour un arrêt effectué un tour trop tôt qui l'a privé de l'avantage offert par la Safety Car à son coéquipier — et lui a coûté le podium.</li>
          <li><strong>Bearman</strong>, pour un choc à 50G qui met fin à sa course et façonne malgré lui le résultat de toute la grille.</li>
          <li><strong>Stroll et Aston Martin</strong>, pour un abandon sur un problème de fiabilité qui prolonge un début de saison déjà difficile pour la marque.</li>
        </ul>
      </div>
    </div>
    <div class="callout">Piastri a mené dix-sept tours et Russell a piloté la course la plus rapide de son week-end — mais c'est le tour 22, et le crash de Bearman à Spoon Curve, qui a décidé de tout. Antonelli, encore chaussé de ses pneus de départ à ce moment précis, a transformé une Safety Car en cadeau ; son propre coéquipier, arrêté une poignée de tours plus tôt en conditions normales, en a payé le prix inverse. Trois courses, deux victoires Mercedes construites sur un hasard de calendrier plutôt que sur un rythme dominant.</div>
  </div>
</section>

<section class="block" id="sec-r-next">
  <div class="prose">
    <h2 class="sectitle">Enseignements pour la suite</h2>
    <p>Trois points issus de Suzuka à surveiller dans les prochaines courses :</p>
    <ol style="padding-left:20px; margin:0 0 16px;">
      <li style="margin-bottom:10px;">Le championnat se resserre chez <strong>Mercedes</strong> : Antonelli mène avec 72 points contre 63 pour Russell, un écart de neuf points construit en bonne partie sur des circonstances de course plutôt que sur un rythme systématiquement supérieur. La gestion interne de cette rivalité, déjà un thème récurrent la saison passée, sera à surveiller de près si l'écart continue de se creuser sur des bases aussi ténues.</li>
      <li style="margin-bottom:10px;">Le crash de <strong>Bearman</strong> a poussé la FIA à annoncer des réunions en avril pour réévaluer certains aspects du règlement 2026 — notamment les écarts de vitesse de clôture liés à la récupération d'énergie. Un sujet réglementaire à suivre qui peut affecter le développement des monoplaces en cours de saison.</li>
      <li><strong>Aston Martin</strong> encaisse un deuxième signal de fiabilité en trois courses (après un début de saison déjà compliqué). À surveiller : si Stroll et Alonso continuent d'accumuler les soucis mécaniques, la marque risque de perdre le fil d'une saison qui n'a pas encore vraiment démarré pour elle.</li>
    </ol>
  </div>
</section>

<section class="block" id="sec-r7">
  <details class="sources">
    <summary>Sources utilisées — GP du Japon (12 liens)</summary>
    <div class="srcgroup">
      <h5>Base de données The Pit Wall</h5>
      <ul>
        <li><span class="desc">Résultats, grille, arrêts, relais pneus, temps au tour et de secteur, météo en série temporelle, chronologie complète des messages de course — alimentés depuis l'API OpenF1 (scripts/ingest_openf1.py). Source primaire pour l'ensemble des faits chiffrés de cet article, y compris le champ fastest_lap et le relevé tour par tour utilisés pour la triple vérification du meilleur tour d'Antonelli.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Course et pneus — sources primaires</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/antonelli-takes-championship-lead-after-surging-to-victory-in-japan-from.4EC4uZc29IUEO2iE5nKpUp" data-desc="Compte rendu officiel de la course, chronologie des dépassements et des arrêts, citations et classement complet.">Compte rendu officiel de course — Antonelli prend la tête du championnat</a><span class="desc">Formula1.com — article officiel, lu directement</span></li>
        <li><a href="https://www.formula1.com/en/results/2026/races/1281/japan/fastest-laps" data-desc="Classement officiel des meilleurs tours de la course, utilisé pour la triple vérification du tour d'Antonelli.">Meilleurs tours — GP du Japon 2026</a><span class="desc">Formula1.com — résultats officiels, lus directement</span></li>
        <li><a href="https://press.pirelli.com/complete-f1-tyre-range-for-the-first-three-grands-prix-of-2026/" data-desc="Nominations officielles des composés pour les trois premières courses de 2026, y compris la justification spécifique à Suzuka.">Nominations de gommes — Melbourne, Shanghai, Suzuka</a><span class="desc">Pirelli Press — communiqué officiel, lu directement</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Le crash de Bearman</h5>
      <ul>
        <li><a href="https://www.planetf1.com/news/oliver-bearman-franco-colapinto-japanese-grand-prix-2026-crash-reaction" data-desc="Détails techniques du crash (écart de vitesse de clôture, mode de récupération d'énergie) et réactions de Bearman.">Bearman pointe du doigt Colapinto</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://racingnews365.com/oliver-bearman-hits-out-at-franco-colapinto-over-unacceptable-f1-defending" data-desc="Réaction de Bearman qualifiant la manœuvre défensive de Colapinto d'« inacceptable ».">Bearman qualifie la défense de Colapinto d'« inacceptable »</a><span class="desc">RacingNews365</span></li>
        <li><a href="https://www.skysports.com/f1/news/12040/13525701/japanese-gp-fia-to-assess-f1-2026-regulations-after-oliver-bearman-crash-at-suzuka-highlights-closing-speeds-issue" data-desc="Annonce de réunions de la FIA en avril pour réévaluer le règlement 2026 après le crash.">La FIA va réévaluer le règlement 2026</a><span class="desc">Sky Sports</span></li>
        <li><a href="https://www.crash.net/f1/feature/1092775/1/most-frightening-crash-2026-wake-call-f1-cannot-ignore" data-desc="Analyse du crash comme signal d'alarme pour la sécurité en 2026.">Le crash le plus effrayant de 2026</a><span class="desc">Crash.net</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Autres incidents et stratégies</h5>
      <ul>
        <li><a href="https://racingnews365.com/verstappen-escapes-punishment-before-stunning-suzuka-racingnews365-review" data-desc="Contexte de l'élimination de Verstappen en Q2 et de sa remontée en course.">Verstappen : de l'élimination en Q2 à la remontée</a><span class="desc">RacingNews365</span></li>
        <li><a href="https://www.formula1.com/en/video/stroll-reveals-the-issue-that-caused-his-dnf-in-japan.1860977473196947716" data-desc="Stroll explique le problème de pression d'eau à l'origine de son abandon.">Stroll explique son abandon</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.motorsport.com/f1/news/james-vowles-explains-why-williams-turned-alex-albons-japanese-gp-into-a-live-test-session/10810511/" data-desc="James Vowles explique la décision de transformer la fin de course d'Albon en séance d'essais.">Vowles explique les six arrêts d'Albon</a><span class="desc">Motorsport.com</span></li>
        <li><a href="https://www.racefans.net/2026/03/29/2026-japanese-grand-prix-interactive-data-lap-charts-times-and-tyres/" data-desc="Données interactives de course (temps au tour, pneus) utilisées pour recouper la chronologie des arrêts.">Données interactives de course</a><span class="desc">RaceFans</span></li>
      </ul>
    </div>
  </details>
</section>
`;
