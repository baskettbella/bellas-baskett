import type { Metadata } from 'next';
import Image from 'next/image';

import { SectionHeading } from '@/components/brand/section-heading';
import { EditorialCta, PageHero } from '@/components/content/editorial-page';

export const metadata: Metadata = {
  title: 'About',
  description:
    "Discover Bella's Baskett's thoughtful approach to bespoke event styling.",
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="About Bella's Baskett"
        title="A studio for meaningful moments."
        introduction="We create considered environments for people who want a celebration to feel personal, effortless and beautifully held together."
      />
      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-14 lg:grid-cols-[0.65fr_1.35fr]">
          <p className="eyebrow text-[var(--mauve)]">Our point of view</p>
          <div>
            <h2 className="font-display text-[clamp(3rem,6vw,6rem)] leading-[0.9] text-[var(--wine)]">
              Beautiful is not a formula. It is a feeling, made visible.
            </h2>
            <div className="mt-10 grid gap-8 text-sm leading-7 text-[var(--mauve)] sm:grid-cols-2 sm:text-base">
              <p>
                Every brief begins with the people at its centre. We listen for
                what matters, what feels true to the occasion and how guests
                should feel as they arrive.
              </p>
              <p>
                From there, colour, texture, composition and practical planning
                come together as one calm, cohesive direction.
              </p>
            </div>
          </div>
        </div>
      </section>
      <figure className="container-shell mb-24 sm:mb-32">
        <Image
          src="/og.png"
          width="1680"
          height="945"
          loading="lazy"
          alt="Abstract Bella's Baskett brand artwork with translucent blush fabric, ribbon and soft floral shadows."
          className="h-auto w-full"
        />
        <figcaption className="mt-3 text-[0.68rem] uppercase tracking-[0.16em] text-[var(--mauve)]">
          Original Bella&apos;s Baskett brand artwork · not project photography
        </figcaption>
      </figure>
      <section className="bg-[var(--wine)] py-24 text-[var(--mist)] sm:py-32">
        <div className="container-shell">
          <SectionHeading
            eyebrow="What guides us"
            title="Warmth. Restraint. Thoughtful detail."
            light
          />
          <div className="mt-14 grid gap-8 border-t border-white/20 pt-10 md:grid-cols-3">
            {[
              [
                '01',
                'Personal before perfect',
                'The setting should reflect your people and purpose—not a passing template.',
              ],
              [
                '02',
                'Calm in the process',
                'Clear questions and considered decisions help the experience feel beautifully manageable.',
              ],
              [
                '03',
                'Honest in every detail',
                'Scope, feasibility and availability are confirmed before promises are made.',
              ],
            ].map(([number, title, copy]) => (
              <article key={number}>
                <p className="font-display text-3xl text-[var(--champagne)]">
                  {number}
                </p>
                <h3 className="font-display mt-7 text-4xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/80">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <EditorialCta title="Tell us what you are imagining." />
    </main>
  );
}
