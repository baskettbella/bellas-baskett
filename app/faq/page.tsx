import type { Metadata } from 'next';

import { EditorialCta, PageHero } from '@/components/content/editorial-page';
import { faqs } from '@/content/faq';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    "Answers about Bella's Baskett event styling, enquiries, timing, locations and proposals.",
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Frequently asked questions"
        title="The useful details, gathered here."
        introduction="A thoughtful brief is the beginning. These answers cover the questions that most often help a styling conversation move forward."
      />
      <section className="py-24 sm:py-32">
        <div className="container-shell max-w-5xl border-t border-[color:var(--border)]">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              className="group border-b border-[color:var(--border)] py-7 sm:py-9"
            >
              <summary className="font-display flex cursor-pointer list-none items-start justify-between gap-6 text-3xl leading-none text-[var(--wine)] sm:text-4xl">
                <span className="flex gap-5">
                  <small className="mt-1 font-sans text-[0.62rem] tracking-[0.18em] text-[var(--rose)]">
                    {String(index + 1).padStart(2, '0')}
                  </small>
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className="font-sans text-xl transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-2 pl-11 pt-5 text-sm leading-7 text-[var(--mauve)] sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
      <EditorialCta
        title="Still wondering about something?"
        copy="Share the key details in your event brief and continue to WhatsApp. We can clarify the rest together."
      />
    </main>
  );
}
