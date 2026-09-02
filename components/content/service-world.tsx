import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import type { Service, ServiceCategory } from '@/content/services';

const tones: Record<ServiceCategory, string> = {
  celebrations: 'bg-[var(--blush)]/45',
  weddings: 'bg-[var(--mist)]',
  corporate: 'bg-[var(--sage)]/45',
  gifts: 'bg-[var(--wine)] text-[var(--mist)]',
};

export function ServiceWorld({
  title,
  introduction,
  category,
  services,
  index,
}: {
  title: string;
  introduction: string;
  category: ServiceCategory;
  services: Service[];
  index: number;
}) {
  const dark = category === 'gifts';
  return (
    <section className={`${tones[category]} py-20 sm:py-28`}>
      <div className="container-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p
            className={`font-display text-3xl ${dark ? 'text-[var(--champagne)]' : 'text-[var(--rose)]'}`}
          >
            0{index + 1}
          </p>
          <h2
            className={`font-display mt-6 text-5xl leading-[0.9] sm:text-6xl ${dark ? 'text-[var(--mist)]' : 'text-[var(--wine)]'}`}
          >
            {title}
          </h2>
          <p
            className={`mt-6 max-w-md text-sm leading-7 ${dark ? 'text-white/80' : 'text-[var(--mauve)]'}`}
          >
            {introduction}
          </p>
        </div>
        <div
          className={
            dark
              ? 'border-t border-white/20'
              : 'border-t border-[color:var(--border)]'
          }
        >
          {services.map((service) => (
            <article
              key={service.slug}
              className={`grid gap-4 border-b py-7 sm:grid-cols-[1fr_auto] sm:items-center ${dark ? 'border-white/20' : 'border-[color:var(--border)]'}`}
            >
              <div>
                <p
                  className={`eyebrow ${dark ? 'text-[var(--champagne)]' : 'text-[var(--mauve)]'}`}
                >
                  {service.eyebrow}
                </p>
                <h3 className="font-display mt-2 text-3xl sm:text-4xl">
                  {service.title}
                </h3>
                <p
                  className={`mt-3 max-w-xl text-sm leading-6 ${dark ? 'text-white/80' : 'text-[var(--mauve)]'}`}
                >
                  {service.description}
                </p>
              </div>
              <Link href={service.href} className="text-link w-fit">
                Details <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
