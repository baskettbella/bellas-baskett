import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock3, MapPin, MessageCircle } from 'lucide-react';

import { PageHero } from '@/components/content/editorial-page';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contact Bella's Baskett about bespoke event styling in Kuala Lumpur and the Klang Valley.",
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Contact"
        title="Let’s begin with the occasion."
        introduction="The best first message includes your date, location, event type and the feeling you hope to create. Our guided planner helps you gather it all."
      />
      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="bg-[var(--wine)] p-8 text-[var(--mist)] sm:p-12">
            <MessageCircle
              size={25}
              strokeWidth={1.3}
              className="text-[var(--champagne)]"
            />
            <p className="eyebrow mt-16 text-[var(--champagne)]">
              Preferred enquiry path
            </p>
            <h2 className="font-display mt-4 max-w-2xl text-5xl leading-[0.9] sm:text-7xl">
              Prepare your brief, then continue on WhatsApp.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/80">
              Nothing is submitted or saved by this website. You complete the
              enquiry only when you choose to send the prepared WhatsApp
              message.
            </p>
            <Link
              href="/plan-your-event"
              className="button-secondary mt-8 border-white/30"
            >
              Plan your event <ArrowRight size={15} />
            </Link>
          </article>
          <div className="grid gap-5">
            <article className="bg-[var(--blush)]/55 p-8 sm:p-10">
              <MapPin size={22} strokeWidth={1.3} />
              <h2 className="font-display mt-10 text-4xl text-[var(--wine)]">
                Service area
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--mauve)]">
                {siteConfig.serviceArea}. Share your venue or preferred area and
                we will confirm feasibility.
              </p>
            </article>
            <article className="bg-[var(--sage)]/55 p-8 sm:p-10">
              <Clock3 size={22} strokeWidth={1.3} />
              <h2 className="font-display mt-10 text-4xl text-[var(--wine)]">
                Dates & timing
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--mauve)]">
                Availability and lead time are confirmed individually after your
                message is received.
              </p>
              <p className="mt-4 text-sm font-semibold text-[var(--wine)]">
                WhatsApp {siteConfig.whatsappDisplay}
              </p>
            </article>
          </div>
        </div>
        <p className="container-shell mt-8 text-xs leading-6 text-[var(--mauve)]">
          Verified social links will be added when supplied. We do not publish
          unconfirmed contact details.
        </p>
      </section>
    </main>
  );
}
