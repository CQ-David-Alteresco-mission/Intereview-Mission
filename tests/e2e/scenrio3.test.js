
const url = require('url');
const pHelper = require('../helpers/pup');
const timeout = 90000;
let myURL, page, browser;

describe('Get request params from "pageview" request URL', () => {
   beforeAll(async () => {
      try{
         const po = await pHelper.Init();
         page = po.page;
         browser = po.browser;
   
         page.on('request',  (request) => {
            if (request.url().indexOf('https://c.contentsquare.net/pageview') != -1 && request.method() == 'GET') {
               myURL = request.url();            
            }
         });
   
         let myWebUrl = 'https://contentsquare.com';
         await page.goto(myWebUrl,{waitUntil:"networkidle0"});
      }catch(e){
         console.log(`Problem loading page ${e}`);
         
      }
      
   }, timeout);


   afterAll(async () => {
      browser.close();
   });

   describe('Get params URL and validate there values', () => {
      it('validate values from "pid" "uu" "pn"', () => {
            let url_parts = url.parse(myURL, true);
            expect(url_parts.query.pid).toBe('276');
            expect(url_parts.query.uu).toMatch(new RegExp(/.{8}-.{4}-.{4}-.{4}-.{12}/g));
            expect(url_parts.query.pn).toBe('1');
      });
   });


   
   describe('Get params URL and validate there values after second run', () => {
      beforeEach(async () => {
         try{
            await page.reload({waitUntil:"networkidle0"});
         }catch(e){
            console.log(`Problem refresh page ${e}`);
            
         }
         
      },timeout);
      
      it('validate "pn" value increased by one', () => {
         let url_parts = url.parse(myURL, true);
         expect(url_parts.query.pn).toBe('2');
      });
   });
});
   





