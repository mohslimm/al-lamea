import { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/variants';

const Counter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 50,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US').format(Math.floor(latest)) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} />;
};

export const StatsSection = memo(() => {
  const { t } = useTranslation();

  const stats = [
    { value: 10, suffix: "+", label: t('stats.years') },
    { value: "🇱🇾", label: t('stats.brands') },
    { value: "🚀", label: t('stats.continents') },
    { value: 100, suffix: "%", label: t('stats.commitment') },
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
                {typeof stat.value === 'number' ? (
                  <Counter value={stat.value} suffix={stat.suffix} />
                ) : (
                  <span className="text-4xl md:text-5xl">{stat.value}</span>
                )}
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
