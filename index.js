/* const puppeteer = require('puppeteer');

(async function main(){
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.wework.com/he-IL/info/the-future-of-work-is-flexible', {waitUntil: 'domcontentloaded'});
        
        await new Promise(resolve =>  setTimeout(resolve, 5000));

        console.log('done');
        await browser.close();
    } catch (e) {
        console.log('Err', e);
    }
})(); */