import { expect, test } from '@playwright/test';

test('portfolio category filter updates the editorial selection', async ({
  page,
}) => {
  await page.goto('/portfolio');
  await page.getByRole('button', { name: 'Corporate' }).click();
  await expect(page.getByRole('button', { name: 'Corporate' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByRole('status')).toHaveText('1 story in view');
  await expect(page.getByRole('article')).toHaveCount(1);
});

for (const width of [360, 390, 768, 1024, 1440]) {
  test(`homepage fits a ${width}px viewport without horizontal overflow`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}
