const { Telegraf, Markup } = require('telegraf');
const https = require('https');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const db = require('../services/db');
const knowledge = require('./knowledge');
const keyboards = require('./keyboards');
const terms = require('./terms');
const { askAI } = require('../services/ai');

// Yuqori tezlikdagi HTTPS Connection Pool (TLS handshake kechikishini 80% qisqartiradi)
const httpsAgent = new https.Agent({
  keepAlive: true,
  keepAliveMsecs: 15000,
  maxSockets: 64,
  timeout: 30000
});

// Foydalanuvchi Desktop'dagi yangi rasmiy banneri (Telegram CDN keshida)
const BANNER_FILE_ID = 'AgACAgIAAxkDAAOGawMW6PLpcsA0lNc8xBI-P9G0Bc8AAlQiaxs2-xhI7X7Sy2307IMBAAMCAAN5AAM9BA';
const LOCAL_BANNER_PATH = path.join(__dirname, '..', '..', 'public', 'banner.jpg');

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

  const bot = new Telegraf(config.botToken, {
    telegram: {
      agent: httpsAgent
    }
  });

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

  // /start buyrug'i (Chiroyli rasmiy banner va onboarding bilan)
  bot.start(async (ctx) => {
    if (ctx.from) userStates.delete(String(ctx.from.id));
    const name = escapeHtml(ctx.from?.first_name || 'Hurmatli talaba');

    // Foydalanuvchi qurilmasidagi eski pastki klaviaturani butunlay o'chirish (wipe remove_keyboard)
    try {
      await ctx.reply('🧹 Menyuni yangilash...', Markup.removeKeyboard()).then(m => {
        ctx.deleteMessage(m.message_id).catch(() => {});
      });
    } catch (e) {}

    const welcomeCaption = `Assalomu alaykum, <b>${name}</b>! 👋

🏛 <b>UWED Finance & Investment Society (FIS)</b> rasmiy intellektual bilimlar va keyslar botiga xush kelibsiz!

🎯 <b>Ushbu bot qanday vazifalarni bajaradi?</b>
Talabalar va yosh moliyachilar uchun moliya, investitsiya tahlili, keys-chempionatlar va korporativ baholash bo'yicha eng sara amaliy bilimlar markazi:

• 📚 <b>Moliya & Iqtisodiyot Lug'ati:</b> Makro, Mikro, Moliya, Boshqaruv hisobi va Menejment;
• 🏆 <b>Vertex Keyslar:</b> Rasmiy o'zbek tilidagi PDF keyslar va hakamlar etalon yechimlari;
• 📰 <b>Haftalik Tahlil:</b> O'zbekiston fond bozori (UZSE) va xalqaro moliya yangiliklari;
• 🤖 <b>AI Assistent:</b> Moliya, baholash va keyslar bo'yicha tezkor yordam;
• 🕵️‍♂️ <b>Anonim Murojaat:</b> 100% maxfiy taklif va savollar qutisi;
• 🏛 <b>UWED FIS Klubi:</b> Jamiyat haqida rasmiy ma'lumotlar.

Quyidagi tugmalar orqali kerakli bo'limni tanlang: 🚀`;

    try {
      await ctx.replyWithPhoto(BANNER_FILE_ID, {
        caption: welcomeCaption,
        parse_mode: 'HTML',
        ...keyboards.mainInlineMenu()
      });
    } catch (err) {
      if (fs.existsSync(LOCAL_BANNER_PATH)) {
        try {
          return await ctx.replyWithPhoto({ source: LOCAL_BANNER_PATH }, {
            caption: welcomeCaption,
            parse_mode: 'HTML',
            ...keyboards.mainInlineMenu()
          });
        } catch (e) {}
      }
      await ctx.replyWithHTML(welcomeCaption, keyboards.mainInlineMenu());
    }
  });

  // /help buyrug'i
  bot.help(async (ctx) => {
    const helpText = `📖 <b>UWED FIS Botidan Foydalanish Qo'llanmasi:</b>

1. <b>Terminlarni qidirish:</b> Istalgan moliyaviy so'zni to'g'ridan-to'g'ri chatga yozing (masalan: <i>"YaIM", "WACC", "EBITDA", "LBO", "MECE"</i>) — bot uning formulasi va hayotiy misolini chiqarib beradi.
2. <b>Keyslarni yuklab olish:</b> «🏆 Vertex Keyslar Arxiv» bo'limiga kiring va xohlagan keysingizni tanlang — bot rasmiy PDF kitobchani tashlab beradi.
3. <b>Bozor tahlili:</b> «📰 Haftalik Bozor Tahlili» bo'limida MB stavkasi, UZSE va xalqaro bozor sharhlarini o'qing.
4. <b>Anonim savol:</b> «🕵️‍♂️ Anonim Murojaat» tugmasini bosib, klub rahbariyatiga shaxsingizni yashirgan holda xabar yuborishingiz mumkin.
5. <b>Bosh menyu:</b> Istalgan paytda /menu yozing yoki tugmalardan foydalaning.`;
    await ctx.replyWithHTML(helpText, keyboards.mainInlineMenu());
  });

  // /menu va matnli "Asosiy Menyu" / "Ortga" buyruqlari
  const handleMainMenu = async (ctx) => {
    if (ctx.from) userStates.delete(String(ctx.from.id));
    const welcomeText = `🏛 <b>UWED FIS — Asosiy Menyu</b>

Quyidagi bo'limlardan birini tanlang:

• 📚 <b>Moliya & Iqtisodiyot Lug'ati:</b> Makro, Mikro, Moliya, Boshqaruv hisobi va Menejment;
• 🏆 <b>Vertex Keyslar:</b> Rasmiy o'zbekcha PDF keyslar va etalon yechimlar;
• 📰 <b>Haftalik Tahlil:</b> O'zbekiston va global bozor sharhlari;
• 🤖 <b>AI Assistent:</b> Moliya bo'yicha savol-javoblar;
• 🕵️‍♂️ <b>Anonim Murojaat:</b> 100% maxfiy taklif va savollar.`;
    await editOrReply(ctx, welcomeText, keyboards.mainInlineMenu());
  };

  bot.command(['menu', 'start'], handleMainMenu);
  bot.hears([
    '🔙 Asosiy Menyu', '🏠 Asosiy Menyu', 'Asosiy Menyu', 'Bosh Menyu', 'Menyu',
    '🔙 Ortga', 'Ortga', '🔙 Ortga qaytish', 'Ortga qaytish', 'Bekor qilish'
  ], handleMainMenu);

  // 1. Moliya Lug'ati (Terminlar) menyusi
  bot.hears(['📚 Moliya Lug\'ati (Terminlar)', '📚 Moliya Lug\'ati', 'Moliya Lug\'ati'], async (ctx) => {
    const text = `📚 <b>UWED FIS — Keng Qamrovli Moliya va Investitsiyalar Lug'ati</b>

Kerakli sohani tanlang yoki qidirayotgan terminingizni (masalan: <i>"EBITDA", "WACC", "LBO", "MECE"</i>) to'g'ridan-to'g'ri yozib yuboring:`;
    await ctx.replyWithHTML(text, keyboards.termsMenu());
  });

  // 2. Vertex Keyslar Arxiv
  bot.hears(['🏆 Vertex Keyslar Arxiv', '🏆 Vertex Keys Metodikasi', 'Vertex Keyslar'], async (ctx) => {
    await ctx.replyWithHTML(knowledge.vertexInfo, keyboards.vertexMenu());
  });

  // 3. Haftalik Bozor Tahlili
  bot.hears(['📰 Haftalik Bozor Tahlili', 'Bozor Tahlili'], async (ctx) => {
    const customDigest = db.getWeeklyDigest();
    let text = knowledge.defaultWeeklyDigest;
    if (customDigest && customDigest.content) {
      text = `📊 <b>${escapeHtml(customDigest.title)}</b>\n🗓 <i>Sana: ${customDigest.date}</i>\n\n${customDigest.content}`;
    }
    await ctx.replyWithHTML(text, keyboards.backOnly());
  });

  // 4. AI Moliyaviy Assistent
  bot.hears(['🤖 AI Moliyaviy Assistent', '🤖 AI Assistent', 'AI Assistent'], async (ctx) => {
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

  // 5. Klub haqida
  bot.hears(['🏛 UWED FIS Klubi Haqida', 'Klub Haqida'], async (ctx) => {
    await ctx.replyWithHTML(knowledge.aboutClub, keyboards.backOnly());
  });

  // 6. Anonim Murojaat yuborish funksiyasi (Sodda va tushunarli)
  const promptAnonymousMessage = async (ctx) => {
    const userId = String(ctx.from?.id);
    userStates.set(userId, 'waiting_anon_text');

    const text = `🕵️‍♂️ <b>UWED FIS — 100% Anonim Murojaatlar Qutisi</b>

Klub rahbariyatiga o'z fikringiz, savolingiz, tanqidingiz yoki taklifingizni <b>shaxsingizni to'liq sir saqlagan holda</b> yuborishingiz mumkin.

🔒 <b>Kafolatlangan Maxfiylik:</b>
Sizning ismingiz, familiyangiz yoki @username profilingiz bizga <b>umuman ko'rinmaydi</b>.

✍️ <b>Qanday yuboriladi?</b>
Shunchaki xabaringizni yozib jo'nating!

<i>(Agar fikringizdan qaytsangiz, pastdagi «❌ Bekor qilish» tugmasini bosing).</i>`;

    await editOrReply(ctx, text, keyboards.cancelAnonInline());
  };

  // Buyruq va matn orqali chaqirish
  bot.command(['anonym', 'anonim', 'anon'], promptAnonymousMessage);
  bot.hears(['🕵️‍♂️ Anonim Savol / Murojaat', 'Anonim Murojaat', 'Anonim', 'Anonim xabar'], promptAnonymousMessage);

  bot.action('menu_anon', async (ctx) => {
    await ctx.answerCbQuery();
    await promptAnonymousMessage(ctx);
  });

  bot.action('cancel_anon', async (ctx) => {
    await ctx.answerCbQuery();
    if (ctx.from) userStates.delete(String(ctx.from.id));
    await handleMainMenu(ctx);
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

📖 <b>Oddiy Tushuncha:</b>
${foundTerm.def}

📐 <b>Formula / Asosiy Qoida:</b>
<code>${escapeHtml(foundTerm.formula)}</code>

📌 <b>Hayotiy Misol:</b>
${escapeHtml(foundTerm.example || '')}

🎯 <b>Amaliy Ahamiyati:</b>
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

  // ------------------- INLINE CALLBACKS: ASOSIY MENYU VA ORTGA QAYTISH -------------------
  // Asosiy menyuga qaytish
  bot.action('back_to_main', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `🏛 <b>UWED FIS — Asosiy Menyu</b>

Quyidagi bo'limlardan birini tanlang yoki pastki tugmalardan foydalaning:

• 📚 <b>Moliya Lug'ati:</b> 25+ asosiy terminlar, formula va misollar;
• 🏆 <b>Vertex Keyslar:</b> Rasmiy o'zbekcha PDF keyslar va etalon yechimlar;
• 📰 <b>Haftalik Tahlil:</b> O'zbekiston va global bozor sharhlari;
• 🤖 <b>AI Assistent:</b> Moliya bo'yicha savol-javoblar;
• 🕵️‍♂️ <b>Anonim Murojaat:</b> 100% maxfiy taklif va savollar.`;

    await editOrReply(ctx, text, keyboards.mainInlineMenu(config.appUrl));
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

  bot.action('menu_digest', async (ctx) => {
    await ctx.answerCbQuery();
    const customDigest = db.getWeeklyDigest();
    let text = knowledge.defaultWeeklyDigest;
    if (customDigest && customDigest.content) {
      text = `📊 <b>${escapeHtml(customDigest.title)}</b>\n🗓 <i>Sana: ${customDigest.date}</i>\n\n${customDigest.content}`;
    }
    await editOrReply(ctx, text, keyboards.backOnly());
  });

  bot.action('menu_ai', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `🤖 <b>UWED FIS AI Assistent — Doimiy Moliya va Keys Konsultanti</b>

Assalomu alaykum! Istalgan moliyaviy termin, formula yoki Vertex keysi bo'yicha savolingizni to'g'ridan-to'g'ri shu yerga yozib yuboring ✍️:`;
    await editOrReply(ctx, text, keyboards.backOnly());
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

      await ctx.replyWithHTML(userConfirm, keyboards.mainInlineMenu());

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

📖 <b>Oddiy Tushuncha:</b>
${t.def}

📐 <b>Formula / Asosiy Qoida:</b>
<code>${escapeHtml(t.formula)}</code>

📌 <b>Hayotiy Misol:</b>
${escapeHtml(t.example || '')}

🎯 <b>Amaliy Ahamiyati:</b>
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
