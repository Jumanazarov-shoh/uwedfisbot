const fs = require('fs');
const path = require('path');
const config = require('../config');

// Serverless muhitda (Vercel) faqat /tmp papkasiga yozish mumkin
const dataDir = config.isVercel
  ? path.join('/tmp', 'uwed-fis-bot-data')
  : path.join(__dirname, '..', '..', 'data');

const dbFile = path.join(dataDir, 'db.json');

// Standart boshlang'ich baza strukturasi
const initialData = {
  users: {},
  broadcasts: [],
  anonymous_messages: [],
  weekly_digest: null,
  logs: [],
  stats: {
    totalMessagesReceived: 0,
    totalPings: 0,
    lastPingAt: null,
    startedAt: new Date().toISOString()
  }
};

let memoryDb = { ...initialData };

function ensureDirectoryExists() {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  } catch (err) {
    console.error('Data papkasini yaratishda xato:', err.message);
  }
}

function loadDb() {
  try {
    ensureDirectoryExists();
    if (fs.existsSync(dbFile)) {
      const content = fs.readFileSync(dbFile, 'utf8');
      memoryDb = JSON.parse(content);
    } else {
      saveDb();
    }
  } catch (err) {
    console.error('Baza yuklashda xato, xotiradagi nusxa ishlatilmoqda:', err.message);
  }
  return memoryDb;
}

let saveTimeout = null;

function saveDb() {
  if (saveTimeout) return;
  saveTimeout = setTimeout(() => {
    saveTimeout = null;
    try {
      ensureDirectoryExists();
      fs.writeFile(dbFile, JSON.stringify(memoryDb, null, 2), 'utf8', (err) => {
        if (err) console.error('Bazaga saqlashda xato:', err.message);
      });
    } catch (err) {
      console.error('Bazaga saqlashda xato:', err.message);
    }
  }, 1000); // Asinxron, noblocking saqlash
}

// Boshlang'ich yuklash
loadDb();

module.exports = {
  // Foydalanuvchini qo'shish yoki yangilash
  saveUser(user) {
    const userId = String(user.id);
    const now = new Date().toISOString();

    if (!memoryDb.users[userId]) {
      memoryDb.users[userId] = {
        id: userId,
        username: user.username || null,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        joined_at: now,
        last_active: now,
        message_count: 1
      };
    } else {
      memoryDb.users[userId].last_active = now;
      memoryDb.users[userId].first_name = user.first_name || memoryDb.users[userId].first_name;
      memoryDb.users[userId].username = user.username || memoryDb.users[userId].username;
      memoryDb.users[userId].message_count = (memoryDb.users[userId].message_count || 0) + 1;
    }

    memoryDb.stats.totalMessagesReceived = (memoryDb.stats.totalMessagesReceived || 0) + 1;
    saveDb();
    return memoryDb.users[userId];
  },

  // Barcha foydalanuvchilar ro'yxati
  getAllUsers() {
    return Object.values(memoryDb.users || {});
  },

  // Foydalanuvchilar soni
  getUserCount() {
    return Object.keys(memoryDb.users || {}).length;
  },

  // Broadcast tarixini qo'shish
  addBroadcast(broadcast) {
    const item = {
      id: Date.now().toString(),
      sent_at: new Date().toISOString(),
      text: broadcast.text,
      success_count: broadcast.success_count || 0,
      fail_count: broadcast.fail_count || 0
    };
    memoryDb.broadcasts = memoryDb.broadcasts || [];
    memoryDb.broadcasts.unshift(item);
    if (memoryDb.broadcasts.length > 50) memoryDb.broadcasts.pop();
    saveDb();
    return item;
  },

  // Broadcast tarixini olish
  getBroadcasts() {
    return memoryDb.broadcasts || [];
  },

  // Anonim xabarni saqlash
  saveAnonymousMessage(userId, text) {
    const code = `#ANON-${Math.floor(1000 + Math.random() * 9000)}`;
    const item = {
      id: Date.now().toString(),
      code,
      userId: String(userId),
      text,
      createdAt: new Date().toISOString(),
      replies: [],
      status: 'new'
    };
    memoryDb.anonymous_messages = memoryDb.anonymous_messages || [];
    memoryDb.anonymous_messages.unshift(item);
    if (memoryDb.anonymous_messages.length > 200) memoryDb.anonymous_messages.pop();
    saveDb();
    return item;
  },

  // Barcha anonim xabarlarni olish
  getAnonymousMessages() {
    return memoryDb.anonymous_messages || [];
  },

  // Foydalanuvchining o'z anonim xabarlari tarixini olish
  getUserAnonymousMessages(userId) {
    if (!userId) return [];
    const uId = String(userId);
    return (memoryDb.anonymous_messages || []).filter(m => String(m.userId) === uId);
  },

  // Anonim xabarni kodi bo'yicha topish (har qanday formatda: #ANON-8784, ANON-8784, 8784)
  getAnonymousByCode(rawCode) {
    if (!rawCode) return null;
    const clean = String(rawCode).trim().toUpperCase().replace(/^#/, '');
    return (memoryDb.anonymous_messages || []).find(m => {
      if (!m.code) return false;
      const itemClean = m.code.toUpperCase().replace(/^#/, '');
      return itemClean === clean || itemClean === `ANON-${clean}` || itemClean.endsWith(clean);
    });
  },

  // Anonim xabarga javob qaytarish (kod bo'yicha)
  replyAnonymousByCode(rawCode, replyText) {
    const msg = this.getAnonymousByCode(rawCode);
    if (!msg) return null;

    msg.replies = msg.replies || [];
    msg.replies.push({
      text: replyText,
      repliedAt: new Date().toISOString()
    });
    msg.status = 'replied';
    saveDb();
    return msg;
  },

  // Anonim xabarga follow-up (qo'shimcha xabar) qo'shish
  addFollowUpByCode(rawCode, followUpText) {
    const msg = this.getAnonymousByCode(rawCode);
    if (!msg) return null;

    msg.follow_ups = msg.follow_ups || [];
    msg.follow_ups.push({
      text: followUpText,
      sentAt: new Date().toISOString()
    });
    msg.status = 'follow_up';
    saveDb();
    return msg;
  },

  // Anonim xabarga javob qaytarish (ID bo'yicha)
  replyAnonymousMessage(id, replyText) {
    memoryDb.anonymous_messages = memoryDb.anonymous_messages || [];
    const msg = memoryDb.anonymous_messages.find(m => m.id === id);
    if (!msg) return null;

    msg.replies = msg.replies || [];
    msg.replies.push({
      text: replyText,
      repliedAt: new Date().toISOString()
    });
    msg.status = 'replied';
    saveDb();
    return msg;
  },

  // Haftalik tahlilni olish
  getWeeklyDigest() {
    return memoryDb.weekly_digest || null;
  },

  // Haftalik tahlilni yangilash
  updateWeeklyDigest(digestData) {
    memoryDb.weekly_digest = {
      title: digestData.title || 'UWED FIS Weekly Market Digest',
      date: new Date().toLocaleDateString('uz-UZ'),
      updatedAt: new Date().toISOString(),
      content: digestData.content
    };
    saveDb();
    return memoryDb.weekly_digest;
  },

  // Kun qizg'in xabari (Hot News) ni olish
  getHotNews() {
    return memoryDb.hot_news || null;
  },

  // Kun qizg'in xabari (Hot News) ni yangilash
  setHotNews(newsData) {
    memoryDb.hot_news = {
      id: Date.now().toString(),
      title: newsData.title || "Kun Qizg'in Xabari",
      date: newsData.date || new Date().toLocaleDateString('uz-UZ'),
      content: newsData.content,
      broadcastedAt: newsData.broadcastedAt || null,
      updatedAt: new Date().toISOString()
    };
    saveDb();
    return memoryDb.hot_news;
  },

  // Kun xabari tarqatilganini belgilash
  markHotNewsBroadcasted() {
    if (memoryDb.hot_news) {
      memoryDb.hot_news.broadcastedAt = new Date().toISOString();
      saveDb();
    }
  },

  // Ping statistikasini yangilash
  recordPing(status = 'success') {
    memoryDb.stats = memoryDb.stats || {};
    memoryDb.stats.totalPings = (memoryDb.stats.totalPings || 0) + 1;
    memoryDb.stats.lastPingAt = new Date().toISOString();

    // So'nggi 20 ta logni saqlash
    memoryDb.logs = memoryDb.logs || [];
    memoryDb.logs.unshift({
      time: new Date().toLocaleTimeString('uz-UZ'),
      date: new Date().toLocaleDateString('uz-UZ'),
      status,
      type: 'PING'
    });
    if (memoryDb.logs.length > 20) memoryDb.logs.pop();

    saveDb();
  },

  // Umumiy statistika
  getStats() {
    const anonList = memoryDb.anonymous_messages || [];
    return {
      totalUsers: Object.keys(memoryDb.users || {}).length,
      totalMessagesReceived: memoryDb.stats?.totalMessagesReceived || 0,
      totalPings: memoryDb.stats?.totalPings || 0,
      totalAnonMessages: anonList.length,
      newAnonCount: anonList.filter(a => a.status === 'new').length,
      lastPingAt: memoryDb.stats?.lastPingAt || null,
      startedAt: memoryDb.stats?.startedAt || null,
      recentLogs: memoryDb.logs || []
    };
  }
};
