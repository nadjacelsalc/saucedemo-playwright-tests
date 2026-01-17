// @ts-check
import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('SauceDemo Cart Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`/`);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/.*inventory.html/);   
  });   

    test('TC-016: Verify Cart Loads', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('.shopping_cart_link');
});

    test('TC-017: Remove from cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="remove-sauce-labs-bike-light"]');
    const cartItem = page.locator('.cart_item', { hasText: 'Sauce Labs Bike Light' });
    await expect(cartItem).toHaveCount(0);
  });

    test('TC-018: Add product and verify it appears in cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(1);
    const backpackItem = page.locator('.cart_item', { hasText: 'Sauce Labs Backpack' });
    await expect(backpackItem).toHaveCount(1);
  });

    test('TC-019: Verify quantity for items in cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    const quantity = page.locator('.cart_quantity');
    await expect(quantity).toHaveText('1');
  });       

    test('TC-020: Verify price of product in cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    const price = page.locator('.inventory_item_price', { hasText: '$29.99' });
    await expect(price).toHaveCount(1);     
    }); 

    test('TC-021: Cart retains items after logout and login again', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.click('.shopping_cart_link');
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(1);   });

    test('TC-022: Problem user can add to cart despite broken image', async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await page.fill('[data-test="username"]', 'problem_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');  });

    test('TC-023: Removing one of multiple items from cart', async ({ page }) => {  
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');  
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    const bikeLightItem = page.locator('.cart_item', { hasText: 'Sauce Labs Bike Light' });
    await expect(bikeLightItem).toHaveCount(1);
    const backpackItem = page.locator('.cart_item', { hasText: 'Sauce Labs Backpack' });
    await expect(backpackItem).toHaveCount(0);  }); 

    test('TC-024: Cart shows correct total for multiple items', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('.shopping_cart_link');

    // Proceed to checkout
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');

    const backpackPrice = 29.99;
    const bikeLightPrice = 9.99;
    const expectedTotal = (backpackPrice + bikeLightPrice).toFixed(2);

    const subtotalLocator = page.locator('.summary_subtotal_label');
    await expect(subtotalLocator).toHaveText(`Item total: $${expectedTotal}`);
    });

    test('TC-025: Cart is empty after removing all items', async ({ page }) => {  
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');  
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await page.click('[data-test="remove-sauce-labs-bike-light"]');
    const cartItems = page.locator('.cart_item');
    await expect(cartItems).toHaveCount(0); 

    });

    

});               