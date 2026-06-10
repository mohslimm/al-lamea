import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Factory, Package, ShieldCheck } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Card } from '@/components/ui/Card';
import { fadeUp, staggerContainer } from '@/lib/variants';
import { LibyaFlagIcon } from '@/components/ui/LibyaFlagIcon';

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
              className="text-3xl md:text-5xl font-display text-[var(--text-primary)] leading-tight mb-12"
            >
              {t('about.title')}
            </motion.h2>

            <motion.div variants={fadeUp} className="mb-10">
              <h3 className="text-2xl font-display text-[var(--gold)] mb-4">{t('about.groupTitle')}</h3>
              <p className="text-[var(--text-muted)] text-lg leading-relaxed">
                {t('about.groupDesc')}
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <h3 className="text-2xl font-display text-[var(--gold)] mb-4">{t('about.whoTitle')}</h3>
              <p className="text-[var(--text-muted)] text-lg leading-relaxed mb-6">
                {t('about.whoDesc')}
              </p>
              <p className="text-[var(--text-primary)] font-medium text-lg leading-relaxed">
                {t('about.pillarsIntro')}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] md:aspect-[16/7] lg:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center"
          >
            <img src="/infrastructure_premium.png" alt="Automotive Care" width="800" height="400" className="w-full h-full object-cover object-[center_center] opacity-90 mix-blend-lighten" loading="lazy" decoding="async" />
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
            <motion.div key={idx} variants={fadeUp} className="h-full">
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

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12 mt-24 mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.07)] backdrop-blur-md rounded-2xl p-10 relative overflow-hidden h-full"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)] opacity-5 rounded-full blur-3xl" />
             <motion.h3 variants={fadeUp} className="text-3xl font-display text-[var(--text-primary)] mb-6 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-[var(--gold)]"></span>
                {t('about.visionTitle')}
             </motion.h3>
             <motion.p variants={fadeUp} className="text-[var(--text-muted)] text-lg leading-relaxed relative z-10">
                {t('about.vision')}
             </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.07)] backdrop-blur-md rounded-2xl p-10 relative overflow-hidden h-full"
          >
             <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--gold)] opacity-5 rounded-full blur-3xl" />
             <motion.h3 variants={fadeUp} className="text-3xl font-display text-[var(--text-primary)] mb-6 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-[var(--gold)]"></span>
                {t('about.missionTitle')}
             </motion.h3>
             <motion.p variants={fadeUp} className="text-[var(--text-muted)] text-lg leading-relaxed relative z-10">
                {t('about.mission')}
             </motion.p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mt-12"
        >
          <motion.h3 variants={fadeUp} className="text-3xl md:text-4xl font-display text-[var(--text-primary)] text-center mb-12">
            {t('about.valuesTitle')}
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { key: 'quality', icon: '🏅' },
              { key: 'innovation', icon: '💡' },
              { key: 'reliability', icon: '🔒' },
              { key: 'partnership', icon: '🤝' },
              { key: 'development', icon: <LibyaFlagIcon className="w-5 h-auto" /> }
            ].map((val) => (
              <motion.div 
                key={val.key} 
                variants={fadeUp}
                className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-full px-6 py-3 flex items-center gap-3 shadow-lg hover:border-[var(--border-gold)] transition-colors duration-300 cursor-default"
              >
                <span className="text-xl">{val.icon}</span>
                <span className="text-[var(--text-primary)] font-medium">{t(`about.values.${val.key}`)}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
