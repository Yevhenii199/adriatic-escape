import { useLanguage } from '@/lib/LanguageContext';
import { MessageCircle } from 'lucide-react';
import heroImage from '@/assets/hero-montenegro.jpg';

const WHATSAPP_NUMBER = '38269123456';

const HeroSection = () => {
  const { t } = useLanguage();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('contact_whatsapp_message'))}`;

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <img
        src={heroImage}
        alt="Montenegro coastline with turquoise water and stone buildings"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/50 via-foreground/30 to-foreground/60" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
          {t('hero_title')}
        </h1>
        <p className="font-body text-lg md:text-xl text-primary-foreground/85 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t('hero_subtitle')}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold text-lg px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          <MessageCircle size={22} />
          {t('hero_cta')}
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
