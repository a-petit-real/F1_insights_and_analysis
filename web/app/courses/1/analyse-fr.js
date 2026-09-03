// Analyse Round 1 — Grand Prix d'Australie 2026 (Melbourne).
// Rédigé à partir de scripts/race_briefing*.py (base de données The Pit
// Wall, alimentée par OpenF1 : résultats, arrêts, pneus, secteurs,
// météo, chronologie complète des messages de course) et de recherches
// web ciblées (WebSearch) pour le contexte non capturé en base (causes
// des sorties de piste, citations d'après-course). La source Pirelli
// sur les gommes nominées est une lecture primaire (press.pirelli.com,
// récupérée via le workflow fetch-url.yml) — les autres articles de
// presse sont des sources secondaires, citées comme telles.
export const ROUND1_ANALYSE_FR_HTML = `
<div class="hero prose">
  <p class="eyebrow">Grand Prix d'Australie · Melbourne · 2026</p>
  <p class="verdict">Mercedes a gagné avec un seul arrêt joué sur le premier des trois Virtual Safety Car de la course — pas avec la voiture la plus rapide.</p>
  <div class="resultstrip">
    <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes</span></div>
    <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · +2,974s</span></div>
    <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari · +15,519s</span></div>
    <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari · +16,144s</span></div>
    <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren · +51,741s</span></div>
  </div>
  <p class="subverdict">Russell et Antonelli se sont arrêtés au même tour — le 12 — pendant la première période de Virtual Safety Car de la course, provoquée par l'abandon d'Hadjar. Un arrêt quasi gratuit, jamais remis en cause ensuite : les deux Mercedes n'ont plus repris les stands jusqu'à l'arrivée. Ferrari avait le rythme pour inquiéter ce doublé mais un second passage aux stands et une exécution moins nette ont coûté la troisième place nette à Hamilton, battu de 0,625s par son propre coéquipier. Verstappen, parti de la P20 après une sortie de piste en qualifications, a signé la remontée du jour jusqu'à la P6 avec le meilleur tour en course. McLaren n'a marqué que par Norris : Piastri n'a jamais pris le départ.</p>
</div>

<section class="block" data-num="01" id="sec-r1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Le contexte avant la course</h2>
    <p>Grille inhabituelle pour une course d'ouverture : Russell en pole devant Antonelli, puis Hadjar — troisième sur la grille pour ses débuts chez Red Bull — devant Leclerc et Piastri. Norris n'était que sixième, Hamilton septième. Verstappen s'élançait de la vingtième place, loin de son habitude : en Q1, une défaillance logicielle du système de récupération d'énergie a bloqué l'essieu arrière au freinage du premier virage, envoyant sa RB22 dans le gravier. « Je n'avais jamais rien vécu de tel », a-t-il déclaré à Sky Sports F1 après coup.</p>
    <p>Le plateau a perdu deux voitures avant même le départ. Piastri a quitté la piste au virage 4 pendant le tour de reconnaissance, surpris par un pic de puissance électrique d'environ 100 kW qu'il n'attendait pas — son avant droit et la suspension associée étaient trop endommagés pour réparer à temps. Hülkenberg n'a pas non plus pris le départ ; les commissaires avaient par ailleurs ouvert puis classé sans suite une enquête pour infraction à la procédure de départ visant sa voiture, sans lien établi avec son forfait.</p>
    <p>Pirelli avait nominé les trois gommes les plus tendres de sa gamme pour Melbourne — C3, C4 et C5, en dur/medium/tendre — et rappelait, dans son communiqué officiel, qu'en 2024 cette même combinaison avait produit une course à deux arrêts en utilisant les trois composés. <a href="https://press.pirelli.com/complete-f1-tyre-range-for-the-first-three-grands-prix-of-2026/" data-desc="Communiqué officiel Pirelli sur les nominations de gommes pour les trois premières courses de 2026.">Communiqué Pirelli — nominations Melbourne/Shanghai/Suzuka</a> C'est important pour la suite : la course a largement démenti ce scénario par défaut.</p>
    <p>Côté météo, rien à signaler — et c'est en soi une information : conditions stables sur toute la course, 23,1 à 25,3°C dans l'air, 33,3 à 39,1°C sur la piste, aucune pluie, humidité entre 51 et 57%. La stratégie s'est jouée sur la piste et le chrono, pas sur un pari météo.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-r2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

    <h3 class="subtitle">Hadjar s'envole, puis tombe en panne</h3>
    <p>Au départ, Hadjar prend un meilleur envol que les deux Mercedes et croit un instant pouvoir passer en tête au premier virage. La panne le rattrape presque aussitôt : puissance en chute côté groupe propulseur RBPT-Ford, un bruit qu'il a lui-même qualifié de « terrible » et qui, selon ses mots, lui a fait comprendre son sort avant même l'abandon officiel au tour 12. Sa voiture immobilisée déclenche la première période de Virtual Safety Car de la course, de 04:19:08 à 04:23:07 (heure de session), avec des commissaires signalés au virage 9.</p>

    <h3 class="subtitle">L'arrêt qui a gagné la course : Russell et Antonelli sous VSC</h3>
    <p>Russell et Antonelli s'arrêtent tous les deux au tour 12 — en plein dans la fenêtre du VSC — pour chausser les durs. C'est le geste stratégique le plus rentable de la journée : sous VSC, l'écart au tour se resserre entre tous les pilotes, ce qui rend un arrêt presque gratuit comparé à un arrêt en conditions de course normale. Les deux Mercedes ne repasseront plus par la voie des stands avant l'arrivée : un seul arrêt chacune, contre deux pour la plupart de leurs poursuivants directs — et contre le scénario à deux arrêts que Pirelli anticipait par défaut sur cette combinaison de gommes.</p>

    <h3 class="subtitle">Un deuxième VSC referme la fenêtre de Ferrari</h3>
    <p>Une deuxième période de VSC survient entre 04:29:55 et 04:32:26, avec une fermeture complète de l'entrée de la voie des stands d'environ 65 secondes (04:31:16-04:32:21). Plusieurs voitures s'arrêtent autour du tour 18 dans cette fenêtre — Bearman, Bortoleto, Lindblad, Pérez, Verstappen, et Leclerc pour un premier passage aux stands étonnamment court : 17,664s au total, dont seulement 2,2s à l'arrêt, l'un des tours de roue les plus rapides de la course. Les données de la base ne montrent pourtant aucun changement de composé enregistré à ce moment précis — Leclerc reste crédité de gommes medium jusqu'au tour 24, avant de chausser des durs neufs au tour 25 lors d'un second arrêt. Un contrôle direct auprès d'OpenF1 confirme que cette absence de relais intermédiaire vient de la source elle-même, pas d'une erreur d'ingestion : le fournisseur de données n'a enregistré que deux relais pour Leclerc sur toute la course. L'explication la plus probable, cohérente avec les deux arrêts chronométrés séparément, est un remplacement de medium à medium au tour 18 plutôt qu'un changement de composé — mais elle reste une inférence, pas une certitude absolue. Leclerc lui-même a évoqué après course un pari sur une nouvelle période de VSC qui ne s'est pas présentée à temps pour Ferrari : « c'est toujours un gamble », a-t-il expliqué, ajoutant que l'entrée des stands était fermée au moment où l'opportunité s'est présentée.</p>
    <p>Hamilton suit un schéma proche — arrêts aux tours 18 et 28, mais une seule bascule de composé enregistrée (medium puis dur à partir du tour 28), la même limite de données qu'avec Leclerc.</p>

    <h3 class="subtitle">Une troisième VSC, courte et passée presque inaperçue</h3>
    <p>Une troisième période de VSC, très brève (04:52:20-04:52:58, moins de quarante secondes, commissaires au virage 8), coïncide avec le second arrêt de Norris au tour 34. Elle n'a pas d'incidence stratégique majeure identifiable, mais complète une chronologie de course à trois VSC et non deux comme une lecture partielle des messages de course pourrait le laisser penser.</p>

    <h3 class="subtitle">Norris et le relais de durs prolongé</h3>
    <p>Norris chausse ses durs au tour 11 et les conserve jusqu'au tour 34 — vingt-trois tours d'affilée, la valeur exacte rapportée après course par la presse spécialisée pour expliquer les difficultés de McLaren sur ce train de pneus, et que notre propre relevé tour par tour confirme au tour près. Le rythme de Norris s'érode sensiblement sur la fin de ce relais : autour d'1:23,7 au tour 21, il referme à 1:24,8 au tour 32, soit environ une seconde perdue en douze tours — une tendance cohérente avec le grainage évoqué publiquement par l'équipe cette semaine-là, sans que ce seul relevé suffise à l'établir avec certitude (trafic et charge de carburant ne sont pas isolés ici). Norris rechausse des mediums au tour 34 pour finir la course, cinquième et unique marqueur de points McLaren du week-end.</p>

    <h3 class="subtitle">Verstappen, la remontée du jour</h3>
    <p>Parti vingtième, Verstappen ne s'arrête que deux fois (tours 18 et 41) et remonte méthodiquement le peloton pour terminer sixième, avec le meilleur tour de la course en 1:22,091 signé au tour 42, une fois la piste dégagée devant lui.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-r3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

    <h3 class="subtitle">Mercedes — le contre-pied assumé sur l'allocation de gommes</h3>
    <p>Pirelli attendait un scénario à deux arrêts sur cette nomination de composés. Mercedes a fait l'inverse dès que l'opportunité s'est présentée : un seul arrêt chacune, synchronisé sur le VSC le plus rentable de la course. Le pari tenait à un relais de durs très long (46 tours pour les deux voitures) sur un circuit où l'entretien des pneus s'est révélé plus limité par l'usure que par la contrainte thermique — exactement le profil qui permet ce genre de stratégie à un arrêt. Aucune des deux Mercedes n'a semblé menacée sur la fin, ce qui valide la lecture de dégradation faite avant course.</p>

    <h3 class="subtitle">Ferrari — le bon rythme, une exécution moins nette</h3>
    <p>Leclerc et Hamilton avaient le rythme pour inquiéter le doublé Mercedes — Hamilton n'a fini qu'à 0,625s de la P3 de son propre coéquipier. Mais Ferrari a dû s'y reprendre à deux fois (deux arrêts chacun, contre un seul pour les Mercedes), et le premier passage de Leclerc au tour 18, à peine 2,2 secondes à l'arrêt, n'a apparemment pas produit le changement de stratégie que l'équipe visait. Leclerc a lui-même pointé une fenêtre de VSC manquée par une entrée de stands fermée au mauvais moment. Rétrospectivement, le simple fait d'avoir dû gérer deux arrêts là où Mercedes n'en a fait qu'un a suffi à céder la course, indépendamment de la question de savoir si le second VSC aurait pu être mieux exploité.</p>

    <h3 class="subtitle">McLaren — Norris limite la casse, Piastri ne prend jamais le départ</h3>
    <p>La perte de Piastri avant le départ a coûté à McLaren toute chance de résultat d'équipe ce week-end-là. Norris a fait le maximum avec ce qu'il avait : un relais de durs volontairement prolongé jusqu'au tour 34, payé par une érosion de rythme en fin de relais cohérente avec le grainage rapporté par l'équipe, pour une cinquième place qui restera le seul résultat McLaren du Grand Prix d'Australie.</p>

    <h3 class="subtitle">Red Bull — un abandon qui déclenche la course, une remontée qui la rachète</h3>
    <p>La panne d'Hadjar au tour 12, dès sa première course pour l'écurie, a non seulement mis fin à son week-end mais a directement façonné la course : c'est son immobilisation qui a provoqué le VSC1, la fenêtre stratégique la plus rentable de toute la course — et Mercedes en a le plus profité. De l'autre côté du garage, Verstappen a transformé une P20 en P6 avec le meilleur tour de la course, la seule vraie performance de pilotage individuelle à ce niveau du classement.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-r4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
    <p>L'évaluation porte sur la course de dimanche, en tenant compte de la position de départ, de la voiture et des circonstances (source : base de données The Pit Wall, résultats/arrêts/pneus, complétée par la recherche web pour les causes de sortie de piste et les citations).</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
      <tbody>
        <tr><td><span class="dot" style="background:#00A19B"></span> Russell</td><td>P1 → P1</td><td>Pole à l'arrivée sans être inquiété. Un seul arrêt, joué au tour 12 en plein VSC1 : le geste stratégique le plus rentable de la course.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>P2 → P2</td><td>Même stratégie, même tour d'arrêt que Russell. Devance son coéquipier sur l'ensemble de la course pour son premier podium à ce niveau.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>P4 → P3</td><td>Rythme suffisant pour inquiéter Mercedes, mais deux arrêts contre un pour les Mercedes. Premier passage aux stands (tour 18, 2,2s à l'arrêt) sans changement de composé identifiable dans les données ; second arrêt tour 25 pour les durs. Évoque après course un pari sur un second VSC contrarié par une entrée de stands fermée.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>P7 → P4</td><td>Stratégie jumelle à celle de Leclerc (arrêts tours 18 et 28), rythme de fin de course légèrement supérieur. Termine à 0,625s de son coéquipier et du podium.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Norris</td><td>P6 → P5</td><td>Seul marqueur de points McLaren du week-end après le forfait de Piastri. Relais de durs prolongé à 23 tours (jusqu'au tour 34), rythme en érosion sensible en fin de relais, cohérent avec le grainage évoqué par l'équipe.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>P20 → P6</td><td>Reparti de très loin après une sortie de piste en Q1 due à une défaillance logicielle du système de récupération d'énergie (blocage de l'essieu arrière au freinage). Remontée méthodique jusqu'à la P6, meilleur tour de la course en 1:22,091.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>P12 → P7*</td><td>Meilleur résultat Haas du week-end, un seul arrêt (tour 18). *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>P9 → P8*</td><td>Un seul arrêt (tour 18), points marqués pour RB F1 Team. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>P10 → P9*</td><td>Deux arrêts (18, 33), points marqués pour Audi dès la première course de la marque. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>P14 → P10*</td><td>Un seul arrêt (tour 11), remonte dans les points. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>P13 → P11*</td><td>Un seul arrêt (tour 11) ; visé par une enquête pour conduite jugée inutilement lente, classée sans suite après course. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Albon</td><td>P15 → P12*</td><td>Deux arrêts (12, 33), en délégation hors des points. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lawson</td><td>P8 → P13*</td><td>Recul net depuis la P8 ; deux arrêts (11, 33), visé par une enquête après un accrochage avec Pérez au virage 11, classée sans suite. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>P16 → P14*</td><td>Pénalité stop-and-go pour infraction à la procédure de départ, purgée au tour 18 pendant le VSC2 ; deux arrêts (9, 46). *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>P21 → P15*</td><td>Quatre arrêts (11, 33, 45, plus un tour 1 initial) sur une course globalement discrète pour Williams. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>P18 → P16*</td><td>Deux arrêts (18, 43) ; visé par une enquête pour non-respect de drapeaux bleus, classée sans suite. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Stroll</td><td>P22 → P17</td><td>Stratégie atypique à cinq arrêts (11, 18, 26, 34, 39) ; ne devance que les abandons.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Alonso</td><td>P17 → Abandon</td><td>Trois arrêts (11, 13, 22) avant l'abandon.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>P19 → Abandon</td><td>Un arrêt (tour 12) avant l'abandon.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>P3 → Abandon</td><td>Départ prometteur, panne de groupe propulseur au tour 12 pour sa première course chez Red Bull — l'abandon qui a directement déclenché le VSC1 exploité par Mercedes.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Piastri</td><td>P5 → N'a pas pris le départ</td><td>Sortie de piste au virage 4 pendant le tour de reconnaissance après un pic de puissance électrique inattendu (~100 kW) ; dégâts trop importants pour prendre le départ.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>P11 → N'a pas pris le départ</td><td>Ne prend pas le départ. Une enquête pour infraction à la procédure de départ, ouverte avant course, a été classée sans suite — sans lien établi avec le forfait.</td></tr>
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
        <tr><td><span class="dot" style="background:#00A19B"></span> Mercedes</td><td>Doublé obtenu avec un seul arrêt chacune, contre le scénario à deux arrêts anticipé par Pirelli sur cette allocation de gommes. Le meilleur coup stratégique de la course, jamais remis en cause après le tour 12.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Ferrari</td><td>Rythme suffisant pour inquiéter Mercedes (0,625s séparent Hamilton du podium de son propre coéquipier), mais deux arrêts contre un et un premier passage de Leclerc dont l'effet stratégique reste flou dans les données disponibles.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> McLaren</td><td>Perd Piastri avant le départ ; ne repart qu'avec Norris, cinquième malgré une érosion de rythme visible en fin de relais sur les durs.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Red Bull</td><td>Abandon d'Hadjar au tour 12 pour ses débuts sous la marque — l'événement qui a façonné la course entière via le VSC1. Verstappen sauve la mise avec une remontée de P20 à P6 et le meilleur tour.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Haas F1 Team</td><td>Bearman et Ocon dans les points (P7 et P11), week-end propre sans incident notable.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> RB F1 Team</td><td>Lindblad marque des points dès le tour 8 sur la grille ; Lawson recule nettement (P8 → P13), impliqué dans un incident classé sans suite avec Pérez.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Audi</td><td>Bortoleto marque des points pour la première course de la marque en catégorie reine ; Hülkenberg ne prend pas le départ.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Alpine F1 Team</td><td>Gasly dans les points ; Colapinto pénalisé (stop-and-go) pour une infraction à la procédure de départ.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Williams</td><td>Albon et Sainz hors des points, week-end discret sans incident majeur.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Aston Martin</td><td>Stroll conserve une stratégie à cinq arrêts hors de propos avec le rythme de la course ; Alonso abandonne après trois arrêts.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Cadillac F1 Team</td><td>Pérez et Bottas (abandon) pour la première course de la nouvelle écurie américaine en catégorie reine ; aucun point marqué.</td></tr>
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
          <li><strong>Mercedes</strong>, pour avoir joué l'arrêt unique contre l'attente générale et l'avoir synchronisé sur la fenêtre de VSC la plus rentable.</li>
          <li><strong>Verstappen</strong>, pour la remontée la plus spectaculaire du jour (P20 → P6, meilleur tour) après une sortie de piste qui n'était pas de son fait.</li>
          <li><strong>Hadjar</strong>, pour un départ prometteur qui laisse entrevoir un vrai potentiel malgré l'abandon de sa première course.</li>
        </ul>
      </div>
      <div class="verdictcol lose">
        <h4>Perdants</h4>
        <ul>
          <li><strong>Piastri et McLaren</strong>, pour un forfait avant même le départ qui a coûté toute chance de résultat d'équipe.</li>
          <li><strong>Ferrari</strong>, qui avait le rythme du doublé mais pas l'exécution stratégique — 0,625s séparent finalement les deux voitures du podium adverse.</li>
          <li><strong>Hülkenberg</strong>, pour un forfait qui prive Audi de sa deuxième voiture dès la première course de la marque.</li>
        </ul>
      </div>
    </div>
    <div class="callout">Trois Virtual Safety Car ont rythmé cette course, et un seul a vraiment compté : celui du tour 12, provoqué par l'abandon d'Hadjar, que Mercedes a exploité en s'arrêtant les deux à la fois pour ne plus jamais revenir aux stands. Tout le reste — le rythme de Ferrari, la remontée de Verstappen, l'érosion de Norris sur ses durs — s'est joué autour de cette décision prise en l'espace d'un tour.</div>
  </div>
</section>

<section class="block" id="sec-r-next">
  <div class="prose">
    <h2 class="sectitle">Enseignements pour la suite</h2>
    <p>Trois points issus de Melbourne à surveiller dans les prochaines courses :</p>
    <ol style="padding-left:20px; margin:0 0 16px;">
      <li style="margin-bottom:10px;">L'arrêt unique de <strong>Mercedes</strong> a fonctionné parce que Melbourne limite la piste par l'usure plus que par la contrainte thermique. Reste à voir si l'équipe peut reproduire ce pari sur des circuits qui sollicitent davantage les pneus.</li>
      <li style="margin-bottom:10px;">La coordination des deux arrêts chez <strong>Ferrari</strong> — et la question de savoir si le premier passage de Leclerc, très court et sans effet de composé identifiable, correspondait bien au plan de l'équipe — est un point à reprendre dès que Ferrari se retrouve de nouveau face à un choix de fenêtre de VSC.</li>
      <li><strong>McLaren</strong> doit résoudre son problème de grainage sur le train dur avant que Piastri ne revienne en piste : Norris seul a suffi à sauver la face à Melbourne, ça ne suffira pas éternellement.</li>
    </ol>
  </div>
</section>

<section class="block" id="sec-r7">
  <details class="sources">
    <summary>Sources utilisées — GP d'Australie (13 liens)</summary>
    <div class="srcgroup">
      <h5>Base de données The Pit Wall</h5>
      <ul>
        <li><span class="desc">Résultats, grille, arrêts, relais pneus, temps au tour et de secteur, météo, chronologie complète des messages de course — alimentés depuis l'API OpenF1 (scripts/ingest_openf1.py). Source primaire pour l'ensemble des faits chiffrés de cet article.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Pneus — source primaire</h5>
      <ul>
        <li><a href="https://press.pirelli.com/complete-f1-tyre-range-for-the-first-three-grands-prix-of-2026/" data-desc="Nominations officielles des composés pour les trois premières courses de 2026.">Nominations de gommes — Melbourne, Shanghai, Suzuka</a><span class="desc">Pirelli Press — communiqué officiel, lu directement</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Incidents et sorties de piste</h5>
      <ul>
        <li><a href="https://racingnews365.com/max-verstappen-australian-gp-qualifying-crash-cause-revealed" data-desc="Cause technique confirmée de la sortie de piste de Verstappen en Q1.">Verstappen : la cause de la sortie de piste en qualifications</a><span class="desc">RacingNews365</span></li>
        <li><a href="https://www.the-race.com/formula-1/the-most-painful-part-of-piastris-home-pre-race-crash/" data-desc="Détails sur le pic de puissance ayant surpris Piastri au tour de reconnaissance.">Ce qui a causé la sortie de piste de Piastri</a><span class="desc">The Race</span></li>
        <li><a href="https://www.racefans.net/2026/03/10/hadjar-told-red-bull-his-cars-performance-was-embarrassing-and-just-c/" data-desc="Réactions d'Hadjar après sa panne moteur au tour 12.">Hadjar après l'abandon</a><span class="desc">RaceFans</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Stratégie et réactions d'après-course</h5>
      <ul>
        <li><a href="https://www.planetf1.com/f1-data/ferrari-strategy-george-russell-australian-grand-prix-vsc" data-desc="Analyse de la fenêtre de VSC exploitée par Mercedes et manquée par Ferrari.">Le choix de VSC qui a décidé la course</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://www.espn.com/f1/story/_/id/48141547/charles-leclerc-downplays-talk-ferrari-got-strategy-wrong-australian-gp" data-desc="Leclerc commente la stratégie Ferrari et le pari sur un second VSC.">Leclerc relativise la polémique stratégique</a><span class="desc">ESPN</span></li>
        <li><a href="https://www.skysports.com/f1/news/12474/13516647/australian-gp-ferrari-boss-frederic-vasseur-has-no-regrets-over-strategy-choice-after-charles-leclerc-lewis-hamilton-finish-behind-mercedes" data-desc="Vasseur défend le choix stratégique de Ferrari après la course.">Vasseur : « no regret » sur la stratégie</a><span class="desc">Sky Sports</span></li>
        <li><a href="https://www.f1oversteer.com/news/mclaren-fell-considerably-behind-mercedes-in-australian-grand-prix-tyre-graining-battle/" data-desc="Détail du relais de durs de Norris et du grainage évoqué par McLaren.">Le grainage qui a coûté cher à McLaren</a><span class="desc">F1 Oversteer</span></li>
        <li><a href="https://www.pitdebrief.com/post/norris-reflects-on-difficult-2026-australian-gp-for-mclaren/" data-desc="Réactions de Norris après une course difficile pour McLaren.">Norris sur une course « pire que prévu »</a><span class="desc">Pit Debrief</span></li>
      </ul>
    </div>
  </details>
</section>
`;
