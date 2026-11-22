const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const db = require('./services/db');
const { setupBot } = require('./bot/bot');
const { startPinger } = require('./services/pinger');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('uwed-fis-secret-key'));
app.use(cors());

// Botni ishga tushirish
const bot = setupBot();

// Vercel serverless webhook rejimi
if (config.isVercel && bot && config.botToken) {
  app.use(bot.webhookCallback('/api/webhook'));
}

// ------------------- AUTH MIDDLEWARE -------------------
function requireAuth(req, res, next) {
  const token = req.cookies?.admin_auth_token;
  if (token === 'authenticated_' + config.adminPassword) {
    return next();
  }
  return res.redirect('/login');
}

function checkAuthApi(req, res, next) {
  const token = req.cookies?.admin_auth_token;
  const headerKey = req.headers['x-admin-key'];
  if (token === 'authenticated_' + config.adminPassword || headerKey === config.adminPassword) {
    return next();
  }
  return res.status(401).json({ success: false, message: 'Ruxsat berilmagan' });
}

// ------------------- VIEW ROUTES -------------------
app.get('/', (req, res) => {
  res.redirect('/admin');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/admin', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

// ------------------- KEEP-ALIVE & HEALTH CHECK -------------------
app.get('/ping', (req, res) => {
  db.recordPing('external_ping');
  res.status(200).json({
    status: 'ALIVE',
    service: 'UWED FIS Knowledge Bot',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    serverTime: new Date().toISOString()
  });
});

// ------------------- ADMIN API ROUTES -------------------
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === config.adminPassword) {
    res.cookie('admin_auth_token', 'authenticated_' + config.adminPassword, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 kun
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'lax'
    });
    return res.json({ success: true });
  }
  return res.status(400).json({ success: false, message: "Parol noto'g'ri kiritildi!" });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('admin_auth_token');
  res.json({ success: true });
});

app.get('/api/stats', checkAuthApi, (req, res) => {
  const stats = db.getStats();
  const users = db.getAllUsers();
  res.json({ stats, users });
});

// Barcha a'zolarga xabar yuborish (Broadcast)
app.post('/api/broadcast', checkAuthApi, async (req, res) => {
  if (!bot) {
    return res.status(500).json({ success: false, message: 'Bot ishga tushmagan yoki token xato!' });
  }

  const { text, buttonText, buttonUrl } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ success: false, message: 'Xabar matni bo\'sh bo\'lishi mumkin emas' });
  }

  const users = db.getAllUsers();
  if (!users.length) {
    return res.status(400).json({ success: false, message: 'Bazada hozircha birorta ham foydalanuvchi yo\'q' });
  }

  let sentCount = 0;
  let failCount = 0;

  // Ixtiyoriy tugma
  let extra = { parse_mode: 'HTML' };
  if (buttonText && buttonUrl) {
    extra.reply_markup = {
      inline_keyboard: [[{ text: buttonText, url: buttonUrl }]]
    };
  }

  // Telegram spam chegarasini buzmaslik uchun xabarlarni navbat bilan (delay bilan) yuboramiz
  for (const user of users) {
    try {
      await bot.telegram.sendMessage(user.id, text, extra);
      sentCount++;
      // Har bir xabardan keyin 45ms kutish (sekundiga ~25 xabar)
      await new Promise(r => setTimeout(r, 45));
    } catch (err) {
      // Agar HTML xato bersa, oddiy matn sifatida qayta urinib ko'ramiz
      try {
        const plainExtra = { ...extra };
        delete plainExtra.parse_mode;
        await bot.telegram.sendMessage(user.id, text, plainExtra);
        sentCount++;
        await new Promise(r => setTimeout(r, 45));
      } catch (retryErr) {
        failCount++;
        console.warn(`[Broadcast] Foydalanuvchiga yuborilmadi (${user.id}): ${retryErr.message}`);
      }
    }
  }

  db.addBroadcast({
    text,
    success_count: sentCount,
    fail_count: failCount
  });

  return res.json({
    success: true,
    sentCount,
    failCount,
    total: users.length
  });
});

// ------------------- SERVER START -------------------
const PORT = config.port;

if (!config.isVercel) {
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 UWED FIS Bot & Admin Dashboard ishga tushdi!`);
    console.log(`🌐 Sayt & Admin Panel: http://localhost:${PORT}`);
    console.log(`🔑 Admin kirish paroli: ${config.adminPassword}`);
    console.log(`======================================================\n`);

    // Botni polling rejimida yoqish
    if (bot && config.botToken) {
      bot.launch()
        .then(() => {
          console.log('🤖 Telegram bot muvaffaqiyatli ulandi (Polling rejimi)');
          // Keep-Alive pinger xizmatini ishga tushirish
          startPinger(bot);
        })
        .catch((err) => {
          console.error('❌ Telegram botni yoqishda xatolik:', err.message);
          console.log('👉 .env faylida BOT_TOKEN to\'g\'ri kiritilganligini tekshiring.');
        });
    } else {
      console.warn('⚠️ BOT_TOKEN kiritilmagan. Bot faollashmadi, faqat Web Admin ishlamoqda.');
    }
  });

  // Graceful Stop
  process.once('SIGINT', () => bot && bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot && bot.stop('SIGTERM'));
}

module.exports = app;
