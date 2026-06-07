import { memo } from 'react';
import { cn } from '@/lib/utils';

export interface SectionLabelProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const SectionLabel = memo(({ children, className, ...props }: SectionLabelProps) => {
  return (
    <h3
      className={cn(
        "text-[var(--gold)] text-sm tracking-[0.15em] uppercase mb-4",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
});

SectionLabel.displayName = 'SectionLabel';
