// Run the below steps using the playwright and generate the automation test script in the tests folder with the name Test_MCPLogin.spec.js

// Open the URl https://rahulshettyacademy.com/client/#/auth/login
// login with the username "Thalaivar@shivaji.com" and password "Thalaivar@27"
// Add the Iphone 13 pro to the cart
// Navigate to the cart page

import {test, expect} from '@playwright/test';
import {LoginPage} from '../PageObject/LoginPage';
import {Dashboard} from '../PageObject/Dashboard';
import {Cart} from '../PageObject/Cart';

test('MCP Login and Add iPhone 13 Pro to Cart', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    
    // Initialize Page Objects
    const loginPage = new LoginPage(page);
    const dashboard = new Dashboard(page);
    const cart = new Cart(page);
    
    // Test credentials and product details
    const url = "https://rahulshettyacademy.com/client/#/auth/login";
    const username = "Thalaivar@shivaji.com";
    const password = "Thalaivar@27";
    const product = "IPHONE 13 Pro";
    
    // Step 1: Open the login URL
    await loginPage.OpenURL(url);
    await page.waitForLoadState('domcontentloaded');
    
    // Step 2: Login with credentials
    await loginPage.loginToApplication(username, password);
    await page.waitForLoadState('networkidle');
    
    // Wait for dashboard to load
    await page.locator(".card-body").first().waitFor();
    
    // Step 3: Add iPhone 13 Pro to cart
    await dashboard.AddProductToCart(product);
    
    // Step 4: Navigate to cart page
    await dashboard.NavigateToCart();
    
    // Verify product is in cart
    const isProductInCart = await cart.VerifyProductInCart(product);
    expect(isProductInCart).toBeTruthy();
    
    console.log("Test completed successfully!");
    console.log(`✓ Opened URL: ${url}`);
    console.log(`✓ Logged in with username: ${username}`);
    console.log(`✓ Added ${product} to cart`);
    console.log(`✓ Navigated to cart page`);
    console.log(`✓ Verified ${product} is in cart`);
    
    await context.close();
});
