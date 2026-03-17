import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { Lang } from '@/lib/i18n';
import { Menu, X } from 'lucide-react';

const languages: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'sr', label: 'SR' },
];

const SiteHeader = () => {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#amenities', label: t('nav_amenities') },
    { href: '#gallery', label: t('nav_gallery') },
    { href: '#contact', label: t('nav_contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className={`font-display text-xl font-semibold transition-colors ${scrolled ? 'text-primary' : 'text-primary-foreground'}`}>
          Montenegro Seaside
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-body text-sm font-medium transition-colors hover:text-accent ${
                scrolled ? 'text-foreground' : 'text-primary-foreground'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-1 ml-4">
            {languages.map((l, i) => (
              <span key={l.code} className="flex items-center">
                <button
                  onClick={() => setLang(l.code)}
                  className={`text-sm font-medium px-1.5 py-0.5 rounded transition-all ${
                    lang === l.code
                      ? 'bg-primary text-primary-foreground'
                      : scrolled
                      ? 'text-muted-foreground hover:text-foreground'
                      : 'text-primary-foreground/70 hover:text-primary-foreground'
                  }`}
                >
                  {l.label}
                </button>
                {i < languages.length - 1 && (
                  <span className={`mx-0.5 ${scrolled ? 'text-border' : 'text-primary-foreground/30'}`}>|</span>
                )}
              </span>
            ))}
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`md:hidden ${scrolled ? 'text-foreground' : 'text-primary-foreground'}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border">
          <nav className="flex flex-col items-center gap-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground font-body text-base font-medium"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2 mt-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setMobileOpen(false); }}
                  className={`text-sm font-medium px-2 py-1 rounded transition-all ${
                    lang === l.code
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
