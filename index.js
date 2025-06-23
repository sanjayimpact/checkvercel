import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  const chromeAwsLambda = await import("chrome-aws-lambda");
  const puppeteerCore = await import("puppeteer-core");
  chrome = chromeAwsLambda.default || chromeAwsLambda;
  puppeteer = puppeteerCore.default || puppeteerCore;
} else {
  const puppeteerModule = await import("puppeteer");
  puppeteer = puppeteerModule.default || puppeteerModule;
}
app.get("/",(req,res)=>{
res.send('Server is running')

})
app.get("/api", async (req, res) => {
  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

  try {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto("https://www.linkedin.com");
    const title = await page.title();
    console.log(title);
    res.send(title);
    await browser.close();
  } catch (err) {
    console.error("Puppeteer Error:", err);
    res.status(500).send("Error occurred");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`);
});


