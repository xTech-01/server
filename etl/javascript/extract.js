const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');

const {
    url_gigantti, 
    url_tori,
    url_prisma,
    selector_gigantti,
    selector_prisma,

    proxy_list,
    USER_AGENTS,
    } = require('./config');

const logger = require('./logger.js');

const get_random = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const proxy = get_random(proxy_list);
const user_agent = get_random(USER_AGENTS);

const proxy_request = async (url) => {

    try {
        logger.info('Making a request to ' + url);
        logger.info('Using proxy: ' + proxy);
        const response = await axios.get(url, {
            // proxy: {
            //     host: proxy,
            //     port: 443,
            //     protocol: 'https'
            // },
            headers: {
                'User-Agent': user_agent,
                // 'Cookie': COOKIE
            }
        });
        logger.info(response)

        if (response.status == 200) {
            logger.info(response.data);
            logger.info('Got data')
            return response;
        } else {
            logger.error('Error occured @ making a request to ' + url + ':', response.status);
        }
        
    }
    catch (error) {
        logger.error('Error occured @ making a request to ' + url + ':', error);
    }
}

// proxy_request(url_prisma);



(async () => {
    // const browser = await puppeteer.launch();
    const browser = await puppeteer.launch({
        headless: false,
        // args: [
        //     '--proxy-server=' + proxy,
        //     '--no-sandbox',
        //     '--disable-setuid-sandbox',
        //     '--disable-dev-shm-usage',
        //     '--disable-accelerated-2d-canvas',
        //     '--disable-gpu',
        //     '--window-size=1920x1080',
        // ]
    });

    const page = await browser.newPage();

    try {
        logger.info('Making a request to ' + url_prisma);
        await page.goto(url_gigantti);
        // await page.goto(url_prisma);
        
        logger.info('40 sec timeout....................')
        await new Promise(resolve => setTimeout(resolve, 40000)); 
        await page.screenshot({ path: 'screenshot.png', fullPage: true });
        logger.info('got screenshot')

        const htmlContent = await page.content();
        // logger.info(htmlContent)
        // fs.writeFileSync('prisma_output1.html', htmlContent);
        fs.writeFileSync('gigantti_output.html', htmlContent);
        logger.info('got html content')

        // const element = await page.$(selector_prisma)
        // if (element) {
        //     const element_content = await element.evaluate(ele => ele.textContent);
        //     logger.info('Element:', type(element_content), element_content);
        // } else {
        //     logger.error('Error occured @ getting the element:', error);
        // }
    } catch (error) {
        console.error('Error occured @ getting the screenshot + element:', error);
    }


    await browser.close();
})();

