// Analyse Round 5 — Grand Prix du Canada 2026 (Montréal, Circuit Gilles
// Villeneuve). Rédigé à partir de scripts/race_briefing*.py (base de
// données The Pit Wall, alimentée par OpenF1 : résultats, arrêts,
// pneus, temps au tour et de secteur, météo en série temporelle,
// chronologie complète des messages de course) et de recherches web
// ciblées (WebSearch) pour le contexte non capturé en base (causes des
// abandons, citations d'après-course, résultat du Sprint — non ingéré
// en base, cf. Round 2). Montréal était la troisième manche sprint de
// la saison 2026 ; le Sprint du samedi (vainqueur Russell devant
// Norris et Antonelli, avec un accrochage entre les deux Mercedes) est
// sourcé exclusivement via WebSearch et présenté comme secondaire. La
// source Pirelli sur cette course précise
// (antonelli-wins-the-canadian-grand-prix-hamilton-and-verstappen-on-the-podium)
// est une lecture primaire (press.pirelli.com, récupérée via
// fetch-url.yml) ; les autres articles de presse sont des sources
// secondaires, citées comme telles. Anomalie relevée en base et
// expliquée par la recherche : la course s'arrête au tour 68 et non
// 70 — écart confirmé indépendamment par un recoupement tour par tour
// (le tour 68 d'Antonelli se termine exactement à l'heure du drapeau
// à damier dans les messages de course) et par la presse spécialisée,
// qui l'attribue à la panne d'embrayage de Lindblad sur la grille et
// aux deux formation laps supplémentaires qui en ont résulté. Le
// meilleur tour d'Antonelli (tour 68, 1:14,210, signé sur le tout
// dernier tour de la course) est confirmé de manière redondante par
// trois sources : le champ fastest_lap de la base, notre propre
// relevé tour par tour, et le communiqué Pirelli, qui le compare
// explicitement au record de course 2025 — même rigueur de triple
// vérification que pour Round 2.
export const ROUND5_ANALYSE_FR_HTML = `
<div class="hero prose">
  <p class="eyebrow">Grand Prix du Canada · Montréal · 2026</p>
  <p class="verdict">Antonelli signe sa quatrième victoire consécutive sans l'aide d'un doublé Mercedes : Russell, en pole et auteur d'une bagarre féroce pour la tête, abandonne sur panne moteur au tour 30 — et McLaren repart de Montréal sans le moindre point, pour la deuxième fois en cinq courses.</p>
  <div class="resultstrip">
    <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes</span></div>
    <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari · +10,768s</span></div>
    <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · +11,276s</span></div>
    <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari · +44,151s</span></div>
    <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Hadjar</span> <span class="gap">Red Bull · +5,033s</span></div>
  </div>
  <p class="subverdict">Pole position la veille et vainqueur du Sprint du samedi, Russell mène une bagarre acharnée avec son propre coéquipier pour la tête de course pendant près de trente tours — jusqu'à l'abandon sur panne du groupe propulseur qui met fin à son week-end au tour 30. Sa voiture immobilisée déclenche la seule Virtual Safety Car qui ait vraiment compté : tout le peloton de tête en profite pour s'arrêter en une seule fenêtre, au tour 31. Antonelli n'est ensuite plus jamais inquiété et signe même le meilleur tour de la course sur le tout dernier passage. Hamilton devance Leclerc pour la deuxième place — l'inverse de l'ordre habituel chez Ferrari cette saison — et Verstappen complète le podium. McLaren, elle, repart de Montréal sans un seul point : mauvais pari sur les pneus intermédiaires au départ, panne de boîte de vitesses pour Norris au tour 40, pénalité de dix secondes pour Piastri après avoir percuté Albon.</p>
</div>

<section class="block" data-num="01" id="sec-r1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Le contexte avant la course</h2>
    <p>Montréal ouvrait la troisième des six manches sprint de la saison 2026. Le Sprint du samedi a livré son propre accrochage entre les deux Mercedes : Russell s'impose après s'être frotté à Antonelli, devant Norris et Antonelli lui-même. Alonso, qui souffrait déjà d'une gêne liée à la position de son siège, avait dû abandonner dès le Sprint — un problème qui allait le rattraper dès le lendemain.</p>
    <p>Les qualifications du dimanche placent Russell en pole devant Antonelli, Norris troisième et Piastri quatrième — Hamilton et Verstappen s'élancent respectivement cinquième et sixième. Lindblad, pour sa part, réalise sa meilleure qualification de la saison en se classant neuvième.</p>
    <p>Pirelli avait nominé la même allocation de composés que pour Melbourne en ouverture de saison — C3, C4 et C5, en dur/medium/tendre. Un risque de pluie de 50% annoncé avant le départ a poussé quatre équipes à jouer la carte des pneus intermédiaires sur la grille : les deux McLaren, les deux Audi, les deux Cadillac et la Williams de Sainz. Gasly, Colapinto et Lawson (ainsi que Lindblad, resté sur la grille) avaient eux choisi le medium, le reste du plateau s'élançant en tendres. La pluie n'est jamais venue : la piste était sèche dès l'extinction des feux, et tous les pneus intermédiaires ont été remplacés par des gommes slick dans les trois premiers tours. « La décision de quatre équipes, dont McLaren, de chausser des intermédiaires en anticipation d'un changement de temps était un pari qui n'a pas payé », résumera après course le directeur motorsport de Pirelli, Dario Marrafuschi. <a href="https://press.pirelli.com/antonelli-wins-the-canadian-grand-prix-hamilton-and-verstappen-on-the-podium/" data-desc="Compte rendu officiel Pirelli de la course, stratégies pneus et citation du directeur motorsport.">Compte rendu Pirelli — Antonelli remporte le Grand Prix du Canada</a></p>
    <p>La grille a par ailleurs connu un épisode inhabituel avant même le tour de formation : une panne d'embrayage a bloqué la voiture de Lindblad sur sa grille de départ, obligeant à deux formation laps supplémentaires le temps de dégager la monoplace. Lindblad n'a finalement jamais pris le départ, et la distance de course en a été réduite à 68 tours au lieu des 70 prévus — un écart que notre propre recoupement tour par tour confirme : le soixante-huitième et dernier tour d'Antonelli se termine exactement à l'heure du drapeau à damier enregistrée dans les messages de course.</p>
    <p>Côté météo, conditions fraîches et stables : 12,1 à 13,7°C dans l'air, 16,3 à 19,1°C sur la piste, aucune pluie malgré les prévisions, humidité entre 65,4 et 79,2%.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-r2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

    <h3 class="subtitle">Le pari des intermédiaires vole en éclats dès le premier tour</h3>
    <p>La piste sèche condamne immédiatement le pari pris par McLaren, Audi, Cadillac et Williams (pour Sainz) : tous rentrent aux stands dans les tout premiers tours pour chausser des gommes slick. Norris, déjà pénalisé par ce choix, doit en plus s'arrêter tôt pour nettoyer des radiateurs en surchauffe. Piastri, lui, repasse par la voie des stands dès le tour 1 pour changer de composé.</p>

    <h3 class="subtitle">Russell et Antonelli, une bagarre à deux qui tourne court</h3>
    <p>Devant, Russell et Antonelli se livrent une bagarre de tous les instants pour la tête de course — au point qu'un accrochage entre les deux voitures au virage 13, vers le tour 24, est noté par les commissaires avant d'être classé sans suite. Vers le tour 11, Piastri percute Albon au virage 10 ; les commissaires lui infligent une pénalité de dix secondes pour collision, purgée en course. Albon ne repasse plus jamais par les stands et termine sa course prématurément, sans réparation possible.</p>

    <h3 class="subtitle">L'abandon de Russell fige la stratégie de tout le peloton de tête</h3>
    <p>Au tour 30, la bagarre pour la tête s'arrête net : la voiture de Russell tombe en panne de groupe propulseur près du virage 9. Les commissaires interviennent, une Virtual Safety Car est déployée. Tout le peloton de tête en profite pour s'arrêter en une seule fenêtre au tour 31 — Antonelli, Hamilton, Verstappen, Leclerc et Hadjar changent tous de gommes dans la foulée, un groupe de poursuivants (Bearman, Colapinto, Gasly, Lawson, Sainz, Ocon) faisant de même au tour 30. Pirelli qualifiera après course le train de tendres initial de « joker » de la journée, tant il a tenu jusqu'à cette première neutralisation.</p>

    <h3 class="subtitle">Alonso, une gêne physique déjà présente en Sprint</h3>
    <p>Alonso abandonne au tour 23, victime d'une gêne physique liée à la position de son siège — un problème qui l'avait déjà contraint à l'abandon lors du Sprint de la veille, et qu'Aston Martin n'était pas parvenue à corriger d'ici le dimanche.</p>

    <h3 class="subtitle">Norris s'arrête à l'épingle, Pérez perd une suspension</h3>
    <p>Norris, huitième et en pleine remontée malgré son départ compromis, doit garer sa McLaren à l'épingle de Montréal au tour 40 : une panne de boîte de vitesses indépendante des soucis de surchauffe du début de course. Six tours plus tôt, au tour 46 selon notre recoupement — la suspension avant droite de la Cadillac de Pérez a cédé spectaculairement près de l'entrée de la voie des stands, provoquant la deuxième Virtual Safety Car de la course, le temps de dégager les débris aux abords des virages 12 et 13. Une troisième et brève VSC survient vers le tour 53, sans qu'aucune voiture ne semble immobilisée cette fois — probablement un nouveau nettoyage de débris.</p>

    <h3 class="subtitle">Hadjar tire parti des neutralisations, Antonelli conclut en beauté</h3>
    <p>Hadjar s'écarte de la stratégie à un arrêt de ses concurrents directs avec trois passages aux stands (tours 31, 52 et 62), profitant des deux neutralisations tardives pour des arrêts à moindre coût — sans jamais perdre sa cinquième place. Devant, la course d'Antonelli ne connaît plus aucune alerte après le tour 31 : il conclut sa domination par le meilleur tour de la course, signé sur le tout dernier passage (tour 68, 1:14,210) — une performance confirmée de façon redondante par trois sources indépendantes : le classement officiel en base, notre propre relevé tour par tour, et le communiqué Pirelli, qui la compare explicitement au meilleur tour en course de 2025.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-r3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

    <h3 class="subtitle">Le pari des intermédiaires — une lecture de la météo qui a coûté cher</h3>
    <p>Quatre équipes ont anticipé un changement de temps qui ne s'est jamais produit : McLaren, Audi, Cadillac et Williams (pour Sainz) partent en intermédiaires sur une piste qui se révèle sèche dès l'extinction des feux. Le pari coûte un tour de retard immédiat à chacun de ces pilotes, qui doivent tous rejoindre les stands dans les trois premiers tours pour chausser des gommes slick — une pénalité que Pirelli elle-même qualifiera de pari perdant après course.</p>

    <h3 class="subtitle">Mercedes — pas de doublé, mais pas d'erreur stratégique non plus</h3>
    <p>Il n'y a pas de décision stratégique à remettre en cause côté Mercedes : l'arrêt d'Antonelli au tour 31, sous VSC, est aussi propre que possible. La perte du doublé tient entièrement à la fiabilité — l'abandon de Russell — et non à un choix de stand.</p>

    <h3 class="subtitle">Ferrari — même stratégie, ordre inversé</h3>
    <p>Leclerc et Hamilton suivent une stratégie strictement identique (tendre puis medium, arrêt au tour 31), sans le moindre geste distinctif entre les deux voitures. La seule variable, c'est le rythme pur : Hamilton devance son coéquipier pour la deuxième place, une inversion de l'ordre habituel chez Ferrari cette saison.</p>

    <h3 class="subtitle">Alpine — la stratégie alternative qui paie</h3>
    <p>Gasly et Colapinto partent tous les deux en medium avant de passer au dur, une stratégie que Pirelli qualifie elle-même de « notable » dans son compte rendu. Le résultat — sixième et huitième places — valide un choix différent de celui du gros du peloton, qui partait en tendre.</p>

    <h3 class="subtitle">Red Bull — un podium classique, un pari opportuniste</h3>
    <p>Verstappen coche toutes les cases d'une course sans relief particulier : un seul arrêt, un podium tranquille. Hadjar, en revanche, choisit un chemin plus risqué à trois arrêts, profitant des deux neutralisations tardives pour limiter le coût de ses passages supplémentaires — et conserve malgré tout sa cinquième place jusqu'à l'arrivée.</p>

    <h3 class="subtitle">McLaren — un week-end à la fois stratégique et mécanique</h3>
    <p>Rien n'a fonctionné pour l'écurie championne du monde en titre à Montréal. Le pari sur les intermédiaires plombe la course des deux voitures dès le départ ; Norris y ajoute un problème de surchauffe puis une panne de boîte qui le contraint à l'abandon au tour 40 ; Piastri écope d'une pénalité de dix secondes pour avoir percuté Albon et ne marque aucun point. Deuxième zéro pointé en cinq courses pour McLaren après la Chine, où les deux voitures n'avaient même pas pris le départ.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-r4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
    <p>L'évaluation porte sur la course de dimanche, en tenant compte de la position de départ, de la voiture et des circonstances (source : base de données The Pit Wall, résultats/arrêts/pneus/temps au tour, complétée par la recherche web pour les causes d'abandon et de forfait).</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table class="verdict-table">
      <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
      <tbody>
        <tr><td><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>P2 → P1</td><td>Quatrième victoire consécutive. Un seul arrêt (tour 31, sous VSC1), contrôle la course après l'abandon de Russell. Signe le meilleur tour de la course sur le tout dernier passage (1:14,210), confirmé par trois sources indépendantes.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>P5 → P2</td><td>Stratégie à un arrêt identique à Leclerc ; devance son coéquipier pour la deuxième place, l'inverse de l'ordre habituel chez Ferrari cette saison.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>P6 → P3</td><td>Course sans accroc, un seul arrêt (tour 31), troisième place qui limite la casse pour Red Bull.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>P8 → P4</td><td>Même stratégie qu'Hamilton, devancé par son coéquipier sur l'ensemble de la course.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>P7 → P5</td><td>Stratégie atypique à trois arrêts (31, 52, 62), tire parti des deux neutralisations tardives pour rentrer aux points malgré des passages supplémentaires.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>P10 → P6</td><td>Stratégie medium-vers-dur saluée par Pirelli comme « notable », meilleur résultat Alpine du week-end.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lawson</td><td>P12 → P7</td><td>Un seul arrêt (tour 30), belle remontée pour marquer des points.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>P14 → P8</td><td>Même stratégie que Colapinto, deuxième voiture Alpine dans les points.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>P15 → P9</td><td>Parti en intermédiaires comme plusieurs autres, deux arrêts (2, 30) après le passage aux gommes slick ; seul point marqué pour Williams.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>P16 → P10</td><td>Un seul arrêt (tour 30), dernier point disponible.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Piastri</td><td>P4 → P11*</td><td>Parti en intermédiaires, pénalité de dix secondes pour avoir percuté Albon au virage 10 vers le tour 11, trois arrêts (1, 12, 51), aucun point. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>P11 → P12*</td><td>Parti en intermédiaires, deux arrêts (2, 20), hors des points. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>P13 → P13*</td><td>Parti en intermédiaires, deux arrêts (2, 18), pénalité de cinq secondes pour infraction au VSC. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>P17 → P14*</td><td>Deux arrêts (16, 30), hors des points. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Stroll</td><td>P22 → P15</td><td>Deux arrêts (14, 49), hors des points — mais devance cette fois plusieurs voitures classées, contrairement à l'Australie.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>P21 → P16*</td><td>Parti en intermédiaires, quatre arrêts (3, 9, 29, 49), dernier classé à l'arrivée. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>P20 → Abandon</td><td>Parti en intermédiaires ; rupture de la suspension avant droite près de l'entrée des stands au tour 46 — première panne de la saison pour lui, à l'origine de la deuxième Virtual Safety Car de la course.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Norris</td><td>P3 → Abandon</td><td>Parti en intermédiaires comme son coéquipier, arrêt précoce pour nettoyer des radiateurs en surchauffe, panne de boîte de vitesses au tour 40 alors qu'il pointait huitième.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Russell</td><td>P1 → Abandon</td><td>Pole position et vainqueur du Sprint la veille ; mène une bagarre acharnée avec Antonelli pour la tête avant d'abandonner sur panne du groupe propulseur au tour 30 — l'abandon qui déclenche la VSC exploitée par tout le peloton de tête.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Alonso</td><td>P19 → Abandon</td><td>Abandon au tour 23 pour une gêne physique liée à la position du siège, déjà présente lors du Sprint de la veille où il avait également abandonné.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Albon</td><td>P18 → Abandon</td><td>Percuté par Piastri au virage 10 vers le tour 11 ; ne repasse plus par les stands et termine la course prématurément sans réparation.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>P9 → N'a pas pris le départ</td><td>Meilleure qualification de sa saison, mais panne d'embrayage sur la grille avant le départ ; deux formation laps supplémentaires pour tenter de libérer la voiture, sans succès — la course est finalement raccourcie à 68 tours.</td></tr>
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
        <tr><td><span class="dot" style="background:#00A19B"></span> Mercedes</td><td>Quatrième victoire de suite pour Antonelli, mais pas de doublé cette fois : Russell abandonne sur panne moteur au tour 30 après avoir mené une bagarre féroce pour la tête de course.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Ferrari</td><td>Stratégie identique pour les deux voitures ; Hamilton devance Leclerc pour la deuxième place, une inversion de l'ordre habituel de l'écurie cette saison.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> McLaren</td><td>Zéro point pour la deuxième fois en cinq courses. Mauvais pari sur les intermédiaires au départ, panne de boîte pour Norris (tour 40), pénalité de dix secondes pour Piastri après avoir percuté Albon.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Red Bull</td><td>Podium tranquille pour Verstappen ; stratégie opportuniste à trois arrêts payante pour Hadjar, cinquième malgré des passages supplémentaires.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Alpine F1 Team</td><td>Stratégie medium-vers-dur saluée par Pirelli comme « notable » ; Colapinto et Gasly marquent tous les deux (P6 et P8).</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> RB F1 Team</td><td>Lawson dans les points (P7) ; Lindblad ne prend jamais le départ après une panne d'embrayage sur la grille qui raccourcit la course entière à 68 tours.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Williams</td><td>Sainz dans les points (P9) malgré le pari raté sur les intermédiaires ; Albon abandonne après avoir été percuté par Piastri.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Haas F1 Team</td><td>Bearman marque le dernier point disponible (P10) ; Ocon termine hors des points (P14).</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Audi</td><td>Aucun point : Hülkenberg (P12) et Bortoleto (P13, pénalisé cinq secondes pour infraction au VSC) terminent tous deux hors du top 10.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Aston Martin</td><td>Alonso abandonne pour une gêne physique liée à la position du siège, déjà présente en Sprint ; Stroll termine hors des points (P15).</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Cadillac F1 Team</td><td>Première panne de la saison pour Pérez — rupture spectaculaire de la suspension avant droite au tour 46, à l'origine de la deuxième VSC de la course ; Bottas termine dernier des classés.</td></tr>
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
          <li><strong>Antonelli</strong>, pour une quatrième victoire consécutive conclue par le meilleur tour de la course sur le tout dernier passage.</li>
          <li><strong>Hamilton</strong>, pour avoir devancé Leclerc — une inversion de l'ordre habituel chez Ferrari cette saison.</li>
          <li><strong>Alpine</strong>, dont la stratégie medium-vers-dur, saluée par Pirelli, rapporte des points aux deux voitures.</li>
        </ul>
      </div>
      <div class="verdictcol lose">
        <h4>Perdants</h4>
        <ul>
          <li><strong>McLaren</strong>, pour un deuxième zéro pointé en cinq courses — mauvais pari sur les intermédiaires, panne de boîte pour Norris, pénalité pour Piastri.</li>
          <li><strong>Russell</strong>, pole position et vainqueur du Sprint, qui voit sa bagarre pour la tête de course s'achever sur une panne moteur au tour 30.</li>
          <li><strong>Pérez</strong>, pour la première panne de sa saison — une rupture de suspension spectaculaire qui prive Cadillac d'un résultat malgré un vrai pas en avant côté performance.</li>
        </ul>
      </div>
    </div>
    <div class="callout">Montréal restera la course du pari perdu sur les intermédiaires et de l'abandon qui a coupé court à la plus belle bagarre de tête de la saison. Russell menait Antonelli tour après tour jusqu'à ce qu'une panne de groupe propulseur au tour 30 mette fin à ses espoirs — et fige, via la Virtual Safety Car qui a suivi, la stratégie de tout le peloton de tête en une seule fenêtre au tour 31. Antonelli n'a plus eu qu'à gérer, jusqu'au meilleur tour de la course signé sur la ligne d'arrivée.</div>
  </div>
</section>

<section class="block" id="sec-r-next">
  <div class="prose">
    <h2 class="sectitle">Enseignements pour la suite</h2>
    <p>Trois points issus de Montréal à surveiller dans les prochaines courses :</p>
    <ol style="padding-left:20px; margin:0 0 16px;">
      <li style="margin-bottom:10px;"><strong>McLaren</strong> repart de Montréal sans le moindre point pour la deuxième fois en cinq courses, après la Chine. Entre erreurs de pari pneus et pannes mécaniques, l'écurie championne du monde en titre doit trouver des réponses avant Monaco.</li>
      <li style="margin-bottom:10px;"><strong>Cadillac</strong> a montré un vrai pas en avant côté performance à Montréal, mais la rupture de suspension de Pérez rappelle que le volet opérationnel reste le point faible de la nouvelle écurie américaine.</li>
      <li><strong>Antonelli</strong> compte déjà 43 points d'avance sur Russell après cinq courses et quatre victoires. Si Russell continue de perdre des courses sur la fiabilité plutôt que sur le rythme, la lutte pour le titre pourrait se refermer bien avant la fin de la saison.</li>
    </ol>
  </div>
</section>

<section class="block" id="sec-r7">
  <details class="sources">
    <summary>Sources utilisées — GP du Canada (10 liens)</summary>
    <div class="srcgroup">
      <h5>Base de données The Pit Wall</h5>
      <ul>
        <li><span class="desc">Résultats, grille, arrêts, relais pneus, temps au tour, météo en série temporelle, chronologie complète des messages de course — alimentés depuis l'API OpenF1 (scripts/ingest_openf1.py). Source primaire pour l'ensemble des faits chiffrés de cet article.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Course — source primaire</h5>
      <ul>
        <li><a href="https://press.pirelli.com/antonelli-wins-the-canadian-grand-prix-hamilton-and-verstappen-on-the-podium/" data-desc="Compte rendu officiel Pirelli de la course, stratégies pneus et citation du directeur motorsport Dario Marrafuschi.">Antonelli remporte le Grand Prix du Canada</a><span class="desc">Pirelli Press — communiqué officiel, lu directement</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Résultats et Sprint</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/antonelli-wins-dramatic-canadian-grand-prix-as-russell-retires-amid-thrilling-mercedes-battle.MzvclJaqCidlYMUXonuDq" data-desc="Compte rendu de course F1.com : bagarre Mercedes pour la tête, abandon de Russell.">Antonelli remporte un GP du Canada dramatique</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/russell-clings-on-to-win-canada-sprint-after-clashing-with-antonelli.6Ggn92sBNEdqizMYOT44fb" data-desc="Résultat et résumé du Sprint du samedi, accrochage entre les deux Mercedes.">Russell remporte le Sprint après un accrochage avec Antonelli</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.planetf1.com/news/2026-canadian-grand-prix-race-report" data-desc="Résumé de course et abandon de Russell.">Antonelli remporte le GP du Canada ; Russell à l'abandon</a><span class="desc">PlanetF1</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Abandons et forfait</h5>
      <ul>
        <li><a href="https://racingnews365.com/mclaren-misery-continues-as-lando-norris-exits-canadian-gp" data-desc="Cause de l'abandon de Norris : panne de boîte de vitesses à l'épingle, tour 40.">La panne de boîte de vitesses de Norris</a><span class="desc">RacingNews365</span></li>
        <li><a href="https://www.motorsport.com/f1/news/fernando-alonso-canadian-gp-retirement-cause/10825683/" data-desc="Explication de l'abandon d'Alonso : gêne physique liée à la position du siège.">La position de siège à l'origine de l'abandon d'Alonso</a><span class="desc">Motorsport.com</span></li>
        <li><a href="https://racingnews365.com/arvid-lindblad-retirement-leads-to-shortened-canadian-grand-prix" data-desc="Panne d'embrayage de Lindblad sur la grille et réduction de la distance de course à 68 tours.">L'abandon de Lindblad raccourcit le Grand Prix du Canada</a><span class="desc">RacingNews365</span></li>
        <li><a href="https://www.planetf1.com/news/sergio-perez-cadillac-canadian-grand-prix-2026-suspension" data-desc="Rupture de suspension de Pérez et enquête interne Cadillac.">Cadillac confirme la cause de la panne de Pérez</a><span class="desc">PlanetF1</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Chronologie de course</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/winners-and-losers-from-f1-2026-canadian-grand-prix/" data-desc="Analyse des deux Virtual Safety Car tardives (tours 46 et 53) et de leurs causes probables.">Gagnants et perdants du GP du Canada</a><span class="desc">The Race</span></li>
      </ul>
    </div>
  </details>
</section>
`;
