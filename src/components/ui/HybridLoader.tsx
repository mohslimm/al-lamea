import { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';

// Calmer timings for a serious B2B brand
const TIMING = {
  logoFade: 1.2,     // slow, dignified reveal
  lineFade: 0.8,     // thin divider appears
  textFade: 0.6,     // subtitle fades in whole (no letter stagger)
  hold: 0.8,         // moment of stillness
  exit: 0.7,         // gentle fade out
};

interface HybridLoaderProps {
  onComplete: () => void;
}

export const HybridLoader = memo(({ onComplete }: HybridLoaderProps) => {
  const { i18n } = useTranslation();
  const logoSrc = i18n.language === 'ar' ? '/logo-ar.png?v=5' : '/logo.png?v=5';
  const subtitle = i18n.language === 'ar' ? 'اللمعـة للكيماويات' : 'AL TARIQ AL LAMEA GROUP';

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef     = useRef<HTMLImageElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      const t = setTimeout(onComplete, 400);
      return () => clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });

      // 1. Logo — slow elegant fade in (no scale pop, no blur burst)
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: TIMING.logoFade, ease: 'power2.out' }
      )

      // 2. Thin gold divider line grows in from center
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: TIMING.lineFade, ease: 'power3.out', transformOrigin: 'center' },
        '-=0.3'
      )

      // 3. Subtitle fades in as a whole (no stagger — more composed)
      .fromTo(
        textRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: TIMING.textFade, ease: 'power2.out' },
        '-=0.3'
      )

      // 4. Hold — moment of stillness
      .to({}, { duration: TIMING.hold })

      // 5. Exit — entire loader fades out gently
      .to(
        containerRef.current,
        { opacity: 0, duration: TIMING.exit, ease: 'power1.inOut' }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-void)] overflow-hidden"
    >
      {/* Very subtle background glow — not distracting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,160,89,0.04)_0%,transparent_70%)] pointer-events-none" />

      {/* Centered content — compact, clean */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-8">

        {/* Logo */}
        <img
          ref={logoRef}
          src={logoSrc}
          alt="AL LAMEA"
          className="h-24 md:h-28 w-auto object-contain"
          style={{ opacity: 0, willChange: 'opacity, transform' }}
        />

        {/* Thin gold divider */}
        <div
          ref={lineRef}
          className="w-16 h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
          style={{ transform: 'scaleX(0)', willChange: 'transform' }}
        />

        {/* Subtitle — one line, no letter animation */}
        <div
          ref={textRef}
          className="text-[var(--text-muted)] text-[10px] tracking-[0.3em] uppercase font-light"
          style={{ opacity: 0, willChange: 'opacity, transform' }}
        >
          {subtitle}
        </div>

      </div>
    </motion.div>
  );
});

HybridLoader.displayName = 'HybridLoader';