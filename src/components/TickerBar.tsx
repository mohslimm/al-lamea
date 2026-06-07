import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export const TickerBar = memo(() => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const EN_TEXT = "AL TARIQ AL LAMIAA GROUP  ◆  10+ YEARS IN AUTOMOTIVE  ◆  3 GLOBAL BRANDS  ◆  PARTNERS ON 4 CONTINENTS  ◆  LIBYA'S TRUSTED DISTRIBUTOR  ◆  ";
  const AR_TEXT = "مجموعة الطريق اللامع  ◆  +10 سنوات في قطاع السيارات  ◆  3 علامات عالمية  ◆  شركاء في 4 قارات  ◆  الموزع الموثوق في ليبيا  ◆  ";

  const text = isRTL ? AR_TEXT : EN_TEXT;
  const repeatCount = 6;

  return (
    <div className="fixed top-0 left-0 w-full h-[36px] bg-[var(--gold)] text-[var(--void)] z-50 overflow-hidden flex items-center">
      <div 
        className={cn(
          "flex whitespace-nowrap text-[11px] font-medium tracking-[0.12em] uppercase",
          isRTL ? "animate-marquee-rtl" : "animate-marquee"
        )}
      >
        {Array.from({ length: repeatCount }).map((_, i) => (
          <span key={i} className="px-4">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
});

TickerBar.displayName = 'TickerBar';
