// Captures real screenshots of the live projects into public/images/projects/<slug>/.
// Usage: npx playwright install chromium && npm run screenshots
// File names must match the `images` entries in src/data/projects.ts.
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "public", "images", "projects");

/** [slug, file, url, extra wait in ms, optional page action] */
const shots = [
  ["real-estate-platform", "home.png", "https://real-estate-website-client-rob5.onrender.com/", 6000],
  ["real-estate-platform", "listings.png", "https://real-estate-website-client-rob5.onrender.com/list", 8000],
  ["pharmacovigilance-website", "home.png", "https://sokolapv.com/", 3000],
  ["pharmacovigilance-website", "service.png", "https://sokolapv.com/services/pv-audits/", 3000],
  ["pharmacovigilance-website", "education.png", "https://sokolapv.com/education/", 3000],
  ["pharmacovigilance-website", "home-ua.png", "https://sokolapv.com/ua/", 3000],
  ["iphone-3d", "viewer.png", "https://iphope-3d.vercel.app/", 12000],
  [
    "iphone-3d",
    "viewer-large.png",
    "https://iphope-3d.vercel.app/",
    12000,
    async (page) => {
      await page.getByText('6.7"').click();
      await page.waitForTimeout(2500);
    },
  ],
];

const browser = await chromium.launch({
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

for (const [slug, file, url, wait, action] of shots) {
  const page = await context.newPage();
  try {
    // Render free-tier services may need a minute to wake up.
    await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  } catch (error) {
    console.warn(`${slug}/${file}: ${error.message.split("\n")[0]}`);
  }
  await page.waitForTimeout(wait);
  if (action) await action(page);
  fs.mkdirSync(path.join(root, slug), { recursive: true });
  await page.screenshot({ path: path.join(root, slug, file) });
  console.log(`saved ${slug}/${file}`);
  await page.close();
}

await browser.close();
console.log("Review each image before committing: remove any that show errors or personal data.");
