require('dotenv').config();

const detectedUrl = process.env.APP_URL
  || process.env.RENDER_EXTERNAL_URL
  || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '')
  || 'https://uwedfisbot.onrender.com';

module.exports = {
  botToken: process.env.BOT_TOKEN || '',
  adminPassword: process.env.ADMIN_PASSWORD || 'uwed_fis_admin_2026',
  adminTelegramId: process.env.ADMIN_TELEGRAM_ID || '6629877859',
  port: parseInt(process.env.PORT || '3000', 10),
  appUrl: detectedUrl.replace(/\/$/, ''),
  pingIntervalMinutes: parseInt(process.env.PING_INTERVAL_MINUTES || '5', 10),
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  isVercel: !!process.env.VERCEL,
  isRender: !!process.env.RENDER || !!process.env.RENDER_EXTERNAL_URL,
  nodeEnv: process.env.NODE_ENV || 'development',
};
