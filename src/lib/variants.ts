import type { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

export const slideInSide = (isRTL: boolean): Variants => ({
  hidden: { opacity: 0, x: isRTL ? 50 : -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
});

export const DURATION = { fast: 0.15, base: 0.3, slow: 0.6, cinematic: 1.2 };
export const EASE = { smooth: [0.22, 1, 0.36, 1], snap: [0.34, 1.56, 0.64, 1] };
