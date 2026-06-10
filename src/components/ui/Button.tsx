import { memo } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: 'primary' | 'ghost';
  children: React.ReactNode;
}

export const Button = memo(({ variant = 'primary', children, className, ...props }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95, opacity: 0.85 }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold transition-colors duration-300 min-h-[44px]",
        variant === 'primary' && "bg-gradient-to-r from-[#B8924A] via-[var(--gold-500)] to-[#D4B57A] text-[#1A1200] hover:brightness-110 shadow-[0_0_20px_var(--gold-glow)]",
        variant === 'ghost' && "bg-transparent border border-[var(--border-gold)] text-[var(--gold-500)] hover:bg-[var(--gold-glow)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
