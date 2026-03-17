import { useLanguage } from '@/lib/LanguageContext';
import { MessageCircle, MapPin } from 'lucide-react';

const WHATSAPP_NUMBER = '38269123456';

const ContactSection = () => {
  const { t } = useLanguage();

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t('contact_whatsapp_message'))}`;

  return (
    <section id="contact" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-4">
          {t('contact_title')}
        </h2>
        <p className="font-body text-muted-foreground text-center text-lg mb-12 max-w-2xl mx-auto">
          {t('contact_subtitle')}
        </p>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2 rounded-xl overflow-hidden shadow-sm aspect-[16/10]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d94266.77378709988!2d18.7!3d42.29!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134c3272b6ae33f5%3A0x5f8e3b9c3b0e6e6e!2sBudva%2C%20Montenegro!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'saturate(0.8) contrast(1.1)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Apartment location in Montenegro"
            />
          </div>

          {/* Contact card */}
          <div className="bg-background rounded-xl p-8 flex flex-col justify-center items-center text-center shadow-sm">
            <MapPin className="text-accent mb-4" size={36} strokeWidth={1.5} />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">Budva, Montenegro</h3>
            <p className="font-body text-muted-foreground text-sm mb-8 leading-relaxed">
              Mediteranska bb, 85310 Budva
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-md w-full justify-center"
            >
              <MessageCircle size={20} />
              {t('contact_cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
