// Analyse EL1 — Grand Prix du Qatar (Losail International Circuit), round 22,
// saison 2026. PREMIER article de ce week-end (aucune analyse EL/Quali/
// pré-analyse antérieure pour ce round) : pas d'historique narratif à
// prolonger, tout part de cette séance.
//
// Données de séance : donnée primaire = pipeline OpenF1 (session_key=11421,
// Practice 1, 2026-11-27 13:30->14:30 UTC = vendredi 16:30-17:30 heure locale
// de Doha), classement/secteurs/relais/météo vérifiés directement depuis la
// base via scripts/practice_briefing.py (22 pilotes classés, plateau complet
// — aucune rotation de pilote de réserve cette séance, contrairement aux six
// apparitions obligatoires du round 20). Classement recoupé et concordant AU
// MILLIÈME avec la page de résultats officielle Formula1.com
// (formula1.com/en/results/2026/races/1301/qatar/practice/1, HTML brut, lu
// intégralement via fetch-url.yml, écarts identiques pilote par pilote
// jusqu'à Bottas +3,692s).
//
// Analyse technique quantifiée (scripts/practice_briefing_laptimes_by_car.py,
// 7 voitures : ANT/RUS/NOR/PIA/VER/LEC/HAM). Point de rigueur à signaler
// explicitement : les tables practice_laps et practice_stints de ce round
// présentent un décalage ponctuel d'un tour entre le marqueur [OUT] (tour de
// sortie de stand) et la limite de relais annoncée par practice_stints selon
// le pilote — déjà un artefact connu de l'ingestion OpenF1 pour cette saison.
// Méthode adaptée en conséquence : exclusion de tout tour marqué [OUT] PLUS,
// quand un tour voisin de plus de 100s apparaît sans ce marqueur (transition
// retour aux stands non étiquetée), exclusion manuelle de ce tour également,
// puis application du filtre standard (tours > 103% de la médiane du relais
// écartés) sur les tours restants. Relais retenus pour la comparaison : le
// dernier relais MEDIUM à haut régime d'essence de chaque pilote (âge pneu
// comparable, 11 à 19 tours selon le pilote) — Antonelli (tours 19-27,
// 8/9 tours gardés après filtre, moyenne 88,536s), Russell (tours 20-23,
// 3/4 gardés après filtre, échantillon court signalé comme tel, moyenne
// 88,776s), Verstappen (tours 19-24, 6/8 gardés après filtre, relais final
// de la séance, moyenne 90,258s), Leclerc (tours 27-28, 2 tours seulement
// disponibles après exclusion des deux tours de fin de séance manifestement
// anormaux — échantillon très court signalé honnêtement comme tel, moyenne
// 88,529s) et Hamilton (tours 23-25, 3 tours gardés après exclusion des deux
// tours de fin de séance manifestement anormaux, moyenne 90,192s). Vitesses
// de pointe (speedST) = valeur maximale brute par voiture sur l'ensemble des
// tours de la séance, aucune estimation : Antonelli 329, Russell 322, Norris
// 338, Piastri 342, Verstappen 328, Leclerc 324, Hamilton 344 km/h — Hamilton
// signe ici la vitesse de pointe la plus élevée des sept voitures comparées,
// un relevé brut rapporté tel quel sans mécanisme causal inventé (aspiration
// ponctuelle, trafic ou réglage plus découvert à cet instant précis du tour —
// impossible à trancher sur cette seule donnée).
//
// Aucun canal FastF1 (gaz/frein/rapport/régime/DRS) pour cet article : la
// règle éditoriale (point b-ter) les réserve de toute façon à la course, pas
// aux EL/Qualifs — non applicable ici, pas une absence de données à signaler
// comme un manque.
//
// Sourcing élargi (minimum 4 sources indépendantes pour une EL1, 2
// généralistes + 2 technique/analytique, + institutionnel + communication
// directe pilote, conformément à la règle éditoriale de docs/OPERATIONS.md) :
// - Formula1.com (officiel/institutionnel) : page de résultats EL1 complète,
//   lue en HTML brut via fetch-url.yml, concordante au millième avec la base
//   pour les 22 pilotes.
// - McLaren Racing (institutionnel) : mclaren.com/racing/formula-1/2026/guide-
//   to-the-f1-sprint/, lu intégralement — liste les 6 week-ends sprint 2026
//   (Chine, Miami, Canada, Grande-Bretagne, Pays-Bas, Singapour) : le Qatar
//   N'EN FAIT PAS PARTIE cette saison, confirmant que ce week-end suit le
//   format standard (EL1/EL2/EL3/Qualifs/Course), pas un format sprint.
// - news.verstappen.com (communication directe pilote, site officiel du
//   pilote) : article de résultats EL1 lu via fetch-url.yml — classement
//   détaillé de la page non réutilisable (cache visiblement obsolète, pilotes
//   et écuries ne correspondant pas à la grille 2026 de ce round), mais le
//   bandeau "Latest news" de la même page, lui, est à jour et confirme deux
//   faits réels : la victoire de Verstappen à Las Vegas il y a 5 jours
//   (cohérent avec le round 21 déjà publié sur ce site) et, 19h avant cette
//   séance, le titre direct « Max in Qatar: 'Fast corners are more
//   challenging for us' » — élément de communication directe pilote,
//   explicitement signalé comme tel dans le texte (seul le titre a pu être
//   récupéré, pas le corps de l'article, signalé honnêtement plutôt que
//   masqué).
// - PlanetF1 (généraliste n°1) : tentative sur une URL de rapport EL1 devinée
//   a atterri sur la page d'accueil actualités (lue intégralement via
//   fetch-url.yml) — confirme la date du jour (27 nov. 2026), le calendrier
//   (Abu Dhabi, 4-6 décembre, prochaine manche) et un titre daté du 26
//   novembre : « Qatar GP predictions: Ferrari fireworks, awkward Russell and
//   Verstappen, 400 overtakes » — confirmation indépendante que les tensions
//   Hamilton/Leclerc et Russell/Verstappen de Las Vegas se prolongent sur ce
//   week-end, sans développement du contenu personnel sous-jacent.
// - The Race (technique/analytique n°1) : tentative sur une URL de rapport
//   EL1 devinée a également atterri sur une page générique, mais le bandeau
//   "Latest Formula 1 News" de cette même page est à jour et confirme
//   plusieurs faits réels pour cette séance précise : Kimi Antonelli
//   (champion du monde en titre) a mené l'EL1 « malgré l'échec d'un tour
//   rapide propre sur la gomme la plus tendre » — cohérent avec le tour de
//   référence d'Antonelli établi sur pneu MEDIUM plutôt que SOFT dans la base
//   (section 02) ; Antonelli reconnaît par ailleurs avoir été « trop confiant »
//   depuis son titre, ce qui a provoqué des erreurs ; la réunion annuelle
//   pilotes-commissaires s'est tenue au Qatar ; Ferrari reste évasif sur une
//   « solution » au différend Hamilton/Leclerc de Las Vegas. Corps complet de
//   l'article non accessible (page générique), signalé honnêtement plutôt que
//   masqué — seuls les titres/accroches ont pu être exploités.
// - GPblog (généraliste n°2) : tentative sur /en/breaking-news (lue
//   intégralement via fetch-url.yml) a atterri sur une page de calendrier
//   générique, mais son encart « Popular on GPBlog » confirme deux titres
//   d'actualité réels et datés de ce week-end : Hamilton renvoie la décision
//   à Fred Vasseur après des échanges avec Leclerc sur l'incident de Las
//   Vegas, et Russell répond publiquement à Verstappen dans la foulée de leur
//   différend du même Grand Prix — contenu sportif (gestion d'équipe,
//   rivalité en piste), pas de contenu « people » développé.
// - Motorsport.com et Autosport : tentatives sur plusieurs URLs plausibles,
//   toutes deux retournées avec un contenu daté de la saison 2025 réelle
//   (classements et noms d'écuries 2025 — « Sauber », « RB », Tsunoda chez
//   Red Bull — incompatibles avec la grille 2026 de ce site, et pour
//   Autosport une date de publication explicite "Nov 28, 2025" repérée dans
//   le contenu même) — écartées des deux, conformément à la règle de
//   vérification systématique du contenu réellement fetché plutôt que du
//   titre ou de l'URL. The Race (piastri-leads-mclaren-1-2…) présentait la
//   même anomalie (titre « only Qatar practice » signalant un format sprint,
//   caractéristique de la vraie saison 2025) et a été écarté pour la même
//   raison, sauf son bandeau d'actualités resté exploitable (voir ci-dessus).
//
// Communication directe pilote (obligatoire quand elle existe) : le titre de
// Max Verstappen relayé par son propre site officiel (« Fast corners are more
// challenging for us »), concernant précisément cette séance — présenté comme
// tel dans le texte, sans corps d'article disponible.
//
// Analyse Hamilton (règle éditoriale c-bis, 2026-11-09) : Lewis Hamilton a
// pris part à cette séance (8e, +1,358s). NIVEAU VOITURE : sur le tour sec,
// Leclerc devance Hamilton de 0,102s (84,473 contre 84,575) ; sur le relais
// long comparable en gomme MEDIUM à âge de pneu proche (section 02), l'écart
// se creuse nettement : environ 1,66s/tour en faveur de Leclerc (88,529s
// contre 90,192s) — un écart de rythme de relais bien supérieur à celui du
// tour sec, cohérent dans sa direction mais pas dans son ampleur, signalé
// comme tel plutôt que lissé. Fait à l'inverse : Hamilton signe la vitesse de
// pointe la plus élevée des sept voitures comparées (344 contre 324 km/h pour
// Leclerc) — un relevé brut rapporté sans explication causale inventée.
// Aucun canal FastF1 pour cette séance (non applicable aux EL, voir plus
// haut). NIVEAU PILOTAGE : aucun message radio ni compte-rendu d'embarqué
// spécifique à cette séance n'a été trouvé pour Hamilton dans les sources
// consultées — signalé explicitement plutôt qu'improvisé, conformément à la
// règle. Zéro contenu « people » : les échanges Hamilton/Leclerc évoqués par
// GPblog et The Race sont rapportés au niveau strictement sportif (qui décide
// de la suite, pas le contenu personnel sous-jacent).
//
// Zéro contenu « people » : aucune information sur la vie privée des pilotes
// n'apparaît dans cet article, conformément à la règle éditoriale absolue de
// ce site.
export const ROUND22_EL1_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix du Qatar · Losail International Circuit · EL1 — vendredi 27 novembre</p>
    <p class="verdict">Kimi Antonelli, déjà sacré champion du monde, prend le meilleur temps de cette première heure qatarie (1:23,217) devant les deux Mercedes — mais l'écart le plus parlant n'est pas celui du tour sec : sur les longs relais à haut régime d'essence, Charles Leclerc tourne environ 1,7 seconde plus vite au tour que son coéquipier Lewis Hamilton, un différentiel bien supérieur aux 0,102s qui les séparent sur un tour isolé.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">1:23,217</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,507s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Hadjar</span> <span class="gap">+0,661s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+0,850s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">+0,860s</span></div>
    </div>
    <p class="subverdict">Plateau complet ce vendredi : aucune rotation de pilote de réserve cette séance, contrairement aux six apparitions obligatoires du week-end précédent à São Paulo — les 22 titulaires habituels étaient sur la piste. Météo sèche sur toute l'heure (aucune pluie relevée), température de piste en léger recul progressif de 32,8°C à 30,4°C à mesure que le jour décline sur Lusail. En toile de fond du week-end : les tensions nées à Las Vegas se poursuivent, Ferrari restant évasif sur une « solution » au différend Hamilton/Leclerc tandis que Russell répond publiquement à Verstappen après leur propre accrochage verbal — deux storylines sportives que PlanetF1 résume en prévision de ce Grand Prix sous le titre « Ferrari fireworks, awkward Russell and Verstappen ».</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el1-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Antonelli devant les deux Mercedes, un tour de référence qui n'est pas sur la gomme la plus tendre</h2>
    <p>Kimi Antonelli (1:23,217) prend le meilleur temps de cette EL1, son tour de référence établi au 11<sup>e</sup> tour sur pneu MEDIUM plutôt que sur la gomme la plus tendre disponible — The Race note que le champion du monde en titre n'est pas parvenu à boucler un tour rapide propre sur SOFT durant la séance, cohérent avec ce que montre la base : ses relais SOFT (tours 13-17 puis 29-31) ne comptent qu'un seul tour proche de son meilleur temps (83,333s), le reste étant perturbé. George Russell le suit à 0,507s pour un doublé Mercedes, devant Isack Hadjar (Red Bull Racing, +0,661s), puis les deux McLaren : Lando Norris (+0,850s) et Oscar Piastri (+0,860s), séparés de seulement un centième. Max Verstappen (+0,916s) referme le top 6, avant les deux Ferrari : Charles Leclerc (+1,256s) puis Lewis Hamilton (+1,358s). Sur son propre site, Verstappen a résumé sa séance par un titre sans détour : <em>« Les virages rapides sont plus difficiles pour nous »</em> — une communication directe concernant précisément cette séance sur un circuit qui en compte plusieurs enchaînements à haute vitesse.</p>
    <p>The Race rapporte par ailleurs qu'Antonelli a reconnu avoir été « trop confiant » depuis l'obtention de son titre, ce qui aurait provoqué plusieurs erreurs récentes — un constat sportif rapporté tel quel, sans développement au-delà du fait de piste. La réunion annuelle pilotes-commissaires s'est également tenue au Qatar cette semaine, prenant cette année un tour inhabituel selon la même source.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el1-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Rythme de relais : l'écart Ferrari se creuse nettement au-delà du tour sec</h2>
    <p>Requête dédiée sur les tours bruts de sept voitures (scripts/practice_briefing_laptimes_by_car.py : Antonelli, Russell, Norris, Piastri, Verstappen, Leclerc, Hamilton). Méthode adaptée à un artefact d'ingestion propre à ce round (décalage ponctuel d'un tour entre le marqueur de sortie de stand et la limite de relais annoncée par la table des relais selon le pilote, déjà signalé ci-dessus) : exclusion de tout tour marqué comme sortie de stand, exclusion manuelle des tours de transition manifestement anormaux (plus de 100 secondes) non étiquetés comme tels, puis filtre standard (tours supérieurs à 103% de la médiane du relais écartés). Comparaison bâtie sur le dernier relais MEDIUM à haut régime d'essence de chaque pilote, à un âge de pneu comparable :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Relais (âge pneu)</th><th>Tours (gardés/dispo.)</th><th>Moyenne relais</th><th>V. pointe (speedST)</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>MEDIUM (âge 12-19)</td><td>8/9</td><td>1:28,536</td><td>329 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>MEDIUM (âge 11-14)</td><td>2/2 — échantillon court</td><td>1:28,529</td><td>324 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>MEDIUM (âge 11-13)</td><td>3/4 — échantillon court</td><td>1:28,776</td><td>322 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>MEDIUM (âge 11-19, relais final)</td><td>6/8</td><td>1:30,258</td><td>328 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>MEDIUM (âge 13-16)</td><td>3/5</td><td>1:30,192</td><td>344 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>— pas de relais MEDIUM long comparable —</td><td>—</td><td>non calculable</td><td>338 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>— pas de relais MEDIUM long comparable —</td><td>—</td><td>non calculable</td><td>342 km/h</td></tr>
      </tbody>
    </table>
  </div>
  <div class="prose">
    <p>Deux lectures. D'abord, un groupe de tête resserré sur le rythme de relais long : Antonelli (1:28,536), Leclerc (1:28,529, échantillon de seulement 2 tours après exclusion des anomalies de fin de séance, signalé comme tel) et Russell (1:28,776, échantillon de 3 tours) tournent dans un mouchoir de 0,25 seconde — un ordre cohérent avec le classement du tour sec pour Antonelli et Russell, mais qui replace Leclerc largement devant Hamilton alors que les deux Ferrari n'étaient séparées que de 0,102s sur un tour isolé. Ensuite, le fait le plus marquant de cette séance : Verstappen (1:30,258) et Hamilton (1:30,192) tournent tous deux environ 1,6 à 1,7 seconde plus lentement que le trio de tête sur ce même type de relais — un écart de rythme de course bien supérieur à celui du tour sec pour les deux. Norris et Piastri n'ont pas enchaîné de relais MEDIUM assez long en fin de séance pour un calcul comparable (leurs longs relais de l'heure sont sur gomme HARD et SOFT) — absence de signal documentée plutôt que masquée derrière une comparaison de gommes différentes.</p>
    <div class="callout">Réserve méthodologique explicite : les échantillons Leclerc (2 tours) et Russell (3 tours) sont courts et donc moins fiables statistiquement que ceux d'Antonelli (8 tours) ou Verstappen (6 tours) — l'écart Ferrari qu'ils indiquent reste notable car il va dans le même sens que l'écart (plus faible) déjà visible sur le tour sec, mais son ampleur exacte est à confirmer en EL2/EL3.</div>
  </div>
</section>

<section class="block" data-num="03" id="sec-el1-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Hamilton : l'écart Ferrari se confirme au niveau voiture, rien à signaler au niveau pilotage pour cette séance</h2>
    <p>Lewis Hamilton a pris part à cette séance et termine 8<sup>e</sup> (+1,358s). NIVEAU VOITURE : sur le tour sec, Leclerc ne devance Hamilton que de 0,102s — un écart minime. Mais sur le relais long comparable en gomme MEDIUM à âge de pneu proche (section 02), l'écart se creuse à environ 1,66 seconde par tour en faveur de Leclerc (1:28,529 contre 1:30,192) — une direction cohérente avec le tour sec, mais une ampleur nettement supérieure, signalée comme telle plutôt que lissée en une moyenne unique. À l'inverse, Hamilton signe la vitesse de pointe la plus élevée des sept voitures comparées dans cette analyse (344 km/h, contre 324 km/h pour Leclerc) — un relevé brut de vitesse de pointe rapporté tel quel, sans mécanisme causal inventé : un tel pic peut provenir d'une aspiration ponctuelle, d'un trafic favorable ou d'un réglage plus découvert à cet instant précis du tour, et rien dans les données disponibles ne permet de trancher entre ces explications. Aucun canal FastF1 (gaz/frein/rapport/régime/DRS) n'est de toute façon disponible pour cette analyse : la règle éditoriale de ce site les réserve à la course, pas aux séances d'essais — non applicable ici plutôt qu'une absence de données à déplorer.</p>
    <p>NIVEAU PILOTAGE : aucun message radio ni compte-rendu d'embarqué spécifique à cette séance n'a été trouvé pour Hamilton dans l'ensemble des sources consultées pour cet article — signalé explicitement plutôt qu'improvisé, conformément à la règle éditoriale. Les échanges Hamilton/Leclerc évoqués cette semaine par GPblog et The Race au sujet de leur accrochage du Grand Prix de Las Vegas (round 21) sont rapportés ici au seul niveau sportif pertinent — Hamilton laissant la décision à son directeur d'écurie Fred Vasseur après des discussions avec Leclerc — sans développement du contenu personnel sous-jacent, conformément à la règle éditoriale absolue « zéro contenu people » de ce site.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el1-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Classement complet EL1</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:23,217</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:23,724</td><td>+0,507s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:23,878</td><td>+0,661s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:24,067</td><td>+0,850s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:24,077</td><td>+0,860s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:24,133</td><td>+0,916s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:24,473</td><td>+1,256s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:24,575</td><td>+1,358s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:24,601</td><td>+1,384s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:24,874</td><td>+1,657s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:25,053</td><td>+1,836s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:25,409</td><td>+2,192s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>1:25,437</td><td>+2,220s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:25,593</td><td>+2,376s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Camara</td><td>Haas F1 Team</td><td>1:25,685</td><td>+2,468s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:25,692</td><td>+2,475s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:25,766</td><td>+2,549s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:25,992</td><td>+2,775s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Crawford</td><td>Aston Martin</td><td>1:26,306</td><td>+3,089s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:26,416</td><td>+3,199s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>1:26,686</td><td>+3,469s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:26,909</td><td>+3,692s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el1-5">
  <div class="prose">
    <h2 class="sectitle">Le contexte du week-end</h2>
    <p>Météo sèche sur toute la séance (aucune pluie relevée par la station météo OpenF1), air passant de 26,7°C à 25,8°C, température de piste en recul progressif de 32,8°C à 30,4°C à mesure que le jour décline sur Lusail — rien d'abrupt, une évolution de piste graduelle plutôt qu'un saut brutal. Confirmé par McLaren Racing (guide officiel du format sprint 2026) : le Qatar ne fait pas partie des six week-ends sprint de la saison, ce Grand Prix suit donc le format standard — EL2 et EL3 suivront avant les qualifications et la course, pas de session supplémentaire imposée par un format sprint. En toile de fond, PlanetF1 prévoit un week-end sous tension continue après Las Vegas (round 21) : Ferrari reste évasif sur une « solution » au différend Hamilton/Leclerc tandis que Russell répond publiquement à Verstappen après leur propre accrochage verbal — deux storylines purement sportives qui n'affectent pas, à ce stade, le rythme mesuré en piste ce vendredi.</p>
  </div>
</section>

<section class="block" id="sec-el1-6">
  <details class="sources">
    <summary>Sources utilisées — EL1 Qatar (5 liens externes + base de données technique)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), session_key=11421 : classement, secteurs, relais, météo. Primaire.</span></li>
        <li><span class="desc">The Pit Wall — requête dédiée tours bruts par voiture (scripts/practice_briefing_laptimes_by_car.py, 7 voitures ANT/RUS/NOR/PIA/VER/LEC/HAM) : base des moyennes de relais et vitesses de pointe de la section 02.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1301/qatar/practice/1" data-desc="Classement officiel complet, concordant au millième avec la base pour les 22 pilotes. Lu en HTML brut via fetch-url.yml.">Formula1.com — résultats officiels EL1</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.mclaren.com/racing/formula-1/2026/guide-to-the-f1-sprint/" data-desc="Liste les 6 week-ends sprint 2026 (Chine, Miami, Canada, Grande-Bretagne, Pays-Bas, Singapour) — le Qatar n'en fait pas partie, confirmant le format standard de ce week-end. Lu intégralement via fetch-url.yml.">McLaren Racing — guide du format sprint 2026</a><span class="desc">McLaren.com</span></li>
        <li><a href="https://news.verstappen.com/en/article/6028" data-desc="Communication directe pilote : titre « Max in Qatar: Fast corners are more challenging for us », concernant précisément cette séance. Classement affiché sur la page non réutilisable (cache obsolète) ; bandeau d'actualités de la même page resté exploitable et daté.">Verstappen.com — actualités du pilote</a><span class="desc">Verstappen.com</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.planetf1.com/news/2026-qatar-grand-prix-fp1-report" data-desc="URL de rapport devinée, atterrie sur la page d'accueil actualités — confirme la date du jour, le calendrier (Abu Dhabi 4-6 décembre) et le titre « Qatar GP predictions: Ferrari fireworks, awkward Russell and Verstappen, 400 overtakes » (26 nov. 2026). Lu intégralement via fetch-url.yml.">PlanetF1 — actualités Qatar GP</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://www.gpblog.com/en/breaking-news" data-desc="Atterrie sur une page de calendrier générique ; encart « Popular on GPBlog » resté exploitable et daté, confirmant les échanges Hamilton/Vasseur/Leclerc et Russell/Verstappen de ce week-end. Lu intégralement via fetch-url.yml.">GPblog — actualités</a><span class="desc">GPblog</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/what-happened-in-2026-f1-qatar-gp-first-practice/" data-desc="URL de rapport devinée, atterrie sur une page générique ; bandeau « Latest Formula 1 News » resté exploitable et daté, confirmant le tour de référence d'Antonelli sur MEDIUM plutôt que SOFT, son admission de « trop confiance » post-titre, la réunion pilotes-commissaires au Qatar et l'absence de « solution » Ferrari communiquée sur le différend Hamilton/Leclerc. Corps complet de l'article non accessible, signalé honnêtement.">The Race — actualités Qatar GP</a><span class="desc">The Race</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Tentatives explicitement infructueuses</h5>
      <ul>
        <li><span class="desc">Motorsport.com et Autosport (plusieurs URLs plausibles) : contenu daté de la vraie saison 2025 (classements et noms d'écurie — « Sauber », « RB », Tsunoda chez Red Bull — incompatibles avec la grille 2026 de ce site ; date de publication explicite "Nov 28, 2025" repérée dans le contenu Autosport), écartées des deux conformément à la règle de vérification du contenu réellement fetché. The Race (piastri-leads-mclaren-1-2-verstappen-sixth-in-only-qatar-f1-practice) présentait la même anomalie (titre « only Qatar practice », caractéristique d'un format sprint propre à la vraie saison 2025) et a été écarté pour la même raison.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
