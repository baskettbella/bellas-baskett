import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <main id="main-content" className="page-hero min-h-[80svh]">
      <div className="container-shell relative z-10 max-w-5xl text-center">
        <p className="font-display text-8xl text-[var(--blush)] sm:text-9xl">
          404
        </p>
        <p className="eyebrow mt-6 text-[var(--mauve)]">
          This page has stepped out
        </p>
        <h1 className="font-display mt-5 text-[clamp(3.5rem,8vw,7rem)] leading-[0.84] text-[var(--wine)]">
          Let&apos;s return to something beautiful.
        </h1>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="button-secondary">
            <ArrowLeft size={14} /> Return home
          </Link>
          <Link href="/plan-your-event" className="button-primary">
            Plan your event <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
