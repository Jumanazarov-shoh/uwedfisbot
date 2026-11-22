require('dotenv').config();

module.exports = {
  botToken: process.env.BOT_TOKEN || '',
  adminPassword: process.env.ADMIN_PASSWORD || 'uwed_fis_admin_2026',
  adminTelegramId: process.env.ADMIN_TELEGRAM_ID || '',
  port: parseInt(process.env.PORT || '3000', 10),
  appUrl: (process.env.APP_URL || '').replace(/\/$/, ''),
  pingIntervalMinutes: parseInt(process.env.PING_INTERVAL_MINUTES || '5', 10),
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  isVercel: !!process.env.VERCEL,
  isRender: !!process.env.RENDER,
  nodeEnv: process.env.NODE_ENV || 'development',
};
