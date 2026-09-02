import type { Metadata } from 'next';
import { LockKeyhole, MessageCircle, ShieldCheck } from 'lucide-react';

import { PageHero } from '@/components/content/editorial-page';
import { EventConfigurator } from '@/features/configurator/event-configurator';

export const metadata: Metadata = {
  title: 'Plan Your Event',
  description:
    "Prepare a Bella's Baskett event styling brief and continue the conversation securely through WhatsApp.",
  alternates: { canonical: '/plan-your-event' },
};

export default function PlanYourEventPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Plan your event"
        title="Let’s gather the first details."
        introduction="This guided brief helps us begin with the useful information. It takes only a few minutes and remains in your browser until you choose to continue to WhatsApp."
      />
      <section className="py-16 sm:py-24">
        <div className="container-shell grid gap-8 xl:grid-cols-[0.3fr_0.7fr] xl:items-start">
          <aside className="xl:sticky xl:top-28">
            <p className="eyebrow text-[var(--mauve)]">Before you begin</p>
            <div className="mt-6 space-y-6 text-sm leading-7 text-[var(--mauve)]">
              <div className="flex gap-3">
                <LockKeyhole
                  size={18}
                  className="mt-1 shrink-0 text-[var(--rose)]"
                />
                <p>No account, database or file upload is used.</p>
              </div>
              <div className="flex gap-3">
                <ShieldCheck
                  size={18}
                  className="mt-1 shrink-0 text-[var(--rose)]"
                />
                <p>
                  Your draft is held only for this browser session and can be
                  reset at any time.
                </p>
              </div>
              <div className="flex gap-3">
                <MessageCircle
                  size={18}
                  className="mt-1 shrink-0 text-[var(--rose)]"
                />
                <p>
                  The enquiry is complete only after you review and send the
                  message in WhatsApp.
                </p>
              </div>
            </div>
          </aside>
          <EventConfigurator />
        </div>
      </section>
    </main>
  );
}
