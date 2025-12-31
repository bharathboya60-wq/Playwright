import {test, expect} from "@playwright/test";


test("LinkedIn Connect Test", async function({browser}){
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://www.linkedin.com/login");
    await page.locator("#username").fill("bharathboya60@gmail.com");
    await page.locator("#password").fill("Bharath@27");
    await page.locator("button[type='submit']").click();

    await page.waitForTimeout(5000);
    // await page.waitForLoadState('networkidle');

    await page.locator('[placeholder= "Search"]').pressSequentially("Talent acquisition group", {delay:50});
    await page.locator('[placeholder= "Search"]').press('Enter');
    await page.waitForTimeout(10000);
    // await page.waitForLoadState('networkidle');
    // await page.pause();

    // await page.getByRole('button', { name: 'People' }).click();
    await page.locator('button:has-text("People")').click();

    // await page.locator("//button[@aria-pressed='false'][normalize-space()='People']").click();
    // await page.locator('.search-reusables__primary-filter button:has-text("People")').click();

    await page.waitForTimeout(8000);
    // await page.get_by_text("Locations").click();
    // await page.locator('[placeholder="Add a location"]').pressSequentially("Hyderabad", {delay:50});
    const profiles = await page.locator('[role = "list"]');
    const profileCount = await profiles.locator('[data-view-name="people-search-result"]').count();
    console.log("Profile Count: " + profileCount);

    console.log("Hello World");

})