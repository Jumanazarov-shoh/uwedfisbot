const { Markup } = require('telegraf');
const terms = require('./terms');

module.exports = {
  // Asosiy menyu (Doimiy pastki qulay klaviatura — hech qachon yo'qolmaydi)
  mainMenu() {
    return Markup.keyboard([
      ['📚 Moliya Lug\'ati (Terminlar)', '🏆 Vertex Keyslar Arxiv'],
      ['📰 Haftalik Bozor Tahlili', '🤖 AI Moliyaviy Assistent'],
      ['🕵️‍♂️ Anonim Savol / Murojaat', '🏛 UWED FIS Klubi Haqida']
    ]).resize().persistent();
  },

  // Anonim xabar yozish holatidagi bekor qilish tugmasi
  cancelAnon() {
    return Markup.keyboard([
      ['❌ Bekor qilish']
    ]).resize();
  },

  // Asosiy Menyu uchun Inline Tugmalar (Xabar ichida ochiladigan markaz)
  mainInlineMenu(appUrl) {
    const rows = [];
    // Faqat haqiqiy HTTPS havola bo'lsagina WebApp tugmasi qo'yiladi (Telegram HTTP ni rad etadi)
    if (appUrl && appUrl.startsWith('https://')) {
      rows.push([
        Markup.button.webApp('🚀 Interaktiv Terminal (Mini App)', `${appUrl}/miniapp`)
      ]);
    }
    rows.push([
      Markup.button.callback('📚 Moliya Lug\'ati', 'menu_terms'),
      Markup.button.callback('🏆 Vertex Keyslar', 'menu_vertex')
    ]);
    rows.push([
      Markup.button.callback('📰 Bozor Tahlili', 'menu_digest'),
      Markup.button.callback('🤖 AI Assistent', 'menu_ai')
    ]);
    rows.push([
      Markup.button.callback('🕵️‍♂️ Anonim Murojaat', 'menu_anon'),
      Markup.button.callback('🏛 Klub Haqida', 'menu_about')
    ]);
    return Markup.inlineKeyboard(rows);
  },

  // Moliya Lug'ati Kategoriyalari (Inline)
  termsMenu() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback('📊 Baholash & DCF Modeli', 'cat_valuation'),
        Markup.button.callback('📈 Bozor Multiplikatorlari', 'cat_multiples')
      ],
      [
        Markup.button.callback('💼 Korporativ Moliya & FCF', 'cat_corp_finance'),
        Markup.button.callback('🏦 IB, PE & M&A Bitimlari', 'cat_ib_pe')
      ],
      [
        Markup.button.callback('🏆 Biznes Strategiya & Metrikalar', 'cat_strategy')
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

  // Ortga qaytish tugmasi
  backOnly() {
    return Markup.inlineKeyboard([
      [Markup.button.callback('🔙 Asosiy Menyuga Qaytish', 'back_to_main')]
    ]);
  }
};
