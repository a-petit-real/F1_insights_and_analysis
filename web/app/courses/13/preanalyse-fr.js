// Pré-analyse Round 13 — Grand Prix d'Italie 2026 (Monza).
// Migré depuis l'ancien contenu figé de la page d'accueil
// (web/app/content.js, section "Prochain GP" / view-preview), dans le
// cadre de la refonte de navigation (option A). Contenu mis à jour au
// 3/4 septembre (moteur Ferrari confirmé, pénalité Antonelli finalisée,
// Heat Hazard) — voir la section Sources en fin d'article.
export const ROUND13_PREANALYSE_FR_HTML = `
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
      <p class="subverdict">Le circuit néerlandais a surtout mis en valeur l'appui aérodynamique et la gestion des pneus sous charge latérale. Monza réclame une combinaison différente : très faible traînée, déploiement électrique efficace, gros freinages, passage sur les vibreurs et motricité en sortie de chicane. La principale incertitude de cette pré-analyse est désormais levée : le moteur Ferrari ADUO2 est confirmé pour les deux SF-26. Mon scénario central reste une lutte Russell–Norris–Ferrari, avec Verstappen en outsider — mais Russell lui-même reconnaît publiquement que « le momentum est du côté de McLaren » à l'approche du week-end.</p>
      <p class="scrollhint prose" style="margin-top:8px;"><em>Mise à jour du jeudi 3 / vendredi 4 septembre, avant les EL1 : moteur Ferrari confirmé, pénalité d'Antonelli finalisée, météo et Heat Hazard connus. Aucune séance n'a encore eu lieu — voir sources en fin d'article.</em></p>
    </div>

    <section class="block" data-num="01" id="sec-p1">
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

    <section class="block" data-num="02" id="sec-p2">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> Nouveautés attendues — confirmé contre probable</h2>
        <p>Le cas Ferrari est désormais tranché : Leclerc et Hamilton ont eux-mêmes confirmé, le 3 septembre en conférence de presse, qu'ils courront tous les deux avec le nouveau moteur 067/6 « ADUO2 » à Monza. Le gain reste imprécis côté équipe — « il y aura un peu plus de puissance, combien exactement, seul le temps nous le dira », a botté en touche Leclerc, qualifiant même le moteur de « point faible » assumé de la SF-26. Les estimations publiées (non confirmées officiellement) oscillent entre 10 et 15 chevaux. <a href="https://www.formula1.com/en/latest/article/leclerc-targets-very-special-monza-weekend-with-more-power-from-new-ferrari-engine.5R0ZYizMM9sHZ2raSfLnRX" data-desc="Confirmation directe par Leclerc, citations complètes, contexte Barcelone/Silverstone.">Formula1.com — Leclerc confirme le nouveau moteur</a></p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th style="width:120px;">Équipe</th><th>Évolutions connues</th><th>Lecture Monza</th></tr></thead>
          <tbody>
            <tr><td class="driver">Ferrari</td><td>Nouveau moteur 067/6 « ADUO2 » confirmé pour Leclerc et Hamilton (annoncé le 3 septembre)</td><td>Le changement le plus significatif du week-end, gain non quantifié officiellement</td></tr>
            <tr><td class="driver">Mercedes</td><td>Pénalité d'Antonelli finalisée : départ du fond de grille (minimum 20 places, 4 des 7 éléments du groupe propulseur dépassés) ; pas de grand package aéro avant la Malaisie</td><td>Russell garde la meilleure chance pure, épaulé par un remorquage d'Antonelli en qualifications</td></tr>
            <tr><td class="driver">McLaren</td><td>Conservation du package de Zandvoort, configuration très faible appui attendue</td><td>Norris vise un triplé (Hongrie, Zandvoort, Monza) malgré un déficit assumé en virages lents</td></tr>
            <tr><td class="driver">Red Bull</td><td>Aucun grand développement annoncé ; Verstappen absent des EL1 (séance rookie obligatoire, Iwasa au volant)</td><td>Le moteur aidera plus que le châssis</td></tr>
            <tr><td class="driver">Alpine</td><td>Package complet de Gasly étendu à Colapinto</td><td>Progrès réel, faiblesses en énergie à surveiller</td></tr>
            <tr><td class="driver">Aston Martin</td><td>Évolutions aéro et moteur Honda déjà introduites</td><td>Alonso lui-même réservé sur Monza</td></tr>
          </tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
    </section>

    <section class="block" data-num="03" id="sec-p3">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> Analyse des quatre équipes de tête</h2>

        <h3 class="subtitle">Mercedes — la meilleure adéquation théorique, un discours d'équipe plus prudent</h3>
        <p>Monza comporte trois freinages à très basse vitesse, des relances où la motricité arrière est fondamentale, de longues phases de déploiement électrique et une forte récompense pour la stabilité au freinage. Cela correspond bien aux qualités théoriques de la W17 — mais Russell tempère lui-même l'enthousiasme : « le momentum est du côté de McLaren en ce moment [...] je pense sincèrement que ce week-end peut se jouer entre n'importe laquelle des quatre équipes de tête », a-t-il déclaré le 3 septembre, reconnaissant que Mercedes reste « en retard » sur les évolutions apportées par McLaren et Ferrari. <a href="https://www.formula1.com/en/latest/article/russell-insists-mercedes-will-work-as-a-team-in-monza-qualifying-before-antonelli-grid-penalty.3KS3yXktFxuX0VZ9c14Wzn" data-desc="Citations complètes de Russell sur le momentum McLaren et le plan de remorquage.">Formula1.com — Russell sur le momentum McLaren</a></p>
        <p>Fait nouveau : Antonelli, dont la pénalité l'exclut de la lutte pour la pole, est programmé pour remorquer Russell en qualifications — un geste que Mercedes lui a proposé selon Russell (« ils l'ont offert, on va tenter le coup, on verra si ça marche »). La pénalité elle-même est désormais actée : départ du fond de grille, pour avoir dépassé son quota sur 4 des 7 éléments du groupe propulseur (moteur thermique et échappement, 4<sup>e</sup>/4 autorisés ; stockage d'énergie et électronique de contrôle, 3<sup>e</sup>/3). Monza a été choisi précisément parce qu'on peut y dépasser plus facilement et qu'un moteur neuf y procure un bénéfice maximal ; Antonelli lui-même dit voir un avantage à la pénalité, qui retire une partie de la pression sur sa qualification à domicile. Scénario raisonnable pour lui : remontée vers le Top 6 à la régulière, podium envisageable avec Safety Car, victoire peu probable sans course neutralisée.</p>

        <h3 class="subtitle">McLaren — la meilleure dynamique récente, une faiblesse assumée</h3>
        <p>La MCL40 a été excellente dans les courbes rapides à Zandvoort et Norris vise désormais un triplé après ses victoires en Hongrie et aux Pays-Bas — objectif qu'il qualifie lui-même de « certainement le plan », tout en admettant qu'« il est difficile de prédire où nous serons ». Mais l'équipe reconnaît elle-même un déficit qualifié de « dingue » en virages lents depuis le début des règlements 2026, et ses propres simulations produisent une anomalie révélatrice : selon Piastri, la MCL40 serait plus rapide sur la ligne droite de Hongrie que sur celle de Monza. Les chicanes lentes du circuit correspondent davantage au point fort de Mercedes, et l'efficacité du package McLaren avec une aile extrêmement déchargée reste à démontrer. <a href="https://racingnews365.com/lando-norris-raises-mclaren-concern-as-biggest-weakness-set-for-ultimate-exposure" data-desc="Aveu du déficit en virages lents et de l'anomalie de simulation rapportée par Piastri.">RacingNews365 — le déficit McLaren en virages lents</a></p>

        <h3 class="subtitle">Ferrari — l'incertitude levée, le gain reste à confirmer en piste</h3>
        <p>Le résultat brut de Zandvoort (P4-P5) sous-estimait déjà le rythme réel : Hamilton et Leclerc ont longtemps mis Russell sous pression. La principale inconnue de cette pré-analyse est désormais résolue : Ferrari a confirmé que ses deux pilotes courront avec le moteur ADUO2. Hamilton bénéficie de la priorité dans la file d'aspiration en qualifications ce week-end, selon la rotation habituelle instaurée par l'équipe entre ses deux pilotes. Mon verdict conditionnel : si le gain se rapproche des 15 chevaux évoqués et que la fiabilité tient, Hamilton et Leclerc peuvent devenir les références du week-end ; à gain plus modeste, la lutte à quatre équipes reste ouverte, comme le formule Russell lui-même.</p>

        <h3 class="subtitle">Red Bull-Ford — vitesse de pointe, châssis à confirmer, Verstappen privé des EL1</h3>
        <p>La FIA a identifié Red Bull-Ford comme la référence actuelle en performance du moteur thermique, Mercedes se situant entre 2 et 4 % derrière. Mais la RB22 garde une tendance au sous-virage en milieu de virage qui peut coûter cher dans les deux premières chicanes. Verstappen, remis de l'épisode grippal qui l'avait affecté à Zandvoort, cède les EL1 à Ayumu Iwasa pour la séance rookie obligatoire du règlement — un tour de piste en moins avant les qualifications, sans lien avec sa santé. <a href="https://www.reuters.com/sports/formula1/f1-leaders-mercedes-granted-engine-upgrades-none-red-bull-2026-08-26/?utm_source=chatgpt.com" data-desc="Classement des moteurs thermiques selon l'ADUO.">Reuters — classement moteurs ADUO</a></p>
      </div>
    </section>

    <section class="block" data-num="04" id="sec-p4">
      <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">04</span> La bataille du milieu de grille</h2>
        <p><strong>Racing Bulls</strong> pourrait rester la meilleure surprise potentielle grâce au moteur Red Bull-Ford, mais aligne de nouveau Tsunoda pour un second week-end consécutif : Lawson est remonté chez Red Bull pour remplacer Hadjar, toujours écarté par une douleur persistante au poignet contractée pendant la coupure estivale et absent depuis Zandvoort. <strong>Audi</strong> reste irrégulière côté départs mais compétitive avec Hülkenberg. <strong>Alpine</strong> devrait se rapprocher du Top 10 grâce au package étendu à Colapinto. <strong>Aston Martin</strong> risque de voir son déficit thermique exposé sur les longues lignes droites. <strong>Williams, Haas et Cadillac</strong> restent en difficulté générale, un passage en Q3 serait déjà une performance pour Cadillac. <a href="https://www.formula1.com/en/latest/article/lawson-to-replace-hadjar-again-at-red-bull-as-tsunoda-continues-to-substitute-for-racing-bulls-in-monza.4pI3a9wGM9uTDfK9DqRUMU" data-desc="Confirmation du remplacement, blessure au poignet de Hadjar.">Formula1.com — Lawson remplace de nouveau Hadjar</a></p>
      </div>
    </section>

    <section class="block" data-num="05" id="sec-p5">
      <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">05</span> Stratégie probable de course</h2>
        <p>Pirelli apportera les trois mélanges les plus tendres : C3 dur, C4 medium et C5 tendre. Le temps perdu dans les stands est élevé à Monza, ce qui favorise une course à un arrêt. <a href="https://press.pirelli.com/tyre-compounds-selected-for-zandvoort-monza-and-madrid/?utm_source=chatgpt.com" data-desc="Confirmation des C3, C4 et C5 pour Monza.">Sélection officielle Pirelli</a></p>
        <p>La météo prévue est chaude et sèche sur tout le week-end : environ 30 °C aux essais libres de vendredi, jusqu'à 34 °C samedi en qualifications, 33 °C dimanche en course, sans risque de pluie annoncé. La FIA a déclaré un « Heat Hazard » pour Monza — seuil franchi quand l'indice de chaleur prévu dépasse 31 °C en course, deuxième déclenchement de la saison après l'Autriche : les pilotes devront choisir entre porter une veste réfrigérante ou embarquer 0,5 kg de lest compensatoire. Cette météo stable réduit la probabilité d'un scénario intermédiaires et renforce le scénario de référence à un arrêt, mais la chaleur ajoute une contrainte de gestion thermique du train arrière sur un circuit qui le sollicite déjà fortement en sortie de chicane. <a href="https://racingnews365.com/fia-declare-heat-warning-for-italian-gp-as-extreme-temperatures-forecast" data-desc="Seuil de déclenchement du Heat Hazard, mesures veste réfrigérante / lest.">RacingNews365 — Heat Hazard déclaré pour Monza</a></p>
        <div class="callout">
          Stratégies de base : <strong>Medium → dur</strong> (référence, flexible) · <strong>Tendre → dur</strong> (attaque au départ) · <strong>Dur → medium</strong> (pour Antonelli et les pilotes partant loin) · <strong>Deux arrêts</strong> (probablement trop coûteux, sauf forte dégradation ou Safety Car).
        </div>
        <p>Moments qui peuvent décider la course : le départ et la première chicane (aspiration déjà déterminante avant le premier freinage), le premier tour après chaque arrêt, le trafic énergétique (une voiture enfermée peut manquer de réserve électrique pour dépasser), une Safety Car éventuelle, et le choix de niveau d'appui (une voiture très déchargée est difficile à dépasser mais dégrade davantage ses pneus).</p>
      </div>
    </section>

    <section class="block" data-num="06" id="sec-p6">
      <div class="sec-marker"><span class="n">06</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">06</span> Hiérarchie prévisionnelle</h2>
        <p><strong>Pole position :</strong> Russell, Norris, Hamilton/Leclerc, Verstappen, Piastri en tête de peloton théorique — même si Russell lui-même refuse de trancher entre les quatre écuries de tête avant le drapeau à damier. Antonelli, relégué en fond de grille, change d'objectif : remorquer Russell dans son tour lancé plutôt que viser sa propre pole.</p>
        <p><strong>Rythme de course attendu :</strong> premier groupe — McLaren, Mercedes, Ferrari ; outsider proche — Verstappen ; points — Racing Bulls (Tsunoda), Audi, Alpine ; plus en difficulté — Aston Martin, Williams, Haas, Cadillac.</p>
        <div class="callout">
          <strong>Pronostic conditionnel</strong> — Le moteur Ferrari est désormais confirmé pour les deux voitures : si le gain se rapproche des 15 chevaux évoqués sans compromettre la fiabilité, Hamilton et Leclerc peuvent devenir les références du week-end ; à gain plus modeste (les estimations vont de 10 à 15 ch), la lutte à quatre équipes — Mercedes, McLaren, Ferrari, Red Bull — reste ouverte, comme le formule Russell lui-même. Si Red Bull trouve une RB22 stable sur les vibreurs malgré les EL1 manqués par Verstappen : il peut se joindre à la lutte. Si le remorquage d'Antonelli fonctionne en qualifications : Russell gagne un avantage rare face à McLaren et Ferrari sur les longues lignes droites. Si une Safety Car intervient tardivement : Antonelli redevient une menace pour le podium grâce à son moteur neuf.
        </div>
      </div>
    </section>

    <section class="block" id="sec-p7">
      <div class="prose">
        <h2 class="sectitle">Conclusion</h2>
        <p>Mercedes présente toujours la meilleure adéquation théorique au circuit, mais l'admet elle-même en retard sur les évolutions apportées par McLaren et Ferrari ce week-end. McLaren arrive avec la meilleure dynamique récente — deux victoires consécutives et un triplé en ligne de mire — mais un déficit en virages lents qu'elle qualifie elle-même de « dingue ». Ferrari a levé sa principale incertitude en confirmant son nouveau moteur pour Hamilton et Leclerc, sans en quantifier officiellement le gain. Red Bull dispose du meilleur thermique mais aborde le week-end avec Verstappen privé des EL1.</p>
        <div class="callout">La séance la plus révélatrice ne sera probablement pas la première simulation de qualification, mais les longs relais du vendredi : vitesse en fin de ligne droite, moment où chaque moteur commence à perdre son déploiement électrique, stabilité sur les vibreurs et dégradation du pneu arrière. C'est là que la véritable hiérarchie de Monza apparaîtra.</div>
      </div>
    </section>

    <section class="block" id="sec-p8">
      <details class="sources">
        <summary>Sources utilisées — Pré-analyse Monza (19 liens)</summary>
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
            <li><a href="https://www.motorsport.com/f1/news/f1-ferrari-aduo2-engines-ready-but-monza-debut-decision-due-at-weekend/10849610/?utm_source=chatgpt.com" data-desc="Article publié avant la confirmation finale — décision depuis tranchée, voir groupe « Mise à jour » ci-dessous.">Ferrari ADUO2 — décision attendue (dépassé)</a><span class="desc">Motorsport.com</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Mise à jour — 3/4 septembre, avant les EL1</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/latest/article/leclerc-targets-very-special-monza-weekend-with-more-power-from-new-ferrari-engine.5R0ZYizMM9sHZ2raSfLnRX" data-desc="Confirmation directe par Leclerc du nouveau moteur pour les deux SF-26, citations complètes.">Leclerc confirme le nouveau moteur Ferrari</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/russell-insists-mercedes-will-work-as-a-team-in-monza-qualifying-before-antonelli-grid-penalty.3KS3yXktFxuX0VZ9c14Wzn" data-desc="Russell sur le momentum McLaren, le retard de Mercedes en évolutions, et le plan de remorquage par Antonelli.">Russell : « le momentum est du côté de McLaren »</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.motorsport.com/f1/news/mercedes-confirms-kimi-antonelli-grid-penalty-in-monza-for-full-power-unit-change/10848891/" data-desc="Confirmation officielle Mercedes du changement complet de groupe propulseur.">Mercedes confirme la pénalité d'Antonelli</a><span class="desc">Motorsport.com</span></li>
            <li><a href="https://www.crash.net/f1/news/1103373/1/why-championship-leader-kimi-antonelli-taking-grid-penalty-his-home-f1-race" data-desc="Détail des 4 éléments du groupe propulseur dépassés et du départ en fond de grille.">Pourquoi Antonelli prend une pénalité à domicile</a><span class="desc">Crash.net</span></li>
            <li><a href="https://racingnews365.com/lando-norris-raises-mclaren-concern-as-biggest-weakness-set-for-ultimate-exposure" data-desc="Aveu du déficit McLaren en virages lents et anomalie de simulation Hongrie/Monza rapportée par Piastri.">Norris pointe la faiblesse McLaren en virages lents</a><span class="desc">RacingNews365</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/its-certainly-the-plan-norris-evaluates-chances-of-victory-hat-trick-in-monza.HjTj3a8ybmeIo7DXDTrhk" data-desc="Norris sur ses chances de triplé après Hongrie et Zandvoort.">Norris évalue ses chances de triplé</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://racingnews365.com/red-bull-replace-max-verstappen-for-monza-fp1" data-desc="Verstappen cède les EL1 à Iwasa pour la séance rookie obligatoire, sans lien avec sa santé.">Verstappen absent des EL1, remplacé par Iwasa</a><span class="desc">RacingNews365</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/lawson-to-replace-hadjar-again-at-red-bull-as-tsunoda-continues-to-substitute-for-racing-bulls-in-monza.4pI3a9wGM9uTDfK9DqRUMU" data-desc="Confirmation du remplacement, blessure au poignet de Hadjar contractée pendant la coupure estivale.">Lawson remplace de nouveau Hadjar chez Red Bull</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://racingnews365.com/fia-declare-heat-warning-for-italian-gp-as-extreme-temperatures-forecast" data-desc="Seuil de déclenchement du Heat Hazard (indice de chaleur &gt; 31 °C), mesures veste réfrigérante / lest de 0,5 kg.">FIA déclare un Heat Hazard pour Monza</a><span class="desc">RacingNews365</span></li>
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
`;
