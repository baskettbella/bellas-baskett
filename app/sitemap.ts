import type { MetadataRoute } from 'next';

import { getPublicRoutes } from '@/lib/routes';
import { getSiteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  return getPublicRoutes().map((route) => ({
    url: `${baseUrl}${route === '/' ? '' : route}`,
    lastModified: new Date('2026-09-02'),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/plan-your-event' ? 0.9 : 0.7,
  }));
}
