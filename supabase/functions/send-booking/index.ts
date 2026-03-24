import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const templates: Record<string, Record<string, string>> = {
  en: {
    title: '🏠 <b>New Booking Request</b>',
    name: '👤 <b>Name:</b>',
    phone: '📞 <b>Phone:</b>',
    email: '📧 <b>Email:</b>',
    checkIn: '📅 <b>Check-in:</b>',
    checkOut: '📅 <b>Check-out:</b>',
    guests: '👥 <b>Guests:</b>',
    comment: '💬 <b>Comment:</b>',
  },
  ru: {
    title: '🏠 <b>Новая заявка на бронирование</b>',
    name: '👤 <b>Имя:</b>',
    phone: '📞 <b>Телефон:</b>',
    email: '📧 <b>Email:</b>',
    checkIn: '📅 <b>Заезд:</b>',
    checkOut: '📅 <b>Выезд:</b>',
    guests: '👥 <b>Гостей:</b>',
    comment: '💬 <b>Комментарий:</b>',
  },
  sr: {
    title: '🏠 <b>Novi zahtev za rezervaciju</b>',
    name: '👤 <b>Ime:</b>',
    phone: '📞 <b>Telefon:</b>',
    email: '📧 <b>Email:</b>',
    checkIn: '📅 <b>Dolazak:</b>',
    checkOut: '📅 <b>Odlazak:</b>',
    guests: '👥 <b>Gostiju:</b>',
    comment: '💬 <b>Komentar:</b>',
  },
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN');
    if (!TELEGRAM_BOT_TOKEN) throw new Error('TELEGRAM_BOT_TOKEN is not configured');

    const TELEGRAM_CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID');
    if (!TELEGRAM_CHAT_ID) throw new Error('TELEGRAM_CHAT_ID is not configured');

    const { name, phone, email, checkIn, checkOut, guests, comment, lang } = await req.json();

    if (!name || !phone || !checkIn || !checkOut) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const t = templates[lang] || templates['en'];

    const message = `${t.title}\n\n` +
      `${t.name} ${escapeHtml(name)}\n` +
      `${t.phone} ${escapeHtml(phone)}\n` +
      (email ? `${t.email} ${escapeHtml(email)}\n` : '') +
      `${t.checkIn} ${escapeHtml(checkIn)}\n` +
      `${t.checkOut} ${escapeHtml(checkOut)}\n` +
      (guests ? `${t.guests} ${escapeHtml(String(guests))}\n` : '') +
      (comment ? `${t.comment} ${escapeHtml(comment)}\n` : '');

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Telegram API error [${response.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending booking:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
