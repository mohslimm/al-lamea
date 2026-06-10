import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/variants';
import { LibyaFlagIcon } from '@/components/ui/LibyaFlagIcon';

export const StatsSection = memo(() => {
  const { t } = useTranslation();

  const stats = [
    { value: "🏢", label: t('stats.group') },
    { value: "🛢️", label: t('stats.categories') },
    { value: "🌍", label: t('stats.network') },
    { value: <LibyaFlagIcon className="w-12 md:w-16 h-auto" />, label: t('stats.focus') },
  ];

  return (
    <section id="stats" className="py-20 bg-[var(--bg-primary)] border-t border-b border-[var(--border-subtle)] relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={fadeUp} className="flex flex-col items-center text-center">
              <div className="text-5xl md:text-7xl font-mono text-[var(--gold)] mb-4 h-[1.2em] flex items-center justify-center">
                <span className="text-4xl md:text-5xl">{stat.value}</span>
              </div>
              <p className="text-sm md:text-base text-[var(--text-muted)] font-medium max-w-[200px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

StatsSection.displayName = 'StatsSection';
