const { Telegraf, Markup } = require('telegraf');
const https = require('https');
const path = require('path');
const fs = require('fs');
const config = require('../config');
const db = require('../services/db');
const knowledge = require('./knowledge');
const keyboards = require('./keyboards');
const terms = require('./terms');
const newsAgent = require('../services/newsAgent');
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
• 📊 <b>Bozor Tahlili:</b> Asosiy makro raqamlar va 5 ta bo'limdagi yangiliklar;
• 🔥 <b>Kun Qizg'in Xabari:</b> Har kuni ertalab avtomatik agent insaytlari;
• 🔒 <b>Vertex Keyslar:</b> Hozircha yopiq (Vertex Case tugagandan keyin chiqadi);
• 🤖 <b>AI Assistent:</b> Moliya, baholash va keyslar bo'yicha tezkor yordam;
• 🕵️‍♂️ <b>Anonim Murojaat:</b> 100% maxfiy taklif va ikki tomonlama savollar qutisi;
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
2. <b>Keyslar bo'limi:</b> Hozircha kirish ruxsati yo'q, Vertex Case chempionati tugagandan keyin to'liq e'lon qilinadi.
3. <b>Bozor tahlili:</b> «📊 Bozor Tahlili» bo'limida Asosiy makro raqamlar va hafta yangiliklarini alohida o'qing.
4. <b>Anonim savol:</b> «🕵️‍♂️ Anonim Murojaat» tugmasini bosib, klub rahbariyatiga shaxsingizni yashirgan holda xabar yuborishingiz mumkin (va rahbariyat javobiga follow-up yozishingiz mumkin).
5. <b>Bosh menyu:</b> Istalgan paytda /menu yozing yoki tugmalardan foydalaning.`;
    await ctx.replyWithHTML(helpText, keyboards.mainInlineMenu());
  });

  // /menu va matnli "Asosiy Menyu" / "Ortga" buyruqlari
  const handleMainMenu = async (ctx) => {
    if (ctx.from) userStates.delete(String(ctx.from.id));
    const welcomeText = `🏛 <b>UWED FIS — Asosiy Menyu</b>

Quyidagi bo'limlardan birini tanlang:

• 📚 <b>Moliya & Iqtisodiyot Lug'ati:</b> Makro, Mikro, Moliya, Boshqaruv hisobi va Menejment;
• 📊 <b>Bozor Tahlili:</b> Asosiy makro raqamlar va 5 ta bo'limdagi yangiliklar;
• 🔥 <b>Kun Qizg'in Xabari:</b> Avtomatlashtirilgan kunlik eng muhim xabarlar;
• 🔒 <b>Vertex Keyslar:</b> Hozircha yopiq (Vertex Case tugagandan keyin chiqadi);
• 🤖 <b>AI Assistent:</b> Moliya bo'yicha savol-javoblar;
• 🕵️‍♂️ <b>Anonim Murojaat:</b> 100% maxfiy taklif va savollar qutisi;`;
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

  // 2. Vertex Keyslar Arxiv (Hozircha yopiq)
  bot.hears([
    '🏆 Vertex Keyslar Arxiv', '🏆 Vertex Keys Metodikasi', 'Vertex Keyslar',
    'Keyslar', 'Keys', 'keyslar', 'keys', 'Vertex', 'vertex'
  ], async (ctx) => {
    await ctx.replyWithHTML(knowledge.caseAccessRestricted, keyboards.backOnly());
  });

  // 3. Bozor Tahlili (Asosiy Raqamlar va Hafta Yangiliklari)
  const handleDigestMenu = async (ctx) => {
    await editOrReply(ctx, knowledge.digestHub, keyboards.digestSubMenu());
  };

  bot.hears(['📊 Bozor Tahlili', '📰 Bozor Tahlili', 'Bozor Tahlili', 'Bozor', '📰 Haftalik Bozor Tahlili'], handleDigestMenu);

  const handleMacroNumbers = async (ctx) => {
    await editOrReply(ctx, knowledge.macroNumbers, keyboards.digestSectionNav('macro'));
  };
  bot.hears(['📊 Asosiy Makro Raqamlar', 'Asosiy Makro Raqamlar', 'Makro Raqamlar', 'Raqamlar', 'Asosiy raqamlar'], handleMacroNumbers);

  // Hafta yangiliklari bosh menyusi (5 ta bo'lim)
  const handleWeeklyNewsHub = async (ctx) => {
    await editOrReply(ctx, knowledge.newsHub, keyboards.newsCategoriesMenu());
  };
  bot.hears(['📰 Hafta Yangiliklari', 'Hafta Yangiliklari', 'Yangiliklar', 'Haftalik yangiliklar'], handleWeeklyNewsHub);

  // 5 ta alohida bo'lim uchun umumiy yordamchi
  const handleNewsCategory = async (ctx, catKey) => {
    if (ctx.callbackQuery) await ctx.answerCbQuery();
    const text = knowledge.newsCategories[catKey] || knowledge.newsCategories.uzb;
    await editOrReply(ctx, text, keyboards.newsCategoryNav(catKey));
  };

  bot.hears(['🇺🇿 O\'zbekiston', 'O\'zbekiston yangiliklari', 'Ozbekiston'], (ctx) => handleNewsCategory(ctx, 'uzb'));
  bot.hears(['🏦 Jahon Moliyasi', 'Jahon Moliyasi', 'Moliya yangiliklari'], (ctx) => handleNewsCategory(ctx, 'finance'));
  bot.hears(['💼 Jahon Investitsiya', 'Jahon Investitsiya', 'Investitsiya yangiliklari'], (ctx) => handleNewsCategory(ctx, 'invest'));
  bot.hears(['🌐 Jahon Iqtisodi', 'Jahon Iqtisodi', 'Iqtisodiyot yangiliklari'], (ctx) => handleNewsCategory(ctx, 'economy'));
  bot.hears(['🚀 Startap Tizimi', 'Startap Tizimi', 'Startaplar'], (ctx) => handleNewsCategory(ctx, 'startups'));

  // Kun Qizg'in Xabari (Flash Breaking News)
  const handleHotNews = async (ctx) => {
    await editOrReply(ctx, newsAgent.getTodayHotNews(), keyboards.hotNewsNav());
  };
  bot.hears(['🔥 Kun Qizg\'in Xabari', 'Kun Qizg\'in Xabari', 'Kun xabari', '🔥 Kun xabari'], handleHotNews);
  bot.command(['hot', 'kun_xabari'], handleHotNews);

  // Admin: Kun qizg'in xabarini darhol agent orqali barcha obunachilarga tarqatish
  bot.command('send_hot', async (ctx) => {
    const adminId = String(ctx.from?.id);
    if (adminId !== String(config.adminTelegramId)) return;

    await ctx.reply('🤖 News Agent: Kun qizg\'in xabari barcha bot foydalanuvchilariga tarqatilmoqda...');
    const res = await newsAgent.broadcastHotNews(true);
    await ctx.reply(`✅ Tarqatish yakunlandi!\n\nYetkazildi: ${res.successCount} ta\nXatolik: ${res.failCount} ta`);
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

  // 6. Anonim Murojaat bo'limi (Murojaatlar tarixi, berilgan javoblar va yangi xabar yozish)
  const handleAnonymousSection = async (ctx) => {
    const userId = String(ctx.from?.id);
    const myMessages = db.getUserAnonymousMessages(userId);

    if (!myMessages || myMessages.length === 0) {
      const emptyText = `🕵️‍♂️ <b>UWED FIS — 100% Anonim Murojaatlar Qutisi</b>

Klub rahbariyatiga o'z fikringiz, savolingiz, tanqidingiz yoki taklifingizni <b>shaxsingizni to'liq sir saqlagan holda</b> yuborishingiz mumkin.

🔒 <b>Kafolatlangan Maxfiylik:</b>
Sizning ismingiz, familiyangiz yoki @username profilingiz bizga <b>umuman ko'rinmaydi</b>.

💡 <i>Yuborgan xabarlaringiz va rahbariyat tomonidan qaytarilgan javoblar shu bo'limda saqlanib, doim ko'rinib turadi!</i>`;
      return editOrReply(ctx, emptyText, keyboards.anonHubMenu(false));
    }

    // Foydalanuvchining avvalgi murojaatlari va rahbariyat javoblari
    let historyText = `🕵️‍♂️ <b>UWED FIS — Sizning Anonim Murojaatlaringiz</b>\n`;
    historyText += `🔒 <i>Shaxsingiz 100% sir saqlanadi.</i>\n━━━━━━━━━━━━━━━━━━━━\n\n`;

    const recent = myMessages.slice(0, 3);
    recent.forEach((m, idx) => {
      const createdDate = new Date(m.createdAt).toLocaleString('uz-UZ', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      historyText += `📌 <b>Murojaat: <code>${m.code}</code></b> <i>(${createdDate})</i>\n`;
      historyText += `💬 <b>Sizning xabaringiz:</b>\n<i>"${escapeHtml(m.text)}"</i>\n`;

      if (m.replies && m.replies.length > 0) {
        historyText += `\n✅ <b>Rahbariyat javobi:</b>\n`;
        m.replies.forEach((rep) => {
          const repDate = new Date(rep.repliedAt).toLocaleString('uz-UZ', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
          historyText += `• <i>"${escapeHtml(rep.text)}"</i>  • <code>${repDate}</code>\n`;
        });
      } else {
        historyText += `\n⏳ <b>Holat:</b> <i>Ko'rib chiqilmoqda (rahbariyat tez orada javob beradi)...</i>\n`;
      }

      if (m.follow_ups && m.follow_ups.length > 0) {
        historyText += `\n🔄 <b>Siz yuborgan qo'shimcha xabarlar:</b>\n`;
        m.follow_ups.forEach((f) => {
          historyText += `• <i>"${escapeHtml(f.text)}"</i>\n`;
        });
      }

      if (idx < recent.length - 1) {
        historyText += `\n━━━━━━━━━━━━━━━━━━━━\n\n`;
      }
    });

    if (myMessages.length > 3) {
      historyText += `\n\n<i>(Jami ${myMessages.length} ta murojaatingizdan so'nggi 3 tasi ko'rsatilmoqda)</i>`;
    }

    const latestCode = myMessages[0]?.code;
    return editOrReply(ctx, historyText, keyboards.anonHubMenu(true, latestCode));
  };

  const startNewAnonymousMessage = async (ctx) => {
    const userId = String(ctx.from?.id);
    userStates.set(userId, 'waiting_anon_text');

    const promptText = `✍️ <b>Anonim murojaatingiz matnini yozib yuboring:</b>\n\n🔒 <i>Shaxsingiz to'liq maxfiy qoladi. Istalgan payt bekor qilishingiz mumkin.</i>`;
    await editOrReply(ctx, promptText, keyboards.cancelAnonInline());
  };

  // Buyruq va matn orqali chaqirish
  bot.command(['anonym', 'anonim', 'anon'], handleAnonymousSection);
  bot.hears(['🕵️‍♂️ Anonim Savol / Murojaat', 'Anonim Murojaat', 'Anonim', 'Anonim xabar'], handleAnonymousSection);

  bot.action('menu_anon', async (ctx) => {
    await ctx.answerCbQuery();
    await handleAnonymousSection(ctx);
  });

  bot.action('anon_new', async (ctx) => {
    await ctx.answerCbQuery();
    await startNewAnonymousMessage(ctx);
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

  // ------------------- INLINE CALLBACKS: VERTEX KEYSLARI (CHEKLANGAN) -------------------
  async function sendCaseRestricted(ctx) {
    await ctx.answerCbQuery('Hozircha kirish ruxsati yo\'q');
    await editOrReply(ctx, knowledge.caseAccessRestricted, keyboards.backOnly());
  }

  bot.action('vtx_toyota', sendCaseRestricted);
  bot.action('vtx_amazon', sendCaseRestricted);
  bot.action('vtx_tbc', sendCaseRestricted);
  bot.action('vtx_spotify', sendCaseRestricted);
  bot.action('vtx_ikea', sendCaseRestricted);
  bot.action('vtx_duolingo', sendCaseRestricted);
  bot.action('vtx_mece', sendCaseRestricted);
  bot.action('vtx_tam', sendCaseRestricted);

  // ------------------- INLINE CALLBACKS: ASOSIY MENYU VA ORTGA QAYTISH -------------------
  // Asosiy menyuga qaytish
  bot.action('back_to_main', async (ctx) => {
    await ctx.answerCbQuery();
    const text = `🏛 <b>UWED FIS — Asosiy Menyu</b>

Quyidagi bo'limlardan birini tanlang yoki pastki tugmalardan foydalaning:

• 📚 <b>Moliya Lug'ati:</b> 25+ asosiy terminlar, formula va misollar;
• 🔒 <b>Vertex Keyslar:</b> Hozircha yopiq (Vertex Case tugagandan keyin chiqadi);
• 📊 <b>Bozor Tahlili:</b> Asosiy makro raqamlar va hafta yangiliklari;
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
    await ctx.answerCbQuery('Hozircha kirish ruxsati yo\'q');
    await editOrReply(ctx, knowledge.caseAccessRestricted, keyboards.backOnly());
  });

  bot.action('menu_hot', async (ctx) => {
    await ctx.answerCbQuery();
    await handleHotNews(ctx);
  });

  bot.action('menu_digest', async (ctx) => {
    await ctx.answerCbQuery();
    await editOrReply(ctx, knowledge.digestHub, keyboards.digestSubMenu());
  });

  bot.action('digest_macro', async (ctx) => {
    await ctx.answerCbQuery();
    await editOrReply(ctx, knowledge.macroNumbers, keyboards.digestSectionNav('macro'));
  });

  bot.action('digest_news', async (ctx) => {
    await ctx.answerCbQuery();
    await handleWeeklyNewsHub(ctx);
  });

  // Hafta yangiliklarining 5 ta bo'limi inline harakatlari
  bot.action('news_uzb', (ctx) => handleNewsCategory(ctx, 'uzb'));
  bot.action('news_finance', (ctx) => handleNewsCategory(ctx, 'finance'));
  bot.action('news_invest', (ctx) => handleNewsCategory(ctx, 'invest'));
  bot.action('news_economy', (ctx) => handleNewsCategory(ctx, 'economy'));
  bot.action('news_startups', (ctx) => handleNewsCategory(ctx, 'startups'));

  // Admin javob yozish tugmasini bosganda
  bot.action(/^admin_reply_(.+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    const adminId = String(ctx.from?.id);
    if (adminId !== String(config.adminTelegramId)) {
      return ctx.reply('⚠️ Ushbu amal faqat administrator uchun!');
    }

    const rawCode = ctx.match[1];
    const code = rawCode.startsWith('#') ? rawCode : `#${rawCode}`;
    userStates.set(adminId, { state: 'admin_typing_reply', code });

    const promptText = `✍️ <b><code>${code}</code> murojaatiga javobingizni yozing:</b>\n\n<i>(Yozgan xabaringiz to'g'ridan-to'g'ri anonim foydalanuvchiga yetkaziladi).</i>`;
    await ctx.replyWithHTML(promptText, keyboards.cancelAnonInline());
  });

  // Foydalanuvchi Follow-up (qo'shimcha xabar) yozish tugmasini bosganda
  bot.action(/^anon_follow_(.+)$/, async (ctx) => {
    await ctx.answerCbQuery();
    const userId = String(ctx.from?.id);
    const rawCode = ctx.match[1];
    const code = rawCode.startsWith('#') ? rawCode : `#${rawCode}`;
    userStates.set(userId, { state: 'waiting_anon_followup', code });

    const promptText = `✍️ <b><code>${code}</code> murojaatingizga qo'shimcha xabarni yozing:</b>\n\n<i>Shaxsingiz to'liq sir saqlangan holda klub rahbariyatiga yetkaziladi.</i>`;
    await editOrReply(ctx, promptText, keyboards.cancelAnonInline());
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
    const userState = userStates.get(userId);
    const replyTextToSearch = ctx.message.reply_to_message?.text || '';
    const isAdmin = String(userId) === String(config.adminTelegramId);

    // 1. Admin javob qaytarishi (Inline tugma yoki Telegram "Reply" orqali)
    const isAdminState = isAdmin && userState && typeof userState === 'object' && userState.state === 'admin_typing_reply';
    const isAdminNativeReply = isAdmin && replyTextToSearch.match(/#ANON-\d+/i);

    if (isAdminState || isAdminNativeReply) {
      const code = isAdminState ? userState.code : replyTextToSearch.match(/#ANON-\d+/i)[0].toUpperCase();
      userStates.delete(userId);

      const updatedMsg = db.replyAnonymousByCode(code, text);
      if (updatedMsg && updatedMsg.userId) {
        try {
          const userReplyNotice = `📩 <b>UWED FIS Rahbariyatidan Javob!</b>\n\n📌 Murojaat kodi: <code>${code}</code>\n⏰ Vaqt: ${new Date().toLocaleTimeString('uz-UZ')}\n\n💬 <b>Javob matni:</b>\n<i>"${escapeHtml(text)}"</i>\n\n━━━━━━━━━━━━━━━━━━\n💡 <i>Agar rahbariyatga qo'shimcha savol yoki ma'lumot jo'natmoqchi bo'lsangiz, ushbu xabarga «Reply» qiling yoki pastdagi tugmani bosing:</i>`;
          await bot.telegram.sendMessage(updatedMsg.userId, userReplyNotice, {
            parse_mode: 'HTML',
            ...keyboards.anonUserFollowUpMenu(code)
          });
          return ctx.replyWithHTML(`✅ <b><code>${code}</code></b> murojaatiga javobingiz muallifga muvaffaqiyatli yetkazildi!`);
        } catch (sendErr) {
          console.warn('Foydalanuvchiga javob yetkazishda xato:', sendErr.message);
          return ctx.replyWithHTML(`⚠️ <b><code>${code}</code></b> murojaati muallifiga xabar yetkazib bo'lmadi (foydalanuvchi botni bloklagan bo'lishi mumkin).`);
        }
      } else {
        return ctx.replyWithHTML(`⚠️ <b><code>${code}</code></b> kodi bo'yicha murojaat topilmadi.`);
      }
    }

    // 2. Foydalanuvchi yangi anonim xabar yozishi
    if (userState === 'waiting_anon_text') {
      userStates.delete(userId);
      const item = db.saveAnonymousMessage(userId, text);
      ctx.deleteMessage().catch(() => {});

      const userConfirm = `✅ <b>Anonim murojaatingiz muvaffaqiyatli qabul qilindi!</b>\n\n📌 Murojaat kodi: <code>${item.code}</code>\n⏰ Yuborilgan vaqt: ${new Date().toLocaleTimeString('uz-UZ')}\n\n💬 <b>Siz yuborgan xabar:</b>\n<i>"${escapeHtml(text)}"</i>\n\n🔒 <i>Shaxsingiz 100% sir saqlandi.</i>\n\nRahbariyat javobi ushbu chatga yetkaziladi hamda <b>«🕵️‍♂️ Anonim Murojaat»</b> bo'limida ham doim saqlanib turadi.`;
      await ctx.replyWithHTML(userConfirm, keyboards.anonUserFollowUpMenu(item.code));

      if (config.adminTelegramId) {
        try {
          const adminNotice = `🕵️‍♂️ <b>Yangi Anonim Murojaat!</b>\n\n📌 Kod: <code>${item.code}</code>\n⏰ Sana: ${new Date().toLocaleString('uz-UZ')}\n\n💬 <b>Xabar matni:</b>\n<i>"${escapeHtml(text)}"</i>\n\n━━━━━━━━━━━━━━━━━━\n👇 <b>Javob berish uchun:</b>\nUshbu xabarga <b>«Ответить» (Reply)</b> qiling yoki pastdagi tugmani bosing:`;
          await bot.telegram.sendMessage(config.adminTelegramId, adminNotice, {
            parse_mode: 'HTML',
            ...keyboards.adminReplyButton(item.code)
          });
        } catch (adminErr) {
          console.warn('Adminga anonim xabar yetkazishda xato:', adminErr.message);
        }
      }
      return;
    }

    // 3. Foydalanuvchi follow-up (qo'shimcha xabar) yuborishi
    const isUserFollowUpState = userState && typeof userState === 'object' && userState.state === 'waiting_anon_followup';
    const isUserReplyFollowUp = replyTextToSearch.match(/#ANON-\d+/i) && !isAdmin;

    if (isUserFollowUpState || isUserReplyFollowUp) {
      const code = isUserFollowUpState ? userState.code : replyTextToSearch.match(/#ANON-\d+/i)[0].toUpperCase();
      userStates.delete(userId);

      db.addFollowUpByCode(code, text);
      ctx.deleteMessage().catch(() => {});

      const userConfirm = `✅ <b>Qo'shimcha xabaringiz qabul qilindi!</b>\n\n📌 Murojaat kodi: <code>${code}</code>\n⏰ Vaqt: ${new Date().toLocaleTimeString('uz-UZ')}\n\n💬 <b>Yuborilgan qo'shimcha xabar:</b>\n<i>"${escapeHtml(text)}"</i>\n\n🔒 <i>Xabaringiz klub rahbariyatiga yetkazildi.</i>`;
      await ctx.replyWithHTML(userConfirm, keyboards.anonUserFollowUpMenu(code));

      if (config.adminTelegramId) {
        try {
          const adminNotice = `💬 <b>Anonim Murojaatga Qo'shimcha Xabar (Follow-up)!</b>\n\n📌 Kod: <code>${code}</code>\n⏰ Vaqt: ${new Date().toLocaleTimeString('uz-UZ')}\n\n💬 <b>Yangi xabar matni:</b>\n<i>"${escapeHtml(text)}"</i>\n\n━━━━━━━━━━━━━━━━━━\n👇 <b>Javob berish uchun:</b>\nUshbu xabarga <b>«Ответить» (Reply)</b> qiling yoki pastdagi tugmani bosing:`;
          await bot.telegram.sendMessage(config.adminTelegramId, adminNotice, {
            parse_mode: 'HTML',
            ...keyboards.adminReplyButton(code)
          });
        } catch (adminErr) {
          console.warn('Adminga follow-up yetkazishda xato:', adminErr.message);
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

  // Avtonom yangiliklar agentini Telegram boti bilan bog'lash
  try {
    newsAgent.init(bot);
  } catch (agentErr) {
    console.error('News agentni ishga tushirishda xato:', agentErr.message);
  }

  return bot;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

module.exports = {
  setupBot
};
