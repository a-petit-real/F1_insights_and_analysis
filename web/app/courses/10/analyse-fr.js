// Analyse Round 10 — Grand Prix de Belgique 2026 (Spa-Francorchamps).
// Rédigé à partir de scripts/race_briefing*.py (base de données The Pit
// Wall, alimentée par OpenF1 : résultats, grille, arrêts, relais pneus,
// temps au tour et de secteur, météo en série temporelle, chronologie
// complète des messages de course — SC/VSC, pénalités, enquêtes) et de
// recherches web ciblées (WebSearch) pour le contexte non capturé en
// base (cause du recul d'Hadjar en qualifications, citations
// d'après-course, résolution des enquêtes FIA). La source Pirelli sur
// cette course précise (antonelli-wins-at-the-legendary-spa-francorchamps-circuit)
// est une lecture primaire (press.pirelli.com, récupérée via
// fetch-url.yml) — les autres articles de presse sont des sources
// secondaires, citées comme telles. Le tour le plus rapide de la
// course, signé par Norris au tour 44 en 1:48,890, est confirmé
// indépendamment par trois sources : le champ meilleur-tour de la
// base (race_briefing.py), notre propre relevé tour par tour
// (race_briefing_laptimes.py, tour 44 = 0:01:48.890000 très exactement),
// et le communiqué officiel Pirelli qui décrit sa stratégie hards
// prolongée jusqu'au tour 30 — même rigueur de triple vérification
// que pour le tour d'Antonelli au Round 2.
export const ROUND10_ANALYSE_FR_HTML = `
<div class="hero prose">
  <p class="eyebrow">Grand Prix de Belgique · Spa-Francorchamps · 2026</p>
  <p class="verdict">Antonelli gagne un duel avec Leclerc décidé par un pari : Ferrari a fait attendre ses deux voitures pour un arrêt gratuit sous VSC, a pris la tête — puis Antonelli l'a reprise sur la piste, au tour 34, pour l'emporter de moins de deux secondes.</p>
  <div class="resultstrip">
    <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes</span></div>
    <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari · +1,952s</span></div>
    <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · +11,586s</span></div>
    <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari · +17,245s</span></div>
    <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">McLaren · +18,988s</span></div>
  </div>
  <p class="subverdict">Le premier tour a suffi à décider une partie de la course : au virage 6, Hamilton n'a pas su conserver assez d'écart avec Russell et l'a percuté — les commissaires ont jugé Russell dans son plein droit sur la piste et Hamilton fautif, cinq secondes de pénalité à la clé. Russell s'est enlisé dans le gravier et n'a plus reparu ; sa voiture accidentée a provoqué la seule Safety Car complète de la course, sur les quatre premiers tours. Verstappen a profité du chaos pour prendre la tête un instant avant qu'Antonelli ne la reprenne. Le vrai coup stratégique du jour vient de Ferrari : les deux voitures ont volontairement prolongé leur premier relais de mediums en pariant sur une nouvelle neutralisation — un VSC est arrivé au bon moment, tour 20, permettant un arrêt à moindre coût pour Leclerc et Hamilton simultanément et propulsant Leclerc en tête. Antonelli a répondu sur la piste, repassant devant au tour 34 pour signer sa sixième victoire de la saison. Ailleurs sur la grille, Hadjar a transformé une pénalité de 30 places sur la grille en remontée jusqu'à la P6, et Norris, seul pilote de tête à s'être élancé en durs, a tenu son relais initial jusqu'au tour 30 avant de signer le meilleur tour de la course sur mediums frais.</p>
</div>

<section class="block" data-num="01" id="sec-r1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Le contexte avant la course</h2>
    <p>Grille inhabituelle pour une autre raison que les habituelles pannes ou sorties de piste : pour la première fois de la saison, les vingt-deux voitures inscrites ont pris le départ. Mais l'ordre de grille portait la marque d'une pénalité lourde : Hadjar, qualifié dans le top 10, a écopé d'un recul de trente places pour avoir dépassé son quota d'éléments de groupe propulseur — Red Bull a choisi de sacrifier sa position de départ pour repartir sur des pièces fraîches, l'envoyant de la dixième à la vingt-et-unième place sur la grille. En tête, Antonelli s'élançait en pole devant Verstappen, Russell et Leclerc ; Hamilton complétait la deuxième ligne, Piastri sixième.</p>
    <p>Pirelli avait nominé une allocation médiane pour Spa-Francorchamps — C2, C3 et C4 (dur/medium/tendre) — un circuit que le manufacturier classe parmi les plus exigeants en charge pneumatique de la saison, juste derrière Suzuka et Silverstone. Un risque de pluie de 10% avait été signalé avant le départ, mais la météo est restée stable et sèche sur toute la course : 16,7 à 19,3°C dans l'air, 26,1 à 37,0°C sur la piste, aucune goutte enregistrée — Pirelli notera après coup que quelques gouttes ont malgré tout légèrement rafraîchi la piste par rapport aux essais, réduisant la dégradation et permettant des relais plus longs que prévu.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-r2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

    <h3 class="subtitle">Un premier tour qui coûte une Mercedes</h3>
    <p>La course s'est jouée en partie avant même le premier tour complet. Au virage 6, la Ferrari d'Hamilton a survireté et, malgré une correction, a touché le flanc droit de la Mercedes de Russell avec sa roue avant gauche. Les commissaires ont conclu que Russell disposait de l'espace nécessaire sur la piste et qu'Hamilton n'avait pas su maintenir un écart suffisant : cinq secondes de pénalité, réduites du barème standard de dix secondes pour circonstances atténuantes. Russell, lui, s'est retrouvé dans le bac à gravier, sortie de course immédiate — sa voiture immobilisée au virage 6 a déclenché la seule Safety Car complète de la journée, déployée à peine plus d'une minute après le départ et neutralisant la course sur environ quatre tours pendant qu'un véhicule de récupération intervenait.</p>

    <h3 class="subtitle">Verstappen s'envole, Antonelli reprend la main</h3>
    <p>Dans la confusion du premier tour, Verstappen a brièvement pris la tête devant Antonelli. L'avantage n'a pas duré : une fois la piste dégagée derrière la Safety Car, Antonelli a repris le commandement et l'a conservé jusqu'à la première vague d'arrêts, sans être inquiété par un rythme de course très serré entre les quatre premiers — les écarts au tour entre Antonelli, Leclerc, Hamilton et Verstappen se sont maintenus autour d'1:50 à 1:51 tout au long du premier relais.</p>

    <h3 class="subtitle">Le pari de Ferrari : attendre la neutralisation</h3>
    <p>C'est là que la course a basculé. La majorité du peloton s'est arrêtée entre les tours 14 et 18 — Antonelli lui-même au tour 18, profitant d'un très bref VSC (moins de quarante secondes, 13:39:13-13:39:46 heure de session) qui a réduit le coût de son passage aux stands. Ferrari, à l'inverse, a délibérément prolongé le relais initial de Leclerc et Hamilton sur les mediums, pariant sur une nouvelle neutralisation à venir. Le pari a payé : un second VSC, déclenché par un accrochage entre Lindblad et Lawson au virage 5 (Lawson poussé hors piste, aucune sanction retenue après enquête), est arrivé tour 20 — exactement au moment où Ferrari faisait rentrer ses deux voitures ensemble pour chausser les durs. L'arrêt, presque gratuit sous neutralisation, a propulsé Leclerc en tête devant Antonelli. Pirelli confirmera après course que seule Ferrari, parmi les équipes de tête, avait fait ce choix d'attendre — une décision qui a fonctionné à la lettre.</p>

    <h3 class="subtitle">Antonelli répond sur la piste</h3>
    <p>L'avantage de Leclerc n'a duré que quatorze tours. Antonelli, sur un rythme très légèrement supérieur en seconde partie de course (plusieurs tours sous 1:50 à partir du tour 22, contre un Leclerc qui peine à repasser sous cette marque avant le tour 40), est revenu sur la Ferrari et l'a repassée au tour 34. L'écart à l'arrivée — 1,952 seconde — résume l'ampleur du duel : Ferrari avait gagné la course sur un coup stratégique, Mercedes l'a reprise sur un rythme de piste supérieur.</p>

    <h3 class="subtitle">Hadjar, la remontée du jour</h3>
    <p>Parti dernier après sa pénalité de trente places, Hadjar a été renvoyé aux stands dès les tours 1 et 2 — un double arrêt précoce qui ne coûte rien à un pilote qui n'a de toute façon aucune position à défendre en piste, et qui lui permet d'aborder la longue remontée avec des pneus dans l'état voulu par l'équipe. Un troisième et dernier arrêt au tour 20, dans la même fenêtre de VSC que le peloton de tête, complète une stratégie à trois arrêts entièrement tournée vers la remontée : de la P21 à la P6, quinze places gagnées, la meilleure performance individuelle du week-end saluée par les observateurs à l'antenne.</p>

    <h3 class="subtitle">Norris, la stratégie à contre-courant</h3>
    <p>Seul pilote de tête à s'élancer en durs plutôt qu'en mediums, Norris a tenu ce premier relais jusqu'au tour 30 — bien au-delà des dix-huit à vingt et un tours des autres frontrunners — avant de chausser des mediums frais pour finir la course. Sur ce train tardif, il a signé le tour le plus rapide de la course, 1:48,890 au tour 44, confirmé indépendamment par le classement officiel, notre propre relevé chronométrique tour par tour et le communiqué Pirelli qui détaille sa stratégie. Parti treizième, il termine septième.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-r3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

    <h3 class="subtitle">Ferrari — un pari qui a failli suffire</h3>
    <p>D'après Pirelli, Ferrari a été la seule équipe de tête à dévier des stratégies de ses rivaux directs, en étirant volontairement le relais initial sur mediums de Leclerc et Hamilton dans l'attente d'une neutralisation. Le pari s'est réalisé au tour 20 et a permis un arrêt synchronisé, à moindre coût, pour les deux voitures — de quoi placer Leclerc en tête. Ce n'est que le rythme de piste supérieur d'Antonelli en seconde moitié de course qui a fini par renverser la décision. Ferrari repart de Belgique avec la preuve que le pari fonctionne, mais aussi avec la démonstration qu'il ne suffit pas à lui seul face à une Mercedes plus rapide sur la durée.</p>

    <h3 class="subtitle">Mercedes — gérer sans paniquer</h3>
    <p>L'arrêt d'Antonelli au tour 18, sous un très bref VSC, n'avait rien d'un coup stratégique préparé — c'est une opportunité saisie au bon moment, pas un pari sur une neutralisation à venir comme celui de Ferrari. Une fois repassé derrière Leclerc, Antonelli n'a pas eu besoin d'un nouveau geste stratégique : le rythme de la voiture a suffi à reprendre la tête au tour 34. Russell, de son côté, n'aura disputé qu'un tour de course avant sa sortie au virage 6.</p>

    <h3 class="subtitle">Red Bull — deux courses en une</h3>
    <p>Verstappen a livré une course sans histoire côté stratégie — un seul arrêt (tour 17), un rythme solide, un podium tranquille en P3. Hadjar, à l'autre bout de la grille après sa pénalité, a offert le récit inverse : une stratégie à trois arrêts entièrement construite autour de la remontée, deux passages aux stands dès les deux premiers tours pour prendre date, puis une remontée méthodique jusqu'à la P6. Les deux approches, radicalement différentes, ont chacune atteint leur objectif.</p>

    <h3 class="subtitle">McLaren — Norris à contre-courant, Piastri discret</h3>
    <p>Le choix McLaren de démarrer Norris en durs plutôt qu'en mediums, contrairement au reste du peloton de tête, a payé sur la durée : un relais initial de trente tours, puis le meilleur tour de la course sur des mediums frais en fin d'épreuve, pour une septième place gagnée depuis la treizième sur la grille. Piastri, de son côté, a mené une course sans éclat particulier mais sans faute, cinquième après un léger accrochage sans conséquence avec Leclerc au virage 5 en début de course.</p>
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
        <tr><td><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>P1 → P1</td><td>Perd la tête un instant au premier tour, la reprend derrière la Safety Car, la cède à Leclerc sur l'arrêt sous VSC de Ferrari, la reprend pour de bon au tour 34 sur un rythme de piste supérieur. Sixième victoire de la saison, avance encore au championnat.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>P4 → P2</td><td>Bénéficiaire du pari stratégique de Ferrari — relais medium étiré dans l'attente d'une neutralisation, arrêt tour 20 sous VSC synchronisé avec Hamilton, qui le propulse en tête. Repassé par Antonelli au tour 34, finit à 1,952s. Investigation pour un contact avec Piastri au virage 5 en début de course, classée sans suite.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>P2 → P3</td><td>Prend la tête un instant au premier tour avant la Safety Car, puis course sans histoire côté stratégie : un seul arrêt (tour 17), rythme solide, podium tranquille.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>P5 → P4</td><td>Pénalité de 5 secondes (réduite du barème standard de 10s) pour la collision du premier tour avec Russell au virage 6, jugé responsable par les commissaires ; purgée lors de son arrêt tour 20. Investigation distincte pour un largage dangereux (contact avec un mécanicien) — aucune sanction personnelle, mais Ferrari écope d'une amende de 30 000€ (dont 10 000€ avec sursis). Termine quatrième malgré tout.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Piastri</td><td>P6 → P5</td><td>Course discrète et sans faute. Léger contact avec Leclerc au virage 5 en début de course, investigation classée sans suite ; un seul arrêt (tour 20) dans la même fenêtre de VSC que les premiers.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>P21 → P6</td><td>Pénalité de 30 places sur la grille pour dépassement du quota d'éléments de groupe propulseur, parti dernier. Double arrêt précoce (tours 1 et 2) pour préparer la remontée, troisième arrêt tour 20 ; quinze places gagnées, la meilleure performance individuelle du week-end.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Norris</td><td>P13 → P7</td><td>Seul pilote de tête à s'élancer en durs. Relais initial étiré jusqu'au tour 30 (contre 18-21 tours pour les autres frontrunners), puis meilleur tour de la course en 1:48,890 au tour 44 sur mediums frais, confirmé par trois sources indépendantes.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>P8 → P8</td><td>Course propre et sans incident pour Audi, un seul arrêt (tour 20) dans la fenêtre du peloton de tête.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>P7 → P9</td><td>Perd deux places. Impliqué dans un accrochage avec Lawson au virage 5 (tour 17, l'autre pilote poussé hors piste), investigation classée sans suite ; un seul arrêt (tour 16).</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>P11 → P10</td><td>Gagne une place, dernier point marqué, un seul arrêt (tour 15).</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>P10 → P11</td><td>Perd une place, juste à côté des points, un seul arrêt (tour 14).</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lawson</td><td>P9 → P12</td><td>Perd trois places. L'autre protagoniste de l'accrochage avec Lindblad au virage 5 (tour 17), poussé hors piste, aucune sanction retenue ; un seul arrêt (tour 15).</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>P12 → P13</td><td>Perd une place, un seul arrêt (tour 20) dans la fenêtre du peloton de tête, hors des points.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>P14 → P14</td><td>Position inchangée, deux arrêts (tours 1 et 20), week-end sans relief pour Haas.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Albon</td><td>P15 → P15</td><td>Position inchangée. Signalé pour un problème de feux de sécurité avant course, investigation classée sans suite après course ; un seul arrêt (tour 18) ; impliqué en fin de course dans un dépassement disputé avec Pérez, jugé comme de la course propre par les deux camps.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>P19 → P16</td><td>Gagne trois places depuis l'arrière de la grille. Quatorze tours sur les tendres avant de passer aux durs (tour 15) — le relais de tendres le plus long de la course selon Pirelli.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>P16 → P17</td><td>Perd une place, deux arrêts (tours 1 et 16), week-end discret pour Haas.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>P17 → P18*</td><td>Perd une place. Stratégie à trois relais atypique (tendre-dur-tendre) : 31 tours sur le train de durs, le relais le plus long de la course selon Pirelli, avant de repasser en tendres pour finir. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Alonso</td><td>P22 → P19*</td><td>Parti dernier, trois relais (dur-tendre-dur), deux arrêts (tours 19 et 31) ; ne fait guère mieux qu'un tour de retard. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Stroll</td><td>P20 → Abandon</td><td>Abandon après environ vingt-cinq tours, panne de boîte de vitesses suspectée ; un arrêt (tour 17) avant de s'arrêter en piste.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>P18 → Abandon</td><td>Abandon sur panne de suspension. Enquête a posteriori sur un possible accrochage forcé avec Albon dans leur lutte tardive pour la position, classée sans suite — « de la course propre » selon les deux pilotes.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Russell</td><td>P3 → Abandon</td><td>Sorti dès le premier tour : percuté par Hamilton au virage 6, jugé par les commissaires comme disposant de l'espace nécessaire sur la piste. Enlisé dans le gravier, à l'origine directe de la seule Safety Car complète de la course.</td></tr>
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
        <tr><td><span class="dot" style="background:#00A19B"></span> Mercedes</td><td>Victoire d'Antonelli reprise sur la piste après avoir cédé la tête à l'arrêt stratégique de Ferrari ; Russell sorti dès le premier tour dans la collision avec Hamilton, à l'origine de la seule Safety Car de la course. Sixième victoire de la saison, championnat toujours dominé.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Ferrari</td><td>Le pari stratégique le plus abouti du week-end — relais medium étiré dans l'attente d'une neutralisation, arrêt synchronisé des deux voitures sous VSC au tour 20 — a placé Leclerc en tête avant qu'Antonelli ne reprenne l'avantage sur la piste. Hamilton pénalisé pour la collision avec Russell, l'équipe fautive et amendée pour un largage dangereux, mais quatrième place sauvée malgré tout.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Red Bull</td><td>Deux courses radicalement différentes : Verstappen, podium tranquille sans histoire stratégique ; Hadjar, remontée de la P21 à la P6 après une pénalité de trente places, la meilleure performance individuelle du week-end.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> McLaren</td><td>Norris valide une stratégie à contre-courant (durs au départ, relais étiré à trente tours) et signe le meilleur tour de la course ; Piastri mène une course propre et discrète jusqu'à la cinquième place.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Audi</td><td>Bortoleto marque des points sans incident (P8) ; Hülkenberg termine hors des points (P13).</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> RB F1 Team</td><td>Lindblad et Lawson tous deux impliqués dans le même accrochage au virage 5, tous deux reculent au classement (P9 et P12).</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Alpine F1 Team</td><td>Colapinto marque le dernier point disponible (P10) ; Gasly termine juste à côté (P11).</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Haas F1 Team</td><td>Week-end sans relief : Bearman P14, Ocon P17, aucun point marqué.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Williams</td><td>Sainz remonte trois places depuis l'arrière (P16) ; Albon termine sans changement (P15), tous deux hors des points mais sans incident majeur.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Aston Martin</td><td>Week-end difficile : Stroll abandonne sur panne de boîte suspectée, Alonso termine avec un tour de retard depuis la dernière place sur la grille.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Cadillac F1 Team</td><td>Nouveau week-end sans point : Pérez abandonne sur panne de suspension, Bottas termine avec un tour de retard après une stratégie à trois relais atypique.</td></tr>
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
          <li><strong>Antonelli</strong>, pour avoir repris sur la piste ce que Ferrari lui avait pris par la stratégie — sixième victoire de la saison, avance encore au championnat.</li>
          <li><strong>Hadjar</strong>, pour la remontée la plus spectaculaire du jour : de la P21 à la P6 après une pénalité de trente places.</li>
          <li><strong>Norris</strong>, pour une stratégie à contre-courant payante — durs prolongés, meilleur tour de la course, septième place depuis la treizième.</li>
        </ul>
      </div>
      <div class="verdictcol lose">
        <h4>Perdants</h4>
        <ul>
          <li><strong>Russell</strong>, sorti dès le premier tour dans une collision dont les commissaires l'ont exonéré, prive Mercedes d'un doublé possible.</li>
          <li><strong>Ferrari</strong>, qui a exécuté le meilleur pari stratégique du week-end sans parvenir à le transformer en victoire.</li>
          <li><strong>Cadillac F1 Team</strong>, pour un nouveau week-end sans point — Pérez à l'abandon, Bottas doublé.</li>
        </ul>
      </div>
    </div>
    <div class="callout">Spa a offert la course la plus disputée de la saison pour la tête : un accrochage au premier tour a coûté une Mercedes, un pari stratégique de Ferrari a temporairement volé la tête à l'autre, et c'est finalement le rythme pur d'Antonelli, au tour 34, qui a tranché. Ailleurs sur la grille, Hadjar a rappelé qu'une pénalité de grille n'est pas toujours une sentence, et Norris a montré qu'une stratégie à contre-courant peut encore payer sur un circuit aussi long que Spa-Francorchamps.</div>
  </div>
</section>

<section class="block" id="sec-r-next">
  <div class="prose">
    <h2 class="sectitle">Enseignements pour la suite</h2>
    <p>Trois points issus de Spa à surveiller dans les prochaines courses :</p>
    <ol style="padding-left:20px; margin:0 0 16px;">
      <li style="margin-bottom:10px;">Après dix courses, <strong>Antonelli</strong> compte 45 points d'avance sur Hamilton (204 contre 159) — et Russell, pourtant sorti au tour 1 à Spa, ne pointe qu'à cinq points de plus loin (154). La question n'est plus si Mercedes domine le championnat, mais si le duel se jouera entre ses deux pilotes.</li>
      <li style="margin-bottom:10px;">Le pari de <strong>Ferrari</strong> — étirer un relais dans l'attente d'une neutralisation plutôt que de chercher le rythme pur — a fonctionné à la lettre à Spa sans suffire à gagner. Reste à voir si l'équipe peut trouver la vitesse de pointe qui rendrait ce genre de pari moins nécessaire.</li>
      <li><strong>Hadjar</strong> a livré la remontée la plus marquante du week-end depuis la dernière place sur la grille. Une performance à suivre sur le reste de la saison, pour un pilote qui n'a plus grand-chose à prouver en dehors d'un baquet compétitif.</li>
    </ol>
  </div>
</section>

<section class="block" id="sec-r7">
  <details class="sources">
    <summary>Sources utilisées — GP de Belgique (8 liens)</summary>
    <div class="srcgroup">
      <h5>Base de données The Pit Wall</h5>
      <ul>
        <li><span class="desc">Résultats, grille, arrêts, relais pneus, temps au tour et de secteur, météo en série temporelle, chronologie complète des messages de course (SC/VSC, pénalités, enquêtes) — alimentés depuis l'API OpenF1 (scripts/ingest_openf1.py). Source primaire pour l'ensemble des faits chiffrés de cet article.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Course et pneus — source primaire</h5>
      <ul>
        <li><a href="https://press.pirelli.com/antonelli-wins-at-the-legendary-spa-francorchamps-circuit/" data-desc="Compte rendu officiel Pirelli de la course : stratégies, citation du directeur motorsport, détail des relais de chaque pilote.">Antonelli s'impose à Spa-Francorchamps</a><span class="desc">Pirelli Press — communiqué officiel, lu directement</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Résultats et déroulé de course</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/antonelli-beats-leclerc-to-belgian-grand-prix-win-to-extend-title-lead-as-russell-retires.MAqSJSgXvRP6dLbwiRbWI" data-desc="Compte rendu officiel F1.com : déroulé complet de la course, prises de tête successives, impact au championnat.">Antonelli bat Leclerc pour la victoire</a><span class="desc">Formula1.com</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Hadjar — pénalité et remontée</h5>
      <ul>
        <li><a href="https://www.motorsport.com/f1/news/isack-hadjar-set-for-belgian-gp-grid-penalty-after-f1-engine-change/10839427/" data-desc="Détail de la pénalité de 30 places pour dépassement du quota d'éléments de groupe propulseur.">Hadjar pénalisé avant le GP de Belgique</a><span class="desc">Motorsport.com</span></li>
        <li><a href="https://www.motorsport.com/f1/news/isack-hadjar-lauded-after-impressive-red-bull-recovery-at-f1-belgian-gp/10840352/" data-desc="Analyse de la remontée d'Hadjar depuis la dernière place sur la grille.">Hadjar salué pour sa remontée</a><span class="desc">Motorsport.com</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Hamilton — pénalité et enquête</h5>
      <ul>
        <li><a href="https://www.planetf1.com/news/fia-lewis-hamilton-decision-belgian-gp-investigation" data-desc="Résolution de l'enquête FIA sur le largage dangereux d'Hamilton lors de son arrêt.">La FIA tranche sur Hamilton</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://www.motorsport.com/f1/news/ferrari-summoned-for-hamiltons-belgian-gp-unsafe-release-after-hitting-mechanic/10840224/" data-desc="Détail de l'incident (contact avec un mécanicien) et de l'amende infligée à Ferrari.">Ferrari convoquée puis amendée</a><span class="desc">Motorsport.com</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Autres incidents et abandons</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/perez-says-it-hurt-to-lose-p5-on-last-lap-as-hes-cleared-over-albon.1j38vR1PFSetYpqapJ9ewO" data-desc="Réactions de Pérez et Albon après l'enquête classée sans suite sur leur lutte tardive pour la position.">Pérez et Albon, « de la course propre »</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://honda.racing/f1/post/f1-2026-rd10-race" data-desc="Causes des abandons de Stroll (boîte de vitesses) et Pérez (suspension).">Alonso 19e, Stroll à l'abandon</a><span class="desc">Honda Racing</span></li>
      </ul>
    </div>
  </details>
</section>
`;
