// Analyse EL2 — Grand Prix du Qatar (Losail International Circuit), round 22,
// saison 2026. Suite directe de l'EL1 déjà publiée pour ce round
// (web/app/courses/22/el1-fr.js, commit 12b5256).
//
// Données de séance : donnée primaire = pipeline OpenF1 (session_key=11422,
// Practice 2, 2026-11-27 17:00->18:00 UTC = vendredi 20:00-21:00 heure locale
// de Doha — séance prolongée de 13 minutes selon The Race, cf. ci-dessous),
// classement/secteurs/relais/météo vérifiés directement depuis la base via
// scripts/practice_briefing.py (22 pilotes classés). Classement recoupé et
// concordant AU CENTIÈME avec la page officielle Formula1.com
// (formula1.com/en/results/2026/races/1301/qatar/practice/2, HTML brut, lu
// intégralement via fetch-url.yml : 1:23.077 Antonelli, +0.127s Russell,
// +0.445s Norris... identique pilote par pilote).
//
// Analyse technique quantifiée (scripts/practice_briefing_laptimes_by_car.py,
// 7 voitures : ANT/RUS/NOR/PIA/VER/LEC/HAM). Comparaison bâtie sur le relais
// MEDIUM long à régime d'essence comparable (âge pneu 7-10 tours au départ du
// relais, 14-15 tours parcourus) commun à quatre voitures : Antonelli (tours
// 13-27, 11/14 tours gardés après filtre à 103% de la médiane, moyenne
// 1:28,269), Verstappen (tours 12-26, 13/14 gardés, moyenne 1:28,949),
// Russell (tours 15-29, 13/14 gardés, moyenne 1:29,013), Norris (tours 12-25,
// 12/13 gardés, moyenne 1:29,304). Piastri n'a pas enchaîné de relais MEDIUM
// comparable en fin de séance (son relais long est en SOFT) — absence de
// signal documentée plutôt que masquée. Pour Leclerc et Hamilton, la
// comparaison directe est rendue plus incertaine par les deux drapeaux rouges
// de la séance (voir section 01) qui tombent précisément pendant leurs
// propres relais MEDIUM visés : Leclerc (tours 15-22, seulement 2 tours
// propres avant que la fin de séance ne vire au chaotique — rendement obtenu
// en excluant manuellement les tours >100s consécutifs au-delà du tour 17,
// moyenne 1:29,702 sur cet échantillon très court) et Hamilton (tours 20-24,
// 3 tours propres avant l'arrêt moteur qui a mis fin à sa séance — moyenne
// 1:28,857). Vitesses de pointe (speedST, valeur maximale brute par voiture
// sur l'ensemble de la séance) : Piastri 349, Russell 348, Norris 348,
// Antonelli 338, Verstappen 332, Hamilton 327, Leclerc 320 km/h.
//
// Aucun canal FastF1 (gaz/frein/rapport/régime/DRS) pour cet article : la
// règle éditoriale (point b-ter) les réserve à la course, pas aux EL/Qualifs
// — non applicable ici, pas une absence de données à signaler comme un
// manque.
//
// Sourcing élargi (minimum 4 sources indépendantes, 2 généralistes + 2
// technique/analytique, + institutionnel + communication directe pilote,
// conformément à la règle éditoriale de docs/OPERATIONS.md) :
// - Formula1.com (officiel/institutionnel) : page de résultats EL2 complète,
//   lue en HTML brut via fetch-url.yml, concordante au centième avec la base
//   pour les 22 pilotes.
// - The Race (technique/analytique n°1) : article dédié « Antonelli tops
//   Qatar FP2 after multiple red flag delays » (Samarth Kanal, 27 nov. 2026,
//   slug retrouvé via la page d'accueil the-race.com/formula-1/ en --raw),
//   lu intégralement via fetch-url.yml — source principale du récit des deux
//   drapeaux rouges, de l'incident Hamilton/Verstappen et de l'arrêt moteur
//   de fin de séance (voir sections 01 et 03).
// - Crash.net (technique/analytique n°2, confirmé comme source fiable pour
//   ce championnat dans docs/SOURCES.md) : page /f1/news lue intégralement
//   via fetch-url.yml, datée du jour même (articles à 8h/10h/11h avant
//   récupération) — confirme le contexte Ferrari (Hamilton/Leclerc, « règles
//   d'engagement ») et la session FIA pilotes-commissaires sous forme de
//   quiz Kahoot. Un titre volontairement écarté sur cette même page
//   (acquisition immobilière personnelle d'un dirigeant d'écurie) relève de
//   la vie privée et n'a pas été exploité, conformément à la règle absolue
//   « zéro contenu people » de ce site.
// - PlanetF1 (généraliste n°1) : page /news lue intégralement via
//   fetch-url.yml, datée du jour même (27 nov. 2026) — confirme le
//   prolongement du différend Russell/Verstappen de Las Vegas et la mesure
//   « sans précédent » prise par la FIA avant ce Grand Prix (réunion
//   pilotes-commissaires, cf. Crash.net).
// - GPblog (généraliste n°2) : page /en/breaking-news lue intégralement via
//   fetch-url.yml — confirme indépendamment la poursuite du différend
//   Russell/Verstappen (« Russell names two F1 journalists... », « Lawson
//   points to deeper history behind Verstappen and Russell feud »).
// - news.verstappen.com (communication directe pilote, site officiel du
//   pilote) : page d'accueil lue via fetch-url.yml — confirme la P5 de
//   Verstappen et cite le titre direct « Max P5 after Friday practice in
//   Qatar: 'A bit of a difficult day' », publié 2h avant la récupération.
//   Tentative sur un ID d'article deviné (6029) écartée après vérification du
//   contenu réellement fetché : daté du 28 novembre 2025 (vraie qualification
//   sprint 2025, grille d'écurie incompatible) — seul le titre affiché sur la
//   page d'accueil a donc été utilisé, pas le corps d'un article.
//
// Analyse Hamilton (règle éditoriale c-bis, 2026-11-09) : Lewis Hamilton a
// pris part à cette séance (18e, 1:24,216 — seulement 20 tours chronométrés
// sur 24 selon la base, séance écourtée). NIVEAU VOITURE : panne moteur avec
// perte de puissance signalée par The Race à quatre minutes de la fin de la
// séance, ayant déclenché une voiture de sécurité virtuelle et mis fin à sa
// séance prématurément — un problème de fiabilité voiture, pas de pilotage.
// Sur le plan du rythme, la comparaison directe avec Leclerc reste fragile
// (deux échantillons courts de part et d'autre, perturbés par les deux
// drapeaux rouges de la séance — voir section 02), mais dans la direction
// inverse de l'EL1 : Hamilton (1:28,857 sur 3 tours propres) devance Leclerc
// (1:29,702 sur seulement 2 tours propres) sur ce relevé précis, signalé
// comme un signal faible plutôt que comme une inversion de performance
// confirmée. Vitesse de pointe : Hamilton toujours supérieure à Leclerc (327
// contre 320 km/h), comme en EL1, mais avec un écart réduit (7 km/h contre 20
// km/h). Aucun canal FastF1 pour cette séance (non applicable aux EL). NIVEAU
// PILOTAGE : The Race rapporte qu'Hamilton a coupé la route de Verstappen en
// fin de séance, les commissaires ayant jugé qu'aucune enquête complémentaire
// n'était nécessaire — seul fait de pilotage objectivement rapporté pour
// cette séance, sourcé et avec son verdict. Aucun message radio détaillé ni
// compte-rendu d'embarqué n'a par ailleurs été trouvé pour Hamilton dans les
// sources consultées — signalé explicitement plutôt qu'improvisé. Zéro
// contenu « people » : les échanges Hamilton/Leclerc évoqués par Crash.net
// concernant les « règles d'engagement » Ferrari après Las Vegas (round 21)
// sont rapportés au seul niveau sportif pertinent.
//
// Zéro contenu « people » : aucune information sur la vie privée des pilotes
// ou du personnel d'écurie n'apparaît dans cet article (un titre Crash.net
// sur l'achat immobilier personnel d'un dirigeant d'écurie a été identifié et
// volontairement écarté), conformément à la règle éditoriale absolue de ce
// site.
export const ROUND22_EL2_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix du Qatar · Losail International Circuit · EL2 — vendredi 27 novembre</p>
    <p class="verdict">Kimi Antonelli devance à nouveau les deux Mercedes (1:23,077, +0,127s pour Russell) dans une EL2 interrompue à deux reprises par des drapeaux rouges — le premier provoqué par un tête-à-queue de Charles Leclerc lui-même, le second par Pierre Gasly embourbé dans le gravier — et prolongée de 13 minutes. Lewis Hamilton voit sa propre séance s'arrêter prématurément quatre minutes avant la fin : sa Ferrari perd toute sa puissance, déclenchant une voiture de sécurité virtuelle.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">1:23,077</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,127s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+0,445s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">+0,472s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,499s</span></div>
    </div>
    <p class="subverdict">Même ordre de tête qu'en EL1 (Antonelli-Russell-Norris-Piastri-Verstappen dans un mouchoir de 0,5s), mais une séance bien plus mouvementée : deux arrêts complets de piste, une sortie de piste signalée pour Hamilton face à Verstappen sans suite des commissaires, et une panne moteur qui a privé Hamilton des dix dernières minutes de roulage. En toile de fond, la FIA a organisé cette semaine sa réunion annuelle pilotes-commissaires sous forme inhabituelle (un quiz Kahoot, selon Crash.net), tandis que le différend Russell/Verstappen né à Las Vegas se poursuit publiquement.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el2-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Deux drapeaux rouges et une séance prolongée de 13 minutes</h2>
    <p>Kimi Antonelli établit son temps de référence (1:23,077) sur pneu MEDIUM avant qu'un premier drapeau rouge ne soit déployé en milieu de séance — The Race rapporte qu'il a été provoqué par un tête-à-queue de Charles Leclerc lui-même, ayant répandu gravier et débris sur la piste. Peu après la reprise, Pierre Gasly (Alpine) s'embourbe à son tour dans le gravier, provoquant un second arrêt complet. En fin de séance, celle-ci est prolongée de 13 minutes pour compenser le temps perdu. George Russell (+0,127s) ne parvient pas à améliorer son temps sur pneu tendre, les deux Mercedes ayant été interrompues par les arrêts de piste au moment-clé ; Antonelli avait toutefois déjà signé le secteur 1 le plus rapide sur gomme tendre avant le second drapeau rouge. Les deux McLaren (Norris +0,445s, Piastri +0,472s) et les deux Red Bull/Racing Bulls (Verstappen +0,499s, Hadjar +0,506s) suivent dans un mouchoir de 0,06s.</p>
    <p>Charles Leclerc (7<sup>e</sup>, +1,022s) et Lewis Hamilton (8<sup>e</sup>, +1,139s) referment le top 8, séparés de 0,117s — un écart comparable à celui déjà observé en EL1 (0,102s). The Race précise par ailleurs qu'Hamilton a coupé la route de Verstappen tard dans la séance, les commissaires ayant jugé qu'aucune enquête complémentaire n'était nécessaire. Quatre minutes avant le drapeau à damier, la Ferrari d'Hamilton perd toute sa puissance et s'arrête hors piste, déclenchant une voiture de sécurité virtuelle et mettant fin à sa séance avec seulement 20 tours chronométrés sur 24 inscrits à la base.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el2-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Rythme de relais : un groupe de tête resserré, deux échantillons Ferrari fragilisés par les drapeaux rouges</h2>
    <p>Requête dédiée sur les tours bruts de sept voitures (scripts/practice_briefing_laptimes_by_car.py). Comparaison bâtie sur le relais MEDIUM long à régime d'essence comparable (âge pneu 7 à 10 tours au départ, 14-15 tours parcourus), filtre standard appliqué (tour de sortie de stand exclu, tours supérieurs à 103% de la médiane du relais écartés) :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Relais (âge pneu)</th><th>Tours (gardés/dispo.)</th><th>Moyenne relais</th><th>V. pointe (speedST)</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>MEDIUM (âge 10, 15 tours)</td><td>11/14</td><td>1:28,269</td><td>338 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>MEDIUM (âge 7, 15 tours)</td><td>13/14</td><td>1:28,949</td><td>332 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>MEDIUM (âge 10, 15 tours)</td><td>13/14</td><td>1:29,013</td><td>348 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>MEDIUM (âge 7, 14 tours)</td><td>12/13</td><td>1:29,304</td><td>348 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>MEDIUM (âge 10, 5 tours — séance écourtée)</td><td>3/5 — échantillon très court</td><td>1:28,857</td><td>327 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>MEDIUM (âge 5, 8 tours — drapeaux rouges)</td><td>2/8 — échantillon très court</td><td>1:29,702</td><td>320 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>— pas de relais MEDIUM long comparable —</td><td>—</td><td>non calculable</td><td>349 km/h</td></tr>
      </tbody>
    </table>
  </div>
  <div class="prose">
    <p>Quatre voitures disposent d'un relais directement comparable (âge pneu et longueur similaires) : Antonelli, Verstappen, Russell et Norris tournent dans un mouchoir de 1,04 seconde (1:28,269 à 1:29,304), un groupe resserré cohérent avec l'écart du tour sec. Pour les deux Ferrari, la comparaison est nettement plus fragile : les deux drapeaux rouges de la séance tombent précisément au milieu de leurs relais MEDIUM visés, ne laissant que 2 tours propres pour Leclerc et 3 pour Hamilton après exclusion des tours de transition anormaux. Sur cet échantillon réduit, Hamilton (1:28,857) devance Leclerc (1:29,702) — l'inverse de la situation observée en EL1, où Leclerc avait signé un rythme de relais nettement supérieur. Compte tenu de la taille des deux échantillons, ce résultat est rapporté comme un signal faible et non comme une inversion de performance confirmée.</p>
    <div class="callout">Réserve méthodologique explicite : les échantillons Hamilton (3 tours) et Leclerc (2 tours) sont trop courts pour trancher un écart de performance réel entre les deux Ferrari sur cette séance — la cause immédiate de leur brièveté est connue et sourcée (les deux drapeaux rouges, plus l'arrêt moteur d'Hamilton), ce qui distingue ce cas d'un simple manque de données inexpliqué.</div>
  </div>
</section>

<section class="block" data-num="03" id="sec-el2-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Hamilton : une panne moteur au niveau voiture, un seul fait de pilotage objectif pour cette séance</h2>
    <p>Lewis Hamilton a pris part à cette séance et termine 18<sup>e</sup> (+1,139s sur le tour sec, 20 tours chronométrés sur 24 selon la base). NIVEAU VOITURE : le fait marquant de sa séance est mécanique, pas un écart de rythme — The Race rapporte que sa Ferrari a perdu toute sa puissance à quatre minutes du drapeau à damier, l'obligeant à s'arrêter hors piste et déclenchant une voiture de sécurité virtuelle, ce qui a mis fin à sa séance prématurément. Sur le plan du rythme pur, la comparaison avec Leclerc reste fragile des deux côtés (voir section 02) : sur les tours propres disponibles, Hamilton (1:28,857, 3 tours) devance Leclerc (1:29,702, 2 tours) — l'inverse de l'EL1, mais sur un échantillon trop réduit pour conclure à une vraie inversion de performance plutôt qu'à un artefact des deux drapeaux rouges qui ont perturbé les deux relais. Côté vitesse de pointe, Hamilton reste supérieur à Leclerc (327 contre 320 km/h), comme en EL1, mais avec un écart réduit de moitié (7 km/h contre 20 km/h). Aucun canal FastF1 n'est de toute façon disponible pour cette analyse, la règle éditoriale de ce site les réservant à la course.</p>
    <p>NIVEAU PILOTAGE : le seul fait de pilotage objectivement rapporté pour cette séance est sourcé par The Race : Hamilton a coupé la route de Max Verstappen tard dans la séance, les commissaires ayant examiné l'incident et jugé qu'aucune enquête complémentaire n'était nécessaire — un verdict sourcé plutôt qu'une description d'embarqué inventée. Aucun message radio détaillé ni compte-rendu d'embarqué spécifique à cette séance n'a par ailleurs été trouvé pour Hamilton dans l'ensemble des sources consultées — signalé explicitement plutôt qu'improvisé. Crash.net évoque cette semaine les « règles d'engagement » que Ferrari a clarifiées avec Hamilton après leur accrochage de Las Vegas (round 21) ; ce point est rapporté ici au seul niveau sportif pertinent (gestion d'équipe), sans développement du contenu personnel sous-jacent, conformément à la règle éditoriale absolue « zéro contenu people » de ce site.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el2-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Classement complet EL2</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:23,077</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:23,204</td><td>+0,127s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:23,522</td><td>+0,445s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:23,549</td><td>+0,472s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:23,576</td><td>+0,499s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:23,583</td><td>+0,506s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:24,099</td><td>+1,022s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:24,216</td><td>+1,139s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:24,425</td><td>+1,348s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:24,547</td><td>+1,470s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:24,614</td><td>+1,537s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:24,764</td><td>+1,687s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>1:24,871</td><td>+1,794s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:25,276</td><td>+2,199s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:25,733</td><td>+2,656s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:25,839</td><td>+2,762s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Camara</td><td>Haas F1 Team</td><td>1:25,962</td><td>+2,885s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:25,996</td><td>+2,919s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:26,046</td><td>+2,969s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:26,648</td><td>+3,571s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:27,394</td><td>+4,317s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>1:27,497</td><td>+4,434s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el2-5">
  <div class="prose">
    <h2 class="sectitle">Le contexte du week-end</h2>
    <p>Météo sèche sur toute la séance (aucune pluie relevée), température d'air en léger recul de 24,8°C à 23,7°C, température de piste suivant la même tendance autour de 27-28°C sous les projecteurs de Lusail. Cette semaine, la FIA a tenu sa réunion annuelle pilotes-commissaires sous une forme inhabituelle — un quiz Kahoot sur de vraies décisions de commissaires, selon Crash.net — tandis que le différend Russell/Verstappen né à Las Vegas (round 21) se poursuit publiquement : Russell a reproché à deux journalistes télévisés de « déformer la vérité » sur ses propos, et Verstappen a répondu publiquement aux critiques de Russell, deux échanges confirmés indépendamment par PlanetF1 et GPblog. Côté Ferrari, Crash.net rapporte qu'Hamilton a clarifié les « règles d'engagement » de l'écurie après son accrochage avec Leclerc à Las Vegas — un point de gestion d'équipe plutôt qu'un fait de piste de cette séance précise.</p>
  </div>
</section>

<section class="block" id="sec-el2-6">
  <details class="sources">
    <summary>Sources utilisées — EL2 Qatar (5 liens externes + base de données technique)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), session_key=11422 : classement, secteurs, relais, météo. Primaire.</span></li>
        <li><span class="desc">The Pit Wall — requête dédiée tours bruts par voiture (scripts/practice_briefing_laptimes_by_car.py, 7 voitures ANT/RUS/NOR/PIA/VER/LEC/HAM) : base des moyennes de relais et vitesses de pointe de la section 02.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1301/qatar/practice/2" data-desc="Classement officiel complet, concordant au centième avec la base pour les 22 pilotes. Lu en HTML brut via fetch-url.yml.">Formula1.com — résultats officiels EL2</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://news.verstappen.com/en" data-desc="Communication directe pilote : titre « Max P5 after Friday practice in Qatar: 'A bit of a difficult day' », publié 2h avant récupération, concernant précisément cette séance. Page d'accueil lue via fetch-url.yml.">Verstappen.com — actualités du pilote</a><span class="desc">Verstappen.com</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.planetf1.com/news" data-desc="Page d'actualités lue intégralement via fetch-url.yml, datée du 27 novembre 2026 — confirme le prolongement du différend Russell/Verstappen et la mesure de la FIA avant ce Grand Prix.">PlanetF1 — actualités Qatar GP</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://www.gpblog.com/en/breaking-news" data-desc="Page lue intégralement via fetch-url.yml — confirme indépendamment la poursuite du différend Russell/Verstappen.">GPblog — actualités de dernière minute</a><span class="desc">GPblog</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/antonelli-tops-qatar-fp2-after-multiple-red-flag-delays-f1/" data-desc="Article dédié à cette séance (Samarth Kanal, 27 nov. 2026), lu intégralement via fetch-url.yml — source principale du récit des deux drapeaux rouges, de l'incident Hamilton/Verstappen et de l'arrêt moteur de fin de séance.">The Race — Antonelli tops Qatar FP2 after multiple red flag delays</a><span class="desc">The Race</span></li>
        <li><a href="https://www.crash.net/f1/news" data-desc="Page d'actualités lue intégralement via fetch-url.yml, datée du jour même — confirme le contexte Ferrari (règles d'engagement Hamilton/Leclerc) et la réunion FIA pilotes-commissaires. Un titre sur la vie privée d'un dirigeant d'écurie identifié sur cette même page a été volontairement écarté (règle zéro contenu people).">Crash.net — actualités F1</a><span class="desc">Crash.net</span></li>
      </ul>
    </div>
  </details>
</section>
`;
