import {Given, When, Then} from '@cucumber/cucumber';
import {test, expect} from '@playwright/test';
import {chromium} from 'playwright';
import { PageObjectManager as POM} from '../../PageObject/PageObjectManager.js';


Given('I login to Ecommerce application using {string} and {string}', async function (string, string2) {
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page = await context.newPage();
    const pom = new POM(page);
    const loginMail = "Thalaivar@shivaji.com"
    const loginPage = await pom.getLoginPage();
    await loginPage.OpenURL("https://rahulshettyacademy.com/client/#/auth/login");
    await loginPage.loginToApplication(loginMail, "Thalaivar@27");
    await page.waitForTimeout(2000); // wait for 5 seconds to load products
    });


When('I add product to the cart',async function () {
    const dashboard = await pom.getDashboard();
    await dashboard.AddProductToCart(product);
    await dashboard.NavigateToCart();
         });

When('I navigate to cart page and Verify the product in cart', async function () {
           const cart = await pom.getCartPage();
    const visible = await cart.VerifyProductInCart(product);
    expect(visible).toBeTruthy();

    await cart.ProceedToCheckout();
    await cart.SelectCountry("Ind", " India");
    
    const MailValidation = await cart.ValidateMail(loginMail);
    expect(MailValidation).toBeTruthy();
         });


Then('I place the order and verify the order in Orders page', async function () {
    const orderId =  await cart.GetOrderId();
    const Orders = await pom.getOrdersPage();
    await Orders.ClickOrders();
    await Orders.ViewOrderById(orderId);
         });
