const axios = require('axios');
const config = require('../config');
const db = require('./db');

let pingerInterval = null;

/**
 * Render yoki har qanday bepul serverni "uxlab qolish" (sleep mode)dan saqlovchi pinger
 */
function startPinger(botInstance) {
  const url = config.appUrl;
  const intervalMinutes = config.pingIntervalMinutes || 5;
  const intervalMs = intervalMinutes * 60 * 1000;

  if (!url || url.includes('localhost')) {
    console.log(`ℹ️ [Keep-Alive] APP_URL lokal yoki kiritilmagan (${url || 'bosh'}). Render jonli URL manzili kiritilganda tashqi ping avtomatik ishlaydi.`);
  }

  console.log(`⏰ [Keep-Alive] Serverni uyg'oq tutish xizmati ishga tushdi (Har ${intervalMinutes} daqiqada ping yuboriladi)`);

  // Dastlabki birinchi ping (10 soniyadan so'ng)
  setTimeout(() => {
    executePing(url, botInstance);
  }, 10000);

  // Doimiy interval
  pingerInterval = setInterval(() => {
    executePing(url, botInstance);
  }, intervalMs);
}

async function executePing(targetUrl, botInstance) {
  const pingEndpoint = targetUrl ? `${targetUrl}/ping` : `http://localhost:${config.port}/ping`;
  const timeStr = new Date().toLocaleTimeString('uz-UZ');

  try {
    const res = await axios.get(pingEndpoint, { timeout: 10000 });
    db.recordPing('success');
    console.log(`🟢 [Keep-Alive Ping OK] [${timeStr}] URL: ${pingEndpoint} - Javob: ${res.status}`);
  } catch (err) {
    db.recordPing('error');
    console.warn(`🟡 [Keep-Alive Ping Xatosi] [${timeStr}] Serverga so'rov yetib bormadi: ${err.message}`);
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
  stopPinger
};
