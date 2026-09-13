// Charge la VRAIE page déployée (pas un mock, pas une reconstruction locale)
// via un vrai navigateur, pour vérifier ce que l'utilisateur voit
// réellement — le sandbox interactif ne peut pas atteindre le domaine
// Vercel (proxy réseau), ce script tourne donc sur un runner GitHub
// Actions à la place (accès réseau normal), demandé explicitement par
// l'utilisateur ("je voudrais lire directement sur le site").
//
// Usage : node scripts/debug_live_site_check.mjs --url https://f1platform.vercel.app/courses/14
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
  const page = await browser.newPage({ viewport: { width: 900, height: 1000 } });
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
  page.on("pageerror", (err) => pageErrors.push(String(err)));

  console.log(`Chargement de ${url} ...`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.screenshot({ path: "live_01_initial.png", fullPage: false });

  // Cherche l'onglet "Quali" (peut être libellé "Quali 🔒" si l'anti-spoiler
  // n'a pas encore été validé pour cette séance).
  const qualiTab = page.locator("button.tabbtn", { hasText: "Quali" }).first();
  const qualiCount = await qualiTab.count();
  console.log(`Onglet "Quali" trouvé : ${qualiCount > 0}`);
  if (qualiCount > 0) {
    await qualiTab.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: "live_02_after_quali_click.png", fullPage: false });

    // Anti-spoiler : bouton "J'ai regardé — afficher"
    const spoilerBtn = page.locator("button", { hasText: "J'ai regardé" }).first();
    const spoilerCount = await spoilerBtn.count();
    console.log(`Bouton anti-spoiler trouvé : ${spoilerCount > 0}`);
    if (spoilerCount > 0) {
      await spoilerBtn.click();
      await page.waitForTimeout(1500); // laisse le Server Action + fetch de télémétrie répondre
    }
  }

  await page.screenshot({ path: "live_03_final.png", fullPage: true });

  const ghostlapCount = await page.locator(".ghostlap").count();
  const ghostlapLoadingCount = await page.locator(".ghostlap-loading").count();
  const ghostlapText = await page.locator(".ghostlap-loading .scrollhint").allTextContents();
  console.log(`Éléments .ghostlap trouvés : ${ghostlapCount}`);
  console.log(`Éléments .ghostlap-loading trouvés : ${ghostlapLoadingCount} (texte: ${JSON.stringify(ghostlapText)})`);
  if (ghostlapCount > 0) {
    const html = await page.locator(".ghostlap").first().innerHTML();
    console.log("\n=== .ghostlap innerHTML (tronqué à 3000 caractères) ===");
    console.log(html.slice(0, 3000));
  }

  const bodyText = await page.locator("body").innerText();
  console.log(`Contient "le tour de pole" : ${bodyText.includes("le tour de pole")}`);
  console.log(`Contient "Réplay indisponible" : ${bodyText.includes("Réplay indisponible")}`);
  console.log(`Contient "Chargement du réplay" : ${bodyText.includes("Chargement du réplay")}`);

  console.log("\n=== ERREURS CONSOLE ===");
  for (const e of consoleErrors) console.log(e);
  console.log("\n=== ERREURS PAGE (exceptions JS) ===");
  for (const e of pageErrors) console.log(e);

  await browser.close();
}

main();
