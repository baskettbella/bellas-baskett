import type { Metadata } from 'next';

import { ContentPending } from '@/components/content/content-pending';
import { PageHero } from '@/components/content/editorial-page';
import { portfolioItems } from '@/content/portfolio';

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioItems.find((entry) => entry.slug === slug);
  return {
    title: item?.title ?? 'Project story',
    robots: { index: false, follow: true },
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = portfolioItems.find((entry) => entry.slug === slug);
  return (
    <main id="main-content">
      <PageHero
        eyebrow={item?.category ?? 'Portfolio'}
        title={item?.title ?? 'Project story in preparation'}
        introduction={item?.summary ?? 'This story is not yet available.'}
      />
      <section className="py-24 sm:py-32">
        <div className="container-shell max-w-5xl">
          <ContentPending label="This project story is not yet published." />
        </div>
      </section>
    </main>
  );
}
