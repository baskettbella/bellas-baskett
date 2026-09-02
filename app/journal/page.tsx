import type { Metadata } from 'next';

import { ContentPending } from '@/components/content/content-pending';
import { PageHero } from '@/components/content/editorial-page';
import { journalEntries } from '@/content/journal';

export const metadata: Metadata = {
  title: 'Journal',
  description: "Planning notes and studio stories from Bella's Baskett.",
  alternates: { canonical: '/journal' },
};

export default function JournalPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="The journal"
        title="Notes on gathering beautifully."
        introduction="Practical thoughts on atmosphere, guest experience and preparing a useful event brief. Articles will be published only when the copy is approved."
      />
      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-5 lg:grid-cols-3">
          {journalEntries.map((entry, index) => (
            <article
              key={entry.slug}
              className={`flex min-h-[26rem] flex-col p-8 ${index === 1 ? 'bg-[var(--wine)] text-[var(--mist)]' : index === 2 ? 'bg-[var(--sage)]/55' : 'bg-[var(--blush)]/55'}`}
            >
              <p
                className={`eyebrow ${index === 1 ? 'text-[var(--champagne)]' : 'text-[var(--mauve)]'}`}
              >
                {entry.category}
              </p>
              <h2 className="font-display mt-14 text-4xl leading-[0.95] sm:text-5xl">
                {entry.title}
              </h2>
              <p
                className={`mt-5 text-sm leading-7 ${index === 1 ? 'text-white/80' : 'text-[var(--mauve)]'}`}
              >
                {entry.excerpt}
              </p>
              <p
                className={`eyebrow mt-auto pt-10 ${index === 1 ? 'text-white/80' : 'text-[var(--rose)]'}`}
              >
                In preparation
              </p>
            </article>
          ))}
        </div>
        <div className="container-shell mt-12">
          <ContentPending
            label="The first journal edit is being written."
            message="Detail pages remain unpublished until their copy has been reviewed and approved."
          />
        </div>
      </section>
    </main>
  );
}
