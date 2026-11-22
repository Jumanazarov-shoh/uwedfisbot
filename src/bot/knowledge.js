/**
 * UWED FIS (Finance & Investment Society) Bilimlar Bazasi (HTML Format)
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

  vertexInfo: `🏆 <b>Vertex Case Competition & Keys Yechish Metodikasi</b>

<b>Vertex</b> — UWED FIS tomonidan o'tkaziladigan, talabalarni real biznes va investitsiya muammolarini hal qilishga o'rgatuvchi nufuzli chempionat.

📌 <b>G'olib strategiyaning 4 asosiy qoidasi:</b>
1. <b>MECE prinsipi</b> (Mutually Exclusive, Collectively Exhaustive) — muammoni takrorlanmaydigan va to'liq qamrab oluvchi qismlarga ajratish.
2. <b>Issue Tree (Muammo daraxti)</b> — asosiy savolni 3-4 ta asosiy drayverga bo'lish (Daromadni oshirish, Xarajatlarni qisqartirish, Yangi bozorlarga chiqish).
3. <b>TAM / SAM / SOM</b> — bozor hajmini tahlil qilish:
   • <i>TAM:</i> Umumiy potentsial bozor hajmi;
   • <i>SAM:</i> Biz erisha oladigan bozor segmenti;
   • <i>SOM:</i> Biz dastlabki 1-3 yilda real egallaydigan ulush.
4. <b>Strukturaviy taqdimot:</b> Muammo ➔ Tahlil ➔ 3 ta asosiy yechim ➔ Moliyaviy reja va ROI ➔ Xatarlar (Risk Management).`,

  financeTopics: {
    dcf: `📊 <b>DCF (Discounted Cash Flow) Modeli</b>

<b>Ta'rif:</b> Kompaniyaning kelajakdagi erkin pul oqimlarini (FCF) bugungi kungi qiymatga diskontlash orqali kompaniyaning haqiqiy (intrinsic) qiymatini topish usuli.

🔢 <b>Asosiy formula:</b>
<code>PV = FCF₁ / (1+WACC)¹ + FCF₂ / (1+WACC)² + ... + Terminal Value / (1+WACC)ⁿ</code>

📌 <b>5 ta asosiy qadam:</b>
1. Tarixiy moliyaviy hisobotlarni o'rganish va 5 yillik daromad prognozini tuzish;
2. Erkin Pul Oqimini (Unlevered Free Cash Flow) hisoblash:
   <code>FCF = EBIT × (1 - Soliq) + D&A - CapEx - ΔNWC</code>
3. WACC (Diskont stavkasi)ni hisoblash;
4. Prognoz davridan keyingi davr uchun Terminal Value (TV)ni hisoblash (Gordon Growth yoki Exit Multiple metodi);
5. Barcha kelajak oqimlarni diskontlab, Enterprise Value va Equity Valueni chiqarish.`,

    multiples: `📈 <b>Bozor Multiplikatorlari (Relative Valuation)</b>

Kompaniyani uning sohasidagi o'xshash kompaniyalar (Comps) bilan taqqoslab baholash:

1. <b>P/E (Price-to-Earnings):</b>
   Aksiya narxi / Sof foyda (EPS). Eng ommabop, ammo kapital tuzilmasiga (qarzga) bog'liq.
2. <b>EV / EBITDA (Enterprise Value / EBITDA):</b>
   Eng professional multiplikator. Kapital tuzilmasi va soliq farqlariga bog'liq bo'lmagan holda operatsion rentabellikni ko'rsatadi.
3. <b>P/B (Price-to-Book):</b>
   Aksiya narxi / Balans qiymati. Banklar va moliya institutlarini baholashda asosiy multiplikator.
4. <b>EV / Sales:</b>
   Hali sof foydaga kirmagan, tez o'sayotgan texnologik startaplar uchun qo'llaniladi.`,

    lbo: `🏦 <b>LBO (Leveraged Buyout) va Private Equity</b>

<b>Ta'rif:</b> Kompaniyani sotib olishda katta miqdorda qarz mablag'laridan (odatda 60-80% qarz, 20-40% o'z kapitali) foydalanish investitsiya strategiyasi.

📌 <b>LBO uchun ideal kompaniya mezonlari:</b>
• Barqaror va bashorat qilinadigan pul oqimlari (Cash Flow);
• Past qarz yuki (Clean Balance Sheet);
• CapEx (kapital xarajatlar)ning pastligi;
• Bozoridagi mustahkam pozitsiya (Moat);
• Xarajatlarni optimallashtirish va samaradorlikni oshirish imkoniyati.`
  },

  interviewQuestions: `💼 <b>IB & Consulting Intervyu Savollari (Top-3)</b>

❓ <b>1-savol: "Walk me through a DCF" (DCFni tushuntirib bering)</b>
<b>Javob:</b> <i>"DCF modelida avval 5 yillik Unlevered Free Cash Flow prognoz qilinadi. FCF = EBIT × (1 - T) + D&A - CapEx - ΔNWC. Keyin WACC orqali diskontlab Enterprise Value topiladi. Bunga naqd pul qo'shilib, qarz ayrilsa Equity Value chiqadi."</i>

❓ <b>2-savol: "Amortizatsiya (Depreciation) $10 ga oshsa, 3 hisobotda nima o'zgaradi?" (Soliq stavkasi 20%)</b>
<b>Javob:</b>
• <b>Income Statement:</b> Operatsion xarajat $10 ga oshadi, Soliqdan oldingi foyda $10 ga kamayadi. Soliq $2 ga tejaladi, Sof foyda $8 ga kamayadi.
• <b>Cash Flow Statement:</b> Sof foyda -$8, lekin amortizatsiya naqdsiz xarajat bo'lgani uchun +$10 qo'shiladi. Operatsion pul oqimi (Cash) +$2 ga oshadi!
• <b>Balance Sheet:</b> Aktiv tomonda Naqd pul +$2, Asosiy vositalar -$10 (jami aktiv -$8). Passiv tomonda Taqsimlanmagan foyda -$8. Balans teng!

❓ <b>3-savol: "WACC nima va u qachon oshadi?"</b>
<b>Javob:</b> WACC — bu qarz va xususiy kapitalning o'rtacha og'irlikli qiymati. Foiz stavkalari oshganda, kompaniyaning Beta (bozor riski) oshganda yoki kredit reytingi pasayganda WACC oshadi.`,

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
