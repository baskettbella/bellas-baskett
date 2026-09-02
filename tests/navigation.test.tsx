import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { SiteHeader } from '@/components/brand/site-header';

describe('SiteHeader', () => {
  it('keeps the event-planning path available', () => {
    render(<SiteHeader />);
    expect(
      screen.getAllByRole('link', { name: /plan your event/i })[0],
    ).toHaveAttribute('href', '/plan-your-event');
  });

  it('opens and closes the mobile navigation accessibly', async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const trigger = screen.getByRole('button', { name: /open menu/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: /site menu/i })).toBeVisible();

    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});
