import { test, expect } from '@playwright/test';

test.describe('EPAM Client Work', () => {
  test('navigates from Services → Explore Our Client Work and verifies Client Work text', async ({ page }) => {
    // 1) Navigate to EPAM homepage
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

    // 2) Click the "Services" header link
    const servicesLink = page.getByRole('link', { name: /Services/i });
    await expect(servicesLink).toBeVisible({ timeout: 10000 });
    await servicesLink.click();

    // Wait for Services page to load (basic heuristic)
    await page.waitForLoadState('networkidle');

    // 3) Click the "Explore Our Client Work" link
    // The link text may vary in casing so use a case-insensitive regexp
    const exploreClientWork = page.getByRole('link', { name: /Explore Our Client Work/i });
    // Fallback: if role selector doesn't find it, try a text locator
    if (!(await exploreClientWork.count())) {
      const fallback = page.locator('text=/Explore Our Client Work/i');
      await expect(fallback).toBeVisible({ timeout: 10000 });
      await fallback.first().click();
    } else {
      await expect(exploreClientWork).toBeVisible({ timeout: 10000 });
      await exploreClientWork.click();
    }

    // 4) Verify that the "Client Work" text is visible on the resulting page
    const clientWorkHeading = page.getByText(/Client Work/i);
    await expect(clientWorkHeading).toBeVisible({ timeout: 10000 });
  });
});
