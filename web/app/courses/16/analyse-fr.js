// Analyse Round 16 — Grand Prix de Bahreïn couru en Malaisie 2026 (Sepang).
//
// Sourcing : résultats, arrêts aux stands, relais pneus, météo et messages
// de course (RCM) = pipeline production (scripts/ingest_jolpica.py pour les
// résultats/classements officiels, scripts/ingest_openf1.py pour les temps
// au tour/pneus/météo/RCM), lus via race_briefing.py — primaire. Grille de
// départ, déroulé Q1/Q2/Q3 et citation de Verstappen = rapport Formula1.com
// des qualifications (voir quali-fr.js pour le sourcing complet). Déroulé de
// course, citations et contexte narratif = rapport officiel Formula1.com de
// la course, fetché en primaire via fetch-url.yml — chaque position
// d'arrivée, écart et point marqué recolle exactement avec les données de
// la base (ex. Verstappen 1:47:14.808, Antonelli +2,307s, Hamilton +4,919s).
//
// Point de rigueur : une recherche initiale a fait remonter un article
// PlanetF1 titré sur un « avertissement de Verstappen contre Norris pour un
// faux départ » au GP de Bahreïn — écarté après vérification, car il
// contredit les RCM réellement enregistrées en base (le faux départ est
// celui d'Alonso, pas de Norris ; l'incident de Norris en fin de course est
// noté « DRIVING ERRATICALLY » au virage 1, tour 50, sans pénalité liée à un
// faux départ). Conformément à la règle établie, seul le rapport
// Formula1.com confirmé mot pour mot par les données de course a été
// utilisé pour le récit.
export const ROUND16_ANALYSE_FR_HTML = `
<div class="hero prose">
      <p class="eyebrow">Grand Prix de Bahreïn (couru en Malaisie) · Sepang · 2026</p>
      <p class="verdict">Après deux tentatives de départ avortées sous la pluie, Verstappen signe la première victoire de la saison pour lui et pour Red Bull — pendant que Russell, pourtant solide toute la course, s'arrête net juste avant le dernier virage.</p>
      <div class="resultstrip">
        <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · parti 1<sup>er</sup></span></div>
        <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · +2,307s</span></div>
        <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari · +4,919s</span></div>
        <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari · +7,258s</span></div>
        <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Hadjar</span> <span class="gap">Red Bull · +8,571s</span></div>
      </div>
      <p class="subverdict">Un week-end bouleversé par un orage tombé une heure avant le départ, un premier essai de départ interrompu par un drapeau rouge (pannes moteur chez Verstappen et Hamilton), puis 56 tours sous un ciel toujours menaçant, coupés par deux Safety Cars. Les deux Ferrari, parties en pneus secs sur une piste trempée, dégringolent hors du Top 10 avant de remonter intégralement ; Hamilton et Leclerc terminent 3<sup>e</sup> et 4<sup>e</sup>. Hadjar et Lindblad signent les deux plus belles remontées — respectivement depuis la 8<sup>e</sup> et la 22<sup>e</sup> place sur la grille — tandis que Russell, en embuscade sur Verstappen toute la course, s'arrête à l'abandon derrière la dernière Safety Car, juste avant le dernier virage.</p>
    </div>

    <section class="block" data-num="01" id="sec-r1">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> Le contexte avant le départ</h2>
        <p>Max Verstappen avait décroché la veille sa première pole position de la saison 2026 (1:35,130), devant Hamilton et Antonelli — ce dernier promu en 3<sup>e</sup> place sur la grille après la pénalité de cinq places infligée à Hadjar, auteur du 3<sup>e</sup> temps brut mais sanctionné pour avoir utilisé des éléments supplémentaires de groupe propulseur. Colapinto et Lindblad s'élançaient tous deux en fond de grille, respectivement pour une pénalité cumulée de 15 places (accrochage du 1<sup>er</sup> tour à Bakou plus nouveau moteur) et pour un changement intégral de groupe propulseur. <a href="/courses/16" data-desc="Détail complet des qualifications : Q1/Q2/Q3, pénalités, grille de départ.">Voir l'analyse des qualifications</a></p>
        <p>La grille officielle de départ s'établissait donc ainsi : Verstappen, Hamilton, Antonelli, Leclerc, Norris, Piastri, Russell, Hadjar, Gasly, Bortoleto, Lawson, Alonso, Sainz, Stroll, Hülkenberg, Bearman, Ocon, Albon, Bottas, Pérez, puis Colapinto et Lindblad en fond de grille. Les 56 tours s'annonçaient déjà disputés sur un rythme de dégradation pneumatique élevé observé en essais — Pirelli anticipait deux à trois arrêts — avant qu'un facteur extérieur ne vienne tout rebattre.</p>
        <p>Une heure avant l'horaire initial de départ (15h00 locales), un violent orage s'est abattu sur le Sepang International Circuit, forçant un report. Une Voiture Médicale d'exploration a signalé une quantité d'eau stagnante rendant le départ impossible ; la pluie s'est ensuite atténuée progressivement, permettant l'annonce d'un tour de formation à 15h40, avec un minimum de deux tours derrière la Safety Car avant un départ arrêté.</p>
      </div>
    </section>

    <section class="block" data-num="02" id="sec-r2">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

        <h3 class="subtitle">Premier essai de départ : pannes moteur et drapeau rouge</h3>
        <p>Dès le premier tour de formation sur pneus intermédiaires, Hadjar part en tête-à-queue à la sortie du virage 2 et s'en sort par le gravier. Puis, coup sur coup, Verstappen et Hamilton signalent une perte de puissance : « Je ne peux pas accélérer ! Ça ne marche pas, les gars ! » pour le pilote Red Bull ; « J'appuie sur l'accélérateur et il ne se passe rien ! » pour le septuple champion du monde, bientôt informé par son mur des stands d'un « problème logiciel en cours de résolution ». Avec plusieurs voitures circulant anormalement lentement, la Direction de Course suspend la procédure de départ et sort le drapeau rouge — tout le plateau regagne la voie des stands pour une seconde tentative.</p>

        <h3 class="subtitle">Second départ : les Ferrari jouent le pari du pneu sec</h3>
        <p>Le second essai est programmé pour 16h33, grille initiale conservée. La question des gommes devient centrale : la majorité du peloton reste en intermédiaires, mais Hamilton, Leclerc, Gasly, Bortoleto, Hülkenberg, Bearman, Bottas, Pérez et Colapinto optent pour le pneu tendre sec, pendant que Norris, Piastri, Alonso et Stroll choisissent le medium. Au signal, Antonelli et Russell s'envolent en tête pour Mercedes, Lawson bondit en 3<sup>e</sup> position et harcèle Verstappen, pendant que Hamilton et Leclerc, engloutis par leur pari raté sur le sec, sortent du Top 10.</p>

        <h3 class="subtitle">La Safety Car de Bottas et le pari gagnant de Mercedes</h3>
        <p>Verstappen reprend rapidement le dessus sur Russell au virage 4, Hadjar imite le geste sur Lawson pour la 4<sup>e</sup> place. Au tour 8, alors que Verstappen cherche une ouverture sur Antonelli — qui vient de partir large au dernier virage — Valtteri Bottas part en tête-à-queue dans le dernier secteur et déclenche la Safety Car. L'aubaine est immédiate pour les pneus intermédiaires encore en piste : tout le monde rentre chausser du sec. Mercedes réalise un arrêt parfait sous pression et conserve Antonelli devant Verstappen ; derrière, Russell, Hadjar, Lawson, Ocon, Lindblad, Sainz, Bortoleto et Piastri recollent dans l'ordre, tandis qu'Hamilton, Norris et Leclerc, désormais en sec, pointent 15<sup>e</sup>, 16<sup>e</sup> et 17<sup>e</sup>.</p>
        <div class="callout">Le choix du pneu au second départ aura façonné toute la première moitié de course : les neuf pilotes partis en sec (dont les deux Ferrari) paient une pénalité immédiate avant de profiter, une fois la piste asséchée, d'un train de pneus bien plus frais que leurs rivaux passés par l'intermédiaire.</div>

        <h3 class="subtitle">La remontée Ferrari et le double zoom final de Hamilton et Leclerc</h3>
        <p>À la relance (tour 13), Verstappen double Antonelli à l'extérieur du virage 1, complétant la manœuvre à la sortie du virage 2 ; Russell profite du duel pour reprendre la 2<sup>e</sup> place à Antonelli au virage 5. Au même moment, les commissaires notent un accrochage entre Bortoleto et Sainz au virage 2 — le pilote Williams part en tête-à-queue et dégringole de la zone des points à la 18<sup>e</sup> place, pendant que l'Audi s'arrête avec des dégâts. L'incident profite directement à Hamilton, qui récupère la 10<sup>e</sup> place avant de passer Hülkenberg pour la 9<sup>e</sup>.</p>
        <p>Antonelli signale avoir « plus de rythme » dans l'air sale de Russell ; Mercedes répond vouloir « faire quelque chose de différent » côté stratégie. Verstappen, lui, enchaîne les meilleurs tours et porte son avance à plus de trois secondes sur Russell au tour 19, avant qu'Antonelli ne reprenne la 2<sup>e</sup> place à Russell au virage 4 du tour 21 — Verstappen comptant alors cinq secondes d'avance. Hamilton poursuit sa remontée en doublant Lindblad, Ocon puis Lawson pour se hisser en 5<sup>e</sup> position ; Leclerc grimpe au 10<sup>e</sup> rang, Norris au 11<sup>e</sup>.</p>
        <p>Antonelli part large au dernier virage et touche la bordure d'entrée de voie des stands, demandant à vérifier son aileron avant — Russell revient à une seconde, Verstappen file à huit secondes devant. Albon est alors noté pour conduite erratique (enquête reportée après course), tandis que Bortoleto passe formellement sous investigation pour son accrochage avec Sainz. Hadjar, de son côté, laisse éclater sa frustration à la radio (« j'en ai marre ») en voyant Hamilton revenir rapidement sur lui.</p>

        <h3 class="subtitle">Deuxième Safety Car, l'abandon de Russell et le travers de Norris</h3>
        <p>Au tour 33, Russell effectue son dernier arrêt prévu, suivi un tour plus tard par Verstappen et Antonelli — tous trois en pneu tendre. Russell s'interroge par radio sur la précocité de cet arrêt ; on lui répond qu'il n'y en aura pas d'autre. Au tour 43, une Voiture de Sécurité Virtuelle est déployée après l'arrêt d'Albon en pleine piste, provoquant des arrêts supplémentaires chez Verstappen et Hamilton — le Néerlandais retombe en 2<sup>e</sup> position derrière Antonelli, son avance de douze secondes ne suffisant plus à conserver la tête.</p>
        <p>Un tour plus tard, Antonelli et Russell s'arrêtent à leur tour, rendant la tête à Verstappen. Pendant que les commissaires déplacent la voiture d'Albon, la Safety Car complète est déployée — provoquant de nouveaux arrêts chez Norris, Lawson, Alonso et Hülkenberg. C'est alors que Russell, circulant derrière la Safety Car, s'arrête net juste avant le virage 1 et abandonne, anéantissant d'un coup son outsiderat au championnat. Au même moment, Norris manque de percuter l'arrière de la voiture de son coéquipier Piastri au freinage du premier virage, part dans le dégagement, traverse le gravier et se retrouve relégué en 11<sup>e</sup> position.</p>

        <h3 class="subtitle">La relance finale : Verstappen contrôle, Hamilton et Leclerc achèvent leur remontée</h3>
        <p>À la relance, Verstappen conserve la tête devant Antonelli et Hadjar, Hamilton et Leclerc évoluant en 4<sup>e</sup> et 5<sup>e</sup> position, Piastri résistant à une attaque de Lawson pour conserver la 6<sup>e</sup> place. Un tour plus tard, Hamilton boucle sa remontée depuis le fond du classement en doublant Hadjar au virage 1 pour la 3<sup>e</sup> place, sous les acclamations ; Leclerc imite le mouvement au tour suivant pour prendre la 4<sup>e</sup> place au même pilote Red Bull.</p>
        <p>Verstappen maîtrise les derniers kilomètres et franchit la ligne avec environ deux secondes d'avance sur Antonelli, Hamilton, Leclerc et Hadjar conservant leurs positions jusqu'au drapeau. Lindblad, parti en fond de grille, boucle sa remontée en arrachant le dernier point disponible à la 10<sup>e</sup> place, juste derrière Norris — qui limite la casse après son passage dans le gravier.</p>
      </div>
    </section>

    <section class="block" data-num="03" id="sec-r3">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

        <h3 class="subtitle">Ferrari — un pari sur le sec qui coûte cher avant de rapporter gros</h3>
        <p>Partir en pneus tendres secs sur une piste encore détrempée au second départ a immédiatement coûté le Top 10 à Hamilton et Leclerc. Mais ce pari s'est retourné en avantage dès que la piste s'est asséchée : les deux Ferrari disposaient alors d'un train de pneus bien plus frais que les intermédiaires-puis-secs de leurs rivaux, ce qui a nourri toute leur remontée jusqu'au podium (Hamilton) et à la 4<sup>e</sup> place (Leclerc). Le résultat final masque presque entièrement le déficit initial — une leçon de patience stratégique plutôt qu'un coup de génie improvisé en course.</p>

        <h3 class="subtitle">Mercedes — Antonelli protégé, Russell laissé exposé jusqu'au bout</h3>
        <p>Antonelli signe un second rang solide malgré deux sorties larges (dont un contact avec la bordure d'entrée de stand), profitant systématiquement des fenêtres de Safety Car pour revenir sur Russell. Mais c'est le sort de Russell qui domine le bilan de l'écurie : auteur d'une course quasiment sans faute, en embuscade permanente sur Verstappen, il s'arrête au pire moment possible, juste avant le dernier virage derrière la Safety Car — un abandon qui coûte gros dans la course au titre face à l'avance déjà confortable d'Antonelli.</p>

        <h3 class="subtitle">Red Bull — Verstappen intraitable, Hadjar payé par sa pénalité</h3>
        <p>Verstappen ne cède jamais véritablement la tête après l'avoir reprise au tour 13, gérant à la perfection les deux fenêtres de Safety Car pour revenir en tête chaque fois. Première victoire de la saison pour lui comme pour l'écurie, obtenue sur un week-end chaotique plutôt que par une domination tranquille. Hadjar, parti 8<sup>e</sup> après sa pénalité de qualification, remonte jusqu'à la 5<sup>e</sup> place avant de céder du terrain dans les derniers tours face aux deux Ferrari relancées — la pénalité de grille reste le facteur déterminant de sa course.</p>

        <h3 class="subtitle">Racing Bulls — la meilleure remontée du jour, par les deux bouts de la grille</h3>
        <p>Lindblad, parti en fond de grille (22<sup>e</sup>) pour changement intégral de groupe propulseur, signe la remontée la plus spectaculaire de l'après-midi en arrachant le dernier point disponible. Lawson, lui, profite du second départ pour bondir en 3<sup>e</sup> position avant de retomber progressivement au fil des arrêts, pour terminer 7<sup>e</sup> — un résultat à double visage pour l'écurie, entre performance brute et gestion de course plus inégale.</p>
      </div>
    </section>

    <section class="block" data-num="04" id="sec-r4">
      <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
        <p>L'évaluation porte sur le Grand Prix du dimanche, en tenant compte de la position de départ réelle sur la grille (après pénalités) et des circonstances de course.</p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table class="verdict-table">
          <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
          <tbody>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Max Verstappen</td><td class="pos">1 → 1<span class="delta neutral">=</span></td><td>Première victoire de la saison pour lui et pour Red Bull, obtenue malgré une panne moteur au premier essai de départ et reprise à chaque relance derrière les deux Safety Cars. Course de bout en bout sans véritable faute.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Andrea Kimi Antonelli</td><td class="pos">3 → 2<span class="delta good">+1</span></td><td>Deux sorties larges au dernier virage (dont un contact avec la bordure d'entrée de stands) n'empêchent pas une 2<sup>e</sup> place solide, obtenue en revenant systématiquement sur Russell à chaque relance de Safety Car. Étend son avance au championnat à 84 points.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Lewis Hamilton</td><td class="pos">2 → 3<span class="delta bad">-1</span></td><td>Pari audacieux sur le pneu sec au second départ, payé cash en perdant le Top 10 — puis remontée complète jusqu'au podium, scellée par un dépassement sur Hadjar au virage 1 sous les acclamations. L'une des meilleures prestations individuelles du week-end.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Charles Leclerc</td><td class="pos">4 → 4<span class="delta neutral">=</span></td><td>Même pari que Hamilton sur le pneu sec, même remontée réussie en miroir, avec un dépassement sur Hadjar un tour après son coéquipier. Résultat conforme à sa position de départ, obtenu par un chemin bien plus tortueux.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Isack Hadjar</td><td class="pos">8 → 5<span class="delta good">+3</span></td><td>Belle remontée jusqu'à la 4<sup>e</sup> voire 3<sup>e</sup> place en milieu de course, avant de céder du terrain dans les derniers tours face aux deux Ferrari relancées par leur pari pneumatique. La pénalité de grille reste le facteur déterminant de sa course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Oscar Piastri</td><td class="pos">6 → 6<span class="delta neutral">=</span></td><td>Course sans éclat ni incident individuel notable, hormis avoir évité de peu un contact avec son coéquipier Norris au freinage du virage 1 derrière la dernière Safety Car. Résultat conforme à sa position de départ.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Liam Lawson</td><td class="pos">11 → 7<span class="delta good">+4</span></td><td>Bondit en 3<sup>e</sup> position dès le second départ et harcèle Verstappen, avant de retomber progressivement au fil des arrêts. Un résultat à double visage, entre performance brute en début de course et gestion plus inégale ensuite.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Fernando Alonso</td><td class="pos">12 → 8<span class="delta good">+4</span></td><td>Course discrète mais efficace sur pneu medium au second départ, sans incident notable relevé — une remontée solide plutôt qu'un coup d'éclat.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Lando Norris</td><td class="pos">5 → 9<span class="delta bad">-4</span></td><td>Manque de peu de percuter l'arrière de la voiture de Piastri au freinage du virage 1 derrière la dernière Safety Car, part dans le dégagement et traverse le gravier — l'incident qui lui coûte quatre places et le fait passer sous enquête des commissaires pour « conduite erratique », toujours à l'étude à la publication de cette analyse.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Arvid Lindblad</td><td class="pos">22 → 10<span class="delta good">+12</span></td><td>La remontée la plus spectaculaire de l'après-midi : parti en fond de grille pour changement intégral de groupe propulseur, le rookie Racing Bulls arrache le dernier point disponible. Aucun incident individuel notable relevé pour expliquer une telle progression — une course de gestion propre sur la distance.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Nico Hülkenberg</td><td class="pos">15 → 11<span class="delta good">+4</span></td><td>Noté pour un possible incident de sortie des stands non sanctionné en course, hors des points malgré une remontée correcte sur la distance.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Lance Stroll</td><td class="pos">14 → 12<span class="delta good">+2</span></td><td>Course sans incident individuel notable, légèrement en retrait par rapport à la performance de son coéquipier ce dimanche.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Franco Colapinto</td><td class="pos">21 → 13<span class="delta good">+8</span></td><td>Belle remontée depuis le fond de grille (pénalité cumulée de 15 places), sans incident individuel notable relevé en course — une gestion propre sur la distance comme son coéquipier d'infortune Lindblad.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Oliver Bearman</td><td class="pos">16 → 14<span class="delta good">+2</span></td><td>Course discrète, hors des points sur une piste où le choix du pneu sec au second départ ne lui a pas permis de tirer un bénéfice suffisant.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Esteban Ocon</td><td class="pos">17 → 15<span class="delta good">+2</span></td><td>Course sans incident individuel notable, hors des points dans le même groupe que son coéquipier Bearman.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Pierre Gasly</td><td class="pos">9 → 16<span class="delta bad">-7</span></td><td>Pari sur le pneu sec au second départ qui ne rapporte rien, contrairement aux deux Ferrari parties dans les mêmes conditions — recul net par rapport à sa position de départ sur l'ensemble de la course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Carlos Sainz</td><td class="pos">13 → 17<span class="delta bad">-4</span></td><td>Victime de l'accrochage du virage 2 avec Bortoleto au tour 13, part en tête-à-queue et dégringole de la zone des points — une course sacrifiée par un incident qui n'est pas de son fait.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Gabriel Bortoleto</td><td class="pos">10 → 18<span class="delta bad">-8</span></td><td>Pénalité de 10 secondes purgée pour avoir provoqué l'accrochage du virage 2 avec Sainz, après avoir signalé une odeur de fumée suspecte en piste. Journée à oublier, hors des points et sanctionnée.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Sergio Pérez</td><td class="pos">20 → 19<span class="delta good">+1</span></td><td>Dernier pilote classé à l'arrivée, sans incident individuel notable relevé — un week-end sans relief pour Cadillac.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>George Russell</td><td class="pos">7 → DNF<span class="delta dnf">DNF</span></td><td>Course quasiment sans faute, en embuscade permanente sur Verstappen et devant Antonelli par moments, jusqu'à s'arrêter net juste avant le dernier virage en roulant derrière la Safety Car. L'abandon le plus coûteux du week-end pour la course au titre, sans qu'aucune cause ne soit détaillée dans les données disponibles.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Alexander Albon</td><td class="pos">18 → DNF<span class="delta dnf">DNF</span></td><td>Noté pour conduite erratique avant de s'arrêter en pleine piste au tour 43, provoquant la Voiture de Sécurité Virtuelle puis la Safety Car complète qui redistribue toute la fin de course. Enquête des commissaires reportée après la course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Valtteri Bottas</td><td class="pos">19 → DNF<span class="delta dnf">DNF</span></td><td>Tête-à-queue solitaire dans le dernier secteur au tour 8, qui déclenche la première Safety Car de la course et redistribue tout le haut du classement par le jeu des arrêts au stand.</td></tr>
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
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Red Bull</td><td>Première victoire de la saison grâce à un Verstappen intraitable à chaque relance de Safety Car, complétée par une remontée crédible de Hadjar (5<sup>e</sup>) depuis sa pénalité de grille malgré un repli dans les derniers tours.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Mercedes</td><td>Week-end à deux visages : 2<sup>e</sup> place solide pour Antonelli, qui étend son avance au championnat à 84 points, contre l'abandon le plus coûteux de la course pour Russell, arrêté net juste avant le dernier virage après une course pourtant quasiment parfaite.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Ferrari</td><td>Le meilleur exemple de patience stratégique du jour : un pari sur le pneu sec qui coûte le Top 10 aux deux pilotes au second départ, payé en double remontée jusqu'au podium (Hamilton) et à la 4<sup>e</sup> place (Leclerc), chacun doublant Hadjar dans les derniers tours.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>McLaren</td><td>Piastri ramène une 6<sup>e</sup> place sans histoire, mais Norris perd quatre places et se retrouve sous enquête des commissaires après avoir manqué de percuter son propre coéquipier au freinage du virage 1 derrière la dernière Safety Car.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Racing Bulls</td><td>La meilleure opération du jour par les deux bouts de la grille : Lindblad remonte du 22<sup>e</sup> au 10<sup>e</sup> rang pour arracher le seul point disponible, tandis que Lawson profite d'un bon second départ avant de retomber progressivement en 7<sup>e</sup> place.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Aston Martin</td><td>Double résultat solide et sans incident (Alonso 8<sup>e</sup>, Stroll 12<sup>e</sup>), obtenu sur pneu medium au second départ — une gestion de course propre plutôt qu'un coup d'éclat.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Alpine</td><td>Résultat contrasté : Colapinto remonte du fond de grille jusqu'en 13<sup>e</sup> place sans incident, pendant que Gasly recule nettement après un pari sur le pneu sec qui, à la différence de Ferrari, ne rapporte rien.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Audi</td><td>Aucun point marqué : Bortoleto écope d'une pénalité de 10 secondes pour avoir provoqué l'accrochage du virage 2 avec Sainz, tandis que Hülkenberg, noté pour un possible incident à la sortie des stands, termine juste hors des points.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Williams</td><td>Week-end sacrifié par l'accrochage du virage 2 : Sainz dégringole hors des points après avoir été percuté par Bortoleto, tandis qu'Albon abandonne après avoir été noté pour conduite erratique, déclenchant la Safety Car décisive de fin de course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Haas</td><td>Aucun point marqué (Bearman 14<sup>e</sup>, Ocon 15<sup>e</sup>), le pari sur le pneu sec de Bearman au second départ n'ayant pas suffi à compenser son positionnement initial en milieu de grille.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Cadillac</td><td>Week-end à oublier : Pérez termine dernier des classés à l'arrivée, Bottas abandonne après un tête-à-queue solitaire qui déclenche la première Safety Car de la course.</td></tr>
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
              <li><strong>Verstappen et Red Bull</strong>, première victoire de la saison arrachée sur un week-end chaotique plutôt que par une domination tranquille.</li>
              <li><strong>Ferrari</strong>, pour un pari sur le pneu sec payé cash en début de course mais transformé en double remontée jusqu'au podium et à la 4<sup>e</sup> place.</li>
              <li><strong>Lindblad</strong>, remontée du 22<sup>e</sup> au 10<sup>e</sup> rang depuis le fond de grille — la performance individuelle la plus marquante du jour.</li>
              <li><strong>Antonelli</strong>, qui étend son avance au championnat à 84 points malgré deux sorties larges en course.</li>
            </ul>
          </div>
          <div class="verdictcol lose">
            <h4>Perdants</h4>
            <ul>
              <li><strong>Russell</strong>, course quasiment parfaite anéantie par un arrêt net juste avant le dernier virage derrière la Safety Car — l'abandon le plus coûteux du week-end pour la course au titre.</li>
              <li><strong>Norris</strong>, qui manque de peu de percuter son propre coéquipier et finit sous enquête des commissaires pour conduite erratique.</li>
              <li><strong>Williams</strong>, double sortie des points après l'accrochage subi par Sainz et l'abandon d'Albon.</li>
              <li><strong>Bortoleto</strong>, pénalisé pour avoir provoqué l'accrochage du virage 2 avec Sainz, sur fond d'une odeur de fumée suspecte signalée en piste.</li>
            </ul>
          </div>
        </div>
        <div class="callout">Sepang restera l'image d'une course construite en deux temps : un chaos de drapeau rouge et de pari pneumatique en première moitié, puis une gestion presque classique de Safety Car en seconde — gâchée au pire moment pour Russell. Antonelli, lui, n'a besoin que de limiter les dégâts pour continuer de creuser l'écart : 320 points et 8 victoires, 84 d'avance sur son coéquipier, à sept manches de la fin de la saison.</div>
      </div>
    </section>

    <section class="block" id="sec-r-next">
      <div class="prose">
        <h2 class="sectitle">Enseignements pour la suite</h2>
        <p>Trois points issus de Sepang à surveiller au prochain rendez-vous :</p>
        <ol style="padding-left:20px; margin:0 0 16px;">
          <li style="margin-bottom:10px;"><strong>Red Bull</strong> a prouvé à Sepang que la voiture peut gagner dans des conditions chaotiques — reste à savoir si cette première victoire de la saison marque un vrai tournant de forme ou un concours de circonstances favorable (pluie, deux Safety Cars, pari pneumatique des rivaux).</li>
          <li style="margin-bottom:10px;"><strong>Russell</strong> aborde Singapour avec un abandon coûteux de plus au compteur et un écart au championnat remonté à 84 points sur Antonelli — la marge d'erreur se réduit à mesure que les manches restantes (sept) s'amenuisent.</li>
          <li><strong>Norris</strong>, sous enquête des commissaires pour un incident évité de justesse avec son propre coéquipier, aborde la suite de la saison avec une question de gestion de course à régler avant Singapour.</li>
        </ol>
        <a class="bridge-btn" href="/courses" style="text-decoration:none; display:inline-block;">Voir le calendrier de la saison →</a>
      </div>
    </section>

    <section class="block" id="sec-r7">
      <details class="sources">
        <summary>Sources utilisées — GP de Bahreïn (Malaisie) (3 liens)</summary>
        <div class="srcgroup">
          <h5>Données de course</h5>
          <ul>
            <li><span class="desc">The Pit Wall — pipeline production (résultats/standings via scripts/ingest_jolpica.py, temps au tour/pneus/météo/RCM via scripts/ingest_openf1.py), primaire.</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Déroulé de course et qualifications</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/latest/article/verstappen-wins-rain-hit-bahrain-gp-in-malaysia-over-antonelli-as-russell-retires-late-on.6qfpIHPch8mIVj2YgfHdCp" data-desc="Rapport officiel de la course, fetché en primaire — déroulé complet, citation de Verstappen, contexte.">Formula1.com — Verstappen remporte un GP de Bahreïn (Malaisie) sous la pluie</a><span class="desc">Formula1.com — primaire</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/verstappen-seizes-first-pole-position-of-the-season-in-qualifying-for-bahrain-gp-in-malaysia.3BW0zzYBLhG54bsQoNKFvP" data-desc="Rapport officiel des qualifications, grille de départ et pénalités.">Formula1.com — rapport qualifications</a><span class="desc">Formula1.com — primaire</span></li>
          </ul>
        </div>
      </details>
    </section>
`;
