const axios = require('axios');
const config = require('../config');
const knowledge = require('../bot/knowledge');
const terms = require('../bot/terms');

const SYSTEM_PROMPT = `Siz "UWED Finance and Investment Society" (JIDU Moliya va Investitsiyalar Klubi) ning rasmiy sun'iy intellekt konsultanti va bilimdon assistentisiz.
Vazifangiz: Talabalar va klub a'zolariga moliya, investitsiya, korporativ moliya, keys-chempionatlar (Vertex Case Competition), IB (Investment Banking), PE (Private Equity) va iqtisodiyot bo'yicha aniq, tushunarli, professional va amaliy javoblar berish.

Siz bilishingiz shart bo'lgan asosiy faktlar:
1. Vertex Falsafasi (Japanese Industrial Minimalism): Quruq nazariya (SWOT/PESTEL/Porter) dan butunlay voz kechiladi. Sog'lom mantiq, aniq arifmetika, kompromisslar (trade-offs) va byudjet taqsimotiga tayaniladi.
2. Toyota Keysi: Plant Alpha oylik 20,000 ta ishlab chiqaradi, talab 26,000 ta (6,000 ta defitsit). $15M favqulodda byudjet. 0.12% sifat me'yori va Andon tamoyili. Optimal yechim: Gibrid (B Soddalashtirish + C Robotlar + vaqtinchalik A kichik smena).
3. Amazon Keysi: "Delta" saralash markazi 1.8M jo'natadi, talab 2.25M (450k defitsit). $12M byudjet. Prime va'dasi: 98.5% (amalda 89.2% ga tushgan). Virtual Andon tamoyili. Optimal yechim: Gibrid (B Hub Locker & 4 quti + C Kiva robotlari + vaqtinchalik A yordamchi guruh).
4. Baholash Tizimi: 100 ballik tizim (5 ta mezon × 20 ball). Har bir mezon 4 ta o'lchanadigan belgiga (A, B, C, D: har biri 0, 2 yoki 5 ball) bo'linadi.

Javob uslubingiz:
- O'zbek tilida ravon, professional moliya tili (moliya atamalarining inglizcha nomlarini qavs ichida keltiring).
- Aniq struktura (punktlar, formulalar va arifmetik hisob-kitoblar bilan).
- Suv gaplarsiz, Wall Street / Tier-1 Consulting analitigi ohangida.`;

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

  // Keyslar bo'yicha qidirish
  if (query.includes('toyota')) {
    return knowledge.casesData.toyota.summary;
  }
  if (query.includes('amazon')) {
    return knowledge.casesData.amazon.summary;
  }
  if (query.includes('tbc')) {
    return knowledge.casesData.tbc.summary;
  }
  if (query.includes('spotify')) {
    return knowledge.casesData.spotify.summary;
  }
  if (query.includes('ikea')) {
    return knowledge.casesData.ikea.summary;
  }
  if (query.includes('duolingo')) {
    return knowledge.casesData.duolingo.summary;
  }

  // Moliya terminlari lug'atidan qidirish
  for (const catKey in terms.categories) {
    for (const item of terms.categories[catKey].terms) {
      const termName = item.name.toLowerCase();
      if (query.includes(termName) || termName.includes(query) || (query.length > 2 && termName.startsWith(query))) {
        return `💡 <b>${item.name}</b>\n\n📐 <b>Formula / Hisob-kitob:</b>\n<code>${item.formula}</code>\n\n📖 <b>Ta'rifi:</b>\n${item.def}\n\n📌 <b>Amaliy ahamiyati:</b>\n<i>${item.practical}</i>`;
      }
    }
  }

  return `🤖 <b>UWED FIS AI Assistent</b>:
Savolingiz: <i>"${userQuery}"</i>

Ushbu mavzu bo'yicha bot menyusidagi tegishli bo'limni tanlashingiz mumkin:
• 📊 <b>Moliya & Investitsiyalar</b> (Valuation, DCF, LBO, Ratios)
• 💼 <b>IB & Consulting Intervyu Savollari</b>
• 🏆 <b>Vertex Case Competition va Keys Yechish</b>
• 🏛 <b>UWED FIS Klubi haqida</b>

💡 <i>Maslahat: Istalgan termin (masalan: "WACC", "EBITDA", "DCF") yoki keys nomi ("Toyota", "Amazon")ni to'g'ridan-to'g'ri yozib yuboring.</i>`;
}

module.exports = {
  askAI
};
