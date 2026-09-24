// Vérifie EXACTEMENT ce que l'utilisateur voit et peut faire avec le
// nouveau bouton "Feedback" du header + sa modale, sur le site déployé
// réel — le sandbox interactif ne peut pas atteindre vercel.app, ce
// script tourne donc sur un runner GitHub Actions (accès réseau normal).
//
// Usage : node scripts/debug_feedback_check.mjs --url https://f1platform.vercel.app/
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
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });

  console.log(`Chargement de ${url} ...`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });

  const fbBtn = page.locator('button[aria-label="Proposer une amélioration"]');
  console.log(`Bouton Feedback trouvé dans le header : ${(await fbBtn.count()) > 0}`);
  if ((await fbBtn.count()) === 0) {
    console.log("ARRÊT — bouton introuvable.");
    await browser.close();
    process.exit(1);
  }

  const dialog = page.locator("dialog.fbdialog");
  console.log(`Modale présente dans le DOM avant clic : ${(await dialog.count()) > 0}`);
  console.log(`Modale ouverte avant clic (attribut open) : ${await dialog.evaluate((el) => el.hasAttribute("open")).catch(() => false)}`);

  await fbBtn.click();
  await page.waitForTimeout(300);
  const isOpen = await dialog.evaluate((el) => el.hasAttribute("open"));
  console.log(`Modale ouverte après clic : ${isOpen}`);

  // Capture d'écran de la modale ouverte, clair/sombre selon préférence système du runner (clair par défaut).
  await page.screenshot({ path: "/tmp/feedback-modal-open.png" });
  console.log("Capture : /tmp/feedback-modal-open.png");

  // Sélectionne le type "Bug", remplit le message, soumet.
  const bugChip = page.locator('.fbtypechip:has-text("Bug") input[type="radio"]');
  await bugChip.check({ force: true });
  const checked = await bugChip.isChecked();
  console.log(`Chip "Bug" sélectionnée : ${checked}`);

  const marker = `[debug_feedback_check.mjs] test automatisé ${new Date().toISOString()}`;
  await page.locator("#fbmessage").fill(marker);
  console.log(`Message rempli : "${marker}"`);

  await page.locator('.fbdialog button[type="submit"]').click();

  // Attend soit le message de confirmation, soit une erreur affichée.
  const sentLocator = page.locator(".fbsent");
  const errorLocator = page.locator(".fberror");
  await Promise.race([
    sentLocator.waitFor({ state: "visible", timeout: 8000 }).catch(() => null),
    errorLocator.waitFor({ state: "visible", timeout: 8000 }).catch(() => null),
  ]);

  const sentVisible = await sentLocator.isVisible().catch(() => false);
  const errorVisible = await errorLocator.isVisible().catch(() => false);
  console.log(`Confirmation "Merci, c'est envoyé." affichée : ${sentVisible}`);
  if (errorVisible) {
    console.log(`Erreur affichée : ${await errorLocator.textContent()}`);
  }

  await page.waitForTimeout(2000);
  const closedAfter = await dialog.evaluate((el) => !el.hasAttribute("open")).catch(() => null);
  console.log(`Modale refermée automatiquement après envoi : ${closedAfter}`);

  console.log(`\nMARQUEUR À CHERCHER EN BASE : ${marker}`);

  await browser.close();
}

main();
