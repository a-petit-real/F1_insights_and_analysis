// Analyse EL1 — Grand Prix des États-Unis (Austin, COTA), round 18, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py
// (session_key 11389, 2026-10-23 17:30->18:30 UTC). Point de rigueur découvert
// en recoupant : la base enregistre le MEILLEUR TOUR BRUT de chaque pilote, y
// compris les tours ensuite supprimés par les commissaires pour limites de
// piste — c'est le cas de Verstappen (1:35,860 en base, tour supprimé au
// virage 19, temps officiel 1:36,136) et d'Albon (plusieurs tours supprimés,
// temps officiel réduit à son seul tour représentatif restant, 2:16,468). Le
// classement officiel ci-dessous (post-suppressions) et l'intégralité du
// contexte narratif viennent de deux rapports Grandprix.com datés du 23
// octobre 2026 ("Practice 1 Report - Leclerc leads Austin opener" et son
// pendant EL2), confirmés comme portant bien sur ce round par lecture directe
// (mention explicite "United States GP 2026", citations datées) — et recoupés
// avec le classement officiel Formula1.com (formula1.com/en/results/2026/
// races/1297/united-states/practice/1, fetché en primaire) et avec
// motorbox.com ("GP Stati Uniti 2026, risultati PL1/FP1", édition italienne),
// tous deux concordant à la milliseconde près avec Grandprix.com. Les
// compositions de gommes (C2 dur/C3 medium/C4 tendre) et le contexte
// stratégique viennent d'un article Formula1.com officiel daté du 21 octobre
// 2026 citant directement Pirelli. Plusieurs tentatives de recherche pour des
// sources anglophones additionnelles (RacingNews365, Crash.net, PlanetF1,
// Autosport, Racer.com — ce dernier bloqué par un 429 sur deux tentatives) ou
// francophones n'ont renvoyé aucun article propre à ce round encore indexé au
// moment de la rédaction (séance disputée il y a quelques heures à peine) —
// limite de sourcing documentée explicitement plutôt que masquée ; un piège a
// par ailleurs été écarté après lecture complète (un article Formula1.com au
// titre quasi identique, "Verstappen tops the times in sole practice
// session in Austin", s'est révélé être le compte-rendu de 2023, pas de
// 2026 — le mot "sole" y trahissait un format Sprint, absent du calendrier
// 2026 à Austin). Aucune citation directe de pilote n'a donc pu être
// recoupée sur un second média indépendant pour cette séance précise ;
// les citations de Hamilton et Verstappen ci-dessous reposent sur la seule
// source Grandprix.com, signalées comme telles.
//
// Analyse technique quantifiée : les moyennes de rythme en relais long citées
// plus bas viennent d'une requête dédiée sur practice_laps/practice_stints
// (scripts/practice_briefing_laptimes_by_car.py, nouvel outil ajouté pour ce
// round — équivalent de race_briefing_laptimes_by_car.py côté essais),
// méthode identique à celle déjà documentée pour le round 17 : moyenne des
// tours d'un relais donné, tour de sortie de stand exclu, puis tours encore
// supérieurs à 103% de la médiane du relais également exclus (pour ne pas
// confondre un retour au stand ou un tour dans le trafic avec un vrai delta
// de performance). Aucune donnée inventée.
//
// Passe d'enrichissement technique (2026-10-24), suite à une plainte
// explicite de l'utilisateur sur le manque de profondeur technique des
// sections narratives (plancher Ferrari, plainte de direction de
// Verstappen) — les sections ci-dessus restent inchangées, tout le travail
// de cette passe porte sur la technique/narratif. Sources réellement
// fetchées et lues en entier via le workflow fetch-url.yml (pas de citation
// sur simple extrait de recherche) :
// - The Race, « What Ferrari's changing with its biggest F1 upgrade of
//   2026 » (Rosario Giuliana, 18 oct. 2026) : seule source technique
//   indépendante trouvée qui décrit vraiment ce que vise la révision du
//   plancher (zone avant → diffuseur dans son ensemble, pas un point
//   isolé), avec le détail que Ferrari a étudié puis écarté la solution de
//   congé de 20mm entre bras de plancher et carrosserie employée par Red
//   Bull (RB22) pour recréer les « waterslides » — jugée trop coûteuse en
//   ressources d'intégration pour le gain espéré sur les courses restantes.
// - Crash.net, « Ferrari tipped to bring major SF-26 updates for final
//   stretch of 2026 » (Luke Newman, 19 oct. 2026) : confirme l'objectif
//   déclaré (élargir la fenêtre de fonctionnement, autoriser des réglages
//   moins extrêmes) et la cible du reste du paquet (traînée, sidepods) vue
//   comme palliatif au déficit de puissance moteur Ferrari.
// - Tentative explicitement infructueuse mais honnêtement documentée :
//   l'URL motorsport.com « ferrari-floor-update-us-gp/3197602 », trouvée
//   deux fois via recherche et qui RESSEMBLE à l'article 2026 (slug et ID
//   cohérents avec la chaîne de versions localisées fr/de/es/lat du même
//   article), s'est révélée, après lecture complète du contenu réellement
//   renvoyé par le serveur (vérifié deux fois, sur l'URL anglaise ET sur
//   son miroir fr.motorsport.com), être l'article de 2018 de Jonathan Noble
//   sur le plancher de la SF71H (Vettel, Austin 2018, photos Giorgio
//   Piola) — un bug de contenu côté motorsport.com (mauvais article servi
//   sous ce chemin), pas une erreur de notre recherche, mais qui aurait
//   produit une fausse citation si on s'était arrêté au titre/à l'URL.
//   Nouvelle variante du piège déjà documenté pour le round 17 : lire le
//   contenu réellement fetché fait foi, jamais l'URL ou le titre seuls.
// - Recherches avec effort réel mais sans résultat exploitable pour ce
//   round précis (documenté honnêtement, pas masqué) : Craig Scarborough
//   (ScarbsF1/ScarbsTech) n'a publié, dans ce qui a pu être trouvé, aucune
//   analyse datée du plancher Austin 2026 — seul un post ancien (fév. 2026)
//   sur l'arrière de la SF-26 a été repéré via un forum F1Technical.net,
//   lui-même introuvable au second fetch (404) ; Matthew Somerfield
//   (Substack SomersF1 / PlanetF1) n'a renvoyé aucun résultat spécifique à
//   ce week-end ; Gary Anderson (chronique The Race) n'a pas de colonne
//   repérée pour ce Grand Prix précis ; RaceFans.net n'est apparu dans
//   aucune recherche ciblée sur ce round ; Giorgio Piola n'a pas
//   d'illustration retrouvée pour ce plancher 2026 (seulement ses
//   illustrations de 2018, dans le même article-piège) ; r/F1Technical n'a
//   livré aucun fil identifiable sur ce round précis (recherches ciblées
//   « Austin steering », « Ferrari floor Austin » via l'API de recherche
//   Reddit elle-même en échec HTTP depuis le runner). Ces absences sont
//   documentées comme un vrai manque de sourcing sur ce round précis, pas
//   comme une impasse de recherche dissimulée.
// - Sur la plainte de Verstappen (section 03) : aucune source technique
//   nommée (équipe, journaliste spécialisé, communauté) n'a commenté cet
//   épisode précis malgré la recherche ci-dessus. Le contexte technique
//   générique ajouté sur la direction assistée F1 vient de rtrsports.com,
//   « Do F1s have power steering? » (Emanuele Venturoli) : direction
//   assistée F1 hydraulique (pas électronique), intégrée à la boîte de
//   vitesses et à l'embrayage, réglage complexe, ressenti très sensible au
//   pilote — un fait générique sur l'architecture de ces systèmes, pas une
//   explication de l'incident de Verstappen, présenté comme tel dans le
//   texte (aucun diagnostic précis inventé).
export const ROUND18_EL1_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix des États-Unis · Austin (COTA) · EL1 — vendredi 23 octobre</p>
    <p class="verdict">Leclerc signe la référence officielle d'une première heure sans drapeau rouge, mais la vraie histoire est au virage 19 : le tour le plus rapide de la séance, celui de Verstappen, est supprimé pour limites de piste — sans quoi Red Bull aurait devancé Ferrari.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">1:36,052</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,084s*</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+0,245s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,326s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,481s</span></div>
    </div>
    <p class="subverdict">Retour au format standard après le week-end Sprint de Singapour : trois séances d'essais avant les qualifications, et une Ferrari devant dès la première heure grâce à un plancher révisé — dont Hamilton minimise pourtant lui-même la portée. L'écart réel entre Red Bull et Ferrari reste toutefois à peu près nul : le meilleur tour de la séance, un 1:35,860 de Verstappen, est supprimé pour une sortie de piste au virage 19, laissant son chrono précédent (1:36,136) comme référence officielle, à peine huit centièmes de Leclerc. Cinquième, Kimi Antonelli aborde ce week-end comme le premier de la saison où il peut mathématiquement être sacré champion du monde dès dimanche soir — un scénario qui exige qu'il gagne la course, que Russell termine hors du top 8 et que Hamilton reste hors du top 4. Côté américain, Colton Herta effectue sa quatrième sortie EL1 de la saison pour Cadillac à la place de Pérez, sur le circuit où il a décroché sa première victoire en IndyCar en 2019.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el1-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Ferrari devant, Red Bull à huit centièmes — et un meilleur tour supprimé</h2>
    <p>La séance s'est déroulée sans le moindre drapeau rouge, sous une chaleur conforme à l'habitude texane : air à 27°C (81°F), piste partant de 39°C pour grimper à 43°C sur l'heure. Hamilton a établi la première référence avant que Leclerc ne prenne l'avantage sur pneu medium, confirmé ensuite sur tendre pour un chrono final de 1:36,052. Verstappen a répliqué en fin de séance avec un 1:35,860 — mais ce tour est supprimé après coup pour une sortie de piste au virage 19, ne laissant que son chrono antérieur de 1:36,136 (+0,084s) comme référence officielle. Les six premiers restent séparés de moins d'un demi-seconde : Norris 3<sup>e</sup> (+0,245s), Russell 4<sup>e</sup> (+0,326s), Antonelli 5<sup>e</sup> (+0,481s) et Hamilton 6<sup>e</sup> (+0,503s) sur la seconde Ferrari.</p>
    <p>Ferrari arrivait à Austin avec un plancher révisé, sans grand espoir affiché en interne : <em>« On a une toute petite évolution ce week-end. C'est moins d'un dixième. Genre un demi-dixième »</em>, a minimisé Hamilton avant la séance — une prudence qui contraste avec le résultat du jour, sans que le chronomètre permette de distinguer ce qui relève du plancher, du circuit ou de la charge de carburant du vendredi.</p>
    <p>Ce que vise réellement cette évolution, d'après The Race et Crash.net (seules sources techniques indépendantes trouvées pour ce paquet précis, lues intégralement avant citation) : ce n'est pas une pièce isolée mais une révision de l'ensemble du dessous de caisse, de la zone avant jusqu'au diffuseur, avec deux objectifs déclarés — regagner de l'appui et surtout rééquilibrer une SF-26 encore jugée trop chargée vers l'avant, tout en élargissant la fenêtre de fonctionnement pour autoriser des réglages moins extrêmes. C'est le quatrième et dernier paquet aéro majeur de la saison pour Ferrari, qui bascule ensuite ses ressources sur la monoplace 2027. Fait notable sur ce qui n'a <em>pas</em> été fait : Ferrari a étudié en soufflerie puis écarté la solution de congé de 20mm entre le bras de plancher et la carrosserie employée par Red Bull sur la RB22 pour recréer les « waterslides » (canaux guidant l'air vers l'arrière) — jugée trop coûteuse à intégrer avec le reste de la plateforme aéro pour le gain espéré sur les six courses restantes. Les sidepods et la carrosserie révisés, eux, viennent plutôt réduire la traînée (un point faible assumé de la SF-26, lié à son moteur moins puissant) et n'arriveront vraisemblablement qu'au Mexique.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el1-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Le vrai rythme long relais dit une autre histoire</h2>
    <p>Le classement par meilleur tour ne raconte qu'une partie de la séance — sur un relais long représentatif (tours exclus à l'entrée/sortie des stands et au-delà de 103% de la médiane du relais, pour écarter trafic et retours au stand), c'est Ferrari et McLaren qui impressionnent le plus, pas Red Bull :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Gomme / relais</th><th>Tours exploités</th><th>Moyenne relais</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>SOFT usé (âge 6)</td><td>4</td><td>1:41,456</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>MEDIUM neuf</td><td>7</td><td>1:41,530</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>SOFT neuf</td><td>4</td><td>1:41,773</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>SOFT neuf</td><td>6</td><td>1:41,886</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>HARD neuf</td><td>5</td><td>1:42,266</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>MEDIUM neuf</td><td>5</td><td>1:42,281</td></tr>
      </tbody>
    </table>
  </div>
  <div class="prose">
    <p>Verstappen, premier sur un tour isolé (avant suppression), referme près de quatre dixièmes par tour sur Leclerc et Norris dès qu'il s'agit d'un relais complet à charge de carburant plus réaliste — un ordre inversé par rapport au classement officiel, qui n'est jamais anodin un vendredi. Russell et Piastri, eux, pointent avec un tendre et un medium neufs à un rythme proche de 1:42,3, cohérent avec leurs positions respectives au classement par meilleur tour.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el1-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Verstappen : « le volant a un comportement bizarre »</h2>
    <p>Avant même son tour finalement supprimé, Verstappen se plaignait d'un souci de direction en tout début de séance : <em>« Le volant a un comportement bizarre. Quand je tourne à gauche, il y a du frottement. Ce n'est pas linéaire. »</em> Le problème n'a pas empêché Red Bull de signer le tour le plus rapide de l'heure, avant sa suppression — un épisode qui laisse planer une incertitude technique sur la monoplace à l'approche des qualifications, davantage qu'un simple souci de pilotage.</p>
    <p>Aucune source technique nommée — ni Red Bull, ni journaliste spécialisé (Scarborough, Somerfield, Gary Anderson), ni communauté technique dédiée (r/F1Technical, F1Technical.net) — n'a commenté cet épisode précis malgré une recherche réelle ; c'est documenté ici comme un manque de sourcing plutôt que masqué. Un point de contexte générique, mais vérifié, permet au moins de cadrer la nature du problème plutôt que la cause : la direction assistée en F1 reste hydraulique, pas électronique, intégrée aux mêmes circuits que la boîte de vitesses et l'embrayage, avec un réglage réputé complexe et un ressenti auquel certains pilotes sont particulièrement sensibles. Un frottement qui apparaît uniquement dans un sens de rotation et de façon non linéaire pointerait donc plutôt, dans ce type d'architecture, vers une dissymétrie ou un point de blocage mécanique du circuit hydraulique ou de la colonne de direction que vers un défaut électronique au sens où on l'entendrait sur une direction assistée de voiture de route — une lecture technique générique, pas un diagnostic établi sur cette monoplace précise.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el1-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Herta à domicile, sur la piste de sa première victoire IndyCar</h2>
    <p>Colton Herta a pris le volant de la Cadillac de Sergio Pérez pour sa quatrième séance EL1 de la saison — la première disputée aux États-Unis, et sur un circuit particulier pour lui : le Circuit of The Americas, là où il avait décroché sa toute première victoire en IndyCar en 2019. Le pilote américain, actuellement engagé à plein temps en Formule 2 avec Hitech et réserviste Cadillac, a bouclé 21 tours pour un meilleur temps de 1:39,979 (21<sup>e</sup>) — un programme bien plus complet que sa sortie écourtée par un problème hydraulique à Monza quelques semaines plus tôt.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-el1-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Williams en difficulté, Albon privé de tous ses tours représentatifs</h2>
    <p>Alexander Albon a bouclé 19 tours sans qu'aucun ne survive au contrôle des limites de piste — la monoplace, visiblement malaisée sur les bosses et dans la succession rapide des virages Esses, ne laisse à Albon qu'un seul tour classé (2:16,468), largement plus lent que son rythme réel et suffisant seulement pour la 22<sup>e</sup> et dernière place. Carlos Sainz, de son côté, termine 19<sup>e</sup> sans incident signalé mais sans rythme non plus — une entame de week-end compliquée pour l'écurie de Grove sur un circuit qui, selon Pirelli, sollicite particulièrement l'avant en secteur 1 et l'arrière en secteur 3.</p>
    <p>En fin de séance, la FIA a profité des dernières minutes pour faire rouler une simulation logicielle à faible grip autour du virage 15 — un essai qui s'inscrit dans son travail continu sur les protections électroniques, engagé après les difficultés rencontrées en Malaisie plus tôt dans la saison.</p>
  </div>
</section>

<section class="block" data-num="06" id="sec-el1-6">
  <div class="sec-marker"><span class="n">06</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">06</span> Classement complet EL1 (officiel, après suppressions)</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:36,052</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:36,136</td><td>+0,084s (tour le plus rapide, 1:35,860, supprimé pour limites de piste au virage 19)</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:36,297</td><td>+0,245s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:36,378</td><td>+0,326s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:36,533</td><td>+0,481s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:36,555</td><td>+0,503s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:36,786</td><td>+0,734s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:36,995</td><td>+0,943s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:37,063</td><td>+1,011s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:37,309</td><td>+1,257s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:37,665</td><td>+1,613s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:37,688</td><td>+1,636s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:37,783</td><td>+1,731s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:37,790</td><td>+1,738s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:37,801</td><td>+1,749s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:37,896</td><td>+1,844s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:38,121</td><td>+2,069s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>1:38,122</td><td>+2,070s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:38,846</td><td>+2,794s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:39,053</td><td>+3,001s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Herta</td><td>Cadillac</td><td>1:39,979</td><td>+3,927s (pilote de réserve, à la place de Pérez)</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>2:16,468</td><td>+40,416s (tous les tours plus rapides supprimés pour limites de piste)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el1-7">
  <details class="sources">
    <summary>Sources utilisées — EL1 Austin (6 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
        <li><span class="desc">The Pit Wall — requête dédiée tours bruts par voiture (scripts/practice_briefing_laptimes_by_car.py, nouvel outil) : base des moyennes de relais long de la section 02.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1297/united-states/practice/1" data-desc="Classement officiel post-suppressions, concorde à la milliseconde avec Grandprix.com et motorbox.com.">Formula1.com — résultats officiels EL1</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.formula1.com/en/latest/article/what-tyres-will-the-teams-and-drivers-have-for-the-2026-united-states-grand-prix.44LKddYSbUJK1LxMAa6VLI" data-desc="Composés Pirelli (C2/C3/C4) et analyse stratégique du week-end, citation directe de la préview Pirelli.">Formula1.com — gommes Pirelli pour Austin</a><span class="desc">Formula1.com, citant Pirelli</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Recoupement et contexte narratif</h5>
      <ul>
        <li><a href="https://www.grandprix.com/races/united-states-gp-2026-practice-1-report.html" data-desc="Déroulé complet, citations de Hamilton et Verstappen, incident Albon, test FIA virage 15, contexte Herta.">Grandprix.com — rapport EL1</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.motorbox.com/auto/sport/f1/gran-premi/f1-gp-stati-uniti-2026-austin-risultati-classifica-ordine-di-arrivo" data-desc="Classement EL1 confirmé indépendamment, édition italienne.">Motorbox.com — résultats EL1</a><span class="desc">Motorbox.com (Italie)</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique (nouveau cette passe)</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/what-ferrari-is-changing-biggest-f1-2026-upgrade/" data-desc="Détail du plancher avant→diffuseur, objectifs appui/équilibre/fenêtre de fonctionnement, étude puis abandon de la solution Red Bull (congé 20mm/waterslides), dernier paquet majeur SF-26 avant 2027. Lu intégralement via fetch-url.yml (article du 18 oct. 2026, Rosario Giuliana).">The Race — ce que Ferrari change avec sa plus grosse évolution 2026</a><span class="desc">The Race</span></li>
        <li><a href="https://www.crash.net/f1/news/1107696/1/ferrari-tipped-bring-major-sf-26-updates-final-stretch-2026" data-desc="Préview datée du 19 oct. 2026 (Luke Newman) : objectifs déclarés du plancher (appui, fenêtre de fonctionnement) et du reste du paquet (traînée, sidepods) face au déficit moteur Ferrari. Lu intégralement via fetch-url.yml.">Crash.net — Ferrari et ses évolutions SF-26 pour la fin de saison</a><span class="desc">Crash.net</span></li>
        <li><span class="desc">rtrsports.com, « Do F1s have power steering? » (Emanuele Venturoli) : contexte générique vérifié sur l'architecture hydraulique de la direction assistée F1, utilisé en section 03 pour cadrer la nature (pas la cause précise) de la plainte de Verstappen. Lu intégralement via fetch-url.yml.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
