import { useEffect, Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { TickerBar } from './components/TickerBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { HeroSection } from './sections/HeroSection';
import { StatsSection } from './sections/StatsSection';
import { AboutSection } from './sections/AboutSection';

// Lazy loading below the fold components
const ProductsSection = lazy(() => import('./sections/ProductsSection').then(m => ({ default: m.ProductsSection })));
const BrandSection = lazy(() => import('./sections/BrandSection').then(m => ({ default: m.BrandSection })));
const ProductionSection = lazy(() => import('./sections/ProductionSection').then(m => ({ default: m.ProductionSection })));
const NewsSection = lazy(() => import('./sections/NewsSection').then(m => ({ default: m.NewsSection })));
const DistributorSection = lazy(() => import('./sections/DistributorSection').then(m => ({ default: m.DistributorSection })));
const ContactSection = lazy(() => import('./sections/ContactSection').then(m => ({ default: m.ContactSection })));

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Initial setup
    const isRTL = i18n.language === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      <CustomCursor />
      <TickerBar />
      <Header />
      
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        
        <Suspense fallback={<div className="h-screen flex items-center justify-center bg-[var(--bg-void)] text-[var(--gold)]">Loading...</div>}>
          <ProductsSection />
          <BrandSection />
          <ProductionSection />
          <NewsSection />
          <DistributorSection />
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default App;
