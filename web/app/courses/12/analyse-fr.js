// Analyse Round 12 — Grand Prix des Pays-Bas 2026 (Zandvoort).
// Migré depuis l'ancien contenu figé de la page d'accueil
// (web/app/content.js, section "Dernière course" / view-race), dans le
// cadre de la refonte de navigation (option A) : chaque course n'a
// désormais plus qu'un seul emplacement pour son analyse — cette page —
// au lieu d'exister en double sur l'accueil. Tableaux pilote par pilote
// et équipe par équipe : générés à la migration à partir des données et
// de la logique de web/app/pitwall-behavior.js (autrefois injectées côté
// client), aujourd'hui figés en HTML statique comme pour les rounds 1-11.
export const ROUND12_ANALYSE_FR_HTML = `
<div class="hero prose">
      <p class="eyebrow">Grand Prix des Pays-Bas · Zandvoort · 2026</p>
      <p class="verdict">Norris et McLaren ont gagné une course que <em>Mercedes</em> avait d'abord prise en main.</p>
      <div class="resultstrip">
        <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren</span></div>
        <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · +11,536s</span></div>
        <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes · +0,849s sur Hamilton</span></div>
        <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari</span></div>
        <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari</span></div>
      </div>
      <p class="subverdict">Ce n'est ni une victoire offerte par le VSC, ni une énorme erreur stratégique de Mercedes. McLaren a surtout créé un décalage pneumatique en prolongeant le dernier relais de Norris, puis Norris a parfaitement exploité cette fenêtre. Derrière, Mercedes a maximisé ses points. Ferrari avait probablement le rythme pour monter sur le podium, mais pas la qualité d'exécution nécessaire.</p>
    </div>

    <section class="block" data-num="01" id="sec-r1">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> Le contexte avant la course</h2>
        <p>Zandvoort est un circuit étroit, sinueux, où dépasser reste difficile. La position en piste pèse donc très lourd. Norris partait en pole devant Russell, Antonelli, Piastri, Hamilton, Leclerc, Verstappen et Lawson. Alonso n'était que 18e, Bottas 21e et Pérez devait partir des stands après des modifications sous parc fermé. <a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/starting-grid?utm_source=chatgpt.com" data-desc="Grille de départ officielle du GP des Pays-Bas 2026.">Grille officielle</a></p>
        <p>Le Sprint avait donné l'impression d'une dégradation relativement faible : Russell l'avait gagné et Leclerc avait même fait durer les tendres pendant 24 tours. Mais la pluie tombée avant le Grand Prix a nettoyé la piste et modifié son adhérence. Pirelli estime que cette piste « remise à zéro », plus glissante et plus chaude qu'au Sprint, a fortement augmenté l'usure. Le scénario attendu à un arrêt a pratiquement disparu après la reprise.</p>
        <p>Cela explique l'extraordinaire diversité stratégique : 60 passages aux stands, une dizaine de stratégies différentes, et aucun des dix premiers avec exactement la même séquence de pneus. <a href="https://press.pirelli.com/sixty-pit-stops-in-norriss-winning-farewell-at-zandvoort/?utm_source=chatgpt.com" data-desc="Pirelli détaille les 60 arrêts et la diversité stratégique de la course.">Analyse officielle Pirelli</a></p>
      </div>
    </section>

    <section class="block" data-num="02" id="sec-r2">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

        <h3 class="subtitle">Départ initial : Antonelli bondit, Verstappen craque</h3>
        <p>Presque tout le monde part en slicks malgré les portions encore humides. Les quatre premiers choisissent les mediums ; une grande partie du peloton, les tendres.</p>
        <p>Norris conserve la tête, mais Antonelli prend immédiatement la deuxième place à Russell. Leclerc passe Piastri. Derrière, Verstappen se retrouve dans une séquence agitée avec Hamilton et Lawson. Dans le dernier virage, il met la voiture sur une partie encore humide et sur les lignes blanches, perd l'arrière et frappe violemment le mur.</p>
        <p>C'est une faute de pilotage, même si les circonstances sont très piégeuses : slicks, piste irrégulièrement sèche, trafic et faible adhérence. Le drapeau rouge est inévitable.</p>
        <p>Au même moment, Bortoleto part en tête-à-queue au même endroit. Hülkenberg évite de justesse son équipier dans la fumée.</p>

        <h3 class="subtitle">Reprise : le choix des pneus rebâtit la course</h3>
        <p>Pendant l'interruption : Norris abandonne les mediums pour les tendres ; Antonelli et Russell conservent leurs mediums ; Piastri choisit les durs, dans l'idée initiale de pouvoir aller très loin ; les Ferrari repartent en tendres ; Alonso prend également des tendres neufs.</p>
        <p>Avant même la reprise, Bearman tombe en panne pendant le tour de formation.</p>
        <p>Au second départ, Antonelli réalise une excellente mise en action et prend la tête à Norris. Piastri, très incisif, dépasse Russell et s'installe troisième.</p>
        <p>Dans le premier relais, Antonelli contrôle Norris. Il réussit à maintenir l'écart autour de 1 à 1,5 seconde, privant souvent la McLaren de l'Overtake Mode. Norris se plaint d'un manque de rythme et d'équilibre avec les tendres. À ce moment-là, la Mercedes paraît réellement être la meilleure voiture de tête.</p>

        <h3 class="subtitle">Premier cycle d'arrêts : Russell récupère P3, Piastri perd sa course</h3>
        <p>Russell s'arrête au tour 17 pour les durs. Piastri répond un tour plus tard, mais son passage par la voie des stands lui coûte environ 2,3 secondes de plus que celui de Russell : 20,267 secondes contre 18,010. Cette différence suffit à inverser leurs positions. <a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/race-result?utm_source=chatgpt.com" data-desc="Résultats officiels du Grand Prix, temps et écarts.">Résumé officiel des arrêts</a></p>
        <p>Antonelli et Norris s'arrêtent ensemble autour du tour 21-22, également pour les durs. Leclerc prend les mediums, Hamilton prolonge jusqu'au tour 25-26 avant de mettre les durs.</p>
        <p>À partir de là, la physionomie change : la McLaren de Norris fonctionne beaucoup mieux avec les durs ; Antonelli commence progressivement à souffrir davantage de l'arrière ; les Ferrari se montrent très rapides ; Piastri ne retrouve jamais un rythme comparable à celui de Norris.</p>
        <p>Leclerc puis Hamilton dépassent Piastri. Au milieu de la course, l'Australien, qui avait été troisième après la reprise, est retombé sixième.</p>

        <h3 class="subtitle">Le moment décisif : Mercedes protège, McLaren prolonge</h3>
        <p>Vers le tour 40, Norris revient à environ sept dixièmes d'Antonelli. Mercedes est dans une position difficile : si Antonelli reste en piste, Norris peut s'arrêter et tenter l'undercut ; si Mercedes s'arrête d'abord, elle conserve provisoirement la position, mais offre à Norris des pneus plus frais en fin de relais.</p>
        <p>Mercedes choisit la protection : Antonelli puis Russell passent aux durs au tour 40. McLaren laisse Norris en piste jusqu'au tour 47-48.</p>
        <div class="callout">C'est le choix gagnant. Norris ressort environ cinq secondes derrière Antonelli, mais avec des pneus durs sept tours plus frais. Il lui reprend très rapidement le terrain. Ce n'est donc pas un simple « overcut » classique : McLaren accepte d'abord de perdre la position pour fabriquer une supériorité pneumatique assez grande pour dépasser en piste, même à Zandvoort.</div>
        <p>L'analyse des longs relais confirme que Norris et Antonelli étaient assez proches en rythme global, mais que les principaux écarts ont été créés par leurs fenêtres d'arrêts respectives. <span class="note">Analyse des données RaceOptiData</span></p>

        <h3 class="subtitle">Hamilton leader provisoire et l'occasion parfaitement saisie par Norris</h3>
        <p>Hamilton, qui a prolongé son relais, mène alors devant Antonelli et Norris. Cette présence joue un rôle important : Antonelli dispose de l'Overtake Mode grâce à sa proximité avec la Ferrari et peut s'en servir pour défendre contre Norris.</p>
        <p>Mais Antonelli hésite dans sa tentative sur Hamilton et perd une partie de son élan. Norris attaque immédiatement à l'extérieur du virage 1 et prend la deuxième place. Il dépasse ensuite Hamilton pour récupérer la tête ; Antonelli passe également la Ferrari.</p>
        <p>C'est probablement la séquence de pilotage la plus importante de la course. La stratégie avait amené Norris au contact, mais il fallait encore dépasser. Son attaque extérieure au virage 1 est ferme, propre et parfaitement synchronisée.</p>

        <h3 class="subtitle">Le VSC final : Mercedes sécurise plutôt qu'elle n'attaque</h3>
        <p>L'abandon d'Ocon provoque un VSC. Antonelli, Hamilton, Leclerc et Piastri s'arrêtent pour des tendres. Norris et Russell restent en piste.</p>
        <p>Norris se demande trop tard s'il aurait dû s'arrêter, mais rester dehors se révèle parfaitement viable. À la reprise, il possède environ 6,8 secondes d'avance sur Russell, lui-même environ 5,6 secondes devant Antonelli.</p>
        <p>Mercedes ne pouvait pas raisonnablement arrêter Russell : il serait probablement ressorti derrière les Ferrari. Le laisser en piste était sa seule véritable chance de podium.</p>
        <p>Antonelli revient rapidement sur Russell grâce à ses tendres. Mercedes ordonne alors l'inversion des positions. Russell obéit, malgré une réaction initialement agacée, puis doit défendre contre Hamilton et Leclerc.</p>
        <p>Cet ordre d'équipe est défendable : Antonelli était devant Russell avant son arrêt sous VSC ; il avait des pneus beaucoup plus frais ; laisser les deux Mercedes se battre aurait fait revenir les Ferrari plus rapidement ; Mercedes avait établi que deux pilotes sur des stratégies différentes ne devaient pas se gêner.</p>
        <p>La critique possible concerne moins le principe que l'exécution : Russell perd environ deux secondes dans la manœuvre et se retrouve très exposé. Un second VSC tardif, provoqué par des débris après l'accrochage des Williams, interrompt au bon moment l'offensive de Hamilton. Russell conserve finalement le podium pour 0,849 seconde. <a href="https://www.formula1.com/en/latest/article/you-want-to-fight-for-every-single-position-russell-offers-verdict-on-mercedes-team-orders-in-dutch-gp.3qBtPSF2Jgfyu63IKV8our?utm_source=chatgpt.com" data-desc="Russell commente les consignes d'équipe Mercedes après la course.">Explication et débat autour de l'ordre Mercedes</a></p>
        <p>Norris gagne avec 11,536 secondes d'avance sur Antonelli. <a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/race-result?utm_source=chatgpt.com" data-desc="Classement final du Grand Prix des Pays-Bas.">Classement officiel complet</a></p>
      </div>
    </section>

    <section class="block" data-num="03" id="sec-r3">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

        <h3 class="subtitle">McLaren — la patience plutôt que la position immédiate</h3>
        <p>La décision essentielle est d'avoir prolongé Norris après l'arrêt d'Antonelli. Mercedes s'est retrouvée obligée de protéger contre l'undercut ; McLaren a compris que le dur fonctionnait mieux sur la MCL40 et a préféré préparer une attaque avec un gros différentiel d'âge.</p>
        <p>Le choix de ne pas s'arrêter sous le VSC final paraît rétrospectivement excellent. Antonelli avait des tendres, mais il devait dépasser Russell, puis combler plus de dix secondes. Norris avait encore suffisamment de rythme pour contrôler.</p>
        <p>En revanche, la gestion de Piastri est beaucoup moins convaincante : choix du dur à la reprise, arrêt lent, difficultés de mise en température puis effondrement du rythme. Sur des relais comparables de 24 tours en durs, Norris aurait été environ sept dixièmes au tour plus rapide. C'est trop pour être expliqué uniquement par l'arrêt raté.</p>

        <h3 class="subtitle">Mercedes — pas brillante, mais rationnelle</h3>
        <p>Le deuxième arrêt anticipé d'Antonelli a donné l'avantage pneumatique à Norris, mais parler de faute stratégique serait excessif. Norris était à sept dixièmes : ne pas couvrir l'undercut était également très risqué.</p>
        <p>Le VSC a ensuite été bien exploité pour protéger Antonelli des Ferrari. Le changement de positions a sécurisé P2-P3. Mercedes a perdu la victoire faute de rythme et de durée de vie sur le deuxième train de durs, beaucoup plus que par une énorme erreur du muret.</p>

        <h3 class="subtitle">Ferrari — bonne idée générale, mauvaise exécution</h3>
        <p>Ferrari avait intelligemment séparé les stratégies : Leclerc devait mettre Russell sous pression ; Hamilton devait prolonger et bénéficier de pneus plus frais.</p>
        <p>Le problème est apparu lorsque Hamilton, nettement plus rapide avec ses durs plus récents, est revenu sur Leclerc. Ferrari demande à Leclerc de s'arrêter, mais sans lui expliquer clairement qu'il doit aussi libérer Hamilton. Leclerc estime qu'il peut continuer, prolonge d'un tour et Hamilton perd plus de deux secondes par rapport à Russell.</p>
        <p>Cette perte est concrète : Hamilton termine à 0,849 seconde du podium. Une analyse des chronos montre qu'il reprenait alors entre deux et six dixièmes par tour à Leclerc. <a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/fastest-laps?utm_source=chatgpt.com" data-desc="Classement des meilleurs tours en course.">Analyse des temps au tour</a></p>
        <p>La responsabilité est partagée, mais principalement collective : Leclerc aurait pu suivre immédiatement l'instruction de rentrer ; Ferrari aurait dû annoncer explicitement l'objectif et, si nécessaire, ordonner l'échange ; l'équipe a ajouté un arrêt lent pour Leclerc ; la décision finale de remettre également Leclerc en tendres sous VSC est discutable : rester en piste l'aurait placé plus haut, mais avec le risque d'être attaqué par Antonelli et Hamilton.</p>
        <p>Vasseur a expliqué que Ferrari ne voulait pas dévoiler publiquement son plan consistant à prolonger Hamilton jusqu'à l'arrivée. C'est compréhensible tactiquement, mais le secret devient contre-productif lorsqu'il empêche ses propres pilotes de comprendre la course. <a href="https://www.formula1.com/en/latest/article/what-the-teams-said-race-day-in-the-netherlands-2026.1GTy1x6hObFlkGkaXKqhNS?utm_source=chatgpt.com" data-desc="Déclarations des équipes après la course, dont Vasseur.">Explications de Vasseur</a></p>
        <p>C'est également la lecture qui revient le plus souvent dans les discussions Reddit : certains accusent Leclerc, d'autres défendent le fait qu'il n'avait accès ni aux chronos de Hamilton ni au plan complet. Le consensus raisonnable est que Ferrari aurait dû donner une consigne nette, plutôt que laisser les pilotes interpréter une situation différente depuis leur cockpit. <a href="https://www.reddit.com/r/formula1/comments/1vw9nnh/2026_dutch_grand_prix_postrace_discussion/?utm_source=chatgpt.com" data-desc="Débat de la communauté r/formula1 après la course.">Discussion d'après-course Reddit</a></p>
      </div>
    </section>

    <section class="block" data-num="04" id="sec-r4">
      <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
        <p>L'évaluation porte sur le Grand Prix du dimanche, en tenant compte de la voiture, de la position de départ et des circonstances.</p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table class="verdict-table">
          <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
          <tbody><tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Lando Norris</td><td class="pos">1 → 1<span class="delta neutral">=</span></td><td>La référence. Perd la tête à la reprise, ne panique pas, préserve suffisamment ses pneus, hausse le rythme en durs et réussit l'attaque décisive sur Antonelli. La stratégie crée l'occasion ; son dépassement la convertit.</td></tr><tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Kimi Antonelli</td><td class="pos">3 → 2<span class="delta good">+1</span></td><td>Deux départs remarquables et une première moitié de course très maîtrisée. Il a réellement mis Norris sous pression. Moins à l'aise avec le deuxième train de durs et légèrement hésitant derrière Hamilton, mais P2 représente le maximum une fois Norris passé.</td></tr><tr><td class="driver"><span class="dot" style="background:#00A19B"></span>George Russell</td><td class="pos">2 → 3<span class="delta bad">-1</span></td><td>Départs décevants : battu par Antonelli puis Piastri. Il récupère P3 grâce à l'arrêt lent de McLaren, puis réalise une fin de course de très haut niveau pour résister aux Ferrari. Son podium est mérité, même s'il a été aidé par le dernier VSC.</td></tr><tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Lewis Hamilton</td><td class="pos">5 → 4<span class="delta good">+1</span></td><td>Course très solide et probablement le meilleur rythme Ferrari sur la durée. Il dépasse Piastri, revient sur Leclerc puis sur Russell. Le podium était possible, sans être garanti. Sa frustration est fondée ; son sarcasme radio, moins utile.</td></tr><tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Charles Leclerc</td><td class="pos">6 → 5<span class="delta good">+1</span></td><td>Très agressif et précis dans ses dépassements, notamment sur Piastri. Rythme proche de Hamilton et bonne gestion. Mais sa prolongation d'un tour complique la course de son équipier et son propre deuxième arrêt lent condamne pratiquement le podium.</td></tr><tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Oscar Piastri</td><td class="pos">4 → 6<span class="delta bad">-2</span></td><td>Excellent dépassement sur Russell à la reprise, puis course en chute libre. L'arrêt lent lui coûte P3, mais n'explique pas les sept dixièmes au tour perdus face à Norris sur un relais comparable. La principale interrogation technique du week-end.</td></tr><tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Liam Lawson</td><td class="pos">8 → 7<span class="delta good">+1</span></td><td>Très bonne adaptation à une Red Bull difficile, en remplacement d'Hadjar. Proche de Verstappen en qualification et meilleur des autres en course. La pénalité pour ralentissement insuffisant sous drapeau jaune ternit légèrement la prestation.</td></tr><tr><td class="driver"><span class="dot" style="background:#B01030"></span>Nico Hülkenberg</td><td class="pos">13 → 8<span class="delta good">+5</span></td><td>L'une des courses du jour : réaction spectaculaire pour éviter Bortoleto, dépassements propres et rythme clairement supérieur au reste du milieu de grille. P8 sans bénéficier seulement des abandons.</td></tr><tr><td class="driver"><span class="dot" style="background:#229971"></span>Fernando Alonso</td><td class="pos">18 → 9<span class="delta good">+9</span></td><td>Performance exceptionnelle. Les tendres tenus 32 tours après la reprise, puis 37 tours en durs jusqu'à l'arrivée. Gestion, rythme en air libre et défense sur Gasly : pilote et équipe ont transformé une voiture de fond de grille en points.</td></tr><tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Pierre Gasly</td><td class="pos">11 → 10<span class="delta good">+1</span></td><td>Très bons départs, évite Verstappen et se maintient constamment dans la bataille des points. Plusieurs combats réussis, mais impossible de passer Alonso malgré une longue pression. Il valide les progrès du nouveau package Alpine.</td></tr><tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Yuki Tsunoda</td><td class="pos">12 → 11<span class="delta good">+1</span></td><td>Prestation très honorable pour un remplacement ponctuel chez Racing Bulls. Quelques beaux dépassements et un rythme compétitif, mais une sortie de piste et une stratégie à trois arrêts moins efficace que celle d'Alonso lui coûtent le point.</td></tr><tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Arvid Lindblad</td><td class="pos">10 → 12<span class="delta bad">-2</span></td><td>Son drive-through pour dépassement sous drapeaux jaunes détruit sa course. Ensuite, son rythme et ses dépassements sont bons, et il joue collectivement en retenant Gasly pour aider Tsunoda. Trop grosse erreur initiale pour espérer mieux.</td></tr><tr><td class="driver"><span class="dot" style="background:#B01030"></span>Gabriel Bortoleto</td><td class="pos">9 → 13<span class="delta bad">-4</span></td><td>Mauvais envol puis tête-à-queue très dangereux, heureusement sans contact. Il remonte de la 18e à la 13e place, mais Hülkenberg démontre que l'Audi avait le rythme pour marquer. Occasion manquée.</td></tr><tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Franco Colapinto</td><td class="pos">14 → 14<span class="delta neutral">=</span></td><td>Départ impressionnant avec quatre places gagnées, immédiatement annulé par un dépassement sous drapeaux jaunes et un drive-through. Deuxième pénalité en fin de course. Du potentiel, mais une gestion des neutralisations insuffisante.</td></tr><tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Sergio Pérez</td><td class="pos">PL → 15<span class="delta neutral">stands</span></td><td>Modification du réglage et départ des stands plutôt logique vu le manque de performance initial. Il réussit l'overcut sur Bottas et termine, mais reste très loin des points. VSC défavorable.</td></tr><tr><td class="driver"><span class="dot" style="background:#00A3E0"></span>Carlos Sainz</td><td class="pos">17 → 16<span class="delta good">+1</span></td><td>Long premier relais intéressant et passage provisoire dans le top 10, mais la stratégie le laisse avec des durs très usés. Son blocage au virage 1 et l'accrochage avec Albon restent néanmoins de sa responsabilité.</td></tr><tr><td class="driver"><span class="dot" style="background:#00A3E0"></span>Alex Albon</td><td class="pos">16 → DNF<span class="delta dnf">DNF</span></td><td>Rythme correct en air libre, mais Williams le fait rentrer trop tôt pour couvrir un undercut, le renvoyant dans le trafic et les drapeaux bleus. Sa course se termine à cause de l'erreur de Sainz.</td></tr><tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Valtteri Bottas</td><td class="pos">21 → DNF<span class="delta dnf">DNF</span></td><td>Course plutôt anonyme dans le fond de grille avant un problème hydraulique affectant l'aileron arrière. Difficile de juger son pilotage, mais Cadillac manquait de rythme.</td></tr><tr><td class="driver"><span class="dot" style="background:#9AA0AC"></span>Esteban Ocon</td><td class="pos">15 → DNF<span class="delta dnf">DNF</span></td><td>Jamais réellement dans la bataille des points. Ses arrêts sont bien exécutés, mais sa Haas n'a pas le rythme avant la panne supposée du groupe propulseur.</td></tr><tr><td class="driver"><span class="dot" style="background:#229971"></span>Lance Stroll</td><td class="pos">19 → DNF<span class="delta dnf">DNF</span></td><td>Dommages ou problème de comportement dès le début, glisse importante et absence de rythme. L'abandon est compréhensible, mais le contraste avec la remontée d'Alonso est très défavorable.</td></tr><tr><td class="driver"><span class="dot" style="background:#9AA0AC"></span>Oliver Bearman</td><td class="pos">20 → DNF<span class="delta dnf">DNF</span></td><td>Impossible à évaluer : extinction complète de la voiture pendant le tour de formation précédant la reprise.</td></tr><tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Max Verstappen</td><td class="pos">7 → DNF<span class="delta dnf">DNF</span></td><td>Week-end déjà faible en performance pure, puis premier tour trop agressif sur une piste encore piégeuse. La marge était minuscule, mais l'erreur est bien la sienne. Rare contre-performance nette du pilote.</td></tr></tbody>
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
          <tbody><tr><td class="driver"><span class="dot" style="background:#FF8000"></span>McLaren</td><td>Excellente lecture avec Norris : prolongation décisive, confiance dans le dur, pas d'arrêt réflexe sous le VSC. Beaucoup moins propre avec Piastri : arrêt lent et mauvaise compréhension de son manque de rythme. Victoire brillante, mais résultat global inférieur au potentiel des deux voitures.</td></tr><tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Mercedes</td><td>Double podium maximisé. Arrêt anticipé défensif logique, bon usage du VSC, décision cohérente de laisser Russell dehors et ordre d'équipe rationnel. L'exécution du swap pouvait être plus fluide. La victoire est perdue principalement sur le rythme en durs, pas au muret.</td></tr><tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Ferrari</td><td>Voiture probablement capable d'un podium. Le décalage stratégique initial était pertinent, mais communication imprécise, lenteur de décision, arrêt lent de Leclerc et absence de consigne claire entre les pilotes. P4-P5 est correct comptablement, décevant au regard du rythme.</td></tr><tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Red Bull</td><td>Week-end très préoccupant en performance. Aucun choix stratégique ne pouvait remettre Verstappen dans la bataille des trois meilleures équipes. Lawson sauve six points avec une voiture qu'il découvrait.</td></tr><tr><td class="driver"><span class="dot" style="background:#B01030"></span>Audi</td><td>Très bonne course côté Hülkenberg : choix propres, arrêts rapides, voiture compétitive. La stratégie permet aussi à Bortoleto de récupérer plusieurs positions, mais son premier tour a rendu les points presque impossibles.</td></tr><tr><td class="driver"><span class="dot" style="background:#229971"></span>Aston Martin</td><td>Peut-être la meilleure stratégie du milieu de grille. L'équipe transforme avec Alonso un plan initial à deux arrêts en un seul arrêt effectif après le drapeau rouge. Très bonne adaptation. Le problème de Stroll empêche un bilan complet.</td></tr><tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Alpine</td><td>Le package évolué de Gasly semble fonctionner. Stratégie suffisamment solide pour conserver le dernier point, mais aucune solution pour dépasser Alonso. Les pénalités de Colapinto relèvent surtout du pilote.</td></tr><tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Racing Bulls</td><td>Bonne coopération entre les voitures, Lindblad ralentissant Gasly pour aider Tsunoda. Mais la stratégie à trois arrêts de Tsunoda et son long dernier relais en tendres ne battent pas le plan plus simple d'Alonso. Occasion de points manquée.</td></tr><tr><td class="driver"><span class="dot" style="background:#00A3E0"></span>Williams</td><td>Mauvais dimanche. Arrêt trop précoce d'Albon, Sainz laissé sur des pneus très usés et, finalement, collision entre les deux voitures. Même avec une monoplace faible, l'équipe aurait dû ramener les deux autos à l'arrivée.</td></tr><tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Cadillac</td><td>Le départ des stands de Pérez était logique pour chercher un meilleur réglage. L'overcut interne fonctionne, mais le rythme reste insuffisant et la panne hydraulique de Bottas confirme un problème de fiabilité.</td></tr><tr><td class="driver"><span class="dot" style="background:#9AA0AC"></span>Haas</td><td>Double abandon lié vraisemblablement au groupe propulseur. Les arrêts sont rapides, dont le meilleur de la saison pour Ocon, mais le rythme ne permettait de toute façon pas de viser les points.</td></tr></tbody>
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
              <li><strong>Norris</strong>, pour la qualité de son pilotage et son opportunisme.</li>
              <li><strong>McLaren</strong>, pour avoir accepté de perdre momentanément la position afin de construire une attaque.</li>
              <li><strong>Mercedes</strong>, paradoxalement, pour avoir transformé une voiture finalement moins rapide en double podium.</li>
              <li><strong>Hülkenberg et Alonso</strong>, auteurs des deux meilleures prestations du milieu de grille.</li>
            </ul>
          </div>
          <div class="verdictcol lose">
            <h4>Perdants</h4>
            <ul>
              <li><strong>Verstappen</strong>, sur une rare faute personnelle.</li>
              <li><strong>Piastri</strong>, entre arrêt lent et inexplicable déficit de rythme.</li>
              <li><strong>Ferrari</strong>, qui disposait du rythme mais n'a pas su coordonner ses deux stratégies.</li>
              <li><strong>Williams</strong>, dont les décisions et l'accrochage final ont transformé une course difficile en très mauvais résultat.</li>
            </ul>
          </div>
        </div>
        <div class="callout">Mercedes a dirigé la première moitié, McLaren a compris la seconde, Norris a exécuté le dépassement décisif, et Ferrari a démontré qu'avoir deux voitures rapides ne suffit pas lorsque la communication du muret reste hésitante.</div>
      </div>
    </section>

    <section class="block" id="sec-r-next">
      <div class="prose">
        <h2 class="sectitle">Enseignements pour la suite</h2>
        <p>Trois points issus de Zandvoort à surveiller au prochain rendez-vous :</p>
        <ol style="padding-left:20px; margin:0 0 16px;">
          <li style="margin-bottom:10px;">La gestion de <strong>Piastri</strong> reste la vraie zone d'ombre chez <strong>McLaren</strong> : sept dixièmes perdus face à <strong>Norris</strong> sur un relais comparable, sans explication pneus ni stratégie suffisante. Si ça se reproduit, la question ne sera plus circonstancielle.</li>
          <li style="margin-bottom:10px;"><strong>Mercedes</strong> a gagné son double podium en résistant, pas en attaquant — beaucoup doit au VSC et à l'usure de <strong>Norris</strong> en fin de relais. Sur un circuit qui, sur le papier, avantage plus nettement la W17, on saura si l'équipe peut refaire ça en primant l'attaque plutôt que la défense.</li>
          <li><strong>Ferrari</strong> a le rythme mais pas la coordination : Vasseur devra clarifier ses consignes s'il veut éviter un nouveau Hamilton-Leclerc raté, surtout si le nouveau moteur change la donne.</li>
        </ol>
        <a class="bridge-btn" href="/courses/13" style="text-decoration:none; display:inline-block;">Lire la pré-analyse du prochain GP →</a>
      </div>
    </section>

    <section class="block" id="sec-r7">
      <details class="sources">
        <summary>Sources utilisées — GP des Pays-Bas (17 liens)</summary>
        <div class="srcgroup">
          <h5>Résultats et chronologie officielle</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/race-result?utm_source=chatgpt.com" data-desc="Classement, écarts, abandons, tours.">Résultat complet du Grand Prix</a><span class="desc">Formula1.com — classement, écarts, abandons, tours.</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/norris-wins-dramatic-dutch-grand-prix-from-antonelli-and-russell-as-verstappen-crashes-out.Zn7iYevVGp5eHzFkTEAz7?utm_source=chatgpt.com" data-desc="Compte rendu officiel de la victoire de Norris.">Compte rendu officiel : victoire de Norris</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/zandvoort-lowdown-all-the-key-moments-as-norris-wins-again-and-verstappen-suffers-dramatic-home-exit.7ixG14EpkWpHk28GCH7lKC?utm_source=chatgpt.com" data-desc="Chronologie détaillée des faits marquants du week-end.">Les moments clés du GP de Zandvoort</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/starting-grid?utm_source=chatgpt.com" data-desc="Position initiale des pilotes et comparaison avec le résultat final.">Grille de départ officielle</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/norris-denies-russell-pole-position-in-gripping-conclusion-to-qualifying-for-dutch-grand-prix.2DoHZDC14R5tY7ygGaHCz?utm_source=chatgpt.com" data-desc="Analyse de la hiérarchie sur un tour.">Qualifications : Norris bat Russell et Antonelli</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/russell-surges-to-victory-in-zandvoort-sprint-ahead-of-leclerc-and-norris.3evWfVZ0yONnfGGp3t8qyK?utm_source=chatgpt.com" data-desc="Comparaison entre la McLaren du samedi et celle du dimanche.">Sprint : victoire de Russell</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/fastest-laps?utm_source=chatgpt.com" data-desc="Potentiel des pilotes en fin de relais et avec pneus frais.">Classement des meilleurs tours</a><span class="desc">Formula1.com</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Pneus et stratégies</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/latest/article/strategy-guide-what-are-the-tactical-options-for-the-dutch-gp.5ULIIHI3zCCKimgPoyhkIE?utm_source=chatgpt.com" data-desc="Options théoriques, undercut, allocations disponibles.">Guide stratégique avant la course</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://press.pirelli.com/in-the-netherlands-with-the-sprint-format/?utm_source=chatgpt.com" data-desc="Contraintes verticales et latérales imposées aux pneus.">Présentation Pirelli du week-end</a><span class="desc">Pirelli Press</span></li>
            <li><a href="https://press.pirelli.com/sixty-pit-stops-in-norriss-winning-farewell-at-zandvoort/?utm_source=chatgpt.com" data-desc="Séquences de pneus réellement utilisées en course.">Soixante arrêts à Zandvoort</a><span class="desc">Pirelli Press</span></li>
            <li><a href="https://press.pirelli.com/norris-to-start-from-the-front-at-zandvoort-all-three-compounds-in-play-for-the-race/?utm_source=chatgpt.com" data-desc="Confirmation que les trois gommes étaient utilisables.">Analyse Pirelli après les qualifications</a><span class="desc">Pirelli Press</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Évolutions techniques &amp; réactions</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/latest/article/mclaren-and-ferrari-lead-development-charge-as-every-upgrade-for-dutch-grand-prix-revealed.7HfMGggTffSH6eS3lF6Wgu?utm_source=chatgpt.com" data-desc="Plancher Ferrari, aileron McLaren, package Alpine et plus.">Toutes les évolutions apportées à Zandvoort</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/what-the-teams-said-race-day-in-the-netherlands-2026.1GTy1x6hObFlkGkaXKqhNS?utm_source=chatgpt.com" data-desc="Distinguer ce qui vient de la voiture, du pilote ou de la stratégie.">Ce qu'ont déclaré les équipes après la course</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/how-alonso-used-a-unique-strategy-to-earn-p9-for-aston-martin-in-zandvoort.1PYIzmhBjiY5oR3psn9Sy1?utm_source=chatgpt.com" data-desc="Comment il est revenu dans les points malgré une voiture peu compétitive.">La stratégie particulière d'Alonso</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/power-rankings-who-impressed-our-judges-at-the-dutch-grand-prix.1N5AMVHclBpJYoXXOdmUFK?utm_source=chatgpt.com" data-desc="Regard éditorial complémentaire, pas un classement objectif.">Power Rankings du GP</a><span class="desc">Formula1.com — regard éditorial complémentaire</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/you-want-to-fight-for-every-single-position-russell-offers-verdict-on-mercedes-team-orders-in-dutch-gp.3qBtPSF2Jgfyu63IKV8our?utm_source=chatgpt.com" data-desc="L'inversion Russell–Antonelli et ses conséquences.">Russell explique les consignes Mercedes</a><span class="desc">Formula1.com</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Presse généraliste &amp; communauté</h5>
          <ul>
            <li><a href="https://www.reuters.com/sports/formula1/norris-wins-dutch-gp-complete-mclaren-hat-trick-2026-08-23/?utm_source=chatgpt.com" data-desc="Vérification indépendante du déroulement et du contexte.">Compte rendu Reuters</a><span class="desc">Reuters — vérification indépendante</span></li>
            <li><a href="https://www.reuters.com/sports/formula1/mercedes-no-longer-have-fastest-car-f1-says-antonelli-2026-08-24/?utm_source=chatgpt.com" data-desc="Déclarations d'Antonelli et de Norris sur les forces relatives des deux voitures.">Antonelli : « Mercedes n'a plus la voiture la plus rapide »</a><span class="desc">Reuters</span></li>
            <li><a href="https://www.reddit.com/r/formula1/comments/1vw9nnh/2026_dutch_grand_prix_postrace_discussion/?utm_source=chatgpt.com" data-desc="Perceptions communautaires, jamais utilisées comme preuve technique.">Discussion d'après-course</a><span class="desc">r/formula1 — perceptions communautaires, jamais une preuve technique</span></li>
          </ul>
        </div>
      </details>
    </section>
`;
