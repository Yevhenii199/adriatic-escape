import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';

const images = [
  { src: gallery1, alt: 'Living room with sea view' },
  { src: gallery2, alt: 'Bedroom with balcony' },
  { src: gallery3, alt: 'Modern bathroom' },
  { src: gallery4, alt: 'Balcony with sea view' },
  { src: gallery5, alt: 'Fully equipped kitchen' },
  { src: gallery6, alt: 'Swimming pool area' },
];

const GallerySection = () => {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <section id="gallery" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground text-center mb-16">
          {t('gallery_title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className="overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            <X size={32} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 md:left-8 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <ChevronLeft size={40} />
          </button>
          <img
            src={images[lightboxIndex].src}
            alt={images[lightboxIndex].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 md:right-8 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
