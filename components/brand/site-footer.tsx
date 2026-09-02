import Link from 'next/link';
import { ArrowUpRight, MapPin, MessageCircle } from 'lucide-react';

import { primaryNavigation, siteConfig } from '@/content/site';

export function SiteFooter() {
  return (
    <footer className="bg-[var(--cocoa)] py-16 text-[var(--porcelain)] sm:py-20">
      <div className="container-shell">
        <div className="grid gap-14 border-b border-white/15 pb-14 lg:grid-cols-[1.25fr_0.75fr_0.75fr]">
          <div>
            <p className="font-display text-4xl font-medium sm:text-5xl">
              Bella&apos;s Baskett
            </p>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/80">
              Bespoke event styling for celebrations, brands and thoughtful
              gestures across Kuala Lumpur and the Klang Valley.
            </p>
            <Link
              href="/plan-your-event"
              className="button-secondary mt-8 border-white/30"
            >
              Begin your event brief <ArrowUpRight size={15} />
            </Link>
          </div>

          <div>
            <p className="eyebrow text-[var(--champagne)]">Navigate</p>
            <nav
              className="mt-5 grid gap-3 text-sm text-white/80"
              aria-label="Footer navigation"
            >
              {primaryNavigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="w-fit hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/faq" className="w-fit hover:text-white">
                FAQ
              </Link>
              <Link href="/contact" className="w-fit hover:text-white">
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <p className="eyebrow text-[var(--champagne)]">Connect</p>
            <div className="mt-5 space-y-4 text-sm text-white/80">
              <Link
                href="/contact"
                className="flex w-fit items-center gap-2 hover:text-white"
              >
                <MessageCircle size={16} /> Contact the studio
              </Link>
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" />{' '}
                {siteConfig.serviceArea}
              </p>
              <p>{siteConfig.whatsappDisplay}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-[0.68rem] tracking-[0.08em] text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Bella&apos;s Baskett. All rights
            reserved.
          </p>
          <p>Celebrations, beautifully imagined.</p>
        </div>
      </div>
    </footer>
  );
}
