// Analyse Round 17 — Grand Prix de Singapour 2026 (Marina Bay).
//
// Sourcing : classement officiel, points et grille de départ (après
// pénalités et départs depuis la voie des stands) = page de résultats
// officielle Formula1.com (results/2026/races/1296/singapore/race-result et
// .../starting-grid), fetchée en primaire via fetch-url.yml — datée du 11
// octobre 2026, correspondant bien à ce round (23 circuits confirmés sur la
// page). Chaque écart et point marqué recolle exactement avec cette source
// (ex. Verstappen 1:42:00.785, Leclerc +7,335s, Hadjar +90,862s). Déroulé de
// course et citation de Verstappen = rapport officiel Formula1.com de la
// course ("Verstappen seals commanding Singapore Grand Prix victory..."),
// également fetché en primaire, daté du 11 octobre 2026 à 14h06 UTC — soit
// moins d'une heure après le drapeau à damier réel (13:45:40 UTC d'après les
// messages de course en base). Recoupé avec un second rapport indépendant,
// RacingNews365 ("2026 F1 Singapore Grand Prix results"), également daté du
// 11 octobre, qui confirme en prose les mêmes faits clés (victoire du
// départ au drapeau, écart de 7,3s sur Leclerc, podium d'Antonelli, remontée
// de Russell du 19<sup>e</sup> au 9<sup>e</sup> rang) — aucune divergence
// entre les deux sources sur ce round. Classement des pilotes après course
// (Antonelli 340, Russell 238, écart de 102 points, six manches restantes)
// = page officielle Formula1.com results/2026/drivers, qui confirme mot pour
// mot le chiffre de 102 points avancé par RacingNews365. Horodatages VSC et
// drapeaux = race_control_messages en base (pipeline scripts/ingest_openf1.py),
// qui recoupent les deux fenêtres de Voiture de Sécurité Virtuelle
// mentionnées par Formula1.com (arrêt de Bortoleto en tout début de course,
// arrêt de Stroll au virage 15 vers le tour 36) sans qu'aucune Safety Car
// complète n'ait été déployée de la course.
//
// Point de rigueur : une première recherche a fait remonter un article
// VelocityNews ("Norris powers to crushing Singapore Grand Prix victory over
// Verstappen") au titre proche de ce round — écarté après vérification du
// contenu réellement récupéré, qui décrit la VRAIE course de 2024 (Norris
// vainqueur, aucune Safety Car de toute l'histoire du circuit à l'époque),
// pas la suite fictive 2026 de ce projet. Même classe d'erreur que les cas
// Suzuka/Madring et Bahreïn/Malaisie déjà rencontrés sur les rounds
// précédents — seule la lecture du contenu fetché, jamais le résumé de
// recherche, permet de la repérer à chaque fois.
export const ROUND17_ANALYSE_FR_HTML = `
<div class="hero prose">
      <p class="eyebrow">Grand Prix de Singapour · Marina Bay · 2026</p>
      <p class="verdict">Verstappen signe un départ à l'arrivée sans la moindre faute pour sa deuxième victoire consécutive — et sa toute première à Marina Bay — pendant que Russell et Hadjar, tous deux relégués en fond de grille, remontent chacun dans le top 10 depuis le fond du peloton.</p>
      <div class="resultstrip">
        <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · parti 1<sup>er</sup></span></div>
        <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari · +7,335s</span></div>
        <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · +24,573s</span></div>
        <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren · +40,506s</span></div>
        <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">McLaren · +49,644s</span></div>
      </div>
      <p class="subverdict">Auteur de sa 50<sup>e</sup> pole et de sa première victoire au Sprint la veille, Verstappen conclut un week-end parfait en menant les 62 tours de bout en bout, malgré des soucis radio en fin de course. Derrière lui, Leclerc profite d'une gestion de pneus mieux temporisée pour boucler une remontée jusqu'au podium, pendant que Hamilton, pourtant premier à s'arrêter, recule à la 6<sup>e</sup> place après un débat stratégique interne chez Ferrari — et qu'Antonelli complète le podium malgré deux sorties de piste signalées pour limites de piste. Russell, parti 19<sup>e</sup> après une pénalité moteur, et Hadjar, parti de la voie des stands après une panne en qualifications, signent chacun une remontée solide jusqu'au 9<sup>e</sup> et au 10<sup>e</sup> rang. Trois abandons ponctuent l'après-midi : Stroll (embrayage), Colapinto (transmission) et Bortoleto (boîte de vitesses, avec un départ de feu maîtrisé par les commissaires).</p>
    </div>

    <section class="block" data-num="01" id="sec-r1">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> Le contexte avant le départ</h2>
        <p>Verstappen avait décroché la veille sa 50<sup>e</sup> pole position en carrière (la première à Marina Bay), le jour même de sa victoire au Sprint matinal — un week-end jusque-là sans la moindre fausse note pour lui et pour Red Bull. Derrière lui, les deux Ferrari se tenaient à moins de sept centièmes : Leclerc 2<sup>e</sup>, Hamilton 3<sup>e</sup>, devant Antonelli. <a href="/courses/17" data-desc="Détail complet des qualifications : Q1/Q2/Q3, pénalités, grille de départ.">Voir l'analyse des qualifications</a></p>
        <p>La grille de dimanche a toutefois été largement remaniée par les pénalités actées depuis la veille. Russell, déjà sous le coup d'une pénalité de groupe propulseur avant même les qualifications, reculait officiellement de 60 places et s'élançait 19<sup>e</sup>. Hadjar, privé de temps en Q1 après une nouvelle panne de groupe propulseur (la seconde du week-end après son abandon en Sprint Qualifying), s'élançait depuis la voie des stands — rejoint par Alonso et Stroll, tous deux contraints au même traitement après que leurs monoplaces ont été modifiées sous conditions de Parc Fermé. La grille réelle de départ s'établissait ainsi : Verstappen, Leclerc, Hamilton, Antonelli, Norris, Piastri, Gasly, Lawson, Lindblad, Hülkenberg, Bearman, Ocon, Sainz, Bortoleto, Colapinto, Albon, Pérez, Bottas, Russell, puis Alonso, Stroll et Hadjar depuis la voie des stands.</p>
        <p>Les 62 tours s'annonçaient disputés par une chaleur et une humidité conformes à l'habitude de Marina Bay, sans la pluie qui avait perturbé le Sprint du matin. Le plateau se scindait presque à parts égales entre pneus tendres et medium pour ce qui s'annonçait comme une course à un seul arrêt — Verstappen partant en tendre, Hamilton en medium.</p>
      </div>
    </section>

    <section class="block" data-num="02" id="sec-r2">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

        <h3 class="subtitle">Un départ sans accroc pour Verstappen, une Voiture de Sécurité Virtuelle précoce</h3>
        <p>Au signal, Verstappen défend sa position devant Leclerc au premier virage et ne la cédera plus jusqu'au drapeau à damier. Dans les tours suivants, Lawson gagne une place pour pointer 7<sup>e</sup>, tandis que Hülkenberg et Sainz se hissent dans le top 10. Au tout début de course, l'Audi de Bortoleto s'arrête en bord de piste près de la sortie de la voie des stands pour ce qui semble être un problème de boîte de vitesses — une brève Voiture de Sécurité Virtuelle est déployée le temps de repousser la monoplace vers le garage, où elle prend ensuite feu, les commissaires éteignant rapidement les flammes et fermant momentanément l'entrée de la voie des stands.</p>
        <p>Le reste du plateau profite d'une relance rapide : Russell, parti en fond de grille, a déjà remonté à la 15<sup>e</sup> place au 5<sup>e</sup> tour. Leclerc maintient Verstappen sous pression, ne concédant qu'environ six dixièmes — suffisant pour conserver son mode dépassement — avant que l'écart ne se rouvre à partir du 7<sup>e</sup> tour.</p>

        <h3 class="subtitle">La remontée solitaire de Hamilton, premier à s'arrêter</h3>
        <p>Au 19<sup>e</sup> tour, Hamilton est le premier du peloton à s'arrêter, ressortant 7<sup>e</sup> sur pneus tendres frais juste derrière Lawson — qu'il double dès le tour suivant pour la 6<sup>e</sup> place. Leclerc le prévient alors par radio que ses propres pneus ne tiendront plus très longtemps. Pendant ce temps, Russell poursuit son ascension et s'installe en 11<sup>e</sup> place en doublant Ocon au virage 16, tandis qu'Antonelli est signalé pour avoir dépassé les limites de piste à deux reprises au virage 2.</p>
        <div class="callout">Le choix du moment des arrêts aura façonné toute la seconde moitié de course : Hamilton, seul à s'arrêter tôt, gagne un train de pneus plus frais que ses rivaux du haut du classement — un avantage qu'il concédera finalement en fin de course après un débat stratégique interne chez Ferrari sur un éventuel second arrêt.</div>

        <h3 class="subtitle">Le ballet des arrêts et la remontée de Russell</h3>
        <p>Au 24<sup>e</sup> tour, Antonelli s'arrête pour le pneu medium et ressort 6<sup>e</sup> derrière Hamilton ; Leclerc l'imite un tour plus tard et ressort 4<sup>e</sup>, avec à peine une poignée de dixièmes d'avance sur son coéquipier. Hamilton se plaint alors de perdre du temps dans l'air sale de la Ferrari devant lui. Au 28<sup>e</sup> tour, Verstappen compte 17,9 secondes d'avance sur Norris, Piastri suivant en 3<sup>e</sup> position virtuelle ; plus loin, Lawson évolue seul en 7<sup>e</sup> place devant Hülkenberg, Gasly et Bearman.</p>
        <p>Gasly s'arrête au 30<sup>e</sup> tour ; au tour suivant, Colapinto abandonne après un problème de transmission suspecté. Hülkenberg s'arrête ensuite et ressort 10<sup>e</sup>, cédant une place à Russell qui poursuit sa remontée en 9<sup>e</sup> position. Verstappen rentre à son tour au 33<sup>e</sup> tour pour un train de pneus medium, sans jamais perdre la tête ; Norris s'arrête peu après et ressort 6<sup>e</sup> derrière Antonelli. Piastri, légèrement retardé par son arrêt, ressort également dans cette zone — Russell, en 7<sup>e</sup> position, devient alors le seul pilote du top 10 à ne pas encore s'être arrêté.</p>

        <h3 class="subtitle">L'abandon de Stroll et la deuxième Voiture de Sécurité Virtuelle</h3>
        <p>Vers le 36<sup>e</sup> tour, l'Aston Martin de Stroll s'immobilise au virage 15 pour un problème d'embrayage, provoquant un double drapeau jaune puis une nouvelle Voiture de Sécurité Virtuelle. Leclerc et Antonelli en profitent pour effectuer leur second arrêt ; Russell, lui, plonge dans la voie des stands juste au moment où la VSC se termine et ne peut donc pas en tirer le même bénéfice que ses rivaux. À la relance, Leclerc occupe la 3<sup>e</sup> place, désormais une dizaine de secondes derrière Hamilton, tandis qu'Antonelli s'intercale entre les deux McLaren en 5<sup>e</sup> position — le pilote Mercedes signalant au même moment des soucis de freins.</p>
        <p>Piastri effectue un second arrêt au 42<sup>e</sup> tour après avoir souffert d'une lente crevaison, ressortant 6<sup>e</sup>. Chez Ferrari, le débat se poursuit sur la stratégie de Hamilton, l'écurie estimant qu'il lui manque quelques tours pour aller au bout sur ses pneus actuels. Au 46<sup>e</sup> tour, Leclerc double finalement Hamilton grâce à des gommes plus fraîches, tout en restant encore à 15 secondes de Verstappen en tête.</p>

        <h3 class="subtitle">La bataille finale pour le podium</h3>
        <p>Au 48<sup>e</sup> tour, Russell double Gasly au virage 7 pour la 9<sup>e</sup> place, pendant qu'Antonelli, de nouveau averti pour les limites de piste, s'expose à un possible risque de pénalité. À dix tours de l'arrivée, Verstappen compte encore un peu moins de dix secondes d'avance sur Leclerc, Hamilton pointant 3<sup>e</sup> à 11,8 secondes de son coéquipier — Norris s'étant rapproché à moins d'une demi-seconde du septuple champion du monde, suivi d'Antonelli, Piastri, Lawson, Hülkenberg, Russell et Gasly.</p>
        <p>Le combat pour la dernière place du podium s'intensifie alors : Hamilton part large en défendant contre Norris, ce qui permet à Antonelli de se glisser devant la McLaren avant de prendre la 3<sup>e</sup> place à Hamilton au virage 16 — un dépassement qui place brièvement Hamilton sous enquête des commissaires pour être sorti de piste en y gagnant un avantage, classée sans suite. Norris, profitant à son tour des difficultés de Hamilton sur ses pneus, lui reprend la 4<sup>e</sup> place ; Piastri, de plus en plus menaçant, boucle la manœuvre identique au même virage pour s'emparer de la 5<sup>e</sup> position. Verstappen, de son côté, gère des problèmes de radio en fin de course — son ingénieur Gianpiero Lambiase ayant du mal à l'entendre — sans que cela n'affecte sa conduite, et franchit la ligne en tête pour sceller sa deuxième victoire consécutive de la saison.</p>
      </div>
    </section>

    <section class="block" data-num="03" id="sec-r3">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

        <h3 class="subtitle">Ferrari — un arrêt précoce payant pour Hamilton, un débat stratégique qui coûte le podium</h3>
        <p>Premier pilote du haut du classement à s'arrêter (tour 19), Hamilton bénéficie d'un train de pneus frais qui lui permet de remonter jusqu'à la 3<sup>e</sup> place avant que l'écurie ne débatte en interne de la pertinence d'un second arrêt. Le choix de ne pas en effectuer un — une décision que Hamilton reconnaîtra lui-même par radio en fin de course — le laisse exposé sur des gommes vieillissantes face à Antonelli et Norris dans les derniers tours, le reléguant à la 6<sup>e</sup> place. Leclerc, grâce à deux arrêts mieux temporisés autour de la seconde Voiture de Sécurité Virtuelle, complète lui une remontée jusqu'à la 2<sup>e</sup> place.</p>

        <h3 class="subtitle">Mercedes — Antonelli sur le podium malgré les avertissements, Russell pénalisé par le timing de son arrêt</h3>
        <p>Antonelli signe un podium à la 3<sup>e</sup> place malgré deux séries d'avertissements pour dépassement des limites de piste au virage 2, profitant d'un second arrêt bien placé autour de la Voiture de Sécurité Virtuelle pour s'intercaler entre les deux McLaren puis prendre la 3<sup>e</sup> place à Hamilton dans les derniers tours. Russell, lui, paie le prix d'un arrêt effectué juste à la reprise de la VSC plutôt que pendant — un décalage de quelques secondes qui l'empêche de profiter du même gain que ses rivaux, mais sa remontée depuis la 19<sup>e</sup> place jusqu'à la 9<sup>e</sup> reste l'une des plus solides du jour.</p>

        <h3 class="subtitle">Red Bull — Verstappen imperturbable, Hadjar récompensé par sa remontée</h3>
        <p>Verstappen ne cède jamais la tête de la course, gérant son unique arrêt (tour 33) sans jamais perdre le commandement — une deuxième victoire consécutive obtenue par une gestion de course sans la moindre erreur, malgré des soucis radio en fin de parcours. Hadjar, parti de la voie des stands après sa panne en qualifications, boucle une remontée jusqu'à la 10<sup>e</sup> place et marque son premier point du week-end sur ce format, un résultat à mettre en miroir avec sa performance similaire en Sprint Qualifying la veille.</p>

        <h3 class="subtitle">McLaren — une fin de course payante pour Norris et Piastri</h3>
        <p>Les deux McLaren profitent des derniers tours pour grappiller chacune une place dans le money-time du Grand Prix : Norris reprend la 4<sup>e</sup> place à un Hamilton en difficulté sur ses pneus, et Piastri imite le mouvement un instant plus tard pour s'emparer de la 5<sup>e</sup> place au même pilote, au même virage. Un résultat qui doit davantage à la gestion des pneus adverses qu'à une performance brute dominante ce dimanche.</p>
      </div>
    </section>

    <section class="block" data-num="04" id="sec-r4">
      <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
        <p>L'évaluation porte sur le Grand Prix du dimanche, en tenant compte de la position de départ réelle sur la grille (après pénalités et départs depuis la voie des stands) et des circonstances de course.</p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table class="verdict-table">
          <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
          <tbody>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Max Verstappen</td><td class="pos">1 → 1<span class="delta neutral">=</span></td><td>Départ à l'arrivée sans la moindre faute pour sa deuxième victoire consécutive de la saison et sa toute première à Marina Bay, malgré des soucis radio en fin de course qui n'ont jamais menacé son avance.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Charles Leclerc</td><td class="pos">2 → 2<span class="delta neutral">=</span></td><td>Deuxième place conforme à sa position de départ, obtenue grâce à deux arrêts bien temporisés autour de la seconde Voiture de Sécurité Virtuelle, qui lui permettent de reprendre l'avantage sur Hamilton en fin de course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Andrea Kimi Antonelli</td><td class="pos">4 → 3<span class="delta good">+1</span></td><td>Podium obtenu malgré deux séries d'avertissements pour limites de piste au virage 2, scellé par un dépassement sur Hamilton au virage 16 dans les derniers tours. Étend son avance au championnat à 102 points.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Lando Norris</td><td class="pos">5 → 4<span class="delta good">+1</span></td><td>Profite de la dégradation de Hamilton en fin de course pour lui reprendre la 4<sup>e</sup> place, après avoir brièvement été signalé pour les limites de piste au tour 54 — sans suite.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Oscar Piastri</td><td class="pos">6 → 5<span class="delta good">+1</span></td><td>Deuxième arrêt pour une lente crevaison au 42<sup>e</sup> tour, puis remontée jusqu'à la 5<sup>e</sup> place grâce au même dépassement que son coéquipier sur un Hamilton en difficulté, au même virage.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Lewis Hamilton</td><td class="pos">3 → 6<span class="delta bad">-3</span></td><td>Premier pilote du haut du classement à s'arrêter (tour 19), ce qui lui vaut une remontée jusqu'au podium virtuel avant qu'un débat stratégique interne sur un second arrêt ne le laisse exposé en fin de course — il s'excusera lui-même par radio auprès de son écurie.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Liam Lawson</td><td class="pos">8 → 7<span class="delta good">+1</span></td><td>Course solide et sans incident individuel notable, légèrement remontée par rapport à sa position de départ sur l'ensemble du week-end.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Nico Hülkenberg</td><td class="pos">10 → 8<span class="delta good">+2</span></td><td>Remontée propre sans incident individuel notable relevé, décrochant des points précieux pour Audi.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>George Russell</td><td class="pos">19 → 9<span class="delta good">+10</span></td><td>Grosse remontée depuis le fond de grille (pénalité de groupe propulseur), freinée par un arrêt déclenché juste à la reprise de la seconde VSC plutôt que pendant — un décalage de quelques secondes qui lui coûte le gain complet dont ont profité ses rivaux.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Isack Hadjar</td><td class="pos">22 (voie des stands) → 10<span class="delta good">+12</span></td><td>Deuxième remontée spectaculaire du week-end depuis la voie des stands après sa panne de groupe propulseur en qualifications — en miroir de sa performance en Sprint Qualifying la veille.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Pierre Gasly</td><td class="pos">7 → 11<span class="delta bad">-4</span></td><td>Recul progressif après son arrêt au 30<sup>e</sup> tour, dépassé par Russell au virage 7 en fin de course — hors des points sur un week-end sans éclat pour Alpine.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Oliver Bearman</td><td class="pos">11 → 12<span class="delta bad">-1</span></td><td>Course discrète, hors des points, sans incident individuel notable relevé.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Esteban Ocon</td><td class="pos">12 → 13<span class="delta bad">-1</span></td><td>Dépassé par Russell au virage 16 en milieu de course, termine hors des points dans le même groupe que son coéquipier Bearman.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Carlos Sainz</td><td class="pos">13 → 14<span class="delta bad">-1</span></td><td>Noté en tout début de course pour avoir quitté la piste en y gagnant un avantage au virage 1, classé sans suite par les commissaires — course sans éclat ensuite, hors des points.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Arvid Lindblad</td><td class="pos">9 → 15<span class="delta bad">-6</span></td><td>Recul net par rapport à sa position de départ, sans incident individuel notable relevé pour l'expliquer — un week-end en retrait après sa performance du Sprint.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Fernando Alonso</td><td class="pos">20 (voie des stands) → 16<span class="delta good">+4</span></td><td>Remontée correcte depuis la voie des stands après modification de sa monoplace sous conditions de Parc Fermé, sans incident individuel notable relevé.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Sergio Pérez</td><td class="pos">17 → 17<span class="delta neutral">=</span></td><td>Résultat conforme à sa position de départ, sans incident individuel notable relevé — un week-end sans relief pour Cadillac.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Alexander Albon</td><td class="pos">16 → 18<span class="delta bad">-2</span></td><td>Classé malgré un abandon en fin de course (59 tours bouclés, suffisants pour être classé), sans cause précisée dans les données disponibles.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Valtteri Bottas</td><td class="pos">18 → 19<span class="delta bad">-1</span></td><td>Dernier pilote classé à l'arrivée, signalé à plusieurs reprises au drapeau bleu tout au long de la course sans incident individuel notable à son actif.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Lance Stroll</td><td class="pos">21 (voie des stands) → DNF<span class="delta dnf">DNF</span></td><td>Abandon au 36<sup>e</sup> tour pour un problème d'embrayage au virage 15, provoquant la seconde Voiture de Sécurité Virtuelle de la course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Franco Colapinto</td><td class="pos">15 → DNF<span class="delta dnf">DNF</span></td><td>Abandon au 29<sup>e</sup> tour pour un problème de transmission suspecté, sans conséquence directe sur le déroulé de la course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Gabriel Bortoleto</td><td class="pos">14 → DNF<span class="delta dnf">DNF</span></td><td>Abandon dès le tout début de course (7<sup>e</sup> tour) pour un problème de boîte de vitesses, sa monoplace prenant feu une fois repoussée au garage — flammes rapidement maîtrisées par les commissaires, sans conséquence pour la suite de la course au-delà de la brève VSC initiale.</td></tr>
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
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Red Bull</td><td>Week-end parfait complété par une deuxième victoire consécutive de Verstappen, sans la moindre faute, et par la remontée spectaculaire de Hadjar jusqu'à la 10<sup>e</sup> place depuis la voie des stands.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Ferrari</td><td>Résultat en demi-teinte : Leclerc complète une 2<sup>e</sup> place conforme à son départ grâce à une stratégie de pneus mieux temporisée, tandis que Hamilton, pourtant premier à s'arrêter et longtemps sur le podium virtuel, recule à la 6<sup>e</sup> place après un débat stratégique interne sur un second arrêt.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Mercedes</td><td>Antonelli signe un podium malgré deux avertissements pour limites de piste et étend son avance au championnat à 102 points sur son propre coéquipier ; Russell, pénalisé par le timing de son arrêt autour de la VSC, boucle néanmoins une remontée solide du 19<sup>e</sup> au 9<sup>e</sup> rang.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>McLaren</td><td>Les deux pilotes profitent de la fin de course pour grappiller chacun une place sur un Hamilton affaibli par ses pneus — Norris 4<sup>e</sup>, Piastri 5<sup>e</sup> — un résultat qui doit davantage à la gestion adverse qu'à une performance dominante.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Racing Bulls</td><td>Résultat contrasté : Lawson ramène une 7<sup>e</sup> place solide, tandis que Lindblad recule nettement sans incident individuel notable pour l'expliquer, après sa performance remarquée du Sprint.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Audi</td><td>Hülkenberg marque des points précieux en 8<sup>e</sup> place, tandis que Bortoleto abandonne dès le début de course pour un problème de boîte de vitesses, sa monoplace prenant feu une fois repoussée au garage.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Alpine</td><td>Week-end à oublier : Gasly recule hors des points après son arrêt, tandis que Colapinto abandonne au 29<sup>e</sup> tour pour un problème de transmission suspecté.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Haas</td><td>Aucun point marqué (Bearman 12<sup>e</sup>, Ocon 13<sup>e</sup>), une course discrète sans incident individuel notable pour l'un ou l'autre pilote.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Aston Martin</td><td>Week-end à deux visages : Alonso remonte correctement depuis la voie des stands jusqu'à la 16<sup>e</sup> place, tandis que Stroll, également parti de la voie des stands, abandonne au 36<sup>e</sup> tour pour un problème d'embrayage.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Williams</td><td>Sainz, noté sans suite pour un incident en tout début de course, termine 14<sup>e</sup>, tandis qu'Albon est classé 18<sup>e</sup> malgré un abandon en fin de course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Cadillac</td><td>Week-end sans relief : Pérez termine 17<sup>e</sup> conforme à son départ, Bottas dernier des classés à l'arrivée.</td></tr>
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
              <li><strong>Verstappen et Red Bull</strong>, deuxième victoire consécutive de la saison et première à Marina Bay, obtenue sans la moindre faute sur l'ensemble du week-end.</li>
              <li><strong>Hadjar</strong>, remontée du fond de la voie des stands jusqu'à la 10<sup>e</sup> place — la deuxième performance marquante du week-end après sa Sprint Qualifying.</li>
              <li><strong>Russell</strong>, remontée du 19<sup>e</sup> au 9<sup>e</sup> rang depuis le fond de grille malgré un arrêt mal temporisé.</li>
              <li><strong>Antonelli</strong>, podium malgré deux avertissements pour limites de piste, qui étend son avance au championnat à 102 points.</li>
            </ul>
          </div>
          <div class="verdictcol lose">
            <h4>Perdants</h4>
            <ul>
              <li><strong>Hamilton</strong>, longtemps sur le podium virtuel après son arrêt précoce, recule à la 6<sup>e</sup> place après un débat stratégique interne sur un second arrêt qu'il reconnaît lui-même avoir mal géré.</li>
              <li><strong>Lindblad</strong>, net recul par rapport à sa position de départ sans incident individuel notable pour l'expliquer.</li>
              <li><strong>Bortoleto</strong>, abandon dès le début de course pour un problème de boîte de vitesses, sa monoplace prenant feu une fois repoussée au garage.</li>
              <li><strong>Stroll</strong>, abandon au 36<sup>e</sup> tour pour un problème d'embrayage après un départ déjà compromis depuis la voie des stands.</li>
            </ul>
          </div>
        </div>
        <div class="callout">Marina Bay restera l'image d'un week-end parfait pour Verstappen et Red Bull — pole, victoire au Sprint puis victoire en course, sans la moindre faute — pendant que Russell et Hadjar, tous deux relégués en fond de grille la veille, ont chacun prouvé qu'une remontée dans le top 10 restait possible sur un circuit où dépasser reste difficile. Antonelli, lui, n'a besoin que de limiter les dégâts pour continuer de creuser l'écart : 340 points, 102 d'avance sur Russell, à six manches de la fin de la saison.</div>
      </div>
    </section>

    <section class="block" id="sec-r-next">
      <div class="prose">
        <h2 class="sectitle">Enseignements pour la suite</h2>
        <p>Trois points issus de Marina Bay à surveiller au prochain rendez-vous, le Grand Prix des États-Unis à Austin :</p>
        <ol style="padding-left:20px; margin:0 0 16px;">
          <li style="margin-bottom:10px;"><strong>Red Bull</strong> aborde la pause avec deux victoires consécutives et un Verstappen apparemment retrouvé — reste à savoir si cette forme se confirme sur un circuit aux caractéristiques très différentes de Sepang et de Marina Bay.</li>
          <li style="margin-bottom:10px;"><strong>Mercedes</strong> voit l'écart interne se creuser encore (102 points) entre Antonelli et Russell — la marge d'erreur de Russell se réduit à mesure que les six manches restantes s'amenuisent.</li>
          <li><strong>Ferrari</strong> aborde la suite de la saison avec une question de gestion de course à régler : le débat stratégique interne qui a coûté le podium à Hamilton à Singapour devra trouver une réponse plus nette la prochaine fois.</li>
        </ol>
        <a class="bridge-btn" href="/courses" style="text-decoration:none; display:inline-block;">Voir le calendrier de la saison →</a>
      </div>
    </section>

    <section class="block" id="sec-r7">
      <details class="sources">
        <summary>Sources utilisées — GP de Singapour (3 liens)</summary>
        <div class="srcgroup">
          <h5>Données de course</h5>
          <ul>
            <li><span class="desc">The Pit Wall — pipeline production (temps au tour/pneus/météo/RCM via scripts/ingest_openf1.py), primaire ; classement officiel, grille de départ et points via Formula1.com en l'absence de résultats Jolpica disponibles à l'heure de la rédaction.</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Déroulé de course et classement officiel</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/latest/article/verstappen-seals-commanding-singapore-grand-prix-victory-from-leclerc-and-antonelli.49wDzysiVqi5cloGjle40A" data-desc="Rapport officiel de la course, fetché en primaire — déroulé complet, citation de Verstappen, contexte.">Formula1.com — Verstappen remporte le Grand Prix de Singapour</a><span class="desc">Formula1.com — primaire</span></li>
            <li><a href="https://racingnews365.com/2026-f1-singapore-grand-prix-results" data-desc="Second rapport indépendant, confirmant les mêmes faits clés (écart, podium, remontée de Russell) sans divergence.">RacingNews365 — résultats du GP de Singapour 2026</a><span class="desc">RacingNews365 — confirmation</span></li>
          </ul>
        </div>
      </details>
    </section>
`;
