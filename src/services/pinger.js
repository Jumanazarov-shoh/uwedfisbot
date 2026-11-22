const axios = require('axios');
const config = require('../config');
const db = require('./db');

let pingerInterval = null;

/**
 * Render yoki har qanday bulutli serverni "uxlab qolish" (sleep mode)dan saqlovchi pinger
 */
function startPinger(botInstance) {
  const url = config.appUrl;
  const intervalMinutes = config.pingIntervalMinutes || 5;
  const intervalMs = intervalMinutes * 60 * 1000;

  console.log(`⏰ [Keep-Alive] Serverni uyg'oq tutish xizmati ishga tushdi (Har ${intervalMinutes} daqiqada ping yuboriladi)`);
  console.log(`🎯 [Keep-Alive] Asosiy maqsad URL: ${url}`);

  // Dastlabki birinchi ping (5 soniyadan so'ng)
  setTimeout(() => {
    executePing(url, botInstance);
  }, 5000);

  // Doimiy interval
  pingerInterval = setInterval(() => {
    executePing(url, botInstance);
  }, intervalMs);
}

async function executePing(targetUrl, botInstance) {
  const timeStr = new Date().toLocaleTimeString('uz-UZ');
  const pingEndpoints = [];

  // 1. Tashqi umumiy internet manzili (Render load balanceri ko'rishi shart!)
  if (targetUrl && !targetUrl.includes('localhost')) {
    pingEndpoints.push(`${targetUrl}/ping`);
  }
  // 2. Lokal server manzili
  pingEndpoints.push(`http://localhost:${config.port}/ping`);

  for (const endpoint of pingEndpoints) {
    try {
      const res = await axios.get(endpoint, {
        headers: { 'User-Agent': 'UWED-FIS-KeepAlive/2.0' },
        timeout: 15000
      });
      db.recordPing('success');
      console.log(`🟢 [Keep-Alive Ping OK] [${timeStr}] ${endpoint} (Status: ${res.status})`);
      break; // Agar tashqi ping muvaffaqiyatli bo'lsa, yetarli
    } catch (err) {
      db.recordPing('error');
      console.warn(`🟡 [Keep-Alive Ogohlantirish] [${timeStr}] ${endpoint}: ${err.message}`);
    }
  }
}

function stopPinger() {
  if (pingerInterval) {
    clearInterval(pingerInterval);
    pingerInterval = null;
    console.log('🛑 [Keep-Alive] Pinger to\'xtatildi');
  }
}

module.exports = {
  startPinger,
  stopPinger,
  executePing
};
