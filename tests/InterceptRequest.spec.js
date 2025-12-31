import { url } from "inspector";
import { test, expect } from "@playwright/test";
import { APIUtil } from './Utils/APIUtil.js';

test("Security Test", async function({page}){
    const loginMail = "Thalaivar@shivaji.com"
    const Products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator("#userEmail").fill(loginMail);
    await page.locator("#userPassword").fill("Thalaivar@27");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink$='/dashboard/myorders']").click();
    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",async route=>{
        route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/64bfbf5f821d2f0e4c8b4567"})
}) // Redirecting to another API endpoint
    
    page.locator('button:has-text("View")').first().click();
    // await page.pause();

    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

    });
