const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const path = require('path');

const config = require(path.join(process.cwd(), 'playwright.config.js'));
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'));

const TIMEOUT = 30000;

async function checkAuthorMeta(pageUrl) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl, { timeout: TIMEOUT });
  const authorMeta = await page.$('meta[name="author"]');
  const author = await authorMeta?.getAttribute('content');
  await browser.close();
  return author !== null && author !== undefined && author.trim().length > 0;
}

pages.forEach((page) => {
  test(`Page "${page.path}" should have an "author" meta tag with a non-empty author name`, async ({}) => {
    const pageUrl = `${config.use.baseURL}${page.path}`;
    const authorPresent = await checkAuthorMeta(pageUrl);
    expect(authorPresent).toBeTruthy();
  });
});
