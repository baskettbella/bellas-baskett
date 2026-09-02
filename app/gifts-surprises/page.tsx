import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Gift, HeartHandshake, KeyRound } from 'lucide-react';

import { EditorialCta, PageHero } from '@/components/content/editorial-page';

export const metadata: Metadata = {
  title: 'Gifts & Surprises',
  description:
    'Bespoke gift baskets and surprise set-ups, planned with warmth and discretion.',
  alternates: { canonical: '/gifts-surprises' },
};

export default function GiftsSurprisesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Gifts & surprises"
        title="A beautiful way to say it."
        introduction="Some moments call for a thoughtful gesture. Others deserve a whole reveal. We shape both around the recipient, occasion and feeling you want to send."
      />
      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-5 lg:grid-cols-[1.12fr_0.88fr]">
          <article className="relative min-h-[34rem] overflow-hidden bg-[var(--blush)] p-8 sm:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_22%,rgba(252,250,247,0.9),transparent_26%),linear-gradient(140deg,transparent,rgba(189,144,149,0.38))]" />
            <div className="relative flex h-full flex-col justify-between">
              <Gift size={26} strokeWidth={1.2} />
              <div>
                <p className="eyebrow text-[var(--mauve)]">
                  Bespoke gift baskets
                </p>
                <h2 className="font-display mt-5 text-6xl leading-[0.88] text-[var(--wine)]">
                  A gesture, composed with care.
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--wine)]">
                  Contents, presentation and delivery feasibility are confirmed
                  individually based on the recipient, occasion, timing and
                  available elements.
                </p>
              </div>
            </div>
          </article>
          <div className="grid gap-5">
            <article className="bg-[var(--wine)] p-8 text-[var(--mist)] sm:p-10">
              <KeyRound
                size={23}
                strokeWidth={1.2}
                className="text-[var(--champagne)]"
              />
              <h2 className="font-display mt-10 text-5xl">Surprise set-ups</h2>
              <p className="mt-4 text-sm leading-7 text-white/80">
                Access, timing and the reveal are planned discreetly around the
                location and its restrictions.
              </p>
            </article>
            <article className="bg-[var(--sage)]/60 p-8 sm:p-10">
              <HeartHandshake size={23} strokeWidth={1.2} />
              <h2 className="font-display mt-10 text-5xl text-[var(--wine)]">
                Tell us who it is for
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--mauve)]">
                The most helpful first details are the occasion, recipient,
                date, location, intended feeling and any practical constraints.
              </p>
            </article>
          </div>
        </div>
        <div className="container-shell mt-10 text-center">
          <Link
            href="/services/bespoke-gift-baskets"
            className="button-secondary"
          >
            Explore gift details <ArrowRight size={14} />
          </Link>
        </div>
      </section>
      <EditorialCta title="Make the gesture feel entirely theirs." />
    </main>
  );
}
