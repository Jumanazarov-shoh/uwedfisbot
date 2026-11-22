/**
 * UWED FIS (Finance & Investment Society) Bilimlar Bazasi (HTML Format)
 * O'z ichiga haqiqiy Vertex keyslarini va haftalik bozor tahlilini oladi.
 */

module.exports = {
  aboutClub: `🏛 <b>UWED Finance and Investment Society (FIS)</b>

<b>Biz kimmiz?</b>
Jahon iqtisodiyoti va diplomatiya universiteti (JIDU/UWED) qoshidagi talabalarning yetakchi moliya va investitsiyalar jamiyati.

🎯 <b>Bizning maqsadimiz:</b>
• Talabalarda zamonaviy moliya, investitsiya tahlili va amaliy keys yechish ko'nikmalarini shakllantirish;
• O'zbekiston va xalqaro moliya bozorlari, investitsiya banklari (IB) va konsalting kompaniyalari bilan aloqalar o'rnatish;
• AI va miqdoriy (quantitative) texnologiyalarni an'anaviy moliya tahliliga integratsiya qilish.

🏆 <b>Asosiy loyihalarimiz:</b>
• <b>Vertex Case Competition</b> — yillik nufuzli biznes va moliya keys-chempionati;
• <b>Equity Research & Market Digest</b> — bozorlar tahlili va tahliliy hisobotlar;
• <b>Workshops & Guest Lectures</b> — yetakchi bankir, fond menejeri va tahlilchilar bilan uchrashuvlar;
• <b>AI in Finance Lab</b> — moliyada sun'iy intellekt agentlari va avtomatlashtirish.`,

  vertexInfo: `🏆 <b>Vertex Case Competition & Keyslar Arxiv</b>

<b>Vertex</b> — UWED FIS tomonidan o'tkaziladigan, talabalarni real biznes, investitsiya va korporativ strategiya muammolarini hal qilishga o'rgatuvchi nufuzli chempionat.

📌 <b>Chempionatda qo'llaniladigan asosiy metodikalar:</b>
1. <b>MECE prinsipi:</b> Muammoni takrorlanmaydigan va to'liq qamrab oluvchi qismlarga ajratish;
2. <b>Issue Tree (Muammo daraxti):</b> Asosiy savolni daromad, xarajat va kapital drayverlariga bo'lish;
3. <b>TAM / SAM / SOM:</b> Bozor hajmini professional Bottom-up usulida baholash;
4. <b>50 daqiqalik Speed Round:</b> 10 daqiqa muammo ➔ 15 daqiqa tahlil ➔ 15 daqiqa moliya/ROI ➔ 10 daqiqa repetitsiya.

Quyidagi tugmalar orqali <b>haqiqiy Vertex keyslari</b> va ularning yechim strategiyalari bilan tanishing:`,

  // Haqiqiy Vertex Keyslari
  vertexCases: {
    toyota: `🏎 <b>Vertex Case: Toyota Motor Corporation (50 Daqiqa Oflayn)</b>

📌 <b>Mavzu:</b> Gibrid texnologiyalarga o'tish va ishlab chiqarishdagi operatsion samaradorlik.
🏭 <b>Sanoat:</b> Avtomobilsozlik / Yashil energiya

🔍 <b>Keys Muammosi (Problem Statement):</b>
Toza elektromobillarga (EV) talabning global o'zgarishi sharoitida, Toyota o'zining gibrid (Hybrid) modellariga urg'u berdi. Ammo yetkazib berish zanjiridagi uzilishlar va akkumulyator xomashyosi qimmatlashishi fonida rentabellikni qanday saqlab qolish kerak?

💡 <b>Ideal Yechim Strukturasi (Hakamlar nimani baholagan):</b>
1. <b>TPS (Toyota Production System) & Kaizen:</b> Zavodlardagi ortiqcha isrofgarchilikni (Muda) kamaytirish;
2. <b>Gibrid vs EV balansi:</b> Rivojlanayotgan bozorlarda (Markaziy Osiyo, Lotin Amerikasi) gibridlar orqali barqaror pul oqimi (Cash Cow) yaratish;
3. <b>Moliyaviy ta'sir:</b> CapEx'ni akkumulyator klasterlariga taqsimlash va EBIT marjasini 10% dan yuqori saqlash.

⚖️ <b>Baholash mezoni:</b> Muammoni aniqlash (20 b) | Ishlab chiqarish tahlili (30 b) | Moliyaviy reja & ROI (30 b) | Pitch (20 b).`,

    amazon: `📦 <b>Vertex Case: Amazon.com — Fulfillment & Cloud (50 Daqiqa Oflayn)</b>

📌 <b>Mavzu:</b> Logistika markazlari (Fulfillment Centers) xarajatlarini qisqartirish va AWS daromadliligini oshirish.
🌐 <b>Sanoat:</b> E-commerce / Cloud Computing

🔍 <b>Keys Muammosi:</b>
Amazon elektron tijorat hajmi o'sishi bilan birga "Last Mile Delivery" (oxirgi manzilgacha yetkazish) xarajatlari eksponentsial oshib ketdi. Retail segmentining operatsion marjasi pasayib, kompaniya foydasi deyarli faqat AWS bulutli xizmatlariga bog'liq bo'lib qoldi.

💡 <b>Ideal Yechim Strukturasi:</b>
1. <b>Logistika optimallashuvi:</b> AI va robotlashtirilgan saralash orqali har bir buyurtma yetkazish tannarxini $1.20 ga pasaytirish;
2. <b>Prime ekotizimi:</b> Obuna narxi va xizmatlar to'plamini dinamik tarzda qayta ko'rib chiqish (LTV/CAC nisbatini yaxshilash);
3. <b>AWS cross-selling:</b> Retail mijozlarga AWS bulutli va tahliliy vositalarini integratsiya qilish.`,

    tbc: `🏦 <b>Vertex Case: TBC Bank Uzbekistan — Raqamli Kengayish</b>

📌 <b>Mavzu:</b> Neobank va raqamli ekotizim (TBC, Payme) orqali O'zbekiston bozorida yetakchilikka erishish.
📱 <b>Sanoat:</b> FinTech / Banking

🔍 <b>Keys Muammosi:</b>
Filialsiz (100% raqamli) faoliyat yurituvchi TBC Bank O'zbekistonda mijozlar sonini tez o'stirdi. Asosiy chaqiruv: Mijozlarni jalb qilish xarajatlari (CAC) oshib borayotgan sharoitda depozitlar bazasini arzonlashtirish va kredit portfeli sifatini (NPL < 3%) saqlab qolish.

💡 <b>Ideal Yechim:</b>
1. Payme va TBC ilovalari o'rtasida chuqur sinergiya yaratish (SuperApp konsepsiyasi);
2. Kichik va o'rta biznes (KOB/SME) uchun raqamli faktoring va avtomatlashtirilgan skoring tizimini joriy qilish;
3. ROE ko'rsatkichini 25%+ darajasida ushlab turish bo'yicha moliyaviy model.`,

    spotify: `🎵 <b>Vertex Case: Spotify — Musiqa Strimingi va Monetizatsiya</b>

📌 <b>Mavzu:</b> Mualliflik to'lovlari (Royalties) yuki ostida barqaror sof foydaga erishish.
🎧 <b>Sanoat:</b> Media / Striming

🔍 <b>Keys Muammosi:</b>
Spotify daromadining 70% dan ortig'i ovoz yozish leybllariga (Universal, Sony, Warner) to'lanadi. Gross Margin 25-28% atrofida cheklangan.

💡 <b>Ideal Yechim:</b>
• Podkastlar va audio-kitoblar ulushini oshirish (ularda royalti to'lovlari ancha past);
• AI-powered reklama targetlash tizimi orqali har bir bepul tinglovchidan olinadigan reklamali daromadni (ARPU) 40% ga ko'tarish;
• San'atkorlar uchun "Two-Sided Marketplace" yaratib, ularga marketing tahlillarini sotish.`,

    ikea: `🛋 <b>Vertex Case: IKEA — Kichik Makonlar, Katta Qarorlar</b>

📌 <b>Mavzu:</b> Megapolislar uchun ixcham mebellar va yetkazib berish zanjirini yangilash.
🌲 <b>Sanoat:</b> Mebel / Chakana savdo

🔍 <b>Keys Muammosi:</b>
Shahar aholisi tobora kichik maydonli xonadonlarda (Micro-apartments) yashamoqda. Katta shahar tashqarisidagi ulkan do'konlar (Blue Box stores) modelidan ixcham shahar markazi do'konlariga (City-center formats) o'tish zarurati.

💡 <b>Ideal Yechim:</b>
• Ko'p funksiyali modulli mebellar kolleksiyasi;
• Omni-channel logistika (onlayn buyurtma ➔ eng yaqin shahar omboridan 24 soatda yetkazish);
• Flat-pack qadoqlash samaradorligini yana 15% ga oshirish orqali transport xarajatlarini tejash.`,

    duolingo: `🦉 <b>Vertex Case: Duolingo — Gamifikatsiya va Generativ AI</b>

📌 <b>Mavzu:</b> Freemium modeldan pullik AI-obunaga (Duolingo Max) o'tish.
📱 <b>Sanoat:</b> EdTech / AI

🔍 <b>Keys Muammosi:</b>
Foydalanuvchilarning atigi 8-9% i pullik obunachilar (Super Duolingo). Qolgan 90%+ bepul o'quvchilarni o'quv sifatini buzmagan holda yuqoriroq daromad keltiruvchi obunaga qanday o'tkazish mumkin?

💡 <b>Ideal Yechim:</b>
• GPT-4/Claude asosidagi "Roleplay" (chet ellik bilan jonli suhbat simulyatsiyasi) imkoniyatini kiritish;
• O'rganish tezligi va xatolarni tushuntiruvchi shaxsiy AI-tyutor funksiyasi orqali pullik konversiyani 12% ga ko'tarish.`
  },

  // Haftalik Bozor Tahlili (Weekly Digest)
  defaultWeeklyDigest: `📊 <b>UWED FIS — Haftalik Bozor Tahlili (Weekly Market Digest)</b>
🗓 <i>Davr: 2026-yil, Noyabr oyi</i>

🏛 <b>1. O'ZBEKISTON MAKROIQTISODIYOTI & BOZORI:</b>
• <b>MB Asosiy stavkasi:</b> 13.5% (Inflyatsion kutilmalarni jilovlash maqsadida qat'iy pul-kredit siyosati);
• <b>Toshkent RFB (UZSE):</b> Bank va energetika sektori aksiyalarida faollik kuzatilmoqda. IPO va xususiylashtirish dasturlari tahlilchilar diqqat markazida;
• <b>Valyuta dinamikasi:</b> AQSH dollari kursi barqaror tebranish koridorida.

🌐 <b>2. GLOBAL BOZORLAR (Wall Street & Xalqaro):</b>
• <b>AQSH Federal Rezervi (Fed):</b> Mehnat bozori va inflyatsiya ko'rsatkichlariga qarab foiz stavkalarini asta-sekin pasaytirish siklida;
• <b>S&P 500 & Nasdaq:</b> AI va yarimo'tkazgichlar (Nvidia, Microsoft, TSMC) sektori drayverligida barqaror sur'atda;
• <b>Xomashyo:</b> Brent markali neft narxi geosiyosiy vaziyat va OPEK+ kvotalari hisobiga $72–$76 koridorida, Oltin esa himoya aktivi sifatida talabda.

💡 <b>3. HAFTALIK TAVSIYA VA KLUB TADBIRLARI:</b>
• <b>Moliyaviy tahlilchi maslahati:</b> "Kompaniyalarni baholashda faqat P/E multiplikatoriga tayanmang. EV/EBITDA va erkin pul oqimlarini (FCF yield) albatta tekshiring!"
• <b>UWED FIS e'loni:</b> Tez kunda navbatdagi amaliy workshop va Vertex Case Competition uchun yangi keyslar e'lon qilinadi!`
};
