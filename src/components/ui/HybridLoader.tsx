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
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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

      // Split text animation logic
      const textChars = textRef.current?.querySelectorAll('.char');

      // 1. Entrance Sequence
      tl.set(logoRef.current, { scale: 1.15, opacity: 0, filter: 'blur(12px)' })
        .set(overlayRef.current, { opacity: 1 })
        .set(videoRef.current, { opacity: 0, scale: 1.05 })
        
      // Fade in video slowly
      tl.to(videoRef.current, {
        opacity: 0.6,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out'
      })
      // Fade out the solid black overlay slightly
      .to(overlayRef.current, {
        opacity: 0.5,
        duration: 1.5,
        ease: 'power2.out'
      }, "<")
      
      // Reveal the logo (scale down + blur to sharp)
      .to(logoRef.current, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.6,
        ease: 'expo.out'
      }, "-=1.0")
      
      // Staggered text fade-in
      .fromTo(
        textChars || [],
        { opacity: 0, y: 15, filter: 'blur(6px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.04,
          ease: 'power3.out'
        },
        "-=1.0"
      )
      
      // 2. Suspense Pause (let it breathe)
      .to(logoRef.current, {
        scale: 0.98,
        duration: 1.2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 1
      }, "+=0.2")

      // 3. Cinematic Exit Burst
      .to(logoRef.current, {
        opacity: 0,
        scale: 1.4,
        filter: 'blur(15px)',
        duration: 0.8,
        ease: 'power4.in'
      })
      .to(textRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power3.in'
      }, "<")
      .to(videoRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.8,
        ease: 'power3.in'
      }, "<")
      .to(overlayRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: 'power3.in'
      }, "<");

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  // Split text helper for animation
  const subtitleText = i18n.language === 'ar' ? 'اللمعـة للكيماويات' : 'PREMIUM AUTOMOTIVE CARE';

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-void)] overflow-hidden"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        src="/preloader-video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105"
      />
      
      {/* Dark Gradient Overlay to ensure contrast */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-[var(--bg-void)] mix-blend-multiply opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-void)] via-transparent to-[var(--bg-void)] opacity-80 pointer-events-none" />

      {/* Central Composition */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl px-6 gap-10">
        
        {/* Soft Radial Gold Glow behind logo */}
        <div className="absolute w-[180%] aspect-square rounded-full bg-[var(--gold)] opacity-5 mix-blend-screen pointer-events-none blur-[120px]" />

        {/* The Premium Logo */}
        <img 
          ref={logoRef}
          src={logoSrc} 
          alt="AL LAMEA Loading" 
          className="w-full h-auto max-w-[360px] object-contain opacity-0"
          style={{ willChange: 'transform, opacity, filter' }}
        />

        {/* Staggered Subtitle Text */}
        <div 
          ref={textRef}
          className="flex flex-wrap justify-center font-display text-[var(--gold)] tracking-[0.25em] uppercase text-xs md:text-sm opacity-90 drop-shadow-lg"
        >
          {subtitleText.split('').map((char, index) => (
            <span 
              key={index} 
              className={`char inline-block ${char === ' ' ? 'w-3' : ''}`}
              style={{ opacity: 0, willChange: 'transform, opacity' }}
            >
              {char}
            </span>
          ))}
        </div>

      </div>
    </motion.div>
  );
});

HybridLoader.displayName = 'HybridLoader';
