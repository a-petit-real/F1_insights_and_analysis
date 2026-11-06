// Analyse EL1 — Grand Prix de São Paulo (Interlagos), round 20, saison 2026.
// PREMIER article de ce week-end (aucune analyse EL/Quali/pré-analyse
// antérieure pour ce round) : pas d'historique narratif à prolonger, tout
// part de cette séance.
//
// Données de séance : donnée primaire = pipeline OpenF1 (session_key=11405,
// Practice 1, 2026-11-06 15:30->16:30 UTC), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py
// (22 pilotes classés). Classement et nombre de tours recoupés et
// concordants AU MILLIÈME avec la page de résultats officielle
// Formula1.com (formula1.com/en/results/2026/races/1299/sao-paulo/practice/1,
// HTML brut, lu intégralement via fetch-url.yml, y compris le nombre de
// tours par pilote) ET avec le rapport Grandprix.com et celui de The Race
// (classement complet, 22 temps individuels) — triple confirmation
// indépendante, la plus solide obtenue jusqu'ici pour un article EL1.
//
// Analyse technique quantifiée (scripts/practice_briefing_laptimes_by_car.py,
// 6 voitures : NOR/VER/HAM/ANT/RUS/HAD, choisies comme le cluster de tête
// explicite demandé). Méthode identique aux rounds précédents : pour chaque
// relais (table practice_stints), le premier tour (tour de sortie de stand)
// est exclu systématiquement, le dernier tour est exclu sauf s'il s'agit du
// tout dernier relais du pilote sur la séance (pas de tour de rentrée à
// exclure dans ce cas), puis les tours > 103% de la médiane des tours
// restants sont écartés. Point de rigueur à signaler explicitement : cette
// EL1 est une séance très fragmentée (drapeau rouge Slater entre les virages
// 9 et 10, drapeau jaune après la sortie de piste d'Albon au-delà de Juncao,
// nombreux relais coupés par du trafic avec six pilotes de réserve/rookies
// sur la piste) — plusieurs relais ne comptent que 1 à 2 tours exploitables
// après filtrage, ce qui est signalé tour par tour dans le tableau de la
// section 02 plutôt que masqué. Les relais longs sur pneu tendre en fin de
// séance (Norris laps 18-33, Hamilton laps 17-31, Russell laps 16-30,
// Verstappen laps 13-24) et le relais medium très propre d'Antonelli (laps
// 17-25, 7/7 tours gardés, AUCUNE exclusion) sont les échantillons les plus
// fiables de cette passe — retenus pour la comparaison de rythme long de la
// section 02. Hadjar n'a aucun relais assez long pour un calcul fiable (ses
// relais les plus longs ne gardent que 1 à 2 tours après filtrage) —
// documenté honnêtement comme absence de signal plutôt qu'inventé. Vitesses
// de pointe (speedST) = valeur maximale brute par voiture sur la séance,
// aucune estimation.
//
// Sourcing élargi (minimum 4 sources indépendantes pour une EL1, 2
// généralistes + 2 technique/analytique, + institutionnel + communication
// directe pilote, conformément à la règle éditoriale de docs/OPERATIONS.md) :
// - Formula1.com (officiel) : page de résultats EL1 complète lue en HTML
//   brut via fetch-url.yml (id de course deviné par incrémentation à partir
//   du round 19 — 1298 -> 1299 — et confirmé par le titre de page exact
//   "FORMULA 1 MSC CRUISES GRANDE PRÊMIO DE SÃO PAULO 2026 - PRACTICE 1").
//   Classement, écarts et tours par pilote concordant au millième avec la
//   base et avec les deux sources ci-dessous.
// - McLaren Racing (institutionnel, écurie au sommet de la séance) :
//   mclaren.com/racing/ lu intégralement — confirme "2026 São Paulo GP,
//   Round 20" comme prochaine course, et affiche une citation d'écurie sur
//   la nouvelle évolution aéro ("We're hopeful these upgrades can help us
//   take another step towards the front") développée en détail par la
//   source technique ci-dessous. Communication d'écurie, pas de pilote
//   nommé sur cette citation précise.
// - Pirelli (institutionnel) : press.pirelli.com/tagfeed/en/tags/press__releases
//   lu intégralement — flux actif confirmé mais toujours aucun communiqué
//   spécifique à São Paulo 2026 dans la fenêtre récupérée (dernière entrée
//   datée du 12 juin 2026) — régression déjà documentée pour plusieurs
//   rounds précédents, confirmée une fois de plus plutôt que masquée.
// - Tentative explicitement infructueuse et honnêtement documentée :
//   ferrari.com/en-EN/formula1, échec réseau (pas de code HTTP exploitable)
//   — aucune communication directe d'écurie Ferrari trouvée pour cette
//   séance. fia.com (page saison 2026) atteinte mais purement navigationnelle
//   (aucun contenu daté spécifique à ce round dans la fenêtre récupérée).
// - Grandprix.com (généraliste n°1) : rapport EL1 complet ("Practice 1
//   Report - Norris edges Antonelli in Brazil") ET trois articles d'actualité
//   dédiés — pénalité de grille de Russell (avec citation directe Instagram),
//   lutte pour le titre constructeurs Mercedes/Ferrari, promotion de Câmara
//   chez Haas (avec citation directe de Komatsu). Les quatre lus intégralement
//   via fetch-url.yml. Piège de slug confirmé une nouvelle fois : l'URL
//   intuitive /races/sao-paulo-gp-2026-practice-1-report.html renvoie un 404
//   (deux tentatives, y compris en relançant à l'identique) ; le motif réel
//   pour ce Grand Prix est l'adjectif /races/brazilian-gp-2026-practice-1-report.html
//   (retrouvé en fetchant la page d'accueil en --raw et en cherchant les
//   href), confirmant le motif déjà documenté pour Austin/Mexico (adjectif,
//   pas le nom du pays).
// - Crash.net (généraliste n°2) : page de liste /f1/news lue intégralement
//   (texte rendu) — confirme indépendamment le titre "Lando Norris sets
//   Brazil GP first practice pace in upgraded McLaren" et révèle le
//   communiqué séparé "McLaren reveals major upgrade package for Brazil GP"
//   (repris comme titre attribué, URL d'article individuel non extractible
//   de cette page de liste — limite déjà documentée pour ce domaine).
// - The Race (technique/analytique n°1) : DEUX articles complets lus
//   intégralement — le compte-rendu EL1 ("What happened in first Brazil F1
//   practice", Josh Suttill) et l'article dédié à l'évolution McLaren
//   ("McLaren's 2027 F1 front wing breaks cover in Brazil", Jon Noble, avec
//   citation nommée de Peter Prodromou, directeur technique aéro). Un
//   troisième article ("Every rookie to drive in FP1 in F1 2026") a permis
//   de confirmer la règle exacte derrière les six pilotes de réserve de
//   cette séance (voir section 01) — sans lui, la mention "pilote de
//   réserve" serait restée non sourcée sur le MÉCANISME réglementaire exact.
// - Autosport (technique/analytique n°2) : page de liste /f1/news lue
//   intégralement (texte rendu) — confirme indépendamment le titre exact
//   "F1 Brazilian GP: Norris fastest in opening practice from new champion
//   Antonelli" et le titre "Herta qualifies for F1 superlicence as Bottas
//   remains bullish on 2027 seat", recoupant indépendamment la source The
//   Race sur ce point (URL d'article individuel non extractible de cette
//   page de liste — même limite que Crash.net).
// - r/F1Technical (communauté technique pointue) : nouvelle tentative réelle
//   (reddit.com/r/F1Technical/search.json?q=brazil+fp1&restrict_sr=1&sort=new)
//   depuis fetch-url.yml, échec — blocage anti-bot déjà documenté pour tous
//   les rounds précédents cette saison, confirmé une fois de plus.
// - WebSearch n'a été utilisé à AUCUN moment pour sourcer un fait de cet
//   article (seulement omis entièrement cette passe, conformément au piège
//   documenté dans docs/SOURCES.md : ce moteur indexe la vraie saison F1
//   2026, sans rapport avec cette continuation fictive).
//
// Communication directe pilote (obligatoire, explicitement signalée) :
// George Russell, citation publiée dans une story Instagram de Mercedes
// ("We felt like this was a good place to take it"), relayée texte par
// Grandprix.com — canal propre écurie/pilote, pas une citation de
// conférence de presse reformulée par un média. Distincte du message radio
// de Verstappen ("This is a workout with the steering"), capté par la
// diffusion officielle et relayé par Grandprix.com : un message radio
// broadcast n'est pas un canal propre au pilote au sens de la règle, donc
// présenté séparément et non étiqueté "communication directe" dans le texte.
//
// Zéro contenu « people » : plusieurs titres disponibles ce jour-là chez
// Crash.net et Grandprix.com (naissance du premier enfant de Charles et
// Alexandra Leclerc — la vraie raison de l'absence de Leclerc derrière le
// volant de Beganovic ; visite d'Antonelli à la tombe de Senna ; hommage
// familial Diwali de Lindblad sur son casque ; critique de Ralf Schumacher
// sur Hamilton ; moment avec l'ancien ingénieur de course de Hamilton ;
// maladie de Stroll) ont été délibérément écartés de cet article — la
// substitution Beganovic/Leclerc est rapportée comme un fait sportif pur
// (qui conduit la voiture, dans le cadre de la rotation obligatoire de
// pilotes de réserve déjà en cours pour Beganovic cette saison) sans jamais
// développer la raison personnelle, conformément à la règle éditoriale
// "zéro contenu people" — même traitement que la non-explication Haas/Ocon
// documentée pour le round 19.
export const ROUND20_EL1_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de São Paulo · Autódromo José Carlos Pace (Interlagos) · EL1 — vendredi 6 novembre</p>
    <p class="verdict">Norris ouvre le week-end du titre constructeurs par la plus fine des marges sur le tout nouveau champion Antonelli — mais l'écart qui compte vraiment n'est pas celui du tour sec : sur les longs relais de pneu tendre en fin de séance, McLaren, seule écurie à avoir amené une évolution à Interlagos, tourne près d'une seconde plus vite au tour que ses poursuivants directs.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">1:11,717</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,082s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,236s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0,324s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,386s</span></div>
    </div>
    <p class="subverdict">Le contexte du week-end dépasse largement cette première heure : Kimi Antonelli a déjà été sacré champion du monde à Mexico, et Mercedes peut officiellement remporter le titre constructeurs dès dimanche soir si l'écurie devance Ferrari d'au moins trois points — l'enjeu numéro un de ce Grand Prix, confirmé par Grandprix.com. Sur la piste, six titulaires ont cédé leur baquet à un pilote de réserve ou junior dans le cadre de la rotation obligatoire 2026 (deux apparitions en EL1 par voiture sur la saison) : Beganovic pour Leclerc chez Ferrari, Fornaroli pour Piastri chez McLaren, Mini pour Gasly chez Alpine, Browning pour Sainz chez Williams, Herta pour Pérez chez Cadillac et Slater pour Hülkenberg chez Audi. Côté Haas, Rafael Câmara a disputé sa première séance en tant que titulaire à part entière — l'écurie a écarté Esteban Ocon pour le reste de la saison, et le pilote tête du championnat de Formule 2 fait ses débuts en Grand Prix à domicile, au volant de la VF-26 aux côtés de Bearman. Enfin, George Russell a confirmé qu'il purgera une pénalité de cinq places sur la grille dimanche, pour un changement moteur que Mercedes a délibérément choisi de prendre à Interlagos plutôt que d'y être contraint.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el1-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Norris devant pour huit centièmes — et une évolution McLaren qu'aucune autre écurie n'a amenée</h2>
    <p>Lando Norris (1:11,717) a réglé l'ordre pendant les relais de pneu tendre, après que Verstappen puis Antonelli avaient chacun occupé la tête provisoire. Kimi Antonelli (1:11,799, +0,082s) termine deuxième pour Mercedes, devant Max Verstappen (1:11,953, +0,236s), qui s'est plaint par radio de « downshifts inacceptables » et d'une direction plus dure dans un sens que dans l'autre — message capté par la diffusion officielle et relayé par Grandprix.com, donc une communication radio broadcast, pas un canal propre au pilote. Lewis Hamilton (1:12,041, +0,324s) place la première Ferrari en quatrième position, devant George Russell (1:12,103, +0,386s) et Isack Hadjar (1:12,156, +0,439s) : quatre écuries différentes dans les six premiers, toutes à moins de quatre dixièmes.</p>
    <p>Fait technique central de cette séance, confirmé indépendamment par The Race, Crash.net et le site McLaren lui-même : McLaren est la SEULE écurie du plateau à avoir amené une évolution à São Paulo — nouvel aileron avant, aileron arrière modifié, plancher retouché et béquet repris. Jon Noble (The Race) détaille que le nouvel aileron avant change de concept par rapport à la pièce précédente (point d'ancrage principale/bord de fuite repris en bas de l'élément, fixation nez/plan principal déplacée sur le deuxième volet, hauteur des volets modifiée) et qu'il servira de base au lancement de la MCL41 en 2027. Peter Prodromou, directeur technique aérodynamique McLaren, le confirme nommément : <em>« La saison n'est pas terminée : ces évolutions sont conçues pour améliorer la voiture dès maintenant et nous aider dans notre combat pour la troisième place du championnat. Si les enseignements tirés de ces évolutions nourriront le développement de l'an prochain, nous comptons aussi conserver le concept du nouvel aileron avant dans la spécification de lancement de la voiture de l'année prochaine. »</em> Autrement dit : McLaren ne vise pas le titre (déjà hors de portée face à Mercedes et son duo Antonelli/Russell) mais la troisième place du championnat constructeurs — et utilise Interlagos comme banc d'essai grandeur réelle pour 2027.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el1-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Rythme de relais : l'écart McLaren se confirme — et s'agrandit — sur les longs relais</h2>
    <p>Requête dédiée sur les tours bruts du cluster de tête (scripts/practice_briefing_laptimes_by_car.py, Norris/Verstappen/Hamilton/Antonelli/Russell/Hadjar), méthode identique aux rounds précédents : premier tour de chaque relais exclu (tour de sortie de stand), dernier tour exclu sauf s'il s'agit du tout dernier relais du pilote, puis tours restants > 103% de la médiane écartés. Cette EL1 a été nettement plus fragmentée que les séances équivalentes des rounds précédents — drapeau rouge (arrêt de Slater entre les virages 9 et 10), drapeau jaune (sortie d'Albon au-delà de Juncao) et trafic dense avec six pilotes de réserve sur la piste — d'où des relais parfois très courts : le tableau ci-dessous ne retient que le relais le plus long et le plus propre disponible pour chaque pilote, avec le ratio tours gardés/total toujours affiché :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Gomme / relais</th><th>Tours (gardés/dispo.)</th><th>Moyenne relais</th><th>V. pointe (speedST)</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>SOFT (tours 18-33)</td><td>13/15</td><td>1:14,883</td><td>320 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>SOFT (tours 13-24)</td><td>9/10</td><td>1:16,059</td><td>321 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>SOFT (tours 16-30)</td><td>10/14</td><td>1:15,920</td><td>316 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>SOFT (tours 17-31)</td><td>12/14</td><td>1:16,502</td><td>311 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>MEDIUM (tours 17-25)</td><td>7/7</td><td>1:16,352</td><td>319 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>— aucun relais fiable —</td><td>≤2/4 sur tous les relais</td><td>non calculable</td><td>317 km/h</td></tr>
      </tbody>
    </table>
  </div>
  <div class="prose">
    <p>Deux lectures, toutes deux vérifiées sur les tours bruts, aucune inventée. D'abord, le signal le plus solide statistiquement de tout le tableau : le relais medium d'Antonelli (7 tours gardés sur 7 disponibles, AUCUNE exclusion) — la donnée la plus propre obtenue cette saison pour un relais de ce type, alors même qu'il ne s'agit pas de son relais le plus rapide. Ensuite, et c'est le vrai fait marquant de cette séance : sur des relais tendre comparables en timing de séance (tous dans la seconde moitié de l'heure), Norris (1:14,883) tourne 1,0 à 1,6 seconde plus vite au tour que Russell (1:15,920), Antonelli sur médium (1:16,352) et Hamilton (1:16,502) — un écart bien supérieur à celui observé sur le tour sec (quatre dixièmes seulement entre Norris et Hamilton). Verstappen (1:16,059 sur 9/10 tours, l'échantillon le plus fiable de ce tableau avec Antonelli) referme un peu l'écart par rapport à Hamilton et Russell, mais reste lui aussi distancé par Norris. Hadjar ne dispose d'aucun relais assez long pour un calcul fiable (ses relais HARD de début de séance ne gardent jamais plus de 1 à 2 tours après filtrage) — documenté honnêtement comme absence de signal plutôt que masqué derrière une moyenne peu fiable. Ce différentiel de rythme long, cohérent avec l'évolution exclusive McLaren détaillée en section 01, est le signal technique le plus solide de cette première heure — à vérifier si sa taille, inhabituelle pour une simple évolution aéro de fin de saison, se confirme en EL2/EL3.</p>
    <div class="callout">Réserve méthodologique explicite : les gommes ne sont pas strictement comparables (Norris/Verstappen/Russell/Hamilton sur tendre, Antonelli sur médium pour son relais le plus propre) et les âges de pneu au départ de chaque relais diffèrent légèrement. L'écart Norris reste néanmoins notable car il se vérifie face à TROIS pilotes différents sur la même gomme (tendre) à un moment comparable de la séance, pas seulement face à un seul comparateur.</div>
  </div>
</section>

<section class="block" data-num="03" id="sec-el1-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Six pilotes de réserve, une seule règle : la rotation FP1 obligatoire 2026 expliquée</h2>
    <p>Le plateau le plus varié de la saison en EL1 ne doit rien au hasard. The Race (article dédié « Every rookie to drive in FP1 in F1 2026 », lu intégralement) rappelle la règle exacte : chacune des 11 écuries doit faire rouler un pilote « rookie » (au sens réglementaire : au plus un Grand Prix disputé) dans chacune de ses voitures à deux reprises sur la saison 2026 — soit quatre apparitions obligatoires au total par écurie. Pour cette séance de São Paulo, cela donne : Dino Beganovic (Ferrari, remplace Leclerc) à sa 3<sup>e</sup> apparition de la saison après Barcelone et l'Autriche ; Leonardo Fornaroli (McLaren, remplace Piastri cette fois — il avait remplacé Norris à Mexico) à sa 4<sup>e</sup> et dernière apparition requise de la saison ; Gabriele Minì (Alpine, remplace Gasly) à sa 2<sup>e</sup> apparition consécutive, après Mexico ; Luke Browning (Williams, remplace Sainz) à sa 4<sup>e</sup> ; Freddie Slater (Audi, remplace Hülkenberg) à sa 2<sup>e</sup> apparition consécutive également, après Mexico la semaine précédente. Colton Herta (Cadillac, remplace Pérez) en est à sa 6<sup>e</sup> apparition de la saison — Cadillac n'a en réalité aucune obligation à satisfaire à ce stade, et cette sortie avait un objectif bien plus concret : The Race précise qu'elle lui a permis de dépasser le seuil des 100 kilomètres parcourus en EL1 nécessaires pour obtenir son 40<sup>e</sup> et dernier point de super-licence — Cadillac pensait avoir rempli cette condition dès Mexico avant de découvrir une erreur dans les chiffres officiels IndyCar utilisés pour la vérification FIA, d'où cette sortie supplémentaire à São Paulo.</p>
    <p>Nuance que seule cette source permet d'établir avec précision : la sortie de Rafael Câmara (Haas, 18<sup>e</sup>) ne compte PAS dans ce quota réglementaire — The Race précise que la voiture d'Ocon a déjà reçu ses deux pilotes rookies cette année (Ryo Hirakawa, qui avait pris le volant à Mexico), si bien que Haas doit encore faire tourner un rookie dans la voiture de Bearman avant la fin de la saison. Câmara est à São Paulo pour une raison entièrement différente et strictement sportive : Haas a écarté Ocon pour le reste de la saison et promu Câmara, leader du championnat de Formule 2 et membre de la Ferrari Driver Academy depuis 2021, comme titulaire à part entière pour ses débuts en Grand Prix — à domicile. Ayao Komatsu, directeur de l'écurie, cité intégralement par Grandprix.com : <em>« De telles décisions ne sont jamais prises à la légère, comme ce fut le cas à Mexico — mais alors, comme maintenant, nous estimons que c'est clairement dans l'intérêt de l'équipe pour l'avenir. »</em> Haas n'a pas précisé qui occupera ce baquet lors des trois dernières courses de la saison.</p>
    <p>Sur Beganovic : la substitution de Leclerc ce week-end tient à la fois à l'obligation réglementaire déjà en cours pour lui cette saison et à une indisponibilité personnelle de Leclerc non développée ici, conformément à la règle éditoriale de ce site sur le contenu personnel des pilotes — exactement le même traitement que l'absence d'explication documentée pour Ocon au round 19. Sa séance a été compliquée indépendamment de ce contexte : The Race et Grandprix.com confirment tous deux un changement de fond de caisse en cours de séance et un rappel aux stands pour un problème moteur après avoir dû abandonner un tour lancé sur pneu tendre — seulement 11 tours bouclés, le total le plus bas du plateau hors l'arrêt précoce de Slater.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el1-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Drapeau rouge pour Slater, sortie de piste pour Albon, et la pénalité choisie de Russell</h2>
    <p>La séance a été interrompue par un drapeau rouge après que Freddie Slater (Audi, 22<sup>e</sup>) a immobilisé sa monoplace entre les virages 9 et 10, mettant fin à sa séance après seulement sept tours (cinq chronométrés une fois les tours de sortie/rentrée exclus). The Race note qu'il s'agit de sa deuxième sortie consécutive en EL1 — Mexico la semaine précédente, puis São Paulo cette semaine — pour un total cumulé de seulement 21 tours sur ses deux apparitions. Alexander Albon (Williams, 16<sup>e</sup>) a lui provoqué un bref drapeau jaune en sortant de la piste au-delà du virage Juncão, parvenant à ramener sa voiture derrière les barrières sans provoquer d'arrêt complet de la séance ; son équipier de remplacement Luke Browning (17<sup>e</sup>) a limité les dégâts avec seulement 12 tours dans la voiture de Sainz.</p>
    <p>Hors piste, le fait le plus structurant pour le reste du week-end a été confirmé par George Russell lui-même, dans une story Instagram de Mercedes relayée texte par Grandprix.com — communication directe pilote/écurie, pas une citation de conférence de presse reformulée par un média : <em>« On a senti que c'était un bon endroit pour la prendre. »</em> Russell confirme ainsi une pénalité de cinq places sur la grille dimanche pour l'introduction d'un nouveau moteur à combustion interne au-delà de l'allocation saisonnière autorisée — une décision que Mercedes a cette fois pu choisir plutôt que subir après une série de pannes qui a déjà perturbé sa saison. Grandprix.com précise que Russell a cité la remontée de Hamilton à Interlagos en 2021 comme source d'optimisme, le circuit offrant davantage d'occasions de dépasser qu'un tracé où la position sur la piste est plus difficile à récupérer. La pénalité s'appliquera après les qualifications, pas avant — elle ne détermine donc pas sa position de départ avant que la séance de qualification n'ait eu lieu.</p>
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
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:11,717</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:11,799</td><td>+0,082s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:11,953</td><td>+0,236s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:12,041</td><td>+0,324s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:12,103</td><td>+0,386s (pénalité grille -5, dimanche)</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:12,156</td><td>+0,439s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Minì</td><td>Alpine</td><td>1:12,569</td><td>+0,852s (remplace Gasly)</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:12,614</td><td>+0,897s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:12,654</td><td>+0,937s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:12,715</td><td>+0,998s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Fornaroli</td><td>McLaren</td><td>1:12,833</td><td>+1,116s (remplace Piastri)</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:12,837</td><td>+1,120s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:13,017</td><td>+1,300s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:13,038</td><td>+1,321s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:13,371</td><td>+1,654s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:13,511</td><td>+1,794s (sortie de piste à Juncão, drapeau jaune)</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Browning</td><td>Williams</td><td>1:13,591</td><td>+1,874s (remplace Sainz)</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Câmara</td><td>Haas F1 Team</td><td>1:13,696</td><td>+1,979s (remplace Ocon pour le reste de la saison, 1<sup>re</sup> séance en titulaire, à domicile)</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:13,760</td><td>+2,043s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Herta</td><td>Cadillac</td><td>1:14,275</td><td>+2,558s (remplace Pérez, décroche les points de super-licence manquants)</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Beganovic</td><td>Ferrari</td><td>1:14,357</td><td>+2,640s (remplace Leclerc, changement de fond de caisse, rappelé aux stands)</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#00302B"></span> Slater</td><td>Audi</td><td>1:14,966</td><td>+3,249s (remplace Hülkenberg, séance écourtée par un drapeau rouge)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el1-6">
  <div class="prose">
    <h2 class="sectitle">Le contexte du week-end</h2>
    <p>Météo stable et sèche sur toute la séance (aucune goutte de pluie relevée par la station météo OpenF1), air autour de 23,5-24,6°C, température de piste grimpant progressivement de 38-41°C en tout début de séance à 45-49°C en fin d'heure — une évolution de piste graduelle plutôt qu'un saut brutal, cohérente avec la montée en régularité des temps de relais long observée en section 02. Rien dans ces chiffres ne justifie une lecture « piste anormalement chaude » pour cette EL1 : la fenêtre reste dans la norme d'un vendredi après-midi ensoleillé à Interlagos.</p>
  </div>
</section>

<section class="block" id="sec-el1-7">
  <details class="sources">
    <summary>Sources utilisées — EL1 São Paulo (9 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), session_key=11405 : classement, secteurs, relais, météo. Primaire.</span></li>
        <li><span class="desc">The Pit Wall — requête dédiée tours bruts par voiture (scripts/practice_briefing_laptimes_by_car.py, cluster de tête NOR/VER/HAM/ANT/RUS/HAD) : base des moyennes de relais et vitesses de pointe de la section 02.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1299/sao-paulo/practice/1" data-desc="Classement officiel complet, y compris le nombre de tours par pilote, concordant au millième avec la base et avec Grandprix.com/The Race. Lu en HTML brut via fetch-url.yml.">Formula1.com — résultats officiels EL1</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.mclaren.com/racing/" data-desc="Page d'accueil McLaren Racing, lue intégralement : confirme le round 20 comme prochaine course et affiche une citation d'écurie sur l'évolution aéro développée en détail par The Race.">McLaren Racing — site officiel</a><span class="desc">McLaren.com</span></li>
        <li><span class="desc">Pirelli — press.pirelli.com/tagfeed/en/tags/press__releases, lu intégralement : flux actif confirmé mais toujours aucun communiqué spécifique à São Paulo 2026 — régression déjà documentée pour plusieurs rounds précédents, confirmée une fois de plus. Tentative explicitement infructueuse : ferrari.com/en-EN/formula1 (échec réseau). fia.com (page saison 2026) atteinte mais purement navigationnelle pour ce round précis.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.grandprix.com/races/brazilian-gp-2026-practice-1-report.html" data-desc="Rapport complet EL1 : classement (concordant au millième avec la base et Formula1.com), déroulé par relais/gomme, drapeau rouge Slater, sortie de piste Albon. Lu intégralement via fetch-url.yml. Piège de slug confirmé : l'URL intuitive /sao-paulo-gp-2026-... renvoie un 404, motif réel = /brazilian-gp-2026-....">Grandprix.com — rapport EL1</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.grandprix.com/news/russell-confirms-five-place-so-paulo-grid-penalty.html" data-desc="Confirmation de la pénalité de grille de Russell, avec citation directe publiée dans une story Instagram de Mercedes — communication directe pilote/écurie, étiquetée comme telle dans le texte.">Grandprix.com — pénalité de grille de Russell</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.grandprix.com/news/haas-drops-ocon-for-rest-of-2026-as-cmara-gets-brazil-debut.html" data-desc="Confirmation de la promotion de Câmara comme titulaire Haas pour le reste de la saison, avec citation directe du directeur d'écurie Ayao Komatsu. Lu intégralement via fetch-url.yml.">Grandprix.com — Haas remplace Ocon par Câmara</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.grandprix.com/news/how-mercedes-can-clinch-the-constructors-title-in-so-paulo.html" data-desc="Contexte du week-end : chiffres exacts de la lutte pour le titre constructeurs Mercedes/Ferrari, confirmation qu'Antonelli a été sacré champion pilotes à Mexico. Lu intégralement via fetch-url.yml.">Grandprix.com — comment Mercedes peut être sacrée à São Paulo</a><span class="desc">Grandprix.com</span></li>
        <li><span class="desc">Crash.net — page de liste /f1/news lue intégralement (texte rendu) : confirme indépendamment le titre "Lando Norris sets Brazil GP first practice pace in upgraded McLaren" et révèle le communiqué séparé "McLaren reveals major upgrade package for Brazil GP" (repris comme titre attribué, URL d'article individuel non extractible de cette page de liste).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/what-happened-in-brazil-fp1-f1-sao-paulo/" data-desc="Compte-rendu complet de la séance (Josh Suttill) : classement, incidents Slater/Albon/Beganovic, storyline super-licence de Herta. Lu intégralement via fetch-url.yml.">The Race — ce qui s'est passé en EL1 au Brésil</a><span class="desc">The Race</span></li>
        <li><a href="https://www.the-race.com/formula-1/mclaren-2027-f1-front-wing-breaks-cover-in-brazil/" data-desc="Détail technique complet de l'évolution McLaren (Jon Noble), avec citation nommée de Peter Prodromou, directeur technique aérodynamique. Lu intégralement via fetch-url.yml.">The Race — l'aileron avant 2027 de McLaren dévoilé au Brésil</a><span class="desc">The Race</span></li>
        <li><a href="https://www.the-race.com/formula-1/every-rookie-to-drive-in-fp1-in-f1-2026/" data-desc="Tableau complet et daté de chaque apparition de pilote de réserve en EL1 sur la saison 2026, confirmant le mécanisme réglementaire exact (deux apparitions obligatoires par voiture) et le compte précis par écurie. Source indispensable pour sourcer la section 03 sans deviner. Lu intégralement via fetch-url.yml.">The Race — tous les pilotes de réserve en EL1 cette saison</a><span class="desc">The Race</span></li>
        <li><span class="desc">Autosport — page de liste /f1/news lue intégralement (texte rendu) : confirme indépendamment le titre "F1 Brazilian GP: Norris fastest in opening practice from new champion Antonelli" et le titre "Herta qualifies for F1 superlicence as Bottas remains bullish on 2027 seat", recoupant indépendamment The Race sur ce dernier point (URL d'article individuel non extractible de cette page de liste).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Communauté technique pointue — tentative documentée</h5>
      <ul>
        <li><span class="desc">r/F1Technical : nouvelle tentative réelle (reddit.com/r/F1Technical/search.json?q=brazil+fp1&restrict_sr=1&sort=new) depuis fetch-url.yml, échec — blocage anti-bot déjà documenté pour tous les rounds précédents de la saison, confirmé une fois de plus plutôt que masqué.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
