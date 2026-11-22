const { Markup } = require('telegraf');

module.exports = {
  // Asosiy menyu (Reply Keyboard - doim ekranning pastida ko'rinib turadi)
  mainMenu() {
    return Markup.keyboard([
      ['📊 Moliya & Baholash (Valuation)', '🏆 Vertex Keyslar Arxiv'],
      ['📰 Haftalik Bozor Tahlili', '🤖 AI Moliyaviy Assistent'],
      ['💼 IB & Consulting Intervyu', '🕵️‍♂️ Anonim Savol / Murojaat'],
      ['🏛 UWED FIS Klubi Haqida', 'ℹ️ Foydali Havolalar']
    ]).resize();
  },

  // Anonim xabar yozish holatidagi bekor qilish tugmasi
  cancelAnon() {
    return Markup.keyboard([
      ['❌ Bekor qilish']
    ]).resize();
  },

  // Moliya bo'limi uchun Inline tugmalar
  financeMenu() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback('📈 DCF Modeli', 'fn_dcf'),
        Markup.button.callback('📊 Bozor Multiplikatorlari', 'fn_multiples')
      ],
      [
        Markup.button.callback('🏦 LBO & Private Equity', 'fn_lbo')
      ],
      [
        Markup.button.callback('🔙 Asosiy Menyu', 'back_to_main')
      ]
    ]);
  },

  // Vertex bo'limi uchun Inline tugmalar (Haqiqiy keyslar bilan)
  vertexMenu() {
    return Markup.inlineKeyboard([
      [
        Markup.button.callback('🏎 Toyota Keysi', 'vtx_toyota'),
        Markup.button.callback('📦 Amazon Keysi', 'vtx_amazon')
      ],
      [
        Markup.button.callback('🏦 TBC Bank Keysi', 'vtx_tbc'),
        Markup.button.callback('🎵 Spotify Keysi', 'vtx_spotify')
      ],
      [
        Markup.button.callback('🛋 IKEA Keysi', 'vtx_ikea'),
        Markup.button.callback('🦉 Duolingo Keysi', 'vtx_duolingo')
      ],
      [
        Markup.button.callback('📌 MECE & Issue Tree', 'vtx_mece'),
        Markup.button.callback('🎯 TAM / SAM / SOM', 'vtx_tam')
      ],
      [
        Markup.button.callback('⏱ 50 daqiqalik Keys Taktikasi', 'vtx_tactics')
      ],
      [
        Markup.button.callback('🔙 Asosiy Menyu', 'back_to_main')
      ]
    ]);
  },

  // Ortga qaytish tugmasi
  backOnly() {
    return Markup.inlineKeyboard([
      [Markup.button.callback('🔙 Ortga qaytish', 'back_to_main')]
    ]);
  }
};
