// EL2 analysis — Italian GP (Monza), round 13, 2026 season.
// English translation of el2-fr.js — same facts, same sources, no changes
// in substance. See el2-fr.js for the full sourcing note.
export const ROUND13_EL2_EN_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Italian Grand Prix · Monza · FP2 — Friday, September 4</p>
    <p class="verdict">Russell takes the top spot back from Ferrari under unrelenting heat — the pre-analysis's theory gets its colour back.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Russell</span> <span class="gap">1:22.559</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0.120s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">+0.141s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+0.384s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Hamilton</span> <span class="gap">+0.457s</span></div>
    </div>
    <p class="subverdict">FP1 delivered a clean Ferrari 1-2. FP2 closes most of that gap: Russell sets the fastest time of the day, with both Mercedes in the top three — exactly the configuration the pre-analysis placed at the centre of its main scenario, before the first session appeared to contradict it. Two data points, two different hierarchies: caution still applies before FP3 and Qualifying.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el2-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Mercedes erases the FP1 gap</h2>
    <p>The order flips almost term for term compared with FP1: Leclerc, who led by 0.304s over Russell in the morning, ends up 0.120s behind him in the afternoon. Antonelli, fifth in FP1, moves up to third. Russell's reference lap (1:22.559) breaks down into 27.044 / 27.794 / 27.721 across the three sectors — a sum that matches the total lap time in the database exactly, proof that his three best sectors genuinely belong to the same lap, not a theoretical reconstruction.</p>
    <p>Norris improves markedly compared with FP1 (+0.711s in the morning, +0.384s in the afternoon) but stays outside the virtual podium, consistent with the slow-corner deficit McLaren itself acknowledged before the weekend. Piastri, eleventh in FP1, closes the gap to 0.469s (P6) without quite joining his teammate.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el2-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> Verstappen returns, quiet in the standings</h2>
    <p>Sidelined from FP1 by the mandatory rookie session (replaced by Ayumu Iwasa), Verstappen is back in the car for FP2 and closes the session ninth, 0.818s off Russell — far from the reference time, but on a session where the driver ran two long medium-tyre stints (11 then 7 laps) rather than hunting an isolated fast lap. Nothing in this classification settles whether the deficit is real or simply a choice of programme: an hour's worth of laps missed relative to his rivals over the weekend is a disadvantage in itself heading into Qualifying.</p>
    <p>Lindblad confirms the good form glimpsed in FP1 (P7 in FP1, P7 again in FP2, 0.790s back), while Bearman turns in a strong FP2 (P8, 0.811s back) for Haas — two drivers not exactly tipped as top-of-the-table regulars before the weekend.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el2-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Heat confirming the announced Heat Hazard</h2>
    <p>Weather readings through FP2 fully confirm the pre-analysis's scenario: air temperature between 33.3 and 34.4°C across the hour, track temperature up to 57.5°C early in the session before cooling gradually to around 52°C by the end — consistent with the "Heat Hazard" the FIA declared for this weekend (forecast heat index above the 31°C trigger threshold). No rain recorded at any point in the session.</p>
    <p>The stint patterns logged in the database point to background work rather than a constant hunt for lap time: several drivers (Norris, Antonelli, Verstappen) alternated long medium or hard stints with one or two short soft-tyre excursions, rather than stacking qualifying-simulation laps — consistent with managing a hot track where the soft tyre's performance window closes fast.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el2-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Full FP2 classification</h2>
  </div>
  <div class="tablewrap prose" style="max-width:100%;">
    <table>
      <thead><tr><th>Pos</th><th>Driver</th><th>Team</th><th>Best lap</th><th>Gap</th></tr></thead>
      <tbody>
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:22.559</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:22.679</td><td>+0.120s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:22.700</td><td>+0.141s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:22.943</td><td>+0.384s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:23.016</td><td>+0.457s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:23.028</td><td>+0.469s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:23.349</td><td>+0.790s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:23.370</td><td>+0.811s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:23.377</td><td>+0.818s</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Tsunoda</td><td>Racing Bulls</td><td>1:23.455</td><td>+0.896s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:23.619</td><td>+1.060s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Lawson</td><td>Red Bull Racing</td><td>1:23.660</td><td>+1.101s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:23.732</td><td>+1.173s</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:23.773</td><td>+1.214s</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:23.776</td><td>+1.217s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:23.853</td><td>+1.294s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:23.900</td><td>+1.341s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:24.407</td><td>+1.848s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:25.027</td><td>+2.468s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Perez</td><td>Cadillac</td><td>1:25.082</td><td>+2.523s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:25.149</td><td>+2.590s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:25.253</td><td>+2.694s</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ swipe to see the rest of the table ▸</p>
</section>

<section class="block" id="sec-el2-5">
  <div class="prose">
    <h2 class="sectitle">What to watch in FP3</h2>
    <p>Two sessions, two hierarchies: Ferrari ahead in the morning, Mercedes ahead in the afternoon. Saturday morning's FP3, in conditions closer to Qualifying, will be the real tipping point before drawing conclusions. Also worth watching: does Verstappen confirm a pace closer to the reference on a session free of the rookie-programme constraint, and does McLaren close the gap that remains at the end of the day?</p>
    <div class="callout">Method reminder: as with FP1, an FP2 classification still mixes different test programmes. Friday's two sessions already contradict each other on the weekend's hierarchy — a signal in itself, one that calls for waiting on FP3 and Qualifying rather than drawing conclusions from a single session.</div>
  </div>
</section>

<section class="block" id="sec-el2-6">
  <details class="sources">
    <summary>Sources used — FP2 Monza (1 link)</summary>
    <div class="srcgroup">
      <h5>Session data</h5>
      <ul>
        <li><span class="desc">The Pit Wall — OpenF1 pipeline (scripts/ingest_openf1_practice.py), classification/sectors/stints/weather, primary.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
