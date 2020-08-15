const pHelper = require('../helpers/pup');
const timeout = 50000;

let getCookies;
let getEditedCookies;
let page, browser;
let objAdd = [{
    'name': 'david',
    'value': '1986',
    'domain': 'www.wework.com',
    'path': '/',
    'expires': -1,
    'size': 9,
    'httpOnly': false,
    'secure': true,
    'session': true}]

describe("Choose one cookie, change the value of the cookie and validate it.Revert the value of the cookie.", () => {
    beforeAll(async () => {
        try{
            const po = await pHelper.Init();
            page = po.page;
            browser = po.browser;
            let myWebUrl = 'https://www.wework.com/he-IL/info/the-future-of-work-is-flexible';
            await page.goto(myWebUrl,{waitUntil:"networkidle0"});
        }catch(e){
            console.log(`Problem loading page ${e}`); 
        }
    },timeout);

    afterAll(() => {
        browser.close();
     });

    describe("Change value of cookies and set the cookies",() => {
        beforeEach(async () => {
            try{
                getCookies = await page.cookies();
                await page.setCookie(...objAdd);
                getEditedCookies = await page.cookies();
            }catch(e){
                console.log(`Can't get/set cookies ${e}`);
            }      
        },timeout);

        it("Verify cookie set",() =>{   
            expect(getEditedCookies).toContainEqual(objAdd[0]);
        });
    });

    describe("Set cookies updated",() => {
        let getRevertCookies = null;
        beforeEach(async ()=>{
            try{
                await page.setCookie(...getCookies);
                getRevertCookies = await page.cookies();
            }catch(e){
                console.log(`Can't get/set cookies ${e}`);
            }
        });
        it("Verify cookie set back",()=>{    
            expect(getCookies).not.toMatchObject(objAdd[0]);
        });
    });
});



