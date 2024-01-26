const { test, expect } = require('@playwright/test');
const { chromium } = require('playwright');
const path = require('path');

const config = require(path.join(process.cwd(), 'playwright.config.js'));
const { pages } = require(path.join(process.cwd(), 'tests', 'pages.json'));

const TIMEOUT = 30000;

async function checkLangAttribute(pageUrl) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(pageUrl, { timeout: TIMEOUT });
  const htmlElement = await page.$('html');
  const langAttribute = await htmlElement.getAttribute('lang');
  await browser.close();
  return langAttribute !== null && langAttribute !== undefined;
}

pages.forEach((page) => {
  test(`Page "${page.path}" should have a valid "lang" attribute on the HTML tag`, async ({}) => {
    const pageUrl = `${config.use.baseURL}${page.path}`;
    const langAttributePresent = await checkLangAttribute(pageUrl);
    expect(langAttributePresent).toBeTruthy();
  });
});
