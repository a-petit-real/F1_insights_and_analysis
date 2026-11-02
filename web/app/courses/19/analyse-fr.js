// Analyse Round 19 — Grand Prix de Mexico (Autódromo Hermanos Rodríguez, Mexico
// City), saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1.py),
// session de course session_key=11404 (1360 lignes lap_times, 80 tyre_stints,
// 205 weather_readings, 169 race_control_messages, 36 track_status_events, 273
// overtakes). La table `results` (pipeline Jolpica) n'était PAS encore peuplée
// pour ce round au moment de la rédaction — même contournement déjà documenté
// pour les rounds 17/18 : scripts/race_briefing.py ne retourne donc aucune
// ligne de classement (vérifié, sortie vide), et c'est
// scripts/race_briefing_laptimes_by_car.py, lancé sur les 22 numéros de
// voiture (résolus depuis les messages de course bruts, qui citent
// systématiquement "CAR <numéro> (<acronyme>)"), qui fournit toute la matière
// de rythme/pneus/relais ci-dessous. Classement officiel et grille obtenus en
// primaire via Formula1.com (/en/results/2026/races/1298/mexico/race-result,
// fetché intégralement via fetch-url.yml) — page explicitement marquée
// "* Provisional results." en bas de tableau, ce qui s'avère déterminant : ce
// tableau provisoire classe encore Piastri 7<sup>e</sup> (+19,475s, 6 points),
// AVANT l'application de sa pénalité de 10 secondes prononcée après la course
// pour la collision avec Lindblad (confirmée en détail, avec le raisonnement
// complet des commissaires, par Grandprix.com et The Race). Le classement
// définitif retenu dans cet article intègre cette pénalité (Piastri 7e→15e,
// +29,475s au lieu de +19,475s — exactement +10s, cohérent au millième),
// recoupée indépendamment par les deux sources média. Signalé explicitement
// plutôt que silencieusement corrigé : la page Formula1.com elle-même reste
// provisoire sur ce point précis au moment du fetch.
//
// Récit de course complet, tour par tour : Grandprix.com, « Race Notes -
// Verstappen wins as Antonelli becomes world champion » (fetché intégralement
// via fetch-url.yml, URL retrouvée après un premier essai en échec — la page
// d'accueil Grandprix.com liste le bon slug « mexican-gp-2026-race-notes.html »
// alors qu'une tentative directe un peu plus tôt avait renvoyé une page 404 ;
// la seconde tentative, identique, a réussi — comportement à surveiller mais
// non bloquant ici). C'est la source la plus détaillée de loin : intervalles
// chronométrés tour par tour, ordre de grille exact, composés de pneus au
// départ pour les 22 pilotes, citations radio complètes (Verstappen, Hamilton,
// Leclerc, Antonelli, l'ingénieur de piste Bonnington), classement du
// championnat pilotes ET constructeurs après course. Recoupée par The Race,
// dont TROIS articles complets ont été lus intégralement via fetch-url.yml :
// « Antonelli clinches title as Ferrari mess helps Verstappen win » (Matt
// Beer, 1er nov.), « FIA explains controversial Leclerc penalty decision »
// (Jon Noble — reproduit le texte intégral du communiqué des commissaires sur
// la pénalité de Leclerc, document le plus proche d'une source officielle
// obtenu cette session) et « Bottas escapes injury in race-stopping crash »
// (Matt Beer — détail technique de la panne de suspension et citations
// Cadillac). Les trois concordent au mot près avec Grandprix.com sur chaque
// fait vérifiable (tours, écarts, pénalités, ordre de redémarrage) — jamais une
// simple reformulation l'une de l'autre, chacune apportant un angle propre
// (Grandprix : déroulé exhaustif ; The Race : citations radio et document des
// commissaires).
//
// Formula1.com (officiel) : page de résultats déjà citée plus haut (primaire,
// tableau complet). Page /en/latest/all également fetchée en primaire :
// confirme par ses propres titres « Antonelli crowned champion in Mexico as
// Verstappen wins race », « Verstappen is your Mexico City GP Driver of the
// Day », « Antonelli shares touching reaction to 'incredible' title win » —
// pages d'articles individuelles non atteintes (même limite documentée pour
// les rounds précédents), titres repris comme citations partielles
// correctement attribuées.
//
// Analyse technique quantifiée (le cœur du travail de cette passe) : requête
// dédiée sur les 22 numéros de voiture (scripts/race_briefing_laptimes_by_car.py
// --cars 3:VER 16:LEC 12:ANT 44:HAM 1:NOR 63:RUS 6:HAD 41:LIN 30:LAW 10:GAS
// 27:HUL 43:COL 81:PIA 5:BOR 87:BEA 55:SAI 23:ALB 14:ALO 50:HIR 18:STR 11:PER
// 77:BOT). Point de méthode propre à ce round : la table tyre_stints de ce
// projet stocke ici UNE ligne par relais (pas une ligne par tour parcouru) —
// MIN(lap_number) donne le tour de départ du relais, MAX(total_laps) sa durée
// en tours (pas un âge de pneu cumulé au sens littéral malgré le libellé) ;
// le tour de fin se déduit donc par lap_start + durée − 1, vérifié recoupé
// avec les arrêts réellement décrits par Grandprix.com pour plusieurs pilotes
// (ex. Hamilton : relais 1 tours 1-28 donné par la base, arrêt confirmé
// « Hamilton stops on lap 28 » par Grandprix.com). Moyennes de relais
// calculées sur les tours « propres » de chaque relais (tour d'entrée/sortie
// de stand exclu via les drapeaux IN/OUT déjà posés en base, puis tours
// encore supérieurs à 103% de la médiane du relais également exclus, pour ne
// pas confondre un ralentissement sous Voiture de Sécurité/Virtuelle avec un
// vrai delta de performance) — méthode identique aux rounds précédents.
//
// Constat central, chiffré, qui tranche l'arc ouvert en EL1 (avantage turbo/
// altitude Ferrari), nuancé en EL2/EL3, laissé en suspens par les
// qualifications : sur le relais d'ouverture à gomme tendre neuve (tours
// comparables en charge de carburant), Leclerc tourne en 1:21,185 de moyenne
// contre 1:21,448 pour Hamilton — son propre coéquipier, sur le même composé,
// dans la même fenêtre de tours — soit 0,263s/tour plus rapide. L'avantage de
// rythme pur repéré dès l'EL1 était donc bien réel jusqu'au bout du week-end,
// pas un artefact d'une séance isolée. Mais ce relais ne profite à Leclerc que
// jusqu'à ce qu'un verrouillage de roues au restart (après le drapeau rouge)
// ne détruise son train de pneus : sur le relais final (tours 46-71, même
// fenêtre pour tout le monde), Leclerc retombe à 1:20,524 de moyenne — plus
// lent que Verstappen (1:19,725), Hamilton (1:19,762) ET Antonelli (1:19,961)
// — un déficit de 0,5 à 0,8s/tour qui n'a plus rien à voir avec le moteur ou
// l'altitude. L'avantage Ferrari théorique s'est donc confirmé sur le papier
// (le pneu neuf, le moteur, l'altitude) mais a été intégralement consommé par
// l'exécution : la pénalité de 5s pour le dépassement hors piste au tour 1 ET
// le tour perdu au restart. Détail supplémentaire tiré de la base : Antonelli
// a mené la course pendant une bonne quinzaine de tours en milieu de course
// (tours ~28 à 43) simplement en restant plus longtemps que tout le monde sur
// son train de tendres de départ — jamais signalé comme tel par aucune des
// sources média utilisées, qui se concentrent sur l'arrivée et pas sur cette
// parenthèse en tête, obtenue uniquement par la lecture croisée des écarts
// chronométrés de Grandprix.com et des relais bruts de la base.
//
// Dossier Lawson (MGU-K) : résolu. Grandprix.com et The Race confirment tous
// deux la disqualification effective de ses qualifications (« Lawson
// disqualified from Mexico qualifying over MGU-K breach » / « Lawson thrown
// out of Mexican GP qualifying results »), conforme au risque déjà signalé
// comme non tranché dans l'article qualifications de ce round. Lawson
// s'élance donc depuis la voie des stands (modifications sous parc fermé) et
// remonte jusqu'à la 8<sup>e</sup> place à l'arrivée (après la pénalité de
// Piastri) — un résultat solide qui clôt le fil ouvert en EL2/EL3/Qualifs.
//
// Tentatives réelles mais infructueuses, documentées honnêtement plutôt que
// masquées :
// - Ferrari (ferrari.com/en-EN/formula1/news) : HTTP 403 Forbidden — même
//   blocage déjà documenté pour l'EL1 et les qualifications de ce round.
// - Pirelli (press.pirelli.com/tagfeed/en/tags/press__releases) : relu une
//   cinquième fois pour ce round, toujours aucune entrée spécifique au
//   Mexique 2026 (dernière entrée visible datée de février 2025) — régression
//   confirmée pour la cinquième séance consécutive, pas un incident isolé.
// - Racing Bulls (visacashapprb.com/int-en/news) : répond normalement mais ne
//   contient toujours aucun contenu propre à ce Grand Prix.
// - Mercedes-AMG Petronas, Oracle Red Bull Racing, Cadillac : trois tentatives
//   d'obtenir une communication directe d'écurie sur ce Grand Prix précis,
//   toutes en échec réseau côté runner.
// - McLaren Racing (mclaren.com/racing/) : fetch réussi, mais contenu encore
//   entièrement pré-course (préparation à l'altitude, aspirations de Piastri)
//   — rien sur le résultat réel ni sur la pénalité qui le prive de points,
//   absence de contenu nouveau documentée honnêtement plutôt que masquée.
// - Crash.net (/f1/news) et Autosport (/f1/news/) : les deux pages de liste
//   répondent (HTTP 200) mais ne livrent cette fois que la coquille de
//   navigation JavaScript, sans aucune carte d'article extractible en HTML
//   brut — contrairement aux rounds précédents où Crash.net avait livré des
//   titres exploitables. Régression ponctuelle signalée telle quelle, pas
//   contournée par une citation inventée.
// - r/F1Technical (reddit.com/r/F1Technical/search.json?q=mexico+race) :
//   nouvelle tentative réelle, échec identique (HTTP 403 "Blocked") —
//   SEPTIÈME semaine consécutive de blocage stable et reproductible pour ce
//   projet.
// - Aucune communication directe pilote/écurie sur un canal propre (site ou
//   réseau social officiel) n'a donc pu être intégrée à cet article malgré un
//   effort réel sur six canaux institutionnels différents — toutes les
//   citations de pilotes utilisées ci-dessous (Hamilton, Verstappen, Leclerc,
//   Antonelli, Bottas) sont des citations radio relayées par la presse
//   (Grandprix.com, The Race), jamais présentées comme des communications
//   directes. Le communiqué des commissaires FIA reproduit intégralement par
//   The Race reste le document le plus proche d'une source institutionnelle
//   obtenue cette session.
// - FastF1 (télémétrie gaz/frein/rapport/régime/DRS) : le workflow
//   ingest-fastf1.yml a été déclenché pour ce round mais le run est resté en
//   file d'attente (statut "queued") pendant toute la rédaction — le runner
//   auto-hébergé de l'utilisateur n'était pas en ligne. Aucune donnée FastF1
//   n'a donc pu être ajoutée ; aucun canal de télémétrie gaz/frein/rapport
//   n'est mentionné dans le texte ci-dessous, conformément à la consigne de
//   ne jamais évoquer une source non réellement disponible pour ce round.
export const ROUND19_ANALYSE_FR_HTML = `
<div class="hero prose">
      <p class="eyebrow">Grand Prix de Mexico · Autódromo Hermanos Rodríguez · 2026</p>
      <p class="verdict">Max Verstappen résiste à Lewis Hamilton jusqu'au drapeau à damier et signe sa troisième victoire en quatre courses — mais c'est la troisième place d'Andrea Kimi Antonelli qui fait l'histoire : à 20 ans, l'Italien devient le plus jeune champion du monde de l'histoire de la discipline, battant le record de Sebastian Vettel (23 ans, 2010), et le premier Italien sacré depuis Alberto Ascari en 1953.</p>
      <div class="resultstrip">
        <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · 2:20:28,772</span></div>
        <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari · +0,799s</span></div>
        <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · +4,006s — 🏆 Champion du monde</span></div>
        <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari · +10,707s</span></div>
        <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren · +11,778s</span></div>
      </div>
      <p class="subverdict">Sixième victoire de Verstappen au Mexique, 74<sup>e</sup> de sa carrière, arrachée dans un podium à 12 titres mondiaux cumulés (Verstappen 4, Hamilton 7, Antonelli 1) — Hamilton et Verstappen enlaçant le jeune Italien à l'arrivée pendant que ses ingénieurs Mercedes le félicitent en larmes sur la radio. La course elle-même a tout connu : un accrochage frère contre frère entre les deux Ferrari dès le premier virage, une pénalité de 5 secondes qui a fait déborder la frustration de Hamilton sur la radio, un drapeau rouge au tour 45 pour la rupture de suspension spectaculaire de Valtteri Bottas à l'entrée du virage 1, un redémarrage en départ arrêté, une seconde Voiture de Sécurité pour la sortie de piste de Lindblad, et une pénalité post-course qui a coûté sept places à Piastri. Sur le fond technique, l'arc ouvert dès l'EL1 (l'avantage turbo/altitude supposé de Ferrari) trouve ici une résolution chiffrée et sans appel : les données de relais confirment que l'avantage de rythme pur était réel jusqu'au bout — mais il a été entièrement effacé par l'exécution, pas par le moteur.</p>
    </div>

    <section class="block" data-num="01" id="sec-r1">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> Le contexte avant le départ</h2>
        <p>Hamilton avait décroché sa première pole Ferrari la veille, par seulement neuf millièmes de seconde sur Russell, Leclerc complétant la première ligne des Ferrari en 3<sup>e</sup> position. <a href="/courses/19?tab=Qualifying" data-desc="Détail complet des qualifications : la pole de Hamilton, le dossier MGU-K de Lawson, l'avantage turbo Ferrari nuancé plutôt que confirmé.">Voir l'analyse des qualifications</a> Deux dossiers de pénalité, déjà connus depuis l'EL2 de ce round, s'appliquent à la grille : Verstappen recule d'un rang pour son accrochage avec Lawson, passant de la 4<sup>e</sup> à la 5<sup>e</sup> place, Antonelli profitant mécaniquement de ce recul pour avancer en 4<sup>e</sup> position. Le second dossier, resté non tranché au moment de la rédaction des qualifications, trouve ici sa résolution complète : Lawson est bel et bien disqualifié de sa séance de qualifications pour une infraction aux règles de déploiement de puissance du MGU-K, et s'élance depuis la voie des stands après des modifications effectuées sous conditions de Parc Fermé. Bottas, pénalisé de 50 places pour changement de composants moteur, part également du fond de grille — sans effet pratique puisqu'il y était déjà.</p>
        <p>La grille réelle de départ s'établissait ainsi : Hamilton, Russell, Leclerc, Antonelli, Verstappen, Norris, Hadjar, Lindblad, Gasly, Hulkenberg, Colapinto, Piastri, Bortoleto, Bearman, Sainz, Albon, Alonso, Hirakawa, Stroll, Perez, Bottas, puis Lawson depuis la voie des stands. Conditions sèches, air autour de 23°C, piste proche de 49°C au moment du départ (plage mesurée en base : 22,1-25,2°C pour l'air, jusqu'à 51°C pour la piste) — aucun risque de pluie. Côté pneus, Hamilton, Russell, Leclerc et Antonelli partent tous en tendre, tout comme Norris, Hadjar, Lindblad et Gasly ; Verstappen, lui, fait le choix à contre-courant du medium dès le départ, pari qui s'avérera décisif pour la suite de sa course. Russell loge au passage un fait à part : à son 300<sup>e</sup> départ en Grand Prix, Perez entame ce dimanche son week-end à domicile devant son public mexicain, tandis que Hamilton se prépare à fêter son 400<sup>e</sup> départ dès la prochaine manche, à Sao Paulo.</p>
      </div>
    </section>

    <section class="block" data-num="02" id="sec-r2">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

        <h3 class="subtitle">Ferrari contre Ferrari au premier virage, puis au virage 4 — Verstappen en profite</h3>
        <p>Sur le tour de formation, Hamilton verrouille déjà son pneu avant-droit au virage 1 mais parvient à regagner la pole sans incident. Au départ, il résiste à Leclerc dans les premiers virages tandis que Russell perd du terrain ; mais les deux Ferrari se livrent un combat plus âpre entre elles qu'avec quiconque d'autre, jusqu'au virage 4 où les deux pilotes freinent trop tard, sortent de la piste, et où Leclerc coupe carrément à travers l'herbe pour ressortir en tête. Verstappen, qui profite directement de la perte d'élan de Hamilton, se glisse en 2<sup>e</sup> position. Plus loin, Hadjar part en tête-à-queue après un contact avec Russell et recule au fond du peloton. « Qu'est-ce qui se passe avec Charles ? », demande Hamilton sur la radio ; Ferrari lui répond que Leclerc est sous enquête. Les commissaires ouvrent effectivement une investigation sur le duel Ferrari, tandis que Leclerc signe un 1:20,783 et commence à prendre le large. À l'issue du 1<sup>er</sup> tour, l'ordre est : Leclerc, Verstappen, Hamilton, Antonelli, Russell, Lindblad, Colapinto, Norris, Piastri, Hulkenberg.</p>

        <h3 class="subtitle">Pénalité de 5 secondes pour Leclerc, abandons précoces pour les deux Aston Martin</h3>
        <p>Les deux Aston Martin sont en difficulté dès les premiers tours : Alonso abandonne, Stroll s'immobilise en bord de piste, provoquant le déploiement d'une Voiture de Sécurité Virtuelle (20:12:05-20:14:53 UTC selon les messages de course bruts, environ 2min50) pendant laquelle Hadjar profite de l'interruption pour chausser des pneus medium. La course reprend au 9<sup>e</sup> tour dans le même ordre. Au 12<sup>e</sup> tour, les commissaires tranchent : Leclerc reçoit une pénalité de 5 secondes pour avoir quitté la piste et gagné un avantage au virage 4, Russell une pénalité de 10 secondes pour avoir provoqué la collision avec Hadjar. Verstappen s'interroge sur la radio, pensant que les nouvelles sanctions pour ce type d'infraction étaient fixées à 10 secondes ; les commissaires expliquent avoir réduit la pénalité parce que Hamilton avait lui aussi quitté la piste à l'intérieur, et que l'incident s'était produit tôt dans la course. « Les commissaires sont en train de donner cette course à Charles sur un plateau », lâche Hamilton sur la radio, estimant que l'air libre dont profite son coéquipier dépasse largement le prix d'une pénalité de 5 secondes.</p>
        <div class="callout">Le communiqué complet des commissaires, reproduit intégralement par The Race : « Les commissaires ont déterminé que les deux voitures sont entrées dans le virage 4 avec une vitesse excessive et qu'aucune des deux n'aurait donc pu négocier le virage sur la piste, comme le démontre le fait que la voiture 44 [Hamilton], qui était à l'intérieur, a dû sortir de la piste pour négocier le virage. La voiture 16 [Leclerc] n'était donc pas en droit de revendiquer le virage en raison de sa vitesse d'entrée excessive. Le pilote a alors effectué un dépassement hors piste et cela justifie donc une pénalité. La ligne directrice de base est de 10 secondes, mais l'élément atténuant est que la voiture 44 était également hors piste à l'intérieur de la voiture 16, et que cela s'est produit tôt dans le premier tour. »</div>

        <h3 class="subtitle">Le pari medium de Verstappen, et la longue parenthèse en tête d'Antonelli</h3>
        <p>Verstappen signale un manque d'adhérence mais ses pneus medium, montés dès le départ, lui offrent une fenêtre de relais plus longue que tous les pilotes qui l'entourent en tendre. Leclerc et Verstappen s'arrêtent ensemble à l'issue du 27<sup>e</sup> tour : Leclerc sert sa pénalité de 5 secondes avant de changer de pneus (medium), tandis que Verstappen passe en tendre et ressort devant au classement des arrêtés — un dépassement net en course grâce au différentiel de temps de stand. Hamilton s'arrête au tour 28 pour du medium et ressort derrière Leclerc. Antonelli, Russell et Norris, eux, restent sur leurs pneus de départ. Vers la mi-course, au 35<sup>e</sup> tour, Antonelli — resté sur ses gommes tendres d'origine bien plus longtemps que tout le monde — se retrouve purement et simplement en tête de la course, avec 7,906 secondes d'avance sur Norris, Verstappen pointant à 12,929s et Leclerc à 14,523s. Il conservera cette tête de course jusqu'à son propre arrêt, au 43<sup>e</sup> tour — une parenthèse d'une quinzaine de tours en tête qu'aucune des sources médiatiques utilisées pour cet article ne relève comme telle, obtenue uniquement par recoupement des écarts chronométrés tour par tour et des relais bruts de la base de données du projet.</p>
        <p>Norris s'arrête au tour 39 pour du medium (arrêt rallongé à 6 secondes après avoir dépassé sa place dans la zone de stand) et ressort 5<sup>e</sup> devant Russell. Antonelli s'arrête enfin du podium virtuel au tour 43 — un retard au stand gauche-arrière ralentit légèrement le service, et il ressort 4<sup>e</sup>. Presque immédiatement après, c'est le chaos.</p>

        <h3 class="subtitle">Le drapeau rouge de Bottas, et la décision qui ramène Hamilton en 3<sup>e</sup> position</h3>
        <p>À l'approche du virage 1 au 45<sup>e</sup> tour sur 71, la suspension avant-gauche de la Cadillac de Bottas cède brutalement, l'envoyant en tête-à-queue dans les barrières à haute vitesse. « Non. [juron] », répond-il sur la radio quand on lui demande s'il va bien, avant de confirmer être « réactif » à l'équipe ; il sortira de sa monoplace sans aide, pour des examens médicaux par précaution, et sera déclaré indemne après coup — Cadillac confirmant qu'il est « sorti et va bien » mais sera dispensé des obligations médias d'après course. La Voiture de Sécurité sort, puis la course est suspendue par un drapeau rouge pour permettre la réparation de la barrière. Dans l'intervalle, Hamilton s'était arrêté au tour 44 sous Voiture de Sécurité pour du tendre, perdant la 3<sup>e</sup> place au profit d'Antonelli. Mais la direction de course revoit l'ordre de redémarrage en reprenant la situation à un instant antérieur à cet arrêt — Hamilton est donc restauré en 3<sup>e</sup> position, Antonelli reculant en 4<sup>e</sup>, un point de méthode rarement documenté aussi explicitement par les sources utilisées pour ce projet. Gasly, repéré pour avoir quitté la voie des stands sous feu rouge, est blanchi après enquête ; Perez reçoit une pénalité de 5 secondes pour excès de vitesse dans la voie des stands.</p>

        <h3 class="subtitle">Redémarrage en départ arrêté : contact Verstappen-Hamilton, Antonelli reprend le podium</h3>
        <p>La reprise, programmée à 15h45 heure locale (21:45 UTC), se fait en départ arrêté sur pneus tendres pour tout le monde, Verstappen et Leclerc partageant la première ligne. Verstappen prend un bon envol et conserve la tête ; Hamilton double Leclerc pour la 2<sup>e</sup> place et attaque directement Verstappen au virage 1 — contact mineur entre les deux, Hamilton élargit sa trajectoire tandis que Leclerc, verrouillant ses roues dans leur sillage, conserve tout juste la 3<sup>e</sup> place devant Antonelli. Les commissaires ne retiennent aucune suite contre le contact Verstappen-Hamilton. Au 48<sup>e</sup> tour, Antonelli plonge à l'intérieur de Leclerc au virage 1 pour lui reprendre la 3<sup>e</sup> place : il retrouve le podium, avec le titre mondial à portée de main. Hamilton signe le tour le plus rapide de la course (1:19,268) au tour 50 et continue de harceler Verstappen ; Bearman, de son côté, abandonne après un contact avec Hulkenberg au virage 4, qui lui vaut une pénalité de 10 secondes pour avoir provoqué la collision.</p>
        <p>Leclerc, avec un méplat sévère et de fortes vibrations issues de son verrouillage au restart, résiste de justesse à Norris pour la 4<sup>e</sup> place — « je crois que je peux voir la toile du pneu », rapporte-t-il à son équipe. Verstappen ouvre un peu plus d'une seconde d'avance sur Hamilton mais se plaint d'un frein moteur incohérent ; Antonelli reste collé derrière Hamilton en 3<sup>e</sup> position. À 15 tours de l'arrivée (fin du 56<sup>e</sup> tour), Verstappen mène Hamilton de 1,181 seconde, Antonelli pointant à 3,423s, Leclerc à 7,698s et Norris, qui ne concède que 0,578s à la Ferrari devant lui, à 8,276s.</p>

        <h3 class="subtitle">Seconde Voiture de Sécurité pour Lindblad, pénalité post-course pour Piastri</h3>
        <p>Au 59<sup>e</sup> tour, Lindblad et Piastri se touchent les roues en se disputant la 7<sup>e</sup> place dans les premiers virages ; la Racing Bulls de Lindblad est soulevée et percute le mur — le pilote confirme par radio qu'il va bien, mais la Voiture de Sécurité ressort (déployée 22:05:02 UTC, rentrée à l'issue du 62<sup>e</sup> tour, soit neuf tours avant l'arrivée). Piastri, lui, poursuit en 7<sup>e</sup> position avec ce que McLaren décrit comme des dégâts « raisonnables ». Au redémarrage, Verstappen tient bon devant Hamilton, qui ne trouve jamais assez de vitesse en ligne droite pour l'attaquer ; Leclerc continue de défendre la 4<sup>e</sup> place face à Norris malgré l'état de son train de pneus, jusqu'au bout. L'incident Piastri-Lindblad est renvoyé à une enquête d'après-course, de même qu'un contact Lawson-Gasly au virage 4 (classé sans suite) et des soupçons d'infraction au drapeau jaune pour Gasly et Colapinto au virage 2.</p>
        <p>Verstappen franchit la ligne avec 0,799 seconde d'avance sur Hamilton ; Antonelli, 3<sup>e</sup>, est sacré champion du monde. Son ingénieur de piste et Toto Wolff le félicitent sur la radio tandis que le jeune Italien fond en larmes. Après la course, les commissaires infligent à Piastri une pénalité de 10 secondes pour avoir provoqué la collision avec Lindblad à l'entrée du virage 2 — ils estiment qu'il n'était jamais totalement engagé à hauteur de Lindblad dans le virage 1 et aurait pu éviter le contact en se décalant davantage vers la gauche avant le virage 2. La pénalité fait chuter Piastri de la 7<sup>e</sup> à la 15<sup>e</sup> place, lui coûtant l'intégralité de ses points de ce Grand Prix.</p>
      </div>
    </section>

    <section class="block" data-num="03" id="sec-r3">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> Stratégie chiffrée : l'avantage Ferrari était réel — jusqu'au restart</h2>
        <p>Le feuilleton ouvert dès l'EL1 de ce round (un avantage turbo/altitude supposé de Ferrari, mesuré à l'époque à plus de six dixièmes sur un tour isolé, puis nuancé par le rythme de relais long de l'EL2, l'erreur de Leclerc en EL3, et une qualification remportée par Hamilton plutôt que Leclerc) trouve ici une réponse chiffrée. En moyennant les tours représentatifs de chaque relais (tour d'entrée/sortie de stand exclu, puis tours au-delà de 103% de la médiane du relais également exclus pour neutraliser l'effet des deux neutralisations) :</p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th>Pilote</th><th>Relais d'ouverture (gomme neuve)</th><th>Relais final (tours 46-71)</th><th>Vitesse de pointe max.</th></tr></thead>
          <tbody>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>MEDIUM 1-27 — 1:21,372</td><td><strong>1:19,725</strong></td><td>344 km/h</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>SOFT 1-28 — 1:21,448</td><td>1:19,762</td><td>352 km/h</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>SOFT 1-43 — 1:21,476</td><td>1:19,961</td><td><strong>357 km/h</strong></td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td><strong>SOFT 1-27 — 1:21,185</strong></td><td>1:20,524</td><td>350 km/h</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>SOFT 1-39 — 1:21,614</td><td>1:20,549</td><td>355 km/h</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>SOFT 1-33 — 1:21,637</td><td>1:20,573</td><td>354 km/h</td></tr>
          </tbody>
        </table>
      </div>
      <div class="prose">
        <p>Le chiffre qui tranche le débat ouvert depuis l'EL1 : sur le relais d'ouverture, à gomme tendre neuve et dans une fenêtre de tours comparable, Leclerc (1:21,185 de moyenne) est purement et simplement le pilote le plus rapide du plateau de tête — 0,263s/tour plus véloce que son propre coéquipier Hamilton (1:21,448), sur le même composé, dans la même fenêtre. L'avantage de rythme pur repéré dès l'EL1 (plus de six dixièmes sur un tour isolé, rappelons-le) s'était réduit tout au long du week-end, mais il n'avait pas disparu : au drapeau vert, Ferrari avait toujours la voiture la plus rapide au tour. Ce que les chiffres du relais final révèlent, en revanche, c'est que cet avantage s'est entièrement évaporé après le restart : Leclerc y tombe à 1:20,524 de moyenne, battu par Verstappen (1:19,725), Hamilton (1:19,762) ET Antonelli (1:19,961) — un déficit de 0,5 à 0,8 seconde par tour qui coïncide exactement avec le verrouillage de roues qu'il subit au freinage du restart et le méplat qu'il décrit lui-même par radio. Le turbo et l'altitude n'expliquent donc rien dans ce dernier tiers de course : c'est un tour de pilotage, pas un déficit moteur, qui a changé la hiérarchie.</p>
        <p>Second constat, invisible dans le classement final : la base de données du projet révèle qu'Antonelli a mené la course en tête pendant une bonne quinzaine de tours en milieu de course (environ du 28<sup>e</sup> au 43<sup>e</sup> tour), simplement en restant sur son train de pneus tendres de départ bien plus longtemps que ses rivaux — à l'issue du tour 35, il comptait près de 8 secondes d'avance sur Norris, qui occupait alors la 2<sup>e</sup> place virtuelle. Cette parenthèse en tête, décisive pour la confiance du jeune pilote avant son sacre, n'est mentionnée par aucune des sources médiatiques utilisées pour cet article, concentrées sur l'issue finale plutôt que sur le déroulé intermédiaire — un constat obtenu uniquement par recoupement des écarts chronométrés de Grandprix.com avec les relais bruts de la base.</p>
        <div class="callout">Rappel de méthode : la table tyre_stints de ce projet stocke une ligne par relais (pas une ligne par tour), avec une durée en tours plutôt qu'un âge cumulé au sens littéral malgré le libellé des colonnes — le tour de fin de chaque relais est donc déduit (tour de départ + durée − 1), vérifié recoupé avec les arrêts décrits indépendamment par Grandprix.com pour plusieurs pilotes (ex. l'arrêt de Hamilton au tour 28, confirmé des deux côtés). Les moyennes de relais comparent des tours de longueurs et d'âges de pneus différents — un indicateur solide de tendance, pas une comparaison à carburant strictement identique.</div>
      </div>
    </section>

    <section class="block" data-num="04" id="sec-r4">
      <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">04</span> Classement final (après pénalités d'après course)</h2>
        <p>Classement officiel après application de la pénalité de 10 secondes infligée à Piastri après la course — la page Formula1.com restait marquée « provisoire » et classait encore Piastri 7<sup>e</sup> au moment du fetch ; le tableau ci-dessous intègre la pénalité, confirmée indépendamment par Grandprix.com et The Race.</p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th>Pos.</th><th>Pilote</th><th>Écurie</th><th>Écart</th><th>Pts</th></tr></thead>
          <tbody>
            <tr><td>1</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>2:20:28,772</td><td>25</td></tr>
            <tr><td>2</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>+0,799s</td><td>18</td></tr>
            <tr><td>3</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli 🏆</td><td>Mercedes</td><td>+4,006s</td><td>15</td></tr>
            <tr><td>4</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>+10,707s</td><td>12</td></tr>
            <tr><td>5</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>+11,778s</td><td>10</td></tr>
            <tr><td>6</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>+12,263s</td><td>8</td></tr>
            <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>+20,204s</td><td>6</td></tr>
            <tr><td>8</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>+20,899s</td><td>4</td></tr>
            <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>+21,483s</td><td>2</td></tr>
            <tr><td>10</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>+22,041s</td><td>1</td></tr>
            <tr><td>11</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>+22,503s</td><td>0</td></tr>
            <tr><td>12</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Hirakawa</td><td>Haas F1 Team</td><td>+25,373s</td><td>0</td></tr>
            <tr><td>13</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>+27,562s</td><td>0</td></tr>
            <tr><td>14</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>+28,638s</td><td>0</td></tr>
            <tr><td>15</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>+29,475s <span style="font-size:11px;color:var(--text-muted)">(pénalité 10s)</span></td><td>0</td></tr>
            <tr><td>16</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>+29,977s</td><td>0</td></tr>
            <tr><td>17</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>+30,695s</td><td>0</td></tr>
            <tr><td>NC</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>DNF (58 tours)</td><td>0</td></tr>
            <tr><td>NC</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>DNF (47 tours)</td><td>0</td></tr>
            <tr><td>NC</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>DNF (42 tours)</td><td>0</td></tr>
            <tr><td>NC</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>DNF (5 tours)</td><td>0</td></tr>
            <tr><td>NC</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>DNF (5 tours)</td><td>0</td></tr>
          </tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
      <div class="prose">
        <p>Tour le plus rapide de la course : Hamilton, 1:19,268 au 50<sup>e</sup> tour. Classement du championnat pilotes après cette course, désormais tranché à quatre Grands Prix de la fin de saison : Antonelli 380 points (champion), Verstappen 261, Hamilton 259, Russell 250, Leclerc 245, Norris 221, Piastri 144 (après sa pénalité). Constructeurs : Mercedes 630, Ferrari 504 (126 points d'écart), Red Bull 380, McLaren 365 (Red Bull conserve 15 points d'avance pour la 3<sup>e</sup> place malgré la pénalité de Piastri), Racing Bulls 106, Alpine 77, Haas 30, Audi 24, Williams 12, Aston Martin 7, Cadillac 0 (toujours sans le moindre point après ce Grand Prix).</p>
      </div>
    </section>

    <section class="block" data-num="05" id="sec-r5">
      <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">05</span> Bilan pilote par pilote</h2>
        <p>L'évaluation porte sur le Grand Prix du dimanche, en tenant compte de la position de départ réelle sur la grille (après pénalités, Lawson s'élançant depuis la voie des stands non comptée dans la numérotation).</p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table class="verdict-table">
          <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
          <tbody>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Max Verstappen</td><td class="pos">5 → 1<span class="delta good">+4</span></td><td>Pari gagnant sur le medium au départ, undercut décisif sur les deux Ferrari à l'arrêt groupé du 27<sup>e</sup> tour, puis résistance intégrale à Hamilton sur les deux relais finaux (1:19,725 de moyenne, le plus rapide du plateau). Sixième victoire au Mexique, 74<sup>e</sup> de sa carrière.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Lewis Hamilton</td><td class="pos">1 → 2<span class="delta bad">-1</span></td><td>Perd la tête dès le virage 4 face à l'offensive de Leclerc, puis la retrouve en partie grâce à une décision de direction de course qui le replace 3<sup>e</sup> après le drapeau rouge. Signe le tour le plus rapide de la course et harcèle Verstappen jusqu'au drapeau sans jamais trouver l'ouverture en ligne droite.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Andrea Kimi Antonelli</td><td class="pos">4 → 3<span class="delta good">+1</span></td><td><strong>Champion du monde</strong> à 20 ans, le plus jeune de l'histoire, premier Italien depuis 1953. Mène la course une quinzaine de tours en milieu de parcours sur un relais d'ouverture étiré (43 tours), reprend le podium à Leclerc au restart au tour 48 et n'a plus besoin de se battre pour la victoire pour sceller son titre.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Charles Leclerc</td><td class="pos">3 → 4<span class="delta bad">-1</span></td><td>Signe le relais d'ouverture le plus rapide du plateau de tête (1:21,185, plus rapide que son propre coéquipier) mais perd son avantage avec une pénalité de 5 secondes pour le dépassement hors piste du 1<sup>er</sup> tour, puis détruit son pneu dans un verrouillage au restart (relais final à 1:20,524, le plus lent des quatre de tête) — résiste malgré tout à Norris jusqu'au drapeau.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Lando Norris</td><td class="pos">6 → 5<span class="delta good">+1</span></td><td>Reste au contact du groupe de tête toute la course, attaque Leclerc pour la 4<sup>e</sup> place sur plusieurs tours consécutifs en fin de course sans jamais réussir à se dégager ; termine « 2025 champion du monde » dont le règne s'achève ce dimanche, selon The Race.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>George Russell</td><td class="pos">2 → 6<span class="delta bad">-4</span></td><td>Perd du terrain dès le départ (problème de déploiement signalé) puis provoque le tête-à-queue de Hadjar, lui coûtant une pénalité de 10 secondes ; sa propre course au titre s'achève ce dimanche selon The Race, qui note qu'il n'a plus jamais menacé le podium après son incident du premier tour.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Franco Colapinto</td><td class="pos">11 → 7<span class="delta good">+4</span></td><td>Promu de la 8<sup>e</sup> à la 7<sup>e</sup> place par la pénalité de Piastri, course solide et sans incident individuel notable relevé.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Liam Lawson</td><td class="pos">Voie des stands → 8<span class="delta good">+</span></td><td>Remontée réussie depuis la voie des stands après sa disqualification des qualifications pour infraction MGU-K — dossier ouvert dès l'EL2/EL3 de ce round, désormais entièrement résolu. Résultat solide qui clôt le fil sur une note positive pour Racing Bulls.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Pierre Gasly</td><td class="pos">9 → 9<span class="delta neutral">=</span></td><td>Résultat conforme à sa position de départ ; brièvement repéré pour avoir quitté la voie des stands sous feu rouge (blanchi après enquête), puis visé par une enquête d'après-course pour une possible infraction au drapeau jaune au virage 2.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Gabriel Bortoleto</td><td class="pos">13 → 10<span class="delta good">+3</span></td><td>Décroche le dernier point disponible, promu par la pénalité de Piastri ; sans incident individuel notable relevé.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Isack Hadjar</td><td class="pos">7 → 11<span class="delta bad">-4</span></td><td>Victime du tête-à-queue provoqué par le contact de Russell au premier tour, recule hors des points malgré une remontée partielle ensuite ; sans autre incident individuel notable.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Ryo Hirakawa</td><td class="pos">18 → 12<span class="delta good">+6</span></td><td>Remontée solide pour ses débuts en course, sans incident individuel notable relevé.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Alexander Albon</td><td class="pos">16 → 13<span class="delta good">+3</span></td><td>Progression correcte par rapport à sa position de départ, sans incident individuel notable relevé.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Carlos Sainz</td><td class="pos">15 → 14<span class="delta good">+1</span></td><td>Résultat conforme à sa position de départ, sans incident individuel notable relevé.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Oscar Piastri</td><td class="pos">12 → 15<span class="delta bad">-3</span></td><td>Franchit la ligne 7<sup>e</sup> sur la piste avec des dégâts « raisonnables » après son contact avec Lindblad au 59<sup>e</sup> tour, mais écope d'une pénalité de 10 secondes après la course pour avoir provoqué la collision — les commissaires jugent qu'il n'était jamais totalement engagé dans le virage 1 et aurait pu éviter le contact. Chute de la 7<sup>e</sup> à la 15<sup>e</sup> place, perd tous ses points du week-end.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Nico Hulkenberg</td><td class="pos">10 → 16<span class="delta bad">-6</span></td><td>Provoque la collision avec Bearman au virage 4 lors du second redémarrage, écope d'une pénalité de 10 secondes qui l'éloigne définitivement des points.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Sergio Perez</td><td class="pos">20 → 17<span class="delta good">+3</span></td><td>300<sup>e</sup> départ en Grand Prix devant son public mexicain, mais pénalité de 5 secondes pour excès de vitesse dans la voie des stands ; dernier pilote classé.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Arvid Lindblad</td><td class="pos">8 → DNF<span class="delta dnf">DNF</span></td><td>Abandon au 59<sup>e</sup> tour après un contact de roues avec Piastri en se disputant la 7<sup>e</sup> place : sa Racing Bulls est soulevée et percute le mur. Radio confirmant qu'il va bien ; provoque la seconde Voiture de Sécurité de la course. Enquête d'après-course qui aboutira à la pénalité de Piastri.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Oliver Bearman</td><td class="pos">14 → DNF<span class="delta dnf">DNF</span></td><td>Abandon après un contact avec Hulkenberg au virage 4 lors du redémarrage, qui vaut à ce dernier une pénalité de 10 secondes pour avoir provoqué la collision.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Valtteri Bottas</td><td class="pos">21 → DNF<span class="delta dnf">DNF</span></td><td>Abandon spectaculaire au 45<sup>e</sup> tour : rupture de la suspension avant-gauche à l'approche du virage 1, tête-à-queue à haute vitesse dans les barrières. Sort de la voiture sans aide, déclaré indemne après des examens par précaution ; provoque le drapeau rouge de la course. Cadillac reste sans le moindre point cette saison.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Fernando Alonso</td><td class="pos">17 → DNF<span class="delta dnf">DNF</span></td><td>Abandon précoce, quelques tours seulement après le départ — nouveau nadir d'une saison déjà difficile pour Aston Martin selon The Race.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Lance Stroll</td><td class="pos">19 → DNF<span class="delta dnf">DNF</span></td><td>S'immobilise en bord de piste quelques tours après le départ, provoquant la première Voiture de Sécurité Virtuelle de la course — abandon quasi simultané à celui de son coéquipier Alonso.</td></tr>
          </tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
    </section>

    <section class="block" data-num="06" id="sec-r6">
      <div class="sec-marker"><span class="n">06</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">06</span> Bilan équipe par équipe</h2>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th style="width:140px;">Équipe</th><th>Bilan stratégique et opérationnel</th></tr></thead>
          <tbody>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Red Bull Racing</td><td>Victoire de Verstappen grâce à un pari medium au départ et un undercut décisif, résistance intégrale à Hamilton sur les deux relais finaux (rythme le plus rapide du plateau) ; Hadjar victime du premier tour, termine hors des points.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Ferrari</td><td>Avantage de rythme pur confirmé sur le relais d'ouverture (Leclerc plus rapide que son propre coéquipier Hamilton sur le même composé) mais entièrement consommé par la pénalité du premier tour et le verrouillage de roues au restart ; Hamilton 2<sup>e</sup>, Leclerc 4<sup>e</sup> après un podium manqué sur le fil.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Mercedes</td><td>Titre mondial pour Antonelli à 20 ans (plus jeune champion de l'histoire), décroché depuis le podium après une longue parenthèse en tête de course sur un relais d'ouverture étiré ; Russell, victime d'un faux départ et auteur d'un tête-à-queue provoqué sur Hadjar, voit sa propre course au titre s'achever ce dimanche.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>McLaren</td><td>Norris reste au contact du groupe de tête sans jamais réussir à passer Leclerc, termine 5<sup>e</sup> ; Piastri, 7<sup>e</sup> sur la piste, perd tous ses points après une pénalité de 10 secondes pour sa collision avec Lindblad — week-end à oublier malgré le rythme montré en piste.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Alpine</td><td>Double top 10 solide : Colapinto 7<sup>e</sup> (promu par la pénalité de Piastri), Gasly 9<sup>e</sup>, sans incident individuel majeur relevé en course pour les deux pilotes.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Racing Bulls</td><td>Lawson clôt le feuilleton MGU-K ouvert depuis l'EL2 par une remontée réussie depuis la voie des stands jusqu'à la 8<sup>e</sup> place ; Lindblad abandonne après son contact avec Piastri, qui entraîne la pénalité de ce dernier après la course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Audi</td><td>Bortoleto décroche le dernier point disponible, promu par la pénalité de Piastri ; Hulkenberg, auteur de la collision avec Bearman au second redémarrage, écope d'une pénalité de 10 secondes et termine hors des points.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Haas F1 Team</td><td>Hirakawa remonte solidement pour ses débuts en course ; Bearman abandonne après le contact subi de la part de Hulkenberg au second redémarrage.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Aston Martin</td><td>Week-end catastrophique : Alonso et Stroll abandonnent quasi simultanément, quelques tours après le départ — nouveau point bas d'une saison déjà difficile selon The Race.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Williams</td><td>Double remontée correcte : Albon 13<sup>e</sup>, Sainz 14<sup>e</sup>, sans incident individuel notable relevé pour les deux pilotes.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Cadillac</td><td>Perez termine dernier des classés à domicile malgré son 300<sup>e</sup> départ en carrière (pénalité de 5 secondes pour excès de vitesse en voie des stands) ; Bottas abandonne spectaculairement sur rupture de suspension, provoquant le drapeau rouge de la course — l'écurie reste sans le moindre point cette saison.</td></tr>
          </tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
    </section>

    <section class="block" id="sec-r7">
      <div class="prose">
        <h2 class="sectitle">Conclusion</h2>
        <div class="verdictgrid">
          <div class="verdictcol win">
            <h4>Gagnants</h4>
            <ul>
              <li><strong>Andrea Kimi Antonelli</strong>, champion du monde à 20 ans — le plus jeune de l'histoire, premier Italien depuis Alberto Ascari en 1953 — décroché depuis le podium après une longue parenthèse en tête de course passée sous le radar des médias.</li>
              <li><strong>Max Verstappen</strong>, troisième victoire en quatre courses grâce à un pari medium payant et un rythme final imbattable sur l'ensemble du plateau.</li>
              <li><strong>Liam Lawson</strong>, remontée depuis la voie des stands jusqu'à la 8<sup>e</sup> place qui clôt sur une note positive le feuilleton MGU-K ouvert dès l'EL2 de ce round.</li>
              <li><strong>Charles Leclerc</strong>, malgré la 4<sup>e</sup> place : le relais d'ouverture le plus rapide de tout le plateau de tête, confirmation chiffrée que l'avantage turbo/altitude Ferrari repéré dès l'EL1 n'était pas une illusion.</li>
            </ul>
          </div>
          <div class="verdictcol lose">
            <h4>Perdants</h4>
            <ul>
              <li><strong>Oscar Piastri</strong>, 7<sup>e</sup> sur la piste mais privé de tous ses points par une pénalité de 10 secondes après la course pour sa collision avec Lindblad.</li>
              <li><strong>George Russell</strong>, course au titre achevée ce dimanche après un faux départ puis un tête-à-queue provoqué sur Hadjar qui lui coûte une pénalité de 10 secondes.</li>
              <li><strong>Aston Martin</strong>, double abandon quasi simultané d'Alonso et Stroll quelques tours après le départ.</li>
              <li><strong>Cadillac</strong>, abandon spectaculaire de Bottas sur rupture de suspension (provoquant le drapeau rouge de la course) dans une saison où l'écurie n'a toujours pas marqué le moindre point.</li>
            </ul>
          </div>
        </div>
        <div class="callout">Mexico restera le Grand Prix où l'arc technique ouvert dès l'EL1 de ce round a enfin trouvé sa résolution chiffrée : Ferrari avait bel et bien la voiture la plus rapide au tour, confirmé par un relais d'ouverture où Leclerc devance son propre coéquipier de plus d'un quart de seconde par tour sur gomme identique. Mais le titre mondial, lui, s'est décidé ailleurs — dans un podium à trois pilotes et douze couronnes mondiales cumulées, où le plus jeune des trois n'avait même pas besoin de gagner pour entrer dans l'histoire.</div>
      </div>
    </section>

    <section class="block" id="sec-r-next">
      <div class="prose">
        <h2 class="sectitle">Enseignements pour la suite</h2>
        <p>Trois points issus de Mexico à surveiller au prochain rendez-vous, le Grand Prix du Brésil à Sao Paulo :</p>
        <ol style="padding-left:20px; margin:0 0 16px;">
          <li style="margin-bottom:10px;"><strong>Antonelli</strong> aborde les quatre dernières courses de la saison en champion déjà couronné — reste à voir si la pression retombée change sa gestion de course, ou si Mercedes, déjà solidement devant au championnat constructeurs (630 points, 126 d'avance sur Ferrari), continue de privilégier ses intérêts à long terme.</li>
          <li style="margin-bottom:10px;"><strong>Ferrari</strong> a confirmé à Mexico un avantage de rythme pur réel (le relais d'ouverture de Leclerc, le plus rapide du plateau de tête) — la question posée depuis l'EL1 de ce round n'est donc plus « le moteur est-il plus rapide ? » mais « l'écurie peut-elle enfin l'exploiter sans incident interne ni erreur d'exécution au mauvais moment ? ».</li>
          <li><strong>Red Bull et McLaren</strong> se disputent la 3<sup>e</sup> place du championnat constructeurs à seulement 15 points d'écart (380 contre 365) après la pénalité de Piastri — un enjeu sportif concret qui reste ouvert alors que le titre pilotes, lui, est désormais réglé.</li>
        </ol>
        <a class="bridge-btn" href="/courses" style="text-decoration:none; display:inline-block;">Voir le calendrier de la saison →</a>
      </div>
    </section>

    <section class="block" id="sec-r8">
      <details class="sources">
        <summary>Sources utilisées — GP de Mexico (8 liens externes)</summary>
        <div class="srcgroup">
          <h5>Données de course</h5>
          <ul>
            <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1.py), session_key=11404 ; classement et grille via Formula1.com en primaire, la table « results » (pipeline Jolpica) n'étant pas encore peuplée pour ce round à l'heure de la rédaction (vérifié via scripts/race_briefing.py, sortie vide).</span></li>
            <li><span class="desc">Requête dédiée tours bruts et relais pneus par numéro de voiture, les 22 voitures de la grille (scripts/race_briefing_laptimes_by_car.py) : base de toutes les moyennes de relais, vitesses de pointe et de la découverte sur la parenthèse en tête d'Antonelli, section 03.</span></li>
            <li><span class="desc">Relecture complète des race_control_messages (169 lignes) : base du détail précis des deux neutralisations (VSC tour ~6-9, Voiture de Sécurité/drapeau rouge tour 45, seconde Voiture de Sécurité tours 59-62), des pénalités de course et des enquêtes d'après-course.</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Institutionnel / officiel</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/results/2026/races/1298/mexico/race-result" data-desc="Classement officiel complet, fetché en primaire — page marquée '* Provisional results.' qui classait encore Piastri 7e (+19,475s) AVANT sa pénalité post-course de 10 secondes, confirmée indépendamment par Grandprix.com et The Race. Écart documenté explicitement en tête de fichier plutôt que silencieusement corrigé.">Formula1.com — résultats officiels de la course (provisoires)</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/all" data-desc="Titres confirmés par fetch direct : 'Antonelli crowned champion in Mexico as Verstappen wins race', 'Verstappen is your Mexico City GP Driver of the Day', 'Antonelli shares touching reaction to incredible title win'. Pages d'articles individuelles non atteintes (même limite documentée pour les rounds précédents) — utilisés comme citations partielles correctement attribuées.">Formula1.com — actualités après course</a><span class="desc">Formula1.com</span></li>
            <li><span class="desc">Pirelli — press.pirelli.com/tagfeed/en/tags/press__releases, relu une cinquième fois pour ce round : toujours aucune entrée spécifique au Mexique 2026 (dernière entrée datée de février 2025) — régression confirmée pour la cinquième séance consécutive.</span></li>
            <li><span class="desc">Tentatives explicitement infructueuses et honnêtement documentées : ferrari.com/en-EN/formula1/news (HTTP 403 Forbidden), visacashapprb.com/int-en/news (répond mais sans contenu propre à ce Grand Prix), mercedesamgf1.com, redbullracing.com et cadillacf1team.com (échecs réseau côté runner). Aucune communication directe pilote/écurie trouvée malgré un effort réel sur six canaux institutionnels.</span></li>
            <li><a href="https://www.mclaren.com/racing/" data-desc="Page d'accueil McLaren Racing relue intégralement : contenu encore entièrement pré-course (préparation à l'altitude, aspirations de Piastri), rien sur le résultat réel ni sur la pénalité qui le prive de points — absence de contenu nouveau documentée honnêtement.">McLaren Racing — site officiel</a><span class="desc">McLaren.com, aucun contenu post-course</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Déroulé de course complet, analyse et contexte championnat</h5>
          <ul>
            <li><a href="https://www.grandprix.com/races/mexican-gp-2026-race-notes.html" data-desc="Déroulé complet tour par tour, grille exacte, composés de pneus des 22 pilotes au départ, citations radio complètes, classement du championnat pilotes ET constructeurs après course. Lu intégralement via fetch-url.yml — source la plus détaillée utilisée pour cet article.">Grandprix.com — notes de course</a><span class="desc">Grandprix.com</span></li>
            <li><a href="https://www.the-race.com/formula-1/antonelli-clinches-title-as-ferrari-mess-helps-verstappen-win/" data-desc="Récit complet de la course (Matt Beer), détail du podium à 12 titres cumulés, citations radio. Concorde au mot près avec Grandprix.com. Lu intégralement via fetch-url.yml.">The Race — Antonelli sacré champion</a><span class="desc">The Race (Matt Beer)</span></li>
            <li><a href="https://www.the-race.com/formula-1/fia-explains-controversial-leclerc-penalty-decision/" data-desc="Reproduit le texte intégral du communiqué des commissaires sur la pénalité de Leclerc — document le plus proche d'une source officielle obtenu cette session. Citations radio complètes de Hamilton et Verstappen. Lu intégralement via fetch-url.yml.">The Race — les commissaires expliquent la pénalité de Leclerc</a><span class="desc">The Race (Jon Noble)</span></li>
            <li><a href="https://www.the-race.com/formula-1/bottas-taken-for-medical-checks-after-race-stopping-crash/" data-desc="Détail technique de la panne de suspension de Bottas (rupture avant-gauche), citations radio et communiqués Cadillac successifs. Lu intégralement via fetch-url.yml.">The Race — Bottas indemne après son accident</a><span class="desc">The Race (Matt Beer)</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Tentatives documentées, sans résultat exploitable cette fois</h5>
          <ul>
            <li><span class="desc">Crash.net (/f1/news) et Autosport (/f1/news/) : les deux pages de liste répondent (HTTP 200) mais ne livrent cette fois que la coquille de navigation JavaScript, sans carte d'article extractible en HTML brut — régression ponctuelle par rapport aux rounds précédents, où Crash.net en particulier avait livré des titres exploitables.</span></li>
            <li><span class="desc">r/F1Technical : nouvelle tentative réelle (reddit.com/r/F1Technical/search.json?q=mexico+race&restrict_sr=1&sort=new) depuis fetch-url.yml, échec identique — HTTP 403 « Blocked ». Septième semaine consécutive de blocage stable et reproductible pour ce projet.</span></li>
          </ul>
        </div>
      </details>
    </section>
`;
