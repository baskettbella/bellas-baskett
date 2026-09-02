import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { portfolioItems } from '@/content/portfolio';
import { PortfolioFilter } from '@/features/portfolio/portfolio-filter';

describe('PortfolioFilter', () => {
  it('updates the visible editorial selection and announces the count', async () => {
    const user = userEvent.setup();
    render(<PortfolioFilter items={portfolioItems} />);

    await user.click(screen.getByRole('button', { name: 'Corporate' }));

    expect(screen.getByRole('button', { name: 'Corporate' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent('1 story in view');
  });
});
