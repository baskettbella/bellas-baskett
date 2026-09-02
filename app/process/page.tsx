import type { Metadata } from 'next';

import { EditorialCta, PageHero } from '@/components/content/editorial-page';

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    "Understand Bella's Baskett's event styling process from initial brief to event day.",
  alternates: { canonical: '/process' },
};

const steps = [
  [
    '01',
    'Start with your brief',
    'Use our event planner to share the occasion, date, location, scale, style direction, priorities and contact details. The website keeps your draft only for this browser session.',
  ],
  [
    '02',
    'Continue on WhatsApp',
    'Review the prepared message, open WhatsApp and choose to send it. No enquiry is submitted until you send that message.',
  ],
  [
    '03',
    'Clarify the direction',
    'We review the brief and ask the questions needed to understand feasibility, timing, venue requirements and the experience you want to create.',
  ],
  [
    '04',
    'Define the scope',
    'Suitable inclusions, responsibilities and practical considerations are clarified before a proposal is prepared.',
  ],
  [
    '05',
    'Develop the details',
    'Once the project is confirmed, the agreed visual direction and styling details are developed towards the event.',
  ],
  [
    '06',
    'Style the day',
    'Set-up and on-site styling follow the confirmed scope, venue access and production schedule.',
  ],
];

export default function ProcessPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Our process"
        title="Clear, calm and considered."
        introduction="Beautiful events are easier to enjoy when the path there feels well held. This is how an initial idea becomes a confirmed styling scope."
      />
      <section className="py-24 sm:py-32">
        <ol className="container-shell">
          {steps.map(([number, title, copy], index) => (
            <li
              key={number}
              className="grid gap-6 border-t border-[color:var(--border)] py-10 lg:grid-cols-[0.25fr_0.55fr_1.2fr] lg:gap-12 lg:py-14"
            >
              <p className="font-display text-3xl text-[var(--rose)]">
                {number}
              </p>
              <h2 className="font-display text-4xl leading-[0.95] text-[var(--wine)] sm:text-5xl">
                {title}
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-[var(--mauve)] sm:text-base">
                {copy}
              </p>
              {index === steps.length - 1 ? (
                <div className="lg:col-span-3" />
              ) : null}
            </li>
          ))}
        </ol>
      </section>
      <EditorialCta title="Ready to share the first details?" />
    </main>
  );
}
