// Comportement interactif de la page, porté depuis la maquette (onglets FR/EN, sommaire,
// numéro sticky, mise en gras des noms, aperçu de lien au survol, pont entre les onglets).
// Retourne une fonction de nettoyage pour l'effet React qui l'appelle.
export function initPitWall(){
  var cleanups = [];
  // ---- Team colors (petits repères d'identité, pas des logos) ----
  var TEAM_COLORS = {
    "McLaren":"#FF8000", "Mercedes":"#00A19B", "Ferrari":"#E8002D", "Red Bull":"#1B3A93",
    "Williams":"#00A3E0", "Audi":"#B01030", "Aston Martin":"#229971", "Alpine":"#FF87BC",
    "Racing Bulls":"#6C98FF", "Cadillac":"#C9A24B", "Haas":"#9AA0AC"
  };

  // ---- Driver data (position deltas computed from départ → arrivée) ----
  var drivers = [
    ["Lando Norris","McLaren","1","1","La référence. Perd la tête à la reprise, ne panique pas, préserve suffisamment ses pneus, hausse le rythme en durs et réussit l'attaque décisive sur Antonelli. La stratégie crée l'occasion ; son dépassement la convertit."],
    ["Kimi Antonelli","Mercedes","3","2","Deux départs remarquables et une première moitié de course très maîtrisée. Il a réellement mis Norris sous pression. Moins à l'aise avec le deuxième train de durs et légèrement hésitant derrière Hamilton, mais P2 représente le maximum une fois Norris passé."],
    ["George Russell","Mercedes","2","3","Départs décevants : battu par Antonelli puis Piastri. Il récupère P3 grâce à l'arrêt lent de McLaren, puis réalise une fin de course de très haut niveau pour résister aux Ferrari. Son podium est mérité, même s'il a été aidé par le dernier VSC."],
    ["Lewis Hamilton","Ferrari","5","4","Course très solide et probablement le meilleur rythme Ferrari sur la durée. Il dépasse Piastri, revient sur Leclerc puis sur Russell. Le podium était possible, sans être garanti. Sa frustration est fondée ; son sarcasme radio, moins utile."],
    ["Charles Leclerc","Ferrari","6","5","Très agressif et précis dans ses dépassements, notamment sur Piastri. Rythme proche de Hamilton et bonne gestion. Mais sa prolongation d'un tour complique la course de son équipier et son propre deuxième arrêt lent condamne pratiquement le podium."],
    ["Oscar Piastri","McLaren","4","6","Excellent dépassement sur Russell à la reprise, puis course en chute libre. L'arrêt lent lui coûte P3, mais n'explique pas les sept dixièmes au tour perdus face à Norris sur un relais comparable. La principale interrogation technique du week-end."],
    ["Liam Lawson","Red Bull","8","7","Très bonne adaptation à une Red Bull difficile, en remplacement d'Hadjar. Proche de Verstappen en qualification et meilleur des autres en course. La pénalité pour ralentissement insuffisant sous drapeau jaune ternit légèrement la prestation."],
    ["Nico Hülkenberg","Audi","13","8","L'une des courses du jour : réaction spectaculaire pour éviter Bortoleto, dépassements propres et rythme clairement supérieur au reste du milieu de grille. P8 sans bénéficier seulement des abandons."],
    ["Fernando Alonso","Aston Martin","18","9","Performance exceptionnelle. Les tendres tenus 32 tours après la reprise, puis 37 tours en durs jusqu'à l'arrivée. Gestion, rythme en air libre et défense sur Gasly : pilote et équipe ont transformé une voiture de fond de grille en points."],
    ["Pierre Gasly","Alpine","11","10","Très bons départs, évite Verstappen et se maintient constamment dans la bataille des points. Plusieurs combats réussis, mais impossible de passer Alonso malgré une longue pression. Il valide les progrès du nouveau package Alpine."],
    ["Yuki Tsunoda","Racing Bulls","12","11","Prestation très honorable pour un remplacement ponctuel chez Racing Bulls. Quelques beaux dépassements et un rythme compétitif, mais une sortie de piste et une stratégie à trois arrêts moins efficace que celle d'Alonso lui coûtent le point."],
    ["Arvid Lindblad","Racing Bulls","10","12","Son drive-through pour dépassement sous drapeaux jaunes détruit sa course. Ensuite, son rythme et ses dépassements sont bons, et il joue collectivement en retenant Gasly pour aider Tsunoda. Trop grosse erreur initiale pour espérer mieux."],
    ["Gabriel Bortoleto","Audi","9","13","Mauvais envol puis tête-à-queue très dangereux, heureusement sans contact. Il remonte de la 18e à la 13e place, mais Hülkenberg démontre que l'Audi avait le rythme pour marquer. Occasion manquée."],
    ["Franco Colapinto","Alpine","14","14","Départ impressionnant avec quatre places gagnées, immédiatement annulé par un dépassement sous drapeaux jaunes et un drive-through. Deuxième pénalité en fin de course. Du potentiel, mais une gestion des neutralisations insuffisante."],
    ["Sergio Pérez","Cadillac","PL","15","Modification du réglage et départ des stands plutôt logique vu le manque de performance initial. Il réussit l'overcut sur Bottas et termine, mais reste très loin des points. VSC défavorable."],
    ["Carlos Sainz","Williams","17","16","Long premier relais intéressant et passage provisoire dans le top 10, mais la stratégie le laisse avec des durs très usés. Son blocage au virage 1 et l'accrochage avec Albon restent néanmoins de sa responsabilité."],
    ["Alex Albon","Williams","16","DNF","Rythme correct en air libre, mais Williams le fait rentrer trop tôt pour couvrir un undercut, le renvoyant dans le trafic et les drapeaux bleus. Sa course se termine à cause de l'erreur de Sainz."],
    ["Valtteri Bottas","Cadillac","21","DNF","Course plutôt anonyme dans le fond de grille avant un problème hydraulique affectant l'aileron arrière. Difficile de juger son pilotage, mais Cadillac manquait de rythme."],
    ["Esteban Ocon","Haas","15","DNF","Jamais réellement dans la bataille des points. Ses arrêts sont bien exécutés, mais sa Haas n'a pas le rythme avant la panne supposée du groupe propulseur."],
    ["Lance Stroll","Aston Martin","19","DNF","Dommages ou problème de comportement dès le début, glisse importante et absence de rythme. L'abandon est compréhensible, mais le contraste avec la remontée d'Alonso est très défavorable."],
    ["Oliver Bearman","Haas","20","DNF","Impossible à évaluer : extinction complète de la voiture pendant le tour de formation précédant la reprise."],
    ["Max Verstappen","Red Bull","7","DNF","Week-end déjà faible en performance pure, puis premier tour trop agressif sur une piste encore piégeuse. La marge était minuscule, mais l'erreur est bien la sienne. Rare contre-performance nette du pilote."]
  ];

  var teams = [
    ["McLaren","Excellente lecture avec Norris : prolongation décisive, confiance dans le dur, pas d'arrêt réflexe sous le VSC. Beaucoup moins propre avec Piastri : arrêt lent et mauvaise compréhension de son manque de rythme. Victoire brillante, mais résultat global inférieur au potentiel des deux voitures."],
    ["Mercedes","Double podium maximisé. Arrêt anticipé défensif logique, bon usage du VSC, décision cohérente de laisser Russell dehors et ordre d'équipe rationnel. L'exécution du swap pouvait être plus fluide. La victoire est perdue principalement sur le rythme en durs, pas au muret."],
    ["Ferrari","Voiture probablement capable d'un podium. Le décalage stratégique initial était pertinent, mais communication imprécise, lenteur de décision, arrêt lent de Leclerc et absence de consigne claire entre les pilotes. P4-P5 est correct comptablement, décevant au regard du rythme."],
    ["Red Bull","Week-end très préoccupant en performance. Aucun choix stratégique ne pouvait remettre Verstappen dans la bataille des trois meilleures équipes. Lawson sauve six points avec une voiture qu'il découvrait."],
    ["Audi","Très bonne course côté Hülkenberg : choix propres, arrêts rapides, voiture compétitive. La stratégie permet aussi à Bortoleto de récupérer plusieurs positions, mais son premier tour a rendu les points presque impossibles."],
    ["Aston Martin","Peut-être la meilleure stratégie du milieu de grille. L'équipe transforme avec Alonso un plan initial à deux arrêts en un seul arrêt effectif après le drapeau rouge. Très bonne adaptation. Le problème de Stroll empêche un bilan complet."],
    ["Alpine","Le package évolué de Gasly semble fonctionner. Stratégie suffisamment solide pour conserver le dernier point, mais aucune solution pour dépasser Alonso. Les pénalités de Colapinto relèvent surtout du pilote."],
    ["Racing Bulls","Bonne coopération entre les voitures, Lindblad ralentissant Gasly pour aider Tsunoda. Mais la stratégie à trois arrêts de Tsunoda et son long dernier relais en tendres ne battent pas le plan plus simple d'Alonso. Occasion de points manquée."],
    ["Williams","Mauvais dimanche. Arrêt trop précoce d'Albon, Sainz laissé sur des pneus très usés et, finalement, collision entre les deux voitures. Même avec une monoplace faible, l'équipe aurait dû ramener les deux autos à l'arrivée."],
    ["Cadillac","Le départ des stands de Pérez était logique pour chercher un meilleur réglage. L'overcut interne fonctionne, mais le rythme reste insuffisant et la panne hydraulique de Bottas confirme un problème de fiabilité."],
    ["Haas","Double abandon lié vraisemblablement au groupe propulseur. Les arrêts sont rapides, dont le meilleur de la saison pour Ocon, mais le rythme ne permettait de toute façon pas de viser les points."]
  ];

  function dot(team){
    var c = TEAM_COLORS[team] || "#8A8F99";
    return '<span class="dot" style="background:'+c+'"></span>';
  }
  function deltaChip(start, end){
    if(end === "DNF") return '<span class="delta dnf">DNF</span>';
    if(start === "PL") return '<span class="delta neutral">stands</span>';
    var d = parseInt(start,10) - parseInt(end,10);
    if(d > 0) return '<span class="delta good">+'+d+'</span>';
    if(d < 0) return '<span class="delta bad">'+d+'</span>';
    return '<span class="delta neutral">=</span>';
  }

  var driverRows = drivers.map(function(d){
    return '<tr><td class="driver">'+dot(d[1])+d[0]+'</td><td class="pos">'+d[2]+' → '+d[3]+deltaChip(d[2],d[3])+'</td><td>'+d[4]+'</td></tr>';
  }).join('');
  document.getElementById('driver-table').innerHTML = driverRows;

  var teamRows = teams.map(function(t){
    return '<tr><td class="driver">'+dot(t[0])+t[0]+'</td><td>'+t[1]+'</td></tr>';
  }).join('');
  document.getElementById('team-table').innerHTML = teamRows;

  // ---- English driver/team data (same deltas, translated analysis) ----
  var driversEn = [
    ["Lando Norris","McLaren","1","1","The benchmark. Loses the lead at the restart, doesn't panic, preserves his tyres enough, lifts his pace on hards and lands the decisive move on Antonelli. The strategy creates the opportunity; his overtake converts it."],
    ["Kimi Antonelli","Mercedes","3","2","Two outstanding starts and a very well-controlled first half of the race. He genuinely put Norris under pressure. Less comfortable on the second set of hards and slightly hesitant behind Hamilton, but P2 is the ceiling once Norris gets past."],
    ["George Russell","Mercedes","2","3","Disappointing starts: beaten by Antonelli, then Piastri. He recovers P3 thanks to McLaren's slow stop, then delivers a top-tier closing stint to hold off the Ferraris. His podium is deserved, even if the late VSC helped him."],
    ["Lewis Hamilton","Ferrari","5","4","A very strong race and probably Ferrari's best pace over a stint. He passes Piastri, closes on Leclerc, then on Russell. The podium was possible, though not guaranteed. His frustration is justified; his radio sarcasm, less useful."],
    ["Charles Leclerc","Ferrari","6","5","Aggressive and precise in his overtakes, especially on Piastri. Pace close to Hamilton's, and good management. But extending by a lap complicates his teammate's race, and his own second slow stop all but ends his podium chances."],
    ["Oscar Piastri","McLaren","4","6","An excellent move on Russell at the restart, then a race in free fall. The slow stop costs him P3, but doesn't explain the seven tenths a lap lost to Norris on a comparable stint. The weekend's biggest technical question mark."],
    ["Liam Lawson","Red Bull","8","7","Very good adaptation to a difficult Red Bull, stepping in for Hadjar. Close to Verstappen in qualifying and the best of the rest in the race. The penalty for insufficient slowing under yellows slightly tarnishes the performance."],
    ["Nico Hülkenberg","Audi","13","8","One of the drives of the day: a spectacular reaction to avoid Bortoleto, clean overtakes, and a pace clearly above the rest of the midfield. P8 owed to more than just other retirements."],
    ["Fernando Alonso","Aston Martin","18","9","An exceptional performance. Softs made to last 32 laps after the restart, then 37 laps on hards to the flag. Management, clean-air pace and a strong defence against Gasly: driver and team turned a back-of-the-grid car into points."],
    ["Pierre Gasly","Alpine","11","10","Very good starts, avoids Verstappen and stays constantly in the points fight. Several successful battles, but never able to get past Alonso despite sustained pressure. Confirms the progress of Alpine's new package."],
    ["Yuki Tsunoda","Racing Bulls","12","11","A very creditable showing for a one-off stand-in at Racing Bulls. Some nice overtakes and competitive pace, but a track excursion and a less efficient three-stop strategy than Alonso's cost him the point."],
    ["Arvid Lindblad","Racing Bulls","10","12","His drive-through for overtaking under yellows wrecks his race. After that, his pace and overtakes are good, and he plays the team game by holding up Gasly to help Tsunoda. Too big an early mistake to hope for more."],
    ["Gabriel Bortoleto","Audi","9","13","A poor getaway, then a genuinely dangerous spin, thankfully without contact. He climbs from 18th to 13th, but Hülkenberg shows the Audi had the pace to score. A missed opportunity."],
    ["Franco Colapinto","Alpine","14","14","An impressive start gaining four places, immediately wiped out by an overtake under yellows and a drive-through. A second penalty late on. Real potential, but not enough discipline around the neutralisations."],
    ["Sergio Pérez","Cadillac","PL","15","A pit-lane start and setup change is fairly logical given the early lack of pace. He pulls off the overcut on Bottas and finishes, but remains far from the points. Unfavourable VSC timing."],
    ["Carlos Sainz","Williams","17","16","An interesting long first stint and a brief spell in the provisional top ten, but the strategy leaves him on badly worn hards. His lock-up at Turn 1 and the collision with Albon remain on him, though."],
    ["Alex Albon","Williams","16","DNF","Decent pace in clean air, but Williams brings him in too early to cover an undercut, sending him back into traffic and blue flags. His race ends because of Sainz's mistake."],
    ["Valtteri Bottas","Cadillac","21","DNF","A largely anonymous race at the back before a hydraulic issue affecting the rear wing. Hard to judge his driving, but Cadillac simply lacked pace."],
    ["Esteban Ocon","Haas","15","DNF","Never really in the points fight. His stops are well executed, but his Haas lacked the pace even before the presumed power-unit failure."],
    ["Lance Stroll","Aston Martin","19","DNF","Damage or a handling issue from early on, significant sliding and no pace. The retirement is understandable, but the contrast with Alonso's recovery drive is stark."],
    ["Oliver Bearman","Haas","20","DNF","Impossible to assess: a complete power-unit shutdown during the formation lap ahead of the restart."],
    ["Max Verstappen","Red Bull","7","DNF","Already a weak weekend on raw pace, then a first lap too aggressive on a still-tricky track. The margin was tiny, but the mistake is his own. A rare, clean off-day for the driver."]
  ];
  var teamsEn = [
    ["McLaren","An excellent read with Norris: the decisive extension, trust in the hard tyre, no reflex stop under the VSC. Much less clean with Piastri: a slow stop and a poor understanding of his lack of pace. A brilliant win, but an overall result below what both cars could deliver."],
    ["Mercedes","A maximised double podium. A logical, defensive early stop, good use of the VSC, a sound call to leave Russell out, and a rational team order. The swap itself could have been executed more smoothly. The win was lost mainly on hard-tyre pace, not on the pit wall."],
    ["Ferrari","A car probably capable of a podium. The initial strategic split made sense, but imprecise communication, slow decision-making, a slow stop for Leclerc and no clear instruction between the drivers held it back. P4-P5 is fine on paper, disappointing given the pace."],
    ["Red Bull","A genuinely worrying weekend on performance. No strategic call could have put Verstappen back into the fight among the top three teams. Lawson salvages six points in a car he was still learning."],
    ["Audi","A very good race for Hülkenberg: clean calls, quick stops, a competitive car. The strategy also lets Bortoleto recover several positions, but his first-lap incident made points almost impossible."],
    ["Aston Martin","Perhaps the best strategy in the midfield. The team turns an initial two-stop plan into an effective one-stopper for Alonso after the red flag. Very good adaptation. Stroll's issue prevents a full team verdict."],
    ["Alpine","Gasly's upgraded package looks like it's working. A strategy solid enough to hold onto the last point, but no answer for getting past Alonso. Colapinto's penalties are mostly on the driver."],
    ["Racing Bulls","Good cooperation between the cars, with Lindblad holding up Gasly to help Tsunoda. But Tsunoda's three-stop strategy and long final stint on softs don't beat Alonso's simpler plan. A missed points opportunity."],
    ["Williams","A bad Sunday. Albon brought in too early, Sainz left out on badly worn tyres and, in the end, a collision between the two cars. Even with a weak car, the team should have brought both home."],
    ["Cadillac","Pérez's pit-lane start and setup change made sense as a search for a better balance. The internal overcut works, but pace remains insufficient, and Bottas's hydraulic failure confirms a reliability concern."],
    ["Haas","A double retirement likely tied to the power unit. The stops themselves are quick, including the team's best of the season for Ocon, but the pace was never going to be enough for points anyway."]
  ];
  var driverRowsEn = driversEn.map(function(d){
    return '<tr><td class="driver">'+dot(d[1])+d[0]+'</td><td class="pos">'+d[2]+' → '+d[3]+deltaChip(d[2],d[3])+'</td><td>'+d[4]+'</td></tr>';
  }).join('');
  var driverTableEn = document.getElementById('driver-table-en');
  if(driverTableEn) driverTableEn.innerHTML = driverRowsEn;
  var teamRowsEn = teamsEn.map(function(t){
    return '<tr><td class="driver">'+dot(t[0])+t[0]+'</td><td>'+t[1]+'</td></tr>';
  }).join('');
  var teamTableEn = document.getElementById('team-table-en');
  if(teamTableEn) teamTableEn.innerHTML = teamRowsEn;

  // ---- Mise en gras des noms de pilotes / écuries dans le texte courant ----
  var NAMES = ["Antonelli","Hülkenberg","Verstappen","Bortoleto","Colapinto","Lindblad","Tsunoda","Bearman","Stroll",
    "Alonso","Gasly","Sainz","Albon","Bottas","Ocon","Lawson","Pérez","Norris","Russell","Piastri","Leclerc","Hamilton",
    "Vasseur","Wolff","Hadjar",
    "Red Bull-Ford","Red Bull","Racing Bulls","Aston Martin","McLaren","Mercedes","Ferrari","Williams","Cadillac","Alpine","Audi","Haas"];
  NAMES.sort(function(a,b){ return b.length - a.length; });
  function escapeReg(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
  var namePattern;
  try{
    namePattern = new RegExp('(?<![\\p{L}\\p{N}])(' + NAMES.map(escapeReg).join('|') + ')(?![\\p{L}\\p{N}])', 'gu');
  }catch(e){ namePattern = null; }

  function highlightNames(el){
    if(!namePattern) return;
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
      acceptNode: function(node){
        var p = node.parentNode;
        if(!p || p.nodeName === 'A' || p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE') return NodeFilter.FILTER_REJECT;
        if(p.classList && p.classList.contains('name')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    var n;
    while(n = walker.nextNode()){
      namePattern.lastIndex = 0;
      if(namePattern.test(n.nodeValue)) nodes.push(n);
    }
    nodes.forEach(function(node){
      var text = node.nodeValue;
      var frag = document.createDocumentFragment();
      var lastIndex = 0, m;
      namePattern.lastIndex = 0;
      while(m = namePattern.exec(text)){
        if(m.index > lastIndex) frag.appendChild(document.createTextNode(text.slice(lastIndex, m.index)));
        var span = document.createElement('span');
        span.className = 'name';
        span.textContent = m[0];
        frag.appendChild(span);
        lastIndex = m.index + m[0].length;
        if(m[0].length === 0) namePattern.lastIndex++;
      }
      if(lastIndex < text.length) frag.appendChild(document.createTextNode(text.slice(lastIndex)));
      node.parentNode.replaceChild(frag, node);
    });
  }
  document.querySelectorAll('.prose p, .callout, .subverdict, .verdict, .verdictgrid li').forEach(highlightNames);

  // ---- Tabs + language (2D state: view × lang) ----
  var tabRace = document.getElementById('tab-race');
  var tabPreview = document.getElementById('tab-preview');
  var viewRace = document.getElementById('view-race');
  var viewRaceEn = document.getElementById('view-race-en');
  var viewPreview = document.getElementById('view-preview');
  var viewPreviewEn = document.getElementById('view-preview-en');
  var tocRace = document.getElementById('toc-race');
  var tocRaceEn = document.getElementById('toc-race-en');
  var tocPreview = document.getElementById('toc-preview');
  var tocPreviewEn = document.getElementById('toc-preview-en');
  var clock = document.getElementById('readclock');
  var langToggle = document.getElementById('langtoggle');
  var langLabel = document.getElementById('langlabel');
  var langNote = document.getElementById('langnote');

  var state = { view: 'race', lang: 'fr' };
  try{
    state.view = localStorage.getItem('pitwall-tab') || 'race';
    state.lang = localStorage.getItem('pitwall-lang') || 'fr';
  }catch(e){}

  function wordCount(el){ return el.innerText.trim().split(/\s+/).length; }
  function updateClock(el){
    var minutes = Math.max(1, Math.round(wordCount(el) / 210));
    clock.textContent = '≈ '+minutes+' min de lecture';
  }

  var allViews = [viewRace, viewRaceEn, viewPreview, viewPreviewEn];
  var allTocs = [tocRace, tocRaceEn, tocPreview, tocPreviewEn];

  function render(){
    allViews.forEach(function(v){ if(v) v.classList.add('hidden'); });
    allTocs.forEach(function(t){ if(t) t.classList.add('hidden'); });

    var activeView, activeToc;
    if(state.view === 'race'){
      activeView = state.lang === 'en' ? viewRaceEn : viewRace;
      activeToc = state.lang === 'en' ? tocRaceEn : tocRace;
    } else {
      activeView = state.lang === 'en' ? viewPreviewEn : viewPreview;
      activeToc = state.lang === 'en' ? tocPreviewEn : tocPreview;
    }
    activeView.classList.remove('hidden');
    activeToc.classList.remove('hidden');
    updateClock(activeView);

    tabRace.setAttribute('aria-selected', state.view === 'race' ? 'true' : 'false');
    tabPreview.setAttribute('aria-selected', state.view === 'preview' ? 'true' : 'false');

    langLabel.textContent = state.lang.toUpperCase();
    langToggle.setAttribute('aria-label', state.lang === 'fr' ? 'Switch to English' : 'Passer en français');
    if(langNote) langNote.classList.remove('show');

    try{
      localStorage.setItem('pitwall-tab', state.view);
      localStorage.setItem('pitwall-lang', state.lang);
    }catch(e){}
  }

  tabRace.addEventListener('click', function(){ state.view = 'race'; render(); });
  tabPreview.addEventListener('click', function(){ state.view = 'preview'; render(); });
  if(langToggle){
    langToggle.addEventListener('click', function(){
      state.lang = state.lang === 'fr' ? 'en' : 'fr';
      render();
    });
  }

  function bridgeToPreview(){
    state.view = 'preview';
    render();
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({top:0, behavior: reduced ? 'auto' : 'smooth'});
  }
  ['bridge-to-preview', 'bridge-to-preview-en'].forEach(function(id){
    var btn = document.getElementById(id);
    if(btn) btn.addEventListener('click', bridgeToPreview);
  });

  render();

  // ---- Sommaire cliquable : scroll jusqu'à la section ----
  document.querySelectorAll('.tocitem').forEach(function(item){
    item.addEventListener('click', function(e){
      e.preventDefault();
      var target = document.getElementById(item.getAttribute('data-target'));
      if(!target) return;
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({behavior: reduced ? 'auto' : 'smooth', block:'start'});
    });
  });

  // ---- Sommaire : surligner la section active en scrollant ----
  var sectionEls = Array.prototype.slice.call(document.querySelectorAll('section.block[id]'));
  if('IntersectionObserver' in window){
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var id = entry.target.id;
        var link = document.querySelector('.tocitem[data-target="'+id+'"]');
        if(!link) return;
        if(entry.isIntersecting){
          document.querySelectorAll('.tocitem[aria-current="true"]').forEach(function(l){ l.removeAttribute('aria-current'); });
          link.setAttribute('aria-current','true');
          link.scrollIntoView({block:'nearest', inline:'center'});
        }
      });
    }, {rootMargin:'-40% 0px -55% 0px', threshold:0});
    sectionEls.forEach(function(s){ spy.observe(s); });
  }

  // ---- Numéro sticky : révèle le titre une fois le vrai titre scrollé au-dessus ----
  var numberedSections = document.querySelectorAll('section.block[data-num]');
  numberedSections.forEach(function(sec){
    var marker = sec.querySelector('.sec-marker');
    var h2 = sec.querySelector('h2.sectitle');
    if(!marker || !h2) return;
    var titleText = h2.textContent.replace(/^\s*\d+\s*/, '').trim();
    marker.querySelector('.t').textContent = titleText;
  });
  if('IntersectionObserver' in window){
    var titleSpy = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var sec = entry.target.closest('section.block');
        var marker = sec && sec.querySelector('.sec-marker');
        if(!marker) return;
        var pastAbove = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        marker.classList.toggle('show-title', pastAbove);
        marker.classList.toggle('active', pastAbove);
      });
    }, {threshold:0, rootMargin:'-1px 0px 0px 0px'});
    numberedSections.forEach(function(sec){
      var h2 = sec.querySelector('h2.sectitle');
      if(h2) titleSpy.observe(h2);
    });
  }

  // ---- Aperçu au survol des liens (badge + description, pas une capture d'écran) ----
  var DOMAIN_BADGES = {
    'formula1.com': {label:'Formula1.com', initials:'F1', color:'#E10600'},
    'press.pirelli.com': {label:'Pirelli Press', initials:'PI', color:'#FFC400', dark:true},
    'reuters.com': {label:'Reuters', initials:'RT', color:'#FF8000'},
    'motorsport.com': {label:'Motorsport.com', initials:'MS', color:'#0072CE'},
    'the-race.com': {label:'The Race', initials:'TR', color:'#111318'},
    'skysports.com': {label:'Sky Sports', initials:'SS', color:'#00274D'},
    'reddit.com': {label:'r/formula1', initials:'rd', color:'#FF4500'}
  };
  function badgeFor(host){
    return DOMAIN_BADGES[host] || {label: host, initials: host.slice(0,2).toUpperCase(), color:'#6B7280'};
  }
  var lp = document.getElementById('linkpreview');
  var lpBadge = document.getElementById('lp-badge');
  var lpDomain = document.getElementById('lp-domain');
  var lpTitle = document.getElementById('lp-title');
  var lpDesc = document.getElementById('lp-desc');

  function positionPreview(link){
    var r = link.getBoundingClientRect();
    var w = lp.offsetWidth || 280, h = lp.offsetHeight || 90;
    var x = Math.min(Math.max(8, r.left), window.innerWidth - w - 8);
    var y = r.bottom + 10;
    if(y + h > window.innerHeight - 8) y = r.top - h - 10;
    lp.style.left = x + 'px';
    lp.style.top = Math.max(8,y) + 'px';
  }
  function showLinkPreview(link){
    var url;
    try{ url = new URL(link.href); }catch(e){ return; }
    var host = url.hostname.replace(/^www\./,'');
    var cfg = badgeFor(host);
    lpBadge.textContent = cfg.initials;
    lpBadge.style.background = cfg.color;
    lpBadge.style.color = cfg.dark ? '#1B1E24' : '#fff';
    lpDomain.textContent = cfg.label;
    lpTitle.textContent = link.textContent.trim();
    lpDesc.textContent = link.getAttribute('data-desc') || 'Ouvrir la source dans un nouvel onglet.';
    lp.hidden = false;
    positionPreview(link);
    requestAnimationFrame(function(){ lp.classList.add('show'); });
  }
  function hideLinkPreview(){
    lp.classList.remove('show');
    lp.hidden = true;
  }
  var hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  document.querySelectorAll('main a[href^="http"]').forEach(function(a){
    if(hoverCapable){
      a.addEventListener('mouseenter', function(){ showLinkPreview(a); });
      a.addEventListener('mousemove', function(){ positionPreview(a); });
      a.addEventListener('mouseleave', hideLinkPreview);
    }
    a.addEventListener('focus', function(){ showLinkPreview(a); });
    a.addEventListener('blur', hideLinkPreview);
  });

  // ---- Reveal on scroll ----
  if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:0.08});
    document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
  }

  return function cleanup(){
    cleanups.forEach(function(fn){ try{ fn(); }catch(e){} });
  };
}
