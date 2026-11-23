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
        Markup.button.callback('🔒 Vertex Keyslar (Yopiq)', 'menu_vertex'),
        Markup.button.callback('📊 Bozor Tahlili', 'menu_digest')
      ],
      [
        Markup.button.callback('🤖 AI Moliyaviy Assistent', 'menu_ai'),
        Markup.button.callback('🕵️‍♂️ Anonim Murojaat', 'menu_anon')
      ],
      [
        Markup.button.callback('🏛 UWED FIS Klubi Haqida', 'menu_about')
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

  // Bozor tahlili ichki bo'limlari (Asosiy raqamlar & Hafta yangiliklari)
  digestSubMenu() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback('📊 Asosiy Makro Raqamlar', 'digest_macro'),
        Markup.button.callback('📰 Hafta Yangiliklari', 'digest_news')
      ],
      [
        Markup.button.callback('🏠 Bosh Menyu', 'back_to_main')
      ]
    ]);
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

  // Anonim murojaat qilgan foydalanuvchi uchun Follow-up tugmasi
  anonUserFollowUpMenu(code) {
    const cleanCode = (code || '').replace(/^#/, '');
    return Markup.inlineKeyboard([
      [Markup.button.callback('✍️ Qo\'shimcha xabar yozish', `anon_follow_${cleanCode}`)],
      [Markup.button.callback('🏠 Bosh Menyu', 'back_to_main')]
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
