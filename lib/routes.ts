import { services } from '@/content/services';

const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/packages',
  '/corporate-events',
  '/gifts-surprises',
  '/process',
  '/journal',
  '/faq',
  '/contact',
  '/plan-your-event',
];

export function getPublicRoutes() {
  return [...staticRoutes, ...services.map((service) => service.href)];
}
