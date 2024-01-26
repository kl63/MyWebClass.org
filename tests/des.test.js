const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const path = require('path');

const config = require(path.join(process.cwd(), 'playwright.config.js'));
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'));

const TIMEOUT = 30000;

async function checkDescriptionMeta(pageUrl) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl, { timeout: TIMEOUT });
  const descriptionMeta = await page.$('meta[name="description"]');
  const description = await descriptionMeta?.getAttribute('content');
  await browser.close();
  return description !== null && description !== undefined && description.trim().length > 0;
}

pages.forEach((page) => {
  test(`Page "${page.path}" should have a "description" meta tag with a non-empty description`, async ({}) => {
    const pageUrl = `${config.use.baseURL}${page.path}`;
    const descriptionPresent = await checkDescriptionMeta(pageUrl);
    expect(descriptionPresent).toBeTruthy();
  });
});
