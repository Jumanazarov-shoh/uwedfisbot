const axios = require('axios');
const config = require('../config');
const knowledge = require('../bot/knowledge');
const terms = require('../bot/terms');

const SYSTEM_PROMPT = `Siz "UWED Finance and Investment Society" (JIDU Moliya va Investitsiyalar Klubi) ning rasmiy sun'iy intellekt konsultanti va bilimdon assistentisiz.
Vazifangiz: Talabalar va klub a'zolariga moliya, investitsiya, korporativ moliya, keys-chempionatlar (Vertex Case Competition), IB (Investment Banking), PE (Private Equity) va iqtisodiyot bo'yicha aniq, tushunarli, professional va amaliy javoblar berish.
Javob uslubingiz:
- O'zbek tilida ravon, professional moliya tili.
- Aniq struktura (punktlar, formulalar va hisob-kitoblar bilan).
- Keraksiz suv gaplarsiz.`;

async function askAI(userQuery) {
  let hasValidKey = false;

  // 1. Agar Gemini API mavjud bo'lsa
  if (config.geminiApiKey && config.geminiApiKey.trim()) {
    try {
      hasValidKey = true;
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.geminiApiKey}`;
      const payload = {
        contents: [
          {
            parts: [
              { text: `${SYSTEM_PROMPT}\n\nFoydalanuvchi savoli: ${userQuery}` }
            ]
          }
        ]
      };
      const res = await axios.post(url, payload, { timeout: 15000 });
      const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text;
    } catch (err) {
      console.warn('Gemini API xatosi:', err.message);
    }
  }

  // 2. Agar OpenAI API mavjud bo'lsa
  if (config.openaiApiKey && config.openaiApiKey.trim()) {
    try {
      hasValidKey = true;
      const res = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userQuery }
        ],
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${config.openaiApiKey}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000
      });
      const text = res.data?.choices?.[0]?.message?.content;
      if (text) return text;
    } catch (err) {
      console.warn('OpenAI API xatosi:', err.message);
    }
  }

  // 3. Mahalliy boy bilimlar bazasidan qidirish (Smart Search)
  const query = userQuery.toLowerCase();

  // Keyslar bo'yicha (Chempionat davrida yopiq)
  if (query.includes('toyota') || query.includes('amazon') || query.includes('tbc') ||
      query.includes('spotify') || query.includes('ikea') || query.includes('duolingo') ||
      query.includes('keys') || (query.includes('vertex') && !query.includes('nima'))) {
    return `🔒 <b>Hozircha kirish ruxsati yo'q!</b>\n\nVertex Case Competition chempionati to'liq yakunlangandan keyin rasmiy keyslar va ularning etalon yechimlari to'liq e'lon qilinadi.`;
  }

  // Terminlar bo'yicha
  for (const catKey in terms.categories) {
    for (const item of terms.categories[catKey].terms) {
      const termName = item.name.toLowerCase();
      if (query.includes(termName) || termName.includes(query) || (query.length > 2 && termName.startsWith(query))) {
        return `💡 <b>${item.name}</b>\n\n📐 <b>Formula / Hisob-kitob:</b>\n<code>${item.formula}</code>\n\n📖 <b>Ta'rifi:</b>\n${item.def}\n\n📌 <b>Amaliy ahamiyati:</b>\n<i>${item.practical}</i>`;
      }
    }
  }

  // Agar aniq termin topilmasa, foydalanuvchiga API kalit holatini va yo'riqnomasini aniq tushuntirish
  const apiStatusNote = hasValidKey
    ? "⚠️ <i>Tashqi AI API serveridan javob olishda vaqtinchalik xatolik yuz berdi.</i>"
    : "⚠️ <i>Hozirda tashqi generativ AI API kaliti (Gemini yoki OpenAI) ulanmagan. To'liq erkin savol-javoblar uchun admin panelda GEMINI_API_KEY yoki OPENAI_API_KEY sozlanadi.</i>";

  return `🤖 <b>UWED FIS AI Assistent:</b>

${apiStatusNote}

Savolingiz: <i>"${escapeHtml(userQuery)}"</i>

💡 <b>Siz uchun tavsiya:</b>
Bot ichidagi <b>«📚 Moliya Lug'ati (Terminlar)»</b> bo'limida 25+ eng muhim moliyaviy formulalar (DCF, WACC, EBITDA, LBO, P/E) va <b>«📰 Haftalik Bozor Tahlili»</b> bo'limida yangilangan makro ko'rsatkichlar joylashtirilgan. Vertex keyslar esa chempionat yakunlangach taqdim etiladi.

Qidirayotgan terminingiz nomini (masalan: <i>"WACC", "EBITDA", "LBO"</i>) to'g'ridan-to'g'ri yozib yuboring!`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = {
  askAI
};
