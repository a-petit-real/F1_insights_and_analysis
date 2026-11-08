// Analyse Round 20 — Grand Prix de São Paulo (Autódromo José Carlos Pace,
// Interlagos), saison 2026. Clôt le round, après EL1/EL2/EL3/Qualifying
// (web/app/courses/20/el1-fr.js, el2-fr.js, el3-fr.js, quali-fr.js) : aucune
// contradiction volontaire avec leur contenu (évolution aéro exclusive
// McLaren et son érosion progressive EL1->EL2->EL3->Quali, pole de Norris —
// 3e consécutive à Interlagos, cascade de pénalités de grille déjà détaillée
// en Quali — Verstappen -30/fond de grille, Hamilton -75/fond de grille,
// Leclerc -10, Pérez -30/fond de grille, Russell -5 — correction Hülkenberg
// voiture n°27 reprise partout, jamais "98").
//
// *** DONNÉE MANQUANTE ET CONTOURNEMENT, documenté tel que demandé ***
// scripts/race_briefing.py (lancé via race-briefing.yml pour ce round, deux
// fois, dont une juste avant cette rédaction) renvoie des sections
// "RÉSULTATS" et "CLASSEMENT PILOTES" VIDES : ce script résout les pilotes
// par une jointure sur la table `results` (pipeline Jolpica), qui n'est pas
// encore peuplée pour ce round — même contournement déjà documenté pour les
// rounds 17/18/19. Vérifié directement (sortie vide, pas une supposition) :
// les sections "ARRÊTS AUX STANDS" et "PNEUS" du même script, qui joignent
// elles aussi sur `results`, sont vides pour la même raison. Seule la section
// "MÉTÉO" (résumé, sans jointure) a pu sortir une donnée réelle : air
// 15,60-16,70°C, piste 0,00-43,60°C, pluie confirmée (True), humidité
// 82,40-91,10% — concordant exactement avec le contexte météo donné en tête
// de tâche. lap_times/tyre_stints/race_control_messages sont bien peuplés
// (confirmé par ingest-openf1.yml, session_key=11412) : c'est
// scripts/race_briefing_laptimes_by_car.py (via race-briefing-laptimes-by-
// car.yml), qui résout les pilotes directement par NUMÉRO DE VOITURE sans
// jointure sur `results`, qui fournit toute la matière de rythme/relais de
// la section 03 ci-dessous — 10 voitures interrogées (NOR/VER/HAD/RUS/ANT/
// PIA/LEC/LAW/HAM/HUL, le podium plus le cluster McLaren/rivaux explicitement
// demandé). scripts/race_briefing_full_rcm.py (sans filtre, sans jointure)
// a fourni l'intégralité des 212 race_control_messages bruts, y compris les
// deux enquêtes en suspens détaillées ci-dessous et la confirmation qu'AUCUN
// message SAFETY CAR / VIRTUAL SAFETY CAR / RED FLAG n'apparaît nulle part
// dans cette course (recherche explicite sur ces trois motifs, aucune
// occurrence) — la lecture 0,00°C de piste relevée dans le résumé météo est
// donc un artefact de capteur isolé, PAS le signe d'une neutralisation
// drapeau rouge/voiture de sécurité qui n'a jamais eu lieu cette course,
// contrairement à ce que ce chiffre pourrait suggérer pris isolément.
// La classification officielle réelle (arrivée, grille, écarts, pénalités) a
// donc été obtenue en primaire via Formula1.com, Grandprix.com et The Race
// ci-dessous — jamais fabriquée à partir des comptes de tours de la base.
//
// *** STATUT DE LA CLASSIFICATION AU MOMENT DE LA RÉDACTION : PROVISOIRE,
// ET DEUX (EN RÉALITÉ TROIS) ENQUÊTES RESTENT OUVERTES — non tranchées,
// non deviné ***. La page Formula1.com de résultats officiels de la course
// (fetchée en HTML brut via fetch-url.yml juste après le drapeau à damier)
// porte elle-même la mention « * Provisional results. » en bas de tableau —
// exactement le même piège provisoire/définitif que celui déjà documenté
// pour le round 19 (pénalité Piastri), signalé ici plutôt que silencieusement
// traité comme définitif. Grandprix.com, dans son article de notes de course
// complet (lu intégralement, dernière ligne avant le flux "Other stories") :
// « The classification remains provisional, with Antonelli's pit release and
// the Leclerc-Lawson contact still awaiting resolution. Bearman and Leclerc
// are also summoned over an alleged unsafe release by Haas during the late
// pit stops. » The Race, dans son article collectif "Winners and losers"
// (lu intégralement, également publié le jour même) : « the stewards may
// still decide to take the seventh place Leclerc wrestled from Lawson back,
// to make things even worse. » Re-vérifié explicitement cette passe par un
// NOUVEAU fetch des pages d'accueil Grandprix.com et The Race (recherche de
// tout article de verdict publié depuis) ET des pages de liste Crash.net/
// Autosport (recherche de tout gros titre de décision) : AUCUNE des quatre
// sources ne liste, au moment de cette rédaction, un quelconque article
// rapportant l'issue des enquêtes Antonelli (relâché en zone rapide avec
// Colapinto approchant, renvoyée en examen après course) et Leclerc/Lawson
// (contact au virage 12, tour ~70, renvoyé en examen après course) — ni de
// la troisième affaire révélée par Grandprix.com (Bearman et Leclerc convoqués
// pour un possible relâchement dangereux chez Haas lors des arrêts tardifs).
// Les trois sont donc rapportées ici comme EN SUSPENS, sans résultat inventé,
// conformément à la consigne explicite de cette tâche — le classement de la
// section 04 reflète la grille telle que publiée par Formula1.com/The Race/
// Grandprix.com, marquée provisoire par sa source la plus officielle.
// Les deux pénalités de course déjà PURGÉES avant l'arrivée (Albon 5s pour
// un rejoint dangereux au virage 3, Hülkenberg 10s pour une sortie de piste
// avec avantage au virage 1) sont, elles, bien définitives et déjà intégrées
// au classement — confirmées par race_control_messages ("PENALTY SERVED")
// ET indépendamment par Grandprix.com/The Race.
//
// Analyse technique quantifiée (le cœur du travail de cette passe, répond
// directement à la question ouverte depuis l'EL1 : l'avantage de rythme long
// McLaren, déjà érodé EL1->EL2->EL3, se retrouve-t-il en course ?) : requête
// dédiée sur les tours bruts de 10 voitures (scripts/
// race_briefing_laptimes_by_car.py --cars 1:NOR 3:VER 6:HAD 63:RUS 12:ANT
// 81:PIA 16:LEC 30:LAW 44:HAM 27:HUL), analyse faite localement à partir de
// cette sortie (relais identifiés par les marqueurs [IN]/[OUT] de la table
// lap_times, pas par tyre_stints — cette dernière, agrégée par
// MIN(lap_number)/MAX(total_laps), produit ici des bornes de relais peu
// fiables, ex. "laps 17-17" pour un relais qui dure en réalité jusqu'au tour
// 48, donc écartée comme base de calcul cette passe, contrairement aux
// rounds précédents où elle était exploitable). Méthode identique au principe
// des rounds précédents : premier tour de chaque relais (tour de sortie de
// stand, tag OUT) toujours exclu, dernier tour (tag IN) exclu sauf s'il s'agit
// du tout dernier relais de la course pour ce pilote, puis tours restants
// > 103% de la médiane du relais écartés. Résultat central : sur les deux
// relais à gomme tendre disputés sur piste sèche (le cœur de la course, entre
// les deux phases d'intermédiaire), Norris (75,261s puis 73,762s de moyenne)
// n'est PAS le pilote le plus rapide du plateau — Russell (75,066s) et
// Antonelli (75,169s) le devancent sur le premier relais tendre, Piastri
// (73,274s) sur le second. L'avantage McLaren mesuré en EL1 (jusqu'à 1,6s/
// tour), déjà réduit en EL2/EL3, a donc fini par s'effacer complètement en
// course sur le pur rythme — Norris a gagné sur l'exécution (undercut d'un
// tour sur Antonelli, aucune erreur dans des conditions où ses rivaux en ont
// fait), pas sur une voiture plus rapide au tour. Point supplémentaire trouvé
// en croisant les relais bruts avec le récit média plutôt que repris tel
// quel d'une source : Russell et Leclerc n'ont disputé qu'UN seul relais de
// gomme tendre (tours 17-61) contre deux pour tous les autres pilotes du
// cluster — confirmé de façon totalement indépendante par The Race
// (« Russell... doing just one stint on slicks while most other drivers
// needed two sets before the late switch back to intermediates »), qui
// recoupe exactement ce que les bornes de relais isolaient déjà dans la base
// avant lecture de cet article.
//
// Sourcing élargi (minimum 4 sources indépendantes, 2 généralistes + 2
// technique/analytique, + institutionnel + communication directe pilote,
// conformément à docs/OPERATIONS.md et docs/SOURCES.md — la course, article
// le plus lu, vise plus large que le minimum absolu) :
// - Formula1.com (officiel) : page de résultats course complète
//   (formula1.com/en/results/2026/races/1299/sao-paulo/race-result), fetchée
//   deux fois (HTML brut puis texte nettoyé) via fetch-url.yml — titre de
//   page confirmé (« ... RACE RESULT »), mention « * Provisional results. »
//   explicitement présente (voir note de statut ci-dessus), ordre des images
//   pilotes préchargées dans le <head> cohérent au pilote près avec le
//   classement final donné par Grandprix.com/The Race (Norris, Verstappen,
//   Hadjar, Russell, Antonelli, Piastri, Leclerc, Lawson, Hamilton,
//   Hülkenberg, Lindblad, Alonso, Colapinto, Gasly, Albon, Bortoleto, Pérez,
//   Sainz, Stroll, Bottas — Bearman et Câmara absents de cette liste
//   d'images, cohérent avec leur absence de citation dans les 60000 premiers
//   caractères plutôt qu'une anomalie). Page /en/latest/all également
//   fetchée (brut puis texte) : confirme par ses propres titres « Norris
//   wins wet Sao Paulo GP thriller as Mercedes claim title » et « AS IT
//   HAPPENED: Norris wins Sao Paulo GP as Mercedes take Constructors' » —
//   pages d'articles individuelles non atteintes dans la fenêtre récupérée
//   (même limite déjà documentée pour ce domaine), titres repris comme
//   citations partielles correctement attribuées.
// - Grandprix.com (généraliste n°1) : notes de course complètes
//   (« Race Notes - Norris wins, Mercedes takes the title »), lues
//   intégralement via fetch-url.yml — la source la plus détaillée de loin :
//   déroulé tour par tour quasi complet (écarts chronométrés à plusieurs
//   points de course, chaque arrêt au stand daté au tour près, les deux
//   enquêtes en suspens explicitement signalées, le statut provisoire de la
//   classification, les points et classements pilotes/constructeurs après
//   course au point près). Page d'accueil (grandprix.com/) également
//   fetchée en brut, deux fois à quelques minutes d'écart, pour vérifier
//   l'apparition d'un éventuel article de verdict — aucun des deux passages
//   n'en liste un (voir note de statut).
// - Crash.net (généraliste n°2) : page de liste /f1/news lue intégralement
//   (texte rendu) — confirme indépendamment plusieurs titres : « Lewis
//   Hamilton reveals Ferrari radio confusion behind costly Brazil GP
//   mistake », « Lando Norris suffers Brazil GP mishap as podium celebration
//   goes wrong », « Toto Wolff reacts as Mercedes claim the constructors'
//   title at the Brazil Grand Prix », « New F1 championship standings after
//   the Brazil Grand Prix », « Mixed up Brazil GP starting grid after engine
//   penalties » — aucun titre de verdict d'enquête parmi les dix-huit
//   affichés (URL d'article individuel non extractible de cette page de
//   liste, limite déjà documentée pour ce domaine).
// - Autosport (technique/analytique n°1, pris comme généraliste
//   supplémentaire pour cette passe élargie) : page de liste /f1/news lue
//   intégralement — confirme indépendamment « Antonelli explains "weird"
//   spin and car instability which cost F1 Brazilian GP win » et « F1
//   Brazilian GP: Norris wins in mixed conditions, Mercedes clinch
//   constructors' title » ; aucun titre de verdict d'enquête non plus parmi
//   les titres affichés (même limite d'URL non extractible).
// - The Race (technique/analytique n°2) : DEUX articles complets lus
//   intégralement via fetch-url.yml (slugs retrouvés depuis les hrefs de la
//   page d'accueil the-race.com/formula-1/, fetchée deux fois) — le
//   compte-rendu complet (« Norris wins as Mercedes clinches title with a
//   scrappy race », Josh Suttill, avec le classement intégral chiffré des
//   22 engagés) et l'article collectif « Winners and losers from F1's 2026
//   Brazilian Grand Prix » (Josh Suttill/Scott Mitchell-Malm/Matt Beer/Ben
//   Anderson, analyse pilote par pilote avec citations directes de
//   conférence de presse, y compris la mention explicite que le verdict
//   Leclerc/Lawson restait ouvert à l'heure de la publication). Un troisième
//   lien de la page d'accueil (« f1-2026-brazilian-grand-prix-race-result »)
//   s'est avéré un slug de redirection pointant vers un ancien article de
//   qualifications (« George Russell knew he would not start... ») plutôt que
//   vers un compte-rendu de course distinct — signalé comme tel plutôt que
//   masqué, sans impact sur le reste du sourcing puisque les deux autres
//   articles The Race couvrent largement le même terrain.
// - Institutionnel : McLaren (mclaren.com/racing/, écurie victorieuse) lu
//   intégralement — actif, confirme le round et la pole de Norris
//   (« Qualifying threepeat »), mais AUCUN contenu daté spécifique au
//   résultat de la course lui-même dans la fenêtre récupérée (gap
//   institutionnel documenté comme tel, pas masqué, alors même qu'il s'agit
//   de l'écurie gagnante). Oracle Red Bull Racing (redbullracing.com/int-en,
//   double podium Verstappen/Hadjar) lu intégralement — actif, mais contenu
//   le plus récent daté du samedi (qualifications), rien sur la course.
//   Audi (audif1.com/en, meilleur résultat de grille de la saison pour
//   Hülkenberg) lu intégralement — actif, aucun contenu daté sur le point
//   marqué en course. Pirelli (press.pirelli.com/tagfeed/en/tags/
//   press__releases) relu intégralement une SIXIÈME fois pour ce round :
//   toujours aucune entrée spécifique à São Paulo 2026 — régression déjà
//   documentée pour l'EL1/EL2/EL3/Quali de ce round, confirmée une fois de
//   plus (le contenu le plus récent du flux reste un communiqué de
//   présentation des gommes 2026, daté de décembre 2025, sans rapport avec
//   ce Grand Prix). Mercedes (mercedesamgf1.com/en/news) : nouvel échec HTTP
//   404 explicite, même mode d'échec déjà documenté pour l'EL2/EL3 de ce
//   round — alors même que Mercedes est l'écurie qui remporte le titre
//   constructeurs ce dimanche, aucune communication institutionnelle
//   exploitable n'a pu être trouvée sur son propre domaine. FIA
//   (fia.com/system/files/decision-document/index.html, tentative réelle
//   pour retrouver un document de commissaires sur les deux enquêtes en
//   suspens) : échec HTTP 404 explicite, aucun document de décision
//   accessible par ce chemin pour cette session.
// - Communication directe pilote : DEUX tentatives réelles cette passe,
//   toutes deux infructueuses — instagram.com/mclaren (HTTP 429) et
//   x.com/LandoNorris (HTTP 403), puis une troisième tentative sur
//   instagram.com/mercedesamgf1 (HTTP 429 à nouveau). Aucun canal propre
//   pilote/écurie n'a par ailleurs été identifié par les sources généralistes/
//   techniques consultées pour cette course précise (contrairement à
//   l'EL1/EL2/Quali de ce round, où Russell en fournissait un via Instagram
//   ou le rapport Mercedes du samedi). Gap honnêtement documenté plutôt que
//   comblé par une citation de conférence de presse présentée à tort comme
//   telle : les citations utilisées en section 02/05 (Norris sur la radio
//   McLaren, Toto Wolff cité par The Race, Camara en media pen) sont toutes
//   explicitement non étiquetées « communication directe » dans le texte.
// - WebSearch n'a été utilisé à AUCUN moment pour sourcer un fait de cet
//   article, conformément à la règle déjà établie dans docs/SOURCES.md.
//
// FastF1 (télémétrie gaz/frein/rapport/régime/DRS) : le workflow
// ingest-fastf1.yml a été re-vérifié via l'API GitHub Actions juste avant
// cette rédaction — toujours au statut "queued" pour ce round (runner
// auto-hébergé hors ligne), comme au début de cette tâche. Aucune donnée
// FastF1 n'a donc pu être ajoutée ; aucun canal de télémétrie n'est mentionné
// nulle part dans le texte ci-dessous, conformément à la consigne du projet
// de ne jamais évoquer une source non réellement disponible pour ce round.
//
// track_status_events (16 lignes, mentionné dans la tâche) : non interrogé
// directement cette passe (race_briefing_deep.py, le seul script existant
// couvrant ce type de détail fin, joint lui aussi sur `results` et aurait
// renvoyé une sortie vide pour la même raison que race_briefing.py) — mais
// la relecture EXHAUSTIVE des 212 race_control_messages bruts (sans filtre,
// sans jointure, via race_briefing_full_rcm.py) ne contient AUCUN message
// SAFETY CAR, VIRTUAL SAFETY CAR ou RED FLAG sur l'ensemble de la course :
// cette absence, recoupée par les deux comptes-rendus média (Grandprix.com
// et The Race, qui ne mentionnent eux non plus aucune neutralisation),
// établit avec une confiance suffisante qu'aucune des 16 lignes de
// track_status_events ne correspond à une période de voiture de sécurité ou
// de drapeau rouge — plutôt que d'ouvrir un nouveau script seulement pour
// confirmer un fait déjà établi par la source la plus exhaustive disponible.
//
// Zéro contenu « people » : les titres Crash.net « Lando Norris suffers
// Brazil GP mishap as podium celebration goes wrong » et Grandprix.com sur
// la grille de São Paulo n'ont été repris QUE pour leur contenu sportif
// (le résultat, la célébration publique sur le podium en tant qu'événement
// de piste) — aucune information de vie privée n'a été identifiée ni
// reprise dans aucune des sources utilisées pour cette passe.
export const ROUND20_ANALYSE_FR_HTML = `
<div class="hero prose">
  <p class="eyebrow">Grand Prix de São Paulo · Autódromo José Carlos Pace (Interlagos) · dimanche 8 novembre 2026</p>
  <p class="verdict">Lando Norris remporte un Grand Prix de São Paulo à rebondissements, entre pluie, piste sèche puis pluie de retour — sa première victoire depuis Zandvoort fin août — tandis que George Russell et Kimi Antonelli, pourtant hors du podium, suffisent à sceller pour Mercedes son neuvième titre constructeurs, le premier depuis 2021. Max Verstappen signe la remontée du week-end : parti 21<sup>e</sup>, il termine 2<sup>e</sup>, devant son coéquipier Isack Hadjar. <strong>Classement officiel au moment de la rédaction : provisoire</strong> — deux enquêtes restent ouvertes (relâchement d'Antonelli en sortie de stand, contact Leclerc/Lawson au virage 12), renvoyées à l'examen des commissaires après la course.</p>
  <div class="resultstrip">
    <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren · 1:35:23,504</span></div>
    <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · +14,602s</span></div>
    <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Hadjar</span> <span class="gap">Red Bull · +24,485s</span></div>
    <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes · +33,991s</span></div>
    <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · +36,017s</span></div>
  </div>
  <p class="subverdict">Le scénario inverse presque tout ce que les essais libres avaient laissé entrevoir. L'avantage de rythme long McLaren, mesuré jusqu'à 1,6 seconde au tour en EL1 puis érodé séance après séance jusqu'à s'inverser en EL3, finit par disparaître complètement en course : sur les deux relais de gomme tendre disputés en milieu de course, Norris n'est à aucun moment le pilote le plus rapide du plateau de tête — Russell et Antonelli le devancent sur le premier, Piastri sur le second (section 03). Norris gagne sur l'exécution : un arrêt un tour plus tôt qu'Antonelli pour profiter de pneus chauds, puis aucune erreur dans des conditions où la plupart de ses rivaux en ont fait au moins une. Verstappen, troisième en EL1 et en EL2 puis vainqueur de l'EL3 avant de s'élancer du fond de grille pour un cinquième changement moteur, démontre une nouvelle fois sa capacité à remonter à Interlagos (déjà vainqueur depuis la 17<sup>e</sup> place en 2024) — par ses propres mots, avec une voiture qui « n'était pas bonne » pendant une grande partie de la course. Mercedes, de son côté, referme une saison 2026 déjà verrouillée côté titre pilotes (Antonelli sacré à Mexico) par le titre constructeurs, décroché lors de sa PREMIÈRE course sans podium de l'année — l'écurie n'avait besoin que d'une quatrième et d'une cinquième place pour y parvenir.</p>
</div>

<section class="block" data-num="01" id="sec-r1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Avant le départ : la grille réelle, la pluie qui menace, et Bottas qui ne prend jamais le départ</h2>
    <p>La grille de dimanche, déjà entièrement redessinée par la cascade de pénalités de grille confirmée samedi (voir l'article Qualifications de ce round), s'établissait : 1. Norris, 2. Antonelli, 3. Lawson, 4. Hülkenberg (voiture n°27), 5. Hadjar, 6. Bearman, 7. Russell, 8. Alonso, 9. Albon, 10. Piastri, 11. Câmara, 12. Sainz, 13. Colapinto, 14. Leclerc, 15. Gasly, 16. Stroll, 17. Bottas, 18. Lindblad, 19. Bortoleto, 20. Hamilton, 21. Verstappen, 22. Pérez. Verstappen et Pérez partaient tous deux du fond de grille pour des raisons de groupe propulseur distinctes (cinquième moteur/turbo/échappement pour Verstappen ; cinquième moteur/turbo, quatrième MGU-K pour Pérez), Hamilton purgeant une pénalité totale de 75 places après l'incident supplémentaire de l'EL3.</p>
    <p>La pluie, menaçante toute l'heure précédant le départ, s'est installée en bruine continue sur la grille avant de se calmer environ une demi-heure avant le départ — la piste restait toutefois suffisamment humide pour que les 21 partants s'alignent tous en pneu intermédiaire, température de piste autour de 17°C (63°F). Antonelli lui-même est sorti de la piste au virage 12 pendant son tour de reconnaissance, glissant sur l'herbe humide avant de regagner la piste ; Mercedes a ramené la voiture aux stands pour la nettoyer. Hülkenberg, Pérez, Hadjar, Bottas et Stroll ont tous reçu un avertissement de pilotage pour ne pas avoir respecté les consignes de sortie de la voie des stands pendant les tours de reconnaissance — sans aucune pénalité de temps de course associée.</p>
    <p>Fait le plus dur du week-end pour un pilote qui n'a même pas pu prendre le départ : la Cadillac de Valtteri Bottas a été repoussée vers les stands avant le tour de formation, laissant sa place de départ vide. L'écurie a ramené la voiture au garage et confirmé qu'un écrou de roue entré de travers empêchait tout départ — Bottas, déjà sous pression pour conserver son baquet 2027, n'aura disputé aucun tour de ce Grand Prix.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-r2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

    <h3 class="subtitle">Antonelli prend la tête au départ, Norris recule au 3<sup>e</sup>, puis l'abandon progressif de Mercedes</h3>
    <p>Dès le départ, Kimi Antonelli déborde Norris vers le virage 1 ; Liam Lawson, parti 3<sup>e</sup>, enfonce le clou en prenant la 2<sup>e</sup> place au poleman dans le virage 2. À l'issue du 1<sup>er</sup> tour, Antonelli mène Lawson de 0,788s, puis Norris (1,795s), Hadjar (3,070s), Russell (3,781s), Hülkenberg (4,648s), Albon (6,685s), Piastri (7,255s), Hamilton (7,526s, déjà remonté de la 20<sup>e</sup> à la 9<sup>e</sup> place) et Bearman (8,862s) — Verstappen, lui, n'est que 11<sup>e</sup>, à 9,336s, après un envol manqué de son propre aveu (embrayage mal tenu). Norris reprend la 2<sup>e</sup> place à Lawson au tour 6, dans le dernier complexe de virages, mais Antonelli s'échappe déjà devant — l'écart dépasse 8 secondes au tour 12, pendant que Verstappen remonte déjà au 5<sup>e</sup> rang, gagnant 16 places sur sa position de départ.</p>
    <p>Hamilton est brièvement mis en cause pour avoir quitté la piste et gagné un avantage en dépassant Bearman au virage 5 au 1<sup>er</sup> tour — Ferrari lui ordonne de rendre la place, et les commissaires classent l'affaire sans suite après course, jugeant que Hamilton avait été poussé hors piste pour éviter une collision, n'avait tiré aucun avantage et avait rendu la position. Albon et Verstappen sont également signalés pour leurs positions respectives au départ, deux dossiers classés sans suite également.</p>

    <h3 class="subtitle">Le passage aux pneus secs, et la glissade d'Antonelli</h3>
    <p>La trajectoire sèche progressivement à partir du tour 7-8 ; Hamilton est le premier à tenter le pari du pneu tendre, s'arrêtant au tour 14 et ressortant 20<sup>e</sup>. Sainz, Albon, Pérez et Câmara suivent au tour 15. Norris, Russell, Hadjar, Lawson et Piastri chaussent le tendre ensemble à l'issue du tour 16 ; Hülkenberg et Lindblad font de même. Antonelli et Verstappen attendent un tour supplémentaire, s'arrêtant à l'issue du tour 17 — Antonelli ressort devant Norris, Verstappen derrière Norris et Hadjar. C'est le moment charnière de la course, confirmé par Grandprix.com et The Race indépendamment : cet unique tour d'écart sur un pneu qui doit monter en température a permis à McLaren de refermer une bonne partie de l'écart sur Antonelli avant même que ce dernier ne commence à avoir des soucis.</p>
    <p>Et les soucis arrivent vite. Au tour 18, Antonelli rapporte un problème de suspension suspecté ; son ingénieur Peter Bonnington évoque plutôt une question de température de pneus, mais Antonelli insiste qu'il y a un vrai problème. Au tour 20, il part en tête-à-queue au virage 1 — Norris en profite immédiatement pour prendre la tête, qu'il ne lâchera plus jusqu'au drapeau à damier. Antonelli repart derrière Hadjar et décrit un comportement de voiture qui « tire d'un côté à l'accélération », avec des soucis récurrents dans les virages à gauche ; il repart encore une fois tout droit au virage 1, au tour 24, laissant passer Verstappen pour la 3<sup>e</sup> place. Toto Wolff, cité par The Race, résumera après course que le problème — jamais formellement diagnostiqué dans les sources consultées — était probablement un réglage ou une pression de pneu mal calée, aux conséquences disproportionnées.</p>

    <h3 class="subtitle">Russell et le second relais tendre, l'undercut qui ne vient jamais pour Antonelli</h3>
    <p>Autour du tour 30, Norris mène Hadjar de 5,1 secondes, Verstappen pointant à 8,6s, Antonelli à 15,1s. Russell, resté plus longtemps que tout le monde sur son unique relais de gomme tendre (du tour 17 au tour 61 sans ravitaillement intermédiaire — un choix de stratégie confirmé indépendamment par The Race, qui note qu'il est le seul pilote du cluster de tête à n'avoir disputé qu'un seul relais sur sec plutôt que deux), double Hülkenberg pour la 7<sup>e</sup> place au tour 30 puis continue de grappiller des places sans repasser par les stands. Au tour 38, Hadjar laisse passer Verstappen sur consigne d'équipe Red Bull à la demande de ce dernier, qui ferme alors sur Norris — Hadjar demandera ensuite sur la radio si l'équipe inversera l'échange si Verstappen ne parvient pas à revenir sur le leader ; la réponse reste en suspens dans les messages consultés.</p>
    <p>Alex Albon reçoit une pénalité de 5 secondes et deux points de pénalité pour un rejoint dangereux au virage 3 après avoir quitté la piste au virage 2 et forcé Gasly à freiner — purgée à son arrêt du tour 42, sans conséquence sur son classement final. Verstappen s'arrête à l'issue du tour 45 pour un train de tendres frais et ressort 5<sup>e</sup>. McLaren prévient Norris qu'Hadjar et Antonelli pourraient tenter de finir sans nouvel arrêt et lui demande s'il est prêt à les reprendre après son propre arrêt — Norris confirme. Hülkenberg, en luttant au virage 1 avec Franco Colapinto, utilise le dégagement de piste pour reprendre la 10<sup>e</sup> place à Colapinto : c'est ce dépassement précis qui lui vaudra une pénalité de 10 secondes pour sortie de piste avec avantage, purgée à son propre arrêt du tour 61, sans conséquence sur sa position finale non plus. Norris s'arrête à l'issue du tour 49 pour un train de tendres frais, Piastri (qui ressort juste devant) lui laissant immédiatement le passage.</p>

    <h3 class="subtitle">La pluie revient : tout le monde en intermédiaire, et les deux enquêtes qui clôturent la course</h3>
    <p>À onze tours de l'arrivée, la pluie se renforce sur certaines parties du circuit ; au tour 61, le mode dépassement est désactivé à mesure que l'adhérence se détériore. Russell, Lawson et Leclerc s'arrêtent ce même tour pour l'intermédiaire ; Hülkenberg également, purgeant sa pénalité de 10 secondes à cet arrêt. Norris, Verstappen, Hadjar et Antonelli rechaussent l'intermédiaire au tour 62 — Lindblad fait de même. C'est à cet arrêt précis que naît la première des deux enquêtes encore ouvertes au moment de la rédaction : Antonelli est relâché dans la voie rapide alors que Colapinto approche ; la direction de course note l'incident et le renvoie à un examen après la course, sans sanction immédiate. Quelques instants plus tard, Hamilton part en tête-à-queue avant l'entrée de la voie des stands, touchant le côté droit de son aileron arrière contre la barrière, mais repart et chausse lui aussi l'intermédiaire.</p>
    <p>Après les arrêts, Norris mène Verstappen d'environ 11,5 secondes, Hadjar à 11,3s de plus. C'est dans ce contexte que naît la seconde enquête : Leclerc attaque Lawson tout le long du dernier secteur jusqu'à la Senna S ; Lawson monte trop sur le vibreur au virage 3, et les deux voitures entrent en contact — Leclerc en sort avec la 7<sup>e</sup> place, Lawson recule au 8<sup>e</sup> rang. La direction de course confirme que ce contact au virage 12 (selon la numérotation des messages de course) sera lui aussi examiné après la course. Norris franchit la ligne en tête devant Verstappen et Hadjar ; Russell et Antonelli terminent 4<sup>e</sup> et 5<sup>e</sup>, scellant le titre constructeurs pour Mercedes — c'est sous une pluie battante que l'écurie entière rejoint le podium pour célébrer, dans ce qui restera comme sa seule course sans podium individuel de la saison. Une troisième affaire est signalée par Grandprix.com en fin d'article : Bearman et Leclerc sont également convoqués pour un possible relâchement dangereux de la part de Haas lors des arrêts tardifs — sans détail supplémentaire disponible dans les sources consultées sur l'identité précise du second pilote concerné par ce relâchement.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-r3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Stratégie chiffrée : l'avantage McLaren de l'EL1, déjà inversé en EL3, disparaît en course</h2>
    <p>Le fil ouvert dès l'EL1 de ce round trouve ici sa réponse la plus nette de tout le week-end. L'écart de rythme long mesuré en faveur de McLaren en EL1 (jusqu'à 1,6s/tour face à certains rivaux) s'était déjà réduit en EL2, puis Norris était devenu le pilote le plus LENT du cluster de tête sur le relais medium d'ouverture de l'EL3. La course permet une vérification bien plus solide, sur un relais de course complet plutôt qu'une simulation de qualification : requête dédiée sur les tours bruts de 10 voitures (scripts/race_briefing_laptimes_by_car.py), relais identifiés directement dans les données de tour (marqueurs de sortie/entrée de stand), premier tour de chaque relais exclu, dernier tour exclu sauf s'il s'agit du tout dernier relais de la course pour ce pilote, puis tours restants &gt; 103% de la médiane du relais écartés — méthode identique au principe des rounds précédents.</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Relais tendre n°1 (tours, gardés/dispo.)</th><th>Moyenne nettoyée</th><th>Relais tendre n°2 (tours, gardés/dispo.)</th><th>Moyenne nettoyée</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>17-61 (34/43)</td><td><strong>1:15,066</strong></td><td>— (un seul relais tendre)</td><td>—</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>18-53 (28/34)</td><td>1:15,169</td><td>54-62 (6/7)</td><td>1:14,169</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>17-51 (26/33)</td><td>1:15,184</td><td>52-62 (5/9)</td><td><strong>1:13,274</strong></td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>17-61 (33/43)</td><td>1:15,451</td><td>— (un seul relais tendre)</td><td>—</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>17-49 (27/31)</td><td>1:15,261</td><td>50-62 (9/11)</td><td>1:13,762</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>18-45 (23/26)</td><td>1:15,591</td><td>46-62 (12/15)</td><td>1:13,736</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>17-50 (28/32)</td><td>1:15,613</td><td>51-62 (8/10)</td><td>1:14,082</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>17-48 (23/30)</td><td>1:15,923</td><td>49-61 (9/11)</td><td>1:14,445</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>15-38 (13/22)</td><td>1:16,055</td><td>39-62 (20/22)</td><td>1:14,290</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg (#27)</td><td>17-44 (20/26)</td><td>1:16,265</td><td>45-61 (11/14)</td><td>1:14,917</td></tr>
      </tbody>
    </table>
  </div>
  <div class="prose">
    <p>Trois lectures, toutes vérifiées sur les tours bruts, aucune inventée. D'abord, le fait qui tranche le débat ouvert depuis l'EL1 : sur le premier relais tendre (l'échantillon le plus large et le plus comparable, 9 des 10 pilotes y disposent d'au moins 23 tours gardés), Norris (1:15,261) n'est ni le plus rapide ni même deuxième — Russell (1:15,066, l'échantillon le plus robuste du tableau avec 34 tours gardés sur 43) et Antonelli (1:15,169) le devancent tous les deux. Sur le second relais tendre, plus court mais tout aussi net, c'est Piastri (1:13,274) qui signe la moyenne la plus rapide, devant Verstappen (1:13,736) et Norris lui-même (1:13,762) — l'écart entre les trois reste minime (moins de trois dixièmes), mais Norris n'y est, là non plus, jamais en tête. L'avantage McLaren documenté en EL1, déjà retombé à un écart incertain en EL2 puis inversé sur le relais medium de l'EL3, a donc fini par disparaître purement et simplement sur le rythme de course : aucun signal statistique dans ce tableau ne soutient l'idée d'une McLaren plus rapide au tour que ses rivaux directs ce dimanche.</p>
    <p>Ensuite, un constat obtenu en croisant les bornes de relais isolées dans la base avec le récit média, sans dépendre de l'un ou de l'autre seul : Russell et Leclerc sont les deux seuls pilotes de ce tableau à n'avoir disputé qu'UN relais de gomme tendre (du tour 17 jusqu'au tour 61, sans repasser par les stands entre les deux), contre deux pour les huit autres. The Race confirme indépendamment ce choix de stratégie pour Russell (« doing just one stint on slicks while most other drivers needed two sets ») — une confirmation après coup, pas une donnée empruntée à la source : les bornes de relais de la base l'indiquaient déjà avant lecture de cet article. Ce choix explique à la fois le bon résultat de Russell (4<sup>e</sup>, meilleur résultat Mercedes du jour) et sa moyenne de relais la plus rapide du tableau — un pneu géré sur la durée plutôt que poussé sur un relais court.</p>
    <p>Enfin, un signal de fragilité à ne pas sur-interpréter : l'échantillon d'Hamilton sur son premier relais tendre (13 tours gardés sur 22 disponibles, le ratio le plus faible du tableau) reflète une course perturbée par le trafic après son arrêt précoce et son retour en 20<sup>e</sup> position — cohérent avec le récit média (remontée du 20<sup>e</sup> au 9<sup>e</sup> rang sur le seul premier tour, puis gestion d'un pneu usé en pleine bataille), pas un signe de rythme intrinsèquement plus lent.</p>
    <div class="callout">Réserve méthodologique explicite : la table tyre_stints de ce projet, agrégée par MIN(lap_number)/MAX(total_laps), a produit cette fois des bornes de relais peu fiables (ex. un relais affiché "tours 17-17" alors qu'il dure en réalité jusqu'au tour 48 selon les tours bruts) — écartée comme base de calcul pour cette passe, contrairement aux rounds précédents où elle était directement exploitable. Les relais ci-dessus ont donc été reconstruits directement depuis les marqueurs de sortie/entrée de stand de la table lap_times, recoupés avec le déroulé de course de la section 02 (dates d'arrêt données par Grandprix.com/The Race) — concordance confirmée pour chaque pilote.</div>
  </div>
</section>

<section class="block" data-num="04" id="sec-r4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Classement final — provisoire, deux enquêtes en suspens</h2>
    <div class="callout"><strong>Statut au moment de la rédaction : classification PROVISOIRE.</strong> La page officielle Formula1.com porte elle-même la mention « * Provisional results. » Grandprix.com et The Race confirment tous deux que l'enquête sur le relâchement d'Antonelli en sortie de stand et celle sur le contact Leclerc/Lawson au virage 12 restent ouvertes, renvoyées à l'examen des commissaires après la course — sans verdict publié par aucune des sources consultées au moment de cette rédaction (nouvelle vérification explicite effectuée : aucun article de verdict trouvé). Une troisième affaire (Bearman et Leclerc convoqués pour un possible relâchement dangereux chez Haas) a également été signalée par Grandprix.com sans détail supplémentaire. Le tableau ci-dessous reflète le classement tel que publié par ces trois sources — à vérifier et corriger si un verdict change une position une fois publié. Pour mémoire, deux pénalités de course distinctes ont déjà été purgées et sont bien définitives, intégrées au classement : Albon (5s, rejoint dangereux) et Hülkenberg (10s, sortie de piste avec avantage).</div>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos.</th><th>Pilote</th><th>Écurie</th><th>Écart</th><th>Pts</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:35:23,504</td><td>25</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>+14,602s</td><td>18</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>+24,485s</td><td>15</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>+33,991s</td><td>12</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>+36,017s <span style="font-size:11px;color:var(--text-muted)">(relâchement en sortie de stand : enquête après course)</span></td><td>10</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>+56,475s</td><td>8</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>+1:13,586</td><td>6</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>+1:15,402 <span style="font-size:11px;color:var(--text-muted)">(contact T12 avec Leclerc : enquête après course)</span></td><td>4</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>+1 tour</td><td>2</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg (#27)</td><td>Audi</td><td>+1 tour <span style="font-size:11px;color:var(--text-muted)">(pénalité 10s déjà purgée)</span></td><td>1</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>+1 tour</td><td>0</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>+1 tour</td><td>0</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>+1 tour</td><td>0</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>+1 tour</td><td>0</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>+1 tour <span style="font-size:11px;color:var(--text-muted)">(pénalité 5s déjà purgée)</span></td><td>0</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>+1 tour</td><td>0</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>+1 tour <span style="font-size:11px;color:var(--text-muted)">(arrêt au stand de 20s ; relâchement signalé : enquête après course)</span></td><td>0</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>+2 tours</td><td>0</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>+2 tours</td><td>0</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Camara</td><td>Haas F1 Team</td><td>+2 tours <span style="font-size:11px;color:var(--text-muted)">(1<sup>er</sup> Grand Prix, à domicile)</span></td><td>0</td></tr>
        <tr><td>NC</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>DNF (30 tours, problème de batterie)</td><td>0</td></tr>
        <tr><td>NC</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>DNS (écrou de roue entré de travers)</td><td>0</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
  <div class="prose">
    <p>Classement du championnat pilotes après cette course (Antonelli déjà sacré à Mexico) : Antonelli 390 points, Verstappen 279, Russell 262 (dépasse Hamilton), Hamilton 261, Leclerc 251, Norris 246 (à seulement cinq points de Leclerc), Piastri 152, Hadjar 122, Lawson 87, Hülkenberg et Bortoleto 14 à égalité. Constructeurs : Mercedes 652 — <strong>championne du monde constructeurs 2026, 9<sup>e</sup> titre de l'écurie, le premier depuis 2021</strong> — Ferrari 512 (écart porté à 140 points, mathématiquement hors de portée), Red Bull Racing 415, McLaren 398 (Red Bull conserve 17 points d'avance pour la 3<sup>e</sup> place malgré la victoire de Norris), Racing Bulls-Ford 112, Alpine-Mercedes 69, Haas-Ferrari 31, Audi 28, Williams-Mercedes 12, Aston Martin-Honda 7, Cadillac-Ferrari 0 (toujours sans le moindre point après vingt rounds).</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-r5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Bilan pilote par pilote</h2>
    <p>L'évaluation porte sur le Grand Prix du dimanche, en tenant compte de la position de départ réelle sur la grille (après pénalités). Classement rappelé comme provisoire pour Antonelli (7<sup>e</sup>, enquête en cours) et Lawson/Leclerc (8<sup>e</sup>/7<sup>e</sup>, enquête en cours).</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table class="verdict-table">
      <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Lando Norris</td><td class="pos">1 → 1<span class="delta neutral">=</span></td><td>Perd la tête au départ puis la deuxième place, la reprend au tour 6, et profite d'un undercut d'un tour sur Antonelli pour s'installer en tête au tour 20 quand ce dernier part en tête-à-queue. Aucune erreur ensuite, dans des conditions où la plupart de ses rivaux directs en ont commis au moins une. Première victoire depuis Zandvoort fin août — pourtant jamais le pilote le plus rapide au tour sur les deux relais tendre de la course (section 03).</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Max Verstappen</td><td class="pos">21 → 2<span class="delta good">+19</span></td><td>Envol manqué de son propre aveu (embrayage), puis remontée continue tout au long de la course malgré une voiture qu'il décrit lui-même comme n'ayant « jamais été bonne » après le passage aux pneus secs (sous-virage marqué qu'il attribue à une perte aérodynamique). Deuxième place qui confirme, une nouvelle fois, sa capacité à remonter à Interlagos.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Isack Hadjar</td><td class="pos">5 → 3<span class="delta good">+2</span></td><td>Troisième podium de la saison, obtenu après avoir laissé passer Verstappen sur consigne d'équipe au tour 38 — un sacrifice qui laisse une question ouverte (l'équipe aurait-elle inversé l'échange si Verstappen n'avait pas recollé à Norris ?) restée sans réponse connue. Course solide sur l'ensemble des relais, sans incident individuel notable.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>George Russell</td><td class="pos">7 → 4<span class="delta good">+3</span></td><td>Meilleur résultat Mercedes du jour, obtenu en gérant un unique relais de gomme tendre du tour 17 au tour 61 — le seul pilote du cluster de tête à ne pas repasser deux fois par les stands sur sec (section 03) — et la moyenne de relais la plus rapide de toute la course sur le premier relais tendre.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Kimi Antonelli</td><td class="pos">2 → 5<span class="delta bad">-3</span></td><td>Mène la course jusqu'au tour 20 avant un tête-à-queue au virage 1, puis un second passage tout droit au même virage au tour 24 — un problème jamais formellement diagnostiqué dans les sources consultées, que Toto Wolff attribue après course à un probable réglage ou pression de pneu mal calée. Cinquième place qui suffit, avec celle de Russell, à sceller le titre constructeurs pour Mercedes. <strong>Enquête en cours</strong> pour un relâchement en sortie de stand au tour 62.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Oscar Piastri</td><td class="pos">10 → 6<span class="delta good">+4</span></td><td>Course sans incident individuel notable, mais signe la moyenne de relais la plus rapide de toute la course sur le second relais tendre (1:13,274) — un signal de rythme pur qui ne se traduit pas en position, Piastri n'ayant jamais eu l'occasion de l'exploiter en piste dégagée.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Charles Leclerc</td><td class="pos">14 → 7<span class="delta good">+7</span></td><td>Remontée solide, complétée par une attaque décisive sur Lawson dans le dernier secteur qui tourne au contact au virage 12. <strong>Enquête en cours</strong> sur ce contact — les commissaires pourraient encore lui retirer cette 7<sup>e</sup> place selon The Race. Également convoqué, avec Bearman, pour un possible relâchement dangereux de la part de Haas lors des arrêts tardifs.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Liam Lawson</td><td class="pos">3 → 8<span class="delta bad">-5</span></td><td>Deuxième place provisoire dès le virage 2 au départ, tenue jusqu'à ce que la piste sèche referme sa fenêtre ; sépare les deux Ferrari pour la cinquième semaine consécutive selon The Race, qui le cite comme l'un des grands gagnants du week-end. Perd finalement la 7<sup>e</sup> place au contact du virage 12 contre Leclerc — <strong>enquête en cours</strong>, qui pourrait lui restituer la position.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Lewis Hamilton</td><td class="pos">20 → 9<span class="delta good">+11</span></td><td>Remontée fulgurante du 20<sup>e</sup> au 9<sup>e</sup> rang sur le seul premier tour, puis gestion compliquée d'un pneu intermédiaire usé qui le fait reculer avant son premier arrêt — dépassé même par Alonso à un moment de la course. Repart en tête-à-queue avant l'entrée de la voie des stands en fin de course, touchant son aileron arrière contre la barrière sans abandonner.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Nico Hülkenberg (#27)</td><td class="pos">4 → 10<span class="delta bad">-6</span></td><td>Dernier point de la course décroché malgré une pénalité de 10 secondes purgée pour une sortie de piste avec avantage sur Colapinto au virage 1 — tient bon face à la pression de ses nombreux rivaux du milieu de grille jusqu'au drapeau.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Arvid Lindblad</td><td class="pos">18 → 11<span class="delta good">+7</span></td><td>Remontée correcte, sans incident individuel notable relevé dans les sources consultées.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#229971"></span>Fernando Alonso</td><td class="pos">8 → 12<span class="delta bad">-4</span></td><td>Dépasse brièvement Hamilton en course avant de reculer lui-même ; sans incident individuel notable relevé.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Franco Colapinto</td><td class="pos">13 → 13<span class="delta neutral">=</span></td><td>Résultat conforme à sa position de départ ; brièvement impliqué dans la bataille au virage 1 avec Hülkenberg qui vaut à ce dernier sa pénalité.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Pierre Gasly</td><td class="pos">15 → 14<span class="delta good">+1</span></td><td>Contraint de freiner pour éviter Albon lors du rejoint dangereux de ce dernier au tour 33-34, qui vaut à Albon sa pénalité de 5 secondes ; sans autre incident individuel notable.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Alex Albon</td><td class="pos">9 → 15<span class="delta bad">-6</span></td><td>Pénalité de 5 secondes et deux points de pénalité pour un rejoint dangereux au virage 3 après une sortie de piste au virage 2 ayant forcé Gasly à freiner — purgée à son arrêt du tour 42, sans conséquence supplémentaire sur son classement.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Gabriel Bortoleto</td><td class="pos">19 → 16<span class="delta good">+3</span></td><td>Remontée correcte à domicile, sans incident individuel notable relevé dans les sources consultées.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Oliver Bearman</td><td class="pos">6 → 17<span class="delta bad">-11</span></td><td>Course gâchée par un arrêt au stand de 20 secondes — « quand on reste 20 secondes à l'arrêt dans la voie des stands, c'est terminé », résumera-t-il après course. Également convoqué avec Leclerc pour un possible relâchement dangereux de la part de Haas lors des arrêts tardifs — enquête en cours.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Sergio Perez</td><td class="pos">22 → 18<span class="delta good">+4</span></td><td>Dernier pilote pénalisé au fond de grille à prendre le départ réellement dernier (son temps de Q1 restant le plus lent des trois pilotes de fond de grille) ; remontée limitée par le rythme de la Cadillac.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Carlos Sainz</td><td class="pos">12 → 19<span class="delta bad">-7</span></td><td>Recul par rapport à sa position de départ, sans incident individuel notable relevé dans les sources consultées.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Rafael Camara</td><td class="pos">11 → 20<span class="delta bad">-9</span></td><td>Premier Grand Prix disputé à domicile, dans les conditions les plus difficiles possibles : plusieurs tours supprimés pour limites de piste, dont une sortie au virage 4 juste après avoir quitté les stands. « On a connu de tout en une seule course, ce n'était pas facile de rester sur la piste », résumera-t-il en media pen, reconnaissant des erreurs qu'il ne s'attendait pas à commettre — un debut à oublier qui ne reflète pas un week-end par ailleurs solide (vendredi convaincant, qualifications prometteuses jusqu'à son accident de Q2).</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#229971"></span>Lance Stroll</td><td class="pos">16 → DNF<span class="delta dnf">DNF</span></td><td>Retiré sur consigne d'équipe après 30 tours pour un problème de batterie — son 14<sup>e</sup> abandon de la saison selon The Race.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Valtteri Bottas</td><td class="pos">17 → DNS<span class="delta dnf">DNS</span></td><td>N'a disputé aucun tour : un écrou de roue entré de travers, découvert sur la grille, a empêché toute tentative de retrait de la roue avant le départ. Situation embarrassante pour un pilote qui se bat déjà pour convaincre son écurie de le conserver.</td></tr>
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
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>McLaren</td><td>Norris gagne sur l'exécution (undercut d'un tour, zéro erreur) plutôt que sur le rythme pur — jamais le plus rapide du plateau de tête sur les deux relais tendre de la course (section 03), contrairement à l'avantage mesuré en EL1. Piastri, 6<sup>e</sup>, signe pourtant la moyenne de relais la plus rapide de toute la course sur le second relais tendre. Red Bull reste 17 points devant pour la 3<sup>e</sup> place du championnat constructeurs malgré cette victoire.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Red Bull Racing</td><td>Double résultat spectaculaire (2<sup>e</sup>/3<sup>e</sup>) depuis une grille de départ catastrophique (21<sup>e</sup>/5<sup>e</sup>) — Verstappen remonte 19 places malgré une voiture qu'il juge défaillante en sous-virage sur le sec ; Hadjar laisse passer son coéquipier au tour 38 sur consigne d'équipe pour obtenir ce double podium.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Mercedes</td><td>Titre constructeurs scellé (9<sup>e</sup> de l'histoire de l'écurie, premier depuis 2021) lors de sa seule course sans podium individuel de la saison — Russell (4<sup>e</sup>) gère un unique relais tendre jusqu'au tour 61 pour signer la moyenne de relais la plus rapide de la course ; Antonelli (5<sup>e</sup>, enquête en cours pour un relâchement de stand) perd la tête sur un problème de voiture jamais formellement diagnostié.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Ferrari</td><td>Seulement huit points marqués (plus bas total de la saison à égalité avec Monza), malgré une bonne coopération entre les deux pilotes selon The Race — Leclerc (7<sup>e</sup>, enquête en cours après son contact avec Lawson) et Hamilton (9<sup>e</sup>, remontée fulgurante du 1<sup>er</sup> tour suivie d'un passage difficile sur pneu usé puis d'un tête-à-queue en fin de course).</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Racing Bulls</td><td>Lawson (8<sup>e</sup>, enquête en cours) sépare les deux Ferrari pour la cinquième semaine consécutive selon The Race, malgré une 2<sup>e</sup> place provisoire perdue dès que la piste a séché ; Lindblad 11<sup>e</sup>. L'écurie se rapproche encore de la 5<sup>e</sup> place historique du championnat constructeurs.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Audi</td><td>Hülkenberg (10<sup>e</sup>, voiture n°27) décroche le dernier point disponible malgré une pénalité de 10 secondes purgée, meilleur résultat de grille de sa saison la veille suivi d'un résultat correspondant en course ; Bortoleto 16<sup>e</sup> à domicile.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Alpine</td><td>Colapinto (13<sup>e</sup>) et Gasly (14<sup>e</sup>) hors des points, sans incident individuel majeur relevé pour les deux pilotes — cinquième week-end sans point en six selon The Race.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#229971"></span>Aston Martin</td><td>Alonso 12<sup>e</sup>, Stroll retiré après 30 tours pour un problème de batterie (14<sup>e</sup> abandon de sa saison) — week-end sans point.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Williams</td><td>Albon (15<sup>e</sup>, pénalité de 5 secondes purgée pour un rejoint dangereux) et Sainz (19<sup>e</sup>) tous deux hors des points.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Haas F1 Team</td><td>Bearman (17<sup>e</sup>) pénalisé par un arrêt au stand de 20 secondes qui ruine sa course ; Câmara (20<sup>e</sup>) complète un premier Grand Prix à domicile à oublier dans les conditions les plus difficiles possibles. Les deux pilotes également convoqués, avec Leclerc, pour un possible relâchement dangereux lors des arrêts tardifs — enquête en cours.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Cadillac</td><td>Week-end à oublier : Bottas n'a disputé aucun tour (écrou de roue entré de travers, DNS), Pérez termine dernier des classés après un départ du fond de grille — l'écurie reste à 0 point après vingt rounds de la saison.</td></tr>
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
          <li><strong>Lando Norris</strong>, première victoire depuis Zandvoort fin août, obtenue sur l'exécution plutôt que sur le rythme pur — jamais le plus rapide du cluster de tête sur les deux relais tendre de la course (section 03).</li>
          <li><strong>Max Verstappen</strong>, 19 places remontées depuis la 21<sup>e</sup> position pour un podium, avec une voiture qu'il jugeait lui-même défaillante une bonne partie de la course.</li>
          <li><strong>Mercedes</strong>, 9<sup>e</sup> titre constructeurs de l'histoire de l'écurie (le premier depuis 2021), scellé lors de sa seule course sans podium individuel de l'année — Russell et Antonelli ont suffi.</li>
          <li><strong>Liam Lawson</strong>, qui sépare les deux Ferrari pour la cinquième semaine consécutive selon The Race, même si l'enquête sur son contact avec Leclerc reste ouverte.</li>
        </ul>
      </div>
      <div class="verdictcol lose">
        <h4>Perdants</h4>
        <ul>
          <li><strong>Kimi Antonelli</strong>, qui mène la course jusqu'au tour 20 avant un problème de voiture jamais formellement diagnostiqué — et fait désormais l'objet d'une enquête pour un relâchement de stand.</li>
          <li><strong>Ferrari</strong>, plus bas total de points de la saison (huit, à égalité avec Monza) malgré une course sans friction interne entre ses deux pilotes.</li>
          <li><strong>Oliver Bearman</strong>, course ruinée par un arrêt au stand de 20 secondes — « c'est terminé », par ses propres mots.</li>
          <li><strong>Valtteri Bottas</strong>, qui n'a disputé aucun tour pour un écrou de roue entré de travers — une saison déjà difficile sur le plan du maintien de son baquet 2027.</li>
        </ul>
      </div>
    </div>
    <div class="callout">São Paulo restera le Grand Prix où l'arc technique ouvert dès l'EL1 de ce round (l'avantage de rythme long de l'évolution aéro exclusive McLaren) a trouvé sa résolution la plus nette : érodé séance après séance tout le week-end, il a fini par disparaître complètement sur le rythme de course — Norris n'a jamais été le pilote le plus rapide sur les deux relais tendre disputés. Mais le vrai sujet de ce dimanche n'était ni McLaren ni la victoire : c'est Mercedes qui ferme la boucle d'une saison 2026 déjà verrouillée côté titre pilotes, en décrochant le titre constructeurs sans le moindre podium individuel ce jour-là — la preuve, au bout du compte, qu'un titre se construit sur l'ensemble d'une saison, pas sur un seul Grand Prix.</div>
  </div>
</section>

<section class="block" id="sec-r-next">
  <div class="prose">
    <h2 class="sectitle">Enseignements pour la suite</h2>
    <p>Trois points issus de São Paulo à surveiller au prochain rendez-vous, à Las Vegas dans deux semaines (Grandprix.com, confirmé) :</p>
    <ol style="padding-left:20px; margin:0 0 16px;">
      <li style="margin-bottom:10px;"><strong>Les deux (en réalité trois) enquêtes en suspens</strong> — le relâchement d'Antonelli en sortie de stand, le contact Leclerc/Lawson au virage 12, et la convocation de Bearman/Leclerc pour un possible relâchement Haas — devront être tranchées par les commissaires avant que ce classement ne devienne définitif. The Race évoque explicitement la possibilité que Leclerc perde sa 7<sup>e</sup> place au profit de Lawson.</li>
      <li style="margin-bottom:10px;"><strong>Le titre pilotes 2026 reste en jeu entre quatre pilotes</strong> (Verstappen 279, Russell 262, Hamilton 261, Leclerc 251) pour la 2<sup>e</sup> place du championnat derrière Antonelli, déjà sacré — Russell vient de dépasser Hamilton d'un seul point ce dimanche.</li>
      <li><strong>Red Bull et McLaren</strong> se disputent toujours la 3<sup>e</sup> place du championnat constructeurs, à 17 points d'écart (415 contre 398) — un enjeu sportif concret qui reste ouvert, la victoire de Norris à São Paulo n'ayant pas suffi à combler l'écart.</li>
    </ol>
    <a class="bridge-btn" href="/courses" style="text-decoration:none; display:inline-block;">Voir le calendrier de la saison →</a>
  </div>
</section>

<section class="block" id="sec-r8">
  <details class="sources">
    <summary>Sources utilisées — GP de São Paulo (9 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de course</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1.py), session_key=11412 ; les sections RÉSULTATS/CLASSEMENT PILOTES/ARRÊTS/PNEUS de scripts/race_briefing.py sont VIDES pour ce round (jointure sur la table <em>results</em>, pas encore peuplée) — vérifié, pas supposé. Seule la section MÉTÉO (sans jointure) a pu sortir : air 15,60-16,70°C, piste 0,00-43,60°C (artefact de capteur isolé — aucune neutralisation drapeau rouge/voiture de sécurité n'a eu lieu cette course, voir ci-dessous), pluie confirmée, humidité 82,40-91,10%.</span></li>
        <li><span class="desc">Requête dédiée tours bruts et relais pneus par numéro de voiture (scripts/race_briefing_laptimes_by_car.py --cars 1:NOR 3:VER 6:HAD 63:RUS 12:ANT 81:PIA 16:LEC 30:LAW 44:HAM 27:HUL) : base de tous les relais et moyennes chiffrées de la section 03, reconstruits directement depuis les marqueurs de sortie/entrée de stand (table tyre_stints écartée cette passe, bornes peu fiables).</span></li>
        <li><span class="desc">Relecture complète et sans filtre des 212 race_control_messages (scripts/race_briefing_full_rcm.py) : base des deux enquêtes en suspens (relâchement Antonelli, contact Leclerc/Lawson), des deux pénalités déjà purgées (Albon, Hülkenberg), et de la confirmation qu'aucun message SAFETY CAR/VIRTUAL SAFETY CAR/RED FLAG n'apparaît nulle part dans cette course — recherche explicite sur ces trois motifs, aucune occurrence.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1299/sao-paulo/race-result" data-desc="Résultats officiels de la course, fetchés en HTML brut ET en texte nettoyé via fetch-url.yml. Titre de page confirmé (« ... RACE RESULT »). Porte explicitement la mention « * Provisional results. » — statut documenté en détail en tête de fichier, classement de l'article marqué provisoire en conséquence.">Formula1.com — résultats officiels de la course (provisoires)</a><span class="desc">Formula1.com</span></li>
        <li><span class="desc">Formula1.com — /en/latest/all, fetché en brut puis en texte : confirme par ses propres titres « Norris wins wet Sao Paulo GP thriller as Mercedes claim title » et « AS IT HAPPENED: Norris wins Sao Paulo GP as Mercedes take Constructors' » — pages d'articles individuelles non atteintes dans la fenêtre récupérée.</span></li>
        <li><span class="desc">McLaren (mclaren.com/racing/, écurie victorieuse), Oracle Red Bull Racing (redbullracing.com/int-en, double podium), Audi (audif1.com/en, dernier point marqué) : les trois lus intégralement via fetch-url.yml, tous actifs mais SANS contenu daté spécifique au résultat de cette course au moment du fetch — gap institutionnel documenté comme tel pour les trois, même pour l'écurie gagnante. Pirelli (press.pirelli.com/tagfeed/en/tags/press__releases) relu une sixième fois pour ce round : toujours aucune entrée spécifique à São Paulo 2026, régression déjà documentée pour l'EL1/EL2/EL3/Quali de ce round. Mercedes (mercedesamgf1.com/en/news) : nouvel échec HTTP 404 explicite, malgré le titre constructeurs décroché ce dimanche. FIA (fia.com/system/files/decision-document/index.html, tentative pour retrouver un document de commissaires) : échec HTTP 404 explicite.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.grandprix.com/races/brazilian-gp-2026-race-notes.html" data-desc="Notes de course complètes (« Race Notes - Norris wins, Mercedes takes the title ») : déroulé tour par tour quasi complet, écarts chronométrés à plusieurs points de course, arrêts datés au tour près, statut provisoire explicite de la classification, classements pilotes/constructeurs après course. La source la plus détaillée utilisée pour cet article. Lue intégralement via fetch-url.yml. Page d'accueil (grandprix.com/) également fetchée deux fois à quelques minutes d'écart pour vérifier l'apparition d'un article de verdict — aucun des deux passages n'en liste un.">Grandprix.com — notes de course</a><span class="desc">Grandprix.com</span></li>
        <li><span class="desc">Crash.net — page de liste /f1/news lue intégralement (texte rendu) : confirme indépendamment « Lewis Hamilton reveals Ferrari radio confusion behind costly Brazil GP mistake », « Lando Norris suffers Brazil GP mishap as podium celebration goes wrong », « Toto Wolff reacts as Mercedes claim the constructors' title at the Brazil Grand Prix », « New F1 championship standings after the Brazil Grand Prix », « Mixed up Brazil GP starting grid after engine penalties » — aucun titre de verdict d'enquête parmi les dix-huit affichés (URL d'article individuel non extractible de cette page de liste).</span></li>
        <li><span class="desc">Autosport — page de liste /f1/news lue intégralement : confirme indépendamment « Antonelli explains "weird" spin and car instability which cost F1 Brazilian GP win » et « F1 Brazilian GP: Norris wins in mixed conditions, Mercedes clinch constructors' title » — aucun titre de verdict d'enquête non plus (même limite d'URL non extractible).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/norris-wins-as-mercedes-clinches-title-with-a-scrappy-race/" data-desc="Compte-rendu complet (Josh Suttill) : déroulé de course, classement intégral chiffré des 22 engagés (podium, écarts, tours perdus), citations de contexte sur le choix stratégique de Russell (un seul relais tendre). Lu intégralement via fetch-url.yml.">The Race — Norris gagne, Mercedes sacrée dans une course heurtée</a><span class="desc">The Race (Josh Suttill)</span></li>
        <li><a href="https://www.the-race.com/formula-1/winners-and-losers-from-f1-2026-brazilian-grand-prix/" data-desc="Article collectif (Josh Suttill, Scott Mitchell-Malm, Matt Beer, Ben Anderson) : analyse pilote par pilote avec citations directes de conférence de presse (Câmara, Bearman), mention explicite que le verdict Leclerc/Lawson restait ouvert au moment de la publication — base du statut provisoire documenté en section 04. Lu intégralement via fetch-url.yml.">The Race — vainqueurs et perdants du Grand Prix</a><span class="desc">The Race</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Communication directe pilote et communauté technique — tentatives documentées</h5>
      <ul>
        <li><span class="desc">Communication directe pilote : trois tentatives réelles cette passe, toutes infructueuses — instagram.com/mclaren (HTTP 429), x.com/LandoNorris (HTTP 403), instagram.com/mercedesamgf1 (HTTP 429). Aucun canal propre pilote/écurie identifié par ailleurs pour cette course précise par les sources généralistes/techniques consultées. Gap honnêtement documenté : cet article ne contient pas de communication directe pilote au sens strict de la règle éditoriale pour sa partie course, faute d'alternative trouvée malgré ces tentatives réelles — les citations de Toto Wolff, Norris (radio) et Câmara/Bearman (media pen) sont explicitement non étiquetées « communication directe » dans le texte.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
