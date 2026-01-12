import {test, expect} from '@playwright/test';
import { PageObjectManager as POM} from '../../PageObject_TypeScript/PageObjectManager.ts';


test("End to End Test", async function({browser}){

    const context = await browser.newContext();
    let bha: string = "hello";
    const product = "ZARA COAT 3";
    const page = await context.newPage();
    const pom = new POM(page);
    const loginMail = "Thalaivar@shivaji.com"
    
    const loginPage = await pom.getLoginPage();

    await loginPage.OpenURL("https://rahulshettyacademy.com/client/#/auth/login");
    await loginPage.loginToApplication(loginMail, "Thalaivar@27");
    await page.waitForTimeout(2000); // wait for 5 seconds to load products

    const dashboard = await pom.getDashboard();
    await dashboard.AddProductToCart(product);
    await dashboard.NavigateToCart();

    const cart = await pom.getCartPage();
    const visible = await cart.VerifyProductInCart(product);
    expect(visible).toBeTruthy();

    await cart.ProceedToCheckout();
    await cart.SelectCountry("Ind", " India");
    
    const MailValidation = await cart.ValidateMail(loginMail);
    expect(MailValidation).toBeTruthy();

    
    const orderId: any =  await cart.GetOrderId();
    const Orders = await pom.getOrdersPage();
    await Orders.ClickOrders();
    await Orders.ViewOrderById(orderId);

})
