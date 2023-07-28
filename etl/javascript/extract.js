const puppeteer = require('puppeteer');
const url_gigantti = require('./config').url_gigantti;
const url_tori = require('./config').url_tori;

(async () => {
  try {
    // Launch a headless browser
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(url_tori);

    // 30 second
    await new Promise(resolve => setTimeout(resolve, 30000)); 

    await page.screenshot({ path: 'screenshot1.png', fullPage: true });


    // const numbers = await page.evaluate(() => {

    //     const element = document.querySelector('#products > elk-component-loader-wrapper > elk-product-and-content-listing-view > div.product-listproducts.ng-star-inserted > elk-product-tile-ff-wc-wrapper:nth-child(1) > elk-product-tile > div > div.product-tileinformation.information > elk-price > span > span'); 

    //     return element ? element.textContent.trim() : null;

    // });
    // console.log('Numbers:', numbers);

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('Error:', error);
  }
})();
