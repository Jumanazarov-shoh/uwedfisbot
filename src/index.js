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
app.use('/cases', express.static(path.join(__dirname, '..', 'public', 'cases')));

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

// Telegram Mini App sahifasi
app.get('/miniapp', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'miniapp.html'));
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
  const anonymousMessages = db.getAnonymousMessages();
  res.json({ stats, users, anonymousMessages });
});

// Anonim murojaatlarni olish
app.get('/api/anonymous', checkAuthApi, (req, res) => {
  const messages = db.getAnonymousMessages();
  res.json({ success: true, messages });
});

// Anonim murojaatga javob qaytarish
app.post('/api/anonymous/reply', checkAuthApi, async (req, res) => {
  const { id, replyText } = req.body;
  if (!id || !replyText || !replyText.trim()) {
    return res.status(400).json({ success: false, message: 'ID va javob matni kiritilishi shart' });
  }

  const updatedMsg = db.replyAnonymousMessage(id, replyText.trim());
  if (!updatedMsg) {
    return res.status(404).json({ success: false, message: 'Anonim xabar topilmadi' });
  }

  // Telegram orqali o'sha anonim talabaga javob jo'natish
  if (bot && updatedMsg.userId) {
    try {
      const escapedReply = replyText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const responseNotice = `💬 <b>UWED FIS Rahbariyatidan Javob!</b>

📌 Murojaat kodingiz: <code>${updatedMsg.code}</code>

<b>Rahbariyat javobi:</b>
<i>"${escapedReply}"</i>

💡 <i>Anonim savolingiz yoki taklifingiz uchun tashakkur!</i>`;

      await bot.telegram.sendMessage(updatedMsg.userId, responseNotice, { parse_mode: 'HTML' });
    } catch (sendErr) {
      console.warn(`[Anonim Javob] Foydalanuvchiga yuborilmadi (${updatedMsg.userId}):`, sendErr.message);
    }
  }

  res.json({ success: true, message: updatedMsg });
});

// Haftalik tahlilni olish
app.get('/api/weekly-digest', (req, res) => {
  const digest = db.getWeeklyDigest();
  res.json({ success: true, digest });
});

// Haftalik tahlilni yangilash (Admin)
app.post('/api/weekly-digest', checkAuthApi, (req, res) => {
  const { title, content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ success: false, message: 'Tahlil matni bo\'sh bo\'lishi mumkin emas' });
  }

  const saved = db.updateWeeklyDigest({ title, content });
  res.json({ success: true, digest: saved });
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
