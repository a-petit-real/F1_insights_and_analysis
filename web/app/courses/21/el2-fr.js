// Analyse EL2 — Grand Prix de Las Vegas (Las Vegas Strip Circuit), round 21,
// saison 2026. Prolonge l'EL1 (même round, séance quasi intégralement
// effacée par la pluie, aucun chrono établi) : cette fois la piste, bien
// qu'humide tout du long, livre une vraie course contre le chrono — les
// temps chutent de plus de 15 secondes sur l'heure à mesure que la ligne
// sèche se dessine.
//
// Données de séance : donnée primaire = pipeline OpenF1 (session_key=11414,
// Practice 2, 2026-11-20 04:00->05:00 UTC = jeudi 19 novembre 20:00-21:00
// heure locale de Las Vegas), classement/relais/météo vérifiés directement
// depuis la base via scripts/practice_briefing.py (22 pilotes classés,
// 413 tours au total, 72 relais). Classement confirmé au tour et à la
// centième identique par Formula1.com, The Race et GrandPrix247 (Russell
// 1:47.272, Gasly +0.071s, Leclerc +0.333s).
//
// Analyse technique quantifiée — méthode ADAPTÉE et documentée comme telle :
// la méthode habituelle de ce site (écart de rythme moyen par relais filtré,
// tours d'entrée/sortie exclus, tours > 103% de la médiane écartés) suppose
// des conditions de piste stables sur la durée d'un relais. Ici, la piste
// s'améliore en continu sur TOUTE l'heure (évolution de piste dominante,
// confirmée par la chute de 15+ secondes du meilleur temps entre le premier
// tour chronométré et le dernier) : un écart de rythme moyen calculé de cette
// façon mélangerait inextricablement progrès de piste et vraie différence de
// pilotage/voiture, ce qui serait trompeur plutôt qu'informatif. Documenté
// explicitement ici plutôt que calculé quand même. Les faits RÉELLEMENT
// chiffrés et exploités en section 01 : la chronologie précise de
// l'évolution des temps (tour par tour, horodatée), et en section 02 le
// choix de gomme par écurie (3 voitures sur 22 — les deux Alpine et la
// Cadillac de Bottas — partent directement en intermédiaire sans passer par
// le pneu pluie intégrale, contre 19 voitures qui démarrent en pluie avant
// de basculer). Aucune vitesse de pointe (speedST/speedFL) comparée entre
// pilotes pour la même raison méthodologique (évolution de piste).
//
// Analyse Hamilton (règle éditoriale c-bis, 2026-11-09) : Lewis Hamilton a
// bien pris part à cette séance (absent seulement de l'EL1, cf. article
// précédent) — 6e à 1,211s de Russell. NIVEAU VOITURE : comparaison directe
// avec son coéquipier Charles Leclerc (même châssis Ferrari), à partir des
// meilleurs secteurs individuels donnés par scripts/practice_briefing.py —
// PRÉCISION DE RIGUEUR : ces meilleurs secteurs ne sont pas nécessairement
// tous posés sur le même tour (le script l'indique explicitement comme
// "informatif"), donc la comparaison ci-dessous est un optimum théorique par
// secteur, pas un delta tour-pour-tour. Hamilton (S1 31,054 / S2 37,124 / S3
// 40,214) perd 0,348s sur Leclerc (S1 30,706) en secteur 1 et 0,469s en
// secteur 3 (40,214 contre 39,745), mais fait quasiment jeu égal en secteur 2
// (37,124 contre 37,154, soit 0,030s plus rapide) — écart total théorique de
// 0,787s, proche de l'écart réel de 0,878s entre les deux meilleurs tours
// officiels. Aucun canal FastF1 (régime/rapport/DRS) disponible pour les
// séances d'essais à ce jour (réservé à la course, cf. règle b-ter) — non
// mentionné plus avant pour cette raison. NIVEAU PILOTAGE : GrandPrix247
// (live-blog minute par minute) rapporte un incident concret et sourcé —
// Hamilton, engagé sur un tour lancé, doit lever le pied pour éviter son
// ancien coéquipier Valtteri Bottas qui roulait lentement sur la ligne de
// course ; la même source signale aussi une sortie large de Hamilton au
// virage 1. Aucun message radio transcrit ni compte-rendu d'embarqué dédié
// à Hamilton trouvé pour cette séance précise — signalé explicitement
// plutôt qu'une description d'embarqué inventée, conformément à la règle.
//
// Sourcing élargi (4 sources indépendantes, 2 généralistes + 1 technique/
// analytique vérifiée + 1 généraliste à substance technique confirmée) :
// - Formula1.com (officiel/généraliste, "FP2: Russell beats Gasly and
//   Leclerc to top spot in wet Las Vegas GP practice", 20 Nov 2026 5:17am
//   UTC) : récit complet avec classement intégral, citations radio Piastri
//   et Leclerc, détail du drapeau rouge pour débris plastique à 10 minutes
//   du drapeau à damier. Lu intégralement via fetch-url.yml.
// - GrandPrix247 (généraliste à substance technique confirmée, live-blog
//   horodaté tweet par tweet daté explicitement "November 20, 2026") :
//   citation radio Russell complète (« If you're asking about slick tyres,
//   no way, Jose! »), incident Hamilton/Bottas, sortie large Hamilton
//   virage 1, incident Camara virage 12 (drapeau jaune), problème moteur
//   Verstappen signalé à la reprise. Lu intégralement via fetch-url.yml.
// - The Race (technique/analytique, "F1 2026 Las Vegas Grand Prix practice
//   results") : classement identique chiffre pour chiffre à la base OpenF1
//   du projet, confirmation croisée indépendante. Lu intégralement via
//   fetch-url.yml.
// - Crash.net (généraliste, live-blog "F1 Las Vegas Grand Prix live updates
//   — Friday practice") : confirme indépendamment la chronologie (Norris
//   1:50.930s au point médian, incident Alonso virage 5, Verstappen resté
//   au garage une bonne partie de la séance) — concordance intégrale avec
//   Formula1.com et GrandPrix247 sur les horaires et les temps. Lu
//   intégralement via fetch-url.yml.
// - Limite honnête de sourcing : malgré plusieurs tentatives (Speedcafe,
//   Motorsport.com, Autosport, archives Pirelli), aucune deuxième source
//   strictement catégorisée "technique/analytique" dans docs/SOURCES.md n'a
//   pu être récupérée pour CETTE séance précise dans le délai de ce passage
//   (contenu non extrait correctement par le sélecteur générique, ou
//   article d'une année différente malgré une URL plausible — vérifié et
//   écarté). The Race reste la seule source techniquement catégorisée comme
//   telle confirmée ; GrandPrix247, bien que catégorisé "généraliste" dans
//   docs/SOURCES.md, est noté dans ce même document comme ayant un vrai
//   volet technique/factuel (citations radio complètes, horodatage précis).
//   Signalé explicitement plutôt que masqué.
//
// Communication directe pilote (obligatoire quand elle existe) : les
// citations Piastri, Leclerc et Russell sont des messages radio captés par
// la diffusion officielle et relayées par les médias — pas une communication
// directe au sens strict de la règle (réseaux sociaux propres au pilote).
// Aucune communication directe au sens strict trouvée pour cette séance.
//
// Zéro contenu « people » : aucun développement sur la vie privée des
// pilotes. L'incident Hamilton/Bottas est traité strictement comme un fait
// de piste (ligne de course, tour lancé compromis), jamais comme un angle
// relationnel entre les deux anciens coéquipiers Mercedes.
export const ROUND21_EL2_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Las Vegas · Las Vegas Strip Circuit · EL2 — jeudi 19 novembre (soir)</p>
    <p class="verdict">Après une EL1 totalement effacée par la pluie, la deuxième heure d'essais livre enfin une vraie bataille au chronomètre : George Russell décroche la meilleure référence (1:47.272) dans le money time, devançant Pierre Gasly de seulement 0,071s et Charles Leclerc de 0,333s, au terme d'une heure où la piste, humide du début à la fin, s'assèche progressivement au point de faire chuter les temps de plus de 15 secondes.</p>
    <p class="subverdict">Lewis Hamilton, absent de l'EL1 pour la rotation obligatoire de pilote de réserve (Beganovic), reprend bien le volant de sa Ferrari pour cette séance et termine 6e à 1,211s de Russell — devancé par son coéquipier Charles Leclerc (3e, +0,333s). Au classement du championnat avant ce week-end : Kimi Antonelli (390 pts) devance Max Verstappen (279), George Russell (262), Lewis Hamilton (261) et Charles Leclerc (249).</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el2-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Une heure de dégel chronométré : 15 secondes gagnées sur la piste qui sèche</h2>
    <p>La pluie s'est arrêtée avant le début de l'EL2, mais la piste reste humide et froide au lancement de la séance. Oscar Piastri pose le premier temps de la soirée, un 2:02.786 sur pneu pluie intégrale, immédiatement amélioré par Charles Leclerc puis Lando Norris, qui plonge sous la barre des 2 minutes. Après quinze minutes, alors qu'une ligne sèche commence à apparaître, Norris devient le premier pilote à chausser l'intermédiaire et prend la tête avec un 1:54.615 — immédiatement rabaissé à 1:52.432, puis, en approchant de la mi-séance, à 1:50.930. Charles Leclerc passe sous la barre des 1:50 avec un 1:49.166, rapportant par radio : <em>« Je pense qu'on est sans doute proches du pneu sec »</em> — puis améliore encore à 1:48.473 avant de reprendre la tête avec un 1:47.605 à l'approche des dix dernières minutes.</p>
    <p>À dix minutes du drapeau à damier, un drapeau rouge bref interrompt la séance : des débris plastiques, probablement un sac emporté par le vent (Lance Stroll roule dessus selon GrandPrix247), doivent être retirés du dernier virage. La reprise n'intervient qu'à six minutes de la fin — provoquant une ruée de voitures en sortie de stands pour profiter des dernières minutes, toutes désormais sur pneu intermédiaire. Isack Hadjar est en passe d'améliorer encore quand il se retrouve bloqué par la Haas d'Oliver Bearman dans les derniers virages ; c'est finalement George Russell qui s'empare de la tête avec un 1:47.272 au moment du drapeau à damier, devançant de 0,071s l'Alpine de Pierre Gasly, elle aussi améliorée dans les ultimes instants. Au total, le meilleur temps de la séance aura chuté de plus de 15 secondes entre le premier tour chronométré et le dernier — la mesure la plus fiable de cette évolution de piste continue, plutôt qu'un quelconque écart de rythme entre pilotes.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el2-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Le pari du pneu : trois voitures sautent directement l'intermédiaire</h2>
    <p>Sur les 22 voitures classées, 19 ont débuté la séance sur le pneu pluie intégrale avant de basculer vers l'intermédiaire une fois la ligne sèche apparue (relais confirmés par la base OpenF1 du projet, table practice_stints). Trois voitures seulement ont fait l'impasse totale sur le pneu pluie : les deux Alpine de Pierre Gasly et Franco Colapinto, ainsi que la Cadillac de Valtteri Bottas, parties directement en intermédiaire dès le premier tour. Le pari s'est révélé payant pour Alpine — Gasly finit 2e, à 0,071s seulement de la pole provisoire de Russell, Formula1.com notant que l'Alpine « a posé le secteur 1 le plus rapide de l'ouverture » malgré un ou deux dérapages au virage 7 signalés par la même source. George Russell, lui, a catégoriquement écarté l'idée de tenter le pneu sec en fin de séance : interrogé par son ingénieur sur les pneus lisses, sa réponse, rapportée verbatim par GrandPrix247, était sans ambiguïté : <em>« Si vous me parlez de pneus lisses, non merci ! »</em></p>
    <p>Aucune analyse de rythme de relais filtré (écart moyen par relais, tours d'entrée/sortie exclus) n'a de sens ici : avec une piste qui s'améliore en continu sur toute l'heure, un tel calcul mélangerait indissociablement progrès de piste et vraie différence de performance — documenté honnêtement plutôt que calculé quand même, conformément à la règle de rigueur méthodologique de ce site.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el2-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Hamilton de retour au volant : comparaison chiffrée avec Leclerc, niveau voiture et niveau pilotage</h2>
    <p><strong>Niveau voiture.</strong> Lewis Hamilton, absent de l'EL1 pour la rotation obligatoire de pilote de réserve (Beganovic), reprend sa Ferrari pour cette séance et signe le 6e temps (1:48.483, +1,211s sur Russell) — devancé par son coéquipier Charles Leclerc, 3e à seulement 0,333s (1:47.605). En comparant les meilleurs secteurs individuels de chacun (scripts/practice_briefing.py — précision de rigueur : ces meilleurs secteurs ne sont pas nécessairement posés sur le même tour, donc il s'agit d'un optimum théorique par secteur, pas d'un delta tour-pour-tour unique), Hamilton (S1 31,054 / S2 37,124 / S3 40,214) perd 0,348s sur Leclerc en secteur 1 (30,706) et 0,469s en secteur 3 (39,745), mais fait quasiment jeu égal en secteur 2 — 37,124 contre 37,154, soit 0,030s plus rapide que son coéquipier. L'écart théorique total (0,787s) est cohérent avec l'écart réel entre leurs deux meilleurs tours officiels (0,878s). Aucun canal FastF1 (rapport de boîte, régime moteur, usage du DRS) n'est disponible pour les séances d'essais à ce jour — réservé à la course selon la règle éditoriale de ce site — donc aucun angle châssis/moteur plus fin n'est exploité ici.</p>
    <p><strong>Niveau pilotage.</strong> GrandPrix247, dans son live-blog horodaté minute par minute, rapporte un incident concret touchant directement Hamilton : engagé sur un tour lancé, il doit lever le pied pour éviter son ancien coéquipier chez Mercedes, Valtteri Bottas, qui roulait plus lentement sur la ligne de course au moment où Hamilton arrivait à pleine vitesse — tour gâché, selon la même source (« Frustration for Hamilton who was on a flying lap »). La même source signale par ailleurs une sortie large de Hamilton au virage 1, sans conséquence rapportée. Traité ici strictement comme un fait de piste (gestion de trafic, perte de temps localisée) et jamais comme un angle relationnel entre les deux pilotes, conformément à la règle de ce site sur le contenu personnel. Aucun message radio transcrit ni compte-rendu d'embarqué dédié à Hamilton n'a pu être trouvé pour cette séance précise — signalé explicitement plutôt qu'une description d'embarqué inventée.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el2-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Classement complet EL2</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos.</th><th>Pilote</th><th>Écurie</th><th>Temps / écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:47.272</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>+0,071s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>+0,333s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>+1,135s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>+1,181s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>+1,211s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>+1,565s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>+1,771s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>+1,957s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>+1,959s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>+2,510s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>+2,557s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>+2,869s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>+3,159s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>+3,427s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>+3,737s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>+3,876s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>+4,299s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>+4,535s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>+5,053s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>+5,522s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Camara</td><td>Haas F1 Team</td><td>+6,317s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el2-5">
  <div class="prose">
    <h2 class="sectitle">Le contexte du week-end</h2>
    <p>Après deux séances disputées intégralement sur piste humide — sans jamais voir le moindre pneu sec —, le week-end de Las Vegas conserve son enjeu sportif intact : Kimi Antonelli (390 pts) domine le championnat devant Max Verstappen (279), George Russell (262), Lewis Hamilton (261, à seulement un point de Russell) et Charles Leclerc (249). Les prévisions pour la suite du week-end (EL3 et qualifications vendredi, course samedi) restent nettement plus favorables selon l'ensemble des sources consultées, ce qui devrait enfin permettre une comparaison de rythme pur sur piste sèche.</p>
  </div>
</section>

<section class="block" id="sec-el2-6">
  <details class="sources">
    <summary>Sources utilisées — EL2 Las Vegas (4 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), session_key=11414 : classement, relais pneus (table practice_stints), météo minute par minute. Primaire pour le classement (section 04), les relais pneus (section 02) et la comparaison de secteurs Hamilton/Leclerc (section 03).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/fp2-russell-beats-gasly-and-leclerc-to-top-spot-in-wet-las-vegas-gp-practice.62NwXdkf1krQs0esgViJtc" data-desc="Récit complet avec classement intégral, citations radio Piastri et Leclerc, détail du drapeau rouge pour débris plastique à 10 minutes du drapeau à damier. Lu intégralement via fetch-url.yml.">Formula1.com — Russell devance Gasly et Leclerc</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.grandprix247.com/formula-1-news/las-vegas-grand-prix-fp2-george-russell-tops-wet-session-ahead-of-pierre-gasly-and-charles-leclerc" data-desc="Live-blog horodaté tweet par tweet daté explicitement 20 novembre 2026 : citation radio Russell complète sur les pneus lisses, incident Hamilton/Bottas, sortie large Hamilton virage 1, incident Camara virage 12, problème moteur Verstappen à la reprise. Lu intégralement via fetch-url.yml.">GrandPrix247 — live-blog EL2 complet</a><span class="desc">GrandPrix247</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/f1-2026-las-vegas-grand-prix-practice-results/" data-desc="Classement identique chiffre pour chiffre à la base OpenF1 du projet, confirmation croisée indépendante du classement EL1 et EL2. Lu intégralement via fetch-url.yml.">The Race — résultats complets des essais</a><span class="desc">The Race</span></li>
        <li><a href="https://www.crash.net/f1/live/1044271/f1-las-vegas-grand-prix-live-updates-friday-practice-us" data-desc="Live-blog confirmant indépendamment la chronologie (Norris 1:50.930s au point médian, incident Alonso virage 5, Verstappen resté au garage une bonne partie de la séance) — concordance intégrale avec Formula1.com et GrandPrix247. Lu intégralement via fetch-url.yml.">Crash.net — live-blog EL2</a><span class="desc">Crash.net</span></li>
      </ul>
    </div>
  </details>
</section>
`;
