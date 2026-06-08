import { memo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';

interface HybridLoaderProps {
  onComplete: () => void;
}

export const HybridLoader = memo(({ onComplete }: HybridLoaderProps) => {
  const { i18n } = useTranslation();
  const logoSrc = i18n.language === 'ar' ? '/logo-ar.png?v=5' : '/logo.png?v=5';
  
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReduced) {
      // Instant complete for accessibility
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }

    // GSAP Timeline Context for clean unmounting
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        }
      });

      // 1. Entrance Sequence
      tl.fromTo(
        logoRef.current,
        { 
          opacity: 0, 
          scale: 1.15,
          filter: 'blur(24px)'
        },
        { 
          opacity: 1, 
          scale: 1, 
          filter: 'blur(0px)',
          duration: 1.6, 
          ease: 'power3.inOut' 
        }
      )
      // Glow pulse synchronized with logo appearance
      .fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 0.6, scale: 1.2, duration: 1.6, ease: 'power2.out' },
        "<" // start same time
      )
      
      // 2. The Suspense Pause (subtle organic breathing)
      .to(logoRef.current, {
        scale: 0.98,
        duration: 0.8,
        ease: 'power1.inOut'
      })
      .to(glowRef.current, {
        opacity: 0.3,
        scale: 1,
        duration: 0.8,
        ease: 'power1.inOut'
      }, "<")

      // 3. The Cinematic Exit Burst
      .to(logoRef.current, {
        opacity: 0,
        scale: 1.4,
        filter: 'blur(12px)',
        duration: 0.7,
        ease: 'power4.in'
      })
      .to(glowRef.current, {
        opacity: 0,
        scale: 1.8,
        duration: 0.6,
        ease: 'power3.in'
      }, "<");

    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP animations to prevent memory leaks
  }, [onComplete]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--bg-void)] overflow-hidden"
    >
      {/* Background Cinematic Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Central Composition */}
      <div className="relative flex items-center justify-center w-full max-w-md px-6">
        {/* Soft Radial Gold Glow */}
        <div 
          ref={glowRef}
          className="absolute w-[200%] aspect-square rounded-full bg-[var(--gold)] opacity-0 mix-blend-screen pointer-events-none blur-[80px]"
          style={{ transform: 'translate3d(0,0,0)' }}
        />

        {/* The Premium Logo */}
        <img 
          ref={logoRef}
          src={logoSrc} 
          alt="AL LAMEA Loading" 
          className="relative z-10 w-full h-auto max-w-[400px] object-contain"
          style={{ willChange: 'transform, opacity, filter' }}
        />
      </div>
    </motion.div>
  );
});

HybridLoader.displayName = 'HybridLoader';
