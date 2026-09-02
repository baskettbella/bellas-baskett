import { siteConfig } from '@/content/site';
import { getSiteUrl } from '@/lib/site-url';

export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    description: siteConfig.description,
    url: getSiteUrl(),
    telephone: siteConfig.whatsappDisplay,
    areaServed: ['Kuala Lumpur', 'Klang Valley'],
    serviceType: [
      'Event styling',
      'Wedding styling',
      'Corporate event styling',
      'Gift styling',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
