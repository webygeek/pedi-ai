const { chromium } = require('playwright');

async function testSubPages() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Login as Platform Admin first since it has the most subpages
  console.log('Logging in as Platform Admin...');
  await page.goto('http://localhost:3002/login');
  await page.waitForLoadState('networkidle');
  await page.locator('button:has-text("superadmin@demo.com")').click();
  await page.waitForTimeout(300);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL('**/platform-admin**', { timeout: 10000 });
  await page.waitForTimeout(1000);
  
  console.log('\n=== Testing Platform Admin Sub-pages ===\n');
  
  const pages = [
    { url: '/platform-admin', name: 'Dashboard' },
    { url: '/platform-admin/users', name: 'Users' },
    { url: '/platform-admin/audit', name: 'Audit Logs' },
  ];
  
  for (const p of pages) {
    try {
      console.log(`Testing ${p.name}...`);
      await page.goto(`http://localhost:3002${p.url}`);
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1500);
      
      const heading = await page.locator('h1').first().textContent();
      console.log(`  ✓ Heading: ${heading}`);
      
      const hasBgCream = await page.locator('[class*="bg-cream"]').count() > 0;
      console.log(`  ✓ Design system: ${hasBgCream}`);
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  }
  
  // Now login as Doctor and test doctor subpages
  console.log('\n=== Testing Doctor Sub-pages ===\n');
  
  const doctorBrowser = await chromium.launch({ headless: true });
  const doctorContext = await doctorBrowser.newContext();
  const doctorPage = await doctorContext.newPage();
  
  await doctorPage.goto('http://localhost:3002/login');
  await doctorPage.waitForLoadState('networkidle');
  await doctorPage.locator('button:has-text("dr.chen@demo.com")').click();
  await doctorPage.waitForTimeout(300);
  await doctorPage.locator('button[type="submit"]').click();
  await doctorPage.waitForURL('**/doctor**', { timeout: 10000 });
  await doctorPage.waitForTimeout(1000);
  
  const doctorPages = [
    { url: '/doctor', name: 'Dashboard' },
    { url: '/doctor/patients', name: 'Patients' },
    { url: '/doctor/appointments', name: 'Appointments' },
  ];
  
  for (const p of doctorPages) {
    try {
      console.log(`Testing ${p.name}...`);
      await doctorPage.goto(`http://localhost:3002${p.url}`);
      await doctorPage.waitForLoadState('networkidle');
      await doctorPage.waitForTimeout(1500);
      
      const heading = await doctorPage.locator('h1').first().textContent();
      console.log(`  ✓ Heading: ${heading}`);
      
      const hasBgCream = await doctorPage.locator('[class*="bg-cream"]').count() > 0;
      console.log(`  ✓ Design system: ${hasBgCream}`);
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  }
  
  // Test Parent subpages
  console.log('\n=== Testing Parent Sub-pages ===\n');
  
  const parentBrowser = await chromium.launch({ headless: true });
  const parentContext = await parentBrowser.newContext();
  const parentPage = await parentContext.newPage();
  
  await parentPage.goto('http://localhost:3002/login');
  await parentPage.waitForLoadState('networkidle');
  await parentPage.locator('button:has-text("anxious@demo.com")').click();
  await parentPage.waitForTimeout(300);
  await parentPage.locator('button[type="submit"]').click();
  await parentPage.waitForURL('**/dashboard**', { timeout: 10000 });
  await parentPage.waitForTimeout(1000);
  
  const parentPages = [
    { url: '/dashboard', name: 'Dashboard' },
    { url: '/symptom-check', name: 'Symptom Check' },
    { url: '/growth-charts', name: 'Growth Charts' },
    { url: '/vaccinations', name: 'Vaccinations' },
    { url: '/milestones', name: 'Milestones' },
    { url: '/appointments', name: 'Appointments' },
  ];
  
  for (const p of parentPages) {
    try {
      console.log(`Testing ${p.name}...`);
      await parentPage.goto(`http://localhost:3002${p.url}`);
      await parentPage.waitForLoadState('networkidle');
      await parentPage.waitForTimeout(1500);
      
      const heading = await parentPage.locator('h1').first().textContent();
      console.log(`  ✓ Heading: ${heading}`);
      
      const hasBgCream = await parentPage.locator('[class*="bg-cream"]').count() > 0;
      console.log(`  ✓ Design system: ${hasBgCream}`);
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n=== Summary ===');
  console.log(`Total console errors: ${errors.length}`);
  if (errors.length > 0) {
    errors.slice(0, 5).forEach(e => console.log(`  - ${e.substring(0, 80)}`));
  }
  
  await browser.close();
  await doctorBrowser.close();
  await parentBrowser.close();
  
  console.log('\n✅ All sub-page tests completed!');
}

testSubPages();
