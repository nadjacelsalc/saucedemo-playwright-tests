// @ts-check
import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('SauceDemo Checkout Tests', () => {

    test.beforeEach(async ({ page }) => {
    await page.goto(`/`);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/.*inventory.html/);       
     });

    test('TC-026: Verify Checkout Step One Loads', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await expect(page.locator('.title')).toHaveText('Checkout: Your Information');
  }); 

    test('TC-027: Enter valid checkout information and continue', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
  });   

    test('TC-028: Cancel checkout and return to cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.click('[data-test="cancel"]');
    await expect(page).toHaveURL(/.*cart.html/);
  }); 
    
    test('TC-029: Submit empty checkout form', async ({ page }) => {    
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.click('[data-test="continue"]');
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText('Error: First Name is required');
  });   

    test('TC-030: Missing postal code in checkout form', async ({ page }) => {          
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');  
    await page.click('.shopping_cart_link');
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.click('[data-test="continue"]');
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText('Error: Postal Code is required');
  });       

});