import puppeteer from 'puppeteer';
import { computeSystemExecutablePath } from '@puppeteer/browsers';

const executablePath = await computeSystemExecutablePath({
  cacheDir: './.local-browser', // Puppeteer saves it here by default
  browser: 'chrome',
  buildId: '137.0.7151.119'
});
console.log("✅ Chrome Executable Path:", executablePath);
const launchBrowser = async () => {
  const browser = await puppeteer.launch({
     executablePath,
    headless: true,
       args: ['--no-sandbox', '--disable-setuid-sandbox']

 
  });

  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  const title = await page.title();
  console.log('✅ Page title:', title);

  await browser.close();
};

launchBrowser();
