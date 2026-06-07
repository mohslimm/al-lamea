import { memo } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card = memo(({ children, className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.07)] backdrop-blur-md overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
