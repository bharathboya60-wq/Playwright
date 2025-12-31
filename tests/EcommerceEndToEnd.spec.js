import {test, expect} from '@playwright/test';


test("End to End Test", async function({browser}){
    const context = await browser.newContext();
    const product = "ZARA COAT 3";
    const page = await context.newPage();
    const loginMail = "Thalaivar@shivaji.com"
    const Products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator("#userEmail").fill(loginMail);
    await page.locator("#userPassword").fill("Thalaivar@27");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle'); // wait for all network requests to finish(but this flaky)
    const title = await page.locator(".card-body b").allTextContents();

    const count = await Products.count();
    for(let i=0; i<count; i++){
        if(await Products.nth(i).locator("b").textContent() === product){
            await Products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    const cart = page.locator("button[routerlink$='/dashboard/cart']");
    await cart.click();
    await page.locator("div li").first().waitFor(); // wait for first li to appear in cart page because it is dynamic and isVisible may be flaky
    const visible = await page.locator(`h3:has-text('${product}')`).isVisible(); // verifying product is visible in cart page.
    console.log("Visible:", visible);
    expect(visible).toBeTruthy();

    await page.locator("button:has-text(\"Checkout\")").click();
    await page.locator("[placeholder='Select Country']").pressSequentially("Ind", {delay:100}); // typing Ind with delay of 100ms between each key press
    const dropdown = await page.locator(".ta-results").waitFor(); // wait for the dropdown to appear
    const optionsCount = await page.locator(".ta-results button").count();
    for(let i=0; i<optionsCount; i++){
        const text = await page.locator(".ta-results button").nth(i).textContent();
        if(text === " India"){
            await page.locator(".ta-results button").nth(i).click();
            break;
        }
    }   
    
    
    // await page.locator(":text-is('India')").click(); // selecting India from the dropdown This is simple
    // console.log("Reached here");
    const DetailText = await page.locator(".user__name label").textContent();
    expect(DetailText).toEqual(loginMail);

    await page.locator(".action__submit").click();

    await expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();

    console.log("Order ID:", orderId);


    await page.locator("button[routerlink$='/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");
    const rowCount = await rows.count();

    for(let i=0; i<rowCount; i++){
        const rowOrderId = await rows.locator("th").nth(i).textContent();
        if(orderId.includes(rowOrderId)){
            await rows.locator("button:has-text('View')").nth(i).click();
            break;
        }
    }
    page.pause();
    const orderDetailsId = await page.locator(".col-text").textContent();
    page.pause();
    expect(orderId.includes(orderDetailsId)).toBeTruthy();
    console.log("Order Details ID:", orderDetailsId);

})
