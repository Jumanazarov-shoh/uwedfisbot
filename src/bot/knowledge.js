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
  newsHub: `📰 <b>UWED FIS — Haftalik Yangiliklar Markazi</b>
🗓 <i>Davr: 2026-yil, Noyabr oyi</i>

Dunyo va O'zbekiston moliya bozoridagi eng sara tahlillar 5 ta asosiy bo'limga ajratildi:

🇺🇿 <b>1. O'zbekiston</b> — Makroiqtisodiyot, banklar, UZSE fond bozori va qonunchilik.
🏦 <b>2. Jahon Moliyasi</b> — Markaziy banklar (Fed, ECB, BOJ), stavkalar, valyuta va qarz bozorlari.
💼 <b>3. Jahon Investitsiya</b> — Mega M&A bitimlari, Private Equity va global IPO'lar.
🌐 <b>4. Jahon Iqtisodi</b> — Global YaIM o'sishi, oltin, neft va savdo koridorlari.
🚀 <b>5. Startap Tizimi</b> — AI poygasi, venchur kapitali va texnologik ekotizim.

👇 <i>Kerakli tahlil bo'limini tanlang:</i>`,

  // 5 ta alohida bo'lim matnlari
  newsCategories: {
    uzb: `🇺🇿 <b>O'ZBEKISTON MOLIYAVIY VA IQTISODIY SHARHI</b>
🗓 <i>Haftalik Tahlil | UWED FIS</i>
━━━━━━━━━━━━━━━━━━━━

🏛 <b>1. Pul-kredit Siyosati va Banklar</b>
├ • <b>MB Asosiy Stavkasi:</b> <code>14.0%</code> darajasida qat'iy saqlanmoqda
├ • <b>Inflyatsiya:</b> Yillik <code>7.3%</code> (bazaviy: 5.7%) ga tushdi
└ • <b>Ta'siri:</b> Depozitlar jozibadorligi oshib, milliy jamg'armalar mustahkamlandi

📈 <b>2. Makro O'sish va Tashqi Sektor</b>
├ • <b>YaIM Dinamikasi:</b> <code>$147.0 mlrd</code> (+7.7% o'sish, aholi jon boshiga $3,846)
├ • <b>Tashqi Savdo:</b> <code>$81.2 mlrd</code> (Eksport $33.8B, shundan ~30% oltin)
├ • <b>Import:</b> <code>$47.3 mlrd</code> (asosan uskunalar va texnologik xomashyo)
└ • <b>Valyuta Kursi:</b> <code>12,242 – 12,800 so'm</code> barqaror koridorda

💼 <b>3. Kapital Bozori va Investitsiyalar</b>
├ • <b>Jami Investitsiyalar:</b> <code>$43.1 mlrd</code> (+24%), FDI: $38.2B
├ • <b>Toshkent RFB (UZSE):</b> Banklar (SQB, Ipoteka) va sanoat emitentlari faol
└ • <b>Byudjet Intizomi:</b> 2026 defitsit chegarasi YaIMning <code>3.0%</code> miqdorida
━━━━━━━━━━━━━━━━━━━━
📱 <i>Rasmiy tahliliy kanal: @uwed_fis</i>`,

    finance: `🏦 <b>JAHON MOLIYASI SHARHI (GLOBAL FINANCE)</b>
🗓 <i>Haftalik Tahlil | UWED FIS</i>
━━━━━━━━━━━━━━━━━━━━

🏛 <b>1. Markaziy Banklar va Foiz Stavkalari</b>
├ • <b>AQSH FRS (Federal Reserve):</b> Mehnat bozori va sekinlashayotgan inflyatsiya hisobiga stavkalarni bosqichma-bosqich pasaytirish siklida
├ • <b>Yevropa Markaziy Banki (ECB):</b> Iqtisodiy o'sishni rag'batlantirish uchun depozit stavkalarini me'yorlashtirmoqda
└ • <b>Yaponiya Banki (BOJ):</b> Manfiy stavkalardan so'ng iensani qo'llab-quvvatlash uchun pul-kredit siyosatini ehtiyotkorlik bilan qat'iylashtirmoqda

💵 <b>2. Valyuta va Qarz Bozorlari</b>
├ • <b>Dollar Indeksi (DXY):</b> <code>103–105</code> koridorida muvozanatda
├ • <b>AQSH 10 Yillik Xazina Qog'ozlari (US 10Y):</b> <code>4.1% – 4.3%</code> oralig'ida
└ • <b>Rivojlanayotgan Bozorlar (EM Debt):</b> Global stavkalar pasayishi fonida Yevrobond emissiyalariga xalqaro talab ortmoqda

🛡 <b>3. Bank Tizimi va Likvidlik</b>
├ • <b>Kapital Yetarliligi:</b> Yirik xalqaro banklar (Tier 1) yuqori likvidlik buferini saqlab turibdi
└ • <b>Kredit Marjasi (NIM):</b> Stavka pasayishi banklarning sof foiz marjasini barqarorlashtirmoqda
━━━━━━━━━━━━━━━━━━━━
📱 <i>Rasmiy tahliliy kanal: @uwed_fis</i>`,

    invest: `💼 <b>JAHON INVESTITSIYALARI SHARHI (GLOBAL INVESTMENTS)</b>
🗓 <i>Haftalik Tahlil | UWED FIS</i>
━━━━━━━━━━━━━━━━━━━━

🤝 <b>1. M&A va Yirik Birlashuvlar (Mega Deals)</b>
├ • <b>SpaceX va xAI Sinergiyasi:</b> Sun'iy intellekt va kosmik aloqa integratsiyasi orqali birlashgan ekotizim qiymati <code>$1.25 trillion</code>ga yetdi
├ • <b>Tesla Sarmoyasi:</b> Tesla korporatsiyasi xAI texnologiyalariga to'g'ridan-to'g'ri <code>$2.0 milliard</code> investitsiya kiritdi
└ • <b>Texnologik Konsolidatsiya:</b> Katta ma'lumotlar markazlari va toza energiya infratuzilmasiga korporativ M&A hajmi 28% oshdi

📈 <b>2. Global IPO Bozorlari</b>
├ • <b>Kutilayotgan Tarixiy IPO:</b> SpaceX kompaniyasi 2026-yilda <code>$1.5 trillion</code>lik baholash bilan aksiyalarni ommaga chiqarishni rejalashtirmoqda
└ • <b>AI va Yarimo'tkazgichlar:</b> Yangi chip dizaynerlari va kiberxavfsizlik kompaniyalari fond bozoriga chiqishga tayyorlanmoqda

🏦 <b>3. Private Equity (PE) va Venchur Kapital (VC)</b>
├ • <b>Dry Powder:</b> Xususiy kapital fondlari to'plangan naqd mablag'larni arzonlashgan aktivlarga yo'naltirmoqda
└ • <b>Investitsion Ustuvorliklar:</b> B2B AI yechimlari, yarimo'tkazgich fabrikalari va mudofaa texnologiyalari (DefenseTech)
━━━━━━━━━━━━━━━━━━━━
📱 <i>Rasmiy tahliliy kanal: @uwed_fis</i>`,

    economy: `🌐 <b>JAHON IQTISODI SHARHI (GLOBAL ECONOMY)</b>
🗓 <i>Haftalik Tahlil | UWED FIS</i>
━━━━━━━━━━━━━━━━━━━━

📊 <b>1. Global O'sish va Savdo Dinamikasi</b>
├ • <b>Jahon YaIM O'sishi:</b> 2026-yilda <code>3.1% – 3.2%</code> barqaror sur'atda saqlanishi kutilmoqda
├ • <b>Inflyatsiya Oqimi:</b> Global miqyosda iste'mol narxlari o'sishi sekinlashib, <code>4.2%</code> darajasiga yaqinlashmoqda
└ • <b>Geosiyosiy Savdo:</b> "Friend-shoring" va ta'minot zanjirlarini diversifikatsiya qilish asosiy tendensiyaga aylandi

🟡 <b>2. Xomashyo va Oltin Narxlari</b>
├ • <b>Oltin (XAU/USD):</b> <code>$2,650 – $2,700/untsiya</code> atrofida rekord narxda. Markaziy banklar zaxiralarida dollardan oltinga o'tish davom etmoqda
├ • <b>Brent Nefti:</b> <code>$72 – $75/barrel</code> koridorida. OPEK+ qazib olish kvotalari narx tushishini ushlab turibdi
└ • <b>Sanoat Metallari:</b> Mis va litiy narxi AI serverlari hamda elektromobillar talabi hisobiga barqaror

🚢 <b>3. Logistika va Koridorlar</b>
└ • <b>Markaziy Osiyo Tranziti:</b> "O'rta Koridor" (Middle Corridor) orqali multimodal yuk tashish hajmi yillik 22% ga o'smoqda
━━━━━━━━━━━━━━━━━━━━
📱 <i>Rasmiy tahliliy kanal: @uwed_fis</i>`,

    startups: `🚀 <b>STARTAP TIZIMI VA VENCHUR BOZORI (STARTUPS & TECH)</b>
🗓 <i>Haftalik Tahlil | UWED FIS</i>
━━━━━━━━━━━━━━━━━━━━

🤖 <b>1. Generativ AI va Katta Modellar</b>
├ • <b>xAI (Grok AI):</b> Baholanishi <code>$250 milliard</code>ga yetib, OpenAI bilan to'g'ridan-to'g'ri raqobatga kirdi
├ • <b>Hisoblash Quvvati (Compute):</b> AI startaplari uchun asosiy to'siq — yuqori unumdor chiplar (Nvidia H100/Blackwell) va elektr energiyasi taqchilligi
└ • <b>Korporativ Integratsiya:</b> GPT-4o, Claude 3.5/Opus va Gemini modellari korporativ ERP hamda bank avtomatlashtirishiga keng tatbiq etilmoqda

🛰 <b>2. SpaceTech va Global Aloqa</b>
├ • <b>Starlink Muvaffaqiyati:</b> Orbitada <code>9,000+</code> faol sun'iy yo'ldosh va <code>9+ million</code> to'lovchi obunachi
└ • <b>Orbital Compute:</b> Kosmik fazoda quyosh energiyasida ishlovchi birinchi ma'lumotlar markazlari loyihasi ishlab chiqilmoqda

🇺🇿 <b>3. O'zbekiston Startap Ekotizimi</b>
├ • <b>FinTech Yetakchiligi:</b> To'lov tizimlari, raqamli faktoring va BNPL (Muddatli to'lov) startaplari yuqori rentabellik ko'rsatmoqda
└ • <b>Venchur Imtiyozlari:</b> IT Park rezidentlari uchun soliq imtiyozlari xalqaro venchur fondlar (500 Global, Sturgeon Capital) e'tiborini tortmoqda
━━━━━━━━━━━━━━━━━━━━
📱 <i>Rasmiy tahliliy kanal: @uwed_fis</i>`
  },

  // Kun qizg'in xabari (Flash Breaking News)
  hotNewsDefault: `🔥 <b>KUN QIZG'IN XABARI | UWED FIS FLASH INSIGHT</b>
🗓 <i>Sana: 2026-yil, 24-noyabr</i>
━━━━━━━━━━━━━━━━━━━━

⚡️ <b>SpaceX va xAI $1.25 Trillionlik Birlashuv: 2026 Tarixiy Mega-IPO Ostonasida!</b>

📌 <b>Asosiy Voqea:</b>
Elon Musk sun'iy intellekt kompaniyasi (xAI)ni kosmik gigant SpaceX bilan birlashtirdi. Birlashgan ekotizim qiymati <code>$1.25 trillion</code> deb baholandi. Bu 2026-yilda kutilayotgan <code>$1.5 trillion</code>lik tarixiy IPO uchun asosiy tramplin hisoblanadi.

💰 <b>Moliyaviy Oqimlar:</b>
• Tesla korporatsiyasi xAI ekotizimiga to'g'ridan-to'g'ri <code>$2.0 milliard</code> investitsiya kiritdi;
• Muskning shaxsiy boyligi <code>$800+ milliard</code>dan oshib, jahon moliya tarixidagi eng yuqori natijani qayd etdi;
• Starlink sun'iy yo'ldosh tarmog'i 9 milliondan ortiq pullik obunachilarga yetdi.

💡 <b>Tahlilchi Xulosasi va Sinergiya:</b>
AI algoritmlari (Grok) va global sun'iy yo'ldosh infratuzilmasi birlashuvi kelajakda koinotdagi orbital ma'lumotlar markazlari (Orbital Data Centers) loyihasini real biznes modeliga aylantirmoqda.

━━━━━━━━━━━━━━━━━━━━
🤖 <i>Avtomatlashtirilgan FIS News Agent tomonidan tayyorlandi.</i>
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
