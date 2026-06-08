import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { BrandModal } from '@/components/ui/BrandModal';
import { fadeUp, staggerContainer } from '@/lib/variants';
import { Link } from 'react-router-dom';
import type { Brand } from '@/types';

// Placeholder Data - would come from CMS or props in real app
const BRANDS: Brand[] = [];

export const BrandSection = memo(() => {
  const { t } = useTranslation();
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  return (
    <section id="brands" className="py-24 md:py-32 bg-[var(--bg-void)]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t('nav.brands')}</SectionLabel>
          </motion.div>
          <motion.h2 
            variants={fadeUp}
            className="text-3xl md:text-5xl font-display text-[var(--text-primary)] mb-6"
          >
            {t('brands.title')}
          </motion.h2>
        </motion.div>

        {BRANDS.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {BRANDS.map((brand) => (
              <motion.div key={brand.id} variants={fadeUp}>
                <button
                  onClick={() => setSelectedBrand(brand)}
                  className="group relative w-full h-[140px] rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-[var(--border-gold)] hover:shadow-[0_0_30px_var(--gold-glow)]"
                >
                  {brand.logoUrl ? (
                    <img 
                      src={brand.logoUrl} 
                      alt={brand.name} 
                      width="400"
                      height="400"
                      className="max-w-[80%] max-h-[60%] object-contain opacity-70 group-hover:opacity-100 transition-opacity" 
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <span className="font-display text-2xl tracking-widest uppercase text-[var(--text-primary)] opacity-80 group-hover:opacity-100 transition-opacity">{brand.name}</span>
                      <div className="w-6 h-[1px] bg-[var(--gold)] opacity-40 group-hover:w-12 group-hover:opacity-100 transition-all duration-500 ease-out" />
                    </div>
                  )}
                  
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[var(--gold)] text-sm font-medium">
                      {t('brands.viewPartnership')}
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State / Coming Soon Placeholder */
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl mx-auto border-2 border-dashed border-[var(--border-subtle)] rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[var(--gold-glow)] opacity-5 pointer-events-none" />
            <span className="text-3xl text-[var(--text-muted)] mb-4 font-display">
              {t('brands.comingSoon')}
            </span>
            <Link to="/partnership" className="text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors mt-4 text-lg">
              {t('brands.becomePartner')}
            </Link>
          </motion.div>
        )}

      </div>

      <AnimatePresence>
        <BrandModal 
          isOpen={!!selectedBrand} 
          brand={selectedBrand} 
          onClose={() => setSelectedBrand(null)} 
        />
      </AnimatePresence>
    </section>
  );
});

BrandSection.displayName = 'BrandSection';
