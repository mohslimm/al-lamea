import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { PartnershipForm } from '@/components/modules/PartnershipForm';
import { fadeUp } from '@/lib/variants';

export const PartnershipPage = memo(() => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg-void)] pt-32 pb-24 relative overflow-hidden flex flex-col">
      {/* Editorial Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[var(--gold-glow)] opacity-10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 relative z-10 flex-1 flex flex-col">
        {/* Header Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-gold)] bg-[var(--gold-glow)] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
            <span className="text-[var(--gold)] text-xs font-medium tracking-widest uppercase">
              Application Portal
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display text-[var(--text-primary)] mb-6 leading-tight">
            {t('partnership.heroTitle')}
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-muted)] font-light max-w-2xl mx-auto">
            {t('partnership.heroSubtitle')}
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 w-full flex items-center justify-center"
        >
          <PartnershipForm />
        </motion.div>
      </div>
    </main>
  );
});

PartnershipPage.displayName = 'PartnershipPage';
