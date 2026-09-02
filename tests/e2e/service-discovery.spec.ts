import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('visitor can discover a service and begin planning', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'View all services' }).click();
  await expect(page).toHaveURL(/\/services$/);

  await page.locator('a[href="/services/intimate-celebrations"]').click();
  await expect(
    page.getByRole('heading', { level: 1, name: 'Intimate Celebrations' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: /start your brief/i }),
  ).toHaveAttribute('href', '/plan-your-event');
});

test('homepage has no automatically detectable serious accessibility issues', async ({
  page,
}) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(
    results.violations.filter((violation) =>
      ['serious', 'critical'].includes(violation.impact ?? ''),
    ),
  ).toEqual([]);
});
