import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Button } from '@/components/ui/Button';
import { fadeUp, staggerContainer } from '@/lib/variants';

export const ProductsSection = memo(() => {
  const { t } = useTranslation();

  const products = [
    {
      title: t('products.wash'),
      desc: t('products.washDesc'),
    },
    {
      title: t('products.fluids'),
      desc: t('products.fluidsDesc'),
    },
    {
      title: t('products.protection'),
      desc: t('products.protectionDesc'),
    }
  ];

  return (
    <section id="products" className="py-24 md:py-32 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-6 max-w-7xl">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-16 text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{t('nav.products')}</SectionLabel>
          </motion.div>
          <motion.h2 
            variants={fadeUp}
            className="text-3xl md:text-5xl font-display text-[var(--text-primary)]"
          >
            Engineered for Excellence
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 mb-20"
        >
          {products.map((product, idx) => (
            <motion.div key={idx} variants={fadeUp}>
              <div className="group relative rounded-xl bg-[rgba(255,255,255,0.035)] border border-[rgba(255,255,255,0.07)] backdrop-blur-md overflow-hidden p-8 h-full transition-transform duration-500 hover:-translate-y-2">
                {/* Hover Gold Line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] w-0 group-hover:w-full transition-all duration-500 ease-out rtl:left-auto rtl:right-0" />
                
                <h3 className="text-2xl font-display text-[var(--text-primary)] mb-4">{product.title}</h3>
                <p className="text-[var(--text-muted)] leading-relaxed">{product.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Catalogue CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex justify-center"
        >
          <div className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-2xl p-8 md:p-12 text-center w-full max-w-3xl flex flex-col items-center">
            <FileText className="w-12 h-12 text-[var(--gold)] mb-6" />
            <h3 className="text-2xl md:text-3xl font-display text-[var(--text-primary)] mb-8">
              {t('catalogue.download')}
            </h3>
            <Button 
              onClick={() => alert(t('common.comingSoon'))}
              className="min-w-[250px]"
            >
              Download PDF
            </Button>
          </div>
        </motion.div>

      </div>
    </section>
  );
});

ProductsSection.displayName = 'ProductsSection';
