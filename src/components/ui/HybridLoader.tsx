import { memo, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';

// Configuration Object for easy timing tweaks
const ANIMATION_CONFIG = {
  entranceDuration: 1.5,
  revealDuration: 1.6,
  textStagger: 0.04,
  suspenseDuration: 1.2,
  exitDuration: 0.8
};

interface HybridLoaderProps {
  onComplete: () => void;
}

export const HybridLoader = memo(({ onComplete }: HybridLoaderProps) => {
  const { i18n } = useTranslation();
  const [videoReady, setVideoReady] = useState(false);
  const logoSrc = i18n.language === 'ar' ? '/logo-ar.png?v=5' : '/logo.png?v=5';

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Accessibility Check
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !videoReady) return;

    // 2. GSAP Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete });
      const textChars = textRef.current?.querySelectorAll('.char');

      // Initial States
      tl.set(logoRef.current, { scale: 1.15, opacity: 0, filter: 'blur(12px)' })
        .set(overlayRef.current, { opacity: 1 })
        .set(videoRef.current, { opacity: 0, scale: 1.05 })

        // Entrance Sequence
        .to(videoRef.current, { opacity: 0.6, scale: 1, duration: ANIMATION_CONFIG.entranceDuration, ease: 'power2.out' })
        .to(overlayRef.current, { opacity: 0.5, duration: ANIMATION_CONFIG.entranceDuration, ease: 'power2.out' }, "<")
        .to(logoRef.current, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: ANIMATION_CONFIG.revealDuration, ease: 'expo.out' }, "-=1.0")
        .fromTo(textChars || [],
          { opacity: 0, y: 15, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: ANIMATION_CONFIG.textStagger, ease: 'power3.out' },
          "-=1.0"
        )

        // Suspense
        .to(logoRef.current, { scale: 0.98, duration: ANIMATION_CONFIG.suspenseDuration, ease: 'power1.inOut', yoyo: true, repeat: 1 }, "+=0.2")

        // Exit Sequence
        .to([logoRef.current, textRef.current, videoRef.current], { opacity: 0, scale: 1.2, filter: 'blur(15px)', duration: ANIMATION_CONFIG.exitDuration, ease: 'power4.in' }, "+=0.2")
        .to(overlayRef.current, { opacity: 1, duration: ANIMATION_CONFIG.exitDuration, ease: 'power3.in' }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete, videoReady]);

  // Handle video loading
  const handleVideoLoad = () => setVideoReady(true);

  const subtitleText = i18n.language === 'ar' ? 'اللمعـة للكيماويات' : 'PREMIUM CAR CARE PRODUCT';

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-void)] overflow-hidden"
    >
      <video
        ref={videoRef}
        src="/preloader-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={handleVideoLoad} // Trigger animation only when ready
        className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105"
      />

      <div ref={overlayRef} className="absolute inset-0 bg-[var(--bg-void)] mix-blend-multiply opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-void)] via-transparent to-[var(--bg-void)] opacity-80 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl px-6 gap-10">
        <div className="absolute w-[180%] aspect-square rounded-full bg-[var(--gold)] opacity-5 mix-blend-screen pointer-events-none blur-[120px]" />

        <img
          ref={logoRef}
          src={logoSrc}
          alt="AL LAMEA Loading"
          className="w-full h-auto max-w-[360px] object-contain opacity-0"
          style={{ willChange: 'transform, opacity, filter' }}
        />

        <div ref={textRef} className="flex flex-wrap justify-center font-display text-[var(--gold)] tracking-[0.25em] uppercase text-xs md:text-sm opacity-90 drop-shadow-lg">
          {subtitleText.split('').map((char, index) => (
            <span key={index} className={`char inline-block ${char === ' ' ? 'w-3' : ''}`} style={{ opacity: 0, willChange: 'transform, opacity' }}>
              {char}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

HybridLoader.displayName = 'HybridLoader';