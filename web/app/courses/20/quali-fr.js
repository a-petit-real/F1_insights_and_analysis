// Analyse Qualifications — Grand Prix de São Paulo (Interlagos), round 20,
// saison 2026.
// Prolonge directement l'EL1/EL2/EL3 du même round (web/app/courses/20/
// el1-fr.js, el2-fr.js, el3-fr.js) : aucune contradiction volontaire avec
// leur contenu (évolution aéro exclusive McLaren et son érosion progressive
// EL1->EL2->EL3, enjeu titre constructeurs Mercedes/Ferrari, cascade de
// pénalités de grille déjà confirmée par les commissaires AVANT cette séance
// — Verstappen -30, Hamilton -75, Leclerc -10, Pérez -30, Russell -5 connue
// depuis l'EL1). Correction reprise de l'EL3 : la voiture de Nico Hülkenberg
// (Audi) est la n°27, jamais "98" — utilisée ainsi partout dans cet article.
// La prédiction qualificative de l'EL3 (Antonelli vs Norris pour la pole,
// Piastri en troisième, pénalités jugées peu pertinentes pour la position
// de qualification elle-même) est explicitement CONTREDITE par cette séance
// sur deux points majeurs : Antonelli ne se bat pas pour la pole (il prend
// la troisième place) et Piastri est éliminé en Q2 — la pluie a totalement
// rebattu la hiérarchie pressentie à l'issue des essais libres, documenté
// comme tel plutôt que lissé en section 04.
//
// *** CENTRE DE GRAVITÉ DE CET ARTICLE : UNE SÉANCE ENTIÈREMENT DISPUTÉE
// SOUS LA PLUIE *** — donnée primaire = pipeline OpenF1 (session_key=11408,
// Qualifications, 2026-11-07 18:00->19:00 UTC nominal, 391 tours/22 pilotes),
// ingestion déjà confirmée réelle avant cette passe de rédaction. Les
// données météo OpenF1 confirment une pluie intermittente, parfois forte,
// sur une grande partie de la séance : AUCUN pilote n'a roulé sur pneu sec à
// un quelconque moment de cette qualification — gomme pluie (WET) puis
// intermédiaire (INTERMEDIATE) uniquement, jamais de sec — confirmé de façon
// totalement indépendante par les comptes-rendus Grandprix.com et The Race
// (pneus wet obligatoires en Q1 pour toute la grille, passage aux
// intermédiaires en Q2 une fois la piste jugée assez sèche, mais nouvelle
// averse menaçant dès le début de Q3). C'est l'écart le plus important par
// rapport à une qualification normale et la grille de lecture de tout cet
// article, pas un simple aléa météo en toile de fond.
//
// *** POINT DE MÉTHODE CENTRAL, identique dans son principe à celui déjà
// documenté pour les qualifications du round 19 (Mexico) et rappelé dans
// docs/SOURCES.md *** : le classement brut "meilleur tour toutes phases
// confondues" obtenu via scripts/practice_briefing.py NE CORRESPOND PAS au
// classement officiel de qualification. Vérifié par recoupement direct avec
// DEUX sources externes lues intégralement via fetch-url.yml (Grandprix.com,
// qui publie le tableau complet Q1/Q2/Q3 par pilote sous le bandeau "FIA
// provisional qualifying classification" ; The Race, classement concordant
// au millième). Trois écarts concrets, les plus parlants :
// (1) Russell — meilleur tour brut en base 1:26,745 (le plus rapide de toute
//     la séance, signé en Q2 lors du passage aux intermédiaires), mais ce
//     tour n'est PAS retenu pour le classement officiel puisqu'il n'a pas été
//     signé en Q3 : sa ligne officielle de Q3 est 1:27,674, ce qui le classe
//     DEUXIÈME et non premier — l'écart le plus spectaculaire de cette passe,
//     puisqu'il change littéralement qui est désigné "le plus rapide" selon
//     la méthode utilisée.
// (2) Verstappen — meilleur tour brut en base 1:31,238 (8/9 tours), signé en
//     réalité en Q1 : contrairement à ce qu'un classement brut pourrait
//     laisser croire, Verstappen n'a disputé AUCUN tour chronométré en Q2
//     ("No Time" sur le classement officiel Grandprix.com/The Race) — un
//     choix délibéré de Red Bull pour ménager pneus et monoplace sachant sa
//     pénalité de fond de grille déjà actée, pas un signe de manque de
//     rythme. Sa position officielle de qualification (16e) reflète donc une
//     non-tentative, pas une performance.
// (3) Rafael Câmara — tour le plus rapide en base 1:31,470 (15/18 tours),
//     mais ce tour a été supprimé pour dépassement des limites de piste au
//     virage 8 (confirmé par Grandprix.com) : sa ligne officielle de Q2 est
//     1:31,515, un tour plus lent mais valide — exactement le même mécanisme
//     (suppression pour limites de piste) déjà documenté pour Bearman au
//     round 19.
// Ces trois cas sont développés avec leurs sources en section 04. Les autres
// écarts du tableau brut (Lawson, Hadjar, Leclerc, Hülkenberg, Albon,
// Alonso, tous classés sur un temps de Q2 en base alors que leur ligne
// officielle retient leur temps de Q3) suivent le même principe général
// (le classement de phase ne reprend jamais un temps d'une phase
// antérieure) et ne sont pas tous détaillés individuellement pour ne pas
// noyer le point de méthode sous la répétition.
//
// Sourcing élargi (minimum 4 sources indépendantes, 2 généralistes + 2
// technique/analytique, + institutionnel + communication directe pilote,
// conformément à docs/OPERATIONS.md et docs/SOURCES.md) :
// - Formula1.com (officiel) : page de résultats qualifications
//   (formula1.com/en/results/2026/races/1299/sao-paulo/qualifying, HTML brut
//   via fetch-url.yml) — titre de page exact confirmé ("FORMULA 1 MSC
//   CRUISES GRANDE PRÊMIO DE SÃO PAULO 2026 - QUALIFYING"), confirmant le bon
//   round/la bonne séance, mais tableau de classement lui-même hors de la
//   fenêtre de troncature récupérée (même limite déjà documentée pour ce
//   domaine sur ce round et les précédents) — classement officiel confirmé
//   via Grandprix.com et The Race ci-dessous plutôt que via cette page.
// - Pirelli (institutionnel) : press.pirelli.com/tagfeed/en/tags/
//   press__releases relu intégralement une CINQUIÈME fois pour ce round —
//   toujours aucune entrée spécifique à São Paulo 2026 (dernière entrée
//   pertinente antérieure au week-end, 12 juin 2026) — régression déjà
//   documentée pour l'EL1/EL2/EL3 de ce round, confirmée une fois de plus,
//   pas un incident isolé.
// - McLaren Racing (institutionnel, écurie de la pole) : mclaren.com/racing/
//   lu intégralement — confirme la pole de Norris et la qualifie elle-même
//   de « Qualifying threepeat » (troisième pole consécutive à Interlagos pour
//   lui, PAS trois poles consécutives cette saison — distinction importante,
//   recoupée indépendamment par The Race ci-dessous, qui situe ce fait
//   depuis 2024 et le retour de compétitivité de McLaren sur ce circuit
//   précis).
// - Audi (institutionnel, écurie d'Hülkenberg, meilleur résultat de grille
//   de sa saison) : audif1.com/en lu intégralement — actif, contenu
//   générique São Paulo ("Why rain loves Interlagos"), mais aucun contenu
//   daté publié après la séance de qualification elle-même dans la fenêtre
//   récupérée — gap institutionnel documenté comme tel sur le fait le plus
//   positif de la saison d'Audi, plutôt que masqué.
// - Tentatives institutionnelles sans contenu exploitable : Oracle Red Bull
//   Racing et Mercedes non retentées cette passe (déjà documentées
//   plusieurs fois ce round) ; aucune nécessaire pour les faits de cet
//   article, déjà solidement sourcés par ailleurs.
// - Grandprix.com (généraliste n°1) : QUATRE pages lues intégralement via
//   fetch-url.yml — le rapport de qualification complet ("Qualifying Report
//   - Norris beats the rain to Brazil pole"), le tableau complet de
//   classification officielle par pilote et par phase ("Qualifying
//   Results" — base du point de méthode ci-dessus), l'article dédié à la
//   réaction de Russell ("Russell says aborted lap cost him a shot at Brazil
//   pole", avec citation directe tirée du rapport Mercedes du samedi — voir
//   communication directe ci-dessous) et l'article sur la reprise après la
//   pluie ("Brazil qualifying resumes after torrential rain delay", citation
//   nommée du pilote de voiture de sécurité Bernd Maylander sur
//   l'aquaplaning). Piège de cache confirmé une fois : une première tentative
//   sur l'URL de l'article Russell a renvoyé par erreur le contenu de
//   l'article sur la reprise après la pluie (même contenu servi sur deux
//   slugs différents) ; une seconde tentative sur la même URL, quelques
//   minutes plus tard, a bien renvoyé le contenu attendu — signalé comme un
//   glitch de cache transitoire côté Grandprix.com plutôt qu'une erreur de
//   slug, conformément à la prudence déjà documentée pour un piège similaire
//   chez motorsport.com (docs/SOURCES.md, addendum round 18).
// - Crash.net (généraliste n°2) : page de liste /f1/news lue intégralement
//   (texte rendu, pas de piège de cache cette fois) — confirme
//   indépendamment PLUSIEURS titres : "Lando Norris takes pole in
//   heavily-delayed wet Brazil GP qualifying", "Mixed up Brazil GP starting
//   grid after five engine penalties", "Russell explains 'miscommunication'
//   and qualifying radio rage", "Verstappen 'lost 12 hours of my life I'll
//   never get back' with penalty", "Why Fernando Alonso was disappointed
//   despite qualifying heroics" — recoupement large et cohérent avec
//   Grandprix.com/The Race sur l'ensemble des faits de cet article.
// - The Race (technique/analytique n°1) : CINQ articles complets lus
//   intégralement via fetch-url.yml, slugs retrouvés depuis le HTML brut de
//   la page d'accueil (hrefs exacts) — le compte-rendu complet ("Norris on
//   Brazilian GP pole as Russell rages at Mercedes over aborted lap", Jack
//   Benyon, avec la retranscription complète de l'échange radio Russell/
//   Mercedes/Wolff), la grille de départ réelle chiffrée après pénalités
//   ("F1 2026 Brazilian Grand Prix starting grid with five penalties" —
//   base de la section 05 de cet article, avec l'explication exacte du
//   mécanisme Verstappen/Pérez), l'article d'analyse à charge émotionnelle
//   ("Why Russell's 'pole' was lost either way - and it hurt like hell",
//   Scott Mitchell-Malm, retranscription détaillée des échanges radio et
//   citations de Toto Wolff/Andrew Shovlin), l'article collectif
//   "Winners and losers from F1 2026 Brazilian GP qualifying" (citations
//   nommées de Leclerc, Hülkenberg, Hamilton, Gasly, Colapinto et Bortoleto
//   tirées des conférences de presse/media pen d'après-séance) et le
//   classement officiel par phase ("F1 2026 Brazilian GP qualifying
//   results", concordant au millième avec Grandprix.com). Piège de cache
//   confirmé à deux reprises sur ce domaine cette passe : le slug de la
//   grille de départ portait encore l'ancien titre interne "...with
//   four-penalties-copy" (visible dans l'URL) alors que l'article publié
//   affiche désormais "five penalties" dans son propre titre — signe d'un
//   brouillon renommé après l'ajout de la pénalité de Pérez sans que le slug
//   ne soit mis à jour, pas une erreur de ciblage de notre part ; et deux
//   tentatives consécutives sur l'URL "winners-and-losers" ont renvoyé par
//   erreur le contenu de l'article "Why Russell's pole..." avant qu'un
//   paramètre de requête différent ne débloque le bon contenu — même famille
//   de glitch de cache que celui déjà rencontré chez Grandprix.com ci-dessus
//   et chez motorsport.com au round 18, signalé par prudence plutôt que
//   silencieusement contourné.
// - Autosport (technique/analytique n°2) : page de liste /f1/news lue
//   intégralement — confirme indépendamment les titres "F1 Brazilian GP:
//   Norris splashes to pole from Russell" et "Why Russell was so angry in
//   Brazilian GP qualifying despite already having a grid penalty",
//   recoupant Grandprix.com/The Race sans rien y ajouter de nouveau (URL
//   d'article individuel non extractible de cette page de liste, limite
//   déjà documentée pour ce domaine).
// - r/F1Technical (communauté technique pointue) : nouvelle tentative réelle
//   (reddit.com/r/F1Technical/search.json?q=brazil+qualifying&restrict_sr=1
//   &sort=new) depuis fetch-url.yml, échec HTTP 403 — blocage anti-bot déjà
//   documenté pour toutes les séances précédentes de la saison, confirmé une
//   fois de plus.
// - Communication directe pilote : citation de George Russell explicitement
//   attribuée par Grandprix.com au « rapport Mercedes du samedi » (« In
//   Mercedes' Saturday report, he said... ») — canal propre écurie/pilote
//   (le rapport interne publié par l'écurie elle-même), pas une citation de
//   conférence de presse reformulée, dans la même famille que les citations
//   Instagram déjà utilisées en EL1/EL2 de ce round. DEUX tentatives
//   supplémentaires et explicitement documentées, toutes deux infructueuses :
//   instagram.com/mercedesamgf1 (HTTP 429, même échec que celui déjà
//   documenté pour l'EL3 de ce round) et x.com/LandoNorris (HTTP 403).
//   Les citations de Russell en session radio/presse (section 03) et celles
//   de Leclerc/Hülkenberg/Hamilton/Gasly/Colapinto/Bortoleto (section 04,
//   toutes tirées de conférences de presse ou de media pen d'après-séance
//   selon The Race) sont explicitement NON étiquetées « communication
//   directe » dans le texte — même distinction que celle déjà appliquée tout
//   ce round.
// - WebSearch n'a été utilisé à AUCUN moment pour sourcer un fait de cet
//   article, conformément à la règle déjà établie dans docs/SOURCES.md.
//
// Zéro contenu « people » : plusieurs titres disponibles ce jour-là chez
// Crash.net et Grandprix.com (dispute Ralf Schumacher/Herta, détails du
// financement du baquet d'Ocon chez Haas par Vasseur, dépenses personnelles
// d'Antonelli et de ses parents) ont été délibérément écartés de cet
// article — même règle éditoriale appliquée tout ce round.
export const ROUND20_QUALI_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de São Paulo · Autódromo José Carlos Pace (Interlagos) · Qualifications — samedi 7 novembre</p>
    <p class="verdict">Lando Norris décroche sa troisième pole consécutive à Interlagos dans une séance entièrement disputée sous la pluie, interrompue plus d'une heure et vingt minutes par un drapeau rouge pour cause d'aquaplaning — mais la vraie histoire de cet après-midi est ailleurs : George Russell, auteur du tour le plus rapide de toute la séance, abandonne sur consigne d'équipe la tentative qui aurait pu lui offrir la pole, pendant que la cascade de pénalités déjà connue avant la séance (Verstappen, Hamilton, Leclerc, Pérez, Russell) redessine entièrement la grille réelle de dimanche.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">Pole</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">1:27,470</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,204s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,625s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,819s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#2B4562"></span><span class="drv">Lawson</span> <span class="gap">+0,851s</span></div>
    </div>
    <p class="subverdict">L'EL3 de ce round avait anticipé un duel Antonelli/Norris pour la pole, Piastri en troisième larron, et jugeait la position de qualification largement secondaire pour les cinq pilotes déjà pénalisés. La pluie a rebattu ces deux pronostics : Antonelli ne se bat jamais vraiment pour la pole (il prend la troisième place, à six dixièmes) et Piastri est éliminé en Q2 — une première depuis Mexico 2024 selon The Race — pendant que Russell, bien plus rapide qu'Antonelli ce samedi, devient le vrai protagoniste du drame de cette séance. Sur la grille réelle de dimanche, en revanche, l'EL3 avait raison sur le fond : les pénalités comptent énormément. Norris et Antonelli héritent de la première ligne, Liam Lawson et Nico Hülkenberg (voiture n°27) d'une deuxième ligne inattendue grâce aux pénalités de Russell et Leclerc, tandis que Verstappen, Hamilton et Pérez s'alignent tous les trois dans les trois dernières places de la grille.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-q-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Q1 — drapeau rouge après deux minutes, 84 minutes d'arrêt pour aquaplaning</h2>
    <p>La séance a basculé dans le chaos presque immédiatement : le drapeau rouge est sorti un peu plus de deux minutes après le début de Q1, les flaques d'eau stagnante rendant la piste impraticable au-delà d'un simple manque d'adhérence. Grandprix.com et The Race décrivent tous deux une suspension de plus de 80 minutes (84 minutes selon Grandprix.com), rythmée par des tours d'inspection répétés de la voiture de sécurité. Bernd Maylander, pilote de la voiture de sécurité, cité par Grandprix.com pendant l'interruption : <em>« There is a lot of standing water, even on the straights, and that creates high-speed aquaplaning. »</em> Pendant l'attente, Oliver Bearman a reçu un avertissement de pilotage pour avoir reculé dans la voie des stands avant même le début de la séance.</p>
    <p>À la reprise, toute la grille roule en pneu pluie (WET) — aucun intermédiaire, encore moins de sec, à ce stade. Sergio Pérez pose le premier repère en 1:40,881, puis Verstappen (1:37,932) et Alonso (1:36,930) font tomber le chrono à mesure que l'adhérence s'améliore. Hülkenberg et Bearman se partagent brièvement la tête avant une succession d'améliorations ; Norris referme la phase en tête avec 1:30,939, devant Russell (1:31,206) et Verstappen (1:31,238). Les prises de risque restent nombreuses : Rafael Câmara tourne en tête-à-queue et touche le mur sans abandonner, tandis que Gabriel Bortoleto sort de piste et casse l'aileron arrière de son Audi, mettant fin à sa séance avec seulement trois tours chronométrés exploitables sur cinq disputés — l'explication concrète derrière son temps anormalement lent (1:41,564) dans le classement brut par meilleur tour. Les deux Alpine (Colapinto puis Gasly), Stroll, les deux Cadillac (Bottas devant Pérez) et Bortoleto sont éliminés, dans cet ordre ; Câmara, malgré son accrochage, se qualifie pour la Q2, comme Bearman et Piastri.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-q-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Q2 — le pari intermédiaire, le tour le plus rapide de la séance, Piastri piégé par le drapeau rouge</h2>
    <p>La piste continue de s'assécher, mais la vraie décision de cette phase est de savoir QUAND quitter le pneu pluie pour l'intermédiaire. Leclerc prend d'abord la tête en 1:29,795, puis Russell améliore à 1:29,285. Alonso est l'un des premiers à basculer sur intermédiaire, suivi de Bearman, Lawson et Hadjar. Bearman prend brièvement la tête en 1:29,130, avant que Lawson ne démontre l'avantage de la gomme intermédiaire avec 1:27,478. Russell abaisse alors le repère à <strong>1:26,745 — le tour le plus rapide de toute la séance de qualification</strong>, toutes phases confondues (voir le point de méthode développé en section 04 : ce tour ne comptera pourtant jamais pour la pole). Lawson améliore encore (1:27,049), Hadjar prend la troisième place provisoire (1:27,218).</p>
    <p>Les deux McLaren se retrouvent en danger à l'autre bout du classement : Norris ne remonte qu'en neuvième position (1:29,207), Antonelli en dixième (1:29,302) — aucun des deux n'a de marge. Puis Câmara part à la faute à Juncao dans la dernière minute : le drapeau rouge mis fin à la Q2 sans redémarrage, gelant Norris et Antonelli de justesse à l'intérieur du couperet et laissant <strong>Piastri à l'extérieur</strong> — une élimination surprise avant la Q3, une première pour lui depuis Mexico 2024 selon The Race, qui l'explique par un passage trop tardif à l'intermédiaire : « We needed that extra lap to really get some temperature into them », a justifié Piastri en media pen. Arvid Lindblad s'était déjà arrêté à la Descida do Lago pour un problème lié au groupe propulseur. Neuf écuries atteignent la Q3, Mercedes étant la seule à y placer ses deux voitures.</p>
    <p>Max Verstappen, lui, ne tente AUCUN tour chronométré en Q2 : un choix délibéré de Red Bull, sa pénalité de fond de grille déjà connue rendant la Q2/Q3 sans enjeu sportif — The Race le confirme explicitement (« cleverly decided not to run in the session at all to save tyres for tomorrow's race and protect his car »). Lewis Hamilton, pour la même raison (pénalité de fond de grille déjà actée), roule bien en Q2 mais ne bascule jamais sur l'intermédiaire dans les six dernières minutes, se contentant de rester aux stands — The Race : « basically surrendering the rest of the session ». Les deux cas illustrent, à l'envers, ce que la cascade de pénalités fait à une qualification : conserver des pneus et préserver la monoplace devient plus rationnel que de chercher une position de départ qui ne sera jamais appliquée. Derrière Hamilton (11e, 1:30,001) : Piastri (12e), Câmara (13e, son tour plus rapide de 1:31,470 supprimé pour limites de piste au virage 8 — voir section 04), Lindblad (14e) et Sainz (15e).</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-q-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Q3 — Norris devance la prochaine averse, et le drame radio de Russell</h2>
    <p>Dix pilotes, une seule question : combien de tours lancés le radar météo laissera-t-il faire avant la prochaine averse ? Alonso ouvre la phase sur intermédiaire pour sécuriser un temps avant que la fenêtre ne se referme (1:30,311), mais Lawson le bat largement (1:28,321). Norris prend la tête (1:28,079), puis Russell passe devant (1:27,674). Norris trouve enfin 1:27,470 à son tour suivant — et avec encore sept minutes affichées au chrono, l'averse plus forte qui arrive règle de fait la pole, personne n'ayant plus l'occasion de répondre.</p>
    <p>Le vrai drame de cette Q3 se joue sur la radio Mercedes, retranscrite intégralement par The Race. Russell, en train de rattraper Alex Albon sur son relais décisif, est d'abord invité à le dépasser (« Move, Albono! »), puis l'équipe lui annonce qu'il y aura le temps d'un tour supplémentaire, avant de finalement lui ordonner de lever le pied pour préparer une nouvelle tentative plutôt que de terminer le tour en cours, en pleine pluie grandissante :</p>
    <div class="callout">
      <strong>GR</strong> : « Move, Albono! »<br/>
      <strong>Ingénieur</strong> : « So, we will get one more lap here. »<br/>
      <strong>GR</strong> : « You need to tell me mate what I'm doing, if I'm backing or going. »<br/>
      <strong>Ingénieur</strong> : « We can back up now, back up now. »<br/>
      <strong>GR</strong> : « Are you sure? »<br/>
      <strong>Ingénieur</strong> : « It's raining heavier now. »<br/>
      <strong>GR</strong>, au milieu du tour abandonné : « Mate I should have f***ing finished the lap! »<br/>
      <strong>GR</strong> : « MATE! You f***ing told me to back off. What the hell! »<br/>
      <strong>Wolff</strong> : « George you're P2. »<br/>
      <strong>GR</strong> : « Yeah but… P2. I don't wanna be P2, I want to be P1. That was a P1 lap. F******ing hell! »
    </div>
    <p>Russell lui-même, dans sa réaction d'après-séance reprise par Crash.net, parle de « miscommunication » plutôt que de faute unilatérale — une nuance confirmée par Grandprix.com : dans le rapport Mercedes du samedi (communication directe écurie/pilote, pas une reformulation média), Russell reconnaît une part de responsabilité partagée : <em>« We collectively made a misjudgement at the end and that's frustrating, but these things happen. »</em> Scott Mitchell-Malm (The Race), dans une analyse dédiée, nuance davantage encore l'ampleur réelle de la perte : Russell était effectivement quelques centièmes devant Norris au moment de l'abandon, mais il talonnait Albon d'assez près pour avoir déjà perdu du temps dans trois mini-secteurs consécutifs avant même d'abandonner — selon cette analyse, même en finissant le tour, un contact avec un Albon lui-même touché par un gros blocage à l'approche de Juncão aurait vraisemblablement coûté à Russell le temps nécessaire pour battre Norris. Toto Wolff, cité par The Race, reconnaît malgré tout avec le recul : <em>« in hindsight, with the rain coming on the next lap, we should have kept going but it is very easy to say this after the event. »</em> Quelle qu'en soit la cause exacte, le résultat est inchangé : Norris 1:27,470, Russell 1:27,674, soit 0,204s d'écart — la pole la plus disputée du week-end, et pourtant sans aucune conséquence sur la position de départ réelle de Russell, déjà amputée de cinq places.</p>
    <p>Derrière, Antonelli améliore de 1:28,609 à 1:28,095 pour la troisième place ; Leclerc, de 1:28,629 à 1:28,289, prend la quatrième. Le tour initial de Lawson (1:28,321) tient la cinquième place, Hülkenberg (voiture n°27) complète une après-midi remarquable pour Audi en sixième avec 1:28,668 — son meilleur résultat de qualification de la saison, net progrès sur sa neuvième place en Espagne, et obtenu après n'avoir disputé qu'une seule séance d'essais libres du week-end (l'EL3, après l'arrêt de Slater en EL1 puis l'absence totale en EL2, déjà documentés). Hadjar (septième, 1:28,763), Bearman (huitième, 1:29,831, meilleur résultat de qualification de Haas cette saison), Alonso (neuvième, 1:30,311, meilleur départ de la saison pour Aston Martin) et Albon (dixième, 1:30,456, première apparition en Q3 de l'année pour Williams) complètent le top 10.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-q-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Classement brut contre classement officiel : pourquoi Russell n'est pas "le plus rapide", et ce que ça dit de cette séance</h2>
    <p>Comme pour les qualifications du round 19 (Mexico), le classement par meilleur tour toutes phases confondues issu de la base brute (scripts/practice_briefing.py) NE CORRESPOND PAS au classement officiel de qualification — et l'écart est cette fois le plus spectaculaire observé cette saison, parce qu'il change littéralement qui a signé "le tour le plus rapide" :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Meilleur tour brut (toutes phases)</th><th>Phase réelle</th><th>Ligne officielle (Q3 ou dernière phase atteinte)</th><th>Position officielle</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>1:26,745 (le plus rapide de la séance)</td><td>Q2</td><td>1:27,674 (Q3)</td><td><strong>2e</strong>, pas 1er</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>1:27,049</td><td>Q2</td><td>1:28,321 (Q3)</td><td>5e</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>1:27,218</td><td>Q2</td><td>1:28,763 (Q3)</td><td>7e</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>1:28,082</td><td>Q2</td><td>1:28,289 (Q3)</td><td>4e</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg (#27)</td><td>1:28,361</td><td>Q2</td><td>1:28,668 (Q3)</td><td>6e</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>1:28,918</td><td>Q2</td><td>1:30,456 (Q3)</td><td>10e</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>1:31,238 (8/9 tours)</td><td><strong>Q1</strong> (aucun tour en Q2)</td><td>« No Time » en Q2</td><td>16e</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span> Câmara</td><td>1:31,470 (supprimé, limites de piste virage 8)</td><td>Q2</td><td>1:31,515 (Q2, tour valide)</td><td>13e</td></tr>
      </tbody>
    </table>
  </div>
  <div class="prose">
    <p>Le cas Russell est celui qui compte vraiment : son 1:26,745, signé pendant le pari intermédiaire de Q2, reste à ce jour le tour le plus rapide de toute la séance de qualification — mais la règle est la même que partout en Formule 1 et que celle déjà documentée pour Mexico : le classement de Q3 ne retient QUE les tours signés en Q3, même plus lents que ceux d'une phase antérieure. Russell n'a donc jamais été "le plus rapide" au sens du résultat officiel, malgré l'avoir été au sens brut — une nuance qui change l'intégralité du récit de cette qualification si on ne la connaît pas. Le cas Verstappen illustre l'inverse : son temps le plus rapide de la base a été signé en Q1, pas parce qu'il manquait de rythme en Q2, mais parce qu'il n'y a tout simplement pas roulé, sa pénalité de fond de grille rendant la tentative inutile. Le cas Câmara, enfin, reproduit presque à l'identique le mécanisme déjà documenté pour Bearman au round 19 : un tour plus rapide supprimé pour limites de piste, remplacé au classement officiel par un tour plus lent mais valide.</p>
    <div class="callout">Réserve méthodologique explicite, dans la continuité de celle déjà posée pour les qualifications du round 19 : le classement brut par meilleur tour toutes phases confondues est un outil de vérification utile (et il révèle ici un fait réel et spectaculaire — Russell a bien signé le tour le plus rapide de la séance), mais ce n'est PAS le classement de qualification. Les deux sources externes consultées (Grandprix.com, The Race) publient directement le classement officiel par phase et concordent au millième entre elles — c'est ce classement par phase qui fait foi dans le reste de cet article, pas le tableau brut ci-dessus.</div>
  </div>
</section>

<section class="block" data-num="05" id="sec-q-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> La cascade de pénalités redessine la grille : qui hérite de quoi, avec de vrais chiffres</h2>
    <p>Les cinq pénalités de grille étaient toutes déjà connues et confirmées par les commissaires avant cette qualification (Verstappen -30, Hamilton -75, Leclerc -10, Pérez -30, Russell -5, cette dernière depuis l'EL1 de ce round) — la question n'était donc jamais "si" elles s'appliqueraient, mais comment elles redistribueraient les places entre les pilotes non pénalisés. The Race publie la grille provisoire complète chiffrée, et le mécanisme vaut d'être expliqué avec ses vrais chiffres plutôt que recalculé à la main : Russell (2e en qualification) et Leclerc (4e) reculent respectivement à leurs 7e et 14e places réelles ; Hamilton et Verstappen, n'ayant pas disputé l'intégralité de la séance du fait de leurs pénalités déjà actées (section 02), s'alignent automatiquement au fond de la grille — mais PAS dans l'ordre de leur pénalité : bien que Verstappen et Pérez aient chacun "seulement" 30 places de pénalité contre 75 pour Hamilton, c'est Verstappen qui s'élance 21e, DEVANT Pérez (22e et dernier), parce que la règle départage les pilotes contraints au fond de grille par leur temps réellement signé — et le tour de Verstappen en Q1 (1:31,238) reste plus rapide que celui de Pérez en Q1 (1:34,509, où il n'a même pas tenté l'intermédiaire). Pérez n'est donc pas dernier à cause de l'ampleur de sa pénalité, mais parce que Cadillac reste l'écurie la plus lente du plateau.</p>
    <p>Côté bénéficiaires : Kimi Antonelli, déjà troisième en qualification, hérite de la deuxième place sur la grille aux côtés de Norris — la première ligne version Mercedes/McLaren sans qu'aucun des deux n'ait eu besoin d'une pénalité adverse pour y figurer, puisque Russell (2e en qualification) partait de toute façon derrière lui une fois la pénalité appliquée. Liam Lawson et Nico Hülkenberg (voiture n°27), respectivement 5e et 6e en qualification, grimpent à la 3e et à la 4e place réelles — une deuxième ligne Racing Bulls/Audi totalement inédite cette saison, directement permise par les pénalités de Russell et Leclerc. Ollie Bearman passe de la 8e à la 6e place, Fernando Alonso de la 9e à la 8e, Alex Albon de la 10e à la 9e — chacun profitant d'un rang gagné sur la grille sans avoir eux-mêmes amélioré leur propre chronométrage. Même Oscar Piastri, pourtant éliminé en Q2 avec seulement la 12e place de qualification, se retrouve 10e sur la grille réelle, aux portes du top 10.</p>
  </div>
</section>

<section class="block" data-num="06" id="sec-q-6">
  <div class="sec-marker"><span class="n">06</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">06</span> Classement officiel de qualification (par phase)</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos. quali</th><th>Pilote</th><th>Écurie</th><th>Q1</th><th>Q2</th><th>Q3</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:30,939</td><td>1:29,207</td><td>1:27,470</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:31,206</td><td>1:26,745</td><td>1:27,674</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:32,229</td><td>1:29,302</td><td>1:28,095</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:32,121</td><td>1:28,082</td><td>1:28,289</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:32,085</td><td>1:27,049</td><td>1:28,321</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg (#27)</td><td>Audi</td><td>1:31,693</td><td>1:28,361</td><td>1:28,668</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:32,059</td><td>1:27,218</td><td>1:28,763</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:33,030</td><td>1:29,130</td><td>1:29,831</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:32,092</td><td>1:29,072</td><td>1:30,311</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:33,150</td><td>1:28,918</td><td>1:30,456</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:31,666</td><td>1:30,001</td><td>— (Q2, pénalité déjà actée)</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:32,251</td><td>1:30,369</td><td>— (éliminé en Q2)</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Câmara</td><td>Haas F1 Team</td><td>1:32,809</td><td>1:31,515 (tour plus rapide supprimé, limites de piste virage 8)</td><td>—</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:32,306</td><td>1:31,687</td><td>—</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:32,959</td><td>1:31,785</td><td>—</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:31,238</td><td>— (No Time, pénalité déjà actée)</td><td>—</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:33,327</td><td>—</td><td>—</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:33,449</td><td>—</td><td>—</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:33,653</td><td>—</td><td>—</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:33,774</td><td>—</td><td>—</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>1:34,509</td><td>—</td><td>—</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:41,564 (3/5 tours, sortie de piste virage Juncão, aileron arrière cassé)</td><td>—</td><td>—</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" data-num="07" id="sec-q-7">
  <div class="sec-marker"><span class="n">07</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">07</span> Grille de départ réelle de dimanche (après pénalités)</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Grille</th><th>Pilote</th><th>Écurie</th><th>Note</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>Pole (1:27,470) — 3e pole consécutive à Interlagos</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>3e en qualification ; avance grâce aux pénalités de Russell et Leclerc</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>5e en qualification ; meilleur départ de la saison</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg (#27)</td><td>Audi</td><td>6e en qualification ; meilleur départ d'Audi cette saison</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>7e en qualification</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>8e en qualification ; meilleur départ de Haas cette saison</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>2e en qualification (0,204s de la pole) ; pénalité grille -5 (moteur), connue depuis l'EL1</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>9e en qualification ; meilleur départ d'Aston Martin cette saison</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>10e en qualification ; 1re apparition en Q3 cette saison</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>12e en qualification (éliminé en Q2) ; avance grâce aux pénalités</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Câmara</td><td>Haas F1 Team</td><td>13e en qualification ; tour plus rapide supprimé pour limites de piste</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>14e en qualification ; arrêt sur problème de groupe propulseur</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>15e en qualification</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>4e en qualification (0,819s de la pole) ; pénalité grille -10 (moteur)</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>17e en qualification</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>18e en qualification</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>19e en qualification</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>20e en qualification</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>22e en qualification ; sortie de piste et aileron arrière cassé en Q1</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>Pénalité grille -75 (total, après +65 places supplémentaires suite à l'incident EL3) ; n'a pas disputé la Q3</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>Pénalité grille -30 (moteur) ; devant Pérez car son temps de Q1 (1:31,238) reste plus rapide</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>Pénalité grille -30 (moteur) ; dernier car son temps de Q1 (1:34,509) est le plus lent des pénalisés de fond de grille</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
  <div class="prose">
    <div class="callout">Grille provisoire telle que publiée par The Race au soir de la qualification (la FIA n'avait pas encore émis la grille définitive au moment des sources consultées, selon Grandprix.com) — cohérente avec la projection publiée indépendamment par Grandprix.com (Norris/Antonelli en première ligne, Lawson/Hülkenberg en deuxième). Aucune réserve des commissaires n'est mentionnée dans les sources consultées pour ce round, contrairement à l'affaire Lawson/MGU-K du round 19.</div>
  </div>
</section>

<section class="block" id="sec-q-8">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en course</h2>
    <p>Norris part en pole avec Antonelli juste derrière, et c'est McLaren qui aborde ce dimanche avec le moins à perdre sur la grille : aucun des deux pilotes jugés menaçants sur le rythme sec (Antonelli) ou sur le rythme long (Leclerc, d'après l'EL1/EL2) ne s'aligne devant eux. Mais le vrai pilote à surveiller n'est ni sur la pole ni sur la première ligne : Russell a signé le tour le plus rapide de toute la qualification et s'élance pourtant seulement 7e — si la piste reste humide ou mixte dimanche, conditions dans lesquelles Mercedes a affiché toute la séance une pace supérieure à celle de Norris lui-même, une remontée rapide dans les premiers tours n'aurait rien d'un exploit improbable, plutôt la confirmation d'un rythme déjà démontré samedi.</p>
    <p>Derrière, Lawson et Hülkenberg (voiture n°27) partent en deuxième ligne sans avoir à battre qui que ce soit sur la piste pour y rester un moment : leur vraie question dimanche sera de résister à la pression des voitures plus rapides en temps pur mais parties plus loin. À l'autre bout de la grille, Verstappen (21e) et Hamilton (20e) partent avec des monoplaces jugées parmi les plus rapides du plateau sur un tour sec (Verstappen a dominé l'EL3) et un passif connu de remontées spectaculaires à Interlagos — Laurent Mekies évoquait déjà en EL3 les « miracles » passés de Verstappen sur ce circuit depuis le fond de grille. Mais Hamilton lui-même tempère l'attente d'un spectacle garanti, cité par The Race en media pen d'après-séance : <em>« I think overtaking will be very, very, very hard. I'm not sure you're going to see the same sort of races that you've seen in the past. »</em> Pérez, dernier sur la grille malgré une pénalité identique à celle de Verstappen, n'a lui aucune machine de pointe pour compenser.</p>
    <p>Le pronostic le plus honnête pour dimanche tient donc en trois temps, sans excès de certitude compte tenu de la météo qui a déjà rebattu toutes les hiérarchies ce week-end : Norris est le favori logique pour la victoire, protégé par une grille où aucun rival rapide ne part devant lui ; Antonelli, deuxième sur la grille et déjà sacré champion du monde, est la menace la plus directe et la moins dépendante des conditions ; et Russell, malgré son septième départ, reste le nom à surveiller en cas de piste encore humide ou changeante dimanche — le seul pilote de tout le plateau à avoir, samedi, signé un tour plus rapide que celui de la pole elle-même.</p>
    <div class="callout">Rappel de méthode : la comparaison classement brut/classement officiel de la section 04 est un outil de vérification, pas une seconde grille parallèle — c'est la grille réelle de la section 07, construite à partir du classement officiel par phase et de la cascade de pénalités déjà confirmée par les commissaires, qui sert de base à ce pronostic.</div>
  </div>
</section>

<section class="block" id="sec-q-9">
  <details class="sources">
    <summary>Sources utilisées — Qualifications São Paulo (12 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), session_key=11408, 391 tours/22 pilotes : classement, secteurs, relais, météo (pluie intermittente confirmée, aucun tour sur pneu sec de toute la séance). Primaire.</span></li>
        <li><span class="desc">The Pit Wall — classement brut par meilleur tour toutes phases confondues (scripts/practice_briefing.py) : base du point de méthode de la section 04 (Russell, Verstappen, Câmara), vérifié par recoupement direct avec Grandprix.com et The Race plutôt qu'utilisé seul.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1299/sao-paulo/qualifying" data-desc="Titre de page confirmé (« FORMULA 1 MSC CRUISES GRANDE PRÊMIO DE SÃO PAULO 2026 - QUALIFYING »), bon round/bonne séance. Tableau de classement lui-même hors de la fenêtre de troncature récupérée (limite déjà documentée pour ce domaine). Lu en HTML brut via fetch-url.yml.">Formula1.com — résultats officiels qualifications</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.mclaren.com/racing/" data-desc="Page d'accueil McLaren Racing, lue intégralement : confirme la pole de Norris, la qualifie de « Qualifying threepeat » (3e pole consécutive à Interlagos, pas 3 poles consécutives cette saison).">McLaren Racing — site officiel</a><span class="desc">McLaren.com</span></li>
        <li><span class="desc">Audi (audif1.com/en), lu intégralement : actif, contenu générique São Paulo, mais aucun contenu daté publié après la qualification elle-même — gap institutionnel documenté sur le meilleur résultat de grille de la saison d'Audi. Pirelli (press.pirelli.com/tagfeed/en/tags/press__releases), relu intégralement une cinquième fois pour ce round : toujours aucune entrée spécifique à São Paulo 2026 — régression déjà documentée pour l'EL1/EL2/EL3 de ce round, confirmée une fois de plus.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.grandprix.com/races/brazilian-gp-2026-qualifying-report.html" data-desc="Rapport complet de qualification (« Qualifying Report - Norris beats the rain to Brazil pole ») : déroulé des trois phases, drapeau rouge et aquaplaning, citation Norris, grille projetée après pénalités. Lu intégralement via fetch-url.yml.">Grandprix.com — rapport de qualification</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.grandprix.com/races/brazilian-gp-2026-qualifying-results.html" data-desc="Tableau complet de classification officielle par pilote et par phase (« FIA provisional qualifying classification ») — base du point de méthode de la section 04 et du tableau de la section 06. Concordant au millième avec The Race. Lu intégralement via fetch-url.yml.">Grandprix.com — classement officiel de qualification</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.grandprix.com/news/russell-says-aborted-lap-cost-him-a-shot-at-brazil-pole.html" data-desc="Réaction complète de Russell, citation directe tirée du rapport Mercedes du samedi (communication directe écurie/pilote). Piège de cache transitoire rencontré sur cette URL (première tentative : contenu erroné servi, contenu correct obtenu à la seconde tentative). Lu intégralement via fetch-url.yml.">Grandprix.com — la réaction de Russell</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.grandprix.com/news/brazil-qualifying-resumes-after-torrential-rain-delay.html" data-desc="Détail de la reprise après le drapeau rouge, citation nommée du pilote de voiture de sécurité Bernd Maylander sur l'aquaplaning. Lu intégralement via fetch-url.yml.">Grandprix.com — la reprise après la pluie</a><span class="desc">Grandprix.com</span></li>
        <li><span class="desc">Crash.net — page de liste /f1/news lue intégralement (sans piège de cache cette fois) : confirme indépendamment les titres "Lando Norris takes pole in heavily-delayed wet Brazil GP qualifying", "Mixed up Brazil GP starting grid after five engine penalties", "Russell explains 'miscommunication' and qualifying radio rage", "Verstappen 'lost 12 hours of my life I'll never get back' with penalty", "Why Fernando Alonso was disappointed despite qualifying heroics".</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/norris-on-brazilian-gp-pole-as-russell-rages-at-mercedes-over-aborted-lap/" data-desc="Compte-rendu complet (Jack Benyon) : retranscription intégrale de l'échange radio Russell/Mercedes/Wolff, déroulé Q1/Q2/Q3, cas Verstappen/Hamilton en Q2. Lu intégralement via fetch-url.yml.">The Race — Norris prend la pole, Russell fulmine</a><span class="desc">The Race (Jack Benyon)</span></li>
        <li><a href="https://www.the-race.com/formula-1/f1-2026-brazilian-grand-prix-starting-grid-with-four-penalties-copy/" data-desc="Grille de départ réelle chiffrée après pénalités (titre publié « ...with five penalties » malgré un slug d'URL resté sur « four-penalties-copy », signe d'un brouillon renommé sans mise à jour du slug) — base de la section 05, avec l'explication exacte du mécanisme Verstappen/Pérez. Lu intégralement via fetch-url.yml.">The Race — la grille de départ après cinq pénalités</a><span class="desc">The Race</span></li>
        <li><a href="https://www.the-race.com/formula-1/why-russells-pole-was-lost-either-way-and-it-hurt-like-hell/" data-desc="Analyse dédiée (Scott Mitchell-Malm) : retranscription détaillée des échanges radio, citations nommées de Toto Wolff et Andrew Shovlin, nuance sur l'issue probable du tour si Russell l'avait terminé. Lu intégralement via fetch-url.yml.">The Race — pourquoi la "pole" de Russell était perdue de toute façon</a><span class="desc">The Race (Scott Mitchell-Malm)</span></li>
        <li><a href="https://www.the-race.com/formula-1/winners-and-losers-from-f1-2026-brazilian-gp-qualifying/" data-desc="Article collectif (Ben Anderson, Scott Mitchell-Malm, Jack Benyon) : citations nommées de Leclerc, Hülkenberg, Hamilton, Gasly, Colapinto et Bortoleto tirées des conférences de presse/media pen d'après-séance. Piège de cache rencontré deux fois sur cette URL avant d'obtenir le bon contenu. Lu intégralement via fetch-url.yml.">The Race — vainqueurs et perdants de la qualification</a><span class="desc">The Race</span></li>
        <li><a href="https://www.the-race.com/formula-1/f1-2026-brazilian-gp-qualifying-results/" data-desc="Classement officiel par phase, concordant au millième avec Grandprix.com. Lu intégralement via fetch-url.yml.">The Race — classement de qualification</a><span class="desc">The Race</span></li>
        <li><span class="desc">Autosport — page de liste /f1/news lue intégralement : confirme indépendamment les titres "F1 Brazilian GP: Norris splashes to pole from Russell" et "Why Russell was so angry in Brazilian GP qualifying despite already having a grid penalty" (URL d'article individuel non extractible de cette page de liste, limite déjà documentée pour ce domaine).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Communauté technique pointue et communication directe pilote — tentatives documentées</h5>
      <ul>
        <li><span class="desc">r/F1Technical : nouvelle tentative réelle (reddit.com/r/F1Technical/search.json?q=brazil+qualifying&restrict_sr=1&sort=new) depuis fetch-url.yml, échec HTTP 403 — blocage anti-bot déjà documenté pour toutes les séances précédentes de la saison, confirmé une fois de plus.</span></li>
        <li><span class="desc">Communication directe pilote : citation de Russell tirée du rapport Mercedes du samedi, relayée par Grandprix.com (voir section Généraliste ci-dessus) — canal propre écurie/pilote, dans la même famille que les citations Instagram déjà utilisées en EL1/EL2 de ce round. Deux tentatives supplémentaires explicitement documentées et infructueuses : instagram.com/mercedesamgf1 (HTTP 429, même échec que celui déjà documenté pour l'EL3 de ce round) et x.com/LandoNorris (HTTP 403).</span></li>
      </ul>
    </div>
  </details>
</section>
`;
