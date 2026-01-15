import {Given, When, Then} from '@cucumber/cucumber';
import {test, expect} from '@playwright/test';
import {chromium} from 'playwright';
import { PageObjectManager as POM} from '../../PageObject/PageObjectManager.js';


Given('I login to Ecommerce application using {string} and {string}',{timeout: 20000} ,async function (string, string2) {
    this.loginMail = "Thalaivar@shivaji.com"
    const loginPage = await this.pom.getLoginPage();
    await loginPage.OpenURL("https://rahulshettyacademy.com/client/#/auth/login");
    await loginPage.loginToApplication(this.loginMail, "Thalaivar@27");
    await this.page.waitForTimeout(3000); // wait for 5 seconds to load products
    });


When('I add product to the cart',{timeout: 20000}, async function () {
    this.dashboard = await this.pom.getDashboard();
    this.product = "ZARA COAT 3";
    await this.dashboard.AddProductToCart(this.product);
    await this.dashboard.NavigateToCart();
         });

When('I navigate to cart page and Verify the product in cart', {timeout: 20000}, async function () {
    this.cart = await this.pom.getCartPage();
    const visible = await this.cart.VerifyProductInCart(this.product);
    expect(visible).toBeTruthy();
    await this.cart.ProceedToCheckout();
    await this.cart.SelectCountry("Ind", " India");
    const MailValidation = await this.cart.ValidateMail(this.loginMail);
    expect(MailValidation).toBeTruthy();
         });


Then('I place the order and verify the order in Orders page', async function () {
    const orderId =  await this.cart.GetOrderId();
    const Orders = await this.pom.getOrdersPage();
    await Orders.ClickOrders();
    await Orders.ViewOrderById(orderId);
         });


Given('I login to Ecommerce2 application using {string} and {string}', async function (Username, Password) {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await this.page.locator("#username").fill(Username);
    await this.page.locator("[type='password']").fill(Password);
    await this.page.locator("#signInBtn").click();
         });


Then('I verify the error message', async function () {
    console.log(await this.page.locator("[style*='block']").textContent());
    expect(await this.page.locator("[style*='block']").textContent()).toContain("Incorrect");
         });