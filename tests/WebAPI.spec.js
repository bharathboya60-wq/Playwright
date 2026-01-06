import {test, expect, request} from '@playwright/test';
import { APIUtil } from '../Utils/APIUtil.js';
// const { APIUtil } = require('./Utils.js/APIUtil.js');

const LoginPayload = {userEmail: "Thalaivar@shivaji.com", userPassword: "Thalaivar@27"};
const CreateOrderPayload = {orders: [{country: "India", productOrderedId: "68a961719320a140fe1ca57c"}]}


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



    await page.locator("button[routerlink$='/dashboard/myorders']").click();

    await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");
    const rowCount = await rows.count();

    for(let i=0; i<rowCount; i++){
        const rowOrderId = await rows.locator("th").nth(i).textContent();
        if(response.OrderId.includes(rowOrderId)){
            await rows.locator("button:has-text('View')").nth(i).click();
            break;
        }
    }
    page.pause();
    const orderDetailsId = await page.locator(".col-text").textContent();
    page.pause();
    expect(response.OrderId.includes(orderDetailsId)).toBeTruthy();
    console.log("Order Details ID:", orderDetailsId);

})
