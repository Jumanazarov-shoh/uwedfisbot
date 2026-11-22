const axios = require('axios');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const token = process.env.BOT_TOKEN;

// 512 belgidan kam bo'lishi shart (Telegram Bot API cheklovi)
const description = `🏛 UWED Finance & Investment Society (FIS) rasmiy bilimlar boti.

Bu yerda siz quyidagilarni topasiz:
• 📚 Moliya Lug'ati (25+ termin va formulalar)
• 🏆 Vertex Keyslar (O'zbekcha PDF va yechimlar)
• 📊 Baholash: DCF, LBO, Multiplikatorlar
• 📰 Haftalik Bozor Tahlili: UZSE & Wall Street
• 💼 IB & Consulting intervyu savollari
• 🕵️‍♂️ 100% anonim taklif va murojaat qutisi

Boshlash uchun pastdagi «START» tugmasini bosing! 🚀`;

const shortDescription = "🏛 UWED FIS boti: Moliya lug'ati, Vertex keyslari, DCF baholash va haftalik bozor tahlili.";

async function setupProfile() {
  try {
    const res1 = await axios.post(`https://api.telegram.org/bot${token}/setMyDescription`, {
      description
    });
    console.log('✅ setMyDescription (Kirishdan oldingi tushuntirish):', res1.data.ok);

    const res2 = await axios.post(`https://api.telegram.org/bot${token}/setMyShortDescription`, {
      short_description: shortDescription
    });
    console.log('✅ setMyShortDescription (Bot Bio / Qisqa ma\'lumot):', res2.data.ok);

    const res3 = await axios.post(`https://api.telegram.org/bot${token}/setMyCommands`, {
      commands: [
        { command: 'start', description: '🚀 Bosh sahifani ochish' },
        { command: 'menu', description: '🏛 Asosiy bo\'limlar menyusi' },
        { command: 'anonym', description: '🕵️‍♂️ 100% anonim murojaat yuborish' },
        { command: 'help', description: '📖 Qo\'llanma va ma\'lumotlar' }
      ]
    });
    console.log('✅ setMyCommands (Bot buyruqlari):', res3.data.ok);
  } catch (err) {
    console.error('Xatolik:', err.response?.data || err.message);
  }
}

setupProfile();
