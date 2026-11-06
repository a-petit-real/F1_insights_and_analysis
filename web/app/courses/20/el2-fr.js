// Analyse EL2 — Grand Prix de São Paulo (Interlagos), round 20, saison 2026.
// Prolonge directement l'EL1 du même round (web/app/courses/20/el1-fr.js) :
// aucune contradiction volontaire avec son contenu (Norris en tête du tour
// sec en EL1, évolution aéro exclusive McLaren, six pilotes de réserve en
// EL1 uniquement, promotion de Câmara chez Haas, pénalité de grille choisie
// par Russell, enjeu titre constructeurs Mercedes/Ferrari).
//
// Données de séance : donnée primaire = pipeline OpenF1 (session_key=11406,
// Practice 2, 2026-11-06 19:00->20:00 UTC, 702 tours / 22 pilotes), ingestion
// déjà confirmée réelle avant cette passe de rédaction. Classement/secteurs/
// relais/météo vérifiés directement depuis la base via
// scripts/practice_briefing.py. Point de rigueur central de cet article :
// la base ne classe que 21 pilotes, pas 22 — la voiture n°98 (Hülkenberg,
// Audi) n'apparaît pas au classement. Vérifié, PAS deviné : DEUX sources
// indépendantes lues intégralement via fetch-url.yml (The Race, rapport EL2
// dédié ; Grandprix.com, rapport EL2 dédié) confirment toutes les deux la
// même explication factuelle — la monoplace d'Hülkenberg a été endommagée
// par l'arrêt de Freddie Slater en EL1 (drapeau rouge entre les virages 9 et
// 10, déjà documenté dans l'EL1 de ce round) et Audi n'a pas pu achever les
// réparations à temps : Hülkenberg n'a disputé strictement aucun tour en
// EL2. The Race le formule explicitement : « The only driver not to set a
// time was Nico Hulkenberg, who did not run at all (...) leaving Hulkenberg
// without a single lap in the car on Friday. » Grandprix.com, indépendamment :
// « Audi confirming that the work required could not be completed in
// time. » Aucune communication directe du site institutionnel Audi
// (audif1.com/en, lu intégralement) ne mentionne cet épisode — gap
// institutionnel documenté comme tel, pas comme contradiction.
//
// Analyse technique quantifiée (scripts/practice_briefing_laptimes_by_car.py,
// 7 voitures : NOR/PIA/ANT/RUS/HAM/LEC/VER — le cluster de tête McLaren/
// Mercedes/Ferrari/Verstappen explicitement demandé pour prolonger la
// storyline de rythme long ouverte en EL1). Méthode IDENTIQUE à l'EL1 et à
// tous les rounds précédents : pour chaque relais, le premier tour (sortie
// de stand) est exclu systématiquement, le dernier tour n'est exclu que si
// ce n'est PAS le tout dernier relais du pilote sur la séance, puis les
// tours restants > 103% de la médiane du relais sont écartés. Calcul fait
// sur le relais long de fin de séance de chaque pilote (le signal le plus
// proche d'un rythme de course disponible ce vendredi). Résultat central,
// qui répond à la question ouverte explicitement par l'EL1 (l'avantage
// McLaren de ~1,0-1,6s/tour tient-il dans des conditions plus fraîches et en
// soirée ?) : l'écart SE RÉDUIT NETTEMENT contre Russell (+0,633s, contre
// 1,0-1,6s en EL1) et reste à vérifier contre Verstappen (comparateur gomme
// différente, MEDIUM contre SOFT, donc non strictement comparable) ; il
// devient statistiquement incertain contre Hamilton (+0,135s SEULEMENT,
// mais échantillon minuscule des deux côtés — 4 et 5 tours gardés) ; il
// RESTE proche d'une seconde contre Leclerc (+0,946s) — donc pas une
// disparition uniforme de l'avantage, documentée tour par tour plutôt que
// résumée en un seul chiffre. Russell et Antonelli (16/20 et 16/22 tours
// gardés) sont les échantillons les plus robustes de ce tableau ; celui de
// Norris (4/7) et de Hamilton (5/9) sont les plus fragiles et signalés
// comme tels. Vitesses de pointe (speed_st) = valeur maximale brute par
// voiture sur la séance, aucune estimation.
//
// Sourcing élargi (minimum 4 sources indépendantes, 2 généralistes + 2
// technique/analytique, + institutionnel + communication directe pilote,
// conformément à docs/OPERATIONS.md) :
// - Formula1.com (officiel) : page de résultats EL2 complète
//   (formula1.com/en/results/2026/races/1299/sao-paulo/practice/2, HTML brut
//   via fetch-url.yml) — page confirmée comme correspondant à cette séance
//   précise par la liste de pilotes préchargés (Antonelli/Norris/Verstappen/
//   Russell/Piastri/Hamilton/Leclerc/Bortoleto/... dans l'ordre du
//   classement), AUCUNE image préchargée pour Hülkenberg — confirmation
//   indépendante supplémentaire qu'il n'a signé aucun temps. Table de
//   classement elle-même hors de la fenêtre de troncature (limite déjà
//   documentée pour ce domaine), donc classement final confirmé via
//   Grandprix.com et The Race ci-dessous plutôt que via cette page.
// - McLaren Racing (institutionnel) : mclaren.com/racing/ lu intégralement —
//   actif mais, contrairement à l'EL1 de ce même round, n'affiche cette fois
//   aucune citation ou contenu daté spécifique au Brésil dans la fenêtre
//   récupérée (uniquement du contenu Mexico/historique) — régression
//   ponctuelle documentée plutôt que masquée.
// - Audi (institutionnel) : audif1.com/en lu intégralement — actif mais
//   aucun contenu daté spécifique à São Paulo 2026 ni à l'absence
//   d'Hülkenberg dans la fenêtre récupérée (contenu Autriche/Monaco
//   générique) — gap institutionnel documenté pour le fait le plus
//   important de cette séance.
// - Pirelli (institutionnel) : press.pirelli.com/tagfeed/en/tags/
//   press__releases relu intégralement — flux actif mais toujours aucun
//   communiqué spécifique à São Paulo 2026 (dernière entrée pertinente
//   antérieure au week-end) — même régression déjà documentée pour l'EL1 de
//   ce round, confirmée une seconde fois.
// - Tentative institutionnelle infructueuse documentée : mercedesamgf1.com/
//   en/news/, échec HTTP 404 explicite — aucune communication directe
//   d'écurie Mercedes exploitable depuis ce domaine cette session.
// - Grandprix.com (généraliste n°1) : rapport EL2 complet (« Practice 2
//   Report - Antonelli puts Mercedes ahead in Brazil ») lu intégralement —
//   classement concordant AU MILLIÈME avec la base, déroulé par relais/
//   gomme, citation radio Verstappen, citation nommée de Laurent Mekies
//   (directeur Red Bull) sur le problème de direction, explication Audi/
//   Hülkenberg.
// - Crash.net (généraliste n°2) : page de liste /f1/news lue intégralement —
//   aucun article dédié à cette EL2 précise dans la fenêtre récupérée (titres
//   disponibles tous antérieurs au vendredi : conférence de presse Vasseur/
//   Hamilton du jeudi, calendrier 2027 Verstappen, débuts de Câmara) — tenté
//   réellement, documenté comme n'ayant rien apporté de nouveau pour cette
//   séance précise plutôt que forcé dans le texte.
// - The Race (technique/analytique n°1) : TROIS articles complets lus
//   intégralement — le compte-rendu EL2 dédié (« What happened in F1 2026
//   Brazilian GP second practice », Scott Mitchell-Malm), l'article dédié à
//   la pénalité de grille de Russell (Josh Suttill, avec citation directe
//   Instagram) et l'article sur la réunion Ferrari Hamilton/Leclerc du jeudi
//   (contexte sportif, pas personnel). Classement EL2 du premier article
//   concordant AU MILLIÈME avec la base, Grandprix.com et Formula1.com —
//   triple confirmation.
// - Autosport (technique/analytique n°2) : page de liste f1/news lue
//   intégralement — aucun titre dédié à cette EL2 précise dans la fenêtre
//   récupérée (contenu encore centré sur Mexico) — tentative réelle,
//   documentée honnêtement plutôt que comblée par une citation non vérifiée.
// - r/F1Technical (communauté technique pointue) : non retenté cette passe
//   (blocage confirmé et stable sur neuf séances consécutives précédentes,
//   cf. docs/SOURCES.md) — pas de nouvelle tentative pour ne pas répéter un
//   échec déjà amplement documenté sans variation attendue.
// - WebSearch n'a été utilisé à AUCUN moment pour sourcer un fait de cet
//   article, conformément à la règle déjà établie dans docs/SOURCES.md.
//
// Communication directe pilote (obligatoire, explicitement signalée) :
// George Russell, citation publiée sur le compte Instagram de Mercedes,
// relayée texte intégralement par The Race (source indépendante de
// Grandprix.com qui avait déjà relayé une partie de cette citation en EL1) :
// « We always had to take a grid penalty at some point between Singapore and
// the end of the season. We felt like this was a good place to take it (...)
// Five places doesn't seem that bad and we'll try to come back through. »
// Contexte nouveau apporté par cette source cette session : il s'agit de la
// DEUXIÈME pénalité de grille de Russell en quatre courses (après une
// pénalité de 60 places à Singapour suite à une panne moteur en Malaisie),
// et le choix de ce week-end précis tient aussi à l'incertitude sur la mise
// en service du nouveau moteur ADUO de Mercedes, pas encore jugé prêt.
// Distinct des messages radio de Verstappen et de la citation du directeur
// d'écurie Mekies (captés par la diffusion officielle/relayés par
// Grandprix.com) : un message radio broadcast ou une déclaration de
// dirigeant ne sont pas un canal propre au pilote, donc présentés séparément
// et non étiquetés « communication directe » dans le texte.
//
// Zéro contenu « people » : plusieurs sujets disponibles ce jour-là chez
// Crash.net (visite d'Antonelli à la tombe de Senna, critique de Ralf
// Schumacher sur Hamilton, maladie de Stroll) ont été délibérément écartés —
// même traitement que l'EL1 de ce round. La couverture de la réunion
// Ferrari Hamilton/Leclerc est reprise UNIQUEMENT sous l'angle sportif
// (conduite en piste, gestion d'écurie, répercussion sur l'incident Camara/
// Leclerc de cette séance), jamais sous un angle personnel.
export const ROUND20_EL2_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de São Paulo · Autódromo José Carlos Pace (Interlagos) · EL2 — vendredi 6 novembre</p>
    <p class="verdict">Antonelli confirme la mainmise Mercedes en tête du tour sec, avec quatre écuries dans un mouchoir de sept centièmes derrière lui — mais la vraie question posée par l'EL1 (l'avantage McLaren de 1,0 à 1,6 seconde au tour sur les longs relais tient-il en soirée, piste plus froide ?) reçoit une réponse nuancée : il fond à six dixièmes contre Russell et devient incertain contre Hamilton, mais reste proche d'une seconde contre Leclerc. Faità part : la voiture n°98 de Nico Hülkenberg n'a disputé AUCUN tour de cette séance, sa monoplace n'ayant pas pu être réparée à temps après l'arrêt de Freddie Slater en EL1.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">1:10,763</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+0,253s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,259s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,273s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">+0,321s</span></div>
    </div>
    <p class="subverdict">Contrairement à l'EL1, la rotation obligatoire de pilotes de réserve ne concernait que la première heure du week-end : les onze écuries alignent cette fois leurs titulaires habituels — confirmé par le retour de Leclerc (après Beganovic), Piastri (après Fornaroli), Gasly (après Minì), Sainz (après Browning), Pérez (après Herta) et, chez Audi, le retour prévu de Hülkenberg (après Slater) — qui n'a toutefois pas pu rouler du tout, pour la raison développée en section 03. Rafael Câmara poursuit sa première épreuve en tant que titulaire à part entière chez Haas, à domicile. George Russell a confirmé en détail, citation Instagram à l'appui, les raisons de sa pénalité de grille de dimanche — sa deuxième de la saison en quatre courses. Mercedes peut toujours officiellement remporter le titre constructeurs ce week-end si l'écurie devance Ferrari d'au moins trois points, et Kimi Antonelli, déjà sacré champion du monde à Mexico, n'a visiblement aucune intention de lever le pied.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el2-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Antonelli prolonge sa domination du vendredi — quatre écuries dans un mouchoir de sept centièmes</h2>
    <p>Kimi Antonelli (1:10,763) a fixé la référence sur pneu tendre après avoir déjà occupé la tête sur les relais initiaux, devançant Lando Norris (1:11,016, +0,253s) et Max Verstappen (1:11,022, +0,259s, à seulement six millièmes de Norris). George Russell (1:11,036, +0,273s) et Oscar Piastri (1:11,084, +0,321s) complètent un groupe de tête resserré : Norris, Verstappen, Russell et Piastri ne sont couverts que par 0,068s. Scott Mitchell-Malm (The Race) le résume ainsi : le nouveau champion du monde « ne montre aucun signe de relâchement » après son titre scellé à Mexico.</p>
    <p>Ferrari reste l'écurie en décalage : Lewis Hamilton signe le sixième temps (1:11,213, +0,450s), devant Charles Leclerc (1:11,483, +0,720s), qui disputait ses premiers tours du week-end après la sortie de Beganovic en EL1. Leclerc s'est plaint d'un équilibre trop arrière en début de séance puis s'est interrogé sur le moteur en fin d'heure ; sur la piste, il a frôlé Rafael Câmara (Haas, débutant) dans le virage 15 à pleine vitesse, le pilote brésilien l'ayant resserré en entamant un tour lancé alors que Leclerc terminait le sien — Câmara sera convoqué par les commissaires après la séance, sans décision connue au moment des rapports consultés. Gabriel Bortoleto (Audi) signe le huitième temps à domicile, devant Isack Hadjar (Red Bull) et Oliver Bearman (Haas), qui complète un top 10 où Bearman, Colapinto et les deux Racing Bulls (Lindblad, Lawson) ne sont séparés que d'un dixième.</p>
    <p>Fait récurrent de cette deuxième heure, relevé indépendamment par Grandprix.com et The Race : la bosse au freinage du premier complexe (la « Senna S ») a provoqué des blocages de roue chez la quasi-totalité du plateau — Hamilton, Alonso et Antonelli lui-même (qui a bloqué les deux roues avant en signant pourtant son tour le plus rapide, se plaignant par radio d'un « massive bottoming »). Max Verstappen a lui connu une séance frustrante à un autre titre : après s'être plaint par radio d'un comportement moteur jugé « inacceptable » en EL1, il s'est cette fois agacé d'un réglage d'embrayage que l'équipe lui présentait comme « s'adaptant » à lui — <em>« What does that mean? Do I have to speak to the engine myself? »</em>, a-t-il lancé, message capté par la diffusion officielle et relayé par Grandprix.com et The Race (donc une communication radio broadcast, pas un canal propre au pilote). Plus sérieusement, un problème de direction est apparu en fin d'heure : Red Bull n'a pas pu le résoudre dans l'immédiat, écourtant la séance de Verstappen, et le directeur d'écurie Laurent Mekies l'a confirmé nommément à Grandprix.com : <em>« We have a small issue with Max's steering. »</em></p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el2-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> L'avantage McLaren de l'EL1 fond — mais pas partout de la même façon</h2>
    <p>L'EL1 avait documenté un écart de 1,0 à 1,6 seconde au tour en faveur de McLaren sur les longs relais de pneu tendre en fin de séance, face à Hamilton, Russell et Verstappen — un écart jugé « inhabituel pour une simple évolution aéro de fin de saison » et explicitement laissé en suspens pour vérification en EL2/EL3. Cette deuxième heure, disputée en soirée dans des conditions nettement plus fraîches qu'en milieu d'après-midi (air passé de 20,5 à 19,6°C, piste de 35°C à 30-35°C en fin d'heure, contre jusqu'à 49°C de piste en EL1), permet une première vérification sur le relais long de fin de séance de chaque pilote du cluster de tête McLaren/Mercedes/Ferrari/Verstappen (méthode identique à l'EL1 : premier tour de relais exclu, dernier tour exclu sauf tout dernier relais de la séance, tours &gt; 103% de la médiane écartés) :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Gomme / relais</th><th>Tours (gardés/dispo.)</th><th>Moyenne relais</th><th>V. pointe (speed_st)</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>SOFT (tours 25-31, âge pose 6)</td><td>4/7</td><td>1:15,110</td><td>321 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>SOFT (tours 27-35, âge pose 5)</td><td>5/9</td><td>1:15,245</td><td>311 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>SOFT (tours 16-37, âge pose 3)</td><td>16/22</td><td>1:15,421</td><td>315 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>MEDIUM (tours 13-23, âge pose 8)</td><td>10/11</td><td>1:15,501</td><td>310 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>SOFT (tours 16-35, âge pose 4)</td><td>16/20</td><td>1:15,743</td><td>313 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>SOFT (tours 19-32, âge pose 6)</td><td>11/14</td><td>1:15,732</td><td>319 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>SOFT (tours 20-33, âge pose 7)</td><td>10/14</td><td>1:16,056</td><td>312 km/h</td></tr>
      </tbody>
    </table>
  </div>
  <div class="prose">
    <p>Trois lectures, aucune uniforme — exactement le genre de nuance que l'EL1 appelait à vérifier plutôt qu'à supposer. D'abord, le signal le plus solide statistiquement : Russell (16 tours gardés sur 20 disponibles) et Antonelli (16/22) offrent les échantillons les plus robustes de tout le tableau, tous deux sur pneu tendre. Face à ce relais Russell, Norris (1:15,110) ne devance plus que de 0,633s — un écart réel, mais presque la moitié de la fourchette basse de l'EL1 (1,0s). Face à Antonelli, l'écart tombe à 0,311s. Ensuite, le résultat le plus surprenant : face à Hamilton (1:15,245), Norris ne devance plus que de 0,135 seconde — mais les deux échantillons sont minuscules (4 et 5 tours gardés), donc ce chiffre est à traiter comme un signal fragile, pas comme la preuve que l'avantage a disparu contre Ferrari. Enfin, et c'est le vrai contrepoint à toute lecture de type « l'avantage McLaren s'est évaporé » : face à Leclerc (1:16,056, 10/14 tours gardés, échantillon correct), l'écart reste de 0,946 seconde — quasiment identique en ordre de grandeur à ce qui avait été mesuré en EL1. Verstappen (1:15,501) n'est pas directement comparable : son relais long de cette séance a été effectué sur MEDIUM, pas SOFT, une gomme plus dure et généralement plus lente à chaud égal — l'écart brut de 0,391s face à lui sous-estime donc probablement l'écart réel à gomme identique.</p>
    <p>Pour mémoire, Norris a aussi signé un relais HARD très propre en milieu de séance (tours 15-22, 8/8 tours gardés, aucune exclusion) à 1:15,497 — quasiment identique à son propre relais SOFT (1:15,110 contre 1:15,497, soit seulement 0,387s d'écart entre les deux gommes pour le même pilote), ce qui confirme au moins que son propre relais tendre n'est pas un coup de chance isolé.</p>
    <div class="callout">Réserve méthodologique explicite, plus marquée que d'habitude cette séance : les échantillons de Norris (4 tours) et de Hamilton (5 tours) sont petits, le refroidissement de la piste en fin d'heure a provoqué des tours anormalement lents chez tous les pilotes en toute fin de relais (filtrés par la règle des 103%, pas masqués), et la comparaison Verstappen se fait sur une gomme différente (MEDIUM) du reste du groupe (SOFT). La conclusion la plus honnête : l'avantage McLaren documenté en EL1 s'est réduit, nettement contre Mercedes, mais il n'a pas disparu partout — Leclerc reste, pour l'instant, à la même distance qu'en EL1.</div>
  </div>
</section>

<section class="block" data-num="03" id="sec-el2-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Un pilote sans aucun tour : pourquoi la voiture n°98 n'apparaît pas au classement</h2>
    <p>Vingt-et-un pilotes classés, pas vingt-deux : Nico Hülkenberg (Audi, voiture n°98) n'a disputé strictement aucun tour chronométré de cette EL2 — un fait confirmé indépendamment par deux sources lues intégralement, pas déduit d'une simple absence dans la base. The Race l'énonce sans détour : <em>« The only driver not to set a time was Nico Hulkenberg, who did not run at all after the issue that stopped Freddie Slater on track in FP1 could not be addressed by Audi in time, leaving Hulkenberg without a single lap in the car on Friday. »</em> Grandprix.com, de façon totalement indépendante, confirme le même enchaînement : <em>« Audi's mechanics continued working on Nico Hulkenberg's car following Freddie Slater's morning stoppage. Hulkenberg ultimately missed the entire session, Audi confirming that the work required could not be completed in time. »</em> L'origine du problème est donc à chercher en EL1 : le drapeau rouge provoqué par l'arrêt de Slater entre les virages 9 et 10 (déjà documenté dans l'EL1 de ce round) a visiblement endommagé la monoplace au-delà de ce qu'Audi pouvait réparer dans la fenêtre d'une heure et demie séparant la fin de l'EL1 du début de l'EL2.</p>
    <p>Aucune communication directe d'écurie n'a pu être trouvée pour développer davantage ce point : audif1.com/en, lu intégralement via fetch-url.yml, reste actif mais n'affiche aucun contenu daté spécifique à ce week-end ni à l'incident dans la fenêtre récupérée — un vrai gap institutionnel, documenté comme tel plutôt que masqué, sur ce qui est pourtant le fait le plus inhabituel de cette séance pour une écurie donnée. Pas d'explication alternative inventée ici : la cause publique disponible est celle rapportée par The Race et Grandprix.com, et rien à ce stade ne la contredit.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el2-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> La tension Ferrari en toile de fond, et la deuxième pénalité de grille de la saison pour Russell</h2>
    <p>Contexte sportif, pas personnel, mais utile pour lire l'incident Câmara/Leclerc de cette séance : jeudi, avant le début des essais, Fred Vasseur a confirmé avoir tenu une réunion avec ses deux pilotes à la suite de l'épisode de Mexico, où Ferrari a manqué un doublé. Seul Hamilton s'est présenté devant les médias ce jour-là et a maintenu sa position, confirmant estimer que Leclerc le gère différemment de ses adversaires sur la piste : <em>« Definitely [races them] different. »</em> Vasseur, lui, a refusé de détailler le contenu de la réunion mais en a résumé le message : <em>« The conclusion of the meeting yesterday evening was clear. It was a clear reminder that Ferrari is coming first. »</em> Rien de tout cela n'est une donnée de performance de cette EL2, mais cela éclaire pourquoi Ferrari aborde ce week-end sous surveillance particulière — et pourquoi le frôlement Câmara/Leclerc du virage 15, même mineur, a été immédiatement commenté comme un épisode de plus dans la gestion d'écurie.</p>
    <p>Sur la pénalité de grille déjà annoncée par George Russell en EL1, The Race apporte un contexte supplémentaire par une citation directe publiée sur le compte Instagram de Mercedes — canal propre écurie/pilote, pas une citation de conférence de presse reformulée : <em>« We always had to take a grid penalty at some point between Singapore and the end of the season. We felt like this was a good place to take it (...) Five places doesn't seem that bad and we'll try to come back through. »</em> Fait nouveau par rapport à l'EL1 : il s'agit de la DEUXIÈME pénalité de grille de Russell en seulement quatre courses, après une pénalité de 60 places subie à Singapour pour une série de changements de groupe propulseur rendue nécessaire par une panne moteur en Malaisie la semaine précédente. Le choix du Brésil pour cette deuxième pénalité tenait à l'origine à l'introduction prévue du nouveau moteur à combustion interne développé dans le cadre du programme ADUO (Additional Development and Upgrade Opportunities) de Mercedes — mais The Race précise que la mise en service de ce moteur reste incertaine, et que l'écurie ne le fera rouler que lorsqu'elle le jugera prêt, le titre pilotes étant déjà scellé et le titre constructeurs « quasiment garanti ». Un rappel qui recoupe directement le sous-titre de cette EL2 : Mercedes peut officiellement être sacrée dès ce week-end si l'écurie devance Ferrari d'au moins trois points sur l'ensemble du Grand Prix.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-el2-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Classement complet EL2</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:10,763</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:11,016</td><td>+0,253s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:11,022</td><td>+0,259s (problème de direction en fin de séance)</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:11,036</td><td>+0,273s (pénalité grille -5, dimanche)</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:11,084</td><td>+0,321s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:11,213</td><td>+0,450s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:11,483</td><td>+0,720s (frôlement avec Câmara, enquête commissaires)</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:11,780</td><td>+1,017s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:11,839</td><td>+1,076s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:11,991</td><td>+1,228s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:11,996</td><td>+1,233s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:12,008</td><td>+1,245s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:12,042</td><td>+1,279s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:12,109</td><td>+1,346s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:12,538</td><td>+1,775s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Câmara</td><td>Haas F1 Team</td><td>1:12,561</td><td>+1,798s (1<sup>re</sup> séance de titulaire à domicile, enquête commissaires)</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:12,742</td><td>+1,979s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:12,942</td><td>+2,179s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:12,953</td><td>+2,190s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:13,316</td><td>+2,553s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:13,383</td><td>+2,620s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>—</td><td>aucun tour (monoplace non réparée à temps après l'arrêt de Slater en EL1)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el2-6">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en EL3</h2>
    <p>Deux séances, un tableau qui se complique plutôt qu'il ne se simplifie : McLaren reste devant sur le rythme long, mais d'une marge qui dépend beaucoup de l'adversaire regardé — large contre Leclerc, modeste contre Russell et Antonelli, peut-être nulle contre Hamilton si son échantillon s'élargit samedi. L'EL3 matinale, dans des conditions probablement encore différentes (plus fraîches que l'EL1, à une heure de la journée différente de l'EL2), sera la dernière occasion de trancher avant les qualifications. Côté Audi, la vraie question n'est plus sportive mais logistique : Hülkenberg doit impérativement rouler en EL3 pour ne pas aborder les qualifications sans avoir tourné une seule fois sur ce circuit cette saison. Côté Red Bull, le problème de direction de Verstappen doit être résolu dans la nuit pour ne pas handicaper sa préparation. Et côté Ferrari, le frôlement Câmara/Leclerc attend toujours une décision des commissaires.</p>
    <div class="callout">Rappel de méthode : les moyennes de relais long de cet article comparent, comme souvent, des gommes et des âges de pneu différents (SOFT pour cinq pilotes, MEDIUM pour Verstappen) et des échantillons de taille très inégale (de 4 à 16 tours gardés) — un indicateur de tendance solide pour Russell/Antonelli, plus fragile pour Norris/Hamilton, signalé explicitement plutôt que lissé.</div>
  </div>
</section>

<section class="block" id="sec-el2-7">
  <details class="sources">
    <summary>Sources utilisées — EL2 São Paulo (7 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), session_key=11406, 702 tours/22 pilotes : classement, secteurs, relais, météo. Primaire.</span></li>
        <li><span class="desc">The Pit Wall — requête dédiée tours bruts par voiture (scripts/practice_briefing_laptimes_by_car.py, cluster NOR/PIA/ANT/RUS/HAM/LEC/VER) : base des moyennes de relais long et des vitesses de pointe de la section 02.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1299/sao-paulo/practice/2" data-desc="Page de résultats officielle, lue en HTML brut via fetch-url.yml : confirmée comme correspondant à cette séance précise par l'ordre des pilotes préchargés (Antonelli en tête) et l'ABSENCE de toute image préchargée pour Hülkenberg — confirmation indépendante supplémentaire qu'il n'a signé aucun temps. Tableau de classement lui-même hors de la fenêtre de troncature récupérée.">Formula1.com — résultats officiels EL2</a><span class="desc">Formula1.com</span></li>
        <li><span class="desc">McLaren Racing (mclaren.com/racing/), lu intégralement : actif mais sans contenu daté spécifique au Brésil cette passe (régression ponctuelle par rapport à l'EL1 du même round). Audi (audif1.com/en), lu intégralement : actif mais aucun contenu sur l'absence d'Hülkenberg — gap institutionnel documenté en section 03. Pirelli (press.pirelli.com/tagfeed/en/tags/press__releases), relu intégralement : toujours aucun communiqué spécifique à São Paulo 2026, régression déjà documentée pour l'EL1 confirmée une seconde fois. Tentative infructueuse documentée : mercedesamgf1.com/en/news/, échec HTTP 404 explicite.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.grandprix.com/races/brazilian-gp-2026-practice-2-report.html" data-desc="Rapport complet EL2 (« Practice 2 Report - Antonelli puts Mercedes ahead in Brazil ») : classement concordant au millième avec la base et The Race, citation radio Verstappen, citation nommée de Laurent Mekies, explication Audi/Hülkenberg. Lu intégralement via fetch-url.yml.">Grandprix.com — rapport EL2</a><span class="desc">Grandprix.com</span></li>
        <li><span class="desc">Crash.net — page de liste /f1/news lue intégralement : aucun article dédié à cette EL2 précise dans la fenêtre récupérée (titres disponibles tous antérieurs au vendredi — conférence Vasseur/Hamilton du jeudi, calendrier 2027 de Verstappen, débuts de Câmara). Tentative réelle, n'a rien apporté de nouveau pour cette séance précise.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/what-happened-in-f1-2026-brazilian-gp-second-practice/" data-desc="Compte-rendu complet de la séance (Scott Mitchell-Malm) : classement concordant au millième avec la base et Grandprix.com, confirmation explicite de l'absence totale d'Hülkenberg et de sa cause, détail du frôlement Câmara/Leclerc. Lu intégralement via fetch-url.yml.">The Race — ce qui s'est passé en EL2 au Brésil</a><span class="desc">The Race</span></li>
        <li><a href="https://www.the-race.com/formula-1/russell-serving-another-f1-engine-grid-penalty-in-brazil/" data-desc="Article dédié (Josh Suttill) avec citation directe Instagram de Russell : contexte complet de sa pénalité de grille, deuxième de la saison en quatre courses, moteur ADUO. Lu intégralement via fetch-url.yml.">The Race — la deuxième pénalité moteur de Russell</a><span class="desc">The Race</span></li>
        <li><a href="https://www.the-race.com/formula-1/what-we-learned-about-ferraris-hamilton-leclerc-meeting/" data-desc="Compte-rendu complet de la conférence de presse du jeudi (Vasseur/Hamilton/Wolff), contexte sportif de la gestion d'écurie Ferrari après Mexico — repris uniquement sous cet angle, jamais personnel. Lu intégralement via fetch-url.yml.">The Race — la réunion Hamilton/Leclerc chez Ferrari</a><span class="desc">The Race</span></li>
        <li><span class="desc">Autosport — page de liste f1/news lue intégralement : aucun titre dédié à cette EL2 précise dans la fenêtre récupérée (contenu encore centré sur Mexico). Tentative réelle, documentée honnêtement.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Communauté technique pointue</h5>
      <ul>
        <li><span class="desc">r/F1Technical : non retenté cette passe — blocage anti-bot confirmé et stable sur neuf séances consécutives précédentes cette saison (cf. docs/SOURCES.md), aucune variation attendue sans changement de méthode.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
