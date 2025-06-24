import puppeteer from 'puppeteer-core';
import { computeSystemExecutablePath } from '@puppeteer/browsers';

const executablePath = await computeSystemExecutablePath({
  browser: 'chrome',
  buildId: '137.0.7151.119',
  cacheDir: '.local-browser'
});

console.log("✅ Chrome Executable Path:", executablePath);

const browser = await puppeteer.launch({
  headless: true,
  executablePath,
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.goto('https://www.google.com');
console.log(await page.title());

await browser.close();
