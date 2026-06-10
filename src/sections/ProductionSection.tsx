import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import { SectionLabel } from '@/components/ui/SectionLabel';
import { fadeUp, staggerContainer } from '@/lib/variants';
import { LibyaFlagIcon } from '@/components/ui/LibyaFlagIcon';

export const ProductionSection = memo(() => {
  const { t } = useTranslation();

  return (
    <section id="production" className="py-24 md:py-32 bg-[var(--bg-primary)] border-y border-[var(--border-subtle)] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:w-[60%]"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t('nav.production')}</SectionLabel>
            </motion.div>
            <motion.h2 
              variants={fadeUp}
              className="text-3xl md:text-5xl font-display text-[var(--text-primary)] leading-tight mb-8"
            >
              {t('production.subtitle')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--text-muted)] text-lg leading-relaxed mb-8 max-w-2xl">
              {t('production.desc')}
            </motion.p>

            <motion.div variants={fadeUp} className="relative h-px w-full max-w-md bg-[var(--border-subtle)] overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="lg:w-[40%] w-full"
          >
            <motion.h3 variants={fadeUp} className="text-2xl font-display text-[var(--gold)] mb-8">
              {t('production.goalsTitle')}
            </motion.h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <LibyaFlagIcon className="w-8 h-auto" />, label: t('production.benefits.madeInLibya') },
                { icon: '✅', label: t('production.benefits.quality') },
                { icon: '📦', label: t('production.benefits.supply') },
                { icon: '👷', label: t('production.benefits.jobs') },
              ].map((benefit, idx) => (
                <motion.div key={idx} variants={fadeUp} className="bg-[rgba(255,255,255,0.02)] border border-[var(--border-subtle)] rounded-xl p-4 flex flex-col items-center text-center hover:border-[var(--border-gold)] transition-colors duration-300">
                  <span className="text-3xl mb-3 block">{benefit.icon}</span>
                  <span className="text-[var(--text-primary)] font-medium text-sm">{benefit.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
});

ProductionSection.displayName = 'ProductionSection';
