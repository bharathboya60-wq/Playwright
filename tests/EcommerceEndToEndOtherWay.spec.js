import {test, expect} from '@playwright/test';


test("End to End Test", async function({browser}){
    const context = await browser.newContext();
    const product = "ZARA COAT 3";
    const page = await context.newPage();
    const loginMail = "Thalaivar@shivaji.com"
    const Products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByPlaceholder("email@example.com").fill(loginMail);
    await page.getByPlaceholder("enter your passsword").fill("Thalaivar@27");
    await page.getByRole("button", {name: "Login"}).click();
    await page.waitForLoadState('networkidle'); // wait for all network requests to finish(but this flaky)
    await page.locator(".card-body b").first().waitFor();  // explicit wait an alternative to above line

    await page.locator(".card-body").filter({hasText: product}).getByText("Add To Cart").click();

    await page.getByRole("listitem").getByRole("button", {name: " Cart"}).click();
    await page.locator("div li").first().waitFor();

    const visible = await page.locator(`h3:has-text('${product}')`).isVisible(); // verifying product is visible in cart page.
    
    await page.getByRole("button", {name: " Checkout "}).click();

    await page.getByPlaceholder("Select Country").pressSequentially("Ind", {delay:100}); // typing Ind with delay of 100ms between each key press

    const dropdown = await page.locator(".ta-results").waitFor(); // wait for the dropdown to appear
    
    await page.getByText(" India").nth(1).click();

    await page.pause();

    const DetailText = await page.locator(".user__name label").textContent();
    expect(DetailText).toEqual(loginMail);

    // await page.getByRole("link", {name: "Place Order "}).click(); 

    await page.getByText("Place Order").click();

    // await page.locator(".action__submit").click();

    await expect(await page.getByText(" Thankyou for the order. ")).toBeVisible();

    // await expect(await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

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
