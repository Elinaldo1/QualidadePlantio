const puppeteer = require('puppeteer');

// (async () => {

// })();
async function robo() {
   const browser = await puppeteer.launch({headless:true, slowMo:300 });
  const page = await browser.newPage();
  const qurl ='https://google.com' 
  await page.goto(qurl);
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

await page.evaluate(() => console.log(`url is ${location.href}`));
  await page.screenshot({path: 'example.png'});

  await browser.close(); 
  
};

// (async () => {})();
// async function pdf() {
//     const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
//   await page.pdf({path: 'hn.pdf', format: 'A4'});

//   await browser.close();
// }

