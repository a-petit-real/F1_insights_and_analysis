// Analyse Round 15 — Grand Prix d'Azerbaïdjan 2026 (Bakou).
//
// Sourcing : résultats, arrêts aux stands, relais pneus, météo et messages
// de course (RCM) = pipeline production (scripts/ingest_jolpica.py pour les
// résultats/classements officiels, scripts/ingest_openf1.py pour les temps
// au tour/pneus/météo/RCM), lus via race_briefing.py et race_briefing_full_rcm.py
// — primaire. Grille de départ, pénalités de qualification (Sainz 5 places pour
// drapeaux jaunes, Alonso/Stroll groupe propulseur) et contexte championnat =
// voir quali-fr.js pour le sourcing complet. Déroulé de course, citations et
// contexte narratif = rapport officiel Formula1.com de la course, fetché en
// primaire via fetch-url.yml. Détail de la grille définitive et liste des
// pénalités de qualification recoupés avec RaceFans (fetché en primaire).
//
// Point de rigueur : l'accrochage à trois (Colapinto/Gasly/Norris) et la
// pénalité de 10s pour Colapinto sont confirmés par les messages de course
// eux-mêmes (RCM : "CAUSING A COLLISION", 16:11:31, pénalité prononcée à
// 16:39 UTC) — jamais construits sur le seul texte de presse. Le classement
// pilotes après course (Antonelli 302pts, Russell 236pts, écart réduit à
// 66 points) recolle exactement à l'addition des points marqués ce dimanche
// (Antonelli +10, Russell +25) sur l'écart de 81 points établi avant la
// course par scripts/standings_briefing.py (round 14). Aucune donnée inventée.
export const ROUND15_ANALYSE_FR_HTML = `
<div class="hero prose">
      <p class="eyebrow">Grand Prix d'Azerbaïdjan · Bakou · samedi 26 septembre 2026</p>
      <p class="verdict">George Russell résiste à un Max Verstappen déchaîné jusqu'à la ligne d'arrivée et décroche sa huitième victoire de la saison, au bout du Grand Prix le plus mouvementé de l'année à Bakou — deux Safety Car, un carambolage à trois qui prive McLaren et Alpine de points, et une remontée de la P16 à la P5 pour Antonelli qui referme l'écart au championnat à 66 points.</p>
      <div class="resultstrip">
        <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes · parti 1<sup>er</sup></span></div>
        <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · +0,196s</span></div>
        <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Hadjar</span> <span class="gap">Red Bull · +10,704s</span></div>
        <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari · +14,136s</span></div>
        <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · +14,512s</span></div>
      </div>
      <p class="subverdict">Parti en pole avec la plus grosse marge de sa carrière, Russell contrôle une première moitié de course tranquille pendant qu'Antonelli, relégué en P16 après son accident de qualification, entame une remontée patiente. Le scénario bascule à l'erreur d'Albon au virage 6 : Safety Car, arrêts groupés, puis un nouveau chaos au redémarrage quand Colapinto verrouille ses freins au virage 1 et emporte son coéquipier Gasly et McLaren Norris dans un accrochage à trois qui met fin à leur course. Sous la deuxième Safety Car, Piastri part lui aussi à la faute et dégringole de la P3 à la P15. Dans le nettoyage général, Antonelli grimpe jusqu'à la P5, pendant que Russell et Verstappen se livrent un duel de tous les instants sur les derniers tours — le Néerlandais revient à hauteur du Mercedes sur la ligne d'arrivée, mais Russell tient bon pour 0,196s.</p>
    </div>

    <section class="block" data-num="01" id="sec-r1">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> Le contexte avant le départ</h2>
        <p>George Russell s'élance en pole avec 0,837s d'avance sur Leclerc — la plus grosse marge de la saison — devant un plateau resserré au possible pour les places suivantes : Piastri et Hadjar sur la deuxième ligne, Norris et Hamilton sur la troisième. La grille définitive diffère du classement brut de qualification à plusieurs endroits : Sainz écope d'une pénalité de cinq places pour non-ralentissement sous drapeaux jaunes (P9 brute → P14 sur la grille), tandis qu'Alonso et Stroll sont relégués en fond de grille pour changement de composants du groupe propulseur, promouvant les deux Cadillac de Pérez (P19) et Bottas (P20). Kimi Antonelli, non classé après son accident au virage 1 en Q1, s'élance 16<sup>e</sup> — sa pire position de qualification de la saison, mais avec une avance de 81 points au championnat sur Russell pour absorber l'accroc. <a href="/courses/15" data-desc="Détail complet des qualifications : classement par phase, pénalités, accident d'Antonelli.">Voir l'analyse des qualifications</a></p>
        <p>Le plateau se scinde presque à parts égales entre médium et tendre au départ. Russell, Norris, Gasly, Verstappen et Colapinto optent pour le médium parmi le Top 10, pariant sur une meilleure gestion en fin de premier relais sur un circuit réputé pour la dégradation thermique dans les longues lignes droites. Leclerc, Piastri, Hadjar, Hamilton et Bearman partent en tendre, cherchant à profiter d'un meilleur rythme initial pour gagner des places avant la première fenêtre d'arrêt. Antonelli, hors de sa position naturelle, choisit lui aussi le médium pour une remontée sur la durée.</p>
      </div>
    </section>

    <section class="block" data-num="02" id="sec-r2">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

        <h3 class="subtitle">Départ : Piastri s'empare de la P2, Antonelli recule encore</h3>
        <p>Au signal, Russell prend un excellent envol et ne sera plus jamais menacé sur la piste avant les tout derniers tours. Piastri profite du meilleur départ derrière lui pour se hisser en P2, pendant que Norris déborde Hadjar pour la P4 et met Leclerc sous pression. Verstappen, lui, gagne déjà des places sur Gasly et Hamilton grâce à un mouvement propre à l'intérieur. À l'inverse, la course d'Antonelli démarre mal : au lieu de grappiller des positions depuis sa P16, l'Italien recule d'un cran supplémentaire à la P17.</p>
        <p>Hadjar ne met pas longtemps à reprendre la P4 à Norris, avant que ce dernier ne cède également la place à Verstappen — le double effacement du Britannique laissant les deux Red Bull et Piastri se disputer les avant-postes derrière un Russell déjà à 1,2s devant.</p>

        <h3 class="subtitle">Le double assaut de Red Bull : Hadjar puis Verstappen dépassent Leclerc</h3>
        <p>Hadjar ouvre les hostilités contre Leclerc, tentant l'extérieur du virage 1 sans réussir à se maintenir devant, avant de conclure la manœuvre quelques virages plus loin pour s'emparer de la P3. Verstappen imite son coéquipier avec la même facilité un peu plus tard, repoussant Leclerc à la 5<sup>e</sup> place. Hadjar revient ensuite à moins d'une seconde de Piastri — l'ingénieur de piste de l'Australien lui demandant de rester « hors de portée » — pendant que Verstappen, auteur du meilleur tour provisoire de la course à peu près au même moment, double son coéquipier dans la ligne droite principale sur instruction de l'équipe pour se lancer directement à l'assaut de Piastri, qui commence à se plaindre de ses pneus arrière.</p>
        <p>Premier accroc mécanique du dimanche au tour 9 : Stroll est rappelé aux stands par Aston Martin pour un problème de pression d'eau et s'arrête dans une zone dégagée, sans intervention de la direction de course. Plus loin dans le peloton, Antonelli profite d'une bagarre serrée entre Lawson et Albon pour passer les deux, pendant que Norris commet une première erreur en verrouillant au virage 5 — un aller-retour dans le dégagement qui ouvre la porte à Hamilton pour la P6.</p>

        <h3 class="subtitle">L'erreur d'Albon au virage 6 déclenche la première Safety Car</h3>
        <p>Vers la mi-course, Russell compte près de dix secondes d'avance sur Piastri, mais frotte le mur au virage 15 et demande à Mercedes de surveiller la pression de ses pneus, inquiet que la sensation « ne soit pas tout à fait normale ». Norris commet une deuxième erreur, cette fois à haute vitesse dans la ligne droite des stands, perdant deux places au profit de Gasly et Antonelli. C'est finalement Albon qui referme la fenêtre stratégique pour tout le monde : verrouillage et sortie de piste au virage 6, qui immobilise sa Williams contre les barrières et met un terme prématuré à sa course.</p>
        <div class="callout">La Safety Car déployée pour dégager la voiture d'Albon tombe idéalement pour les équipes de tête, qui peuvent chausser des pneus neufs à moindre coût de temps. Red Bull exécute un double arrêt impeccable pour Verstappen et Hadjar sans perdre leur ordre, pendant que Hadjar prévient déjà son ingénieur qu'il « aura besoin d'aide contre Piastri » — signe que l'équipe vise ouvertement un doublé aux dépens du pilote McLaren.</div>

        <h3 class="subtitle">Le carambolage du restart : Colapinto, Gasly et Norris hors course</h3>
        <p>Au redémarrage, Russell conserve la tête de justesse pendant que Verstappen profite de l'occasion pour enfin s'emparer de la P2 sur Piastri. Le chaos éclate au freinage du virage 1 : Colapinto verrouille complètement ses roues avant et percute son coéquipier Gasly, qui ne peut lui-même éviter la McLaren de Norris. Les trois monoplaces sortent de la piste et abandonnent, provoquant une deuxième période de Safety Car pour dégager les débris. Les commissaires prononceront plus tard une pénalité de 10 secondes contre Colapinto pour avoir causé la collision — convertie en pénalité de grille pour la prochaine course puisque l'Argentin n'a pas terminé celle-ci. « Une grosse erreur, j'ai complètement verrouillé avec des pneus et des freins froids, j'étais totalement hors de contrôle », reconnaîtra Colapinto après la course.</p>
        <p>Le même tour voit un accrochage séparé entre les deux Racing Bulls : Lindblad touche la roue arrière de Lawson, qui ne cache pas son agacement à la radio (« J'adore me faire sortir par mon coéquipier, c'est vraiment classe ») avant que les commissaires ne classent l'incident sans suite.</p>

        <h3 class="subtitle">Le tour à vide de Piastri, la remontée d'Antonelli</h3>
        <p>Au deuxième redémarrage, Russell gère bien mieux la relance et maintient Verstappen derrière lui, mais la course de Piastri, alors 3<sup>e</sup>, tourne au calvaire : comme plusieurs pilotes avant lui, il verrouille au premier virage et doit effectuer un tour sur lui-même pour repartir, dégringolant jusqu'à la 15<sup>e</sup> place. Dans le nettoyage qui suit, Antonelli se retrouve propulsé en P6 et fond sur Hamilton, qu'il double dans la ligne droite principale à huit tours de l'arrivée pour prendre la 5<sup>e</sup> place — l'aboutissement d'une remontée patiente entamée dès la P17 du premier tour.</p>

        <h3 class="subtitle">Le duel final Russell-Verstappen, décidé à la ligne</h3>
        <p>Sur les tous derniers tours, Verstappen colle au pare-chocs de Russell, les deux pilotes séparés de quelques dixièmes seulement et repoussant les limites de la piste à chaque relance. Un dernier drapeau jaune, provoqué par la sortie de piste de Bottas contre le mur, menace un instant de perturber leur duel juste avant l'entame du 51<sup>e</sup> et dernier tour, mais la course reste neutralisée localement sans nouvelle Safety Car. Verstappen recolle au freinage de la ligne droite des stands et se porte à hauteur de la Mercedes, sans toutefois parvenir à compléter le dépassement : Russell franchit la ligne avec 0,196s d'avance pour sa huitième victoire de la saison.</p>
      </div>
    </section>

    <section class="block" data-num="03" id="sec-r3">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

        <h3 class="subtitle">Mercedes — Russell géré au plus près malgré une alerte pneu et un souci moteur</h3>
        <p>Au-delà de sa gestion irréprochable des deux redémarrages, Russell a couru une bonne partie de la deuxième moitié de course avec une inquiétude sur la pression de ses pneus après avoir frotté le mur du virage 15. Sa propre déclaration d'après-course révèle un problème supplémentaire resté invisible sur la piste : en levant le pied pour le drapeau jaune de Bottas, il perd temporairement toute puissance turbo — un incident qui aurait pu coûter la victoire si Verstappen avait eu un tour de plus pour en profiter.</p>

        <h3 class="subtitle">Red Bull — un double arrêt exécuté à la perfection, un doublé manqué de peu</h3>
        <p>L'exécution technique de Red Bull sous la première Safety Car — un double arrêt qui ne coûte aucune position aux deux voitures — a posé les bases de la remontée de Verstappen et du podium d'Hadjar. L'intention affichée par l'équipe de viser un résultat 2-3 aux dépens de Piastri s'est réalisée au-delà des espérances lorsque le pilote McLaren s'est éliminé lui-même au redémarrage suivant, laissant Hadjar hériter de la P3 sans avoir eu besoin de le dépasser sur la piste.</p>

        <h3 class="subtitle">Alpine — la faute de Colapinto coûte un doublé McLaren-Alpine et fait deux victimes de plus</h3>
        <p>Le verrouillage de Colapinto au redémarrage n'a pas seulement mis fin à sa propre course : il a emporté son coéquipier Gasly, qui n'a eu aucun moyen d'éviter la collision, ainsi que la McLaren de Norris. La pénalité de 10 secondes convertie en pénalité de grille pour Bahreïn sanctionne une erreur reconnue par le pilote lui-même, mais le coût réel se mesure surtout à trois voitures éliminées d'un seul geste sur un circuit où les points se jouaient sur des détails.</p>

        <h3 class="subtitle">McLaren — une pole manquée en qualification, une course à oublier pour les deux voitures</h3>
        <p>Norris avait déjà multiplié les erreurs de pilotage avant même d'être rattrapé par l'accrochage de Colapinto qui met fin à sa course, tandis que Piastri, un temps solide 3<sup>e</sup> avant son propre verrouillage au virage 1, dégringole jusqu'à la 15<sup>e</sup> place puis ne remonte qu'à la 14<sup>e</sup> à l'arrivée. Un week-end sans le moindre point pour l'écurie, à un moment de la saison où Norris reste engagé dans la lutte pour la 2<sup>e</sup> place du championnat des pilotes derrière Antonelli.</p>

        <h3 class="subtitle">Mercedes — Antonelli limite la casse d'un week-end difficile</h3>
        <p>Reparti de la pire position de qualification de sa saison, Antonelli n'a jamais forcé au-delà du raisonnable pour remonter — dépassements propres sur Lawson et Albon en début de course, patience payante dans le chaos des deux redémarrages pour se retrouver P6 sans prise de risque, puis dépassement net sur Hamilton pour la 5<sup>e</sup> place. Une remontée de P16 à P5 qui limite la perte au championnat à 15 points sur Russell malgré un week-end globalement raté.</p>
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
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>George Russell</td><td class="pos">1 → 1<span class="delta neutral">=</span></td><td>Départ parfait, gestion irréprochable des deux redémarrages, et un problème de turbo tenu secret jusqu'après l'arrivée qui aurait pu tout changer face à un Verstappen revenu à hauteur sur la ligne. Huitième victoire de la saison, obtenue sous une pression constante en fin de course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Max Verstappen</td><td class="pos">8 → 2<span class="delta good">+6</span></td><td>Auteur du plus bel enchaînement de dépassements de la course (Gasly, Hamilton, Leclerc, puis Piastri au premier redémarrage), Verstappen revient jusqu'à hauteur de Russell sur la ligne d'arrivée sans jamais réussir à compléter le dépassement. Une remontée de six places qui confirme le rythme de Red Bull ce dimanche.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Isack Hadjar</td><td class="pos">4 → 3<span class="delta good">+1</span></td><td>Dépassement propre sur Leclerc en tout début de course, puis hérite de la P3 sans combat lorsque Piastri s'élimine seul au redémarrage. Un podium construit sur de la régularité plutôt que sur une prise de risque, complétant le doublé Red Bull.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Charles Leclerc</td><td class="pos">2 → 4<span class="delta bad">-2</span></td><td>Dépassé par les deux Red Bull en début de course sans jamais pouvoir répliquer, Leclerc profite ensuite du chaos derrière lui pour conserver une 4<sup>e</sup> place tranquille — un résultat honorable qui masque un déficit de rythme réel face à Hadjar et Verstappen ce dimanche.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Kimi Antonelli</td><td class="pos">16 → 5<span class="delta good">+11</span></td><td>La plus belle remontée du peloton après la pire qualification de sa saison : dépassements propres en début de course, patience dans le chaos des deux redémarrages, puis dépassement net sur Hamilton pour les points. Limite la perte au championnat à 15 points sur Russell.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Lewis Hamilton</td><td class="pos">6 → 6<span class="delta neutral">=</span></td><td>Profite de l'erreur de Norris au virage 5 pour prendre la 6<sup>e</sup> place en début de course, mais ne peut rien faire face au retour d'Antonelli en fin de course. Un dimanche sans éclat particulier, ni erreur ni performance marquante.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Arvid Lindblad</td><td class="pos">15 → 7<span class="delta good">+8</span></td><td>Auteur d'un contact mineur avec son coéquipier Lawson au premier redémarrage sans en subir les conséquences sportives, Lindblad devance finalement Ocon sur la ligne d'arrivée pour ses premiers points de la saison chez Racing Bulls.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Esteban Ocon</td><td class="pos">13 → 8<span class="delta good">+5</span></td><td>Devancé par Lindblad sur la ligne après avoir géré trop prudemment le dernier drapeau jaune de la course, Ocon marque tout de même des points solides pour Haas, qui score pour la première fois depuis Monaco avec ses deux pilotes.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Oliver Bearman</td><td class="pos">10 → 9<span class="delta good">+1</span></td><td>Course sans incident notable, complétant un week-end à deux points pour Haas — la première fois de la saison que les deux monoplaces marquent ensemble.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Carlos Sainz</td><td class="pos">14 → 10<span class="delta good">+4</span></td><td>Repart de la P14 après sa pénalité de qualification pour drapeaux jaunes, mais profite du chaos devant lui et dépasse Hülkenberg à deux tours de l'arrivée pour glaner le dernier point disponible — une remontée méritoire sur sa course à domicile de Williams.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Nico Hülkenberg</td><td class="pos">18 → 11<span class="delta good">+7</span></td><td>Longtemps dans les points avant de céder la position à Sainz à deux tours du drapeau à damier, Hülkenberg manque de peu une remontée qui aurait été la plus belle de sa course depuis plusieurs week-ends.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Liam Lawson</td><td class="pos">11 → 12<span class="delta bad">-1</span></td><td>Victime d'un contact avec son propre coéquipier Lindblad au premier redémarrage (« J'adore me faire sortir par mon coéquipier », ironise-t-il à la radio), Lawson ne parvient pas à revenir dans les points sur le reste de la course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Gabriel Bortoleto</td><td class="pos">17 → 13<span class="delta good">+4</span></td><td>Course sans incident individuel notable, juste hors des points sur un rythme Audi qui reste en retrait du milieu de tableau ce dimanche.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Oscar Piastri</td><td class="pos">3 → 14<span class="delta bad">-11</span></td><td>Solide 3<sup>e</sup> avant de verrouiller au premier virage lors du deuxième redémarrage et de partir en tête-à-queue, dégringolant jusqu'à la 15<sup>e</sup> place. Ne remonte que d'un rang sur le reste de la course — l'erreur individuelle la plus coûteuse du peloton ce dimanche.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Sergio Pérez</td><td class="pos">19 → 15<span class="delta good">+4</span></td><td>Dernier des classés, profitant de la relégation d'Alonso et Stroll pour un gain de grille avant même le départ, puis d'une course sans incident notable pour terminer devant Piastri.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Valtteri Bottas</td><td class="pos">20 → DNF<span class="delta dnf">DNF</span></td><td>Sortie de piste contre le mur en toute fin de course, provoquant le dernier drapeau jaune avant l'ultime tour — heureusement sans conséquence sur l'issue du duel Russell-Verstappen devant lui.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Franco Colapinto</td><td class="pos">9 → DNF<span class="delta dnf">DNF</span></td><td>Verrouillage complet au freinage du virage 1 au premier redémarrage, provoquant l'abandon de trois voitures dont la sienne. Pénalité de 10 secondes pour avoir causé la collision, convertie en pénalité de grille pour Bahreïn. Erreur reconnue sans détour par le pilote lui-même après la course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Pierre Gasly</td><td class="pos">7 → DNF<span class="delta dnf">DNF</span></td><td>Victime directe du verrouillage de son propre coéquipier au redémarrage, sans aucun moyen d'éviter la collision. Une course à oublier qui n'est en rien de son fait.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Lando Norris</td><td class="pos">5 → DNF<span class="delta dnf">DNF</span></td><td>Deux erreurs de pilotage (virage 5, puis un verrouillage à haute vitesse) avant d'être rattrapé par l'accrochage Colapinto/Gasly au redémarrage, qui met fin à sa course sans qu'il en soit responsable. Réclamera publiquement une sanction plus sévère que la pénalité de grille infligée à Colapinto.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Alexander Albon</td><td class="pos">12 → DNF<span class="delta dnf">DNF</span></td><td>Verrouillage et sortie de piste au virage 6, qui détruit sa Williams contre les barrières et déclenche la première Safety Car de la course — l'incident qui rebat toutes les cartes de la première moitié de course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Fernando Alonso</td><td class="pos">21 → DNF<span class="delta dnf">DNF</span></td><td>Abandon sur un problème mécanique distinct de celui de son coéquipier, après avoir déjà entamé le week-end en fond de grille pour une pénalité de groupe propulseur.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Lance Stroll</td><td class="pos">22 → DNF<span class="delta dnf">DNF</span></td><td>Rappelé aux stands dès le 9<sup>e</sup> tour pour un problème de pression d'eau, le premier abandon du jour, sur une voiture déjà reléguée en fond de grille par la pénalité de groupe propulseur.</td></tr>
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
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Mercedes</td><td>Victoire et 5<sup>e</sup> place — Russell tient bon face à un Verstappen revenu à hauteur sur la ligne malgré un problème de turbo tenu secret jusqu'après course, pendant qu'Antonelli signe la plus belle remontée du peloton (P16 → P5) pour limiter la perte au championnat à 15 points.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Red Bull</td><td>Doublé sur le podium grâce à un double arrêt exécuté à la perfection sous la première Safety Car et à l'élimination spontanée de Piastri au deuxième redémarrage — l'objectif de résultat 2-3 affiché par l'équipe en cours de course se réalise au-delà des espérances.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Ferrari</td><td>4<sup>e</sup> et 6<sup>e</sup> place sans éclat particulier : Leclerc cède du terrain aux deux Red Bull en début de course avant de profiter du chaos pour conserver sa position, pendant que Hamilton subit la remontée d'Antonelli en fin de course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>McLaren</td><td>Week-end sans le moindre point : Norris, déjà auteur de deux erreurs de pilotage, est rattrapé par l'accrochage de Colapinto sans en être responsable, tandis que Piastri s'élimine lui-même au deuxième redémarrage après avoir mené la course en P3.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Alpine</td><td>Double abandon provoqué par son propre pilote : le verrouillage de Colapinto au redémarrage emporte Gasly avec lui, et vaut à l'Argentin une pénalité de grille pour Bahreïn — un dimanche sans le moindre point pour l'écurie.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Racing Bulls</td><td>Premiers points de la saison pour Lindblad (7<sup>e</sup>), malgré un contact avec son propre coéquipier Lawson au redémarrage qui coûte à ce dernier toute chance de marquer.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Haas</td><td>Les deux pilotes dans les points pour la première fois depuis Monaco — Ocon (8<sup>e</sup>) devancé par Lindblad sur la ligne après avoir géré trop prudemment le dernier drapeau jaune, Bearman (9<sup>e</sup>) sans incident notable.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Williams</td><td>Un point sauvé par Sainz (10<sup>e</sup>), reparti de la P14 après sa pénalité de qualification, tandis qu'Albon détruit sa monoplace contre le mur du virage 6 et déclenche la première Safety Car de la course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Audi</td><td>Aucun point marqué : Hülkenberg cède la 10<sup>e</sup> place à Sainz à deux tours du drapeau à damier, Bortoleto termine juste hors du Top 10.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Aston Martin</td><td>Double abandon sur pannes mécaniques distinctes (Stroll dès le 9<sup>e</sup> tour pour un problème de pression d'eau, Alonso plus tard), sur des voitures déjà reléguées en fond de grille par une pénalité de groupe propulseur.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Cadillac</td><td>Aucun point (Pérez 15<sup>e</sup>), Bottas terminant sa course contre le mur en toute fin de Grand Prix — un dimanche sans relief pour l'écurie américaine.</td></tr>
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
              <li><strong>Russell</strong>, huitième victoire de la saison arrachée dans la douleur, un problème de turbo tenu secret jusqu'après l'arrivée face à un Verstappen revenu à hauteur sur la ligne.</li>
              <li><strong>Red Bull</strong>, doublé sur le podium grâce à un double arrêt parfait et à l'élimination spontanée de Piastri.</li>
              <li><strong>Antonelli</strong>, la plus belle remontée du peloton (P16 → P5) après la pire qualification de sa saison.</li>
              <li><strong>Haas</strong>, ses deux pilotes dans les points pour la première fois depuis Monaco.</li>
            </ul>
          </div>
          <div class="verdictcol lose">
            <h4>Perdants</h4>
            <ul>
              <li><strong>McLaren</strong>, aucun point marqué entre l'élimination de Norris (non fautif) et l'auto-élimination de Piastri depuis la P3.</li>
              <li><strong>Colapinto</strong>, verrouillage qui coûte l'abandon à trois voitures dont la sienne et une pénalité de grille pour Bahreïn.</li>
              <li><strong>Gasly</strong>, victime directe de l'erreur de son propre coéquipier sans rien pouvoir y faire.</li>
              <li><strong>Aston Martin</strong>, double abandon sur pannes mécaniques distinctes après un week-end déjà entamé en fond de grille.</li>
            </ul>
          </div>
        </div>
        <div class="callout">Le Grand Prix d'Azerbaïdjan restera celui du chaos maîtrisé : deux Safety Car, un carambolage à trois et une remontée spectaculaire d'Antonelli n'ont pas suffi à priver Russell d'une victoire construite sur un départ parfait et une gestion sans faute des deux redémarrages — même si un problème de turbo resté invisible sur la piste a bien failli tout changer face à un Verstappen revenu à hauteur sur la ligne. L'écart au championnat se resserre à 66 points en faveur d'Antonelli, qui repart de Bakou avec une remontée en guise de consolation après le pire week-end de qualification de sa saison.</div>
      </div>
    </section>

    <section class="block" id="sec-r-next">
      <div class="prose">
        <h2 class="sectitle">Enseignements pour la suite</h2>
        <p>Trois points issus de Bakou à surveiller au prochain rendez-vous :</p>
        <ol style="padding-left:20px; margin:0 0 16px;">
          <li style="margin-bottom:10px;"><strong>Red Bull</strong> a démontré à Bakou un rythme de course capable de menacer Mercedes jusqu'à la ligne — la question est de savoir si Verstappen peut transformer cette dynamique en victoire dès Bahreïn, où Colapinto s'élancera pénalisé après son accrochage de Bakou.</li>
          <li style="margin-bottom:10px;"><strong>McLaren</strong> aborde la suite de la saison sans le moindre point de Bakou, un résultat qui pourrait peser lourd dans la lutte pour la 2<sup>e</sup> place du championnat constructeurs si le scénario venait à se répéter.</li>
          <li><strong>Antonelli</strong> a prouvé à Bakou qu'il pouvait limiter les dégâts d'un week-end raté par une remontée de rythme plutôt que par la seule régularité — de quoi rassurer sur sa capacité à défendre ses 66 points d'avance jusqu'au bout de la saison.</li>
        </ol>
        <a class="bridge-btn" href="/courses" style="text-decoration:none; display:inline-block;">Voir le calendrier de la saison →</a>
      </div>
    </section>

    <section class="block" id="sec-r7">
      <details class="sources">
        <summary>Sources utilisées — GP d'Azerbaïdjan (3 liens)</summary>
        <div class="srcgroup">
          <h5>Données de course</h5>
          <ul>
            <li><span class="desc">The Pit Wall — pipeline production (résultats/standings via scripts/ingest_jolpica.py, temps au tour/pneus/météo/RCM via scripts/ingest_openf1.py), primaire.</span></li>
            <li><span class="desc">The Pit Wall — scripts/race_briefing_full_rcm.py (round 15), messages de course horodatés confirmant les deux Safety Car et la pénalité de Colapinto, primaire.</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Déroulé de course</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/latest/article/russell-narrowly-holds-off-verstappen-to-take-victory-over-the-line-in-chaotic-azerbaijan-gp.5J4lgNh82JDL2GM302irF0" data-desc="Rapport officiel de la course, fetché en primaire — déroulé complet, citations, contexte.">Formula1.com — Russell résiste à Verstappen dans un GP d'Azerbaïdjan chaotique</a><span class="desc">Formula1.com — primaire</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Contexte complémentaire</h5>
          <ul>
            <li><a href="https://www.racefans.net/2026/09/25/2026-azerbaijan-grand-prix-grid/" data-desc="Grille de départ et liste des pénalités de qualification.">RaceFans — grille et pénalités du GP d'Azerbaïdjan</a><span class="desc">RaceFans — primaire</span></li>
          </ul>
        </div>
      </details>
    </section>
`;
