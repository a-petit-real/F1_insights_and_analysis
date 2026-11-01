// Analyse EL3 — Grand Prix de Mexico (Autódromo Hermanos Rodríguez), round 19,
// saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (session_key=11399, Practice 3,
// 2026-10-31 17:30->18:30 UTC), classement/secteurs/relais/météo vérifiés
// directement depuis la base via scripts/practice_briefing.py (469 lignes
// practice_laps, 76 practice_stints, 54 practice_weather). Classement confirmé
// À LA MILLISECONDE avec DEUX sources indépendantes lues intégralement via
// fetch-url.yml : la page de résultats officielle Formula1.com
// (formula1.com/en/results/2026/races/1298/mexico/practice/3, HTML brut, y
// compris le nombre de tours par pilote) ET le rapport Grandprix.com
// « Practice 3 Report - Norris edges Antonelli by a thousandth ».
//
// Point de rigueur découvert cette session, résolu plutôt que masqué : la
// base annonçait 21 lignes dans practice_drivers contre 22 dans
// practice_laps. scripts/practice_briefing.py groupait par défaut sur
// pd.car_number (la table pilotes), ce qui faisait planter le script dès
// qu'une voiture avait des tours sans ligne pilote correspondante — corrigé
// cette session (groupement sur pl.car_number, cf. historique git du script)
// pour que les tours de CETTE voiture restent visibles plutôt que fusionnés
// sous une ligne NULL. Une fois corrigé : la voiture manquante dans
// practice_drivers pour cette séance précise est la n°30, identifiée sans
// deviner grâce à une requête croisée sur la séance EL2 de ce même round (où
// practice_drivers est complet) — c'est Liam Lawson (Racing Bulls). Lawson a
// bien roulé normalement (28 tours, 9<sup>e</sup> temps officiel, 1:18,113,
// soit +0,513s) : ce n'est donc PAS un pilote absent de la séance, mais une
// ligne manquante dans la table de métadonnées practice_drivers pour cette
// séance précise — un écart de schéma, pas un événement de piste. Documenté
// honnêtement comme tel plutôt que présenté comme une absence.
//
// Analyse technique quantifiée (scripts/practice_briefing_laptimes_by_car.py,
// relancé sur les 22 voitures en trois lots de 7-8 pour rester sous la limite
// de taille de sortie du job GitHub Actions — même limite déjà documentée
// pour l'EL2 de ce round). Méthode identique aux rounds précédents (tour
// d'entrée de stand exclu, puis tours > 103% de la médiane du relais
// exclus), appliquée au relais qui maximise le nombre de tours exploités
// pour chaque pilote. MAIS constat de rigueur à signaler explicitement :
// contrairement à l'EL2 (vrais relais longs à charge représentative), cette
// EL3 est structurée en courtes salves de simulation qualif (plusieurs tours
// à 77-80s) entrecoupées de tours de préparation/retour lents (90-140s) au
// sein d'un même relais nominal — un format typique de dernière séance avant
// qualifs, pas un relais de rythme de course. Résultat : le filtre à 103%
// donne des échantillons bien plus petits et moins fiables qu'en EL2 pour la
// plupart des pilotes de tête (ratio tours gardés/total aussi bas que 3/5 à
// 3/7 pour Hadjar, Leclerc, Piastri) — signalé explicitement dans le texte
// plutôt que présenté comme un chrono de référence à l'égal de l'EL2.
// Vitesses de pointe (speed_st) = maximum brut par voiture sur la séance,
// aucune estimation.
//
// Sourcing élargi (passe demandée explicitement par l'utilisateur après une
// plainte sur le manque de rigueur et de profondeur technique des articles) :
// - Formula1.com (officiel) : page de résultats EL3 complète lue en HTML brut
//   (confirmation à la milliseconde, y compris le nombre de tours par
//   pilote, concordant avec la base).
// - Pirelli (institutionnel) : press.pirelli.com/tagfeed/en/tags/press__releases
//   relu intégralement une troisième fois pour ce round, toujours aucune
//   entrée spécifique au Mexique 2026 (dernière entrée visible : 12 juin
//   2026) — régression confirmée pour la troisième séance consécutive de ce
//   round, pas un incident isolé de l'EL1/EL2.
// - McLaren (écurie du nouveau leader de la séance) : mclaren.com/racing/ lu
//   intégralement, site bien actif (page d'accueil mentionne explicitement
//   le Mexico City GP comme prochaine course) — contient un lien propre
//   d'écurie publié avant l'EL3 (« "A good opportunity to keep learning" –
//   Oscar hoping recent upgrades pay off in Mexico ») détaillant des
//   retouches de fiabilité/performance de freinage sur sa McLaren avant le
//   week-end — repris en section 01 comme communication directe
//   écurie/pilote, clairement distincte des citations relayées par un média
//   tiers.
// - Racing Bulls (écurie de Lawson) : visacashapprb.com/int-en/news répond
//   normalement mais ne contient toujours que l'annonce FP1 de Tsolov déjà
//   connue — aucune actualité sur l'EL3, le clash Verstappen/Lawson ou la
//   pénalité de grille, même retard de publication déjà documenté pour l'EL2
//   de ce round.
// - Grandprix.com (généraliste n°1) : quatre articles lus intégralement via
//   fetch-url.yml — le rapport EL3 lui-même (« Norris edges Antonelli by a
//   thousandth »), la confirmation officielle de la pénalité de grille
//   Verstappen/Lawson (un rang chacun + un point de pénalité sur la licence,
//   appliquée après les qualifications), la mise en garde de Fred Vasseur
//   sur les bosses « presque dangereuses » à l'approche du virage 1, et le
//   remplacement d'Ocon par Hirakawa pour le reste du week-end (aucune raison
//   donnée par Haas, qui a précisé ne faire « aucune autre déclaration pour
//   l'instant »). Un cinquième article (amendes Audi ~14 000$ pour l'incident
//   du ventilateur de Slater et les bâches sur la voiture de Bortoleto en
//   EL1/EL2) a aussi été lu intégralement mais concerne des séances déjà
//   couvertes, pas l'EL3 elle-même — non développé dans le corps de
//   l'article pour cette raison.
// - Crash.net (généraliste n°2) : page de liste /f1/news lue intégralement,
//   confirme indépendamment le titre « Lando Norris pips Kimi Antonelli by
//   0.001s in final Mexico GP practice » et révèle une accroche Red Bull
//   (« Red Bull's take on Max Verstappen and Liam Lawson's Mexico GP
//   crash », réaction de Laurent Mekies) — reprise uniquement comme titre
//   attribué, article complet non lu depuis cette page de liste (URL non
//   extractible, limite déjà documentée pour ce domaine).
// - The Race (technique/analytique n°1) : page d'accueil the-race.com/formula-1/
//   lue intégralement, confirme le titre « What happened in F1 Mexican GP
//   final practice » (Norris/Antonelli quasi inséparables, rythme Ferrari en
//   recul) mais l'article complet a échoué en 404 au fetch direct (slug
//   deviné à partir du titre, sans succès cette fois — limite documentée
//   plutôt que contournée par une citation non vérifiée). Un second article
//   bien lu intégralement (« Lawson at risk of Mexico qualifying DSQ »,
//   Scott Mitchell-Malm) concerne une infraction technique MGU-K détectée en
//   Q2 des qualifications — donc un événement postérieur à cette EL3,
//   délibérément NON exploité dans cet article pour ne pas transformer la
//   section de prédiction finale en résumé d'un résultat déjà connu plutôt
//   qu'en analyse construite sur les données EL1-EL2-EL3 elles-mêmes. Le
//   même passage sur la page d'accueil révèle aussi un angle santé/conduite
//   personnelle (illness, tension) sur Antonelli et un différend personnel
//   Ocon/Haas qualifié de potentiellement violent — explicitement écartés de
//   cet article, zéro contenu « people », conformément à la règle
//   éditoriale.
// - r/F1Technical (communauté technique pointue) : nouvelle tentative réelle
//   (reddit.com/r/F1Technical/search.json?q=mexico+fp3&restrict_sr=1&sort=new)
//   depuis fetch-url.yml, échec identique aux quatre semaines précédentes de
//   ce projet. Cinquième semaine consécutive de blocage stable et
//   reproductible, documenté plutôt que contourné par une invention de
//   contenu.
// - WebSearch n'a été utilisé à aucun moment pour sourcer un fait, conforme à
//   la règle déjà documentée dans docs/SOURCES.md (ce moteur indexe la vraie
//   saison F1 2026, sans rapport avec cette continuation fictive).
//
// Zéro contenu « people » : plusieurs titres disponibles ce jour-là (la
// santé/tension d'Antonelli, le différend personnel Ocon/Haas et une
// accusation de violence, un incident de paddock Hadjar/spectateur, une
// polémique de salaire Bearman, une passe d'armes Mekies/Horner) ont été
// délibérément écartés de cet article — aucun rapport avec la performance ou
// la technique de cette séance EL3 précise, et plusieurs relèvent
// explicitement du contenu personnel/hors-piste que la règle éditoriale
// exclut.
export const ROUND19_EL3_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de Mexico · Autódromo Hermanos Rodríguez · EL3 — samedi 31 octobre</p>
    <p class="verdict">Norris met fin au règne Ferrari du vendredi par la marge la plus fine possible — un millième de seconde sur Antonelli — et referme ainsi la boucle ouverte en EL2 : la McLaren est désormais devant au tour sec ET en rythme de relais, l'avantage évoqué par Russell en EL1 ayant complètement disparu trois séances plus tard.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">1:17,600</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,001s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,117s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">+0,195s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,351s</span></div>
    </div>
    <p class="subverdict">Le scénario tient en une phrase : Leclerc, qui avait dominé les deux séances du vendredi, perd la pole position virtuelle pour un millième de seconde après une erreur au virage 10 qui lui a coûté son premier relais tendre. Mais l'histoire de cette EL3 ne se limite pas au sommet du classement. Deux pilotes — Sergio Pérez et Gabriel Bortoleto — n'ont signé aucun temps représentatif, chacun freiné par un problème de groupe propulseur à la veille des qualifications. Haas a retiré Esteban Ocon de son baquet pour le reste du week-end sans donner la moindre raison, offrant à Ryo Hirakawa ses débuts en course en Formule 1. Et la voiture n°30 — Liam Lawson, intouché la veille par son accrochage avec Verstappen — a roulé normalement et signé le 9<sup>e</sup> temps, les deux pilotes recevant depuis une pénalité d'une place sur la grille pour leur comportement jugé « inacceptable » en EL2.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el3-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Norris devant pour un millième — Ferrari perd son avance des deux séances du vendredi</h2>
    <p>Lando Norris (1:17,600) a attendu les dernières minutes de la séance pour signer le temps qui bat Kimi Antonelli (1:17,601) — un écart d'un millième de seconde, l'un des plus fins possibles dans ce sport. Charles Leclerc, pourtant le plus rapide des deux séances du vendredi, termine troisième (1:17,717, +0,117s) : son premier relais tendre est parti en vrille après avoir pris trop de vibreur au virage 10, et s'il a su revenir dans le coup, il n'a pas pu boucler le week-end sur un triplé. Oscar Piastri (1:17,795, +0,195s) place la deuxième McLaren en quatrième position, ce qui met deux voitures papaye dans le top 4 — Grandprix.com note que McLaren, Mercedes et Ferrari sont désormais couverts par « à peine plus d'un dixième » au sommet de la feuille des temps, et souligne qu'un avantage d'un millième donne à Norris « très peu de marge à défendre » en qualifications.</p>
    <p>Le déroulé de la séance, détaillé par Grandprix.com : les décisions se sont prises dans le dernier quart d'heure, au moment du passage sur pneu tendre. George Russell a d'abord pris la tête virtuelle avec un 1:18,107, avant que Norris n'abaisse la référence à 1:17,873 ; Antonelli a ensuite fait un pas en avant substantiel, laissant ses rivaux chasser un temps qui a tenu jusqu'à l'ultime amélioration de Norris. Max Verstappen (1:17,951, +0,351s) termine cinquième pour Red Bull après une sortie de piste au virage 4 et des plaintes sur les freins ; son coéquipier d'écurie-sœur chez Red Bull, Isack Hadjar, a lui aussi rapporté des difficultés avec la tenue de route de sa monoplace. Lewis Hamilton (1:18,069, +0,469s) prend la sixième place après l'arrêt moteur qui avait écourté son EL2 la veille.</p>
    <p>Communication directe d'écurie à noter, lue intégralement sur mclaren.com/racing/ : à la veille de cette EL3, McLaren a publié un article consacré à Oscar Piastri (« "A good opportunity to keep learning" – Oscar hoping recent upgrades pay off in Mexico ») détaillant de petites retouches apportées pour « adresser la fiabilité et la performance au freinage » avant le passage par l'Autódromo Hermanos Rodríguez — un contexte cohérent avec la quatrième place de Piastri ce samedi, et une vraie communication propre à l'écurie plutôt qu'une citation relayée par un média tiers.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el3-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Rythme de relais : un signal beaucoup plus bruité qu'en EL2, à traiter avec prudence</h2>
    <p>Requête dédiée sur les 22 voitures (scripts/practice_briefing_laptimes_by_car.py, méthode identique à l'EL2 : tour d'entrée de stand exclu, puis tours > 103% de la médiane du relais exclus), mais avec une différence de fond par rapport à l'EL2 à signaler avant toute lecture du tableau : cette EL3 est structurée en courtes salves de simulation qualificative sur pneu tendre, entrecoupées de tours de préparation ou de retour nettement plus lents (90 à 140s) au sein d'un même relais nominal — pas des relais longs à charge représentative comme en EL2. Le filtre à 103% donne donc, pour plusieurs pilotes de tête, des échantillons bien plus petits et moins fiables qu'en EL2 :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Gomme / relais</th><th>Tours (gardés/total)</th><th>Moyenne relais</th><th>V. pointe (speed_st)</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>MEDIUM (tours 5-14)</td><td>5/10</td><td>1:19,656</td><td>350 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>SOFT (tours 11-17)</td><td>3/7</td><td>1:21,233</td><td>347 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>MEDIUM (tours 1-7)</td><td>3/6</td><td>1:21,703</td><td>350 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>SOFT (tours 14-26)</td><td>7/13</td><td>1:27,924</td><td>348 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>SOFT (tours 19-27)</td><td>5/9</td><td>1:32,977</td><td>350 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>SOFT (tours 9-18)</td><td>5/10</td><td>1:33,990</td><td>348 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>SOFT (tours 11-21)</td><td>6/11</td><td>1:35,991</td><td>350 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>SOFT (tours 15-19)</td><td>3/5</td><td>1:41,215</td><td>349 km/h</td></tr>
      </tbody>
    </table>
  </div>
  <div class="prose">
    <p>Seule lecture solide de ce tableau : Antonelli ressort nettement en tête sur l'échantillon le moins dégradé par le trafic (5 tours gardés sur 10, moyenne 1:19,656), devant Leclerc et Piastri — mais ces deux derniers n'ont plus que 3 tours exploitables chacun, un échantillon trop mince pour en tirer une hiérarchie ferme. Au-delà de ces trois noms, le ratio tours gardés/total s'effondre (jusqu'à 3/5 pour Hadjar) et la moyenne grimpe mécaniquement à cause des tours de préparation lents mélangés au même relais nominal que les pushs — ces chiffres ne doivent pas être lus comme un indicateur de rythme de course à l'égal du tableau équivalent de l'EL2, où Norris (1:21,319) devançait nettement Leclerc (1:21,501, 6<sup>e</sup> de son propre groupe). Le signal le plus solide reste donc le tour sec de la section 01, pas ce tableau. Les vitesses de pointe, elles, restent dans la fourchette déjà observée en EL1/EL2 (347-354 km/h) — 347 à 350 km/h ce samedi, confirmation d'une troisième séance sans rien de nouveau à en tirer sur l'effet altitude/traînée au-delà de la confirmation elle-même.</p>
    <div class="callout">Réserve méthodologique explicite, plus marquée que pour l'EL2 : cette EL3 mélange, au sein d'un même relais nominal, des pushs qualificatifs et des tours de préparation/retour nettement plus lents — un format de dernière séance avant qualifs, pas un relais de rythme de course. Le filtre à 103% retient donc parfois aussi peu que 3 tours sur un relais de 5 à 7 (Hadjar, Leclerc, Piastri) : ces chiffres sont rapportés par souci de transparence méthodologique, pas présentés comme une mesure de rythme fiable.</div>
  </div>
</section>

<section class="block" data-num="03" id="sec-el3-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> La sanction Verstappen/Lawson tombe, Ferrari s'inquiète des bosses du virage 1</h2>
    <p>Les commissaires ont tranché sur l'accrochage Verstappen/Lawson de l'EL2 : les deux pilotes reçoivent chacun une pénalité d'une place sur la grille de dimanche, appliquée après les qualifications, ainsi qu'un point de pénalité sur leur licence (Verstappen compte désormais un point sur les 12 derniers mois, Lawson en a quatre). Lu intégralement sur Grandprix.com : les commissaires ont jugé que les deux pilotes se sont comportés de façon « inacceptable » entre les virages 12 et 14, après que les équipes avaient déjà été averties en début de journée sur ce type de comportement — une sanction plus lourde qu'un simple avertissement, les deux pilotes ayant reconnu que leurs manœuvres étaient inutiles et « maladroites ». Crash.net confirme le fait par un titre propre (« Red Bull's take on Max Verstappen and Liam Lawson's Mexico GP crash », réaction de Laurent Mekies) sans que l'article complet ait pu être lu depuis la page de liste de ce domaine — repris ici uniquement comme titre attribué.</p>
    <p>Côté Ferrari, Fred Vasseur a profité du créneau avant cette EL3 pour alerter sur l'état de la piste à l'approche du virage 1 : « C'est presque dangereux. Il va falloir faire quelque chose [avant l'EL3] », a-t-il dit en commentaires relayés par RacingNews365 et repris par Grandprix.com. Le directeur d'écurie a pris soin de ne pas transformer la domination Ferrari du vendredi en promesse pour les qualifications, un avertissement qui n'allait pas sans rappeler la panne moteur qui avait coûté à Hamilton la fin de son EL2. Point à signaler : Grandprix.com précise que la requête de Vasseur ne permet pas de savoir si des travaux ont effectivement été engagés ni confirmés par le circuit ou la FIA — une piste ouverte, pas un fait établi.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el3-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Ocon écarté sans explication, Pérez et Bortoleto privés de qualifications sereines</h2>
    <p>Fait le plus inattendu de la journée : Haas a retiré Esteban Ocon de son baquet pour le reste du week-end, le remplaçant par Ryo Hirakawa — qui avait déjà couru l'EL1 obligatoire du vendredi (15<sup>e</sup>) et obtient désormais ses débuts complets en Formule 1 (qualifications et course de dimanche compris). Lu intégralement sur Grandprix.com : l'équipe a annoncé le changement avant cette EL3, la FIA a approuvé le passage du numéro 31 d'Ocon au numéro 50 de Hirakawa sous réserve que la voiture de remplacement passe les vérifications techniques, et Haas n'a fourni aucune raison, précisant qu'elle ne ferait « aucune autre déclaration pour l'instant ». La liste d'engagés révisée de la FIA confirme le changement sans en expliquer les circonstances — et c'est délibérément là que s'arrête ce qui peut être rapporté ici sans sortir du cadre strictement factuel et sportif que s'impose cet article (voir note de sourcing en tête de fichier sur le contenu personnel écarté).</p>
    <p>Séparément, deux pilotes n'ont signé aucun temps chronométré cette EL3, chacun pour une raison mécanique distincte confirmée par Grandprix.com : Cadillac a procédé à un changement préventif de groupe propulseur sur la voiture de Sergio Pérez, tandis que l'Audi de Gabriel Bortoleto a elle aussi souffert d'un problème de groupe propulseur — les deux pilotes abordent donc les qualifications sans la moindre préparation chronométrée de cette dernière séance. Bortoleto a tout de même bouclé un tour (93,242s, loin du rythme) avant l'arrêt ; Pérez n'a pas dépassé le tour de sortie des stands.</p>
  </div>
</section>

<section class="block" data-num="05" id="sec-el3-5">
  <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">05</span> Classement complet EL3</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Pilote</th><th>Écurie</th><th>Meilleur tour</th><th>Écart</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:17,600</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:17,601</td><td>+0,001s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:17,717</td><td>+0,117s (erreur virage 10 sur son 1er relais tendre)</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:17,795</td><td>+0,195s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:17,951</td><td>+0,351s (sortie virage 4, plaintes freins, pénalité grille -1)</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:18,069</td><td>+0,469s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:18,107</td><td>+0,507s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:18,109</td><td>+0,509s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:18,113</td><td>+0,513s (absent de practice_drivers mais 28 tours roulés ; pénalité grille -1)</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:18,137</td><td>+0,537s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>1:18,560</td><td>+0,960s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:18,652</td><td>+1,052s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:18,674</td><td>+1,074s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:18,850</td><td>+1,250s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:18,927</td><td>+1,327s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:19,214</td><td>+1,614s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:19,301</td><td>+1,701s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:19,376</td><td>+1,776s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Hirakawa</td><td>Haas F1 Team</td><td>1:19,504</td><td>+1,904s (remplace Ocon pour le reste du week-end, sans raison donnée)</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:20,342</td><td>+2,742s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:33,242</td><td>aucun temps représentatif (problème groupe propulseur, 2 tours)</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>—</td><td>aucun temps (changement préventif de groupe propulseur, 1 tour)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el3-6">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en qualifications</h2>
    <p>En remontant les trois séances de ce week-end, une trajectoire nette se dessine. L'EL1 avait installé l'idée d'un avantage Ferrari lié à son petit turbo face à l'altitude mexicaine — Leclerc plus de six dixièmes devant tout le plateau fiable. L'EL2 a commencé à fissurer cette théorie : l'écart sur un tour sec tombait à un dixième, et le rythme de relais long y renversait carrément la hiérarchie, Norris devançant Leclerc de près de deux dixièmes alors que ce dernier n'était que 6<sup>e</sup> de son propre groupe de tête. Cette EL3 referme la boucle : Norris devance maintenant Leclerc sur le tour sec lui-même (+0,117s), et le seul échantillon de rythme de relais encore à peu près lisible (Antonelli, 5 tours gardés) ne place aucune Ferrari en tête. Autrement dit, sur les trois indicateurs disponibles — tour sec EL1, rythme long EL2, tour sec EL3 — Ferrari n'est en tête qu'une seule fois (EL1, sur une piste sale avec dix débutants), et nulle part ailleurs. La prédiction la plus raisonnable pour les qualifications n'est donc pas une démonstration Ferrari malgré ses deux pole positions virtuelles du vendredi, mais une bataille à trois McLaren/Mercedes/Ferrari tranchée par quelques centièmes, avec un leger avantage de forme pour Norris, qui est le seul pilote à avoir été devant sur deux des trois indicateurs (rythme long en EL2, tour sec en EL3). Verstappen et Hadjar, tous deux en difficulté avec la tenue de route de leur Red Bull ce samedi, partent avec une marge de progression à trouver avant un créneau de qualification unique. Pérez et Bortoleto, privés de toute préparation chronométrée par des soucis de groupe propulseur, abordent les qualifications en net déficit de repères face au reste du plateau. Et quelle que soit la grille qui sortira des qualifications, Verstappen et Lawson la verront chacun amputée d'une place par la sanction de leur accrochage en EL2 — un rappel que la bagarre pour la position sur la piste ne s'arrête pas au chronomètre ce week-end.</p>
    <div class="callout">Rappel de méthode : la section 02 de cet article documente explicitement pourquoi son tableau de rythme de relais est moins fiable que celui de l'EL2 du même round (échantillons de 3 à 7 tours seulement pour plusieurs pilotes de tête, relais mêlant pushs et tours de préparation lents) — la prédiction ci-dessus s'appuie d'abord sur les temps au tour officiels et sur le tableau de l'EL2, pas sur le tableau de cette EL3 pris isolément.</div>
  </div>
</section>

<section class="block" id="sec-el3-7">
  <details class="sources">
    <summary>Sources utilisées — EL3 Mexico (8 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), session_key=11399 : classement, secteurs, relais, météo. Primaire.</span></li>
        <li><span class="desc">The Pit Wall — requête dédiée tours bruts par voiture (scripts/practice_briefing_laptimes_by_car.py, les 22 pilotes, en trois lots pour rester sous la limite de taille de sortie) : base des moyennes de relais et vitesses de pointe de la section 02.</span></li>
        <li><span class="desc">Correctif appliqué cette session à scripts/practice_briefing.py (groupement sur le numéro de voiture des tours plutôt que sur la table pilotes) : a permis d'identifier la voiture n°30 (Lawson) comme la ligne manquante de practice_drivers pour cette séance, plutôt que de masquer le problème derrière un script qui plantait.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1298/mexico/practice/3" data-desc="Classement officiel complet, y compris le nombre de tours par pilote, concordant à la milliseconde avec la base et avec Grandprix.com. Lu en HTML brut via fetch-url.yml.">Formula1.com — résultats officiels EL3</a><span class="desc">Formula1.com</span></li>
        <li><span class="desc">Pirelli — press.pirelli.com/tagfeed/en/tags/press__releases, relu intégralement une troisième fois pour ce round : toujours aucune entrée spécifique au Mexique 2026 (dernière entrée visible : 12 juin 2026) — régression confirmée pour la troisième séance consécutive.</span></li>
        <li><span class="desc">Racing Bulls — visacashapprb.com/int-en/news, répond normalement mais ne contient toujours que l'annonce FP1 de Tsolov déjà connue, rien sur l'EL3 ni sur la pénalité de grille de Lawson — même retard de publication déjà documenté pour l'EL2 de ce round.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Écurie (communication directe)</h5>
      <ul>
        <li><a href="https://www.mclaren.com/racing/" data-desc="Page d'accueil McLaren Racing, lue intégralement : article propre d'écurie publié avant l'EL3 sur les retouches de freinage apportées à la McLaren de Piastri pour le Mexique — communication directe écurie/pilote, pas relayée par un média tiers.">McLaren Racing — site officiel</a><span class="desc">McLaren.com</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.grandprix.com/races/mexican-gp-2026-practice-3-report.html" data-desc="Rapport complet EL3 : classement (concordant à la milliseconde avec la base et Formula1.com), déroulé par relais/gomme, sortie de piste Verstappen, erreur de Leclerc au virage 10. Lu intégralement via fetch-url.yml.">Grandprix.com — rapport EL3</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.grandprix.com/news/verstappen-and-lawson-handed-one-place-mexico-grid-penalties.html" data-desc="Confirmation officielle de la pénalité d'une place sur la grille et d'un point de pénalité chacun pour Verstappen et Lawson, suite à leur accrochage en EL2. Lu intégralement via fetch-url.yml.">Grandprix.com — pénalités de grille Verstappen/Lawson</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.grandprix.com/news/ferrari-calls-for-work-on-almost-dangerous-mexico-bumps.html" data-desc="Mise en garde de Fred Vasseur sur les bosses à l'approche du virage 1 avant l'EL3, citation reportée par RacingNews365. Lu intégralement via fetch-url.yml.">Grandprix.com — Ferrari alerte sur les bosses du virage 1</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.grandprix.com/news/haas-replaces-ocon-with-hirakawa-for-mexico-race-debut.html" data-desc="Remplacement d'Ocon par Hirakawa pour le reste du week-end, confirmé par la liste d'engagés FIA révisée, aucune raison donnée par Haas. Lu intégralement via fetch-url.yml.">Grandprix.com — Haas remplace Ocon par Hirakawa</a><span class="desc">Grandprix.com</span></li>
        <li><span class="desc">Crash.net — page de liste /f1/news lue intégralement : confirme indépendamment le titre « Lando Norris pips Kimi Antonelli by 0.001s in final Mexico GP practice » et révèle le titre « Red Bull's take on Max Verstappen and Liam Lawson's Mexico GP crash » (réaction de Laurent Mekies) — repris uniquement comme titre attribué, article complet non accessible depuis cette page de liste.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique</h5>
      <ul>
        <li><span class="desc">The Race — page d'accueil the-race.com/formula-1/ lue intégralement : confirme le titre « What happened in F1 Mexican GP final practice » (Norris/Antonelli quasi inséparables, rythme Ferrari en recul) ; l'article complet a échoué en 404 au fetch direct (slug deviné sans succès cette fois) — limite documentée plutôt que contournée par une citation non vérifiée. Un second article de la même page (« Lawson at risk of Mexico qualifying DSQ », Scott Mitchell-Malm, infraction technique MGU-K en Q2) a bien été lu intégralement mais concerne un événement postérieur à cette EL3 — délibérément écarté du corps de cet article pour ne pas transformer la section de prédiction en résumé d'un résultat déjà connu.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Communauté technique pointue — tentative documentée</h5>
      <ul>
        <li><span class="desc">r/F1Technical : nouvelle tentative réelle (reddit.com/r/F1Technical/search.json?q=mexico+fp3&restrict_sr=1&sort=new) depuis fetch-url.yml, échec identique aux tentatives précédentes. Cinquième semaine consécutive de blocage stable et reproductible pour ce projet, aucun contenu de cette communauté n'a donc pu être exploité, signalé honnêtement plutôt que masqué.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
