import { LanguageProvider } from '@/lib/LanguageContext';
import SiteHeader from '@/components/SiteHeader';
import HeroSection from '@/components/HeroSection';
import AmenitiesSection from '@/components/AmenitiesSection';
import GallerySection from '@/components/GallerySection';
import ContactSection from '@/components/ContactSection';
import SiteFooter from '@/components/SiteFooter';

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <SiteHeader />
        <HeroSection />
        <AmenitiesSection />
        <GallerySection />
        <ContactSection />
        <SiteFooter />
      </div>
    </LanguageProvider>
  );
};

export default Index;
