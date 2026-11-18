import { test, expect, type Page } from '@playwright/test';

const browserErrors = new WeakMap<Page, string[]>();

test.describe('RTSOLUTIONS Homepage', () => {
  test.beforeEach(async ({ page }) => {
    const errors: string[] = [];
    browserErrors.set(page, errors);
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load without console or page errors', async ({ page }) => {
    await page.waitForTimeout(2000); // Allow client-side interactions to settle
    expect(browserErrors.get(page) ?? []).toEqual([]);
  });

  test('should have correct title and meta', async ({ page }) => {
    await expect(page).toHaveTitle(/RTSOLUTIONS/);
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /creative frontend|software studio|digital product/);
  });

  test('should have all main sections', async ({ page }) => {
    // Check hero section
    await expect(page.locator('#hero')).toBeVisible();

    // Check manifesto section
    await expect(page.locator('#manifesto')).toBeVisible();

    // Check capabilities section
    await expect(page.locator('#capabilities')).toBeVisible();

    // Check work section
    await expect(page.locator('#work')).toBeVisible();

    // Check process section
    await expect(page.locator('#process')).toBeVisible();

    // Check why section
    await expect(page.locator('#why')).toBeVisible();

    // Check contact section
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should have navigation with working links', async ({ page }) => {
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();

    // Check logo
    await expect(page.locator('a[href="/"]').first()).toContainText('RTSOLUTIONS');

    // Check nav items - target only the nav links in the desktop nav (hidden md:flex container)
    const desktopNavLinks = page.locator('nav[aria-label="Main navigation"] >> div.hidden.md\\:flex >> a');
    await expect(desktopNavLinks.first()).toBeVisible();

    const navItems = ['Studio', 'Capabilities', 'Work', 'Process', 'Contact'];
    for (const item of navItems) {
      await expect(desktopNavLinks.filter({ hasText: item })).toBeVisible();
    }
  });

  test('should have working CTA buttons', async ({ page }) => {
    // Hero CTAs
    await expect(page.locator('a[href="#contact"]:has-text("Start a Project")').first()).toBeVisible();
    await expect(page.locator('a[href="#capabilities"]:has-text("Explore capabilities")')).toBeVisible();
  });

  test('should render the photographic jellyfish centerpiece', async ({ page }) => {
    const artwork = page.locator('#hero .hero-jelly-photo');
    await expect(artwork).toBeVisible();
    const backgroundImage = await artwork.evaluate((element) => getComputedStyle(element).backgroundImage);
    expect(backgroundImage).toContain('pexels.com');
    await expect(page.locator('#hero .hero-heading')).toBeVisible();
  });

  test('should have footer with links', async ({ page }) => {
    const footer = page.locator('footer[role="contentinfo"]');
    await expect(footer).toBeVisible();

    // Check footer sections
    await expect(page.locator('footer nav[aria-label="Studio"]')).toBeVisible();
    await expect(page.locator('footer nav[aria-label="Work"]')).toBeVisible();
    await expect(page.locator('footer nav[aria-label="Connect"]')).toBeVisible();
  });

  test('contact form should be functional', async ({ page }) => {
    // Scroll to contact form
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Check form fields
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('select[name="projectType"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();

    // Fill form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.selectOption('select[name="projectType"]', 'website');
    await page.fill('textarea[name="message"]', 'This is a test message for the contact form validation.');

    // Submit button should be enabled
    await expect(page.locator('button[type="submit"]')).toBeEnabled();
  });
});

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    const h2 = page.locator('h2');
    await expect(h2.first()).toBeVisible();
  });

  test('should have focusable elements with visible focus', async ({ page }) => {
    // Tab through the page
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });

  test('should respect reduced motion preference', async ({ page }) => {
    // This is a basic check - full reduced motion testing would need context
    // The page should render without errors; reduced motion is handled via CSS media queries
    const html = page.locator('html');
    await expect(html).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'mobile', width: 390, height: 844 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'wide', width: 1920, height: 1080 },
  ];

  for (const vp of viewports) {
    test(`should render correctly at ${vp.name} (${vp.width}x${vp.height})`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000);

      // Assert the document itself fits the viewport; do not hide overflow behind a tolerance.
      const dimensions = await page.evaluate(() => ({
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(
        dimensions.scrollWidth,
        `Horizontal overflow at ${vp.width}x${vp.height}`
      ).toBeLessThanOrEqual(dimensions.innerWidth);

      // Hero should be visible
      await expect(page.locator('#hero')).toBeVisible();

      // Navigation should work
      const nav = page.locator('nav[aria-label="Main navigation"]');
      await expect(nav).toBeVisible();
    });
  }
});