import type { Metadata } from 'next';

import { EditorialCta, PageHero } from '@/components/content/editorial-page';
import { ServiceWorld } from '@/components/content/service-world';
import { serviceGroups, services } from '@/content/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore bespoke styling for celebrations, weddings, corporate events, gifts and surprises.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="What we create"
        title="Occasions with atmosphere."
        introduction="Choose the service world closest to your plans. Every direction is tailored to the occasion, setting, scale and details that matter most."
      />
      {serviceGroups.map((group, index) => (
        <ServiceWorld
          key={group.id}
          title={group.label}
          introduction={group.introduction}
          category={group.id}
          services={services.filter((service) => service.category === group.id)}
          index={index}
        />
      ))}
      <EditorialCta />
    </main>
  );
}
