const puppeteer = require('puppeteer');

(async () => {
  try {
    // Launch a headless browser
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    const url = 'https://www.gigantti.fi/kodin-pienkoneet/ilmastointi-ja-lammitys/ilmastointi/ilmastointilaitteet?as_templateId=9539&gclid=CjwKCAjw44mlBhAQEiwAqP3eVrqsu-i5fTTAwCMdQalur56eS9Y2L7lvcJIOkLYWbpm_CI8qIXffbRoClngQAvD_BwE'; // Replace this with the URL of the one-page application
    await page.goto(url);

    // 30 second
    await new Promise(resolve => setTimeout(resolve, 30000)); 

    const wait = await page.waitForSelector('#products > elk-component-loader-wrapper > elk-product-and-content-listing-view > div.product-listproducts.ng-star-inserted > elk-product-tile-ff-wc-wrapper:nth-child(1) > elk-product-tile > div > div.product-tileinformation.information > elk-price > span > span', { timeout: 5000 }); 
    console.log('Wait:', wait);

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
