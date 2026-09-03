import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Home from '@/app/page';

describe('homepage hero video', () => {
  it('renders the supplied footage as a silent inline looping background', () => {
    const { container } = render(<Home />);
    const video = container.querySelector('video');

    expect(video).not.toBeNull();
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('playsinline');
    expect(video).toHaveProperty('muted', true);
    expect(video?.querySelector('source')).toHaveAttribute(
      'src',
      '/flowers-hero-4k.mp4',
    );
    expect(
      screen.getByRole('heading', {
        name: /celebrations,.*beautifully imagined/i,
      }),
    ).toBeVisible();
  });
});
