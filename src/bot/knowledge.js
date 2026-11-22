/**
 * UWED FIS (Finance & Investment Society) Bilimlar Bazasi
 */

module.exports = {
  aboutClub: `🏛 *UWED Finance and Investment Society (FIS)*

*Biz kimmiz?*
Jahon iqtisodiyoti va diplomatiya universiteti (JIDU/UWED) qoshidagi talabalarning yetakchi moliya va investitsiyalar jamiyati.

🎯 *Bizning maqsadimiz:*
- Talabalarda zamonaviy moliya, investitsiya tahlili va amaliy keys yechish ko'nikmalarini shakllantirish;
- O'zbekiston va xalqaro moliya bozorlari, investitsiya banklari (IB) va konsalting kompaniyalari bilan aloqalar o'rnatish;
- AI va miqdoriy (quantitative) texnologiyalarni an'anaviy moliya tahliliga integratsiya qilish.

🏆 *Asosiy loyihalarimiz:*
• *Vertex Case Competition* — yillik nufuzli biznes va moliya keys-chempionati;
• *Equity Research & Market Digest* — bozorlar tahlili va tahliliy hisobotlar;
• *Workshops & Guest Lectures* — yetakchi bankir, fond menejeri va tahlilchilar bilan uchrashuvlar;
• *AI in Finance Lab* — moliyada sun'iy intellekt agentlari va avtomatlashtirish.`,

  vertexInfo: `🏆 *Vertex Case Competition & Keys Yechish Metodikasi*

*Vertex* — UWED FIS tomonidan o'tkaziladigan, talabalarni real biznes va investitsiya muammolarini hal qilishga o'rgatuvchi nufuzli chempionat.

📌 *G'olib strategiyaning 4 asosiy qoidasi:*
1. *MECE prinsipi* (Mutually Exclusive, Collectively Exhaustive) — muammoni takrorlanmaydigan va to'liq qamrab oluvchi qismlarga ajratish.
2. *Issue Tree (Muammo daraxti)* — asosiy savolni 3-4 ta asosiy drayverga bo'lish (Daromadni oshirish, Xarajatlarni qisqartirish, Yangi bozorlarga chiqish).
3. *TAM / SAM / SOM* — bozor hajmini tahlil qilish:
   • *TAM:* Umumiy potentsial bozor hajmi;
   • *SAM:* Biz erisha oladigan bozor segmenti;
   • *SOM:* Biz dastlabki 1-3 yilda real egallaydigan ulush.
4. *Strukturaviy taqdimot:* Muammo ➔ Tahlil ➔ 3 ta asosiy yechim ➔ Moliyaviy reja va ROI ➔ Xatarlar (Risk Management).`,

  financeTopics: {
    dcf: `📊 *DCF (Discounted Cash Flow) Modeli*

*Ta'rif:* Kompaniyaning kelajakdagi erkin pul oqimlarini (FCF) bugungi kungi qiymatga diskontlash orqali kompaniyaning haqiqiy (intrinsic) qiymatini topish usuli.

🔢 *Asosiy formula:*
\`PV = FCF₁ / (1+WACC)¹ + FCF₂ / (1+WACC)² + ... + Terminal Value / (1+WACC)ⁿ\`

📌 *5 ta asosiy qadam:*
1. Tarixiy moliyaviy hisobotlarni o'rganish va 5 yillik daromad prognozini tuzish;
2. Erkin Pul Oqimini (Unlevered Free Cash Flow) hisoblash:
   \`FCF = EBIT × (1 - Soliq) + D&A - CapEx - ΔNWC\`
3. WACC (Diskont stavkasi)ni hisoblash;
4. Prognoz davridan keyingi davr uchun Terminal Value (TV)ni hisoblash (Gordon Growth yoki Exit Multiple metodi);
5. Barcha kelajak oqimlarni diskontlab, Enterprise Value va Equity Valueni chiqarish.`,

    multiples: `📈 *Bozor Multiplikatorlari (Relative Valuation)*

Kompaniyani uning sohasidagi o'xshash kompaniyalar (Comps) bilan taqqoslab baholash:

1. *P/E (Price-to-Earnings):*
   Aksiya narxi / Sof foyda (EPS). Eng ommabop, ammo kapital tuzilmasiga (qarzga) bog'liq.
2. *EV / EBITDA (Enterprise Value / EBITDA):*
   Eng professional multiplikator. Kapital tuzilmasi va soliq farqlariga bog'liq bo'lmagan holda operatsion rentabellikni ko'rsatadi.
3. *P/B (Price-to-Book):*
   Aksiya narxi / Balans qiymati. Banklar va moliya institutlarini baholashda asosiy multiplikator.
4. *EV / Sales:*
   Hali sof foydaga kirmagan, tez o'sayotgan texnologik startaplar uchun qo'llaniladi.`,

    lbo: `🏦 *LBO (Leveraged Buyout) va Private Equity*

*Ta'rif:* Kompaniyani sotib olishda katta miqdorda qarz mablag'laridan (odatda 60-80% qarz, 20-40% o'z kapitali) foydalanish investitsiya strategiyasi.

📌 *LBO uchun ideal kompaniya mezonlari:*
• Barqaror va bashorat qilinadigan pul oqimlari (Cash Flow);
• Past qarz yuki (Clean Balance Sheet);
• CapEx (kapital xarajatlar)ning pastligi;
• Bozoridagi mustahkam pozitsiya (Moat);
• Xarajatlarni optimallashtirish va samaradorlikni oshirish imkoniyati.`
  },

  interviewQuestions: `💼 *IB & Consulting Intervyu Savollari (Top-3)*

❓ *1-savol: "Walk me through a DCF" (DCFni tushuntirib bering)*
*Javob:* "DCF modelida avval 5 yillik Unlevered Free Cash Flow prognoz qilinadi. FCF = EBIT*(1-T) + D&A - CapEx - ΔNWC. Keyin WACC orqali diskontlab Enterprise Value topiladi. Bunga naqd pul qo'shilib, qarz ayrilsa Equity Value chiqadi."

❓ *2-savol: "Amortizatsiya (Depreciation) $10 ga oshsa, 3 hisobotda nima o'zgaradi?" (Soliq stavkasi 20%)*
*Javob:*
• *Income Statement:* Operatsion xarajat $10 ga oshadi, Soliqdan oldingi foyda $10 ga kamayadi. Soliq $2 ga tejaladi, Sof foyda $8 ga kamayadi.
• *Cash Flow Statement:* Sof foyda -$8, lekin amortizatsiya naqdsiz xarajat bo'lgani uchun +$10 qo'shiladi. Operatsion pul oqimi (Cash) +$2 ga oshadi!
• *Balance Sheet:* Aktiv tomonda Naqd pul +$2, Asosiy vositalar -$10 (jami aktiv -$8). Passiv tomonda Taqsimlanmagan foyda -$8. Balans teng!

❓ *3-savol: "WACC nima va u qachon oshadi?"*
*Javob:* WACC — bu qarz va xususiy kapitalning o'rtacha og'irlikli qiymati. Foiz stavkalari oshganda, kompaniyaning Beta (bozor riski) oshganda yoki kredit reytingi pasayganda WACC oshadi.`,

  terms: [
    {
      keyword: 'dcf',
      title: 'DCF (Discounted Cash Flow)',
      description: 'Kelajakdagi pul oqimlarini diskontlash orqali kompaniya qiymatini baholash modeli.',
      practical: 'M&A va investitsiya banklarida kompaniya haqiqiy qiymatini topishda 1-raqamli vosita.'
    },
    {
      keyword: 'wacc',
      title: 'WACC (Weighted Average Cost of Capital)',
      description: 'Kompaniyaning kapital jalb qilish bo\'yicha o\'rtacha xarajati (Cost of Equity va Cost of Debt uyg\'unligi).',
      practical: 'DCF modelida diskont stavkasi (r) sifatida ishlatiladi.'
    },
    {
      keyword: 'ebitda',
      title: 'EBITDA',
      description: 'Foizlar, soliqlar va amortizatsiyadan oldingi operatsion foyda.',
      practical: 'Kompaniyalarning asosiy faoliyatidan kelayotgan sof naqd ishlab chiqarish quvvatini solishtirish uchun xizmat qiladi.'
    },
    {
      keyword: 'lbo',
      title: 'LBO (Leveraged Buyout)',
      description: 'Qarz mablag\'lari hisobiga kompaniya nazorat paketini sotib olish.',
      practical: 'Private Equity (xususiy kapital) fondlarining asosiy daromad olish strategiyasi.'
    },
    {
      keyword: 'vertex',
      title: 'Vertex Case Competition',
      description: 'UWED FIS tomonidan o\'tkaziladigan yillik eng katta biznes va moliya keys-chempionati.',
      practical: 'Talabalarga investitsiya qarorlari, M&A va strategik konsalting ko\'nikmalarini beradi.'
    }
  ]
};
