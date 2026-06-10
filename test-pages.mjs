import { chromium } from 'playwright';

const pages = [
  { name: 'Dashboard', url: 'http://localhost:3009/dashboard' },
  { name: 'Symptom Check', url: 'http://localhost:3009/symptom-check' },
  { name: 'Dosage Calculator', url: 'http://localhost:3009/dosage-calculator' },
  { name: 'Growth Charts', url: 'http://localhost:3009/growth-charts' },
  { name: 'Vaccinations', url: 'http://localhost:3009/vaccinations' },
  { name: 'Medical History', url: 'http://localhost:3009/medical-history' },
  { name: 'Medicine Cabinet', url: 'http://localhost:3009/medicine-cabinet' },
  { name: 'Milestones', url: 'http://localhost:3009/milestones' },
  { name: 'AI Consultant', url: 'http://localhost:3009/consultant' },
  { name: 'Emergency', url: 'http://localhost:3009/emergency' },
];

async function testPages() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const results = [];
  const errors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push({ page: page.url(), error: msg.text() });
    }
  });

  page.on('pageerror', error => {
    errors.push({ page: page.url(), error: error.message });
  });

  for (const p of pages) {
    try {
      console.log(`Testing: ${p.name}...`);
      await page.goto(p.url, { waitUntil: 'networkidle', timeout: 30000 });

      // Wait a bit for any client-side rendering
      await page.waitForTimeout(1000);

      // Check for visible content
      const bodyText = await page.textContent('body');
      const hasContent = bodyText && bodyText.length > 100;

      results.push({
        name: p.name,
        status: 'PASS',
        hasContent: hasContent,
        url: p.url
      });
      console.log(`  ✓ ${p.name} - OK`);
    } catch (e) {
      results.push({
        name: p.name,
        status: 'FAIL',
        error: e.message,
        url: p.url
      });
      console.log(`  ✗ ${p.name} - FAILED: ${e.message}`);
    }
  }

  await browser.close();

  console.log('\n=== SUMMARY ===');
  console.log(`Total: ${results.length}`);
  console.log(`Passed: ${results.filter(r => r.status === 'PASS').length}`);
  console.log(`Failed: ${results.filter(r => r.status === 'FAIL').length}`);

  if (errors.length > 0) {
    console.log('\n=== CONSOLE ERRORS ===');
    errors.forEach(e => console.log(`${e.page}: ${e.error}`));
  } else {
    console.log('\n✓ No console errors detected');
  }

  return results;
}

testPages().catch(console.error);
