const { test, expect } = require('@playwright/test');


// test('First Test', function(){
//     console.log('This is the first test');
// })

test('Second Test', async function({ page }){
    
    
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator("#userEmail").fill("Thalaivar@shivaji.com");
    await page.locator("#userPassword").fill("Thalaivar@27");
    await page.locator("#login").click();
    // await page.waitForTimeout(5000);
    await page.waitForLoadState('networkidle'); // wait for all network requests to finish(but this flaky)
    await page.locator(".card-body b").first().waitFor();  // explicit wait an alternative to above line
    const title = await page.locator(".card-body b").allTextContents();
    console.log("Titles on page: " + title);
    // await page.waitForLoadState('networkidle');





})