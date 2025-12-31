import {test, expect} from "@playwright/test";


test("Special Selectors Test", async function({browser}){
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    // await page.pause();

    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await expect(page.getByLabel("Check me out if you Love IceCreams!")).toBeChecked();

    await page.getByLabel("Gender").selectOption("Female");


    await page.getByLabel("Employed").check();
    await expect(page.getByLabel("Employed")).toBeChecked();

    await page.getByPlaceholder("Password").fill("12345");

    await page.getByRole("button", {name: "Submit"}).click();

    await page.getByRole("link", {name: "Shop"}).click();

    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button").click();




})