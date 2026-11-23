/**
 * UWED FIS (Finance & Investment Society) Bilimlar Bazasi
 * Standart: vertex-case-designer (Japanese Industrial Minimalism, 0 buzzwords, aniq arifmetika)
 */

module.exports = {
  aboutClub: `🏛 <b>UWED Finance and Investment Society (FIS)</b>

<b>Biz kimmiz?</b>
Jahon iqtisodiyoti va diplomatiya universiteti (JIDU/UWED) talabalarining yetakchi moliya va investitsiyalar jamiyati.

🎯 <b>Bizning asosiy tamoyillarimiz:</b>
• Talabalarda zamonaviy moliya, investitsiya tahlili va amaliy keys yechish intizomini shakllantirish;
• Ilmiy jargon va quruq nazariyadan (SWOT/PESTEL) xoli, real biznes amaliyotiga asoslangan tahlil;
• Vertex Case Competition — milliy va xalqaro biznes-keys chempionatlari maktabi.

🏆 <b>Asosiy loyihalarimiz:</b>
• <b>Vertex Case Competition</b> — yillik nufuzli biznes va operatsion keys-chempionati;
• <b>Weekly Market Digest</b> — O'zbekiston va global bozorlar tahlili;
• <b>Financial Modeling Lab</b> — DCF, LBO va korporativ baholash;
• <b>AI in Finance</b> — zamonaviy tahliliy vositalar va avtomatlashtirish.`,

  caseAccessRestricted: `🔒 <b>Hozircha kirish ruxsati yo'q!</b>

Keyslar bazasi <b>Vertex Case Competition</b> chempionati to'liq yakunlangandan so'ng barcha talabalar uchun ochiq e'lon qilinadi. 🏆

Ungacha <b>📚 Moliya Lug'ati</b>, <b>📰 Haftalik Bozor Tahlili</b> va <b>🤖 AI Assistent</b> bo'limlaridan bemalol foydalanishingiz mumkin.`,

  vertexInfo: `🔒 <b>FIS | Vertex Case Competition — Keyslar Bazasi</b>

<b>Hozircha kirish ruxsati yo'q!</b>
Keyslar bazasi va etalon yechimlar <b>Vertex Case Competition</b> chempionati to'liq yakunlangandan keyin e'lon qilinadi. 🏆

Ungacha botning boshqa bilimlar bo'limlaridan foydalanishingiz mumkin.`,

  // Har bir keys bo'yicha to'liq etalon tahlil
  casesData: {
    toyota: {
      title: "Toyota Motor Corp — Ko'proq Avtomobil, O'sha Sifat",
      file: "TOYOTA_Vertex_Business_Case_UZ.pdf",
      format: "50 daqiqalik oflayn tezkor keys (Speed Round)",
      difficulty: "5/10 (1-kurs talabalari uchun kalibratsiyalangan)",
      summary: `🏎 <b>TOYOTA MOTOR CORP — RASMIY VERTEX KEYSI</b>
📄 <i>Fayl: TOYOTA_Vertex_Business_Case_UZ.pdf (O'zbek tilida)</i>

🎯 <b>Markaziy Strategik Savol:</b>
Plant Alpha zavodi oyiga 20,000 ta avtomobil yig'moqda (maksimal quvvat: 22,000). Bozor talabi esa oyiga 26,000 ta. Har oy 6,000 ta avtomobil taqchilligi (shortage) yuzaga kelmoqda, mijozlar 7 oy kutmoqda va 18% buyurtmalar bekor qilinmoqda.
<b>$15,000,000 byudjet bilan ushbu taqchillikni qanday yopasiz va 0.12% lik oltin sifat standartini qanday saqlaysiz?</b>

⚖️ <b>Strategik Yo'llar:</b>
• <b>A Yo'li (Qo'shimcha smena):</b> Oyiga +3,000 ta mashina, lekin ishchilar toliqishi va sifat 0.28% ga yomonlashuvi xavfi bor;
• <b>B Yo'li (Soddalashtirish):</b> 12 ta kam sotiladigan opsiyalarni to'xtatish orqali oyiga +2,500 ta mashina (sifatga zarar yetmaydi);
• <b>C Yo'li (Robotlashtirish):</b> $12M xarajat evaziga oyiga +3,000 ta mashina beradi, ammo o'rnatish 7-8 oy vaqt oladi.

💡 <b>G'olib Jamoa Yechimi (Gibrid Yondashuv):</b>
1. <b>1–6 oylarda:</b> B yo'li (+2,500) + A yo'lidan eng tor 2 ta liniyada kichik smena (+1,000) = Dastlabki oydayoq +3,500 ta mashina! Kutish vaqti 7 oydan 3.5 oyga tushadi;
2. <b>7-oydan:</b> C Robotlari ishga tushadi (+3,000 ta), ortiqcha smenalar to'xtatiladi. Taqchillik 92% ga yopiladi (atigi 500 ta qoladi);
3. <b>$15M byudjet:</b> $11.5M robotlarga, $2.5M tor smenaga, $1M zaxiraga.

📊 <b>Hakamlar 100 ballik baholash shkalasi:</b>
• Muammo va Andon tamoyili (25 b)
• Arifmetika va byudjet taqsimoti (25 b)
• Sifat va xatarlarni boshqarish (25 b)
• 6 oylik harakatlar rejasi va 2 ta KPI (25 b)`
    },

    amazon: {
      title: "Amazon.com — Tezroq Yetkazish, O'sha Ishonch",
      file: "AMAZON_Vertex_Business_Case_UZ.pdf",
      format: "50 daqiqalik oflayn tezkor keys",
      difficulty: "5/10 (Operatsion logistika)",
      summary: `📦 <b>AMAZON.COM — RASMIY VERTEX KEYSI</b>
📄 <i>Fayl: AMAZON_Vertex_Business_Case_UZ.pdf (O'zbek tilida)</i>

🎯 <b>Markaziy Strategik Savol:</b>
'Delta' mintaqaviy saralash markazida oylik talab 2,250,000 ta posilka, real quvvat esa 1,800,000 ta (oyiga 450,000 ta yetishmovchilik). O'z vaqtida yetkazish 89.2% ga tushib ketgan (Prime standarti: 98.5%). Buyurtmalarni bekor qilish 14% ga yetgan.
<b>$12,000,000 byudjet bilan oylik 450,000 ta posilka defitsitini qanday qoplaysiz?</b>

⚖️ <b>Strategik Yo'llar:</b>
• <b>A Yo'li (Qo'shimcha kuryerlar):</b> Oyiga +300,000 ta, ammo kuryerlar shoshilib qutilarni ezadi va xarajat byudjetdan oshib ketadi;
• <b>B Yo'li (Hub Locker & 4 Standart quti):</b> Shahar bo'ylab 50 ta Hub Locker qo'yish va qutilarni standartlashtirish evaziga oyiga +200,000 ta ($2.5M);
• <b>C Yo'li (Kiva Robotlari):</b> $8.5M evaziga avtomatik saralash (+250,000 ta/oy), ammo 6 oy vaqt oladi.

💡 <b>G'olib Jamoa Yechimi (Gibrid Yondashuv):</b>
1. <b>Byudjet taqsimoti:</b> $8.5M Kiva robotlariga + $2.5M Hub Locker va quti standartlashtirishga + $750k dam olish kunlari vaqtinchalik guruhiga + $250k zaxira fondi (Jami $12M);
2. <b>Natija:</b> 1-oydayoq +300,000 ta o'sish, 6-oydan keyin esa taqchillik 100% ga yopiladi (2,250,000 ta/oy). O'z vaqtida yetkazish 98.8% ga chiqadi va bekor qilish 1.5% ga tushadi!

📊 <b>Hakamlar 100 ballik baholash shkalasi (5 Mezon × 20 Ball):</b>
• 1-Topshiriq: Muammoni anglash va Virtual Andon (20 b)
• 2-Topshiriq: Strategik tanlov va $12M byudjet arifmetikasi (20 b)
• 3-Topshiriq: Sifat va xatarlarni boshqarish (98.5% Prime) (20 b)
• 4-Topshiriq: 6 oylik harakatlar rejasi va 2 ta KPI (20 b)
• 5-Topshiriq: Taqdimot madaniyati, Teamwork va Q&A (20 b)`
    },

    tbc: {
      title: "TBC Bank Uzbekistan — Raqamli Kengayish",
      file: "TBC_Bank_Vertex_Case_UZ.pdf",
      format: "Kengaytirilgan strategik keys",
      difficulty: "6/10 (FinTech & Banking)",
      summary: `🏦 <b>TBC BANK UZBEKISTAN — RASMIY VERTEX KEYSI</b>
📄 <i>Fayl: TBC_Bank_Vertex_Case_UZ.pdf (O'zbek tilida)</i>

🎯 <b>Keys Mohiyati:</b>
O'zbekistondagi birinchi to'liq raqamli neobank — TBC Bank filial ochmasdan qanday qilib an'anaviy yirik banklar bilan raqobatlasha oladi?
Payme to'lov tizimi bilan integratsiya, mijoz jalb qilish xarajatlarini (CAC) kamaytirish, depozitlar jalb qilish va kreditlar bo'yicha NPL (muammoli kreditlar) ulushini 3% dan past saqlash strategiyasi.

💡 <b>Ideal Yechim Yo'nalishi:</b>
• Kichik va o'rta biznes (KOB) uchun avtomatlashtirilgan raqamli faktoring;
• Payme orqali kunlik tranzaksion mijozlarni arzon depozit mahsulotlariga konvertatsiya qilish;
• 25%+ ROE (kapital rentabelligi)ga erishishning moliyaviy modeli.`
    },

    spotify: {
      title: "Spotify — Musiqa Strimingi va Royalti Tahlili",
      file: "Spotify_Vertex_Case_UZ.pdf",
      format: "Global biznes tahlili keysi",
      difficulty: "5/10 (Media & Entertainment)",
      summary: `🎵 <b>SPOTIFY — RASMIY VERTEX KEYSI</b>
📄 <i>Fayl: Spotify_Vertex_Case_UZ.pdf (O'zbek tilida)</i>

🎯 <b>Keys Mohiyati:</b>
Spotify har $1 daromadidan 70 sentdan ortig'ini musiqa mualliflari va ovoz yozish studiyalariga (Universal, Sony, Warner) to'lashga majbur. Kompaniya foydalanuvchilar soni bo'yicha dunyoda 1-o'rinda bo'lsa-da, uzoq yillar zarar bilan ishladi.

💡 <b>Ideal Yechim Yo'nalishi:</b>
• O'z podkast va audiokitoblar ekotizimini kengaytirish (chunki ularda royalti foizi 2-3 barobar past);
• Free tinglovchilar uchun AI-targetlangan audio-reklama tarmog'ini yaratish;
• San'atkorlarga to'g'ridan-to'g'ri konsert chiptalari va merchni sotish imkoniyatini beruvchi Marketplace modeliga o'tish.`
    },

    ikea: {
      title: "IKEA — Kichik Makonlar, Katta Qarorlar",
      file: "IKEA_Vertex_Case_UZ.pdf",
      format: "Chakana savdo va logistika keysi",
      difficulty: "5/10 (Retail & Supply Chain)",
      summary: `🛋 <b>IKEA — RASMIY VERTEX KEYSI</b>
📄 <i>Fayl: IKEA_Vertex_Case_UZ.pdf (O'zbek tilida)</i>

🎯 <b>Keys Mohiyati:</b>
Shahar aholisi tobora ixcham xonadonlarga ko'chmoqda. IKEA o'zining shahar tashqarisidagi ulkan megastorlaridan shahar markazlaridagi kichik "Studio" formatiga o'tishda yetkazib berish zanjirini qanday optimallashtirishi kerak?

💡 <b>Ideal Yechim Yo'nalishi:</b>
• Modulli, transformatsiyalanuvchi mebellar liniyasi;
• Flat-pack qadoqlashni 15% ga zichlashtirish hisobiga yuk mashinalari yoqilg'i sarfini tejash;
• 24 soatlik shahar ichi omborlaridan mikro-logistika zanjiri.`
    },

    duolingo: {
      title: "Duolingo — Gamifikatsiya va Generativ AI",
      file: "Duolingo_Vertex_Case_UZ.pdf",
      format: "EdTech & AI monetizatsiya keysi",
      difficulty: "5/10 (Technology & Product Strategy)",
      summary: `🦉 <b>DUOLINGO — RASMIY VERTEX KEYSI</b>
📄 <i>Fayl: Duolingo_Vertex_Case_UZ.pdf (O'zbek tilida)</i>

🎯 <b>Keys Mohiyati:</b>
Duolingo oylik 80+ million aktiv o'quvchilarga ega, ammo ularning atigi 8.6% i pullik obunachilar. Bepul foydalanuvchilarni bezdirmagan holda qanday qilib pullik konversiyani oshirish mumkin?

💡 <b>Ideal Yechim Yo'nalishi:</b>
• GPT-4/Claude asosidagi shaxsiy suhbatdosh (Roleplay) funksiyasini faqat pullik Duolingo Max paketiga kiritish;
• Xatolarni tushuntiruvchi shaxsiy AI-tyutor orqali premium xizmat qadrini oshirish;
• Maktab va korporativ til o'rgatish segmentiga B2B litsenziyalar sotish.`
    }
  },

  // Bozor tahlili markazi (Bosh menyu)
  digestHub: `📊 <b>UWED FIS — Bozor Tahlili va Makroiqtisodiyot Markazi</b>
🗓 <i>Davr: 2026-yil, Noyabr oyi</i>

Bozor tahlili bo'limiga xush kelibsiz! O'qishga qulay bo'lishi uchun ma'lumotlar ikkita mustaqil yo'nalishga ajratildi:

📊 <b>1. Asosiy Makro Raqamlar</b>
O'zbekistonning YaIM, Markaziy bank stavkasi, inflyatsiya (CPI), so'm kursi, tashqi savdo, oltin ulushi va investitsiyalar bo'yicha eng so'nggi rasmiy statistik ko'rsatkichlari.

📰 <b>2. Hafta Yangiliklari</b>
Toshkent Fond Birjasi (UZSE), xalqaro moliya bozorlari (Fed, S&P 500), oltin va neft dinamikasi hamda Vertex keyslari uchun tahlilchi xulosalari.

👇 <i>Kerakli bo'limni tanlang:</i>`,

  // 1-Bo'lim: Asosiy Makro Raqamlar (O'ta qulay mobil formatda)
  macroNumbers: `📊 <b>O'ZBEKISTONNING ASOSIY MAKRO RAQAMLARI</b>
🗓 <i>Davr: 2025-yil yakunlari & 2026-yil prognozlari</i>
━━━━━━━━━━━━━━━━━━━━

🏛 <b>1. Markaziy Bank Asosiy Stavkasi</b>
├ • <b>Amaldagi stavka:</b> <code>14.0%</code>
├ • <b>Holat:</b> Qat'iy pul-kredit siyosati
└ • <b>Maqsad:</b> Inflyatsiyani jilovlash va narxlar barqarorligi

📈 <b>2. Yalpi Ichki Mahsulot (YaIM / GDP)</b>
├ • <b>YaIM hajmi:</b> <code>$147.0 mlrd</code> (+7.7% yuqori o'sish)
├ • <b>Aholi jon boshiga:</b> <code>$3,846</code>
└ • <b>2026 prognozi:</b> <code>6.5% – 7.0%</code> barqaror o'sish

🎯 <b>3. Inflyatsiya Ko'rsatkichlari (CPI)</b>
├ • <b>Yillik umumiy inflyatsiya:</b> <code>7.3%</code> (2024-yildagi 9.8% dan pasaygan)
├ • <b>Bazaviy inflyatsiya:</b> <code>5.7%</code>
└ • <b>2026-yil kutilmasi:</b> <code>~6.5%</code> atrofida

💱 <b>4. Valyuta Kursi (USD / UZS)</b>
├ • <b>Bozor koridori:</b> <code>12,242 – 12,800 so'm</code>
├ • <b>Trend:</b> Oltin tushumlari va qat'iy stavka hisobiga barqaror
└ • <b>2026 kutilmasi:</b> Keskin siljishlarsiz mo''tadil dinamika

🌐 <b>5. Tashqi Savdo Aylanmasi</b>
├ • <b>Jami savdo:</b> <code>$81.2 mlrd</code> (+20.7%)
├ • <b>Eksport:</b> <code>$33.8 mlrd</code> (+24%)
├ • <b>Oltin eksporti ulushi:</b> Eksportning <code>~30%</code> qismi
├ • <b>Import hajmi:</b> <code>$47.3 mlrd</code> (+18.5%)
└ • <b>Xizmatlar eksporti:</b> <code>$9.8 mlrd</code> (+28.9%)

💼 <b>6. Investitsiyalar Oqimi</b>
├ • <b>O'zlashtirilgan jami:</b> <code>$43.1 mlrd</code> (+24%)
├ • <b>To'g'ridan-to'g'ri xorijiy (FDI):</b> <code>$38.2 mlrd</code>
└ • <b>Xalqaro institutlar:</b> <code>$4.9 mlrd</code>

⚖️ <b>7. Davlat Byudjeti Taqchilligi</b>
└ • <b>2026 chegarasi:</b> YaIMning <code>3.0%</code> miqdorida (O'RQ-1105)
━━━━━━━━━━━━━━━━━━━━
📱 <i>UWED FIS Tahliliy Manbasi: @uwed_fis</i>`,

  // Hafta yangiliklari kategoriyalari markazi (5 ta alohida yo'nalish)
  newsHub: `📰 <b>UWED FIS — Haftalik Tahliliy Yangiliklar Markazi</b>
🗓 <i>Davr: 2026-yil, Noyabr oyi</i>

O'zbekiston va jahon moliya bozoridagi eng sara tahlillar 5 ta aniq yo'nalishga ajratildi:

🇺🇿 <b>1. O'zbekiston</b> — Milliy IPO dasturlari (Uzbekistan Airways, SQB), MB stavkasi kutilmalari va YaIM.
🏦 <b>2. Jahon Moliyasi</b> — AQSH Fed va ECB stavkalari, inflyatsiya targetlari, US Treasuries va $225B texno-qarzlar.
💼 <b>3. Jahon Investitsiya</b> — Global $227B IPO rekordi (Anthropic, SpaceX, OpenAI), M&A va J.P. Morgan venchur tahlili.
🌐 <b>4. Jahon Iqtisodi</b> — Oltin rekordi ($2,650–$2,700/oz), Brent nefti va global YaIM o'sishi.
🚀 <b>5. Startap Tizimi</b> — AI mega-raundlari (80% kapital ulushi), xAI ($250B) va orbital hisoblash infratuzilmasi.

👇 <i>Kerakli tahlil bo'limini tanlang:</i>`,

  // 5 ta alohida bo'lim matnlari (NotebookLM Deep Research asosida)
  newsCategories: {
    uzb: `🇺🇿 <b>O'ZBEKISTON MOLIYAVIY VA IQTISODIY SHARHI</b>
🗓 <i>Haftalik Tahlil | Manba: Iqtisodiyot va moliya vazirligi & CBU</i>
━━━━━━━━━━━━━━━━━━━━

🏢 <b>1. Yirik Milliy IPO Dasturi (2026–2028)</b>
├ • <b>Rejalashtirilgan Emitentlar:</b> Fond birjasiga 4 ta yirik davlat kompaniyasi va 1 ta bank chiqarilmoqda:
│  1. <b>Uzbekistan Airways</b> — aksiyalarining <code>15–20%</code> qismi sotiladi
│  2. <b>O'zsanoatqurilishbank (SQB)</b> — xususiylashtirish va ochiq listing
│  3. <b>O'zbektelekom (Uztelecom)</b> — milliy telekom giganti
│  4. <b>O'zbekiston MET</b> — elektr uzatish tarmoqlari
│  5. <b>O'zbekgidroenergo</b> — gidroenergetika ishlab chiqarish
├ • <b>Franklin Templeton va NIF:</b> Mazkur aktivlar AQSHning <i>Franklin Templeton</i> boshqaruvidagi Milliy investitsiya jamg'armasi (NIF) portfeliga kiritilgan.
└ • <b>$692M Tushum:</b> Jamg'arma aksiyalarining <code>35.45%</code> i London (LSE GDR) va Toshkent (UZSE) birjalarida muvaffaqiyatli joylashtirilib, davlat byudjetiga <b>$692 million</b> keltirdi. Investorlar kunida $2.5T lik portfelga ega 250+ xorijiy investor qatnashdi.

🏛 <b>2. Markaziy Bank Foiz Stavkasi va Kutilmalar</b>
├ • <b>Amaldagi Stavka:</b> <code>14.00%</code> (martdan buyon o'zgarishsiz qat'iy saqlanmoqda; navbatdagi 16-dekabr yig'ilishida ham 14% saqlanishi kutilmoqda)
├ • <b>Stavka Prognozi (Trading Economics & CBU):</b> 2026 Q4: <code>14.0%</code> ➔ 2027: <code>13.0%</code> ➔ 2028: <code>12.0%</code>
├ • <b>Inflyatsiya Dinamikasi:</b> Yillik inflyatsiya <code>6.4%</code> (bazaviy <code>5.5%</code>), aholi kutilmasi <code>9.1%</code>. Yil yakuni prognozi <code>7.0%</code> atrofida
└ • <b>O'rta Muddatli Target:</b> Markaziy bank <code>5.0%</code> lik inflyatsiya targetiga 2027-yil oxiriga borib erishishni maqsad qilgan

📈 <b>3. Makroiqtisodiy Sur'at</b>
├ • <b>YaIM O'sishi:</b> 2026-yil 9 oyida YaIM <code>8.3%</code> ga o'sdi (yillik rasmiy prognoz <code>7.5% – 8.0%</code> ga ko'tarildi)
└ • <b>Davlat Byudjeti:</b> 2026 konsolidatsiyalashgan byudjet taqchilligi YaIMning <code>3.0%</code> miqdorida qat'iy cheklandi (O'RQ-1105)
━━━━━━━━━━━━━━━━━━━━
📱 <i>UWED FIS Tahliliy Manbasi: @uwed_fis</i>`,

    finance: `🏦 <b>JAHON MOLIYASI SHARHI (GLOBAL FINANCE)</b>
🗓 <i>Haftalik Tahlil | Manba: Fed, ECB & Trading Economics</i>
━━━━━━━━━━━━━━━━━━━━

🏛 <b>1. AQSH Federal Zaxira Tizimi (Fed) Siyosati</b>
├ • <b>Amaldagi Stavka:</b> <code>3.75% – 4.00%</code> (4.00% darajasida)
├ • <b>Inflyatsion Bosim:</b> Sentyabr oyi CPI ko'rsatkichi <code>3.7%</code> ga tezlashdi (oldingi oyda 3.4%), ishlab chiqaruvchilar narxlari indeksi (PPI) esa <code>6.3%</code> o'sdi
├ • <b>Yaqin Kutilma:</b> Dekabr yig'ilishida stavka bo'yicha 25 b.p. o'zgarish ehtimoli muhokama qilinmoqda; Fed rasmiylari qat'iylikni saqlamoqda
├ • <b>Stavka Trayektoriyasi:</b> 2026 Q4: <code>4.25%</code> ➔ 2027: <code>4.25%</code> ➔ 2028: <code>4.00%</code>
└ • <b>Fed Islohoti:</b> Rais Kevin Uorsh 2027-yildan stavkalar bo'yicha ovoz berish yig'ilishlari sonini qisqartirishini ma'lum qildi

💶 <b>2. Yevropa Markaziy Banki (ECB) va BOJ</b>
├ • <b>ECB Qarori:</b> Yevrozona inflyatsiyasi va sust iqtisodiy o'sish fonida foiz stavkalari muvozanatlashtirilmoqda
└ • <b>Yaponiya Banki (BOJ):</b> Tarixiy manfiy stavkalar davridan so'ng, iensani mustahkamlash maqsadida stavkalarni bosqichma-bosqich ko'tarishga tayyorlanmoqda

💵 <b>3. Giperskeylerlar Qarzi va Obligatsiyalar</b>
├ • <b>$225B Texnologik Emissiya:</b> Yirik giperskeylerlar (Microsoft, Amazon, Meta, Alphabet) yil boshidan buyon <code>$225 milliard</code>lik investitsiya darajasidagi qarz chiqardi — bu ularning o'tgan 4 yillik jami emissiyasidan ko'p!
├ • <b>AQSH Davlat Qarzi:</b> <code>$40 trillion</code> chegarasidan oshdi
└ • <b>US 10-Year Treasuries:</b> 10 yillik davlat obligatsiyalari daromadliligi <code>4.15% – 4.30%</code> atrofida tebranmoqda
━━━━━━━━━━━━━━━━━━━━
📱 <i>UWED FIS Tahliliy Manbasi: @uwed_fis</i>`,

    invest: `💼 <b>JAHON INVESTITSIYALARI SHARHI (GLOBAL INVESTMENTS)</b>
🗓 <i>Haftalik Tahlil | Manba: PwC UK IPO Watch & MSCI</i>
━━━━━━━━━━━━━━━━━━━━

🚀 <b>1. Global IPO Bozorida Tarixiy Rekord (PwC UK)</b>
├ • <b>$227.3Mrd Global Tushum:</b> 2026-yil boshidan buyon IPO tushumlari <code>$227.3 milliard</code>ga yetib, 2021-yildan keyingi eng yuqori natijani qayd etdi
├ • <b>Sur'at:</b> Yilning 1-yarmida IPO tushumlari 205% ga o'sib, <code>$178 milliard</code>ni (524 ta bitim) tashkil etdi
├ • <b>EMEA Mintaqasi:</b> IPO tushumlari <code>$15.4 milliard</code>ga, Yevropada esa <code>€8.8 milliard</code>ga yetdi
└ • <b>LSE Va London Birjasi:</b> O'zbekiston Milliy investitsiya jamg'armasi GDR listingi ($692M) va Afrika FinTech kompaniyasi (£5.3B baholash) London bozorini faollashtirdi

🏢 <b>2. Tarixiy Texnologik IPOlar va Baholashlar</b>
├ • <b>Anthropic ("ANT"):</b> Nasdaq birjasida har bir aksiyani <code>$83</code> dan sotib, <b>$81 milliarddan ortiq</b> mablag' jalb qildi (kapitallashuvi <code>~$1.5 trillion</code>)
├ • <b>SpaceX (2026-yil iyun):</b> Tarixiy <b>$75 milliard</b> mablag' jalb qildi; aksiyalar uchun 1 yildan ortiq bosqichli <i>lockup</i> cheklovi belgilandi
├ • <b>OpenAI (2027 kutilmasi):</b> <code>$1.4 trillion</code> baholashda $30 milliardgacha mablag' jalb qilishni rejalashtirgan, CFO Sara Friar 2027-yilda listing bo'lishini bildirdi
└ • <b>Databricks:</b> <code>$190 milliard</code> baholanish bilan IPO arafasida

📊 <b>3. MSCI: Likvidlik va Venchur Fondlari Tahlili</b>
├ • <b>NAV Tarkibi O'zgarishi:</b> SpaceX va Anthropic listingi fonida ommaviy aksiyalar ulushi global VC fondlari portfelining <code>20%</code> ga yetishi kutilmoqda
└ • <b>Likvidlik Kechikishi:</b> Lockup qoidalari sababli xususiy fond investorlari (LP) o'z pullarini naqd shaklda qaytarib olishi yillar talab etadi
━━━━━━━━━━━━━━━━━━━━
📱 <i>UWED FIS Tahliliy Manbasi: @uwed_fis</i>`,

    economy: `🌐 <b>JAHON IQTISODI SHARHI (GLOBAL ECONOMY)</b>
🗓 <i>Haftalik Tahlil | Manba: Jahon Banki & Emtia Bozorlari</i>
━━━━━━━━━━━━━━━━━━━━

📊 <b>1. Global YaIM va Makro Dinamika</b>
├ • <b>Jahon Iqtisodiy O'sishi:</b> 2026-yil uchun global iqtisodiy o'sish <code>3.1% – 3.2%</code> darajasida prognoz qilinmoqda
├ • <b>"Sticky" Inflyatsiya:</b> Rivojlangan mamlakatlarda mehnat va xizmatlar narxlarining qotib qolishi sabab inflyatsiyani 2% ga tushirish kutilganidan ko'proq vaqt olmoqda
└ • <b>Savdo Protektsionizmi:</b> Ta'minot zanjirlarining mintaqaviylashuvi (Near-shoring) xalqaro logistika xarajatlarini oshirmoqda

🟡 <b>2. Qimmatbaho Metallar va Xomashyo</b>
├ • <b>Oltin (XAU/USD) Tarixiy Cho'qqida:</b> <code>$2,650 – $2,700/untsiya</code>. Jahon markaziy banklari (Xitoy, Hindiston, Yaqin Sharq) tomonidan AQSH dollaridan qochish va zaxiralarni oltinga diversifikatsiya qilish oqimi rekord narxlarni ta'minlamoqda
├ • <b>O'zbekiston Uchun Naf:</b> Oltin eksporti mamlakat jami eksportining <code>~30%</code> ini tashkil qilgani sababli oltin narxining yuqoriligi so'm kursini bevosita himoya qilmoqda
└ • <b>Brent Nefti:</b> <code>$72 – $75/barrel</code>. OPEK+ qat'iy kvotalari va Yaqin Sharq geosiyosiy tarangligi narxni $70 dan pastga tushishdan saqlamoqda

🚢 <b>3. Transport va Tranzit Yo'laklari</b>
├ • <b>"O'rta Koridor" (Trans-Kaspiy):</b> Xitoy – Markaziy Osiyo – Kavkaz – Yevropa yo'nalishida yuk tashish hajmi yillik <code>22%</code> ga oshdi
└ • <b>Tranzit Afzalligi:</b> Qizil dengizdagi xatarlar sababli quruqlikdagi temir yo'l yo'laklariga global talab keskin kuchaydi
━━━━━━━━━━━━━━━━━━━━
📱 <i>UWED FIS Tahliliy Manbasi: @uwed_fis</i>`,

    startups: `🚀 <b>STARTAP TIZIMI VA VENCHUR BOZORI (STARTUPS & TECH)</b>
🗓 <i>Haftalik Tahlil | Manba: J.P. Morgan Q3 2026 Venture Monitor</i>
━━━━━━━━━━━━━━━━━━━━

🤖 <b>1. AI va Mega-Raundlar Konsentratsiyasi (J.P. Morgan)</b>
├ • <b>80% Kapital AI'da:</b> 2026-yilning 9 oyida ajratilgan barcha global venchur kapitalning <code>80% dan ortig'i</code> aynan sun'iy intellekt (AI) startaplariga kiritildi
├ • <b>Top-10 Mega Bitimlar:</b> Jami venchur mablag'larning rekord darajadagi <code>68% i</code> atigi 10 ta yirik mega-raundga to'g'ri keldi (bozor qutblashuvi)
├ • <b>Investitsiya Vektori O'zgarishi:</b> Oddiy chat-ilovalar o'rniga AI Infratuzilmasi, Agentik orkestratsiya, Hisoblash quvvati (Compute) va energiya samaradorligiga pul tikilmoqda
└ • <b>"Barbell" Strategiyasi:</b> Fondlar kapitalni Seed (boshlang'ich keng ko'lamli sinovlar) va Late-Stage (daromadi tasdiqlangan gigantlar) o'rtasida taqsimlamoqda

🛰 <b>2. SpaceTech va Orbital Infratuzilma</b>
├ • <b>xAI va SpaceX Birlashuvi:</b> Elon Musk xAI kompaniyasini SpaceX bilan birlashtirdi (umumiy baholash <code>$1.25 trillion</code>)
├ • <b>xAI Bahosi:</b> Alohida baholanishi <code>$250 milliard</code>ga yetdi, Tesla unga <code>$2.0 milliard</code> sarmoya kiritdi
├ • <b>Starlink Kassa Generatorligi:</b> Orbitada <code>9,000+</code> faol sun'iy yo'ldosh va <code>9+ million</code> to'lovchi mijoz
└ • <b>Koinotdagi Data Markazlar:</b> Yer yuzidagi energiya taqchilligiga javoban orbitada quyosh energiyasida ishlovchi birinchi ma'lumotlar markazlari loyihalanmoqda

🇺🇿 <b>3. O'zbekiston Startap Ekotizimi</b>
├ • <b>IT Park Imtiyozlari:</b> 0% stavkali soliq rejimi va xorijiy kompaniyalar uchun ekstraterritorial zonalar venchur oqimini jalb etmoqda
└ • <b>FinTech & B2B SaaS:</b> To'lov tizimlari, raqamli faktoring va elektron tijorat infratuzilmasi mahalliy venchur bitimlarining 75% ini tashkil etmoqda
━━━━━━━━━━━━━━━━━━━━
📱 <i>UWED FIS Tahliliy Manbasi: @uwed_fis</i>`
  },

  // Kun qizg'in xabari (Flash Breaking News - Jahon Moliyasi va Global Bozorlar)
  hotNewsDefault: `🔥 <b>KUN QIZG'IN XABARI | JAHON MOLIYASI FLASH INSIGHT</b>
🗓 <i>Sana: 2026-yil, 24-noyabr</i>
━━━━━━━━━━━━━━━━━━━━

⚡️ <b>Global IPO Bozorida Tarixiy Rekord: Anthropic Nasdaq'da $81Mrd, SpaceX esa $75Mrd Jalb Qildi!</b>

📌 <b>Asosiy Voqea (PwC UK & Wall Street):</b>
PwC UK tahliliga ko'ra, 2026-yilda global IPO tushumlari <b>$227.3 milliardga</b> yetib, 2021-yildan keyingi mutlaq rekordni qayd etdi. Sun'iy intellekt va kosmik texnologiyalar fond bozorida yirik kapital to'lqinini hosil qildi:

💰 <b>Global Mega-Bitimlar va Raqamlar:</b>
• <b>Anthropic ("ANT"):</b> Nasdaq birjasida har bir aksiyani <code>$83</code> dan sotib, <b>$81 milliarddan ortiq</b> mablag' jalb qildi (bozor kapitallashuvi <code>~$1.5 trillion</code>);
• <b>SpaceX:</b> Ommaviy listing orqali <b>$75 milliard</b> mablag' jalb qildi va MSCI Global VC indeksining <code>5%</code> ini egalladi;
• <b>OpenAI:</b> CFO Sara Friar 2027-yilda <code>$1.4 trillion</code> baholashda $30 milliardgacha jalb qilish uchun ommaviy birjaga chiqishini rasman tasdiqladi;
• <b>Giperskeylerlar Qarzi:</b> Microsoft, Amazon, Meta va Alphabet AI infratuzilmasi uchun 2026-yilda <b>$225 milliardlik</b> rekord korporativ obligatsiyalar chiqardi.

💡 <b>Jahon Bozoriga Ta'siri va Tahlilchi Xulosasi:</b>
MSCI hisobotiga ko'ra, global venchur kapital (VC) fondlari portfelidagi ommaviy aksiyalar ulushi 6.7% dan <b>20% gacha</b> sakramoqda. Biroq 1 yildan ortiq <i>lockup</i> cheklovlari tufayli xususiy investorlar uchun naqd pulga chiqish (exit) bir necha yil davom etishi prognoz qilinmoqda.

━━━━━━━━━━━━━━━━━━━━
🤖 <i>Avtomatlashtirilgan FIS Global News Agent tomonidan uzatildi.</i>
📱 <i>Rasmiy kanal: @uwed_fis</i>`,

  // 2-Bo'lim: Hafta Yangiliklari (O'ta qulay mobil formatda)
  weeklyNews: `📰 <b>HAFTALIK BOZOR VA MOLIYA YANGILIKLARI</b>`,

  defaultWeeklyDigest: `📊 <b>UWED FIS — Bozor Tahlili Markazi</b>`,

  valuationInfo: `📊 <b>UWED FIS — Korporativ Baholash (Valuation) Bazasiga Xush Kelibsiz!</b>

Valuation — bu har qanday kompaniya, startap yoki aktivning fundamental iqtisodiy qiymatini aniqlash san'ati va ilmidir.

🎯 <b>Asosiy Baholash Metodologiyalari:</b>
• <b>1. DCF (Discounted Cash Flow):</b> Intrinsic (ichki) qiymatni erkin pul oqimlarini (FCF) WACC diskont stavkasi orqali baholash;
• <b>2. Market Multiples (Qiyosiy bozor):</b> EV/EBITDA, P/E, EV/Sales kabi ko'rsatkichlar orqali o'xshash kompaniyalar bilan taqqoslash;
• <b>3. LBO (Leveraged Buyout):</b> Xususiy kapital (Private Equity) fondlari qarz yordamida korxonani sotib olib, 20%+ IRR talabi bilan baholashi.

📱 <i>Quyidagi tugmalar orqali nazariyani o'rganing yoki interaktiv DCF modelini ishga tushiring:</i>`,

  interviewQuestions: `💼 <b>IB, PE & Management Consulting Intervyu Savollari</b>

Investitsiya banklari (Goldman Sachs, Morgan Stanley) va strategik konsalting (McKinsey, BCG, Bain) intervyulariga tayyorgarlik bo'yicha etalon savol-javoblar to'plami:

📌 <b>1. 3 Ta Moliyaviy Hisobot O'rtasidagi Bog'liqlik:</b>
<i>"Agar amortizatsiya (D&A) $10 ga oshsa, 3 ta hisobotda nima o'zgaradi?"</i>
• <b>Income Statement:</b> Operatsion xarajat +$10, soliqdan oldingi foyda (EBT) -$10. 20% soliq stavkasida Net Income -$8 bo'ladi.
• <b>Cash Flow Statement:</b> Net Income -$8, lekin D&A naqd pulsiz xarajat bo'lgani uchun +$10 qo'shiladi. Sof kassa oqimi (Cash) +$2 ga oshadi (soliq tejalgani hisobiga!).
• <b>Balance Sheet:</b> Kassa (Cash) +$2, Asosiy vositalar (PP&E) -$10 (amortizatsiya hisobiga) → Jami aktivlar -$8. Passivlar tomonida: Taqsimlanmagan foyda (Retained Earnings) -$8. Balans to'liq teng!

📌 <b>2. "Walk me through a DCF":</b>
1. Kelajakdagi 5 yillik Erkin Pul Oqimlarini (Unlevered FCF = EBIT×(1-t) + D&A - CapEx - ΔNWC) prognoz qilamiz;
2. Kompaniyaning o'rtacha kapital narxi (WACC)ni hisoblaymiz;
3. 5 yillik FCF larni WACC stavkasi bilan bugungi kunga diskontlaymiz (Present Value);
4. Terminal Value (Gordon Growth yoki Exit Multiple) hisoblab, uni ham bugungi kunga diskontlaymiz;
5. PV of FCF + PV of TV = <b>Enterprise Value (EV)</b>;
6. EV dan Net Debt (Qarz - Kassa)ni ayirib, <b>Equity Value (Aksiyadorlik qiymati)</b>ga ega bo'lamiz!

📌 <b>3. Enterprise Value va Equity Value Farqi:</b>
• <b>Equity Value:</b> Faqat aksiyadorlarga tegishli bo'lgan bozor qiymati (Aksiyalar soni × Narx).
• <b>Enterprise Value (EV):</b> Kompaniyaning barcha investorlar (aksiyadorlar + qarz beruvchilar) uchun umumiy qiymati: <code>EV = Equity Value + Jami Qarz + Imtiyozli aksiyalar - Kassa</code>.`
};
