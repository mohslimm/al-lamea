import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { fadeUp, staggerContainer } from '@/lib/variants';
import type { NewsItem } from '@/types';

// Placeholder Data
const NEWS: NewsItem[] = [
  {
    id: '1',
    category: 'Partnership',
    categoryAR: 'شراكة',
    title: 'New International Partnership Announced',
    titleAR: 'إعلان عن شراكة دولية جديدة',
    excerpt: 'AL LAMEA strengthens its global network with a new exclusive agreement...',
    excerptAR: 'تعزز اللامع شبكتها العالمية باتفاقية حصرية جديدة...',
    date: '2025',
    status: 'coming-soon'
  },
  {
    id: '2',
    category: 'Expansion',
    categoryAR: 'توسع',
    title: 'Local Production Capacity Increased',
    titleAR: 'زيادة الطاقة الإنتاجية المحلية',
    excerpt: 'To meet growing demand, our Libyan manufacturing facility has been upgraded...',
    excerptAR: 'لتلبية الطلب المتزايد، تم تحديث منشأة التصنيع الليبية لدينا...',
    date: '2025',
    status: 'coming-soon'
  }
];

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
            <SectionLabel>Latest Updates</SectionLabel>
          </motion.div>
          <motion.h2 
            variants={fadeUp}
            className="text-3xl md:text-5xl font-display text-[var(--text-primary)]"
          >
            News & Insights
          </motion.h2>
        </motion.div>

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

      </div>
    </section>
  );
});

NewsSection.displayName = 'NewsSection';
