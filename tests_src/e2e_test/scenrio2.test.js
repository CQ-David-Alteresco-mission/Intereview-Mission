
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

jest.setTimeout(10000)

let getCookies = null;
let getEditedCookies = null;
describe("Choose one cookie, change the value of the cookie and validate it.Revert the value of the cookie.", () => {
    
    beforeAll(async () => {
        let myWebUrl = 'https://www.wework.com/he-IL/info/the-future-of-work-is-flexible';
        await page.goto(myWebUrl,{waitUntil:"networkidle0"});
    });

    describe("Change value of cookies and set the cookies",() => {
        beforeEach(async () => {
            try{
                getCookies = await page.cookies();
                await page.setCookie(...objAdd);
                getEditedCookies = await page.cookies();
            }catch(e){
                throw new Error('Something got wrong in set cookies first value change' + e);
            }
            
        });

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
                throw new Error('Something got wrong in set cookies in the second time' + e);
            }
        });
        it("Verify cookie set back",()=>{    
            expect(getCookies).not.toMatchObject(objAdd[0]);
        });

    });
    

},10000);



