import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Gift,
  Heart,
  Sparkles,
} from 'lucide-react';

import { FloralMark } from '@/components/brand/floral-mark';
import { SectionHeading } from '@/components/brand/section-heading';
import { faqs } from '@/content/faq';
import { serviceGroups, services } from '@/content/services';
import { siteConfig } from '@/content/site';

const serviceIcons = {
  celebrations: Sparkles,
  weddings: Heart,
  corporate: Building2,
  gifts: Gift,
};

export default function Home() {
  return (
    <main id="main-content">
      <section className="relative flex min-h-[min(900px,100svh)] overflow-hidden bg-[var(--wine)] pt-[4.75rem] text-[var(--mist)]">
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
        <div className="absolute -left-24 bottom-[-22%] size-[34rem] rounded-full border border-[var(--champagne)]/20 opacity-55" />

        <div className="container-shell relative z-10 grid flex-1 items-end gap-10 pb-12 pt-16 lg:grid-cols-[1fr_0.4fr] lg:pb-16">
          <div className="hero-copy-highlight animate-reveal max-w-5xl">
            <p className="eyebrow text-[var(--champagne)]">
              Bespoke event styling · Kuala Lumpur
            </p>
            <h1 className="font-display mt-5 text-[clamp(4.3rem,11.5vw,10.5rem)] font-medium leading-[0.74] tracking-[-0.055em]">
              Celebrations,
              <span className="mt-4 block pl-[8%] italic text-[var(--blush)]">
                beautifully imagined.
              </span>
            </h1>
            <p className="mt-9 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
              We create atmospheric, deeply personal settings for life&apos;s
              meaningful gatherings, brand moments and beautiful surprises.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/plan-your-event"
                className="button-primary border-[var(--mist)] bg-[var(--mist)] text-[var(--wine)]"
              >
                Plan your event <ArrowRight size={15} />
              </Link>
              <Link
                href="/portfolio"
                className="button-secondary border-white/35"
              >
                Explore our work
              </Link>
            </div>
          </div>

          <div className="hidden justify-self-end pb-3 text-right lg:block">
            <p className="max-w-xs text-xs leading-6 text-white/80">
              Styling celebrations, weddings, corporate gatherings, gifts and
              surprise moments across {siteConfig.serviceArea}.
            </p>
            <a
              href="#introduction"
              className="mt-7 inline-flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.18em]"
            >
              Discover the studio <ArrowDown size={14} />
            </a>
          </div>
        </div>
      </section>

      <section
        id="introduction"
        className="relative overflow-hidden py-24 sm:py-32"
      >
        <FloralMark className="-left-32 top-0 opacity-20" />
        <div className="container-shell relative grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
          <div className="pt-2">
            <p className="eyebrow text-[var(--mauve)]">The studio</p>
            <div className="mt-5 h-px w-20 bg-[var(--champagne)]" />
          </div>
          <div>
            <h2 className="font-display max-w-4xl text-[clamp(3rem,6.6vw,6.4rem)] font-medium leading-[0.92] tracking-[-0.035em] text-[var(--wine)]">
              We style the feeling{' '}
              <span className="italic text-[var(--rose)]">before</span> we style
              the room.
            </h2>
            <div className="mt-10 grid gap-8 text-sm leading-7 text-[var(--mauve)] sm:grid-cols-2 sm:text-base">
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
            <Link href="/about" className="text-link mt-9">
              Meet Bella&apos;s Baskett <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[color:var(--border)] bg-[var(--mist)] py-24 sm:py-32">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Four service worlds"
            title="Every occasion has its own language."
            description="Begin with the world closest to your celebration. We will shape the details together from there."
          />
          <div className="mt-16 grid border-t border-[color:var(--border)] md:grid-cols-2 xl:grid-cols-4">
            {serviceGroups.map((group, index) => {
              const Icon = serviceIcons[group.id];
              const leadService = services.find(
                (service) => service.category === group.id,
              )!;
              return (
                <article
                  key={group.id}
                  className="group relative min-h-[29rem] overflow-hidden border-b border-[color:var(--border)] p-7 transition-colors hover:bg-[var(--blush)]/35 md:odd:border-r xl:border-b-0 xl:not-last:border-r"
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
                  <div className="mt-28">
                    <h3 className="font-display text-[2.6rem] leading-[0.95] text-[var(--wine)]">
                      {group.label}
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-[var(--mauve)]">
                      {group.introduction}
                    </p>
                    <Link href={leadService.href} className="text-link mt-8">
                      Explore <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="button-secondary">
              View all services
            </Link>
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-24 sm:py-32">
        <div className="container-shell">
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

          <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <article className="soft-shadow relative min-h-[32rem] overflow-hidden bg-[var(--blush)] p-8 sm:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_22%,rgba(252,250,247,0.9),transparent_21%),linear-gradient(145deg,transparent_28%,rgba(189,144,149,0.46)_100%)]" />
              <div className="absolute -right-16 top-8 h-80 w-56 rotate-12 rounded-[50%] border border-white/50 bg-white/20 blur-[2px]" />
              <div className="relative flex h-full flex-col justify-between">
                <p className="eyebrow text-[var(--wine)]">
                  Portfolio preview · Image pending approval
                </p>
                <div>
                  <h3 className="font-display max-w-xl text-5xl leading-[0.95] text-[var(--wine)] sm:text-7xl">
                    A considered edit is coming into view.
                  </h3>
                  <p className="mt-5 max-w-lg text-sm leading-6 text-[var(--wine)]">
                    We never use stock imagery as proof of our work. Verified
                    project stories will appear here as soon as they are ready.
                  </p>
                </div>
              </div>
            </article>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div className="relative min-h-56 overflow-hidden bg-[var(--sage)] p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(252,250,247,0.6),transparent_28%)]" />
                <p className="eyebrow relative text-[var(--cocoa)]">
                  Corporate stories · In preparation
                </p>
              </div>
              <div className="relative min-h-56 overflow-hidden bg-[var(--wine)] p-7 text-[var(--mist)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(183,157,120,0.3),transparent_38%)]" />
                <p className="eyebrow relative text-[var(--champagne)]">
                  Gifts & surprises · In preparation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--wine)] py-24 text-[var(--mist)] sm:py-32">
        <div className="container-shell">
          <SectionHeading
            eyebrow="How we work"
            title="A calm path from first thought to final detail."
            light
          />
          <ol className="mt-16 grid gap-10 border-t border-white/20 pt-10 md:grid-cols-3">
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
                <h3 className="font-display mt-8 text-4xl">{title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-white/80">
                  {copy}
                </p>
              </li>
            ))}
          </ol>
          <Link
            href="/process"
            className="button-secondary mt-12 border-white/30"
          >
            See the full process
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--blush)]/40 py-24 sm:py-32">
        <FloralMark className="-right-28 top-12" />
        <div className="container-shell relative grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="relative min-h-[28rem] overflow-hidden bg-[var(--sage)]/70 p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(252,250,247,0.8),transparent_25%),linear-gradient(135deg,transparent,rgba(74,41,49,0.18))]" />
            <div className="relative flex h-full flex-col justify-between">
              <Building2 size={28} strokeWidth={1.2} />
              <p className="font-display text-5xl leading-none text-[var(--wine)]">
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
            <h2 className="font-display mt-5 text-[clamp(3.3rem,6vw,6rem)] leading-[0.9] text-[var(--wine)]">
              Corporate events with a human touch.
            </h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-[var(--mauve)] sm:text-base">
              From intimate stakeholder dinners to launches and festive
              gatherings, we translate your purpose and brand into an
              environment guests can feel.
            </p>
            <Link href="/corporate-events" className="text-link mt-8">
              Explore corporate events <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-shell grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="eyebrow text-[var(--mauve)]">Good to know</p>
            <h2 className="font-display mt-5 text-5xl leading-[0.95] text-[var(--wine)] sm:text-6xl">
              Planning begins with the right questions.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[var(--mauve)]">
              We serve Kuala Lumpur and the Klang Valley. Dates, access and
              exact styling scope are confirmed after we review your brief.
            </p>
            <Link href="/faq" className="button-secondary mt-8">
              Read all FAQs
            </Link>
          </div>
          <div className="border-t border-[color:var(--border)]">
            {faqs.slice(0, 4).map((faq, index) => (
              <details
                key={faq.question}
                className="group border-b border-[color:var(--border)] py-6"
              >
                <summary className="font-display flex cursor-pointer list-none items-start justify-between gap-5 text-2xl text-[var(--wine)] sm:text-3xl">
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
                <p className="max-w-2xl pb-2 pl-10 pt-4 text-sm leading-7 text-[var(--mauve)]">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--blush)] px-5 py-24 text-center sm:py-32">
        <FloralMark className="-left-12 -top-10" />
        <FloralMark className="-bottom-20 -right-10" />
        <div className="relative mx-auto max-w-5xl">
          <p className="eyebrow text-[var(--mauve)]">
            Your celebration starts here
          </p>
          <h2 className="font-display mt-6 text-[clamp(3.8rem,9vw,8.5rem)] leading-[0.8] tracking-[-0.045em] text-[var(--wine)]">
            Let&apos;s imagine something{' '}
            <span className="italic">beautiful.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-[var(--wine)]">
            Build a simple event brief, review it, then continue the
            conversation with us on WhatsApp.
          </p>
          <Link href="/plan-your-event" className="button-primary mt-9">
            Plan your event <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
