import puppeteer from 'puppeteer';

const launchBrowser = async () => {
  const browser = await puppeteer.launch({
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
