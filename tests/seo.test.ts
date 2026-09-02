import { describe, expect, it } from 'vitest';

import { services } from '@/content/services';
import { getPublicRoutes } from '@/lib/routes';

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
});
