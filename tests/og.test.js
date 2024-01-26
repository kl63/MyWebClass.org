const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const path = require('path');

const config = require(path.join(process.cwd(), 'playwright.config.js'));
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'));

const TIMEOUT = 30000;

async function checkOgImageMeta(pageUrl) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl, { timeout: TIMEOUT });
  const ogImageMeta = await page.$('meta[property="og:image"]');
  const ogImageUrl = await ogImageMeta?.getAttribute('content');
  await browser.close();
  return ogImageUrl !== null && ogImageUrl !== undefined && ogImageUrl.trim().length > 0;
}

pages.forEach((page) => {
  test(`Page "${page.path}" should have an "og:image" meta tag with a valid image URL`, async ({}) => {
    const pageUrl = `${config.use.baseURL}${page.path}`;
    const ogImagePresent = await checkOgImageMeta(pageUrl);
    expect(ogImagePresent).toBeTruthy();
  });
});
