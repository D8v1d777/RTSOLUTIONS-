import { test, type Page } from '@playwright/test';

test.setTimeout(120000);

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'wide', width: 1920, height: 1080 },
];

async function revealScrollTriggeredContent(page: Page) {
  const originalScrollBehavior = await page.evaluate(() => document.documentElement.style.scrollBehavior);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  });

  const { pageHeight, viewportHeight } = await page.evaluate(() => ({
    pageHeight: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight,
  }));
  const step = Math.max(240, Math.floor(viewportHeight * 0.65));

  for (let top = 0; top < pageHeight; top += step) {
    await page.evaluate((y) => window.scrollTo(0, y), top);
    await page.waitForTimeout(350);
  }

  await page.evaluate((scrollBehavior) => {
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = scrollBehavior;
  }, originalScrollBehavior);
  await page.waitForTimeout(600);
}

for (const vp of viewports) {
  test(`capture ${vp.name} screenshot`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await revealScrollTriggeredContent(page);

    await page.screenshot({
      path: `docs/screenshots/${vp.name}-${vp.width}x${vp.height}.png`,
      fullPage: true,
    });
  });
}
