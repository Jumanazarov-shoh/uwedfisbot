const { Telegraf, Markup } = require('telegraf');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const db = require('../services/db');
const knowledge = require('./knowledge');
const keyboards = require('./keyboards');
const terms = require('./terms');
const { askAI } = require('../services/ai');

// Telegram CDN'da keshga olingan doimiy fayl ID'lari (Instant 0.05s delivery)
const TELEGRAM_CASE_FILE_IDS = {
  toyota: 'BQACAgIAAxkDAANJawLnSfvN2hSYWIStDVloRPcwV00AAgewAAI2-xhIMBy53Jgbg949BA',
  amazon: 'BQACAgIAAxkDAANKawLnT70SPKbSdJJgTGvDRFNMsDUAAgiwAAI2-xhIu_HOUn11JKY9BA',
  tbc: 'BQACAgIAAxkDAANLawLnUu2D4NO2zvV6E8Fnar3X3EMAAgmwAAI2-xhIdSXehYR2KHU9BA',
  spotify: 'BQACAgIAAxkDAANMawLnVVbNN1qgEH6Y57vQErm4ZaAAAgqwAAI2-xhIWH9udE_1-NI9BA',
  ikea: 'BQACAgIAAxkDAANNawLnXbF_DJTiuCrtV2yMPKDaOX0AAguwAAI2-xhIqYc6hft-IUA9BA',
  duolingo: 'BQACAgIAAxkDAANOawLnXttL-psWselQZD2Kgoc1OHMAAgywAAI2-xhIjl5ZVBhAgeE9BA'
};

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

  const userStates = new Map();
  const lastBotMessages = new Map();

  // Xabarni o'rnida yangilash (In-place edit) yordamchisi — chatni toza saqlaydi!
  async function editOrReply(ctx, text, extra = {}) {
    if (ctx.callbackQuery) {
      try {
        await ctx.editMessageText(text, {
          parse_mode: 'HTML',
          ...extra
        });
        return;
      } catch (err) {
        if (err.description && err.description.includes('message is not modified')) {
          return;
        }
      }
    }
    return ctx.replyWithHTML(text, extra);
  }

  // /start buyrug'i
  bot.start(async (ctx) => {
    if (ctx.from) userStates.delete(String(ctx.from.id));
    const name = escapeHtml(ctx.from?.first_name || 'Hurmatli talaba');
    const welcomeText = `Assalomu alaykum, <b>${name}</b>! 👋

🏛 <b>UWED Finance & Investment Society (FIS)</b> intellektual botiga xush kelibsiz!

• 📚 <b>Moliya Lug'ati:</b> 25+ asosiy terminlar, formulalar va amaliy misollar;
• 🏆 <b>Vertex Keyslar:</b> Rasmiy o'zbekcha PDF keyslar va etalon yechimlar;
• 📊 <b>Baholash (Valuation):</b> DCF, LBO, Multiplikatorlar;
• 📰 <b>Haftalik Tahlil:</b> O'zbekiston va global moliya bozori sharhlari;
• 🕵️‍♂️ <b>Anonim Murojaat:</b> 100% maxfiy savol va takliflar qutisi.

Kerakli bo'limni tanlang: 🚀`;

    await ctx.replyWithHTML(welcomeText, keyboards.mainMenu());
  });

  // /menu va matnli "Asosiy Menyu" buyrug'i
  bot.command('menu', async (ctx) => {
    const welcomeText = `🏛 <b>UWED FIS — Asosiy Menyu</b>

Kerakli bo'limni tanlang:`;
    await ctx.replyWithHTML(welcomeText, keyboards.mainMenu());
  });

  bot.hears(['🔙 Asosiy Menyu', '🏠 Asosiy Menyu', 'Asosiy Menyu', 'Bosh Menyu', 'Menyu'], async (ctx) => {
    const welcomeText = `🏛 <b>UWED FIS — Asosiy Menyu</b>

Kerakli bo'limni tanlang:`;
    await ctx.replyWithHTML(welcomeText, keyboards.mainMenu());
  });

  // 1. Moliya Lug'ati (Terminlar) menyusi
  bot.hears(['📚 Moliya Lug\'ati (Terminlar)', '📚 Moliya Lug\'ati'], async (ctx) => {
    const text = `📚 <b>UWED FIS — Keng Qamrovli Moliya va Investitsiyalar Lug'ati</b>

Kerakli sohani tanlang yoki qidirayotgan terminingizni (masalan: <i>"EBITDA", "WACC", "LBO", "MECE"</i>) to'g'ridan-to'g'ri yozib yuboring:`;
    await ctx.replyWithHTML(text, keyboards.termsMenu());
  });

  // 2. Vertex Keyslar Arxiv
  bot.hears(['🏆 Vertex Keyslar Arxiv', '🏆 Vertex Keys Metodikasi'], async (ctx) => {
    await ctx.replyWithHTML(knowledge.vertexInfo, keyboards.vertexMenu());
  });

  // 3. Haftalik Bozor Tahlili
  bot.hears('📰 Haftalik Bozor Tahlili', async (ctx) => {
    const customDigest = db.getWeeklyDigest();
    let text = knowledge.defaultWeeklyDigest;
    if (customDigest && customDigest.content) {
      text = `📊 <b>${escapeHtml(customDigest.title)}</b>\n🗓 <i>Sana: ${customDigest.date}</i>\n\n${customDigest.content}`;
    }
    await ctx.replyWithHTML(text, keyboards.backOnly());
  });

  // 3.5. Baholash (Valuation)
  bot.hears(['📊 Baholash (Valuation)', '📊 Baholash'], async (ctx) => {
    await ctx.replyWithHTML(knowledge.valuationInfo, keyboards.financeMenu(config.appUrl));
  });

  // 3.6. AI Moliyaviy Assistent
  bot.hears(['🤖 AI Moliyaviy Assistent', '🤖 AI Assistent'], async (ctx) => {
    const text = `🤖 <b>UWED FIS AI Assistent — Doimiy Moliya va Keys Konsultanti</b>

Assalomu alaykum! Men moliya, investitsiya tahlili, DCF baholash va Vertex keyslari bo'yicha sizga yordam berishga tayyorman.

💬 <b>Menga quyidagicha savollar berishingiz mumkin:</b>
• <i>"Toyota keysida $15M byudjetni qanday taqsimlash kerak?"</i>
• <i>"Amazon keysida 450,000 taqchillikni qanday bartaraf etamiz?"</i>
• <i>"WACC bilan Cost of Equity farqi nima?"</i>
• <i>"LBO modelida IRR qanday hisoblanadi?"</i>

Savolingizni to'g'ridan-to'g'ri yozib yuboring ✍️:`;
    await ctx.replyWithHTML(text, keyboards.backOnly());
  });

  // 4. Intervyu savollari
  bot.hears('💼 IB & Consulting Intervyu', async (ctx) => {
    await ctx.replyWithHTML(knowledge.interviewQuestions, keyboards.backOnly());
  });

  // 5. Klub haqida
  bot.hears('🏛 UWED FIS Klubi Haqida', async (ctx) => {
    await ctx.replyWithHTML(knowledge.aboutClub, keyboards.backOnly());
  });

  // 6. Anonim Murojaat
  bot.hears('🕵️‍♂️ Anonim Savol / Murojaat', async (ctx) => {
    const userId = String(ctx.from.id);
    userStates.set(userId, 'waiting_anon_text');

    const text = `🕵️‍♂️ <b>UWED FIS Anonim Murojaatlar Qutisi</b>

Bu yerda siz klub rahbariyatiga o'z fikringiz, savolingiz, tanqidingiz yoki yangi g'oyalaringizni <b>100% anonim</b> tarzda yuborishingiz mumkin.

🔒 <b>Maxfiylik kafolati:</b>
Sizning shaxsingiz (ism, familiya, Telegram username) adminga <b>umuman ko'rinmaydi</b>.

Marhamat, anonim xabaringizni yozib yuboring ✍️:`;
    await ctx.replyWithHTML(text, keyboards.cancelAnon());
  });

  bot.hears('❌ Bekor qilish', async (ctx) => {
    const userId = String(ctx.from.id);
    userStates.delete(userId);
    await ctx.replyWithHTML('🔙 Anonim rejim bekor qilindi. Asosiy menyudasiz:', keyboards.mainMenu());
  });

  // ------------------- INLINE CALLBACKS: BIR XABAR ICHIDA YANGILANISH (ZERO SPAM) -------------------
  bot.action('back_to_terms', async (ctx) => {
    await ctx.answerCbQuery();
    await editOrReply(ctx, '📚 <b>Moliya Lug\'ati — Asosiy Bo\'limlar:</b>\n\nKerakli sohani tanlang:', keyboards.termsMenu());
  });

  bot.action(/^cat_(.+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    const catKey = ctx.match[1];
    const cat = terms.categories[catKey];
    if (cat) {
      await editOrReply(ctx, `📁 <b>${cat.name}</b> bo'yicha terminlar:\n\nBatafsil ma'lumot va formula uchun atamani bosing:`, keyboards.categoryTermsMenu(catKey));
    }
  });

  // Alohida termin bosilganda bitta xabarning o'zida yangilash
  bot.action(/^t_(.+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    const termId = 't_' + ctx.match[1];
    let foundTerm = null;
    let foundCatKey = 'valuation';

    for (const catKey in terms.categories) {
      const t = terms.categories[catKey].terms.find(item => item.id === termId);
      if (t) {
        foundTerm = t;
        foundCatKey = catKey;
        break;
      }
    }

    if (foundTerm) {
      const card = `💡 <b>${foundTerm.name}</b>

📐 <b>Formula / Hisob-kitob:</b>
<code>${escapeHtml(foundTerm.formula)}</code>

📖 <b>Ta'rifi:</b>
${foundTerm.def}

📌 <b>Amaliy Ahamiyati (Moliya & Keyslarda):</b>
<i>${foundTerm.practical}</i>`;

      const navButtons = Markup.inlineKeyboard([
        [
          Markup.button.callback('🔙 Ushbu Bo\'limga Qaytish', 'cat_' + foundCatKey),
          Markup.button.callback('🏠 Lug\'at Asosiy', 'back_to_terms')
        ]
      ]);

      await editOrReply(ctx, card, navButtons);
    }
  });

  // ------------------- INLINE CALLBACKS: VERTEX KEYSLARI VA PDF -------------------
  async function sendCase(ctx, caseKey) {
    await ctx.answerCbQuery('Keys yuklanmoqda...');
    const caseItem = knowledge.casesData[caseKey];
    if (!caseItem) return;

    // 1. Matnli xulosani xabar o'rnida yangilash
    await editOrReply(ctx, caseItem.summary, keyboards.vertexMenu());

    // 2. Telegram CDN'dagi rasmiy PDF faylini yuborish (Instant 0.05s)
    const fileId = TELEGRAM_CASE_FILE_IDS[caseKey];
    if (fileId) {
      try {
        await ctx.replyWithDocument(fileId, {
          caption: `📄 <b>${caseItem.title}</b>\n\n📌 <i>Format: ${caseItem.format}</i>\n🎯 <i>Daraja: ${caseItem.difficulty}</i>\n\nO'qib chiqish va chop etish uchun rasmiy o'zbekcha PDF hujjati.`,
          parse_mode: 'HTML'
        });
      } catch (err) {
        console.warn(`[SendDocument Error: ${caseKey}]:`, err.message);
      }
    }
  }

  bot.action('vtx_toyota', (ctx) => sendCase(ctx, 'toyota'));
  bot.action('vtx_amazon', (ctx) => sendCase(ctx, 'amazon'));
  bot.action('vtx_tbc', (ctx) => sendCase(ctx, 'tbc'));
  bot.action('vtx_spotify', (ctx) => sendCase(ctx, 'spotify'));
  bot.action('vtx_ikea', (ctx) => sendCase(ctx, 'ikea'));
  bot.action('vtx_duolingo', (ctx) => sendCase(ctx, 'duolingo'));

  bot.action('vtx_mece', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `📌 <b>MECE (Mutually Exclusive, Collectively Exhaustive) Tahlili:</b>

1. <b>Mutually Exclusive (O'zaro bir-birini inkor etuvchi):</b>
   Takrorlanish bo'lmasligi kerak. Muammoni qismlarga ajratganda, bir fikr ikkinchi fikrni ichiga kirmasligi shart.
2. <b>Collectively Exhaustive (Birgalikda to'liq qamrab oluvchi):</b>
   Hech qanday muhim omil tashqarida qolib ketmasligi kerak.

💡 <b>Masalan, kompaniya foydasini oshirish:</b>
• Daromadni oshirish (Narx × Miqdor);
• Xarajatlarni kamaytirish (O'zgarmas xarajatlar + O'zgaruvchan xarajatlar).`;
    await editOrReply(ctx, text, keyboards.vertexMenu());
  });

  bot.action('vtx_tam', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `🎯 <b>TAM / SAM / SOM Tahlili:</b>

• <b>TAM:</b> Butun dunyo yoki mintaqadagi mahsulotga bo'lgan 100% talab hajmi;
• <b>SAM:</b> Sizning texnologiyangiz va litsenziyangiz yetib boradigan qismi;
• <b>SOM:</b> Dastlabki 1-3 yilda real marketing bilan egallay oladigan aniq ulush.

📊 <b>Vertex baholash:</b> Bottom-up usuli afzal ko'riladi (Aholi soni × Maqsadli auditoriya % × Xarid chastotasi × Narx).`;
    await editOrReply(ctx, text, keyboards.vertexMenu());
  });

  // ------------------- INLINE CALLBACKS: VALUATION & MOLIYA -------------------
  bot.action('fn_dcf', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `📈 <b>DCF (Discounted Cash Flow) Modeli — Asosiy Bosqichlar:</b>

1. <b>FCF (Erkin Pul Oqimi) hisoblash:</b>
   <code>FCF = EBIT × (1 - Soliq) + D&A - CapEx - ΔNWC</code>
2. <b>WACC (Diskont stavkasi):</b>
   O'z kapitali va qarz xarajatlarining o'rtacha og'irligi.
3. <b>Terminal Value (TV):</b>
   Gordon Growth: <code>TV = FCF_n × (1 + g) / (WACC - g)</code> yoki Exit Multiple: <code>TV = EBITDA_n × Multiplikator</code>
4. <b>Enterprise Value (EV):</b>
   <code>EV = PV(FCF) + PV(TV)</code>

💡 <i>Tavsiya: Quyidagi tugma orqali Telegram Mini App kalkulyatorida FCF, WACC va o'sish stavkalarini o'zgartirib, real-vaqt rejimida hisoblang!</i>`;
    await editOrReply(ctx, text, keyboards.financeBack(config.appUrl));
  });

  bot.action('fn_multiples', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `📊 <b>Bozor Multiplikatorlari (Trading & Transaction Multiples):</b>

• <b>EV / EBITDA:</b> Eng keng tarqalgan korporativ multiplikator. Kapital strukturasi (qarz ulushi) va amortizatsiyaning sun'iy ta'siridan xoli.
• <b>P / E (Price to Earnings):</b> Bozor narxi / Sof foyda. Aksiyadorlik qiymatini taqqoslash uchun asosiy metrika.
• <b>EV / Sales:</b> Foydaga kirmagan, tez o'sayotgan FinTech va IT startaplar uchun.
• <b>P / B (Price to Book):</b> Banklar va sug'urta kompaniyalari (FinTech) balansi sifatini baholash uchun.

🎯 <i>Qoidalar: EV ko'rsatkichlari (EBITDA, Sales, EBIT) barcha investorlar uchun; Equity ko'rsatkichlari (Net Income, Book Value) esa faqat aksiyadorlar uchun ishlatiladi!</i>`;
    await editOrReply(ctx, text, keyboards.financeBack(config.appUrl));
  });

  bot.action('fn_lbo', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `🏦 <b>LBO (Leveraged Buyout) — Qarz Vositasida Sotib Olish:</b>

Private Equity (PE) fondlari kompaniyani uning o'z aktivlari va pul oqimlari garovi evaziga (60–80% qarz vositasida) sotib oladi.

🎯 <b>LBO Muvaffaqiyatining 3 Drayveri:</b>
1. <b>Deleveraging (Qarzni uzish):</b> 5 yil davomida kompaniyaning operatsion pul oqimlari orqali asosiy qarz yopiladi va aksiyadorlik ulushi o'sadi;
2. <b>EBITDA Growth:</b> Operatsion xarajatlarni qisqartirish va marjani kengaytirish;
3. <b>Multiple Expansion:</b> Kompaniyani 8x ga sotib olib, 5 yildan so'ng 10x-12x ga sotish.

📈 <b>Target:</b> PE fondlari yillik 20%–25%+ IRR (Internal Rate of Return) talab qiladi.`;
    await editOrReply(ctx, text, keyboards.financeBack(config.appUrl));
  });

  bot.action('back_to_finance', async (ctx) => {
    await ctx.answerCbQuery();
    await editOrReply(ctx, knowledge.valuationInfo, keyboards.financeMenu(config.appUrl));
  });

  // Asosiy menyuga qaytish (Asosiy markaz)
  bot.action('back_to_main', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `🏛 <b>UWED FIS — Asosiy Menyu</b>

Quyidagi bo'limlardan birini tanlang yoki pastki tugmalardan foydalaning:

• 📚 <b>Moliya Lug'ati:</b> 25+ asosiy terminlar, formula va misollar;
• 🏆 <b>Vertex Keyslar:</b> Rasmiy o'zbekcha PDF keyslar va etalon yechimlar;
• 📊 <b>Baholash (Valuation):</b> DCF, LBO, Multiplikatorlar;
• 📰 <b>Haftalik Tahlil:</b> O'zbekiston va global bozor sharhlari;
• 💼 <b>Intervyu Savollari:</b> IB & Consulting texnik savollari;
• 🕵️‍♂️ <b>Anonim Murojaat:</b> 100% maxfiy savol va takliflar.`;

    await editOrReply(ctx, text, keyboards.mainInlineMenu(config.appUrl));
    await ctx.replyWithHTML('👇 Pastki doimiy menyu tugmalari faol:', keyboards.mainMenu());
  });

  // Asosiy menyu inline tugmalari
  bot.action('menu_terms', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `📚 <b>UWED FIS — Keng Qamrovli Moliya va Investitsiyalar Lug'ati</b>

Kerakli sohani tanlang yoki qidirayotgan terminingizni (masalan: <i>"EBITDA", "WACC", "LBO", "MECE"</i>) to'g'ridan-to'g'ri yozib yuboring:`;
    await editOrReply(ctx, text, keyboards.termsMenu());
  });

  bot.action('menu_vertex', async (ctx) => {
    await ctx.answerCbQuery();
    await editOrReply(ctx, knowledge.vertexInfo, keyboards.vertexMenu());
  });

  bot.action('menu_valuation', async (ctx) => {
    await ctx.answerCbQuery();
    await editOrReply(ctx, knowledge.valuationInfo, keyboards.financeMenu(config.appUrl));
  });

  bot.action('menu_digest', async (ctx) => {
    await ctx.answerCbQuery();
    const customDigest = db.getWeeklyDigest();
    let text = knowledge.defaultWeeklyDigest;
    if (customDigest && customDigest.content) {
      text = `📊 <b>${escapeHtml(customDigest.title)}</b>\n🗓 <i>Sana: ${customDigest.date}</i>\n\n${customDigest.content}`;
    }
    await editOrReply(ctx, text, keyboards.backOnly());
  });

  bot.action('menu_interview', async (ctx) => {
    await ctx.answerCbQuery();
    await editOrReply(ctx, knowledge.interviewQuestions, keyboards.backOnly());
  });

  bot.action('menu_about', async (ctx) => {
    await ctx.answerCbQuery();
    await editOrReply(ctx, knowledge.aboutClub, keyboards.backOnly());
  });

  // ------------------- TEXT VA TERMINLARNI SMART QIDIRISH -------------------
  bot.on('text', async (ctx) => {
    const text = ctx.message.text.trim();
    if (text.startsWith('/')) return;

    const userId = String(ctx.from?.id);

    // Anonim xabar yozish holati
    if (userStates.get(userId) === 'waiting_anon_text') {
      userStates.delete(userId);
      const item = db.saveAnonymousMessage(userId, text);
      ctx.deleteMessage().catch(() => {});

      const userConfirm = `✅ <b>Anonim murojaatingiz qabul qilindi!</b>

📌 Murojaat kodi: <code>${item.code}</code>
🔒 <i>Sizning shaxsingiz to'liq sir saqlandi.</i>

Klub rahbariyati xabaringizni ko'rib chiqadi va bot orqali javob qaytaradi.`;

      await ctx.replyWithHTML(userConfirm, keyboards.mainMenu());

      if (config.adminTelegramId) {
        try {
          const adminNotice = `🕵️‍♂️ <b>Yangi Anonim Murojaat!</b>

📌 Kod: <code>${item.code}</code>
⏰ Vaqt: ${new Date().toLocaleTimeString('uz-UZ')}

💬 <b>Xabar matni:</b>
<i>"${escapeHtml(text)}"</i>`;
          await bot.telegram.sendMessage(config.adminTelegramId, adminNotice, { parse_mode: 'HTML' });
        } catch (adminErr) {
          console.warn('Adminga anonim xabar yetkazishda xato:', adminErr.message);
        }
      }
      return;
    }

    // 1. Lug'atdan tezkor qidirish (Termin kiritilganda bir zumda javob berish)
    const lowerQuery = text.toLowerCase();
    for (const catKey in terms.categories) {
      for (const t of terms.categories[catKey].terms) {
        const termNameLower = t.name.toLowerCase();
        if (lowerQuery.includes(termNameLower) || termNameLower.includes(lowerQuery) || (lowerQuery.length > 2 && termNameLower.startsWith(lowerQuery))) {
          const card = `💡 <b>${t.name}</b>

📐 <b>Formula / Hisob-kitob:</b>
<code>${escapeHtml(t.formula)}</code>

📖 <b>Ta'rifi:</b>
${t.def}

📌 <b>Amaliy Ahamiyati:</b>
<i>${t.practical}</i>`;

          const navButtons = Markup.inlineKeyboard([
            [
              Markup.button.callback('🔙 Ushbu Bo\'limga O\'tish', 'cat_' + catKey),
              Markup.button.callback('📚 Lug\'at Menyu', 'back_to_terms')
            ]
          ]);
          return ctx.replyWithHTML(card, navButtons);
        }
      }
    }

    // 2. Erkin moliyaviy savollar uchun AI yordamchi
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
    console.error(`❌ Bot xatoligi (${ctx.updateType}):`, err.message);
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
