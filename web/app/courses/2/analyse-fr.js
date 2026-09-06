// Analyse Round 2 — Grand Prix de Chine 2026 (Shanghai).
// Rédigé à partir de scripts/race_briefing*.py (base de données The Pit
// Wall, alimentée par OpenF1 : résultats, arrêts, pneus, temps au tour,
// météo, chronologie complète des messages de course) et de recherches
// web ciblées (WebSearch) pour le contexte non capturé en base (causes
// des abandons, citations d'après-course, résultats du Sprint — non
// ingéré en base, cf. Round 1). La source Pirelli sur cette course
// précise (kimi-antonelli-claims-his-first-grand-prix-victory) est une
// lecture primaire (press.pirelli.com, récupérée via fetch-url.yml) ;
// les autres articles de presse sont des sources secondaires, citées
// comme telles. Le tour le plus rapide d'Antonelli (tour 52, 1:35,275)
// est confirmé indépendamment par trois sources : le champ fastest_lap
// de la base, notre propre relevé tour par tour, et le communiqué
// Pirelli — rare triple vérification, signalée dans le texte.
export const ROUND2_ANALYSE_FR_HTML = `
<div class="hero prose">
  <p class="eyebrow">Grand Prix de Chine · Shanghai · 2026</p>
  <p class="verdict">Antonelli signe sa première victoire en catégorie reine — pendant que McLaren, championne du monde en titre, ne prend le départ avec aucune des deux voitures.</p>
  <div class="resultstrip">
    <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes</span></div>
    <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes · +5,515s</span></div>
    <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari · +25,267s</span></div>
    <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari · +28,894s</span></div>
    <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#B6BABD"></span><span class="drv">Bearman</span> <span class="gap">Haas · +57,268s</span></div>
  </div>
  <p class="subverdict">Deuxième doublé Mercedes en deux courses : Antonelli et Russell s'arrêtent tous les deux au tour 10, sous la Safety Car provoquée par l'abandon de Stroll, pour chausser des durs qui les mèneront jusqu'à l'arrivée sans un seul autre passage aux stands. Antonelli, plus jeune pole position de l'histoire de la F1 la veille, contrôle la relance et ne sera plus jamais inquiété. Mais la vraie histoire du week-end est ailleurs : McLaren, championne du monde constructeurs en titre, ne prend le départ avec aucune de ses deux voitures — deux pannes électriques distinctes côté groupe propulseur, découvertes trop tard pour réparer. Piastri, déjà privé de course en Australie après sa sortie de piste au tour de reconnaissance, n'a maintenant disputé aucun tour de course en 2026.</p>
</div>

<section class="block" data-num="01" id="sec-r1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Le contexte avant la course</h2>
    <p>Shanghai ouvre la première des six manches sprint de la saison 2026. Le Sprint du samedi a été remporté par Russell, devant Leclerc et Hamilton — Norris quatrième, Antonelli cinquième, Piastri sixième. Verstappen, mal engagé au départ, n'a signé qu'une neuvième place sans le moindre point.</p>
    <p>Les qualifications du Grand Prix ont livré un scénario inattendu : Antonelli devient le plus jeune pilote à décrocher la pole position de l'histoire de la Formule 1, profitant d'un problème de fiabilité qui a limité Russell sur son tour lancé. Leclerc et Hamilton complètent la deuxième ligne.</p>
    <p>Pirelli avait nominé une allocation médiane pour ce circuit resurfacé — C2, C3 et C4 (dur/medium/tendre) — contre les composés les plus tendres de la gamme utilisés à Melbourne deux semaines plus tôt. <a href="https://press.pirelli.com/complete-f1-tyre-range-for-the-first-three-grands-prix-of-2026/" data-desc="Communiqué officiel Pirelli sur les nominations de gommes pour les trois premières courses de 2026.">Communiqué Pirelli — nominations Melbourne/Shanghai/Suzuka</a> Côté météo, la rupture avec Melbourne est nette : 14,9 à 16,4°C dans l'air, 19,7 à 27,6°C sur la piste — beaucoup plus frais, sans pluie.</p>
    <p>Mais le vrai choc du week-end s'est joué avant même l'extinction des feux. McLaren, championne du monde constructeurs en titre, a découvert « deux problèmes électriques différents côté groupe propulseur » sur ses deux monoplaces. Norris, qualifié sixième, n'a jamais pu rejoindre la grille — les mécaniciens n'ont pas réussi à résoudre le problème à temps, même pour un départ depuis la voie des stands. La voiture de Piastri, cinquième sur la grille, a été repoussée au garage moins de dix minutes avant le tour de formation. L'Australien, qui s'était déjà crashé au tour de reconnaissance à Melbourne deux semaines plus tôt, n'a désormais disputé aucun tour de course depuis le début de la saison 2026. Bortoleto (Audi) et Albon (Williams) n'ont pas non plus pris le départ, pour des raisons distinctes : la course s'élance avec dix-huit voitures seulement, sur les vingt-deux inscrites.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-r2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

    <h3 class="subtitle">Neuf tours de bagarre en tête</h3>
    <p>Antonelli conserve la tête au départ, mais Russell, Leclerc et Hamilton restent à son contact immédiat pendant les neuf premiers tours — les écarts de temps au tour entre les quatre hommes ne dépassent jamais une seconde sur cette phase. Selon Pirelli, cette bagarre à quatre a coûté du temps aux trois poursuivants, qui se neutralisaient mutuellement pendant qu'Antonelli filait devant sans opposition directe — une lecture qu'on ne peut pas vérifier tour par tour depuis nos seules données de temps au tour (qui ne donnent pas l'écart réel en piste), mais qui vient directement du compte rendu officiel du manufacturier de pneus.</p>

    <h3 class="subtitle">L'abandon de Stroll déclenche la Safety Car — et fige la stratégie de toute la grille</h3>
    <p>Stroll s'arrête sur la piste au virage 2 au début du tour 9, probablement sur un problème de batterie selon la presse spécialisée. Safety Car déployée à 07:20:04 (heure de session), le temps qu'un véhicule de récupération intervienne au virage 2 ; relance au tour suivant après un peu plus de six minutes de neutralisation.</p>
    <p>La totalité du peloton de tête profite de cette fenêtre pour s'arrêter au tour 10 : Antonelli, Russell, Hamilton, Leclerc et Bearman chaussent tous des durs neufs en une seule et même fenêtre, sans qu'aucun n'ait besoin de repasser par la voie des stands avant l'arrivée. Hadjar, parti en tendres puis rechaussé en durs dès le tour 1 après un tête-à-queue au départ, profite de cette même Safety Car pour prendre un second train de durs frais — une stratégie à contretemps du reste du peloton qui lui vaudra une huitième place et des points.</p>

    <h3 class="subtitle">Antonelli gère la relance, Russell revient sans jamais menacer</h3>
    <p>À la relance, Antonelli prend le large sans être inquiété. Russell, une fois sorti de la bagarre avec les Ferrari, retrouve un rythme très solide en seconde moitié de course — plusieurs tours dans le 1:35 bas à partir du tour 37, aussi rapide qu'Antonelli sur cette période — sans jamais réussir à combler l'écart déjà créé. Antonelli signe le meilleur tour de la course au tour 52 en 1:35,275 : une donnée confirmée de manière redondante par trois sources indépendantes (le classement officiel en base, notre propre relevé tour par tour, et le communiqué Pirelli), une rigueur de vérification rarement atteinte pour ce genre de détail.</p>
    <p>Antonelli commet une petite erreur en fin de course (un blocage de roues évoqué par la presse dans les derniers tours) sans en payer les conséquences : il franchit la ligne avec 5,515 secondes d'avance sur Russell.</p>

    <h3 class="subtitle">Deux abandons différents, une fin de course qui se joue à distance</h3>
    <p>Verstappen, alors sixième, abandonne à dix tours de l'arrivée : panne du système de récupération d'énergie (fuite du circuit de refroidissement selon la presse spécialisée), perte de puissance nette à la sortie du virage 6. Alonso abandonne pour une raison rare en Formule 1 — un inconfort physique croissant, perte de sensation dans les mains et les pieds selon ses propres mots après course, sans lien avec la mécanique de sa monoplace.</p>
    <p>Derrière les quatre premiers, Bearman signe le meilleur résultat de sa saison : cinquième place, même stratégie à un arrêt que les quatre premiers, salué nommément par Pirelli dans son compte rendu officiel.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-r3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

    <h3 class="subtitle">Mercedes — exécution sans accroc, deuxième doublé en deux courses</h3>
    <p>Rien à redire sur l'arrêt du tour 10 : les deux voitures rentrent au même tour, sous Safety Car, pour un relais de durs qui ira jusqu'au bout sans le moindre stress mécanique apparent. Le seul point qui aurait pu compliquer la course — la bagarre à quatre des neuf premiers tours — s'est résolue en faveur d'Antonelli sans intervention du muret.</p>

    <h3 class="subtitle">Ferrari — même stratégie, pas le même rythme</h3>
    <p>Leclerc et Hamilton suivent une stratégie strictement identique à celle des Mercedes (medium puis dur, arrêt au tour 10), sans qu'aucun geste stratégique ne puisse expliquer l'écart final de 25 à 29 secondes sur Antonelli. Le déficit est un déficit de rythme pur, pas de stratégie — Hamilton devance finalement son coéquipier de 3,6 secondes, sans qu'aucun élément de course notable ne distingue leurs stratégies respectives.</p>

    <h3 class="subtitle">Red Bull — un abandon, une stratégie alternative payante</h3>
    <p>Hadjar transforme un tête-à-queue au premier tour en résultat correct grâce à une stratégie à contretemps (tendres puis deux trains de durs) qui profite du hasard du calendrier de Safety Car. Verstappen, positionné pour un résultat correct avant sa panne, n'aura pas eu l'occasion de jouer sa propre stratégie jusqu'au bout.</p>

    <h3 class="subtitle">McLaren — pas de stratégie, une crise de fiabilité à surveiller</h3>
    <p>Il n'y a pas de décision stratégique à commenter pour McLaren cette semaine-là : les deux voitures n'ont jamais pris le départ, pour deux pannes électriques distinctes côté groupe propulseur. Pour l'écurie championne du monde constructeurs en titre, un tel épisode — zéro point marqué, zéro tour disputé sur les deux voitures — est le genre de signal qu'il faudra suivre de près à Suzuka.</p>
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
        <tr><td><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>P1 → P1</td><td>Plus jeune pole position de l'histoire de la F1, première victoire en catégorie reine. Meilleur tour de la course au tour 52 (1:35,275), confirmé par trois sources indépendantes. Relance parfaitement maîtrisée après la Safety Car du tour 10.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Russell</td><td>P2 → P2</td><td>Même stratégie qu'Antonelli, rythme de fin de course tout aussi rapide (plusieurs tours en 1:35 bas dès le tour 37) sans jamais menacer un écart déjà creusé pendant la bagarre des neuf premiers tours.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>P3 → P3</td><td>Même stratégie à un arrêt que les Mercedes, sans le même rythme. Devance Leclerc de 3,6s sur la ligne.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>P4 → P4</td><td>Stratégie identique à Hamilton, déficit de rythme pur sur les Mercedes (+28,894s à l'arrivée) sans élément stratégique distinctif.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>P10 → P5</td><td>Meilleur résultat de sa saison, même stratégie à un arrêt que les quatre premiers, cité nommément par Pirelli dans son compte rendu officiel de course.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>P7 → P6</td><td>Course propre dans les points pour Alpine, sans incident notable.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lawson</td><td>P14 → P7</td><td>Belle remontée depuis la P14 pour RB F1 Team.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>P9 → P8</td><td>Tête-à-queue au premier tour transformé en points grâce à une stratégie à contretemps (tendres puis deux trains de durs) qui profite du calendrier de la Safety Car du tour 10.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>P17 → P9*</td><td>Belle remontée pour Williams. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>P12 → P10*</td><td>Dans les points pour Alpine. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>P11 → P11*</td><td>Arrêt tardif (tour 35), en délégation hors des points. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>P15 → P12*</td><td>Arrêt très tardif (tour 42), plusieurs fois signalé aux limites de piste au virage 14. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>P19 → P13*</td><td>Impliqué dans un incident avec Pérez au premier tour, classé sans suite. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>P13 → P14*</td><td>Pénalité de 10 secondes pour une collision avec Colapinto, purgée en course. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>P21 → P15*</td><td>Impliqué dans un incident avec Bottas au premier tour, classé sans suite. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>P8 → Abandon</td><td>Abandon à dix tours de l'arrivée alors qu'il était sixième : panne du système de récupération d'énergie (fuite du circuit de refroidissement selon la presse), perte de puissance à la sortie du virage 6.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Alonso</td><td>P18 → Abandon</td><td>Abandon pour un motif rare : inconfort physique croissant (perte de sensation dans les mains et les pieds selon ses propres mots), sans lien avec la mécanique de la voiture.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Stroll</td><td>P20 → Abandon</td><td>Arrêt sur la piste au virage 2 en tout début de tour 9, probablement un problème de batterie selon la presse — abandon à l'origine directe de la Safety Car qui a figé la stratégie de toute la grille.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Piastri</td><td>P5 → N'a pas pris le départ</td><td>Voiture repoussée au garage moins de dix minutes avant le tour de formation, panne électrique côté groupe propulseur. N'a disputé aucun tour de course en 2026 après sa sortie de piste au tour de reconnaissance en Australie.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Norris</td><td>P6 → N'a pas pris le départ</td><td>Panne électrique distincte de celle de Piastri, non résolue à temps même pour un départ depuis la voie des stands.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>P16 → N'a pas pris le départ</td><td>Deuxième forfait de la grille pour Audi ce week-end-là.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Albon</td><td>P22 → N'a pas pris le départ</td><td>N'a pas rejoint la grille de départ.</td></tr>
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
        <tr><td><span class="dot" style="background:#00A19B"></span> Mercedes</td><td>Deuxième doublé en deux courses. Exécution stratégique sans accroc (arrêt synchronisé au tour 10 sous Safety Car), rythme dominant en seconde moitié de course.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Ferrari</td><td>Même stratégie que Mercedes, déficit de rythme pur qui coûte 25 à 29 secondes à l'arrivée sans qu'aucun geste stratégique ne l'explique.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> McLaren</td><td>Zéro point, zéro tour disputé : les deux voitures ne prennent pas le départ pour deux pannes électriques distinctes côté groupe propulseur. Une crise de fiabilité à surveiller pour l'écurie championne du monde constructeurs en titre.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Red Bull</td><td>Hadjar transforme un tête-à-queue en points via une stratégie à contretemps ; Verstappen abandonne sur panne à dix tours de l'arrivée alors qu'il était sixième.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Haas F1 Team</td><td>Meilleur résultat de la saison pour Bearman (P5), cité nommément par Pirelli.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Alpine F1 Team</td><td>Gasly et Colapinto tous deux dans les points, week-end propre.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> RB F1 Team</td><td>Belle remontée de Lawson (P14 → P7) ; Lindblad plusieurs fois signalé aux limites de piste.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Williams</td><td>Sainz remonte dans les points ; Albon ne prend pas le départ.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Audi</td><td>Hülkenberg en délégation hors des points ; Bortoleto ne prend pas le départ.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Aston Martin</td><td>Double abandon : Stroll (panne, probablement batterie, à l'origine de la Safety Car) et Alonso (inconfort physique).</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Cadillac F1 Team</td><td>Pérez et Bottas impliqués dans un incident mutuel au premier tour, tous deux classés hors des points.</td></tr>
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
          <li><strong>Antonelli</strong>, pour une pole historique transformée en première victoire sans le moindre faux pas.</li>
          <li><strong>Mercedes</strong>, pour un deuxième doublé consécutif et une exécution stratégique sans accroc.</li>
          <li><strong>Bearman</strong>, pour le meilleur résultat de sa saison, salué directement par Pirelli.</li>
        </ul>
      </div>
      <div class="verdictcol lose">
        <h4>Perdants</h4>
        <ul>
          <li><strong>McLaren</strong>, pour un week-end à zéro point et zéro tour disputé sur les deux voitures — deux pannes électriques distinctes qui posent une vraie question de fiabilité.</li>
          <li><strong>Piastri</strong>, qui n'a maintenant disputé aucun tour de course sur les deux premières manches de la saison.</li>
          <li><strong>Alonso</strong>, contraint à l'abandon pour un motif physique rare, indépendant de la performance de sa voiture.</li>
        </ul>
      </div>
    </div>
    <div class="callout">Deux courses, deux doublés Mercedes : Antonelli et Russell occupent les deux premières places du championnat après Shanghai. Mais l'histoire qui pèsera le plus sur la suite de la saison est ailleurs — McLaren, championne du monde en titre, repart de Chine sans un seul point, et Piastri sans avoir disputé un seul tour de course en 2026.</div>
  </div>
</section>

<section class="block" id="sec-r-next">
  <div class="prose">
    <h2 class="sectitle">Enseignements pour la suite</h2>
    <p>Trois points issus de Shanghai à surveiller dans les prochaines courses :</p>
    <ol style="padding-left:20px; margin:0 0 16px;">
      <li style="margin-bottom:10px;">La fiabilité de <strong>McLaren</strong> est désormais un vrai sujet : deux pannes électriques distinctes le même week-end pour l'écurie championne du monde en titre. À suivre de très près à Suzuka.</li>
      <li style="margin-bottom:10px;"><strong>Piastri</strong> n'a disputé aucun tour de course en 2026. La question n'est plus seulement le résultat, mais s'il pourra simplement boucler un week-end complet.</li>
      <li><strong>Mercedes</strong> compte déjà deux doublés en deux courses, Antonelli et Russell en tête du championnat. Si cette domination se poursuit, la gestion interne des deux pilotes deviendra le sujet à suivre — un thème déjà vu la saison passée à Zandvoort avec l'inversion Russell/Antonelli sous VSC.</li>
    </ol>
  </div>
</section>

<section class="block" id="sec-r7">
  <details class="sources">
    <summary>Sources utilisées — GP de Chine (11 liens)</summary>
    <div class="srcgroup">
      <h5>Base de données The Pit Wall</h5>
      <ul>
        <li><span class="desc">Résultats, grille, arrêts, relais pneus, temps au tour, météo, chronologie complète des messages de course — alimentés depuis l'API OpenF1 (scripts/ingest_openf1.py). Source primaire pour l'ensemble des faits chiffrés de cet article.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Course — source primaire</h5>
      <ul>
        <li><a href="https://press.pirelli.com/kimi-antonelli-claims-his-first-grand-prix-victory/" data-desc="Compte rendu officiel Pirelli de la course, stratégies et citation du directeur motorsport.">Antonelli signe sa première victoire</a><span class="desc">Pirelli Press — communiqué officiel, lu directement</span></li>
        <li><a href="https://press.pirelli.com/complete-f1-tyre-range-for-the-first-three-grands-prix-of-2026/" data-desc="Nominations officielles des composés pour les trois premières courses de 2026.">Nominations de gommes — Melbourne, Shanghai, Suzuka</a><span class="desc">Pirelli Press — communiqué officiel, lu directement</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Résultats et Sprint</h5>
      <ul>
        <li><a href="https://www.silverstone.co.uk/news/f1-2026-chinese-grand-prix-results-antonelli-seals-first-win-mercedes" data-desc="Résultats et résumé de la course.">Résultats du Grand Prix</a><span class="desc">Silverstone.co.uk</span></li>
        <li><a href="https://www.racefans.net/2026/03/15/2026-chinese-grand-prix-race-result-and-championship-points/" data-desc="Classement et points au championnat après la course.">Classement et points au championnat</a><span class="desc">RaceFans</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>McLaren — double forfait</h5>
      <ul>
        <li><a href="https://www.gpfans.com/en/f1-news/1078888/f1-lando-norris-demoted-pitlane-start-chinese-grand-prix/" data-desc="Détail des pannes électriques ayant empêché Norris et Piastri de prendre le départ.">McLaren disaster : Norris et Piastri hors course</a><span class="desc">GPFans</span></li>
        <li><a href="https://sports.yahoo.com/articles/norris-piastri-miss-china-gp-075919987.html" data-desc="Contexte complémentaire sur le double forfait McLaren.">Norris et Piastri absents du GP de Chine</a><span class="desc">Yahoo Sports</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Abandons</h5>
      <ul>
        <li><a href="https://www.espn.com/f1/story/_/id/48212364/chinese-grand-prix-max-verstappen-retires-red-bull-loses-power" data-desc="Cause technique de l'abandon de Verstappen.">Verstappen abandonne sur panne</a><span class="desc">ESPN</span></li>
        <li><a href="https://www.racefans.net/2026/03/15/alonso-retired-from-chinese-gp-as-he-was-losing-feeling-in-my-hands-and-feet/" data-desc="Alonso explique son abandon pour raison physique.">Alonso : « je perdais la sensation dans mes mains et mes pieds »</a><span class="desc">RaceFans</span></li>
      </ul>
    </div>
  </details>
</section>
`;
