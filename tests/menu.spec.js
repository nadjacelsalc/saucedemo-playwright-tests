// @ts-check
import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('SauceDemo Menu Tests', () => {    

    test.beforeEach(async ({ page }) => {
    await page.goto(`/`);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');      
    await page.click('[data-test="login-button"]'); 
    await expect(page).toHaveURL(/.*inventory.html/);       
     }); 

    test('TC-038: Open and close the menu', async ({ page }) => {         
    await page.click('#react-burger-menu-btn');    
    const menu = page.locator('.bm-menu');    
    await expect(menu).toBeVisible();    
    await page.click('#react-burger-cross-btn');    
    await expect(menu).toBeHidden();  
  }); 

    test('TC-039: Navigate to About page via menu', async ({ page }) => {         
    await page.click('#react-burger-menu-btn');    
    await page.click('#about_sidebar_link');    
    await expect(page).toHaveURL('https://saucelabs.com/');  
  });

    test('TC-040: Logout via menu', async ({ page }) => {   
    await page.click('#react-burger-menu-btn');    
    await page.click('#logout_sidebar_link');    
    await expect(page).toHaveURL('https://www.saucedemo.com/');  
  });

    test('TC-041: Reset App State via menu', async ({ page }) => {         
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');  
    await page.click('.shopping_cart_link');    
    await expect(page.locator('.cart_item')).toHaveCount(1);    
    await page.click('#react-burger-menu-btn');    
    await page.click('#reset_sidebar_link');    
    await page.click('.shopping_cart_link');    
    await expect(page.locator('.cart_item')).toHaveCount(0);  
  } );   

   test('TC-042: Menu items visibility', async ({ page }) => {         
    await page.click('#react-burger-menu-btn');
    const inventoryLink = page.locator('#inventory_sidebar_link');
    await expect(inventoryLink).toBeVisible({ timeout: 2000 });
    const aboutLink = page.locator('#about_sidebar_link');
    await expect(aboutLink).toBeVisible({ timeout: 2000 });
    const logoutLink = page.locator('#logout_sidebar_link');
    await expect(logoutLink).toBeVisible({ timeout: 2000 });
    const resetLink = page.locator('#reset_sidebar_link');
    await expect(resetLink).toBeVisible({ timeout: 2000 }); 
  });      

});