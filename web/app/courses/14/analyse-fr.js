// Analyse Round 14 — Grand Prix d'Espagne 2026 (Madring, Madrid).
//
// Sourcing : résultats, arrêts aux stands, relais pneus, météo et messages
// de course (RCM) = pipeline production (scripts/ingest_jolpica.py pour les
// résultats/classements officiels, scripts/ingest_openf1.py pour les temps
// au tour/pneus/météo/RCM), lus via race_briefing.py — primaire. Grille de
// départ, déroulé Q1/Q2/Q3 et pénalité de Sainz = voir quali-fr.js pour le
// sourcing complet. Déroulé de course, citations et contexte narratif =
// rapport officiel Formula1.com de la course, fetché en primaire via
// fetch-url.yml.
//
// Point de rigueur : Jolpica (résultats officiels) a publié ce round avec
// plusieurs heures de retard sur OpenF1 et sur le rapport Formula1.com —
// l'article n'a été rédigé qu'une fois les résultats confirmés en base
// (race_briefing.py), jamais construit sur le seul texte de presse. Deux
// recoupements indépendants confirment la cohérence des données : (1) les
// arrêts aux stands d'Antonelli, Russell et Verstappen tombent tous les
// trois exactement au tour 14, comme le veut le récit officiel de la VSC
// déclenchée par l'abandon de Stroll ; (2) l'écart au championnat entre
// Antonelli (292pts) et Russell (211pts) — 81 points — recolle exactement
// avec le chiffre publié indépendamment par RacingNews365. Aucune donnée
// inventée.
export const ROUND14_ANALYSE_FR_HTML = `
<div class="hero prose">
      <p class="eyebrow">Grand Prix d'Espagne · Madring (Madrid) · 2026</p>
      <p class="verdict">Antonelli n'a jamais eu besoin de dépasser Norris sur la piste : une Voiture de Sécurité Virtuelle providentielle et un arrêt bâclé chez McLaren ont suffi à décider la première édition du Grand Prix d'Espagne à Madrid.</p>
      <div class="resultstrip">
        <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · parti 2<sup>e</sup></span></div>
        <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · +4,351s</span></div>
        <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren · +5,089s</span></div>
        <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari · +29,116s</span></div>
        <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes · +29,829s</span></div>
      </div>
      <p class="subverdict">Norris tient sa pole au premier freinage malgré deux attaques d'Antonelli qui coupent la première chicane, et Verstappen profite du second écart pour prendre la deuxième place au Bunker. La course bascule ensuite en coulisses : l'abandon de Stroll (freins) déclenche une VSC providentielle pour Mercedes et Red Bull, qui en profitent pour arrêter Antonelli, Russell et Verstappen au tour 14 — Norris, lui, ne rentre qu'un tour plus tard, dans des conditions de course normales, et un changement de pneus de 7 secondes achève de le reléguer hors du podium virtuel. Leclerc, resté en piste, mène une bonne partie de la course sur un pari à un seul arrêt avant de céder au tour 48. Hamilton, victime de problèmes de freins dès les premiers tours après un accrochage évité de justesse avec Verstappen, abandonne au 7<sup>e</sup> tour.</p>
    </div>

    <section class="block" data-num="01" id="sec-r1">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> Le contexte avant le départ</h2>
        <p>Lando Norris s'élance en pole pour la première course disputée au Madring, devant Antonelli (+0,011s) et Verstappen (+0,140s) — les trois pilotes de tête à moins de deux dixièmes les uns des autres. Hamilton et Leclerc complètent la deuxième ligne pour Ferrari. Seul changement notable entre le classement brut des qualifications et la grille de départ : la pénalité de trois places infligée à Sainz pour avoir gêné Bottas en Q1, qui le relègue en 20<sup>e</sup> position devant son public. <a href="/courses/14" data-desc="Détail complet des qualifications : Q1/Q2/Q3, pénalité de Sainz, grille de départ.">Voir l'analyse des qualifications</a></p>
        <p>Les stratégies pneus divergent dès le départ, une bonne partie du peloton ayant identifié le graining et la dégradation thermique comme des facteurs clés du dimanche. Norris et Antonelli s'élancent en medium, comme Colapinto et Lindblad plus loin sur la grille. Verstappen et Hamilton font le pari plus agressif du tendre pour gagner des places au premier freinage. Leclerc, Russell, Piastri et Lawson jouent la course longue en dur, rejoints par Bortoleto, Gasly, Tsunoda, Alonso, Bottas, Sainz, Stroll et Bearman — ce dernier partant de la voie des stands après l'accident qui a détruit sa Haas en EL3, sur un châssis et un groupe propulseur neufs.</p>
      </div>
    </section>

    <section class="block" data-num="02" id="sec-r2">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

        <h3 class="subtitle">Départ : deux attaques manquées d'Antonelli, Verstappen en profite</h3>
        <p>Au signal, Norris résiste de justesse à une première attaque d'Antonelli, qui prend la corde mais doit couper la première chicane pour éviter le contact — le Britannique conserve la tête, l'Italien reste dans ses roues. Sur une deuxième tentative quasiment identique, Antonelli repart à nouveau à l'extérieur de la piste, offrant cette fois à Verstappen l'occasion de boucler un dépassement propre au Bunker pour s'emparer de la deuxième place.</p>
        <p>L'épisode a une suite : Hamilton, mécontent de voir Verstappen conserver l'avantage au premier virage, réclame la position à la radio, pendant que le Néerlandais rapporte de son côté que le Britannique a « failli [le] percuter » et roulait « hors de contrôle ». Pour éviter une pénalité, l'écurie Red Bull instruit Verstappen de rendre la place — geste qu'il exécute après une brève protestation, laissant passer Antonelli puis Hamilton.</p>

        <h3 class="subtitle">Les freins de Hamilton lâchent, Ferrari abandonne au 7<sup>e</sup> tour</h3>
        <p>Le geste de fair-play ne profite pas longtemps à Hamilton : ses problèmes de freins, déjà perceptibles, s'aggravent rapidement et il retombe derrière Verstappen puis son propre coéquipier Leclerc. Ferrari prend la décision de rentrer la voiture après seulement sept tours — une sortie de piste précoce qui coûte à Hamilton toute chance de conserver sa 4<sup>e</sup> place de départ.</p>
        <p>Norris profite de ce chaos pour construire un matelas confortable en tête, jusqu'à 4,5 secondes sur Antonelli, l'Italien ayant perdu du temps supplémentaire dans son deuxième écart de piste. Plus loin, Piastri encaisse un contact avec Russell au premier tour qui endommage son aileron avant et le renvoie dans une bagarre avec Colapinto et Lawson pour la 6<sup>e</sup> place — les deux derniers finissant par le déborder.</p>

        <h3 class="subtitle">L'abandon de Stroll et la VSC qui bascule la course</h3>
        <p>Alors que Norris continue de creuser l'écart et que Mercedes signale à Antonelli que ses pneus medium tiennent moins bien que prévu sur l'asphalte très adhérent du Madring, Stroll s'arrête au virage 20 pour un problème de freins — deuxième abandon du jour pour ce motif après Hamilton. La Voiture de Sécurité Virtuelle qui en résulte tombe idéalement pour Mercedes et Red Bull : Antonelli, Russell et Verstappen sont tous les trois rappelés aux stands au tour 14, sous vitesse réduite, pour un changement de pneus quasiment gratuit en temps.</p>
        <div class="callout">C'est la décision qui façonne toute la fin de course. La VSC ne dure que le temps nécessaire à dégager la voiture de Stroll — trop court pour que Norris, qui ne s'arrête qu'au tour suivant dans des conditions de course normales, puisse en tirer le même bénéfice.</div>
        <p>Pour ne rien arranger, l'arrêt de Norris tourne au calvaire : un changement de pneus de 7 secondes le maintient immobile bien plus longtemps que ses rivaux, et il ressort 5<sup>e</sup>, derrière Leclerc (qui n'est pas encore passé aux stands), Antonelli, Verstappen et Russell.</p>

        <h3 class="subtitle">Le pari de Leclerc, la remontée d'Antonelli et de Verstappen</h3>
        <p>Ferrari maintient Leclerc en piste, misant sur l'hypothèse d'une Safety Car ou d'un drapeau rouge pour transformer la position de piste en résultat. Le Monégasque mène ainsi une bonne partie de la course avec un déficit de rythme d'environ deux secondes sur Antonelli, qui remonte sans forcer avec Verstappen et Norris dans son sillage — ce dernier passant de nombreux tours à chercher une ouverture sur le champion en titre sans jamais la trouver.</p>
        <p>Le double abandon espagnol vient ponctuer cette phase médiane : Sainz et Alonso se disputent le virage 5, l'Espagnol de Williams étant jugé responsable d'avoir poussé son compatriote dans le mur — cinq secondes de pénalité pour Sainz, qui ne terminera de toute façon pas sa course à domicile. Plus loin dans le peloton, Bortoleto, Colapinto et Piastri, encore diminué par son aileron endommagé, se livrent une bataille serrée avec Lindblad pour les dernières places du Top 10, sans qu'aucun accrochage ne vienne trancher.</p>

        <h3 class="subtitle">Leclerc cède au tour 48, le trio de tête pour la victoire</h3>
        <p>Leclerc rentre finalement aux stands à la fin du tour 48, libérant Antonelli, Verstappen et Norris pour se disputer la victoire du premier Grand Prix d'Espagne à Madrid. C'est le moment choisi par Antonelli pour accélérer le rythme, laissant Verstappen aux prises avec un Norris menaçant — le Britannique se porte à hauteur du Néerlandais lorsque celui-ci coupe le virage 5 en pleine défense, sans toutefois parvenir à faire l'écart au freinage suivant. Verstappen conserve la 2<sup>e</sup> place jusqu'au drapeau à damier, Antonelli filant vers une victoire tranquille.</p>
      </div>
    </section>

    <section class="block" data-num="03" id="sec-r3">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

        <h3 class="subtitle">Mercedes et Red Bull — la VSC saisie au bon moment</h3>
        <p>Rien ne garantissait que la VSC déclenchée par l'abandon de Stroll tomberait à un tour aussi favorable pour Antonelli, Russell et Verstappen — mais les trois écuries ont réagi en l'espace d'un tour pour transformer une opportunité fugace en arrêts quasiment gratuits. Le contraste avec McLaren, qui laisse passer la fenêtre puis subit un arrêt de 7 secondes, résume l'écart entre une équipe qui saisit l'instant et une autre qui le manque de peu.</p>

        <h3 class="subtitle">McLaren — la pole ne suffit pas face à un incident opérationnel</h3>
        <p>Norris a mené la course pendant plus d'une dizaine de tours sans jamais être menacé sur la piste, et c'est un concours de circonstances — le tour de retard sur la VSC, puis l'arrêt lent — qui lui coûte la victoire. Rien dans les données de course ne permet d'établir un déficit de rythme réel face à Antonelli : le retour final sur Verstappen, à un cheveu de reprendre la 2<sup>e</sup> place, confirme que McLaren avait la voiture pour gagner ce dimanche.</p>

        <h3 class="subtitle">Ferrari — un pari à un seul arrêt qui frôle la réussite, un abandon qui gâche tout</h3>
        <p>Le choix de laisser Leclerc en piste jusqu'au tour 48, en misant sur une interruption de course qui n'est jamais venue, était un pari raisonnable étant donné son déficit de rythme réel plutôt que simulé — mais il ne rapporte finalement qu'une 4<sup>e</sup> place, sans jamais menacer le podium une fois Leclerc reparti sur des pneus frais trop tard dans la course. De l'autre côté du garage, l'abandon prématuré de Hamilton pour un problème de freins, après un incident évité de justesse avec Verstappen au premier virage, efface toute chance de double résultat pour la Scuderia.</p>

        <h3 class="subtitle">Alpine — le seul point de Colapinto ne compense pas la pénalité de Gasly</h3>
        <p>Colapinto profite du contact Piastri/Russell du premier tour pour se hisser en 7<sup>e</sup> position et devenir l'unique marqueur de points d'Alpine ce dimanche. Gasly, resté à l'écart de la bagarre pour les points toute la course, écope en plus d'une pénalité de 5 secondes pour excès de vitesse dans la voie des stands en fin de course — un week-end sans éclat après la pole de la semaine précédente à Monza.</p>
      </div>
    </section>

    <section class="block" data-num="04" id="sec-r4">
      <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
        <p>L'évaluation porte sur le Grand Prix du dimanche, en tenant compte de la position de départ réelle (après pénalités) et des circonstances de course.</p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table class="verdict-table">
          <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
          <tbody>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Kimi Antonelli</td><td class="pos">2 → 1<span class="delta good">+1</span></td><td>N'a jamais eu besoin de dépasser Norris sur la piste : la VSC saisie au bon moment fait tout le travail. Deux écarts de piste au premier tour auraient pu coûter cher, mais la gestion du reste de la course — rythme constant, résistance de Verstappen au freinage final subi par ricochet — est sans faille. Étend son avance au championnat à 81 points.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Max Verstappen</td><td class="pos">3 → 2<span class="delta good">+1</span></td><td>Dépassement propre sur Antonelli au Bunker, fair-play immédiat envers Hamilton sous la menace d'une pénalité, puis résistance solide face à un Norris pourtant menaçant jusqu'au bout. Un podium construit sur des enchaînements bien gérés plutôt que sur un rythme dominant.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Lando Norris</td><td class="pos">1 → 3<span class="delta bad">-2</span></td><td>Tient sa pole au premier freinage et mène la course sans être inquiété sur la piste — la victoire lui échappe uniquement à cause du tour manqué sur la VSC puis d'un arrêt de 7 secondes. Le retour à un cheveu de la 2<sup>e</sup> place en fin de course confirme qu'il avait le rythme pour gagner.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Charles Leclerc</td><td class="pos">5 → 4<span class="delta good">+1</span></td><td>Mène une bonne partie de la course sur un pari à un seul arrêt qui n'a jamais été validé par une interruption de course. Résultat honorable en 4<sup>e</sup> place, obtenu sur le déficit de rythme réel plutôt que sur une vraie occasion de podium.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>George Russell</td><td class="pos">6 → 5<span class="delta good">+1</span></td><td>Profite comme ses rivaux directs de la VSC du tour 14, mais un contact avec Piastri au premier tour et un rythme un cran en retrait sur ses coéquipiers de devant limitent la performance à une 5<sup>e</sup> place sans éclat particulier.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Liam Lawson</td><td class="pos">8 → 6<span class="delta good">+2</span></td><td>Troisième week-end de suite en intérim chez Red Bull, conclu par une 6<sup>e</sup> place obtenue en profitant du chaos du premier tour plus haut sur la grille — une performance solide sans être spectaculaire.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Franco Colapinto</td><td class="pos">9 → 7<span class="delta good">+2</span></td><td>Seul marqueur de points pour Alpine ce dimanche, en profitant directement du contact Piastri/Russell du premier tour pour se hisser dans le Top 10 et n'en plus bouger.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Oscar Piastri</td><td class="pos">7 → 8<span class="delta bad">-1</span></td><td>Contact avec Russell dès le premier tour, aileron avant endommagé, arrêt repoussé jusqu'au tour 42 — une course de récupération plutôt qu'une vraie performance, ponctuée d'une bagarre serrée avec Lindblad pour le Top 10.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Arvid Lindblad</td><td class="pos">10 → 9<span class="delta good">+1</span></td><td>Impliqué dans un accrochage avec Hülkenberg au premier virage en fin de course (aucune sanction), mais tient bon dans la bagarre pour le Top 10 face à Piastri et Bortoleto pour ramener un point.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Nico Hülkenberg</td><td class="pos">11 → 10<span class="delta good">+1</span></td><td>Impliqué dans le même accrochage que Lindblad en fin de course, sans conséquence sur son résultat. Dernier point marqué de la course, sur un rythme correct sans être décisif.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Esteban Ocon</td><td class="pos">13 → 11<span class="delta good">+2</span></td><td>Manque de peu les points sur une course sans incident notable relevé, un rythme discret cohérent avec le reste du week-end de Haas.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Pierre Gasly</td><td class="pos">14 → 12<span class="delta good">+2</span></td><td>Aucun point marqué et une pénalité de 5 secondes pour excès de vitesse dans la voie des stands en toute fin de course — un dimanche à oublier après la pole de Monza sept jours plus tôt.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Gabriel Bortoleto</td><td class="pos">12 → 13<span class="delta bad">-1</span></td><td>Impliqué dans un incident noté par les commissaires (mouvement sous freinage) sans suite, puis engagé dans la bagarre du Top 10 jusqu'à un arrêt tardif qui le renvoie hors des points.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Yuki Tsunoda</td><td class="pos">15 → 14<span class="delta good">+1</span></td><td>Course sans histoire notable au classement, hors des points sur un rythme Racing Bulls qui manquait ce dimanche.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Alexander Albon</td><td class="pos">16 → 15<span class="delta good">+1</span></td><td>Un seul arrêt au tour 14 et une course sans incident individuel notable, hors des points sur un rythme Williams en délicatesse générale ce week-end.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Oliver Bearman</td><td class="pos">22 (voie des stands) → 16<span class="delta good">+6</span></td><td>Repart de la voie des stands sur un châssis neuf après son accident d'EL3, remonte sans éclat particulier jusqu'à la 16<sup>e</sup> place — un résultat honorable dans ces circonstances plutôt qu'une performance à souligner.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Fernando Alonso</td><td class="pos">17 → 17<span class="delta neutral">=</span></td><td>Impliqué dans l'accrochage du virage 5 avec Sainz (poussé dans le mur, stewards en sa faveur), mais ne tire aucun bénéfice de la pénalité infligée à son compatriote — course à domicile sans relief pour l'Espagnol.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Valtteri Bottas</td><td class="pos">19 → 18<span class="delta good">+1</span></td><td>Deux arrêts et une course sans incident individuel notable, hors des points sur un rythme Cadillac qui reste en retrait du milieu de tableau.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Carlos Sainz</td><td class="pos">20 → DNF<span class="delta dnf">DNF</span></td><td>Pénalisé de 5 secondes pour avoir poussé Alonso dans le mur au virage 5, avant d'abandonner sa course à domicile — un week-end complet à oublier pour l'Espagnol de Williams, entre pénalité de grille et incident de course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Sergio Pérez</td><td class="pos">18 → DNF<span class="delta dnf">DNF</span></td><td>Abandon pour un problème suspecté de circuit de refroidissement, sans faute de pilotage identifiée — un week-end sans résultat de plus pour Cadillac.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Lance Stroll</td><td class="pos">21 → DNF<span class="delta dnf">DNF</span></td><td>Abandon sur problème de freins au virage 20, qui déclenche directement la VSC décisive pour la victoire d'Antonelli — la deuxième panne de freins du jour après celle de Hamilton.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Lewis Hamilton</td><td class="pos">4 → DNF<span class="delta dnf">DNF</span></td><td>Échange tendu à la radio avec Verstappen après un incident évité de justesse au premier virage, obtient gain de cause sur la position — mais ses propres problèmes de freins s'aggravent aussitôt et Ferrari retire la voiture au 7<sup>e</sup> tour. Un abandon qui efface une position de départ pourtant prometteuse.</td></tr>
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
          <thead><tr><th style="width:140px;">Équipe</th><th>Bilan stratégique et opérationnel</th></tr></thead>
          <tbody>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Mercedes</td><td>Victoire et 5<sup>e</sup> place grâce à un temps de réaction exemplaire sur la VSC du tour 14 — Antonelli et Russell arrêtés en l'espace d'un tour pendant que McLaren manque la fenêtre. Antonelli porte son avance au championnat à 81 points sur Russell.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Red Bull</td><td>Podium pour Verstappen, construit sur un dépassement propre en début de course et une VSC saisie aussi vite que Mercedes. Lawson ramène une 6<sup>e</sup> place solide dans son intérim prolongé pour Hadjar.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>McLaren</td><td>Pole et tête de course perdues à cause d'un tour manqué sur la VSC puis d'un arrêt de 7 secondes — un incident opérationnel qui coûte la victoire à Norris malgré un rythme resté dominant jusqu'au bout. Piastri limite la casse après un contact au premier tour.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Ferrari</td><td>Week-end à deux vitesses : le pari à un seul arrêt de Leclerc rapporte une 4<sup>e</sup> place honorable, mais l'abandon de Hamilton sur problème de freins après un accrochage évité de justesse avec Verstappen efface toute chance de double résultat.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Alpine</td><td>Un seul point marqué par Colapinto, profitant directement du chaos du premier tour — Gasly termine sans rien à montrer et écope en plus d'une pénalité pour excès de vitesse aux stands.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Racing Bulls</td><td>Un point marqué par Lindblad (9<sup>e</sup>), Tsunoda restant hors du Top 10 — un accrochage sans conséquence entre Lindblad et Hülkenberg en fin de course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Audi</td><td>Un point marqué par Hülkenberg (10<sup>e</sup>), Bortoleto restant engagé dans la bagarre du Top 10 sans réussir à concrétiser après un arrêt tardif.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Williams</td><td>Aucun point marqué : Albon 15<sup>e</sup> sans éclat, Sainz contraint à l'abandon après une pénalité pour avoir poussé Alonso dans le mur lors de sa course à domicile.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Haas</td><td>Aucun point marqué (Ocon 11<sup>e</sup>, Bearman 16<sup>e</sup>), ce dernier repartant de la voie des stands sur un châssis neuf après son accident d'EL3 — un résultat de gestion plutôt qu'une performance.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Aston Martin</td><td>Double déception : Alonso termine sans relief sa course à domicile, Stroll abandonne sur une panne de freins qui déclenche directement la VSC décisive de la course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Cadillac</td><td>Aucun point (Bottas 18<sup>e</sup>, Pérez à l'arrêt pour un problème suspecté de circuit de refroidissement), un rythme qui reste hors du milieu de tableau ce week-end.</td></tr>
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
              <li><strong>Antonelli</strong>, pour une victoire construite loin de la piste — 292 points et 81 d'avance sur Russell au championnat, 8<sup>e</sup> victoire de la saison.</li>
              <li><strong>Verstappen</strong>, dépassement propre et fair-play payant, récompensés par un podium.</li>
              <li><strong>Mercedes et Red Bull</strong>, pour un temps de réaction sur la VSC qui a fait toute la différence face à McLaren.</li>
              <li><strong>Colapinto</strong>, seul marqueur de points d'Alpine ce dimanche.</li>
            </ul>
          </div>
          <div class="verdictcol lose">
            <h4>Perdants</h4>
            <ul>
              <li><strong>Norris</strong>, victime d'un tour manqué sur la VSC puis d'un arrêt de 7 secondes qui lui coûtent une victoire à sa portée sur la piste.</li>
              <li><strong>Hamilton</strong>, abandon prématuré sur problème de freins qui efface une 4<sup>e</sup> place de départ.</li>
              <li><strong>Les deux Espagnols à domicile</strong>, Sainz à l'abandon après une pénalité et Alonso sans relief.</li>
              <li><strong>Gasly</strong>, aucun point et une pénalité de fin de course après la pole de Monza sept jours plus tôt.</li>
            </ul>
          </div>
        </div>
        <div class="callout">La première édition du Grand Prix d'Espagne à Madrid restera l'image d'une victoire jouée aux stands plutôt que sur la piste : Antonelli et Verstappen n'ont eu besoin que d'un tour de réaction sur une VSC providentielle pour priver Norris d'une victoire qu'il tenait pourtant fermement. Antonelli porte son avance au championnat à 81 points sur Russell — huitième victoire de la saison, jamais vraiment inquiétée une fois la position de tête acquise.</div>
      </div>
    </section>

    <section class="block" id="sec-r-next">
      <div class="prose">
        <h2 class="sectitle">Enseignements pour la suite</h2>
        <p>Trois points issus de Madrid à surveiller au prochain rendez-vous :</p>
        <ol style="padding-left:20px; margin:0 0 16px;">
          <li style="margin-bottom:10px;"><strong>McLaren</strong> a démontré à Madrid un rythme de course capable de dominer largement, effacé par un seul incident opérationnel (l'arrêt de 7 secondes). La question pour la suite est de savoir si cet épisode reste isolé ou révèle une fragilité récurrente sous pression aux stands.</li>
          <li style="margin-bottom:10px;"><strong>Ferrari</strong> aborde le prochain rendez-vous avec deux abandons sur panne de freins dans le paddock cette semaine (Hamilton et Stroll, chez deux écuries différentes) — un point à surveiller de près si le phénomène devait se reproduire ailleurs sur la grille.</li>
          <li><strong>Antonelli</strong> creuse un écart au championnat (81 points sur Russell) qui commence à ressembler à une avance de fin de saison plutôt qu'à une lutte encore ouverte, sept courses avant la fin du calendrier.</li>
        </ol>
        <a class="bridge-btn" href="/courses" style="text-decoration:none; display:inline-block;">Voir le calendrier de la saison →</a>
      </div>
    </section>

    <section class="block" id="sec-r7">
      <details class="sources">
        <summary>Sources utilisées — GP d'Espagne (4 liens)</summary>
        <div class="srcgroup">
          <h5>Données de course</h5>
          <ul>
            <li><span class="desc">The Pit Wall — pipeline production (résultats/standings via scripts/ingest_jolpica.py, temps au tour/pneus/météo/RCM via scripts/ingest_openf1.py), primaire.</span></li>
            <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_telemetry.py), position/vitesse du replay Norris/Antonelli/Verstappen ci-dessus, primaire.</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Déroulé de course</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/latest/article/antonelli-clinches-victory-over-verstappen-and-norris-in-spanish-gp.644ZZfPzRPEaUh2JBHcB9" data-desc="Rapport officiel de la course, fetché en primaire — déroulé complet, citations, contexte.">Formula1.com — Antonelli s'impose devant Verstappen et Norris</a><span class="desc">Formula1.com — primaire</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Contexte complémentaire</h5>
          <ul>
            <li><a href="https://racingnews365.com/2026-f1-championship-standings-after-spanish-grand-prix-at-madrid" data-desc="Classement pilotes et constructeurs détaillé après le GP d'Espagne.">RacingNews365 — classements après Madrid</a><span class="desc">RacingNews365 — secondaire</span></li>
          </ul>
        </div>
      </details>
    </section>
`;
