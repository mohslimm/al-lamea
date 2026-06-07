import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { fadeUp } from '../lib/variants';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'cookies' | 'legal';
}

export const LegalPage = memo(({ type }: LegalPageProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [type]);

  const data = t(`legal.${type}`, { returnObjects: true }) as {
    title: string;
    date: string;
    content: { heading: string; text: string }[];
  };

  return (
    <main className="min-h-screen pt-[120px] pb-24 bg-[var(--bg-void)]">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="text-4xl md:text-5xl font-display text-[var(--gold-500)] mb-4">{data.title}</h1>
          <p className="text-[var(--text-muted)] mb-12 border-b border-[var(--border-subtle)] pb-8">{data.date}</p>

          <div className="space-y-12">
            {data.content.map((section, idx) => (
              <div key={idx} className="prose prose-invert prose-gold max-w-none">
                <h2 className="text-2xl font-display text-[var(--text-primary)] mb-4">{section.heading}</h2>
                <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line">{section.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
});

LegalPage.displayName = 'LegalPage';
