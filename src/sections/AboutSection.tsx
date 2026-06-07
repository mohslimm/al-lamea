import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Factory, Package, ShieldCheck } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Card } from '@/components/ui/Card';
import { fadeUp, staggerContainer } from '@/lib/variants';

export const AboutSection = memo(() => {
  const { t } = useTranslation();

  const pillars = [
    {
      icon: <Factory className="w-6 h-6 text-[var(--gold)]" />,
      title: t('about.pillars.production'),
      desc: t('about.pillars.productionDesc')
    },
    {
      icon: <Package className="w-6 h-6 text-[var(--gold)]" />,
      title: t('about.pillars.importation'),
      desc: t('about.pillars.importationDesc')
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[var(--gold)]" />,
      title: t('about.pillars.representation'),
      desc: t('about.pillars.representationDesc')
    }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[var(--bg-void)]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Intro */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t('nav.about')}</SectionLabel>
            </motion.div>
            <motion.h2 
              variants={fadeUp}
              className="text-3xl md:text-5xl font-display text-[var(--text-primary)] leading-tight mb-8"
            >
              Building the Future of Automotive Care in Libya
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[var(--text-muted)] text-lg leading-relaxed mb-6">
              AL LAMEA is an integral part of the AL TARIQ AL LAMEA GROUP, standing as a pillar of automotive excellence in Libya for over a decade. We specialize in the importation, local production, and exclusive distribution of premium automotive care products.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[var(--text-muted)] text-lg leading-relaxed">
              Our commitment goes beyond simply selling products; we provide comprehensive solutions that empower petrol stations, garages, and retailers across the nation.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] w-full rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center"
          >
            <img src="/about-image.png" alt="Automotive Care" width="800" height="400" className="w-full h-full object-cover opacity-80 mix-blend-lighten" />
          </motion.div>
        </div>

        {/* 3 Pillars - FRESSO Style */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8"
        >
          {pillars.map((pillar, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              <Card className="p-8 h-full flex flex-col items-start hover:border-[var(--border-gold)] transition-colors duration-500">
                <div className="w-12 h-12 rounded-full bg-[var(--gold-glow)] flex items-center justify-center mb-6">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-display text-[var(--text-primary)] mb-4">{pillar.title}</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">{pillar.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
