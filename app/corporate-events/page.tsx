import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  GlassWater,
  Megaphone,
  Users,
} from 'lucide-react';

import { EditorialCta, PageHero } from '@/components/content/editorial-page';

export const metadata: Metadata = {
  title: 'Corporate Events',
  description:
    'Brand-aware corporate event styling for launches, dinners, gatherings and guest-facing moments.',
  alternates: { canonical: '/corporate-events' },
};

const capabilities = [
  {
    icon: Megaphone,
    title: 'Launches & activations',
    copy: 'Physical settings that carry campaign direction clearly and welcome guests naturally.',
  },
  {
    icon: GlassWater,
    title: 'Dinners & appreciation',
    copy: 'Refined tablescapes and room details for hosting clients, teams and stakeholders.',
  },
  {
    icon: Users,
    title: 'Company gatherings',
    copy: 'Considered styling for festive occasions, milestones and internal celebrations.',
  },
  {
    icon: Building2,
    title: 'Venue collaboration',
    copy: 'A defined styling scope coordinated around access, production timing and appointed partners.',
  },
];

export default function CorporateEventsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Corporate events"
        title="Your brand, felt in the room."
        introduction="We create guest-facing environments that support your purpose, reflect your brand and still feel genuinely warm."
      />
      <section className="bg-[var(--wine)] py-24 text-[var(--mist)] sm:py-32">
        <div className="container-shell">
          <p className="eyebrow text-[var(--champagne)]">Capabilities</p>
          <div className="mt-12 grid border-t border-white/20 md:grid-cols-2">
            {capabilities.map(({ icon: Icon, title, copy }) => (
              <article
                key={title}
                className="min-h-72 border-b border-white/20 p-8 md:odd:border-r"
              >
                <Icon
                  size={22}
                  strokeWidth={1.3}
                  className="text-[var(--champagne)]"
                />
                <h2 className="font-display mt-14 text-4xl">{title}</h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-white/80">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <h2 className="font-display text-5xl leading-[0.9] text-[var(--wine)] sm:text-6xl">
            A clear brief keeps every partner aligned.
          </h2>
          <div className="space-y-6 text-sm leading-7 text-[var(--mauve)] sm:text-base">
            <p>
              Share your event purpose, guest profile, brand direction, venue,
              date and key timings. If other suppliers are appointed, tell us
              where their responsibilities begin and end.
            </p>
            <p>
              We will clarify styling priorities, access requirements and
              feasibility before confirming a working scope.
            </p>
            <Link href="/plan-your-event" className="text-link">
              Build a corporate event brief <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
      <EditorialCta title="Bring warmth to your next brand moment." />
    </main>
  );
}
