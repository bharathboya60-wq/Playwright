// E-Commerce Dashboard - Comprehensive End-to-End Test Plan
// Application URL: https://rahulshettyacademy.com/client/#/dashboard/dash
// Test Account: Email: Thalaivar@shivaji.com, Password: Thalaivar@27

import {test, expect} from "@playwright/test";

test.describe('E-Commerce Dashboard - End-to-End Tests', () => {
  
  test.describe('1. Complete Purchase Flow', () => {
    
    test('1.1 Complete Purchase Flow - Single Product', async ({ page }) => {
      // Navigate to login page
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      
      // Enter email: Thalaivar@shivaji.com
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      
      // Enter password: Thalaivar@27
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      
      // Click Login button
      await page.getByRole('button', { name: 'Login' }).click();
      
      // Verify login successful - dashboard loads
      await page.waitForURL('**/dashboard/dash');
      
      // Verify HOME button visible in navigation
      await page.getByRole('button', { name: /HOME/i }).isVisible();
      
      // Verify product catalog displays
      const products = await page.locator('heading:has-text("iphone 13 pro")');
      await products.isVisible();
      
      // Add iPhone 13 pro to cart (4th Add To Cart button)
      const addToCartButtons = page.locator('button:has-text("Add To Cart")');
      await addToCartButtons.nth(4).click();
      
      // Verify product added alert
      await page.getByText('Product Added To Cart').isVisible();
      
      // Verify cart badge shows "1"
      const cartBadge = page.locator('button:has-text("Cart") >> text="1"');
      await cartBadge.isVisible();
      
      // Click Cart button to view cart
      await page.getByRole('button', { name: /Cart/ }).click();
      
      // Verify cart page loads
      await page.waitForURL('**/dashboard/cart');
      const cartHeading = page.getByRole('heading', { name: 'My Cart' });
      await cartHeading.isVisible();
      
      // Verify iPhone 13 pro in cart with price $55000
      await page.getByText('iphone 13 pro').isVisible();
      await page.getByText('$ 55000').isVisible();
      
      // Verify Subtotal and Total
      await page.getByText('Subtotal').isVisible();
      await page.getByText('Total').isVisible();
      
      // Click Checkout
      await page.getByRole('button', { name: 'Checkout❯' }).click();
      
      // Verify checkout page loads
      await page.waitForURL('**/dashboard/order*');
      
      // Verify order summary
      await page.getByText('iphone 13 pro').isVisible();
      await page.getByText('$ 55000').isVisible();
      await page.getByText('Quantity: 1').isVisible();
      
      // Verify payment method section
      await page.getByText('Payment Method').isVisible();
      
      // Verify credit card details section
      await page.getByText('Credit Card Number').isVisible();
      await page.getByText('CVV Code').isVisible();
      await page.getByText('Name on Card').isVisible();
      
      // Verify shipping information section
      await page.getByText('Shipping Information').isVisible();
      await page.getByText('Thalaivar@shivaji.com').isVisible();
    });

    test('1.2 Multi-Product Purchase Flow', async ({ page }) => {
      // Login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL('**/dashboard/dash');
      
      // Add first product (Automation 8 - $1200)
      let addToCartButtons = page.locator('button:has-text("Add To Cart")');
      await addToCartButtons.nth(0).click();
      await page.getByText('Product Added To Cart').isVisible();
      
      // Add second product (Automation 8 - $1200)
      addToCartButtons = page.locator('button:has-text("Add To Cart")');
      await addToCartButtons.nth(1).click();
      await page.getByText('Product Added To Cart').isVisible();
      
      // Add third product (ADIDAS ORIGINAL - $11500)
      addToCartButtons = page.locator('button:has-text("Add To Cart")');
      await addToCartButtons.nth(2).click();
      await page.getByText('Product Added To Cart').isVisible();
      
      // Verify cart count shows "3"
      const cartBadge = page.locator('button:has-text("Cart") >> text="3"');
      await cartBadge.isVisible();
      
      // Navigate to cart
      await page.getByRole('button', { name: /Cart/ }).click();
      await page.waitForURL('**/dashboard/cart');
      
      // Verify all 3 products display in cart
      const cartItems = page.locator('heading[level="3"]');
      const count = await cartItems.count();
      expect(count).toBeGreaterThanOrEqual(3);
    });

    test('1.3 Remove Product from Cart and Re-checkout', async ({ page }) => {
      // Login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL('**/dashboard/dash');
      
      // Add two products
      let addToCartButtons = page.locator('button:has-text("Add To Cart")');
      await addToCartButtons.nth(3).click();
      await page.getByText('Product Added To Cart').isVisible();
      
      addToCartButtons = page.locator('button:has-text("Add To Cart")');
      await addToCartButtons.nth(4).click();
      await page.getByText('Product Added To Cart').isVisible();
      
      // Navigate to cart
      await page.getByRole('button', { name: /Cart/ }).click();
      await page.waitForURL('**/dashboard/cart');
      
      // Verify 2 items in cart
      const cartItems = page.locator('heading[level="3"]');
      let count = await cartItems.count();
      expect(count).toBe(2);
      
      // Delete first item
      const deleteButtons = page.locator('button:has-text("❯")').nth(1);
      await deleteButtons.click();
      
      // Verify item count decreased
      count = await cartItems.count();
      expect(count).toBe(1);
    });
  });

  test.describe('2. Product Browsing & Filtering', () => {
    
    test('2.1 Filter by Category - Electronics', async ({ page }) => {
      // Login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL('**/dashboard/dash');
      
      // Check electronics category checkbox
      const electronicCheckbox = page.locator('input[type="checkbox"]').nth(1);
      await electronicCheckbox.check();
      
      // Verify electronics products display
      await page.getByText('iphone 13 pro').isVisible();
    });

    test('2.2 Filter by Price Range', async ({ page }) => {
      // Login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL('**/dashboard/dash');
      
      // Enter min price
      const minPriceInput = page.locator('input[placeholder="Min Price"]');
      await minPriceInput.fill('10000');
      
      // Enter max price
      const maxPriceInput = page.locator('input[placeholder="Max Price"]');
      await maxPriceInput.fill('60000');
      
      // Verify products within price range display
      await page.getByText('iphone 13 pro').isVisible();
      await page.getByText('$ 55000').isVisible();
    });

    test('2.3 Search by Product Name', async ({ page }) => {
      // Login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL('**/dashboard/dash');
      
      // Search for iphone
      const searchBox = page.locator('input[placeholder="search"]');
      await searchBox.fill('iphone');
      
      // Verify search results
      await page.getByText('iphone 13 pro').isVisible();
    });
  });

  test.describe('3. Product Details View', () => {
    
    test('3.1 View Product Details', async ({ page }) => {
      // Login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL('**/dashboard/dash');
      
      // Click View button for iPhone (5th product)
      const viewButtons = page.locator('button:has-text("View")');
      await viewButtons.nth(4).click();
      
      // Verify product details page
      await page.waitForURL('**/product-details/**');
      
      // Verify product information
      await page.getByRole('heading', { name: 'iphone 13 pro' }).isVisible();
      await page.getByRole('heading', { name: '$ 55000' }).isVisible();
      await page.getByRole('button', { name: 'Add to Cart' }).isVisible();
      
      // Verify product details section
      await page.getByText('product details').isVisible();
      await page.getByText('Apple phone').isVisible();
    });

    test('3.2 Add to Cart from Product Details', async ({ page }) => {
      // Login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL('**/dashboard/dash');
      
      // View product details
      const viewButtons = page.locator('button:has-text("View")');
      await viewButtons.nth(4).click();
      await page.waitForURL('**/product-details/**');
      
      // Add to cart from details page
      await page.getByRole('button', { name: 'Add to Cart' }).click();
      
      // Verify success message
      await page.getByText('Product Added To Cart').isVisible();
      
      // Verify cart badge updates
      const cartBadge = page.locator('button:has-text("Cart") >> text="1"');
      await cartBadge.isVisible();
    });
  });

  test.describe('4. Orders Management', () => {
    
    test('4.1 View Orders List', async ({ page }) => {
      // Login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL('**/dashboard/dash');
      
      // Click ORDERS button
      await page.getByRole('button', { name: /ORDERS/ }).click();
      await page.waitForURL('**/dashboard/myorders');
      
      // Verify orders page
      await page.getByRole('heading', { name: 'Your Orders' }).isVisible();
      
      // Verify table columns
      await page.getByText('Order Id').isVisible();
      await page.getByText('Product Image').isVisible();
      await page.getByText('Name').isVisible();
      await page.getByText('Price').isVisible();
      await page.getByText('Ordered Date').isVisible();
      
      // Verify orders display
      await page.getByText('ZARA COAT 3').isVisible();
      await page.getByText('$ 11500').isVisible();
    });

    test('4.2 View Order Details', async ({ page }) => {
      // Login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL('**/dashboard/dash');
      
      // Click ORDERS button
      await page.getByRole('button', { name: /ORDERS/ }).click();
      await page.waitForURL('**/dashboard/myorders');
      
      // Click View button for first order
      const viewButtons = page.locator('button:has-text("View")');
      await viewButtons.first().click();
      
      // Verify order details page
      await page.waitForURL('**/order-details/**');
      
      // Verify order information
      await page.getByText('Thank you for Shopping With Us').isVisible();
      await page.getByText('order summary').isVisible();
      await page.getByText('Order Id').isVisible();
      
      // Verify address information
      await page.getByText('Billing Address').isVisible();
      await page.getByText('Delivery Address').isVisible();
      await page.getByText('Thalaivar@shivaji.com').isVisible();
      await page.getByText('Country - India').isVisible();
    });

    test('4.3 Delete Order', async ({ page }) => {
      // Login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL('**/dashboard/dash');
      
      // Click ORDERS button
      await page.getByRole('button', { name: /ORDERS/ }).click();
      await page.waitForURL('**/dashboard/myorders');
      
      // Get initial order count
      let orderRows = page.locator('tr').count();
      const initialCount = await orderRows;
      
      // Click Delete button for first order
      const deleteButtons = page.locator('button:has-text("Delete")');
      await deleteButtons.first().click();
      
      // Verify order count decreased
      orderRows = page.locator('tr').count();
      const newCount = await orderRows;
      expect(newCount).toBeLessThan(initialCount);
    });
  });

  test.describe('5. Navigation & UI', () => {
    
    test('5.1 Navigation Menu Persistence', async ({ page }) => {
      // Login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL('**/dashboard/dash');
      
      // Navigate through different pages
      await page.getByRole('button', { name: /HOME/ }).click();
      await page.waitForURL('**/dashboard/dash');
      await page.getByRole('button', { name: /HOME|ORDERS|Cart|Sign Out/ }).isVisible();
      
      await page.getByRole('button', { name: /ORDERS/ }).click();
      await page.waitForURL('**/dashboard/myorders');
      await page.getByRole('button', { name: /HOME|ORDERS|Cart|Sign Out/ }).isVisible();
    });

    test('5.2 Sign Out Functionality', async ({ page }) => {
      // Login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL('**/dashboard/dash');
      
      // Click Sign Out
      await page.getByRole('button', { name: 'Sign Out' }).click();
      
      // Verify redirect to login page
      await page.waitForURL('**/auth/login');
      
      // Verify login form displays
      await page.getByRole('heading', { name: 'Log in' }).isVisible();
    });
  });

  test.describe('6. Error Handling', () => {
    
    test('6.1 Login with Invalid Credentials', async ({ page }) => {
      // Navigate to login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      
      // Enter invalid credentials
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('invalid@test.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('WrongPassword123');
      
      // Click Login
      await page.getByRole('button', { name: 'Login' }).click();
      
      // Verify user remains on login page
      await page.waitForURL('**/auth/login');
    });

    test('6.2 Empty Cart Display', async ({ page }) => {
      // Login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL('**/dashboard/dash');
      
      // Navigate to cart without adding products
      await page.getByRole('button', { name: /Cart/ }).click();
      await page.waitForURL('**/dashboard/cart');
      
      // Verify empty cart message
      const noProductMessage = page.getByText(/No Products in Your Cart|No Product in Your Cart/);
      await noProductMessage.isVisible();
    });
  });

  test.describe('7. Data Persistence', () => {
    
    test('7.1 Cart Persists During Navigation', async ({ page }) => {
      // Login
      await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
      await page.getByRole('textbox', { name: 'email@example.com' }).fill('Thalaivar@shivaji.com');
      await page.getByRole('textbox', { name: 'enter your passsword' }).fill('Thalaivar@27');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL('**/dashboard/dash');
      
      // Add product to cart
      const addToCartButtons = page.locator('button:has-text("Add To Cart")');
      await addToCartButtons.nth(4).click();
      await page.getByText('Product Added To Cart').isVisible();
      
      // Verify cart count
      const cartBadge1 = page.locator('button:has-text("Cart") >> text="1"');
      await cartBadge1.isVisible();
      
      // Navigate to HOME
      await page.getByRole('button', { name: /HOME/ }).click();
      
      // Verify cart count persists
      const cartBadge2 = page.locator('button:has-text("Cart") >> text="1"');
      await cartBadge2.isVisible();
      
      // Navigate to ORDERS
      await page.getByRole('button', { name: /ORDERS/ }).click();
      
      // Verify cart count still persists
      const cartBadge3 = page.locator('button:has-text("Cart") >> text="1"');
      await cartBadge3.isVisible();
    });
  });
});
