// Analyse Round 4 — Grand Prix de Miami 2026 (Miami International Autodrome).
// Rédigé à partir de scripts/race_briefing*.py (base de données The Pit
// Wall, alimentée par OpenF1 : résultats, grille, arrêts, relais pneus,
// temps au tour et de secteur, météo, chronologie complète des messages
// de course) et de recherches web ciblées (WebSearch) pour le contexte
// non capturé en base (disqualification en qualifications, causes des
// sorties de piste, citations d'après-course, pénalités infligées après
// la course, résultats du Sprint du samedi — non ingéré en base, cf.
// Round 2). La source Pirelli sur cette course précise
// (antonelli-wins-again-in-miami-three-consecutive-victories-for-the-italian)
// est une lecture primaire (press.pirelli.com, récupérée via
// fetch-url.yml), de même que la page officielle des meilleurs tours sur
// formula1.com ; les autres articles de presse sont des sources
// secondaires, citées comme telles. Le meilleur tour de la course, signé
// par Norris au tour 35 en 1:31,869, est confirmé indépendamment par
// trois sources : le champ agrégé de la base (race_briefing.py), notre
// propre relevé tour par tour (race_briefing_laptimes.py, tour 35 :
// 0:01:31.869000 exactement), et la page officielle formula1.com/.../
// fastest-laps lue directement — triple vérification signalée dans le
// texte, à l'image de ce qui avait été fait pour Antonelli au Round 2.
// Un signal DB a par ailleurs été vérifié plutôt que pris pour argent
// comptant : le résumé météo indique « Pluie: True » sur la fenêtre de
// course, alors qu'aucune source externe ne décrit de pluie tombée en
// piste et qu'aucun pilote n'a chaussé de pneus pluie — l'explication la
// plus cohérente, développée dans le texte, est que ce indicateur reflète
// le risque d'orage ayant motivé l'avancement du départ de trois heures,
// pas une averse réellement tombée sur la piste.
export const ROUND4_ANALYSE_FR_HTML = `
<div class="hero prose">
  <p class="eyebrow">Grand Prix de Miami · Miami International Autodrome · 2026</p>
  <p class="verdict">Antonelli signe une troisième victoire consécutive grâce à un undercut exécuté à la perfection — pas grâce à la voiture la plus rapide, qui était McLaren.</p>
  <div class="resultstrip">
    <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes</span></div>
    <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren · +3,264s</span></div>
    <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">McLaren · +27,092s</span></div>
    <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes · +43,051s</span></div>
    <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · +48,949s</span></div>
  </div>
  <p class="subverdict">Norris a signé le meilleur tour de la course (1:31,869 au tour 35) et McLaren a longtemps semblé la voiture la plus rapide du plateau. Mais Mercedes a dégainé l'undercut le premier : Antonelli s'arrête au tour 26 pour un arrêt de 2,2 secondes, McLaren réagit un tour plus tard avec un arrêt plus lent de 0,6 seconde — l'écart qui a décidé la course, jamais comblé ensuite. La course avait basculé bien avant, sur la grille : Hadjar, disqualifié des qualifications pour un plancher hors gabarit puis pénalisé d'un changement de moteur, s'élançait de la voie des stands, tandis que le départ lui-même avait été avancé de trois heures pour fuir des orages qui, finalement, ne sont jamais tombés sur la piste. Un accrochage entre Gasly et Lawson au tour 6 — la Racing Bulls de Lawson victime d'une panne de boîte de vitesses au freinage — a fait basculer l'Alpine de Gasly sur le toit et provoqué une longue Safety Car, exploitée par Verstappen pour un arrêt précoce qui lui vaudra la cinquième place. Leclerc, lui, a terminé la course à l'envers : un tête-à-queue au tour 57 contre le mur du virage 3 l'a poussé à couper les chicanes suivantes endommagé, ce qui lui a coûté une pénalité de 20 secondes et la sixième place au profit de son propre coéquipier.</p>
</div>

<section class="block" data-num="01" id="sec-r1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Le contexte avant la course</h2>
    <p>Miami ouvre un nouveau week-end sprint : le Sprint du samedi a été remporté par Norris, devant son coéquipier Piastri (+3,766s) et Leclerc (+6,251s) — Russell quatrième, Verstappen cinquième. Pour les qualifications du dimanche, Antonelli décroche sa troisième pole position consécutive de la saison en 1:27,798, devant Verstappen et Leclerc. Mais la grille officielle a changé de visage après la séance : les commissaires ont disqualifié Hadjar, neuvième sur la piste, pour un plancher de RB22 dépassant de deux millimètres la limite réglementaire. Red Bull en a profité pour également changer des éléments du groupe propulseur sur sa voiture, ce qui l'envoie s'élancer depuis la voie des stands — la double peine pour ses débuts de week-end.</p>
    <p>Le vrai sujet du dimanche s'est toutefois joué avant même les qualifications : la FIA a avancé le départ de la course de trois heures, à 13h00 heure locale, face à la menace d'orages violents attendus en fin d'après-midi sur l'horaire initialement prévu. La décision, prise pour maximiser la fenêtre de course exploitable en conditions sûres, a fini par s'avérer inutile a posteriori : la pluie annoncée n'est jamais tombée sur la piste pendant la course. La base de données conserve pourtant un indicateur météo « Pluie: True » sur la fenêtre de course — un signal qui mérite d'être noté sans être pris pour argent comptant : aucune source externe ne rapporte d'averse réelle en piste, et aucun pilote n'a chaussé le moindre pneu pluie de la course, ce qui pointe vers un indicateur reflétant le risque d'orage ayant motivé l'avancement du départ plutôt qu'une pluie effectivement tombée.</p>
    <p>Pirelli avait nominé sa combinaison la plus tendre de la gamme pour Miami — C3, C4 et C5, en dur/medium/tendre — la même logique que Melbourne en ouverture de saison. Le directeur motorsport de Pirelli, Dario Marrafuschi, a résumé la course à venir comme stratégiquement simple <em>a priori</em>, la seule vraie variable résidant dans l'incertitude météo jusqu'au bout. Les mêmes trois composés seront reconduits pour la prochaine manche, à Montréal, trois semaines plus tard.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-r2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> La dynamique de la course</h2>

    <h3 class="subtitle">Un accrochage au premier virage, puis une Safety Car providentielle au tour 6</h3>
    <p>Dès le tour 1, Colapinto et Hamilton s'accrochent au virage 11 — un incident noté puis classé sans suite par les commissaires. La vraie rupture de la course survient au tour 6 : Hadjar, parti de la voie des stands, tape le mur du virage 13 et casse sa suspension avant — « je l'ai jeté à la poubelle », reconnaîtra-t-il après course, évoquant un « moment de concentration » manqué. Au même tour, Gasly et Lawson s'accrochent au virage 17 : Lawson, victime d'une panne de boîte de vitesses au freinage — plus de rapport engagé, plus de moyen de ralentir — percute l'arrière gauche de l'Alpine de Gasly, qui décolle et retombe sur le toit contre le mur. Les deux pilotes abandonnent indemnes ; les commissaires, après enquête d'après-course, ne retiennent aucune sanction contre Lawson une fois la panne mécanique confirmée comme cause de l'accrochage.</p>
    <p>La double intervention nécessaire déclenche une Safety Car longue, déployée à 17h12 (heure de session) et relâchée treize minutes plus tard. C'est exactement la fenêtre qu'exploitent Verstappen et Bottas, tous deux au tour 6 : Verstappen bascule du medium au dur, Bottas du medium au tendre. Selon Pirelli, cette différenciation précoce « a payé, dans une certaine mesure », pour le pilote Red Bull.</p>

    <h3 class="subtitle">L'undercut qui a fait basculer la course</h3>
    <p>Devant, Antonelli, Norris et Piastri se tiennent en un mouchoir de poche pendant plus de vingt tours sur pneus medium. Mercedes dégaine la première : Antonelli rentre au tour 26 pour un arrêt de 2,2 secondes. McLaren réagit un tour plus tard — Norris s'arrête au tour 27, mais l'arrêt dure 2,8 secondes, six dixièmes de plus que celui d'Antonelli. L'écart suffit : à la sortie des stands, Antonelli ressort devant, et ne sera plus jamais menacé jusqu'à l'arrivée malgré un rythme McLaren qui restera compétitif jusqu'au bout — Norris signera d'ailleurs le meilleur tour de la course, 1:31,869 au tour 35, une fois relancé sur pneus durs frais. Piastri, sur un tempo proche, s'arrête au tour 28 et conserve la troisième place jusqu'au drapeau à damier.</p>
    <p>Leclerc et Russell, eux, avaient opté pour un arrêt bien plus précoce — respectivement tours 21 et 20 — un choix qui les place en piste dégagée mais leur coûte la position sur le groupe de tête resté dehors plus longtemps. Hamilton, sur la même Ferrari, attend au contraire le tour 27, exactement comme Norris : une divergence de stratégie interne chez Ferrari entre ses deux pilotes, sans bénéfice sur l'issue de la course pour l'un comme pour l'autre.</p>

    <h3 class="subtitle">Leclerc se saborde sur le dernier tour</h3>
    <p>Solidement installé dans la lutte pour la sixième place, Leclerc part en tête-à-queue au virage 3 lors de l'ultime tour et heurte le mur. Sa monoplace endommagée, il coupe plusieurs chicanes dans les virages suivants pour rallier l'arrivée — un choix que les commissaires jugeront après course non justifié par l'ampleur réelle des dégâts, malgré les explications de Leclerc lui-même sur les difficultés à négocier normalement les virages abîmés. Résultat : une pénalité de 20 secondes pour être sorti de piste à plusieurs reprises en en tirant un avantage, infligée après la course, qui le fait reculer derrière son propre coéquipier Hamilton au classement final. Une enquête séparée, ouverte pour avoir continué à courir avec une voiture mécaniquement compromise, est classée sans suite.</p>

    <h3 class="subtitle">Verstappen, la remontée silencieuse</h3>
    <p>Sorti P2 sur la grille mais jamais dans le coup pour la victoire après son arrêt précoce sous Safety Car, Verstappen boucle un relais final de 51 tours sur ses pneus durs — comme le souligne Pirelli, sans jamais avoir à gérer son rythme, signe d'une dégradation particulièrement limitée ce dimanche-là. Il écope après course d'une pénalité de 5 secondes pour avoir franchi la ligne blanche à la sortie de la voie des stands lors de son arrêt précoce, sans conséquence sur son classement final. Une seconde enquête, ouverte pour un contact avec Russell au virage 1 en fin de course, est classée sans suite.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-r3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Les principales décisions stratégiques</h2>

    <h3 class="subtitle">Mercedes — l'undercut exécuté au bon moment, au bon rythme</h3>
    <p>Le geste stratégique de la course : Antonelli et l'équipe attendent que McLaren semble installée devant avant de dégainer, puis exécutent un arrêt rapide (2,2s) qui prend McLaren de vitesse d'un tour complet. Russell, de son côté, avait opté pour un arrêt bien plus précoce (tour 20) qui l'a isolé du groupe de tête resté dehors plus longtemps — une divergence interne chez Mercedes qui n'a coûté la victoire à personne, mais qui a coûté une place à Russell.</p>

    <h3 class="subtitle">McLaren — la voiture la plus rapide, l'exécution la moins nette</h3>
    <p>Norris a signé le meilleur tour de la course et disposait clairement du rythme pour gagner. Mais l'arrêt qui a suivi l'undercut de Mercedes, 2,8 secondes contre 2,2, a coûté la course : six dixièmes perdus au tour où tout s'est joué. Piastri, resté en retrait de la bataille pour la tête, engrange une troisième place solide sans jamais être en position de menacer le podium adverse.</p>

    <h3 class="subtitle">Ferrari — deux stratégies, deux pilotes, un même résultat décevant</h3>
    <p>Leclerc s'arrête tôt (tour 21), Hamilton tard (tour 27, comme Norris) : deux lectures différentes de la même course chez la même équipe, sans qu'aucune ne rapporte de bénéfice net face au rythme Mercedes-McLaren. Le sixième rang final d'Hamilton doit d'ailleurs davantage à la pénalité infligée à Leclerc pour son tête-à-queue du dernier tour qu'à un quelconque avantage stratégique construit en course.</p>

    <h3 class="subtitle">Red Bull — un pari payant d'un côté du garage, un naufrage de l'autre</h3>
    <p>Verstappen a lu la Safety Car du tour 6 comme une opportunité et s'est arrêté immédiatement pour chausser des durs neufs — un pari que Pirelli elle-même juge payant, validé par un relais final de 51 tours sans gestion de pace nécessaire. De l'autre côté du garage, le week-end d'Hadjar aura été un désastre intégral : disqualifié des qualifications pour un plancher hors gabarit, contraint de partir des stands après un changement de moteur, puis sorti de piste au tour 6 pour ce qu'il a lui-même qualifié d'« erreur stupide ».</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-r4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Bilan pilote par pilote</h2>
    <p>L'évaluation porte sur la course de dimanche, en tenant compte de la position de départ, de la voiture et des circonstances (source : base de données The Pit Wall, résultats/grille/arrêts/pneus/temps au tour, complétée par la recherche web pour les causes d'incident et les décisions des commissaires).</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table class="verdict-table">
      <thead><tr><th>Pilote</th><th>Départ → arrivée</th><th>Analyse</th></tr></thead>
      <tbody>
        <tr><td><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>P1 → P1</td><td>Troisième pole consécutive transformée en troisième victoire consécutive. Undercut décisif au tour 26 (arrêt de 2,2s) devant Norris, jamais menacé ensuite.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Norris</td><td>P4 → P2</td><td>Meilleur tour de la course (1:31,869, tour 35), rythme le plus rapide du plateau une bonne partie du dimanche. Perd la course sur un arrêt plus lent de six dixièmes que celui d'Antonelli au tour clé (27 contre 26).</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> Piastri</td><td>P7 → P3</td><td>Belle remontée depuis la P7, jamais en position de menacer la tête mais podium solide, sans incident.</td></tr>
        <tr><td><span class="dot" style="background:#00A19B"></span> Russell</td><td>P5 → P4</td><td>Arrêt precoce (tour 20) qui l'isole du groupe de tête resté en piste plus longtemps ; devancé nettement par son propre coéquipier.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>P2 → P5</td><td>Exploite la Safety Car du tour 6 par un arrêt immédiat vers les durs, relais final de 51 tours sans gestion de rythme nécessaire selon Pirelli. Pénalité de 5s pour franchissement de la ligne de sortie des stands, sans conséquence sur son classement.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>P6 → P6</td><td>Stratégie jumelle de Norris (arrêt tour 27), rythme discret. Hérite de la sixième place surtout grâce à la pénalité infligée à son coéquipier.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>P8 → P7</td><td>Impliqué dans un accrochage sans conséquence avec Hamilton au tour 1 ; meilleur résultat Alpine du week-end.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>P3 → P8</td><td>Arrêt précoce (tour 21) qui l'écarte du groupe de tête. Tête-à-queue contre le mur du virage 3 au dernier tour : continue endommagé en coupant plusieurs chicanes, pénalité de 20s pour sortie de piste répétée avec avantage, qui le fait reculer derrière Hamilton.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>P13 → P9</td><td>Belle remontée depuis la P13 pour Williams, dans les points.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Albon</td><td>P15 → P10</td><td>Doublé Williams dans les points, week-end propre sans incident notable.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>P12 → P11*</td><td>Un seul arrêt (tour 26), meilleur résultat Haas du week-end hors points. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>P21 → P12*</td><td>Grosse remontée depuis la P21 pour Audi, arrêt tardif (tour 32). *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>P14 → P13*</td><td>Un arrêt (tour 31), week-end sans incident pour Haas. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>P16 → P14*</td><td>Un arrêt (tour 28), progression régulière depuis la P16. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Alonso</td><td>P17 → P15*</td><td>Relais medium exceptionnellement long (41 tours) permis par une dégradation limitée par les températures plus fraîches, puis tendres jusqu'à l'arrivée — seul avec Stroll à avoir choisi le tendre en second train de gommes. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>P20 → P16*</td><td>Arrêt tour 29, week-end discret pour Cadillac. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Stroll</td><td>P18 → P17*</td><td>Stratégie à deux arrêts (tours 21 et 37) vers le tendre à chaque fois, comme Bottas — l'une des deux seules voitures à ne pas boucler la course en un seul arrêt. *Classé « Lapped ».</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>P19 → P18**</td><td>Stratégie multi-arrêts (la base recense trois passages, tours 6/21/30, quand le communiqué Pirelli n'en évoque que deux) incluant un arrêt tendre précoce sous Safety Car ; pénalité en drive-through purgée pour excès de vitesse dans la voie des stands. **Classé à deux tours.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>P10 → Abandon</td><td>Semaine déjà marquée par un départ de feu avant le Sprint du samedi ; s'arrête dès le tour 1 pour un nouvel aileron avant, reste en piste sous instruction du muret puis abandonne sur un problème technique jamais résolu.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> Lawson</td><td>P11 → Abandon</td><td>Panne de boîte de vitesses au freinage du virage 17 au tour 6 : plus de rapport engagé, percute l'arrière de la voiture de Gasly qui décolle. Aucune sanction retenue après enquête, la cause mécanique étant confirmée.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>P9 → Abandon</td><td>Sa voiture se retourne après le contact avec Lawson au virage 17, tour 6 — sorti indemne d'un accident impressionnant qui n'était pas de son fait.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>P22 (voie des stands) → Abandon</td><td>Disqualifié des qualifications pour un plancher deux millimètres hors gabarit, contraint par ailleurs à un départ des stands après changement d'éléments moteur. Sort de piste et casse sa suspension avant contre le mur du virage 13 au tour 6 : « une erreur stupide », reconnaîtra-t-il.</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" data-num="05" id="sec-r5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Bilan équipe par équipe</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th style="width:140px;">Écurie</th><th>Bilan stratégique et opérationnel</th></tr></thead>
      <tbody>
        <tr><td><span class="dot" style="background:#00A19B"></span> Mercedes</td><td>Victoire obtenue sur un undercut exécuté au bon tour et au bon rythme (Antonelli). Russell, arrêté trop tôt de son côté, s'isole du groupe de tête et ne finit que quatrième.</td></tr>
        <tr><td><span class="dot" style="background:#FF8000"></span> McLaren</td><td>La voiture la plus rapide du dimanche (meilleur tour de Norris), mais un arrêt plus lent de six dixièmes au moment décisif coûte la victoire. Piastri sécurise un podium solide en P3.</td></tr>
        <tr><td><span class="dot" style="background:#E8002D"></span> Ferrari</td><td>Stratégies divergentes entre les deux pilotes sans bénéfice net. Leclerc s'auto-sabote sur un tête-à-queue au dernier tour, pénalisé 20s, et termine derrière Hamilton.</td></tr>
        <tr><td><span class="dot" style="background:#1B3A93"></span> Red Bull</td><td>Verstappen exploite intelligemment la Safety Car du tour 6 pour une cinquième place solide. Hadjar traverse le pire week-end de sa jeune carrière : disqualification, départ des stands, puis sortie de piste au tour 6.</td></tr>
        <tr><td><span class="dot" style="background:#FF87BC"></span> Alpine F1 Team</td><td>Colapinto marque des points (P7) ; Gasly voit sa voiture décoller et se retourner après un contact qui n'était pas de son fait, sort indemne.</td></tr>
        <tr><td><span class="dot" style="background:#6C98FF"></span> Williams</td><td>Doublé dans les points (Sainz P9, Albon P10), belle remontée depuis le fond de grille pour les deux voitures.</td></tr>
        <tr><td><span class="dot" style="background:#B6BABD"></span> Haas F1 Team</td><td>Bearman et Ocon hors des points mais week-end propre, sans le moindre incident à commenter.</td></tr>
        <tr><td><span class="dot" style="background:#00302B"></span> Audi</td><td>Bortoleto signe une belle remontée depuis la P21 ; Hülkenberg abandonne après un nouveau week-end à problèmes, entre départ de feu au Sprint et panne en course.</td></tr>
        <tr><td><span class="dot" style="background:#2B4562"></span> RB F1 Team</td><td>Lindblad progresse tranquillement vers la P14 ; Lawson victime d'une panne de boîte de vitesses qui provoque son abandon et celui de Gasly au virage 17.</td></tr>
        <tr><td><span class="dot" style="background:#229971"></span> Aston Martin</td><td>Alonso boucle un relais medium de 41 tours permis par une dégradation limitée, l'une des stratégies les plus atypiques du peloton ; Stroll conserve une approche à deux arrêts qui ne le sauve pas du fond de grille.</td></tr>
        <tr><td><span class="dot" style="background:#C9A24B"></span> Cadillac F1 Team</td><td>Pérez discret en P16 ; Bottas purge une pénalité en drive-through pour excès de vitesse dans la voie des stands et termine à deux tours, week-end le plus compliqué des quatre premières courses pour l'écurie américaine.</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-r6">
  <div class="prose">
    <h2 class="sectitle">Conclusion</h2>
    <div class="verdictgrid">
      <div class="verdictcol win">
        <h4>Gagnants</h4>
        <ul>
          <li><strong>Antonelli</strong>, pour une troisième victoire consécutive obtenue sur un undercut exécuté à la perfection plutôt que sur le rythme pur.</li>
          <li><strong>Verstappen</strong>, pour avoir lu la Safety Car du tour 6 comme une opportunité et transformé une position moyenne en cinquième place solide.</li>
          <li><strong>Norris</strong>, malgré la défaite : meilleur tour de la course et rythme le plus rapide du dimanche, seul un arrêt plus lent l'a privé de la victoire.</li>
        </ul>
      </div>
      <div class="verdictcol lose">
        <h4>Perdants</h4>
        <ul>
          <li><strong>Hadjar</strong>, pour le pire enchaînement possible d'un week-end : disqualification en qualifications, départ des stands, sortie de piste au tour 6.</li>
          <li><strong>Leclerc</strong>, pour un tête-à-queue au dernier tour qui transforme une course discrète en pénalité de 20 secondes et une place perdue au profit de son propre coéquipier.</li>
          <li><strong>McLaren</strong>, pour avoir eu la voiture la plus rapide de la journée sans parvenir à convertir cet avantage en victoire, sur un simple arrêt six dixièmes trop lent.</li>
        </ul>
      </div>
    </div>
    <div class="callout">Le départ avancé de trois heures pour fuir des orages qui ne sont jamais tombés a fini par n'être qu'une anecdote : la course s'est jouée sur un undercut au tour 26, exécuté six dixièmes plus vite par Mercedes que par McLaren un tour plus tard. Tout le reste — l'accident spectaculaire de Gasly, le naufrage complet du week-end d'Hadjar, l'autodestruction de Leclerc sur le tout dernier tour — n'a fait qu'habiller un résultat que deux arrêts aux stands, séparés d'un tour et de six dixièmes de seconde, avaient déjà scellé.</div>
  </div>
</section>

<section class="block" id="sec-r-next">
  <div class="prose">
    <h2 class="sectitle">Enseignements pour la suite</h2>
    <p>Trois points issus de Miami à surveiller dans les prochaines courses :</p>
    <ol style="padding-left:20px; margin:0 0 16px;">
      <li style="margin-bottom:10px;"><strong>McLaren</strong> a eu la voiture la plus rapide de la journée sans gagner. La question de l'exécution aux arrêts — six dixièmes ont suffi à perdre Miami — sera à surveiller à Montréal, où Pirelli reconduit la même allocation de gommes (C3/C4/C5) : les mêmes conditions stratégiques pourraient se représenter.</li>
      <li style="margin-bottom:10px;"><strong>Hadjar</strong> traverse une passe difficile après un enchaînement rare de mésaventures. Reste à voir si Red Bull peut stabiliser son année recrue avant que la confiance ne s'érode davantage.</li>
      <li><strong>Antonelli</strong> compte désormais 100 points et une avance de 20 points sur Russell — son propre coéquipier — après quatre courses. Si l'écart continue de se creuser à l'intérieur même du garage Mercedes, la gestion interne des deux pilotes deviendra un sujet à suivre de près, comme cela avait déjà été le cas la saison passée.</li>
    </ol>
  </div>
</section>

<section class="block" id="sec-r7">
  <details class="sources">
    <summary>Sources utilisées — GP de Miami (14 liens)</summary>
    <div class="srcgroup">
      <h5>Base de données The Pit Wall</h5>
      <ul>
        <li><span class="desc">Résultats, grille, arrêts, relais pneus, temps au tour, météo, chronologie complète des messages de course — alimentés depuis l'API OpenF1 (scripts/ingest_openf1.py). Source primaire pour l'ensemble des faits chiffrés de cet article.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Course et pneus — sources primaires</h5>
      <ul>
        <li><a href="https://press.pirelli.com/antonelli-wins-again-in-miami-three-consecutive-victories-for-the-italian/" data-desc="Compte rendu officiel Pirelli de la course, stratégies pneus et citation du directeur motorsport.">Antonelli signe une troisième victoire consécutive</a><span class="desc">Pirelli Press — communiqué officiel, lu directement</span></li>
        <li><a href="https://www.formula1.com/en/results/2026/races/1284/miami/fastest-laps" data-desc="Classement officiel des meilleurs tours de la course, lu directement pour confirmer le tour de Norris.">Meilleurs tours — GP de Miami</a><span class="desc">Formula1.com — résultats officiels, lu directement</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Qualifications et horaire de course</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/hadjar-disqualified-from-miami-grand-prix-qualifying.6ANxlH2BpIvVgSPfzkW3RL" data-desc="Disqualification d'Hadjar pour un plancher hors gabarit.">Hadjar disqualifié des qualifications</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.racefans.net/2026/05/03/miami-grand-prix-to-start-three-hours-early-due-to-threat-of-severe-storms/" data-desc="Avancement du départ de trois heures face à la menace d'orages.">Le départ avancé de trois heures</a><span class="desc">RaceFans</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Incidents et abandons</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/it-sucks-for-both-of-us-gasly-and-lawson-explain-their-miami-grand-prix-collision.KAxY9RpwCxsc7gGTVhbca" data-desc="Explications de Gasly et Lawson sur leur accrochage au virage 17.">Gasly et Lawson expliquent leur accrochage</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://www.planetf1.com/news/liam-lawson-gearbox-failure-pierre-gasly-miami-crash" data-desc="Panne de boîte de vitesses de Lawson à l'origine du contact avec Gasly.">La panne de boîte de vitesses de Lawson</a><span class="desc">PlanetF1</span></li>
        <li><a href="https://www.crash.net/f1/news/1094468/1/i-just-threw-it-all-away-isack-hadjar-explains-miami-f1-crash" data-desc="Hadjar réagit à sa sortie de piste du tour 6.">« Je l'ai jeté à la poubelle » — Hadjar</a><span class="desc">Crash.net</span></li>
        <li><a href="https://sports.yahoo.com/articles/nico-hulkenberg-ruled-miami-sprint-165443510.html" data-desc="Départ de feu sur la voiture d'Hülkenberg avant le Sprint du samedi.">Le week-end à problèmes d'Hülkenberg</a><span class="desc">Yahoo Sports</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Pénalités et décisions des commissaires</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/explained-why-leclerc-was-hit-with-a-20-second-time-penalty-after-the-miami-grand-prix.4EbZXOee2tXei29C5ktNMG" data-desc="Explication détaillée de la pénalité de 20 secondes infligée à Leclerc.">Pourquoi Leclerc a été pénalisé de 20 secondes</a><span class="desc">Formula1.com</span></li>
        <li><a href="https://racingnews365.com/max-verstappen-hit-with-miami-gp-time-penalty" data-desc="Pénalité de 5 secondes infligée à Verstappen pour franchissement de la ligne de sortie des stands.">Verstappen pénalisé de 5 secondes</a><span class="desc">RacingNews365</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Sprint du samedi (secondaire — non couvert par la base)</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/latest/article/norris-beats-piastri-and-leclerc-to-victory-in-miami-sprint.4H4WI3lnIs7jOZ8lSBIp6X" data-desc="Résultats et résumé du Sprint remporté par Norris.">Norris remporte le Sprint de Miami</a><span class="desc">Formula1.com</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Stratégie et réactions d'après-course</h5>
      <ul>
        <li><a href="https://www.skysports.com/f1/news/12433/13539721/miami-gp-lando-norris-rues-mclaren-strategy-after-losing-out-to-kimi-antonelli-in-battle-for-victory" data-desc="Norris commente la stratégie McLaren après avoir perdu la victoire.">Norris regrette la stratégie McLaren</a><span class="desc">Sky Sports</span></li>
        <li><a href="https://www.motorsport.com/f1/news/mclaren-strategy-under-fire-after-lando-norris-missed-out-on-miami-gp-victory/10818754/" data-desc="Analyse de l'arrêt plus lent de Norris face à l'undercut d'Antonelli.">La stratégie McLaren critiquée</a><span class="desc">Motorsport.com</span></li>
      </ul>
    </div>
  </details>
</section>
`;
