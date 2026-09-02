import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'centre';
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn('max-w-3xl', align === 'centre' && 'mx-auto text-center')}
    >
      <p
        className={cn(
          'eyebrow text-[var(--mauve)]',
          light && 'text-[var(--champagne)]',
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          'font-display mt-4 text-[clamp(2.75rem,6vw,5.8rem)] font-medium leading-[0.9] tracking-[-0.03em] text-[var(--wine)]',
          light && 'text-[var(--mist)]',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-6 max-w-2xl text-sm leading-7 text-[var(--mauve)] sm:text-base',
            align === 'centre' && 'mx-auto',
            light && 'text-white/80',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
