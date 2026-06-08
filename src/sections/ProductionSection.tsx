import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Banknote, Users, Globe2 } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { fadeUp, staggerContainer } from '@/lib/variants';

export const ProductionSection = memo(() => {
  const { t } = useTranslation();

  const benefits = [
    {
      icon: <Banknote className="w-5 h-5 text-[var(--gold)]" />,
      title: t('production.pricing'),
      desc: t('production.pricingDesc'),
    },
    {
      icon: <Users className="w-5 h-5 text-[var(--gold)]" />,
      title: t('production.jobs'),
      desc: t('production.jobsDesc'),
    },
    {
      icon: <Globe2 className="w-5 h-5 text-[var(--gold)]" />,
      title: t('production.hub'),
      desc: t('production.hubDesc'),
    }
  ];

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
            className="lg:w-[40%] flex flex-col gap-8 w-full"
          >
            <motion.h3 variants={fadeUp} className="text-2xl font-display text-[var(--gold)] mb-2">
              {t('production.goalsTitle')}
            </motion.h3>
            {benefits.map((benefit, idx) => (
              <motion.div key={idx} variants={fadeUp} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--bg-surface)] border border-[var(--border-gold)] flex items-center justify-center">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-display text-[var(--text-primary)] mb-2">{benefit.title}</h3>
                  <p className="text-[var(--text-muted)]">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
});

ProductionSection.displayName = 'ProductionSection';
