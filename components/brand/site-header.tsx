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
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) queueMicrotask(() => firstMenuItemRef.current?.focus());
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
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
          className="fixed inset-x-0 top-[4.75rem] flex h-[calc(100dvh-4.75rem)] flex-col bg-[var(--wine)] px-6 pb-8 pt-10 text-[var(--mist)] lg:hidden"
        >
          <p className="eyebrow text-[var(--champagne)]">Explore the studio</p>
          <nav
            className="mt-8 flex flex-1 flex-col"
            aria-label="Mobile navigation"
          >
            {primaryNavigation.map((item, index) => (
              <Link
                key={item.href}
                ref={index === 0 ? firstMenuItemRef : undefined}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-display flex items-center border-b border-white/15 py-3 text-[clamp(2.2rem,11vw,4rem)] leading-none"
              >
                <span className="mr-4 font-sans text-[0.65rem] tracking-widest text-[var(--champagne)]">
                  0{index + 1}
                </span>
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/plan-your-event"
            onClick={() => setIsOpen(false)}
            className="button-secondary w-full border-white/35"
          >
            Plan your event
          </Link>
        </dialog>
      ) : null}
    </header>
  );
}
