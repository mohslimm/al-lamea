import { memo } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  interactive?: boolean;
}

export const Card = memo(({ children, className, interactive = false, ...props }: CardProps) => {
  return (
    <motion.div
      whileHover={interactive ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative rounded-xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] backdrop-blur-md transition-colors duration-500",
        interactive && "cursor-pointer hover:border-[rgba(197,160,89,0.4)] hover:shadow-[0_8px_30px_rgba(197,160,89,0.05)]",
        className
      )}
      {...props}
    >
      {/* Glow layer that only appears on hover if interactive */}
      {interactive && (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-glow)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
});

Card.displayName = 'Card';
