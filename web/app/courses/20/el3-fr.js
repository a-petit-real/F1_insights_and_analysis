// Analyse EL3 — Grand Prix de São Paulo (Interlagos), round 20, saison 2026.
// Prolonge directement l'EL1 et l'EL2 du même round (web/app/courses/20/
// el1-fr.js, el2-fr.js) : aucune contradiction volontaire avec leur contenu
// (évolution aéro exclusive McLaren, écart de rythme long qui s'était réduit
// en EL2, promotion de Câmara chez Haas, pénalité de grille déjà choisie par
// Russell, enjeu titre constructeurs Mercedes/Ferrari, retour d'Hülkenberg
// annoncé pour l'EL3 après son absence totale en EL2).
//
// *** CORRECTIF DE RIGUEUR IMPORTANT, à documenter pour la suite du round ***
// L'EL2 de ce round (el2-fr.js) désigne à plusieurs reprises la voiture de
// Nico Hülkenberg comme la « voiture n°98 ». Vérification directe cette
// passe, PAS supposée exacte par défaut : scripts/practice_briefing.py
// (session_key=11407, données brutes ingérées) donne sans ambiguïté
// Hülkenberg au volant de la voiture n°27. Confirmation indépendante
// supplémentaire, obtenue SANS dépendre du tableau de classement lui-même :
// la page Formula1.com de résultats EL3, tronquée avant son tableau (limite
// déjà documentée), précharge dans son <head> les images pilotes dans
// l'ordre exact du classement (même tactique que celle déjà documentée pour
// l'EL2 de ce round) — l'identifiant "nichul01" (Nico Hülkenberg) y apparaît
// à la 13e position, cohérent avec son n°27 réel, jamais de "98". Aucune
// trace nulle part (base, Formula1.com, Grandprix.com, The Race) d'un
// quelconque numéro "98" cette saison. Le "98" de l'EL2 est donc traité ici
// comme une erreur de cette passe de rédaction antérieure, corrigée dans cet
// article (Hülkenberg = voiture n°27) et signalée telle quelle dans
// docs/SOURCES.md plutôt que silencieusement répétée — les fichiers el1-fr.js
// et el2-fr.js eux-mêmes n'ont pas été retouchés (hors périmètre de cette
// tâche), mais ne pas reproduire cette erreur dans un article futur du round.
//
// Données de séance : donnée primaire = pipeline OpenF1 (session_key=11407,
// Practice 3, 2026-11-07 14:30->15:30 UTC, 478 tours/22 pilotes), ingestion
// déjà confirmée réelle avant cette passe de rédaction. Classement/secteurs/
// relais/météo vérifiés directement depuis la base via
// scripts/practice_briefing.py. Classement confirmé indépendamment par DEUX
// sources narratives lues intégralement via fetch-url.yml (Grandprix.com,
// The Race) ET par l'ordre des images préchargées de la page Formula1.com
// (voir correctif ci-dessus) — triple confirmation, cohérente au millième.
//
// Analyse technique quantifiée (scripts/practice_briefing_laptimes_by_car.py,
// 6 voitures : VER/ANT/NOR/RUS/LEC/PIA, le cluster de tête explicitement
// demandé pour trancher la question ouverte par l'EL1 et affinée par l'EL2 —
// l'avantage de rythme long McLaren tient-il dans la séance la plus chaude du
// week-end ?). Méthode IDENTIQUE à l'EL1/EL2 et aux rounds précédents : pour
// chaque relais (table practice_stints), le premier tour (sortie de stand)
// est exclu systématiquement, le dernier tour n'est exclu QUE si ce n'est pas
// le tout dernier relais du pilote sur la séance, puis les tours restants
// > 103% de la médiane du relais sont écartés. Constat de rigueur central,
// vérifié tour par tour sur les données brutes et PAS deviné : cette EL3 est
// structurée en courtes salves de simulation qualificative (3 à 11 tours par
// relais nominal, mêlant tours de poussée et tours de préparation/retour bien
// plus lents) — exactement le même format que l'EL3 du round 19 (Mexico),
// documenté à l'identique dans docs/SOURCES.md. Conséquence directe : les
// relais ouverture MEDIUM de Verstappen/Antonelli/Norris ne gardent qu'1 à 2
// tours après filtrage (quasiment un tour unique, pas une moyenne de relais),
// tandis que ceux de Russell/Leclerc/Piastri, nominalement plus longs (8 à 11
// tours), gardent 4 à 5 tours mais restent eux-mêmes un mélange de tours de
// poussée (~73s) et de tours nettement plus lents (~93-97s) qui passent le
// filtre à 103% simplement parce que la médiane du relais est elle-même
// gonflée par ces tours lents. Les deux lectures (tableau de moyennes de
// relais ET lecture alternative du meilleur tour conservé par pilote sur ce
// relais MEDIUM, calculée en complément pour isoler le signal de pure
// performance de la contamination par le trafic/les tours de préparation)
// sont présentées explicitement comme telles dans le texte, avec la
// conclusion honnête que cette EL3 ne permet PAS de trancher la question
// ouverte en EL1/EL2 avec la même rigueur qu'un relais long classique — le
// tour sec de la section 01 reste le signal le plus solide de cette séance.
//
// Sourcing élargi (minimum 4 sources indépendantes pour une EL3, 2
// généralistes + 2 technique/analytique, + institutionnel + communication
// directe pilote, conformément à docs/OPERATIONS.md) :
// - Formula1.com (officiel) : page de résultats EL3 complète
//   (formula1.com/en/results/2026/races/1299/sao-paulo/practice/3, HTML brut
//   via fetch-url.yml, id de course 1299 déjà confirmé pour ce round) — titre
//   de page exact "FORMULA 1 MSC CRUISES GRANDE PRÊMIO DE SÃO PAULO 2026 -
//   PRACTICE 3" et ordre des images préchargées cohérent au pilote avec le
//   classement (voir correctif Hülkenberg ci-dessus). Tableau de classement
//   lui-même hors de la fenêtre de troncature récupérée (limite déjà
//   documentée pour ce domaine).
// - Pirelli (institutionnel) : press.pirelli.com/tagfeed/en/tags/
//   press__releases relu intégralement une quatrième fois pour ce round —
//   toujours aucune entrée spécifique à São Paulo 2026 (dernière entrée
//   pertinente antérieure au week-end, 12 juin 2026) — régression déjà
//   documentée pour l'EL1/EL2 de ce round, confirmée une fois de plus.
// - McLaren Racing (institutionnel) : mclaren.com/racing/ lu intégralement —
//   actif, confirme le round en cours, mais la quasi-totalité du contenu
//   "Samedi" visible sur cette page porte sur les qualifications déjà
//   disputées dans notre chronologie réelle (hors-cadre pour cet article,
//   écrit comme s'il précédait les qualifications) — DÉLIBÉRÉMENT NON
//   EXPLOITÉ : seuls les titres antérieurs au samedi ("Samba steps forward",
//   récap EL1/EL2 vendredi ; "The Briefing", questions-clés du week-end) ont
//   été retenus comme confirmation d'activité du site, sans qu'aucun contenu
//   de qualifications n'ait été copié, cité ou paraphrasé nulle part dans cet
//   article.
// - Mercedes (mercedesamgf1.com/en/news/) : nouvel échec, HTTP 404 explicite
//   — même mode d'échec déjà documenté pour l'EL2 de ce round.
// - Ferrari (ferrari.com/en-EN/formula1) : nouvel échec, HTTP 403 explicite
//   cette fois — encore un mode d'échec différent de ceux déjà documentés
//   pour les rounds précédents (échec réseau générique, succès JS-sans-texte,
//   403 déjà vus) ; confirme une fois de plus qu'aucun mode d'échec sur ce
//   domaine n'est permanent ou prévisible.
// - Oracle Red Bull Racing (institutionnel, écurie en tête de cette séance) :
//   redbullracing.com/int-en lu intégralement — actif, confirme le round en
//   cours, affiche un lien vidéo "Hear from Max after Saturday at Interlagos"
//   daté du samedi — NON VISIONNÉ et non utilisé comme source de citation
//   (risque de contenu post-qualifications hors cadre de cet article), retenu
//   uniquement comme confirmation que le site reste actif ce week-end.
// - Haas F1 Team (institutionnel) : haasf1team.com lu intégralement — actif,
//   mais affiche encore un bloc "The drivers #31 Esteban Ocon / #87 Ollie
//   Bearman" daté du 7 novembre à côté du lien "São Paulo Grand Prix:
//   Qualifying Recap" — gabarit de page visiblement non mis à jour après la
//   promotion de Câmara (déjà actée en EL1/EL2 de ce round) plutôt qu'un
//   désaveu de cette information ; le lien "Qualifying Recap" lui-même n'a
//   PAS été ouvert (hors cadre chronologique de cet article). Gap
//   institutionnel documenté comme tel.
// - Audi (institutionnel, écurie d'Hülkenberg) : audif1.com/en lu
//   intégralement — actif (configurateur R26, contenu São Paulo générique)
//   mais aucune mention datée du retour en piste d'Hülkenberg en EL3 ni de
//   l'achèvement des réparations annoncées en EL2 — gap institutionnel
//   documenté une fois de plus sur ce domaine.
// - Aston Martin (institutionnel, écurie de Stroll) : astonmartinf1.com/en-GB
//   lu intégralement — actif mais aucun contenu daté sur le problème
//   d'ERS de Stroll en EL3 — gap institutionnel.
// - Grandprix.com (généraliste n°1) : SIX articles complets lus intégralement
//   via fetch-url.yml — le rapport EL3 lui-même ("Practice 3 Report -
//   Verstappen edges Antonelli by 0.025s"), l'article dédié aux problèmes
//   d'Hamilton ("Hamilton's Brazil problems deepen as smoke ends final
//   practice"), celui sur l'incident Pérez ("Cadillac warned after Perez
//   throws loose cockpit part onto track"), celui détaillant l'ensemble des
//   pénalités de grille confirmées avant les qualifications ("Russell,
//   Hamilton and Verstappen face Brazil grid penalties"), celui sur le
//   réprimande de Câmara ("Camara reprimanded after dangerous Leclerc
//   incident", qui referme le point laissé en suspens par l'EL2 de ce round)
//   et celui sur le badinage Verstappen/embrayage ("Verstappen threatens his
//   clutch with punishment in Brazil", qui prolonge sans la répéter la
//   citation radio déjà utilisée en EL2). Titres explicitement écartés de
//   cette liste malgré leur présence dans le flux "Other stories" de
//   Grandprix.com car relatifs aux qualifications déjà disputées dans notre
//   chronologie réelle (hors cadre de cet article, écrit comme s'il les
//   précédait) : "Russell says aborted lap cost him a shot at Brazil pole",
//   "Qualifying Report - Norris beats the rain to Brazil pole", "Brazil
//   qualifying resumes after torrential rain delay", "Qualifying Results",
//   "Saturday Photos", "Saturday Team Quotes" — AUCUN n'a été ouvert ni
//   paraphrasé. Également écarté : "Antonelli eyes a championship car
//   purchase as parents watch his spending" (contenu "people"/finances
//   personnelles, exclu par la règle éditoriale).
// - Crash.net (généraliste n°2) : page de liste /f1/news lue intégralement —
//   confirme indépendamment le titre "Verstappen tops Brazil GP FP3 as
//   Hamilton suffers engine trouble" et "Perez faces investigation for
//   unusual incident in Brazil GP practice", recoupant Grandprix.com sur ces
//   deux points (URL d'article individuel non extractible de cette page de
//   liste, limite déjà documentée pour ce domaine).
// - The Race (technique/analytique n°1) : DEUX articles complets lus
//   intégralement, retrouvés via la tactique déjà documentée (page d'accueil
//   the-race.com/formula-1/ en --raw, recherche des href de slugs) — le
//   compte-rendu EL3 ("What happened in final Brazil F1 practice", Josh
//   Suttill, classement complet concordant au millième avec la base et
//   Grandprix.com) et l'article de contexte post-EL2/pré-EL3 ("Hamilton set
//   for Brazil grid penalty after Ferrari's worst 2026 Friday", Josh
//   Suttill/Jon Noble) qui donne le tableau de rythme long EL2 de Ferrari
//   (utile pour resituer pourquoi Ferrari aborde cette EL3 sous pression,
//   sans rouvrir la storyline EL2 elle-même). Titres explicitement écartés de
//   la page d'accueil car relatifs aux qualifications déjà disputées : "F1
//   2026 Brazilian GP qualifying results", "Brazilian GP qualifying
//   red-flagged almost immediately due to rain", "Norris on Brazilian GP pole
//   as Russell rages at Mercedes over aborted lap", "F1 2026 Brazilian Grand
//   Prix starting grid with four penalties (copy)", "Leclerc joins growing
//   list of Brazilian GP grid peanlties", "Lewis Hamilton gets back of the
//   grid penalty for Brazilian GP", "Max Verstappen set to start from the
//   back at F1's Brazilian GP", "Why Russell's pole was lost either way",
//   "Winners and losers from F1 2026 Brazilian GP qualifying" — AUCUN n'a été
//   ouvert ni paraphrasé.
// - Autosport (technique/analytique n°2) : page de liste /f1/news lue
//   intégralement — confirme indépendamment le titre "F1 Brazilian GP:
//   Verstappen edges out Antonelli to top FP3 as Hamilton hits mechanical
//   trouble" (URL d'article individuel non extractible, même limite que
//   Crash.net).
// - r/F1Technical (communauté technique pointue) : nouvelle tentative réelle
//   (reddit.com/r/F1Technical/search.json?q=brazil+fp3&restrict_sr=1&sort=new)
//   depuis fetch-url.yml, échec identique (HTTP 403) — blocage anti-bot déjà
//   documenté pour toutes les séances précédentes de la saison, confirmé une
//   fois de plus.
// - Communication directe pilote : DEUX tentatives réelles et explicitement
//   documentées, toutes deux infructueuses — instagram.com/mercedesamgf1
//   (HTTP 429) et x.com/redbullracing (HTTP 403), ni l'un ni l'autre
//   accessible depuis fetch-url.yml cette passe. Aucun canal propre pilote
//   (Instagram/X personnel) n'a par ailleurs été identifié par Grandprix.com
//   ou The Race pour cette séance précise (contrairement à l'EL1/EL2 de ce
//   round, où Russell en fournissait un). Faute d'alternative trouvée malgré
//   ces tentatives réelles, cet article ne contient PAS de communication
//   directe pilote au sens strict de la règle éditoriale — gap honnêtement
//   documenté plutôt que comblé par une citation de conférence de presse ou
//   de radio broadcast présentée à tort comme telle. Les citations de
//   Verstappen et Pérez utilisées en section 03/04 sont toutes deux des
//   messages radio captés par la diffusion officielle et relayés par un
//   média (Grandprix.com/The Race) — explicitement non étiquetées
//   "communication directe" dans le texte, par cohérence avec la distinction
//   déjà appliquée en EL1/EL2 de ce round.
// - WebSearch n'a été utilisé à aucun moment pour sourcer un fait de cet
//   article, conformément à la règle déjà établie dans docs/SOURCES.md.
//
// Zéro contenu « people » : "Antonelli eyes a championship car purchase as
// parents watch his spending" (Grandprix.com) a été vu dans le flux mais
// délibérément écarté — dépenses personnelles d'un pilote et de ses parents,
// hors du cadre performance/technique/stratégie de cet article.
export const ROUND20_EL3_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix de São Paulo · Autódromo José Carlos Pace (Interlagos) · EL3 — samedi 7 novembre</p>
    <p class="verdict">Verstappen prend la tête pour la première fois du week-end, pour vingt-cinq millièmes sur Antonelli — mais la vraie nouvelle de cette dernière heure avant les qualifications tient à ce qui s'est passé plus loin dans la feuille des temps : Hamilton quitte sa Ferrari fumante après seulement sept tours, et les commissaires referment la journée en confirmant une avalanche de pénalités de grille qui touche déjà quatre des six premiers temps.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">1:11,622</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0,025s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+0,131s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">+0,184s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,274s</span></div>
    </div>
    <p class="subverdict">Après deux séances dominées tour à tour par Norris puis Antonelli, c'est Max Verstappen qui referme les essais libres en tête — un renversement qui doit beaucoup à la gomme et au timing autant qu'à la voiture : troisième en EL1 et en EL2, le Néerlandais signe enfin le tour qui compte alors que les essais libres sont, comme le reste du week-end pour lui, déjà sans conséquence sur sa position de départ. Les commissaires ont en effet confirmé ce samedi une série de pénalités de grille qui redessine entièrement l'enjeu des qualifications : Verstappen (30 places, parti pour la dernière ligne de la grille), Hamilton (75 places au total après l'incident de cette EL3, également au fond de grille), Leclerc (10 places) et Pérez (30 places, fond de grille lui aussi) s'ajoutent à la pénalité de cinq places de Russell déjà connue depuis l'EL1. Autrement dit, parmi les six pilotes les plus rapides de cette dernière heure, seuls Antonelli, Norris et Piastri aborderont les qualifications sans la moindre pénalité à purger. Hamilton, lui, n'a même pas pu boucler son programme : sa Ferrari a dû rentrer aux stands en urgence après une fumée dans le cockpit, le laissant 12<sup>e</sup> et privé de toute simulation qualificative sur pneu tendre.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el3-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Verstappen devant pour la première fois du week-end — un top 6 resserré en 0,313s</h2>
    <p>Max Verstappen (1:11,622) a signé son temps de référence dans les cinq dernières minutes de la séance, devançant de seulement 0,025s Kimi Antonelli (1:11,647), qui avait pourtant mené l'essentiel de l'heure sur pneu medium avant les relais tendre. Lando Norris (1:11,753, +0,131s) place McLaren troisième, devant George Russell (1:11,806, +0,184s) ; Charles Leclerc (1:11,896, +0,274s) et Oscar Piastri (1:11,935, +0,313s) ferment un groupe de six pilotes que rien ne sépare au-delà de trois dixièmes. C'est la première fois ce week-end que Verstappen termine une séance en tête : troisième en EL1 derrière Norris et Antonelli, puis à nouveau troisième en EL2 derrière Antonelli et Norris. Grandprix.com résume : « the leading teams converged ahead of qualifying » — un tour sec plus disputé que lors des deux séances précédentes, où l'écart entre le premier et le sixième dépassait déjà quatre dixièmes.</p>
    <p>Red Bull a modifié la monoplace de Verstappen « overnight » après les plaintes de la veille sur des rétrogradages jugés « inacceptables » et une direction jugée trop dure (déjà documenté en EL1), mais le problème n'a pas disparu : Verstappen a rapporté à son ingénieur que la direction restait « heavy to the right » pendant cette EL3 — message capté par la diffusion officielle et relayé par Grandprix.com, donc une communication radio broadcast, pas un canal propre au pilote. The Race confirme indépendamment que Verstappen se plaignait encore d'une direction « terrible » malgré le tour de référence. Sur un autre registre, un passage publié par Grandprix.com prolonge (sans le répéter) l'échange déjà documenté en EL2 entre Verstappen et son ingénieur Tom Hart sur le comportement de l'embrayage : après avoir demandé s'il devait « parler au moteur lui-même », Verstappen a proposé sa propre méthode — « Je devrais dire : “Oh, embrayage ! Je change de rapport ! Tu seras puni sinon !” » — un trait d'humour qui n'enlève rien à une irritation réelle, Verstappen ayant expliqué par ailleurs qu'il continue de réclamer des réglages parce qu'il estime qu'il reste du temps au tour à gagner dans les détails, même quand la performance globale paraît déjà compétitive.</p>
    <p>Lewis Hamilton (1:12,833, +1,211s) ne termine que 12<sup>e</sup> — et c'est le vrai fait marquant de cette heure, développé en section 03. Derrière le top 6, Arvid Lindblad (1:12,060, +0,438s) et Liam Lawson (1:12,171, +0,549s) devancent la Red Bull d'Isack Hadjar (1:12,213, +0,591s), puis Gabriel Bortoleto (Audi, +1,022s) et Pierre Gasly (Alpine, +1,022s, temps strictement identique à la milliseconde selon Grandprix.com) complètent le top 10.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el3-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> L'avantage McLaren de l'EL1, déjà érodé en EL2, ne revient pas dans la séance la plus chaude du week-end</h2>
    <p>Contexte avant les chiffres : cette EL3 s'est disputée dans l'air le plus chaud du week-end (31,2 à 31,9°C, contre 23,5-24,6°C en EL1 et 19,6-20,5°C en EL2) et sur la piste la plus chaude observée jusqu'ici — jusqu'à 54,7°C relevés dans la fenêtre récupérée (contre 49°C en fin d'EL1 et 30-35°C en EL2), la piste continuant de grimper quand les données s'arrêtent. C'est exactement la condition que l'EL2 avait identifiée comme restant à vérifier pour savoir si l'avantage de rythme long McLaren (1,0 à 1,6s/tour en EL1, réduit à 0,3-0,9s en EL2 selon l'adversaire, mais encore proche d'une seconde face à Leclerc) pouvait revenir une fois la piste repartie vers des températures plus proches de celles de vendredi après-midi.</p>
    <p>Mais la réponse que donne cette EL3 est d'abord méthodologique, avant d'être une réponse de rythme. Requête dédiée sur les tours bruts du cluster de tête (scripts/practice_briefing_laptimes_by_car.py, Verstappen/Antonelli/Norris/Russell/Leclerc/Piastri), même méthode que les rounds précédents (premier tour de relais exclu, dernier tour exclu sauf tout dernier relais de la séance, tours > 103% de la médiane écartés) — mais appliquée à une séance structurée, comme l'EL3 du round 19 (Mexico), en courtes salves de simulation qualificative plutôt qu'en relais longs représentatifs. Résultat sur le relais MEDIUM d'ouverture de chaque pilote (le plus long disponible pour chacun) :</p>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pilote</th><th>Gomme / relais</th><th>Tours (gardés/dispo.)</th><th>Moyenne relais</th><th>V. pointe (speed_st)</th></tr></thead>
      <tbody>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>MEDIUM (tours 6-9)</td><td>1/4</td><td>1:12,214</td><td>313 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>MEDIUM (tours 1-4)</td><td>1/4</td><td>1:12,639</td><td>315 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>MEDIUM (tours 1-5)</td><td>2/5</td><td>1:13,041</td><td>315 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>MEDIUM (tours 1-10)</td><td>4/10</td><td>1:19,938</td><td>319 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>MEDIUM (tours 1-8)</td><td>4/8</td><td>1:24,312</td><td>314 km/h</td></tr>
        <tr><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>MEDIUM (tours 1-11)</td><td>5/11</td><td>1:24,512</td><td>316 km/h</td></tr>
      </tbody>
    </table>
  </div>
  <div class="prose">
    <p>Lu brut, ce tableau serait trompeur — et c'est justement le constat de rigueur à faire avant d'en tirer quoi que ce soit. Antonelli et Verstappen ne gardent qu'UN seul tour chacun après filtrage (leurs relais d'ouverture ne comptaient que 4 tours, et le dernier est exclu comme n'étant pas leur dernier relais de la séance) : leur « moyenne » est en réalité un tour de poussée isolé, pas une moyenne de relais. Norris n'en garde que deux. À l'inverse, Russell, Leclerc et Piastri ont roulé des relais d'ouverture nominalement plus longs (8 à 11 tours) qui gardent 4 à 5 tours après filtrage — mais ce sont des relais de simulation qualificative mêlant tours de poussée (~1:13) et tours de préparation ou de retour bien plus lents (jusqu'à 1:37 chez Russell, 1:35 chez Leclerc), filtrés seulement s'ils dépassent 103% d'une médiane elle-même gonflée par ces tours lents. Leurs moyennes de 1:19 à 1:25 ne mesurent donc rien de comparable à un rythme de course — exactement le même écueil déjà documenté pour l'EL3 du round 19.</p>
    <p>Pour isoler un signal plus honnête, le même tableau permet une seconde lecture : le tour le plus rapide conservé par chaque pilote sur ce relais medium, qui approxime au moins leur vraie pointe de performance sur cette gomme sans la lisser par les tours de préparation. Classement, du plus rapide au plus lent : <strong>Antonelli 1:12,214</strong>, Leclerc 1:12,439, Verstappen 1:12,639, Piastri 1:12,720, Russell 1:12,919, et <strong>Norris 1:13,018 — le plus lent des six</strong>. Sur cette lecture-là, alignée avec le classement du tour sec de la section 01 (Norris seulement 3<sup>e</sup>), rien n'indique un retour de l'avantage McLaren documenté en EL1 : si quoi que ce soit, Norris est désormais le moins rapide du cluster de tête sur pneu medium, poussant plus loin la tendance déjà amorcée en EL2 (où l'écart s'était réduit face à Russell/Antonelli tout en restant large face à Leclerc). La prudence s'impose néanmoins : aucune de ces deux lectures n'a la robustesse d'un vrai relais long comme ceux de l'EL1/EL2, et la question posée par ces deux séances — l'avantage McLaren tient-il par forte chaleur ? — reste, à proprement parler, non tranchée par la structure de cette EL3. Le signal le plus solide de cette heure demeure le tour sec de la section 01.</p>
    <div class="callout">Réserve méthodologique explicite, plus marquée encore que pour l'EL3 du round 19 : les relais de cette séance mélangent systématiquement tours de poussée et tours de préparation/retour nettement plus lents au sein d'un même relais nominal. Les échantillons « 1/4 » d'Antonelli et de Verstappen ne sont pas des moyennes mais des tours uniques ; ceux de Russell/Leclerc/Piastri (4-5 tours) restent contaminés par des tours lents qui passent le filtre à 103% uniquement parce que la médiane du relais est elle-même élevée. Les deux tableaux ci-dessus sont rapportés par souci de transparence méthodologique et pour prolonger honnêtement la storyline ouverte en EL1/EL2, pas comme une mesure de rythme de course fiable à l'égal de ces deux séances.</div>
  </div>
</section>

<section class="block" data-num="03" id="sec-el3-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Fumée dans le cockpit d'Hamilton, et une avalanche de pénalités de grille confirmée avant les qualifications</h2>
    <p>Lewis Hamilton n'a bouclé que sept tours cette heure, et c'est la principale raison pour laquelle cette EL3 restera dans les mémoires du week-end plutôt que comme une simple formalité avant les qualifications. Grandprix.com, lu intégralement, reconstitue la séquence : Hamilton a d'abord rapporté « d'étranges vibrations avec le moteur » et un freinage moteur excessif, est rentré aux stands pour vérification, est reparti, puis est revenu immédiatement en signalant « de la fumée dans le cockpit ». Sa séance s'est arrêtée là, avec environ 25 minutes restantes, et The Race confirme indépendamment la même séquence (vibrations, puis fumée). Son meilleur temps (1:12,833, 12<sup>e</sup>) a été signé sur pneu medium — Hamilton n'a jamais pu tenter sa simulation qualificative sur pneu tendre, contrairement à Leclerc, qui a lui bouclé 30 tours et pris la 5<sup>e</sup> place. Ferrari avait monté un cinquième moteur à combustion interne sur les deux voitures avant ce week-end ; la cause exacte du problème d'Hamilton, et s'il nécessitera d'autres changements de pièces, restait incertaine selon Grandprix.com — aucune déduction risquée au-delà de ce que la source dit explicitement.</p>
    <p>Les commissaires ont profité de cette fin de samedi pour confirmer l'ensemble des pénalités de grille du week-end, un point essentiel pour lire les qualifications à venir SANS en connaître le résultat : elles s'appliquent au classement de qualification, pas à sa place. Grandprix.com (article dédié, lu intégralement) détaille cinq cas distincts : <strong>Verstappen</strong>, 30 places pour un cinquième moteur à combustion interne, un cinquième turbocompresseur et un cinquième jeu d'échappement, chaque élément dépassant son allocation saisonnière et valant dix places — synonyme de départ en fond de grille, sous réserve de sa classification en qualifications ; <strong>Russell</strong>, cinq places pour un sixième moteur à combustion interne (déjà connu depuis l'EL1 de ce round) ; <strong>Leclerc</strong>, dix places pour son propre cinquième moteur ; <strong>Pérez</strong>, 30 places (cinquième moteur, cinquième turbo, quatrième MGU-K), également synonyme de fond de grille. Le cas d'<strong>Hamilton</strong> est le plus spectaculaire : à la pénalité initiale de dix places pour son cinquième moteur s'ajoute une pénalité supplémentaire de 65 places décidée après la panne de cette EL3, Ferrari ayant remplacé sept éléments du groupe propulseur dans la foulée (sixième moteur, cinquième turbo et échappement, quatrième réserve d'énergie, électronique de contrôle et MGU-K, septième pièce auxiliaire) — un total de 75 places qui l'envoie lui aussi en fond de grille. Laurent Mekies, directeur Red Bull, cité par Grandprix.com via Sky Sports F1, reste malgré tout optimiste pour Verstappen : <em>« He's done a few miracles in the past here starting from the back. »</em> — rappel explicite de sa victoire 2024 depuis la 17<sup>e</sup> place sous la pluie à Interlagos et de sa remontée jusqu'au podium l'an dernier après un départ de la voie des stands.</p>
    <p>Concrètement, pour les qualifications : sur les six pilotes les plus rapides de cette EL3, seuls Antonelli, Norris et Piastri n'ont aucune pénalité à purger. Verstappen, Russell, Leclerc, Hamilton et Pérez partiront tous plus loin que leur classement de qualification ne le dira, dans des proportions très inégales (cinq places pour Russell, dix pour Leclerc, fond de grille pour les trois autres).</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el3-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Câmara réprimandé, la pièce manquante retrouvée sur la piste de Pérez, l'ERS de Stroll</h2>
    <p>Le point laissé en suspens par l'EL2 de ce round — l'enquête des commissaires sur le frôlement entre Rafael Câmara et Charles Leclerc au virage 15 — a été tranché avant cette EL3. Grandprix.com, lu intégralement : Câmara a reçu une réprimande de pilotage (la première de sa saison) pour avoir gêné inutilement la Ferrari, les commissaires ayant conclu qu'il avait été averti plusieurs fois de l'approche de Leclerc à pleine vitesse et qu'il avait malgré tout louvoyé et empiété sur la trajectoire. Leclerc avait évité la collision en sortant largement de la piste. Les commissaires ont qualifié la situation de « clairement dangereuse », jugeant qu'une simple mise en garde ne suffisait pas cette fois — mais la décision ne comporte aucune pénalité de grille pour le débutant, qui dispute son Grand Prix à domicile.</p>
    <p>Cette EL3 a aussi livré son propre épisode inattendu : Sergio Pérez a jeté un petit objet hors de son cockpit au virage 8, provoquant une enquête des commissaires. The Race rapporte l'échange radio, où même son propre ingénieur de course semblait perplexe sur ce qu'il venait de voir : <em>« I don't know it was, uh... something came off, I think the radio, where you put the radio cables, a little box », »</em> a expliqué Pérez — un message radio broadcast, relayé par un média, pas une communication propre au pilote. Grandprix.com, dans un article séparé lu intégralement, précise la décision : il s'agissait d'un petit boîtier en plastique normalement fixé à la ceinture de sécurité, décroché pendant la séance ; Pérez l'a jeté en craignant qu'il ne se coince ailleurs dans le cockpit et ne crée un problème de sécurité. Les commissaires ont jugé la pièce légère et peu susceptible de blesser un pilote ou d'endommager une autre voiture, mais ont averti formellement Cadillac que jeter un objet sur une piste en action « n'est pas approprié, pour des raisons évidentes » — un avertissement à l'écurie, sans pénalité de grille supplémentaire, distinct de la pénalité de 30 places que Pérez purge déjà pour son groupe propulseur.</p>
    <p>Enfin, Lance Stroll (1:14,766, 22<sup>e</sup> et dernier) a vu sa séance s'arrêter après seulement sept tours : Grandprix.com évoque un « suspected ERS problem » qui a mis fin à sa participation. Aucune communication du site institutionnel Aston Martin, lu intégralement, ne développe cet épisode — gap institutionnel documenté comme tel plutôt que masqué.</p>
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
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:11,622</td><td>— (pénalité grille -30, fond de grille)</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:11,647</td><td>+0,025s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:11,753</td><td>+0,131s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:11,806</td><td>+0,184s (pénalité grille -5)</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:11,896</td><td>+0,274s (pénalité grille -10)</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:11,935</td><td>+0,313s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:12,060</td><td>+0,438s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lawson</td><td>Racing Bulls</td><td>1:12,171</td><td>+0,549s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Hadjar</td><td>Red Bull Racing</td><td>1:12,213</td><td>+0,591s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:12,644</td><td>+1,022s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:12,644</td><td>+1,022s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:12,833</td><td>+1,211s (fumée cockpit, 6/7 tours, pénalité grille -75, fond de grille)</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hulkenberg</td><td>Audi</td><td>1:12,865</td><td>+1,243s (voiture n°27 — de retour après son absence totale en EL2)</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:12,925</td><td>+1,303s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Camara</td><td>Haas F1 Team</td><td>1:12,981</td><td>+1,359s (réprimande de pilotage confirmée pour l'incident EL2 avec Leclerc)</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:13,109</td><td>+1,487s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:13,147</td><td>+1,525s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:13,171</td><td>+1,549s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:13,303</td><td>+1,681s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>1:13,573</td><td>+1,951s (avertissement pour objet jeté sur la piste ; pénalité grille -30, fond de grille)</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:13,722</td><td>+2,100s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:14,766</td><td>+3,144s (suspected ERS problem, 6/7 tours)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el3-6">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en qualifications</h2>
    <p>Trois séances, un classement de tour sec qui a changé de leader chaque fois (Norris en EL1, Antonelli en EL2, Verstappen en EL3) mais qui n'a jamais dépassé quatre dixièmes d'écart entre le premier et le sixième — le plateau de tête le plus resserré de ce week-end est aussi, paradoxalement, celui où le moins de monde pourra en profiter pleinement dimanche. Sur le rythme long, la trajectoire est nette d'un bout à l'autre du week-end : l'avantage McLaren mesuré en EL1 (1,0 à 1,6s/tour) s'était déjà réduit en EL2 (0,3 à 0,9s selon l'adversaire, encore proche d'une seconde face à Leclerc), et cette EL3, malgré une structure de relais trop fragmentée pour trancher avec la même rigueur, ne montre aucun signe de retour de cet avantage — sur la lecture la plus honnête disponible (meilleur tour conservé par pilote sur le relais medium d'ouverture), Norris est même le plus lent des six pilotes du cluster de tête, derrière Antonelli, Leclerc, Verstappen, Piastri et Russell dans cet ordre.</p>
    <p>Mais la donnée qui doit dominer la lecture des qualifications n'est ni le tour sec ni le rythme long : ce sont les pénalités de grille déjà confirmées. Verstappen (pourtant le plus rapide de cette EL3), Pérez et Hamilton partiront tous du fond de grille quelle que soit leur performance samedi ; Leclerc perd dix places, Russell cinq. Sur les six pilotes les plus rapides de cette dernière heure d'essais, seuls Antonelli, Norris et Piastri n'ont absolument rien à perdre en termes de position de départ. La prédiction la plus raisonnable pour les qualifications est donc double : au sommet de la feuille des temps, une bataille resserrée entre Antonelli (le plus régulier des trois séances, vainqueur de l'EL2 et seulement battu de 25 millièmes en EL3) et Norris, avec Piastri comme troisième larron crédible pour la première ligne réelle de la grille de dimanche — et, en parallèle, un exercice presque sans enjeu sportif direct pour Verstappen, Leclerc, Russell, Hamilton et Pérez, pour qui la seule vraie question est de limiter la casse sur la position de départ réelle une fois les pénalités appliquées, plutôt que de viser la pole. Côté outsiders, Lindblad et Lawson (Racing Bulls), déjà septième et huitième ce samedi, ont une occasion concrète de se glisler devant plusieurs pilotes pénalisés sur la grille réelle de dimanche sans avoir eux-mêmes à battre leur temps de qualification.</p>
    <div class="callout">Rappel de méthode : la section 02 de cet article documente explicitement pourquoi son tableau de rythme de relais est moins fiable que ceux de l'EL1/EL2 du même round (relais fragmentés en tours de poussée et de préparation mélangés, échantillons de 1 à 5 tours selon le pilote) — la prédiction ci-dessus s'appuie d'abord sur les trois classements de tour sec et sur les tableaux de rythme long déjà établis en EL1/EL2, pas sur le tableau de cette EL3 pris isolément.</div>
  </div>
</section>

<section class="block" id="sec-el3-7">
  <details class="sources">
    <summary>Sources utilisées — EL3 São Paulo (9 liens externes)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), session_key=11407, 478 tours/22 pilotes : classement, secteurs, relais, météo. Primaire.</span></li>
        <li><span class="desc">The Pit Wall — requête dédiée tours bruts par voiture (scripts/practice_briefing_laptimes_by_car.py, cluster VER/ANT/NOR/RUS/LEC/PIA) : base des deux lectures de la section 02 (moyenne de relais et meilleur tour conservé).</span></li>
        <li><span class="desc">Correctif de rigueur appliqué cette passe : la voiture de Nico Hülkenberg, désignée "n°98" à plusieurs reprises dans l'EL2 de ce round, est en réalité la voiture n°27 — vérifié directement sur les données brutes ingérées (scripts/practice_briefing.py) ET confirmé indépendamment par l'ordre des images préchargées de la page Formula1.com (identifiant "nichul01" en 13<sup>e</sup> position, cohérent avec son n°27 réel). Aucune trace d'un numéro "98" dans aucune source consultée cette saison ; traité comme une erreur de la passe de rédaction EL2, corrigée ici et signalée dans docs/SOURCES.md plutôt que reproduite silencieusement.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Institutionnel / officiel</h5>
      <ul>
        <li><a href="https://www.formula1.com/en/results/2026/races/1299/sao-paulo/practice/3" data-desc="Titre de page confirmé (« FORMULA 1 MSC CRUISES GRANDE PRÊMIO DE SÃO PAULO 2026 - PRACTICE 3 ») et ordre des images préchargées cohérent avec le classement (voir correctif Hülkenberg ci-dessus). Tableau de classement lui-même hors de la fenêtre de troncature récupérée. Lu en HTML brut via fetch-url.yml.">Formula1.com — résultats officiels EL3</a><span class="desc">Formula1.com</span></li>
        <li><span class="desc">Pirelli (press.pirelli.com/tagfeed/en/tags/press__releases), relu intégralement une quatrième fois pour ce round : toujours aucune entrée spécifique à São Paulo 2026 — régression déjà documentée pour l'EL1/EL2 de ce round, confirmée une fois de plus. Mercedes (mercedesamgf1.com/en/news/) : nouvel échec HTTP 404. Ferrari (ferrari.com/en-EN/formula1) : nouvel échec HTTP 403, un mode d'échec différent de ceux déjà documentés les rounds précédents.</span></li>
        <li><span class="desc">Oracle Red Bull Racing (redbullracing.com/int-en), Haas F1 Team (haasf1team.com), Audi (audif1.com/en) et Aston Martin (astonmartinf1.com/en-GB), tous lus intégralement : actifs, confirment le round en cours, mais aucun n'apporte de communication exploitable sur les faits spécifiques à cette EL3 développés dans l'article (steering/embrayage de Verstappen, promotion de Câmara déjà actée, retour d'Hülkenberg, ERS de Stroll) — gaps institutionnels documentés comme tels. Contenu visiblement postérieur aux qualifications déjà disputées dans notre chronologie réelle (ex. lien vidéo "Hear from Max after Saturday" sur redbullracing.com, bloc "Qualifying Recap" sur haasf1team.com) délibérément NI OUVERT NI UTILISÉ, conformément au cadre chronologique de cet article.</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Généraliste</h5>
      <ul>
        <li><a href="https://www.grandprix.com/races/brazilian-gp-2026-practice-3-report.html" data-desc="Rapport complet EL3 (« Practice 3 Report - Verstappen edges Antonelli by 0.025s ») : classement concordant au millième avec la base et The Race, déroulé de la séance, citation radio Verstappen sur la direction. Lu intégralement via fetch-url.yml.">Grandprix.com — rapport EL3</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.grandprix.com/news/hamiltons-brazil-problems-deepen-as-smoke-ends-final-practice.html" data-desc="Séquence complète de l'incident Hamilton (vibrations puis fumée), confirmation du cinquième moteur Ferrari déjà monté sur les deux voitures. Lu intégralement via fetch-url.yml.">Grandprix.com — les problèmes d'Hamilton s'aggravent</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.grandprix.com/news/verstappen-faces-back-of-grid-start-as-hamilton-also-expects-brazil-penalty.html" data-desc="Détail complet des cinq pénalités de grille confirmées avant les qualifications (Verstappen, Hamilton, Leclerc, Russell, Pérez), citation nommée de Laurent Mekies via Sky Sports F1. Lu intégralement via fetch-url.yml.">Grandprix.com — l'avalanche de pénalités de grille</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.grandprix.com/news/cadillac-warned-after-perez-throws-loose-cockpit-part-onto-track.html" data-desc="Décision complète des commissaires sur l'incident Pérez (pièce de ceinture de sécurité jetée au virage 8), avertissement à Cadillac sans pénalité de grille supplémentaire. Lu intégralement via fetch-url.yml.">Grandprix.com — avertissement à Cadillac après l'incident Pérez</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.grandprix.com/news/camara-reprimanded-after-dangerous-leclerc-incident.html" data-desc="Décision des commissaires sur l'incident Câmara/Leclerc de l'EL2 de ce round : réprimande de pilotage, sans pénalité de grille. Lu intégralement via fetch-url.yml.">Grandprix.com — Câmara réprimandé</a><span class="desc">Grandprix.com</span></li>
        <li><a href="https://www.grandprix.com/news/verstappen-threatens-his-clutch-with-punishment-in-brazil.html" data-desc="Prolongement (sans répétition) de l'échange Verstappen/Tom Hart sur l'embrayage déjà documenté en EL2 de ce round. Lu intégralement via fetch-url.yml.">Grandprix.com — Verstappen menace son embrayage</a><span class="desc">Grandprix.com</span></li>
        <li><span class="desc">Crash.net — page de liste /f1/news lue intégralement : confirme indépendamment les titres "Verstappen tops Brazil GP FP3 as Hamilton suffers engine trouble" et "Perez faces investigation for unusual incident in Brazil GP practice" (URL d'article individuel non extractible de cette page de liste).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Analyse technique</h5>
      <ul>
        <li><a href="https://www.the-race.com/formula-1/what-happened-in-final-brazil-f1-practice/" data-desc="Compte-rendu complet de la séance (Josh Suttill) : classement concordant au millième avec la base et Grandprix.com, confirmation de l'incident Hamilton et de la citation radio Pérez. Lu intégralement via fetch-url.yml.">The Race — ce qui s'est passé dans la dernière EL au Brésil</a><span class="desc">The Race</span></li>
        <li><a href="https://www.the-race.com/formula-1/hamilton-set-for-brazil-grid-penalty-after-ferraris-worst-2026-friday/" data-desc="Contexte post-EL2/pré-EL3 (Josh Suttill, Jon Noble) : tableau de rythme long EL2 de Ferrari, confirmation de la pénalité de grille planifiée d'Hamilton avant même l'incident de cette EL3. Lu intégralement via fetch-url.yml.">The Race — Hamilton déjà attendu pour une pénalité avant l'EL3</a><span class="desc">The Race</span></li>
        <li><span class="desc">Autosport — page de liste /f1/news lue intégralement : confirme indépendamment le titre "F1 Brazilian GP: Verstappen edges out Antonelli to top FP3 as Hamilton hits mechanical trouble" (URL d'article individuel non extractible de cette page de liste).</span></li>
      </ul>
    </div>
    <div class="srcgroup">
      <h5>Communauté technique pointue et communication directe pilote — tentatives documentées</h5>
      <ul>
        <li><span class="desc">r/F1Technical : nouvelle tentative réelle (reddit.com/r/F1Technical/search.json?q=brazil+fp3&restrict_sr=1&sort=new) depuis fetch-url.yml, échec HTTP 403 — blocage anti-bot déjà documenté pour toutes les séances précédentes de la saison, confirmé une fois de plus.</span></li>
        <li><span class="desc">Communication directe pilote : deux tentatives réelles (instagram.com/mercedesamgf1, HTTP 429 ; x.com/redbullracing, HTTP 403), toutes deux infructueuses depuis fetch-url.yml. Aucun canal propre pilote (Instagram/X personnel) identifié par ailleurs pour cette séance précise par les sources généralistes/techniques consultées. Gap honnêtement documenté : cet article ne contient donc pas de communication directe pilote au sens strict de la règle éditoriale, faute d'alternative trouvée malgré ces tentatives réelles — les citations radio de Verstappen et Pérez utilisées en sections 01/04 sont explicitement présentées comme des messages broadcast relayés par un média, pas comme des communications propres au pilote.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
