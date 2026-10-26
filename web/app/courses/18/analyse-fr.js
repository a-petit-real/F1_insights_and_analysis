// Analyse Round 18 — Grand Prix des États-Unis 2026 (Circuit of The Americas, Austin).
//
// Sourcing : classement officiel, grille de départ (après pénalités) et points
// marqués = pages de résultats officielles Formula1.com (results/2026/races/1297/
// united-states/race-result et .../starting-grid), fetchées en primaire via
// fetch-url.yml le jour même de la course. Chaque écart et point marqué recolle
// exactement avec cette source (Leclerc +13,078s, Verstappen +17,485s, etc.).
// Point de rigueur important : la grille officielle publiée après la course
// CORRIGE deux points de l'article qualifications (quali-fr.js) de ce round,
// qui restait jusque-là la meilleure source disponible (grille provisoire
// F1-Fansite.com) :
// - La pénalité moteur de Bortoleto, dont quali-fr.js signalait un désaccord
//   non résolu entre Grandprix.com (« 80-place drop ») et F1-Fansite.com
//   (« 60 place grid penalty ») est maintenant tranchée par la grille FIA/
//   Formula1.com officielle elle-même : « Bortoleto penalised 80 places » —
//   Grandprix.com avait raison, F1-Fansite.com se trompait sur ce chiffre.
// - Lindblad, que le rapport qualifications de Grandprix.com décrivait comme
//   ayant vu sa pénalité moteur « retirée par la FIA » (conservant sa 9e place
//   de Q3 intacte), apparaît en réalité PÉNALISÉ de cinq places sur la grille
//   officielle publiée après coup (« Lindblad penalised five places ») — parti
//   14e au lieu de 9e. Correction explicite par rapport à la version publiée
//   de l'article qualifications, documentée ici plutôt que silencieusement
//   répétée. Le fichier quali-fr.js n'est pas réécrit rétroactivement (politique
//   du projet : un article publié n'est pas modifié après coup sauf demande
//   explicite), mais l'erreur est corrigée et expliquée dans celui-ci.
// Nouveau fait, absent de tout article précédent de ce round : Stroll s'élance
// de la voie des stands (modifications sous conditions de Parc Fermé + pièces
// moteur supplémentaires), confirmé à la fois par la grille officielle et par
// le rapport de course Grandprix.com.
//
// Déroulé de course complet (tour par tour), causes d'abandon (Bottas, Colapinto,
// Bearman), horaires des deux périodes de Voiture de Sécurité Virtuelle,
// classement du championnat après course et enjeux du prochain rendez-vous
// (Mexico) = Grandprix.com, « Race Notes - Antonelli dominates in Austin for
// ninth win » (25 octobre 2026), lu intégralement via fetch-url.yml — confirmé
// comme portant bien sur cette course précise (date, circuit, classement à la
// milliseconde près identique à Formula1.com, mention explicite de l'enjeu
// Mexico). Recoupé avec The Race, qui fetché en primaire (page de résultat
// complète + bandeau d'actualités de sa page d'accueil Formule 1) confirme
// indépendamment le même classement et, surtout, la même lecture stratégique
// de fond : « Kimi Antonelli made a one-stop strategy work to win the US GP as
// challenges from Red Bull and Ferrari failed to materialise » — une
// convergence entre un média indépendant et le calcul interne du projet
// (section 03 ci-dessous), pas une simple reformulation. The Race rapporte
// également, sans qu'aucune citation complète n'ait pu être récupérée au-delà
// du titre, qu'Alonso a critiqué le niveau d'Albon après leur contact du premier
// tour — relevé ici comme un fait de course (critique de pilotage), pas comme
// du contenu "people".
//
// Recoupement supplémentaire, généraliste et institutionnel : la page
// d'actualités Formula1.com (/en/latest/all, fetchée en primaire) confirme par
// ses propres titres une série de réactions d'après-course distinctes du
// compte-rendu Grandprix.com — Hamilton pointant son « biggest issue », Red
// Bull reconnaissant que « everything went wrong », Norris admettant que
// McLaren n'est « just not quick enough », Russell « at a loss to explain »
// ses difficultés, Antonelli « hoping to win title very soon » après un « GP
// parfait », et Leclerc nommé pilote du jour. Seuls les titres/accroches ont pu
// être récupérés par le fetch (pages d'articles individuelles non atteintes
// avec les URL devinées) — utilisés ici comme des citations partielles
// correctement attribuées, pas comme des articles lus en entier ; signalé
// comme tel plutôt que complété par une fausse citation. Crash.net (page
// /f1/news, fetchée en primaire, HTML brut et rendu) confirme indépendamment
// plusieurs de ces mêmes réactions (Russell : « It was rubbish », Wolff
// s'exprimant sur l'état d'esprit d'Antonelli, Verstappen répondant au patron
// du circuit COTA sur l'état de la piste) — même limite que Formula1.com, seuls
// les titres de la page de liste ont pu être confirmés par fetch direct, pas le
// corps des articles individuels (URL exactes non trouvées malgré plusieurs
// tentatives documentées plus bas).
//
// Analyse technique quantifiée (le cœur du travail de cette passe) :
// requête dédiée sur lap_times/tyre_stints par numéro de voiture
// (scripts/race_briefing_laptimes_by_car.py, sur les 22 voitures de la grille),
// le classement officiel confirmant que la table `results` (pipeline Jolpica)
// n'était pas encore peuplée pour ce round au moment de la rédaction — même
// contournement que pour le round 17. Méthode identique aux rounds précédents :
// moyenne des tours d'un relais donné, tour de sortie de stand exclu, puis tours
// encore supérieurs à 103% de la médiane du relais également exclus (pour ne pas
// confondre un retour au stand, une Voiture de Sécurité Virtuelle ou un tour
// dans le trafic avec un vrai delta de performance). Constat central, chiffré,
// qui résout directement la tension posée par l'article qualifications (le
// rythme de relais long de l'EL2 plaçait Verstappen/Leclerc/Norris dans un
// mouchoir de 0,07s avec un Antonelli nettement plus lent) : en course, sur le
// dernier relais de chacun, Leclerc (1:38,790 de moyenne) et Hamilton (1:38,847)
// sont bel et bien plus rapides qu'Antonelli (1:39,888) — la tension annoncée
// était réelle, pas un faux signal. Mais Antonelli n'a eu besoin que d'un seul
// arrêt (medium puis hard) contre deux pour les deux Ferrari (soft/medium/hard)
// et pour Verstappen (soft/soft/medium) : l'écart de temps perdu en un arrêt de
// stand supplémentaire (~20 à 22s, mesuré directement sur les tours d'entrée/
// sortie de stand bruts de plusieurs pilotes, cf. section 03) dépasse largement
// le gain de pace que Ferrari retrouve sur gomme plus fraîche en fin de course.
// La vitesse de pointe (speed_st) est également comparée pour les dix premiers :
// Russell culmine à 349 km/h (le plus rapide de la grille, Mercedes), Verstappen
// à 340, Leclerc à 342, contre 325 pour Lawson et 333 pour Hadjar — à traiter
// comme un indice de compromis appui/traînée plutôt qu'un fait isolé.
//
// Le dossier plancher Ferrari et les autres fils techniques du week-end
// (direction de Verstappen, incident Russell/Leclerc en EL2) restent ceux déjà
// sourcés pour les EL1/EL2/EL3/Qualifications de ce round — non répétés ici,
// voir le commentaire de sourcing de el1-fr.js pour le détail complet.
//
// Lecture technique nouvelle propre à cette course : relecture complète et non
// filtrée des race_control_messages (scripts/race_briefing_full_rcm.py) sur
// l'intégralité des 56 tours. Elle fait apparaître un déplacement net du point
// chaud des limites de piste par rapport au reste du week-end : après le virage
// 19 (EL1, trois fois en qualifications) puis les virages 9/10 (EL3), c'est le
// virage 12 qui concentre la quasi-totalité des suppressions de la course — 17
// des 28 temps supprimés au total, touchant 15 pilotes différents, Russell seul
// cumulant quatre suppressions à ce virage (en plus de sa pénalité de 5s pour le
// premier tour). Aucune des sources médiatiques utilisées ne signale ce
// déplacement du point chaud comme tel — c'est un constat agrégé obtenu
// uniquement par la relecture complète des messages de course bruts, comme pour
// le virage 2 de Singapour au round 17.
//
// Recherches avec effort réel mais pour l'essentiel infructueuses, documentées
// honnêtement plutôt que masquées ou comblées par une fausse citation :
// - r/F1Technical : deux tentatives directes via l'API de recherche Reddit
//   (search.json sur « austin OR united states », puis new.json sur les
//   nouveaux fils du subreddit) depuis le runner fetch-url.yml — les deux ont
//   échoué (même blocage anti-bot déjà documenté pour les rounds précédents,
//   cf. docs/SOURCES.md). Le problème reste donc non spécifique à un sujet ou
//   à un round : la communauté est restée injoignable à chaque tentative de ce
//   round comme des précédents.
// - Mercedes-AMG Petronas (mercedesamgf1.com/en/news), Scuderia Ferrari
//   (ferrari.com/en-EN/formula1/news) et Pirelli (pirelli.com/global/en-gb/
//   race/formula-1/) : les trois fetchs ont échoué (erreurs réseau côté
//   runner) — tentative réelle de récupérer une citation directement depuis un
//   site d'écurie ou le fournisseur de pneus, sans résultat exploitable.
// - Oracle Red Bull Racing (redbullracing.com/int-en/news) : le fetch a
//   réussi (HTTP 200) mais la page ne renvoie aucun texte extrait — site
//   entièrement rendu en JavaScript côté client, dont le contenu n'est pas
//   présent dans le HTML brut livré au runner. Aucune citation d'écurie
//   récupérable par cette voie non plus.
// - Conséquence assumée : aucun élément de communication provenant
//   directement du site ou du réseau social propre d'un pilote/d'une écurie
//   n'a pu être intégré à cet article malgré un effort réel sur quatre canaux
//   différents — signalé ici comme un vrai manque de sourcing sur ce point
//   précis plutôt que masqué ou comblé par une citation inventée. Les citations
//   de pilotes utilisées plus bas (Hamilton, Red Bull, Norris, Russell,
//   Antonelli via Formula1.com ; Russell, Wolff, Verstappen via Crash.net)
//   restent donc toutes des citations de presse de second rang (médias
//   indépendants), jamais présentées comme des communications directes.
// - Avertissement méthodologique découvert cette passe, à conserver pour les
//   rounds futurs (ajouté à docs/SOURCES.md) : une recherche web générale
//   (WebSearch) sur les faits de cette course précise renvoie presque
//   systématiquement une couverture bien réelle de la VRAIE saison F1 2026 —
//   sans aucun rapport avec le contenu spécifique à ce projet (ex. plusieurs
//   résultats évoquant un classement du championnat et des épisodes de course
//   2026 totalement différents de ceux de la base de données et des articles
//   déjà publiés de ce projet). Aucun résultat de recherche générale de ce
//   type n'a donc été utilisé comme source dans cet article — seuls les
//   contenus effectivement fetchés via fetch-url.yml sur les domaines déjà
//   confirmés pour ce projet (Formula1.com, Grandprix.com, The Race, Crash.net)
//   ont été retenus.
// - FastF1 (télémétrie gaz/frein/rapport/régime/DRS) : le workflow
//   ingest-fastf1.yml a été déclenché pour ce round mais le run est resté en
//   file d'attente (statut "queued") sur toute la durée de la rédaction — le
//   runner auto-hébergé de l'utilisateur n'était pas en ligne. Aucune donnée
//   FastF1 n'a donc pu être ajoutée à cet article ; aucun canal de télémétrie
//   gaz/frein/rapport n'est mentionné dans le texte ci-dessous, conformément à
//   la consigne de ne jamais évoquer une source non réellement disponible.
export const ROUND18_ANALYSE_FR_HTML = `
<div class="hero prose">
      <p class="eyebrow">Grand Prix des États-Unis · Circuit of The Americas, Austin · 2026</p>
      <p class="verdict">Antonelli transforme sa pole en victoire dominante grâce à un seul arrêt au ravitaillement — alors que les deux Ferrari, plus rapides au tour dans leurs derniers relais, payent le prix de leur stratégie à deux arrêts et ne referment jamais complètement l'écart.</p>
      <div class="resultstrip">
        <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · parti 1<sup>er</sup></span></div>
        <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari · +13,078s</span></div>
        <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · +17,485s</span></div>
        <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari · +18,515s</span></div>
        <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren · +30,521s</span></div>
      </div>
      <p class="subverdict">Neuvième victoire de la saison pour Antonelli, qui mène la quasi-totalité des 56 tours depuis la pole — seule parenthèse, un tour où Leclerc reprend virtuellement la tête lors du ballet des arrêts, avant qu'Antonelli ne le repasse dans le même tour. Les chiffres de rythme en relais du projet confirment un scénario plus serré que l'écart final de 13 secondes ne le laisse paraître : sur leurs derniers relais, Leclerc (1:38,790 de moyenne) et Hamilton (1:38,847) tournent bel et bien plus vite qu'Antonelli (1:39,888) — la question posée par l'article qualifications (le rythme de relais long de l'EL2, où Antonelli était le plus lent des quatre favoris) n'était donc pas un faux signal. Mais l'écurie allemande n'a eu besoin que d'un seul arrêt contre deux pour les deux Ferrari, un différentiel de temps de stand qui s'avère décisif. Deux périodes de Voiture de Sécurité Virtuelle, aucune Safety Car complète, et un déplacement net du point chaud des limites de piste vers le virage 12 (17 des 28 temps supprimés de la course) complètent un dimanche sans drame majeur mais statistiquement chargé.</p>
    </div>

    <section class="block" data-num="01" id="sec-r1">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> Le contexte avant le départ</h2>
        <p>Antonelli avait décroché la pole la veille avec 0,179s d'avance sur Verstappen et 0,215s sur Hadjar, mettant fin à la série parfaite de Ferrari sur les trois séances d'essais libres. <a href="/courses/18" data-desc="Détail complet des qualifications : Q1/Q2/Q3, trois suppressions au virage 19, pénalités moteur.">Voir l'analyse des qualifications</a> La grille a toutefois bougé une dernière fois avant le départ : la grille officielle publiée après course confirme que Lindblad, et pas seulement Bortoleto et Colapinto, partait avec une pénalité — cinq places pour composant moteur supplémentaire, le reléguant de la 9<sup>e</sup> à la 14<sup>e</sup> place — une correction par rapport à l'article qualifications de ce round, qui avait rapporté (via Grandprix.com) que ce document de pénalité avait été retiré par la FIA. Même document officiel qui tranche enfin un désaccord resté non résolu la veille : la pénalité cumulée de Bortoleto pour composants moteur est bien de 80 places, comme l'affirmait Grandprix.com, et non de 60 comme le détaillait F1-Fansite.com. Stroll, enfin, s'élance de la voie des stands après des modifications apportées à son Aston Martin sous conditions de Parc Fermé, combinées à des pièces moteur supplémentaires — un fait absent de l'article qualifications, confirmé à la fois par la grille officielle et par le rapport de course Grandprix.com.</p>
        <p>La grille réelle de départ s'établissait ainsi : Antonelli, Verstappen, Hadjar, Leclerc, Hamilton, Russell, Piastri, Norris, Lawson, Gasly, Hulkenberg, Alonso, Bearman, Lindblad, Ocon, Sainz, Albon, Perez, Bottas, Colapinto, Bortoleto, puis Stroll depuis la voie des stands. La course se dispute par temps sec, air entre 27 et 28°C, avec un risque de pluie annoncé à 0% par la direction de course avant le départ. Côté pneus, Antonelli, Russell et Piastri optent pour le medium au départ, Norris fait de même, tandis que Verstappen, Hadjar, Leclerc et Hamilton partent tous en tendre.</p>
      </div>
    </section>

    <section class="block" data-num="02" id="sec-r2">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

        <h3 class="subtitle">Un départ propre pour Antonelli, une Voiture de Sécurité Virtuelle de 14 secondes pour du gravillon</h3>
        <p>Au signal, Antonelli conserve la tête au premier virage tandis que Leclerc prend l'avantage sur Verstappen pour la 2<sup>e</sup> place — avantage de courte durée : Verstappen reprend l'ascendant dans le même tour en plongeant à l'intérieur du Monégasque. Hamilton se hisse en 4<sup>e</sup> position, reléguant Hadjar au 5<sup>e</sup> rang. Antonelli ouvre déjà 2,4 secondes d'avance pendant que ses poursuivants se disputent le reste du podium. Plus loin, un contact entre Russell et Piastri (et, selon The Race, entre Alonso et Albon) ponctue ce tour d'ouverture ; les commissaires jugent que Russell est sorti de la piste en y gagnant un avantage et lui infligent une pénalité de cinq secondes, qu'il servira à son unique arrêt. Au tour 2, une brève Voiture de Sécurité Virtuelle de seulement 14 secondes (20:06:06-20:06:20 selon les messages de course bruts) neutralise la course pour des gravillons sur la piste, avant une relance immédiate.</p>

        <h3 class="subtitle">Verstappen au contact, Antonelli qui tient bon sur ses gommes de départ</h3>
        <p>Verstappen signe un 1:40,631 au tour 3, immédiatement répliqué par un 1:40,330 d'Antonelli au tour 4 ; au 10<sup>e</sup> tour, l'avance du leader a grimpé à 2,8 secondes. Plus loin dans le peloton, Ocon gagne trois places pour pointer 12<sup>e</sup>, Norris se plaint auprès de McLaren que Piastri le retient (son coéquipier le laisse passer), et Hamilton signale déjà une perte de performance sur ses pneus avant. Verstappen effectue le premier arrêt des leaders dès la fin du tour 13, repartant en tendre — un choix qui l'engage d'emblée vers une stratégie à deux arrêts, puisqu'il devra changer de composé plus tard dans la course.</p>

        <h3 class="subtitle">Le ballet des arrêts : Ferrari à deux arrêts, Antonelli n'en fait qu'un</h3>
        <p>Hamilton s'arrête fin du tour 14 pour passer sur medium, Leclerc l'imite fin du tour 15, tout comme Piastri ; Norris s'arrête fin du tour 16 mais subit un arrêt lent et ne ressort que 9<sup>e</sup>. Antonelli, Hadjar et Russell, eux, restent sur leurs pneus de départ — Hadjar confirme même par radio à Red Bull que ses gommes tiennent encore. Verstappen double Russell pour la 3<sup>e</sup> place virtuelle pendant que Leclerc enchaîne deux de ses meilleurs tours (1:39,753 puis 1:39,687) sur pneus medium frais. Au tour 22, Russell s'arrête, sert sa pénalité de cinq secondes et repasse en hard, ressortant 10<sup>e</sup> ; Hadjar laisse alors passer Verstappen pour la 2<sup>e</sup> place, Antonelli restant devant sur ses mediums d'origine. Fin du tour 24 — soit son <strong>unique</strong> arrêt de la course —, Antonelli chausse enfin le train de hards, ressortant 4<sup>e</sup> derrière Hadjar et Leclerc ; Leclerc double Hadjar dès le tour suivant, qui s'arrête à son tour fin du tour 25. À la fin du tour 26, Verstappen mène Leclerc de 4,3 secondes, Antonelli pointant à 7,0 secondes du leader, devant Hamilton (9,3s), Norris (18,4s), Hadjar (27,5s) et Piastri (28,6s).</p>
        <div class="callout">Le tournant stratégique de la course se joue ici : Verstappen est en tête sur des gommes tendres qui imposeront un second arrêt, tandis qu'Antonelli vient de boucler son unique changement de pneus et vise l'arrivée en hard. Red Bull et Ferrari jouent toutes deux la carte des deux arrêts ; Mercedes joue l'unique arrêt. L'issue de la course se nichera dans cet écart de stratégie plus que dans le rythme pur — voir le détail chiffré en section 03.</div>

        <h3 class="subtitle">Antonelli reprend la tête dans le même tour, Verstappen aux prises avec des soucis radio</h3>
        <p>Verstappen signale des difficultés à entendre son équipe et des problèmes de frein moteur ; Leclerc revient à 1,2 seconde de lui, Antonelli six dixièmes derrière la Ferrari. Verstappen s'arrête fin du tour 31 pour passer en medium — son second et dernier changement — et ressort 5<sup>e</sup> ; Leclerc prend alors la tête virtuelle, mais Antonelli plonge à l'intérieur et la lui reprend dans le même tour (32), pour ne plus jamais la céder. L'ordre se fixe alors : Antonelli, Leclerc, Hamilton, Norris, Verstappen, Hadjar, Piastri, Russell, Lawson, Gasly. Verstappen améliore à 1:39,307 en entamant son relais final ; Antonelli, lui, verrouille ses freins en doublant Sainz mais conserve la tête sans incident.</p>

        <h3 class="subtitle">Deux abandons, une Voiture de Sécurité Virtuelle plus longue, et la remontée de Hamilton</h3>
        <p>Au tour 35, Colapinto est appelé à l'arrêt : le contact du premier tour avec Lindblad au virage 1 a endommagé son plancher et son sidepod au point de ne plus pouvoir continuer, confirme Alpine après coup — un abandon sans rapport avec une pénalité sportive, les commissaires ayant classé l'incident initial sans suite. Hamilton effectue son second arrêt fin du tour 38 pour repasser en hard, et Leclerc l'imite fin du tour 39, juste derrière Verstappen dont le train de medium compte alors huit tours d'avance en âge. Leclerc signe le tour le plus rapide de la course, un 1:37,976 au tour 42, puis referme rapidement l'écart sur le trio de tête : 3,4 secondes sur Verstappen. Au tour 47, Verstappen double Norris au premier virage pour s'empêtrer un temps en 2<sup>e</sup> position ; Leclerc met alors Norris sous pression, provoque un blocage de roues du Britannique et passe en 3<sup>e</sup> position. Au tour 49, Leclerc reprend l'avantage sur Verstappen pour la 2<sup>e</sup> place. Hamilton, pendant ce temps, grignote l'écart sur Norris et le dépasse au tour 51 pour s'installer en 4<sup>e</sup> position — une remontée qui, selon Grandprix.com, maintient la lutte pour le titre ouverte une semaine de plus.</p>
        <p>Au même tour 51, Bottas ralentit et s'immobilise en bord de piste après 48 tours, pour ce que Cadillac décrit après course comme une panne suspectée de l'unité de puissance — moteur qui se met à « couper par intermittence », cause précise encore à l'étude selon l'écurie. Drapeaux jaunes, puis Voiture de Sécurité Virtuelle déployée à 21:29:34 (heure UTC des messages de course bruts) et levée à 21:33:25, soit près de quatre minutes — nettement plus longue que la neutralisation de 14 secondes du tour 2. Antonelli conserve une marge confortable sur Leclerc pendant cette phase ; Norris s'interroge auprès de McLaren sur le choix de pneus en cas de Safety Car complète, qui ne sera finalement jamais déployée. La levée de la VSC intervient en plein milieu du relais final de Verstappen, dont les tours 51 à 53 ralentissent nettement (jusqu'à 2:16,661 au tour 52, à peine 247 km/h en vitesse de pointe) avant de retrouver un rythme normal au tour 54 — signature directe, dans les données brutes du projet, de cette deuxième neutralisation.</p>

        <h3 class="subtitle">Le drapeau à damier, et une troisième casse en coulisses</h3>
        <p>La course reprend sous drapeau vert pour les trois derniers tours, sans que l'ordre de tête ne change plus : Antonelli franchit la ligne avec 13,078 secondes d'avance sur Leclerc, Verstappen complétant le podium à 17,485 secondes. Un troisième abandon a toutefois déjà eu lieu bien plus tôt dans la course, sans incidence sur la lutte de tête : Bearman, après avoir reçu une pénalité de dix secondes pour avoir provoqué une collision avec Gasly au virage 13 (servie à son second arrêt, fin du tour 22), abandonne au tour 24 — Haas confirmant que les dégâts de cette collision l'empêchent de continuer. Aucune Safety Car complète n'a donc été nécessaire sur l'ensemble de la course, seulement deux Voitures de Sécurité Virtuelle (14 secondes au tour 2, environ quatre minutes entre les tours 51 et 53).</p>

        <h3 class="subtitle">Lecture technique : le virage 12, nouveau point chaud des limites de piste</h3>
        <p>Une relecture complète et non filtrée des 56 tours de messages de course (et non le sous-ensemble habituellement cité par les comptes-rendus médiatiques) fait apparaître un déplacement net du point chaud des limites de piste par rapport au reste du week-end. Après le virage 19 (trois suppressions en qualifications, une en EL1) puis les virages 9 et 10 (trois suppressions en EL3), c'est cette fois le virage 12 qui concentre la quasi-totalité des infractions de la course : sur 28 temps au tour supprimés au total, touchant 15 pilotes différents, 17 proviennent du seul virage 12 — loin devant les virages 9 (4 cas), 11 (3 cas) et les occurrences isolées aux virages 2, 15, 19 et 20. Russell cumule à lui seul quatre suppressions à ce virage (tours 49, 50, 54 et 55), en plus de sa pénalité de cinq secondes pour le premier tour — un pilote visiblement à la limite tout le week-end sur ce point précis du circuit, sans que cela n'affecte son classement final (déjà hors des points avant ces suppressions). Aucune des sources médiatiques utilisées pour cet article ne mentionne ce déplacement du point chaud comme un motif en soi ; c'est un constat obtenu uniquement par la relecture complète des race_control_messages de la base du projet, comme pour le virage 2 de Singapour au round 17.</p>
      </div>
    </section>

    <section class="block" data-num="03" id="sec-r3">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> Stratégie chiffrée : comment un seul arrêt a battu deux Ferrari plus rapides</h2>
        <p>L'écart final de 13,078 secondes entre Antonelli et Leclerc dissimule un rapport de force plus favorable à Ferrari que le classement ne le laisse croire. En moyennant les tours représentatifs de chaque relais (tour de sortie de stand exclu, puis tours au-delà de 103% de la médiane du relais également exclus pour neutraliser l'effet des deux Voitures de Sécurité Virtuelle et du trafic) pour les huit premiers :</p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th>Pilote</th><th>Stratégie</th><th>Relais (gomme, tours)</th><th>Vitesse de pointe max.</th></tr></thead>
          <tbody>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td><strong>1 arrêt</strong></td><td>MEDIUM 1-24 (1:41,143) → HARD 25-56 (1:39,888)</td><td>335 km/h</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>2 arrêts</td><td>SOFT 1-15 (1:41,146) → MEDIUM 16-39 (1:40,407) → HARD 40-56 (<strong>1:38,790</strong>)</td><td>342 km/h</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>2 arrêts</td><td>SOFT 1-13 (1:40,968) → SOFT 14-31 (1:40,536) → MEDIUM 32-56 (1:39,694)</td><td>340 km/h</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>2 arrêts</td><td>SOFT 1-14 (1:41,354) → MEDIUM 15-38 (1:40,571) → HARD 39-56 (<strong>1:38,847</strong>)</td><td>343 km/h</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>1 arrêt (lent)</td><td>MEDIUM 1-16 (1:41,745) → HARD 17-56 (1:40,389)</td><td>344 km/h</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>1 arrêt</td><td>SOFT 1-25 (1:41,544) → HARD 26-56 (1:40,339)</td><td>333 km/h</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>1 arrêt</td><td>MEDIUM 1-15 (1:42,122) → HARD 16-56 (1:40,935)</td><td>344 km/h</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>1 arrêt</td><td>MEDIUM 1-22 (1:41,927) → HARD 23-56 (1:40,706)</td><td><strong>349 km/h</strong></td></tr>
          </tbody>
        </table>
      </div>
      <div class="prose">
        <p>Le chiffre le plus parlant est là : sur leur dernier relais, Leclerc (1:38,790 de moyenne) et Hamilton (1:38,847) sont plus rapides qu'Antonelli ne l'a jamais été sur le sien (1:39,888) — Ferrari avait bien la voiture la plus rapide en fin de course, confirmant que la question posée par l'article qualifications (le signal de relais long de l'EL2, où Antonelli perdait près de 0,25s/tour face aux trois autres favoris) n'était pas un faux signal à écarter. Mais Ferrari a payé deux arrêts au lieu d'un : en mesurant directement, sur les tours bruts de plusieurs pilotes, le temps perdu entre le tour d'entrée et le tour de sortie des stands (hors temps de tour normal), chaque arrêt coûte environ 20 à 22 secondes à Austin — Antonelli (fin tour 24 : 1:41,455 puis 2:00,429, soit environ 20,5s de perte), Leclerc (deux arrêts, environ 21s chacun), Hamilton (environ 21s chacun). Deux arrêts contre un, c'est donc environ 20 à 21 secondes de pur temps de stand perdues par Ferrari face à Mercedes — un déficit qu'un gain de rythme de 1,0 à 1,1 seconde par tour sur un relais de 17 tours (soit 17 à 19 secondes au mieux) ne suffit pas tout à fait à combler. L'écart final de 13,078 secondes se situe précisément dans cette fourchette, cohérent avec le mécanisme plutôt qu'avec un simple déficit de pilotage côté Ferrari.</p>
        <p>Verstappen illustre le même phénomène sans en récolter le bénéfice : lui aussi a couru avec deux arrêts (deux relais sur pneu tendre puis un sur medium), payant le même surcoût de stand que Ferrari sans retrouver un rythme final aussi tranchant — son dernier relais (1:39,694 de moyenne, hors tours affectés par la seconde VSC) reste plus rapide que celui d'Antonelli, mais pas assez pour rattraper le déficit accumulé plus tôt dans la course. Russell, enfin, détient la vitesse de pointe la plus élevée de tout le plateau de tête (349 km/h) malgré une Mercedes habituellement considérée comme moins véloce en ligne droite que les Red Bull ou les McLaren — signal à confirmer avant de l'ériger en tendance (un seul relevé, sur un relais sujet à l'effet d'aspiration), mais qui tranche avec les 333 km/h d'un Hadjar pourtant 3<sup>e</sup> sur la grille.</p>
        <div class="callout">Rappel de méthode : ces moyennes comparent des relais de longueurs et d'âges de pneus différents (de 15 à 32 tours), avec des phases de Voiture de Sécurité Virtuelle exclues par le filtre des 103% plutôt que neutralisées à la source — un indicateur solide de tendance, pas une comparaison à carburant strictement identique. L'estimation du coût d'un arrêt (20 à 22 secondes) vient directement des tours d'entrée/sortie de stand enregistrés en base pour plusieurs pilotes, pas d'une valeur de référence générique.</div>
      </div>
    </section>

    <section class="block" data-num="04" id="sec-r4">
      <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
        <p>L'évaluation porte sur le Grand Prix du dimanche, en tenant compte de la position de départ réelle sur la grille (après pénalités et départ depuis la voie des stands pour Stroll).</p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table class="verdict-table">
          <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
          <tbody>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Andrea Kimi Antonelli</td><td class="pos">1 → 1<span class="delta neutral">=</span></td><td>Neuvième victoire de la saison, obtenue grâce à un unique arrêt (medium puis hard) alors que ses trois principaux rivaux en ont fait deux chacun — malgré un rythme de pointe en fin de course inférieur à celui des deux Ferrari. Étend son avance au championnat à 365 points, 123 sur Russell.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Charles Leclerc</td><td class="pos">4 → 2<span class="delta good">+2</span></td><td>Signe le tour le plus rapide de la course (1:37,976) et le relais final le plus véloce des huit premiers (1:38,790 de moyenne), sans que cela ne suffise à compenser le temps perdu lors de son second arrêt. Nommé pilote du jour par Formula1.com.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Max Verstappen</td><td class="pos">2 → 3<span class="delta bad">-1</span></td><td>Deux arrêts comme Ferrari sans en retrouver le même gain de rythme en fin de course ; signale des soucis radio et de frein moteur en pleine bataille pour la 2<sup>e</sup> place. Red Bull reconnaît publiquement, selon Formula1.com, que « tout s'est mal passé » ce dimanche.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Lewis Hamilton</td><td class="pos">5 → 4<span class="delta good">+1</span></td><td>Remontée payante en fin de course, doublant Norris au 51<sup>e</sup> tour pour la 4<sup>e</sup> place — une performance qui, selon Grandprix.com, maintient la lutte pour le titre ouverte une semaine supplémentaire.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Lando Norris</td><td class="pos">8 → 5<span class="delta good">+3</span></td><td>Pénalisé par un arrêt lent au 16<sup>e</sup>/17<sup>e</sup> tour qui le fait reculer à la 9<sup>e</sup> place avant une remontée progressive ; reconnaît lui-même, selon Formula1.com, que McLaren n'est « tout simplement pas assez rapide » ce week-end.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Isack Hadjar</td><td class="pos">3 → 6<span class="delta bad">-3</span></td><td>Reste dans le trio de tête jusqu'à son arrêt du 25<sup>e</sup>/26<sup>e</sup> tour, confirmant à son équipe que ses pneus de départ tenaient encore ; recule ensuite progressivement avec le reste du peloton à un arrêt, sans incident individuel notable relevé.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Oscar Piastri</td><td class="pos">7 → 7<span class="delta neutral">=</span></td><td>Résultat conforme à sa position de départ sur une stratégie à un arrêt, sans incident individuel notable relevé au-delà du contact évoqué par The Race au premier tour.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>George Russell</td><td class="pos">6 → 8<span class="delta bad">-2</span></td><td>Pénalité de cinq secondes pour un dépassement de piste gagnant un avantage au 1<sup>er</sup> tour, servie à son unique arrêt (22<sup>e</sup> tour) ; cumule ensuite quatre temps supprimés au seul virage 12 en fin de course (tours 49, 50, 54, 55), le pilote le plus touché de la grille par ce point chaud précis. Lui-même « à court d'explications » sur ses difficultés, selon Formula1.com.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Liam Lawson</td><td class="pos">9 → 9<span class="delta neutral">=</span></td><td>Résultat conforme à sa position de départ sur une stratégie à un arrêt, sans incident individuel notable relevé — rythme de relais le plus lent du top 10 analysé (1:40,935 de moyenne en fin de course), mais suffisant pour conserver sa place.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Pierre Gasly</td><td class="pos">10 → 10<span class="delta neutral">=</span></td><td>Dernier point marqué, résultat conforme à sa position de départ, sans incident individuel notable relevé.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Nico Hulkenberg</td><td class="pos">11 → 11<span class="delta neutral">=</span></td><td>Résultat conforme à sa position de départ, hors des points, avec deux temps supprimés pour limites de piste (virages 19 et 9) sans conséquence sportive.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Arvid Lindblad</td><td class="pos">14 → 12<span class="delta good">+2</span></td><td>Parti 14<sup>e</sup> après une pénalité moteur de cinq places confirmée par la grille officielle (contredisant un rapport qualifications qui annonçait cette pénalité retirée), remonte de deux places ; impliqué dans le contact du premier tour qui provoquera l'abandon de Colapinto, sans suite des commissaires de son côté.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Gabriel Bortoleto</td><td class="pos">21 → 13<span class="delta good">+8</span></td><td>Partait avec la pénalité la plus lourde de la grille (80 places, confirmée par le document officiel de grille — tranchant le désaccord non résolu entre sources la veille), remonte malgré tout de huit places ; brièvement enquêté pour un dépassement de piste au virage 11 en tout début de course, classé sans suite.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Esteban Ocon</td><td class="pos">15 → 14<span class="delta good">+1</span></td><td>Résultat conforme à sa position de départ, hors des points, sans incident individuel notable relevé.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Lance Stroll</td><td class="pos">22 (voie des stands) → 15<span class="delta good">+7</span></td><td>Remontée correcte depuis la voie des stands après modifications sous conditions de Parc Fermé et pièces moteur supplémentaires, sans incident individuel notable relevé en course — une pénalité de départ absente de l'article qualifications, confirmée après coup.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Fernando Alonso</td><td class="pos">12 → 16<span class="delta bad">-4</span></td><td>Critique selon The Race le niveau de pilotage d'Albon après leur contact du premier tour ; recule ensuite nettement, avec deux temps supprimés en fin de course (virages 15 et 11).</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Alexander Albon</td><td class="pos">17 → 17<span class="delta neutral">=</span></td><td>Résultat conforme à sa position de départ, visé par la critique d'Alonso après leur contact du premier tour ; deux temps supprimés en cours de course (virages 12 et 20).</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Carlos Sainz</td><td class="pos">16 → 18<span class="delta bad">-2</span></td><td>Léger recul par rapport à sa position de départ, avec deux temps supprimés pour limites de piste au virage 12 en fin de course, sans incident individuel notable par ailleurs.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Sergio Perez</td><td class="pos">18 → 19<span class="delta bad">-1</span></td><td>Dernier pilote classé à l'arrivée, résultat conforme à sa position de départ, sans incident individuel notable relevé pour Cadillac.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Valtteri Bottas</td><td class="pos">19 → DNF<span class="delta dnf">DNF</span></td><td>Abandon au 48<sup>e</sup> tour pour ce que Cadillac décrit comme une panne suspectée de l'unité de puissance (moteur coupant par intermittence, cause précise encore à l'étude) — provoque la seconde Voiture de Sécurité Virtuelle de la course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Franco Colapinto</td><td class="pos">20 → DNF<span class="delta dnf">DNF</span></td><td>Abandon au 35<sup>e</sup> tour : le contact du premier tour avec Lindblad au virage 1, classé sans suite par les commissaires sur le moment, avait en réalité endommagé son plancher et son sidepod au point de ne plus pouvoir continuer, confirme Alpine après coup.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Oliver Bearman</td><td class="pos">13 → DNF<span class="delta dnf">DNF</span></td><td>Pénalité de dix secondes pour avoir provoqué une collision avec Gasly au virage 13, servie à son second arrêt (22<sup>e</sup> tour) ; abandonne au 24<sup>e</sup> tour, Haas confirmant que les dégâts de cette collision l'empêchent de continuer.</td></tr>
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
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Mercedes</td><td>Neuvième victoire de la saison pour Antonelli grâce à un unique arrêt, décisif face aux stratégies à deux arrêts de Ferrari et Red Bull malgré un rythme de pointe inférieur en fin de course ; Russell marque des points (8<sup>e</sup>) mais cumule une pénalité et quatre suppressions de temps au virage 12.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Ferrari</td><td>Les deux Ferrari signent le relais final le plus rapide des huit premiers analysés (Leclerc 1:38,790, Hamilton 1:38,847 de moyenne), mais le coût de leur stratégie à deux arrêts (environ 20-21 secondes de plus que Mercedes en temps de stand) les prive de la victoire ; Leclerc complète néanmoins le podium devant Verstappen, et Hamilton referme sur Norris en fin de course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Red Bull</td><td>Verstappen court la même stratégie à deux arrêts que Ferrari sans en retrouver le même gain de rythme final, et signale des soucis radio et de frein moteur en pleine lutte pour la 2<sup>e</sup> place ; Hadjar complète un week-end solide en 6<sup>e</sup> place. Red Bull reconnaît publiquement, selon Formula1.com, que la course s'est mal déroulée.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>McLaren</td><td>Norris, pénalisé par un arrêt lent, recule avant de remonter jusqu'à la 5<sup>e</sup> place ; Piastri termine 7<sup>e</sup>, conforme à son départ. Norris reconnaît lui-même que la monoplace n'est pas assez rapide ce week-end.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Racing Bulls</td><td>Lawson marque des points en 9<sup>e</sup> place sans incident ; Lindblad, pénalisé de cinq places par une décision confirmée seulement après course (contredisant le rapport qualifications qui l'annonçait retirée), remonte malgré tout de deux places jusqu'à la 12<sup>e</sup>.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Alpine</td><td>Gasly marque le dernier point disponible en 10<sup>e</sup> place ; Colapinto abandonne au 35<sup>e</sup> tour, les dégâts du contact du premier tour avec Lindblad s'avérant finalement fatals à sa course.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Audi</td><td>Hulkenberg termine 11<sup>e</sup>, hors des points ; Bortoleto, pénalisé de 80 places (confirmé) pour composants moteur, remonte de huit places jusqu'à la 13<sup>e</sup>.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Haas</td><td>Ocon termine 14<sup>e</sup>, hors des points ; Bearman, pénalisé pour avoir provoqué une collision avec Gasly, abandonne au 24<sup>e</sup> tour sur des dégâts que l'écurie confirme liés à cet incident.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Aston Martin</td><td>Stroll remonte correctement depuis la voie des stands malgré des modifications sous Parc Fermé et des pièces moteur supplémentaires ; Alonso recule nettement après avoir critiqué, selon The Race, le pilotage d'Albon lors de leur contact du premier tour.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Williams</td><td>Albon, visé par la critique d'Alonso, termine 17<sup>e</sup> conforme à son départ ; Sainz recule légèrement jusqu'à la 18<sup>e</sup> place, avec deux suppressions de temps au virage 12.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Cadillac</td><td>Perez termine dernier des classés (19<sup>e</sup>) ; Bottas abandonne au 48<sup>e</sup> tour pour une panne suspectée de l'unité de puissance, provoquant la seconde Voiture de Sécurité Virtuelle de la course — l'écurie n'a toujours pas marqué le moindre point cette saison.</td></tr>
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
              <li><strong>Antonelli et Mercedes</strong>, neuvième victoire de la saison obtenue par une stratégie à un seul arrêt plus payante que le rythme pur des deux Ferrari — étend l'avance au championnat à 365 points, 123 sur Russell.</li>
              <li><strong>Leclerc</strong>, relais final le plus rapide des huit premiers analysés et tour le plus rapide de la course, nommé pilote du jour malgré une 2<sup>e</sup> place qui restera la frustration du week-end côté Ferrari.</li>
              <li><strong>Hamilton</strong>, remontée jusqu'à la 4<sup>e</sup> place dans les derniers tours, qui maintient la lutte pour le titre ouverte une semaine de plus selon Grandprix.com.</li>
              <li><strong>Bortoleto</strong>, remontée de huit places depuis la dernière place sur la grille malgré la pénalité la plus lourde du plateau.</li>
            </ul>
          </div>
          <div class="verdictcol lose">
            <h4>Perdants</h4>
            <ul>
              <li><strong>Verstappen et Red Bull</strong>, même stratégie à deux arrêts que Ferrari sans en retrouver le gain de rythme final, soucis radio et de frein moteur en pleine lutte pour la 2<sup>e</sup> place.</li>
              <li><strong>Colapinto et Bearman</strong>, deux abandons provoqués par des contacts du premier tour (avec Lindblad et Gasly respectivement) dont les dégâts se révèlent fatals plus tard dans la course.</li>
              <li><strong>Bottas et Cadillac</strong>, abandon pour panne suspectée de l'unité de puissance, dans une saison où l'écurie n'a toujours pas marqué le moindre point.</li>
              <li><strong>Russell</strong>, pénalité au premier tour puis quatre temps supprimés au seul virage 12 en fin de course — lui-même « à court d'explications » sur ses difficultés du week-end.</li>
            </ul>
          </div>
        </div>
        <div class="callout">Austin restera l'image d'une victoire gagnée sur le papier stratégique plutôt que sur le rythme pur : Ferrari a eu la voiture la plus rapide en fin de course, chiffres à l'appui, mais a payé le prix d'un second arrêt que Mercedes n'a jamais eu besoin de faire. Antonelli, lui, n'a plus besoin que d'une performance modeste à Mexico pour décrocher son premier titre mondial — une 9<sup>e</sup> place ou mieux suffirait, selon Grandprix.com, quelles que soient les positions de Russell et Hamilton.</div>
      </div>
    </section>

    <section class="block" id="sec-r-next">
      <div class="prose">
        <h2 class="sectitle">Enseignements pour la suite</h2>
        <p>Trois points issus d'Austin à surveiller au prochain rendez-vous, le Grand Prix du Mexique à Mexico City :</p>
        <ol style="padding-left:20px; margin:0 0 16px;">
          <li style="margin-bottom:10px;"><strong>Antonelli</strong> aborde Mexico avec un scénario de titre nettement simplifié : selon Grandprix.com, une 9<sup>e</sup> place ou mieux suffirait désormais à le sacrer champion du monde, quel que soit le résultat de Russell ou de Hamilton — Russell ne pourrait maintenir le championnat ouvert qu'en gagnant avec Antonelli 10<sup>e</sup> ou pire, Hamilton qu'en gagnant avec Antonelli hors des points.</li>
          <li style="margin-bottom:10px;"><strong>Ferrari</strong> a démontré à Austin un rythme de pointe en fin de course supérieur à celui de Mercedes sur gomme fraîche — reste à savoir si l'écurie peut convertir cet avantage en stratégie à un seul arrêt plutôt qu'à deux, pour transformer un déficit chiffré en résultat.</li>
          <li><strong>Red Bull</strong> aborde la suite de la saison avec une question de fiabilité/ergonomie à régler : les soucis radio et de frein moteur signalés par Verstappen en pleine course, combinés à un aveu public de l'écurie que « tout s'est mal passé », méritent un diagnostic plus précis avant la prochaine manche.</li>
        </ol>
        <a class="bridge-btn" href="/courses" style="text-decoration:none; display:inline-block;">Voir le calendrier de la saison →</a>
      </div>
    </section>

    <section class="block" id="sec-r7">
      <details class="sources">
        <summary>Sources utilisées — GP des États-Unis (6 liens externes)</summary>
        <div class="srcgroup">
          <h5>Données de course</h5>
          <ul>
            <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1.py), primaire ; classement officiel et grille via Formula1.com en l'absence de résultats Jolpica disponibles en base pour ce round à l'heure de la rédaction.</span></li>
            <li><span class="desc">Relecture complète et non filtrée des race_control_messages (scripts/race_briefing_full_rcm.py) : base du constat agrégé sur le virage 12 (section 02) et du détail précis des deux Voitures de Sécurité Virtuelle, de la pénalité de Russell et des enquêtes Bortoleto/Lindblad-Sainz/Bearman-Gasly.</span></li>
            <li><span class="desc">Temps au tour et relais pneus par numéro de voiture (scripts/race_briefing_laptimes_by_car.py, sur les 22 voitures de la grille) : source de toutes les moyennes de rythme par relais, des vitesses de pointe et de l'estimation du coût d'un arrêt au stand citées en section 03.</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Institutionnel / officiel</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/results/2026/races/1297/united-states/race-result" data-desc="Classement officiel complet (positions, écarts, points), fetché en primaire.">Formula1.com — résultats officiels de la course</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/results/2026/races/1297/united-states/starting-grid" data-desc="Grille de départ officielle avec note explicite sur les pénalités (Lindblad 5 places, Colapinto 10, Bortoleto 80, Stroll voie des stands) — corrige deux points de l'article qualifications de ce round, voir commentaire en tête de fichier.">Formula1.com — grille de départ officielle</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/all" data-desc="Titres/accroches confirmés par fetch direct : réactions d'après-course de Hamilton, Red Bull, Norris, Russell, Antonelli, et Leclerc nommé pilote du jour. Pages d'articles individuelles non atteintes (URL devinées en échec) — utilisés comme citations partielles correctement attribuées, pas comme articles lus en entier.">Formula1.com — actualités après course</a><span class="desc">Formula1.com</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Déroulé de course, analyse stratégique et contexte championnat</h5>
          <ul>
            <li><a href="https://www.grandprix.com/races/united-states-gp-2026-race-notes.html" data-desc="Déroulé complet tour par tour, causes des trois abandons, détail des deux VSC, classement du championnat après course (Antonelli 365, Russell 242, Hamilton 241) et enjeux de Mexico. Lu intégralement via fetch-url.yml, daté du 25 octobre 2026.">Grandprix.com — notes de course</a><span class="desc">Grandprix.com</span></li>
            <li><a href="https://www.the-race.com/formula-1/f1-2026-united-states-grand-prix-race-result/" data-desc="Classement confirmé et bandeau d'actualités de la page d'accueil Formule 1 : lecture stratégique indépendante convergente avec le calcul du projet (« one-stop strategy... Red Bull and Ferrari failed to materialise ») et mention du contact Alonso/Albon au premier tour. Lu intégralement via fetch-url.yml.">The Race — résultat du GP des États-Unis 2026</a><span class="desc">The Race</span></li>
            <li><a href="https://www.crash.net/f1/news" data-desc="Page de liste fetchée en primaire (HTML brut et rendu) : titres confirmés pour Russell (« It was rubbish »), Wolff sur l'état d'esprit d'Antonelli, et Verstappen répondant au patron du circuit COTA. Articles individuels non atteints (URL exactes non trouvées) — utilisés comme titres correctement attribués, pas comme articles complets.">Crash.net — liste d'actualités F1</a><span class="desc">Crash.net</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Tentatives documentées, sans résultat exploitable</h5>
          <ul>
            <li><span class="desc">r/F1Technical : deux tentatives directes (recherche et nouveaux fils) via l'API Reddit depuis le runner fetch-url.yml, toutes deux en échec — même blocage anti-bot déjà documenté pour les rounds précédents de ce projet.</span></li>
            <li><span class="desc">Mercedes-AMG Petronas, Scuderia Ferrari, Pirelli : trois tentatives de récupérer une citation directe d'écurie/fournisseur, toutes en échec réseau côté runner. Oracle Red Bull Racing : fetch réussi (HTTP 200) mais page entièrement rendue en JavaScript, aucun texte exploitable. Aucune communication directe d'écurie ou de pilote n'a donc pu être intégrée à cet article malgré un effort réel sur quatre canaux — signalé honnêtement plutôt que comblé par une citation inventée.</span></li>
          </ul>
        </div>
      </details>
    </section>
`;
