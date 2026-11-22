// Analyse Round 21 — Grand Prix de Las Vegas (Las Vegas Strip Circuit), saison
// 2026. Clôt le round, après EL1/EL2/EL3/Qualifying (web/app/courses/21/
// el1-fr.js, el2-fr.js, el3-fr.js, quali-fr.js) : aucune contradiction
// volontaire avec leur contenu (pole de Verstappen malgré un meilleur temps
// brut d'Antonelli en Q3 — pénalité moteur de 5 places déjà détaillée en
// Quali —, l'effet d'aspiration déjà identifié comme fil conducteur du
// week-end, le dommage de fond plat d'Hamilton en qualifs, le verdict de
// l'enquête Verstappen de l'EL3 — avertissement, sans pénalité — confirmé en
// Quali).
//
// Données de course : donnée primaire = pipeline OpenF1 (session_key=11420),
// confirmée complète via ingest-openf1.yml le 2026-11-22T09:10 UTC (989
// lignes lap_times, 45 tyre_stints, 148 weather_readings, 110
// race_control_messages, 27 track_status_events, 361 overtakes). La table
// `results` (pipeline Jolpica) N'EST PAS encore peuplée pour ce round au
// moment de la rédaction (vérifié via race-briefing.yml : sections RÉSULTATS/
// CLASSEMENT PILOTES/ARRÊTS/PNEUS toutes vides) — scripts/race_briefing.py a
// donc été utilisé UNIQUEMENT pour sa section météo (sans jointure) et pour la
// relecture complète des race_control_messages (section MESSAGES DE COURSE,
// sans filtre ni jointure, confirmée exhaustive via race_briefing_full_rcm.py
// séparément). Le classement officiel (arrivée, grille, écarts, pénalités,
// points) a donc été obtenu en primaire via Formula1.com et PlanetF1
// ci-dessous — jamais fabriqué à partir des seuls comptes de tours de la base.
//
// Analyse technique chiffrée : scripts/race_briefing_laptimes_by_car.py
// --cars 3:VER 63:RUS 1:NOR 6:HAD 12:ANT 81:PIA 16:LEC 44:HAM 27:HUL 30:LAW
// (podium + cluster de tête + Hamilton/Leclerc). Relais identifiés DIRECTEMENT
// depuis les marqueurs [IN]/[OUT] des tours bruts (table tyre_stints écartée
// comme base de calcul cette passe : elle ne distingue, pour la quasi-totalité
// des pilotes, qu'un seul tour de relais autour de l'arrêt sous voiture de
// sécurité — bornes inexploitables pour un calcul de moyenne, même défaut déjà
// documenté pour le round 20). Méthode identique au principe des rounds
// précédents : premier tour de chaque relais (sortie de stand, tag OUT)
// toujours exclu, dernier tour (tag IN) exclu sauf s'il s'agit du tout dernier
// relais de la course pour ce pilote, puis tours restants > 103% de la
// médiane du relais écartés. Résultat : les tours [IN]/[OUT] eux-mêmes
// situent la voiture de sécurité très précisément entre le tour 19 et le tour
// 20-21 pour la quasi-totalité du plateau interrogé — concordant exactement
// avec le déroulé donné par Formula1.com/PlanetF1 (voiture de sécurité
// déployée après l'accrochage Pérez/Câmara, relance au tour 25). Sur le
// premier relais (1 à 19, avant voiture de sécurité), les dix pilotes
// interrogés se tiennent dans un mouchoir de poche (1:38,596 à 1:39,712) —
// concordant avec le récit média d'un peloton de tête extrêmement resserré
// toute la course. Sur le second relais (relance à l'arrivée), Hadjar signe
// la moyenne nettoyée la plus rapide de l'échantillon (1:36,737) mais sur un
// relais entamé bien après tout le monde (second arrêt au tour 27 après avoir
// cassé son aileron avant juste après la relance) et en roulant seul à
// l'arrière du peloton, hors de toute bataille — signalé explicitement comme
// un signal de rythme en air dégagé, pas une preuve de rythme de course
// comparable aux pilotes de tête qui se sont battus roue dans roue pendant
// l'essentiel du relais.
//
// Sourcing (4 sources indépendantes minimum, 2 généralistes + 2 techniques/
// analytiques, + institutionnel + communication directe pilote, conformément
// à docs/OPERATIONS.md et docs/SOURCES.md — élargi pour la course) :
// - Formula1.com (officiel) : compte-rendu complet de course (« Verstappen
//   wins exhilarating Las Vegas Grand Prix from Norris and Piastri », lu
//   intégralement via fetch-url.yml) — la source la plus détaillée, dont la
//   quasi-totalité du déroulé de course (section 02) est directement issue.
//   Trois articles de réaction pilote également lus intégralement : Hamilton
//   (« frustrated by 'really harsh' Las Vegas penalty as he's quizzed on
//   Leclerc clash »), Leclerc (« 'I'll accept the blame' — Leclerc
//   'embarrassed' for Ferrari... »), Antonelli (« explains 'annoying'
//   last-lap issue... »), Russell (« 'I paid the price' — Russell laments
//   error... »).
// - PlanetF1 (généraliste n°1, à forte substance factuelle) : compte-rendu de
//   course tour par tour (« Max Verstappen survives Mercedes onslaught in
//   spectacular Las Vegas Grand Prix thriller »), lu intégralement via
//   fetch-url.yml — classement top 10 confirmé au dixième de seconde près
//   (concordant exactement avec Formula1.com pour les 5 premiers), citations
//   radio supplémentaires (Hadjar sur son aileron cassé, Hamilton sur son
//   maintien en piste pendant la voiture de sécurité), confirmation du
//   nombre de changements de tête en course (35, cohérent avec « plus de 30 »
//   dans la citation de Russell relayée par Formula1.com).
// - RacingNews365 (généraliste n°2) : page de résultats/actualités fetchée —
//   confirme par ses propres titres la convocation de Leclerc par Ferrari et
//   une enquête Hadjar distincte résolue par une pénalité, assortie d'une
//   pénalité de grille pour le Grand Prix du Qatar suivant (« Isack Hadjar
//   suffers insult to injury with Las Vegas penalty », « Adjusted 2026 F1 Las
//   Vegas Grand Prix results after Red Bull driver penalised », « F1 driver
//   handed significant Qatar GP grid penalty after Las Vegas calamity ») —
//   LIMITE DE SOURCING HONNÊTE : le corps de ces articles n'a pas pu être
//   atteint (l'URL précise de chaque article individuel n'a pas pu être
//   retrouvée ; la page fetchée a redirigé vers un gabarit générique
//   n'affichant que les titres). L'enquête visant Hadjar et Russell au tour
//   31 (« incident noted... will be investigated after the race », confirmée
//   par les race_control_messages bruts de la base) s'est donc bien conclue
//   par une pénalité pour Hadjar d'après ces titres, mais le détail exact
//   (temps de pénalité, impact sur son classement déjà hors des points) n'a
//   pas pu être vérifié davantage et n'est donc pas chiffré ci-dessous — seul
//   le fait qu'une pénalité a été prononcée, plus une pénalité de grille pour
//   le Qatar, est rapporté.
// - Institutionnel : Oracle Red Bull Racing (redbullracing.com/int-en, écurie
//   victorieuse) lu intégralement — actif, mais contenu non daté
//   spécifiquement sur ce résultat de course (statistiques de saison
//   agrégées uniquement) au moment du fetch, gap institutionnel documenté
//   comme tel plutôt que masqué, même pattern déjà rencontré pour les rounds
//   précédents. Pirelli (press.pirelli.com/tagfeed/en/tags/press__releases)
//   relu intégralement : toujours aucune entrée spécifique à Las Vegas 2026,
//   le contenu le plus récent du flux restant un communiqué de juin 2026 sur
//   l'extension du contrat FIA — régression déjà documentée pour l'EL1/EL2/
//   EL3/Quali de ce round, confirmée une fois de plus. Mercedes
//   (mercedesamgf1.com/en/news) : nouvel échec HTTP explicite, même mode
//   d'échec déjà documenté pour les séances précédentes de ce round.
// - Communication directe pilote : une tentative réelle cette passe
//   (instagram.com/redbullracing) — réponse HTTP 200 mais page entièrement
//   rendue en JavaScript côté client, aucun contenu extractible au-delà du
//   titre générique « Instagram » via le pipeline fetch-url.yml de ce projet
//   (qui ne récupère que du HTML statique). Gap honnêtement documenté :
//   aucune communication directe au sens strict de la règle éditoriale n'a
//   pu être intégrée pour cet article malgré cette tentative réelle — toutes
//   les citations utilisées (radio, conférence de presse, media pen) sont
//   explicitement non étiquetées « communication directe » dans le texte.
// - WebSearch a été utilisé pour LOCALISER les bons articles (confirmer
//   l'identité du vainqueur et éviter la confusion avec l'édition 2025 du
//   même Grand Prix, piège explicitement documenté par la règle de ce
//   projet — une première recherche a effectivement renvoyé des résultats
//   2025 à tort, écartés après vérification des dates de publication et du
//   contenu réel) — jamais comme source finale d'un fait sans vérification
//   par fetch-url.yml et lecture intégrale du contenu réel.
//
// FastF1 (télémétrie gaz/frein/rapport/régime/DRS) : ingest-fastf1.yml a été
// déclenché pour ce round puis re-vérifié via l'API GitHub Actions juste
// avant cette rédaction — resté au statut "queued" du début à la fin de
// cette tâche (runner auto-hébergé de l'utilisateur hors ligne). Aucune
// donnée FastF1 n'a donc pu être ajoutée ; aucun canal de télémétrie n'est
// mentionné nulle part dans le texte ci-dessous.
//
// Analyse Hamilton (règle éditoriale c-bis, 2026-11-09) : Lewis Hamilton a
// bien pris part à cette course (7e à l'arrivée). Voir section 03 dédiée.
//
// Zéro contenu « people » : le différend radio Hamilton/Leclerc rapporté par
// Formula1.com et PlanetF1 n'est repris QUE pour son contenu strictement
// sportif (les échanges radio en course, le freinage/la trajectoire au
// virage 7, le verdict des commissaires) — aucune information de vie privée
// n'a été identifiée ni reprise dans aucune des sources utilisées.
export const ROUND21_ANALYSE_FR_HTML = `
<div class="hero prose">
  <p class="eyebrow">Grand Prix de Las Vegas · Las Vegas Strip Circuit · samedi 21 novembre 2026 (nuit)</p>
  <p class="verdict">Max Verstappen remporte un Grand Prix de Las Vegas totalement fou — 35 changements de tête selon PlanetF1, confirmés par la propre description du pilote (« quelque chose que je n'avais jamais vu en Formule 1ᵖ ») — en résistant jusqu'au dernier tour à l'assaut conjoint des deux Mercedes de George Russell et Kimi Antonelli, qui s'effondrent tous les deux dans les ultimes tours. Troisième victoire de Verstappen sur ce circuit, devant un doublé McLaren (Norris, Piastri).</p>
  <div class="resultstrip">
    <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · 1:27:39,624</span></div>
    <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren · +0,639s</span></div>
    <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">McLaren · +1,529s</span></div>
    <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · +2,574s</span></div>
    <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#FF87BC"></span><span class="drv">Gasly</span> <span class="gap">Alpine · +2,927s</span></div>
  </div>
  <p class="subverdict">Russell mène ou se bat pour la tête pendant une bonne partie de la course, mais verrouille son destin à trois tours de l'arrivée : en tentant de reprendre la 2<sup>e</sup> place à Antonelli au virage 5, il roule sur des débris hors trajectoire, bloque une roue et plante le nez de sa Mercedes dans le mur — <strong>« le risque était trop élevé, et j'en ai payé le prix », reconnaîtra-t-il après course</strong> — avant de repartir, rétrogradé en 9<sup>e</sup> position. Antonelli, qui défendait la 2<sup>e</sup> place face à Norris jusqu'au tout dernier tour, perd lui aussi tout : en levant le pied en ligne droite pour préserver son mode dépassement, il se retrouve sans puissance dans la chicane suivante — <strong>« j'ai tout perdu, le podium et la victoire, et c'était très, très agaçant »</strong> — et recule au 4<sup>e</sup> rang, dépassé par les deux McLaren. Côté Ferrari, Hamilton (7<sup>e</sup>) et Leclerc (10<sup>e</sup>) s'accrochent eux-mêmes au virage 7 ; les commissaires jugent Leclerc entièrement responsable du contact et lui infligent une pénalité de 10 secondes qui le fait reculer de la 6<sup>e</sup> à la 10<sup>e</sup> place.</p>
</div>

<section class="block" data-num="01" id="sec-r1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Avant le départ : la grille réelle, le sec et le froid, et deux pilotes qui ne verront jamais le drapeau à damier</h2>
    <p>La grille de cette course nocturne de 50 tours, déjà redessinée par la cascade de pénalités détaillée dans l'article Qualifications de ce round, s'établissait : 1. Verstappen, 2. Russell, 3. Norris, 4. Hadjar, 5. Lindblad, 6. Antonelli (pénalité moteur de 5 places), 7. Lawson, 8. Gasly, 9. Colapinto, 10. Leclerc, 11. Hamilton, 12. Hülkenberg, 13. Sainz, 14. Bortoleto, 15. Albon, 16. Câmara, 17. Piastri (pénalité de grille de 10 places, 5<sup>e</sup> élément thermique), 18. Pérez, 19. Alonso, 20. Stroll, 21. Bottas, 22. Bearman (pénalités cumulées le reléguant au fond de grille). Conditions sèches et fraîches sur l'ensemble de la course — confirmé par la base du projet (air 11,60-12,40°C, piste 0,00-16,30°C, pluie=False) — l'écrasante majorité du plateau s'alignant en pneu tendre, à l'exception d'Antonelli, Lawson et Bearman en medium.</p>
    <p>Alex Albon, parti 15<sup>e</sup>, ne prendra jamais le départ : sa Williams est retirée de la grille après un problème de freins en surchauffe pendant son acheminement, l'équipe confirmant ensuite que les dégâts thermiques empêchaient toute tentative de course. Arvid Lindblad, lui, part normalement mais part en tête-à-queue derrière la voiture de sécurité en milieu de course (section 02) et ne parvient jamais à redémarrer — deux absents sur l'ensemble de la distance, aux causes totalement distinctes.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-r2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> La dynamique de la course : 35 changements de tête et deux Ferrari qui se percutent</h2>

    <h3 class="subtitle">Un départ propre, puis l'aspiration qui dicte tout dès le tour 2</h3>
    <p>Verstappen conserve la tête au départ depuis la pole ; Hadjar tente l'extérieur sur Norris pour la 3<sup>e</sup> place avant de renoncer, puis utilise l'aspiration dans la ligne droite pour le dépasser proprement. Gasly prend l'avantage sur son coéquipier Colapinto pour la 6<sup>e</sup> place ; Hamilton se retrouve devant Leclerc après des qualifications difficiles pour les deux Ferrari. Dès le tour 2, Russell passe Verstappen — mais le Néerlandais reprend la tête au tout dernier virage, le même point de piste où il reprendra l'avantage encore et encore tout au long de la course. Hadjar répète la manœuvre de Verstappen sur Russell, cette fois par l'intérieur, pour s'installer 2<sup>e</sup> au tour 3 ; la bataille continue, Russell reprenant brièvement l'avantage au tour 4 avant que Lindblad et Norris ne s'en mêlent également.</p>
    <p>Au tour 8, Hadjar — collé à Verstappen, menacé par Russell derrière — lâche sur la radio : « Il peut arrêter de défendre ? Parce que sinon on va juste perdre du temps. » Un tour plus tard, Russell scinde les deux Red Bull en dépassant Hadjar. Au tour 10, l'ordre est Verstappen, Russell, Hadjar, Gasly, Lindblad, Norris, Antonelli, Hamilton, Leclerc, Piastri — un peloton de tête d'une densité rarement vue, confirmée par l'analyse chiffrée de la section 03 (moins d'1,2 seconde séparant les dix voitures interrogées sur leur rythme de premier relais).</p>

    <h3 class="subtitle">La tension Ferrari monte, la pénalité Hamilton, puis la voiture de sécurité</h3>
    <p>Norris perd du terrain face aux deux Ferrari puis glisse même derrière Colapinto et Piastri. Chez Ferrari, Leclerc — qui roule juste derrière Hamilton et Piastri — prévient sur la radio : « Il doit faire attention avec son resserrement, ça ne va pas bien se terminer. » Hamilton, de son côté, demande à son ingénieur de dire à Leclerc de le laisser respirer alors qu'il se bat pour contenir Piastri. C'est dans ce contexte que les commissaires annoncent qu'ils examinent un incident entre Hamilton et Norris au virage 8 (tour 12) : Hamilton avait quitté la piste en défendant sa position et en avait tiré un avantage durable. Une pénalité de 10 secondes est confirmée. Hadjar, de son côté, reprend la 2<sup>e</sup> place à Russell — juste avant que les drapeaux jaunes ne sortent pour un accrochage entre Sergio Pérez et Rafael Câmara au virage 14/15 : Pérez percute la Haas de Câmara, qui repart, tandis que la Cadillac est hors course. La voiture de sécurité est déployée, provoquant une vague d'arrêts aux stands — Hamilton, lui, reste en piste (le double arrêt aurait trop coûté avec sa pénalité à purger) avant de s'arrêter au tour suivant, exprimant sa frustration sur la radio (« c'est vraiment n'importe quoi, si j'avais tourné on se serait percutés ») et sortant du top 10. Lindblad part en tête-à-queue derrière la voiture de sécurité et ne redémarre jamais, mettant fin à sa course. Les commissaires annoncent que l'accrochage Pérez/Câmara sera examiné après la course — aucun verdict sur cette affaire n'a pu être trouvé dans les sources consultées au moment de cette rédaction.</p>

    <h3 class="subtitle">La relance, l'aileron de Hadjar, et le retour en force des Mercedes</h3>
    <p>La relance intervient au tour 25, la plupart des pilotes de tête repartant en pneu medium (exceptions : Antonelli, Bearman, Bottas, Câmara et Lawson, en tendre). Verstappen gère un restart solide et prend jusqu'à 1,2 seconde d'avance sur Russell — le plus grand écart de toute la course — mais la bonne nouvelle pour Red Bull tourne vite au vinaigre pour son autre pilote : l'aileron avant de Hadjar casse juste après la relance (des étincelles jaillissant de sa monoplace), le Français s'écriant sur la radio « Je n'ai plus de puissance là. Oh wow, qu'est-ce qui se passe ? » avant d'apprendre que son aileron est cassé. Il rejoint les stands et ressort 19<sup>e</sup>. Un incident distinct lors de son arrêt (relâchement dangereux en voie des stands) est noté par la direction de course puis classé sans suite après examen ; un second incident impliquant Hadjar et Russell est en revanche renvoyé à un examen après la course — d'après les titres publiés par RacingNews365 consultés pour cette passe, cette seconde affaire s'est conclue par une pénalité pour Hadjar (déjà hors des points à ce stade) assortie d'une pénalité de grille pour le Grand Prix du Qatar suivant, mais le détail exact n'a pas pu être vérifié davantage dans le corps de l'article (voir note de sourcing en tête de fichier) et n'est donc pas chiffré ici.</p>
    <p>Russell et Verstappen reprennent leur duel incessant ; au tour 34, Norris se fraie un passage devant Russell puis Verstappen pour prendre la tête — brièvement, le Néerlandais revenant en tête presque immédiatement, Russell reprenant lui aussi la 2<sup>e</sup> place à Norris. Au tour 38 — « Russell contre Verstappen, le round 15, 16 ou 18 ? » plaisantera PlanetF1 — le même mouvement produit le même résultat. Antonelli entre alors dans la bagarre, dépassant Norris puis Russell pour rejoindre lui aussi « le spectacle Verstappen » : son incursion en tête est, comme celle de Russell, de très courte durée, Verstappen reprenant l'avantage en quelques virages, un mouvement qu'Antonelli répétera un tour plus tard avec le même résultat.</p>

    <h3 class="subtitle">Le choc Hamilton/Leclerc au virage 7</h3>
    <p>C'est à ce moment du tour 38, en pleine bataille à trois (Hamilton défendant face à une McLaren devant lui, Leclerc cherchant l'intérieur), que les deux Ferrari se percutent au virage 7 : Leclerc attaque par l'intérieur, Hamilton — qui, par ses propres mots, ne voit pas la Ferrari n°16 dans ses rétroviseurs à cause de l'angle de sa voiture — referme l'espace qui existait encore à la corde. Les commissaires jugent Leclerc entièrement responsable, estimant qu'il n'avait pas acquis le droit au virage en abordant le freinage « à une distance considérable » derrière son coéquipier, et lui infligent une pénalité de 10 secondes. Hamilton, brièvement déstabilisé, recule jusqu'à la 10<sup>e</sup> place avant de remonter ; Leclerc franchit la ligne en 6<sup>e</sup> position sur la piste mais recule à la 10<sup>e</sup> une fois la pénalité appliquée à son temps de course (analyse détaillée en section 03).</p>

    <h3 class="subtitle">Les deux derniers tours : Russell dans le mur, Antonelli sans puissance</h3>
    <p>À trois tours du drapeau à damier, Russell — conscient qu'il doit être 2<sup>e</sup> à l'entame du dernier tour pour espérer la victoire, et sachant qu'Antonelli ne dispose pas du mode dépassement puisqu'il était devant Verstappen à la fin du tour précédent — tente sa chance au virage 5. En roulant hors trajectoire sur des débris, il bloque une roue et plante le nez de sa Mercedes dans la barrière ; il repart, après un léger contact, mais recule à la 9<sup>e</sup> place, devancé à la ligne par Carlos Sainz. Sur le tout dernier tour, c'est Antonelli qui s'effondre : en défense de la 2<sup>e</sup> place, il lève le pied en ligne droite pour préserver son propre mode dépassement, puis se retrouve sans puissance dans la chicane suivante — perdant tout, le podium compris, dépassé par les deux McLaren pour terminer 4<sup>e</sup>. Verstappen franchit la ligne en tête, 0,639 seconde devant Norris, pour sa 3<sup>e</sup> victoire sur ce circuit — « vraiment, vraiment surréaliste, quelque chose que je n'avais jamais vu en Formule 1 moi-même », commentera-t-il, soulignant l'ampleur inédite de l'effet d'aspiration sur ce tracé.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-r3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Hamilton : pénalisé, percuté, mais le pilote le plus rapide des deux Ferrari sur le relais post-voiture de sécurité</h2>
    <p>Hamilton a bien pris part à cette course, terminant 7<sup>e</sup> après avoir purgé une pénalité de 10 secondes et subi le contact de son coéquipier au virage 7.</p>
    <p><strong>Niveau voiture.</strong> Requête dédiée sur les tours bruts (scripts/race_briefing_laptimes_by_car.py), relais identifiés par les marqueurs [IN]/[OUT] comme pour l'ensemble de cet article (méthode détaillée en tête de fichier). Sur le premier relais (tours 1 à 19/20, avant la voiture de sécurité), Hamilton (1:38,707) et Leclerc (1:38,788) tournent à un rythme quasiment identique — un écart de 0,08s/tour, dans la marge du bruit de mesure pour un relais de cette longueur. Sur le second relais (relance jusqu'au drapeau à damier), l'écart se creuse nettement en faveur d'Hamilton : 1:37,181 contre 1:37,583 pour Leclerc, soit environ quatre dixièmes par tour sur la plus grande partie de la course. Les vitesses de pointe (speedST) racontent toutefois une autre histoire : Leclerc affiche une vitesse maximale de 330 km/h (médiane 307) contre 316 km/h (médiane 299) pour Hamilton sur l'ensemble de la course — la n°16 reste donc mesurablement plus véloce en ligne droite tout en étant plus lente au tour sur le relais décisif, signe probable d'un compromis de réglage différent entre les deux voitures (aileron, répartition d'appui) plutôt que d'un écart de performance univoque dans un sens ou dans l'autre. Aucun canal FastF1 (gaz/frein/rapport/régime) n'était disponible pour ce round (voir note en tête de fichier) pour creuser davantage cette hypothèse de réglage.</p>
    <p><strong>Niveau pilotage.</strong> Deux éléments factuels distincts concernent Hamilton cette course. D'abord, sa propre pénalité de 10 secondes (tour 12) : les commissaires ont jugé qu'il avait quitté la piste en défendant face à Norris au virage 8 et en avait tiré un avantage durable en restant devant le pilote McLaren — Hamilton, sur la radio, a défendu son geste comme un choix d'éviter la collision plutôt qu'une manœuvre déloyale (« j'ai évité une collision avec Lando et j'ai pris une pénalité de 10 secondes pour ça, ce qui était vraiment, vraiment sévère »). Ensuite, le contact du tour 38 avec Leclerc : les commissaires ont désigné Leclerc comme ENTIÈREMENT responsable (il n'avait, selon leur verdict, pas acquis le droit au virage en abordant le freinage à une distance considérable derrière son coéquipier) — Hamilton n'est donc pas identifié comme fautif dans cet incident par la source la plus autorisée disponible (le verdict des commissaires, relayé intégralement par Formula1.com), et Leclerc lui-même confirme cette lecture après course (« je ne pense pas que Lewis, avec l'angle de sa voiture, m'ait vu dans les rétroviseurs »). Aucun compte-rendu technique tiers décrivant l'embarqué de l'un ou l'autre pilote sur cet incident précis n'a pu être trouvé dans les sources consultées pour cette passe — signalé explicitement plutôt qu'une description d'embarqué inventée ; l'analyse ci-dessus repose donc uniquement sur les transcriptions radio et le verdict sportif officiel, pas sur un compte-rendu d'images embarquées.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-r4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Classement final</h2>
    <div class="callout">Les écarts des positions 1 à 5 proviennent de la page de résultats officielle Formula1.com (au millième de seconde) ; ceux des positions 6 à 10 du compte-rendu PlanetF1 (au dixième de seconde, précision moindre mais seule source trouvée donnant ces écarts). Aucun écart chiffré n'a pu être trouvé pour les positions 11 à 18 dans les sources consultées — l'ordre d'arrivée, lui, est confirmé par Formula1.com. Leclerc (6<sup>e</sup> sur la piste) recule à la 10<sup>e</sup> place une fois sa pénalité de 10 secondes appliquée ; cette table reflète déjà ce classement post-pénalité.</div>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos.</th><th>Pilote</th><th>Écurie</th><th>Écart</th><th>Pts</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:27:39,624</td><td>25</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>+0,639s</td><td>18</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>+1,529s</td><td>15</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>+2,574s <span style="font-size:11px;color:var(--text-muted)">(sans puissance, dernier tour)</span></td><td>12</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>+2,927s</td><td>10</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>+7,9s</td><td>8</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>+12,7s <span style="font-size:11px;color:var(--text-muted)">(pénalité 10s déjà purgée)</span></td><td>6</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>+12,9s</td><td>4</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>+13,1s <span style="font-size:11px;color:var(--text-muted)">(contact mur, tour 48)</span></td><td>2</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>+17,5s <span style="font-size:11px;color:var(--text-muted)">(6<sup>e</sup> sur la piste, pénalité 10s pour collision)</span></td><td>1</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>—</td><td>0</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>—</td><td>0</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>—</td><td>0</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>— <span style="font-size:11px;color:var(--text-muted)">(aileron cassé + pénalité post-course, cf. section 02)</span></td><td>0</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>— <span style="font-size:11px;color:var(--text-muted)">(parti des stands, fuite de carburant)</span></td><td>0</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Câmara</td><td>Haas F1 Team</td><td>—</td><td>0</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>—</td><td>0</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>—</td><td>0</td></tr>
        <tr><td>NC</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>DNF (retiré, 1 tour avant l'arrivée)</td><td>0</td></tr>
        <tr><td>NC</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>DNF (tête-à-queue derrière la voiture de sécurité)</td><td>0</td></tr>
        <tr><td>NC</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>DNF (accrochage avec Câmara, T14/15)</td><td>0</td></tr>
        <tr><td>NC</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>DNS (freins en surchauffe avant le départ)</td><td>0</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
  <div class="prose">
    <p>Championnat pilotes après cette course (avant ce week-end : Antonelli 390, Verstappen 279, Russell 262, Hamilton 261, Leclerc 249 — rappel donné en tête de l'article Qualifications de ce round) : Antonelli 402 (déjà champion), Verstappen 304, <strong>Hamilton 267 — qui repasse devant Russell (264) pour la 3<sup>e</sup> place du championnat</strong>, Russell 264, Leclerc 250. Verstappen compte désormais 37 points d'avance sur Hamilton pour la 2<sup>e</sup> place. Constructeurs (calcul à partir des totaux donnés en tête de l'article Analyse du round 20 — Mercedes 652, Ferrari 512, Red Bull Racing 415, McLaren 398 — et des points marqués ce dimanche ; non revérifié directement auprès d'une source tierce pour ce round précis, signalé comme tel) : Mercedes 666 (déjà championne), Ferrari 519, Red Bull Racing 440, McLaren 431 — l'écart entre Red Bull et McLaren pour la 3<sup>e</sup> place du championnat, de 17 points avant ce week-end, se resserre à seulement 9 points.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-r5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Bilan pilote par pilote</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table class="verdict-table">
      <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Max Verstappen</td><td class="pos">1 → 1<span class="delta neutral">=</span></td><td>Mène la quasi-totalité de la course mais doit reconquérir la tête à répétition — dans un seul et même virage, chaque fois — face à Russell puis Antonelli. Jamais dépassé définitivement malgré 35 changements de tête au compteur de la course. 3<sup>e</sup> victoire sur ce circuit, « la plus mouvementée », par ses propres mots.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Lando Norris</td><td class="pos">3 → 2<span class="delta good">+1</span></td><td>Discret pendant une large partie de la course (recule même temporairement derrière Colapinto et Piastri), mais présent au bon moment : brève prise de tête au tour 34, puis profite directement de l'effondrement conjoint de Russell et Antonelli dans les deux derniers tours pour s'installer 2<sup>e</sup>.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Oscar Piastri</td><td class="pos">17 → 3<span class="delta good">+14</span></td><td>Remontée la plus spectaculaire du top 5, depuis une pénalité de grille de 10 places. Bénéficie lui aussi de l'effondrement des deux Mercedes en fin de course pour boucler un doublé McLaren inattendu.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Kimi Antonelli</td><td class="pos">6 → 4<span class="delta good">+2</span></td><td>En bataille pour la victoire jusqu'au tout dernier tour, 2<sup>e</sup> à l'entame de celui-ci — perd tout en levant le pied en ligne droite pour préserver son mode dépassement et se retrouvant sans puissance dans la chicane suivante. « Très, très agaçant », par ses propres mots ; reconnaît avoir « encore beaucoup à apprendre dans ces conditions ».</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Pierre Gasly</td><td class="pos">8 → 5<span class="delta good">+3</span></td><td>Weekend solide pour Alpine, roulant une partie de la course en 3<sup>e</sup> position avant de reculer légèrement ; meilleur résultat Alpine du dimanche devant son coéquipier Colapinto.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Franco Colapinto</td><td class="pos">9 → 6<span class="delta good">+3</span></td><td>Meilleur résultat de sa saison, sans incident individuel notable relevé dans les sources consultées.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Lewis Hamilton</td><td class="pos">11 → 7<span class="delta good">+4</span></td><td>Pénalisé 10 secondes pour un dépassement d'avantage sur Norris (T8, tour 12), puis percuté par son propre coéquipier au virage 7 — jugé non fautif dans cet incident par les commissaires. Pilote le plus rapide des deux Ferrari sur le relais décisif (section 03), malgré une vitesse de pointe inférieure à celle de Leclerc.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Carlos Sainz</td><td class="pos">13 → 8<span class="delta good">+5</span></td><td>Remontée correcte, bénéficie en fin de course du contact de Russell pour grappiller la 8<sup>e</sup> place ; sans incident individuel notable relevé.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>George Russell</td><td class="pos">2 → 9<span class="delta bad">-7</span></td><td>Protagoniste principal du duel avec Verstappen pendant l'essentiel de la course, mène ou menace la tête à de très nombreuses reprises. S'effondre à trois tours de l'arrivée en tentant de reprendre la 2<sup>e</sup> place à Antonelli au virage 5 : roule sur des débris hors trajectoire, bloque une roue, plante le nez de sa monoplace dans le mur. « Le risque était trop élevé, et j'en ai payé le prix » ; reconnaît qu'une approche plus conservatrice lui aurait probablement valu la 3<sup>e</sup> place, mais ne regrette pas sa tentative.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Charles Leclerc</td><td class="pos">10 → 10<span class="delta neutral">=</span></td><td>6<sup>e</sup> sur la piste au drapeau à damier, mais recule à la 10<sup>e</sup> place une fois appliquée la pénalité de 10 secondes pour le contact du virage 7 avec son coéquipier — les commissaires le jugent entièrement responsable (approche du virage « à une distance considérable » derrière Hamilton). « Je me sens vraiment embarrassé pour l'équipe en général », reconnaît-il après course, acceptant pleinement la sanction.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Nico Hülkenberg</td><td class="pos">12 → 11<span class="delta good">+1</span></td><td>Juste hors des points, sans incident individuel notable relevé dans les sources consultées.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Gabriel Bortoleto</td><td class="pos">14 → 12<span class="delta good">+2</span></td><td>Weekend correct pour Audi, sans incident individuel notable relevé.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Oliver Bearman</td><td class="pos">22 → 13<span class="delta good">+9</span></td><td>Remontée notable depuis le fond de grille (pénalités cumulées), sans incident individuel notable relevé dans les sources consultées.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Isack Hadjar</td><td class="pos">4 → 14<span class="delta bad">-10</span></td><td>Weekend qui tourne mal juste après avoir mené une belle bataille de tête : aileron avant cassé au tour 25/26 (« je n'ai plus de puissance là, qu'est-ce qui se passe ? »), relâchement dangereux en stand (classé sans suite), puis un second incident avec Russell renvoyé à un examen après course — d'après les titres RacingNews365 consultés, résolu par une pénalité assortie d'une pénalité de grille pour le Qatar, détail non vérifié davantage (voir note de sourcing).</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Liam Lawson</td><td class="pos">7 → 15<span class="delta bad">-8</span></td><td>Parti depuis la voie des stands après une fuite de carburant détectée avant le départ ; course de remontée sans jamais revenir dans le coup, sans incident individuel notable relevé par ailleurs.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Rafael Câmara</td><td class="pos">16 → 16<span class="delta neutral">=</span></td><td>Impliqué dans l'accrochage avec Pérez au virage 14/15 (collision jugée causée par le pilote Cadillac) mais parvient à repartir et à terminer la course.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#229971"></span>Lance Stroll</td><td class="pos">20 → 17<span class="delta good">+3</span></td><td>Remontée limitée depuis le fond de grille, sans incident individuel notable relevé dans les sources consultées.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Valtteri Bottas</td><td class="pos">21 → 18<span class="delta good">+3</span></td><td>Dernier classé, sans incident individuel notable relevé dans les sources consultées.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#229971"></span>Fernando Alonso</td><td class="pos">19 → DNF<span class="delta dnf">DNF</span></td><td>Retiré à un tour de l'arrivée ; cause précise non détaillée dans les sources consultées.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Arvid Lindblad</td><td class="pos">5 → DNF<span class="delta dnf">DNF</span></td><td>Partait pourtant 5<sup>e</sup> sur la grille ; part en tête-à-queue derrière la voiture de sécurité en milieu de course et ne parvient jamais à redémarrer.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Sergio Pérez</td><td class="pos">18 → DNF<span class="delta dnf">DNF</span></td><td>Percute la Haas de Câmara au virage 14/15, mettant fin à sa course ; affaire renvoyée à un examen après course, verdict non trouvé dans les sources consultées.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Alex Albon</td><td class="pos">15 → DNS<span class="delta dnf">DNS</span></td><td>Voiture retirée de la grille après un problème de freins en surchauffe pendant l'acheminement ; dégâts thermiques jugés trop importants pour prendre le départ.</td></tr>
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
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Red Bull Racing</td><td>Verstappen remporte une victoire à l'arraché, 35 changements de tête au compteur, en reprenant chaque fois l'avantage au même point de piste. Weekend à l'opposé pour Hadjar : belle bataille de tête réduite à néant par un aileron cassé puis une pénalité post-course.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>McLaren</td><td>Doublé Norris/Piastri obtenu davantage par opportunisme dans les deux derniers tours (effondrement conjoint des deux Mercedes) que par un rythme de course dominant pendant l'essentiel de la distance — Piastri remonte 14 places depuis une pénalité de grille.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Mercedes</td><td>Course cauchemardesque malgré une position de force quasi permanente : Russell (tête ou menace constante) plante sa monoplace dans le mur à trois tours de la fin ; Antonelli, 2<sup>e</sup> à l'entame du dernier tour, perd tout sur un lever de pied mal calculé pour préserver son mode dépassement. Le titre constructeurs, déjà acquis, reste la seule consolation du weekend.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Ferrari</td><td>Les deux voitures se percutent au virage 7 — Leclerc jugé entièrement responsable, pénalité de 10 secondes qui le fait reculer de la 6<sup>e</sup> à la 10<sup>e</sup> place. Hamilton (7<sup>e</sup>), pourtant lui aussi pénalisé plus tôt dans la course, signe le meilleur rythme des deux Ferrari sur le relais décisif.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Alpine</td><td>Meilleur résultat collectif de la saison pour l'écurie : Gasly 5<sup>e</sup>, Colapinto 6<sup>e</sup>, les deux voitures dans les points sans incident individuel notable.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Williams</td><td>Sainz décroche la 8<sup>e</sup> place ; weekend gâché pour Albon, retiré de la grille avant le départ après un problème de freins en surchauffe.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Audi</td><td>Hülkenberg (11<sup>e</sup>) et Bortoleto (12<sup>e</sup>) juste hors des points, sans incident individuel notable relevé pour les deux pilotes.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Haas F1 Team</td><td>Bearman (13<sup>e</sup>) remonte depuis le fond de grille ; Câmara (16<sup>e</sup>) termine sa course malgré l'accrochage subi face à Pérez.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Racing Bulls</td><td>Weekend à oublier : Lawson part des stands après une fuite de carburant, Lindblad abandonne derrière la voiture de sécurité après un tête-à-queue — depuis la 5<sup>e</sup> place sur la grille.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#229971"></span>Aston Martin</td><td>Stroll (17<sup>e</sup>) remonte modestement depuis le fond de grille ; Alonso retiré à un tour de l'arrivée.</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Cadillac</td><td>Weekend sans point : Bottas dernier classé, Pérez retiré après sa collision avec Câmara au virage 14/15.</td></tr>
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
          <li><strong>Max Verstappen</strong>, 3<sup>e</sup> victoire sur ce circuit, obtenue en reprenant la tête à répétition — 35 changements de tête au total — dans ce qu'il décrit lui-même comme une expérience inédite en Formule 1.</li>
          <li><strong>Lando Norris et Oscar Piastri</strong>, auteurs d'un doublé McLaren inattendu, en grande partie offert par l'effondrement conjoint des deux Mercedes dans les deux derniers tours.</li>
          <li><strong>Lewis Hamilton</strong>, pénalisé puis percuté par son propre coéquipier, qui ressort pourtant comme le pilote Ferrari le plus rapide sur le relais décisif de la course (section 03) et reprend la 3<sup>e</sup> place du championnat à Russell.</li>
        </ul>
      </div>
      <div class="verdictcol lose">
        <h4>Perdants</h4>
        <ul>
          <li><strong>George Russell</strong>, en position de force une bonne partie de la course face à Verstappen, qui plante sa monoplace dans le mur à trois tours de l'arrivée en tentant une dernière offensive — « le risque était trop élevé ».</li>
          <li><strong>Kimi Antonelli</strong>, à deux doigts du podium voire de la victoire jusqu'au dernier tour, perdu sur un lever de pied mal calculé pour préserver son propre mode dépassement.</li>
          <li><strong>Charles Leclerc</strong>, jugé entièrement responsable du contact avec son coéquipier Hamilton, recule de la 6<sup>e</sup> à la 10<sup>e</sup> place une fois la pénalité appliquée — « je me sens vraiment embarrassé pour l'équipe ».</li>
          <li><strong>Isack Hadjar</strong>, auteur d'une belle bataille de tête réduite à néant par un aileron cassé puis une seconde pénalité qui le prive aussi d'une partie de sa grille au Qatar.</li>
        </ul>
      </div>
    </div>
    <div class="callout">Las Vegas restera le Grand Prix des 35 changements de tête — et de deux Mercedes qui perdent tout dans les deux derniers tours après avoir dominé une large partie de la course. Verstappen l'a emporté non pas en étant systématiquement le plus rapide, mais en reprenant l'avantage, encore et encore, exactement au même point de piste — jusqu'à ce que ses rivaux n'aient plus l'occasion de recommencer.</div>
  </div>
</section>

<section class="block" id="sec-r-next">
  <div class="prose">
    <h2 class="sectitle">Enseignements pour la suite</h2>
    <p>Trois points issus de Las Vegas à surveiller au prochain rendez-vous, au Qatar le week-end du 27-29 novembre :</p>
    <ol style="padding-left:20px; margin:0 0 16px;">
      <li style="margin-bottom:10px;"><strong>Le combat pour la 2<sup>e</sup> place du championnat pilotes</strong> reste resserré : Verstappen (304) compte désormais 37 points d'avance sur Hamilton (267), qui vient de repasser devant Russell (264) — ce dernier devra digérer sa sortie de piste du dernier Grand Prix.</li>
      <li style="margin-bottom:10px;"><strong>Red Bull et McLaren</strong> se disputent toujours la 3<sup>e</sup> place du championnat constructeurs, l'écart se resserrant de 17 à seulement 9 points (440 contre 431) après le doublé McLaren de Las Vegas.</li>
      <li><strong>L'enquête Hadjar/Russell et la pénalité de grille qui en découle pour le Qatar</strong> — signalées par plusieurs titres de presse consultés pour cette passe sans que le détail exact ait pu être vérifié — méritent d'être confirmées et précisées dès que des sources supplémentaires seront disponibles.</li>
    </ol>
    <a class="bridge-btn" href="/courses" style="text-decoration:none; display:inline-block;">Voir le calendrier de la saison →</a>
  </div>
</section>

<section class="block" id="sec-r8">
  <details class="sources">
    <summary>Sources utilisées — GP de Las Vegas (6 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de course</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1.py), session_key=11420 : 989 lignes lap_times, 45 tyre_stints, 148 weather_readings, 110 race_control_messages, 27 track_status_events, 361 overtakes. La table <em>results</em> (pipeline Jolpica) n'était pas encore peuplée au moment de la rédaction — vérifié, pas supposé, via race-briefing.yml.</span></li>
        <li><span class="desc">Requête dédiée tours bruts et relais par numéro de voiture (scripts/race_briefing_laptimes_by_car.py --cars 3:VER 63:RUS 1:NOR 6:HAD 12:ANT 81:PIA 16:LEC 44:HAM 27:HUL 30:LAW) : base de toute l'analyse chiffrée de la section 03 et du constat de densité du peloton en section 02, relais reconstruits depuis les marqueurs de sortie/entrée de stand (table tyre_stints écartée cette passe, bornes peu fiables — même limite déjà documentée pour le round 20).</span></li>
        <li><span class="desc">Relecture complète et sans filtre des 110 race_control_messages (scripts/race_briefing_full_rcm.py, confirmée par la section MESSAGES DE COURSE de scripts/race_briefing.py) : base du déroulé chronologique précis de la section 02 (voiture de sécurité, pénalités, enquêtes).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/verstappen-wins-exhilarating-las-vegas-grand-prix-from-norris-and-piastri.2eeBWqekZdir9mdDVK9YVX" data-desc="Compte-rendu complet de course, lu intégralement via fetch-url.yml : déroulé tour par tour, classement des 5 premiers avec écarts au millième, citation de Verstappen sur l'ampleur inédite des changements de tête. Source primaire de l'essentiel de la section 02.">Formula1.com — Verstappen remporte un Grand Prix de Las Vegas exaltant</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/hamilton-frustrated-by-really-harsh-las-vegas-penalty-as-hes-quizzed-on-leclerc-clash.5ASq9S5FeEJNdNi6Igej0Z" data-desc="Réaction complète d'Hamilton après course, citations intégrales sur sa pénalité et le contact avec Leclerc. Lu intégralement via fetch-url.yml.">Formula1.com — Hamilton frustré par sa pénalité « vraiment sévère »</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/ill-accept-the-blame-leclerc-embarrassed-for-ferrari-as-he-assesses-latest-hamilton-clash-in-las-vegas.7hVueR5bwYsCGdIaYph3mK" data-desc="Réaction complète de Leclerc, confirmation du tour exact (38) et de la responsabilité entière retenue par les commissaires, citations intégrales. Lu intégralement via fetch-url.yml.">Formula1.com — Leclerc « embarrassé » pour Ferrari</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/antonelli-explains-annoying-last-lap-issue-in-las-vegas-as-he-admits-having-a-lot-to-learn-in-these-conditions.1i0fzBGmJSWZAK4wNaYMO9" data-desc="Explication technique complète du problème d'Antonelli sur le dernier tour (gestion du mode dépassement). Lu intégralement via fetch-url.yml.">Formula1.com — Antonelli explique son problème « agaçant »</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/i-paid-the-price-russell-laments-error-in-closing-stages-of-las-vegas-gp.546DMDVRArhwgf1nEXHR1v" data-desc="Réaction complète de Russell sur sa sortie de piste du tour 48, citations intégrales dont la confirmation du nombre de changements de tête (« plus de 30 »). Lu intégralement via fetch-url.yml.">Formula1.com — Russell : « j'en ai payé le prix »</a><span class="desc">Formula1.com</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.planetf1.com/news/2026-las-vegas-grand-prix-race-report" data-desc="Compte-rendu de course tour par tour, lu intégralement via fetch-url.yml : classement complet des 10 premiers avec écarts, citations radio supplémentaires (Hadjar sur son aileron, Hamilton pendant la voiture de sécurité), confirmation du nombre de changements de tête (35).">PlanetF1 — Verstappen survit à l'assaut Mercedes</a><span class="desc">PlanetF1</span></li>
        <li><span class="desc">RacingNews365 — page de résultats/actualités fetchée via fetch-url.yml : confirme par ses propres titres la convocation de Leclerc par Ferrari et une pénalité pour Hadjar (affaire Hadjar/Russell) assortie d'une pénalité de grille pour le Qatar — corps des articles individuels non atteint (redirection vers un gabarit générique), détail exact non vérifiable davantage et donc non chiffré dans cet article (voir note en tête de fichier).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / technique — tentatives documentées</h5>
      <ul>
        <li><span class="desc">Oracle Red Bull Racing (redbullracing.com/int-en, écurie victorieuse) lu intégralement via fetch-url.yml : actif, mais aucun contenu daté spécifiquement sur ce résultat de course au moment du fetch (statistiques de saison agrégées uniquement) — gap institutionnel documenté comme tel. Pirelli (press.pirelli.com/tagfeed/en/tags/press__releases) relu intégralement : toujours aucune entrée spécifique à Las Vegas 2026, contenu le plus récent du flux daté de juin 2026 — régression déjà documentée pour l'EL1/EL2/EL3/Quali de ce round. Mercedes (mercedesamgf1.com/en/news) : nouvel échec HTTP explicite.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Communication directe pilote — tentative documentée</h5>
      <ul>
        <li><span class="desc">Une tentative réelle cette passe : instagram.com/redbullracing — réponse HTTP 200 mais page entièrement rendue en JavaScript côté client, aucun contenu extractible via le pipeline fetch-url.yml de ce projet (texte/HTML statique uniquement). Gap honnêtement documenté : cet article ne contient pas de communication directe pilote au sens strict de la règle éditoriale, faute d'alternative trouvée malgré cette tentative réelle — toutes les citations utilisées (radio, conférence de presse) sont explicitement non étiquetées « communication directe » dans le texte.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
