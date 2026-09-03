import { expect, test } from '@playwright/test';

const publicRoutes = [
  '/',
  '/about',
  '/services',
  '/services/intimate-celebrations',
  '/portfolio',
  '/packages',
  '/corporate-events',
  '/gifts-surprises',
  '/process',
  '/journal',
  '/faq',
  '/contact',
  '/plan-your-event',
  '/robots.txt',
  '/sitemap.xml',
];

test('every public route responds successfully', async ({ request }) => {
  for (const route of publicRoutes) {
    const response = await request.get(route);
    expect(response.ok(), `${route} returned ${response.status()}`).toBe(true);
  }
});

test('every homepage call-to-action opens its real page', async ({ page }) => {
  await page.goto('/');
  const destinations = await page
    .locator('main a[href^="/"]')
    .evaluateAll((links) => [
      ...new Set(
        links.map((link) => link.getAttribute('href')).filter(Boolean),
      ),
    ]);

  for (const destination of destinations) {
    await page.goto('/');
    await page.locator(`main a[href="${destination}"]`).first().click();
    await expect(page).toHaveURL(
      new RegExp(`${destination === '/' ? '/' : destination}/?$`),
    );
    await expect(page.locator('main')).toBeVisible();
  }
});

test('reduced-motion preference removes nonessential animation', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');

  const duration = await page
    .locator('.animate-reveal')
    .first()
    .evaluate((element) =>
      Number.parseFloat(window.getComputedStyle(element).animationDuration),
    );

  expect(duration).toBeLessThanOrEqual(0.001);
});
