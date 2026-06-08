import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { fadeUp, staggerContainer } from '@/lib/variants';
import { Laptop, Wrench } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const FutureSection = memo(() => {
  const { t } = useTranslation();

  const innovations = [
    {
      icon: <Laptop className="w-5 h-5" />,
      title: t('future.portalTitle'),
      desc: t('future.portalDesc'),
      image: '/portal_preview.png',
      status: t('common.comingSoon', 'Coming Soon')
    }
  ];

  return (
    <section id="innovations" className="py-24 md:py-32 bg-[var(--bg-void)] border-t border-[var(--border-subtle)] relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <SectionLabel>{t('future.badge')}</SectionLabel>
          </motion.div>
          <motion.h2 
            variants={fadeUp}
            className="text-3xl md:text-5xl font-display text-[var(--text-primary)] mb-6 leading-tight"
          >
            {t('future.title')}
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-8 md:gap-12 max-w-4xl mx-auto">
          {innovations.map((item, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
              className="group relative rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-gold)] transition-all duration-500 flex flex-col"
            >
              <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] to-transparent z-10" />
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-80 mix-blend-lighten group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute top-6 right-6 z-20 rtl:right-auto rtl:left-6">
                  <Badge variant="default" className="bg-[var(--bg-void)]/80 backdrop-blur-md border-[var(--border-gold)] text-[var(--gold-500)] uppercase tracking-wider text-xs font-semibold">
                    {item.status}
                  </Badge>
                </div>
              </div>
              
              <div className="p-8 md:p-10 flex flex-col flex-grow relative z-20 -mt-16">
                <div className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold-500)] mb-6 shadow-xl">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-display text-[var(--text-primary)] mb-4">{item.title}</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

FutureSection.displayName = 'FutureSection';
