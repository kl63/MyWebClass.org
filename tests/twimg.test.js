const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const path = require('path');

const config = require(path.join(process.cwd(), 'playwright.config.js'));
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'));

const TIMEOUT = 30000;

async function checkTwitterImageMeta(pageUrl) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl, { timeout: TIMEOUT });
  const twitterImageMeta = await page.$('meta[name="twitter:image"]');
  const twitterImage = await twitterImageMeta?.getAttribute('content');
  await browser.close();
  return twitterImage !== null && twitterImage !== undefined && twitterImage.trim().length > 0;
}

pages.forEach((page) => {
  test(`Page "${page.path}" should have a "twitter:image" meta tag with a non-empty image URL`, async ({}) => {
    const pageUrl = `${config.use.baseURL}${page.path}`;
    const twitterImagePresent = await checkTwitterImageMeta(pageUrl);
    expect(twitterImagePresent).toBeTruthy();
  });
});
