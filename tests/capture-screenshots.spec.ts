import { test, expect } from '@playwright/test';

test.setTimeout(120000);

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'wide', width: 1920, height: 1080 },
];

for (const vp of viewports) {
  test(`capture ${vp.name} screenshot`, async ({ page }) => {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000); // Allow 3D scene to initialize
    
    await page.screenshot({ 
      path: `docs/screenshots/${vp.name}-${vp.width}x${vp.height}.png`,
      fullPage: true 
    });
  });
}
