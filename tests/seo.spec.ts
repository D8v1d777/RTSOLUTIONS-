import { test, expect } from '@playwright/test';

test.describe('Independent quality pass', () => {
  test('canonical and social metadata use one configured site origin', async ({ page }) => {
    await page.goto('/');

    const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonicalHref).toBeTruthy();
    const canonical = new URL(canonicalHref!);
    expect(canonical.pathname).toBe('/');

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toBeTruthy();
    expect(new URL(ogUrl!).origin).toBe(canonical.origin);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', `${canonical.origin}/og-image.svg`);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', `${canonical.origin}/og-image.svg`);
  });

  test('robots and sitemap point to the canonical origin and only list real pages', async ({ page }) => {
    await page.goto('/');
    const canonicalHref = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonicalHref).toBeTruthy();
    const canonicalOrigin = new URL(canonicalHref!).origin;
    const requestOrigin = new URL(page.url()).origin;

    const [robotsResponse, sitemapResponse] = await Promise.all([
      page.request.get(`${requestOrigin}/robots.txt`),
      page.request.get(`${requestOrigin}/sitemap.xml`),
    ]);

    expect(robotsResponse.status()).toBe(200);
    expect(sitemapResponse.status()).toBe(200);

    const robots = await robotsResponse.text();
    expect(robots).toContain(`Sitemap: ${canonicalOrigin}/sitemap.xml`);
    expect(robots).not.toContain('rtsolutions.dev');
    expect(robots).not.toContain('Disallow: /_next/');

    const sitemap = await sitemapResponse.text();
    const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    expect(urls).toEqual([`${canonicalOrigin}/`]);
    expect(urls.some((url) => url.includes('#'))).toBe(false);
  });

  test('footer contains no placeholder or disabled destinations', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer.locator('a[href="#"]')).toHaveCount(0);
    await expect(footer.locator('a[aria-disabled="true"]')).toHaveCount(0);
  });

  test('404 contact action returns to the home-page contact section', async ({ page }) => {
    await page.goto('/__quality_pass_missing_route__');
    await expect(page.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/#contact');
  });

  test('contact fields expose required semantics without native validation blocking custom errors', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('#contact form');
    await expect(form).toHaveAttribute('novalidate', '');

    for (const selector of [
      'input[name="name"]',
      'input[name="email"]',
      'select[name="projectType"]',
      'textarea[name="message"]',
    ]) {
      await expect(form.locator(selector)).toHaveAttribute('required', '');
    }

    await expect(form.locator('input[name="name"]')).toHaveAttribute('autocomplete', 'name');
    await expect(form.locator('input[name="email"]')).toHaveAttribute('autocomplete', 'email');
    await expect(page.locator('#contact')).toContainText(/leaving or refreshing clears it/i);
  });

  test('public copy avoids unverified service-level promises', async ({ page }) => {
    await page.goto('/');
    const copy = `${await page.locator('#process').innerText()} ${await page.locator('#why').innerText()}`;

    for (const claim of [
      '80%+',
      '5-year maintenance horizon',
      'WCAG AA',
      'Automated aXe testing',
      '30-day support window',
      'Direct Slack/email access',
      'Principal-level involvement',
    ]) {
      expect(copy).not.toContain(claim);
    }

    expect(copy).toContain('Varies by scope');

    const whyCopy = await page.locator('#why').innerText();
    expect(whyCopy).toContain("We're not the right fit for everyone. That's intentional.");
    expect(whyCopy).not.toContain("\\'");
  });

  test('document has no horizontal overflow at the four target viewports', async ({ page }) => {
    for (const viewport of [
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1440, height: 900 },
      { width: 1920, height: 1080 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto('/');
      const dimensions = await page.evaluate(() => ({
        innerWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));

      expect(
        dimensions.scrollWidth,
        `Horizontal overflow at ${viewport.width}x${viewport.height}`
      ).toBeLessThanOrEqual(dimensions.innerWidth);
    }
  });

  test('mobile menu opens, navigates, and closes', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const toggle = page.locator('button[aria-controls="mobile-menu"]');
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#mobile-menu')).toBeVisible();

    await page.locator('#mobile-menu').getByRole('link', { name: 'Studio' }).click();
    await expect(page).toHaveURL(/#manifesto$/);
    await expect(page.locator('button[aria-controls="mobile-menu"]')).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#mobile-menu')).toHaveCount(0);
  });
});
