import Link from 'next/link';
import { ArrowRight, Building2, Gift, Heart, Sparkles } from 'lucide-react';

import { FloralMark } from '@/components/brand/floral-mark';
import { SectionHeading } from '@/components/brand/section-heading';
import { faqs } from '@/content/faq';
import { serviceGroups, services } from '@/content/services';

const serviceIcons = {
  celebrations: Sparkles,
  weddings: Heart,
  corporate: Building2,
  gifts: Gift,
};

export default function Home() {
  return (
    <main id="main-content" className="home-viewport-flow">
      <section className="viewport-panel viewport-hero relative bg-[var(--wine)] text-[var(--mist)]">
        <video
          className="hero-video absolute inset-0 size-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/flowers-hero-poster.jpg"
          aria-hidden="true"
        >
          <source src="/flowers-hero-4k.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay absolute inset-0" />

        <div className="container-shell hero-panel-shell relative z-10">
          <div className="hero-copy-highlight animate-reveal mx-auto flex max-w-6xl flex-col items-center text-center">
            <p className="hero-kicker-capsule eyebrow text-[var(--champagne)]">
              Bespoke event styling · Kuala Lumpur
            </p>
            <h1 className="hero-title font-display text-center font-medium tracking-[-0.055em]">
              Celebrations,
              <span className="block italic text-[var(--blush)]">
                beautifully imagined.
              </span>
            </h1>
            <p className="hero-description max-w-2xl text-sm text-white/80 sm:text-base">
              We create atmospheric, deeply personal settings for life&apos;s
              meaningful gatherings, brand moments and beautiful surprises.
            </p>
            <div className="hero-actions flex flex-wrap justify-center gap-3">
              <Link
                href="/plan-your-event"
                className="button-primary hero-action-pill border-[var(--mist)] bg-[var(--mist)] text-[var(--wine)]"
              >
                Plan your event <ArrowRight size={15} />
              </Link>
              <Link
                href="/portfolio"
                className="button-secondary hero-action-pill border-white/35"
              >
                Explore our work
              </Link>
            </div>
          </div>

          <nav
            className="hero-service-strip animate-reveal"
            aria-label="Service categories"
          >
            <p>Thoughtful styling for every kind of gathering</p>
            <div>
              {serviceGroups.map((group) => {
                const leadService = services.find(
                  (service) => service.category === group.id,
                )!;

                return (
                  <Link key={group.id} href={leadService.href}>
                    {group.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </section>

      <section id="introduction" className="viewport-panel relative">
        <FloralMark className="-left-32 top-0 opacity-20" />
        <div className="container-shell viewport-panel-shell intro-panel-grid relative grid lg:grid-cols-[0.65fr_1.35fr]">
          <div className="pt-2">
            <p className="eyebrow text-[var(--mauve)]">The studio</p>
            <div className="mt-5 h-px w-20 bg-[var(--champagne)]" />
          </div>
          <div>
            <h2 className="intro-panel-title font-display max-w-4xl font-medium tracking-[-0.035em] text-[var(--wine)]">
              We style the feeling{' '}
              <span className="italic text-[var(--rose)]">before</span> we style
              the room.
            </h2>
            <div className="intro-panel-copy grid text-sm text-[var(--mauve)] sm:grid-cols-2 sm:text-base">
              <p>
                Bella&apos;s Baskett approaches every celebration as its own
                world—shaped around the people, place and quiet details that
                make it meaningful.
              </p>
              <p>
                From intimate dinners to brand gatherings, our work begins with
                listening and ends with a setting that feels considered from
                every angle.
              </p>
            </div>
            <Link href="/about" className="text-link intro-panel-link">
              Meet Bella&apos;s Baskett <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="viewport-panel border-y border-[color:var(--border)] bg-[var(--mist)]">
        <div className="container-shell viewport-panel-shell services-panel-shell">
          <SectionHeading
            eyebrow="Four service worlds"
            title="Every occasion has its own language."
            description="Begin with the world closest to your celebration. We will shape the details together from there."
          />
          <div className="services-panel-grid border-t border-[color:var(--border)]">
            {serviceGroups.map((group, index) => {
              const Icon = serviceIcons[group.id];
              const leadService = services.find(
                (service) => service.category === group.id,
              )!;
              return (
                <article
                  key={group.id}
                  className="service-panel-card group relative overflow-hidden border-b border-[color:var(--border)] transition-colors hover:bg-[var(--blush)]/35 md:odd:border-r xl:border-b-0 xl:not-last:border-r"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl text-[var(--rose)]">
                      0{index + 1}
                    </span>
                    <Icon
                      size={18}
                      strokeWidth={1.4}
                      className="text-[var(--mauve)]"
                    />
                  </div>
                  <div className="service-card-copy">
                    <h3 className="font-display leading-[0.95] text-[var(--wine)]">
                      {group.label}
                    </h3>
                    <p className="service-card-description text-sm text-[var(--mauve)]">
                      {group.introduction}
                    </p>
                    <Link
                      href={leadService.href}
                      className="text-link service-card-link"
                    >
                      Explore <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="services-panel-action text-center">
            <Link href="/services" className="button-secondary">
              View all services
            </Link>
          </div>
        </div>
      </section>

      <section className="viewport-panel">
        <div className="container-shell viewport-panel-shell portfolio-panel-shell">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <SectionHeading
              eyebrow="Selected work"
              title="Stories worth lingering over."
              description="Our portfolio is being carefully prepared using only confirmed Bella's Baskett work and approved imagery."
            />
            <Link href="/portfolio" className="button-secondary lg:mb-2">
              Visit the portfolio
            </Link>
          </div>

          <div className="portfolio-panel-grid grid lg:grid-cols-[1.25fr_0.75fr]">
            <article className="portfolio-feature soft-shadow relative overflow-hidden bg-[var(--blush)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(252,250,247,0.9),transparent_21%),linear-gradient(145deg,transparent_28%,rgba(189,144,149,0.46)_100%)]" />
              <div className="absolute -right-16 top-8 h-80 w-56 rotate-12 rounded-[50%] border border-white/50 bg-white/20 blur-[2px]" />
              <div className="relative flex h-full flex-col justify-between">
                <p className="eyebrow text-[var(--wine)]">
                  Portfolio preview · Image pending approval
                </p>
                <div>
                  <h3 className="portfolio-feature-title font-display max-w-xl leading-[0.95] text-[var(--wine)]">
                    A considered edit is coming into view.
                  </h3>
                  <p className="mt-5 max-w-lg text-sm leading-6 text-[var(--wine)]">
                    We never use stock imagery as proof of our work. Verified
                    project stories will appear here as soon as they are ready.
                  </p>
                </div>
              </div>
            </article>
            <div className="portfolio-support-grid grid sm:grid-cols-2 lg:grid-cols-1">
              <div className="portfolio-support-card relative overflow-hidden bg-[var(--sage)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(252,250,247,0.6),transparent_28%)]" />
                <p className="eyebrow relative text-[var(--cocoa)]">
                  Corporate stories · In preparation
                </p>
              </div>
              <div className="portfolio-support-card relative overflow-hidden bg-[var(--wine)] text-[var(--mist)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(183,157,120,0.3),transparent_38%)]" />
                <p className="eyebrow relative text-[var(--champagne)]">
                  Gifts & surprises · In preparation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="viewport-panel bg-[var(--wine)] text-[var(--mist)]">
        <div className="container-shell viewport-panel-shell process-panel-shell">
          <SectionHeading
            eyebrow="How we work"
            title="A calm path from first thought to final detail."
            light
          />
          <ol className="process-panel-grid grid border-t border-white/20 md:grid-cols-3">
            {[
              [
                '01',
                'Share your vision',
                'Tell us about the occasion, setting, scale and feeling you hope to create.',
              ],
              [
                '02',
                'Shape the direction',
                'We clarify priorities, scope and practical requirements before preparing a proposal.',
              ],
              [
                '03',
                'Bring it to life',
                'Once confirmed, the details are developed and coordinated towards a beautifully styled day.',
              ],
            ].map(([number, title, copy]) => (
              <li key={number}>
                <span className="font-display text-3xl text-[var(--champagne)]">
                  {number}
                </span>
                <h3 className="font-display process-step-title">{title}</h3>
                <p className="process-step-copy max-w-sm text-sm text-white/80">
                  {copy}
                </p>
              </li>
            ))}
          </ol>
          <Link
            href="/process"
            className="button-secondary process-panel-link border-white/30"
          >
            See the full process
          </Link>
        </div>
      </section>

      <section className="viewport-panel relative bg-[var(--blush)]/40">
        <FloralMark className="-right-28 top-12" />
        <div className="container-shell viewport-panel-shell corporate-panel-grid relative grid lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="corporate-art relative overflow-hidden bg-[var(--sage)]/70">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(252,250,247,0.8),transparent_25%),linear-gradient(135deg,transparent,rgba(74,41,49,0.18))]" />
            <div className="relative flex h-full flex-col justify-between">
              <Building2 size={28} strokeWidth={1.2} />
              <p className="font-display corporate-art-title leading-none text-[var(--wine)]">
                Brand-aware.
                <br />
                Guest-centred.
                <br />
                Beautifully resolved.
              </p>
            </div>
          </div>
          <div>
            <p className="eyebrow text-[var(--mauve)]">
              For brands & organisations
            </p>
            <h2 className="font-display corporate-panel-title leading-[0.9] text-[var(--wine)]">
              Corporate events with a human touch.
            </h2>
            <p className="corporate-panel-copy max-w-xl text-sm text-[var(--mauve)] sm:text-base">
              From intimate stakeholder dinners to launches and festive
              gatherings, we translate your purpose and brand into an
              environment guests can feel.
            </p>
            <Link
              href="/corporate-events"
              className="text-link corporate-panel-link"
            >
              Explore corporate events <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="viewport-panel">
        <div className="container-shell viewport-panel-shell faq-panel-grid grid lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow text-[var(--mauve)]">Good to know</p>
            <h2 className="font-display faq-panel-title leading-[0.95] text-[var(--wine)]">
              Planning begins with the right questions.
            </h2>
            <p className="faq-panel-copy max-w-md text-sm text-[var(--mauve)]">
              We serve Kuala Lumpur and the Klang Valley. Dates, access and
              exact styling scope are confirmed after we review your brief.
            </p>
            <Link href="/faq" className="button-secondary faq-panel-link">
              Read all FAQs
            </Link>
          </div>
          <div className="faq-list border-t border-[color:var(--border)]">
            {faqs.slice(0, 4).map((faq, index) => (
              <details
                key={faq.question}
                className="faq-row group border-b border-[color:var(--border)]"
              >
                <summary className="font-display faq-summary flex cursor-pointer list-none items-start justify-between gap-5 text-[var(--wine)]">
                  <span>
                    <small className="mr-4 font-sans text-[0.62rem] tracking-widest text-[var(--rose)]">
                      0{index + 1}
                    </small>
                    {faq.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-sans text-lg transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="faq-answer max-w-2xl pl-10 text-sm text-[var(--mauve)]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="viewport-panel relative bg-[var(--blush)] px-5 text-center">
        <FloralMark className="-left-12 -top-10" />
        <FloralMark className="-bottom-20 -right-10" />
        <div className="final-panel-content relative m-auto max-w-5xl">
          <p className="eyebrow text-[var(--mauve)]">
            Your celebration starts here
          </p>
          <h2 className="font-display final-panel-title leading-[0.8] tracking-[-0.045em] text-[var(--wine)]">
            Let&apos;s imagine something{' '}
            <span className="italic">beautiful.</span>
          </h2>
          <p className="final-panel-copy mx-auto max-w-xl text-sm text-[var(--wine)]">
            Build a simple event brief, review it, then continue the
            conversation with us on WhatsApp.
          </p>
          <Link
            href="/plan-your-event"
            className="button-primary final-panel-link"
          >
            Plan your event <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
