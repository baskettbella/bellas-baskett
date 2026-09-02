'use client';

import { LockKeyhole } from 'lucide-react';
import { useState } from 'react';

import type { PortfolioCategory, PortfolioItem } from '@/content/portfolio';
import { filterPortfolio } from '@/features/portfolio/filter-items';
import { useHydrated } from '@/hooks/use-hydrated';

const categories: Array<{ value: PortfolioCategory | 'all'; label: string }> = [
  { value: 'all', label: 'All stories' },
  { value: 'celebrations', label: 'Celebrations' },
  { value: 'weddings', label: 'Weddings' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'gifts', label: 'Gifts' },
];

const tones: Record<string, string> = {
  blush: 'bg-[var(--blush)]',
  ivory: 'bg-[var(--mist)]',
  sage: 'bg-[var(--sage)]/65',
  wine: 'bg-[var(--wine)] text-[var(--mist)]',
};

export function PortfolioFilter({ items }: { items: PortfolioItem[] }) {
  const [category, setCategory] = useState<PortfolioCategory | 'all'>('all');
  const isHydrated = useHydrated();
  const filtered = filterPortfolio(items, category);

  return (
    <div>
      <div
        className="flex snap-x gap-2 overflow-x-auto pb-4"
        aria-label="Filter portfolio stories"
      >
        {categories.map((item) => (
          <button
            key={item.value}
            type="button"
            disabled={!isHydrated}
            aria-pressed={category === item.value}
            onClick={() => setCategory(item.value)}
            className="min-h-11 shrink-0 snap-start border border-[color:var(--border)] px-4 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--wine)] transition-colors aria-pressed:border-[var(--wine)] aria-pressed:bg-[var(--wine)] aria-pressed:text-[var(--mist)]"
          >
            {item.label}
          </button>
        ))}
      </div>

      <output className="mt-5 block text-xs uppercase tracking-[0.15em] text-[var(--mauve)]">
        {filtered.length} {filtered.length === 1 ? 'story' : 'stories'} in view
      </output>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {filtered.map((item, index) => (
          <article
            key={item.slug}
            className={`relative flex min-h-[27rem] flex-col overflow-hidden p-8 sm:p-10 ${tones[item.tone]} ${index % 3 === 0 ? 'md:min-h-[36rem]' : ''}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(252,250,247,0.75),transparent_25%),linear-gradient(145deg,transparent_45%,rgba(74,41,49,0.16))]" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between">
                <p className="eyebrow opacity-65">{item.category}</p>
                <LockKeyhole
                  size={16}
                  strokeWidth={1.3}
                  aria-label="Verified media pending"
                />
              </div>
              <div className="mt-auto pt-28">
                <h2 className="font-display text-4xl leading-[0.92] sm:text-5xl">
                  {item.title}
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-7 opacity-65">
                  {item.summary}
                </p>
                <p className="eyebrow mt-7 opacity-55">
                  Content pending approval
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
