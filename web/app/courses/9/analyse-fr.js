// Analyse Round 9 — Grand Prix de Grande-Bretagne 2026 (Silverstone).
// Rédigé à partir de scripts/race_briefing*.py (base de données The Pit
// Wall, alimentée par OpenF1 : résultats, arrêts, pneus, météo en série
// temporelle, temps de secteur par tour, chronologie complète des
// messages de course) et de recherches web ciblées (WebSearch) pour le
// contexte non capturé en base (causes techniques des abandons,
// citations d'après-course, résultats du Sprint du samedi — non ingéré
// en base, cf. Round 1/2). Deux lectures primaires via le workflow
// fetch-url.yml sur formula1.com : le compte rendu officiel de course
// (grille, pénalités, panne d'Antonelli, stratégie pneus de départ) et
// l'article de prévisualisation pneus citant Pirelli in extenso
// (nominations C1/C2/C3, prévision à un arrêt). Les autres articles de
// presse (RaceFans, Sky Sports, RacingNews365, Motorsport.com, PlanetF1,
// Crash.net, etc.) sont des sources secondaires, citées comme telles.
// Le meilleur tour de la course (Antonelli, tour 37, 1:31,777) est
// triple-vérifié : le champ agrégé de la base (« meilleur tour »,
// marqué #1), la somme des trois temps de secteur du tour 37 relevés
// tour par tour (29,501 + 37,119 + 25,157 = 91,777s), et la page
// officielle des meilleurs tours de formula1.com (DHL Fastest Lap
// Award) — les trois concordent exactement, signalé explicitement dans
// le texte et dans les sources. La brève VSC du tour 22 (ombrelle sur
// la piste), non attribuée nommément dans les messages de course bruts,
// a été identifiée par une recherche ciblée après lecture de la base —
// même méthode que pour le mystère du relais de Leclerc au Round 1.
export const ROUND9_ANALYSE_FR_HTML = `
<div class="hero prose">
  <p class="eyebrow">Grand Prix de Grande-Bretagne · Silverstone · 2026</p>
  <p class="verdict">Leclerc gagne la course la plus folle de la saison, achevée sous Safety Car après un bug logiciel — pendant que le poleman Antonelli s'effondre de la P1 à la P15 sur une pièce de carrosserie cassée.</p>
  <div class="resultstrip">
    <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari</span></div>
    <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes · +0,427s</span></div>
    <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari · +0,772s</span></div>
    <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren · +1,149s</span></div>
    <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Hadjar</span> <span class="gap">Red Bull · +1,598s</span></div>
  </div>
  <p class="subverdict">Leclerc prend le meilleur envol du plateau et ne rend plus jamais la tête après son unique arrêt, décrochant sa première victoire de la saison. Mais Silverstone restera pour deux autres histoires. Antonelli, poleman et vainqueur du Sprint la veille, dominait la course avant qu'un bouclier de frein avant-gauche ne se détache au tour 41 — deux arrêts supplémentaires, une pénalité pour sorties de piste, et une chute de la P1 à la P15, malgré le meilleur tour de la course signé quatre tours avant la panne. Puis Verstappen, en lutte pour le podium, part en tête-à-queue à Stowe au tour 48 sur la même défaillance d'aileron arrière que sa sortie de piste en qualifications en Autriche le week-end précédent, déclenchant la Safety Car. Un bug logiciel dans la procédure de fin de neutralisation empêche ensuite toute relance : la course s'achève au ralenti, sans le moindre tour à drapeau vert pour conclure.</p>
</div>

<section class="block" data-num="01" id="sec-r1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Le contexte avant la course</h2>
    <p>Silverstone ouvre la deuxième manche sprint de la saison. Antonelli signe le doublé du samedi : première victoire en Sprint, puis pole position en qualifications du Grand Prix avec un ultime tour en 1:28,111, devant Leclerc, Hamilton et Russell. Deux ajustements de grille interviennent avant le départ : Gasly recule de la P12 à la P15 pour une pénalité de trois places (gêne en qualifications), et Stroll écope de dix places pour des éléments de groupe propulseur supplémentaires — une sanction qui ne lui coûte finalement qu'une place, déjà relégué en P21 sur le temps.</p>
    <p>Pirelli avait nominé les trois composés les plus durs de sa gamme pour Silverstone — C1, C2 et C3, en dur/medium/tendre — justifiés par la sévérité du circuit sur les pneus : des accélérations dépassant 5g dans certains enchaînements, comparables à Suzuka ou Spa, avec l'essieu avant et le pneu avant-gauche particulièrement sollicités sur ce tracé à dominante de virages à droite. Le manufacturier anticipait une course à un arrêt jouée sur le duo C2-C3 (medium-tendre), le composé dur ne servant qu'en dernier recours. <a href="https://www.formula1.com/en/latest/article/what-tyres-will-the-teams-and-drivers-have-for-the-2026-british-grand-prix.3qD9d5o8X4x3se0F7Zg5i1" data-desc="Article officiel formula1.com citant in extenso la prévisualisation pneus de Pirelli pour Silverstone.">Prévisualisation pneus — formula1.com / Pirelli</a> Tous les pilotes s'élancent en medium, une contrainte de grille commune à l'ensemble du plateau.</p>
    <p>Côté météo, rien à signaler — et c'est en soi une information : conditions stables et sèches sur toute la course, 22,8 à 26,1°C dans l'air, 37,5 à 43,8°C sur la piste, aucune pluie relevée sur l'intégralité de la série temporelle, humidité entre 44,9 et 56,6%. La stratégie s'est jouée sur la piste, pas sur un pari météo — Alonso excepté, contraint à un bref arrêt avant même le tour de formation puis à un départ depuis la voie des stands.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-r2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

    <h3 class="subtitle">Chaos au premier tour, Leclerc s'envole</h3>
    <p>Leclerc prend un envol parfait et passe en tête dès le premier virage, Hamilton se hissant en seconde position et repoussant Antonelli à la troisième place. Derrière, le premier tour tourne au chaos pour deux écuries : Piastri, convaincu d'avoir subi un contact avec Lawson, rentre changer son aileron avant et repart dernier ; Albon tamponne Bearman au virage 6 (Brooklands), envoyant le pilote Haas en tête-à-queue — une pénalité de dix secondes suit pour le pilote Williams, purgée en course lors d'un arrêt dédié. Hamilton écope pour sa part d'une pénalité de cinq secondes pour faux départ, les stewards ayant identifié un mouvement du pneu avant le signal de départ sur les images embarquées.</p>

    <h3 class="subtitle">Antonelli prend la tête, puis tout bascule</h3>
    <p>Antonelli reste au contact d'Hamilton avant de le doubler au tour 11 à Copse pour s'emparer de la deuxième place, puis de Leclerc lorsque celui-ci s'arrête au tour 25-26. Le poleman prend la tête et étire son relais jusqu'au tour 36, signant au passage le meilleur tour de la course au tour 37 en 1:31,777 — une donnée confirmée de manière redondante par trois sources indépendantes : le champ agrégé de la base, la somme des trois temps de secteur relevés tour par tour (29,501 + 37,119 + 25,157s), et la page officielle des meilleurs tours de formula1.com. Quatre tours plus tard, tout s'effondre : au tour 41, un bouclier de frein avant-gauche se détache, perturbant lourdement la tenue de route. Mercedes ne parvient à corriger le problème qu'au troisième passage aux stands (arrêts aux tours 35, 41 et 43), tandis qu'Antonelli, en difficulté pour rester dans les limites de la piste, écope d'une pénalité de cinq secondes. Il franchit la ligne quinzième, la pole position et la victoire au Sprint de la veille réduites à un après-midi à oublier.</p>

    <h3 class="subtitle">Une VSC pour une ombrelle, une seconde pour Hülkenberg</h3>
    <p>Une brève période de Virtual Safety Car survient au tour 22 (14:37:35-14:37:59, heure de session, commissaires signalés au virage 10) — les messages de course bruts n'identifient aucune voiture concernée, une recherche ciblée confirme qu'une ombrelle de spectateur, aux couleurs de Norris, s'était envolée sur la piste et a dû être récupérée par les commissaires. Seuls Ocon et Pérez parviennent à caler un arrêt dans cette fenêtre. Une seconde VSC, plus longue (15:04:02-15:05:15), suit l'abandon d'Hülkenberg au tour 39 : une panne hydraulique fait passer sa boîte de vitesses au point mort alors qu'il plongeait vers les stands, l'immobilisant sur le circuit.</p>

    <h3 class="subtitle">Verstappen en embuscade, puis la panne qui déclenche tout</h3>
    <p>Verstappen déborde Russell au tour 17 pour s'installer en position de podium virtuel et reste au contact du sommet jusqu'à la fin de course. Au tour 48, à quatre tours de l'arrivée, l'aileron arrière de sa RB22 ne se referme pas correctement après une activation DRS — une défaillance identique à celle qui l'avait envoyé dans le gravier en qualifications du Grand Prix d'Autriche le week-end précédent. Perte de découverte immédiate, tête-à-queue et sortie de piste dans le bac à gravier de Stowe : Safety Car déployée, abandon pour le Néerlandais.</p>

    <h3 class="subtitle">Un bug logiciel prive la course de relance</h3>
    <p>Alors que les voitures « lappées » sont invitées à se dérattraper derrière la Safety Car en vue d'une relance, le message « Safety Car In This Lap » s'affiche au tour 51, laissant croire à un ultime tour de course en drapeau vert — avant qu'il ne soit annulé et que la Safety Car reste en piste jusqu'au drapeau à damier. La FIA explique après course qu'il s'agit d'une erreur logicielle d'affichage, mais que la procédure elle-même a été appliquée correctement : l'article B5.13.5 du règlement impose qu'un tour complet soit bouclé après la procédure de dérattrapage avant que la Safety Car puisse rentrer aux stands. Conséquence directe pour le classement : Sainz, resté en tête du peloton des « lappés » en croyant pouvoir se dérattraper, double la Safety Car sans figurer sur la liste des voitures autorisées à le faire — une pénalité inédite d'un tour entier ajouté à son temps le fait chuter de la P12 à la P17 à l'arrivée, sans lui coûter de points qu'il n'avait de toute façon pas marqués. Leclerc franchit la ligne au ralenti pour sa première victoire de la saison, devant un public privé du tour à drapeau vert qu'il espérait.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-r3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

    <h3 class="subtitle">Ferrari — le dur, contre l'attente de Pirelli</h3>
    <p>Pirelli anticipait un scénario à un arrêt joué sur le duo medium-tendre. Ferrari, comme la quasi-totalité du peloton de tête, a fait l'inverse : deux arrêts chacun, en passant systématiquement par le composé dur (medium au tour 1, dur autour du tour 24-26, tendre ou medium en fin de course). Le résultat valide ce choix : Leclerc n'a jamais été repris après son unique retour aux stands, et Hamilton conserve le podium malgré la pénalité de cinq secondes purgée en course.</p>

    <h3 class="subtitle">Mercedes — un doublé manqué de peu, une stratégie brisée par la panne</h3>
    <p>Russell suit une exécution sans accroc, un relais de dur classique entre les tours 23 et 34 avant de repasser en medium jusqu'à l'arrivée — récompensé par une deuxième place obtenue en restant en piste pendant la phase finale de Safety Car, pendant que d'autres choisissaient de s'arrêter. Antonelli, en position de gagner la course avec un relais de dur étiré jusqu'au tour 36, voit sa stratégie anéantie par la défaillance mécanique du tour 41 : les deux arrêts supplémentaires ne sont pas un choix stratégique mais une réparation d'urgence, qui le fait chuter de la victoire potentielle à la P15.</p>

    <h3 class="subtitle">Red Bull — Hadjar assure les points, Verstappen perd un podium sur panne</h3>
    <p>Hadjar défend méthodiquement sa cinquième place sur trois arrêts sans jamais être menacé. Verstappen, positionné pour un résultat de podium après avoir doublé Russell au tour 17, n'aura pas eu l'occasion de jouer sa stratégie jusqu'au bout : la panne d'aileron arrière — la seconde en deux week-ends consécutifs après l'incident similaire en qualifications d'Autriche — a effacé toute question de stratégie pneus.</p>

    <h3 class="subtitle">McLaren — Norris limite la casse, Piastri sauve un week-end compromis dès le tour 1</h3>
    <p>Norris opte pour une stratégie à trois arrêts sans jamais être en mesure d'inquiéter le podium, quatrième sur toute la longueur. Piastri, reparti dernier après un changement d'aileron avant consécutif à un contact évoqué avec Lawson au premier virage, remonte méthodiquement jusqu'à la onzième place — juste hors des points, mais une remontée qui sauve la face après un début de course catastrophique.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-r4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
    <p>L'évaluation porte sur la course de dimanche, en tenant compte de la position de départ, de la voiture et des circonstances (source : base de données The Pit Wall, résultats/arrêts/pneus/temps au tour, complétée par la recherche web pour les causes techniques et les citations d'après-course).</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
      <tbody>
        <tr><td><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>P2 → P1</td><td>Meilleur envol du plateau, prend la tête au premier virage et ne la rend plus après son unique arrêt. Première victoire de la saison, obtenue au ralenti derrière la Safety Car après le bug logiciel de fin de course.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Russell</td><td>P4 → P2</td><td>Repousse Hadjar au départ, remonte au contact des Ferrari puis reste en piste sur des mediums usagés pendant la phase finale de Safety Car pour doubler Hamilton et prendre la P2.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>P3 → P3</td><td>Envol solide vers la P2 avant une pénalité de cinq secondes pour faux départ, purgée en course. Conserve le podium malgré une enquête post-course pour infraction au drapeau jaune — réprimande seulement, aucune pénalité.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Norris</td><td>P6 → P4</td><td>Stratégie à trois arrêts, meilleur résultat McLaren du week-end, jamais en position d'inquiéter le podium.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>P5 → P5</td><td>Défend méthodiquement sa position sur trois arrêts, jamais menacé de toute la course.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lawson</td><td>P10 → P6</td><td>Belle remontée pour RB F1 Team ; brièvement mêlé au contact évoqué par Piastri au premier virage, sans suite des commissaires.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>P9 → P7</td><td>Deuxième voiture RB F1 Team dans les points, week-end propre.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>P11 → P8</td><td>Encore dans les points pour Audi, week-end solide sans incident notable.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>P19 → P9</td><td>La meilleure remontée du jour en valeur absolue, de la P19 à la P9.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>P15 → P10</td><td>Reparti P15 après une pénalité de trois places pour gêne en qualifications, revient dans les points.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Piastri</td><td>P8 → P11</td><td>Contact évoqué avec Lawson dès le premier virage, aileron avant changé, reparti dernier — remonte jusqu'à la P11, juste hors des points, après un début de course catastrophique.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>P13 → P12</td><td>Victime du tamponnement d'Albon au virage 6 (Brooklands) dès le premier tour, tête-à-queue subi ; termine juste hors des points malgré l'incident.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>P17 → P13</td><td>Un des deux seuls pilotes à profiter de la VSC-ombrelle du tour 22 pour caler un arrêt.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>P20 → P14</td><td>Profite lui aussi de la VSC du tour 22 pour son arrêt ; hors des points.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>P1 → P15</td><td>Pole position et première victoire en Sprint la veille, prend la tête au tour 36 et signe le meilleur tour de la course (1:31,777, tour 37, triple-vérifié). Un bouclier de frein avant-gauche se détache au tour 41, imposant deux arrêts supplémentaires et une pénalité de cinq secondes pour sorties de piste — chute de la pole à la P15.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>P18 → P16</td><td>Hors des points, week-end sans fait marquant pour Cadillac.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>P14 → P17*</td><td>Pénalité inédite d'un tour complet pour s'être illégalement dérattrapé derrière la Safety Car en fin de course sans figurer sur la liste des voitures autorisées ; chute de la P12 virtuelle à la P17. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Alonso</td><td>P21 → P18*</td><td>Frayeur avant le départ (bref arrêt pendant le tour de formation) puis départ depuis la voie des stands ; course discrète. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Stroll</td><td>P22 → P19*</td><td>Trois pénalités de cinq secondes (15s au total) pour six sorties de piste en l'espace de neuf tours ; évoque un fort sous-virage et une voiture « très cassée » après course. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>P7 → Abandon</td><td>Double Russell au tour 17 pour une position de podium virtuel, tenue jusqu'au tour 48 : l'aileron arrière ne se referme pas après une activation DRS — même défaillance qu'en qualifications d'Autriche le week-end précédent — tête-à-queue et sortie de piste à Stowe, provoquant la Safety Car qui neutralise la fin de course.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Albon</td><td>P16 → Abandon</td><td>Tamponne Bearman au virage 6 (Brooklands) dès le premier tour, pénalité de dix secondes purgée en course ; maintenu en piste pour collecter des données avant l'abandon définitif.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>P12 → Abandon</td><td>Panne hydraulique faisant passer sa boîte de vitesses au point mort en piquant vers les stands au tour 39, immobilisé sur le circuit — provoque la deuxième VSC de la course.</td></tr>
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
        <tr><td><span class="dot" style="background:#E8002D"></span> Ferrari</td><td>Victoire de Leclerc (première de sa saison) et podium d'Hamilton malgré une pénalité purgée en course. Stratégie à deux arrêts payante, contre l'attente à un arrêt de Pirelli.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Mercedes</td><td>Week-end à deux visages : Russell décroche une deuxième place propre en restant en piste pendant la Safety Car finale, pendant qu'Antonelli s'effondre de la pole à la P15 sur une défaillance mécanique après avoir mené la course et signé le meilleur tour.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> McLaren</td><td>Norris quatrième sur trois arrêts sans inquiéter le podium ; Piastri remonte de la dernière à la onzième place après un changement d'aileron avant au premier tour, juste hors des points.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Red Bull</td><td>Hadjar assure une cinquième place tranquille ; Verstappen perd un podium virtuel sur une panne d'aileron arrière identique à celle subie en qualifications d'Autriche le week-end précédent — un sujet de fiabilité à deux occurrences en deux courses.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> RB F1 Team</td><td>Double top 10 pour Lawson et Lindblad, week-end propre sans incident notable.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Audi</td><td>Bortoleto dans les points ; Hülkenberg contraint à l'abandon par une panne hydraulique au tour 39, provoquant la deuxième VSC de la course.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Alpine F1 Team</td><td>Double top 10 : Colapinto signe la meilleure remontée du jour (P19 → P9), Gasly revient dans les points après une pénalité de grille.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Haas F1 Team</td><td>Bearman et Ocon juste hors des points ; Bearman victime d'un tamponnement d'Albon dès le premier tour.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Cadillac F1 Team</td><td>Pérez et Bottas hors des points, week-end sans fait marquant.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Williams</td><td>Sainz écope d'une pénalité inédite d'un tour complet pour un dérattrapage irrégulier derrière la Safety Car ; Albon provoque l'incident du premier tour avec Bearman avant d'abandonner.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Aston Martin</td><td>Week-end à oublier : Alonso discret après une frayeur avant le départ, Stroll cumule trois pénalités pour six sorties de piste sur une voiture qu'il décrit lui-même comme très perturbée en virage.</td></tr>
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
          <li><strong>Leclerc</strong>, pour un envol parfait transformé en première victoire de la saison, jamais menacé après son unique arrêt.</li>
          <li><strong>Russell</strong>, pour une exécution sans accroc récompensée par une deuxième place gagnée dans le chaos de la Safety Car finale.</li>
          <li><strong>Colapinto</strong>, pour la remontée la plus spectaculaire du jour (P19 → P9).</li>
        </ul>
      </div>
      <div class="verdictcol lose">
        <h4>Perdants</h4>
        <ul>
          <li><strong>Antonelli</strong>, pour un effondrement de la pole et de la victoire en Sprint à la P15 sur une pièce de carrosserie cassée — malgré le meilleur tour de la course quatre tours plus tôt.</li>
          <li><strong>Verstappen</strong>, pour un podium perdu sur une deuxième panne d'aileron arrière en deux week-ends consécutifs, avec en prime le déclenchement de la Safety Car qui a privé la course de sa relance.</li>
          <li><strong>Stroll</strong>, pour trois pénalités et six sorties de piste sur une voiture qu'il juge lui-même très perturbée en virage.</li>
        </ul>
      </div>
    </div>
    <div class="callout">Leclerc profite de la course la plus chaotique de la saison — un premier tour agité, deux VSC, une Safety Car finale et un bug logiciel qui prive le public d'une relance en drapeau vert — pour signer sa première victoire de l'année. Mais l'histoire qui pèsera le plus sur la suite de la saison est ailleurs : Antonelli, pole position et vainqueur du Sprint la veille, s'effondre de la P1 à la P15 sur une défaillance mécanique, et Verstappen perd un podium sur la même panne d'aileron arrière qui l'avait déjà piégé en qualifications le week-end précédent.</div>
  </div>
</section>

<section class="block" id="sec-r-next">
  <div class="prose">
    <h2 class="sectitle">Enseignements pour la suite</h2>
    <p>Trois points issus de Silverstone à surveiller dans les prochaines courses :</p>
    <ol style="padding-left:20px; margin:0 0 16px;">
      <li style="margin-bottom:10px;">La fiabilité de l'aileron arrière chez <strong>Red Bull</strong> est désormais un sujet à deux occurrences en deux week-ends consécutifs (qualifications d'Autriche, course de Silverstone). Antonelli garde 179 points et la tête du championnat malgré son zéro pointé à Silverstone, mais un point de vingt-cinq d'avance sur Russell (154 points) : la marge s'amenuise si Mercedes ne corrige pas ce type de défaillance mécanique.</li>
      <li style="margin-bottom:10px;"><strong>Leclerc</strong> signe sa première victoire de la saison et remonte à la quatrième place du championnat (108 points) : reste à voir s'il peut enchaîner alors que Ferrari a démontré à Silverstone qu'elle pouvait devancer Pirelli sur la lecture stratégique.</li>
      <li>Le bug logiciel de fin de course ayant empêché toute relance en drapeau vert a suscité la controverse malgré l'explication réglementaire de la FIA (article B5.13.5) : un point de procédure à surveiller si un scénario de dérattrapage similaire se représente en fin de saison.</li>
    </ol>
  </div>
</section>

<section class="block" id="sec-r7">
  <details class="sources">
    <summary>Sources utilisées — GP de Grande-Bretagne (17 liens)</summary>
    <div class="srcgroup">
      <h5>Base de données The Pit Wall</h5>
      <ul>
        <li><span class="desc">Résultats, grille, arrêts, relais pneus, temps au tour et de secteur, météo en série temporelle, chronologie complète des messages de course — alimentés depuis l'API OpenF1 (scripts/ingest_openf1.py). Source primaire pour l'ensemble des faits chiffrés de cet article.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Course et pneus — sources primaires (fetch-url.yml)</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/leclerc-wins-dramatic-british-grand-prix-from-russell-and-hamilton-as-antonelli-suffers-issue.3bGl6laB38GIr1PfxJTNmY" data-desc="Compte rendu officiel de course : grille, pénalités de départ, panne d'Antonelli, chronologie des incidents.">Leclerc wins dramatic British Grand Prix</a><span class="desc">formula1.com — récupéré via fetch-url.yml, lu directement</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/what-tyres-will-the-teams-and-drivers-have-for-the-2026-british-grand-prix.3qD9d5o8X4x3se0F7Zg5i1" data-desc="Prévisualisation pneus citant in extenso le communiqué Pirelli (nominations C1/C2/C3, prévision à un arrêt).">What tyres will the teams have for the British GP?</a><span class="desc">formula1.com — récupéré via fetch-url.yml, lu directement</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Meilleur tour — vérification externe</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1289/great-britain/fastest-laps" data-desc="Classement officiel des meilleurs tours de la course, confirmant Antonelli au tour 37 en 1:31,777.">Fastest laps — British Grand Prix 2026</a><span class="desc">formula1.com/results — secondaire (lu via recherche, non récupéré en brut)</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Panne d'Antonelli</h5>
      <ul>
        <li><a href="https://www.skysports.com/f1/news/12433/13560561/british-gp-mercedes-accept-blame-for-kimi-antonellis-costly-mechanical-failure-at-silverstone" data-desc="Mercedes reconnaît sa responsabilité dans la défaillance du bouclier de frein avant-gauche.">Mercedes accept blame for Antonelli's failure</a><span class="desc">Sky Sports</span></li>
        <li><a href="https://www.crash.net/f1/news/1100408/1/mercedes-explain-kimi-antonellis-british-gp-race-ruining-failure" data-desc="Détail technique de la défaillance du bouclier de frein.">Mercedes explain Antonelli's race-ruining failure</a><span class="desc">Crash.net</span></li>
        <li><a href="https://www.crash.net/f1/news/1100377/1/kimi-antonelli-issues-defiant-reaction-after-disastrous-end-silverstone-race" data-desc="Réaction d'Antonelli après course.">Antonelli's defiant reaction</a><span class="desc">Crash.net</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Verstappen et la Safety Car finale</h5>
      <ul>
        <li><a href="https://racingnews365.com/max-verstappen-triggers-late-british-gp-safety-car-after-shock-crash" data-desc="Détail de la sortie de piste de Verstappen à Stowe et de la panne d'aileron arrière.">Verstappen triggers late Safety Car</a><span class="desc">RacingNews365</span></li>
        <li><a href="https://nltimes.nl/2026/07/05/max-verstappen-left-fuming-late-mechanical-failure-ends-british-gp" data-desc="Réaction de Verstappen après l'abandon.">Verstappen left fuming after mechanical failure</a><span class="desc">NL Times</span></li>
        <li><a href="https://www.motorsport.com/f1/news/max-verstappens-red-bull-failures-labelled-big-concern-after-british-gp-retirement/10837094/" data-desc="Analyse de la récurrence des pannes d'aileron arrière chez Red Bull.">Red Bull failures labelled "big concern"</a><span class="desc">Motorsport.com</span></li>
        <li><a href="https://www.racefans.net/2026/07/05/fia-blames-software-error-after-criticism-over-failure-to-restart-british-grand-prix/" data-desc="Explication de la FIA sur le bug logiciel ayant empêché la relance en fin de course.">FIA blames software error for non-restart</a><span class="desc">RaceFans</span></li>
        <li><a href="https://www.skysports.com/f1/news/12433/13560562/british-gp-fia-explains-why-silverstone-race-not-resumed-on-final-lap-after-incorrect-safety-car-message-displayed" data-desc="Détail réglementaire (article B5.13.5) justifiant l'absence de relance.">FIA explains why the race was not resumed</a><span class="desc">Sky Sports</span></li>
        <li><a href="https://www.kymillman.com/the-paddock-report/trackside-happenings/a-safety-car-finish-at-silverstone/" data-desc="Récit trackside identifiant l'ombrelle à l'origine de la VSC du tour 22.">A Safety Car finish at Silverstone</a><span class="desc">Kym Illman — Paddock Report</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Pénalités et incidents</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/rare-sainz-penalty-for-safety-car-infringement-confirmed-after-british-grand-prix.6rRSl9zKXfYsHSLIYxZRFd" data-desc="Détail de la pénalité inédite d'un tour infligée à Sainz pour dérattrapage irrégulier.">Rare Sainz penalty confirmed</a><span class="desc">formula1.com (lu via recherche, non récupéré en brut)</span></li>
        <li><a href="https://www.racefans.net/2026/07/05/sainz-penalised-one-lap-for-illegally-overtaking-safety-car/" data-desc="Explication de la pénalité de Sainz.">Sainz penalised one lap for illegally overtaking the Safety Car</a><span class="desc">RaceFans</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/verdict-in-hamilton-post-race-investigation-announced-after-infringement-during-british-grand-prix.7qXRanMD85S22UNVFHQVna" data-desc="Verdict de l'enquête post-course sur Hamilton (réprimande, pas de pénalité).">Verdict in Hamilton's post-race investigation</a><span class="desc">formula1.com (lu via recherche, non récupéré en brut)</span></li>
        <li><a href="https://www.planetf1.com/news/fia-lance-stroll-british-grand-prix-2026-penalty" data-desc="Détail des trois pénalités de Stroll pour sorties de piste répétées.">FIA confirms triple Stroll punishment</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://racingnews365.com/williams-suffer-double-misery-after-alex-albon-retirement" data-desc="Contexte de l'incident Albon-Bearman et de l'abandon d'Albon.">Williams suffer double misery after Albon retirement</a><span class="desc">RacingNews365</span></li>
        <li><a href="https://www.pitdebrief.com/post/hulkenberg-explains-technical-issues-that-ended-2026-f1-british-gp/" data-desc="Hülkenberg détaille la panne hydraulique ayant provoqué son abandon.">Hülkenberg explains the technical issue that ended his race</a><span class="desc">Pit Debrief</span></li>
      </ul>
    </div>
  </details>
</section>
`;
