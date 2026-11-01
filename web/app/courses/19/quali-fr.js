// Analyse Qualifications — Grand Prix de Mexico (Autódromo Hermanos Rodríguez),
// round 19, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py
// --session "Qualifying"), session_key=11400, 2026-10-31 21:00->22:00 UTC,
// vérifiée directement depuis la base via scripts/practice_briefing.py (366
// lignes practice_laps, 111 practice_stints, 83 practice_weather, 22 pilotes).
// Point de méthode déjà documenté pour les rounds précédents, et illustré ici
// par TROIS écarts concrets entre le classement brut par meilleur temps sur
// l'heure et le classement officiel par phase Q1/Q2/Q3 : (1) Norris — meilleur
// tour brut en base 1:16,728, mais sa ligne officielle de qualification est
// 1:16,824 parce que son 1:16,728 a été signé en Q2, pas en Q3 (la Q3 ne
// retient que les tours de Q3 pour son top 10, même plus lents) ; (2) Bearman
// — meilleur tour brut en base 1:17,847, mais sa ligne officielle est 1:18,083
// parce que ce tour plus rapide a été supprimé pour limites de piste au
// virage 12 (la base OpenF1 de ce schéma ne porte pas de drapeau de
// suppression, elle garde le temps chronométré brut) ; (3) Sainz — meilleur
// tour brut en base 1:18,521 (signé en Q1), mais sa ligne officielle de Q2 est
// 1:18,885 parce qu'il n'a pas amélioré en Q2 et que le classement de phase ne
// reprend pas le temps d'une phase précédente. Ces trois écarts sont vérifiés
// par recoupement direct avec DEUX sources externes lues intégralement via
// fetch-url.yml (Grandprix.com et The Race), qui donnent toutes les deux les
// mêmes temps officiels par pilote et par phase.
//
// Analyse technique quantifiée : requête dédiée tour par tour sur les six
// premiers contenders (scripts/practice_briefing_laptimes_by_car.py --cars
// 44:HAM 63:RUS 16:LEC 3:VER 12:ANT 1:NOR), permettant de retrouver, tour par
// tour, les secteurs exacts du tour qui a décidé la pole (Hamilton 1:16,514 —
// S1 26,852/S2 30,030/S3 19,632 — contre Russell 1:16,523 — S1 26,877/S2
// 30,008/S3 19,638 : Hamilton gagne 0,025s en S1 et 0,006s en S3, en perd
// 0,022s en S2, pour un solde net de 0,009s, qui est EXACTEMENT l'écart
// officiel). Tour théorique optimal calculé à partir des minimums individuels
// de secteur déjà en base (meilleur S1 de la séance : Verstappen, tour 7 ;
// meilleur S2 : Russell, tour 21 ; meilleur S3 : Leclerc, tour 23) : 1:16,300,
// soit 0,214s sous la pole réelle. Composés de pneus lus directement dans
// practice_stints : fait à signaler, les 22 pilotes ont disputé l'intégralité
// de la séance sur pneu tendre (SOFT), aucun n'a tenté une approche medium en
// Q1 comme Antonelli/Russell l'avaient fait à Austin deux semaines plus tôt.
// Vitesses de pointe (speed_st) dans la fourchette déjà observée sur les
// trois essais libres du week-end (346-350 km/h), aucune donnée inventée.
//
// Sourcing élargi (passe demandée explicitement par l'utilisateur après une
// plainte sur le manque de rigueur et de profondeur technique des articles,
// au minimum 4 sites indépendants dont 2 généralistes et 2 techniques) :
// - Formula1.com (officiel) : DEUX tentatives, résultats de qualification
//   (/en/results/2026/races/1298/mexico/qualifying, HTTP 200 mais contenu
//   tronqué à 60000 caractères sur 444965 avant d'atteindre les données de
//   pilotes — coquille d'application React, même limite déjà documentée pour
//   les rounds précédents) ET grille de départ (/en/results/2026/races/1298/
//   mexico/starting-grid, HTTP 200, 363827 octets, même limite de troncature
//   avant les données). Aucune des deux n'a livré de temps ou de grille
//   exploitable directement cette session — limite de sourcing documentée
//   honnêtement plutôt que masquée, compensée par Grandprix.com et The Race.
// - Pirelli (institutionnel) : press.pirelli.com/tagfeed/en/tags/press__releases
//   relu intégralement une QUATRIÈME fois pour ce round, toujours aucune
//   entrée spécifique au Mexique 2026 (dernière entrée visible : 12 juin
//   2026) — régression confirmée pour la quatrième séance consécutive de ce
//   round, pas un incident isolé.
// - Ferrari (écurie qui boucle sa meilleure séance du week-end, pole +
//   3e place) : ferrari.com/en-EN/formula1/news, tentative réelle, échec HTTP
//   403 Forbidden — même blocage explicite que celui déjà documenté pour
//   l'EL1 de ce round. Aucune communication directe pilote/écurie trouvée sur
//   un canal propre, malgré le sujet idéal (première pole Ferrari de la
//   saison).
// - McLaren (seule écurie avec une voiture éliminée en Q2 pour la première
//   fois en deux ans) : mclaren.com/racing/ relu intégralement, site actif
//   mais sans aucun contenu nouveau propre à cette qualification — toujours la
//   même actualité pré-week-end sur Piastri déjà utilisée pour l'EL3 de ce
//   round. Documenté honnêtement comme absence de nouveau contenu, pas comme
//   un échec technique.
// - Racing Bulls (écurie de Lawson, désormais sous le coup d'une pénalité de
//   grille ET d'une instruction pour infraction technique) : visacashapprb.com
//   /int-en/news répond normalement mais ne contient toujours que l'annonce
//   FP1 de Tsolov déjà connue — même retard de publication déjà documenté
//   pour l'EL2/EL3 de ce round, confirmé une troisième fois.
// - Grandprix.com (généraliste n°1) : rapport complet de qualification
//   (« Hamilton's first Ferrari pole ends three-year wait and lifts record to
//   105 »), lu intégralement via fetch-url.yml — déroulé complet des trois
//   phases, citations directes de Russell et Leclerc, détail du drapeau rouge
//   Alonso en Q1. Source la plus détaillée sur le déroulé phase par phase.
// - Crash.net (généraliste n°2) : page de liste /f1/news lue intégralement
//   (brut, HTML complet cette fois), confirme indépendamment le titre
//   « Lewis Hamilton 'lost for words' after claiming historic 105th pole
//   position » et révèle l'existence d'une « F1 2026 Mexico Grand Prix
//   starting grid after penalties » ainsi qu'une clarification des commissaires
//   sur les règles de comportement en duel roue-à-roue avant la course —
//   reprise en section prédiction. URLs d'articles individuels non
//   extractibles depuis cette page de liste, limite déjà documentée pour ce
//   domaine ; titres repris comme tels, pas comme citations vérifiées.
// - The Race (technique/analytique n°1) : QUATRE articles complets lus
//   intégralement via fetch-url.yml, slugs retrouvés depuis le HTML brut de la
//   page d'accueil (hrefs exacts, pas devinés) — « Hamilton takes his first
//   grand prix pole for Ferrari in Mexico » (Jack Benyon, classement complet
//   par phase, concordant au millième avec la base et Grandprix.com),
//   « F1 2026 Mexican Grand Prix starting grid with Verstappen penalty »
//   (grille provisoire chiffrée, révèle la pénalité de 50 places de Bottas
//   pour changement de composants), « Lawson at risk of Mexico qualifying
//   DSQ » (Scott Mitchell-Malm, 1er nov. — explication technique détaillée de
//   l'infraction MGU-K alléguée, décision des commissaires PAS encore connue
//   au moment de la rédaction) et « What F1 teams have done to tackle
//   Mexico's altitude challenge » (Gary Anderson — comparatif technique des
//   sorties de refroidissement des quatre meilleures écuries, Red Bull décrite
//   comme ayant fait le moins de changements).
// - Autosport (technique/analytique n°2) : page de liste f1/news lue
//   intégralement, confirme indépendamment le titre « F1 Mexico GP: Hamilton
//   takes pole from Russell and Leclerc » — recoupement supplémentaire, pas de
//   citation nouvelle au-delà du titre, URL d'article non capturée depuis
//   cette liste.
// - r/F1Technical (communauté technique pointue) : nouvelle tentative réelle
//   (reddit.com/r/F1Technical/search.json?q=mexico+qualifying&restrict_sr=1&
//   sort=new) depuis fetch-url.yml, échec identique — HTTP 403 « Blocked ».
//   SIXIÈME semaine consécutive de blocage stable et reproductible pour ce
//   projet, documenté plutôt que contourné par une invention de contenu.
// - WebSearch n'a été utilisé à aucun moment pour sourcer un fait, conforme à
//   la règle déjà documentée dans docs/SOURCES.md.
//
// Zéro contenu « people » : plusieurs titres disponibles ce jour-là (la
// tension/santé d'Antonelli, le différend Ocon/Haas et la question de
// violence, l'incident de paddock Hadjar, le statut « not ill » d'Ocon évoqué
// par The Race) ont été délibérément écartés de cet article — aucun rapport
// avec la performance ou la technique de cette qualification précise, et
// plusieurs relèvent explicitement du contenu personnel/hors-piste que la
// règle éditoriale exclut.
export const ROUND19_QUALI_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Mexico · Autódromo Hermanos Rodríguez · Qualifications — samedi 31 octobre</p>
    <p class="verdict">Lewis Hamilton met fin à plus de trois ans sans pole position et signe la première pole Ferrari de la saison — mais par la marge la plus fine de tout le week-end, neuf millièmes de seconde sur Russell, et alors que Leclerc, donné en forme sur trois séances d'essais sur quatre, ne décroche que la troisième place.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">Pole</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">1:16,514</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,009s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,119s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,178s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,193s</span></div>
    </div>
    <p class="subverdict">À 41 ans, Hamilton devient le plus vieux pilote à décrocher une pole position depuis Mario Andretti en 1982, porte son propre record à 105 poles, et met fin à une attente ouverte en Hongrie 2023 avec Mercedes — un retournement complet après la panne moteur qui avait écourté son EL2 vendredi. Mais la pole n'est que la moitié de l'histoire de cette séance : un drapeau rouge en Q1 pour Fernando Alonso (problème de pression d'eau lié à l'ERS, après qu'il eut lui-même été provisoirement le plus rapide), une élimination surprise d'Oscar Piastri en Q2 — une première pour lui en deux ans — et un nouveau dossier Racing Bulls qui s'ouvre juste après la pénalité de grille déjà connue de Liam Lawson : son équipe est convoquée chez les commissaires pour une infraction technique sur le MGU-K relevée juste après son tour de Q2, qui pourrait le disqualifier purement et simplement de la séance. Sur le fond sportif, la théorie d'un avantage turbo Ferrari née en EL1 ressort de cette qualification nuancée plutôt que confirmée ou enterrée : Ferrari place deux voitures dans le top 3, sa meilleure session du week-end, mais c'est Hamilton — pas Leclerc, donné devant sur trois séances consécutives — qui signe la pole, par une marge microscopique sur une Mercedes.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-q-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Q1 — le drapeau rouge d'Alonso, Hamilton pose le repère</h2>
    <p>La séance s'ouvre sur une incertitude du côté d'Aston Martin : Fernando Alonso, provisoirement le plus rapide avant même que les grosses écuries n'aient posé un temps, doit stopper sa voiture dans la section stadium pour un problème de pression d'eau lié à l'ERS, provoquant un drapeau rouge à environ 11 minutes du terme. « On a perdu une grosse occasion », a-t-il dit après la phase, ajoutant que « la frustration est au-delà de l'imaginable » — des propos relayés par The Race après qu'il eut, selon la même source, frappé son volant de rage. Alonso termine 18<sup>e</sup> (1:18,908), devant son propre coéquipier Lance Stroll, 20<sup>e</sup>.</p>
    <p>Après la reprise, Hamilton abaisse le repère à 1:17,341, Isack Hadjar (1:17,385) revenant d'une erreur initiale pour se classer deuxième, Leclerc (1:17,506) troisième. Hamilton fait ensuite l'objet d'une enquête pour tours lents en Q1, dont il est blanchi. Le combat le plus serré se joue au couperet : les deux Williams terminent de part et d'autre de la limite, Carlos Sainz (1:18,521) passant de justesse tandis qu'Alex Albon (1:18,630) — désormais 15 contre 4 dans le duel de qualification face à son coéquipier cette saison — reste à la porte, 17<sup>e</sup>. Ryo Hirakawa (1:18,958), qui dispute sa première qualification en Formule 1 à la place d'Esteban Ocon, prend la 19<sup>e</sup> place ; Sergio Pérez (1:19,105) devance Valtteri Bottas (1:19,852) dans le duel Cadillac à domicile du Mexicain.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-q-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Q2 — Norris le plus rapide de la séance, Piastri éliminé pour la première fois en deux ans</h2>
    <p>Leclerc ouvre le bal en Q2 avec 1:16,944, suivi de près par Lindblad, avant que Verstappen ne prenne l'avantage en 1:16,876. Hamilton et Norris compromettent tous les deux leur première tentative par un blocage de roues au virage 13 ; Hamilton s'en sort sur un train de pneus tendres neufs, et Norris fait de même — pour mieux frapper fort ensuite : son tour en 1:16,728 referme la session comme la référence absolue de la phase, plus rapide que tout ce qui sera signé en Q3 par la suite (voir note de méthode en tête de fichier). Lawson (1:17,207) délivre pendant ce temps le tour tardif qui repousse Hülkenberg hors du top 10.</p>
    <p>Mais McLaren perd sa deuxième voiture : Oscar Piastri (1:17,646), qui avait semblé compétitif en Q1, est éliminé en 13<sup>e</sup> position après avoir réutilisé le même train de pneus tendres sur ses deux relais plutôt que d'en monter un neuf — une première pour lui en qualification depuis Mexico 2024, selon The Race. Il évoque un manque d'adhérence arrière. Hülkenberg (1:17,306) referme le top 11 pour Audi, devant Colapinto (1:17,640), Piastri lui-même, puis Bortoleto (1:17,680) et un Bearman auteur d'un tour plus rapide (1:17,847) mais supprimé pour limites de piste au virage 12, le reclassant 15<sup>e</sup> avec 1:18,083. Sainz (1:18,885), incapable d'améliorer sa propre marque de Q1, ferme la phase en 16<sup>e</sup>.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-q-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Q3 — Hamilton devance Russell pour neuf millièmes, Leclerc trébuche une troisième fois au virage 10</h2>
    <p>La piste, qui est passée d'environ 47°C à près de 38°C en température selon The Race au fil de la qualification (la série météo de la base, elle, enregistre un refroidissement allant de 49,0°C à 44,5-44,9°C sur la portion de séance capturée — deux mesures qui pointent dans la même direction sans se recouper exactement, l'écart s'expliquant vraisemblablement par la prolongation de séance liée au drapeau rouge d'Alonso), complique la mise en température des pneus pour un tour lancé isolé. Avec Piastri déjà éliminé, la lutte pour la pole oppose Ferrari, Red Bull, Mercedes et Norris. Leclerc frappe le premier avec 1:16,647 ; Verstappen n'est qu'à 0,045s, Norris suit, tandis que Hamilton perd du temps dans le secteur médian et accuse d'abord plus de quatre dixièmes de retard sur son propre coéquipier.</p>
    <p>Les derniers relais renversent tout. Russell franchit la ligne en 1:16,523 pour prendre la pole provisoire — avant que Hamilton ne réponde neuf millièmes plus vite, quelques instants plus tard. Russell a été plus rapide dans le secteur médian, mais les gains de Hamilton dans le premier et le dernier secteur ont suffi à faire la différence (détail quantifié en section 04). Russell lui-même reconnaît après la séance qu'un tour de préparation plus appuyé lui a donné la confiance nécessaire pour attaquer, tout en admettant que « le taux de réussite est encore trop faible pour l'instant » avec sa Mercedes. Leclerc ne peut pas répondre : il améliore à 1:16,633 mais reste troisième, à 0,119s de la pole, après avoir de nouveau glissé au virage 10 — le même point de piste qui lui avait déjà coûté son premier relais tendre en EL3 la veille. « Je n'ai simplement pas fait un bon travail », a-t-il reconnu. Verstappen (1:16,692) bloque ses roues au virage 13 et abandonne sa dernière tentative, se classant quatrième ; Antonelli (1:16,707) prend la cinquième place, Norris (1:16,824) — qui abandonne lui aussi son ultime tour — la sixième, devant Hadjar (1:16,900), également touché par un blocage au virage 13. Lawson (1:17,029) et Lindblad (1:17,117) placent les deux Racing Bulls dans le top 9, Gasly (1:17,153) complétant le top 10 pour Alpine. Hadjar reçoit un avertissement pour avoir franchi la ligne d'entrée des stands, et Sainz pour ne pas avoir suivi les instructions de la voie d'évitement — aucune des deux décisions ne change le classement.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-q-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Les dixièmes qui ont décidé la pole — et ce qu'ils disent (enfin) du turbo Ferrari</h2>
    <p>Requête dédiée tour par tour sur les six premiers contenders (scripts/practice_briefing_laptimes_by_car.py), permettant de retrouver les secteurs exacts du tour qui classe chaque pilote :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>S1</th><th>S2</th><th>S3</th><th>Tour</th><th>Écart pole</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>26,852</td><td>30,030</td><td>19,632</td><td>1:16,514</td><td>—</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>26,877</td><td>30,008</td><td>19,638</td><td>1:16,523</td><td>+0,009s</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>26,901</td><td>30,208</td><td>19,524</td><td>1:16,633</td><td>+0,119s</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>26,848</td><td>30,237</td><td>19,607</td><td>1:16,692</td><td>+0,178s</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>26,876</td><td>30,173</td><td>19,658</td><td>1:16,707</td><td>+0,193s</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>26,869</td><td>30,220</td><td>19,735</td><td>1:16,824</td><td>+0,310s</td></tr>
      </tbody>
    </table>
  </div>
  <div class="prose">
    <p>Le duel pour la pole se lit exactement comme Grandprix.com et The Race le décrivent, chiffres à l'appui : Hamilton gagne 0,025s sur Russell dans le premier secteur et 0,006s dans le dernier, mais en perd 0,022s dans le secteur médian — pour un solde net de 0,009s, qui est à l'unité près l'écart officiel. En assemblant le meilleur secteur individuel de toute la séance (S1 de Verstappen au tour 7, 26,768 ; S2 de Russell au tour 21, 30,008 ; S3 de Leclerc au tour 23, 19,524), le tour théorique optimal s'établit à 1:16,300 — 0,214s sous la pole réelle de Hamilton. Aucun pilote n'a assemblé le tour parfait ; chacun n'en détient qu'un fragment.</p>
    <p>Sur la question qui traverse ce week-end depuis l'EL1 — l'avantage turbo supposé de Ferrari à l'altitude de Mexico — cette qualification livre un verdict nuancé plutôt qu'un point final. Ferrari place deux voitures dans le top 3, sa meilleure séance du week-end en termes de résultat collectif, ce qui va dans le sens de la théorie initiale de Russell en EL1. Mais l'écart s'est effondré de plus de six dixièmes en EL1 à quelques centièmes ou millièmes ce samedi, et c'est Hamilton — pas Leclerc, qui avait eu l'avantage sur trois séances consécutives (EL1, EL2 en rythme long, puis de nouveau en tête des essais Q3 avant son erreur) — qui signe la pole, devancé en vitesse de pointe par rien de spécifique à son propre châssis (346-350 km/h pour l'ensemble du plateau, dans la fourchette déjà observée tout le week-end, section confirmée mais sans rien de neuf à en tirer). Le turbo compact de Ferrari n'explique donc pas tout : l'exécution du tour, secteur par secteur, compte au moins autant.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-q-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Pénalités de grille : Verstappen et Lawson déjà sanctionnés, Lawson désormais menacé de disqualification</h2>
    <p>Les deux pénalités d'une place déjà connues depuis l'EL3 (accrochage Verstappen/Lawson du vendredi) s'appliquent normalement à la grille : Verstappen recule de la 4<sup>e</sup> à la 5<sup>e</sup> place, Antonelli profitant du recul pour avancer de la 5<sup>e</sup> à la 4<sup>e</sup> — une voiture championne du monde potentielle qui se retrouve ainsi, mécaniquement, en deuxième ligne de grille. Lawson, lui, devait initialement reculer de la 8<sup>e</sup> à la 9<sup>e</sup> place pour la même raison, Lindblad avançant symétriquement en 8<sup>e</sup>. Mais un second dossier, bien plus lourd, s'est ouvert juste après son tour de Q2 : Racing Bulls a été convoquée chez les commissaires pour une infraction alléguée aux règles complexes de déploiement de puissance du MGU-K — le délégué technique de la FIA, Jo Bauer, rapporte que « la demande de puissance maximale du pilote et la puissance électrique DC du [MGU-K] ont été réduites à des taux supérieurs à ce qui est permis ». The Race (Scott Mitchell-Malm) explique que ce type de rupture est normalement synonyme de disqualification pure et simple, et évoque un mécanisme de coupure instantanée du MGU-K (un mode de sécurité jamais prévu pour un usage régulier, qui verrouille ensuite le moteur électrique pendant une minute entière) déjà repéré chez Mercedes et chez Red Bull Ford Powertrains, le motoriste de Racing Bulls, plus tôt dans la saison.</p>
    <p>Point de rigueur à signaler explicitement, et non résolu au moment de la rédaction de cet article (publié le jour même de la course) : aucune décision des commissaires n'avait encore été annoncée. The Race écrit que Lawson « pourrait bientôt reculer carrément en fond de grille » si l'infraction est confirmée, ce qui ferait de lui un deuxième cas, après Bottas (pénalité de 50 places pour changement de composants moteur chez Cadillac, sans effet pratique puisqu'il était déjà dernier sur le temps), à s'élancer depuis l'arrière sans rapport avec son chrono réel en piste. La grille ci-dessous est donc présentée comme provisoire sur ce point précis, avec la réserve explicitement maintenue.</p>
  </div>
</section>

<section class="block" data-num="06" id="sec-q-6">
  <div class="sec-marker"><span class="n">06</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">06</span> Grille de départ complète (provisoire — décision des commissaires sur Lawson en attente)</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Grille</th><th>Pilote</th><th>Écurie</th><th>Temps de qualification</th><th>Écart / note</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:16,514</td><td>Pole (Q3) — 105<sup>e</sup> pole de carrière, 1<sup>re</sup> pour Ferrari</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:16,523</td><td>+0,009s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:16,633</td><td>+0,119s (glissade virage 10)</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:16,707</td><td>+0,193s en qualification ; avance en grille grâce à la pénalité de Verstappen</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:16,692</td><td>+0,178s en qualification ; recule d'un rang (pénalité EL2)</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:16,824</td><td>+0,310s (tour final abandonné)</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:16,900</td><td>+0,386s (blocage virage 13)</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:17,117</td><td>+0,603s en qualification ; avance en grille grâce à la pénalité de Lawson</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:17,029</td><td>+0,515s en qualification ; recule d'un rang (pénalité EL2) — ET sous le coup d'une instruction MGU-K pouvant entraîner une disqualification, décision non connue à l'heure de la rédaction</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:17,153</td><td>+0,639s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>1:17,306</td><td>Q2</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:17,640</td><td>Q2</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:17,646</td><td>Q2 (1<sup>re</sup> élimination avant Q3 en 2 ans, même train de pneus réutilisé)</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:17,680</td><td>Q2</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:18,083</td><td>Q2 (tour réel 1:17,847 supprimé, limites de piste virage 12)</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:18,885</td><td>Q2 (pas d'amélioration sur son temps de Q1, 1:18,521)</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:18,630</td><td>Q1</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:18,908</td><td>Q1 (problème ERS/pression d'eau, drapeau rouge)</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Hirakawa</td><td>Haas F1 Team</td><td>1:18,958</td><td>Q1 (débuts en qualification F1, à la place d'Ocon)</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:19,072</td><td>Q1</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>1:19,105</td><td>Q1 (week-end à domicile)</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:19,852</td><td>Q1 ; pénalité de 50 places pour changement de composants moteur (sans effet, déjà dernier)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
  <div class="prose">
    <div class="callout">Rappel de méthode : cette grille applique les deux pénalités d'une place déjà connues (Verstappen, Lawson — accrochage EL2) et note celle, sans effet pratique, de Bottas. Elle NE préjuge PAS de l'issue de l'instruction MGU-K ouverte contre Lawson, non tranchée au moment de la rédaction : si elle aboutit à une disqualification, la position 9 ci-dessus serait supprimée et chaque pilote derrière avancerait d'un rang, Lawson démarrant alors en fond de grille plutôt qu'en milieu de grille.</div>
  </div>
</section>

<section class="block" id="sec-q-7">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en course</h2>
    <p>Hamilton part en pole, mais Russell s'aligne directement derrière lui pour un chrono presque identique — l'écart de neuf millièmes ne survivra sûrement pas longtemps au premier freinage dimanche. Le vrai sujet de la grille est peut-être plus bas : Leclerc, troisième, part avec une Ferrari qui a dominé le rythme de relais long en EL1 mais qui s'est fait dépasser sur ce même indicateur par McLaren en EL2 — si cette hiérarchie de rythme tient la route, la troisième place de Leclerc au départ pourrait valoir plus que son retard en qualification ne le laisse penser, à condition de passer un premier tour propre là où il a déjà trébuché deux fois ce week-end (virage 10). Antonelli, promu en deuxième ligne par la pénalité de Verstappen, aborde ce dimanche avec la possibilité mathématique de être sacré champion du monde dès l'arrivée — une perspective déjà posée dès l'EL1 de ce round, désormais à quelques heures de se concrétiser ou non.</p>
    <p>Le dossier le plus incertain reste Lawson : si l'instruction MGU-K débouche sur une disqualification de ses temps de qualification, il s'élancerait en fond de grille plutôt qu'en milieu de grille, ce qui changerait la physionomie de toute la bataille du top 10 dès le premier tour — Lindblad, déjà promu en 8<sup>e</sup> position par la pénalité de vendredi, se retrouverait alors seul représentant Racing Bulls dans le groupe de tête. Crash.net signale par ailleurs qu'une clarification des commissaires sur les règles de comportement en duel roue-à-roue a été publiée avant la course — un rappel qui n'est pas anodin après l'accrochage Verstappen/Lawson qui a déjà coûté une pénalité de grille aux deux pilotes ce week-end. Enfin, côté Red Bull : Verstappen et Hadjar ont tous deux bloqué leurs roues au virage 13 en Q3, et Gary Anderson (The Race) note que Red Bull, contrairement à McLaren, Mercedes et Ferrari, n'a quasiment rien changé à ses sorties d'air de refroidissement pour cette altitude — une piste plausible mais non confirmée pour expliquer des freins visiblement à la peine, à surveiller sur la gestion d'un relais long dimanche.</p>
    <div class="callout">Rappel de méthode : la section 04 de cet article documente un tour théorique optimal (1:16,300) assemblé à partir des meilleurs secteurs individuels de la séance — à ne jamais lire comme un temps qu'un pilote aurait pu réellement boucler, seulement comme une mesure de la marge de progression éparpillée entre plusieurs voitures. Le verdict sur l'avantage turbo Ferrari reste lui aussi délibérément nuancé plutôt que tranché, conformément aux données des quatre séances de ce week-end.</div>
  </div>
</section>

<section class="block" id="sec-q-8">
  <details class="sources">
    <summary>Sources utilisées — Qualifications Mexico (7 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), session_key=11400 : classement, secteurs, relais, météo. Primaire.</span></li>
        <li><span class="desc">The Pit Wall — requête dédiée tours bruts par voiture sur les six premiers contenders (scripts/practice_briefing_laptimes_by_car.py --cars 44:HAM 63:RUS 16:LEC 3:VER 12:ANT 1:NOR) : base du tableau de secteurs et du tour théorique de la section 04, et des trois écarts bruts/officiel documentés en tête de fichier (Norris, Bearman, Sainz).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1298/mexico/qualifying" data-desc="Tentative directe : HTTP 200 mais contenu tronqué à 60000 caractères avant d'atteindre les données de pilotes (coquille d'application React) — aucun temps exploitable obtenu directement cette session, limite documentée plutôt que masquée.">Formula1.com — résultats officiels qualifications</a><span class="desc">Formula1.com, tentative sans contenu exploitable</span></li>
        <li><span class="desc">Formula1.com — page « Starting Grid » (/mexico/starting-grid), même tentative et même limite de troncature que la page de résultats.</span></li>
        <li><span class="desc">Pirelli — press.pirelli.com/tagfeed/en/tags/press__releases, relu intégralement une quatrième fois pour ce round : toujours aucune entrée spécifique au Mexique 2026 (dernière entrée visible : 12 juin 2026) — régression confirmée pour la quatrième séance consécutive.</span></li>
        <li><span class="desc">Tentative explicitement infructueuse et honnêtement documentée : ferrari.com/en-EN/formula1/news, HTTP 403 Forbidden — aucune communication directe pilote/écurie trouvée malgré la première pole Ferrari de la saison.</span></li>
        <li><span class="desc">Racing Bulls — visacashapprb.com/int-en/news, répond normalement mais ne contient toujours que l'annonce FP1 de Tsolov déjà connue, rien sur la qualification ni sur l'instruction MGU-K visant Lawson.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Écurie (communication directe) — tentative documentée</h5>
      <ul>
        <li><a href="https://www.mclaren.com/racing/" data-desc="Page d'accueil McLaren Racing relue intégralement : site actif mais sans aucun contenu nouveau propre à cette qualification, toujours la même actualité pré-week-end sur Piastri déjà utilisée pour l'EL3 de ce round — absence de nouveau contenu documentée honnêtement.">McLaren Racing — site officiel</a><span class="desc">McLaren.com, aucun contenu nouveau</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.grandprix.com/races/mexican-gp-2026-qualifying-report.html" data-desc="Rapport complet de qualification, déroulé des trois phases, citations de Russell et Leclerc, drapeau rouge Alonso. Concorde au millième avec la base et The Race. Lu intégralement via fetch-url.yml.">Grandprix.com — rapport de qualification</a><span class="desc">Grandprix.com</span></li>
        <li><span class="desc">Crash.net — page de liste /f1/news lue intégralement en HTML brut : confirme indépendamment le titre « Lewis Hamilton 'lost for words' after claiming historic 105th pole position » et révèle l'existence d'une grille post-pénalités et d'une clarification des commissaires sur le comportement en duel roue-à-roue, reprise en section prédiction. URLs d'articles individuels non extractibles depuis cette page de liste — limite déjà documentée pour ce domaine.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/hamilton-takes-first-ferrari-gp-pole-in-mexico/" data-desc="Classement complet par phase Q1/Q2/Q3 (concordant au millième avec la base et Grandprix.com), déroulé détaillé, record de Hamilton (41 ans, 105e pole, plus vieux poleman depuis Mario Andretti 1982). Lu intégralement via fetch-url.yml.">The Race — Hamilton décroche sa première pole Ferrari au Mexique</a><span class="desc">The Race (Jack Benyon)</span></li>
        <li><a href="https://www.the-race.com/formula-1/f1-2026-mexican-grand-prix-starting-grid-with-verstappen-penalty/" data-desc="Grille provisoire chiffrée avant l'affaire Lawson, révèle la pénalité de 50 places de Bottas pour changement de composants moteur. Lu intégralement via fetch-url.yml.">The Race — grille de départ avec la pénalité de Verstappen</a><span class="desc">The Race</span></li>
        <li><a href="https://www.the-race.com/formula-1/lawson-at-risk-of-mexico-qualifying-dsq/" data-desc="Explication technique détaillée de l'infraction MGU-K alléguée contre Lawson (citation du délégué technique FIA Jo Bauer), mécanisme de coupure instantanée déjà repéré chez Mercedes et Red Bull Ford Powertrains, décision des commissaires pas encore connue (article daté du 1er novembre). Lu intégralement via fetch-url.yml.">The Race — Lawson menacé de disqualification en qualification</a><span class="desc">The Race (Scott Mitchell-Malm)</span></li>
        <li><a href="https://www.the-race.com/formula-1/how-f1-teams-are-tackling-mexicos-altitude-challenge-in-2026/" data-desc="Comparatif technique des sorties de refroidissement de McLaren, Mercedes, Ferrari et Red Bull face à l'altitude mexicaine ; Red Bull décrite comme ayant fait le moins de changements. Lu intégralement via fetch-url.yml.">The Race — comment les écuries gèrent l'altitude mexicaine (Gary Anderson)</a><span class="desc">The Race</span></li>
        <li><span class="desc">Autosport — page de liste f1/news lue intégralement : confirme indépendamment le titre « F1 Mexico GP: Hamilton takes pole from Russell and Leclerc », recoupement supplémentaire sans citation nouvelle, URL d'article non capturée depuis cette liste.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Communauté technique pointue — tentative documentée</h5>
      <ul>
        <li><span class="desc">r/F1Technical : nouvelle tentative réelle (reddit.com/r/F1Technical/search.json?q=mexico+qualifying&restrict_sr=1&sort=new) depuis fetch-url.yml, échec identique — HTTP 403 « Blocked ». Sixième semaine consécutive de blocage stable et reproductible pour ce projet, aucun contenu de cette communauté n'a donc pu être exploité, signalé honnêtement plutôt que masqué.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
