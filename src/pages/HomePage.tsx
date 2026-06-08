import { Suspense, lazy } from 'react';
import { HeroSection } from '../sections/HeroSection';
import { StatsSection } from '../sections/StatsSection';
import { AboutSection } from '../sections/AboutSection';

// Lazy loading below the fold components
const ProductsSection = lazy(() => import('../sections/ProductsSection').then(m => ({ default: m.ProductsSection })));
const BrandSection = lazy(() => import('../sections/BrandSection').then(m => ({ default: m.BrandSection })));
const ProductionSection = lazy(() => import('../sections/ProductionSection').then(m => ({ default: m.ProductionSection })));
const FutureSection = lazy(() => import('../sections/FutureSection').then(m => ({ default: m.FutureSection })));
const NewsSection = lazy(() => import('../sections/NewsSection').then(m => ({ default: m.NewsSection })));
const DistributorSection = lazy(() => import('../sections/DistributorSection').then(m => ({ default: m.DistributorSection })));
const ContactSection = lazy(() => import('../sections/ContactSection').then(m => ({ default: m.ContactSection })));

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      
      <Suspense fallback={<div className="h-screen flex items-center justify-center bg-[var(--bg-void)] text-[var(--gold-500)]">Loading...</div>}>
        <ProductsSection />
        <BrandSection />
        <ProductionSection />
        <FutureSection />
        <NewsSection />
        <DistributorSection />
        <ContactSection />
      </Suspense>
    </main>
  );
};
