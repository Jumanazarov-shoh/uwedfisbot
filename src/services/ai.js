const axios = require('axios');
const config = require('../config');
const knowledge = require('../bot/knowledge');

const SYSTEM_PROMPT = `Siz "UWED Finance and Investment Society" (JIDU Moliya va Investitsiyalar Klubi) ning rasmiy sun'iy intellekt konsultanti va bilimdon assistentisiz.
Vazifangiz: Talabalar va klub a'zolariga moliya, investitsiya, korporativ moliya, keys-chempionatlar (Vertex Case Competition), IB (Investment Banking), PE (Private Equity) va iqtisodiyot bo'yicha aniq, tushunarli, professional va amaliy javoblar berish.
Javob uslubingiz:
- O'zbek tilida (zarurat bo'lsa moliya atamalarining inglizcha nomlarini qavs ichida keltiring).
- Aniq struktura (punktlar, qisqa formulalar va misollar bilan).
- Keraksiz suv gaplarsiz, moliya amaliyotchisi (financial analyst) ohangida.`;

async function askAI(userQuery) {
  // 1. Agar Gemini API mavjud bo'lsa
  if (config.geminiApiKey) {
    try {
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
      console.warn('Gemini API xatosi, zaxira qidiruvga o\'tilmoqda:', err.message);
    }
  }

  // 2. Agar OpenAI API mavjud bo'lsa
  if (config.openaiApiKey) {
    try {
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

  // 3. Fallback: Mahalliy bilimlar bazasidan qidirish (Smart Keyword Search)
  const query = userQuery.toLowerCase();
  for (const item of knowledge.terms) {
    if (query.includes(item.keyword.toLowerCase()) || item.title.toLowerCase().includes(query)) {
      return `💡 *${item.title}*\n\n${item.description}\n\n📌 *Amaliy ahamiyati:* ${item.practical}`;
    }
  }

  return `🤖 *UWED FIS AI Assistent*:
Savolingiz: "${userQuery}"

Ushbu mavzu bo'yicha bot menyusidagi tegishli bo'limni tanlashingiz mumkin:
• 📊 *Moliya & Investitsiyalar* (Valuation, DCF, LBO, Ratios)
• 💼 *IB & Consulting Intervyu Savollari*
• 🏆 *Vertex Case Competition va Keys Yechish*
• 🏛 *UWED FIS Klubi haqida*

(To'liq generativ AI javoblarini faollashtirish uchun admin panelda GEMINI_API_KEY yoki OPENAI_API_KEY ni kiriting).`;
}

module.exports = {
  askAI
};
