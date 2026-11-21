// Analyse Qualifications — Grand Prix de Las Vegas (Las Vegas Strip Circuit),
// round 21, saison 2026. Prolonge l'EL1 (pluie), l'EL2 (piste humide
// s'asséchant) et l'EL3 (première référence sèche) : les qualifications se
// déroulent sur piste sèche et livrent la grille de départ de la course.
//
// Données de séance : donnée primaire = pipeline OpenF1 (session_key=11416,
// Qualifying, 2026-11-21 04:00->05:00 UTC), classement confirmé directement
// depuis la base via scripts/practice_briefing.py (22 pilotes classés par
// meilleur tour, tours chronométrés par pilote de 8 à 26 selon l'élimination
// en Q1/Q2/Q3, pneu tendre exclusivement sur l'ensemble du plateau, piste
// sèche du début à la fin — pluie=False sur l'intégralité des 78 points
// météo, air 12,5-13,7°C, piste 14,7-16,1°C). Classement par meilleur tour
// identique à la centième à PlanetF1 (Antonelli 1:33.893, Verstappen
// 1:34.151, Russell 1:34.224, Norris 1:34.244, Hadjar 1:34.592, Lindblad
// 1:34.668) — triangulation réussie entre donnée interne et sources
// externes. Le détail Q1/Q2/Q3 par segment (non disponible dans le
// classement OpenF1 brut, qui ne donne que le meilleur tour toutes manches
// confondues) provient de PlanetF1, seule source consultée à fournir le
// tableau complet des trois temps par pilote.
//
// Grille de départ : reconstruite à partir des deux pénalités connues et
// confirmées par Formula1.com (« What the teams said ») et PlanetF1 —
// Antonelli, auteur du meilleur temps en Q3, recule de 5 places (pénalité
// moteur) et s'élance donc 6e ; Piastri, 7e sur le tour, recule de 10 places
// (5e élément thermique de la saison) et s'élance 17e. Grille reconstituée
// vérifiée point par point contre les citations directes de Formula1.com
// (« Russell qualified third, but starts second », « Norris... fourth —
// which becomes third », « Hadjar... second row », « Lindblad... starts a
// career-best fifth », « Piastri... will start 17th », et la citation de
// Mattia Spini chez Racing Bulls donnant explicitement P5/P7 pour
// Lindblad/Lawson) : les neuf premières positions de grille collent à ces
// neuf confirmations indépendantes, aucune divergence.
//
// Analyse technique quantifiée — le fil conducteur de cette séance précise
// n'est pas un écart de rythme pur mais l'effet d'aspiration (slipstream),
// cité comme facteur décisif par Mercedes (Wolff, Shovlin), Red Bull
// (Mekies), McLaren (Stella) et Alpine (Nielsen) dans leurs comptes-rendus
// respectifs. L'analyse ci-dessous quantifie cet effet via la progression
// Q1->Q2->Q3 de chaque pilote du top 7 (données PlanetF1, confirmées à la
// centième par le classement OpenF1 du meilleur tour final) plutôt que via
// des relais longs — non pertinents pour une séance de qualification à tour
// unique. Vitesses de pointe (speedST/speedFL) : non disponibles, le script
// scripts/practice_briefing.py n'exposant pour les qualifications que
// temps/secteurs, relais pneus et météo — signalé explicitement plutôt
// qu'une vitesse de pointe inventée.
//
// Suivi de l'enquête Verstappen (reportée depuis l'EL3) : l'EL3 de ce même
// week-end documentait déjà le verdict — avertissement pour Verstappen, sans
// pénalité de grille, concernant à la fois la conduite jugée erratique face
// à Colapinto et l'accrochage avec Russell au virage 14. Formula1.com
// (« What the teams said ») confirme indépendamment ce verdict dans son
// compte-rendu de qualifications (« called to the stewards... for that he
// was given a warning ») — triangulation supplémentaire plutôt que fait
// nouveau, signalée ici pour mémoire de cohérence éditoriale entre les deux
// articles.
//
// Analyse Hamilton (règle éditoriale c-bis, 2026-11-09) : Lewis Hamilton a
// bien pris part à cette séance — éliminé en Q2, 12e sur le tour chronométré
// (1:35.253), 11e sur la grille de départ une fois la pénalité Antonelli
// répercutée. NIVEAU VOITURE : comparaison chiffrée avec son coéquipier
// Charles Leclerc (11e sur le tour, 1:35.197 — son temps de Q2, seul temps
// qui compte pour le classement une fois en Q2 même si son Q1, 1:35.040,
// était plus rapide ; point de méthode vérifié contre le tableau Q1/Q2/Q3
// complet de PlanetF1) à la fois sur le temps au tour (+0,056s seulement
// pour Hamilton — un écart Q2 bien plus resserré que ne le suggérerait une
// comparaison naïve des deux meilleurs temps de la séance toutes manches
// confondues) et sur les meilleurs secteurs individuels de la base OpenF1
// du projet, qui eux proviennent de tours différents et donc d'un écart
// plus large (Leclerc devant dans les trois secteurs, ~0,4s cumulé) —
// signalé explicitement comme non directement comparable au score précédent.
// Réserve méthodologique explicite : Ferrari indique elle-
// même (Vasseur, Hamilton) que la voiture d'Hamilton a subi un dommage de
// fond plat en Q1 avec perte d'appui, partiellement réparé seulement — la
// comparaison ci-dessus porte donc sur deux voitures qui n'étaient plus
// strictement de même spécification au moment du tour chronométré, signalé
// explicitement plutôt que présenté comme un écart de performance pure.
// NIVEAU PILOTAGE : aucune erreur de pilotage sourcée pour Hamilton sur
// cette séance (à la différence de l'EL3) — Ferrari et Hamilton lui-même
// attribuent explicitement l'écart au dommage de fond plat et à des
// limitations de déploiement moteur en fin de tour, pas à la conduite.
// Signalé explicitement : aucun message radio transcrit ni compte-rendu
// d'embarqué dédié trouvé au-delà de la citation écrite d'Hamilton relayée
// par Formula1.com.
//
// Sourcing (4 sources indépendantes, 2 généralistes + 1 officiel + 1
// technique, toutes lues intégralement via fetch-url.yml et vérifiées
// contenu par contenu — pas seulement le résumé WebSearch) :
// - Formula1.com (officiel, « What the teams said — Qualifying in Las
//   Vegas », 21 Nov 2026 8:14am UTC) : compte-rendu écurie par écurie le
//   plus complet des quatre sources — citations intégrales de Antonelli,
//   Russell, Wolff, Shovlin (Mercedes), Verstappen, Hadjar, Mekies (Red
//   Bull), Norris, Piastri, Stella (McLaren), Lawson, Lindblad, Spini
//   (Racing Bulls), Gasly, Colapinto, Nielsen (Alpine), Hamilton, Leclerc,
//   Vasseur (Ferrari). Source du dommage de fond plat d'Hamilton et du
//   verdict de l'enquête Verstappen.
// - PlanetF1 (généraliste à forte substance factuelle, « F1 results: Las
//   Vegas Grand Prix 2026 — Qualifying ») : tableau complet des temps
//   Q1/Q2/Q3 par pilote, confirmation de la pénalité de 5 places
//   d'Antonelli et de son effet sur la pole.
// - RacingNews365 (généraliste, « LIVE: Reaction as Antonelli 'wins'
//   qualifying but Verstappen on Las Vegas pole ») : confirmation croisée
//   indépendante de la chronologie (Russell en tête en FP3, scénario Q3,
//   pénalité d'Antonelli, double élimination Ferrari en Q2).
// - Pirelli (institutionnel/technique, « Antonelli goes all-in, sets the
//   fastest time on Soft ») : confirmation du choix pneumatique (tendre
//   exclusif en Q3, 4 trains pour Antonelli et Russell, 5 pour Verstappen),
//   température de piste, et analyse stratégique Pirelli pour la course
//   (fenêtre d'arrêt tours 22-28, un arrêt tendre-medium privilégié).
// - Limite honnête de sourcing : ESPN et Athlon Sports, identifiés par la
//   recherche initiale comme candidats supplémentaires, ont renvoyé
//   respectivement une réponse vide (HTTP 202) et une erreur de récupération
//   via fetch-url.yml — écartés plutôt qu'utilisés sur la seule base du
//   résumé WebSearch, conformément à la règle de vérification systématique
//   du contenu réel.
//
// Communication directe pilote : les citations d'Antonelli, Russell,
// Verstappen, Norris, Piastri, Lawson, Lindblad, Gasly, Colapinto, Hamilton
// et Leclerc sont des déclarations écuries officielles relayées par
// Formula1.com — pas une communication directe au sens strict de la règle
// (réseaux sociaux propres au pilote). Aucune communication directe au sens
// strict trouvée pour cette séance.
//
// Zéro contenu « people » : aucun développement sur la vie privée des
// pilotes ni sur les polémiques relationnelles relayées par certaines
// sources (ex. échange Russell/Verstappen qualifié de « feud » par
// PlanetF1 et RacingNews365) — traité ici strictement comme un fait de
// piste et de règlement sportif (verdict de l'enquête), jamais comme un
// angle relationnel.
export const ROUND21_QUALI_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Las Vegas · Las Vegas Strip Circuit · Qualifications — samedi 21 novembre</p>
    <p class="verdict">Kimi Antonelli signe le meilleur temps des qualifications avec un 1:33.893, arraché à Max Verstappen dans la dernière minute grâce à un aspirage à haut risque en trafic — mais une pénalité de 5 places pour changement moteur le relègue à la 6e place sur la grille, offrant la pole à Verstappen (1:34.151) devant George Russell (1:34.224, 2e malgré un 3e temps) et Lando Norris (1:34.244, 3e malgré un 4e temps).</p>
    <p class="subverdict">Lewis Hamilton est éliminé en Q2 (12e sur le tour, 1:35.253), 11e sur la grille après répercussion de la pénalité d'Antonelli, juste derrière son coéquipier Charles Leclerc (11e sur le tour, également sorti en Q2) — un écart interne Ferrari que l'écurie attribue explicitement à un dommage de fond plat subi par Hamilton en Q1, documenté plus bas. L'enquête des commissaires visant Verstappen, ouverte après l'EL3 pour son accrochage avec Colapinto puis avec Russell, se solde par un simple avertissement, sans pénalité de grille — confirmé indépendamment par Formula1.com en plus de la source déjà citée dans l'article EL3.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-quali-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Un scénario de pole dicté par l'aspiration, pas par le rythme pur</h2>
    <p>Russell, référence de l'EL3 et donné favori pour la pole, mène Q1 et Q2 sans difficulté pendant qu'Antonelli, lui, se qualifie tout juste pour Q3 en 10e position du segment. Le scénario s'inverse intégralement en Q3 : sur le tracé du Strip, où la ligne droite principale rend l'aspiration considérable, aucun pilote ne veut plus se retrouver en tête du peloton sur le tour de préparation — Russell réclame une aspiration par radio et n'apprécie pas d'être envoyé en air libre, tandis qu'Antonelli, lui, recule volontairement et laisse passer tout le plateau devant lui. Le Mercedes n°12 parvient malgré tout à franchir la ligne avec à peine une seconde d'avance sur le drapeau, profite d'un aspirage puissant derrière Lindblad qu'il suit à seulement 1,4s, et boucle son tour en 1:33.893 — signant le meilleur temps toutes manches confondues alors même qu'il juge lui-même sa propre performance « pas complètement satisfaisante ». Verstappen, qui occupait la pole provisoire depuis son premier passage en Q3, voit son temps battu dans les dernières secondes mais, grâce à la pénalité moteur d'Antonelli, s'élance tout de même en tête pour la première fois cette saison. Verstappen avait par ailleurs été convoqué devant les commissaires après l'EL3 pour son accrochage avec Colapinto puis avec Russell — verdict : simple avertissement, sans pénalité de grille, confirmé indépendamment par Formula1.com.</p>
    <p>La grille de départ, une fois les deux pénalités connues répercutées (Antonelli -5, Piastri -10 pour son 5e élément thermique de la saison), se lit : 1. Verstappen, 2. Russell, 3. Norris, 4. Hadjar, 5. Lindblad, 6. Antonelli, 7. Lawson, 8. Gasly, 9. Colapinto, 10. Leclerc, 11. Hamilton, 12. Hulkenberg, 13. Sainz, 14. Bortoleto, 15. Albon, 16. Camara, 17. Piastri, 18. Perez, 19. Alonso, 20. Stroll, 21. Bottas, 22. Bearman.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-quali-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Rythme chiffré : l'aspiration quantifiée segment par segment</h2>
    <p>La progression Q1→Q2→Q3 du top 7 rend visible, chiffres à l'appui, l'ampleur de l'effet d'aspiration évoqué par toutes les écuries de tête. Antonelli recule entre Q1 (1:34.684) et Q2 (1:35.086, +0,402s) avant de gagner 1,193s en Q3 (1:33.893) — la plus forte progression finale du groupe, cohérente avec un tour construit entièrement autour d'un aspirage tardif plutôt que d'un gain de performance pure. Verstappen, à l'inverse, progresse de façon linéaire et classique : 1:35.264 en Q1, -0,870s en Q2 (1:34.394), -0,243s en Q3 (1:34.151). Russell et Norris suivent un profil intermédiaire (Russell : 1:34.664 → 1:34.617 → 1:34.224 ; Norris : 1:35.109 → 1:34.766 → 1:34.244), chacun gagnant son plus gros morceau de temps lors du dernier passage. Sur le seul tour de Q3, l'écart à la pole provisoire de Verstappen donne une mesure directe de la hiérarchie du jour : Antonelli -0,258s, Russell +0,073s, Norris +0,093s, Hadjar +0,441s, Lindblad +0,517s, Piastri +0,748s — un peloton de tête resserré à moins de huit dixièmes sur sept voitures, deux écuries (Mercedes, Red Bull) et trois marques de châssis représentées dans les quatre premiers.</p>
    <p>Côté pneus, toutes les voitures de Q3 roulent exclusivement en gomme tendre (confirmé par Pirelli et par la base OpenF1 du projet) : Antonelli et Russell utilisent chacun 4 trains sur la séance pour 25 tours chacun, Verstappen 5 trains pour 22 tours — un train de plus pour un nombre de tours inférieur, signe d'une gestion plus prudente ou de tours de préparation supplémentaires côté Red Bull. Pirelli souligne par ailleurs un nombre élevé de blocages sur l'ensemble de la journée (FP3 + qualifications), facteur de vigilance pour la gestion des pneus en course.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-quali-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Hamilton : éliminé en Q2, écart interne Ferrari à lire avec réserve</h2>
    <p><strong>Niveau voiture.</strong> Hamilton boucle les qualifications en 12e position sur le tour chronométré (1:35.253, Q2), éliminé au même stade que son coéquipier Charles Leclerc, 11e. Point de méthode important : le temps de classement de Leclerc est son meilleur tour de Q2 (1:35.197) et non son Q1 (1:35.040, plus rapide mais non retenu une fois le pilote engagé en Q2 — règle sportive standard, vérifiée contre le tableau Q1/Q2/Q3 complet de PlanetF1). L'écart réel entre les deux Ferrari en Q2 n'est donc que de 0,056s, bien plus resserré qu'une comparaison naïve des deux meilleurs temps de la séance (qui donnerait à tort 0,213s). La base OpenF1 du projet, via les meilleurs secteurs individuels (informatifs, pas nécessairement sur le même tour — et provenant chez Leclerc probablement de son tour de Q1, plus rapide), montre un écart plus large : Leclerc devance Hamilton dans les trois secteurs (S1 26,955 contre 26,977 ; S2 32,065 contre 32,309 ; S3 35,602 contre 35,725), pour un écart cumulé de l'ordre de 0,4s — chiffre non directement comparable à l'écart Q2 de 0,056s puisqu'il s'agit de secteurs best-of-session, pas d'un même tour. Ferrari qualifie par ailleurs la comparaison Q2 elle-même de non strictement représentative : l'écurie indique qu'Hamilton a subi un dommage de fond plat (perte d'appui) dès le premier segment, partiellement réparé seulement, et Hamilton confirme par citation écrite avoir subi en plus des « limitations de déploiement » en fin de tour. Les écarts chiffrés ci-dessus portent donc sur deux voitures qui n'étaient plus strictement de même spécification au moment du tour décisif — signalé explicitement plutôt que présenté comme un déficit de performance pur imputable au seul pilotage ou à la seule aérodynamique de référence.</p>
    <p><strong>Niveau pilotage.</strong> À la différence de l'EL3 (deux blocages et un tête-à-queue sourcés pour Hamilton), aucune erreur de pilotage n'a pu être trouvée pour cette séance de qualifications dans les sources consultées. Hamilton lui-même attribue son élimination au dommage de fond plat et aux limitations de déploiement, pas à une erreur de sa part (« je pense que le tour final était aussi bon qu'il pouvait l'être »). Vasseur confirme : « nous avons essayé de réparer, mais n'avons pu le faire que partiellement ». Aucun message radio transcrit ni compte-rendu d'embarqué dédié à Hamilton n'a pu être trouvé au-delà de cette citation écrite relayée par Formula1.com — signalé explicitement plutôt qu'une description d'embarqué inventée.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-quali-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Classement complet des qualifications (tour chronométré)</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos.</th><th>Pilote</th><th>Écurie</th><th>Temps / écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:33.893</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>+0,258s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>+0,331s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>+0,351s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>+0,699s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>+0,775s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>+1,006s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>+1,197s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>+1,212s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>+1,421s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>+1,304s*</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>+1,360s*</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>+1,567s*</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>+1,748s*</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>+2,100s*</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>+2,232s*</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Camara</td><td>Haas F1 Team</td><td>+2,327s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>+3,490s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>+3,507s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>+3,657s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>+3,708s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>+14,112s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
  <div class="prose"><p style="font-size:0.85em;opacity:0.75;">* Pilotes éliminés en Q2 (positions 11-16) : temps retenu = meilleur tour réalisé en Q2 spécifiquement (règle sportive standard), même quand un tour de Q1 antérieur était plus rapide — cas de Leclerc (Q1 1:35.040, non retenu, contre Q2 1:35.197 retenu). Écart calculé par rapport au temps de pole d'Antonelli (1:33.893) à titre de repère, les temps n'ayant pas tous été réalisés dans le même segment de la séance.</p></div>
</section>

<section class="block" id="sec-quali-5">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en course</h2>
    <p>Trois éléments ressortent de ces qualifications pour aborder la course. D'abord, la pole revient à Verstappen (Red Bull) alors que la voiture la plus rapide sur un tour, dimanche comme vendredi, reste une Mercedes — Antonelli s'élance 6e avec le meilleur temps brut de tout le week-end, et Russell occupe la 2e place sur la grille : les deux Mercedes partent donc en position de force malgré l'absence de pole effective, avec un rythme déjà confirmé supérieur à la moyenne en EL3. Ensuite, l'intensité de l'aspiration sur ce tracé, soulignée par Mercedes, Red Bull et McLaren dans leurs comptes-rendus respectifs, laisse présager une course où les six premiers, séparés de moins d'une seconde sur le tour de qualification, pourraient se tenir tout aussi proches en course — Mekies (Red Bull) l'anticipe explicitement : « six voitures en tête incroyablement proches ». Enfin, chez Ferrari, l'écart interne Hamilton/Leclerc en qualifications (tous deux éliminés en Q2, Hamilton 11e sur la grille contre 10e pour Leclerc) doit être relativisé par le dommage de fond plat subi par Hamilton en Q1 : rien dans les trois séances d'essais (où Hamilton avait tourné plus vite que Leclerc en rythme soutenu en EL3) n'indique un déficit structurel de la voiture n°44, ce qui laisse ouverte la question de savoir si Hamilton peut remonter davantage que son seul gain de grille mécanique (une place, grâce à la pénalité d'Antonelli) ne le suggère.</p>
  </div>
</section>

<section class="block" id="sec-quali-6">
  <div class="prose">
    <h2 class="sectitle">Le contexte du week-end</h2>
    <p>Las Vegas conclut son samedi avec une grille de départ bousculée par deux pénalités distinctes (Antonelli -5, Piastri -10) et un incident entre Verstappen et deux autres pilotes réglé par un simple avertissement. Au championnat, Kimi Antonelli (390 pts avant ce week-end) reste en tête devant Max Verstappen (279), George Russell (262), Lewis Hamilton (261) et Charles Leclerc (249) — l'écart resserré entre Russell et Hamilton pour la 3e place du championnat, déjà souligné après l'EL3, prend un relief supplémentaire avec la 2e place de Russell sur la grille face à la 11e d'Hamilton.</p>
  </div>
</section>

<section class="block" id="sec-quali-7">
  <details class="sources">
    <summary>Sources utilisées — Qualifications Las Vegas (4 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), session_key=11416 : classement par meilleur tour, secteurs individuels, relais pneus et météo minute par minute. Primaire pour le classement (section 04) et les secteurs Hamilton/Leclerc (section 03).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/what-the-teams-said-qualifying-in-las-vegas-2026.3nVBux5Arj5K1MNogvg9j9" data-desc="Compte-rendu écurie par écurie le plus complet des quatre sources : citations intégrales de tous les pilotes et ingénieurs cités dans cet article. Source du dommage de fond plat d'Hamilton et du verdict de l'enquête Verstappen. Lu intégralement via fetch-url.yml.">Formula1.com — ce que les écuries ont dit</a><span class="desc">Formula1.com</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.planetf1.com/news/f1-results-las-vegas-grand-prix-2026-qualifying" data-desc="Tableau complet des temps Q1/Q2/Q3 par pilote, confirmation de la pénalité de 5 places d'Antonelli et de son effet sur la pole. Lu intégralement via fetch-url.yml.">PlanetF1 — résultats des qualifications</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://racingnews365.com/live-2026-f1-las-vegas-grand-prix-qualifying" data-desc="Confirmation croisée indépendante de la chronologie de la séance (Russell en tête en FP3, scénario Q3, pénalité d'Antonelli, double élimination Ferrari en Q2). Lu intégralement via fetch-url.yml.">RacingNews365 — live qualifications</a><span class="desc">RacingNews365</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / technique</h5>
      <ul>
        <li><a href="https://press.pirelli.com/antonelli-goes-all-in-sets-the-fastest-time-on-soft" data-desc="Confirmation du choix pneumatique (tendre exclusif en Q3, nombre de trains par pilote), température de piste, et analyse stratégique pour la course (fenêtre d'arrêt, combinaison de composés). Lu intégralement via fetch-url.yml.">Pirelli — Antonelli joue le tout pour le tout</a><span class="desc">Pirelli</span></li>
      </ul>
    </div>
  </details>
</section>
`;
