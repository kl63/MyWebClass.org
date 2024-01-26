const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const path = require('path');

const config = require(path.join(process.cwd(), 'playwright.config.js'));
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'));

const TIMEOUT = 30000;

async function checkTwitterCardMeta(pageUrl) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl, { timeout: TIMEOUT });
  const twitterCardMeta = await page.$('meta[name="twitter:card"]');
  const twitterCard = await twitterCardMeta?.getAttribute('content');
  await browser.close();
  return twitterCard !== null && twitterCard !== undefined && twitterCard.trim().length > 0;
}

pages.forEach((page) => {
  test(`Page "${page.path}" should have a "twitter:card" meta tag with a non-empty value`, async ({}) => {
    const pageUrl = `${config.use.baseURL}${page.path}`;
    const twitterCardPresent = await checkTwitterCardMeta(pageUrl);
    expect(twitterCardPresent).toBeTruthy();
  });
});
