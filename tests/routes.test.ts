import { describe, expect, it } from 'vitest';

import { publishedJournalEntries } from '@/content/journal';
import { getServiceBySlug, services } from '@/content/services';

describe('public route content', () => {
  it('maps every service to its own internal detail route', () => {
    for (const service of services) {
      expect(service.href).toBe(`/services/${service.slug}`);
      expect(getServiceBySlug(service.slug)).toEqual(service);
    }
  });

  it('does not publish journal detail links without approved copy', () => {
    expect(publishedJournalEntries).toEqual([]);
  });
});
