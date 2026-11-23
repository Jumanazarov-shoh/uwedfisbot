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

  // 2-Bo'lim: Hafta Yangiliklari (O'ta qulay mobil formatda)
  weeklyNews: `📰 <b>HAFTALIK BOZOR VA MOLIYA YANGILIKLARI</b>
🗓 <i>Davr: 2026-yil, Noyabr oyi</i>
━━━━━━━━━━━━━━━━━━━━

🇺🇿 <b>1. O'ZBEKISTON MOLIYAVIY BOZORI:</b>

• <b>Bank sektori va Jamg'armalar:</b>
Markaziy bankning 14.0% lik qat'iy stavkasi milliy valyutadagi depozitlarni jozibador qilib, inflyatsiyani 7.3% ga tushirishga xizmat qilmoqda. Aholi va biznes jamg'armalari barqaror o'smoqda.

• <b>Toshkent Fond Birjasi (UZSE):</b>
Bank (SQB, Ipoteka-bank) va energetika sektori emitentlari aksiyalarida savdo faolligi yuqori. Yangi xususiylashtirish va IPO/SPO dasturlari institutsional investorlar diqqat markazida.

🌐 <b>2. GLOBAL BOZORLAR (WALL STREET & XALQARO):</b>

• <b>AQSH Federal Rezervi (Fed):</b>
Inflyatsiya va bandlik indikatorlariga mos ravishda stavkalarni asta-sekin pasaytirish siklida davom etmoqda; jahon bozorlarida dollar indeksi (DXY) mo''tadil tebranmoqda.

• <b>S&P 500 va Nasdaq:</b>
AI, ma'lumotlar markazlari va yarimo'tkazgichlar (Nvidia, TSMC, Microsoft) sektori yetakchiligida <code>5,900+</code> punkt darajasida mustahkam saqlanmoqda.

🟡 <b>3. XOMASHYO VA QIYMATLI METALLAR:</b>

• <b>Oltin (XAU/USD):</b>
Geosiyosiy vaziyat va markaziy banklarning doimiy zaxira xaridlari hisobiga <code>$2,650 – $2,700/untsiya</code> oralig'ida savdo qilinmoqda. Bu O'zbekistonning valyuta zaxiralarini mustahkamlaydi.

• <b>Brent Nefti:</b>
OPEK+ qazib olish cheklovlari va jahon sanoat talabi fonida <code>$72 – $75/barrel</code> koridorida muvozanatlashgan.

━━━━━━━━━━━━━━━━━━━━
💡 <b>VERTEX TAHLILCHI MASLAHATI:</b>
<i>"Keys yechishda SWOT yoki PESTEL kabi quruq shablonlarni chetga suring. Moliyaviy model tuzishda 14% stavka sharoitida qarz qiymati (Cost of Debt), WACC va erkin pul oqimlari (FCF) intizomiga tayaning!"</i>

📱 <i>UWED FIS rasmiy kanali: @uwed_fis</i>`,

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
