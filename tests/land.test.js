const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to the landing page URL
  await page.goto('https://njit-wis.github.io/project-2-future-ceos/');

  // Assert that the landing page is loaded successfully
  const pageTitle = await page.title();
  console.log(`Page title: ${pageTitle}`);

  await browser.close();
})();
