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

function saveDb() {
  try {
    ensureDirectoryExists();
    fs.writeFileSync(dbFile, JSON.stringify(memoryDb, null, 2), 'utf8');
  } catch (err) {
    console.error('Bazaga saqlashda xato:', err.message);
  }
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
    return {
      totalUsers: Object.keys(memoryDb.users || {}).length,
      totalMessagesReceived: memoryDb.stats?.totalMessagesReceived || 0,
      totalPings: memoryDb.stats?.totalPings || 0,
      lastPingAt: memoryDb.stats?.lastPingAt || null,
      startedAt: memoryDb.stats?.startedAt || null,
      recentLogs: memoryDb.logs || []
    };
  }
};
