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
