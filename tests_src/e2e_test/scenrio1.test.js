
const timeout = 5000;
const dialogText = ['This is a javascript test','A new message on click button action'];
let dialogTextNum = 0;
let DialogMessageText = '';
describe('inject javascript that display an alert message on a click button action with two different message each time',() => {

    beforeAll(async () =>{
        try{
            let myWebUrl = 'https://www.wework.com/he-IL/info/the-future-of-work-is-flexible';
            await page.goto(myWebUrl,{waitUntil:"domcontentloaded"});
        }catch{
            throw new Error('Page not loaded')
        }
    
        try{
            await page.on('dialog',async dialog => {
                DialogMessageText = dialog.message();
                await dialog.dismiss();
            });
        }catch{
            throw new Error('Dialog Error')
        }

    });

    describe('Compare alert message after changing text by clicking on action button (injection)', () => {
        beforeEach(async () =>{
            try{
                await page.evaluate((text) => {
                    let btn = document.getElementsByClassName('ray-button');
                    btn[0].addEventListener("click",addDialog,{ once: true});
                    function addDialog(){
                    alert(text); 
                    };
                    return btn[0].innerText;
                },dialogText[dialogTextNum])

            }catch(e){
                throw new Error("Evaluate Error" + e);
                
            }
            try{
                await page.click('.ray-button');
                dialogTextNum++;
            }catch(e){
                throw new Error("Button was not clicked" + e);
            }
            
        });
        
        it('Compare alert message', async () => {
            expect(DialogMessageText).toBe(dialogText[0]);
        }, timeout);

        
        it('Compare alert message', async () => {
            expect(DialogMessageText).toBe(dialogText[1]);
        }, timeout);
    }); 

});

