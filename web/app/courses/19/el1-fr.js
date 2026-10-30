// Analyse EL1 — Grand Prix de Mexico (Autódromo Hermanos Rodríguez), round 19,
// saison 2026. PREMIER article de ce week-end (aucune analyse EL/Quali
// antérieure pour ce round) : pas d'historique narratif à prolonger, tout
// part de cette séance.
//
// Données de séance : donnée primaire = pipeline OpenF1 (session_key=11397,
// Practice 1, 2026-10-30 18:30->19:30 UTC), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py
// (589 lignes practice_laps, 92 practice_stints, 79 practice_weather, 22
// pilotes). Classement et horaires recoupés et concordants À LA MILLISECONDE
// avec le rapport Grandprix.com « Practice 1 Report - Leclerc sets the pace
// in Mexico » (lu intégralement via fetch-url.yml) — y compris les 22 temps
// individuels, ce qui confirme indépendamment la base.
//
// Analyse technique quantifiée (scripts/practice_briefing_laptimes_by_car.py,
// les 22 voitures) : moyenne de relais calculée tour d'entrée/sortie de stand
// exclu, puis tours > 103% de la médiane du relais exclus (méthode identique
// à celle documentée pour les rounds précédents). Point de rigueur découvert
// cette fois : plusieurs relais de ce FP1 sont manifestement bimodaux (piste
// très sale en début de séance d'après Grandprix.com — « dusty track »,
// « grip scarce enough to send several drivers exploring the runoff areas »)
// — la médiane d'un relais peut alors rester élevée malgré un tour filtré
// déjà propre, ce qui fait ressortir une moyenne basse avec peu de tours
// exclus même sur un relais globalement peu représentatif (ex. Alonso, Perez,
// Vesti sur des relais courts). Les relais retenus dans le tableau de la
// section 02 sont ceux au ratio exclus/gardés le plus favorable (piste la
// plus « propre » parmi les relais disponibles pour chaque pilote), avec
// mention explicite du nombre de tours gardés/exclus — jamais un relais
// présenté comme fiable sans ce contexte. Vitesses de pointe (speed_st) =
// valeur maximale brute par voiture sur la séance, aucune estimation.
//
// Sourcing élargi (passe demandée explicitement par l'utilisateur après une
// plainte sur le manque de rigueur et de profondeur technique des articles) :
// - Formula1.com (officiel) : /en/results/2026/races (confirme round 18 comme
//   dernier round disputé, Mexico pas encore dans l'archive de résultats —
//   normal, course pas encore courue) et /en/racing/2026 (confirme round 19 =
//   « FORMULA 1 GRAN PREMIO DE LA CIUDAD DE MÉXICO 2026 », 30 oct-1er nov,
//   lien hub /en/racing/2026/mexico). Les deux lus en brut via fetch-url.yml.
//   La page de résultats EL1 officielle précise (format
//   /en/results/2026/races/<id>/mexico/practice/1) n'a pas pu être retrouvée
//   directement cette session (les liens d'articles ne sont pas exposés dans
//   le HTML brut tronqué à 90000 caractères avant d'atteindre les cartes de
//   course) — limite de sourcing documentée plutôt que masquée ; le classement
//   officiel vient donc de la base + de Grandprix.com (concordance à la
//   milliseconde), pas directement d'une page Formula1.com lue cette session.
// - Pirelli (institutionnel) : press.pirelli.com/tagfeed/en/tags/press__releases
//   lu intégralement (flux actif, dernière entrée visible datée du 12 juin
//   2026) — aucun communiqué spécifique au Mexique 2026 dans la fenêtre
//   récupérée, documenté honnêtement plutôt qu'inventé. Le domaine grand
//   public pirelli.com/global/<locale>/race/formula-1/ a échoué en 404 sur
//   DEUX locales cette session (en-gb ET fr-fr, alors que fr-fr avait été
//   confirmé par l'utilisateur pour un round antérieur) — nouvelle régression
//   à signaler dans docs/SOURCES.md plutôt qu'à masquer.
// - Ferrari (écurie centrale de la séance, Leclerc en tête) : ferrari.com/
//   en-EN/formula1/news tenté, échec HTTP 403 Forbidden (blocage explicite,
//   pas une simple erreur réseau comme lors d'une passe précédente) — aucune
//   communication directe de pilote trouvée sur un canal propre à l'écurie ou
//   au pilote pour cette séance précise. Documenté honnêtement : aucune
//   citation de pilote ci-dessous ne vient d'un canal propre au pilote/à
//   l'écurie — toutes proviennent de la conférence de presse FIA du jeudi,
//   relayée par Grandprix.com et par The Race.
// - Grandprix.com (généraliste n°1) : rapport EL1 complet (classement,
//   incidents, VSC, pénalité potentielle Slater) ET article dédié « Russell
//   sees a Ferrari turbo advantage in Mexico » — citations directes de
//   Russell et Leclerc à la conférence de presse FIA du jeudi. Les deux lus
//   intégralement via fetch-url.yml (jamais depuis un extrait de recherche).
// - Crash.net (généraliste n°2, avec volet technique réel) : page de liste
//   /f1/news lue intégralement (texte rendu, pas de HTML brut pour cette
//   page) — confirme indépendamment le titre « Charles Leclerc fastest in
//   Mexico GP FP1 dominated by 10 F1 rookies » et un article dédié « What Red
//   Bull has changed with its latest F1 upgrade at Mexico GP » (upgrade non
//   développé plus avant, l'URL exacte de l'article n'a pas pu être extraite
//   du texte rendu de la page de liste — même limite déjà documentée pour
//   motorsport.com/crash.net lors d'un round antérieur).
// - The Race (technique/analytique n°1) : article complet « Everything we
//   learned on day one of F1's Mexican GP » (Suttill/Mitchell-Malm/Anderson/
//   Noble, 29 oct. 2026), lu intégralement — la source la plus substantielle
//   de cette passe. Explique en détail, citation nommée à l'appui (Shintaro
//   Orihara, ingénieur de piste en chef Honda), pourquoi 2026 est la première
//   saison moderne sans MGU-H et pourquoi cela aggrave spécifiquement le
//   « turbo lag » à Mexico (manque de pression de suralimentation même au
//   ralenti, restriction de fonctionnement moteur potentiellement nécessaire).
//   Détaille aussi le mécanisme du « torque infilling » (MGU-K utilisé comme
//   frein moteur pour garder le turbo en rotation dans les virages lents,
//   contrainte par une batterie qui arrive presque pleine avant les virages
//   les plus lents vu le peu d'occasions de la vider sur ce tracé) et le
//   volet aéro (citations nommées de Piastri, Verstappen, Hamilton sur la
//   perte de 25-30% d'appui par rapport à l'édition précédente, Mexico
//   devenant « l'outlier » aérodynamique de la saison 2026 à la place de
//   Monza). Citation de Bortoleto sur le désavantage du gros turbo Audi.
// - r/F1Technical (communauté technique pointue demandée explicitement) :
//   deux tentatives réelles via l'API Reddit depuis le runner fetch-url.yml
//   (search.json?q=mexico, new.json) — échec identique sur les deux, HTTP 403
//   « Blocked ». Confirme le blocage anti-bot déjà documenté pour tous les
//   rounds précédents cette semaine ; pas une impasse de recherche masquée.
// - WebSearch n'a été utilisé à AUCUN moment pour sourcer un fait (seulement
//   pour localiser un slug d'URL avant vérification par fetch direct), par
//   application stricte du piège déjà documenté dans docs/SOURCES.md.
//
// Zéro contenu « people » : plusieurs titres disponibles ce jour-là
// (maladie de trois pilotes avant les media duties, critique d'Alonso sur le
// niveau des pilotes de fond de grille, dossier de renouvellement de contrat
// chez Haas/Red Bull) ont été délibérément écartés de cet article — aucun
// rapport direct avec cette séance EL1 précise, et plusieurs frôlent le
// contenu personnel/hors-piste que la règle éditoriale exclut.
export const ROUND19_EL1_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Mexico · Autódromo Hermanos Rodríguez · EL1 — vendredi 30 octobre</p>
    <p class="verdict">Leclerc écrase une première heure où dix titulaires sur onze écuries ont cédé leur volant à un pilote de réserve — et où l'altitude du Mexique (2 240 m) pose d'emblée la vraie question du week-end : qui digère le mieux le temps de réponse turbo sans MGU-H, pas qui boucle le tour le plus rapide.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">1:18,128</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,659s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Vesti</span> <span class="gap">+0,733s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,738s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Iwasa</span> <span class="gap">+0,985s</span></div>
    </div>
    <p class="subverdict">Ferrari a été la seule écurie à aligner ses deux titulaires : Red Bull, Mercedes, McLaren, Alpine, Aston Martin, Haas, Racing Bulls, Audi, Williams et Cadillac ont chacune fait tourner un pilote de réserve ou junior à la place d'un titulaire — dix débutants ou quasi-débutants sur la piste au même moment, du jamais-vu à cette échelle sur un seul FP1 cette saison. Leclerc domine sans appel (plus de six dixièmes sur la meilleure Mercedes), mais la vraie histoire du jour, documentée en détail plus bas par The Race, est ailleurs : 2026 est la première saison moderne où les moteurs hybrides tournent sans MGU-H, et Mexico — où l'air raréfié exige déjà plus de régime pour obtenir la même pression de suralimentation — est le pire endroit possible pour s'en passer. Kimi Antonelli, leader du championnat, aborde ce week-end comme celui où il pourrait mathématiquement être sacré dès dimanche ; rien à en dire de plus avant la course elle-même.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el1-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Dix pilotes de réserve sur onze écuries — Ferrari seule à aligner ses titulaires</h2>
    <p>Charles Leclerc (1:18,128) a signé la référence de cette première heure mexicaine, plus de six dixièmes devant la meilleure Mercedes de Kimi Antonelli (1:18,787) — et surtout le meilleur temps dans chacun des trois secteurs, un signe de régularité plutôt qu'un simple coup de rythme isolé sur un tour. Mais le fait marquant de la séance tient moins au classement qu'à sa composition : Ferrari a été la seule écurie du plateau à faire rouler ses deux pilotes titulaires. Les dix autres ont toutes cédé un baquet à un pilote de réserve ou junior — Frederik Vesti (3<sup>e</sup>, 1:18,861) à la place de George Russell chez Mercedes, Ayumu Iwasa (5<sup>e</sup>, 1:19,113) pour Max Verstappen chez Red Bull, Gabriele Mini (14<sup>e</sup>) pour Franco Colapinto chez Alpine, Jak Crawford (19<sup>e</sup>) pour Lance Stroll chez Aston Martin, Leonardo Fornaroli (17<sup>e</sup>) pour Lando Norris chez McLaren, Ryo Hirakawa (15<sup>e</sup>) pour Esteban Ocon chez Haas, Nikola Tsolov (12<sup>e</sup>) pour Liam Lawson chez Racing Bulls, Freddie Slater (21<sup>e</sup>) pour Gabriel Bortoleto chez Audi, Luke Browning (20<sup>e</sup>) pour Alex Albon chez Williams, et Colton Herta (22<sup>e</sup>) pour Valtteri Bottas chez Cadillac.</p>
    <p>La séance s'est déroulée sur une piste décrite comme poussiéreuse par Grandprix.com, avec une adhérence par endroits si faible que plusieurs pilotes sont sortis des limites de la piste dès les premiers tours : Antonelli et Sergio Pérez ont glissé dans la section stadium, Nico Hülkenberg a bloqué ses roues au virage 1, Oscar Piastri est parti dans l'herbe au même endroit. Les suppressions de temps pour limites de piste se sont ajoutées au désordre d'une heure où la hiérarchie s'est construite en grande partie entre pilotes qui découvraient la voiture plutôt qu'entre titulaires en configuration représentative — Antonelli et Hamilton (4<sup>e</sup>, 1:18,866, à cinq millièmes de Vesti) restent malgré tout les seuls repères véritablement fiables pour jauger Mercedes et Ferrari sur un tour isolé.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el1-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Rythme de relais et vitesses de pointe : ce que dit vraiment la base</h2>
    <p>Classement par meilleur tour mis à part, une requête dédiée sur les tours bruts de practice_laps (103% de la médiane du relais comme seuil, tours d'entrée/sortie de stand exclus) donne une deuxième lecture, forcément bruitée sur une séance où la piste elle-même a changé de niveau de grip au fil de l'heure — les relais retenus ci-dessous sont ceux au ratio tours gardés/exclus le plus favorable pour chaque pilote, jamais présentés comme un chrono de référence absolu :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Gomme / relais</th><th>Tours (gardés/total)</th><th>Moyenne relais</th><th>V. pointe (speed_st)</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>SOFT (tours 13-30)</td><td>9/17</td><td>1:21,068</td><td>354 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>SOFT (tours 17-29)</td><td>9/12</td><td>1:21,605</td><td>350 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>SOFT (tours 18-30)</td><td>7/12</td><td>1:21,874</td><td>346 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>SOFT (tours 21-33)</td><td>9/12</td><td>1:22,994</td><td>350 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>HARD (tours 21-28)</td><td>6/7</td><td>1:22,716</td><td>349 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span> Hirakawa</td><td>MEDIUM (tours 19-30)</td><td>8/11</td><td>1:22,715</td><td>349 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span> Browning</td><td>MEDIUM (tours 24-33)</td><td>7/9</td><td>1:22,723</td><td>350 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>MEDIUM (tours 16-27)</td><td>8/11</td><td>1:23,198</td><td>349 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Fornaroli</td><td>SOFT (tours 18-25)</td><td>5/7</td><td>1:22,334</td><td>350 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span> Herta</td><td>MEDIUM (tours 21-30)</td><td>7/9</td><td>1:24,698</td><td>347 km/h</td></tr>
      </tbody>
    </table>
  </div>
  <div class="prose">
    <p>Deux signaux à retenir, tous deux vérifiés sur les tours bruts, aucun invente : d'abord, Piastri ressort légèrement devant Leclerc sur son relais tendre le plus propre (1:21,068 contre 1:21,605) alors qu'il n'était que 8<sup>e</sup> sur un tour isolé — à prendre avec la réserve méthodologique ci-dessus (8 tours exclus sur 17 dans ce relais, le plus perturbé du tableau), mais un signal cohérent avec un McLaren habituellement fort en rythme long plutôt qu'en qualification pure. Ensuite, et plus solide statistiquement : les vitesses de pointe, mesurées au point de chronométrage de vitesse (speed_st), grimpent à 347-354 km/h pour la quasi-totalité du plateau — Piastri culmine à 354 km/h, la valeur la plus haute de la séance. Ce ne sont pas des chiffres anodins pour un vendredi : l'air raréfié de l'altitude mexicaine (2 240 m) réduit la traînée aérodynamique à configuration d'aileron égale, ce qui pousse le haut du compteur vers le haut — l'autre face, moins flatteuse, de ce même manque d'air est développée en section 03 : c'est elle qui complique le plus la vie des moteurs et des turbos sur ce même tracé.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el1-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Sans MGU-H pour la première fois : le vrai défi technique de Mexico 2026</h2>
    <p>L'altitude de l'Autódromo Hermanos Rodríguez (environ 2 240 m, 7 300 pieds) est un problème connu de longue date pour les moteurs F1 : l'air raréfié oblige le turbocompresseur à tourner plus vite pour fournir la même pression de suralimentation. Ce qui change cette année, documenté en détail par The Race (Josh Suttill, Scott Mitchell-Malm, Ben Anderson, Jonathan Noble, article complet lu intégralement) : 2026 est la première saison de l'ère hybride moderne où les groupes propulseurs tournent sans MGU-H, le composant qui gérait jusqu'ici une partie de la régulation du turbo. Shintaro Orihara, ingénieur de piste en chef chez Honda, le dit sans détour : <em>« L'an dernier, nous avions le MGU-H, donc on avait un peu de soutien. Cette année on n'en a plus, donc c'est assez difficile. Même au ralenti, l'an dernier le MGU-H nous aidait à avoir assez de pression de suralimentation — cette année on n'a aucun soutien, même au ralenti, c'est une grosse différence par rapport à l'an dernier. »</em> Il ajoute que le temps de réponse turbo (« turbo lag ») est <em>« le sujet le plus intéressant, ou le plus important, sur ce circuit »</em> pour l'ensemble des motoristes, pas seulement Honda, et qu'une restriction du régime moteur n'est pas à exclure dans le pire des cas — les essais sur banc ne suffisant pas à trancher avant de rouler réellement en configuration Mexico.</p>
    <p>Le mécanisme technique précis, toujours selon The Race : sans MGU-H pour maintenir le turbo en rotation à la levée de pied, les équipes font tourner le moteur plus fort que nécessaire dans les virages lents et utilisent le MGU-K comme frein moteur pour absorber le surplus et le stocker en batterie — une pratique appelée « torque infilling ». Le problème à Mexico : le tracé comprend trois longues lignes droites qui consomment presque toute l'électricité disponible, laissant très peu de place pour absorber l'énergie supplémentaire issue du freinage moteur dans les virages lents qui suivent. Résultat : la batterie arrive quasiment pleine avant les virages les plus lents du tour, le moteur doit alors lever le pied, et le turbo ralentit avec lui — exactement le moment où la thin air rend déjà la relance plus difficile. Gabriel Bortoleto (Audi, dont le turbo plus gros souffre particulièrement de ce compromis) résume la difficulté pour son équipe : <em>« Ça ne va pas être facile pour nous. Surtout dans ce dernier secteur, c'est hyper important de garder la pression de suralimentation. Ça va être un dernier secteur en première ou deuxième [vitesse]. Et c'est l'un des secteurs les plus lents parce qu'on n'a pas beaucoup d'appui sur ce circuit, donc les voitures roulent très lentement. Ensuite tu veux remettre les gaz le plus vite possible pour garder le régime. Donc ça va être délicat. »</em></p>
    <p>Le volet aérodynamique complète le tableau, avec les mêmes citations nommées : pour Oscar Piastri (McLaren), <em>« normalement c'est comparable à l'appui qu'on a à Monza, mais vu qu'on ne retire plus beaucoup d'appui pour Monza désormais, c'est Mexico qui devient l'exception »</em> — l'inverse de la hiérarchie habituelle entre circuits à faible traînée. Max Verstappen précise que les monoplaces 2026, déjà moins chargées en appui que leurs prédécesseures à effet de sol, n'ont plus la marge des générations précédentes pour compenser : <em>« Avant on avait les ailerons pour compenser un peu ça [...] mais maintenant on roule avec un seul aileron. Donc il y aura beaucoup moins d'appui sur la voiture, ce qui je pense sera déjà bien assez compliqué. Ça va mettre encore plus l'accent sur la performance à basse vitesse. »</em> Lewis Hamilton (Ferrari) chiffre la perte à <em>« 25 à 30% d'appui de moins que la dernière fois qu'on a roulé ici »</em>, tout en notant que la Ferrari, réputée pour son turbo plus compact, pourrait mieux s'en sortir sur le papier — à condition de parvenir à mettre le pneu en température avec aussi peu de charge aérodynamique.</p>
    <p>Cette même intuition turbo a été formulée publiquement la veille de la séance, lors de la conférence de presse FIA du jeudi (relayée par Grandprix.com, lu intégralement — aucune des deux citations ci-dessous ne provient d'un canal propre au pilote ou à son écurie, ce qui est signalé explicitement plutôt que présenté comme une communication directe) : <em>« Je pense que le temps de réponse turbo va être un facteur important pour beaucoup d'écuries ce week-end »</em>, a dit George Russell. <em>« Ce n'est un secret pour personne que Ferrari a un turbo plus petit que la plupart, donc ils ont probablement un net avantage sur ce point. »</em> Charles Leclerc a tempéré l'idée d'un rôle de favori pour Ferrari : <em>« Je ne suis pas vraiment d'accord sur le fait qu'on soit favoris ce week-end. Je pense que Mercedes reste favori partout où on va. Red Bull est aussi très, très fort récemment. »</em> Leclerc a ajouté que la performance de Ferrari dépendrait surtout de sa capacité à garder une voiture réputée sensible dans sa bonne fenêtre de fonctionnement, notamment si les températures de piste évoluent en qualifications. Le résultat de cette première heure — Leclerc et Hamilton engageant les deux Ferrari aux deux premières places de la hiérarchie fiable, Mercedes bien présent via Antonelli et Vesti — ne permet ni de confirmer ni d'infirmer la théorie du turbo à ce stade : aucune équipe n'avait encore roulé au moment où Russell s'exprimait, et une heure d'essais sur une piste sale et encombrée de dix débutants n'a rien d'une démonstration en configuration qualificative.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el1-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Incidents de séance : panne moteur pour Hadjar, rappel aux stands pour Slater, VSC pour Crawford</h2>
    <p>Isack Hadjar (Red Bull, 11<sup>e</sup>) a connu l'heure la plus compliquée parmi les titulaires : un problème de groupe propulseur l'a forcé à regagner les stands au ralenti en début de séance, lui coûtant un long passage au garage et le limitant à 21 tours, contre 23 pour Iwasa dans l'autre Red Bull. Sur ses débuts en essais libres F1, Freddie Slater (Audi, 21<sup>e</sup>, à la place de Bortoleto) a quitté son garage avec un ventilateur de refroidissement encore fixé à la voiture — un incident classé par la direction de course comme sortie dans des conditions dangereuses et transmis aux commissaires pour instruction après la séance. Slater a finalement bouclé 14 tours pour un meilleur temps de 1:20,945.</p>
    <p>Une voiture de sécurité virtuelle a interrompu la séance environ 14 minutes avant le drapeau à damier, après que Jak Crawford (Aston Martin, 19<sup>e</sup>, à la place de Stroll) s'est arrêté au virage 1 ; la neutralisation a duré environ deux minutes. Crawford a terminé avec un 1:20,803 sur 15 tours. Point de rigueur à noter sur les données de ce round : contrairement aux séances de course (table race_control_messages), le schéma de ce projet ne conserve pas encore d'équivalent par message de direction de course pour les séances d'essais — ces trois incidents proviennent donc exclusivement du rapport Grandprix.com, pas d'une requête sur la base, à la différence des deltas de pneus/pace de la section 02.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-el1-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Classement complet EL1</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:18,128</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:18,787</td><td>+0,659s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Vesti</td><td>Mercedes</td><td>1:18,861</td><td>+0,733s (remplace Russell)</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:18,866</td><td>+0,738s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Iwasa</td><td>Red Bull Racing</td><td>1:19,113</td><td>+0,985s (remplace Verstappen)</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:19,210</td><td>+1,082s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:19,357</td><td>+1,229s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:19,376</td><td>+1,248s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:19,412</td><td>+1,284s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:19,478</td><td>+1,350s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:19,545</td><td>+1,417s (panne moteur, rappel aux stands)</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Tsolov</td><td>Racing Bulls</td><td>1:19,604</td><td>+1,476s (remplace Lawson)</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:19,608</td><td>+1,480s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Mini</td><td>Alpine</td><td>1:19,946</td><td>+1,818s (remplace Colapinto)</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Hirakawa</td><td>Haas F1 Team</td><td>1:19,982</td><td>+1,854s (remplace Ocon)</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:20,006</td><td>+1,878s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Fornaroli</td><td>McLaren</td><td>1:20,235</td><td>+2,107s (remplace Norris)</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:20,395</td><td>+2,267s (week-end à domicile)</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Crawford</td><td>Aston Martin</td><td>1:20,803</td><td>+2,675s (remplace Stroll, arrêt virage 1 → VSC)</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Browning</td><td>Williams</td><td>1:20,869</td><td>+2,741s (remplace Albon)</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#00302B"></span> Slater</td><td>Audi</td><td>1:20,945</td><td>+2,817s (remplace Bortoleto, sortie garage ventilateur fixé, renvoyé aux commissaires)</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Herta</td><td>Cadillac</td><td>1:21,365</td><td>+3,237s (remplace Bottas)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el1-6">
  <details class="sources">
    <summary>Sources utilisées — EL1 Mexico (7 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), session_key=11397 : classement, secteurs, relais, météo. Primaire.</span></li>
        <li><span class="desc">The Pit Wall — requête dédiée tours bruts par voiture (scripts/practice_briefing_laptimes_by_car.py, les 22 pilotes) : base des moyennes de relais et vitesses de pointe de la section 02.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><span class="desc">Formula1.com — /en/racing/2026 (confirme le round 19 et ses dates officielles) et /en/results/2026/races (confirme round 18 comme dernier round disputé). Lus en brut via fetch-url.yml. La page de résultats EL1 précise n'a pas pu être localisée cette session (lien non exposé dans le HTML tronqué) — limite documentée, pas masquée.</span></li>
        <li><span class="desc">Pirelli — press.pirelli.com/tagfeed/en/tags/press__releases, lu intégralement : flux actif confirmé mais aucun communiqué spécifique au Mexique 2026 dans la fenêtre récupérée. Le domaine grand public pirelli.com a échoué en 404 sur deux locales (en-gb et fr-fr) cette session — nouvelle régression à surveiller.</span></li>
        <li><span class="desc">Tentative explicitement infructueuse et honnêtement documentée : ferrari.com/en-EN/formula1/news, HTTP 403 Forbidden — aucune communication directe de pilote/écurie trouvée pour cette séance.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.grandprix.com/races/mexican-gp-2026-practice-1-report.html" data-desc="Rapport complet EL1 : classement (concordant à la milliseconde avec la base), conditions de piste, incidents Hadjar/Slater/Crawford, VSC. Lu intégralement via fetch-url.yml.">Grandprix.com — rapport EL1</a><span class="desc">Grandprix.com</span></li>
        <li><span class="desc">Crash.net — page de liste /f1/news lue intégralement (texte rendu) : confirme indépendamment le titre « Charles Leclerc fastest in Mexico GP FP1 dominated by 10 F1 rookies » et l'existence d'un article dédié sur l'évolution Red Bull apportée ce week-end (URL exacte non extractible du texte rendu de la liste — limite déjà documentée pour ce type de page).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/everything-we-learned-on-day-one-of-f1s-mexican-gp/" data-desc="Article complet (Suttill/Mitchell-Malm/Anderson/Noble, 29 oct. 2026) : absence de MGU-H en 2026 et son impact spécifique sur le turbo lag à l'altitude de Mexico (citation nommée de Shintaro Orihara, ingénieur en chef Honda), mécanisme du « torque infilling » contraint par la configuration du circuit, citation de Bortoleto sur le désavantage du turbo Audi, citations de Piastri/Verstappen/Hamilton sur la perte d'appui aéro. Lu intégralement via fetch-url.yml — source la plus substantielle de cette passe.">The Race — ce qu'on a appris le premier jour du GP du Mexique</a><span class="desc">The Race</span></li>
        <li><a href="https://www.grandprix.com/news/russell-sees-a-ferrari-turbo-advantage-in-mexico.html" data-desc="Citations directes de Russell et Leclerc à la conférence de presse FIA du jeudi sur l'avantage turbo supposé de Ferrari à l'altitude de Mexico. Lu intégralement via fetch-url.yml — citations de conférence de presse relayées par un média, pas une communication directe pilote/écurie (précisé dans le texte).">Grandprix.com — Russell voit un avantage turbo pour Ferrari</a><span class="desc">Grandprix.com</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Communauté technique pointue — tentative documentée</h5>
      <ul>
        <li><span class="desc">r/F1Technical : deux tentatives réelles via l'API Reddit (reddit.com/r/F1Technical/search.json?q=mexico, reddit.com/r/F1Technical/new.json) depuis le runner fetch-url.yml, échec identique sur les deux — HTTP 403 "Blocked". Confirme le blocage anti-bot déjà documenté pour tous les rounds précédents cette semaine ; aucun contenu de cette communauté n'a donc pu être exploité pour cet article, signalé honnêtement plutôt que masqué ou remplacé par du contenu inventé.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
