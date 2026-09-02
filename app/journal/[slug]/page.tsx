import type { Metadata } from 'next';

import { ContentPending } from '@/components/content/content-pending';
import { PageHero } from '@/components/content/editorial-page';
import { journalEntries } from '@/content/journal';

export function generateStaticParams() {
  return journalEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = journalEntries.find((item) => item.slug === slug);
  return {
    title: entry?.title ?? 'Journal note',
    robots: { index: false, follow: true },
  };
}

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = journalEntries.find((item) => item.slug === slug);
  return (
    <main id="main-content">
      <PageHero
        eyebrow={entry?.category ?? 'The journal'}
        title={entry?.title ?? 'Journal note in preparation'}
        introduction={entry?.excerpt ?? 'This article is not yet available.'}
      />
      <section className="py-24 sm:py-32">
        <div className="container-shell max-w-5xl">
          <ContentPending label="This article is not yet published." />
        </div>
      </section>
    </main>
  );
}
