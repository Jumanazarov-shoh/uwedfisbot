# 🏛 UWED FIS Knowledge Bot & Admin Dashboard

**UWED Finance and Investment Society (FIS)** uchun maxsus ishlab chiqilgan rasmiy Telegram bilimlar boti, interaktiv moliyaviy tahlil assistenti, Web Admin boshqaruv paneli va Render serverini uxlab qolmasligi uchun Keep-Alive (5 daqiqalik pinger) tizimi.

---

## 🌟 Asosiy Imkoniyatlar

1. **Telegram Knowledge Bot (@uwed_fis_bot):**
   - 📊 **Moliya & Baholash (Valuation):** DCF modeli, Bozor multiplikatorlari (P/E, EV/EBITDA, P/B), LBO va Private Equity asoslari.
   - 🏆 **Vertex Case Competition Metodikasi:** MECE tahlil, Issue Tree, TAM/SAM/SOM bozor o'lchami va 50 daqiqalik tezkor keys yechish taktikasi.
   - 💼 **IB & Consulting Intervyu Savollari:** "Walk me through a DCF", 3 ta moliyaviy hisobot o'rtasidagi bog'liqlik va klassik texnik savollar.
   - 🤖 **AI Moliyaviy Maslahatchi:** Talabalarning istalgan erkin moliyaviy savollariga AI (Gemini / GPT / Smart Knowledge Base) orqali professional javob berish.
   - 👥 **Avtomatik Foydalanuvchilar Bazasi:** Botga start bosgan har bir talabaning ID, ism va username'larini bazada saqlash.

2. **Web Admin Dashboard (`/admin`):**
   - 🔐 Parol bilan himoyalangan xavfsiz boshqaruv paneli.
   - 📈 Jonli statistika: Jami talabalar/a'zolar soni, xabarlar soni, server uptime va oxirgi faollik.
   - 📢 **Broadcast (Hammaga xabar yuborish):** Bir tugma bilan barcha bot foydalanuvchilariga e'lonlar, yangi tadbirlar, Vertex musobaqalari haqida matn va havolali tugmalar yuborish.
   - 📋 Foydalanuvchilar ro'yxatini ko'rish, qidirish va CSV formatda yuklab olish.
   - 📜 Jonli server va ping loglari.

3. **Render Sleep-Protection (Keep-Alive Pinger):**
   - Render bepul tarifida veb-servislar 15 daqiqa harakatsizlikdan so'ng avtomatik "uxlab" qoladi.
   - Ushbu loyiha **har 5 daqiqada o'zining `/ping` manziliga avtomatik so'rov yuborib**, serverni 24/7 uyg'oq va faol ushlab turadi.

---

## 🚀 Loyihani Lokal Ishga Tushirish (Kompyuterda)

### 1. Papkaga kiring:
```bash
cd "C:\Users\lenovo\Desktop\uwed-fis-bot"
```

### 2. Bog'liqliklarni o'rnating:
```bash
npm install
```

### 3. `.env` faylini sozlang:
`.env.example` faylidan nusxa olib `.env` nomli fayl yarating va Telegram bot tokeningizni kiriting:
```env
BOT_TOKEN=123456789:ABCDefGhIJKlmNoPQRsTUVwxyZ_1234567
ADMIN_PASSWORD=uwed_fis_admin_2026
PORT=3000
APP_URL=http://localhost:3000
PING_INTERVAL_MINUTES=5
```

### 4. Ishga tushiring:
```bash
npm start
```
Brauzerda oching: `http://localhost:3000/admin`  
Parol: `uwed_fis_admin_2026`

---

## ☁️ Render.com ga Bepul Deploy Qilish (Tavsiya etiladi)

Render 24/7 rejimda Telegram bot va Admin panelni bepul ishlatish uchun ideal.

1. Loyihani **GitHub** repozitoriysiga yuklang (`git init`, `git add .`, `git commit`, `git push`).
2. [Render.com](https://render.com) ga kiring va **"New +" ➔ "Web Service"** tugmasini bosing.
3. GitHub repozitoriysini tanlang.
4. Quyidagi parametrlarni kiriting:
   - **Name:** `uwed-fis-bot`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`
5. **Environment Variables (Muhit o'zgaruvchilari)** bo'limiga quyidagilarni kiriting:
   - `BOT_TOKEN` = *sizning @BotFather bergan tokeningiz*
   - `ADMIN_PASSWORD` = *admin panelingiz uchun maxfiy parol*
   - `APP_URL` = `https://uwed-fis-bot.onrender.com` *(Render sizga beradigan servis manzili)*
   - `PING_INTERVAL_MINUTES` = `5`
6. **"Create Web Service"** tugmasini bosing.
   - Render loyihani o'rnatadi.
   - Botingiz Telegramda darhol ishlay boshlaydi!
   - `https://uwed-fis-bot.onrender.com/admin` orqali admin panelga kirasiz.

### 🛡️ Render Uxlab Qolmasligini 100% Kafolatlash:
Botingizdagi ichki pingerdan tashqari, tashqi mustaqil pinger ham ulab qo'ysangiz, Render serveri **hech qachon to'xtamaydi**:
1. [Cron-Job.org](https://cron-job.org) yoki [UptimeRobot.com](https://uptimerobot.com) bepul saytiga kiring.
2. Yangi monitor/cron-job qo'shing:
   - **URL:** `https://uwed-fis-bot.onrender.com/ping`
   - **Interval:** Har 5 daqiqada (`Every 5 minutes`)
3. Saqlang. Endi server 365 kun, 24 soat to'xtovsiz ishlaydi!

---

## ⚡ Vercel ga Deploy Qilish

Agar botni Vercel serverless platformasiga qo'ymoqchi bo'lsangiz:
1. `vercel` CLI orqali yoki Vercel veb-saytidan loyihani ulang.
2. Vercel boshqaruv panelida (Settings ➔ Environment Variables) quyidagi o'zgaruvchilarni kiriting:
   - `BOT_TOKEN`
   - `ADMIN_PASSWORD`
   - `VERCEL=1`
3. Telegram bot Webhook manzilini sozlang:
   Brauzeringizda quyidagi havolani oching:
   ```
   https://api.telegram.org/bot<SIZNING_BOT_TOKEN>/setWebhook?url=https://sizning-loyiha.vercel.app/api/webhook
   ```

---

## 📱 Bot Komandalari va Tugmalari

- `/start` — Botni qayta ishga tushirish va asosiy menyu;
- 📊 **Moliya & Baholash** — DCF, Multiplikatorlar va LBO bo'yicha interaktiv qo'llanmalar;
- 🏆 **Vertex Keys Metodikasi** — Chempionatga tayyorgarlik va MECE freymvorklari;
- 💼 **IB & Consulting Intervyu** — Intervyu savol-javoblari;
- 🤖 **AI Moliyaviy Assistent** — Savol berish imkoniyati;
- 📢 **Admin Xabari** — Admin paneldan yozilgan har qanday e'lon barcha foydalanuvchilarga yetib boradi.

---

## 📁 Loyiha Strukturasi

```
uwed-fis-bot/
├── src/
│   ├── index.js             # Asosiy Express server, webhook va admin yo'llari
│   ├── config.js            # Sozlamalar va muhit o'zgaruvchilari
│   ├── bot/
│   │   ├── bot.js           # Telegram bot komandalari va xabarlar mantiqi
│   │   ├── keyboards.js     # Telegram interaktiv klaviaturalari
│   │   └── knowledge.js     # Moliya, IB va Vertex bo'yicha bilimlar bazasi
│   ├── services/
│   │   ├── db.js            # Foydalanuvchilar va statistika bazasi
│   │   ├── pinger.js        # Render'ni 5 daqiqada uyg'otib turuvchi pinger
│   │   └── ai.js            # AI savol-javob servisi (Gemini / OpenAI / Smart Search)
│   └── views/
│       ├── login.html       # Admin tizimiga kirish sahifasi
│       └── admin.html       # Statistika, Foydalanuvchilar va Broadcast paneli
├── .env.example             # Namuna sozlamalar
├── render.yaml              # Render 1-click avtomatlashtirilgan deploy sozlamasi
├── vercel.json              # Vercel serverless sozlamasi
└── package.json             # Loyiha paketlari
```
