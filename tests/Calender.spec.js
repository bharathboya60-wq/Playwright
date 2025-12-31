import {test, expect} from "@playwright/test";


test("Calender Test", async function({browser}){

    const Month = "06";
    const Year = "2027";
    const Date = "15";
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/");
    // await page.pause();

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        await page.getByRole("link", {name: "Top Deals"}).click()
    ])

    await newPage.waitForLoadState();

    await newPage.getByText("Discount price").isVisible();

    await newPage.locator(".react-date-picker__inputGroup").click();

    await newPage.locator(".react-calendar__navigation__label").click();

    await newPage.locator(".react-calendar__navigation__label").click();

    await newPage.getByText(Year).click();

    await newPage.locator(".react-calendar__year-view__months__month").nth(Number(Month)-1).click();


    await newPage.getByRole("button", {name: Date}).click();

    const SelectedDate = await newPage.locator('[name="date"]').getAttribute("value")

    console.log(SelectedDate);
    console.log(typeof(SelectedDate));

    const arr = SelectedDate.split("-");
    expect(arr[0]).toEqual(Year);
    expect(arr[1]).toEqual(Month);
    expect(arr[2]).toEqual(Date);


    const inputs = await newPage.locator(".react-date-picker__inputGroup .react-date-picker__inputGroup__input");

    console.log(inputs);
    console.log("Hello team");

    const count = await inputs.count();

    const expectedValues = [Month, Date, Year];

    for(let i=0; i<count; i++){
        expect(await inputs.nth(i).inputValue()).toEqual(expectedValues[i]);
    }
});