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

  it('shows a compact unnumbered menu with the transparent brand mark', async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await user.click(screen.getByRole('button', { name: /open menu/i }));

    const menu = screen.getByRole('dialog', { name: /site menu/i });
    const navigation = within(menu).getByRole('navigation', {
      name: /mobile navigation/i,
    });

    expect(
      within(menu).getByRole('img', {
        name: /bella's baskett menu logo/i,
      }),
    ).toBeVisible();
    expect(
      within(navigation).getByRole('link', { name: 'About' }),
    ).toBeVisible();
    expect(within(navigation).queryByText(/^0[1-5]$/)).not.toBeInTheDocument();
  });

  it('closes after a deliberate vertical swipe but ignores a tap-sized drag', async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const trigger = screen.getByRole('button', { name: /open menu/i });
    await user.click(trigger);

    const menu = screen.getByRole('dialog', { name: /site menu/i });
    fireEvent.pointerDown(menu, { clientX: 160, clientY: 220 });
    fireEvent.pointerUp(menu, { clientX: 164, clientY: 238 });
    expect(menu).toBeVisible();

    fireEvent.pointerDown(menu, { clientX: 160, clientY: 220 });
    fireEvent.pointerUp(menu, { clientX: 166, clientY: 290 });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByRole('dialog', { name: /site menu/i }),
    ).not.toBeInTheDocument();
  });

  it('closes after a deliberate horizontal swipe', async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const trigger = screen.getByRole('button', { name: /open menu/i });
    await user.click(trigger);

    const menu = screen.getByRole('dialog', { name: /site menu/i });
    fireEvent.pointerDown(menu, { clientX: 90, clientY: 260 });
    fireEvent.pointerUp(menu, { clientX: 164, clientY: 266 });

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.queryByRole('dialog', { name: /site menu/i }),
    ).not.toBeInTheDocument();
  });
});
