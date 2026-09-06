// Pré-analyse Round 14 — Grand Prix d'Espagne 2026 (Madring, Madrid).
// Rédigée le 6 septembre, au lendemain du GP d'Italie, avant tout roulage
// sur ce circuit totalement inédit — aucune séance n'a encore eu lieu.
// Sourcing : Pirelli (allocation pneus), Formula1.com (circuit et virage
// La Monumental), presse spécialisée (PlanetF1, RacingNews365, The Race,
// Motorsport.com, GPfans) pour le contexte d'équipe et l'incertitude
// persistante sur Hadjar. Aucune donnée de piste réelle n'existe pour ce
// circuit : toute cette pré-analyse repose donc sur des caractéristiques de
// tracé publiées et sur la forme des équipes à la sortie de Monza, pas sur
// un historique de performance — ce que le texte souligne explicitement.
export const ROUND14_PREANALYSE_FR_HTML = `
<div class="hero prose">
      <p class="eyebrow">Grand Prix d'Espagne · Madring (Madrid) · Pré-analyse 2026</p>
      <p class="verdict">Un circuit totalement inédit, sans un seul tour de référence — et un plateau qui sort de Monza plus incertain que jamais.</p>
      <div class="resultstrip">
        <div class="chip"><span class="pos">Favori logique</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli / Russell</span> <span class="gap">Mercedes</span></div>
        <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc / Hamilton</span> <span class="gap">Ferrari</span></div>
        <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris / Piastri</span> <span class="gap">McLaren</span></div>
        <div class="chip"><span class="pos">Outsider</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull</span></div>
        <div class="chip"><span class="pos">Joker</span> <span class="dot" style="background:#FF87BC"></span><span class="drv">Gasly</span> <span class="gap">Alpine</span></div>
      </div>
      <p class="subverdict">Madring inaugure sa piste ce week-end : aucune monoplace 2026 n'y a roulé en conditions de course, à l'exception d'une journée de tournage Ferrari strictement encadrée par le règlement (200 km, Leclerc et Hamilton). Toute hiérarchie annoncée ici est donc un pronostic bâti sur des caractéristiques de tracé publiées et sur la forme des équipes sortant de Monza — pas sur un historique de performance, qui n'existe simplement pas encore pour ce circuit. Antonelli aborde le week-end avec 267 points et 66 d'avance sur Russell ; Ferrari, elle, sort de Monza sans un seul point marqué.</p>
    </div>

    <section class="block" data-num="01" id="sec-p1">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> Un circuit hybride, sans historique de performance</h2>
        <p>Le Madring (5,474 km, 22 virages) est un circuit hybride rue/permanent construit autour du centre d'exposition IFEMA à Valdebebas, au nord-est de Madrid — sur le même principe que Miami : des portions étroites et sinueuses autour des halls d'exposition, reliées par deux tunnels courts à une section rapide et vallonnée qui porte le point d'orgue du tracé. <a href="https://www.the-race.com/formula-1/madrid-f1-circuit-layout-revealed/" data-desc="Présentation complète du tracé, longueur, nombre de virages.">The Race — le tracé de Madring dévoilé</a></p>
        <p>Ce point d'orgue s'appelle <strong>La Monumental</strong> : un virage de 500 à 550 mètres de long, banqué à 24°, dont le mur d'asphalte grimpe jusqu'à 10 mètres de hauteur — inspiré des arènes madrilènes du même nom. Les pilotes y resteront chargés pendant environ six secondes sur un arc de plus de 270°, une contrainte physique et aérodynamique inédite sur la grille actuelle. <a href="https://www.formula1.com/en/latest/article/why-madrids-la-monumental-corner-lives-up-to-its-name.2tbqkIagDDXxFRR48YH4Ih" data-desc="Détail du virage La Monumental : banking, longueur, temps de charge.">Formula1.com — La Monumental</a></p>
        <p>Le tracé comporte deux zones à mode Ligne Droite (l'équivalent DRS 2026) : la ligne droite principale entre le virage 22 et le virage 1, et une longue section d'accélération entre les virages 3 et 4, où les organisateurs annoncent des pointes supérieures à 340 km/h avant un freinage appuyé jusqu'à 80 km/h au virage 5 — la zone la plus rapide du tour selon leurs propres projections. <a href="https://press.pirelli.com/tyre-compounds-selected-for-zandvoort-monza-and-madrid/" data-desc="Contexte du tracé et des contraintes pneumatiques attendues, source Pirelli.">Pirelli — sélection des pneus pour Madrid</a></p>
      </div>
    </section>

    <section class="block" data-num="02" id="sec-p2">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> Pneus : la gamme medium, pour limiter la surchauffe</h2>
        <p>Pirelli a choisi la gamme de gommes la plus dure de son éventail pour ce week-end : C2 (dur), C3 (medium) et C4 (tendre) — contre C3/C4/C5 à Monza une semaine plus tôt. Le choix s'appuie sur des simulations plaçant les contraintes attendues sur le pneu à un niveau comparable à des circuits à forte énergie comme Silverstone ou Spa-Francorchamps, avec l'objectif explicite d'encourager une stratégie à deux arrêts plutôt qu'un arrêt unique, tout en réduisant le risque de surchauffe si les températures s'annoncent élevées pour cette première édition. <a href="https://press.pirelli.com/tyre-compounds-selected-for-zandvoort-monza-and-madrid/" data-desc="Choix officiel Pirelli C2/C3/C4 pour Madrid et sa justification.">Pirelli — allocation confirmée pour Madrid</a></p>
        <p>Sans aucune donnée de dégradation réelle sur ce tracé, cette allocation reste la seule boussole disponible avant le week-end : une gamme plus dure que la normale signale une piste jugée exigeante en énergie latérale (les longues courbes et La Monumental) autant qu'en freinage (le virage 5 après la ligne droite à 340 km/h).</p>
      </div>
    </section>

    <section class="block" data-num="03" id="sec-p3">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> La forme des équipes en sortant de Monza</h2>

        <h3 class="subtitle">Mercedes — la meilleure dynamique du plateau, sans certitude de terrain</h3>
        <p>Antonelli aborde ce week-end en position de force totale : 267 points, 7 victoires dont une remontée du fond de grille à Monza, 66 points d'avance sur Russell au championnat. Rien dans les caractéristiques connues de Madring ne désavantage a priori la W17, mais rien ne la favorise non plus de façon évidente — la meilleure indication reste la forme du moment plutôt qu'une adéquation de circuit, qui n'existe simplement pas encore pour un tracé inédit.</p>

        <h3 class="subtitle">Ferrari — une tête d'avance discutée, un urgent besoin de rebond</h3>
        <p>Ferrari a organisé une journée de tournage complète (200 km autorisés par le règlement) à Madring avec Leclerc et Hamilton avant le week-end — une pratique parfaitement légale, mais qui a suscité une remarque du directeur McLaren Andrea Stella sur un « petit avantage » potentiel pour la Scuderia, qui dispose désormais de références réelles sur ce tracé plutôt que de simples données simulées. Stella lui-même relativise toutefois la portée de cet avantage, jugé voué à s'estomper dès l'entame du week-end. <a href="https://www.planetf1.com/news/mclaren-ferrari-madring-filming-day" data-desc="Réaction de McLaren à la journée de tournage Ferrari à Madring.">PlanetF1 — McLaren commente la journée Ferrari à Madring</a></p>
        <p>Cette éventuelle longueur d'avance technique arrive au pire des moments pour la rivalité au championnat : Ferrari sort de Monza sans un seul point marqué (Leclerc à l'abandon après une sortie de piste solitaire, Hamilton limité à la 6<sup>e</sup> place après un accrochage au premier tour), et reste troisième du championnat constructeurs, largement décrochée de Mercedes. Combler ce retard supposera une meilleure coordination interne que celle affichée à Monza, où l'accrochage entre les deux pilotes n'a débouché sur aucune sanction mais sur une vraie perte de points.</p>

        <h3 class="subtitle">McLaren — la régularité, sans étincelle récente</h3>
        <p>McLaren n'a plus gagné depuis Zandvoort et sort de Monza avec un flou entretenu par Norris lui-même en qualifications sur la fiabilité de ses freins (« Je pense juste que ça va mal se passer au virage 1 »), un souci qui a touché les deux monoplaces. La P4/P5 obtenue à Monza confirme une équipe solide mais pas dominante sur ce type de circuit à haute vitesse ; rien ne permet de savoir si Madring, avec ses sections lentes en centre-ville, corrigera ou aggravera ce profil.</p>

        <h3 class="subtitle">Red Bull — Verstappen en forme, Hadjar toujours absent</h3>
        <p>Verstappen monte sur le podium à Monza malgré une voiture qu'il décrit lui-même comme instable à l'arrière — un signal encourageant avant un circuit entièrement nouveau où l'adaptabilité du pilote peut compter davantage que la seule performance de la monoplace. Isack Hadjar, absent depuis Zandvoort avec une fracture du poignet contractée à l'entraînement, est donné « quasiment certain » de manquer également Madrid selon la presse spécialisée — Red Bull privilégiant une guérison complète plutôt qu'un retour précipité. Liam Lawson devrait donc rester aligné chez Red Bull à la place de Hadjar, et Yuki Tsunoda continuer de le remplacer chez Racing Bulls, pour un troisième week-end consécutif. <a href="https://www.gpfans.com/en/f1-news/1089843/f1-red-bull-isack-hadjar-miss-spanish-grand-prix-wrist-injury-replacement/" data-desc="Hadjar donné quasiment certain absent pour Madrid, citation de Laurent Mekies.">GPfans — Hadjar quasiment certain absent à Madrid</a></p>

        <h3 class="subtitle">Alpine — la pole de Monza, un signal ou un accident ?</h3>
        <p>Gasly a décroché la première pole de sa carrière à Monza avant de s'effacer en course (7<sup>e</sup> à l'arrivée, dépassé trois fois en trois tours dès le tour 10) — un rythme de qualification qui n'a jamais été confirmé sur la distance. Rien à Madring, circuit totalement différent de Monza, ne permet d'anticiper si le package amené par Alpine (étendu à Colapinto) referme cet écart de rythme de course ou si Monza restait un pic isolé, dû à un tour exceptionnel plutôt qu'à un rythme dominant.</p>
      </div>
    </section>

    <section class="block" data-num="04" id="sec-p4">
      <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">04</span> La bataille du milieu de grille</h2>
        <p><strong>Racing Bulls</strong> a signé un double Top 10 discret à Monza (Lindblad 8<sup>e</sup>, Tsunoda 10<sup>e</sup>) et pourrait confirmer sur un circuit dont personne n'a de référence. <strong>Audi</strong> reste hors des points à Monza malgré un rythme correct de Hülkenberg. <strong>Williams</strong> a manqué d'efficacité stratégique le week-end dernier (Albon et sa stratégie à trois arrêts tardive) et devra mieux exploiter un circuit inédit où l'expérience de circuit ne joue pour personne. <strong>Haas</strong> reste en retrait malgré une EL2 prometteuse de Bearman à Monza. <strong>Aston Martin</strong> sort d'un doublé abandon (Alonso, dommages suspectés ; Stroll, panne hydraulique) qui laisse peu d'indices positifs avant Madrid. <strong>Cadillac</strong> reste hors du milieu de tableau, Pérez ayant en plus écopé d'une pénalité de 5 secondes à Monza.</p>
      </div>
    </section>

    <section class="block" data-num="05" id="sec-p5">
      <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">05</span> Hiérarchie prévisionnelle — un pronostic sans repère de piste</h2>
        <p><strong>Groupe de tête théorique :</strong> Mercedes (forme du moment), Ferrari (tête d'avance technique discutée, mais urgence de rebond après un Monza à zéro point), McLaren (régularité sans étincelle récente). <strong>Outsider :</strong> Red Bull avec un Verstappen en forme, sur un circuit où l'adaptabilité pourrait compter davantage que l'historique de performance. <strong>Joker :</strong> Alpine, si le rythme de course confirme enfin la pole de Monza plutôt que de la contredire.</p>
        <div class="callout">
          <strong>Avertissement de méthode</strong> — Cette hiérarchie n'a aucun point d'ancrage local : aucune monoplace 2026 n'a bouclé un tour de course sur ce circuit, hormis la journée de tournage encadrée de Ferrari. Elle repose entièrement sur la forme sortant de Monza et sur des caractéristiques de tracé publiées (virages, longueur, allocation pneus) — un pronostic à prendre avec davantage de prudence encore que d'ordinaire, et à confronter dès l'EL1 de vendredi plutôt qu'à prolonger seul.
        </div>
      </div>
    </section>

    <section class="block" id="sec-p6">
      <div class="prose">
        <h2 class="sectitle">Conclusion</h2>
        <p>Madring efface toute forme d'avantage historique : ni Mercedes ni personne d'autre n'a de référence à défendre sur ce tracé. Ce que le plateau apporte, en revanche, c'est une forme sortant de Monza très contrastée — Antonelli et Mercedes en position de force totale, Ferrari en urgence de rebond après un week-end à zéro point, McLaren stable sans étincelle, Verstappen relancé, et Alpine face à la question de savoir si sa pole était un signal ou un accident. La première heure d'essais libres, sans le moindre repère chronométrique antérieur, sera exceptionnellement révélatrice.</p>
        <div class="callout">Rendez-vous vendredi 11 septembre pour l'EL1 — la toute première séance de Formule 1 disputée sur ce circuit.</div>
      </div>
    </section>

    <section class="block" id="sec-p7">
      <details class="sources">
        <summary>Sources utilisées — Pré-analyse Madring (8 liens)</summary>
        <div class="srcgroup">
          <h5>Circuit</h5>
          <ul>
            <li><a href="https://www.the-race.com/formula-1/madrid-f1-circuit-layout-revealed/" data-desc="Longueur, nombre de virages, description générale du tracé.">The Race — le tracé de Madring dévoilé</a><span class="desc">The Race</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/why-madrids-la-monumental-corner-lives-up-to-its-name.2tbqkIagDDXxFRR48YH4Ih" data-desc="Détail du virage La Monumental : banking à 24°, longueur, temps de charge.">Formula1.com — La Monumental</a><span class="desc">Formula1.com</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Pneus</h5>
          <ul>
            <li><a href="https://press.pirelli.com/tyre-compounds-selected-for-zandvoort-monza-and-madrid/" data-desc="Confirmation officielle des C2/C3/C4 pour Madrid et de leur justification.">Pirelli — allocation Madrid</a><span class="desc">Pirelli Press</span></li>
            <li><a href="https://www.motorsportweek.com/2026/07/28/f1-madrid-race-pirelli-info/" data-desc="Contexte complémentaire sur les contraintes pneumatiques attendues.">Motorsport Week — info Pirelli Madrid</a><span class="desc">Motorsport Week</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Dynamique d'équipes</h5>
          <ul>
            <li><a href="https://www.planetf1.com/news/mclaren-ferrari-madring-filming-day" data-desc="Réaction de McLaren (Andrea Stella) à la journée de tournage Ferrari à Madring.">PlanetF1 — McLaren sur la journée Ferrari</a><span class="desc">PlanetF1</span></li>
            <li><a href="https://www.gpfans.com/en/f1-news/1089843/f1-red-bull-isack-hadjar-miss-spanish-grand-prix-wrist-injury-replacement/" data-desc="Hadjar quasiment certain absent à Madrid, citation de Laurent Mekies.">GPfans — Hadjar absent à Madrid</a><span class="desc">GPfans</span></li>
            <li><a href="https://www.motorsport.com/f1/news/standings-antonelli-unstoppable-at-the-top/10853059/" data-desc="Classement pilotes détaillé après le GP d'Italie.">Motorsport.com — classements après Monza</a><span class="desc">Motorsport.com</span></li>
            <li><a href="https://scuderiafans.com/2026-f1-constructor-standings-after-italian-gp-mercedes-leads-ferrari-by-122-points/" data-desc="Classement constructeurs après le GP d'Italie.">Scuderiafans — classement constructeurs</a><span class="desc">Scuderiafans</span></li>
          </ul>
        </div>
      </details>
    </section>
`;
