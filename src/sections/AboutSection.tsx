import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Factory, Package, ShieldCheck, Target, Eye, Sparkles } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Card } from '@/components/ui/Card';
import { fadeUp, staggerContainer } from '@/lib/variants';

export const AboutSection = memo(() => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

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

  const values = [
    { emoji: '✅', text: t('about.values.quality') },
    { emoji: '🌍', text: t('about.values.standards') },
    { emoji: '🔄', text: t('about.values.innovation') },
    { emoji: '🤝', text: t('about.values.partnerships') },
    { emoji: '🇱🇾', text: t('about.values.development') }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[var(--bg-void)] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--gold-glow)] opacity-20 blur-[150px] pointer-events-none rounded-full" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        {/* Intro Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t('about.badge')}</SectionLabel>
          </motion.div>
          <motion.h2 
            variants={fadeUp}
            className="text-3xl md:text-5xl font-display text-[var(--text-primary)] leading-tight mt-3"
          >
            {t('about.title')}
          </motion.h2>
        </motion.div>

        {/* 1. Our Group & 2. Who is AL LAMIAA */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {/* Card 1: Our Group */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="h-full"
          >
            <motion.div variants={fadeUp} className="h-full">
              <Card className="p-8 md:p-10 h-full flex flex-col justify-between border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)] hover:border-[var(--border-gold)] transition-all duration-500">
                <div>
                  <span className="text-xs tracking-[0.2em] text-[var(--gold)] font-medium uppercase mb-4 block">
                    {isRtl ? "شريك مجموعة راسخة" : "Group Member"}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display text-[var(--text-primary)] mb-6">
                    {t('about.groupTitle')}
                  </h3>
                  <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {t('about.groupDesc')}
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between text-[var(--gold)] text-sm font-medium">
                  <span>AL TARIQ AL LAMIAA GROUP</span>
                  <Sparkles className="w-4 h-4 opacity-50" />
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Card 2: Who is AL LAMIAA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="h-full"
          >
            <motion.div variants={fadeUp} className="h-full">
              <Card className="p-8 md:p-10 h-full flex flex-col border-[var(--border-subtle)] bg-[rgba(255,255,255,0.02)] hover:border-[var(--border-gold)] transition-all duration-500">
                <span className="text-xs tracking-[0.2em] text-[var(--gold)] font-medium uppercase mb-4 block">
                  {isRtl ? "المحاور الإستراتيجية" : "Strategic Subsidiary"}
                </span>
                <h3 className="text-2xl md:text-3xl font-display text-[var(--text-primary)] mb-6">
                  {t('about.whoTitle')}
                </h3>
                <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed mb-6 whitespace-pre-line">
                  {t('about.whoDesc')}
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* 3 Pillars of AL LAMIAA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 mb-28"
        >
          {pillars.map((pillar, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              <Card className="p-8 h-full flex flex-col items-start hover:border-[var(--border-gold)] hover:shadow-[0_10px_30px_rgba(197,160,89,0.03)] transition-all duration-500 bg-[rgba(255,255,255,0.01)]">
                <div className="w-12 h-12 rounded-full bg-[var(--gold-glow)] flex items-center justify-center mb-6 border border-[var(--border-gold)]">
                  {pillar.icon}
                </div>
                <h4 className="text-xl font-display text-[var(--text-primary)] mb-4">{pillar.title}</h4>
                <p className="text-[var(--text-muted)] leading-relaxed text-sm md:text-base">{pillar.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Vision & Mission grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-28">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 md:p-10 h-full border-[var(--border-subtle)] bg-[rgba(255,255,255,0.015)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[var(--gold-glow)] to-transparent opacity-20 pointer-events-none" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[rgba(197,160,89,0.1)] flex items-center justify-center text-[var(--gold)]">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display text-[var(--text-primary)]">{t('about.visionTitle')}</h3>
              </div>
              <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed">
                {t('about.visionDesc')}
              </p>
            </Card>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 md:p-10 h-full border-[var(--border-subtle)] bg-[rgba(255,255,255,0.015)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[var(--gold-glow)] to-transparent opacity-20 pointer-events-none" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-[rgba(197,160,89,0.1)] flex items-center justify-center text-[var(--gold)]">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display text-[var(--text-primary)]">{t('about.missionTitle')}</h3>
              </div>
              <p className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed">
                {t('about.missionDesc')}
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Our Values - Table layout translated into Luxury Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.h3 
            variants={fadeUp}
            className="text-2xl md:text-3xl font-display text-[var(--text-primary)] mb-12"
          >
            {t('about.valuesTitle')}
          </motion.h3>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {values.map((val, idx) => (
              <motion.div key={idx} variants={fadeUp}>
                <Card className="p-6 h-full flex flex-col items-center justify-center text-center bg-[rgba(255,255,255,0.01)] hover:bg-[rgba(255,255,255,0.03)] border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-all duration-300">
                  <span className="text-3xl md:text-4xl mb-4 block filter drop-shadow-md">{val.emoji}</span>
                  <span className="text-sm md:text-base font-medium text-[var(--text-primary)] leading-snug">
                    {val.text}
                  </span>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
