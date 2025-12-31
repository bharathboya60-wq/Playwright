const { test, expect } = require('@playwright/test');


// test('First Test', function(){
//     console.log('This is the first test');
// })

test('Second Test', async function({ browser }){
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await page.locator("#username").fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    expect(await page.locator("[style*='block']").textContent()).toContain("Incorrect");

    await page.locator("#username").fill("");
    await page.locator("#username").fill("rahulshettyacademy");
    await page.locator("#signInBtn").click();
    console.log(await page.locator(".card-body a").nth(1).textContent());
    // console.log(await page.locator(".card-body a").first().textContent());

    const TitleCards = await page.locator(".card-body a");
    const count = await TitleCards.count();
    console.log("Count: " + count);
    console.log(await TitleCards.allTextContents());





})

test("UI Controls", async function({ browser }){
    const context = await browser.newContext();
    const page = await context.newPage();

    const blinkingText = page.locator('[href*="documents"]');
    const Dropdown = page.locator("select.form-control");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    await Dropdown.selectOption("teach");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    // await page.pause();
    await expect(await page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    // await page.pause();
    await page.locator("#terms").uncheck();
    await expect(page.locator("#terms")).not.toBeChecked();

    await expect(blinkingText).toHaveAttribute("class", "blinkingText");
    
});


test("Handling Child Tabs", async function({ browser }){
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const blinkingText = page.locator('[href*="documents"]');

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkingText.click()
    ])

    console.log(await newPage.title());
    const text = await newPage.locator(".red").textContent(); // Please read the text and extract the domain name
    const arrayText = text.split("@");
    const arrayText1 = arrayText[1].split(" ");
    await page.locator("#username").fill(arrayText1[0]+"Filled");

    console.log(await page.locator("#username").inputValue()); // Verify if the value is filled correctly
    // await page.pause();

    
});