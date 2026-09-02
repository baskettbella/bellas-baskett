import { cn } from '@/lib/utils';

export function FloralMark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute size-80 rounded-full opacity-30 blur-3xl',
        className,
      )}
      style={{
        background:
          'radial-gradient(ellipse at 35% 35%, var(--rose), transparent 34%), radial-gradient(ellipse at 68% 48%, var(--sage), transparent 29%), radial-gradient(ellipse at 50% 78%, var(--blush), transparent 32%)',
      }}
    />
  );
}
