import { expect, test } from '@playwright/test';

test("Assertions - More Validations", async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    // await page.pause();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await page.locator("#displayed-text").isVisible();

    await expect(page.locator("#displayed-text")).toBeVisible();

    await page.locator('#hide-textbox').click();

    await expect(page.locator("#displayed-text")).toBeHidden();
    await expect(page.locator("#displayed-text")).not.toBeVisible();

    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.dismiss();
    });

    await page.locator("#confirmbtn").click();

    await page.locator('#alertbtn').click();
    
    await page.pause(); 

    await page.locator('#mousehover').hover();

    const framePage = page.frameLocator("#courses-iframe")

    await framePage.locator(".lucide.lucide-crown").click();




});
