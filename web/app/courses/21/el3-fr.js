// Analyse EL3 — Grand Prix de Las Vegas (Las Vegas Strip Circuit), round 21,
// saison 2026. Prolonge l'EL1 (séance effacée par la pluie) et l'EL2 (piste
// humide s'asséchant progressivement) : l'EL3 est la toute première séance
// disputée intégralement sur piste sèche de ce week-end, et donc la
// première référence de rythme réellement exploitable.
//
// Données de séance : donnée primaire = pipeline OpenF1 (session_key=11415,
// Practice 3, 2026-11-21 00:30->01:30 UTC), classement/relais/météo vérifiés
// directement depuis la base via scripts/practice_briefing.py (22 pilotes
// classés, 633 tours au total, 72 relais, piste sèche du début à la fin —
// pluie=False sur l'intégralité des 82 points météo, air 13,8-14,4°C, piste
// 16,5-18,2°C). Classement confirmé au tour et à la centième identique par
// Formula1.com, PlanetF1 et The Race (Russell 1:34.041, Antonelli +0,911s,
// Norris +0,974s, Leclerc +1,150s, jusqu'à Bottas +3,655s).
//
// Analyse technique quantifiée — méthode nominale appliquée, avec une
// réserve méthodologique documentée : scripts/practice_briefing_laptimes_by_car.py
// interrogé pour Russell, Antonelli, Norris, Leclerc, Hamilton et Verstappen
// (lap-by-lap complet, tours d'entrée/sortie exclus, tours > 103% de la
// médiane du relais écartés pour neutraliser trafic/drapeaux jaunes). Seul
// le PREMIER relais de chaque pilote (le plus long, 9 à 14 tours selon les
// cas) donne un échantillon de tours propres suffisant pour un écart de
// rythme moyen fiable — les relais 2 et 3 sont fortement pollués par le
// trafic dense et les deux incidents sous enquête (Verstappen/Colapinto,
// Verstappen/Russell) documentés en section 01, qui ont multiplié les tours
// hors-norme en seconde partie de séance (jusqu'à 7 des 8 tours d'un relais
// écartés comme hors-seuil pour Russell en relais 2) : les moyennes de ces
// relais-là ne sont donc pas exploitées ici, par rigueur plutôt que par
// choix de présenter un chiffre trompeur. Vitesses de pointe (speedST)
// comparées sur les meilleurs tours individuels (secteurs eux-mêmes
// cohérents avec les écarts officiels à la centième).
//
// Analyse Hamilton (règle éditoriale c-bis, 2026-11-09) : Lewis Hamilton a
// bien pris part à cette séance — 8e à 1,393s de Russell. NIVEAU VOITURE :
// comparaison chiffrée avec son coéquipier Charles Leclerc (4e, +1,150s),
// à la fois sur le rythme de relais long (premier relais, pneu tendre pour
// les deux) et sur les trois secteurs de leurs meilleurs tours individuels
// respectifs (table practice_laps du projet). NIVEAU PILOTAGE : PlanetF1 et
// The Race rapportent tous deux, de façon concordante et explicitement
// sourcée, trois erreurs de pilotage identifiables d'Hamilton pendant la
// séance (deux blocages de roues avant — virage 14 au 3e tour sur gomme
// tendre, puis virage 1 après le passage en medium — et un tête-à-queue
// dans le dégagement du virage 12), que The Race résume par « via a couple
// of off-track moments » pour expliquer sa 8e place. Aucun message radio
// transcrit ni compte-rendu d'embarqué dédié à Hamilton n'a pu être trouvé
// pour cette séance précise au-delà de ces comptes-rendus écrits — signalé
// explicitement plutôt qu'une description d'embarqué inventée.
//
// Sourcing élargi (4 sources indépendantes, 3 généralistes dont 1 officiel
// + 1 technique/analytique confirmée) :
// - Formula1.com (officiel/généraliste, "FP3: Russell goes fastest from
//   Antonelli and Norris during final practice in Las Vegas", 21 Nov 2026
//   1:49am UTC) : récit complet avec classement intégral, enquête
//   Verstappen/Colapinto, incident Verstappen/Russell au virage 14 en fin
//   de séance, citations radio. Lu intégralement via fetch-url.yml.
// - PlanetF1 (généraliste à forte substance factuelle, "George Russell
//   tops Las Vegas FP3 as Max Verstappen clash sparks stewards
//   investigation", 21 Nov 2026 1:40am UTC) : live-blog minute par minute
//   le plus détaillé des quatre sources — double enquête Verstappen
//   (conduite erratique virage 16, puis accrochage avec Russell), citations
//   radio complètes de Russell et Verstappen, et les trois incidents de
//   pilotage d'Hamilton (blocages virages 14 et 1, tête-à-queue virage 12).
//   Lu intégralement via fetch-url.yml.
// - The Race (technique/analytique, "Russell and Verstappen make contact
//   in final Vegas F1 practice") : classement complet des 22 pilotes
//   identique chiffre pour chiffre à la base OpenF1 du projet, confirmation
//   croisée indépendante, détail du temps théorique par secteurs (Lawson
//   2e en théorique malgré une 7e place réelle), confirmation que la
//   8e place d'Hamilton s'explique par « a couple of off-track moments ».
//   Lu intégralement via fetch-url.yml.
// - Pit Debrief (généraliste), "2026 F1 Las Vegas GP | FP3 results" :
//   confirmation croisée indépendante de la chronologie complète de la
//   séance (progression des références de Colapinto à Verstappen puis
//   Russell) et du classement. Lu intégralement via fetch-url.yml.
// - Limite honnête de sourcing : malgré plusieurs tentatives ciblées
//   (Autosport, Motorsport.com, recherches multiples), aucune deuxième
//   source strictement catégorisée "technique/analytique" dans
//   docs/SOURCES.md n'a pu être récupérée pour CETTE séance précise dans
//   le délai de ce passage (uniquement des résultats 2025 ou des pages
//   dont le contenu ne correspondait pas à l'année). The Race reste la
//   seule source techniquement catégorisée comme telle confirmée pour
//   cette séance — signalé explicitement plutôt que masqué, conformément
//   au précédent établi pour l'EL2 de ce même week-end.
//
// Communication directe pilote (obligatoire quand elle existe) : les
// citations Russell et Verstappen sont des messages radio captés par la
// diffusion officielle et relayées par les médias — pas une communication
// directe au sens strict de la règle (réseaux sociaux propres au pilote).
// Aucune communication directe au sens strict trouvée pour cette séance.
//
// Zéro contenu « people » : aucun développement sur la vie privée des
// pilotes. L'accrochage Verstappen/Russell et l'enquête Verstappen/Colapinto
// sont traités strictement comme des faits de piste et de règlement
// sportif, jamais comme un angle relationnel entre pilotes.
export const ROUND21_EL3_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Las Vegas · Las Vegas Strip Circuit · EL3 — vendredi 20/samedi 21 novembre</p>
    <p class="verdict">Premiers tours sur piste entièrement sèche de ce week-end : George Russell boucle l'EL3 en tête avec un 1:34.041, devançant son coéquipier Kimi Antonelli de 0,911s et Lando Norris de 0,974s, au terme d'une heure animée par deux enquêtes des commissaires visant Max Verstappen — une pour conduite jugée erratique au virage 16 face à Franco Colapinto, l'autre pour un accrochage roue contre roue avec Russell lui-même au virage 14 dans les derniers instants de la séance.</p>
    <p class="subverdict">Lewis Hamilton termine 8e à 1,393s de Russell, devancé par son coéquipier Charles Leclerc, 4e à 1,150s — une séance marquée pour le Britannique par deux blocages de roues et un tête-à-queue sans conséquence, documentés plus bas. Au classement du championnat avant ce week-end : Kimi Antonelli (390 pts) devance Max Verstappen (279), George Russell (262), Lewis Hamilton (261) et Charles Leclerc (249).</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el3-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Enfin le sec : une heure dense, deux enquêtes des commissaires</h2>
    <p>Après une EL1 effacée par la pluie et une EL2 disputée sur piste humide s'asséchant progressivement, l'EL3 est la première séance du week-end courue intégralement sur piste sèche (82 points météo confirmant une absence totale de pluie, température de piste 16,5-18,2°C) — la seule référence de rythme réellement comparable avant les qualifications. Franco Colapinto pose le premier repère du jour, immédiatement amélioré par Max Verstappen, Charles Leclerc puis Pierre Gasly à mesure que le relais s'installe. Lando Norris est le premier à passer sous la barre des 1:40, avant que Verstappen ne prenne la tête avec un 1:36.147 puis un 1:35.675. Quelques minutes plus tôt, le Néerlandais avait été noté par les commissaires pour une conduite jugée erratique au virage 16 alors que l'Alpine de Franco Colapinto le rattrapait en pleine accélération — un incident officiellement mis à l'enquête pour l'après-séance.</p>
    <p>Les Mercedes de George Russell et Kimi Antonelli prennent ensuite le relais en tête à l'approche de la mi-séance, Russell améliorant successivement à 1:35.124 puis 1:34.805. Dans les dix dernières minutes, alors qu'une bonne partie du plateau chausse un train de pneus tendres neufs pour une simulation de qualification, Russell abaisse encore la référence à 1:34.306 avant que Norris ne s'intercale provisoirement en 2e position et qu'Antonelli n'améliore à 1:34.952. Le fait marquant de la fin de séance intervient dans les dernières minutes : Verstappen double Russell puis ralentit, provoquant un contact roue contre roue au virage 14 lorsque le Britannique tente de reprendre sa position — « Il m'a poussé dans le mur », rapporte Verstappen par radio à son ingénieur, tandis que Russell commente sobrement : « Vous avez vu le replay de Verstappen ? Amusant, non ? ». L'incident est lui aussi mis à l'enquête pour l'après-séance (verdict : avertissement pour Verstappen, sans pénalité de grille, selon PlanetF1 et The Race). Russell conserve la tête jusqu'au drapeau à damier avec son 1:34.041, final et inchangé.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el3-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Rythme chiffré : McLaren solide en relais long, Mercedes devant même sur le medium</h2>
    <p>Avec 633 tours et 72 relais enregistrés sur une séance enfin exploitable pour une vraie comparaison de rythme, l'analyse se concentre sur le premier relais de chaque pilote (le plus long de la séance, 9 à 14 tours selon les cas) — les relais 2 et 3 étant trop pollués par le trafic dense et les deux incidents sous enquête pour produire un écart moyen fiable une fois les tours hors-norme (&gt;103% de la médiane du relais) écartés. Sur ce premier relais, tous deux en pneu tendre, Lando Norris tourne en moyenne à 97,356s (9 tours propres) — nettement devant les deux Ferrari, Hamilton (99,428s, 10 tours propres) et Leclerc (99,627s, 9 tours propres), soit plus de 2 secondes par tour d'écart en rythme soutenu malgré un avantage beaucoup plus resserré sur le tour chronométré isolé (0,176s entre Norris 4e et Leclerc, qui le précède pourtant au classement final — Norris n'a pas remis de train neuf pour un tour de référence pure). Fait notable : George Russell et Kimi Antonelli, qui ont débuté sur pneu medium (plus dur) plutôt que tendre, tournent respectivement à 98,442s et 99,099s sur ce même relais d'ouverture — plus rapides que les deux Ferrari sur pneu tendre, un signal de rythme Mercedes qui dépasse la seule performance sur tour lancé.</p>
    <p>Sur le tour de référence individuel, les écarts entre les cinq premiers sont cohérents secteur par secteur avec le classement officiel à la centième : Russell (26,894 / 31,898 / 35,249 — vitesse de pointe 307 km/h) devance Antonelli (27,244 / 31,960 / 35,748 — 302 km/h), Norris (26,964 / 31,888 / 36,163 — 311 km/h) et Leclerc (27,193 / 32,492 / 35,506 — 298 km/h). Norris, malgré le 3e temps, affiche la vitesse de pointe la plus élevée du groupe de tête (311 km/h) — un signal d'aéro McLaren plutôt orientée vitesse de pointe que appui sur ce tracé urbain.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el3-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Hamilton : plus rapide que Leclerc en rythme soutenu, mais trois erreurs de pilotage lui coûtent la place</h2>
    <p><strong>Niveau voiture.</strong> Lewis Hamilton signe le 8e temps (1:35.434, +1,393s sur Russell), devancé par son coéquipier Charles Leclerc, 4e à 1,150s. Sur leur premier relais respectif — tous deux en pneu tendre, l'échantillon le plus fiable de la séance —, Hamilton tourne en réalité plus vite que Leclerc en rythme soutenu : 99,428s de moyenne sur 10 tours propres contre 99,627s pour le Monégasque sur 9 tours propres, soit 0,199s par tour à l'avantage d'Hamilton. L'écart s'inverse sur le tour de référence individuel : Hamilton (27,262 / 32,380 / 35,792 — 305 km/h) perd 0,069s sur Leclerc en secteur 1 (27,193) et 0,286s en secteur 3 (35,506), mais regagne 0,112s en secteur 2 (32,492 pour Leclerc) — et affiche une vitesse de pointe supérieure (305 contre 298 km/h) sur ce tour pourtant plus lent dans l'absolu, ce qui situe l'écart Ferrari interne davantage dans l'exploitation du grip en entrée/sortie de virage (secteurs 1 et 3) que dans un déficit moteur ou aéro pur. Aucun canal FastF1 (rapport de boîte, régime moteur, usage du DRS) n'est disponible pour les séances d'essais à ce jour — réservé à la course selon la règle éditoriale de ce site.</p>
    <p><strong>Niveau pilotage.</strong> PlanetF1 et The Race rapportent, de façon concordante, trois erreurs de pilotage identifiables d'Hamilton au cours de la séance : un blocage des pneus tendres à l'entrée du virage 14 lors de son 3e tour chronométré (« Not a good time to flat-spot a set of tyres », note PlanetF1 — un blocage précoce qui compromet la suite du relais sur ce train de gommes) ; un second blocage, cette fois à l'entrée du virage 1, après son passage du pneu tendre au pneu medium ; et un tête-à-queue dans le dégagement du virage 12, sans conséquence rapportée, au même moment où Verstappen commettait une erreur similaire au même virage. The Race résume directement l'écart final d'Hamilton par « a couple of off-track moments » plutôt que par un déficit de rythme pur — cohérent avec l'analyse chiffrée ci-dessus, qui montre Hamilton plus rapide que Leclerc en rythme soutenu sur le relais propre. Aucun message radio transcrit ni compte-rendu d'embarqué dédié à Hamilton n'a pu être trouvé au-delà de ces comptes-rendus écrits et sourcés — signalé explicitement plutôt qu'une description d'embarqué inventée.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el3-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Classement complet EL3</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos.</th><th>Pilote</th><th>Écurie</th><th>Temps / écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:34.041</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>+0,911s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>+0,974s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>+1,150s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>+1,157s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>+1,309s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>+1,361s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>+1,393s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>+1,402s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>+1,409s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>+1,452s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>+1,763s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>+1,945s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>+2,350s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>+2,405s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>+2,706s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>+2,897s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Camara</td><td>Haas F1 Team</td><td>+2,971s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>+3,091s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>+3,208s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>+3,640s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>+3,655s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el3-5">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en qualifications</h2>
    <p>Trois éléments chiffrés ressortent de cette seule séance sèche pour aborder les qualifications. D'abord, Mercedes occupe les deux premières places et affiche, au-delà du seul tour chronométré, le meilleur rythme soutenu de la grille — y compris sur pneu medium, plus dur que le tendre utilisé par la plupart des concurrents directs sur leur relais d'ouverture : un signal de forme qui dépasse la simple performance qualificative. Ensuite, McLaren, via Norris, conserve un rythme de relais long très solide (meilleur du groupe de tête, 97,356s de moyenne) malgré un tour de référence isolé plus discret (3e, à 0,974s) — l'écart entre performance sur tour unique et performance en conditions de course reste à surveiller sur un tracé où le dégagement thermique des pneus tendres neufs joue un rôle disproportionné sur un seul tour lancé. Enfin, chez Ferrari, l'écart interne Hamilton/Leclerc mérite d'être regardé de près en qualifications : Hamilton a tourné plus vite que son coéquipier en rythme soutenu sur leur relais commun (0,199s/tour), et son déficit sur le tour isolé en EL3 (1,393s contre 1,150s pour Leclerc) s'explique davantage par des erreurs de pilotage ponctuelles (deux blocages, un tête-à-queue) que par un déficit de voiture — rien n'indique donc que Leclerc dispose d'un avantage de machine sur Hamilton pour la séance décisive à venir.</p>
  </div>
</section>

<section class="block" id="sec-el3-6">
  <div class="prose">
    <h2 class="sectitle">Le contexte du week-end</h2>
    <p>Après deux séances perturbées par la météo, Las Vegas livre enfin une heure de référence sèche avant les qualifications du soir. Au championnat, Kimi Antonelli (390 pts) domine toujours devant Max Verstappen (279), George Russell (262), Lewis Hamilton (261, à seulement un point de Russell) et Charles Leclerc (249) — l'écart resserré entre Russell et Hamilton pour la 3e place du championnat donne un relief particulier à la comparaison interne Ferrari documentée ci-dessus, et à la forme actuelle de Mercedes sur ce tracé.</p>
  </div>
</section>

<section class="block" id="sec-el3-7">
  <details class="sources">
    <summary>Sources utilisées — EL3 Las Vegas (4 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), session_key=11415 : classement, relais pneus et tours détaillés (tables practice_stints et practice_laps), météo minute par minute. Primaire pour le classement (section 04), l'analyse de rythme chiffrée (section 02) et la comparaison Hamilton/Leclerc (section 03).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/fp3-russell-goes-fastest-from-antonelli-and-norris-during-final-practice-in-las-vegas.3qwe57vQf1Qjrm2tdp7Vfy" data-desc="Récit complet avec classement intégral, enquête Verstappen/Colapinto, incident Verstappen/Russell au virage 14 en fin de séance, citations radio. Lu intégralement via fetch-url.yml.">Formula1.com — Russell devance Antonelli et Norris</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.planetf1.com/news/2026-las-vegas-grand-prix-fp3-report" data-desc="Live-blog minute par minute le plus détaillé des quatre sources : double enquête Verstappen, citations radio complètes de Russell et Verstappen, et les trois incidents de pilotage d'Hamilton (blocages virages 14 et 1, tête-à-queue virage 12). Lu intégralement via fetch-url.yml.">PlanetF1 — récit minute par minute de l'EL3</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://www.pitdebrief.com/post/2026-f1-las-vegas-gp-fp3-results/" data-desc="Confirmation croisée indépendante de la chronologie complète de la séance et du classement. Lu intégralement via fetch-url.yml.">Pit Debrief — résultats EL3</a><span class="desc">Pit Debrief</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/russell-and-verstappen-make-contact-in-final-vegas-f1-practice/" data-desc="Classement complet des 22 pilotes identique chiffre pour chiffre à la base OpenF1 du projet, détail du temps théorique par secteurs, confirmation que la 8e place d'Hamilton s'explique par des sorties de piste plutôt qu'un déficit de rythme. Lu intégralement via fetch-url.yml.">The Race — Russell et Verstappen s'accrochent</a><span class="desc">The Race</span></li>
      </ul>
    </div>
  </details>
</section>
`;
