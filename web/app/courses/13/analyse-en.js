// Round 13 analysis — 2026 Italian Grand Prix (Monza).
// English translation of analyse-fr.js — same facts, same sources, no
// changes in substance. See analyse-fr.js for the full sourcing note,
// including how the two separate lap 1/lap 2 incidents involving Leclerc
// were reconciled between the race-control messages and the official report.
export const ROUND13_ANALYSE_EN_HTML = `
<div class="hero prose">
      <p class="eyebrow">Italian Grand Prix · Monza · 2026</p>
      <p class="verdict">Starting 19th, Antonelli erased the entire grid to beat Russell on home soil — and Gasly's surprise pole lasted barely a handful of laps.</p>
      <div class="resultstrip">
        <div class="chip"><span class="pos">P1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">Mercedes · started 19th</span></div>
        <div class="chip"><span class="pos">P2</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">Mercedes · +3.857s</span></div>
        <div class="chip"><span class="pos">P3</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">Red Bull · +14.718s</span></div>
        <div class="chip"><span class="pos">P4</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">McLaren · +19.056s</span></div>
        <div class="chip"><span class="pos">P5</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">McLaren · +19.253s</span></div>
      </div>
      <p class="subverdict">A race in two acts. First, first-lap chaos — a Leclerc/Hamilton clash at the chicane, then Leclerc's solo crash at the Curva Alboreto, a Safety Car and a red flag — restarting with a standing start that reshuffled every tyre plan. Then, the most spectacular recovery drive of the season: Antonelli, sent to the back of the grid by his engine penalty, climbs to the lead in 18 laps and holds off Russell in a fraternal battle all the way to the flag. Gasly, author of the shock pole the day before, fades completely in the race and salvages barely a point better than the back of the field.</p>
    </div>

    <section class="block" data-num="01" id="sec-r1">
      <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">01</span> The context before the start</h2>
        <p>The starting grid resembles nobody's weekend prediction. Pierre Gasly lines up on pole for the first time in his career, ahead of Russell — the only two drivers from Qualifying's raw top six to keep their position. A three-place penalty for impeding Lawson in Q2 drops Piastri from 3rd to 6th, promoting both Ferraris to the second row: Leclerc 3rd, Hamilton 4th, then Verstappen 5th. <a href="/courses/13" data-desc="Full Qualifying breakdown: Q1/Q2/Q3, penalties, starting grid.">See the Qualifying analysis</a></p>
        <p>Championship leader Kimi Antonelli starts from the back of the grid (19th) after a full power unit change confirmed before the weekend — Monza had been chosen precisely because a fresh engine pays off the most there and overtaking stays more accessible than elsewhere. Albon takes a similar penalty; Lawson and Alonso start from the pit lane after changes made under parc fermé conditions.</p>
        <p>At the start, tyre choices confirm a split field: Gasly and Russell on mediums, Leclerc, Hamilton and Verstappen on softs to attack, Tsunoda, Antonelli and Alonso on hards to absorb a longer recovery drive. A demonstration run by Sebastian Vettel in Michael Schumacher's 2002 Ferrari precedes the start.</p>
      </div>
    </section>

    <section class="block" data-num="02" id="sec-r2">
      <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">02</span> How the race unfolded</h2>

        <h3 class="subtitle">Lap one: two separate incidents, one restart</h3>
        <p>Gasly gets away cleanly into the lead ahead of Russell at the first chicane, where the two Ferraris clash fighting for position: Hamilton is pushed onto the gravel and shouts over the radio "Charles pushed me off!", briefly dropping out of the points. The stewards note the incident ("Turn 2" in the official log) but, after the race, hand out no further sanction.</p>
        <p>A lap later, a second event — unrelated to the first — ends Leclerc's race: after holding a couple of slides through the middle sector and dropping behind Verstappen, the Monegasque loses control of his Ferrari exiting the Curva Alboreto and slams into the barriers. An immediate Safety Car, then a red flag while the car is cleared and the barrier repaired — Leclerc climbs out unaided, visibly unhurt but devastated, in a scene echoing Mika Häkkinen's despair at Monza in 1999.</p>

        <h3 class="subtitle">Restart: the hard tyre wins out, except for four drivers</h3>
        <p>After the interruption, most of the field restarts on hards — Russell, Gasly, Colapinto, Piastri, Norris, Lindblad, Bearman, Ocon, Hulkenberg, Lawson, Sainz, Albon and Stroll. Verstappen, Hamilton, Bortoleto, Antonelli, Tsunoda and Bottas opt for mediums; Perez and Alonso go back out on softs. Tsunoda, missing his grid slot, forces the first restart attempt to be aborted and an extra formation lap.</p>
        <p>At the signal, Russell keeps the advantage over Gasly; Colapinto briefly takes 3rd from Verstappen before the Dutchman reclaims it with a firm move at the second chicane. Colapinto then spins at Lesmo 1 after carrying too much speed, promoting Hamilton and Piastri. At this point, Antonelli — already up to 7th from the back of the grid — settles into a battle with both McLarens.</p>

        <h3 class="subtitle">The recovery: Antonelli to the lead in eighteen laps</h3>
        <p>On lap 10, Gasly loses a place to Hamilton, then gets swallowed up by Piastri and Antonelli in quick succession — his pole from the day before is already fading. Two laps later, Verstappen takes the lead from Russell at the first chicane; Piastri passes Hamilton to get back onto the virtual podium, then Antonelli repeats the move to take 4th at the second chicane. Russell retakes the lead from Verstappen on lap 15, before Antonelli pulls off the same move on the reigning champion a lap later. The following lap, the Red Bull reports trouble ("The car is completely broken on the rear axle"). On lap 18, Antonelli completes his charge from the back of the grid by taking the lead from Russell into Turn 1.</p>

        <h3 class="subtitle">The Antonelli-Russell duel and the decisive Virtual Safety Car</h3>
        <p>The differing battery deployment patterns between cars — flagged by the pre-analysis as a key factor at Monza — produce exactly the expected effect: a constant back-and-forth between the two Mercedes, Antonelli repeatedly regaining the advantage at the second chicane after losing it at the first. The pair come close to contact at the Curva Grande on lap 22, with the cameras cutting to Toto Wolff in the garage. "Kimi, we're going to try and stop yo-yoing; we just need to build that gap to Verstappen," the pit wall tells him. "Yeah right, and in the meantime, he passed me," the Italian responds, before questioning the instruction directly.</p>
        <p>Alonso's retirement (suspected damage) followed by Stroll's (hydraulics failure) triggers a Virtual Safety Car around lap 27. Hulkenberg, Ocon and Sainz pit immediately; Antonelli (fresh mediums) and Verstappen (hards) follow a lap later. Russell stays out and keeps the lead ahead of Piastri, Hamilton, Norris and Gasly — Antonelli and Verstappen rejoin in 6th and 7th respectively.</p>
        <div class="callout">This is the choice that shapes the end of the race: Antonelli rejoins on noticeably fresher mediums, while Russell stays out on hards fitted since lap 4. The pre-analysis anticipated a tight race pace between the two Mercedes; in the end, it's the tyre-age gap created by this VSC that decides it.</div>
        <p>Antonelli and Verstappen carve through Gasly and Norris almost effortlessly to retake 4th and 5th. With roughly twenty laps to go, the pair are within ten seconds of Russell, who is separately flagged for a possible yellow-flag infringement. A mistake from Hamilton into the first chicane hands Antonelli another place on lap 35; the following lap, the Italian passes Piastri for 2nd — nine seconds now separate the two Mercedes, and the investigation into Russell is upgraded to a full inquiry.</p>

        <h3 class="subtitle">The final sprint: gravel, a penalty avoided, and the decisive pass</h3>
        <p>"Are the lap times good enough at the moment?" Russell asks with 15 laps to go. "Kimi's forecast to catch you right at the end of the race," comes the response. The stewards' verdict — no action for the yellow-flag infringement — confirms a fair fight to the very end. With five laps remaining, Antonelli closes in on Russell and has a go at the first chicane, but runs wide at the exit and puts all four wheels in the gravel, losing ground. He immediately regroups and makes the decisive move between Lesmo 2 and the Ascari chicane on lap 50, before pulling away to the flag.</p>
        <p>Verstappen follows both Mercedes home for a well-earned podium. Behind them, Norris snatches 4th from Piastri under braking into the Curva Grande on the very last lap — the Australian unimpressed by such a fine margin. Hamilton salvages 6th for Ferrari on a dark day, ahead of Gasly (pole the day before, 7th at the flag), Lindblad, Colapinto and Tsunoda, the latter summoned to see the stewards over a possible start-procedure irregularity.</p>
      </div>
    </section>

    <section class="block" data-num="03" id="sec-r3">
      <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">03</span> The key strategic calls</h2>

        <h3 class="subtitle">Mercedes — leaving Russell out, the call that costs the win</h3>
        <p>Under the lap 27-28 VSC, Mercedes had a choice between covering both drivers or pitting only one. By leaving Russell out in the lead on hards fitted since lap 4 while Antonelli switched to brand-new mediums, the team maximised track position at the cost of late-race pace. The gamble wasn't unreasonable — Russell was leading comfortably at the time — but it rests on the assumption that track position would outweigh the tyre-age gap all the way to the flag. The final duel, in which Antonelli claws back nine seconds in about fifteen laps before making the decisive move on lap 50, makes clear which assumption actually held.</p>
        <p>Mercedes' real credit lies elsewhere: managing a full-blooded internal fight (the double near-miss at the Curva Grande, the tense radio exchange) without ever issuing an artificial team order or sacrificing one driver for the other — consistent with the fact that Antonelli, the championship leader, was fighting for his own title bid as much as for the day's win.</p>

        <h3 class="subtitle">Alpine — pole alone wasn't enough to hold race pace</h3>
        <p>Gasly led the early part of the race before shedding three places in the space of three laps (10 to 12), overtaken by Hamilton, Piastri and then Antonelli. Nothing in the race data settles whether this was faster degradation on the Alpine or simply the raw pace deficit already glimpsed in FP3 (9th, 0.679s back, the day before) — the pole had been built on an exceptional single lap rather than dominant race pace, and the race confirmed that without ambiguity. P7 at the flag remains Alpine's best showing in a long while regardless, topped off by Colapinto's extra point in P9.</p>

        <h3 class="subtitle">Ferrari — an internal clash, then a crash that wipes out the race</h3>
        <p>Ferrari's race strategy never really got a chance to play out: the first-lap clash cost Hamilton places before the race had truly begun, and Leclerc's lap-2 crash ended his day. Hamilton then had to claw back an artificial deficit rather than race from his true starting position (P4) — his eventual 6th place, achieved on the medium tyre fitted at the restart, remains a respectable result given the circumstances, but a long way from the podium that had looked within reach before the first lap.</p>

        <h3 class="subtitle">McLaren — Norris solid, Piastri penalised twice over</h3>
        <p>Piastri paid for his Qualifying penalty (3rd-fastest raw time, started 6th) then narrowly failed to hold onto 4th in the race against Norris under the very last braking. Norris, for his part, manages an incident-free race to bring home a 4th place consistent with his pace across the weekend — never able to threaten the leading trio, McLaren staying out of the fight for victory this weekend, exactly as the pre-analysis flagged regarding the MCL40's slow-corner deficit.</p>
      </div>
    </section>

    <section class="block" data-num="04" id="sec-r4">
      <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">04</span> Driver-by-driver verdict</h2>
        <p>The assessment covers Sunday's Grand Prix, accounting for the actual starting position (after penalties) and the circumstances of the race.</p>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table class="verdict-table">
          <thead><tr><th>Driver</th><th>Start → finish</th><th>Analysis</th></tr></thead>
          <tbody>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Kimi Antonelli</td><td class="pos">19 → 1<span class="delta good">+18</span></td><td>The drive of the season. Takes the lead in 18 laps, holds off Russell in a fair, tense duel, keeps his composure after a gravel excursion five laps from the flag, and makes the decisive move at the right moment. Nothing to fault in this performance.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>George Russell</td><td class="pos">2 → 2<span class="delta neutral">=</span></td><td>Near-perfect race until the lap-27 VSC: leads, resists Verstappen twice, handles pit-wall pressure without flinching. The call to stay out under the VSC, made by the pit wall, backfires on him — but his defence to the end remains solid.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Max Verstappen</td><td class="pos">5 → 3<span class="delta good">+2</span></td><td>Leads briefly on lap 12 despite a car he himself calls "broken on the rear axle," resists Russell, benefits from the VSC just like Antonelli, and reels in Gasly and Norris almost effortlessly. A deserved podium on a weekend where raw pace was lacking in Qualifying.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Lando Norris</td><td class="pos">7 → 4<span class="delta good">+3</span></td><td>An incident-free race capped by a decisive braking move on Piastri at the Curva Grande. Never able to threaten the leading trio, consistent with the slow-corner deficit McLaren itself acknowledged before the weekend.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>Oscar Piastri</td><td class="pos">6 → 5<span class="delta good">+1</span></td><td>Pays for his Qualifying penalty, then runs a clean race until losing 4th to Norris on the very last braking. No individual mistake, but a second straight weekend where the gap to his teammate runs against him.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Lewis Hamilton</td><td class="pos">4 → 6<span class="delta bad">-2</span></td><td>Pushed onto the gravel on the very first lap in the clash with Leclerc, forced to rebuild his entire race. Solid pace on the mediums fitted at the restart; 6th place limits the damage more than it rewards genuine podium potential.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Pierre Gasly</td><td class="pos">1 → 7<span class="delta bad">-6</span></td><td>A first career pole, but not enough race pace to defend it: sheds three places in three laps from lap 10. The one-lap performance was never confirmed over a stint — consistent with a quiet FP3 (9th) the day before.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Arvid Lindblad</td><td class="pos">9 → 8<span class="delta good">+1</span></td><td>A quiet but effective drive at the back of the top ten, with no notable incident recorded — solid management rather than a standout moment.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Franco Colapinto</td><td class="pos">7 → 9<span class="delta bad">-2</span></td><td>Spins at Lesmo 1 after carrying too much speed at the restart, which could have cost far more. Recovers to grab an extra point for Alpine despite the incident.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Yuki Tsunoda</td><td class="pos">17 → 10<span class="delta good">+7</span></td><td>Misses his grid slot and forces the first restart to be aborted — an infringement still under stewards' review at the time of publication. A good recovery drive over the distance despite that mistake.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Gabriel Bortoleto</td><td class="pos">11 → 11<span class="delta neutral">=</span></td><td>An unremarkable race with no notable incident, outside the points on a track that didn't particularly favour the Audi.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Nico Hulkenberg</td><td class="pos">13 → 12<span class="delta good">+1</span></td><td>Involved in a Turn 4 clash with Lawson, noted by the stewards. Solid pace over the distance without being decisive.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Carlos Sainz</td><td class="pos">15 → 13<span class="delta good">+2</span></td><td>An unremarkable race in the standings, in the same general difficulty as the rest of Williams this weekend.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Liam Lawson</td><td class="pos">14 (pit lane) → 14<span class="delta neutral">=</span></td><td>A second straight weekend filling in at Red Bull, starting from the pit lane after a rear-wing change. Baulked by Piastri in Qualifying, then clashed with Hulkenberg in the race — a weekend with no real positive to take from it.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Oliver Bearman</td><td class="pos">12 → 15<span class="delta bad">-3</span></td><td>A quiet race, outside the points in a Haas that lacked pace this weekend despite a promising FP2 (P8) the day before.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Esteban Ocon</td><td class="pos">16 → 16<span class="delta neutral">=</span></td><td>Finishes a lap down, with no notable incident recorded — an inconsequential race for Haas this Sunday.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Alexander Albon</td><td class="pos">18 → 17<span class="delta good">+1</span></td><td>The only driver to try a third set of tyres, very late (lap 46, for softs) — an alternative strategy that gains nothing more than a place over lapped traffic.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Sergio Perez</td><td class="pos">20 → 18<span class="delta good">+2</span></td><td>Handed a 5-second penalty for an escape-road infringement at Turn 1, on top of a separately noted start-procedure incident. A weekend to forget for Cadillac.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Valtteri Bottas</td><td class="pos">19 → 19<span class="delta neutral">=</span></td><td>Finishes a lap down with no notable individual incident, consistent with a Cadillac pace outside the points on this track.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Lance Stroll</td><td class="pos">22 → DNF<span class="delta dnf">DNF</span></td><td>Retires with a hydraulics issue, no driving error identified — the second Aston Martin out that same afternoon alongside his teammate.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Fernando Alonso</td><td class="pos">21 (pit lane) → DNF<span class="delta dnf">DNF</span></td><td>Retires with suspected damage around lap 26, with no apparent link to an identified racing incident — the VSC that reshapes the entire second half of the race stems directly from this double Aston Martin retirement.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Charles Leclerc</td><td class="pos">3 → DNF<span class="delta dnf">DNF</span></td><td>Involved, without sanction, in the lap-1 clash with Hamilton, then a solo crash at the Curva Alboreto on lap 2 that ends his race and triggers the Safety Car, then the red flag. Climbs out unaided, visibly devastated — a day to forget after a podium that had looked within reach before the start.</td></tr>
          </tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ swipe to see the rest of the table ▸</p>
    </section>

    <section class="block" data-num="05" id="sec-r5">
      <div class="sec-marker"><span class="n">05</span><span class="t"></span></div>
      <div class="prose">
        <h2 class="sectitle"><span class="num">05</span> Team-by-team verdict</h2>
      </div>
      <div class="tablewrap prose" style="max-width:100%;">
        <table>
          <thead><tr><th style="width:140px;">Team</th><th>Strategic and operational verdict</th></tr></thead>
          <tbody>
            <tr><td class="driver"><span class="dot" style="background:#00A19B"></span>Mercedes</td><td>Win and 2nd place despite a VSC call that costs Russell the race: leaving the leader out on tyres 24 laps old while Antonelli bolted on fresh rubber built the pace gap that decides the finish. Flawless handling of the internal rivalry, with no artificial team order.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#1B3A93"></span>Red Bull</td><td>An unexpected podium given the Qualifying pace, earned through Verstappen's resilience despite a car he himself calls "broken on the rear axle" and by making the most of the VSC. Lawson, off the pace all weekend, adds nothing beyond a neutral finish.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF8000"></span>McLaren</td><td>An unremarkable weekend with no major error: Norris and Piastri bring home P4 and P5 in the logical order of their Qualifying, never threatening the leading trio. A race of management rather than ambition, consistent with the slow-corner deficit acknowledged before Monza.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#E8002D"></span>Ferrari</td><td>A catastrophic weekend: an internal clash on lap 1 that costs Hamilton places, then Leclerc's lap-2 retirement that wipes out any podium chance. Hamilton limits the damage in 6th on an improvised strategy rather than a genuine race plan.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#FF87BC"></span>Alpine</td><td>The team's first-ever pole with Gasly, which doesn't translate into a matching race result for lack of race pace — P7 remains the team's best showing in a long while regardless, topped off by Colapinto's point in P9.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#2B4562"></span>Racing Bulls</td><td>A quiet but solid double top-ten (Lindblad 8th, Tsunoda 10th), the latter earned despite a start-procedure error still under stewards' review.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#00302B"></span>Audi</td><td>No points scored (Bortoleto 11th, Hulkenberg 12th, the latter involved in a clash with Lawson), on a track that didn't particularly flatter the car.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#6C98FF"></span>Williams</td><td>An unremarkable weekend: Sainz 13th, Albon 17th after an alternative three-stop strategy that gained nothing more than a place over lapped traffic.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#B6BABD"></span>Haas</td><td>No points scored (Bearman 15th, Ocon 16th a lap down), a step back from Bearman's promising FP2 (P8) the day before.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#229971"></span>Aston Martin</td><td>A double retirement (suspected damage for Alonso, hydraulics for Stroll) that directly triggers the decisive VSC of the race's second half — a weekend to forget on both sides of the garage.</td></tr>
            <tr><td class="driver"><span class="dot" style="background:#C9A24B"></span>Cadillac</td><td>No points (Perez 18th with a 5-second penalty, Bottas 19th a lap down), a pace that stays outside the midfield this weekend.</td></tr>
          </tbody>
        </table>
      </div>
      <p class="scrollhint prose">◂ swipe to see the rest of the table ▸</p>
    </section>

    <section class="block" id="sec-r6">
      <div class="prose">
        <h2 class="sectitle">Conclusion</h2>
        <div class="verdictgrid">
          <div class="verdictcol win">
            <h4>Winners</h4>
            <ul>
              <li><strong>Antonelli</strong>, for a back-of-the-grid recovery all the way to victory — 267 points and 7 wins at the top of the championship, a lead he keeps extending.</li>
              <li><strong>Verstappen</strong>, an unexpected podium with a car he himself judged to be struggling.</li>
              <li><strong>Gasly and Alpine</strong>, for the team's first-ever pole, even without a matching race result.</li>
              <li><strong>Tsunoda</strong>, a good recovery from 17th to 10th despite a start-procedure mistake.</li>
            </ul>
          </div>
          <div class="verdictcol lose">
            <h4>Losers</h4>
            <ul>
              <li><strong>Leclerc</strong>, a solo crash that wipes out a possible podium and leaves Ferrari bleeding in the constructors' standings.</li>
              <li><strong>Russell</strong>, a victim of a strategic call made by his own pit wall under the decisive VSC.</li>
              <li><strong>Aston Martin</strong>, a double retirement that compounds an already difficult weekend.</li>
              <li><strong>Gasly</strong>, on race day: the pole lasted only three laps against the leading pack's real pace.</li>
            </ul>
          </div>
        </div>
        <div class="callout">Monza will be remembered for its contrast: the most surprising pole of the season, wiped out within a handful of laps, and the most spectacular recovery drive, built over eighteen. Antonelli confirms his championship lead (267 points, 66 over Russell) owes nothing to chance — seven wins, this one included from the back of the grid.</div>
      </div>
    </section>

    <section class="block" id="sec-r-next">
      <div class="prose">
        <h2 class="sectitle">Takeaways for next time</h2>
        <p>Three points from Monza to watch at the next round:</p>
        <ol style="padding-left:20px; margin:0 0 16px;">
          <li style="margin-bottom:10px;"><strong>Ferrari</strong> heads into Madring's inaugural weekend with zero points from Monza and an unsanctioned internal clash that nonetheless points to a lack of coordination between its two drivers — a concern beyond Leclerc's crash alone.</li>
          <li style="margin-bottom:10px;"><strong>Antonelli</strong> has now proven, twice this season, that starting from the back of the grid doesn't stop him winning. On a completely new track like Madring, that ability to recover quickly could count double if a Qualifying incident occurs.</li>
          <li><strong>Alpine</strong> showed at Monza that one exceptional lap isn't enough without race pace. The real question going forward is whether the package Gasly brought (and which extends to Colapinto) closes that gap over a stint, or whether Monza stays an isolated peak.</li>
        </ol>
        <a class="bridge-btn" href="/courses/14" style="text-decoration:none; display:inline-block;">Read the pre-analysis for the next GP →</a>
      </div>
    </section>

    <section class="block" id="sec-r7">
      <details class="sources">
        <summary>Sources used — Italian GP (5 links)</summary>
        <div class="srcgroup">
          <h5>Race data</h5>
          <ul>
            <li><span class="desc">The Pit Wall — production pipeline (results/standings via scripts/ingest_jolpica.py, lap times/tyres/weather/RCM via scripts/ingest_openf1.py), primary.</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Race and Qualifying reports</h5>
          <ul>
            <li><a href="https://www.formula1.com/en/latest/article/antonelli-beats-russell-to-italian-grand-prix-win-with-stunning-comeback-drive.15WtFEBT5JEe4drdeO88t2" data-desc="Official race report, fetched as a primary source — full sequence, quotes, context.">Formula1.com — Antonelli beats Russell with a stunning comeback drive</a><span class="desc">Formula1.com — primary</span></li>
            <li><a href="https://www.formula1.com/en/latest/article/gasly-charges-to-sensational-maiden-f1-pole-at-monza-over-russell-and-piastri.4CKkkbvgmqL04ijMNBfuXF" data-desc="Official Qualifying report, starting grid and penalties.">Formula1.com — Qualifying report</a><span class="desc">Formula1.com — primary</span></li>
          </ul>
        </div>
        <div class="srcgroup">
          <h5>Additional context</h5>
          <ul>
            <li><a href="https://www.motorsport.com/f1/news/standings-antonelli-unstoppable-at-the-top/10853059/" data-desc="Detailed driver standings after the Italian GP.">Motorsport.com — standings after Monza</a><span class="desc">Motorsport.com — secondary</span></li>
            <li><a href="https://scuderiafans.com/2026-f1-constructor-standings-after-italian-gp-mercedes-leads-ferrari-by-122-points/" data-desc="Constructors' standings after the Italian GP.">Constructors' standings after Monza</a><span class="desc">Scuderiafans — secondary</span></li>
          </ul>
        </div>
      </details>
    </section>
`;
