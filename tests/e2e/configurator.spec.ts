import { expect, test } from '@playwright/test';

test('visitor can prepare and review a WhatsApp enquiry', async ({ page }) => {
  await page.goto('/plan-your-event');

  await page.getByLabel('Event type').selectOption('Wedding');
  await page.getByLabel('Event date').fill('2026-12-12');
  await page.getByLabel('Location or area').fill('Kuala Lumpur');
  await page.getByLabel('Event scale').selectOption('51–100 guests');
  await page.getByRole('button', { name: 'Next step' }).click();

  await page.getByLabel('Style or feeling').fill('Romantic and refined');
  await page.getByLabel('Colour direction').fill('Blush, ivory and sage');
  await page.getByRole('button', { name: 'Next step' }).click();

  await page.getByText('Creative direction', { exact: true }).click();
  await page.getByLabel('Budget preference').selectOption('Please guide me');
  await page.getByRole('button', { name: 'Next step' }).click();

  await page.getByLabel('Your name').fill('Amina');
  await page.getByLabel('Phone number').fill('0123456789');
  await page.getByRole('button', { name: 'Next step' }).click();

  const continueLink = page.getByRole('link', {
    name: /continue to whatsapp/i,
  });
  await expect(continueLink).toHaveAttribute(
    'href',
    /^https:\/\/wa\.me\/60179223552\?text=/,
  );
  await expect(
    page.getByText(/has not submitted or stored your enquiry/i),
  ).toBeVisible();
});

test('mobile menu supports keyboard focus and escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menuButton = page.getByRole('button', { name: 'Open menu' });
  await expect(menuButton).toBeEnabled();
  await menuButton.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('dialog', { name: 'Site menu' })).toBeVisible();
  await expect(
    page
      .getByRole('dialog', { name: 'Site menu' })
      .getByRole('link', { name: 'About' }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog', { name: 'Site menu' })).toHaveCount(0);
});
