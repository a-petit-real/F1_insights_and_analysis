// Analyse EL3 — GP d'Espagne (Madring, Madrid), round 14, saison 2026.
//
// Sourcing : donnée primaire = pipeline OpenF1 (scripts/ingest_openf1_practice.py,
// tables practice_* de db/schema_fastf1.sql), classement/secteurs/relais/météo
// vérifiés directement depuis la base via scripts/practice_briefing.py (session_key
// 11364, 2026-09-12 10:30->11:30 UTC). Le temps d'Antonelli (1:32,797) et l'écart à
// Leclerc (+0,166s) sont confirmés indépendamment par trois recherches distinctes
// (dépêche AP/thesunchronicle.com, coffeecornermotorsport.com, pitdebrief.com),
// toutes concordantes avec la base à la milliseconde près. Les incidents Hamilton
// (accrochage au dernier virage, aileron avant endommagé) et Bearman (sortie de
// piste au virage 11 en fin de séance) sont confirmés par recherche croisée
// (Formula1.com, PlanetF1, RacingNews365, Autosport) mais rapportés au style
// indirect plutôt qu'en citation directe : aucune citation vérifiable au mot près
// n'a été récupérée pour cette séance précise (une tentative de fetch d'un article
// Formula1.com au titre similaire s'est révélée être un article sur le GP du Japon
// — Suzuka, virage "Spoon Curve" — et a été écartée sans être utilisée). Aucune
// donnée inventée.
export const ROUND14_EL3_FR_HTML = `
<section class="block">
  <div class="prose">
    <p class="eyebrow">Grand Prix d'Espagne · Madring (Madrid) · EL3 — samedi 12 septembre</p>
    <p class="verdict">Antonelli signe un second scratch en trois séances, Leclerc au plus près qu'il n'a jamais été (+0,166s) — mais la séance restera surtout celle de deux accrochages, Hamilton puis Bearman, qui ont réduit le roulage de tout le plateau à l'approche des qualifications.</p>
    <div class="resultstrip">
      <div class="chip"><span class="pos">1</span> <span class="dot" style="background:#00A19B"></span><span class="drv">Antonelli</span> <span class="gap">1:32,797</span></div>
      <div class="chip"><span class="pos">2</span> <span class="dot" style="background:#E8002D"></span><span class="drv">Leclerc</span> <span class="gap">+0,166s</span></div>
      <div class="chip"><span class="pos">3</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Piastri</span> <span class="gap">+0,189s</span></div>
      <div class="chip"><span class="pos">4</span> <span class="dot" style="background:#FF8000"></span><span class="drv">Norris</span> <span class="gap">+0,236s</span></div>
      <div class="chip"><span class="pos">5</span> <span class="dot" style="background:#1B3A93"></span><span class="drv">Verstappen</span> <span class="gap">+0,375s</span></div>
    </div>
    <p class="subverdict">Troisième séance, deuxième référence Antonelli (après l'EL2) — mais surtout un écart à Leclerc qui continue de se resserrer (0,459s en EL1, 0,113s en EL2, 0,166s ici). La vraie nouvelle du jour est ailleurs : McLaren, en délicatesse tout le vendredi, revient à moins d'un quart de seconde du sommet avec ses deux pilotes en P3 et P4 — Norris compris, deux jours après avoir perdu la quasi-totalité de l'EL2 sur panne de boîte. La séance, plus courte que les deux précédentes en nombre de tours pour la plupart des pilotes, a été coupée par deux drapeaux rouges consécutifs.</p>
  </div>
</section>

<section class="block" data-num="01" id="sec-el3-1">
  <div class="sec-marker"><span class="n">01</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">01</span> Antonelli confirme, Ferrari ne lâche rien</h2>
    <p>Antonelli boucle sa référence en 1:32,797, un nouveau gain net sur son propre chrono d'EL2 (1:33,662) — la piste continue de s'améliorer séance après séance sur ce tracé tout juste inauguré. Leclerc referme à 0,166s, moins qu'en EL1 (0,459s) mais légèrement plus qu'en EL2 (0,113s) : sur les trois séances du week-end, Ferrari n'a jamais dépassé les cinq dixièmes de retard sur la meilleure référence, un signal de constance qui contraste avec la marge plus large observée à Monza une semaine plus tôt.</p>
  </div>
</section>

<section class="block" data-num="02" id="sec-el3-2">
  <div class="sec-marker"><span class="n">02</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">02</span> McLaren : la vraie bascule du week-end</h2>
    <p>Piastri signe le 3<sup>e</sup> temps (+0,189s) après un vendredi discret (P8 puis P7), et Norris revient en P4 (+0,236s) avec 10 tours chronométrés sur 13 — un roulage quasiment complet, deux jours après une panne de boîte de vitesses qui l'avait limité à seulement deux tours en EL2. McLaren avait fait de son retour en piste la priorité absolue de la séance ; les chronos confirment que l'opération a fonctionné, l'écurie plaçant ses deux pilotes dans le top 4 pour la première fois du week-end. Le doute qui planait depuis la pré-analyse ("sans étincelle récente") ne disparaît pas entièrement — un seul relais qualificatif ne referme pas un déficit structurel — mais McLaren aborde les qualifications en bien meilleure posture que ne le laissaient présager les deux séances de vendredi.</p>
  </div>
</section>

<section class="block" data-num="03" id="sec-el3-3">
  <div class="sec-marker"><span class="n">03</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">03</span> Deux accrochages, deux drapeaux rouges</h2>
    <p>La séance a été interrompue à deux reprises. Lewis Hamilton a d'abord verrouillé ses freins au dernier virage et tapé les barrières, endommageant l'aileron avant de sa Ferrari — incident qui explique son classement inhabituel (9<sup>e</sup>, seulement 3 tours chronométrés sur 5). Puis, dans les dernières minutes de la séance, Oliver Bearman est sorti violemment au virage 11, sa Haas heurtant le mur à vive allure ; le pilote est sorti indemne de son cockpit, mais l'impact a nécessité l'arrêt complet de la séance à un peu plus de deux heures des qualifications — un calendrier serré pour l'équipe Haas avant la reprise de piste. La conjonction des deux incidents explique le nombre de tours globalement plus faible que lors des deux séances de vendredi pour une bonne partie du plateau, Verstappen (6/9 tours) et Albon (1/2 tour) compris.</p>
    <p>Arvid Lindblad, encore en convalescence après son accrochage de l'EL2, n'a disputé que 5 tours sur 7 chronométrés (14<sup>e</sup>, +1,708s) — une gestion prudente plutôt qu'un signal de rythme, après avoir déjà démontré vendredi un potentiel de haut de tableau sur cette même piste.</p>
  </div>
</section>

<section class="block" data-num="04" id="sec-el3-4">
  <div class="sec-marker"><span class="n">04</span><span class="t"></span></div>
  <div class="prose">
    <h2 class="sectitle"><span class="num">04</span> Une matinée plus fraîche, mais qui chauffe vite</h2>
    <p>Séance disputée dans des conditions différentes du vendredi après-midi : air à 23,9°C en début de session (contre 26-30°C pour l'EL1/EL2), humidité nettement plus élevée au départ (43%, contre 11-17% la veille) avant de retomber progressivement vers 34-38% en fin d'heure. La piste, elle, suit sa trajectoire habituelle de chauffe rapide : de 42,7°C à près de 50°C sur l'heure — un profil désormais familier sur ce tracé, cohérent avec le choix Pirelli d'une gamme plus dure pour limiter la surchauffe (cf. pré-analyse).</p>
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
        <tr><td>1</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Antonelli</td><td>Mercedes</td><td>1:32,797</td><td>—</td></tr>
        <tr><td>2</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Leclerc</td><td>Ferrari</td><td>1:32,963</td><td>+0,166s</td></tr>
        <tr><td>3</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Piastri</td><td>McLaren</td><td>1:32,986</td><td>+0,189s</td></tr>
        <tr><td>4</td><td class="driver"><span class="dot" style="background:#FF8000"></span> Norris</td><td>McLaren</td><td>1:33,033</td><td>+0,236s</td></tr>
        <tr><td>5</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Verstappen</td><td>Red Bull Racing</td><td>1:33,172</td><td>+0,375s</td></tr>
        <tr><td>6</td><td class="driver"><span class="dot" style="background:#00A19B"></span> Russell</td><td>Mercedes</td><td>1:33,499</td><td>+0,702s</td></tr>
        <tr><td>7</td><td class="driver"><span class="dot" style="background:#1B3A93"></span> Lawson</td><td>Red Bull Racing</td><td>1:33,902</td><td>+1,105s</td></tr>
        <tr><td>8</td><td class="driver"><span class="dot" style="background:#00302B"></span> Hülkenberg</td><td>Audi</td><td>1:33,933</td><td>+1,136s</td></tr>
        <tr><td>9</td><td class="driver"><span class="dot" style="background:#E8002D"></span> Hamilton</td><td>Ferrari</td><td>1:34,284</td><td>+1,487s (accrochage dernier virage, aileron avant endommagé)</td></tr>
        <tr><td>10</td><td class="driver"><span class="dot" style="background:#00302B"></span> Bortoleto</td><td>Audi</td><td>1:34,288</td><td>+1,491s</td></tr>
        <tr><td>11</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Colapinto</td><td>Alpine</td><td>1:34,346</td><td>+1,549s</td></tr>
        <tr><td>12</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Ocon</td><td>Haas F1 Team</td><td>1:34,430</td><td>+1,633s</td></tr>
        <tr><td>13</td><td class="driver"><span class="dot" style="background:#B6BABD"></span> Bearman</td><td>Haas F1 Team</td><td>1:34,481</td><td>+1,684s (sortie de piste violente au virage 11, fin de séance)</td></tr>
        <tr><td>14</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Lindblad</td><td>Racing Bulls</td><td>1:34,505</td><td>+1,708s (roulage réduit après l'accrochage d'EL2)</td></tr>
        <tr><td>15</td><td class="driver"><span class="dot" style="background:#2B4562"></span> Tsunoda</td><td>Racing Bulls</td><td>1:34,565</td><td>+1,768s</td></tr>
        <tr><td>16</td><td class="driver"><span class="dot" style="background:#FF87BC"></span> Gasly</td><td>Alpine</td><td>1:34,971</td><td>+2,174s</td></tr>
        <tr><td>17</td><td class="driver"><span class="dot" style="background:#229971"></span> Alonso</td><td>Aston Martin</td><td>1:35,020</td><td>+2,223s</td></tr>
        <tr><td>18</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Sainz</td><td>Williams</td><td>1:35,464</td><td>+2,667s</td></tr>
        <tr><td>19</td><td class="driver"><span class="dot" style="background:#229971"></span> Stroll</td><td>Aston Martin</td><td>1:35,570</td><td>+2,773s</td></tr>
        <tr><td>20</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Pérez</td><td>Cadillac</td><td>1:36,441</td><td>+3,644s</td></tr>
        <tr><td>21</td><td class="driver"><span class="dot" style="background:#C9A24B"></span> Bottas</td><td>Cadillac</td><td>1:36,670</td><td>+3,873s</td></tr>
        <tr><td>22</td><td class="driver"><span class="dot" style="background:#6C98FF"></span> Albon</td><td>Williams</td><td>1:46,647</td><td>+13,850s (1 seul tour chronométré, séance écourtée par les drapeaux rouges)</td></tr>
      </tbody>
    </table>
  </div>
  <p class="scrollhint prose">◂ glisser pour voir la suite du tableau ▸</p>
</section>

<section class="block" id="sec-el3-6">
  <div class="prose">
    <h2 class="sectitle">Ce qu'il faut surveiller en qualifications</h2>
    <p>Trois séances, un motif qui se confirme : Ferrari n'a jamais été à plus de 0,459s de la référence, et Antonelli a signé le meilleur temps de deux séances sur trois — Mercedes et Ferrari restent les deux favoris logiques pour la pole, avec un écart entre eux qui n'a plus dépassé les deux dixièmes lors des deux dernières séances. La vraie inconnue est McLaren : après un vendredi à des rythmes de 6<sup>e</sup>/8<sup>e</sup> place, Piastri et Norris pointent à moins d'un quart de seconde du sommet en EL3, ce qui en ferait des outsiders crédibles pour la première ligne si la tendance se confirme sur un tour lancé — mais un seul relais qualificatif ne suffit pas à trancher si ce sursaut est réel ou circonstanciel. Verstappen et Russell, eux, referment moins d'écart que leurs pré-analyses ne le laissaient espérer sur l'ensemble du week-end, Russell en particulier reculant séance après séance depuis sa pole provisoire de l'EL1 (P1, puis P5, puis P6).</p>
    <p>Le facteur qui pourrait tout bouleverser reste le circuit lui-même : chacune des trois séances d'essais a produit au moins un accrochage significatif (Tsunoda et les limites de piste en EL1, la sortie de Lindblad en EL2, Hamilton puis Bearman en EL3) — un tracé encore largement méconnu du plateau, où l'erreur sur un tour de qualification unique reste un risque réel pour n'importe quel pilote, y compris en tête de peloton.</p>
    <div class="callout">Rappel de méthode : l'EL3 se rapproche des conditions de qualification (réglages figés pour la plupart des équipes), mais reste perturbée par deux drapeaux rouges qui ont réduit le roulage de la quasi-totalité du plateau — les écarts observés ici restent à confirmer sur un tour lancé sans trafic ni interruption.</div>
  </div>
</section>

<section class="block" id="sec-el3-7">
  <details class="sources">
    <summary>Sources utilisées — EL3 Madring (0 lien externe)</summary>
    <div class="srcgroup">
      <h5>Données de séance</h5>
      <ul>
        <li><span class="desc">The Pit Wall — pipeline OpenF1 (scripts/ingest_openf1_practice.py), classement/secteurs/relais/météo, primaire.</span></li>
      </ul>
    </div>
  </details>
</section>
`;
