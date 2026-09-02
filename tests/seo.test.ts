import { describe, expect, it } from 'vitest';

import { services } from '@/content/services';
import { getPublicRoutes } from '@/lib/routes';
import { getSiteUrl } from '@/lib/site-url';

describe('public SEO routes', () => {
  it('includes every primary route and verified service detail page', () => {
    const routes = getPublicRoutes();
    expect(routes).toContain('/plan-your-event');
    expect(routes).toContain('/corporate-events');
    for (const service of services) expect(routes).toContain(service.href);
  });

  it('excludes unapproved portfolio and journal detail pages', () => {
    const routes = getPublicRoutes();
    expect(routes.some((route) => route.startsWith('/portfolio/'))).toBe(false);
    expect(routes.some((route) => route.startsWith('/journal/'))).toBe(false);
  });

  it('uses the live Sites origin when no environment override is supplied', () => {
    const previous = process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.NEXT_PUBLIC_SITE_URL;

    expect(getSiteUrl()).toBe('https://bellas-baskett.techafsb.chatgpt.site');

    if (previous) process.env.NEXT_PUBLIC_SITE_URL = previous;
  });
});
