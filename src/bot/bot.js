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
        // Agar xabar o'zgarmagan bo'lsa, xatolikni e'tiborsiz qoldiramiz
        if (err.description && err.description.includes('message is not modified')) {
          return;
        }
      }
    }

    const sent = await ctx.replyWithHTML(text, extra);
    if (ctx.from?.id && sent?.message_id) {
      lastBotMessages.set(String(ctx.from.id), sent.message_id);
    }
    return sent;
  }

  // Foydalanuvchi buyruq tugmasini bosganda, chatni tozalash uchun eski xabarni o'chirish
  async function cleanPreviousAndUser(ctx) {
    const userId = String(ctx.from?.id);
    // 1. Foydalanuvchi yuborgan buyruq matnini o'chirish (chatda keraksiz qoldiq qolmaydi)
    ctx.deleteMessage().catch(() => {});

    // 2. Botning oldingi menyu xabari bo'lsa, tozalab yangisini ochish
    const oldMsgId = lastBotMessages.get(userId);
    if (oldMsgId) {
      ctx.deleteMessage(oldMsgId).catch(() => {});
      lastBotMessages.delete(userId);
    }
  }

  // /start buyrug'i
  bot.start(async (ctx) => {
    await cleanPreviousAndUser(ctx);
    if (ctx.from) userStates.delete(String(ctx.from.id));
    const name = escapeHtml(ctx.from?.first_name || 'Hurmatli talaba');
    const welcomeText = `Assalomu alaykum, <b>${name}</b>! 👋

🏛 <b>UWED Finance & Investment Society (FIS)</b> intellektual botiga xush kelibsiz!

• 📚 <b>Moliya Lug'ati:</b> 25+ asosiy terminlar, formulalar va amaliy misollar;
• 🏆 <b>Vertex Keyslar:</b> Rasmiy o'zbekcha PDF keyslar va etalon yechimlar;
• 📰 <b>Haftalik Tahlil:</b> O'zbekiston va global moliya bozori sharhlari;
• 🕵️‍♂️ <b>Anonim Murojaat:</b> 100% maxfiy savol va takliflar qutisi.

Kerakli bo'limni tanlang: 🚀`;

    const sent = await ctx.replyWithHTML(welcomeText, keyboards.mainMenu());
    if (sent?.message_id) lastBotMessages.set(String(ctx.from.id), sent.message_id);
  });

  // 1. Moliya Lug'ati (Terminlar) menyusi
  bot.hears(['📚 Moliya Lug\'ati (Terminlar)', '📚 Moliya Lug\'ati'], async (ctx) => {
    await cleanPreviousAndUser(ctx);
    const text = `📚 <b>UWED FIS — Keng Qamrovli Moliya va Investitsiyalar Lug'ati</b>

Kerakli sohani tanlang yoki qidirayotgan terminingizni (masalan: <i>"EBITDA", "WACC", "LBO", "MECE"</i>) to'g'ridan-to'g'ri yozib yuboring:`;
    const sent = await ctx.replyWithHTML(text, keyboards.termsMenu());
    if (sent?.message_id) lastBotMessages.set(String(ctx.from.id), sent.message_id);
  });

  // 2. Vertex Keyslar Arxiv
  bot.hears(['🏆 Vertex Keyslar Arxiv', '🏆 Vertex Keys Metodikasi'], async (ctx) => {
    await cleanPreviousAndUser(ctx);
    const sent = await ctx.replyWithHTML(knowledge.vertexInfo, keyboards.vertexMenu());
    if (sent?.message_id) lastBotMessages.set(String(ctx.from.id), sent.message_id);
  });

  // 3. Haftalik Bozor Tahlili
  bot.hears('📰 Haftalik Bozor Tahlili', async (ctx) => {
    await cleanPreviousAndUser(ctx);
    const customDigest = db.getWeeklyDigest();
    let text = knowledge.defaultWeeklyDigest;
    if (customDigest && customDigest.content) {
      text = `📊 <b>${escapeHtml(customDigest.title)}</b>\n🗓 <i>Sana: ${customDigest.date}</i>\n\n${customDigest.content}`;
    }
    const sent = await ctx.replyWithHTML(text, keyboards.backOnly());
    if (sent?.message_id) lastBotMessages.set(String(ctx.from.id), sent.message_id);
  });

  // 4. Intervyu savollari
  bot.hears('💼 IB & Consulting Intervyu', async (ctx) => {
    await cleanPreviousAndUser(ctx);
    const sent = await ctx.replyWithHTML(knowledge.interviewQuestions, keyboards.backOnly());
    if (sent?.message_id) lastBotMessages.set(String(ctx.from.id), sent.message_id);
  });

  // 5. Klub haqida
  bot.hears('🏛 UWED FIS Klubi Haqida', async (ctx) => {
    await cleanPreviousAndUser(ctx);
    const sent = await ctx.replyWithHTML(knowledge.aboutClub, keyboards.backOnly());
    if (sent?.message_id) lastBotMessages.set(String(ctx.from.id), sent.message_id);
  });

  // 6. Anonim Murojaat
  bot.hears('🕵️‍♂️ Anonim Savol / Murojaat', async (ctx) => {
    await cleanPreviousAndUser(ctx);
    const userId = String(ctx.from.id);
    userStates.set(userId, 'waiting_anon_text');

    const text = `🕵️‍♂️ <b>UWED FIS Anonim Murojaatlar Qutisi</b>

Bu yerda siz klub rahbariyatiga o'z fikringiz, savolingiz, tanqidingiz yoki yangi g'oyalaringizni <b>100% anonim</b> tarzda yuborishingiz mumkin.

🔒 <b>Maxfiylik kafolati:</b>
Sizning shaxsingiz (ism, familiya, Telegram username) adminga <b>umuman ko'rinmaydi</b>.

Marhamat, anonim xabaringizni yozib yuboring ✍️:`;
    const sent = await ctx.replyWithHTML(text, keyboards.cancelAnon());
    if (sent?.message_id) lastBotMessages.set(String(ctx.from.id), sent.message_id);
  });

  bot.hears('❌ Bekor qilish', async (ctx) => {
    await cleanPreviousAndUser(ctx);
    const userId = String(ctx.from.id);
    userStates.delete(userId);
    const sent = await ctx.replyWithHTML('🔙 Anonim rejim bekor qilindi. Asosiy menyudasiz:', keyboards.mainMenu());
    if (sent?.message_id) lastBotMessages.set(String(ctx.from.id), sent.message_id);
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

  bot.action('back_to_main', async (ctx) => {
    await ctx.answerCbQuery();
    await editOrReply(ctx, 'Asosiy menyudasiz. Kerakli bo\'limni tanlang:', keyboards.termsMenu());
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
