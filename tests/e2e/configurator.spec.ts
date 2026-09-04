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
  await page.goto('/journal');
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

test('mobile menu fills the viewport and closes from its controls', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/journal');

  await page.evaluate(() => window.scrollTo(0, 500));
  await page.getByRole('button', { name: 'Open menu' }).click();

  const menu = page.getByRole('dialog', { name: 'Site menu' });
  await menu.evaluate((element) =>
    Promise.all(element.getAnimations().map((animation) => animation.finished)),
  );
  const bounds = await menu.boundingBox();
  expect(bounds).not.toBeNull();
  expect(bounds?.x).toBeLessThanOrEqual(1);
  expect(bounds?.y).toBeLessThanOrEqual(1);
  expect(bounds?.width).toBeGreaterThanOrEqual(389);
  expect(bounds?.height).toBeGreaterThanOrEqual(843);

  await menu.getByRole('button', { name: 'Close menu' }).click();
  await expect(menu).toHaveCount(0);

  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.evaluate(() => window.dispatchEvent(new Event('scroll')));
  await expect(menu).toHaveCount(0);
});

test('mobile menu centers its compact links and closes after a swipe', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/journal');
  const trigger = page.getByRole('button', { name: 'Open menu' });
  await trigger.click();

  const menu = page.getByRole('dialog', { name: 'Site menu' });
  const navigation = menu.getByRole('navigation', {
    name: 'Mobile navigation',
  });
  const logo = menu.getByRole('img', {
    name: "Bella's Baskett menu logo",
  });
  const bounds = await navigation.boundingBox();

  expect(bounds).not.toBeNull();
  expect(bounds?.width).toBeLessThanOrEqual(320);
  expect(
    Math.abs((bounds?.x ?? 0) + (bounds?.width ?? 0) / 2 - 195),
  ).toBeLessThanOrEqual(2);
  await expect(menu.getByText(/^0[1-5]$/)).toHaveCount(0);
  await expect(logo).toHaveCSS('opacity', '0.7');

  await menu.dispatchEvent('pointerdown', {
    pointerId: 1,
    pointerType: 'touch',
    clientX: 190,
    clientY: 220,
  });
  await menu.dispatchEvent('pointerup', {
    pointerId: 1,
    pointerType: 'touch',
    clientX: 194,
    clientY: 292,
  });
  await expect(menu).toHaveCount(0);
});

test('mobile menu keeps its action visible on a compact phone viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/journal');
  await page.getByRole('button', { name: 'Open menu' }).click();

  const menu = page.getByRole('dialog', { name: 'Site menu' });
  await expect(
    menu.getByRole('link', { name: 'Plan your event' }),
  ).toBeInViewport({ ratio: 1 });
  await expect(menu.getByText('Swipe to close')).toBeInViewport({ ratio: 1 });
});

test('mobile menu rises smoothly from below the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/journal');
  await page.getByRole('button', { name: 'Open menu' }).click();

  const firstTransform = await page
    .getByRole('dialog', { name: 'Site menu' })
    .evaluate((menu) => {
      const animation = menu.getAnimations()[0];
      if (!(animation?.effect instanceof KeyframeEffect)) return '';
      return String(animation.effect.getKeyframes()[0]?.transform ?? '');
    });

  expect(firstTransform).toContain('translateY(100%)');
});

test('mobile menu has a translucent clean backdrop and bare close icon', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/journal');
  const trigger = page.locator('button[aria-controls="mobile-menu"]');
  await trigger.click();

  const menu = page.getByRole('dialog', { name: 'Site menu' });
  const backgroundColor = await menu.evaluate(
    (element) => getComputedStyle(element).backgroundColor,
  );
  const closeBorderWidth = await menu
    .getByRole('button', { name: 'Close menu' })
    .evaluate((element) => getComputedStyle(element).borderTopWidth);

  expect(backgroundColor).toMatch(/(?:\/|,)\s*0\.6\)?$/);
  await expect(trigger).toHaveCSS('visibility', 'hidden');
  await expect(menu.locator(':scope > div[aria-hidden="true"]')).toHaveCount(0);
  expect(closeBorderWidth).toBe('0px');
});

test.describe('native touch navigation', () => {
  test.use({ hasTouch: true });

  test('mobile menu closes after a real finger swipe', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/journal');
    await page.getByRole('button', { name: 'Open menu' }).click();

    const menu = page.getByRole('dialog', { name: 'Site menu' });
    await menu.evaluate((element) =>
      Promise.all(
        element.getAnimations().map((animation) => animation.finished),
      ),
    );
    const session = await page.context().newCDPSession(page);
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: 195, y: 420 }],
    });
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: 195, y: 500 }],
    });
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });

    await expect(menu).toHaveCount(0);
  });

  test('mobile menu closes after a real horizontal finger swipe', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/journal');
    await page.getByRole('button', { name: 'Open menu' }).click();

    const menu = page.getByRole('dialog', { name: 'Site menu' });
    await menu.evaluate((element) =>
      Promise.all(
        element.getAnimations().map((animation) => animation.finished),
      ),
    );
    const session = await page.context().newCDPSession(page);
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: 90, y: 420 }],
    });
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: 170, y: 426 }],
    });
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchEnd',
      touchPoints: [],
    });

    await expect(menu).toHaveCount(0);
  });
});
