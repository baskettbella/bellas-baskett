'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

import { primaryNavigation } from '@/content/site';
import { useHydrated } from '@/hooks/use-hydrated';

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  const swipeStartRef = useRef<{ x: number; y: number } | null>(null);
  const isHydrated = useHydrated();

  const handlePointerDown = (event: ReactPointerEvent<HTMLDialogElement>) => {
    swipeStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDialogElement>) => {
    const start = swipeStartRef.current;
    swipeStartRef.current = null;
    if (!start) return;

    const horizontalDistance = Math.abs(event.clientX - start.x);
    const verticalDistance = Math.abs(event.clientY - start.y);
    if (Math.max(horizontalDistance, verticalDistance) >= 56) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!isOpen) swipeStartRef.current = null;
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
    <header className="site-header fixed inset-x-0 top-0 z-50">
      <div className="site-header-shell container-shell flex items-center justify-between gap-5">
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
          className="desktop-nav-capsule hidden items-center lg:flex"
          aria-label="Primary navigation"
        >
          <div className="flex items-center gap-6 px-5">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="desktop-nav-link"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <Link href="/plan-your-event" className="desktop-nav-action">
            Plan your event <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-hidden={isOpen}
            tabIndex={isOpen ? -1 : undefined}
            disabled={!isHydrated}
            onClick={() => setIsOpen((open) => !open)}
            className={`mobile-nav-trigger grid size-11 place-items-center text-[var(--wine)] ${isOpen ? 'invisible' : ''}`}
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
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            swipeStartRef.current = null;
          }}
          className="mobile-nav-screen fixed inset-0 z-[60] m-0 flex h-dvh max-h-none w-screen max-w-none touch-none flex-col overflow-hidden border-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] text-[var(--mist)] lg:hidden sm:px-8"
        >
          <div className="relative z-10 flex justify-end">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="grid size-12 place-items-center text-[var(--mist)] transition-[color,transform] duration-300 hover:scale-110 hover:text-[var(--champagne)] focus-visible:ring-[var(--champagne)] focus-visible:ring-offset-[var(--wine)]"
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <div className="relative z-10 flex flex-1 items-center justify-center py-5">
            <div className="w-full max-w-xs sm:max-w-sm">
              <div className="mx-auto mb-6 aspect-[3.15/1] w-[clamp(8.5rem,38vw,11rem)] overflow-hidden">
                {/* oxlint-disable-next-line next/no-img-element -- The transparent local logo is also embedded into the downloadable offline page. */}
                <img
                  src="/bellas-baskett-logo-transparent.png"
                  width={554}
                  height={554}
                  alt="Bella's Baskett menu logo"
                  className="h-auto w-full -translate-y-[33.5%] brightness-0 invert opacity-70"
                />
              </div>
              <nav
                className="mx-auto flex w-full flex-col"
                aria-label="Mobile navigation"
              >
                {primaryNavigation.map((item, index) => (
                  <Link
                    key={item.href}
                    ref={index === 0 ? firstMenuItemRef : undefined}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display group relative flex items-center justify-center overflow-hidden border-b border-white/15 px-7 py-[clamp(0.58rem,1.4vh,0.78rem)] text-center text-[clamp(1.65rem,7.5vw,2.35rem)] leading-none tracking-[-0.015em] transition-all duration-300 hover:bg-white/[0.06] hover:px-9 hover:text-[var(--champagne)] active:scale-[0.98] active:bg-white/10"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="absolute right-4 font-sans text-sm text-white/30 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--champagne)] group-hover:opacity-100 group-focus-visible:opacity-100"
                    >
                      ↗
                    </span>
                  </Link>
                ))}
              </nav>
              <Link
                href="/plan-your-event"
                onClick={() => setIsOpen(false)}
                className="button-secondary mt-7 w-full border-white/35"
              >
                Plan your event
              </Link>
              <p className="mt-4 text-center text-[0.58rem] uppercase tracking-[0.2em] text-white/35">
                Swipe to close
              </p>
            </div>
          </div>
        </dialog>
      ) : null}
    </header>
  );
}
