import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { fadeUp, staggerContainer } from '@/lib/variants';

export const HeroSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-[180px] md:pt-[240px] pb-20 overflow-hidden">

      {/* Background image — Ken Burns zoom */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
        style={{ willChange: 'transform' }}
      >
        <img
          src="/hero-bg.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Blur layer */}
      <div className="absolute inset-0 z-[1] backdrop-blur-[2px]" />

      {/* Dark overlay — low opacity */}
      <div className="absolute inset-0 z-[2] bg-black/60" />
      
      {/* Rotating Hexagon */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 120, ease: "linear", repeat: Infinity }}
        className="absolute w-[800px] h-[800px] border border-[var(--border-subtle)] opacity-20 pointer-events-none rounded-full z-[3]"
      />

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center flex flex-col items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="inline-block border border-[var(--border-gold)] bg-[var(--bg-surface)] px-4 py-1.5 rounded-full text-[var(--gold)] text-xs tracking-[0.2em] font-medium uppercase">
              {t('hero.badge')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={fadeUp}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-medium text-[var(--text-primary)] leading-[1.1] mb-8 max-w-4xl"
          >
            {t('hero.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={fadeUp}
            className="text-lg md:text-xl text-[var(--text-muted)] tracking-widest font-light uppercase mb-12"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-16 md:mt-24"
          >
            <motion.a 
              href="#stats"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors inline-block"
              aria-label="Scroll down"
            >
              <ChevronDown className="w-8 h-8" />
            </motion.a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
