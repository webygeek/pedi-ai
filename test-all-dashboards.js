const { chromium } = require('playwright');

async function testAllDashboards() {
  const demoAccounts = [
    { email: 'anxious@demo.com', name: 'Parent', expectedUrl: '/dashboard' },
    { email: 'dr.chen@demo.com', name: 'Doctor', expectedUrl: '/doctor' },
    { email: 'nurse.jones@demo.com', name: 'Nurse', expectedUrl: '/nurse' },
    { email: 'admin@pediatric-clinic.com', name: 'Clinic Admin', expectedUrl: '/clinic-admin' },
    { email: 'superadmin@demo.com', name: 'Platform Admin', expectedUrl: '/platform-admin' },
  ];

  for (const account of demoAccounts) {
    console.log(`\n${'='.repeat(50)}`);
    console.log(`Testing ${account.name} Dashboard`);
    console.log(`${'='.repeat(50)}`);
    
    // Create a new browser context for each test to ensure clean state
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    try {
      // Go to login
      await page.goto('http://localhost:3002/login');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(500);
      
      // Select demo account
      const demoBtn = page.locator(`button:has-text("${account.email}")`);
      await demoBtn.click();
      await page.waitForTimeout(300);
      
      // Submit login
      await page.locator('button[type="submit"]').click();
      
      // Wait for redirect
      await page.waitForURL(`**${account.expectedUrl}**`, { timeout: 10000 });
      console.log(`✓ Redirected to: ${page.url()}`);
      
      // Wait for content
      await page.waitForTimeout(2000);
      
      // Check for main heading
      const heading = await page.locator('h1').first().textContent();
      console.log(`✓ Page heading: ${heading}`);
      
      // Check for sidebar (should exist on all dashboards)
      const sidebarExists = await page.locator('aside').count() > 0;
      console.log(`✓ Sidebar present: ${sidebarExists}`);
      
      // Check for design system background
      const hasBgCream = await page.locator('[class*="bg-cream"]').count() > 0;
      console.log(`✓ Uses design system (bg-cream): ${hasBgCream}`);
      
      // Check for any errors
      if (errors.length > 0) {
        console.log(`⚠ Console errors: ${errors.length}`);
        errors.slice(0, 3).forEach(e => console.log(`  - ${e.substring(0, 80)}...`));
      } else {
        console.log(`✓ No console errors`);
      }
      
      console.log(`✅ ${account.name} dashboard working!`);
      
    } catch (error) {
      console.log(`❌ Failed: ${error.message}`);
    } finally {
      await browser.close();
    }
  }
  
  console.log('\n✅ All dashboard tests completed!');
}

testAllDashboards();
