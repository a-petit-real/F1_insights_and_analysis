// Analyse Round 12 — Dutch Grand Prix 2026 (Zandvoort) — English translation.
// Restored alongside the FR/EN language toggle. Unlike the preview, this
// article was written once and never needed a post-hoc factual update, so
// (checked against the French version) it was already accurate — this is
// a straight migration, same as analyse-fr.js, with the driver/team tables
// baked in from the English data and logic formerly in pitwall-behavior.js.
export const ROUND12_ANALYSE_EN_HTML = `
<div class="hero prose">
      <p class="eyebrow">Dutch Grand Prix · Zandvoort · 2026</p>
      <p class="verdict">Norris and McLaren won a race that <em>Mercedes</em> had first taken control of.</p>
      <div class="resultstrip">
        <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren</span></div>
        <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · +11.536s</span></div>
        <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes · +0.849s over Hamilton</span></div>
        <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">Ferrari</span></div>
        <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">Ferrari</span></div>
      </div>
      <p class="subverdict">This isn't a victory handed out by the VSC, nor a huge Mercedes strategic error. McLaren mainly created a tyre-age gap by extending Norris's final stint, and Norris then made perfect use of that window. Behind them, Mercedes maximised its points. Ferrari probably had the pace to reach the podium, but not the execution quality needed.</p>
    </div>

    <section class="block" data-num="01" id="sec-r1-en">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> The build-up to the race</h2>
        <p>Zandvoort is a narrow, twisty circuit where overtaking stays difficult. Track position therefore carries huge weight. Norris started on pole ahead of Russell, Antonelli, Piastri, Hamilton, Leclerc, Verstappen and Lawson. Alonso was only 18th, Bottas 21st, and Pérez had to start from the pit lane after changes made under parc fermé. <a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/starting-grid?utm_source=chatgpt.com" data-desc="Official starting grid for the 2026 Dutch Grand Prix.">Official grid</a></p>
        <p>The Sprint had given the impression of relatively low degradation: Russell had won it, and Leclerc had even made the softs last 24 laps. But rain that fell before the Grand Prix washed the track and changed its grip. Pirelli estimates that this "reset" track, slicker and hotter than during the Sprint, sharply increased wear. The expected one-stop scenario had all but disappeared by the restart.</p>
        <p>That explains the extraordinary strategic diversity: 60 pit visits, around ten different strategies, and none of the top ten running the exact same tyre sequence. <a href="https://press.pirelli.com/sixty-pit-stops-in-norriss-winning-farewell-at-zandvoort/?utm_source=chatgpt.com" data-desc="Pirelli details the 60 stops and the strategic diversity of the race.">Official Pirelli analysis</a></p>
      </div>
    </section>

    <section class="block" data-num="02" id="sec-r2-en">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> How the race unfolded</h2>

        <h3 class="subtitle">Initial start: Antonelli pounces, Verstappen cracks</h3>
        <p>Almost everyone starts on slicks despite the still-damp patches. The top four choose mediums; a large part of the field goes for softs.</p>
        <p>Norris keeps the lead, but Antonelli immediately takes second from Russell. Leclerc passes Piastri. Behind them, Verstappen finds himself in a scrappy sequence with Hamilton and Lawson. At the final corner, he puts the car onto a still-damp patch and over the white lines, loses the rear and slams into the wall.</p>
        <p>It's a driving error, even if the circumstances are genuinely treacherous: slicks, an unevenly dry track, traffic and low grip. The red flag is unavoidable.</p>
        <p>At the same moment, Bortoleto spins at the same spot. Hülkenberg narrowly avoids his teammate in the smoke.</p>

        <h3 class="subtitle">Restart: tyre choices rebuild the race</h3>
        <p>During the stoppage: Norris switches from mediums to softs; Antonelli and Russell keep their mediums; Piastri opts for hards, initially thinking he could go very long; the Ferraris go back out on softs; Alonso also fits fresh softs.</p>
        <p>Even before the restart, Bearman breaks down on the formation lap.</p>
        <p>At the second start, Antonelli gets an excellent launch and takes the lead from Norris. Piastri, very incisive, passes Russell and slots into third.</p>
        <p>In the first stint, Antonelli controls Norris. He manages to hold the gap around 1 to 1.5 seconds, often denying the McLaren its Overtake Mode. Norris complains about a lack of pace and balance on the softs. At this point, the Mercedes genuinely looks like the fastest car at the front.</p>

        <h3 class="subtitle">First pit-stop cycle: Russell recovers P3, Piastri's race unravels</h3>
        <p>Russell stops on lap 17 for hards. Piastri responds a lap later, but his pit-lane time costs him roughly 2.3 seconds more than Russell's: 20.267 seconds against 18.010. That difference is enough to swap their positions. <a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/race-result?utm_source=chatgpt.com" data-desc="Official race results, times and gaps.">Official stop summary</a></p>
        <p>Antonelli and Norris stop together around laps 21-22, also for hards. Leclerc fits mediums, Hamilton extends to laps 25-26 before switching to hards.</p>
        <p>From here, the shape of the race changes: Norris's McLaren works much better on hards; Antonelli increasingly starts to suffer from the rear end; the Ferraris look very fast; Piastri never finds a pace comparable to Norris's.</p>
        <p>Leclerc, then Hamilton, pass Piastri. By mid-race, the Australian, who had been third after the restart, has dropped to sixth.</p>

        <h3 class="subtitle">The decisive moment: Mercedes covers, McLaren extends</h3>
        <p>Around lap 40, Norris closes to roughly seven tenths of Antonelli. Mercedes is in a difficult spot: if Antonelli stays out, Norris can stop and try the undercut; if Mercedes stops first, it keeps the position for now, but hands Norris fresher tyres late in the stint.</p>
        <p>Mercedes chooses to cover: Antonelli, then Russell, switch to hards on lap 40. McLaren leaves Norris out until laps 47-48.</p>
        <div class="callout">It's the winning call. Norris rejoins about five seconds behind Antonelli, but on hards seven laps fresher. He closes the gap very quickly. So this isn't a simple "overcut": McLaren first accepts losing track position in order to manufacture a tyre advantage big enough to pass on-track, even at Zandvoort.</div>
        <p>Long-run analysis confirms Norris and Antonelli were fairly close on overall pace, but that the main gaps were created by their respective pit windows. <span class="note">RaceOptiData analysis</span></p>

        <h3 class="subtitle">Hamilton the interim leader, and the moment Norris seizes perfectly</h3>
        <p>Hamilton, who has extended his stint, now leads ahead of Antonelli and Norris. His presence matters: Antonelli has Overtake Mode available thanks to his proximity to the Ferrari, and can use it to defend against Norris.</p>
        <p>But Antonelli hesitates in his move on Hamilton and loses some momentum. Norris attacks immediately around the outside of Turn 1 and takes second. He then passes Hamilton to reclaim the lead; Antonelli also gets by the Ferrari.</p>
        <p>This is probably the single most important piece of driving in the race. The strategy had brought Norris into range, but he still had to overtake. His outside move at Turn 1 is firm, clean and perfectly timed.</p>

        <h3 class="subtitle">The final VSC: Mercedes locks in rather than attacks</h3>
        <p>Ocon's retirement triggers a VSC. Antonelli, Hamilton, Leclerc and Piastri all stop for softs. Norris and Russell stay out.</p>
        <p>Norris wonders, too late, whether he should have stopped, but staying out turns out to be entirely viable. At the restart, he has roughly a 6.8-second lead over Russell, who is himself about 5.6 seconds ahead of Antonelli.</p>
        <p>Mercedes couldn't reasonably bring Russell in: he would likely have rejoined behind the Ferraris. Leaving him out was his only real shot at the podium.</p>
        <p>Antonelli closes rapidly on Russell thanks to his softs. Mercedes then orders the positions swapped. Russell complies, despite an initially annoyed reaction, then has to defend against Hamilton and Leclerc.</p>
        <p>That team order is defensible: Antonelli had been ahead of Russell before his VSC stop; he had much fresher tyres; letting the two Mercedes fight it out would have let the Ferraris close back in; Mercedes had already established that two drivers on different strategies shouldn't get in each other's way.</p>
        <p>The fair criticism is less about the principle than the execution: Russell loses roughly two seconds in the move and ends up badly exposed. A second, late VSC, triggered by debris after the Williams collision, interrupts Hamilton's charge at exactly the right moment. Russell holds onto the podium by 0.849 seconds. <a href="https://www.formula1.com/en/latest/article/you-want-to-fight-for-every-single-position-russell-offers-verdict-on-mercedes-team-orders-in-dutch-gp.3qBtPSF2Jgfyu63IKV8our?utm_source=chatgpt.com" data-desc="Russell discusses the Mercedes team orders after the race.">Explanation and debate around the Mercedes order</a></p>
        <p>Norris wins by 11.536 seconds over Antonelli. <a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/race-result?utm_source=chatgpt.com" data-desc="Final classification of the Dutch Grand Prix.">Full official classification</a></p>
      </div>
    </section>

    <section class="block" data-num="03" id="sec-r3-en">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> The key strategic decisions</h2>

        <h3 class="subtitle">McLaren — patience over immediate position</h3>
        <p>The key decision is extending Norris after Antonelli's stop. Mercedes was forced into covering the undercut; McLaren understood the hard tyre worked better on the MCL40 and chose to set up an attack with a large age differential.</p>
        <p>The choice not to stop under the final VSC looks excellent in hindsight. Antonelli had softs, but still had to pass Russell, then close more than ten seconds. Norris still had enough pace left to control the gap.</p>
        <p>By contrast, Piastri's handling is far less convincing: the hard-tyre call at the restart, a slow stop, warm-up struggles, then a collapse in pace. Over comparable 24-lap hard-tyre stints, Norris was roughly seven tenths a lap faster. That's too much to be explained by the slow stop alone.</p>

        <h3 class="subtitle">Mercedes — not brilliant, but rational</h3>
        <p>Antonelli's early second stop handed the tyre advantage to Norris, but calling it a strategic mistake would be excessive. Norris was seven tenths back: not covering the undercut was equally risky.</p>
        <p>The VSC was then well used to shield Antonelli from the Ferraris. The position swap secured P2-P3. Mercedes lost the win to a lack of pace and stint life on the second set of hards, far more than to any major error on the pit wall.</p>

        <h3 class="subtitle">Ferrari — good idea, poor execution</h3>
        <p>Ferrari had sensibly split its strategies: Leclerc was meant to pressure Russell; Hamilton was meant to extend and benefit from fresher tyres.</p>
        <p>The problem arose when Hamilton, noticeably faster on his newer hards, caught up with Leclerc. Ferrari asks Leclerc to pit, but without clearly explaining that he also needs to let Hamilton through. Leclerc believes he can continue, extends by a lap, and Hamilton loses more than two seconds relative to Russell.</p>
        <p>The cost is concrete: Hamilton finishes 0.849 seconds off the podium. Lap-time analysis shows he was gaining two to six tenths a lap on Leclerc at that point. <a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/fastest-laps?utm_source=chatgpt.com" data-desc="Fastest laps classification for the race.">Lap-time analysis</a></p>
        <p>Responsibility is shared, but mostly collective: Leclerc could have followed the instruction to pit immediately; Ferrari should have stated the objective explicitly and, if necessary, ordered the swap; the team then added a slow stop for Leclerc; the final call to also put Leclerc back on softs under the VSC is debatable — staying out would have placed him higher, but with the risk of being attacked by Antonelli and Hamilton.</p>
        <p>Vasseur explained that Ferrari didn't want to publicly reveal its plan to extend Hamilton to the flag. That's tactically understandable, but the secrecy becomes counter-productive when it stops its own drivers from understanding the race. <a href="https://www.formula1.com/en/latest/article/what-the-teams-said-race-day-in-the-netherlands-2026.1GTy1x6hObFlkGkaXKqhNS?utm_source=chatgpt.com" data-desc="Team statements after the race, including Vasseur.">Vasseur's explanation</a></p>
        <p>This is also the reading that comes up most often in Reddit discussions: some blame Leclerc, others point out he had access to neither Hamilton's lap times nor the full plan. The reasonable consensus is that Ferrari should have given a clear instruction, rather than leaving the drivers to interpret a different picture from their own cockpits. <a href="https://www.reddit.com/r/formula1/comments/1vw9nnh/2026_dutch_grand_prix_postrace_discussion/?utm_source=chatgpt.com" data-desc="r/formula1 community debate after the race.">Post-race Reddit discussion</a></p>
      </div>
    </section>

    <section class="block" data-num="04" id="sec-r4-en">
      <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">04</span> Driver by driver</h2>
        <p>This assessment covers Sunday's Grand Prix, weighing the car, starting position and circumstances.</p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table class="verdict-table">
          <thead><tr><th>Driver</th><th>Start → finish</th><th>Analysis</th></tr></thead>
          <tbody><tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Lando Norris</td><td class="pos">1 → 1<span class="delta neutral">=</span></td><td>The benchmark. Loses the lead at the restart, doesn't panic, preserves his tyres enough, lifts his pace on hards and lands the decisive move on Antonelli. The strategy creates the opportunity; his overtake converts it.</td></tr><tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Kimi Antonelli</td><td class="pos">3 → 2<span class="delta good">+1</span></td><td>Two outstanding starts and a very well-controlled first half of the race. He genuinely put Norris under pressure. Less comfortable on the second set of hards and slightly hesitant behind Hamilton, but P2 is the ceiling once Norris gets past.</td></tr><tr><td class="driver"><span class="dot" style="background:#00A19B"></span>George Russell</td><td class="pos">2 → 3<span class="delta bad">-1</span></td><td>Disappointing starts: beaten by Antonelli, then Piastri. He recovers P3 thanks to McLaren's slow stop, then delivers a top-tier closing stint to hold off the Ferraris. His podium is deserved, even if the late VSC helped him.</td></tr><tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Lewis Hamilton</td><td class="pos">5 → 4<span class="delta good">+1</span></td><td>A very strong race and probably Ferrari's best pace over a stint. He passes Piastri, closes on Leclerc, then on Russell. The podium was possible, though not guaranteed. His frustration is justified; his radio sarcasm, less useful.</td></tr><tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Charles Leclerc</td><td class="pos">6 → 5<span class="delta good">+1</span></td><td>Aggressive and precise in his overtakes, especially on Piastri. Pace close to Hamilton's, and good management. But extending by a lap complicates his teammate's race, and his own second slow stop all but ends his podium chances.</td></tr><tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Oscar Piastri</td><td class="pos">4 → 6<span class="delta bad">-2</span></td><td>An excellent move on Russell at the restart, then a race in free fall. The slow stop costs him P3, but doesn't explain the seven tenths a lap lost to Norris on a comparable stint. The weekend's biggest technical question mark.</td></tr><tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Liam Lawson</td><td class="pos">8 → 7<span class="delta good">+1</span></td><td>Very good adaptation to a difficult Red Bull, stepping in for Hadjar. Close to Verstappen in qualifying and the best of the rest in the race. The penalty for insufficient slowing under yellows slightly tarnishes the performance.</td></tr><tr><td class="driver"><span class="dot" style="background:#B01030"></span>Nico Hülkenberg</td><td class="pos">13 → 8<span class="delta good">+5</span></td><td>One of the drives of the day: a spectacular reaction to avoid Bortoleto, clean overtakes, and a pace clearly above the rest of the midfield. P8 owed to more than just other retirements.</td></tr><tr><td class="driver"><span class="dot" style="background:#229971"></span>Fernando Alonso</td><td class="pos">18 → 9<span class="delta good">+9</span></td><td>An exceptional performance. Softs made to last 32 laps after the restart, then 37 laps on hards to the flag. Management, clean-air pace and a strong defence against Gasly: driver and team turned a back-of-the-grid car into points.</td></tr><tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Pierre Gasly</td><td class="pos">11 → 10<span class="delta good">+1</span></td><td>Very good starts, avoids Verstappen and stays constantly in the points fight. Several successful battles, but never able to get past Alonso despite sustained pressure. Confirms the progress of Alpine's new package.</td></tr><tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Yuki Tsunoda</td><td class="pos">12 → 11<span class="delta good">+1</span></td><td>A very creditable showing for a one-off stand-in at Racing Bulls. Some nice overtakes and competitive pace, but a track excursion and a less efficient three-stop strategy than Alonso's cost him the point.</td></tr><tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Arvid Lindblad</td><td class="pos">10 → 12<span class="delta bad">-2</span></td><td>His drive-through for overtaking under yellows wrecks his race. After that, his pace and overtakes are good, and he plays the team game by holding up Gasly to help Tsunoda. Too big an early mistake to hope for more.</td></tr><tr><td class="driver"><span class="dot" style="background:#B01030"></span>Gabriel Bortoleto</td><td class="pos">9 → 13<span class="delta bad">-4</span></td><td>A poor getaway, then a genuinely dangerous spin, thankfully without contact. He climbs from 18th to 13th, but Hülkenberg shows the Audi had the pace to score. A missed opportunity.</td></tr><tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Franco Colapinto</td><td class="pos">14 → 14<span class="delta neutral">=</span></td><td>An impressive start gaining four places, immediately wiped out by an overtake under yellows and a drive-through. A second penalty late on. Real potential, but not enough discipline around the neutralisations.</td></tr><tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Sergio Pérez</td><td class="pos">PL → 15<span class="delta neutral">stands</span></td><td>A pit-lane start and setup change is fairly logical given the early lack of pace. He pulls off the overcut on Bottas and finishes, but remains far from the points. Unfavourable VSC timing.</td></tr><tr><td class="driver"><span class="dot" style="background:#00A3E0"></span>Carlos Sainz</td><td class="pos">17 → 16<span class="delta good">+1</span></td><td>An interesting long first stint and a brief spell in the provisional top ten, but the strategy leaves him on badly worn hards. His lock-up at Turn 1 and the collision with Albon remain on him, though.</td></tr><tr><td class="driver"><span class="dot" style="background:#00A3E0"></span>Alex Albon</td><td class="pos">16 → DNF<span class="delta dnf">DNF</span></td><td>Decent pace in clean air, but Williams brings him in too early to cover an undercut, sending him back into traffic and blue flags. His race ends because of Sainz's mistake.</td></tr><tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Valtteri Bottas</td><td class="pos">21 → DNF<span class="delta dnf">DNF</span></td><td>A largely anonymous race at the back before a hydraulic issue affecting the rear wing. Hard to judge his driving, but Cadillac simply lacked pace.</td></tr><tr><td class="driver"><span class="dot" style="background:#9AA0AC"></span>Esteban Ocon</td><td class="pos">15 → DNF<span class="delta dnf">DNF</span></td><td>Never really in the points fight. His stops are well executed, but his Haas lacked the pace even before the presumed power-unit failure.</td></tr><tr><td class="driver"><span class="dot" style="background:#229971"></span>Lance Stroll</td><td class="pos">19 → DNF<span class="delta dnf">DNF</span></td><td>Damage or a handling issue from early on, significant sliding and no pace. The retirement is understandable, but the contrast with Alonso's recovery drive is stark.</td></tr><tr><td class="driver"><span class="dot" style="background:#9AA0AC"></span>Oliver Bearman</td><td class="pos">20 → DNF<span class="delta dnf">DNF</span></td><td>Impossible to assess: a complete power-unit shutdown during the formation lap ahead of the restart.</td></tr><tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Max Verstappen</td><td class="pos">7 → DNF<span class="delta dnf">DNF</span></td><td>Already a weak weekend on raw pace, then a first lap too aggressive on a still-tricky track. The margin was tiny, but the mistake is his own. A rare, clean off-day for the driver.</td></tr></tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ swipe to see the rest of the table ▸</p>
    </section>

    <section class="block" data-num="05" id="sec-r5-en">
      <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">05</span> Team by team</h2>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th style="width:140px;">Team</th><th>Strategic and operational assessment</th></tr></thead>
          <tbody><tr><td class="driver"><span class="dot" style="background:#FF8000"></span>McLaren</td><td>An excellent read with Norris: the decisive extension, trust in the hard tyre, no reflex stop under the VSC. Much less clean with Piastri: a slow stop and a poor understanding of his lack of pace. A brilliant win, but an overall result below what both cars could deliver.</td></tr><tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Mercedes</td><td>A maximised double podium. A logical, defensive early stop, good use of the VSC, a sound call to leave Russell out, and a rational team order. The swap itself could have been executed more smoothly. The win was lost mainly on hard-tyre pace, not on the pit wall.</td></tr><tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Ferrari</td><td>A car probably capable of a podium. The initial strategic split made sense, but imprecise communication, slow decision-making, a slow stop for Leclerc and no clear instruction between the drivers held it back. P4-P5 is fine on paper, disappointing given the pace.</td></tr><tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Red Bull</td><td>A genuinely worrying weekend on performance. No strategic call could have put Verstappen back into the fight among the top three teams. Lawson salvages six points in a car he was still learning.</td></tr><tr><td class="driver"><span class="dot" style="background:#B01030"></span>Audi</td><td>A very good race for Hülkenberg: clean calls, quick stops, a competitive car. The strategy also lets Bortoleto recover several positions, but his first-lap incident made points almost impossible.</td></tr><tr><td class="driver"><span class="dot" style="background:#229971"></span>Aston Martin</td><td>Perhaps the best strategy in the midfield. The team turns an initial two-stop plan into an effective one-stopper for Alonso after the red flag. Very good adaptation. Stroll's issue prevents a full team verdict.</td></tr><tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Alpine</td><td>Gasly's upgraded package looks like it's working. A strategy solid enough to hold onto the last point, but no answer for getting past Alonso. Colapinto's penalties are mostly on the driver.</td></tr><tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Racing Bulls</td><td>Good cooperation between the cars, with Lindblad holding up Gasly to help Tsunoda. But Tsunoda's three-stop strategy and long final stint on softs don't beat Alonso's simpler plan. A missed points opportunity.</td></tr><tr><td class="driver"><span class="dot" style="background:#00A3E0"></span>Williams</td><td>A bad Sunday. Albon brought in too early, Sainz left out on badly worn tyres and, in the end, a collision between the two cars. Even with a weak car, the team should have brought both home.</td></tr><tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Cadillac</td><td>Pérez's pit-lane start and setup change made sense as a search for a better balance. The internal overcut works, but pace remains insufficient, and Bottas's hydraulic failure confirms a reliability concern.</td></tr><tr><td class="driver"><span class="dot" style="background:#9AA0AC"></span>Haas</td><td>A double retirement likely tied to the power unit. The stops themselves are quick, including the team's best of the season for Ocon, but the pace was never going to be enough for points anyway.</td></tr></tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ swipe to see the rest of the table ▸</p>
    </section>

    <section class="block" id="sec-r6-en">
      <div class="prose">
        <h2 class="sectitle">Conclusion</h2>
        <div class="verdictgrid">
          <div class="verdictcol win">
            <h4>Winners</h4>
            <ul>
              <li><strong>Norris</strong>, for the quality of his driving and his opportunism.</li>
              <li><strong>McLaren</strong>, for accepting to lose track position temporarily in order to build an attack.</li>
              <li><strong>Mercedes</strong>, paradoxically, for turning a car that was ultimately not the fastest into a double podium.</li>
              <li><strong>Hülkenberg and Alonso</strong>, the two standout drives of the midfield.</li>
            </ul>
          </div>
          <div class="verdictcol lose">
            <h4>Losers</h4>
            <ul>
              <li><strong>Verstappen</strong>, on a rare personal mistake.</li>
              <li><strong>Piastri</strong>, caught between a slow stop and an unexplained pace deficit.</li>
              <li><strong>Ferrari</strong>, which had the pace but couldn't coordinate its two strategies.</li>
              <li><strong>Williams</strong>, whose decisions and late collision turned a difficult race into a very poor result.</li>
            </ul>
          </div>
        </div>
        <div class="callout">Mercedes led the first half, McLaren understood the second, Norris executed the decisive overtake, and Ferrari showed that having two fast cars isn't enough when the pit wall's communication stays hesitant.</div>
      </div>
    </section>

    <section class="block" id="sec-r-next-en">
      <div class="prose">
        <h2 class="sectitle">Lessons going forward</h2>
        <p>Three points from Zandvoort worth watching at the next round:</p>
        <ol style="padding-left:20px; margin:0 0 16px;">
          <li style="margin-bottom:10px;"><strong>Piastri</strong>'s management remains the real grey area at <strong>McLaren</strong>: seven tenths a lap lost to <strong>Norris</strong> on a comparable stint, with no sufficient explanation from tyres or strategy. If it happens again, this stops being circumstantial.</li>
          <li style="margin-bottom:10px;"><strong>Mercedes</strong> earned its double podium by defending, not attacking — a lot of that comes down to the VSC and <strong>Norris</strong>'s tyre wear late in the stint. On a circuit that, on paper, favours the W17 more clearly, we'll find out whether the team can do this again by leading on the attack rather than the defence.</li>
          <li><strong>Ferrari</strong> has the pace but not the coordination: Vasseur will need to sharpen his instructions if he wants to avoid another botched Hamilton-Leclerc situation, especially if the new engine changes the picture.</li>
        </ol>
        <a class="bridge-btn" href="/courses/13" style="text-decoration:none; display:inline-block;">Read the next Grand Prix preview →</a>
      </div>
    </section>

    <section class="block" id="sec-r7-en">
      <details class="sources">
        <summary>Sources used — Dutch Grand Prix (17 links)</summary>
        <div class="srcgroup">
          <h5>Results and official timeline</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/race-result?utm_source=chatgpt.com" data-desc="Classification, gaps, retirements, laps.">Full race result</a><span class="desc">Formula1.com — classification, gaps, retirements, laps.</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/norris-wins-dramatic-dutch-grand-prix-from-antonelli-and-russell-as-verstappen-crashes-out.Zn7iYevVGp5eHzFkTEAz7?utm_source=chatgpt.com" data-desc="Official report on Norris's win.">Official report: Norris's win</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/zandvoort-lowdown-all-the-key-moments-as-norris-wins-again-and-verstappen-suffers-dramatic-home-exit.7ixG14EpkWpHk28GCH7lKC?utm_source=chatgpt.com" data-desc="Detailed timeline of the weekend's key moments.">The key moments of the Dutch GP</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/starting-grid?utm_source=chatgpt.com" data-desc="Starting positions compared with the final result.">Official starting grid</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/norris-denies-russell-pole-position-in-gripping-conclusion-to-qualifying-for-dutch-grand-prix.2DoHZDC14R5tY7ygGaHCz?utm_source=chatgpt.com" data-desc="Analysis of the one-lap pecking order.">Qualifying: Norris beats Russell and Antonelli</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/russell-surges-to-victory-in-zandvoort-sprint-ahead-of-leclerc-and-norris.3evWfVZ0yONnfGGp3t8qyK?utm_source=chatgpt.com" data-desc="Comparing Saturday's and Sunday's McLaren.">Sprint: Russell's win</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/results/2026/races/1292/netherlands/fastest-laps?utm_source=chatgpt.com" data-desc="What drivers had left in hand on fresh tyres late on.">Fastest laps classification</a><span class="desc">Formula1.com</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Tyres and strategy</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/latest/article/strategy-guide-what-are-the-tactical-options-for-the-dutch-gp.5ULIIHI3zCCKimgPoyhkIE?utm_source=chatgpt.com" data-desc="Theoretical options, undercut, available allocations.">Pre-race strategy guide</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://press.pirelli.com/in-the-netherlands-with-the-sprint-format/?utm_source=chatgpt.com" data-desc="Vertical and lateral loads placed on the tyres.">Pirelli's weekend preview</a><span class="desc">Pirelli Press</span></li>
            <li><a href="https://press.pirelli.com/sixty-pit-stops-in-norriss-winning-farewell-at-zandvoort/?utm_source=chatgpt.com" data-desc="Tyre sequences actually used in the race.">Sixty pit stops at Zandvoort</a><span class="desc">Pirelli Press</span></li>
            <li><a href="https://press.pirelli.com/norris-to-start-from-the-front-at-zandvoort-all-three-compounds-in-play-for-the-race/?utm_source=chatgpt.com" data-desc="Confirmation all three compounds were usable.">Pirelli's post-qualifying analysis</a><span class="desc">Pirelli Press</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Technical development &amp; reactions</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/latest/article/mclaren-and-ferrari-lead-development-charge-as-every-upgrade-for-dutch-grand-prix-revealed.7HfMGggTffSH6eS3lF6Wgu?utm_source=chatgpt.com" data-desc="Ferrari floor, McLaren rear wing, Alpine package and more.">Every upgrade brought to Zandvoort</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/what-the-teams-said-race-day-in-the-netherlands-2026.1GTy1x6hObFlkGkaXKqhNS?utm_source=chatgpt.com" data-desc="Separating what came from the car, the driver, or the strategy.">What the teams said after the race</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/how-alonso-used-a-unique-strategy-to-earn-p9-for-aston-martin-in-zandvoort.1PYIzmhBjiY5oR3psn9Sy1?utm_source=chatgpt.com" data-desc="How he returned to the points despite a weekend of low pace.">Alonso's unusual strategy</a><span class="desc">Formula1.com</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/power-rankings-who-impressed-our-judges-at-the-dutch-grand-prix.1N5AMVHclBpJYoXXOdmUFK?utm_source=chatgpt.com" data-desc="A supplementary editorial view, not an objective ranking.">Power Rankings from the Dutch GP</a><span class="desc">Formula1.com — supplementary editorial take</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/you-want-to-fight-for-every-single-position-russell-offers-verdict-on-mercedes-team-orders-in-dutch-gp.3qBtPSF2Jgfyu63IKV8our?utm_source=chatgpt.com" data-desc="The Russell–Antonelli swap and its consequences.">Russell explains the Mercedes orders</a><span class="desc">Formula1.com</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>General press &amp; community</h5>
          <ul>
            <li><a href="https://www.reuters.com/sports/formula1/norris-wins-dutch-gp-complete-mclaren-hat-trick-2026-08-23/?utm_source=chatgpt.com" data-desc="Independent verification of events and context.">Reuters race report</a><span class="desc">Reuters — independent verification</span></li>
            <li><a href="https://www.reuters.com/sports/formula1/mercedes-no-longer-have-fastest-car-f1-says-antonelli-2026-08-24/?utm_source=chatgpt.com" data-desc="Antonelli's and Norris's comments on each car's relative strengths.">Antonelli: "Mercedes no longer has the fastest car"</a><span class="desc">Reuters</span></li>
            <li><a href="https://www.reddit.com/r/formula1/comments/1vw9nnh/2026_dutch_grand_prix_postrace_discussion/?utm_source=chatgpt.com" data-desc="Community perception, never used as technical evidence.">Post-race discussion</a><span class="desc">r/formula1 — community perception, never technical evidence</span></li>
          </ul>
        </div>
      </details>
    </section>
`;
