import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { SiteHeader } from '@/components/brand/site-header';

describe('SiteHeader', () => {
  it("uses the official Bella's Baskett logo as the home link", () => {
    render(<SiteHeader />);

    const homeLink = screen.getByRole('link', {
      name: "Bella's Baskett home",
    });
    expect(
      within(homeLink).getByRole('img', { name: "Bella's Baskett" }),
    ).toHaveAttribute('src', '/bellas-baskett-logo-transparent.png');
  });

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
    const menu = screen.getByRole('dialog', { name: /site menu/i });
    expect(menu).toBeVisible();

    await user.click(within(menu).getByRole('button', { name: /close menu/i }));
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);

    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile navigation when the page scrolls', async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const trigger = screen.getByRole('button', { name: /open menu/i });
    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: /site menu/i })).toBeVisible();

    fireEvent.scroll(window);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByRole('dialog', { name: /site menu/i }),
    ).not.toBeInTheDocument();
  });
});
