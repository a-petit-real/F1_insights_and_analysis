// Analyse EL1 — Grand Prix de Las Vegas (Las Vegas Strip Circuit), round 21,
// saison 2026. PREMIER article de ce week-end (aucune analyse EL/Quali/
// pré-analyse antérieure pour ce round) : pas d'historique narratif à
// prolonger, tout part de cette séance.
//
// Données de séance : donnée primaire = pipeline OpenF1 (session_key=11413,
// Practice 1, 2026-11-20 00:30->01:30 UTC = jeudi 19 novembre 16:30-17:30
// heure locale de Las Vegas), classement/relais/météo vérifiés directement
// depuis la base via scripts/practice_briefing.py (22 pilotes au total,
// 17 ayant tenté au moins un tour). POINT DE RIGUEUR CENTRAL DE CET ARTICLE :
// la base locale affiche un unique tour "chronométré" pour Rafael Câmara
// (1867,424s) — valeur mathématiquement impossible comme temps au tour réel
// (31 minutes) et donc traitée comme un artefact de mesure OpenF1 (tour
// franchissant une interruption de session plutôt qu'un tour lancé), PAS
// comme un vrai chrono. Les trois sources média indépendantes ci-dessous
// (PlanetF1, Speedcafe, f1oversteer) confirment unanimement et explicitement
// qu'AUCUN temps au tour n'a été établi par AUCUN pilote de tout le plateau
// durant cette heure — la base est donc corrigée par la source la plus
// fiable disponible (confirmation triple indépendante) plutôt que prise au
// pied de la lettre sur ce point précis, et ce choix est documenté ici
// explicitement plutôt que silencieux.
//
// Analyse technique quantifiée : IMPOSSIBLE pour cette séance et documenté
// comme tel plutôt que simulé. La méthode habituelle (écarts de rythme moyen
// par relais, tours d'entrée/sortie exclus, tours > 103% de la médiane
// écartés) exige des relais de plusieurs tours chronométrés ; ici, 20 tours
// au total sur l'ensemble du plateau (aucun chronométré), aucun pilote
// n'ayant dépassé 2 tours consécutifs. Aucune vitesse de pointe (speedST/
// speedFL) exploitable non plus pour la même raison. Ce qui EST mesurable et
// rapporté en section 03 : la chronologie précise de la pluie (tableau météo
// OpenF1, minute par minute) et le choix de gomme (100% pluie/WET sur tous
// les relais enregistrés, aucune intermédiaire) — deux faits chiffrés réels,
// par opposition à un rythme de course qui n'existe simplement pas pour
// cette heure.
//
// Analyse Hamilton (règle éditoriale c-bis, 2026-11-09) : Lewis Hamilton n'a
// PAS pris part à cette séance. Confirmé indépendamment par Speedcafe (Ben
// Waterworth : "Ferrari reserve Dino Beganovic was in for Lewis Hamilton")
// et par le classement officiel complet relayé par f1oversteer (Hamilton
// absent de la liste des 22 pilotes classés ce jour, Beganovic présent au
// volant de la Ferrari n°38). Ni le niveau voiture ni le niveau pilotage ne
// peuvent donc être renseignés pour Hamilton lui-même cette séance — et la
// comparaison voiture-à-voiture Ferrari (Leclerc/Beganovic) est de toute
// façon sans objet puisqu'aucun des deux n'a établi de temps exploitable non
// plus. Documenté explicitement plutôt qu'omis, conformément à la règle.
//
// Sourcing élargi (minimum 4 sources indépendantes pour une EL1, 2
// généralistes + 2 technique/analytique, conformément à la règle éditoriale
// de docs/OPERATIONS.md) :
// - PlanetF1 (généraliste n°1, Michelle Foster, "Las Vegas FP1 a wash-out
//   with just 20 laps covered and not a single time set", 20 Nov 2026 1:35
//   AM) : récit complet de la séance minute par minute, chronologie Perez/
//   Hirakawa/Bottas/Antonelli/Albon, confirmation du total de 20 tours et
//   des 5 pilotes n'ayant jamais quitté les stands (dont Norris, champion du
//   monde sortant). Lu intégralement via fetch-url.yml.
// - Speedcafe (généraliste n°2, Ben Waterworth, "'Ice rink' conditions leave
//   Las Vegas FP1 without lap times", 20 Nov 2026) : confirme l'ABSENCE de
//   drapeau rouge sur les 60 minutes, la substitution Beganovic/Hamilton,
//   citations radio directes Antonelli ("I'm aquaplaning everywhere") et
//   Verstappen ("It's almost like an ice rink"), citation Zak Brown (CEO
//   McLaren, relayée via Sky Sports) sur le choix de ne pas prendre de
//   risque. Lu intégralement via fetch-url.yml.
// - f1oversteer (technique/analytique n°1, "Rain ruins Las Vegas Grand Prix
//   FP1 as Sergio Perez classified first for Cadillac") : classement
//   officiel complet des 22 pilotes (ordre de sortie des stands, "No time
//   set" / "NC"), base du tableau de la section 04. Lu intégralement via
//   fetch-url.yml.
// - gpblog (technique/analytique n°2, "Incredible scenes in Las Vegas as
//   heavy rain leaves FP1 without times") : tableau du classement général
//   pilotes/constructeurs 2026 confirmé en parallèle (Antonelli en tête,
//   Verstappen et Russell suivent, Hamilton 4e à 261 points, Leclerc 5e à
//   249 points), base du contexte de la section 05. Lu intégralement via
//   fetch-url.yml ; le corps narratif propre à cet article n'a pas pu être
//   extrait de la portion récupérée (page dominée par les widgets de
//   classement), documenté honnêtement plutôt que masqué — les faits de
//   course eux-mêmes reposent sur PlanetF1/Speedcafe/f1oversteer.
// - Formula1.com, Pirelli, Ferrari.com, FIA.com : non retentés séparément
//   cette passe, le classement officiel ("No time set" généralisé) étant
//   déjà confirmé de façon identique et indépendante par trois sources
//   médias distinctes ET par la base de données du projet.
//
// Communication directe pilote (obligatoire quand elle existe) : les deux
// citations disponibles pour cette séance (Antonelli, Verstappen) sont des
// messages radio captés par la diffusion officielle et relayés par Speedcafe
// — un message radio broadcast n'est pas un canal propre au pilote au sens
// strict de la règle (ex. réseaux sociaux, story Instagram), donc présenté
// comme tel dans le texte et non étiqueté "communication directe". Aucune
// communication directe pilote au sens strict trouvée pour cette séance.
//
// Zéro contenu « people » : la raison de l'absence de Hamilton n'est jamais
// développée au-delà du fait sportif pur (rotation de pilote de réserve
// obligatoire 2026, déjà en cours pour Beganovic cette saison) — même
// traitement que les cas Beganovic/Leclerc et Haas/Ocon documentés aux
// rounds précédents.
export const ROUND21_EL1_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Las Vegas · Las Vegas Strip Circuit · EL1 — jeudi 19 novembre</p>
    <p class="verdict">La pluie efface purement et simplement la première heure de essais à Las Vegas : en soixante minutes sans le moindre drapeau rouge, le plateau ne totalise que 20 tours de reconnaissance sur pneu pluie — et pas un seul chrono. Max Verstappen compare la piste à une patinoire, Kimi Antonelli alerte sur l'aquaplaning généralisé, et cinq pilotes, dont le champion du monde sortant Lando Norris, ne quittent même pas les stands.</p>
    <p class="subverdict">Sur la piste, Lewis Hamilton n'a pas pris part à cette séance : Dino Beganovic occupait la Ferrari n°38 dans le cadre de la rotation obligatoire de pilotes de réserve 2026, aux côtés de Charles Leclerc qui tournait lui aussi sans établir de temps exploitable. Côté Haas, Ryo Hirakawa remplaçait Oliver Bearman tandis que Rafael Câmara disputait sa propre voiture ; Jak Crawford complétait le trio de pilotes en exercice réglementaire obligatoire chez Aston Martin, à la place de Lance Stroll. Au classement du championnat avant ce week-end, Kimi Antonelli (390 pts) devance Max Verstappen (279), George Russell (262), Lewis Hamilton (261) et Charles Leclerc (249) — l'écart Hamilton/Russell n'est plus que d'un point.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el1-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Une heure sans chrono : le déroulé minute par minute d'une séance quasiment annulée par la pluie</h2>
    <p>Les voitures restent au garage durant les vingt premières minutes, la pluie continuant de tomber sur le circuit des rues de Las Vegas. Sergio Perez (Cadillac) brise le silence après cinq minutes avec un tour solitaire avant de rentrer immédiatement aux stands. Après une attente de près de quinze minutes, Ryo Hirakawa — pilote de réserve Haas remplaçant Oliver Bearman pour cette séance — couvre le deuxième tour de la soirée, imité la même minute par son coéquipier Rafael Câmara ; lui aussi rentre après un seul tour. Alors que la pluie se calme légèrement, davantage de pilotes s'aventurent en reconnaissance : Valtteri Bottas manque de perdre sa Cadillac dans l'eau stagnante du virage 12, Nico Hulkenberg verrouille au virage 11 après la sortie large d'Alex Albon au même endroit, et Charles Leclerc doit corriger un décrochage de l'arrière à la sortie du virage 5.</p>
    <p>Kimi Antonelli, qui roulait avec l'unité de puissance Mercedes évoluée, alerte son ingénieur sans détour : <em>« Je suis en aquaplaning partout. »</em> Max Verstappen livre une évaluation tout aussi sombre après sa propre sortie de reconnaissance : <em>« C'est presque comme une patinoire. »</em> Les deux messages, captés par la diffusion officielle et relayés par Speedcafe, ne sont pas des communications directes au sens strict de la règle éditoriale de ce site, mais restent la description la plus fidèle disponible des conditions réelles de piste. En fin de séance, Câmara ressort pour un second tour et rapporte une pluie plus forte qu'à sa première sortie ; Pierre Gasly et Franco Colapinto (Alpine) sont parmi les derniers à s'aventurer dehors dans la dernière minute, Gasly glissant aux virages 5 et 8. Au total, cinq pilotes — dont le champion du monde sortant Lando Norris — ne quittent jamais les stands. La séance se termine sans qu'un seul chrono n'apparaisse au tableau des temps.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el1-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Hamilton absent, Beganovic au volant : la rotation obligatoire de pilote de réserve, sans développement personnel</h2>
    <p>Lewis Hamilton n'a pas pris part à cette séance. Confirmé indépendamment par Speedcafe (« Ferrari reserve Dino Beganovic was in for Lewis Hamilton ») et par le classement officiel complet relayé par f1oversteer, où Hamilton n'apparaît nulle part parmi les 22 pilotes classés tandis que Beganovic figure bien au volant de la Ferrari n°38. Il s'agit de la rotation obligatoire 2026 de pilote de réserve (deux apparitions en EL1 par voiture sur la saison) déjà en cours pour Beganovic cette année — exactement le même mécanisme réglementaire que ses apparitions précédentes, sans qu'aucune raison personnelle ne soit développée ici, conformément à la règle éditoriale de ce site sur le contenu privé des pilotes.</p>
    <p>Ni le niveau voiture ni le niveau pilotage ne peuvent être renseignés pour Hamilton cette séance, pour la raison la plus simple possible : il n'était pas dans la voiture. La comparaison voiture-à-voiture au sein de Ferrari (Leclerc contre Beganovic) est elle-même sans objet — aucun des deux n'a établi de temps exploitable, Leclerc se limitant à un unique tour de reconnaissance marqué par un décrochage de l'arrière au virage 5 (section 01). Aucun message radio ni compte-rendu d'embarqué disponible pour Beganovic cette séance : rien à analyser au niveau pilotage non plus. Signalé explicitement plutôt que masqué, conformément à la règle éditoriale sur l'analyse Hamilton systématique.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el1-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Ce qui reste mesurable quand il n'y a aucun chrono : météo et choix de gomme</h2>
    <p>Aucune analyse de rythme de relais n'est possible pour cette séance : avec 20 tours au total sur l'ensemble du plateau et aucun pilote dépassant deux tours consécutifs, la méthode habituelle de ce site (écarts de rythme moyen par relais filtré) ne dispose tout simplement pas de matière statistique — documenté honnêtement plutôt que simulé à partir de données insuffisantes. Deux faits chiffrés réels restent toutefois exploitables. D'abord la gomme : chaque relais enregistré dans la base (table practice_stints) est sur pneu pluie intégrale (WET), sans la moindre apparition d'un pneu intermédiaire — cohérent avec une pluie continue plutôt qu'une averse isolée. Ensuite la météo elle-même, qui confirme la chronologie des sources média : température d'air stable autour de 11,6-13,0°C et température de piste entre 13,0 et 14,8°C sur toute l'heure, humidité progressant de 56% à plus de 65% en fin de séance, drapeau pluie (rainfall) actif sur l'écrasante majorité des relevés minute par minute plutôt que ponctuellement. Aucune amélioration nette n'est perceptible dans ces chiffres avant la fin de la séance, cohérent avec le récit de Speedcafe et PlanetF1 d'une pluie qui ne faiblit jamais vraiment durant l'heure.</p>
    <p>Zak Brown, directeur général de McLaren, a résumé la position collective des écuries auprès de Sky Sports, citation relayée par Speedcafe : <em>« Le risque n'en valait pas la récompense »</em> pour tenter un tour chronométré dans ces conditions — ce qui a aussi, note Speedcafe, limité la capacité de McLaren à évaluer ses propres développements apportés depuis les mises à jour du Brésil. Les prévisions pour la suite du week-end sont nettement plus favorables : conditions attendues en amélioration dès l'EL2 du soir, le reste du week-end de Las Vegas étant annoncé sec par l'ensemble des sources consultées.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el1-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Classement complet EL1 — ordre de sortie des stands, aucun chrono établi</h2>
    <p>Aucun pilote n'ayant établi de temps, le classement officiel ci-dessous (confirmé par f1oversteer) reflète l'ORDRE DE SORTIE DES STANDS, pas une performance chronométrée — étiqueté comme tel plutôt que présenté comme un classement de rythme.</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Ordre de sortie</th><th>Pilote</th><th>Écurie</th><th>Résultat</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>Aucun temps établi</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Hirakawa</td><td>Haas F1 Team</td><td>Aucun temps établi (remplace Bearman)</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Câmara</td><td>Haas F1 Team</td><td>Aucun temps établi</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>Aucun temps établi</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Beganovic</td><td>Ferrari</td><td>Aucun temps établi (remplace Hamilton)</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#229971"></span> Crawford</td><td>Aston Martin</td><td>Aucun temps établi (remplace Stroll)</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>Aucun temps établi</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>Aucun temps établi — aquaplaning signalé par radio</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>Aucun temps établi</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>Aucun temps établi</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>Aucun temps établi</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>Aucun temps établi — « comme une patinoire » par radio</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>Aucun temps établi — décrochage au virage 5</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>Aucun temps établi — verrouillage au virage 11</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>Aucun temps établi</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>Aucun temps établi — sorti en dernière minute</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>Aucun temps établi — sorti en dernière minute</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>Non classé — jamais sorti des stands</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>Non classé — jamais sorti des stands</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>Non classé — jamais sorti des stands</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>Non classé — jamais sorti des stands</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>Non classé — jamais sorti des stands</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el1-5">
  <div class="prose">
    <h2 class="sectitle">Le contexte du week-end</h2>
    <p>Avant ce Grand Prix, le classement des pilotes s'établit ainsi (source : tableau de classement général relayé par gpblog) : Kimi Antonelli (Mercedes) 390 points en tête, Max Verstappen (Red Bull Racing) deuxième avec 279 points, George Russell (Mercedes) troisième avec 262, Lewis Hamilton (Ferrari) quatrième avec 261 — à seulement un point de Russell — et Charles Leclerc (Ferrari) cinquième avec 249. La météo défavorable de cette EL1 n'a donc fait que repousser, sans l'annuler, l'enjeu sportif réel du week-end : aucun protagoniste de ce resserrement au classement n'a pu avancer ni reculer d'un seul chrono ce jeudi. Les prévisions pour le reste du week-end (EL2 jeudi soir, EL3 et qualifications vendredi, course samedi) sont nettement plus favorables selon l'ensemble des sources consultées.</p>
  </div>
</section>

<section class="block" id="sec-el1-6">
  <details class="sources">
    <summary>Sources utilisées — EL1 Las Vegas (4 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), session_key=11413 : classement, relais, météo minute par minute. Primaire pour la météo et les compos pneus (section 03) ; le seul temps "chronométré" présent en base (Câmara, 1867,424s) est documenté comme artefact de mesure plutôt que repris tel quel, corrigé par triple confirmation média indépendante (aucun temps établi par personne).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.planetf1.com/news/2026-las-vegas-grand-prix-fp1-report" data-desc="Récit complet de la séance minute par minute (Michelle Foster) : chronologie Perez/Hirakawa/Bottas/Antonelli/Albon/Camara, confirmation des 20 tours totaux et des 5 pilotes n'ayant jamais quitté les stands. Lu intégralement via fetch-url.yml.">PlanetF1 — Las Vegas FP1, un wash-out total</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://speedcafe.com/f1-news-2026-las-vegas-grand-prix-fp1-practice-results-heavy-rain-no-times-set-conditions-latestweaether/" data-desc="Confirmation de l'absence de drapeau rouge, de la substitution Beganovic/Hamilton, citations radio Antonelli et Verstappen, citation Zak Brown (via Sky Sports). Lu intégralement via fetch-url.yml.">Speedcafe — conditions « patinoire », aucun chrono</a><span class="desc">Speedcafe</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique</h5>
      <ul>
        <li><a href="https://www.f1oversteer.com/races/rain-ruins-las-vegas-grand-prix-fp1-as-sergio-perez-classified-first-for-cadillac/" data-desc="Classement officiel complet des 22 pilotes (ordre de sortie des stands, « No time set » / « NC »), base du tableau de la section 04. Lu intégralement via fetch-url.yml.">f1oversteer — classement complet, aucun temps établi</a><span class="desc">f1oversteer</span></li>
        <li><a href="https://www.gpblog.com/en/breaking-news/incredible-scenes-in-las-vegas-as-heavy-rain-leaves-fp1-without-times" data-desc="Tableau du classement général pilotes 2026 confirmé en parallèle (Antonelli en tête, Hamilton 4e à 261 points, Leclerc 5e à 249), base du contexte de la section 05. Corps narratif propre à l'article non extractible de la portion récupérée (page dominée par les widgets de classement) — documenté honnêtement plutôt que masqué.">gpblog — classement général confirmé</a><span class="desc">gpblog</span></li>
      </ul>
    </div>
  </details>
</section>
`;
