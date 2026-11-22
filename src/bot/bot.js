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
    const name = escapeHtml(ctx.from?.first_name || 'Hurmatli talaba');
    const welcomeText = `Assalomu alaykum, <b>${name}</b>! 👋

🏛 <b>UWED Finance & Investment Society (FIS)</b> rasmiy intellektual bilimlar botiga xush kelibsiz!

Ushbu bot sizga quyidagi imkoniyatlarni taqdim etadi:
• 📊 <b>Moliya & Investitsiyalar:</b> DCF, LBO, Multiplikatorlar va korporativ moliya darslari;
• 🏆 <b>Vertex Case Competition:</b> Nufuzli keys-chempionat strategiyalari va MECE tahlil;
• 💼 <b>Intervyu Tayyorgarligi:</b> IB, PE va Big4 intervyularidagi eng mashhur texnik savollar;
• 🤖 <b>AI Maslahatchi:</b> Har qanday moliyaviy savolingizga sun'iy intellekt orqali professional javob.

Quyidagi menyudan kerakli bo'limni tanlang yoki shunchaki o'z savolingizni yozib yuboring! 🚀`;

    await ctx.replyWithHTML(welcomeText, keyboards.mainMenu());
  });

  // Menyudagi matnli tugmalar
  bot.hears('📊 Moliya & Baholash (Valuation)', async (ctx) => {
    const text = `📊 <b>Moliya va Kompaniyalarni Baholash (Valuation)</b>

Kompaniya qiymatini baholashning asosiy professional metodologiyalari bilan tanishing. O'zingizga kerakli bo'limni tanlang:`;
    await ctx.replyWithHTML(text, keyboards.financeMenu());
  });

  bot.hears('🏆 Vertex Keys Metodikasi', async (ctx) => {
    await ctx.replyWithHTML(knowledge.vertexInfo, keyboards.vertexMenu());
  });

  bot.hears('💼 IB & Consulting Intervyu', async (ctx) => {
    await ctx.replyWithHTML(knowledge.interviewQuestions, keyboards.backOnly());
  });

  bot.hears('🏛 UWED FIS Klubi Haqida', async (ctx) => {
    await ctx.replyWithHTML(knowledge.aboutClub, keyboards.backOnly());
  });

  bot.hears('ℹ️ Foydali Havolalar', async (ctx) => {
    const links = `🌐 <b>UWED FIS Rasmiy Manbalari & Foydali Havolalar:</b>

• 📢 <b>Rasmiy Telegram Kanal:</b> @uwed_fis
• 🏛 <b>Universitet Sayti:</b> <a href="https://uwed.uz">uwed.uz</a>
• 📚 <b>Tavsiya etiladigan kitoblar:</b>
  1. <i>Investment Banking: Valuation, LBOs, and M&A</i> (Rosenbaum & Pearl)
  2. <i>Valuation</i> (McKinsey & Company)
  3. <i>Case in Point</i> (Marc P. Cosentino)
• 🛠 <b>Moliyaviy vositalar:</b> TradingView, Damodaran Online, Koyfin.`;
    await ctx.replyWithHTML(links, keyboards.backOnly());
  });

  bot.hears('🤖 AI Moliyaviy Assistent', async (ctx) => {
    const text = `🤖 <b>AI Moliyaviy Assistent yoqildi!</b>

Siz istalgan moliyaviy savolni yozishingiz mumkin. Masalan:
- <i>"WACC formulasini tushuntirib ber"</i>
- <i>"Amazon yoki Tesla keysini qanday tahlil qilsa bo'ladi?"</i>
- <i>"EBITDA nima va nega u sof foydadan farq qiladi?"</i>

Savolingizni shu yerga yozib yuboring ✍️`;
    await ctx.replyWithHTML(text);
  });

  // Inline callback query lar (Tugmalar bosilganda)
  bot.action('fn_dcf', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.replyWithHTML(knowledge.financeTopics.dcf, keyboards.financeMenu());
  });

  bot.action('fn_multiples', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.replyWithHTML(knowledge.financeTopics.multiples, keyboards.financeMenu());
  });

  bot.action('fn_lbo', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.replyWithHTML(knowledge.financeTopics.lbo, keyboards.financeMenu());
  });

  bot.action('vtx_mece', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `📌 <b>MECE (Mutually Exclusive, Collectively Exhaustive) Tahlili:</b>

1. <b>Mutually Exclusive (O'zaro bir-birini inkor etuvchi):</b>
   Takrorlanish bo'lmasligi kerak. Muammoni qismlarga ajratganda, bir fikr ikkinchi fikrni ichiga kirmasligi shart.
2. <b>Collectively Exhaustive (Birgalikda to'liq qamrab oluvchi):</b>
   Hech qanday muhim omil tashqarida qolib ketmasligi kerak.

💡 <b>Masalan, kompaniya foydasini oshirish:</b>
• Daromadni oshirish (Narx × Miqdor);
• Xarajatlarni kamaytirish (O'zgarmas xarajatlar + O'zgaruvchan xarajatlar).
Bu to'liq MECE bo'linish hisoblanadi.`;
    await ctx.replyWithHTML(text, keyboards.vertexMenu());
  });

  bot.action('vtx_tam', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `🎯 <b>TAM / SAM / SOM Tahlili:</b>

• <b>TAM (Total Addressable Market):</b> Butun dunyo yoki mintaqadagi mahsulotga bo'lgan 100% talab hajmi.
• <b>SAM (Serviceable Addressable Market):</b> Sizning texnologiyangiz, tilingiz va litsenziyangiz yetib boradigan qismi.
• <b>SOM (Serviceable Obtainable Market):</b> Siz dastlabki 1-3 yilda real marketing va resurslaringiz bilan egallay oladigan aniq ulush.

📊 <b>Vertex keyslarida baholash mezonlari:</b> Hakamlar doim pastdan yuqoriga (Bottom-up) baholashni yaxshi ko'radi (Aholi soni × Maqsadli auditoriya % × Xarid chastotasi × Narx).`;
    await ctx.replyWithHTML(text, keyboards.vertexMenu());
  });

  bot.action('vtx_tactics', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `⏱ <b>50 Daqiqalik Tezkor Oflayn Keys Taktikasi (Vertex Speed Round):</b>

Vaqtni qat'iy taqsimlang:
• <b>0 - 10 daqiqa:</b> Keysni o'qish, asosiy savol va maqsadni aniqlash (Problem Statement);
• <b>10 - 25 daqiqa:</b> Brainstorming, MECE daraxti va 3 ta asosiy yechimni tanlash;
• <b>25 - 40 daqiqa:</b> Slaydlar strukturasini chizish va raqamlarni (Financials/ROI) hisoblash;
• <b>40 - 50 daqiqa:</b> Taqdimotni rollarga bo'lib bir marta repetitsiya qilish va ehtimoliy hakamlar savollariga tayyorlanish.`;
    await ctx.replyWithHTML(text, keyboards.vertexMenu());
  });

  bot.action('back_to_main', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.replyWithHTML('Asosiy menyuga qaytdingiz:', keyboards.mainMenu());
  });

  // Har qanday erkin xabar yuborilganda (AI savol-javob)
  bot.on('text', async (ctx) => {
    const text = ctx.message.text;
    if (text.startsWith('/')) return;

    await ctx.sendChatAction('typing');

    try {
      const response = await askAI(text);
      await ctx.replyWithHTML(response, keyboards.backOnly());
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

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = {
  setupBot
};
