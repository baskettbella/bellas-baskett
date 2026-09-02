import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

import { EditorialCta, PageHero } from '@/components/content/editorial-page';

export const metadata: Metadata = {
  title: 'Packages',
  description:
    "Explore Bella's Baskett styling structures, tailored after your event brief is reviewed.",
  alternates: { canonical: '/packages' },
};

const structures = [
  {
    number: '01',
    name: 'The Gathering Edit',
    suited: 'For intimate celebrations and focused styling moments.',
    items: [
      'A clear creative direction',
      'One principal styled area',
      'On-site finishing within the agreed scope',
    ],
  },
  {
    number: '02',
    name: 'The Signature Setting',
    suited: 'For celebrations that need a more layered guest experience.',
    items: [
      'Cohesive event look and feel',
      'Multiple coordinated styling moments',
      'Detailed set-up and styling coordination',
    ],
  },
  {
    number: '03',
    name: 'Brand & Bespoke',
    suited:
      'For corporate events, activations and briefs with specific requirements.',
    items: [
      'Purpose-led creative direction',
      'Brand-aware spatial styling',
      'Scope and production planning with key partners',
    ],
  },
];

export default function PackagesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Styling structures"
        title="A useful place to begin."
        introduction="These structures help frame the conversation. Your proposal is shaped only after we understand the venue, scale, priorities, timing and practical requirements."
      />
      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-5 lg:grid-cols-3">
          {structures.map((item, index) => (
            <article
              key={item.name}
              className={`flex min-h-[34rem] flex-col border border-[color:var(--border)] p-7 sm:p-9 ${index === 1 ? 'bg-[var(--wine)] text-[var(--mist)]' : 'bg-[var(--mist)]'}`}
            >
              <p
                className={`font-display text-3xl ${index === 1 ? 'text-[var(--champagne)]' : 'text-[var(--rose)]'}`}
              >
                {item.number}
              </p>
              <h2 className="font-display mt-12 text-5xl leading-[0.9]">
                {item.name}
              </h2>
              <p
                className={`mt-5 text-sm leading-7 ${index === 1 ? 'text-white/80' : 'text-[var(--mauve)]'}`}
              >
                {item.suited}
              </p>
              <ul className="mt-10 space-y-4">
                {item.items.map((feature) => (
                  <li
                    key={feature}
                    className={`flex gap-3 border-b pb-4 text-sm ${index === 1 ? 'border-white/20' : 'border-[color:var(--border)]'}`}
                  >
                    <Check
                      size={15}
                      className="mt-0.5 shrink-0 text-[var(--rose)]"
                    />{' '}
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/plan-your-event"
                className="text-link mt-auto w-fit pt-10"
              >
                Discuss this structure <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
        <div className="container-shell mt-12 border-l border-[var(--champagne)] pl-6 text-sm leading-7 text-[var(--mauve)]">
          Prices are not listed because event scope varies meaningfully. After
          your brief is reviewed, we will clarify suitable inclusions and next
          steps before a proposal is prepared.
        </div>
      </section>
      <EditorialCta title="Let the brief shape the right scope." />
    </main>
  );
}
