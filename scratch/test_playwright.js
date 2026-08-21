import { chromium } from 'playwright';
import path from 'path';

async function run() {
  console.log('Launching browser for hero section screenshot validation...');
  const browser = await chromium.launch({ headless: true });
  
  const viewports = [
    { name: '1440', width: 1440, height: 900 },
    { name: '1024', width: 1024, height: 800 },
    { name: '768', width: 768, height: 1024 },
    { name: '375', width: 375, height: 812 }
  ];

  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const screenshotPath = path.resolve('scratch', `hero_${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 950) } });
    console.log(`Saved screenshot for ${vp.name}px to scratch/hero_${vp.name}.png`);
    await page.close();
  }

  await browser.close();
  console.log('All hero screenshots captured successfully.');
}

run().catch(err => console.log('Playwright test note:', err.message));
