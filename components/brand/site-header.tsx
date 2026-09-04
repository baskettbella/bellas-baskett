'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { primaryNavigation } from '@/content/site';
import { useHydrated } from '@/hooks/use-hydrated';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const isHydrated = useHydrated();

  useEffect(() => {
    const closeMenu = () => setIsOpen(false);
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    window.addEventListener('scroll', closeMenu, { passive: true });
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) queueMicrotask(() => firstMenuItemRef.current?.focus());
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('scroll', closeMenu);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--border)] bg-[color:color-mix(in_srgb,var(--porcelain)_88%,transparent)] backdrop-blur-xl">
      <div className="container-shell flex h-[4.75rem] items-center justify-between gap-5">
        <Link
          href="/"
          className="brand-logo-link"
          aria-label="Bella's Baskett home"
        >
          {/* oxlint-disable-next-line next/no-img-element -- The local transparent logo avoids the Vinext client-image hydration conflict. */}
          <img
            src="/bellas-baskett-logo-transparent.png"
            width={554}
            height={554}
            alt="Bella's Baskett"
            className="brand-logo-image"
          />
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary navigation"
        >
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[0.69rem] font-bold uppercase tracking-[0.16em] text-[var(--cocoa)] transition-colors hover:text-[var(--rose)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/plan-your-event"
            className="button-primary hidden sm:inline-flex"
          >
            Plan your event
          </Link>
          <button
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-hidden={isOpen}
            tabIndex={isOpen ? -1 : undefined}
            disabled={!isHydrated}
            onClick={() => setIsOpen((open) => !open)}
            className="grid size-11 place-items-center text-[var(--wine)] lg:hidden"
          >
            {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <dialog
          open
          id="mobile-menu"
          aria-modal="true"
          aria-label="Site menu"
          className="mobile-nav-screen fixed inset-0 z-[60] m-0 flex h-dvh max-h-none w-screen max-w-none flex-col overflow-hidden border-0 bg-[var(--wine)] px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] text-[var(--mist)] lg:hidden sm:px-8"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 size-80 rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,rgba(229,209,210,0.17),transparent_67%)]"
          />
          <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4">
            <div>
              <p className="eyebrow text-[var(--champagne)]">
                Bella&apos;s Baskett
              </p>
              <p className="mt-1 text-[0.68rem] tracking-[0.09em] text-white/55">
                Celebrations, beautifully imagined.
              </p>
            </div>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="grid size-12 place-items-center rounded-full border border-white/25 text-[var(--mist)] transition-colors hover:border-[var(--champagne)] hover:text-[var(--champagne)] focus-visible:ring-[var(--champagne)] focus-visible:ring-offset-[var(--wine)]"
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <nav
            className="relative z-10 flex flex-1 flex-col justify-center py-4"
            aria-label="Mobile navigation"
          >
            {primaryNavigation.map((item, index) => (
              <Link
                key={item.href}
                ref={index === 0 ? firstMenuItemRef : undefined}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-display group flex items-center justify-between border-b border-white/15 py-[clamp(0.62rem,1.75vh,1rem)] text-[clamp(2.25rem,11vw,4.75rem)] leading-[0.88] tracking-[-0.025em] transition-colors hover:text-[var(--champagne)]"
              >
                <span className="flex items-center">
                  <span className="mr-4 font-sans text-[0.62rem] tracking-[0.2em] text-[var(--champagne)]">
                    0{index + 1}
                  </span>
                  {item.label}
                </span>
                <span
                  aria-hidden="true"
                  className="font-sans text-lg text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-[var(--champagne)]"
                >
                  ↗
                </span>
              </Link>
            ))}
          </nav>
          <div className="relative z-10 flex items-center gap-5">
            <Link
              href="/plan-your-event"
              onClick={() => setIsOpen(false)}
              className="button-secondary flex-1 border-white/35"
            >
              Plan your event
            </Link>
            <span className="hidden text-right text-[0.62rem] uppercase leading-5 tracking-[0.16em] text-white/45 sm:block">
              Kuala Lumpur
              <br />& Klang Valley
            </span>
          </div>
        </dialog>
      ) : null}
    </header>
  );
}
