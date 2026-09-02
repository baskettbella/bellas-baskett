import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export function ContentPending({
  label = 'A considered edit is in preparation',
  message = 'We will publish this story only when its details and imagery have been reviewed and approved.',
}: {
  label?: string;
  message?: string;
}) {
  return (
    <div className="relative overflow-hidden border border-[color:var(--border)] bg-[var(--mist)] p-8 sm:p-12">
      <div className="absolute right-0 top-0 size-48 rounded-full bg-[var(--blush)]/50 blur-3xl" />
      <Sparkles
        aria-hidden="true"
        size={22}
        strokeWidth={1.3}
        className="relative text-[var(--rose)]"
      />
      <h2 className="font-display relative mt-8 max-w-2xl text-4xl leading-[0.95] text-[var(--wine)] sm:text-5xl">
        {label}
      </h2>
      <p className="relative mt-5 max-w-xl text-sm leading-7 text-[var(--mauve)]">
        {message}
      </p>
      <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/services" className="button-secondary">
          Explore services
        </Link>
        <Link href="/plan-your-event" className="text-link">
          Plan your event <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
