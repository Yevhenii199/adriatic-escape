import { useLanguage } from '@/lib/LanguageContext';
import { Wifi, AirVent, Car, Mountain, CookingPot, WashingMachine, Fence, Flame } from 'lucide-react';

const amenities = [
  { icon: Wifi, nameKey: 'amenities_wifi', descKey: 'amenities_wifi_desc' },
  { icon: AirVent, nameKey: 'amenities_ac', descKey: 'amenities_ac_desc' },
  { icon: Car, nameKey: 'amenities_parking', descKey: 'amenities_parking_desc' },
  { icon: Mountain, nameKey: 'amenities_sea', descKey: 'amenities_sea_desc' },
  { icon: CookingPot, nameKey: 'amenities_kitchen', descKey: 'amenities_kitchen_desc' },
  { icon: WashingMachine, nameKey: 'amenities_washer', descKey: 'amenities_washer_desc' },
  { icon: Fence, nameKey: 'amenities_balcony', descKey: 'amenities_balcony_desc' },
  { icon: Droplets, nameKey: 'amenities_pool', descKey: 'amenities_pool_desc' },
];

const AmenitiesSection = () => {
  const { t } = useLanguage();

  return (
    <section id="amenities" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-16">
          {t('amenities_title')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {amenities.map((amenity) => (
            <div
              key={amenity.nameKey}
              className="bg-background rounded-xl p-6 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1"
            >
              <amenity.icon className="mx-auto mb-4 text-accent" size={32} strokeWidth={1.5} />
              <h3 className="font-body font-semibold text-foreground text-sm md:text-base mb-2">
                {t(amenity.nameKey)}
              </h3>
              <p className="font-body text-muted-foreground text-xs md:text-sm leading-relaxed">
                {t(amenity.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
