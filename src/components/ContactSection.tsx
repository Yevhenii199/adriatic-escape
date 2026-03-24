import { useState, useMemo, useCallback } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { MapPin, Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { question: `${a} + ${b} = ?`, answer: a + b };
}

const getTodayString = () => new Date().toISOString().split('T')[0];

const ContactSection = () => {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({
    name: '', phone: '', email: '', checkIn: '', checkOut: '', guests: '', comment: '',
  });
  const [captchaInput, setCaptchaInput] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha);
  const [loading, setLoading] = useState(false);

  const today = useMemo(getTodayString, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => {
      const next = { ...prev, [name]: value };
      // Reset checkout if it's now before the new checkin
      if (name === 'checkIn' && prev.checkOut && prev.checkOut < value) {
        next.checkOut = '';
      }
      return next;
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (parseInt(captchaInput) !== captcha.answer) {
      toast.error(t('form_captcha_error'));
      setCaptcha(generateCaptcha());
      setCaptchaInput('');
      return;
    }

    if (!form.name || !form.phone || !form.checkIn || !form.checkOut) {
      toast.error(t('form_required_error'));
      return;
    }

    if (form.checkIn < today) {
      toast.error(t('form_past_date_error'));
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-booking', {
        body: { ...form, lang },
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Unknown error');

      toast.success(t('form_success'));
      setForm({ name: '', phone: '', email: '', checkIn: '', checkOut: '', guests: '', comment: '' });
      setCaptchaInput('');
      setCaptcha(generateCaptcha());
    } catch (err) {
      console.error('Booking error:', err);
      toast.error(t('form_error'));
    } finally {
      setLoading(false);
    }
  };
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3706.06673087159!2d19.0615688!3d42.13553110000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134e77208cd2e533%3A0x98d0dfac99d204bd!2sLucia's%20apartment%20Sutomore!5e1!3m2!1sru!2s!4v1750365147676!5m2!1sru!2sttps://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3706.06673087159!2d19.0615688!3d42.13553110000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134e77208cd2e533%3A0x98d0dfac99d204bd!2sLucia's%20apartment%20Sutomore!5e1!3m2!1sru!2s!4v1750365147676!5m2!1sru!2s"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'saturate(0.8) contrast(1.1)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Apartment location in Montenegro"
            />
          </div>

          {/* Booking Form */}
          <div className="bg-background rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-accent" size={24} strokeWidth={1.5} />
              <h3 className="font-display text-lg font-semibold text-foreground">
                {t('form_title')}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label htmlFor="name" className="text-xs font-body">{t('form_name')} *</Label>
                <Input id="name" name="name" value={form.name} onChange={handleChange} required className="mt-1 h-9 text-sm" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs font-body">{t('form_phone')} *</Label>
                <Input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} required className="mt-1 h-9 text-sm" />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs font-body">{t('form_email')}</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 h-9 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="checkIn" className="text-xs font-body">{t('form_checkin')} *</Label>
                  <Input id="checkIn" name="checkIn" type="date" min={today} value={form.checkIn} onChange={handleChange} required className="mt-1 h-9 text-sm" />
                </div>
                <div>
                  <Label htmlFor="checkOut" className="text-xs font-body">{t('form_checkout')} *</Label>
                  <Input id="checkOut" name="checkOut" type="date" min={form.checkIn || today} value={form.checkOut} onChange={handleChange} required className="mt-1 h-9 text-sm" />
                </div>
              </div>
              <div>
                <Label htmlFor="guests" className="text-xs font-body">{t('form_guests')}</Label>
                <Input id="guests" name="guests" type="number" min="1" max="20" value={form.guests} onChange={handleChange} className="mt-1 h-9 text-sm" />
              </div>
              <div>
                <Label htmlFor="comment" className="text-xs font-body">{t('form_comment')}</Label>
                <textarea
                  id="comment"
                  name="comment"
                  placeholder={t('form_comment_placeholder')} // Додайте плейсхолдер
                  aria-label={t('form_comment')} // Або явний aria-label
                  value={form.comment}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />  
              </div>

              {/* Captcha */}
              <div className="bg-muted/50 rounded-lg p-3">
                <Label className="text-xs font-body text-muted-foreground">{t('form_captcha')}: {captcha.question}</Label>
                <Input
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder={t('form_captcha_placeholder')}
                  required
                  className="mt-1 h-9 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-md w-full justify-center disabled:opacity-50"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                {t('form_submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
