import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Handshake, Box, Trophy } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { fadeUp, staggerContainer } from '@/lib/variants';

export const DistributorSection = memo(() => {
  const { t } = useTranslation();

  const features = [
    { icon: <Handshake className="w-8 h-8" />, label: t('distributor.perks.exclusive') },
    { icon: <Box className="w-8 h-8" />, label: t('distributor.perks.coverage') },
    { icon: <Trophy className="w-8 h-8" />, label: t('distributor.perks.expertise') }
  ];

  return (
    <section id="distributor" className="py-24 md:py-32 bg-[var(--bg-void)] relative overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t('distributor.label')}</SectionLabel>
          </motion.div>
          
          <motion.h2 
            variants={fadeUp}
            className="text-4xl md:text-6xl font-display text-[var(--text-primary)] mb-8 leading-tight"
          >
            {t('distributor.title')}
          </motion.h2>

          <motion.p 
            variants={fadeUp}
            className="text-lg md:text-xl text-[var(--text-muted)] leading-relaxed mb-16 max-w-2xl"
          >
            {t('distributor.desc')}
          </motion.p>

          <motion.div 
            variants={fadeUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-16"
          >
            {features.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center gap-4 text-[var(--text-muted)]">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold)]">
                  {feature.icon}
                </div>
                <span className="font-medium text-sm tracking-wide uppercase">{feature.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <a href="#contact" target="_blank" rel="noopener noreferrer">
              <Button className="text-lg px-8 py-4 h-auto">{t('distributor.cta')}</Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

DistributorSection.displayName = 'DistributorSection';
