import { expect, test } from '@playwright/test';

test("ScreenShots", async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator('#displayed-text').screenshot({path: 'tests/screenshots/displayed-text.png'}); //screenshot of specific element
    await page.locator("#displayed-text").isVisible();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator('#hide-textbox').click();
    await page.locator('#displayed-text').screenshot({path: 'tests/screenshots/AfterClickdisplayed-text.png'});
    await page.screenshot({path: 'tests/screenshots/example.png', fullPage:true});



});

test.only("Visual Testing", async({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.flightaware.com/");
    // await page.pause();
    expect(await page.screenshot()).toMatchSnapshot('flightaware.png');
});
