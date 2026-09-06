// Analyse Round 13 — Grand Prix d'Italie 2026 (Monza).
//
// Sourcing : résultats, arrêts aux stands, relais pneus, météo et messages
// de course (RCM) = pipeline production (scripts/ingest_jolpica.py pour les
// résultats/classements officiels, scripts/ingest_openf1.py pour les temps
// au tour/pneus/météo/RCM), lus via race_briefing.py — primaire. Grille de
// départ, déroulé Q1/Q2/Q3 et citations = rapport Formula1.com des
// qualifications (voir quali-fr.js pour le sourcing complet). Déroulé de
// course, citations et contexte narratif = rapport officiel Formula1.com de
// la course, fetché en primaire via fetch-url.yml.
//
// Point de rigueur : les messages de course notent un « INCIDENT TURN 2
// INVOLVING CARS 16 (LEC) AND 44 (HAM) » à 15:03:44 (revu, aucune suite),
// distinct de la sortie de piste solitaire de Leclerc qui déclenche la
// Safety Car puis le drapeau rouge quelques instants plus tard. Les deux
// incidents sont réconciliés avec le rapport officiel : le premier
// correspond à l'accrochage du 1er tour à la chicane (Hamilton poussé sur
// le gravier, « Charles pushed me off! » à la radio), le second à la sortie
// de piste solitaire de Leclerc à la Curva Alboreto au 2e tour — deux
// événements séparés, pas un seul mal identifié. Les relais pneus en base
// recollent exactement, minute par minute, avec la description du rapport
// officiel du choix des gommes au relais 2 (celles prises pendant
// l'interruption du drapeau rouge) et du relais 3 (arrêts groupés sous VSC
// autour du tour 27-28). Aucune donnée inventée.
export const ROUND13_ANALYSE_FR_HTML = `
<div class="hero prose">
      <p class="eyebrow">Grand Prix d'Italie · Monza · 2026</p>
      <p class="verdict">Parti 19<sup>e</sup>, Antonelli a effacé toute la grille pour battre Russell à domicile — et la pole surprise de Gasly n'a tenu qu'une poignée de tours.</p>
      <div class="resultstrip">
        <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · parti 19<sup>e</sup></span></div>
        <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes · +3,857s</span></div>
        <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · +14,718s</span></div>
        <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren · +19,056s</span></div>
        <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">McLaren · +19,253s</span></div>
      </div>
      <p class="subverdict">Une course à deux temps. D'abord un chaos de premier tour — accrochage Leclerc/Hamilton à la chicane, puis sortie de piste solitaire de Leclerc à la Curva Alboreto, Safety Car et drapeau rouge — qui repart sur un départ arrêté et rebat toutes les cartes pneus. Ensuite, la remontée la plus spectaculaire de la saison : Antonelli, relégué en fond de grille par sa pénalité moteur, grimpe jusqu'à la tête en 18 tours et résiste à Russell dans une bagarre fratricide jusqu'à la ligne. Gasly, auteur de la pole surprise la veille, s'efface complètement en course et sauve un point de mieux que le fond de tableau.</p>
    </div>

    <section class="block" data-num="01" id="sec-r1">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> Le contexte avant le départ</h2>
        <p>La grille de départ ne ressemble à aucun pronostic du week-end. Pierre Gasly s'élance en pole pour la première fois de sa carrière, devant Russell — les deux seuls pilotes du Top 6 brut des qualifications à conserver leur position. Une pénalité de trois places pour avoir gêné Lawson en Q2 renvoie Piastri de la 3<sup>e</sup> à la 6<sup>e</sup> place, ce qui promeut les deux Ferrari sur la deuxième ligne : Leclerc 3<sup>e</sup>, Hamilton 4<sup>e</sup>, puis Verstappen 5<sup>e</sup>. <a href="/courses/13" data-desc="Détail complet des qualifications : Q1/Q2/Q3, pénalités, grille de départ.">Voir l'analyse des qualifications</a></p>
        <p>Kimi Antonelli, leader du championnat, s'élance du fond de grille (19<sup>e</sup>) après un changement complet de groupe propulseur assumé avant le week-end — Monza avait été choisi précisément parce qu'un moteur neuf y procure le bénéfice maximal et que les dépassements y restent plus accessibles qu'ailleurs. Albon prend une pénalité similaire ; Lawson et Alonso s'élancent depuis la voie des stands après des modifications sous conditions de parc fermé.</p>
        <p>Au départ, les choix de gommes confirment un plateau divisé : Gasly et Russell en medium, Leclerc, Hamilton et Verstappen en tendre pour attaquer, Tsunoda, Antonelli et Alonso en dur pour absorber une remontée plus longue. Une démonstration de Sebastian Vettel au volant de la Ferrari 2002 de Michael Schumacher précède le départ.</p>
      </div>
    </section>

    <section class="block" data-num="02" id="sec-r2">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

        <h3 class="subtitle">Premier tour : deux incidents distincts, un seul repart</h3>
        <p>Gasly s'envole proprement en tête devant Russell à la première chicane, où les deux Ferrari s'accrochent en se disputant leur position : Hamilton est poussé sur le gravier et hurle à la radio « Charles m'a poussé dehors ! », dégringolant provisoirement hors des points. Les commissaires notent l'incident (« Turn 2 » dans la nomenclature officielle) mais, après course, ne prononcent aucune sanction supplémentaire.</p>
        <p>Un tour plus tard, un second événement — sans lien avec le premier — met fin à la course de Leclerc : après avoir tenu deux glissades dans le secteur central et être repassé derrière Verstappen, le Monégasque perd le contrôle de sa Ferrari à la sortie de la Curva Alboreto et percute violemment les barrières. Voiture de Sécurité immédiate, puis drapeau rouge le temps de dégager la monoplace et réparer le rail — Leclerc sort de lui-même de l'épave, visiblement indemne mais dévasté, dans une scène qui rappelle le chagrin de Mika Häkkinen à Monza en 1999.</p>

        <h3 class="subtitle">Redépart : le pneu dur s'impose, sauf pour quatre pilotes</h3>
        <p>Après l'interruption, la majorité du peloton repart en dur — Russell, Gasly, Colapinto, Piastri, Norris, Lindblad, Bearman, Ocon, Hülkenberg, Lawson, Sainz, Albon et Stroll. Verstappen, Hamilton, Bortoleto, Antonelli, Tsunoda et Bottas optent pour le medium ; Pérez et Alonso repartent en tendre. Tsunoda, qui manque son emplacement sur la grille, provoque l'annulation de la première tentative de redépart et un tour de formation supplémentaire.</p>
        <p>Au signal, Russell conserve l'avantage sur Gasly ; Colapinto prend un temps la 3<sup>e</sup> place à Verstappen avant que le Néerlandais ne la reprenne d'un geste appuyé à la deuxième chicane. Colapinto part ensuite en tête-à-queue à Lesmo 1 après un excès de vitesse, promouvant Hamilton et Piastri. Dès ce stade, Antonelli — déjà remonté en 7<sup>e</sup> position depuis le fond de grille — s'installe dans une bagarre avec les deux McLaren.</p>

        <h3 class="subtitle">La remontée : d'Antonelli à la tête en dix-huit tours</h3>
        <p>Au tour 10, Gasly cède une place à Hamilton puis se fait avaler par Piastri et Antonelli coup sur coup — sa pole de la veille s'efface déjà. Deux tours plus tard, Verstappen prend la tête à Russell à la première chicane ; Piastri passe Hamilton pour se replacer sur le podium virtuel, puis Antonelli imite le mouvement pour prendre la 4<sup>e</sup> place à la deuxième chicane. Russell reprend la tête à Verstappen au tour 15, avant qu'Antonelli ne refasse la même manœuvre sur le champion en titre un tour plus tard. Le tour suivant, la Red Bull signale des soucis (« La voiture est complètement cassée à l'arrière »). Au tour 18, Antonelli conclut sa remontée du fond de grille en prenant la tête à Russell dans le premier virage.</p>

        <h3 class="subtitle">Le duel Antonelli-Russell et la Voiture de Sécurité Virtuelle décisive</h3>
        <p>Le déploiement différent de l'énergie électrique selon les voitures — annoncé par la pré-analyse comme un facteur clé de Monza — produit exactement l'effet attendu : un incessant chassé-croisé entre les deux Mercedes, Antonelli reprenant l'avantage à la deuxième chicane à plusieurs reprises après avoir cédé la position à la première. Les deux pilotes frôlent le contact à la Curva Grande au tour 22, sous l'œil des caméras braquées sur Toto Wolff dans le garage. « Kimi, on va essayer d'arrêter le yoyo, on doit juste construire l'écart sur Verstappen », lui demande le muret. « Ouais, et pendant ce temps il m'est passé devant », répond le pilote italien, avant de questionner directement la consigne.</p>
        <p>L'abandon d'Alonso (dommages suspectés) puis celui de Stroll (panne hydraulique) déclenchent une Voiture de Sécurité Virtuelle autour du tour 27. Hülkenberg, Ocon et Sainz s'arrêtent immédiatement ; Antonelli (nouveau train de medium) et Verstappen (dur) les imitent un tour plus tard. Russell, lui, reste en piste et conserve la tête devant Piastri, Hamilton, Norris et Gasly — Antonelli et Verstappen ressortent respectivement 6<sup>e</sup> et 7<sup>e</sup>.</p>
        <div class="callout">C'est le choix qui façonne la fin de course : Antonelli ressort avec des pneus medium nettement plus frais, Russell reste sur des durs entamés depuis le tour 4. La pré-analyse anticipait un rythme de course tendu entre les deux Mercedes ; c'est finalement l'écart d'âge des pneus, construit par cette VSC, qui tranche.</div>
        <p>Antonelli et Verstappen remontent presque sans effort sur Gasly et Norris pour reprendre les 4<sup>e</sup> et 5<sup>e</sup> places. À une vingtaine de tours du drapeau, les deux hommes ne sont plus qu'à une dizaine de secondes de Russell, qui est par ailleurs signalé pour une possible infraction sous drapeau jaune. Une erreur de Hamilton à la première chicane offre une place de plus à Antonelli au tour 35 ; au tour suivant, l'Italien dépasse Piastri pour la 2<sup>e</sup> place — neuf secondes séparent alors les deux Mercedes, et l'enquête visant Russell est élevée au rang d'investigation complète.</p>

        <h3 class="subtitle">Le sprint final : gravier, pénalité écartée, et la passe décisive</h3>
        <p>« Les tours sont suffisamment rapides en ce moment ? » demande Russell à 15 tours du drapeau. « Kimi est prévu pour vous rattraper juste à la fin de la course », lui répond-on. Le verdict des commissaires — aucune sanction pour l'infraction sous drapeau jaune — confirme un duel loyal jusqu'au bout. À cinq tours de l'arrivée, Antonelli revient dans les échappements de Russell et tente sa chance à la première chicane, mais part large à la sortie et met les quatre roues dans le gravier, perdant du terrain. Il repart aussitôt à l'assaut et fait la décision entre Lesmo 2 et la chicane Ascari au tour 50, avant de s'échapper vers l'arrivée.</p>
        <p>Verstappen suit les deux Mercedes jusqu'au drapeau à damier pour un podium mérité. Derrière, Norris arrache la 4<sup>e</sup> place à Piastri dans un ultime freinage à la Curva Grande — l'Australien peu satisfait d'un écart aussi mince. Hamilton sauve la 6<sup>e</sup> place pour Ferrari sur une journée noire, devant Gasly (pole la veille, 7<sup>e</sup> à l'arrivée), Lindblad, Colapinto et Tsunoda, ce dernier convoqué chez les commissaires pour une possible irrégularité de procédure de départ.</p>
      </div>
    </section>

    <section class="block" data-num="03" id="sec-r3">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

        <h3 class="subtitle">Mercedes — laisser Russell dehors, la décision qui coûte la victoire</h3>
        <p>Sous la VSC du tour 27-28, Mercedes avait le choix entre couvrir ses deux pilotes ou n'en arrêter qu'un. En laissant Russell en tête sur ses pneus durs entamés depuis le tour 4 pendant qu'Antonelli changeait pour des medium tout neufs, l'équipe a maximisé la position sur la piste au prix du rythme en fin de course. Le pari n'était pas absurde — Russell menait alors largement — mais il repose sur l'hypothèse que la position en piste pèserait plus que l'écart d'âge des pneus jusqu'au drapeau. Le duel final, où Antonelli revient de neuf secondes en une quinzaine de tours avant de faire la décision au tour 50, dit clairement laquelle des deux hypothèses s'est vérifiée.</p>
        <p>Le mérite de Mercedes est ailleurs : avoir géré une bagarre interne à couteaux tirés (le double frôlement à la Curva Grande, l'échange tendu à la radio) sans jamais donner de consigne d'équipe artificielle ni sacrifier l'un des deux pilotes pour l'autre — un choix cohérent avec le fait qu'Antonelli, leader du championnat, jouait sa propre bataille pour le titre autant que pour la victoire du jour.</p>

        <h3 class="subtitle">Alpine — la pole ne suffisait pas à tenir le rythme de course</h3>
        <p>Gasly a mené la première partie de course avant de céder trois places en l'espace de trois tours (10 à 12), rattrapé par Hamilton, Piastri puis Antonelli. Rien dans les données de course ne permet de trancher entre une dégradation plus rapide sur l'Alpine ou un simple déficit de rythme pur déjà entrevu dès l'EL3 (9<sup>e</sup> à 0,679s la veille) — la pole avait été construite sur un tour exceptionnel plutôt que sur un rythme de course dominant, et la course l'a confirmé sans ambiguïté. P7 à l'arrivée reste malgré tout la meilleure performance d'Alpine depuis longtemps, avec Colapinto qui ajoute un point supplémentaire en P9.</p>

        <h3 class="subtitle">Ferrari — un accrochage interne, puis un accident qui efface la course</h3>
        <p>La stratégie de course de Ferrari n'a jamais vraiment pu s'exprimer : l'accrochage du premier tour a coûté des places à Hamilton avant même que la course ne commence réellement, et la sortie de piste de Leclerc au tour 2 a mis fin à sa journée. Hamilton a ensuite dû rattraper un déficit artificiel plutôt que jouer sa vraie position de départ (P4) — sa 6<sup>e</sup> place finale, obtenue sur pneu medium pris à la relance, reste un résultat honorable dans ces circonstances, mais loin du podium qui semblait accessible avant le premier tour.</p>

        <h3 class="subtitle">McLaren — Norris solide, Piastri pénalisé deux fois</h3>
        <p>Piastri a payé sa pénalité de qualification (3<sup>e</sup> temps brut, parti 6<sup>e</sup>) puis a manqué de peu le maintien de sa 4<sup>e</sup> place en course face à Norris dans le dernier freinage. Norris, lui, gère une course sans incident majeur pour ramener une 4<sup>e</sup> place cohérente avec son rythme du week-end — sans jamais être en mesure d'inquiéter le trio de tête, McLaren restant à l'écart du combat pour la victoire sur ce week-end, comme l'annonçait la pré-analyse au sujet du déficit en virages lents de la MCL40.</p>
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
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Kimi Antonelli</td><td class="pos">19 → 1<span class="delta good">+18</span></td><td>La remontée de la saison. Prend la tête en 18 tours, résiste à Russell dans un duel loyal et tendu, garde son sang-froid après un passage dans le gravier à cinq tours de l'arrivée et fait la décision au meilleur moment. Rien à redire sur cette performance.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>George Russell</td><td class="pos">2 → 2<span class="delta neutral">=</span></td><td>Course quasiment parfaite jusqu'à la VSC du tour 27 : mène la course, résiste à Verstappen à deux reprises, gère la pression radio sans faiblir. La stratégie de rester en piste sous VSC, décidée par le muret, se retourne contre lui — mais sa défense jusqu'au bout reste solide.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Max Verstappen</td><td class="pos">5 → 3<span class="delta good">+2</span></td><td>Prend la tête un temps au tour 12 malgré une voiture qu'il décrit lui-même comme « cassée à l'arrière », résiste à Russell, profite de la VSC comme Antonelli et referme l'écart sur Gasly et Norris presque sans effort. Podium mérité sur un week-end où le rythme pur manquait pourtant en qualifications.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Lando Norris</td><td class="pos">7 → 4<span class="delta good">+3</span></td><td>Course sans incident majeur, conclue par un freinage décisif sur Piastri à la Curva Grande. Jamais en mesure d'inquiéter le trio de tête, cohérent avec le déficit en virages lents assumé par McLaren avant le week-end.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Oscar Piastri</td><td class="pos">6 → 5<span class="delta good">+1</span></td><td>Paie sa pénalité de qualification puis mène une course propre, jusqu'à céder la 4<sup>e</sup> place à Norris dans le tout dernier freinage. Pas de faute individuelle, mais deuxième week-end de suite où l'écart avec son coéquipier reste défavorable.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Lewis Hamilton</td><td class="pos">4 → 6<span class="delta bad">-2</span></td><td>Poussé sur le gravier dès le premier tour dans l'accrochage avec Leclerc, obligé de reconstruire toute sa course. Rythme correct sur ses pneus medium pris à la relance ; 6<sup>e</sup> place qui limite la casse plus qu'elle ne récompense un vrai potentiel de podium.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Pierre Gasly</td><td class="pos">1 → 7<span class="delta bad">-6</span></td><td>Première pole de sa carrière, mais rythme de course insuffisant pour la défendre : cède trois places en trois tours dès le tour 10. La performance d'un tour exceptionnel n'a jamais été confirmée sur la distance — cohérent avec une EL3 discrète (9<sup>e</sup>) la veille.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Arvid Lindblad</td><td class="pos">9 → 8<span class="delta good">+1</span></td><td>Course discrète mais efficace en fond de Top 10, sans incident notable relevé en course — une gestion propre plutôt qu'un coup d'éclat.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Franco Colapinto</td><td class="pos">7 → 9<span class="delta bad">-2</span></td><td>Tête-à-queue à Lesmo 1 après un excès de vitesse au redémarrage, qui aurait pu coûter beaucoup plus cher. Remonte pour arracher un point supplémentaire pour Alpine malgré cet incident.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Yuki Tsunoda</td><td class="pos">17 → 10<span class="delta good">+7</span></td><td>Manque son emplacement sur la grille et provoque l'annulation du premier redémarrage — infraction encore à l'étude chez les commissaires au moment de la publication. Belle remontée sur la distance malgré cet impair.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Gabriel Bortoleto</td><td class="pos">11 → 11<span class="delta neutral">=</span></td><td>Course sans éclat particulier ni incident relevé, hors des points sur une piste qui ne favorisait pas particulièrement l'Audi.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Nico Hülkenberg</td><td class="pos">13 → 12<span class="delta good">+1</span></td><td>Impliqué dans un accrochage au virage 4 avec Lawson, noté par les commissaires. Rythme correct sur la distance sans être décisif.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Carlos Sainz</td><td class="pos">15 → 13<span class="delta good">+2</span></td><td>Course sans histoire notable au classement, en délicatesse générale comme le reste de Williams sur ce week-end.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Liam Lawson</td><td class="pos">14 (voie des stands) → 14<span class="delta neutral">=</span></td><td>Deuxième week-end de suite en remplacement chez Red Bull, parti de la voie des stands après une modification de l'aileron arrière. Gêné par Piastri en qualifications, puis accroché avec Hülkenberg en course — un week-end sans réel point positif à en tirer.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Oliver Bearman</td><td class="pos">12 → 15<span class="delta bad">-3</span></td><td>Course discrète, hors des points sur une Haas qui manquait de rythme ce week-end malgré une EL2 prometteuse (P8).</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Esteban Ocon</td><td class="pos">16 → 16<span class="delta neutral">=</span></td><td>Termine à un tour, sans incident notable relevé — une course sans conséquence pour Haas ce dimanche.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Alexander Albon</td><td class="pos">18 → 17<span class="delta good">+1</span></td><td>Seul pilote à avoir tenté un troisième train de pneus, très tardif (tour 46, pour du tendre) — une stratégie alternative qui ne rapporte rien de plus qu'une place gagnée sur des retardataires.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Sergio Pérez</td><td class="pos">20 → 18<span class="delta good">+2</span></td><td>Pénalisé de 5 secondes pour une infraction aux instructions de la voie d'échappement au premier virage, en plus d'un incident de procédure de départ noté séparément. Week-end à oublier pour Cadillac.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Valtteri Bottas</td><td class="pos">19 → 19<span class="delta neutral">=</span></td><td>Termine à un tour sans incident individuel notable, cohérent avec un rythme Cadillac hors des points sur ce circuit.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Lance Stroll</td><td class="pos">22 → DNF<span class="delta dnf">DNF</span></td><td>Abandon sur panne hydraulique, sans faute de pilotage identifiée — la deuxième Aston Martin sur le carreau le même après-midi que sa coéquipière d'écurie.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Fernando Alonso</td><td class="pos">21 (voie des stands) → DNF<span class="delta dnf">DNF</span></td><td>Abandon pour dommages suspectés autour du tour 26, sans lien apparent avec un incident de course identifié — la VSC qui a redistribué toute la deuxième moitié de course naît directement de ce double abandon Aston Martin.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Charles Leclerc</td><td class="pos">3 → DNF<span class="delta dnf">DNF</span></td><td>Impliqué sans sanction dans l'accrochage du 1<sup>er</sup> tour avec Hamilton, puis sortie de piste solitaire à la Curva Alboreto au tour 2 qui met fin à sa course et déclenche Safety Car puis drapeau rouge. Rentre à pied, visiblement abattu — une journée à oublier après un podium qui semblait à sa portée avant le départ.</td></tr>
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
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Mercedes</td><td>Victoire et 2<sup>e</sup> place malgré une décision de VSC qui coûte la course à Russell : laisser le leader en piste sur des pneus vieux de 24 tours pendant qu'Antonelli chaussait du neuf a fabriqué l'écart de rythme qui décide la fin de course. Gestion irréprochable de la rivalité interne, sans consigne artificielle.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Red Bull</td><td>Podium inattendu au vu du rythme de qualification, obtenu par la résistance de Verstappen malgré une voiture qu'il juge lui-même « cassée à l'arrière » et par un profit maximal tiré de la VSC. Lawson, en délicatesse tout le week-end, n'apporte rien de plus qu'une position neutre.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>McLaren</td><td>Week-end sans éclat ni erreur majeure : Norris et Piastri ramènent P4 et P5 dans l'ordre logique de leurs qualifications, sans jamais menacer le trio de tête. Une course de gestion plutôt que d'ambition, cohérente avec le déficit en virages lents assumé avant Monza.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Ferrari</td><td>Week-end catastrophique : un accrochage interne au premier tour qui coûte des places à Hamilton, puis l'abandon de Leclerc au tour 2 qui efface toute chance de podium. Hamilton limite la casse en 6<sup>e</sup> position sur une stratégie de fortune plutôt que sur un vrai plan de course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Alpine</td><td>Première pole de l'écurie avec Gasly, qui ne se traduit pas en résultat de course faute de rythme sur la distance — P7 reste malgré tout la meilleure performance récente de l'équipe, complétée par le point de Colapinto en P9.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Racing Bulls</td><td>Double top 10 discret mais solide (Lindblad 8<sup>e</sup>, Tsunoda 10<sup>e</sup>), ce dernier obtenu malgré une erreur de procédure de départ encore à l'étude chez les commissaires.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Audi</td><td>Aucun point marqué (Bortoleto 11<sup>e</sup>, Hülkenberg 12<sup>e</sup>, ce dernier impliqué dans un accrochage avec Lawson), sur un circuit qui ne mettait pas particulièrement en valeur la voiture.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Williams</td><td>Week-end sans relief : Sainz 13<sup>e</sup>, Albon 17<sup>e</sup> après une stratégie alternative à trois arrêts qui n'a rien rapporté de plus qu'une position sur des retardataires.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Haas</td><td>Aucun point marqué (Bearman 15<sup>e</sup>, Ocon 16<sup>e</sup> à un tour), un recul par rapport à l'EL2 prometteuse de Bearman la veille.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Aston Martin</td><td>Double abandon (dommages suspectés pour Alonso, panne hydraulique pour Stroll) qui déclenche directement la VSC décisive de la deuxième moitié de course — un week-end à oublier des deux côtés du garage.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Cadillac</td><td>Aucun point (Pérez 18<sup>e</sup> avec une pénalité de 5 secondes, Bottas 19<sup>e</sup> à un tour), sur un rythme qui reste hors du milieu de tableau ce week-end.</td></tr>
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
              <li><strong>Antonelli</strong>, pour une remontée de fond de grille jusqu'à la victoire — 267 points et 7 victoires en tête du championnat, une avance qu'il continue de creuser.</li>
              <li><strong>Verstappen</strong>, podium inattendu avec une voiture qu'il jugeait lui-même en délicatesse.</li>
              <li><strong>Gasly et Alpine</strong>, pour la première pole de l'écurie, même sans résultat de course à sa hauteur.</li>
              <li><strong>Tsunoda</strong>, belle remontée du 17<sup>e</sup> au 10<sup>e</sup> malgré une erreur de procédure au redépart.</li>
            </ul>
          </div>
          <div class="verdictcol lose">
            <h4>Perdants</h4>
            <ul>
              <li><strong>Leclerc</strong>, sortie de piste solitaire qui efface un podium possible et laisse Ferrari exsangue au championnat constructeurs.</li>
              <li><strong>Russell</strong>, victime d'une décision stratégique de son propre muret sous la VSC décisive.</li>
              <li><strong>Aston Martin</strong>, double abandon qui aggrave un week-end déjà difficile.</li>
              <li><strong>Gasly</strong> côté course : la pole n'aura tenu que trois tours face au rythme réel du peloton de tête.</li>
            </ul>
          </div>
        </div>
        <div class="callout">Monza restera l'image d'un contraste : la pole la plus surprenante de la saison, effacée en une poignée de tours, et la remontée la plus spectaculaire, construite sur dix-huit. Antonelli confirme que son avance au championnat (267 points, 66 sur Russell) ne doit rien au hasard — sept victoires, dont celle-ci depuis le fond de grille.</div>
      </div>
    </section>

    <section class="block" id="sec-r-next">
      <div class="prose">
        <h2 class="sectitle">Enseignements pour la suite</h2>
        <p>Trois points issus de Monza à surveiller au prochain rendez-vous :</p>
        <ol style="padding-left:20px; margin:0 0 16px;">
          <li style="margin-bottom:10px;"><strong>Ferrari</strong> aborde l'inauguration de Madring avec zéro point marqué à Monza et un incident interne non sanctionné mais révélateur d'un manque de coordination entre ses deux pilotes — un motif d'inquiétude qui dépasse le seul accident de Leclerc.</li>
          <li style="margin-bottom:10px;"><strong>Antonelli</strong> a désormais prouvé, à deux reprises cette saison, qu'un départ du fond de grille ne l'empêche pas de gagner. Sur un circuit totalement inédit comme Madring, cette capacité à remonter vite pourrait compter double si un incident de qualification survient.</li>
          <li><strong>Alpine</strong> a montré à Monza qu'un tour exceptionnel ne suffit pas sans rythme de course. La vraie question pour la suite est de savoir si le package amené par Gasly (et étendu à Colapinto) referme cet écart sur la distance, ou si Monza restera un pic isolé.</li>
        </ol>
        <a class="bridge-btn" href="/courses/14" style="text-decoration:none; display:inline-block;">Lire la pré-analyse du prochain GP →</a>
      </div>
    </section>

    <section class="block" id="sec-r7">
      <details class="sources">
        <summary>Sources utilisées — GP d'Italie (5 liens)</summary>
        <div class="srcgroup">
          <h5>Données de course</h5>
          <ul>
            <li><span class="desc">The Pit Wall — pipeline production (résultats/standings via scripts/ingest_jolpica.py, temps au tour/pneus/météo/RCM via scripts/ingest_openf1.py), primaire.</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Déroulé de course et qualifications</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/latest/article/antonelli-beats-russell-to-italian-grand-prix-win-with-stunning-comeback-drive.15WtFEBT5JEe4drdeO88t2" data-desc="Rapport officiel de la course, fetché en primaire — déroulé complet, citations, contexte.">Formula1.com — Antonelli bat Russell avec une remontée spectaculaire</a><span class="desc">Formula1.com — primaire</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/gasly-charges-to-sensational-maiden-f1-pole-at-monza-over-russell-and-piastri.4CKkkbvgmqL04ijMNBfuXF" data-desc="Rapport officiel des qualifications, grille de départ et pénalités.">Formula1.com — rapport qualifications</a><span class="desc">Formula1.com — primaire</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Contexte complémentaire</h5>
          <ul>
            <li><a href="https://www.motorsport.com/f1/news/standings-antonelli-unstoppable-at-the-top/10853059/" data-desc="Classement pilotes détaillé après le GP d'Italie.">Motorsport.com — classements après Monza</a><span class="desc">Motorsport.com — secondaire</span></li>
            <li><a href="https://scuderiafans.com/2026-f1-constructor-standings-after-italian-gp-mercedes-leads-ferrari-by-122-points/" data-desc="Classement constructeurs après le GP d'Italie.">Classement constructeurs après Monza</a><span class="desc">Scuderiafans — secondaire</span></li>
          </ul>
        </div>
      </details>
    </section>
`;
