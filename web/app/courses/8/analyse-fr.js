// Analyse Round 8 — Grand Prix d'Autriche 2026 (Red Bull Ring, Spielberg).
// Rédigé à partir de scripts/race_briefing*.py (base de données The Pit
// Wall, alimentée par OpenF1 : résultats, arrêts, pneus, temps au tour,
// météo, chronologie complète des messages de course) et de recherches
// web ciblées (WebSearch) pour le contexte non capturé en base (causes
// des abandons, citations d'après-course, standings de championnat).
// La source Pirelli sur cette course précise (« Russell on hand to pick
// up the pieces! ») est une lecture primaire (press.pirelli.com,
// récupérée via le workflow fetch-url.yml) ; les autres articles de
// presse sont des sources secondaires, citées comme telles. Un premier
// essai de récupération de l'article Pirelli de nomination des gommes
// a renvoyé un contenu daté du 4 juin 2024 (même titre réutilisé d'une
// saison précédente) — écarté et remplacé par une source secondaire
// datée pour la même information. Le meilleur tour de la course
// (Antonelli, tour 59, 1:10.374) est confirmé indépendamment par trois
// sources : le champ fastest_lap de la base, notre propre relevé tour
// par tour (qui montre aussi qu'aucun autre pilote échantillonné —
// Verstappen, Russell, Piastri, Hadjar — n'a approché ce temps), et le
// DHL Fastest Lap Award de F1.com — la cinquième récompense de la
// saison pour Antonelli. Cette vérification a aussi permis d'écarter
// une première ébauche de recherche web qui attribuait par erreur ce
// tour à Russell.
export const ROUND8_ANALYSE_FR_HTML = `
<div class="hero prose">
  <p class="eyebrow">Grand Prix d'Autriche · Red Bull Ring, Spielberg · 2026</p>
  <p class="verdict">Russell résiste au retour de Verstappen pour signer sa deuxième victoire de la saison — pendant que Ferrari, partie deuxième et troisième sur la grille, s'effondre à cause d'un problème de dégradation des pneus qu'elle n'a jamais réussi à expliquer sur le moment.</p>
  <div class="resultstrip">
    <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes</span></div>
    <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · +1,611s</span></div>
    <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · +1,986s</span></div>
    <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">McLaren · +21,809s</span></div>
    <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari · +26,393s</span></div>
  </div>
  <p class="subverdict">Red Bull a fait le pari inverse de Mercedes sur le second relais : plutôt que de couvrir l'arrêt de Russell au tour 43, l'écurie autrichienne a laissé Verstappen dehors cinq tours de plus, jusqu'au tour 49, en misant sur un différentiel de pneus frais en fin de course. Le calcul a failli payer — Verstappen est revenu à 1,3 seconde avant de manquer de tours — mais Russell a passé la ligne avec 1,611s d'avance, son septième succès en catégorie reine. Antonelli, resté sur une stratégie plus classique chez Mercedes, a fini le travail à seulement 0,375s de Verstappen. Le vrai choc du week-end reste toutefois ailleurs : Leclerc et Hamilton, partis deuxième et troisième sur la grille, ont vu leurs pneus se dégrader si vite qu'ils ont dû passer à trois arrêts chacun — Hamilton dès le tour 12 — pour ne finir que cinquième et huitième, sans qu'aucun des deux ne parvienne à expliquer pourquoi sur le moment.</p>
</div>

<section class="block" data-num="01" id="sec-r1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Le contexte avant la course</h2>
    <p>Grille conforme à la logique de qualifications : Russell en pole devant Leclerc et Hamilton, les deux Ferrari en deuxième ligne. Antonelli n'était que quatrième, Verstappen cinquième — une position de départ inhabituellement reculée pour le champion en titre sur son circuit de cœur, celui de son écurie. Norris complétait le top 6 devant Piastri, septième.</p>
    <p>Deux enquêtes avaient été ouvertes avant même le départ : Lawson (voiture 30) pour une infraction à la procédure de départ en essais libres, et Piastri (voiture 81) pour un dépassement du temps delta maximum autorisé sous drapeaux jaunes en qualifications. Aucune sanction visible n'apparaît dans le classement final pour l'un ou l'autre — les deux ont couru sans handicap de temps ou de grille identifiable.</p>
    <p>Pirelli avait nominé sa gamme la plus tendre pour le Red Bull Ring — C3, C4 et C5 en dur/medium/tendre —, un choix cohérent avec un tracé où l'usure pure compte moins que la contrainte thermique : bitume ancien à forte rugosité, faible appui aérodynamique lié à l'altitude, peu de virages (dix) et l'un des tours les plus courts du calendrier. Le manufacturier évoquait avant course une possible bascule vers des stratégies à un seul arrêt sur cette allocation. La course a offert un scénario bien plus contrasté : deux arrêts pour la plupart des top 10, mais trois pour les deux Ferrari.</p>
    <p>Côté météo, conditions stables et chaudes sur toute la course : 33,4 à 35,1°C dans l'air, 42,6 à 53,3°C sur la piste, aucune pluie, humidité entre 25,3 et 32,9%. Rien qui explique, à lui seul, l'écart de dégradation observé entre Ferrari et le reste du peloton.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-r2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

    <h3 class="subtitle">Verstappen passe Hamilton avant même le premier arrêt</h3>
    <p>Dès le tour 11, un accrochage évité de justesse entre Hamilton et Verstappen au virage 6 (l'incident, noté puis classé sans suite par les commissaires) confirme ce que la grille laissait deviner : Verstappen remonte déjà sur la Ferrari partie troisième. Ferrari, en délicatesse avec ses pneus dès les premiers tours, ne tiendra plus le rythme des voitures parties derrière elle.</p>

    <h3 class="subtitle">L'arrêt qui trahit le problème Ferrari : Hamilton au tour 12</h3>
    <p>Le premier signal fort vient du muret Ferrari lui-même : Hamilton s'arrête dès le tour 12, bien avant tout le reste du top 10, pour un relais medium anormalement court (12 tours). Leclerc suit au tour 13. Les deux hommes enchaîneront ensuite un troisième arrêt chacun — Hamilton au tour 25 pour des tendres, puis au tour 43 pour des durs ; Leclerc au tour 38 pour des durs, puis au tour 60 pour un relais tendre de fin de course. Trois arrêts, quand Mercedes, Red Bull et McLaren s'en tiennent à deux : c'est le geste qui condamne la course de Ferrari, quel que soit le rythme retrouvé ensuite.</p>

    <h3 class="subtitle">Le premier VSC : l'abandon de Sainz</h3>
    <p>Une Virtual Safety Car est déployée à 13:32:52 (heure de session) et lève à 13:35:29, avec fermeture de l'entrée de la voie des stands pendant environ 33 secondes. Elle est provoquée par l'abandon de Sainz, arrêté sur la ligne droite des stands au tour 24 après une panne électrique suspectée — sa seule visite aux stands de la course, au tour 14, n'aura servi à rien. C'est le seul arrêt du week-end pour Williams côté Sainz ; Albon, lui, poursuit sa course sans incident jusqu'à un accrochage mineur avec un vibreur plus tard dans la course.</p>

    <h3 class="subtitle">Le pari Red Bull : cinq tours de plus que Russell</h3>
    <p>Russell chausse ses durs définitifs au tour 43 (sortie tour 44) ; Verstappen reste en piste jusqu'au tour 49, cinq tours de plus, sur un relais de durs qui atteindra finalement 31 tours contre 24 pour Russell (28 pour son ultime relais). Le calcul de Red Bull : offrir à Verstappen un avantage de pneus plus frais sur la fin, quitte à perdre du temps net dans le trafic après l'arrêt. Verstappen ressort avec un déficit à combler, le referme méthodiquement jusqu'à environ 1,3 seconde de Russell dans les derniers tours — sans jamais trouver l'ouverture pour attaquer, la ligne d'arrivée arrivant avant l'occasion.</p>

    <h3 class="subtitle">Le second VSC : l'incident du virage 3</h3>
    <p>Une deuxième neutralisation, très brève (14:07:01-14:07:34), survient après un signalement de « surface glissante » au secteur 6 et l'intervention de commissaires au virage 3 — la conséquence d'un contact d'Albon avec la borne d'apex du virage 3, déplacée sur la trajectoire. Elle correspond, à un tour près, au moment où Stroll regagne son stand pour de bon, au tour 45 : son équipe l'a retiré par précaution après avoir détecté des données de batterie anormales à la sortie du virage 1, un problème d'ERS suspecté.</p>

    <h3 class="subtitle">Antonelli referme la course sur Verstappen sans jamais l'inquiéter directement</h3>
    <p>Antonelli, sur un premier relais nettement plus long que celui de Russell (24 tours contre 18), s'arrête aux tours 24 et 51 et signe le meilleur tour de la course au tour 59 en 1:10,374 — sa cinquième récompense DHL du tour le plus rapide de la saison. Il termine troisième, à seulement 0,375s de Verstappen, sans jamais avoir eu l'occasion de contester directement la deuxième place.</p>

    <h3 class="subtitle">Deux abandons précoces, un abandon tardif : le week-end noir de Cadillac</h3>
    <p>Bottas abandonne dès le tour 2, Pérez au tour 4, tous deux pour une surchauffe des freins — la pire journée de la saison pour l'écurie américaine, sans un seul tour marquant pour l'une ou l'autre voiture. Alonso écope par ailleurs d'une pénalité de 5 secondes pour excès de vitesse dans la voie des stands, purgée lors de son propre arrêt.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-r3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

    <h3 class="subtitle">Mercedes — l'exécution qui suffit à gagner</h3>
    <p>Rien de spectaculaire dans la stratégie de Russell : deux arrêts, aux tours 19 et 43, sans jamais céder l'initiative après la pole. Antonelli joue une variante à premier relais allongé (24 tours contre 18) sans que cela change l'issue de sa course. Le vrai mérite de Mercedes ce week-end-là est ailleurs : ne pas avoir laissé le moindre espace à l'attaque tardive de Verstappen.</p>

    <h3 class="subtitle">Red Bull — le pari du relais long, à un cheveu de la victoire</h3>
    <p>En laissant Verstappen cinq tours de plus en piste que Russell avant son dernier arrêt, Red Bull a joué la seule carte disponible pour inquiéter Mercedes en fin de course. Le pari a presque fonctionné — Verstappen revient à 1,3 seconde avant l'arrivée — mais l'écart initial concédé en sortant plus tard des stands, dans le trafic, s'est révélé légèrement trop important pour être totalement comblé. Un scénario à rejouer sur un circuit offrant davantage d'occasions de dépasser.</p>

    <h3 class="subtitle">Ferrari — trois arrêts, un problème non résolu en course</h3>
    <p>Leclerc et Hamilton, partis deuxième et troisième sur la grille, ont tous deux dû s'arrêter trois fois quand leurs rivaux directs s'en tenaient à deux. Le premier arrêt de Hamilton, dès le tour 12, trahit un problème détecté très tôt dans la course — bien avant que quiconque, chez Ferrari, ne puisse l'expliquer publiquement. Le résultat (P5 et P8, à 45,7 secondes du vainqueur pour Leclerc) est sans commune mesure avec le potentiel affiché en qualifications, et coûte à Hamilton sa deuxième place au championnat au profit de Russell.</p>

    <h3 class="subtitle">McLaren — Piastri solide, Norris devancé de justesse</h3>
    <p>Piastri progresse de trois places (P7 à P4) sur une stratégie à deux arrêts sans histoire, le meilleur résultat McLaren du jour. Norris, parti sixième, cède sa position à Hadjar dans les derniers tours et referme la course en septième — une place de mieux que son adversaire du soir, mais sans avoir jamais menacé le podium.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-r4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
    <p>L'évaluation porte sur la course de dimanche, en tenant compte de la position de départ, de la voiture et des circonstances (source : base de données The Pit Wall, résultats/arrêts/pneus/temps au tour/messages de course, complétée par la recherche web pour les causes d'abandon et les citations d'après-course).</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table class="verdict-table">
      <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
      <tbody>
        <tr><td><span class="dot" style="background:#00A19B"></span> Russell</td><td>P1 → P1</td><td>Pole à l'arrivée, deux arrêts sans accroc (tours 19 et 43). Résiste à la charge tardive de Verstappen pour sa deuxième victoire de la saison.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>P5 → P2</td><td>Deuxième arrêt volontairement retardé de cinq tours (tour 49 contre 43 pour Russell) pour disposer de pneus plus frais en fin de course. Revient à 1,3s de la tête sans pouvoir attaquer, manque de tours.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>P4 → P3</td><td>Premier relais allongé à 24 tours. Signe le meilleur tour de la course au tour 59 en 1:10,374 — confirmé par trois sources indépendantes, sa cinquième récompense DHL de la saison. Termine à 0,375s de la P2.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Piastri</td><td>P7 → P4</td><td>Progression nette (trois places) sur une stratégie à deux arrêts sans incident, meilleur résultat McLaren du week-end.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>P3 → P5</td><td>Premier arrêt dès le tour 12 — signal précoce d'un problème de dégradation jamais expliqué en course. Trois arrêts au total (12, 25, 42), perd sa P2 au championnat au profit de Russell.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>P8 → P6</td><td>Dépasse Leclerc puis Norris en fin de course pour prendre la sixième place, meilleur résultat de sa saison sur ce tracé.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Norris</td><td>P6 → P7</td><td>Cède sa position à Hadjar dans les derniers tours, stratégie à deux arrêts sans histoire par ailleurs.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>P2 → P8</td><td>Même mal que Hamilton, en pire : trois arrêts (13, 37, 59), dont un relais final sur tendres. Termine à 45,659s du vainqueur après un départ en première ligne.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lawson</td><td>P9 → P9*</td><td>Points marqués pour RB F1 Team malgré une enquête ouverte avant course pour infraction à la procédure de départ, sans sanction visible au classement. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>P10 → P10*</td><td>Deuxième voiture RB F1 Team également dans les points, week-end propre. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>P12 → P11*</td><td>Hors des points mais course sans incident pour Audi. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>P14 → P12*</td><td>En délégation, hors des points. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>P11 → P13*</td><td>Trois arrêts (13, 38, 51), recul depuis la grille, hors des points. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>P13 → P14*</td><td>Week-end discret pour Haas, hors des points. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>P16 → P15*</td><td>Hors des points, deuxième voiture Alpine effacée du week-end. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>P15 → P16*</td><td>Noté pour une infraction aux drapeaux jaunes en début de course, classée sans suite après examen ; hors des points. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Albon</td><td>P18 → P17*</td><td>À l'origine du second VSC après un contact avec la borne d'apex du virage 3 au tour 53 ; également noté pour une infraction aux drapeaux jaunes en début de course. Hors des points. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Alonso</td><td>P21 → P18</td><td>Pénalité de 5 secondes pour excès de vitesse dans la voie des stands, purgée lors de son arrêt ; également noté après course pour non-respect des drapeaux bleus. Hors des points.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Stroll</td><td>P22 → Abandon</td><td>Retiré par précaution au tour 45 après des données de batterie anormales à la sortie du virage 1 — un problème d'ERS suspecté selon l'équipe.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>P17 → Abandon</td><td>Arrêté sur la ligne droite des stands au tour 24 après une panne électrique suspectée — l'incident à l'origine du premier VSC de la course.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>P19 → Abandon</td><td>Abandon au tour 4 pour surchauffe des freins, après avoir été noté avant course pour un faux départ.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>P20 → Abandon</td><td>Abandon dès le tour 2 pour surchauffe des freins — la course la plus courte de Cadillac cette saison.</td></tr>
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
        <tr><td><span class="dot" style="background:#00A19B"></span> Mercedes</td><td>Victoire de Russell et podium d'Antonelli (0,375s de la P2), sur deux stratégies à deux arrêts sans le moindre accroc. Le meilleur tour de la course, signé Antonelli, complète un week-end sans faille.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Red Bull</td><td>Deuxième place de Verstappen grâce à un pari stratégique (deuxième arrêt retardé de cinq tours) qui a manqué de très peu de payer davantage ; Hadjar signe son meilleur résultat de la saison en sixième place.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> McLaren</td><td>Piastri quatrième sur une stratégie propre, Norris septième après avoir cédé sa position à Hadjar en fin de course. Aucun incident majeur.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Ferrari</td><td>Week-end à oublier malgré une deuxième ligne en qualifications : les deux voitures forcées à trois arrêts par un problème de dégradation non résolu en course, Leclerc et Hamilton terminent P8 et P5, loin de leur potentiel affiché.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> RB F1 Team</td><td>Double top 10 pour Lawson et Lindblad, la meilleure opération de milieu de peloton du jour.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Audi</td><td>Bortoleto et Hülkenberg hors des points mais sans incident, week-end discret.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Alpine F1 Team</td><td>Gasly (trois arrêts) et Colapinto tous deux hors des points, week-end effacé.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Haas F1 Team</td><td>Bearman et Ocon hors des points ; Ocon noté pour une infraction aux drapeaux jaunes, classée sans suite.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Williams</td><td>Abandon de Sainz au tour 24 (panne électrique suspectée), à l'origine du premier VSC de la course ; Albon termine hors des points après avoir provoqué le second VSC en heurtant une borne d'apex.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Aston Martin</td><td>Stroll abandonne par précaution au tour 45 (problème d'ERS suspecté) ; Alonso, pénalisé pour excès de vitesse en pit lane, termine dix-huitième.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Cadillac F1 Team</td><td>Double abandon précoce pour surchauffe des freins — Bottas au tour 2, Pérez au tour 4 — la pire journée de la saison pour l'écurie américaine.</td></tr>
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
          <li><strong>Russell</strong>, pour une deuxième victoire de la saison obtenue par une exécution stratégique sans faille, résistant jusqu'au bout à la charge de Verstappen.</li>
          <li><strong>Red Bull</strong>, pour un pari stratégique presque payant sur le second relais de Verstappen — à rejouer sur un circuit plus propice au dépassement.</li>
          <li><strong>Hadjar</strong>, pour son meilleur résultat de la saison, décroché dans les derniers tours face à Norris.</li>
        </ul>
      </div>
      <div class="verdictcol lose">
        <h4>Perdants</h4>
        <ul>
          <li><strong>Ferrari</strong>, pour avoir transformé une deuxième ligne de grille en P5/P8 à cause d'un problème de dégradation des pneus qu'elle n'a jamais su expliquer en course.</li>
          <li><strong>Cadillac</strong>, pour un double abandon précoce sur surchauffe des freins — sa pire journée de la saison.</li>
          <li><strong>Sainz</strong>, pour une panne électrique qui met fin à sa course au tour 24 et déclenche la première neutralisation.</li>
        </ul>
      </div>
    </div>
    <div class="callout">Russell tient bon face à un Verstappen revenu à 1,3 seconde grâce au pari de Red Bull sur un relais de pneus plus long — mais le vrai sujet du Grand Prix d'Autriche est ailleurs : Ferrari, partie deuxième et troisième sur la grille, n'a jamais compris pourquoi ses pneus se dégradaient aussi vite, et Hamilton en paie le prix jusque dans les standings, cédant sa deuxième place au championnat à Russell.</div>
  </div>
</section>

<section class="block" id="sec-r-next">
  <div class="prose">
    <h2 class="sectitle">Enseignements pour la suite</h2>
    <p>Trois points issus de l'Autriche à surveiller dans les prochaines courses :</p>
    <ol style="padding-left:20px; margin:0 0 16px;">
      <li style="margin-bottom:10px;"><strong>Ferrari</strong> doit trouver l'explication à son problème de dégradation avant Silverstone (manche sprint) : un premier arrêt dès le tour 12 pour Hamilton et un troisième arrêt pour les deux voitures ne peuvent pas rester sans réponse plus d'une course.</li>
      <li style="margin-bottom:10px;">Le pari de <strong>Red Bull</strong> sur un second relais retardé de cinq tours a failli faire basculer la victoire. Reste à voir si l'écurie retente ce coup sur un circuit offrant davantage d'occasions de dépasser en piste.</li>
      <li>Le podium d'<strong>Antonelli</strong> maintient son avance au championnat (171 points, 40 d'avance sur Russell), mais Russell revient à 131 points et Hamilton recule à la troisième place — un vrai trio se dessine avant la double manche sprint de Silverstone.</li>
    </ol>
  </div>
</section>

<section class="block" id="sec-r7">
  <details class="sources">
    <summary>Sources utilisées — GP d'Autriche (15 liens)</summary>
    <div class="srcgroup">
      <h5>Base de données The Pit Wall</h5>
      <ul>
        <li><span class="desc">Résultats, grille, arrêts, relais pneus, temps au tour, météo, chronologie complète des messages de course — alimentés depuis l'API OpenF1 (scripts/ingest_openf1.py). Source primaire pour l'ensemble des faits chiffrés de cet article.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Course — source primaire</h5>
      <ul>
        <li><a href="https://press.pirelli.com/russell-on-hand-to-pick-up-the-pieces/" data-desc="Compte rendu officiel Pirelli de la course, stratégie à deux arrêts de Russell et confirmation de la lutte Verstappen/Antonelli pour la P2/P3.">Russell on hand to pick up the pieces!</a><span class="desc">Pirelli Press — communiqué officiel, lu directement via fetch-url.yml</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Pneus — contexte</h5>
      <ul>
        <li><a href="https://www.grandprix247.com/formula-1-news/pirelli-expects-austria-strategy-shift-as-2026-tyres-open-one-stop-possibility" data-desc="Analyse de la nomination des gommes les plus tendres de la gamme pour le Red Bull Ring et de son impact stratégique attendu.">Pirelli anticipe un possible virage vers l'arrêt unique en Autriche</a><span class="desc">GrandPrix247 — secondaire (un premier essai de récupération directe de l'article Pirelli de nomination a renvoyé un contenu daté de 2024, écarté)</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Résultats et classement</h5>
      <ul>
        <li><a href="https://www.silverstone.co.uk/news/f1-2026-austrian-grand-prix-results-russell-holds-verstappen-win-red-bull-ring" data-desc="Résultats complets et résumé de la course.">Résultats du Grand Prix d'Autriche</a><span class="desc">Silverstone.co.uk</span></li>
        <li><a href="https://www.formula1.com/en/results/2026/races/1288/austria/fastest-laps" data-desc="Confirmation du meilleur tour de la course, croisée avec le champ agrégé de la base et notre relevé tour par tour.">Meilleurs tours — GP d'Autriche</a><span class="desc">Formula1.com — résultats officiels</span></li>
        <li><a href="https://www.motorsport.com/f1/news/championship-antonelli-plays-it-safe-russell-bounces-back/10834524/" data-desc="Classement du championnat pilotes après la course.">Antonelli play it safe, Russell bounces back</a><span class="desc">Motorsport.com</span></li>
        <li><a href="https://www.aljazeera.com/sports/2026/6/28/russell-beats-verstappen-at-austrian-grand-prix-to-boost-f1-title-hopes" data-desc="Contexte sur les implications du résultat pour la lutte au championnat.">Russell beats Verstappen to boost title hopes</a><span class="desc">Al Jazeera</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Stratégie et réactions d'après-course</h5>
      <ul>
        <li><a href="https://www.autosport.com/f1/news/f1-austrian-gp-race-report-/10834502/" data-desc="Récit détaillé du pari stratégique de Red Bull sur le second relais de Verstappen et de la remontée manquée de peu.">Russell holds off Verstappen to win and cut...</a><span class="desc">Autosport</span></li>
        <li><a href="https://www.motorsport.com/f1/news/ferraris-austrian-gp-problems-explained-as-lewis-hamilton-loses-p2-in-championship/10834571/" data-desc="Analyse des problèmes de rythme et de dégradation rencontrés par Ferrari, et de leur impact sur le championnat.">Ferrari's Austrian GP problems explained</a><span class="desc">Motorsport.com</span></li>
        <li><a href="https://www.autosport.com/f1/news/lewis-hamilton-charles-leclerc-confused-by-woeful-ferrari-race-pace-in-austria/10834669/" data-desc="Réactions de Hamilton et Leclerc, tous deux dans l'incapacité d'expliquer le déficit de rythme en course.">Hamilton, Leclerc confused by woeful Ferrari pace</a><span class="desc">Autosport</span></li>
        <li><a href="https://www.total-motorsport.com/red-bull-resurgence-gives-hadjar-hope-after-austrian-gp-breakthrough/" data-desc="Contexte sur la performance de Hadjar et la dynamique retrouvée par Red Bull en fin de saison.">Red Bull resurgence gives Hadjar hope</a><span class="desc">Total Motorsport</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Abandons</h5>
      <ul>
        <li><a href="https://carlossainz.es/en/carlos-sainz-race-austrian-gp-f1-2026.html" data-desc="Détail de la panne électrique ayant mis fin à la course de Sainz au tour 24, à l'origine du premier VSC.">Sainz retires from the Austrian GP with a power unit failure</a><span class="desc">CarlosSainz.es</span></li>
        <li><a href="https://honda.racing/f1/post/f1-2026-rd08-race" data-desc="Confirmation de l'abandon de Stroll et du classement d'Alonso.">Alonso finishes 18th as Stroll retires</a><span class="desc">Honda Racing (partenaire moteur Aston Martin)</span></li>
        <li><a href="https://123helmets.com/grand-prix-recaps/bottas-perez-cadillac-2026-austrian-gp-retirement/" data-desc="Détail des deux abandons Cadillac pour surchauffe des freins, aux tours 2 et 4.">Bottas & Perez: Cadillac's 2026 Austrian GP Exits</a><span class="desc">123Helmets</span></li>
        <li><a href="https://www.williamsf1.com/articles/e1e12df7-80b8-4c77-a232-1169363303e1/report-austria-sunday-2026" data-desc="Compte rendu de l'équipe sur l'abandon de Sainz et l'incident d'Albon avec la borne d'apex du virage 3, à l'origine du second VSC.">Report: Limited progress in the Austrian heat</a><span class="desc">WilliamsF1.com</span></li>
      </ul>
    </div>
  </details>
</section>
`;
