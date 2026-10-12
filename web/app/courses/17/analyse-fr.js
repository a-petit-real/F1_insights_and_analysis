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
// RacingNews365 ("2026 F1 Singapore Grand Prix results"), f1-fansite.com
// ("Race Report & Results 2026 Singapore Formula 1 Grand Prix", daté du 11
// octobre, classement complet et tableau châssis/moteur recoupés ligne à
// ligne avec la base) et The Race ("F1 2026 Singapore Grand Prix race
// result", daté du 11 octobre, 1 min read) — quatre sources indépendantes au
// total, aucune divergence entre elles sur ce round. Classement des pilotes
// après course (Antonelli 340, Russell 238, écart de 102 points, six manches
// restantes) = page officielle Formula1.com results/2026/drivers, qui
// confirme mot pour mot le chiffre de 102 points avancé par RacingNews365 ;
// l'écart avant la course (89 points) vient d'un commentaire de lecteur
// f1-fansite daté du jour même et recolle exactement avec l'arithmétique du
// résultat (Antonelli +15, Russell +2 → +13, soit 89 → 102). Le détail des
// quatre dépassements de limites de piste signalés à Antonelli (tours 19,
// 20, 35 et 40, plus un drapeau noir et blanc) vient directement des
// race_control_messages en base — recoupé par le titre d'un article The
// Race ("Why Antonelli avoided a penalty") évoquant le même nombre de
// quatre incidents sans que la pénalité automatique ne s'applique. Le
// détail selon lequel Russell est resté bloqué derrière Hülkenberg jusqu'au
// drapeau (l'empêchant de gagner une place supplémentaire) vient d'un
// commentaire de lecteur f1-fansite, cohérent avec les temps au tour en
// base (écart quasi constant entre les deux voitures en fin de course).
// Horodatages VSC et drapeaux = race_control_messages en base (pipeline
// scripts/ingest_openf1.py), qui recoupent les deux fenêtres de Voiture de
// Sécurité Virtuelle mentionnées par Formula1.com (arrêt de Bortoleto en
// tout début de course, arrêt de Stroll au virage 15 vers le tour 36) sans
// qu'aucune Safety Car complète n'ait été déployée de la course.
//
// Point de rigueur : plusieurs pièges rencontrés en cherchant des sources
// additionnelles pour ce round, tous repérés en lisant le contenu
// réellement fetché plutôt que le résumé de recherche :
// - Un article VelocityNews ("Norris powers to crushing Singapore Grand
//   Prix victory over Verstappen") décrit en réalité la VRAIE course de
//   2024 (Norris vainqueur, aucune Safety Car de toute l'histoire du
//   circuit à l'époque), pas la suite fictive 2026 de ce projet.
// - Un article à l'URL Formula1.com « article.report-hamilton-extends-
//   championship-advantage-with-faultless-singapore....html » (notation
//   avec points, différente du format habituel « article/slug.ID » des
//   pages 2026 confirmées) décrit en réalité la VRAIE course de 2018
//   (Vettel, pneus hypersoft/ultrasoft, prochaine étape « Sochi dans deux
//   semaines », « titre 2018 » explicitement mentionné). Plusieurs autres
//   résultats de recherche (crash.net, sbs.com.au) reprenaient la même
//   trame Hamilton-vainqueur — tout ce cluster a été écarté. Heuristique
//   retenue pour la suite : une URL Formula1.com au format
//   « article.<slug>.<ID>.html » s'est révélée deux fois de suite être du
//   contenu non lié à ce round — à vérifier systématiquement par lecture
//   avant usage, jamais par la seule URL.
// Même classe d'erreur que les cas Suzuka/Madring et Bahreïn/Malaisie déjà
// rencontrés sur les rounds précédents.
//
// Enrichissement (2026-10-12), suite à la demande explicite de l'utilisateur
// d'une démarche de sourcing plus technique/pointue (voir docs/SOURCES.md,
// nouvelle section sur les modèles prédictifs/simulation/visualisation) :
// - Les 7 URL institutionnelles corrigées par l'utilisateur (Red Bull, Aston
//   Martin, Racing Bulls, Audi, Cadillac, FIA, Pirelli) ont été appliquées à
//   docs/SOURCES.md. Plusieurs tentatives de récupérer des citations directes
//   de pilotes sur les sites d'écurie/Formula1.com pour ce round ont été
//   écartées après lecture du contenu réel : un article Formula1.com au
//   format « article/slug.hash » (donc hors de l'heuristique de piège déjà
//   documentée ci-dessus) titré « Verstappen calls P2 in Singapore... »
//   s'est révélé daté du 22 septembre 2024 et décrire la VRAIE course 2024
//   (Norris vainqueur, Verstappen 2e) — nouvelle preuve que le format d'URL
//   seul n'est jamais une garantie suffisante, seule la lecture du contenu
//   fetché fait foi. Aucune citation directe de pilote n'a donc été ajoutée
//   à cet article faute de source vérifiée pour ce round précis.
// - scripts/race_briefing.py confirmait à ce moment-là qu'aucune donnée
//   tour-par-tour (lap_times/tyre_stints/pit-stops) n'était encore ingérée
//   en base pour le round 17 — seules la météo et les race_control_messages
//   l'étaient, ce qui limitait cette première passe à une relecture plus
//   fine des race_control_messages plutôt qu'à une vraie analyse de rythme
//   (voir note du 2026-10-12 ci-dessous, en deux temps, pour la suite).
// - Cette relecture complète corrige une imprécision de la version publiée :
//   les quatre dépassements de limites de piste d'Antonelli n'étaient PAS
//   tous au virage 2 (seuls les tours 19 et 20 le sont ; le tour 35 est au
//   virage 19 — immédiatement suivi du drapeau noir et blanc à 13:03:57 — et
//   le tour 40 au virage 7). Elle supprime aussi une mention inexacte (un
//   cinquième avertissement d'Antonelli au tour 48) qui ne correspond à
//   aucun message de course réel. Elle ajoute deux faits absents de la
//   version publiée, tous deux directement dans les race_control_messages :
//   Stroll reçoit lui aussi un drapeau noir et blanc pour limites de piste
//   (tour 36, virage 7, à 13:05:21) sans pénalité automatique non plus, et
//   fait l'objet d'une enquête ouverte dès le départ simulé (« PRACTICE
//   START INFRINGEMENT ») dont l'issue n'apparaît pas dans les messages
//   disponibles avant le drapeau à damier. Elle documente enfin un constat
//   agrégé inédit : sur l'ensemble de la course, 22 temps supprimés pour
//   limites de piste touchent 14 pilotes différents au virage 2 (loin devant
//   les virages 7 et 19, quelques cas isolés chacun) — un point chaud
//   systémique du circuit cette année-là, jamais signalé comme tel par
//   aucune des quatre sources médiatiques utilisées pour la version
//   initiale, qui ne mentionnaient chacune que le cas Antonelli isolément.
//
// Suite (2026-10-12, même journée) : l'utilisateur a jugé, à raison, que
// l'enrichissement ci-dessus (limites de piste) ne constituait pas une
// vraie analyse technique voiture/stratégie — c'était un renforcement de
// rigueur sur les incidents, pas sur le rythme ou la performance. Cause
// identifiée : le round 17 venait de se terminer la veille (10 octobre),
// et le pipeline OpenF1 bloque tout accès (y compris aux données
// historiques) tant qu'une séance F1 est live quelque part — lap_times et
// tyre_stints n'avaient donc jamais été ingérés pour ce round. La course
// étant terminée, une ré-ingestion (workflow ingest-openf1.yml, round 17)
// a permis de récupérer 1240 lignes de lap_times et 47 lignes de
// tyre_stints réelles. race_briefing.py et race_briefing_laptimes.py
// résolvent le nom du pilote via une jointure sur `results` (pipeline
// Jolpica), encore vide pour ce round — d'où l'ajout d'un script dédié
// (scripts/race_briefing_laptimes_by_car.py) interrogeant lap_times/
// tyre_stints directement par numéro de voiture. Toutes les moyennes de
// rythme et vitesses de pointe citées plus bas dans l'article (Hamilton
// vs Leclerc/Antonelli en fin de course, gestion de Verstappen, écart de
// vitesse de pointe Red Bull/McLaren/Mercedes) viennent de cette requête,
// avec une méthode simple et explicite : moyenne des tours d'un relais
// donné, tours d'entrée/sortie de stand exclus, puis tours encore
// supérieurs à 103% de la médiane du relais également exclus (pour
// neutraliser l'effet des phases sous VSC/trafic plutôt que de les
// confondre avec un vrai delta de performance).
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
      <p class="subverdict">Auteur de sa 50<sup>e</sup> pole et de sa première victoire au Sprint la veille, Verstappen conclut un week-end parfait en menant les 62 tours de bout en bout, malgré des soucis radio en fin de course. Derrière lui, Leclerc profite d'une gestion de pneus mieux temporisée pour boucler une remontée jusqu'au podium, pendant que Hamilton, pourtant premier à s'arrêter, recule à la 6<sup>e</sup> place après un débat stratégique interne chez Ferrari — et qu'Antonelli complète le podium malgré quatre dépassements des limites de piste signalés en course. Russell, parti 19<sup>e</sup> après une pénalité moteur, et Hadjar, parti de la voie des stands après une panne en qualifications, signent chacun une remontée solide jusqu'au 9<sup>e</sup> et au 10<sup>e</sup> rang — Russell restant toutefois bloqué derrière Hülkenberg jusqu'au drapeau, à une place de faire encore mieux. Trois abandons ponctuent l'après-midi : Stroll (embrayage), Colapinto (transmission) et Bortoleto (boîte de vitesses, avec un départ de feu maîtrisé par les commissaires).</p>
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
        <p>Au 48<sup>e</sup> tour, Russell double Gasly au virage 7 pour la 9<sup>e</sup> place. À dix tours de l'arrivée, Verstappen compte encore un peu moins de dix secondes d'avance sur Leclerc, Hamilton pointant 3<sup>e</sup> à 11,8 secondes de son coéquipier — Norris s'étant rapproché à moins d'une demi-seconde du septuple champion du monde, suivi d'Antonelli, Piastri, Lawson, Hülkenberg, Russell et Gasly.</p>
        <p>Le combat pour la dernière place du podium s'intensifie alors : Hamilton part large en défendant contre Norris, ce qui permet à Antonelli de se glisser devant la McLaren avant de prendre la 3<sup>e</sup> place à Hamilton au virage 16 — un dépassement qui place brièvement Hamilton sous enquête des commissaires pour être sorti de piste en y gagnant un avantage, classée sans suite. Norris, profitant à son tour des difficultés de Hamilton sur ses pneus, lui reprend la 4<sup>e</sup> place ; Piastri, de plus en plus menaçant, boucle la manœuvre identique au même virage pour s'emparer de la 5<sup>e</sup> position. Verstappen, de son côté, gère des problèmes de radio en fin de course — son ingénieur Gianpiero Lambiase ayant du mal à l'entendre — sans que cela n'affecte sa conduite, et franchit la ligne en tête pour sceller sa deuxième victoire consécutive de la saison.</p>

        <h3 class="subtitle">Lecture technique : le virage 2, point chaud des limites de piste toute la journée</h3>
        <p>Au-delà des cas individuels déjà commentés par la presse spécialisée, une relecture complète des messages de course bruts fait apparaître un motif que les comptes-rendus habituels ne signalent pas : sur l'ensemble des 62 tours, 22 temps au tour sont supprimés pour dépassement des limites de piste, et 14 pilotes différents sont concernés — très largement concentrés sur un seul endroit du circuit, le virage 2, responsable de la quasi-totalité de ces suppressions (Bearman, Gasly, Lindblad, Albon, Sainz, Antonelli, Stroll, Piastri, Hadjar, Leclerc, Lawson, Russell, Hamilton et Norris y perdent chacun au moins un temps). Les virages 7 et 19 ne totalisent qu'une poignée de cas isolés en comparaison (dont ceux d'Antonelli et de Stroll détaillés plus haut), et Verstappen lui-même y perd un temps au tour 49 sans que cela n'affecte son résultat. Seul Antonelli atteint le seuil des quatre infractions menant théoriquement à une pénalité ferme (drapeau noir et blanc dès la troisième, sans suite) ; Stroll s'arrête à trois avant son abandon, avec un drapeau noir et blanc similaire après sa troisième infraction. Le volume et la concentration géographique de ces suppressions suggèrent un profil de virage particulièrement tentant à la limite — plus un trait caractéristique de ce tracé cette année-là qu'un hasard de course.</p>
      </div>
    </section>

    <section class="block" data-num="03" id="sec-r3">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

        <h3 class="subtitle">Ferrari — un arrêt précoce payant pour Hamilton, un débat stratégique qui coûte le podium</h3>
        <p>Premier pilote du haut du classement à s'arrêter (tour 19), Hamilton bénéficie d'un train de pneus frais qui lui permet de remonter jusqu'à la 3<sup>e</sup> place avant que l'écurie ne débatte en interne de la pertinence d'un second arrêt. Le choix de ne pas en effectuer un — une décision que Hamilton reconnaîtra lui-même par radio en fin de course — le laisse exposé sur des gommes vieillissantes face à Antonelli et Norris dans les derniers tours, le reléguant à la 6<sup>e</sup> place. Les temps au tour confirment l'ampleur du coût : sur son unique relais tendre, étiré sur 44 tours (19 à 62), Hamilton tourne à 1:37,82 de moyenne (tours représentatifs, hors entrée/sortie de stand et phases neutralisées) — contre 1:36,24 pour Leclerc sur son dernier relais, également en tendre mais chaussé 15 tours plus tard (tour 40) et donc nettement plus frais en fin de course. Cet écart de près de 1,6 seconde au tour, pas un incident de pilotage, explique mécaniquement pourquoi Antonelli puis Norris et Piastri l'ont rattrapé puis dépassé dans les derniers tours. Leclerc, grâce à deux arrêts mieux temporisés autour de la seconde Voiture de Sécurité Virtuelle, complète lui une remontée jusqu'à la 2<sup>e</sup> place.</p>

        <h3 class="subtitle">Mercedes — Antonelli sur le podium malgré quatre avertissements à trois virages différents, Russell pénalisé par le timing de son arrêt</h3>
        <p>Antonelli signe un podium à la 3<sup>e</sup> place malgré quatre dépassements des limites de piste répartis sur trois virages différents — au 2 (tours 19 et 20), au 19 (tour 35) puis au 7 (tour 40) — sans qu'aucun ne déclenche la pénalité automatique de cinq secondes habituellement appliquée à la quatrième infraction. Le troisième de ces dépassements (tour 35, virage 19) lui vaut un drapeau noir et blanc d'avertissement, le signal le plus sévère avant la pénalité ferme — sans conséquence sportive, Antonelli profitant ensuite d'un second arrêt bien placé autour de la Voiture de Sécurité Virtuelle pour s'intercaler entre les deux McLaren puis prendre la 3<sup>e</sup> place à Hamilton dans les derniers tours. Sur ce dernier relais (tours 40-62, tendre comme Hamilton), Antonelli tourne à 1:36,59 de moyenne — à peine plus lent que Leclerc et plus d'une seconde devant Hamilton sur une gomme équivalente, confirmant que son dépassement au virage 16 tenait autant au rythme qu'au geste de pilotage. Russell, lui, paie le prix d'un arrêt effectué juste à la reprise de la VSC plutôt que pendant — un décalage de quelques secondes qui l'empêche de profiter du même gain que ses rivaux — et reste ensuite bloqué derrière Hülkenberg jusqu'au drapeau, à une place de faire encore mieux. Son premier relais (medium, 39 tours — le plus long relais sur cette gomme de toute la course) tourne à 1:39,31 de moyenne, le rythme le plus lent des sept pilotes de tête analysés sur cette phase, cohérent avec une remontée méthodique plutôt qu'une attaque pure depuis le fond de grille ; sa remontée depuis la 19<sup>e</sup> place jusqu'à la 9<sup>e</sup> reste néanmoins l'une des plus solides du jour.</p>

        <h3 class="subtitle">Aston Martin — Stroll sous enquête avant même le départ, puis averti en piste</h3>
        <p>Dès le départ simulé, un incident impliquant Stroll pour un possible manquement aux instructions de la direction de course est signalé et renvoyé à une enquête après la course — enquête dont l'issue n'apparaît pas dans les messages de course disponibles avant le drapeau à damier. En course, Stroll écope lui aussi d'un drapeau noir et blanc pour limites de piste (tour 36, virage 7), après deux dépassements déjà notés au virage 2 (tours 19 et 20) — comme pour Antonelli, sans pénalité automatique déclenchée. Son week-end s'achève de toute façon prématurément par l'abandon du 36<sup>e</sup> tour pour un problème d'embrayage.</p>

        <h3 class="subtitle">Red Bull — Verstappen imperturbable malgré le plus petit moteur en ligne droite du plateau, Hadjar récompensé par sa remontée</h3>
        <p>Verstappen ne cède jamais la tête de la course, gérant son unique arrêt (tour 33) sans jamais perdre le commandement — une deuxième victoire consécutive obtenue par une gestion de course sans la moindre erreur, malgré des soucis radio en fin de parcours. Son rythme progresse même au fil de la course plutôt que de se dégrader : 1:37,72 de moyenne sur son relais tendre (tours 1-32) puis 1:36,75 sur le relais medium final (tours 33-62), signe d'une gestion prudente du train usé avant l'arrêt suivie d'une attaque maîtrisée sur gomme fraîche. Fait technique notable : sa vitesse de pointe relevée en ligne droite (295 km/h) est la plus faible des sept pilotes de tête analysés ici, loin derrière Russell (308 km/h) ou les deux McLaren (306-307 km/h) — un compromis appuyance/traînée assumé par Red Bull plutôt qu'un handicap, puisqu'il reste imbattable sur l'ensemble du tour. Hadjar, parti de la voie des stands après sa panne en qualifications, boucle une remontée jusqu'à la 10<sup>e</sup> place et marque son premier point du week-end sur ce format, un résultat à mettre en miroir avec sa performance similaire en Sprint Qualifying la veille.</p>

        <h3 class="subtitle">McLaren — une fin de course payante pour Norris et Piastri, la vitesse de pointe la plus régulière du plateau</h3>
        <p>Les deux McLaren profitent des derniers tours pour grappiller chacune une place dans le money-time du Grand Prix : Norris reprend la 4<sup>e</sup> place à un Hamilton en difficulté sur ses pneus, et Piastri imite le mouvement un instant plus tard pour s'emparer de la 5<sup>e</sup> place au même pilote, au même virage. Les temps au tour confirment que ce n'est pas qu'une question de pneus adverses : sur leurs relais finaux (medium pour Norris, tours 33-62, à 1:37,18 de moyenne ; tendre pour Piastri, tours 42-62 après un second arrêt précipité par une lente crevaison, à 1:36,38), les deux McLaren affichent un rythme supérieur à celui de Hamilton (1:37,82) sur la même phase de course, avec parmi les vitesses de pointe en ligne droite les plus élevées du peloton de tête (306-307 km/h, derrière Russell à 308).</p>
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
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Andrea Kimi Antonelli</td><td class="pos">4 → 3<span class="delta good">+1</span></td><td>Podium obtenu malgré quatre dépassements des limites de piste à trois virages différents (2, 19, 7) et un drapeau noir et blanc, sans pénalité, scellé par un dépassement sur Hamilton au virage 16 dans les derniers tours. Étend son avance au championnat de 89 à 102 points.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Lando Norris</td><td class="pos">5 → 4<span class="delta good">+1</span></td><td>Profite de la dégradation de Hamilton en fin de course pour lui reprendre la 4<sup>e</sup> place, après avoir brièvement été signalé pour les limites de piste au tour 54 — sans suite.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Oscar Piastri</td><td class="pos">6 → 5<span class="delta good">+1</span></td><td>Deuxième arrêt pour une lente crevaison au 42<sup>e</sup> tour, puis remontée jusqu'à la 5<sup>e</sup> place grâce au même dépassement que son coéquipier sur un Hamilton en difficulté, au même virage.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Lewis Hamilton</td><td class="pos">3 → 6<span class="delta bad">-3</span></td><td>Premier pilote du haut du classement à s'arrêter (tour 19), ce qui lui vaut une remontée jusqu'au podium virtuel avant qu'un débat stratégique interne sur un second arrêt ne le laisse exposé en fin de course — il s'excusera lui-même par radio auprès de son écurie.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Liam Lawson</td><td class="pos">8 → 7<span class="delta good">+1</span></td><td>Course solide et sans incident individuel notable, légèrement remontée par rapport à sa position de départ sur l'ensemble du week-end.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Nico Hülkenberg</td><td class="pos">10 → 8<span class="delta good">+2</span></td><td>Remontée propre sans incident individuel notable relevé, décrochant des points précieux pour Audi.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>George Russell</td><td class="pos">19 → 9<span class="delta good">+10</span></td><td>Grosse remontée depuis le fond de grille (pénalité de groupe propulseur), freinée par un arrêt déclenché juste à la reprise de la seconde VSC plutôt que pendant — un décalage de quelques secondes qui lui coûte le gain complet dont ont profité ses rivaux — puis par Hülkenberg, qu'il ne parvient jamais à dépasser jusqu'au drapeau.</td></tr>
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
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Lance Stroll</td><td class="pos">21 (voie des stands) → DNF<span class="delta dnf">DNF</span></td><td>Sous enquête dès le départ simulé pour un possible manquement aux instructions de la direction de course, puis averti d'un drapeau noir et blanc pour limites de piste au tour 36 (virage 7), avant d'abandonner ce même tour pour un problème d'embrayage au virage 15, provoquant la seconde Voiture de Sécurité Virtuelle de la course.</td></tr>
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
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Mercedes</td><td>Antonelli signe un podium malgré quatre dépassements des limites de piste à trois virages différents (dont un drapeau noir et blanc) et étend son avance au championnat de 89 à 102 points sur son propre coéquipier ; Russell, pénalisé par le timing de son arrêt autour de la VSC puis bloqué derrière Hülkenberg, boucle néanmoins une remontée solide du 19<sup>e</sup> au 9<sup>e</sup> rang.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>McLaren</td><td>Les deux pilotes profitent de la fin de course pour grappiller chacun une place sur un Hamilton affaibli par ses pneus — Norris 4<sup>e</sup>, Piastri 5<sup>e</sup> — un résultat qui doit davantage à la gestion adverse qu'à une performance dominante.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Racing Bulls</td><td>Résultat contrasté : Lawson ramène une 7<sup>e</sup> place solide, tandis que Lindblad recule nettement sans incident individuel notable pour l'expliquer, après sa performance remarquée du Sprint.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Audi</td><td>Hülkenberg marque des points précieux en 8<sup>e</sup> place, tandis que Bortoleto abandonne dès le début de course pour un problème de boîte de vitesses, sa monoplace prenant feu une fois repoussée au garage.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Alpine</td><td>Week-end à oublier : Gasly recule hors des points après son arrêt, tandis que Colapinto abandonne au 29<sup>e</sup> tour pour un problème de transmission suspecté.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Haas</td><td>Aucun point marqué (Bearman 12<sup>e</sup>, Ocon 13<sup>e</sup>), une course discrète sans incident individuel notable pour l'un ou l'autre pilote.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Aston Martin</td><td>Week-end à deux visages : Alonso remonte correctement depuis la voie des stands jusqu'à la 16<sup>e</sup> place, tandis que Stroll, également parti de la voie des stands et sous enquête dès le départ simulé, écope d'un drapeau noir et blanc pour limites de piste avant d'abandonner au 36<sup>e</sup> tour pour un problème d'embrayage.</td></tr>
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
              <li><strong>Antonelli</strong>, podium malgré quatre dépassements des limites de piste sans pénalité, qui étend son avance au championnat de 89 à 102 points.</li>
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
        <summary>Sources utilisées — GP de Singapour (5 liens)</summary>
        <div class="srcgroup">
          <h5>Données de course</h5>
          <ul>
            <li><span class="desc">The Pit Wall — pipeline production (météo/messages de course/temps au tour/pneus via scripts/ingest_openf1.py), primaire ; classement officiel, grille de départ et points via Formula1.com en l'absence de résultats Jolpica disponibles en base pour ce round à l'heure de la rédaction.</span></li>
            <li><span class="desc">Relecture complète et non filtrée des race_control_messages (scripts/race_briefing_full_rcm.py), ajoutée le 12 octobre 2026 à la demande explicite de l'utilisateur d'un sourcing plus technique : corrige l'attribution par virage des dépassements de limites de piste d'Antonelli et ajoute les faits Stroll (drapeau noir et blanc, enquête dès le départ simulé) et le constat agrégé sur le virage 2, absents de la version initiale et d'aucune des quatre sources médiatiques ci-dessous.</span></li>
            <li><span class="desc">Temps au tour et relais pneus par numéro de voiture (scripts/race_briefing_laptimes_by_car.py, nouveau), ajoutés le 12 octobre 2026 après ré-ingestion OpenF1 post-course (lap_times/tyre_stints n'étaient pas encore en base lors de la rédaction initiale) : moyennes de rythme par relais, vitesses de pointe en ligne droite — source de tous les chiffres de rythme chiffré et de vitesse de pointe cités dans la section 03.</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Déroulé de course et classement officiel — quatre sources indépendantes recoupées</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/latest/article/verstappen-seals-commanding-singapore-grand-prix-victory-from-leclerc-and-antonelli.49wDzysiVqi5cloGjle40A" data-desc="Rapport officiel de la course, fetché en primaire — déroulé complet, citation de Verstappen, contexte.">Formula1.com — Verstappen remporte le Grand Prix de Singapour</a><span class="desc">Formula1.com — primaire</span></li>
            <li><a href="https://racingnews365.com/2026-f1-singapore-grand-prix-results" data-desc="Rapport indépendant, confirmant les mêmes faits clés (écart, podium, remontée de Russell) sans divergence.">RacingNews365 — résultats du GP de Singapour 2026</a><span class="desc">RacingNews365 — confirmation</span></li>
            <li><a href="https://www.f1-fansite.com/f1-result/race-report-results-2026-singapore-formula-1-grand-prix/" data-desc="Classement complet (châssis/moteur), classement pilotes après course, et commentaires de lecteurs apportant le détail Russell/Hülkenberg utilisé dans l'article.">F1-Fansite.com — compte-rendu et classement du GP de Singapour 2026</a><span class="desc">F1-Fansite.com — confirmation + contexte additionnel</span></li>
            <li><a href="https://www.the-race.com/formula-1/f1-2026-singapore-grand-prix-race-result/" data-desc="Classement confirmé, et titres d'articles d'analyse indépendants (pénalité évitée par Antonelli, échec stratégique de Hamilton) recoupés avec les race_control_messages en base.">The Race — résultat du GP de Singapour 2026</a><span class="desc">The Race — confirmation + contexte additionnel</span></li>
          </ul>
        </div>
      </details>
    </section>
`;
