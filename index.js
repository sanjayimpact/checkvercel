import puppeteer from 'puppeteer-core';
import { computeSystemExecutablePath } from '@puppeteer/browsers';





const browser = await puppeteer.launch({
  headless: true,
  executablePath:'.local-browser/chrome/linux-139.0.7257.0/chrome-linux64/chrome',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

const page = await browser.newPage();
await page.goto('https://www.google.com');
console.log(await page.title());

await browser.close();
