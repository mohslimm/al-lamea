import { memo } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'default';
  children: React.ReactNode;
}

export const Badge = memo(({ variant = 'default', children, className, ...props }: BadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.1em]",
        variant === 'gold' && "bg-[var(--gold-glow)] text-[var(--gold)] border border-[var(--border-gold)]",
        variant === 'default' && "bg-[var(--border-subtle)] text-[var(--text-muted)]",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
