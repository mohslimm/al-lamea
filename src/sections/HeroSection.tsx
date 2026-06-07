import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { fadeUp, staggerContainer } from '@/lib/variants';

export const HeroSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-[100px] overflow-hidden">
      
      {/* Rotating Hexagon */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 120, ease: "linear", repeat: Infinity }}
        className="absolute w-[800px] h-[800px] border border-[var(--border-subtle)] opacity-20 pointer-events-none rounded-full"
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

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a href="#products" className="w-full sm:w-auto">
              <Button className="w-full">{t('hero.ctaPrimary')}</Button>
            </a>
            <a href="#distributor" className="w-full sm:w-auto">
              <Button variant="ghost" className="w-full">{t('hero.ctaSecondary')}</Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
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
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
