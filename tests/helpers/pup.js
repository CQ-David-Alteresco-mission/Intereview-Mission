const puppeteer = require('puppeteer');
module.exports = {
    Init: () => {
        return new Promise(async (resolve, reject) => {
            try{
                const browser = await puppeteer.launch({headless:true});
                const page = await browser.newPage();
                return resolve({
                    browser,
                    page
                })
            }catch(e){
                return reject(e)
            } 
        })
                
    }
}