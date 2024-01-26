const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const path = require('path');

const config = require(path.join(process.cwd(), 'playwright.config.js'));
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'));

const TIMEOUT = 30000;

async function checkFavicon(pageUrl) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl, { timeout: TIMEOUT });
  const faviconLink = await page.$('link[rel="shortcut icon"], link[rel="icon"]');
  const faviconUrl = await faviconLink?.getAttribute('href');
  const response = await page.goto(faviconUrl, { timeout: TIMEOUT, waitUntil: 'networkidle' });
  const contentType = response.headers()['content-type'];
  await browser.close();
  return faviconUrl !== null && faviconUrl !== undefined && faviconUrl.trim().length > 0 && contentType === 'image/png';
}

pages.forEach((page) => {
  test(`Page "${page.path}" should have a valid PNG format favicon`, async ({}) => {
    const pageUrl = `${config.use.baseURL}${page.path}`;
    const faviconPresent = await checkFavicon(pageUrl);
    expect(faviconPresent).toBeTruthy();
  });
});
