const { Telegraf } = require('telegraf');
const config = require('../config');
const db = require('../services/db');
const knowledge = require('./knowledge');
const keyboards = require('./keyboards');
const { askAI } = require('../services/ai');

function setupBot() {
  if (!config.botToken) {
    console.warn('⚠️ BOT_TOKEN topilmadi! Iltimos .env faylida BOT_TOKEN ni belgilang.');
    return null;
  }

  const bot = new Telegraf(config.botToken);

  // Foydalanuvchini har bir xabarda bazaga saqlash
  bot.use(async (ctx, next) => {
    if (ctx.from) {
      db.saveUser(ctx.from);
    }
    return next();
  });

  // /start buyrug'i
  bot.start(async (ctx) => {
    const name = ctx.from?.first_name || 'Hurmatli talaba';
    const welcomeText = `Assalomu alaykum, *${name}*! 👋

🏛 *UWED Finance & Investment Society (FIS)* rasmiy intellektual bilimlar botiga xush kelibsiz!

Ushbu bot sizga quyidagi imkoniyatlarni taqdim etadi:
• 📊 *Moliya & Investitsiyalar:* DCF, LBO, Multiplikatorlar va korporativ moliya darslari;
• 🏆 *Vertex Case Competition:* Nufuzli keys-chempionat strategiyalari va MECE tahlil;
• 💼 *Intervyu Tayyorgarligi:* IB, PE va Big4 intervyularidagi eng mashhur texnik savollar;
• 🤖 *AI Maslahatchi:* Har qanday moliyaviy savolingizga sun'iy intellekt orqali professional javob.

Quyidagi menyudan kerakli bo'limni tanlang yoki shunchaki o'z savolingizni yozib yuboring! 🚀`;

    await ctx.replyWithMarkdown(welcomeText, keyboards.mainMenu());
  });

  // Menyudagi matnli tugmalar
  bot.hears('📊 Moliya & Baholash (Valuation)', async (ctx) => {
    const text = `📊 *Moliya va Kompaniyalarni Baholash (Valuation)*

Kompaniya qiymatini baholashning asosiy professional metodologiyalari bilan tanishing. O'zingizga kerakli bo'limni tanlang:`;
    await ctx.replyWithMarkdown(text, keyboards.financeMenu());
  });

  bot.hears('🏆 Vertex Keys Metodikasi', async (ctx) => {
    await ctx.replyWithMarkdown(knowledge.vertexInfo, keyboards.vertexMenu());
  });

  bot.hears('💼 IB & Consulting Intervyu', async (ctx) => {
    await ctx.replyWithMarkdown(knowledge.interviewQuestions, keyboards.backOnly());
  });

  bot.hears('🏛 UWED FIS Klubi Haqida', async (ctx) => {
    await ctx.replyWithMarkdown(knowledge.aboutClub, keyboards.backOnly());
  });

  bot.hears('ℹ️ Foydali Havolalar', async (ctx) => {
    const links = `🌐 *UWED FIS Rasmiy Manbalari & Foydali Havolalar:*

• 📢 *Rasmiy Telegram Kanal:* [@uwed_fis](https://t.me/)
• 🏛 *Universitet Sayti:* [uwed.uz](https://uwed.uz)
• 📚 *Tavsiya etiladigan kitoblar:*
  1. *Investment Banking: Valuation, LBOs, and M&A* (Rosenbaum & Pearl)
  2. *Valuation* (McKinsey & Company)
  3. *Case in Point* (Marc P. Cosentino)
• 🛠 *Moliyaviy vositalar:* TradingView, Damodaran Online, Koyfin.`;
    await ctx.replyWithMarkdown(links, keyboards.backOnly());
  });

  bot.hears('🤖 AI Moliyaviy Assistent', async (ctx) => {
    const text = `🤖 *AI Moliyaviy Assistent yoqildi!*

Siz istalgan moliyaviy savolni yozishingiz mumkin. Masalan:
- *"WACC formulasini tushuntirib ber"*
- *"Amazon yoki Tesla keysini qanday tahlil qilsa bo'ladi?"*
- *"EBITDA nima va nega u sof foydadan farq qiladi?"*

Savolingizni shu yerga yozib yuboring ✍️`;
    await ctx.replyWithMarkdown(text);
  });

  // Inline callback query lar (Tugmalar bosilganda)
  bot.action('fn_dcf', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.replyWithMarkdown(knowledge.financeTopics.dcf, keyboards.financeMenu());
  });

  bot.action('fn_multiples', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.replyWithMarkdown(knowledge.financeTopics.multiples, keyboards.financeMenu());
  });

  bot.action('fn_lbo', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.replyWithMarkdown(knowledge.financeTopics.lbo, keyboards.financeMenu());
  });

  bot.action('vtx_mece', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `📌 *MECE (Mutually Exclusive, Collectively Exhaustive) Tahlili:*

1. *Mutually Exclusive (O'zaro bir-birini inkor etuvchi):*
   Takrorlanish bo'lmasligi kerak. Muammoni qismlarga ajratganda, bir fikr ikkinchi fikrni ichiga kirmasligi shart.
2. *Collectively Exhaustive (Birgalikda to'liq qamrab oluvchi):*
   Hech qanday muhim omil tashqarida qolib ketmasligi kerak.

💡 *Masalan, kompaniya foydasini oshirish:*
• Daromadni oshirish (Narx × Miqdor);
• Xarajatlarni kamaytirish (O'zgarmas xarajatlar + O'zgaruvchan xarajatlar).
Bu to'liq MECE bo'linish hisoblanadi.`;
    await ctx.replyWithMarkdown(text, keyboards.vertexMenu());
  });

  bot.action('vtx_tam', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `🎯 *TAM / SAM / SOM Tahlili:*

• *TAM (Total Addressable Market):* Butun dunyo yoki mintaqadagi mahsulotga bo'lgan 100% talab hajmi.
• *SAM (Serviceable Addressable Market):* Sizning texnologiyangiz, tilingiz va litsenziyangiz yetib boradigan qismi.
• *SOM (Serviceable Obtainable Market):* Siz dastlabki 1-3 yilda real marketing va resurslaringiz bilan egallay oladigan aniq ulush.

📊 *Vertex keyslarida baholash mezonlari:* Hakamlar doim pastdan yuqoriga (Bottom-up) baholashni yaxshi ko'radi (Aholi soni × Maqsadli auditoriya % × Xarid chastotasi × Narx).`;
    await ctx.replyWithMarkdown(text, keyboards.vertexMenu());
  });

  bot.action('vtx_tactics', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `⏱ *50 Daqiqalik Tezkor Oflayn Keys Taktikasi (Vertex Speed Round):*

Vaqtni qat'iy taqsimlang:
• *0 - 10 daqiqa:* Keysni o'qish, asosiy savol va maqsadni aniqlash (Problem Statement);
• *10 - 25 daqiqa:* Brainstorming, MECE daraxti va 3 ta asosiy yechimni tanlash;
• *25 - 40 daqiqa:* Slaydlar strukturasini chizish va raqamlarni (Financials/ROI) hisoblash;
• *40 - 50 daqiqa:* Taqdimotni rollarga bo'lib bir marta repetitsiya qilish va ehtimoliy hakamlar savollariga tayyorlanish.`;
    await ctx.replyWithMarkdown(text, keyboards.vertexMenu());
  });

  bot.action('back_to_main', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.replyWithMarkdown('Asosiy menyuga qaytdingiz:', keyboards.mainMenu());
  });

  // Har qanday erkin xabar yuborilganda (AI savol-javob)
  bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    // Agar buyruq yoki menyu matni bo'lmasa
    if (text.startsWith('/')) return;

    // Yozmoqda holatini ko'rsatish
    await ctx.sendChatAction('typing');

    try {
      const response = await askAI(text);
      await ctx.replyWithMarkdown(response, keyboards.backOnly());
    } catch (err) {
      console.error('AI javob berishda xato:', err.message);
      await ctx.reply('Kechirasiz, savolga javob berishda xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
    }
  });

  bot.catch((err, ctx) => {
    console.error(`❌ Bot xatoligi (${ctx.updateType}):`, err);
  });

  return bot;
}

module.exports = {
  setupBot
};
