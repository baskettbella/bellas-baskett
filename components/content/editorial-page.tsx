import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { FloralMark } from '@/components/brand/floral-mark';

export function PageHero({
  eyebrow,
  title,
  introduction,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
}) {
  return (
    <section className="page-hero">
      <FloralMark className="-right-20 top-24 opacity-25" />
      <div className="container-shell relative z-10 grid gap-9 lg:grid-cols-[1fr_0.55fr] lg:items-end">
        <div>
          <p className="eyebrow text-[var(--mauve)]">{eyebrow}</p>
          <h1 className="font-display mt-5 max-w-5xl text-[clamp(4rem,10vw,9rem)] font-medium leading-[0.79] tracking-[-0.05em] text-[var(--wine)]">
            {title}
          </h1>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[var(--mauve)] sm:text-base lg:pb-2">
          {introduction}
        </p>
      </div>
    </section>
  );
}

export function EditorialCta({
  title = 'Have an occasion in mind?',
  copy = 'Share the shape of your event and we will continue the conversation with care.',
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--blush)] px-5 py-20 text-center sm:py-28">
      <FloralMark className="-bottom-28 -left-16" />
      <div className="relative mx-auto max-w-4xl">
        <p className="eyebrow text-[var(--mauve)]">Begin the conversation</p>
        <h2 className="font-display mt-5 text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.85] text-[var(--wine)]">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-[var(--wine)]">
          {copy}
        </p>
        <Link href="/plan-your-event" className="button-primary mt-8">
          Plan your event <ArrowRight size={15} />
        </Link>
      </div>
    </section>
  );
}
