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

const responsiveViewports = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 15', width: 393, height: 852 },
  { name: 'Android', width: 412, height: 915 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1366, height: 768 },
  { name: 'desktop', width: 1920, height: 1080 },
  { name: '4K television', width: 3840, height: 2160 },
] as const;

for (const viewport of responsiveViewports) {
  test(`homepage panels fit one ${viewport.name} viewport`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');

    const dimensions = await page.evaluate(() => {
      const panels = Array.from(
        document.querySelectorAll<HTMLElement>('main#main-content > section'),
      );

      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        viewportHeight: window.innerHeight,
        panels: panels.map((panel, panelIndex) => {
          const panelRect = panel.getBoundingClientRect();
          const controls = Array.from(
            panel.querySelectorAll<HTMLElement>('a, button, summary'),
          )
            .filter((control) => {
              const styles = window.getComputedStyle(control);
              return (
                styles.display !== 'none' &&
                styles.visibility !== 'hidden' &&
                control.getClientRects().length > 0
              );
            })
            .map((control) => {
              const rect = control.getBoundingClientRect();
              return {
                label:
                  control.getAttribute('aria-label') ??
                  control.textContent?.trim().replace(/\s+/g, ' ') ??
                  `control-${panelIndex}`,
                top: rect.top,
                bottom: rect.bottom,
              };
            });

          return {
            index: panelIndex,
            height: panelRect.height,
            top: panelRect.top,
            bottom: panelRect.bottom,
            controls,
          };
        }),
      };
    });

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    expect(dimensions.panels).toHaveLength(8);

    for (const panel of dimensions.panels) {
      expect(
        Math.abs(panel.height - dimensions.viewportHeight),
        `panel ${panel.index} should be exactly one viewport tall`,
      ).toBeLessThanOrEqual(1);

      for (const control of panel.controls) {
        expect(
          control.top,
          `${control.label} should not be clipped above panel ${panel.index}`,
        ).toBeGreaterThanOrEqual(panel.top - 1);
        expect(
          control.bottom,
          `${control.label} should not be clipped below panel ${panel.index}`,
        ).toBeLessThanOrEqual(panel.bottom + 1);
      }
    }
  });
}
