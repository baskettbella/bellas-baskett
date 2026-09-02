import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { EventConfigurator } from '@/features/configurator/event-configurator';

describe('EventConfigurator', () => {
  it('blocks an incomplete step and moves forward once event details are supplied', async () => {
    const user = userEvent.setup();
    render(<EventConfigurator />);

    expect(
      screen.getByRole('heading', { name: /tell us about your event/i }),
    ).toBeVisible();
    await user.click(screen.getByRole('button', { name: /next step/i }));
    expect(screen.getByText('Choose an event type.')).toBeVisible();

    await user.selectOptions(screen.getByLabelText(/event type/i), 'Wedding');
    await user.type(screen.getByLabelText(/event date/i), '2026-12-12');
    await user.type(screen.getByLabelText(/location or area/i), 'Kuala Lumpur');
    await user.selectOptions(
      screen.getByLabelText(/event scale/i),
      '51–100 guests',
    );
    await user.click(screen.getByRole('button', { name: /next step/i }));

    expect(
      screen.getByRole('heading', { name: /shape the atmosphere/i }),
    ).toBeVisible();
  });
});
