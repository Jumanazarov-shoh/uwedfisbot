/**
 * UWED FIS — Avtonom Yangiliklar Agenti (Automated News Agent)
 * Vazifasi: Eng muhim bozor xabarlarini ("Kun Qizg'in Xabari") tahlil qilish,
 * formatlash va obunachilarga avtomatik ravishda agent sifatida yetkazish.
 */

const db = require('./db');
const knowledge = require('../bot/knowledge');

class NewsAgent {
  constructor() {
    this.bot = null;
    this.intervalId = null;
    this.isBroadcasting = false;
  }

  init(botInstance) {
    this.bot = botInstance;
    this.ensureDefaultHotNews();
    this.startBackgroundTimer();
    console.log('🤖 UWED FIS News Agent muvaffaqiyatli ishga tushirildi.');
  }

  ensureDefaultHotNews() {
    const current = db.getHotNews();
    if (!current || !current.content || current.content.includes("SpaceX va xAI $1.25")) {
      db.setHotNews({
        title: "O'zbekiston Tarixiy IPO Dasturi: Uzbekistan Airways, NIF va $692M Listing",
        content: knowledge.hotNewsDefault
      });
    }
  }

  getTodayHotNews() {
    this.ensureDefaultHotNews();
    const current = db.getHotNews();
    return current?.content || knowledge.hotNewsDefault;
  }

  setHotNews(title, content, autoBroadcast = false) {
    const updated = db.setHotNews({ title, content });
    if (autoBroadcast && this.bot) {
      this.broadcastHotNews(true);
    }
    return updated;
  }

  /**
   * Avtomatlashtirilgan xabarnoma yuborish (Batching & Rate-limit Safe)
   */
  async broadcastHotNews(force = false) {
    if (!this.bot) return { successCount: 0, failCount: 0 };
    if (this.isBroadcasting) {
      console.log('⏳ Yangiliklar agenti ayni paytda tarqatish jarayonida...');
      return { successCount: 0, failCount: 0, status: 'busy' };
    }

    const hotNews = db.getHotNews();
    const todayStr = new Date().toLocaleDateString('uz-UZ');

    // Agar bugun allaqachon avtomatik tashlangan bo'lsa va majburiy (force) bo'lmasa, qayta tashlamaydi
    if (!force && hotNews?.broadcastedAt) {
      const broadcastDate = new Date(hotNews.broadcastedAt).toLocaleDateString('uz-UZ');
      if (broadcastDate === todayStr) {
        return { successCount: 0, failCount: 0, status: 'already_sent_today' };
      }
    }

    this.isBroadcasting = true;
    const users = db.getAllUsers();
    let successCount = 0;
    let failCount = 0;

    const messageText = this.getTodayHotNews();

    console.log(`📢 News Agent: ${users.length} ta foydalanuvchiga kun xabari tarqatilmoqda...`);

    // Telegram rate-limit (30 req/sec) xavfsizligi uchun 25 tadan partiyalarda (batch) yuborish
    const BATCH_SIZE = 25;
    for (let i = 0; i < users.length; i += BATCH_SIZE) {
      const batch = users.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (u) => {
          try {
            await this.bot.telegram.sendMessage(u.id, messageText, {
              parse_mode: 'HTML',
              disable_web_page_preview: true
            });
            successCount++;
          } catch (err) {
            failCount++;
          }
        })
      );

      // Har bir partiyadan keyin 1 soniya nafas olish
      if (i + BATCH_SIZE < users.length) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    db.markHotNewsBroadcasted();
    db.addBroadcast({
      text: `[Avtomatik Kun Qizg'in Xabari] ${hotNews?.title || ''}`,
      success_count: successCount,
      fail_count: failCount
    });

    this.isBroadcasting = false;
    console.log(`✅ News Agent: Tarqatish yakunlandi. Muvaffaqiyatli: ${successCount}, Xato: ${failCount}`);
    return { successCount, failCount };
  }

  /**
   * Avtonom fon taymeri: Har 2 soatda tekshirib, Toshkent vaqti bilan tonggi 09:00 - 10:00 oralig'ida
   * kunlik eng qizg'in xabarni barcha obunachilarga avtomatik tashlaydi.
   */
  startBackgroundTimer() {
    if (this.intervalId) clearInterval(this.intervalId);

    // Har 30 daqiqada tekshirish
    this.intervalId = setInterval(async () => {
      try {
        const now = new Date();
        // UTC+5 Toshkent vaqti
        const tashkentHour = (now.getUTCHours() + 5) % 24;

        // Tonggi soat 09:00 dan keyin avtomatik yuborish
        if (tashkentHour >= 9 && tashkentHour <= 11) {
          const hotNews = db.getHotNews();
          const todayStr = new Date().toLocaleDateString('uz-UZ');
          const lastSent = hotNews?.broadcastedAt ? new Date(hotNews.broadcastedAt).toLocaleDateString('uz-UZ') : null;

          if (lastSent !== todayStr) {
            console.log('⏰ News Agent: Tonggi avtomatik tarqatish vaqti keldi!');
            await this.broadcastHotNews(false);
          }
        }
      } catch (e) {
        console.error('News Agent taymerida xatolik:', e.message);
      }
    }, 30 * 60 * 1000);
  }
}

const newsAgent = new NewsAgent();
module.exports = newsAgent;
