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

  vertexInfo: `🏆 <b>FIS | Vertex Case Competition — Rasmiy Keyslar Bazasiga Xush Kelibsiz!</b>

<b>Vertex falsafasi (Japanese Industrial Minimalism):</b>
Biz quruq nazariya, shablonli buzzwordlar (SWOT, PESTEL, Porter)dan butunlay voz kechamiz.
Vertex keyslari — birinchi kurs talabasi ham mustaqil tushuna oladigan, <b>mantiqiy mushohada, oddiy arifmetika, kompromisslar (trade-offs) va real byudjet</b> taqsimotiga tayanadigan nufuzli chempionatdir.

📂 <b>O'zbek tilidagi rasmiy keyslar to'plami:</b>
Har bir keysni tanlaganingizda, bot sizga <b>rasmiy PDF hujjatini</b> yuklab beradi hamda hakamlar baholash mezonlari (100 ballik shkala) va ideal yechimini taqdim etadi.

Quyidagi keyslardan birini tanlang:`,

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
• <b>B Yo'li (Hub Locker & 4 Standart quti):</b> Shahar bo'ylab 50 ta Hub Locker qo'yish va qutilarni standartlashtirish evaziga oyiga +200,000 ta;
• <b>C Yo'li (Kiva Robotlari):</b> $8.5M evaziga avtomatik saralash (+250,000 ta/oy), ammo 6 oy vaqt oladi.

💡 <b>G'olib Jamoa Yechimi:</b>
1. <b>Byudjet taqsimoti:</b> $8.5M Kiva robotlariga + $2.5M Hub Locker va quti standartlashtirishga + $750k dam olish kunlari vaqtinchalik guruhiga + $250k zaxira fondi;
2. <b>Natija:</b> 1-oydayoq +300,000 ta o'sish, 6-oydan keyin esa taqchillik 100% ga yopiladi (2,250,000 ta/oy). O'z vaqtida yetkazish 98.8% ga chiqadi va bekor qilish 1.5% ga tushadi!`
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

  defaultWeeklyDigest: `📊 <b>UWED FIS — Haftalik Bozor Tahlili (Weekly Market Digest)</b>
🗓 <i>Davr: 2026-yil, Noyabr oyi</i>

🏛 <b>1. O'ZBEKISTON MAKROIQTISODIYOTI & BOZORI:</b>
• <b>MB Asosiy stavkasi:</b> 13.5% (Inflyatsion kutilmalarni jilovlash maqsadida qat'iy pul-kredit siyosati);
• <b>Toshkent RFB (UZSE):</b> Bank va energetika sektori aksiyalarida faollik kuzatilmoqda. IPO va xususiylashtirish dasturlari tahlilchilar diqqat markazida;
• <b>Valyuta dinamikasi:</b> AQSH dollari kursi barqaror tebranish koridorida.

🌐 <b>2. GLOBAL BOZORLAR (Wall Street & Xalqaro):</b>
• <b>AQSH Federal Rezervi (Fed):</b> Mehnat bozori va inflyatsiya ko'rsatkichlariga qarab foiz stavkalarini asta-sekin pasaytirish siklida;
• <b>S&P 500 & Nasdaq:</b> AI va yarimo'tkazgichlar (Nvidia, Microsoft, TSMC) sektori drayverligida barqaror sur'atda;
• <b>Xomashyo:</b> Brent markali neft narxi geosiyosiy vaziyat hisobiga $72–$76 koridorida, Oltin esa himoya aktivi sifatida talabda ($2,650/oz).

💡 <b>3. VERTEX TAHLILCHI MASLAHATI:</b>
• "Keys yechishda SWOT yoki PESTEL kabi umumiy shablonlarni yozmang. Aniq raqamlar, byudjet cheklovlari va jamoa rollari bilan yechim bering!"`
};
