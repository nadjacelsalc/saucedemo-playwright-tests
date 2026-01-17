// @ts-check
import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('SauceDemo Checkout Tests 3', () => {   
    test.beforeEach(async ({ page }) => {
    await page.goto(`/`);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');        
    await page.click('[data-test="login-button"]'); 
    await expect(page).toHaveURL(/.*inventory.html/);       
     }); 

    test('TC-036: Verify total price calculation', async ({ page }) => {     
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');  
    await page.click('.shopping_cart_link');    
    await page.click('[data-test="checkout"]'); 
    await page.fill('[data-test="firstName"]', 'Test'); 
    await page.fill('[data-test="lastName"]', 'User');  
    await page.fill('[data-test="postalCode"]', '12345');   
    await page.click('[data-test="continue"]');    
    const itemTotal = await page.locator('.summary_subtotal_label').innerText();
    const tax = await page.locator('.summary_tax_label').innerText();
    const total = await page.locator('.summary_total_label').innerText();   
    const itemTotalValue = parseFloat(itemTotal.replace('Item total: $', ''));
    const taxValue = parseFloat(tax.replace('Tax: $', ''));
    const totalValue = parseFloat(total.replace('Total: $', ''));    
    expect(totalValue).toBeCloseTo(itemTotalValue + taxValue, 2);  
  }); 

   test('TC-037: Cancel from Checkout Overview', async ({ page }) => {         
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');      
    await page.click('.shopping_cart_link');    
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', 'Test'); 
    await page.fill('[data-test="lastName"]', 'User');      
    await page.fill('[data-test="postalCode"]', '12345');   
    await page.click('[data-test="continue"]');   
    await page.click('[data-test="cancel"]');    
    await expect(page).toHaveURL(/.*inventory.html/);  
  }     );

    test('TC-038: Finish Checkout Process', async ({ page }) => {   
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');  
    await page.click('.shopping_cart_link');    
    await page.click('[data-test="checkout"]');         
    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');  
    await page.fill('[data-test="postalCode"]', '12345');   
    await page.click('[data-test="continue"]');    
    await page.click('[data-test="finish"]');    
    await expect(page.locator('.title')).toHaveText('Checkout: Complete!');  
  });   

}); 