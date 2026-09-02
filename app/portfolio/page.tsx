import type { Metadata } from 'next';

import { EditorialCta, PageHero } from '@/components/content/editorial-page';
import { portfolioItems } from '@/content/portfolio';
import { PortfolioFilter } from '@/features/portfolio/portfolio-filter';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    "Explore Bella's Baskett event styling portfolio as verified project stories are published.",
  alternates: { canonical: '/portfolio' },
};

export default function PortfolioPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Selected work"
        title="A portfolio, edited with care."
        introduction="Only verified Bella's Baskett projects, details and imagery will appear here. Use the filters to explore the story categories now being prepared."
      />
      <section className="py-20 sm:py-28">
        <div className="container-shell">
          <PortfolioFilter items={portfolioItems} />
        </div>
      </section>
      <EditorialCta title="Your story could begin with a simple brief." />
    </main>
  );
}
