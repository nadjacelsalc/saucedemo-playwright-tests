// @ts-check
import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('SauceDemo Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`/`);
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/.*inventory.html/);   
  });   

    test('TC-008: Verify Product List Loads', async ({ page }) => {
    await expect(page.locator('.title')).toHaveText('Products');
    const products = await page.locator('.inventory_item');
    await expect(products).toHaveCount(6);
  });

    test('TC-009: Sort Products A-Z', async ({ page }) => {
    await page.selectOption('.product_sort_container', 'az');
    const firstProduct = page.locator('.inventory_item_name').first();
    await expect(firstProduct).toHaveText('Sauce Labs Backpack');
  });           
    test('TC-010: Add Product to Cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });

    test('TC-011: Add Product to Cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText('1');
  });
    test('TC-012: Remove Product from Cart', async ({ page }) => {
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveCount(0);
  });

    //expected failures - bugs

    test('TC-013: Cannot add product with broken image (problem_user)',{ tag: '@known-bug' }, async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await page.fill('[data-test="username"]', 'problem_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
     const firstImage = page.locator('.inventory_item_img img').first();
    await expect(firstImage).toHaveAttribute('src', /sl-404\.jpg/);
  });   

  test('TC-014: Sorting Z-A does not reorder correctly for problem_user',{ tag: '@known-bug' },  async ({ page }) => {
    await page.click('#react-burger-menu-btn');
    await page.click('#logout_sidebar_link');
    await page.fill('[data-test="username"]', 'problem_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.selectOption('.product_sort_container', 'za');
    const firstProduct = page.locator('.inventory_item_name').first();
    await expect(firstProduct).toHaveText('Test.allTheThings() T-Shirt (Red)');
  })

  test('TC-015: Products load slowly for performance_glitch_user', { tag: '@known-bug' }, async ({ page }) => {
  const start = Date.now();
  await page.fill('[data-test="username"]', 'performance_glitch_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await page.waitForSelector('.inventory_item', { timeout: 10000 });
  const duration = Date.now() - start;
  expect(duration).toBeGreaterThan(3000);
});
 

});