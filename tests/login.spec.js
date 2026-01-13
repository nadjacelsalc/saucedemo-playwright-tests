// @ts-check
import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('SauceDemo Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`/`);
  });

    test('TC-001: Successful Login', async ({ page }) => {
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await expect(page).toHaveURL(/.*inventory.html/);       
  });

    test('TC-002: Login with Invalid Credentials', async ({ page }) => {
    await page.fill('[data-test="username"]', 'invalid_user');
    await page.fill('[data-test="password"]', 'invalid_password');
    await page.click('[data-test="login-button"]');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });

    test('TC-003: Login with Locked-Out User', async ({ page }) => {
    await page.fill('[data-test="username"]', 'locked_out_user');
    await page.fill('[data-test="password"]', 'secret_sauce');          
    await page.click('[data-test="login-button"]');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  } );

    test('TC-004: Login with Empty Fields', async ({ page }) => {
    await page.click('[data-test="login-button"]');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
  });           

    test('TC-005: Locked out user cannot login', async ({ page }) => {
      await page.fill('[data-test="username"]', 'locked_out_user');
      await page.fill('[data-test="password"]', 'secret_sauce');
      await page.click('[data-test="login-button"]');
      await expect(page.locator('[data-test="error"]')).toContainText(
        'Sorry, this user has been locked out.'
      );
    });

    test('TC-006: Invalid password shows error', async ({ page }) => {
      await page.fill('[data-test="username"]', 'standard_user');
      await page.fill('[data-test="password"]', 'wrong_password');
      await page.click('[data-test="login-button"]');
      await expect(page.locator('[data-test="error"]')).toContainText(
        'Username and password do not match'
      );
    });  

    test('TC-007: Empty username and password', async ({ page }) => {
      await page.click('[data-test="login-button"]');
      await expect(page.locator('[data-test="error"]')).toBeVisible();
    }); 

});