/**
 * UWED FIS — Keng qamrovli Moliya, Investitsiya va Keys Terminlari Lug'ati
 */

module.exports = {
  categories: {
    valuation: {
      name: "📊 Baholash & Modellashtirish",
      terms: [
        {
          id: "t_dcf",
          name: "DCF (Discounted Cash Flow)",
          formula: "PV = Σ [ FCF_t / (1 + WACC)^t ] + Terminal Value / (1 + WACC)^n",
          def: "Kompaniyaning kelajakdagi erkin pul oqimlarini diskontlash orqali uning bugungi kundagi haqiqiy (fundamental) qiymatini baholash modeli.",
          practical: "Investitsiya banklarida kompaniya aksiyalarining bozor narxi arzon yoki qimmatligini aniqlashda asosiy qurol hisoblanadi."
        },
        {
          id: "t_wacc",
          name: "WACC (Weighted Average Cost of Capital)",
          formula: "WACC = (E/V × Re) + (D/V × Rd × (1 - Tc))",
          def: "Kompaniyaning o'z kapitali (Equity) va qarz kapitali (Debt) bo'yicha o'rtacha og'irlikli xarajati. DCF modelida diskont stavkasi (r) sifatida ishlatiladi.",
          practical: "Kompaniyaning kreditorlar va aksiyadorlar oldidagi minimal daromadlilik talabini ifodalaydi."
        },
        {
          id: "t_tv",
          name: "Terminal Value (TV)",
          formula: "TV = FCF_n × (1 + g) / (WACC - g)  yoki  EBITDA_n × Exit Multiple",
          def: "Kompaniyaning 5 yoki 10 yillik prognoz davridan keyingi cheksiz davrdagi barcha kelajak oqimlarining qiymati.",
          practical: "Ko'pincha kompaniya umumiy Enterprise Value qiymatining 60% dan 80% gacha bo'lgan qismini tashkil qiladi."
        },
        {
          id: "t_capm",
          name: "CAPM & Beta (β)",
          formula: "Cost of Equity (Re) = Rf + β × (Rm - Rf)",
          def: "Xususiy kapital qiymatini hisoblash modeli. Beta (β) — kompaniya aksiyasining umumiy bozor tebranishlariga nisbatan xavflilik (volatility) darajasi.",
          practical: "Beta > 1 bo'lsa aksiya bozordan tezroq tebranadi (masalan, texnologiya), Beta < 1 bo'lsa himoyalangan (masalan, kommunal xizmatlar)."
        },
        {
          id: "t_ev_eqv",
          name: "Enterprise Value (EV) vs Equity Value",
          formula: "Enterprise Value = Equity Value + Sof Qarz (Total Debt - Cash)",
          def: "Enterprise Value — bu butun biznesning (qarz beruvchilar va aksiyadorlar uchun) umumiy operatsion qiymati. Equity Value — faqat aksiyadorlarga tegishli bozor kapitallashuvi.",
          practical: "Kompaniyani to'liq sotib olishda xaridor nafaqat aksiyalarni, balki kompaniya qarzlarini ham to'lashi kerak, shuning uchun EV muhimroq."
        }
      ]
    },

    multiples: {
      name: "📈 Bozor Multiplikatorlari (Relative Valuation)",
      terms: [
        {
          id: "t_pe",
          name: "P/E (Price-to-Earnings)",
          formula: "P/E = Aksiya Narxi / Bir aksiyaga sof foyda (EPS)",
          def: "Investorlar kompaniyaning har $1 sof foydasi uchun necha dollar to'lashga tayyor ekanligini ko'rsatadi.",
          practical: "P/E past bo'lsa kompaniya arzon baholangan bo'lishi mumkin, ammo qarz yuki va soliqlar farqini inobatga olmaydi."
        },
        {
          id: "t_ev_ebitda",
          name: "EV / EBITDA",
          formula: "EV / EBITDA = Enterprise Value / EBITDA",
          def: "Kompaniyaning umumiy qiymatini uning operatsion naqd ishlab chiqarish quvvatiga nisbati. Professional moliya tahlilchilari uchun 1-raqamli multiplikator.",
          practical: "Kapital tuzilmasi (qarz darajasi) va amortizatsiya siyosatiga bog'liq bo'lmagani uchun xalqaro kompaniyalarni solishtirishda eng ishonchli."
        },
        {
          id: "t_pb",
          name: "P/B (Price-to-Book)",
          formula: "P/B = Aksiya narxi / Balansdagi o'z kapitali qiymati",
          def: "Bozor kapitallashuvining kompaniya sof aktivlari (Book Value)ga nisbati.",
          practical: "Banklar, sug'urta kompaniyalari va og'ir sanoat korxonalarini baholashda asosiy mezon hisoblanadi."
        },
        {
          id: "t_ev_sales",
          name: "EV / Sales (EV / Revenue)",
          formula: "EV / Sales = Enterprise Value / Yillik tushum",
          def: "Kompaniyaning umumiy qiymatini uning yillik savdo hajmiga nisbati.",
          practical: "Hali sof foydaga kirmagan, lekin tez sur'atda o'sayotgan startaplar va SaaS texnologiya kompaniyalari uchun ishlatiladi."
        },
        {
          id: "t_peg",
          name: "PEG Ratio",
          formula: "PEG = (P/E) / Yillik sof foyda o'sish sur'ati (%)",
          def: "P/E multiplikatorini kompaniyaning kelajakdagi o'sish tezligi bilan muvozanatlovchi ko'rsatkich.",
          practical: "PEG < 1 bo'lsa, kompaniya o'zining tez o'sish salohiyatiga nisbatan arzon baholangan hisoblanadi."
        }
      ]
    },

    corp_finance: {
      name: "💼 Korporativ Moliya & Hisobot",
      terms: [
        {
          id: "t_ebitda",
          name: "EBITDA & EBIT",
          formula: "EBITDA = Sof foyda + Soliqlar + Foizlar + Amortizatsiya (D&A)",
          def: "Foizlar, soliqlar va amortizatsiyadan oldingi operatsion foyda. Biznesning sof operatsion quvvatini ko'rsatadi.",
          practical: "Kompaniya qancha soliq to'lashi yoki qancha qarz olganidan qat'i nazar, uning asosiy biznesi qancha naqd pul ishlab chiqarayotganini ko'rsatadi."
        },
        {
          id: "t_fcf",
          name: "FCF (Free Cash Flow)",
          formula: "FCF = Operatsion Pul Oqimi (CFO) - Kapital Xarajatlar (CapEx)",
          def: "Kompaniya o'z operatsiyalarini va asosiy vositalarini (CapEx) qo'llab-quvvatlagandan so'ng investorlar va aksiyadorlarga taqsimlash uchun erkin qolgan naqd pul.",
          practical: "Buxgalteriya sof foydasidan (Net Income) ko'ra ancha aniq, chunki naqd pulni manipulyatsiya qilib bo'lmaydi."
        },
        {
          id: "t_capex",
          name: "CapEx (Capital Expenditures)",
          formula: "CapEx = PP&E (joriy yil) - PP&E (oldingi yil) + Amortizatsiya",
          def: "Kompaniyaning uzoq muddatli aktivlari (binolar, uskunalar, texnologiyalar, zavodlar)ni sotib olish yoki yangilash uchun sarflangan xarajatlari.",
          practical: "Yuqori CapEx kelajakdagi o'sishni ta'minlaydi, ammo qisqa muddatda erkin pul oqimini kamaytiradi."
        },
        {
          id: "t_nwc",
          name: "NWC (Net Working Capital)",
          formula: "NWC = Qisqa muddatli operatsion aktivlar - Qisqa muddatli operatsion majburiyatlar",
          def: "Kompaniyaning kundalik operatsion faoliyatini uzluksiz yuritish uchun zarur bo'lgan aylanma mablag'lari zaxirasi.",
          practical: "NWC ning oshishi naqd pulni muzlatib qo'yadi (Cash Flow kamayadi), NWC kamayishi esa naqd pulni bo'shatadi."
        },
        {
          id: "t_roe_roic",
          name: "ROE va ROIC Rentabelligi",
          formula: "ROE = Net Income / Equity  |  ROIC = NOPAT / Invested Capital",
          def: "ROE — aksiyadorlar kapitalining daromadliligi. ROIC — barcha investitsiya qilingan kapital (qarz + o'z kapitali) qanchalik samarali ishlayotganini ko'rsatadi.",
          practical: "ROIC > WACC bo'lsagina kompaniya yangi qiymat (Value Creation) yaratadi. Aks holda kompaniya kapitalni yo'qotmoqda."
        }
      ]
    },

    ib_pe: {
      name: "🏦 Investitsiya Banki, PE & M&A",
      terms: [
        {
          id: "t_lbo",
          name: "LBO (Leveraged Buyout)",
          formula: "Odatda: 60-80% Qarz (Senior/Mezzanine Debt) + 20-40% O'z Kapitali (Sponsor Equity)",
          def: "Kompaniyani sotib olishda katta miqdorda qarz mablag'laridan foydalaniladigan Private Equity investitsiya strategiyasi.",
          practical: "Kompaniyaning o'zi ishlab topgan erkin pul oqimlari hisobiga olingan qarz yopiladi va 3-5 yildan so'ng kompaniya sotilganda xususiy kapitalga 20-30% IRR (yillik daromad) olinadi."
        },
        {
          id: "t_ma_synergy",
          name: "M&A va Sinergiyalar (Synergies)",
          formula: "1 + 1 = 3 effekti (Xarajat sinergiyasi + Daromad sinergiyasi)",
          def: "Ikki kompaniya birlashganda ularning birgalikdagi qiymati alohida qiymatlar yig'indisidan kattaroq bo'lishi.",
          practical: "Xarajat sinergiyasi: Bosh ofis, IT, yuristlar va logistika xarajatlarini birlashtirib tejash. Daromad sinergiyasi: Bir-birining mijozlariga mahsulot sotish (Cross-selling)."
        },
        {
          id: "t_dd",
          name: "Due Diligence (Har tomonlama tekshiruv)",
          formula: "Moliyaviy + Yuridik + Soliq + Operatsion + Texnologik tahlil",
          def: "Kompaniyani sotib olishdan oldin uning barcha moliyaviy hisobotlari, yashirin qarzlari, sud da'volari va shartnomalarini sinchiklab tekshirish jarayoni.",
          practical: "M&A bitimlarida kutilmagan moliyaviy xatarlar (skeletons in the closet) oldini olishning yagona yo'li."
        },
        {
          id: "t_moat",
          name: "Economic Moat (Iqtisodiy himoya devori)",
          formula: "Brend kuchi + Tarmoq effekti + Yuqori almashtirish xarajati + Xarajat ustunligi",
          def: "Kompaniyaning raqobatchilardan uzoq yillar davomida o'z bozor ulushi va yuqori daromadliligini himoya qila olish ustunligi (Uorren Baffet atamasi).",
          practical: "Masalan: Apple ekotizimi, Visa to'lov tarmog'i, Coca-Cola brendi."
        }
      ]
    },

    strategy: {
      name: "🏆 Biznes Strategiya & Metrikalar",
      terms: [
        {
          id: "t_mece",
          name: "MECE Prinsipi",
          formula: "Mutually Exclusive (Takrorlanmaydigan) + Collectively Exhaustive (To'liq qamrab oluvchi)",
          def: "Muammoni qismlarga ajratishda elementlar bir-birini inkor etishi va barcha variantlar to'liq qamrab olingan bo'lishi kerak.",
          practical: "McKinsey, BCG va Vertex chempionatlarida har qanday muammoni tizimlashtirishning asosi."
        },
        {
          id: "t_tam_sam_som",
          name: "TAM, SAM, SOM",
          formula: "TAM (Umumiy bozor) ➔ SAM (Erishish mumkin bo'lgan qism) ➔ SOM (Real maqsadli ulush)",
          def: "Bozor hajmini pastdan yuqoriga (Bottom-up: Aholi × Maqsadli % × Narx) professional baholash vositasi.",
          practical: "Hakamlar umumiy taxminiy foizlardan ko'ra, aniq demografik faktlarga asoslangan Bottom-up hisobni yuqori baholaydi."
        },
        {
          id: "t_cac_ltv",
          name: "CAC va LTV (Unit Economics)",
          formula: "LTV / CAC > 3x (Sog'lom biznes mezoni)",
          def: "CAC — 1 ta yangi mijozni jalb qilish xarajati. LTV — bitta mijoz kompaniyaga butun hamkorlik davrida keltiradigan umumiy yalpi foyda.",
          practical: "Agar LTV/CAC nisbati 3 dan kichik bo'lsa, kompaniya har bir yangi mijozdan zarar ko'rmoqda."
        },
        {
          id: "t_cagr",
          name: "CAGR (Compound Annual Growth Rate)",
          formula: "CAGR = (Yakuniy Qiymat / Boshlang'ich Qiymat)^(1/n) - 1",
          def: "Ma'lum bir necha yillik davr mobaynidagi o'rtacha yillik murakkab o'sish sur'ati.",
          practical: "Bozor hajmi yoki kompaniya daromadining yildan-yilga o'sish dinamikasini bir tekis ifodalash uchun ishlatiladi."
        }
      ]
    }
  }
};
