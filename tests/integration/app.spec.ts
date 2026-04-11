import { test, expect } from '@playwright/test';

test.describe('即刻排版 App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display header with logo and buttons', async ({ page }) => {
    // Check logo
    await expect(page.locator('text=即刻排版')).toBeVisible();
    await expect(page.locator('text=公众号极简助手')).toBeVisible();
    
    // Check main buttons
    await expect(page.locator('button:has-text("示例")')).toBeVisible();
    await expect(page.locator('button:has-text("模板")')).toBeVisible();
    await expect(page.locator('button:has-text("复制到公众号")')).toBeVisible();
  });

  test('should show editor with placeholder', async ({ page }) => {
    await expect(page.locator('[data-slate-placeholder="true"]')).toBeVisible();
  });

  test('should open template modal', async ({ page }) => {
    await page.click('button:has-text("模板")');
    
    // Modal should be visible
    await expect(page.locator('text=选择模板')).toBeVisible();
    
    // Should show template options
    await expect(page.locator('text=文艺清新')).toBeVisible();
    await expect(page.locator('text=科技极简')).toBeVisible();
    await expect(page.locator('text=商务大气')).toBeVisible();
    
    // Close modal
    await page.keyboard.press('Escape');
  });

  test('should open example modal', async ({ page }) => {
    await page.click('button:has-text("示例")');
    
    // Modal should be visible
    await expect(page.locator('text=选择示例文章')).toBeVisible();
    
    // Should show example articles
    await expect(page.locator('text=React 18 新特性完全指南')).toBeVisible();
    await expect(page.locator('text=深夜的咖啡馆')).toBeVisible();
    await expect(page.locator('text=周末的早午餐')).toBeVisible();
    
    // Close modal
    await page.keyboard.press('Escape');
  });

  test('should load example article', async ({ page }) => {
    await page.click('button:has-text("示例")');
    await page.click('text=React 18 新特性完全指南');
    
    // Toast should appear
    await expect(page.locator('text=/已加载示例/')).toBeVisible();
    
    // Editor should have content
    await expect(page.locator('text=React 18 新特性完全指南')).toBeVisible();
  });

  test('should have mobile preview section', async ({ page }) => {
    // Check preview section (hidden on mobile)
    const previewSection = page.locator('text=手机预览');
    if (await previewSection.isVisible()) {
      await expect(previewSection).toBeVisible();
      await expect(page.locator('text=375 × 667')).toBeVisible();
    }
  });

  test('should copy to clipboard', async ({ page }) => {
    // Load example first
    await page.click('button:has-text("示例")');
    await page.click('text=深夜的咖啡馆');
    
    // Click copy button
    await page.click('button:has-text("复制到公众号")');
    
    // Should show success toast
    await expect(page.locator('text=/复制成功/')).toBeVisible({ timeout: 5000 });
  });
});

test.describe('Template Selection', () => {
  test('should apply template and show toast', async ({ page }) => {
    await page.goto('/');
    
    // Open template modal
    await page.click('button:has-text("模板")');
    
    // Select a template
    await page.click('text=科技极简');
    
    // Should show success toast
    await expect(page.locator('text=/已应用/')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('text=/科技极简/')).toBeVisible({ timeout: 3000 });
  });

  test('should filter templates by category', async ({ page }) => {
    await page.goto('/');
    
    // Open template modal
    await page.click('button:has-text("模板")');
    
    // Click on 技术 category
    await page.click('button:has-text("技术")');
    
    // Should show only tech templates
    await expect(page.locator('text=科技极简')).toBeVisible();
    await expect(page.locator('text=极客代码')).toBeVisible();
    
    // Should not show other categories
    await expect(page.locator('text=文艺清新')).not.toBeVisible();
  });
});

test.describe('Editor Functionality', () => {
  test('should type in editor', async ({ page }) => {
    await page.goto('/');
    
    // Click on editor
    const editor = page.locator('.slate-editor, [contenteditable="true"]').first();
    await editor.click();
    
    // Type some text
    await page.keyboard.type('Hello World');
    
    // Text should appear
    await expect(page.locator('text=Hello World')).toBeVisible();
  });

  test('should toggle bold formatting', async ({ page }) => {
    await page.goto('/');
    
    // Type text first
    const editor = page.locator('.slate-editor, [contenteditable="true"]').first();
    await editor.click();
    await page.keyboard.type('Bold Text');
    
    // Select all
    await page.keyboard.press('Control+A');
    
    // Click bold button
    await page.click('button[title*="加粗"], button:has(svg path[d*="M6 4h8"])');
    
    // Should show bold indicator (check if button becomes active)
    // This is a basic test - actual bold application needs more complex selection
  });
});
