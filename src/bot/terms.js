/**
 * UWED FIS — Keng qamrovli Moliya, Iqtisodiyot va Menejment Lug'ati
 * Bo'limlar: Makroiqtisodiyot, Mikroiqtisodiyot, Korporativ Moliya, Boshqaruv Hisobi, Menejment
 * Standart: Sodda tushuncha (Description), Formula/Qoida, Hayotiy misol (Example), Amaliy ahamiyat.
 */

module.exports = {
  categories: {
    macro: {
      name: "🏛 Makroiqtisodiyot (Macroeconomics)",
      desc: "Butun mamlakat va global iqtisodiyot darajasidagi jarayonlar: YaIM, inflyatsiya, stavkalar, valyuta.",
      terms: [
        {
          id: "t_macro_gdp",
          name: "YaIM (Yalpi Ichki Mahsulot / GDP)",
          formula: "GDP = C (Iste'mol) + I (Investitsiyalar) + G (Davlat xarajatlari) + NX (Sof eksport)",
          def: "Bir mamlakat hududida 1 yil davomida ishlab chiqarilgan barcha yakuniy tovar va xizmatlarning umumiy bozor qiymati. Mamlakat iqtisodiy qudratining 1-raqamli ko'rsatkichi.",
          example: "O'zbekiston YaIMi $147 mlrd ga yetdi (+7.7% yuqori o'sish), aholi jon boshiga esa $3,846 ni tashkil qildi. YaIM 7.7% o'sishi — mamlakatda ishlab chiqarish, daromadlar va xizmatlar ko'lami o'tgan yilgidan sezilarli ko'payganini anglatadi.",
          practical: "Investorlar YaIM tez o'sayotgan mamlakatlarga (masalan, O'zbekiston, Hindiston) ko'proq investitsiya kiritishadi, chunki xarid qobiliyati oshadi."
        },
        {
          id: "t_macro_inf",
          name: "Inflyatsiya va CPI (Iste'mol narxlari indeksi)",
          formula: "Inflyatsiya = ((CPI_joriy - CPI_avvalgi) / CPI_avvalgi) × 100%",
          def: "Mamlakatda narxlarning umumiy darajasi oshishi va oqibatda pulning xarid qobiliyati pasayishi (pul qadrsizlanishi).",
          example: "O'zbekistonda yillik umumiy inflyatsiya 7.3% gacha pasaydi (2024-yildagi 9.8% dan), bazaviy inflyatsiya esa 5.7% bo'ldi. Inflyatsiyadan past daromad keltiradigan har qanday omonat real ma'noda pulni yo'qotmoqda.",
          practical: "Inflyatsiyadan yuqori daromad keltirmaydigan har qanday omonat yoki investitsiya real ma'noda pulni yo'qotmoqda."
        },
        {
          id: "t_macro_rate",
          name: "Markaziy Bank Asosiy Stavkasi (Policy Rate)",
          formula: "Yuqori stavka = Qarz qimmatlashadi ➔ Inflyatsiya tushadi; Past stavka = Iqtisodiyot jonlanadi",
          def: "Markaziy bank tijorat banklariga kredit beradigan yoki ulardan depozit qabul qiladigan asosiy foiz stavkasi. Butun mamlakatdagi kredit va depozit narxini belgilaydi.",
          example: "O'zbekiston Markaziy banki asosiy stavkani 14.0% qilib belgilasa (amaldagi stavka 14.0%), tijorat banklari aholi va biznesga kreditlarni 22-26% atrofida beradi. Qat'iy stavka xarajatlarni me'yorlashtirib, narxlar oshishi (inflyatsiya)ni jilovlaydi.",
          practical: "Stavka pasayishi kutilsa — aksiyalar bozori o'sadi; stavka yuqori bo'lsa — xavfsiz davlat obligatsiyalari va milliy depozitlar jozibador bo'ladi."
        },
        {
          id: "t_macro_fx",
          name: "Valyuta Kursi va Devalvatsiya",
          formula: "Devalvatsiya: 1 USD = 12,242 so'm ➔ 12,800 so'm (Milliy valyuta qadrsizlanishi)",
          def: "Milliy valyutaning chet el valyutalariga (masalan, AQSH dollariga) nisbatan almashuv qiymati. Devalvatsiya — milliy valyuta xarid quvvati tushishi.",
          example: "Dollar kursi 12,242 dan 12,800 so'mga o'zgarganda, chetdan keltiriladigan tovarlar so'mda qimmatlashadi, eksportchilar (masalan, to'qimachilik yoki xizmatlar) esa ko'proq so'm tushumiga ega bo'ladi.",
          practical: "Xalqaro kompaniyalarni tahlil qilishda valyuta kursi riskini (FX risk) doim hisobga olish shart."
        },
        {
          id: "t_macro_fiscal",
          name: "Fiskal Siyosat va Byudjet Defitsiti",
          formula: "Byudjet qoldig'i = Davlat Daromadlari (Soliqlar) - Davlat Xarajatlari (Yo'llar, maoshlar)",
          def: "Hukumatning soliqlar yig'ish va davlat byudjeti mablag'larini xarajat qilish orqali iqtisodiyotni tartibga solish siyosati. Xarajat daromaddan oshsa — defitsit bo'ladi.",
          example: "Hukumat yangi maktablar, ko'priklar qurishga va pensiyalarni oshirishga ko'p pul sarflasa, aholi qo'lida pul ko'payadi, iqtisodiy o'sish tezlashadi.",
          practical: "Byudjet defitsiti yuqori bo'lsa, davlat ko'proq qarz (yevrobondlar) chiqaradi, bu esa davlat qarzini oshirishi mumkin."
        }
      ]
    },

    micro: {
      name: "🏬 Mikroiqtisodiyot (Microeconomics)",
      desc: "Alohida shaxslar, xaridorlar va kompaniyalarning bozor qarorlari: talab, narx, chekli xarajatlar.",
      terms: [
        {
          id: "t_micro_sd",
          name: "Talab va Taklif Qonuni (Supply & Demand)",
          formula: "Narx oshsa ➔ Talab kamayadi (Qd↓), Taklif oshadi (Qs↑). Muvozanat: Qd = Qs",
          def: "Bozorda tovar narxining erkin xaridorlar (talab) va ishlab chiqaruvchilar (taklif) kurashi natijasida muvozanat nuqtasida shakllanishi.",
          example: "Yozda qovun ko'payib ketganda (taklif ko'p), narx 5,000 so'mga tushadi. Qishda esa qovun kam bo'lgani uchun narxi 40,000 so'mga chiqadi.",
          practical: "Biznes yuritishda bozor to'yinganligini (saturation) bilish uchun taklif hajmini tahlil qilish lozim."
        },
        {
          id: "t_micro_ped",
          name: "Narx Elastikligi (Price Elasticity of Demand)",
          formula: "Ed = (% Talab o'zgarishi) / (% Narx o'zgarishi)",
          def: "Tovar narxi 1% ga oshganda xaridorlar talabi necha foizga kamayishini o'lchovchi metrika.",
          example: "Nonga narx 20% oshsa ham, odamlar non sotib olishni deyarli kamaytirmaydi (noelastik talab). Ammo kinoteatr chiptasi 2 baravar qimmatlasa, ko'pchilik borishni to'xtatadi (yuqori elastik talab).",
          practical: "Kompaniyalar noelastik tovarlar (dori-darmon, elektr) narxini bemalol oshirishi mumkin, ammo elastik tovarlarda narxni oshirish savdoni barbod qiladi."
        },
        {
          id: "t_micro_mc_mr",
          name: "Chekli Xarajat (MC) va Chekli Daromad (MR)",
          formula: "Optimal ishlab chiqarish qoidasi: MR = MC (Maksimal foyda nuqtasi)",
          def: "Chekli xarajat (MC) — yana 1 dona qo'shimcha mahsulot ishlab chiqarish uchun sarflanadigan pul. Chekli daromad (MR) — o'sha qo'shimcha mahsulot sotilganda keladigan pul.",
          example: "Restoran 100 ta lag'mon sotmoqda. 101-chi lag'monni tayyorlash uchun faqat $2 lik go'sht-un ketadi (MC=$2). Agar uni $5 ga sotsa (MR=$5), restoran yana $3 sof foyda qiladi. Qachonki 1 dona lag'mon tayyorlash xarajati uning narxiga teng bo'lib qolsa, ishlab chiqarishni to'xtatish kerak.",
          practical: "Har qanday korxona o'z quvvatini rejalashtirishda MC=MR qoidasiga tayanadi."
        },
        {
          id: "t_micro_costs",
          name: "O'zgarmas (FC) va O'zgaruvchan (VC) Xarajatlar",
          formula: "Umumiy xarajat (TC) = O'zgarmas xarajat (FC) + O'zgaruvchan xarajat (VC)",
          def: "O'zgarmas xarajat (FC) — ishlab chiqarish hajmiga bog'liq bo'lmagan xarajat (ijara, qorovul maoshi). O'zgaruvchan xarajat (VC) — mahsulot ko'paysa oshadigan xarajat (xomashyo, dona-bay ish haqi).",
          example: "Trikotaj fabrikasi oyiga 1 dona ko'ylak tiksa ham, 10,000 dona tiksa ham bino ijarasiga $2,000 to'laydi (FC). Ammo har bir tikilgan ko'ylak uchun ketadigan mato va tugma — bu VC dir.",
          practical: "Ishlab chiqarish hajmi qancha ko'paysa, 1 dona mahsulotga to'g'ri keladigan o'zgarmas xarajat shuncha kamayadi (Economies of Scale)."
        },
        {
          id: "t_micro_comp",
          name: "Raqobat Modellari (Monopoliya vs Oligopoliya)",
          formula: "Mukammal raqobat (Ko'p sotuvchi) ➔ Oligopoliya (2-4 gigant) ➔ Monopoliya (1 ta yakka hukmron)",
          def: "Bozorda sotuvchilar va xaridorlar soni hamda narxni kim belgilashiga qarab bozor tuzilmasi.",
          example: "Toshkentda taksi bozori (Yandex, MyTaxi) — oligopoliya; O'zbekiston temir yo'llari yo'lovchi tashishda — tabiiy monopoliya; dehqon bozoridagi pomidor sotuvchilar — mukammal raqobatga yaqin.",
          practical: "Monopoliyalar va oligopoliyalar yuqori marja (Pricing Power)ga ega bo'lib, investorlar uchun xavfsizroq kassa keltiradi."
        }
      ]
    },

    accounting: {
      name: "📑 Boshqaruv Hisobi (Managerial Accounting)",
      desc: "Kompaniya ichki rahbarlari uchun xarajatlarni hisoblash, zararsizlik va foyda nazorati.",
      terms: [
        {
          id: "t_acc_be",
          name: "Zararsizlik Nuqtasi (Break-even Point / BEP)",
          formula: "BEP (donalarda) = O'zgarmas xarajatlar (FC) / (Sotish narxi - 1 dona mahsulot o'zgaruvchan xarajati)",
          def: "Kompaniya na foyda, na zarar ko'radigan (sof foyda = 0) minimal savdo hajmi. Barcha xarajatlar to'liq qoplanadigan chegara.",
          example: "Qahvaxonaning oylik ijarasi va maoshlari $3,000 (FC). 1 finjon qahva narxi $3, uning kofe donasi va stakani xarajati $1 (VC). Marja = $2. BEP = $3,000 / $2 = 1,500 finjon. Qahvaxona oyiga 1,500 ta qahva sotgandan keyingina sof foydaga kira boshlaydi!",
          practical: "Startap yoki yangi biznes ochishdan oldin birinchi navbatda BEP hisoblanadi."
        },
        {
          id: "t_acc_cm",
          name: "Marjinal Daromad (Contribution Margin)",
          formula: "Contribution Margin (CM) = Tushum (Revenue) - O'zgaruvchan xarajatlar (VC)",
          def: "Mahsulot sotilgandan keyin o'zgarmas xarajatlarni (ijara, maosh) qoplash va sof foyda hosil qilish uchun qoladigan qism.",
          example: "Agar korxona $100 ga mahsulot sotib, unga $60 xomashyo sarflasa, CM = $40 (40%). Bu qolgan $40 korxonaning ijarasini to'lashga va foyda yaratishga xizmat qiladi.",
          practical: "Qaysi mahsulot turining CM marjasi yuqori bo'lsa, marketingda o'shani ko'proq sotishga urg'u beriladi."
        },
        {
          id: "t_acc_abc",
          name: "ABC Tahlili (Activity-Based Costing)",
          formula: "Pareto qoidasi (80/20): A toifa (80% qiymat), B toifa (15%), C toifa (5%)",
          def: "Xarajatlar va tovar zaxiralarini ularning kompaniya daromadiga qo'shadigan real hissasiga qarab 3 guruhga bo'lib boshqarish.",
          example: "Supermarketdagi mahsulotlarning atigi 20% i (go'sht, non, sut) umumiy aylanmaning 80% ini keltiradi (A toifa). Ularning zaxirasi hech qachon tugab qolmasligi shart.",
          practical: "Ombor logistikasida behuda xarajatlarni 25-30% ga qisqartirish imkonini beradi."
        },
        {
          id: "t_acc_variance",
          name: "Variatsion Tahlil (Variance Analysis)",
          formula: "Farq (Variance) = Haqiqiy ko'rsatkich (Actual) - Byudjetlashtirilgan reja (Budget)",
          def: "Oy yoki yil boshida tuzilgan moliyaviy reja (byudjet) bilan amalda sodir bo'lgan natijalarni solishtirib, og'ishlar sababini aniqlash.",
          example: "Fabrika materiallar uchun $10,000 reja qilgan edi, lekin $13,000 sarflandi. Tahlil shuni ko'rsatadiki: xomashyo narxi 10% oshgan, ishchilar esa 20% ko'p brak chiqargan.",
          practical: "Boshqaruv hisobida aybdorlarni jazolash uchun emas, xarajat oqib ketayotgan teshiklarni yopish uchun ishlatiladi."
        },
        {
          id: "t_acc_bsc",
          name: "Balanced Scorecard (Balanslashtirilgan ko'rsatkichlar)",
          formula: "4 ta ustun: Moliya + Mijozlar + Ichki jarayonlar + Xodimlar rivojlanishi",
          def: "Kompaniyani faqat o'tmishdagi buxgalteriya foydasiga qarab emas, mijozlar qoniqishi va xodimlar malakasi kabi kelajak drayverlari bilan birgalikda boshqarish.",
          example: "Bank daromadi ko'p bo'lishi mumkin, ammo agar navbatlar ko'payib mijozlar norozi bo'lsa (Mijoz ustuni), kelasi yili bank daromadi albatta tushadi. BSC buni oldindan ogohlantiradi.",
          practical: "Top-menejment kompaniyani barqaror boshqarishida 1-raqamli xarita vazifasini o'taydi."
        }
      ]
    },

    management: {
      name: "👔 Menejment & Strategik Boshqaruv",
      desc: "Korxonani boshqarish, samaradorlik, Toyota tizimi (TPS), Kaizen va operatsiyalar.",
      terms: [
        {
          id: "t_mgmt_tps",
          name: "TPS va Kaizen (Toyota Production System)",
          formula: "Kaizen = Doimiy kichik yaxshilanishlar; Muda = 7 turdagi isrofgarchilikni yo'qotish",
          def: "Ishlab chiqarishda ortiqcha harakat, vaqt, xomashyo isrofgarchiligini yo'qotish va har kuni kichik qadamlar bilan sifatni oshirish yapon boshqaruv falsafasi.",
          example: "Toyota ishchisi har kuni detalni olish uchun 3 qadam bosish o'rniga qutini yaqinroqqa surib qo'ydi. 1 yilda bu 50 soat vaqt va $10,000 tejab berdi.",
          practical: "Vertex keyslarida operatsion samaradorlikni oshirish bo'yicha eng sevimli etalon metodika."
        },
        {
          id: "t_mgmt_jit",
          name: "JIT (Just-in-Time / O'z Vaqtida Yetkazish)",
          formula: "Nol ombor zaxirasi = Kerakli detal + Kerakli vaqtda + Kerakli miqdorda",
          def: "Omborda oylab chang bosib yotadigan xomashyo saqlamasdan, kerakli butlovchi qismlarni bevosita konveyerga yig'ish vaqtida yetkazib kelish tizimi.",
          example: "Zavod 100 ta mashina yig'moqchi bo'lsa, unga bugun aynan 400 ta shina yetkaziladi. Ombor ijarasi va pulni muzlatib qo'yish nolga tushadi.",
          practical: "Aylanma mablag'larni (Working Capital) tejashda eng kuchli operatsion qurol."
        },
        {
          id: "t_mgmt_scale",
          name: "O'lchov Tejamkorligi (Economies of Scale)",
          formula: "Ishlab chiqarish hajmi (Q) oshsa ➔ 1 dona mahsulot tannarxi (ATC) pasayadi",
          def: "Kompaniya qancha ko'p hajmda mahsulot ishlab chiqarsa, o'zgarmas xarajatlar katta miqdorga bo'linib ketishi hisobiga har bir dona mahsulot shuncha arzonlashadi.",
          example: "Kitobni 1 dona chop etsangiz $50 ga tushadi (chunki stanokni sozlash kerak). Agar 100,000 dona bossangiz, 1 dona kitob tannarxi $1.5 ga tushadi.",
          practical: "Yirik korporatsiyalar (Boeing, Samsung, BYD) aynan shu ustunlik orqali kichik startaplarni bozordan siqib chiqaradi."
        },
        {
          id: "t_mgmt_integ",
          name: "Vertikal va Gorizontal Integratsiya",
          formula: "Vertikal: Ta'minotchi yoki dilerlarni sotib olish; Gorizontal: Raqobatchini sotib olish",
          def: "Vertikal integratsiya — xomashyodan tortib to yakuniy do'kongacha bo'lgan zanjirni o'ziga bo'ysundirish. Gorizontal — bitta sohadagi raqib korxonalarni birlashtirish.",
          example: "Artel korxonasi o'z muzlatgichlari uchun plastmassa va tunuka zavodini o'zi ochishi — bu vertikal integratsiya. Agar Artel boshqa maishiy texnika zavodini sotib olsa — bu gorizontal integratsiya bo'ladi.",
          practical: "M&A bitimlarida logistika zanjirini nazoratga olish uchun eng keng qo'llaniladigan strategiya."
        },
        {
          id: "t_mgmt_gov",
          name: "Korporativ Boshqaruv va Agent Muammosi (Agency Problem)",
          formula: "Aksiyadorlar (Egalari) vs Bosh direktor (Top-menejer) manfaatlari to'qnashuvi",
          def: "Kompaniya egalari (aksiyadorlar) uzoq muddatli foydani xohlaydi, lekin yollangan menejerlar o'zlarining shaxsiy bonuslari uchun qisqa muddatli xavfli qarorlar qabul qilishi mumkin.",
          example: "Bosh direktor yillik katta bonus olish uchun kelasi yilgi muhim ilmiy-tadqiqot (R&D) xarajatlarini kesib tashlab, sun'iy ravishda bu yilgi foydani ko'p qilib ko'rsatishi mumkin.",
          practical: "Kompaniya direktorlar kengashi (Board of Directors) menejerlarga to'g'ri KPI va opsionlar (stock options) belgilashi shart."
        }
      ]
    },

    valuation: {
      name: "📊 Korporativ Moliya & Baholash (Valuation)",
      desc: "Kompaniya qiymatini baholash, investitsiya tahlili: DCF, WACC, Multiplikatorlar, LBO.",
      terms: [
        {
          id: "t_dcf",
          name: "DCF (Discounted Cash Flow)",
          formula: "PV = Σ [ FCF_t / (1 + WACC)^t ] + Terminal Value / (1 + WACC)^n",
          def: "Kompaniyaning kelajakdagi erkin pul oqimlarini bugungi kungi qiymatga diskontlash orqali uning haqiqiy (intrinsic) qiymatini topish modeli.",
          example: "Kompaniya kelgusi 5 yilda har yili $10M dan erkin pul olib kelishi kutilmoqda. WACC 10% bo'lsa, kelajakdagi pullar bugungi kunda taxminan $138M ga teng bo'ladi.",
          practical: "Investitsiya banklarida aksiyalar arzon yoki qimmatligini aniqlashda 1-raqamli model."
        },
        {
          id: "t_wacc",
          name: "WACC (Weighted Average Cost of Capital)",
          formula: "WACC = (E/V × Re) + (D/V × Rd × (1 - Tc))",
          def: "Kompaniyaning o'z kapitali va qarz mablag'lari bo'yicha o'rtacha og'irlikli xarajati. Diskont stavkasi sifatida xizmat qiladi.",
          example: "Kompaniya 60% o'z kapitali (xarajati 12%) va 40% bank qarzi (foizi 8%) bilan ishlaydi. Soliq 15%. WACC = 0.6×12% + 0.4×8%×(1-0.15) = 7.2% + 2.72% = 9.92%.",
          practical: "Har qanday investitsiya loyihasining daromadliligi WACC dan yuqori bo'lishi shart, aks holda loyiha zarar keltiradi."
        },
        {
          id: "t_ebitda",
          name: "EBITDA & EBIT",
          formula: "EBITDA = Sof foyda + Soliqlar + Foizlar + Amortizatsiya (D&A)",
          def: "Foizlar, soliqlar va amortizatsiyadan oldingi operatsion foyda. Biznesning sof pul ishlab chiqarish qobiliyati.",
          example: "Kompaniyaning buxgalteriya sof foydasi $2M bo'lishi mumkin, lekin u $5M kredit foizi va $3M amortizatsiya to'lagan bo'lsa, uning operatsion EBITDA foydasi $10M ni tashkil etadi.",
          practical: "Kompaniyalarni xalqaro darajada solishtirishda qarz va soliq farqlaridan xoli eng xolis metrika."
        },
        {
          id: "t_multiples",
          name: "Bozor Multiplikatorlari (EV/EBITDA, P/E)",
          formula: "EV/EBITDA = Enterprise Value / EBITDA  |  P/E = Narx / EPS",
          def: "Kompaniyani o'z sohasidagi o'xshash raqobatchilari bilan taqqoslab tezkor baholash (Relative Valuation).",
          example: "Sohadagi barcha telekom kompaniyalari o'rtacha 7x EV/EBITDA bilan sotilmoqda. Agar kompaniyangizning EBITDA si $20M bo'lsa, uning bozor qiymati taxminan 7 × $20M = $140M bo'ladi.",
          practical: "M&A bitimlarida va IPO larda kompaniya narxini 5 daqiqada chamalab olish imkonini beradi."
        },
        {
          id: "t_lbo",
          name: "LBO (Leveraged Buyout)",
          formula: "Odatda: 70% Qarz + 30% O'z kapitali bilan biznesni sotib olish",
          def: "Private Equity fondlari tomonidan kompaniyani sotib olishda katta miqdorda qarz mablag'laridan foydalanish strategiyasi.",
          example: "Investor $100M lik zavodni atigi $30M o'z puli va $70M bank krediti bilan sotib oladi. Zavodning o'zi 5 yilda ishlab topgan pulidan qarz to'liq yopiladi va investor 5 yildan so'ng $100M lik zavodning yakka egasiga aylanadi (daromad 3 baravar oshadi).",
          practical: "Wall Streetdagi eng yuqori daromadli xususiy kapital strategiyasi."
        }
      ]
    }
  }
};
