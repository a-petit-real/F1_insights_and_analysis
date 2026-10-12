# Sources F1

Ce fichier est la liste de référence des sources à utiliser pour sourcer les articles F1 (voir la section "Sourcing minimal" de `docs/OPERATIONS.md`). Il est organisé par catégorie institutionnelle, puis par langue pour les médias, puis par journalistes/analystes indépendants, puis par communautés fan/forums techniques. Il est destiné à être lu et édité directement par le mainteneur, et consulté par la routine d'écriture automatisée avant de sourcer un article.

**Légende :** `⚠️ non confirmé` signale une source, une URL ou une affirmation que la recherche à l'origine de ce document n'a pas pu confirmer par une consultation directe du site (fetch/recherche en session) — à vérifier avant de s'y appuyer fortement, sans pour autant l'exclure.

**Règle éditoriale absolue — zéro contenu "people"** : aucune information sur la vie privée des pilotes/personnel d'écurie (couples, famille, rumeurs, controverses personnelles hors piste, etc.) ne doit jamais être utilisée dans un article, même si elle provient d'une source listée ci-dessous par ailleurs légitime. Plusieurs sources de ce fichier publient ce type de contenu à côté d'actualité factuelle (notamment celles marquées "tabloïd" dans leurs Notes) — cela ne les exclut pas de la liste pour leur couverture course/technique/stratégie, mais leur volet "people" ne doit jamais être repris. Ne piocher que du contenu directement lié à la course, la performance, la technique ou la stratégie.

## Sources institutionnelles

| Nom | URL | Catégorie | Notes |
|---|---|---|---|
| FIA (Fédération Internationale de l'Automobile) | https://www.fia.com/events/fia-formula-one-world-championship/season-2026/2026-fia-formula-one-world-championship | Organe de gouvernance (officiel) | URL de la page saison 2026 confirmée par l'utilisateur. Hub de news/communiqués général à `fia.com/news` (motif `fia.com/news/<slug>`) reste pertinent pour les communiqués hors page saison. Miroir d'archive à `api.fia.com/news/<slug>`. Version localisée FR existe (`fia.com/fr/news/<slug>`). Guides média officiels publiés en PDF (`fia.com/sites/default/files/...`). |
| Formula1.com (site officiel du championnat) | https://www.formula1.com | Généraliste / Officiel | Articles d'actualité sous `formula1.com/en/latest/article/<slug>.<hash>` ; fiches équipes stables sous `formula1.com/en/teams/<team>`. Pas indépendant (contenu officiel du championnat). ⚠️ L'existence d'un hub presse corporate séparé (`corp.formula1.com`) n'a pas pu être confirmée. ⚠️ Structure non revérifiée par fetch direct cette session (échecs DNS) ; repose sur extraits de recherche. Rappel anti-piège : se méfier des URL au format `article.<slug>.<ID>.html` (point + `.html`), qui ont deux fois donné du contenu obsolète/hors-2026 (voir sourcing de `analyse-fr.js` round 17) ; le format confirmé 2026 est `article/<slug>.<ID>` (slash, sans `.html`). |
| Pirelli (site grand public — hub course F1) | https://www.pirelli.com/global/fr-fr/race/formule-1/ | Fournisseur de pneus — site grand public | URL confirmée par l'utilisateur. Format localisé par segment de locale (`/global/fr-fr/...`) — une édition anglophone existe probablement sous un segment équivalent (ex. `/global/en-gb/race/formula-1/` ou similaire, à vérifier avant usage dans un article anglophone plutôt que de deviner l'URL). Site presse séparé à `press.pirelli.com` (flux par tag, ex. `press.pirelli.com/tagfeed/en/tags/press__releases`) reste utile pour les communiqués bruts. Fournisseur exclusif de pneus FIA F1 depuis 2011. |
| Oracle Red Bull Racing | https://www.redbullracing.com/int-en | Écurie (officiel) | URL confirmée par l'utilisateur (segment de locale `/int-en`). |
| Scuderia Ferrari | https://www.ferrari.com/en-EN/formula1 | Écurie (officiel) | Confirmé via extrait de recherche. Attention : variantes de locale (`/en-EN/` vs `/en-US/`) peuvent dupliquer la même actualité sous deux URL différentes. |
| Mercedes-AMG Petronas F1 Team | https://www.mercedesamgf1.com | Écurie (officiel) | Confirmé via une description tierce ("site officiel de l'écurie Mercedes-AMG Petronas Formula One"). Chemin `/en/news/` attendu mais non revérifié directement cette session. |
| McLaren F1 Team | https://www.mclaren.com/racing/ | Écurie (officiel) | Confirmé directement via extrait de recherche ; couvre aussi McLaren IndyCar/Endurance/Gaming, section "Latest News" présente. |
| Aston Martin Aramco F1 Team | https://www.astonmartinf1.com/en-GB | Écurie (officiel) | URL confirmée par l'utilisateur (segment de locale `/en-GB`). |
| Alpine F1 Team | https://www.alpinef1.com | Écurie (officiel) | Confirmé via extrait de recherche ; bien distinct du site de la marque automobile grand public `alpinecars.com`. |
| Williams Racing | https://www.williamsf1.com | Écurie (officiel) | Confirmé via plusieurs URL de posts live. Deux chemins de contenu distincts : `/posts/<uuid>/<slug>` (actualités/annonces) et `/articles/<uuid>/<slug>` (dossiers) — ne pas tenter de reconstruire une URL, la capturer telle quelle. |
| Racing Bulls | https://www.visacashapprb.com/int-en | Écurie (officiel) | URL confirmée par l'utilisateur — **clarification de la note précédente** : la recherche d'origine avait flaggé `visacashapprb.com` comme "probablement obsolète" après le renommage "Racing Bulls" en 2025, en se fiant à l'infobox Wikipedia référençant l'ancien branding 2024 (Visa Cash App RB). L'utilisateur confirme que ce domaine reste l'URL officielle active : le nom de domaine n'a apparemment pas changé avec le nom de marque de l'écurie. Repli : fiche Formula1.com à `formula1.com/en/teams/racing-bulls` (également confirmée live). |
| Audi (Audi Revolut F1 Team, ex-Sauber) | https://www.audif1.com/en | Écurie (officiel) | URL confirmée par l'utilisateur (segment de locale `/en`). Fiche Formula1.com également confirmée live (`formula1.com/en/teams/audi`, base à Hinwil, Suisse). Note de structure : Sauber Motorsport AG devient Audi Motorsport AG ; le nom "Sauber" subsiste via des entités légales distinctes (Sauber Holding AG, Sauber Technologies AG) sans lien avec l'écurie de course ; la liste d'engagés FIA 2026 afficherait encore "Sauber" (renommage légal pas terminé). |
| Cadillac F1 Team | https://www.cadillacf1team.com/ | Écurie (officiel) | URL confirmée par l'utilisateur — résout l'incertitude précédente (aucun domaine autonome n'avait pu être identifié par la recherche d'origine). Fiche Formula1.com (`formula1.com/en/teams/cadillac`) reste un repli valide. |
| Haas F1 Team | https://www.haasf1team.com | Écurie (officiel) | Confirmé par un article de lancement (2014) nommant explicitement "www.HaasF1Team.com" ; domaine ancien et à faible risque, mais pas revérifié live cette session. |

**Note de fiabilité sur les équipes :** toutes les URL d'écuries ci-dessus sont désormais confirmées (dont Racing Bulls, Audi et Cadillac, corrigées par l'utilisateur le 2026-10-12). La fiche Formula1.com (`formula1.com/en/teams/<slug>`) reste un repli institutionnel utile en complément.

## Médias — généralistes et techniques

### Anglais

| Nom | URL | Catégorie | Notes |
|---|---|---|---|
| Formula1.com (Official) | https://www.formula1.com | Généraliste / Officiel | Site officiel du championnat ; timing live et vidéo ; pas du journalisme indépendant. |
| Sky Sports F1 | https://www.skysports.com/f1 | Généraliste / Diffuseur | Détenteur des droits TV live au Royaume-Uni depuis 2012 (jusqu'en 2029 selon les rapports). |
| BBC Sport – Formula 1 | https://www.bbc.co.uk/sport/formula1 | Généraliste / Diffuseur | A perdu les droits TV live après 2015 mais publie encore actualités/analyses et un podcast. |
| ESPN F1 | https://www.espn.com/f1/ | Généraliste / Diffuseur | Diffuseur US depuis 2018 ; site lié au deal TV. |
| PlanetF1 | https://www.planetf1.com | Généraliste | Fondé en 1999 ; accréditation FIA permanente ; présence paddock à la plupart des courses ; déclare ne pas utiliser l'IA dans ses articles. |
| GPFans | https://www.gpfans.com | Généraliste | Équipes éditoriales multi-marchés ; fait partie du Realtimes Network ; revendique interviews exclusives/reportage sur site. |
| RacingNews365 | https://racingnews365.com | Généraliste | Couvre aussi MotoGP, NASCAR, WRC ; décline toute garantie d'exhaustivité/actualité du contenu (propre disclaimer). |
| Crash.net | https://www.crash.net | Généraliste | Actif depuis 1999 ; fait partie de Crash Media Group (Londres) ; publie l'archive de résultats Autocourse. |
| GrandPrix247 | https://www.grandprix247.com | Généraliste | ⚠️ Géré par un seul éditeur (Paul Velasco), auto-décrit comme un "projet personnel" plutôt qu'un média professionnel — à traiter avec prudence sur la rigueur de sourcing. |
| Motorsport Week | https://www.motorsportweek.com | Généraliste | Fondé en 2008 sous le nom "The F1 Times", rebrandé en 2017 ; accrédité FIA ; couvre F1 et de nombreuses autres séries. |
| WTF1 | https://www.wtf1.com | Généraliste / ton plus léger | Marque média F1 appartenant désormais à The Race Media Ltd ; ton plus jeune/social. ⚠️ Histoire de fondation disputée selon les sources (2010 vs 2016). |
| RaceFans.net | https://www.racefans.net | Généraliste avec profondeur analytique | Fondé en 2005 sous le nom "F1 Fanatic" par Keith Collantine, renommé en 2018 ; indépendant/financé par pub et lecteurs ; couvre aussi Formula E, IndyCar, F2, F3. |
| Motorsport.com | https://www.motorsport.com | Technique/Analytique | Titre Motorsport Network ; détient l'archive d'illustrations techniques de Giorgio Piola ; paywall limité. |
| Autosport | https://www.autosport.com | Technique/Analytique | Titre Motorsport Network ; pedigree historique de presse spécialisée ; paywall limité. |
| The Race | https://www.the-race.com | Technique/Analytique | Fondé en 2020 ; analyse de fond stratégique et technique ; largement gratuit ; staffé par des journalistes vétérans de la presse spécialisée (ex. Gary Anderson). |
| F1Technical.net | https://www.f1technical.net | Technique/Analytique (niche) | Actif depuis 1999 ; actualités techniques dédiées, base de données de spécifications, forum ; périmètre plus étroit que les sites grand public. |
| JA on F1 (James Allen on F1) | https://www.jamesallenonf1.com | Technique/Analytique (stratégie & business) | Lancé en 2009 ; intégré depuis à Motorsport Network (Motorsport.com/Autosport/Motor1) — n'est plus un site indépendant malgré son origine de blog personnel. |
| Motorsport Magazine | https://www.motorsportmagazine.com | Technique/Analytique, patrimoine print | Connu pour ses podcasts experts et ses signatures vétérans ; présence en ligne jugée plus faible que sa réputation print/podcast. |
| Speedcafe | https://www.speedcafe.com | Régional (Australie) / Généraliste | Média motorsport australien couvrant la F1 à côté du Supercars et d'autres catégories domestiques. |
| EssentiallySports (volet F1) | https://www.essentiallysports.com/f1-news | Régional (Inde) / Généraliste multi-sport | Fondé en 2014 ; maison de médias sportifs digitaux multi-sport liée à l'Inde ; F1 est un volet parmi d'autres. |
| Sportskeeda (volet F1) | https://www.sportskeeda.com/f1 | Régional (Inde) / Généraliste multi-sport | Site indien multi-sport ; section F1 tenue en grande partie par des contributeurs freelance ; contenu orienté réaction fan/social. |
| F1i.com | — | Technique/Analytique (statut incertain) | ⚠️ Non confirmé — aucun résultat de recherche n'a permis de confirmer le statut opérationnel actuel ; à traiter comme non vérifié/possiblement inactif plutôt que listé comme actif. |

### Français

| Nom | URL | Catégorie | Notes |
|---|---|---|---|
| F1i.fr | f1i.fr | Généraliste (F1 uniquement) | Site francophone 100% F1 depuis 2012 ; détenu par Reworld Media depuis 2018 ; rédaction professionnelle (rédacteur en chef Pierre Van Vliet au moment du rachat). ⚠️ Note : le fichier `english_media.md` indique ne pas avoir pu confirmer le statut opérationnel actuel de "F1i.com" (désaccord/incertitude entre les deux notes sur l'activité du site — signalé tel quel). |
| Motorsport.com (France) | motorsport.com/fr | Généraliste | Déclinaison française de Motorsport Network ; actualités/résultats/classements. ⚠️ Page live non revérifiée directement cette session mais quasi certainement active. |
| L'Équipe – Formule 1 | lequipe.fr (section F1) | Généraliste | Premier quotidien sportif français ; référence généraliste de longue date. ⚠️ Section non vérifiée directement cette session (source de type seed list). |
| Eurosport France – Formule 1 | eurosport.fr/formule-1 | Généraliste, avec explications techniques occasionnelles | Confirmé actif via un article explicatif sur l'aéro (post-2014). |
| RMC Sport – F1 | rmcsport.bfmtv.com ; podcast "Le Paddock RMC" | Généraliste / porté par podcast | Podcast F1 actif confirmé (épisodes jusqu'à juillet 2026) ; ⚠️ statut actuel des droits TV live non confirmé. |
| Auto Hebdo | auto-hebdo.fr | Généraliste (motorsport, patrimoine print) | Fondé en 1976 ; vendu à Didier Calmels en 2020 ; rédacteur en chef Romain Bernard maintenu en poste ; marque historique toujours active. |
| Caradisiac – Formule 1 | caradisiac.com (section F1) | Généraliste (portail auto) | Volet F1 actif confirmé au sein d'un grand site auto français. |
| Motor1 France | fr.motor1.com | Généraliste, avec quelques explications techniques | Branche française de Motor1 Media Group ; publie actualités F1 et explications stratégie/technique (ex. DRS). |
| Motorsactu | motorsactu.com | Généraliste | Tag F1 actif avec récaps de weekend de course à jour. |
| VL Media | vl-media.fr | Généraliste | Site français généraliste avec tag F1 de longue date ; ⚠️ mention de copyright figée ("2012–2020") alors que le contenu semble récent — signal de fiabilité à surveiller. |
| France Info / France3 Régions – Auto-Moto | franceinfo.fr/sports/auto-moto ; france3-regions.franceinfo.fr | Généraliste (service public) | Page F1 permanente au sein de la couverture sportive de France Télévisions. |
| F1-Fansite.com (FR) | f1-fansite.com/fr | Généraliste / média fan | Site fan (ProTrix / Léopold Pleijsier) actif depuis 2001 ; utile pour la couverture d'ensemble mais c'est un média fan, pas une rédaction professionnelle. |
| StatsF1 | statsf1.com / statsf1.fr | Technique / référence statistique & historique | Spécialiste des statistiques et de l'histoire F1 plutôt que de l'analyse technique/stratégique en direct ; ⚠️ cadence de mise à jour actuelle non confirmée. |
| Vitesse (Groupe Ouest-France) | — (nouveau titre 2026) | Généraliste (print + digital, multi-discipline motorsport) | Lancé en mai 2026 ; couvre la F1 parmi WEC, Formula E, WRC, NASCAR, IndyCar. |
| Largus – auto-actualité | largus.fr | Généraliste (place de marché/magazine auto, édito F1 occasionnel) | Pas dédié F1 ; publie ponctuellement des articles de paysage/opinion sur les médias F1. |
| RDS (Réseau des sports) | rds.ca | Généraliste (diffuseur francophone canadien) | Bell Media ; décrit comme diffuseur francophone exclusif de la F1 au Canada ; émission F1 dédiée ; couverture Lance Stroll. ⚠️ Sourcé sur des communiqués 2018-2019, statut actuel des droits non revérifié. |
| RTBF Sport – Formule 1 | rtbf.be/sport | Généraliste (service public belge) | Diffuseur public francophone belge ; droits F1 renouvelés jusqu'en 2027 (Tipik/La Une/Auvio). |
| RTS Sport | rts.ch/sport | Généraliste (service public suisse) | Diffuseur public francophone suisse ; listé comme diffuseur de sessions F1 ; ⚠️ calendrier de diffusion actuel non confirmé. |
| Bluewin – Sport (f1-moto) | bluewin.ch/fr/sport/f1-moto | Généraliste (portail web suisse) | Grand portail suisse avec couverture F1 francophone active et à jour. |

**Pas de spécialiste technique/stratégique dédié confirmé en français** : aucun équivalent francophone d'un site entièrement construit autour de l'analyse technique/stratégique (type RaceFans ou The Race en anglais) n'a été identifié. StatsF1 est le plus proche d'un site "spécialiste" mais son créneau est la statistique/l'historique, pas l'analyse technique courante. Voir "Pistes à vérifier".

### Italien

| Nom | URL | Catégorie | Notes |
|---|---|---|---|
| FormulaPassion.it | formulapassion.it | Généraliste | Fondé en 2011 ; magazine en ligne multilingue couvrant aussi le motorsport deux-roues ; rachat par le groupe GEDI annoncé en 2026 ; revendique 18M+ de lecteurs uniques. ⚠️ Accès direct au site impossible cette session (échec DNS) ; infos basées sur résumés de recherche. |
| F1Sport.it | f1sport.it | Technique/Analytique | Créé en 2013 ; spécialisé technique, actualité et historique F1 ; fondateur toujours coordinateur éditorial. ⚠️ Accès direct impossible cette session. |
| Autosprint | — | Technique/Analytique, patrimoine print | Hebdomadaire (paraît le mardi) couvrant F1, rallye, Formula E ; publié par Sport Network s.r.l. |
| Motorsport.com Italia (it.motorsport.com) | it.motorsport.com | Généraliste | Issu d'OmniCorse.it, devenu l'édition italienne du réseau Motorsport.com (rachat d'Edimotive S.r.l. en 2015) ; a remporté le "Premio Confartigianato Motori" (meilleur site) au GP d'Italie 2016 ; directeur cité : Franco Nugnes. |
| Circus F1 (circusf1.com) | circusf1.com | Technique/Analytique | Publie des articles d'analyse technique dédiés (ex. aérodynamique des bargeboards). |
| GPFans (édition italienne) | gpfans.com/it | Généraliste | Actualités quotidiennes en italien, forte couverture Ferrari ; équipe éditoriale dédiée au marché italien. |
| F1-Fansite.com (section italienne) | f1-fansite.com/it | Généraliste / média fan | ProTrix (Léopold Pleijsier), actif depuis 2001 ; archive mensuelle remontant à 2001. |
| Motorbox.com | motorbox.com | Généraliste | Section F1 avec rédacteur dédié (Salvo Sardina). |
| La Gazzetta dello Sport – Formula1 | gazzetta.it/Formula1 | Généraliste | ⚠️ Non confirmé directement par recherche cette session ; cité dans le brief de recherche et par connaissance générale comme l'un des deux grands quotidiens sportifs italiens avec volet F1 dédié — à vérifier avant publication. |
| Corriere dello Sport – Formula1 | corrieredellosport.it | Généraliste | ⚠️ Non confirmé directement cette session ; idem Gazzetta dello Sport, à vérifier. |
| Sky Sport F1 Italia | skysport.it/motori/formula-1 | Généraliste / Diffuseur | ⚠️ Non confirmé directement cette session (connaissance générale) ; bras digital du diffuseur payant, source majeure de contenu technique/graphique en Italie — à vérifier. |
| Il Fatto Quotidiano, La Repubblica, Il Tempo (sections Formula Uno) | — | Généraliste | Quotidiens généralistes italiens avec couverture F1 confirmée (Il Fatto Quotidiano a un contributeur dédié "analyste technique F1"). |

### Espagnol

| Nom | URL | Catégorie | Notes |
|---|---|---|---|
| Motorsport.com España | es.motorsport.com | Généraliste | Édition espagnole de Motorsport.com, lancée en mars 2016 ; couvre aussi MotoGP, WRC. |
| SoyMotor.com | soymotor.com | Généraliste | Site auto espagnol avec couverture F1 active et à jour (actualités/rumeurs/technique moteur). ⚠️ Accès direct impossible cette session (échec DNS). |
| F1aldia.com | f1aldia.com | Généraliste (contenu précis non confirmé) | Apparaît dans un comparatif de trafic/concurrence aux côtés de SoyMotor comme site F1 dédié ; ⚠️ contenu spécifique non confirmé directement, accès direct impossible cette session. |
| Motorpasión | motorpasion.com | Généraliste (portail auto) | Site auto espagnol avec rédacteur F1/MotoGP dédié (plus de dix ans d'expérience). |
| OKDiario | okdiario.com | Généraliste (portail d'actualité) | Section Sports avec sous-section Formule 1 dédiée. |
| F1-Fansite.com (version espagnole) | f1-fansite.com/es | Généraliste / média fan | Même structure/ownership que les éditions italienne et française (ProTrix/Léopold Pleijsier, depuis 2001). |
| GPFans (édition espagnole) | gpfans.com/es | Généraliste | Fait partie du même réseau international que les éditions anglaise/italienne, avec présence éditoriale dédiée en espagnol. |
| Marca Motor (section F1 de marca.com) | marca.com | Généraliste | ⚠️ Non confirmé — cité dans le brief de recherche comme l'un des deux grands quotidiens sportifs espagnols, mais la recherche ciblée n'a retourné aucun résultat direct ; à vérifier directement sur marca.com. |
| AS.com — Fórmula 1 | as.com | Généraliste | ⚠️ Non confirmé — même situation que Marca Motor ; à vérifier directement sur as.com. |

### Portugais/Brésilien

| Nom | URL | Catégorie | Notes |
|---|---|---|---|
| Grande Prêmio | grandepremio.uol.com.br | Généraliste | Portail motorsport majeur au Brésil, intégré à la verticale One Big Media (partenariat avec LiveSports) ; forte présence YouTube. ⚠️ Accès direct au site impossible cette session (échec de fetch) ; infos basées sur couverture secondaire. |
| TotalRace | — | Généraliste | Un des sites motorsport brésiliens les plus connus, fondé en 2011 par des journalistes F1 expérimentés ; partenariat avec Motorsport.com annoncé en 2015. ⚠️ Statut opérationnel actuel (2026) non confirmé — références trouvées datent de 2011-2015. |
| Band – Automobilismo/Fórmula 1 | band.com.br/esportes/automobilismo/formula-1 | Généraliste / Diffuseur | Portail sportif d'un diffuseur brésilien ; section dédiée (classements, calendrier, actualités, vidéos) ; contenu récent confirmé (juin 2026). |
| Globo / ge.globo (via SporTV et TV Globo) | ge.globo.com | Généraliste / Diffuseur | Détient les droits TV exclusifs F1 au Brésil à partir de 2026 (SporTV : les 24 GP en direct ; TV Globo : 15 courses en direct + 9 en résumé) ; portail sportif associé = source digitale majeure. |
| Motorshow | motorshow.com.br | Généraliste | Propriété du groupe ISTOÉ ; actualités F1 récurrentes (calendriers, guides de diffusion, comptes-rendus) ; articles confirmés jusqu'en juillet 2026. |
| Máquina do Esporte | maquinadoesporte.com.br/f1 | Généraliste | Section "/f1" dédiée avec actualités spécifiques F1. |
| Placar | placar.com.br/tudo-sobre/formula-1 | Généraliste | Site de magazine sportif brésilien avec page tag/sujet F1. |
| F1Mania.net | — | Généraliste | ⚠️ Décrit via une fiche d'annuaire de podcasts (audience majoritairement brésilienne) ; contenu direct du site non vérifié — source secondaire fragile. |
| Motorsport.com Brasil | br.motorsport.com | Généraliste | ⚠️ Non confirmé — existence quasi certaine (parallèle aux éditions italienne/espagnole confirmées) mais non vérifiée directement par recherche ou fetch cette session. |
| Record.pt — Modalidades/Motores/Fórmula 1 | record.pt/modalidades/motores/formula-1 | Généraliste (Portugal) | Quotidien sportif portugais avec section motos/F1 dédiée. Aucun portail F1 autonome basé au Portugal n'a été trouvé ; la couverture portugaise (Portugal, pas Brésil) passe par les sections motos des quotidiens généralistes (Record, A Bola, O Jogo). |
| rr.pt (Rádio Renascença, "Bola Branca") | rr.pt/bola-branca | Généraliste (Portugal) | Desk sportif radio avec couverture F1 (ex. annonce du retour du GP du Portugal). |

### Allemand

| Nom | URL | Catégorie | Notes |
|---|---|---|---|
| Motorsport-Total.com | motorsport-total.com | Généraliste / résultats | Site phare de Motorsport Network pour le marché germanophone ; auto-décrit comme site de référence "pour les fans, initiés et décideurs". |
| Motorsport.com (Deutschland) | motorsport.com/de | Généraliste | Édition allemande du réseau Motorsport Network, lancée en 2015 en parallèle de Motorsport-Total.com. ⚠️ Relation éditoriale exacte entre les deux sites (équipes distinctes ou contenu partagé) non confirmée. |
| Formel1.de | formel1.de | Généraliste / base de résultats | Un des plus grands sites F1 germanophones ; base de résultats détaillée remontant à 1950. |
| Auto Motor und Sport | auto-motor-und-sport.de | Généraliste + analyse/opinion | Volet F1 du grand magazine auto allemand ; connu pour la série vidéo d'analyse "Formel Schmidt" du journaliste vétéran Michael Schmidt. |
| Motorsport-Magazin.com | motorsport-magazin.com | Généraliste (multi-séries) | Géré par adrivo GmbH ; couvre F1, MotoGP, DTM, WEC ; ticker live, forum, application. |
| Sky Sport Deutschland (Formel 1) | sport.sky.de/formel1 | Diffuseur / Généraliste | Détenteur des droits payants allemands jusqu'en 2027. |
| Sport1 (Formel 1) | sport1.de/motorsport/formel1 | Diffuseur / Généraliste | Partenaire droits gratuits (accord avec Sky depuis 2023). |
| RTL.de (Formel 1 / RTL+) | rtl.de | Diffuseur / Généraliste | Partenaire gratuit diffusant une partie des courses (environ 7/24 en 2026 d'après les rapports) en coopération avec Sky. |
| F1-Insider.com | f1-insider.com | Insider / opinion | Fondé en 2015 par le journaliste vétéran Ralf Bach ; style tabloïd/scoops paddock, podcast associé. |
| F1-Fansite.com (édition allemande) | f1-fansite.com/de | Généraliste / média fan | Site fan indépendant actif depuis 2001 ; section allemande à actualité suivie. |
| Speedweek.com | speedweek.com | Généraliste motorsport | Site autrichien à large couverture motorsport incluant F1 ; largement lu dans toute la région DACH. ⚠️ Non revérifié fraîchement cette session (résultats de recherche renvoyaient des contenus anciens/non liés) — à confirmer directement. |
| ZDFheute – Thema Formel 1 | zdfheute.de/thema/formel-1-174.html | Généraliste / service public | Page thème F1 du service public allemand ZDF ; couverture occasionnelle, pas spécialiste. |
| autorevue.at (Sport) | autorevue.at/sport | Généraliste (Autriche) | Magazine auto autrichien avec sa propre couverture F1 ; outlet régional DACH distinct des sites basés en Allemagne. |
| Eurosport.de (Motorsport/Formel 1) | eurosport.de | Diffuseur / Généraliste | ⚠️ Non reconfirmé directement cette session — à vérifier avant publication. |
| Bild.de (Sport/Formel 1) | bild.de | Généraliste / tabloïd | ⚠️ Non reconfirmé directement cette session — tabloïd à fort trafic, couverture orientée personnalités plutôt que profondeur technique. |
| kicker.de (Motorsport) | kicker.de | Généraliste | ⚠️ Non reconfirmé directement cette session — principalement un site football avec une section motorsport/F1. |

### Néerlandais

| Nom | URL | Catégorie | Notes |
|---|---|---|---|
| GPFans.com (édition NL) | gpfans.com/nl | Généraliste / résultats | Détenu par Realtimes Network (raison sociale Fanreach BV) ; opération néerlandaise F1 à fort volume, forte orientation Verstappen. |
| GPblog.com (édition NL) | gpblog.com/nl | Généraliste + podcast | Fondé par Sebastiaan et Thierry Bakker ; Mediahuis Digital Enterprises détient 50% ; rédacteur en chef Tim Kraaij ; podcast vidéo quotidien "F1 Vandaag". |
| RacingNews365 | racingnews365.nl (NL) / racingnews365.com (global) | Généraliste, haute production | Issu du "plus grand site F1 des Pays-Bas", fondé par Ruud Dimmers ; international depuis 2021 ; cinq fois "Site de l'année" ; couverture très orientée Verstappen. |
| Motorsport.com (Nederland) | motorsport.com/nl | Généraliste | Édition néerlandaise lancée explicitement pour capter l'intérêt motorsport lié à Verstappen ("Max Verstappen-gekte"). |
| F1-Fansite.com (édition NL) | f1-fansite.com/nl | Généraliste / média fan | Site fan indépendant actif depuis 2001 ; section néerlandaise dédiée. |
| Formule1Nieuws.nl | formule1nieuws.nl | Généraliste / niche | ⚠️ Vérifié uniquement via une liste d'agrégateur néerlandais (Drimble) cette session — à confirmer directement avant publication. |
| Autosport.nl | autosport.nl | Généraliste / motorsport | ⚠️ Affiliation/ownership non confirmée directement cette session. |
| Autoweek.nl (Formule 1) | autoweek.nl | Généraliste (magazine auto grand public) | ⚠️ Non reconfirmé directement cette session — à vérifier. |
| Topgear.nl (Formule 1) | topgear.nl/formule-1 | Généraliste | Édition néerlandaise de la marque Top Gear ; actualités F1, calendriers, couverture du GP des Pays-Bas. |
| NOS (Sport / Formule 1) | nos.nl | Généraliste / service public | Diffuseur public néerlandais ; live-blogs et couverture faisant autorité du GP des Pays-Bas, pas spécialiste F1. |
| De Telegraaf (Sport / Formule 1) | telegraaf.nl | Généraliste / tabloïd | Plus grand quotidien payant néerlandais ; podcast F1 dédié (Erik van Haren & Christijan Albers). |
| AD.nl (Sportwereld / Formule 1) | ad.nl | Généraliste / tabloïd | Volet sportif d'Algemeen Dagblad ; podcast "AD Formule 1" ; envoie des reporters suivre Verstappen sur le terrain. |
| NU.nl (Sport / Formule 1) | nu.nl | Généraliste | ⚠️ Non reconfirmé directement cette session — un des plus grands sites d'actualité généraliste néerlandais, section F1 dédiée mais pas spécialiste. |
| GPToday.com | — | Statut incertain | ⚠️ **Exclu** — le domaine n'a pas pu être résolu cette session et la langue de publication principale n'a pas pu être confirmée comme néerlandaise (connaissance antérieure suggère un site historiquement surtout anglophone d'origine néerlandaise). Ne pas inclure sans vérification directe. |
| Formule1.nl | — | Statut incertain | ⚠️ **Exclu** — aucune confirmation directe cette session (pas de page "colofon"/à propos trouvée). À vérifier directement avant inclusion. |

## Journalistes et analystes indépendants

| Nom | Plateforme/URL | Langue | Spécialité | Notes |
|---|---|---|---|---|
| Craig Scarborough | X/Twitter ("ScarbsF1"/"ScarbsTech"), Motorsport.tech, F1TV Tech Talk, Race Tech Magazine, CAR Magazine | Anglais | Analyse technique (conception/réglementation) depuis ~25 ans | Pas de Substack/Patreon confirmé ; publie via plusieurs plateformes établies plutôt qu'un site personnel unique. |
| Giorgio Piola | Illustrations syndiquées via Autosport/Motorsport.com (pas de plateforme personnelle confirmée) | Italien/Anglais (sorties bilingues) | Illustration technique, couvre la F1 depuis 1969 | Pas de plateforme indépendante personnelle identifiée ; auteur de la série de livres annuelle "Formula 1 Technical Analysis" (dernier volume 2016-2018 publié en 2019). |
| Matthew Somerfield | Substack ("SomersF1"), PlanetF1 (rédacteur technique) | Anglais | Analyse technique (développement des monoplaces, directives techniques) | Combine plateforme indépendante (Substack) et poste rédactionnel chez PlanetF1 — indépendance partielle. |
| Gary Anderson | The Race (chronique), The Telegraph (chronique), podcast propre ("The Gary Anderson F1 Show") | Anglais | Analyse technique, ex-directeur technique F1 (Jordan, Stewart/Jaguar) | Ex-personnel d'écurie devenu analyste média ; publie via des médias établis + son propre podcast. |
| Mark Hughes | The Race, Motor Sport Magazine | Anglais | Analyse stratégique/pilotage | Rattaché à des médias établis, pas une plateforme personnelle indépendante. |
| Peter Windsor | Chaîne YouTube personnelle | Anglais | Analyse historique/technique/insider, ex-directeur d'écurie Williams | L'un des cas les plus "véritablement indépendants" (plateforme auto-gérée). |
| Adam Cooper | Substack ("Adam Cooper on F1") | Anglais | Actualité, dossiers, business et histoire de la F1 | Journaliste freelance vétéran (paddock depuis le milieu des années 1990) ; plateforme indépendante confirmée. |
| Joe Saward | Blog propre ("Joeblogsf1") + newsletter business payante (JSBM) | Anglais | Actualité/commentaire insider paddock indépendant depuis 1988 | Auto-décrit comme "l'une des voix les plus indépendantes du journalisme F1" ; cas de référence pour l'indépendance réelle. |
| James Allen | JamesAllenonF1.com | Anglais | Journalisme de stratégie/course issu de la diffusion (ex. UBS Race Strategy Report) | ⚠️ **Pas réellement indépendant** — le site est désormais pleinement détenu/intégré à Motorsport Network, malgré son origine de blog personnel (2009). |
| Dieter Rencken | RacingNews365 (statut en conflit avec un rôle rapporté à la FIA) | Anglais | Sourcing gouvernance/finance/politique F1 | ⚠️ Statut actuel contesté entre les sources : une fiche le présente comme Directeur éditorial de RacingNews365 depuis 2022, une autre comme conseiller du président de la FIA et Commissaire F1 FIA — ce qui, si exact, signifierait qu'il n'est plus journaliste indépendant. À vérifier directement avant de le présenter comme "indépendant". |
| Bernie Collins | Sky Sports F1 / F1TV (diffusion, pas auto-publié) | Anglais | Analyse de stratégie de course, ex-Head of Race Strategy Aston Martin | ⚠️ **Affiliée à un diffuseur, pas indépendante** — ex-personnel d'écurie devenue experte salariée Sky Sports F1/F1TV. |
| Marc Priestley | Podcast "Pitlane Life Lessons", chaîne YouTube "F1Elvis", apparitions Sky Sports/talkSPORT | Anglais | Analyse "vue de mécanicien"/dans les coulisses, ex-mécanicien McLaren | Mix de plateformes propres (podcast/YouTube) et d'apparitions chez des diffuseurs ; indépendance non confirmée comme totalement auto-financée. |
| Albert Fàbrega | X/Twitter, commentaire TV TV3/Movistar, podcast "The After Lap" (avec Jaime Alguersuari) | Espagnol | Sourcing paddock/rumeurs | Connu pour la controverse de la rumeur Alonso (octobre 2023). |
| Erik van Haren | De Telegraaf (affilié média), "Telegraaf Formule 1-podcast" (avec Christijan Albers) | Néerlandais | Sourcing paddock insider, notamment Verstappen/Red Bull | ⚠️ **Affilié à un média** (De Telegraaf) plutôt que véritablement indépendant. |
| Leo Turrini | Blog personnel (via le réseau Quotidiano Nazionale, référencé comme "Profondo Rosso"), chronique dans un quotidien régional | Italien | Sourcing profond Ferrari/Maranello | Profil individuel fort mais rattaché à un réseau de presse régional. |
| Michael Schmidt | Auto Motor und Sport (format vidéo/podcast "Formel Schmidt") | Allemand | Insider paddock F1 vétéran (~750 Grands Prix couverts) | ⚠️ **Affilié média**, pas indépendant. Retraite annoncée en décembre 2025 mais la page auteur du site affichait encore des bylines 2026 — statut de poursuite d'activité incertain/contradictoire selon les sources. |
| Christian Nimmervoll | Motorsport-Total.com / Motorsport.com Allemagne / Formel1.de (rédacteur en chef) | Allemand | Journalisme F1 germanophone de longue date (site personnel depuis 1999, puis Motorsport-Total.com) | ⚠️ **Affilié média, pas indépendant** — malgré une carrière individuelle de longue date reconnue dans le milieu. |

**Constat transversal :** l'indépendance "plateforme propre, pas liée à un média" (Substack, YouTube, podcast auto-financé) est surtout documentée en anglais (Saward, Cooper, Somerfield, Windsor, Anderson). Pour le français, l'allemand, l'italien, le néerlandais et l'espagnol, les noms individuels les plus reconnus identifiés dans cette recherche restent rattachés à un journal, diffuseur ou réseau (De Telegraaf, Auto Motor und Sport, réseau Quotidiano Nazionale, Motorsport-Total.com, TV3/Movistar) malgré une forte réputation personnelle. Aucun équivalent "blog/Substack/Patreon individuel, non rattaché à un média" n'a pu être confirmé pour ces langues — à traiter comme un vrai manque de sourcing, pas un simple oubli. Aucun journaliste technique francophone indépendant équivalent n'a été identifié (Julien Billiotte a été évoqué comme piste mais n'a pas pu être confirmé).

## Communautés fan et forums techniques pointus

Communautés de fans et forums où des amateurs très pointus publient des analyses détaillées (données, statistiques, technique) — distinct des médias et des journalistes professionnels ci-dessus. Utile pour du contexte technique approfondi ou pour repérer un angle qu'aucun média n'a couvert, jamais comme source unique d'un fait (pas de contrôle éditorial professionnel) et jamais pour du contenu "people" (voir règle en tête de ce document).

| Nom | URL | Catégorie | Notes |
|---|---|---|---|
| r/F1Technical | https://reddit.com/r/F1Technical | Forum (Reddit) — technique pointu | ~383k membres ; dédié à l'analyse technique (aéro, moteur, stratégie, réglementation) — contenu nettement plus pointu que r/formula1. Discussions type "dirty air vs clean air", comparatifs d'écarts en qualification entre coéquipiers. Pas de contrôle éditorial professionnel — à traiter comme piste/contexte, jamais comme source unique d'un fait. |
| r/formula1 | https://reddit.com/r/formula1 | Forum (Reddit) — généraliste | ~4,8M membres ; hub généraliste grand public, qualité très variable (de l'analyse sérieuse à la réaction à chaud). Utile pour prendre la température générale, pas pour du factuel fiable. |
| r/GrandPrixRacing | https://reddit.com/r/GrandPrixRacing | Forum (Reddit) — alternatif, peu modéré | Présenté par certains comme plus "sérieux"/analytique que r/formula1 par des guides tiers, mais le ton assumé par la communauté elle-même est plutôt "espace alternatif peu modéré" — à ne pas survendre comme plus rigoureux sans vérification au cas par cas. ⚠️ Chiffres d'audience contradictoires selon la source (de ~190k à ~1,2M membres). |
| Clip The Apex (cliptheapex.com) | https://www.cliptheapex.com | Forum — stats/historique, communauté de longue date | Forum F1 actif depuis au moins 2011-2013 (a participé à une "interforum league" en 2013) ; communauté orientée statistiques et discussion de fond plutôt que news. |
| TheJudge13 (thejudge13.com) | https://www.thejudge13.com | Blog fan — technique, vulgarisation | Actif depuis au moins 2012 ; auteur resté anonyme ; réputé pour expliquer la technique F1 en langage clair pour non-ingénieurs ; toujours listé parmi les meilleurs blogs F1 UK en 2026. |
| F1Metrics | — (blog, URL exacte non confirmée cette session) | Blog fan — analyse statistique | Tenu par Andrew Phillips (mathématicien) ; modèles statistiques de classement des pilotes toutes époques confondues (comparé à d'autres modèles académiques : Eichenberger & Stadelmann 2009, Bell et al. 2016). ⚠️ Page d'origine non atteinte directement cette session — activité actuelle (2026) non confirmée. |
| Forums Autosport — "Historical Research" et discussions stats | https://forums.autosport.com | Forum — historique/stats | Sous-forum dédié aux questions historiques F1 pointues (énigmes d'époque, recherche de données anciennes) ; distinct du site média Autosport lui-même (déjà listé en section Anglais). |
| GrandPrix.com | https://www.grandprix.com | Site historique — base de données | Issu d'Inside F1 (fondé 1994, racheté le domaine en 2001) ; la FIA l'aurait désigné "source officielle d'information" pour sa base de données historique 1950-présent à l'époque. ⚠️ Niveau d'activité et de fiabilité actuels (2026) non revérifiés cette session — statut à confirmer avant usage. |

**Non retenu, à vérifier si besoin :** "not606" (ancien forum mentionné dans un classement inter-forums de 2013, statut actuel introuvable) — pas inclus faute de confirmation.

## Pistes à vérifier

- **Toutes les URL d'écuries, FIA et Pirelli** : résolues le 2026-10-12 via correction directe de l'utilisateur (voir table "Sources institutionnelles" ci-dessus). Point restant : existence et contenu actuel de `corp.formula1.com` (hub presse corporate Formula1.com, distinct de `fia.com/news`) toujours non confirmés. Pour Pirelli, l'édition anglophone équivalente à `pirelli.com/global/fr-fr/race/formule-1/` (probablement `/global/en-gb/...` ou proche) reste à vérifier avant usage dans un article en anglais.
- **Français** : existence d'un spécialiste technique/stratégique francophone comparable à RaceFans/The Race non confirmée — pourrait être un vrai manque du paysage médiatique français plutôt qu'un angle mort de la recherche. Statut opérationnel de F1i.com (anglais) vs F1i.fr (français) à clarifier — désaccord apparent entre les notes sur l'activité du site.
- **Espagnol** : Marca Motor (marca.com) et AS.com — Fórmula 1 non confirmés directement ; existence d'une édition "Motorsport.com Latam" distincte de l'édition Espagne non confirmée.
- **Néerlandais** : GPToday.com exclu — langue de publication principale (néerlandais vs anglais) non confirmée, et le domaine n'a pas pu être résolu. Formule1.nl exclu — non confirmé directement. Formule1Nieuws.nl, Autosport.nl, Autoweek.nl, NU.nl non reconfirmés directement cette session.
- **Allemand** : Speedweek.com, Eurosport.de, Bild.de, kicker.de non reconfirmés directement cette session (connaissances générales seulement). Relation éditoriale exacte entre Motorsport-Total.com et Motorsport.com (Deutschland) non confirmée.
- **Italien** : accès direct à FormulaPassion.it et F1Sport.it impossible cette session ; La Gazzetta dello Sport, Corriere dello Sport et Sky Sport F1 Italia non confirmés directement (connaissance générale).
- **Portugais/Brésilien** : accès direct à Grande Prêmio impossible cette session ; statut opérationnel actuel de TotalRace non confirmé (références datées 2011-2015) ; existence de Motorsport.com Brasil non confirmée directement ; aucun portail F1 autonome basé au Portugal identifié (couverture via sections motos des quotidiens généralistes uniquement).
- **Journalistes indépendants** : statut actuel de Dieter Rencken (journaliste RacingNews365 vs rôle FIA) en conflit entre les sources — à clarifier avant de le qualifier d'indépendant. Statut de poursuite d'activité de Michael Schmidt après l'annonce de retraite (décembre 2025) incertain. Aucun(e) journaliste individuel(le) véritablement indépendant(e) (plateforme propre, non rattaché à un média) identifié(e) en français, italien, allemand, néerlandais ou espagnol — à rechercher spécifiquement si cette lacune doit être comblée.
- **Communautés fan** : URL exacte du blog F1Metrics non confirmée ; activité actuelle (2026) de F1Metrics, GrandPrix.com et Clip The Apex non revérifiée en session ; chiffres d'audience de r/GrandPrixRacing contradictoires selon la source. Recherche volontairement limitée à l'anglophone pour cette catégorie — pas de pistes de forums/communautés fan pointues cherchées en français, italien, allemand, néerlandais, espagnol ou portugais : angle mort à combler si utile.
