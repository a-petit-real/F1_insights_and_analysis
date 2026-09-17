// Vérifie EXACTEMENT ce que l'utilisateur voit dans le tableau "Dépassements"
// (Raw data) sur le site déployé réel — l'utilisateur signale des doublons
// persistants après le fix d'affichage des millisecondes (commit 3834604).
// Le sandbox interactif ne peut pas atteindre vercel.app, ce script tourne
// donc sur un runner GitHub Actions (accès réseau normal).
//
// Usage : node scripts/debug_live_overtakes_check.mjs --url https://f1platform.vercel.app/courses/14
import { chromium } from "playwright";

function parseArgs() {
  const args = {};
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) {
      args[argv[i].slice(2)] = argv[i + 1];
      i++;
    }
  }
  return args;
}

const args = parseArgs();
const url = args.url;
if (!url) {
  console.error("--url manquant.");
  process.exit(1);
}

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1100, height: 1000 } });

  console.log(`Chargement de ${url} ...`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

  const rawTab = page.locator("button.tabbtn", { hasText: "Raw data" }).first();
  console.log(`Onglet "Raw data" trouvé : ${(await rawTab.count()) > 0}`);
  await rawTab.click();
  await page.waitForTimeout(400);

  const spoilerBtn = page.locator("button", { hasText: "J'ai regardé" }).first();
  const spoilerCount = await spoilerBtn.count();
  console.log(`Bouton anti-spoiler trouvé : ${spoilerCount > 0}`);
  if (spoilerCount > 0) {
    await spoilerBtn.click();
    await page.waitForTimeout(800);
  }

  // Trouve la section "Dépassements" par son titre, puis lit TOUTES les
  // lignes du tableau qui suit, telles que réellement rendues dans le DOM
  // (donc après tout formatage JS côté client).
  const heading = page.locator("h2, h3, .section-title, *", { hasText: /^Dépassements \(\d+\)/ }).first();
  const headingCount = await heading.count();
  console.log(`Titre "Dépassements (N)" trouvé : ${headingCount > 0}`);
  if (headingCount > 0) {
    console.log(`Texte du titre : ${(await heading.first().textContent())?.trim()}`);
  }

  const rows = page.locator("table tr");
  const rowCount = await rows.count();
  console.log(`\n${rowCount} <tr> trouvées sur toute la page (toutes tables confondues).`);

  // Cible spécifiquement le tableau dont l'en-tête contient "Dépasse" et
  // "Dépassé" (colonnes du tableau Dépassements), pour ne dumper que ses lignes.
  const tables = page.locator("table");
  const tableCount = await tables.count();
  console.log(`${tableCount} <table> trouvées.`);
  for (let t = 0; t < tableCount; t++) {
    const table = tables.nth(t);
    const headerText = await table.locator("thead").textContent().catch(() => "");
    if (headerText && headerText.includes("Dépasse") && headerText.includes("Dépassé")) {
      console.log(`\n=== Table #${t} (en-têtes: ${headerText.trim()}) ===`);
      const trs = table.locator("tbody tr");
      const n = await trs.count();
      console.log(`${n} lignes dans tbody.\n`);
      const seen = new Map();
      for (let i = 0; i < n; i++) {
        const cells = await trs.nth(i).locator("td").allTextContents();
        const line = cells.map((c) => c.trim()).join(" | ");
        console.log(`  [${i}] ${line}`);
        const key = cells.slice(1).join("|"); // tout sauf l'heure (avec ms) : pilotes + position
        seen.set(key, (seen.get(key) || 0) + 1);
      }
      console.log("\n--- Lignes identiques hors heure (mêmes pilotes + même position, quel que soit l'horodatage) ---");
      let anyDupe = false;
      for (const [key, count] of seen.entries()) {
        if (count > 1) {
          anyDupe = true;
          console.log(`  x${count} : ${key}`);
        }
      }
      if (!anyDupe) console.log("  Aucune.");
    }
  }

  await browser.close();
}

main();
