// Contenu de la page, porté tel quel depuis la maquette validée (The Pit Wall).
export const PAGE_BODY_HTML = `
<header class="masthead">
  <div class="masthead-inner">
    <div class="wordmark">The <span>Pit</span> Wall</div>
    <nav class="tabs" role="tablist" aria-label="Sections">
      <button class="tabbtn" role="tab" id="tab-race" aria-selected="true" aria-controls="view-race">Dernière course</button>
      <button class="tabbtn" role="tab" id="tab-preview" aria-selected="false" aria-controls="view-preview">Prochain GP</button>
      <a class="tabbtn" href="/courses" style="text-decoration:none; display:inline-flex; align-items:center;">Toutes les courses</a>
    </nav>
    <button class="langtoggle" id="langtoggle" type="button" aria-label="Passer en anglais">
      <svg class="wheel-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3.5" y="7" width="17" height="12.5" rx="5"/>
        <path d="M8.5 7 Q12 3 15.5 7"/>
        <circle cx="12" cy="13.5" r="1.7"/>
        <path d="M12 13.5 L6.5 17"/>
        <path d="M12 13.5 L17.5 17"/>
        <circle cx="7" cy="11.5" r="0.9" fill="currentColor" stroke="none"/>
        <circle cx="17" cy="11.5" r="0.9" fill="currentColor" stroke="none"/>
      </svg>
      <span class="langlabel" id="langlabel">FR</span>
    </button>
    <div class="clock mono" id="readclock">≈ 0 min de lecture</div>
  </div>
  <nav class="toc" id="toc-race" aria-label="Sommaire — dernière course">
    <a class="tocitem" href="#sec-r1" data-target="sec-r1">01 Contexte</a>
    <a class="tocitem" href="#sec-r2" data-target="sec-r2">02 Course</a>
    <a class="tocitem" href="#sec-r3" data-target="sec-r3">03 Stratégie</a>
    <a class="tocitem" href="#sec-r4" data-target="sec-r4">04 Pilotes</a>
    <a class="tocitem" href="#sec-r5" data-target="sec-r5">05 Écuries</a>
    <a class="tocitem" href="#sec-r6" data-target="sec-r6">Verdict</a>
    <a class="tocitem" href="#sec-r-next" data-target="sec-r-next">À suivre</a>
    <a class="tocitem" href="#sec-r7" data-target="sec-r7">Sources</a>
  </nav>
  <nav class="toc hidden" id="toc-preview" aria-label="Sommaire — prochain GP">
    <a class="tocitem" href="#sec-p1" data-target="sec-p1">01 Différences</a>
    <a class="tocitem" href="#sec-p2" data-target="sec-p2">02 Nouveautés</a>
    <a class="tocitem" href="#sec-p3" data-target="sec-p3">03 Équipes</a>
    <a class="tocitem" href="#sec-p4" data-target="sec-p4">04 Milieu</a>
    <a class="tocitem" href="#sec-p5" data-target="sec-p5">05 Stratégie</a>
    <a class="tocitem" href="#sec-p6" data-target="sec-p6">06 Hiérarchie</a>
    <a class="tocitem" href="#sec-p7" data-target="sec-p7">Verdict</a>
    <a class="tocitem" href="#sec-p8" data-target="sec-p8">Sources</a>
  </nav>
  <nav class="toc hidden" id="toc-race-en" aria-label="Contents — last race">
    <a class="tocitem" href="#sec-r1-en" data-target="sec-r1-en">01 Context</a>
    <a class="tocitem" href="#sec-r2-en" data-target="sec-r2-en">02 Race</a>
    <a class="tocitem" href="#sec-r3-en" data-target="sec-r3-en">03 Strategy</a>
    <a class="tocitem" href="#sec-r4-en" data-target="sec-r4-en">04 Drivers</a>
    <a class="tocitem" href="#sec-r5-en" data-target="sec-r5-en">05 Teams</a>
    <a class="tocitem" href="#sec-r6-en" data-target="sec-r6-en">Verdict</a>
    <a class="tocitem" href="#sec-r-next-en" data-target="sec-r-next-en">Next up</a>
    <a class="tocitem" href="#sec-r7-en" data-target="sec-r7-en">Sources</a>
  </nav>
  <nav class="toc hidden" id="toc-preview-en" aria-label="Contents — next GP">
    <a class="tocitem" href="#sec-p1-en" data-target="sec-p1-en">01 Differences</a>
    <a class="tocitem" href="#sec-p2-en" data-target="sec-p2-en">02 Developments</a>
    <a class="tocitem" href="#sec-p3-en" data-target="sec-p3-en">03 Teams</a>
    <a class="tocitem" href="#sec-p4-en" data-target="sec-p4-en">04 Midfield</a>
    <a class="tocitem" href="#sec-p5-en" data-target="sec-p5-en">05 Strategy</a>
    <a class="tocitem" href="#sec-p6-en" data-target="sec-p6-en">06 Hierarchy</a>
    <a class="tocitem" href="#sec-p7-en" data-target="sec-p7-en">Verdict</a>
    <a class="tocitem" href="#sec-p8-en" data-target="sec-p8-en">Sources</a>
  </nav>
</header>

<main>

  <!-- ===================== VUE 1 : DERNIÈRE COURSE ===================== -->
  <section id="view-race" class="view" role="tabpanel" aria-labelledby="tab-race">

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

    <section class="block reveal" data-num="01" id="sec-r1">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> Le contexte avant la course</h2>
        <p>Zandvoort est un circuit étroit, sinueux, où dépasser reste difficile. La position en piste pèse donc très lourd. Norris partait en pole devant Russell, Antonelli, Piastri, Hamilton, Leclerc, Verstappen et Lawson. Alonso n'était que 18e, Bottas 21e et Pérez devait partir des stands après des modifications sous parc fermé. <a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/starting-grid?utm_source=chatgpt.com" data-desc="Grille de départ officielle du GP des Pays-Bas 2026.">Grille officielle</a></p>
        <p>Le Sprint avait donné l'impression d'une dégradation relativement faible : Russell l'avait gagné et Leclerc avait même fait durer les tendres pendant 24 tours. Mais la pluie tombée avant le Grand Prix a nettoyé la piste et modifié son adhérence. Pirelli estime que cette piste « remise à zéro », plus glissante et plus chaude qu'au Sprint, a fortement augmenté l'usure. Le scénario attendu à un arrêt a pratiquement disparu après la reprise.</p>
        <p>Cela explique l'extraordinaire diversité stratégique : 60 passages aux stands, une dizaine de stratégies différentes, et aucun des dix premiers avec exactement la même séquence de pneus. <a href="https://press.pirelli.com/sixty-pit-stops-in-norriss-winning-farewell-at-zandvoort/?utm_source=chatgpt.com" data-desc="Pirelli détaille les 60 arrêts et la diversité stratégique de la course.">Analyse officielle Pirelli</a></p>
      </div>
    </section>

    <section class="block reveal" data-num="02" id="sec-r2">
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

    <section class="block reveal" data-num="03" id="sec-r3">
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

    <section class="block reveal" data-num="04" id="sec-r4">
      <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
        <p>L'évaluation porte sur le Grand Prix du dimanche, en tenant compte de la voiture, de la position de départ et des circonstances.</p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
          <tbody id="driver-table"></tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
    </section>

    <section class="block reveal" data-num="05" id="sec-r5">
      <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">05</span> Bilan équipe par équipe</h2>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th style="width:140px;">Équipe</th><th>Bilan stratégique et opérationnel</th></tr></thead>
          <tbody id="team-table"></tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
    </section>

    <section class="block reveal" id="sec-r6">
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

    <section class="block reveal" id="sec-r-next">
      <div class="prose">
        <h2 class="sectitle">Enseignements pour la suite</h2>
        <p>Trois points issus de Zandvoort à surveiller au prochain rendez-vous :</p>
        <ol style="padding-left:20px; margin:0 0 16px;">
          <li style="margin-bottom:10px;">La gestion de <strong>Piastri</strong> reste la vraie zone d'ombre chez <strong>McLaren</strong> : sept dixièmes perdus face à <strong>Norris</strong> sur un relais comparable, sans explication pneus ni stratégie suffisante. Si ça se reproduit, la question ne sera plus circonstancielle.</li>
          <li style="margin-bottom:10px;"><strong>Mercedes</strong> a gagné son double podium en résistant, pas en attaquant — beaucoup doit au VSC et à l'usure de <strong>Norris</strong> en fin de relais. Sur un circuit qui, sur le papier, avantage plus nettement la W17, on saura si l'équipe peut refaire ça en primant l'attaque plutôt que la défense.</li>
          <li><strong>Ferrari</strong> a le rythme mais pas la coordination : Vasseur devra clarifier ses consignes s'il veut éviter un nouveau Hamilton-Leclerc raté, surtout si le nouveau moteur change la donne.</li>
        </ol>
        <button type="button" class="bridge-btn" id="bridge-to-preview">Lire la pré-analyse du prochain GP →</button>
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

  </section>

  <!-- ===================== VIEW 1 (EN) : LAST RACE ===================== -->
  <section id="view-race-en" class="view hidden" role="tabpanel" aria-labelledby="tab-race" lang="en">

    <div class="hero prose">
      <p class="eyebrow">Dutch Grand Prix · Zandvoort · 2026</p>
      <p class="verdict">Norris and McLaren won a race that <em>Mercedes</em> had first taken control of.</p>
      <div class="resultstrip">
        <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren</span></div>
        <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · +11.536s</span></div>
        <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes · +0.849s over Hamilton</span></div>
        <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari</span></div>
        <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari</span></div>
      </div>
      <p class="subverdict">This isn't a victory handed out by the VSC, nor a huge Mercedes strategic error. McLaren mainly created a tyre-age gap by extending Norris's final stint, and Norris then made perfect use of that window. Behind them, Mercedes maximised its points. Ferrari probably had the pace to reach the podium, but not the execution quality needed.</p>
    </div>

    <section class="block reveal" data-num="01" id="sec-r1-en">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> The build-up to the race</h2>
        <p>Zandvoort is a narrow, twisty circuit where overtaking stays difficult. Track position therefore carries huge weight. Norris started on pole ahead of Russell, Antonelli, Piastri, Hamilton, Leclerc, Verstappen and Lawson. Alonso was only 18th, Bottas 21st, and Pérez had to start from the pit lane after changes made under parc fermé. <a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/starting-grid?utm_source=chatgpt.com" data-desc="Official starting grid for the 2026 Dutch Grand Prix.">Official grid</a></p>
        <p>The Sprint had given the impression of relatively low degradation: Russell had won it, and Leclerc had even made the softs last 24 laps. But rain that fell before the Grand Prix washed the track and changed its grip. Pirelli estimates that this "reset" track, slicker and hotter than during the Sprint, sharply increased wear. The expected one-stop scenario had all but disappeared by the restart.</p>
        <p>That explains the extraordinary strategic diversity: 60 pit visits, around ten different strategies, and none of the top ten running the exact same tyre sequence. <a href="https://press.pirelli.com/sixty-pit-stops-in-norriss-winning-farewell-at-zandvoort/?utm_source=chatgpt.com" data-desc="Pirelli details the 60 stops and the strategic diversity of the race.">Official Pirelli analysis</a></p>
      </div>
    </section>

    <section class="block reveal" data-num="02" id="sec-r2-en">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> How the race unfolded</h2>

        <h3 class="subtitle">Initial start: Antonelli pounces, Verstappen cracks</h3>
        <p>Almost everyone starts on slicks despite the still-damp patches. The top four choose mediums; a large part of the field goes for softs.</p>
        <p>Norris keeps the lead, but Antonelli immediately takes second from Russell. Leclerc passes Piastri. Behind them, Verstappen finds himself in a scrappy sequence with Hamilton and Lawson. At the final corner, he puts the car onto a still-damp patch and over the white lines, loses the rear and slams into the wall.</p>
        <p>It's a driving error, even if the circumstances are genuinely treacherous: slicks, an unevenly dry track, traffic and low grip. The red flag is unavoidable.</p>
        <p>At the same moment, Bortoleto spins at the same spot. Hülkenberg narrowly avoids his teammate in the smoke.</p>

        <h3 class="subtitle">Restart: tyre choices rebuild the race</h3>
        <p>During the stoppage: Norris switches from mediums to softs; Antonelli and Russell keep their mediums; Piastri opts for hards, initially thinking he could go very long; the Ferraris go back out on softs; Alonso also fits fresh softs.</p>
        <p>Even before the restart, Bearman breaks down on the formation lap.</p>
        <p>At the second start, Antonelli gets an excellent launch and takes the lead from Norris. Piastri, very incisive, passes Russell and slots into third.</p>
        <p>In the first stint, Antonelli controls Norris. He manages to hold the gap around 1 to 1.5 seconds, often denying the McLaren its Overtake Mode. Norris complains about a lack of pace and balance on the softs. At this point, the Mercedes genuinely looks like the fastest car at the front.</p>

        <h3 class="subtitle">First pit-stop cycle: Russell recovers P3, Piastri's race unravels</h3>
        <p>Russell stops on lap 17 for hards. Piastri responds a lap later, but his pit-lane time costs him roughly 2.3 seconds more than Russell's: 20.267 seconds against 18.010. That difference is enough to swap their positions. <a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/race-result?utm_source=chatgpt.com" data-desc="Official race results, times and gaps.">Official stop summary</a></p>
        <p>Antonelli and Norris stop together around laps 21-22, also for hards. Leclerc fits mediums, Hamilton extends to laps 25-26 before switching to hards.</p>
        <p>From here, the shape of the race changes: Norris's McLaren works much better on hards; Antonelli increasingly starts to suffer from the rear end; the Ferraris look very fast; Piastri never finds a pace comparable to Norris's.</p>
        <p>Leclerc, then Hamilton, pass Piastri. By mid-race, the Australian, who had been third after the restart, has dropped to sixth.</p>

        <h3 class="subtitle">The decisive moment: Mercedes covers, McLaren extends</h3>
        <p>Around lap 40, Norris closes to roughly seven tenths of Antonelli. Mercedes is in a difficult spot: if Antonelli stays out, Norris can stop and try the undercut; if Mercedes stops first, it keeps the position for now, but hands Norris fresher tyres late in the stint.</p>
        <p>Mercedes chooses to cover: Antonelli, then Russell, switch to hards on lap 40. McLaren leaves Norris out until laps 47-48.</p>
        <div class="callout">It's the winning call. Norris rejoins about five seconds behind Antonelli, but on hards seven laps fresher. He closes the gap very quickly. So this isn't a simple "overcut": McLaren first accepts losing track position in order to manufacture a tyre advantage big enough to pass on-track, even at Zandvoort.</div>
        <p>Long-run analysis confirms Norris and Antonelli were fairly close on overall pace, but that the main gaps were created by their respective pit windows. <span class="note">RaceOptiData analysis</span></p>

        <h3 class="subtitle">Hamilton the interim leader, and the moment Norris seizes perfectly</h3>
        <p>Hamilton, who has extended his stint, now leads ahead of Antonelli and Norris. His presence matters: Antonelli has Overtake Mode available thanks to his proximity to the Ferrari, and can use it to defend against Norris.</p>
        <p>But Antonelli hesitates in his move on Hamilton and loses some momentum. Norris attacks immediately around the outside of Turn 1 and takes second. He then passes Hamilton to reclaim the lead; Antonelli also gets by the Ferrari.</p>
        <p>This is probably the single most important piece of driving in the race. The strategy had brought Norris into range, but he still had to overtake. His outside move at Turn 1 is firm, clean and perfectly timed.</p>

        <h3 class="subtitle">The final VSC: Mercedes locks in rather than attacks</h3>
        <p>Ocon's retirement triggers a VSC. Antonelli, Hamilton, Leclerc and Piastri all stop for softs. Norris and Russell stay out.</p>
        <p>Norris wonders, too late, whether he should have stopped, but staying out turns out to be entirely viable. At the restart, he has roughly a 6.8-second lead over Russell, who is himself about 5.6 seconds ahead of Antonelli.</p>
        <p>Mercedes couldn't reasonably bring Russell in: he would likely have rejoined behind the Ferraris. Leaving him out was his only real shot at the podium.</p>
        <p>Antonelli closes rapidly on Russell thanks to his softs. Mercedes then orders the positions swapped. Russell complies, despite an initially annoyed reaction, then has to defend against Hamilton and Leclerc.</p>
        <p>That team order is defensible: Antonelli had been ahead of Russell before his VSC stop; he had much fresher tyres; letting the two Mercedes fight it out would have let the Ferraris close back in; Mercedes had already established that two drivers on different strategies shouldn't get in each other's way.</p>
        <p>The fair criticism is less about the principle than the execution: Russell loses roughly two seconds in the move and ends up badly exposed. A second, late VSC, triggered by debris after the Williams collision, interrupts Hamilton's charge at exactly the right moment. Russell holds onto the podium by 0.849 seconds. <a href="https://www.formula1.com/en/latest/article/you-want-to-fight-for-every-single-position-russell-offers-verdict-on-mercedes-team-orders-in-dutch-gp.3qBtPSF2Jgfyu63IKV8our?utm_source=chatgpt.com" data-desc="Russell discusses the Mercedes team orders after the race.">Explanation and debate around the Mercedes order</a></p>
        <p>Norris wins by 11.536 seconds over Antonelli. <a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/race-result?utm_source=chatgpt.com" data-desc="Final classification of the Dutch Grand Prix.">Full official classification</a></p>
      </div>
    </section>

    <section class="block reveal" data-num="03" id="sec-r3-en">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> The key strategic decisions</h2>

        <h3 class="subtitle">McLaren — patience over immediate position</h3>
        <p>The key decision is extending Norris after Antonelli's stop. Mercedes was forced into covering the undercut; McLaren understood the hard tyre worked better on the MCL40 and chose to set up an attack with a large age differential.</p>
        <p>The choice not to stop under the final VSC looks excellent in hindsight. Antonelli had softs, but still had to pass Russell, then close more than ten seconds. Norris still had enough pace left to control the gap.</p>
        <p>By contrast, Piastri's handling is far less convincing: the hard-tyre call at the restart, a slow stop, warm-up struggles, then a collapse in pace. Over comparable 24-lap hard-tyre stints, Norris was roughly seven tenths a lap faster. That's too much to be explained by the slow stop alone.</p>

        <h3 class="subtitle">Mercedes — not brilliant, but rational</h3>
        <p>Antonelli's early second stop handed the tyre advantage to Norris, but calling it a strategic mistake would be excessive. Norris was seven tenths back: not covering the undercut was equally risky.</p>
        <p>The VSC was then well used to shield Antonelli from the Ferraris. The position swap secured P2-P3. Mercedes lost the win to a lack of pace and stint life on the second set of hards, far more than to any major error on the pit wall.</p>

        <h3 class="subtitle">Ferrari — good idea, poor execution</h3>
        <p>Ferrari had sensibly split its strategies: Leclerc was meant to pressure Russell; Hamilton was meant to extend and benefit from fresher tyres.</p>
        <p>The problem arose when Hamilton, noticeably faster on his newer hards, caught up with Leclerc. Ferrari asks Leclerc to pit, but without clearly explaining that he also needs to let Hamilton through. Leclerc believes he can continue, extends by a lap, and Hamilton loses more than two seconds relative to Russell.</p>
        <p>The cost is concrete: Hamilton finishes 0.849 seconds off the podium. Lap-time analysis shows he was gaining two to six tenths a lap on Leclerc at that point. <a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/fastest-laps?utm_source=chatgpt.com" data-desc="Fastest laps classification for the race.">Lap-time analysis</a></p>
        <p>Responsibility is shared, but mostly collective: Leclerc could have followed the instruction to pit immediately; Ferrari should have stated the objective explicitly and, if necessary, ordered the swap; the team then added a slow stop for Leclerc; the final call to also put Leclerc back on softs under the VSC is debatable — staying out would have placed him higher, but with the risk of being attacked by Antonelli and Hamilton.</p>
        <p>Vasseur explained that Ferrari didn't want to publicly reveal its plan to extend Hamilton to the flag. That's tactically understandable, but the secrecy becomes counter-productive when it stops its own drivers from understanding the race. <a href="https://www.formula1.com/en/latest/article/what-the-teams-said-race-day-in-the-netherlands-2026.1GTy1x6hObFlkGkaXKqhNS?utm_source=chatgpt.com" data-desc="Team statements after the race, including Vasseur.">Vasseur's explanation</a></p>
        <p>This is also the reading that comes up most often in Reddit discussions: some blame Leclerc, others point out he had access to neither Hamilton's lap times nor the full plan. The reasonable consensus is that Ferrari should have given a clear instruction, rather than leaving the drivers to interpret a different picture from their own cockpits. <a href="https://www.reddit.com/r/formula1/comments/1vw9nnh/2026_dutch_grand_prix_postrace_discussion/?utm_source=chatgpt.com" data-desc="r/formula1 community debate after the race.">Post-race Reddit discussion</a></p>
      </div>
    </section>

    <section class="block reveal" data-num="04" id="sec-r4-en">
      <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">04</span> Driver by driver</h2>
        <p>This assessment covers Sunday's Grand Prix, weighing the car, starting position and circumstances.</p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th>Driver</th><th>Start → finish</th><th>Analysis</th></tr></thead>
          <tbody id="driver-table-en"></tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ swipe to see the rest of the table ▸</p>
    </section>

    <section class="block reveal" data-num="05" id="sec-r5-en">
      <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">05</span> Team by team</h2>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th style="width:140px;">Team</th><th>Strategic and operational assessment</th></tr></thead>
          <tbody id="team-table-en"></tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ swipe to see the rest of the table ▸</p>
    </section>

    <section class="block reveal" id="sec-r6-en">
      <div class="prose">
        <h2 class="sectitle">Conclusion</h2>
        <div class="verdictgrid">
          <div class="verdictcol win">
            <h4>Winners</h4>
            <ul>
              <li><strong>Norris</strong>, for the quality of his driving and his opportunism.</li>
              <li><strong>McLaren</strong>, for accepting to lose track position temporarily in order to build an attack.</li>
              <li><strong>Mercedes</strong>, paradoxically, for turning a car that was ultimately not the fastest into a double podium.</li>
              <li><strong>Hülkenberg and Alonso</strong>, the two standout drives of the midfield.</li>
            </ul>
          </div>
          <div class="verdictcol lose">
            <h4>Losers</h4>
            <ul>
              <li><strong>Verstappen</strong>, on a rare personal mistake.</li>
              <li><strong>Piastri</strong>, caught between a slow stop and an unexplained pace deficit.</li>
              <li><strong>Ferrari</strong>, which had the pace but couldn't coordinate its two strategies.</li>
              <li><strong>Williams</strong>, whose decisions and late collision turned a difficult race into a very poor result.</li>
            </ul>
          </div>
        </div>
        <div class="callout">Mercedes led the first half, McLaren understood the second, Norris executed the decisive overtake, and Ferrari showed that having two fast cars isn't enough when the pit wall's communication stays hesitant.</div>
      </div>
    </section>

    <section class="block reveal" id="sec-r-next-en">
      <div class="prose">
        <h2 class="sectitle">Lessons going forward</h2>
        <p>Three points from Zandvoort worth watching at the next round:</p>
        <ol style="padding-left:20px; margin:0 0 16px;">
          <li style="margin-bottom:10px;"><strong>Piastri</strong>'s management remains the real grey area at <strong>McLaren</strong>: seven tenths a lap lost to <strong>Norris</strong> on a comparable stint, with no sufficient explanation from tyres or strategy. If it happens again, this stops being circumstantial.</li>
          <li style="margin-bottom:10px;"><strong>Mercedes</strong> earned its double podium by defending, not attacking — a lot of that comes down to the VSC and <strong>Norris</strong>'s tyre wear late in the stint. On a circuit that, on paper, favours the W17 more clearly, we'll find out whether the team can do this again by leading on the attack rather than the defence.</li>
          <li><strong>Ferrari</strong> has the pace but not the coordination: Vasseur will need to sharpen his instructions if he wants to avoid another botched Hamilton-Leclerc situation, especially if the new engine changes the picture.</li>
        </ol>
        <button type="button" class="bridge-btn" id="bridge-to-preview-en">Read the next Grand Prix preview →</button>
      </div>
    </section>

    <section class="block" id="sec-r7-en">
      <details class="sources">
        <summary>Sources used — Dutch Grand Prix (17 links)</summary>
        <div class="srcgroup">
          <h5>Results and official timeline</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/race-result?utm_source=chatgpt.com" data-desc="Classification, gaps, retirements, laps.">Full race result</a><span class="desc">Formula1.com — classification, gaps, retirements, laps.</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/norris-wins-dramatic-dutch-grand-prix-from-antonelli-and-russell-as-verstappen-crashes-out.Zn7iYevVGp5eHzFkTEAz7?utm_source=chatgpt.com" data-desc="Official report on Norris's win.">Official report: Norris's win</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/zandvoort-lowdown-all-the-key-moments-as-norris-wins-again-and-verstappen-suffers-dramatic-home-exit.7ixG14EpkWpHk28GCH7lKC?utm_source=chatgpt.com" data-desc="Detailed timeline of the weekend's key moments.">The key moments of the Dutch GP</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/starting-grid?utm_source=chatgpt.com" data-desc="Starting positions compared with the final result.">Official starting grid</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/norris-denies-russell-pole-position-in-gripping-conclusion-to-qualifying-for-dutch-grand-prix.2DoHZDC14R5tY7ygGaHCz?utm_source=chatgpt.com" data-desc="Analysis of the one-lap pecking order.">Qualifying: Norris beats Russell and Antonelli</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/russell-surges-to-victory-in-zandvoort-sprint-ahead-of-leclerc-and-norris.3evWfVZ0yONnfGGp3t8qyK?utm_source=chatgpt.com" data-desc="Comparing Saturday's and Sunday's McLaren.">Sprint: Russell's win</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/fastest-laps?utm_source=chatgpt.com" data-desc="What drivers had left in hand on fresh tyres late on.">Fastest laps classification</a><span class="desc">Formula1.com</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Tyres and strategy</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/latest/article/strategy-guide-what-are-the-tactical-options-for-the-dutch-gp.5ULIIHI3zCCKimgPoyhkIE?utm_source=chatgpt.com" data-desc="Theoretical options, undercut, available allocations.">Pre-race strategy guide</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://press.pirelli.com/in-the-netherlands-with-the-sprint-format/?utm_source=chatgpt.com" data-desc="Vertical and lateral loads placed on the tyres.">Pirelli's weekend preview</a><span class="desc">Pirelli Press</span></li>
            <li><a href="https://press.pirelli.com/sixty-pit-stops-in-norriss-winning-farewell-at-zandvoort/?utm_source=chatgpt.com" data-desc="Tyre sequences actually used in the race.">Sixty pit stops at Zandvoort</a><span class="desc">Pirelli Press</span></li>
            <li><a href="https://press.pirelli.com/norris-to-start-from-the-front-at-zandvoort-all-three-compounds-in-play-for-the-race/?utm_source=chatgpt.com" data-desc="Confirmation all three compounds were usable.">Pirelli's post-qualifying analysis</a><span class="desc">Pirelli Press</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Technical development &amp; reactions</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/latest/article/mclaren-and-ferrari-lead-development-charge-as-every-upgrade-for-dutch-grand-prix-revealed.7HfMGggTffSH6eS3lF6Wgu?utm_source=chatgpt.com" data-desc="Ferrari floor, McLaren rear wing, Alpine package and more.">Every upgrade brought to Zandvoort</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/what-the-teams-said-race-day-in-the-netherlands-2026.1GTy1x6hObFlkGkaXKqhNS?utm_source=chatgpt.com" data-desc="Separating what came from the car, the driver, or the strategy.">What the teams said after the race</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/how-alonso-used-a-unique-strategy-to-earn-p9-for-aston-martin-in-zandvoort.1PYIzmhBjiY5oR3psn9Sy1?utm_source=chatgpt.com" data-desc="How he returned to the points despite a weekend of low pace.">Alonso's unusual strategy</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/power-rankings-who-impressed-our-judges-at-the-dutch-grand-prix.1N5AMVHclBpJYoXXOdmUFK?utm_source=chatgpt.com" data-desc="A supplementary editorial view, not an objective ranking.">Power Rankings from the Dutch GP</a><span class="desc">Formula1.com — supplementary editorial take</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/you-want-to-fight-for-every-single-position-russell-offers-verdict-on-mercedes-team-orders-in-dutch-gp.3qBtPSF2Jgfyu63IKV8our?utm_source=chatgpt.com" data-desc="The Russell–Antonelli swap and its consequences.">Russell explains the Mercedes orders</a><span class="desc">Formula1.com</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>General press &amp; community</h5>
          <ul>
            <li><a href="https://www.reuters.com/sports/formula1/norris-wins-dutch-gp-complete-mclaren-hat-trick-2026-08-23/?utm_source=chatgpt.com" data-desc="Independent verification of events and context.">Reuters race report</a><span class="desc">Reuters — independent verification</span></li>
            <li><a href="https://www.reuters.com/sports/formula1/mercedes-no-longer-have-fastest-car-f1-says-antonelli-2026-08-24/?utm_source=chatgpt.com" data-desc="Antonelli's and Norris's comments on each car's relative strengths.">Antonelli: "Mercedes no longer has the fastest car"</a><span class="desc">Reuters</span></li>
            <li><a href="https://www.reddit.com/r/formula1/comments/1vw9nnh/2026_dutch_grand_prix_postrace_discussion/?utm_source=chatgpt.com" data-desc="Community perception, never used as technical evidence.">Post-race discussion</a><span class="desc">r/formula1 — community perception, never technical evidence</span></li>
          </ul>
        </div>
      </details>
    </section>

  </section>

  <!-- ===================== VUE 2 : PROCHAIN GP ===================== -->
  <section id="view-preview" class="view hidden" role="tabpanel" aria-labelledby="tab-preview">

    <div class="hero prose">
      <p class="eyebrow">Grand Prix d'Italie · Monza · Pré-analyse 2026</p>
      <p class="verdict">Monza ne devrait pas reproduire mécaniquement la <em>hiérarchie de Zandvoort</em>.</p>
      <div class="resultstrip">
        <div class="chip"><span class="pos">Pole probable</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes</span></div>
        <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren</span></div>
        <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton / Leclerc</span> <span class="gap">Ferrari</span></div>
        <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull</span></div>
        <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">McLaren</span></div>
      </div>
      <p class="subverdict">Le circuit néerlandais a surtout mis en valeur l'appui aérodynamique et la gestion des pneus sous charge latérale. Monza réclame une combinaison différente : très faible traînée, déploiement électrique efficace, gros freinages, passage sur les vibreurs et motricité en sortie de chicane. Mon scénario central est une lutte Russell–Norris–Ferrari, avec Verstappen en outsider.</p>
    </div>

    <section class="block reveal" data-num="01" id="sec-p1">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> Ce que Monza change par rapport à Zandvoort</h2>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th>Domaine</th><th>Zandvoort</th><th>Monza</th><th>Favorisées</th></tr></thead>
          <tbody>
            <tr><td class="driver">Aérodynamique</td><td>Appui important, courbes longues</td><td>Traînée minimale, ailes très déchargées</td><td>Mercedes, Red Bull-Ford</td></tr>
            <tr><td class="driver">Virages rapides</td><td>Très déterminants</td><td>Lesmo, Ascari, Parabolica</td><td>McLaren, Ferrari</td></tr>
            <tr><td class="driver">Virages lents</td><td>Quelques épingles</td><td>Trois chicanes déterminantes</td><td>Mercedes</td></tr>
            <tr><td class="driver">Freinage</td><td>Important</td><td>Décélérations parmi les plus violentes</td><td>Mercedes, Ferrari</td></tr>
            <tr><td class="driver">Motricité</td><td>Sorties sous charge latérale</td><td>Relances basse vitesse sur vibreurs</td><td>Mercedes, Ferrari</td></tr>
            <tr><td class="driver">Énergie hybride</td><td>Répartie sur le tour</td><td>Déploiement prolongé, longues lignes droites</td><td>Mercedes, Red Bull-Ford</td></tr>
            <tr><td class="driver">Stratégie</td><td>Position en piste</td><td>Arrêt coûteux, dépassements accessibles</td><td>Un arrêt privilégié</td></tr>
          </tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
      <div class="prose">
        <p>Monza mesure 5,793 km, avec environ 80 % du tour à pleine charge et une ligne droite principale dépassant un kilomètre. Mais réduire le circuit à une course de vitesse de pointe serait une erreur : entre deux voitures également peu chargées, celle qui conserve le plus d'appui gratuit gagnera beaucoup dans les Lesmo, à Ascari et dans la Parabolica. <a href="https://www.formula1.com/en/information/italy-autodromo-nazionale-monza.FiJN1jnQlRLeHqOxIt13m?utm_source=chatgpt.com" data-desc="Longueur, distance et caractéristiques du circuit.">Présentation officielle du circuit</a></p>
        <p>Avec les modes aérodynamiques mobiles, les voitures passent en <em>Straight Mode</em> dans les zones autorisées et reviennent en <em>Corner Mode</em> pour les virages. Le nouveau <em>Overtake Mode</em> dépend de la réserve électrique : une voiture peut être rapide au début de la ligne droite et perdre brutalement de la puissance en fin de ligne droite si elle a trop déployé. <a href="https://www.formula1.com/en/latest/article/the-beginners-guide-to-the-2026-regulations.6j0tS0hrHG2T01tpmK6XYz?utm_source=chatgpt.com" data-desc="Straight Mode, Corner Mode, Overtake Mode expliqués.">Guide officiel du règlement 2026</a></p>
      </div>
    </section>

    <section class="block reveal" data-num="02" id="sec-p2">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> Nouveautés attendues — confirmé contre probable</h2>
        <p>Le cas crucial : les deux nouveaux moteurs Ferrari 067/6 « ADUO2 » seraient prêts, avec un gain annoncé d'environ 15 chevaux et une courbe de puissance revue. Ferrari doit encore donner son feu vert après validation de l'endurance — à considérer comme une estimation publiée, pas une donnée officielle mesurée en piste. <a href="https://www.motorsport.com/f1/news/f1-ferrari-aduo2-engines-ready-but-monza-debut-decision-due-at-weekend/10849610/?utm_source=chatgpt.com" data-desc="Le gain de 15 ch et la décision d'homologation attendue.">Motorsport.com</a></p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th style="width:120px;">Équipe</th><th>Évolutions connues</th><th>Lecture Monza</th></tr></thead>
          <tbody>
            <tr><td class="driver">Ferrari</td><td>Nouveau moteur 067/6 « ADUO2 » pour les deux voitures, sous réserve des tests d'endurance</td><td>Le changement le plus significatif du week-end</td></tr>
            <tr><td class="driver">Mercedes</td><td>Groupe propulseur neuf pour Antonelli (pénalité) ; pas de grand package aéro avant la Malaisie</td><td>Russell garde la meilleure chance pure</td></tr>
            <tr><td class="driver">McLaren</td><td>Conservation du package de Zandvoort, configuration très faible appui attendue</td><td>Adaptation extrême à Monza à vérifier</td></tr>
            <tr><td class="driver">Red Bull</td><td>Aucun grand développement annoncé</td><td>Le moteur aidera plus que le châssis</td></tr>
            <tr><td class="driver">Alpine</td><td>Package complet de Gasly étendu à Colapinto</td><td>Progrès réel, faiblesses en énergie à surveiller</td></tr>
            <tr><td class="driver">Aston Martin</td><td>Évolutions aéro et moteur Honda déjà introduites</td><td>Alonso lui-même réservé sur Monza</td></tr>
          </tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
    </section>

    <section class="block reveal" data-num="03" id="sec-p3">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> Analyse des quatre équipes de tête</h2>

        <h3 class="subtitle">Mercedes — la meilleure adéquation théorique</h3>
        <p>Monza comporte trois freinages à très basse vitesse, des relances où la motricité arrière est fondamentale, de longues phases de déploiement électrique et une forte récompense pour la stabilité au freinage. Cela correspond très bien aux qualités de la W17 : Russell devrait être l'un des principaux candidats à la pole et à la victoire. <a href="https://www.reuters.com/sports/formula1/mercedes-no-longer-have-fastest-car-f1-says-antonelli-2026-08-24/?utm_source=chatgpt.com" data-desc="Déclarations d'Antonelli et de Norris sur les forces relatives des deux voitures.">Reuters</a></p>
        <p>Toto Wolff a choisi Monza pour remplacer le groupe propulseur d'Antonelli, précisément parce qu'on peut y dépasser plus facilement et qu'un moteur neuf y procure un bénéfice maximal. Son scénario raisonnable : remontée vers le Top 6 à la régulière, podium envisageable avec Safety Car, victoire peu probable sans course neutralisée.</p>

        <h3 class="subtitle">McLaren — la meilleure dynamique, un test différent</h3>
        <p>La MCL40 a été excellente dans les courbes rapides à Zandvoort et Norris reste sur deux victoires consécutives. Mais les chicanes lentes de Monza correspondent davantage au point fort de Mercedes, et l'efficacité de son package avec une aile extrêmement déchargée n'est pas encore démontrée.</p>

        <h3 class="subtitle">Ferrari — le plus gros potentiel de progression</h3>
        <p>Le résultat brut de Zandvoort (P4-P5) sous-estime légèrement le rythme réel : Hamilton et Leclerc ont longtemps mis Russell sous pression. Mon verdict conditionnel : sans nouveau moteur, candidat au podium ; avec moteur validé mais réglages conservateurs, lutte à trois équipes ouverte ; avec moteur performant et fiable, possible favorite du week-end.</p>

        <h3 class="subtitle">Red Bull-Ford — vitesse de pointe, châssis à confirmer</h3>
        <p>La FIA a identifié Red Bull-Ford comme la référence actuelle en performance du moteur thermique, Mercedes se situant entre 2 et 4 % derrière. Mais la RB22 garde une tendance au sous-virage en milieu de virage qui peut coûter cher dans les deux premières chicanes. <a href="https://www.reuters.com/sports/formula1/f1-leaders-mercedes-granted-engine-upgrades-none-red-bull-2026-08-26/?utm_source=chatgpt.com" data-desc="Classement des moteurs thermiques selon l'ADUO.">Reuters — classement moteurs ADUO</a></p>
      </div>
    </section>

    <section class="block reveal" data-num="04" id="sec-p4">
      <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">04</span> La bataille du milieu de grille</h2>
        <p><strong>Racing Bulls</strong> pourrait être la meilleure surprise potentielle grâce au moteur Red Bull-Ford. <strong>Audi</strong> reste irrégulière côté départs mais compétitive avec Hülkenberg. <strong>Alpine</strong> devrait se rapprocher du Top 10 grâce au package étendu à Colapinto. <strong>Aston Martin</strong> risque de voir son déficit thermique exposé sur les longues lignes droites. <strong>Williams, Haas et Cadillac</strong> restent en difficulté générale, un passage en Q3 serait déjà une performance pour Cadillac.</p>
      </div>
    </section>

    <section class="block reveal" data-num="05" id="sec-p5">
      <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">05</span> Stratégie probable de course</h2>
        <p>Pirelli apportera les trois mélanges les plus tendres : C3 dur, C4 medium et C5 tendre. Le temps perdu dans les stands est élevé à Monza, ce qui favorise une course à un arrêt. <a href="https://press.pirelli.com/tyre-compounds-selected-for-zandvoort-monza-and-madrid/?utm_source=chatgpt.com" data-desc="Confirmation des C3, C4 et C5 pour Monza.">Sélection officielle Pirelli</a></p>
        <div class="callout">
          Stratégies de base : <strong>Medium → dur</strong> (référence, flexible) · <strong>Tendre → dur</strong> (attaque au départ) · <strong>Dur → medium</strong> (pour Antonelli et les pilotes partant loin) · <strong>Deux arrêts</strong> (probablement trop coûteux, sauf forte dégradation ou Safety Car).
        </div>
        <p>Moments qui peuvent décider la course : le départ et la première chicane (aspiration déjà déterminante avant le premier freinage), le premier tour après chaque arrêt, le trafic énergétique (une voiture enfermée peut manquer de réserve électrique pour dépasser), une Safety Car éventuelle, et le choix de niveau d'appui (une voiture très déchargée est difficile à dépasser mais dégrade davantage ses pneus).</p>
      </div>
    </section>

    <section class="block reveal" data-num="06" id="sec-p6">
      <div class="sec-marker"><span class="n">06</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">06</span> Hiérarchie prévisionnelle</h2>
        <p><strong>Pole position :</strong> Russell, Norris, Hamilton/Leclerc, Verstappen, Piastri. Antonelli aurait normalement sa place dans ce groupe, mais sa pénalité modifie totalement l'objectif de sa qualification.</p>
        <p><strong>Rythme de course attendu :</strong> premier groupe — McLaren, Mercedes, Ferrari ; outsider proche — Verstappen ; points — Racing Bulls, Audi, Alpine ; plus en difficulté — Aston Martin, Williams, Haas, Cadillac.</p>
        <div class="callout">
          <strong>Pronostic conditionnel</strong> — Si Ferrari n'utilise pas son nouveau moteur : Russell et Norris restent mes deux favoris. Si le moteur donne réellement le gain annoncé sans compromettre la fiabilité : Hamilton et Leclerc peuvent devenir les références du week-end. Si Red Bull trouve une RB22 stable sur les vibreurs : Verstappen peut se joindre à la lutte. Si une Safety Car intervient tardivement : Antonelli redevient une menace pour le podium grâce à son moteur neuf.
        </div>
      </div>
    </section>

    <section class="block reveal" id="sec-p7">
      <div class="prose">
        <h2 class="sectitle">Conclusion</h2>
        <p>Mercedes présente la meilleure adéquation théorique. McLaren arrive avec la meilleure dynamique. Ferrari possède la nouveauté au potentiel le plus important. Red Bull dispose du meilleur thermique mais pas encore du châssis le plus complet.</p>
        <div class="callout">La séance la plus révélatrice ne sera probablement pas la première simulation de qualification, mais les longs relais du vendredi : vitesse en fin de ligne droite, moment où chaque moteur commence à perdre son déploiement électrique, stabilité sur les vibreurs et dégradation du pneu arrière. C'est là que la véritable hiérarchie de Monza apparaîtra.</div>
      </div>
    </section>

    <section class="block" id="sec-p8">
      <details class="sources">
        <summary>Sources utilisées — Pré-analyse Monza (13 liens)</summary>
        <div class="srcgroup">
          <h5>Circuit &amp; règlement</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/information/italy-autodromo-nazionale-monza.FiJN1jnQlRLeHqOxIt13m?utm_source=chatgpt.com" data-desc="Longueur, distance à pleine charge, ligne droite principale.">Présentation officielle de Monza</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/tech-tuesday-what-monza-wing-levels-tell-us-about-the-performance-of-red.7iBpXHgy2yPnyxn00mTmou?utm_source=chatgpt.com" data-desc="Pourquoi Monza récompense l'efficacité aéro, pas que la vitesse max.">Ce que les niveaux d'aileron révèlent</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/the-beginners-guide-to-the-2026-regulations.6j0tS0hrHG2T01tpmK6XYz?utm_source=chatgpt.com" data-desc="Straight Mode, Corner Mode, Overtake Mode expliqués.">Guide officiel des règlements 2026</a><span class="desc">Formula1.com</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Pneus &amp; moteurs</h5>
          <ul>
            <li><a href="https://press.pirelli.com/tyre-compounds-selected-for-zandvoort-monza-and-madrid/?utm_source=chatgpt.com" data-desc="Confirmation des C3, C4 et C5 pour Monza.">Choix Pirelli Zandvoort / Monza / Madrid</a><span class="desc">Pirelli Press</span></li>
            <li><a href="https://www.reuters.com/sports/formula1/f1-leaders-mercedes-granted-engine-upgrades-none-red-bull-2026-08-26/?utm_source=chatgpt.com" data-desc="Classement des moteurs thermiques selon l'ADUO.">Red Bull-Ford référence thermique</a><span class="desc">Reuters</span></li>
            <li><a href="https://www.motorsport.com/f1/news/f1-ferrari-aduo2-engines-ready-but-monza-debut-decision-due-at-weekend/10849610/?utm_source=chatgpt.com" data-desc="Le gain de 15 ch et la décision d'homologation attendue.">Ferrari ADUO2 — décision attendue</a><span class="desc">Motorsport.com</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Dynamique d'équipes</h5>
          <ul>
            <li><a href="https://www.reuters.com/sports/formula1/mercedes-no-longer-have-fastest-car-f1-says-antonelli-2026-08-24/?utm_source=chatgpt.com" data-desc="Mercedes n'a plus la voiture la plus rapide, selon Antonelli.">Mercedes n'a plus la voiture la plus rapide</a><span class="desc">Reuters</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/wolff-explains-decision-behind-monza-engine-penalty-for-antonelli.2kQ3tVnHJXRsloH0lmlh9I?utm_source=chatgpt.com" data-desc="Pourquoi Monza a été choisi pour le remplacement moteur.">Wolff explique la pénalité moteur d'Antonelli</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.skysports.com/f1/news/12433/13577386/toto-wolffs-claims-that-mercedes-cant-afford-to-match-rivals-2026-upgrades-assessed-by-bernie-collins-on-the-f1-show-podcast?utm_source=chatgpt.com" data-desc="Le prochain grand développement Mercedes est prévu en Malaisie.">Le prochain package Mercedes attendu en Malaisie</a><span class="desc">Sky Sports</span></li>
            <li><a href="https://www.the-race.com/formula-1/every-2026-f1-team-big-weakness/?utm_source=chatgpt.com" data-desc="Portrait technique des faiblesses de chaque équipe.">Faiblesses de chaque équipe 2026</a><span class="desc">The Race</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Méthodologie</h5>
          <ul>
            <li><span class="desc">Les publications Instagram, Facebook ou YouTube n'ont pas été utilisées comme preuves. Pour les informations sensibles (puissance moteur, évolutions non déclarées), priorité à Formula1.com, Pirelli et Reuters, puis Motorsport.com ou The Race en complément. Reddit sert uniquement à capter les débats des passionnés.</span></li>
          </ul>
        </div>
      </details>
    </section>

  </section>

  <!-- ===================== VIEW 2 (EN) : NEXT GP ===================== -->
  <section id="view-preview-en" class="view hidden" role="tabpanel" aria-labelledby="tab-preview" lang="en">

    <div class="hero prose">
      <p class="eyebrow">Italian Grand Prix · Monza · 2026 Preview</p>
      <p class="verdict">Monza shouldn't mechanically repeat the <em>Zandvoort hierarchy</em>.</p>
      <div class="resultstrip">
        <div class="chip"><span class="pos">Likely pole</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes</span></div>
        <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren</span></div>
        <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton / Leclerc</span> <span class="gap">Ferrari</span></div>
        <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull</span></div>
        <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">McLaren</span></div>
      </div>
      <p class="subverdict">The Dutch circuit mainly rewarded aerodynamic downforce and tyre management under lateral load. Monza calls for a different combination: very low drag, efficient electrical deployment, heavy braking, kerb-riding and traction out of the chicanes. My central scenario is a Russell–Norris–Ferrari fight, with Verstappen as an outsider.</p>
    </div>

    <section class="block reveal" data-num="01" id="sec-p1-en">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> What Monza changes compared with Zandvoort</h2>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th>Domain</th><th>Zandvoort</th><th>Monza</th><th>Favoured</th></tr></thead>
          <tbody>
            <tr><td class="driver">Aerodynamics</td><td>Significant downforce, long corners</td><td>Minimal drag, very low-downforce wings</td><td>Mercedes, Red Bull-Ford</td></tr>
            <tr><td class="driver">Fast corners</td><td>Highly decisive</td><td>Lesmo, Ascari, Parabolica</td><td>McLaren, Ferrari</td></tr>
            <tr><td class="driver">Slow corners</td><td>A few hairpins</td><td>Three decisive chicanes</td><td>Mercedes</td></tr>
            <tr><td class="driver">Braking</td><td>Important</td><td>Some of the heaviest deceleration of the season</td><td>Mercedes, Ferrari</td></tr>
            <tr><td class="driver">Traction</td><td>Exits under lateral load</td><td>Low-speed pick-up over kerbs</td><td>Mercedes, Ferrari</td></tr>
            <tr><td class="driver">Hybrid energy</td><td>Spread across the lap</td><td>Extended deployment, long straights</td><td>Mercedes, Red Bull-Ford</td></tr>
            <tr><td class="driver">Strategy</td><td>Track position</td><td>Costly stop, overtaking more accessible</td><td>A one-stop favoured</td></tr>
          </tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ swipe to see the rest of the table ▸</p>
      <div class="prose">
        <p>Monza measures 5.793 km, with roughly 80% of the lap at full throttle and a main straight over a kilometre long. But reducing the circuit to a top-speed contest would be a mistake: between two similarly low-downforce cars, the one keeping the most "free" downforce will gain a lot through the Lesmos, Ascari and the Parabolica. <a href="https://www.formula1.com/en/information/italy-autodromo-nazionale-monza.FiJN1jnQlRLeHqOxIt13m?utm_source=chatgpt.com" data-desc="Length, distance and characteristics of the circuit.">Official circuit presentation</a></p>
        <p>With the movable aero modes, cars switch to <em>Straight Mode</em> in the permitted zones and back to <em>Corner Mode</em> for the corners. The new <em>Overtake Mode</em> depends on the electrical reserve: a car can be fast at the start of the straight and suddenly lose power at the end of it if it has deployed too much. <a href="https://www.formula1.com/en/latest/article/the-beginners-guide-to-the-2026-regulations.6j0tS0hrHG2T01tpmK6XYz?utm_source=chatgpt.com" data-desc="Straight Mode, Corner Mode, Overtake Mode explained.">Official guide to the 2026 regulations</a></p>
      </div>
    </section>

    <section class="block reveal" data-num="02" id="sec-p2-en">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> Expected developments — confirmed vs. probable</h2>
        <p>The crucial case: Ferrari's two new 067/6 "ADUO2" engines are reportedly ready, with an announced gain of around 15 horsepower and a reworked power curve. Ferrari still has to give the green light after endurance validation — treat this as a published estimate, not officially measured on-track data. <a href="https://www.motorsport.com/f1/news/f1-ferrari-aduo2-engines-ready-but-monza-debut-decision-due-at-weekend/10849610/?utm_source=chatgpt.com" data-desc="The 15hp gain and the expected homologation decision.">Motorsport.com</a></p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th style="width:120px;">Team</th><th>Known developments</th><th>Reading for Monza</th></tr></thead>
          <tbody>
            <tr><td class="driver">Ferrari</td><td>New 067/6 "ADUO2" engine for both cars, pending endurance testing</td><td>The most significant change of the weekend</td></tr>
            <tr><td class="driver">Mercedes</td><td>Fresh power unit for Antonelli (penalty); no major aero package before Malaysia</td><td>Russell keeps the best pure chance</td></tr>
            <tr><td class="driver">McLaren</td><td>Keeping the Zandvoort package, very low-downforce set-up expected</td><td>Extreme Monza adaptation still to be confirmed</td></tr>
            <tr><td class="driver">Red Bull</td><td>No major development announced</td><td>The engine will help more than the chassis</td></tr>
            <tr><td class="driver">Alpine</td><td>Gasly's full package extended to Colapinto</td><td>Real progress, energy weaknesses to watch</td></tr>
            <tr><td class="driver">Aston Martin</td><td>Aero upgrades and updated Honda engine already introduced</td><td>Alonso himself is cautious about Monza</td></tr>
          </tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ swipe to see the rest of the table ▸</p>
    </section>

    <section class="block reveal" data-num="03" id="sec-p3-en">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> Analysis of the four leading teams</h2>

        <h3 class="subtitle">Mercedes — the best theoretical fit</h3>
        <p>Monza features three very low-speed braking zones, restarts where rear-end traction is fundamental, long phases of electrical deployment and a strong reward for braking stability. That matches the W17's strengths very well: Russell should be one of the main candidates for pole and the win. <a href="https://www.reuters.com/sports/formula1/mercedes-no-longer-have-fastest-car-f1-says-antonelli-2026-08-24/?utm_source=chatgpt.com" data-desc="Antonelli's and Norris's comments on each car's relative strengths.">Reuters</a></p>
        <p>Toto Wolff chose Monza to replace Antonelli's power unit precisely because overtaking is easier there and a fresh engine delivers maximum benefit. His reasonable scenario: a routine climb to the Top 6, a podium possible with a Safety Car, a win unlikely without a neutralised race.</p>

        <h3 class="subtitle">McLaren — the best momentum, a different test</h3>
        <p>The MCL40 was excellent in the fast corners at Zandvoort, and Norris is on a two-race winning streak. But Monza's slow chicanes play more to Mercedes's strengths, and the efficiency of McLaren's package with an extremely low-downforce wing hasn't been proven yet.</p>

        <h3 class="subtitle">Ferrari — the biggest potential for improvement</h3>
        <p>Zandvoort's raw result (P4-P5) slightly understates the real pace: Hamilton and Leclerc kept Russell under pressure for long stretches. My conditional verdict: without the new engine, a podium contender; with the engine validated but conservative settings, a genuinely open three-team fight; with a strong and reliable engine, a possible favourite for the weekend.</p>

        <h3 class="subtitle">Red Bull-Ford — top speed, chassis still to confirm</h3>
        <p>The FIA has identified Red Bull-Ford as the current benchmark for thermal engine performance, with Mercedes 2 to 4% behind. But the RB22 still tends to understeer mid-corner, which can be costly in the first two chicanes. <a href="https://www.reuters.com/sports/formula1/f1-leaders-mercedes-granted-engine-upgrades-none-red-bull-2026-08-26/?utm_source=chatgpt.com" data-desc="Thermal engine rankings under the ADUO.">Reuters — ADUO engine rankings</a></p>
      </div>
    </section>

    <section class="block reveal" data-num="04" id="sec-p4-en">
      <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">04</span> The midfield battle</h2>
        <p><strong>Racing Bulls</strong> could be the biggest potential surprise thanks to the Red Bull-Ford engine. <strong>Audi</strong> remains inconsistent off the line but competitive with Hülkenberg. <strong>Alpine</strong> should move closer to the Top 10 thanks to the package extended to Colapinto. <strong>Aston Martin</strong> risks having its thermal deficit exposed on the long straights. <strong>Williams, Haas and Cadillac</strong> remain in general difficulty — reaching Q3 would already be an achievement for Cadillac.</p>
      </div>
    </section>

    <section class="block reveal" data-num="05" id="sec-p5-en">
      <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">05</span> Likely race strategy</h2>
        <p>Pirelli will bring its three softest compounds: C3 hard, C4 medium and C5 soft. Time lost in the pits is high at Monza, which favours a one-stop race. <a href="https://press.pirelli.com/tyre-compounds-selected-for-zandvoort-monza-and-madrid/?utm_source=chatgpt.com" data-desc="Confirmation of the C3, C4 and C5 for Monza.">Official Pirelli selection</a></p>
        <div class="callout">
          Base strategies: <strong>Medium → hard</strong> (reference, flexible) · <strong>Soft → hard</strong> (attacking at the start) · <strong>Hard → medium</strong> (for Antonelli and drivers starting further back) · <strong>Two stops</strong> (probably too costly, barring heavy degradation or a Safety Car).
        </div>
        <p>Moments that could decide the race: the start and the first chicane (slipstream already decisive before the first braking zone), the opening lap after each stop, energy traffic (a car boxed in may lack the electrical reserve to overtake), a possible Safety Car, and the downforce-level choice (a very low-downforce car is hard to pass but degrades its tyres more).</p>
      </div>
    </section>

    <section class="block reveal" data-num="06" id="sec-p6-en">
      <div class="sec-marker"><span class="n">06</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">06</span> Forecast hierarchy</h2>
        <p><strong>Pole position:</strong> Russell, Norris, Hamilton/Leclerc, Verstappen, Piastri. Antonelli would normally belong in this group, but his penalty completely changes the objective of his qualifying session.</p>
        <p><strong>Expected race pace:</strong> leading group — McLaren, Mercedes, Ferrari; closest outsider — Verstappen; points — Racing Bulls, Audi, Alpine; more in difficulty — Aston Martin, Williams, Haas, Cadillac.</p>
        <div class="callout">
          <strong>Conditional forecast</strong> — If Ferrari doesn't use its new engine: Russell and Norris remain my two favourites. If the engine delivers the announced gain without compromising reliability: Hamilton and Leclerc could become the weekend's benchmark. If Red Bull finds an RB22 that's stable over the kerbs: Verstappen can join the fight. If a Safety Car intervenes late: Antonelli becomes a podium threat again thanks to his fresh engine.
        </div>
      </div>
    </section>

    <section class="block reveal" id="sec-p7-en">
      <div class="prose">
        <h2 class="sectitle">Conclusion</h2>
        <p>Mercedes offers the best theoretical fit. McLaren arrives with the best momentum. Ferrari holds the single most significant potential development. Red Bull has the best thermal engine but not yet the most complete chassis.</p>
        <div class="callout">The most revealing session probably won't be first qualifying simulation, but Friday's long runs: end-of-straight speed, the point where each engine starts losing its electrical deployment, stability over the kerbs, and rear-tyre degradation. That's where Monza's real pecking order will show itself.</div>
      </div>
    </section>

    <section class="block" id="sec-p8-en">
      <details class="sources">
        <summary>Sources used — Italian GP preview (13 links)</summary>
        <div class="srcgroup">
          <h5>Circuit &amp; regulations</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/information/italy-autodromo-nazionale-monza.FiJN1jnQlRLeHqOxIt13m?utm_source=chatgpt.com" data-desc="Length, full-throttle distance, main straight.">Official presentation of Monza</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/tech-tuesday-what-monza-wing-levels-tell-us-about-the-performance-of-red.7iBpXHgy2yPnyxn00mTmou?utm_source=chatgpt.com" data-desc="Why Monza rewards aero efficiency, not just top speed.">What the wing levels reveal</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/the-beginners-guide-to-the-2026-regulations.6j0tS0hrHG2T01tpmK6XYz?utm_source=chatgpt.com" data-desc="Straight Mode, Corner Mode, Overtake Mode explained.">Official guide to the 2026 regulations</a><span class="desc">Formula1.com</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Tyres &amp; engines</h5>
          <ul>
            <li><a href="https://press.pirelli.com/tyre-compounds-selected-for-zandvoort-monza-and-madrid/?utm_source=chatgpt.com" data-desc="Confirmation of the C3, C4 and C5 for Monza.">Pirelli's choice for Zandvoort / Monza / Madrid</a><span class="desc">Pirelli Press</span></li>
            <li><a href="https://www.reuters.com/sports/formula1/f1-leaders-mercedes-granted-engine-upgrades-none-red-bull-2026-08-26/?utm_source=chatgpt.com" data-desc="Thermal engine rankings under the ADUO.">Red Bull-Ford, the thermal benchmark</a><span class="desc">Reuters</span></li>
            <li><a href="https://www.motorsport.com/f1/news/f1-ferrari-aduo2-engines-ready-but-monza-debut-decision-due-at-weekend/10849610/?utm_source=chatgpt.com" data-desc="The 15hp gain and the expected homologation decision.">Ferrari ADUO2 — decision expected</a><span class="desc">Motorsport.com</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Team dynamics</h5>
          <ul>
            <li><a href="https://www.reuters.com/sports/formula1/mercedes-no-longer-have-fastest-car-f1-says-antonelli-2026-08-24/?utm_source=chatgpt.com" data-desc="Mercedes no longer has the fastest car, according to Antonelli.">Mercedes no longer has the fastest car</a><span class="desc">Reuters</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/wolff-explains-decision-behind-monza-engine-penalty-for-antonelli.2kQ3tVnHJXRsloH0lmlh9I?utm_source=chatgpt.com" data-desc="Why Monza was chosen for the engine replacement.">Wolff explains Antonelli's engine penalty</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.skysports.com/f1/news/12433/13577386/toto-wolffs-claims-that-mercedes-cant-afford-to-match-rivals-2026-upgrades-assessed-by-bernie-collins-on-the-f1-show-podcast?utm_source=chatgpt.com" data-desc="Mercedes's next big development is expected in Malaysia.">Mercedes's next big package expected in Malaysia</a><span class="desc">Sky Sports</span></li>
            <li><a href="https://www.the-race.com/formula-1/every-2026-f1-team-big-weakness/?utm_source=chatgpt.com" data-desc="Technical portrait of each team's weaknesses.">Every 2026 team's weakness</a><span class="desc">The Race</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Methodology</h5>
          <ul>
            <li><span class="desc">Instagram, Facebook and YouTube posts were not used as evidence. For sensitive information (engine power, undeclared developments), priority went to Formula1.com, Pirelli and Reuters, then Motorsport.com or The Race as a supplement. Reddit was used only to capture fan debate, never as technical proof.</span></li>
          </ul>
        </div>
      </details>
    </section>

  </section>

</main>

<footer>APERÇU DE PLATEFORME — DOCUMENT DE TRAVAIL, USAGE PRIVÉ</footer>

<div class="linkpreview" id="linkpreview" role="tooltip" hidden>
  <div class="lp-badge" id="lp-badge"></div>
  <div class="lp-body">
    <div class="lp-domain" id="lp-domain"></div>
    <div class="lp-title" id="lp-title"></div>
    <div class="lp-desc" id="lp-desc"></div>
  </div>
</div>
`;
