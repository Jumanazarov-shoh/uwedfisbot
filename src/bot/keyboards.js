const { Markup } = require('telegraf');
const terms = require('./terms');

module.exports = {
  // Asosiy Menyu (100% Inline — Xabarning ichida chiroyli joylashgan)
  mainInlineMenu() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback('📚 Moliya & Iqtisodiyot Lug\'ati', 'menu_terms')
      ],
      [
        Markup.button.callback('📊 Bozor Tahlili', 'menu_digest'),
        Markup.button.callback('🔥 Kun Qizg\'in Xabari', 'menu_hot')
      ],
      [
        Markup.button.callback('🔒 Vertex Keyslar (Yopiq)', 'menu_vertex'),
        Markup.button.callback('🤖 AI Moliyaviy Assistent', 'menu_ai')
      ],
      [
        Markup.button.callback('🕵️‍♂️ Anonim Murojaat', 'menu_anon'),
        Markup.button.callback('🏛 UWED FIS Klubi', 'menu_about')
      ]
    ]);
  },

  // Anonim xabar yozish holatidagi Inline bekor qilish tugmasi
  cancelAnonInline() {
    return Markup.inlineKeyboard([
      [Markup.button.callback('❌ Bekor qilish (Bosh Menyu)', 'back_to_main')]
    ]);
  },

  // Moliya & Iqtisodiyot Lug'ati Kategoriyalari (Inline)
  termsMenu() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback('🏛 Makroiqtisodiyot', 'cat_macro'),
        Markup.button.callback('🏬 Mikroiqtisodiyot', 'cat_micro')
      ],
      [
        Markup.button.callback('📊 Korporativ Moliya', 'cat_valuation'),
        Markup.button.callback('📑 Boshqaruv Hisobi', 'cat_accounting')
      ],
      [
        Markup.button.callback('👔 Menejment & Strategiya', 'cat_management')
      ],
      [
        Markup.button.callback('🔙 Asosiy Menyuga Qaytish', 'back_to_main')
      ]
    ]);
  },

  // Har bir kategoriya ichidagi terminlar tugmalari
  categoryTermsMenu(catKey) {
    const cat = terms.categories[catKey];
    if (!cat) return this.termsMenu();

    const buttons = [];
    for (let i = 0; i < cat.terms.length; i += 2) {
      const row = [Markup.button.callback(cat.terms[i].name, cat.terms[i].id)];
      if (cat.terms[i + 1]) {
        row.push(Markup.button.callback(cat.terms[i + 1].name, cat.terms[i + 1].id));
      }
      buttons.push(row);
    }
    buttons.push([
      Markup.button.callback('🔙 Lug\'at Bo\'limlariga', 'back_to_terms'),
      Markup.button.callback('🏠 Bosh Menyu', 'back_to_main')
    ]);

    return Markup.inlineKeyboard(buttons);
  },

  // Vertex bo'limi uchun Inline tugmalar (Haqiqiy keyslar bilan)
  vertexMenu() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback('🏎 Toyota Keysi (PDF)', 'vtx_toyota'),
        Markup.button.callback('📦 Amazon Keysi (PDF)', 'vtx_amazon')
      ],
      [
        Markup.button.callback('🏦 TBC Bank Keysi (PDF)', 'vtx_tbc'),
        Markup.button.callback('🎵 Spotify Keysi (PDF)', 'vtx_spotify')
      ],
      [
        Markup.button.callback('🛋 IKEA Keysi (PDF)', 'vtx_ikea'),
        Markup.button.callback('🦉 Duolingo Keysi (PDF)', 'vtx_duolingo')
      ],
      [
        Markup.button.callback('📌 MECE Tahlil', 'vtx_mece'),
        Markup.button.callback('🎯 TAM/SAM/SOM', 'vtx_tam')
      ],
      [
        Markup.button.callback('🔙 Asosiy Menyuga Qaytish', 'back_to_main')
      ]
    ]);
  },

  // Bozor tahlili ichki bo'limlari (Asosiy raqamlar, Hafta yangiliklari va Kun qizg'in xabari)
  digestSubMenu() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback('📊 Asosiy Makro Raqamlar', 'digest_macro'),
        Markup.button.callback('📰 Hafta Yangiliklari', 'digest_news')
      ],
      [
        Markup.button.callback('🔥 Kun Qizg\'in Xabari (Flash)', 'menu_hot')
      ],
      [
        Markup.button.callback('🏠 Bosh Menyu', 'back_to_main')
      ]
    ]);
  },

  // Hafta yangiliklarining 5 ta bo'limi menyusi
  newsCategoriesMenu() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback('🇺🇿 O\'zbekiston', 'news_uzb'),
        Markup.button.callback('🏦 Jahon Moliyasi', 'news_finance')
      ],
      [
        Markup.button.callback('💼 Jahon Investitsiya', 'news_invest'),
        Markup.button.callback('🌐 Jahon Iqtisodi', 'news_economy')
      ],
      [
        Markup.button.callback('🚀 Startap Tizimi', 'news_startups')
      ],
      [
        Markup.button.callback('🔙 Bozor Tahliliga', 'menu_digest'),
        Markup.button.callback('🏠 Bosh Menyu', 'back_to_main')
      ]
    ]);
  },

  // Yangilik bo'limi ichidagi navigatsiya (boshqa bo'limlarga o'tish)
  newsCategoryNav(currentKey) {
    const categories = [
      { key: 'uzb', label: '🇺🇿 O\'zbekiston' },
      { key: 'finance', label: '🏦 Jahon Moliyasi' },
      { key: 'invest', label: '💼 Investitsiya' },
      { key: 'economy', label: '🌐 Jahon Iqtisodi' },
      { key: 'startups', label: '🚀 Startaplar' }
    ];

    const otherCats = categories.filter(c => c.key !== currentKey);
    const navRows = [];

    for (let i = 0; i < otherCats.length; i += 2) {
      const row = [Markup.button.callback(otherCats[i].label, `news_${otherCats[i].key}`)];
      if (otherCats[i + 1]) {
        row.push(Markup.button.callback(otherCats[i + 1].label, `news_${otherCats[i + 1].key}`));
      }
      navRows.push(row);
    }

    navRows.push([
      Markup.button.callback('📰 Yangiliklar Bosh Menyu', 'digest_news'),
      Markup.button.callback('🏠 Bosh Menyu', 'back_to_main')
    ]);

    return Markup.inlineKeyboard(navRows);
  },

  // Bozor tahlili bo'limlari orasida qulay o'tish navigatsiyasi
  digestSectionNav(currentSection) {
    const switchBtn = currentSection === 'macro'
      ? Markup.button.callback('📰 Hafta Yangiliklariga O\'tish ➔', 'digest_news')
      : Markup.button.callback('📊 Asosiy Raqamlarga O\'tish ➔', 'digest_macro');

    return Markup.inlineKeyboard([
      [switchBtn],
      [
        Markup.button.callback('🔙 Bozor Tahlili Menyu', 'menu_digest'),
        Markup.button.callback('🏠 Bosh Menyu', 'back_to_main')
      ]
    ]);
  },

  // Kun qizg'in xabari navigatsiyasi
  hotNewsNav() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback('📰 Hafta Yangiliklari', 'digest_news'),
        Markup.button.callback('📊 Asosiy Raqamlar', 'digest_macro')
      ],
      [
        Markup.button.callback('🏠 Bosh Menyu', 'back_to_main')
      ]
    ]);
  },

  // Anonim xabarlar markazi menyusi
  anonHubMenu(hasMessages, latestCode) {
    const rows = [
      [Markup.button.callback('✍️ Yangi Anonim Xabar Yozish', 'anon_new')]
    ];

    if (hasMessages && latestCode) {
      const clean = (latestCode || '').replace(/^#/, '');
      rows.push([
        Markup.button.callback('💬 Oxirgi Murojaatga Qo\'shimcha Yozish', `anon_follow_${clean}`)
      ]);
    }

    rows.push([
      Markup.button.callback('🏠 Bosh Menyu', 'back_to_main')
    ]);

    return Markup.inlineKeyboard(rows);
  },

  // Anonim murojaat qilgan foydalanuvchi uchun Follow-up tugmasi
  anonUserFollowUpMenu(code) {
    const cleanCode = (code || '').replace(/^#/, '');
    return Markup.inlineKeyboard([
      [Markup.button.callback('✍️ Qo\'shimcha xabar yozish', `anon_follow_${cleanCode}`)],
      [
        Markup.button.callback('📜 Mening Murojaatlarim', 'menu_anon'),
        Markup.button.callback('🏠 Bosh Menyu', 'back_to_main')
      ]
    ]);
  },

  // Admin uchun javob berish tugmasi
  adminReplyButton(code) {
    const cleanCode = (code || '').replace(/^#/, '');
    return Markup.inlineKeyboard([
      [Markup.button.callback('✍️ Javob qaytarish', `admin_reply_${cleanCode}`)]
    ]);
  },

  // Ortga qaytish tugmasi
  backOnly() {
    return Markup.inlineKeyboard([
      [Markup.button.callback('🔙 Asosiy Menyuga Qaytish', 'back_to_main')]
    ]);
  }
};
