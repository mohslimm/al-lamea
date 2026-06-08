import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { fadeUp, staggerContainer } from '@/lib/variants';
import type { NewsItem } from '@/types';

// Placeholder Data
const NEWS: NewsItem[] = [];

export const NewsSection = memo(() => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section id="news" className="py-24 md:py-32 bg-[var(--bg-void)]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t('news.badge')}</SectionLabel>
          </motion.div>
          <motion.h2 
            variants={fadeUp}
            className="text-3xl md:text-5xl font-display text-[var(--text-primary)] mb-6"
          >
            {t('news.title')}
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[var(--text-muted)] text-lg max-w-3xl leading-relaxed">
            {t('news.desc')}
          </motion.p>
        </motion.div>

        {NEWS.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {NEWS.map((item) => (
              <motion.div key={item.id} variants={fadeUp}>
                <Card className="h-full group hover:-translate-y-2 transition-transform duration-500 cursor-default">
                  <div className="p-8 flex flex-col h-full relative">
                    {/* Hover Left Line */}
                    <div className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-[var(--gold)] to-[var(--gold-light)] group-hover:h-full transition-all duration-500 ease-out rtl:left-auto rtl:right-0" />
                    
                    <div className="flex justify-between items-start mb-6">
                      <Badge variant="gold" className="text-[10px]">
                        {isRTL ? item.categoryAR : item.category}
                      </Badge>
                      <span className="font-mono text-[var(--text-muted)] text-sm">
                        {item.date}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-display text-[var(--text-primary)] mb-4">
                      {isRTL ? item.titleAR : item.title}
                    </h3>
                    
                    <p className="text-[var(--text-muted)] leading-relaxed flex-grow mb-8">
                      {isRTL ? item.excerptAR : item.excerpt}
                    </p>

                    <div className="mt-auto">
                      <span className="text-[var(--text-muted)] opacity-50 text-sm font-medium">
                        {t('common.comingSoon')} →
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl mx-auto border-2 border-dashed border-[var(--border-subtle)] rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[var(--gold-glow)] opacity-5 pointer-events-none" />
            <span className="text-2xl text-[var(--text-muted)] mb-2 font-display">
              {t('common.comingSoon')}
            </span>
          </motion.div>
        )}

      </div>
    </section>
  );
});

NewsSection.displayName = 'NewsSection';
