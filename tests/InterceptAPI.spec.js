import {test, expect, request} from '@playwright/test';
import { APIUtil } from './Utils/APIUtil.js';
// const { APIUtil } = require('./Utils.js/APIUtil.js');

const LoginPayload = {userEmail: "Thalaivar@shivaji.com", userPassword: "Thalaivar@27"};
const CreateOrderPayload = {orders: [{country: "India", productOrderedId: "68a961719320a140fe1ca57c"}]}
const FakeResponseBody = {data:[],message:"No Orders"}


let response;
test.beforeAll(async () => {
    
    const apiContext = await request.newContext();
    const apiUtil = new APIUtil(apiContext, LoginPayload);
    response = await apiUtil.createOrder(CreateOrderPayload)


});


test.afterEach( async () => {
    // Global teardown can be done here if needed
});

test("End to End Test", async function({browser}){

    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.addInitScript( token => {
        window.localStorage.setItem('token', token);
    }, response.token);
    await page.reload();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {
        const resp = await page.request.fetch(route.request());
        let body = JSON.stringify(FakeResponseBody);
        await route.fulfill({
            response: resp,
            body: body
        });
    });

    await page.locator("button[routerlink$='/dashboard/myorders']").click();
    // await page.pause();
    // await page.waitForLoadState('networkidle');
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    // await page.locator("tbody").waitFor();
    console.log(await page.locator('.mt-4').textContent());
    await page.locator('text=You have No Orders').isVisible();
})
