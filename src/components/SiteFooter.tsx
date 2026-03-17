import { useLanguage } from '@/lib/LanguageContext';

const SiteFooter = () => {
  const { t } = useLanguage();

  return (
    <footer className="py-8 bg-foreground">
      <div className="container mx-auto px-6 text-center">
        <p className="font-body text-sm text-primary-foreground/60">{t('footer_text')}</p>
      </div>
    </footer>
  );
};

export default SiteFooter;
