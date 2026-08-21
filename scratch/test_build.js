import fs from 'fs';
import path from 'path';

console.log('--- VERIFYING LAYOUT FIXED PRODUCTION BUILD ---');

const distIndex = path.resolve('dist', 'index.html');
console.log('Checking dist/index.html exists:', fs.existsSync(distIndex));

if (fs.existsSync(distIndex)) {
  const htmlContent = fs.readFileSync(distIndex, 'utf-8');
  console.log('HTML file size:', htmlContent.length, 'bytes');

  const requiredSelectors = [
    'cinematic-loader',
    'custom-cursor-dot',
    'hero',
    'desktop-nav',
    'mobile-nav-drawer',
    'signature-product-reveal',
    'signature-grid',
    'signature-content-col',
    'signature-visual-col',
    'horizontal-routine-section',
    'brand-ethos',
    'products-section',
    'clinical-proof',
    'cart-drawer',
    'quickview-backdrop',
    'routine-drawer'
  ];

  let missing = 0;
  requiredSelectors.forEach(selector => {
    if (htmlContent.includes(selector)) {
      console.log(`✓ Element/ID "${selector}" found in HTML bundle.`);
    } else {
      console.error(`✗ Missing selector "${selector}"`);
      missing++;
    }
  });

  if (missing === 0) {
    console.log('SUCCESS: All layout fix classes, mobile nav drawer, 2-column signature grid, and interactive elements exist in production build!');
  } else {
    console.error(`FAILURE: ${missing} elements missing.`);
    process.exit(1);
  }
}
