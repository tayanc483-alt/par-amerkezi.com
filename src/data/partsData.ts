import { PartProduct, ApplianceCategory, ApplianceModelReference } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_appliance_parts_1793213948913.jpg';

export const CATEGORIES_CONFIG: { id: ApplianceCategory; name: string; icon: string }[] = [
  { id: 'all', name: 'Tüm Kategoriler', icon: 'Grid' },
  { id: 'camasir', name: 'Çamaşır Makinesi', icon: 'WashingMachine' },
  { id: 'bulasik', name: 'Bulaşık Makinesi', icon: 'Utensils' },
  { id: 'buzdolabi', name: 'Buzdolabı', icon: 'Refrigerator' },
  { id: 'firin', name: 'Fırın & Ocak', icon: 'Flame' },
  { id: 'kurutma', name: 'Kurutma Makinesi', icon: 'Wind' },
  { id: 'supurge', name: 'Küçük Ev Aletleri', icon: 'Sparkles' },
];

export const BRANDS_LIST = [
  'Tümü',
  'Arçelik',
  'Beko',
  'Bosch',
  'Siemens',
  'Profilo',
  'Vestel',
  'Samsung',
  'LG',
  'Altus',
];

export const POPULAR_APPLIANCE_MODELS: ApplianceModelReference[] = [
  { modelNumber: '8103 YP', brand: 'Arçelik', category: 'camasir', categoryName: 'Çamaşır Makinesi', title: 'Arçelik 8103 YP 8kg 1000 Devir' },
  { modelNumber: '7103 HE', brand: 'Arçelik', category: 'camasir', categoryName: 'Çamaşır Makinesi', title: 'Arçelik 7103 HE 7kg' },
  { modelNumber: '9123 N', brand: 'Arçelik', category: 'camasir', categoryName: 'Çamaşır Makinesi', title: 'Arçelik 9123 N 9kg 1200 Devir' },
  { modelNumber: 'WAT24480TR', brand: 'Bosch', category: 'camasir', categoryName: 'Çamaşır Makinesi', title: 'Bosch Serie 6 WAT24480TR 9kg' },
  { modelNumber: 'WGA142X0TR', brand: 'Bosch', category: 'camasir', categoryName: 'Çamaşır Makinesi', title: 'Bosch Serie 4 WGA142X0TR 9kg' },
  { modelNumber: 'WM14N260TR', brand: 'Siemens', category: 'camasir', categoryName: 'Çamaşır Makinesi', title: 'Siemens iQ300 WM14N260TR' },
  { modelNumber: 'DFN05311W', brand: 'Beko', category: 'bulasik', categoryName: 'Bulaşık Makinesi', title: 'Beko DFN05311W 5 Programlı' },
  { modelNumber: 'SMS43D02TR', brand: 'Bosch', category: 'bulasik', categoryName: 'Bulaşık Makinesi', title: 'Bosch SMS43D02TR Silence Plus' },
  { modelNumber: '6383 HC', brand: 'Arçelik', category: 'bulasik', categoryName: 'Bulaşık Makinesi', title: 'Arçelik 6383 HC 8 Programlı' },
  { modelNumber: 'BM 401', brand: 'Vestel', category: 'bulasik', categoryName: 'Bulaşık Makinesi', title: 'Vestel BM 401 4 Programlı' },
  { modelNumber: 'RT46K6000WW', brand: 'Samsung', category: 'buzdolabi', categoryName: 'Buzdolabı', title: 'Samsung RT46 No-Frost Çift Kapılı' },
  { modelNumber: '270560 EI', brand: 'Arçelik', category: 'buzdolabi', categoryName: 'Buzdolabı', title: 'Arçelik 270560 No-Frost Kombi' },
  { modelNumber: 'KDN56VW20N', brand: 'Bosch', category: 'buzdolabi', categoryName: 'Buzdolabı', title: 'Bosch Serie 4 KDN56 No-Frost' },
  { modelNumber: 'AFM 130 S', brand: 'Vestel', category: 'firin', categoryName: 'Fırın & Ocak', title: 'Vestel AFM 130 Ankastre Fırın' },
  { modelNumber: 'HBN331E1T', brand: 'Bosch', category: 'firin', categoryName: 'Fırın & Ocak', title: 'Bosch HBN Ankastre Elektrikli Fırın' },
  { modelNumber: 'KM 80', brand: 'Beko', category: 'kurutma', categoryName: 'Kurutma Makinesi', title: 'Beko KM 80 8kg Isı Pompalı' }
];

export const PRODUCTS_DATA: PartProduct[] = [
  {
    id: 'pm-101',
    name: 'Universal Çamaşır Makinesi Manyetik Tahliye Pompa Motoru',
    oemCode: '2880401800 / Copreci 30W',
    partType: 'Tahliye Pompası',
    brand: 'Arçelik',
    category: 'camasir',
    price: 340,
    originalPrice: 420,
    inStock: true,
    stockCount: 48,
    image: '/src/assets/images/product_drain_pump_1793213948671.jpg',
    origin: 'Orijinal',
    warranty: '1 Yıl Birebir Değişim',
    rating: 4.9,
    reviewsCount: 124,
    badge: 'Çok Satan',
    description: 'Arçelik, Beko, Altus ve Vestel çamaşır makineleriyle tam uyumlu 30W manyetik tahliye motoru. Sessiz çalışma, yüksek basma debisi ve uzun ömürlü polimer gövde.',
    specs: [
      { label: 'Çalışma Voltajı', value: '220 - 240V AC 50Hz' },
      { label: 'Güç Tüketimi', value: '30 Watt' },
      { label: 'Bağlantı Tipi', value: 'Standart Faston Soket 6.3mm' },
      { label: 'Gövde Materyali', value: 'Isıya ve Kirece Dayanıklı Termoplastik' },
      { label: 'Kullanım Alanı', value: 'Kazan kirli su boşaltma tahliye hattı' },
    ],
    compatibleModels: [
      '8103 YP', '7103 HE', '9123 N', '8123 CM', '6083 H', '7103 H', 
      'DFN05311W', 'WGA142X0TR', 'WAT24480TR', 'Altus AL-1012', 'Vestel Eko 8710'
    ]
  },
  {
    id: 'pm-102',
    name: 'Bosch & Siemens Çamaşır Makinesi Isıtıcı Rezistans (NTC Sensörlü)',
    oemCode: '00652518 / Bleckmann 2000W',
    partType: 'Isıtıcı Rezistans',
    brand: 'Bosch',
    category: 'camasir',
    price: 485,
    originalPrice: 560,
    inStock: true,
    stockCount: 32,
    image: '/src/assets/images/product_heating_element_1793213949535.jpg',
    origin: 'Orijinal',
    warranty: '1 Yıl Birebir Değişim',
    rating: 4.95,
    reviewsCount: 89,
    badge: 'Kireç Önleyici Kaplama',
    description: 'Bosch Serie 4, Serie 6, Serie 8 ve Siemens iQ300 / iQ500 makineleri için özel nikelaj kaplamalı boru tipi 2000W rezistans. Kireç tutmayan özel alaşım ve entegre NTC sıcaklık sensör soketi ile birlikte.',
    specs: [
      { label: 'Güç / Voltaj', value: '2000 Watt / 230V' },
      { label: 'Daldırma Boyu', value: '235 mm' },
      { label: 'Flanş Ölçüsü', value: '81 x 28 mm kauçuk conta' },
      { label: 'Sensör Yuvası', value: 'Entegre NTC soketi mevcut' },
      { label: 'Malzeme', value: 'AISI 316L Paslanmaz Çelik & Nikel Kaplama' },
    ],
    compatibleModels: [
      'WAT24480TR', 'WGA142X0TR', 'WAW28560TR', 'WAU24T90TR', 
      'WM14N260TR', 'WM12N260TR', 'WM14W560TR', 'Profilo CMG100DTR'
    ]
  },
  {
    id: 'pm-103',
    name: 'Ağır Hizmet Çamaşır Makinesi Kazan Rulman & Keçe Tamir Seti',
    oemCode: 'SKF-6205-6206-KIT / 35x62x10',
    partType: 'Kazan Rulman & Keçe',
    brand: 'Bosch',
    category: 'camasir',
    price: 295,
    originalPrice: 350,
    inStock: true,
    stockCount: 65,
    image: '/src/assets/images/product_bearing_kit_1793213949296.jpg',
    origin: 'A-Kalite OEM',
    warranty: '2 Yıl Mekanik Garanti',
    rating: 4.88,
    reviewsCount: 210,
    badge: 'SKF C3 Yüksek Devir',
    description: 'Yüksek devirde sıkma esnasında oluşan aşırı ses, vuruntu ve boşluk sorununu çözen komple tamir seti. Orijinal SKF 2RS kauçuk kapaklı çelik rulmanlar, çift dudaklı NBR sızdırmazlık keçesi ve özel rulman gresi hediyeli.',
    specs: [
      { label: 'Ön Rulman', value: 'SKF 6205-2RS (25x52x15 mm)' },
      { label: 'Arka Rulman', value: 'SKF 6206-2RS (30x62x16 mm)' },
      { label: 'Yağ Keçesi', value: '35x62x10/12 mm Çift Dudaklı NBR' },
      { label: 'Maks. Devir Kapasitesi', value: '1600 Devir/Dakika' },
      { label: 'Ekstralar', value: '15 gr Özel Su İtici Rulman Gresi Dahil' },
    ],
    compatibleModels: [
      '8103 YP', '9123 N', 'WAT24480TR', 'WGA142X0TR', 'WM14N260TR', 
      '7103 HE', 'Beko WMY 81283', 'Profilo CGA242X0TR'
    ]
  },
  {
    id: 'pm-104',
    name: 'Bulaşık Makinesi Yıkama Sirkülasyon Motoru & Isıtıcı Komple Gövde',
    oemCode: '12014980 / 00651956',
    partType: 'Sirkülasyon Pompası',
    brand: 'Bosch',
    category: 'bulasik',
    price: 1850,
    originalPrice: 2100,
    inStock: true,
    stockCount: 14,
    image: '/src/assets/images/hero_appliance_parts_1793213948913.jpg',
    origin: 'Orijinal',
    warranty: '1 Yıl Garanti',
    rating: 4.92,
    reviewsCount: 47,
    badge: 'BLDC Inverter',
    description: 'Bosch, Siemens, Profilo ve Neff bulaşık makinelerinde kullanılan BLDC fırçasız yıkama motoru ve rezistans ünitesi. E09 / E15 hata kodlarını giderir.',
    specs: [
      { label: 'Motor Teknolojisi', value: 'Fırçasız BLDC Manyetik Rotor' },
      { label: 'Isıtıcı Entegresi', value: 'Dahili 2080W Kalıp Rezistans' },
      { label: 'Giriş / Çıkış Çapı', value: '30 mm / 37 mm' },
      { label: 'Çalışma', value: 'Değişken debili mikro-işlemci kontrollü' },
    ],
    compatibleModels: [
      'SMS43D02TR', 'SMS44DW00T', 'SMS23BW01T', 'SN236I00MT', 
      'SN25D800TR', 'BM 401', 'DFN05311W'
    ]
  },
  {
    id: 'pm-105',
    name: 'Arçelik / Beko Çamaşır Makinesi Körük Lastiği (Antibakteriyel Gri)',
    oemCode: '2865200100',
    partType: 'Körük Lastiği',
    brand: 'Arçelik',
    category: 'camasir',
    price: 390,
    originalPrice: 460,
    inStock: true,
    stockCount: 27,
    image: '/src/assets/images/product_drain_pump_1793213948671.jpg',
    origin: 'Orijinal',
    warranty: '1 Yıl Garanti',
    rating: 4.85,
    reviewsCount: 76,
    badge: 'Küf Önleyici Silikon Katkı',
    description: 'Kazan ile ön kapak arasındaki su sızdırmazlığını sağlayan orijinal esnek körük körük contası. Özel tahliye delikli ve deterjan kireç korozyonuna karşı güçlendirilmiş silikon kauçuk.',
    specs: [
      { label: 'Malzeme', value: 'Vulkanize EPDM & Silikon Karışımı' },
      { label: 'Renk', value: 'Açık Gri (Leke Tutmaz)' },
      { label: 'Montaj Şekli', value: 'İç yay teli ve dış kelepçe ile sabitleme' },
      { label: 'Uyumluluk', value: '7kg - 8kg - 9kg Arçelik / Beko Gövdeler' }
    ],
    compatibleModels: [
      '8103 YP', '7103 HE', '9123 N', '8123 CM', 'Beko WMY 81283', 'Altus AL-1012'
    ]
  },
  {
    id: 'pm-106',
    name: 'Buzdolabı No-Frost Evaporatör Fan Motoru (12V DC Sessiz Tip)',
    oemCode: 'DA31-00287B / 4343830185',
    partType: 'Fan Motoru',
    brand: 'Samsung',
    category: 'buzdolabi',
    price: 420,
    originalPrice: 490,
    inStock: true,
    stockCount: 38,
    image: '/src/assets/images/hero_appliance_parts_1793213948913.jpg',
    origin: 'Orijinal',
    warranty: '1 Yıl Garanti',
    rating: 4.89,
    reviewsCount: 53,
    badge: 'DC İnverter Sessiz',
    description: 'Buzdolabının dondurucu ve soğutucu bölmelerine soğuk hava sirkülasyonu sağlayan sessiz DC motor. Yetersiz soğutma veya fan ses sorununu giderir.',
    specs: [
      { label: 'Voltaj / Akım', value: '12V DC / 0.21A' },
      { label: 'Devir', value: '2150 RPM' },
      { label: 'Soket', value: '3 Pin Konnektör (Tak-Çalıştır)' },
      { label: 'Mil Çapı', value: '3.17 mm D-kesim' },
    ],
    compatibleModels: [
      'RT46K6000WW', 'RT50K6000WW', 'RB34T600EWW', '270560 EI', 'KDN56VW20N'
    ]
  },
  {
    id: 'pm-107',
    name: 'Bulaşık Makinesi Çiftli Su Giriş Ventili (Akış Ölçerli & Emniyetli)',
    oemCode: '00611317 / 1883390100',
    partType: 'Su Giriş Ventili',
    brand: 'Bosch',
    category: 'bulasik',
    price: 310,
    originalPrice: 380,
    inStock: true,
    stockCount: 55,
    image: '/src/assets/images/product_drain_pump_1793213948671.jpg',
    origin: 'A-Kalite OEM',
    warranty: '1 Yıl Garanti',
    rating: 4.79,
    reviewsCount: 62,
    badge: 'Emniyet Filtreli',
    description: 'Şebekeden su alma arızası (su almıyor / musluk işareti yanıyor) durumlarında kullanılan 2 yollu elektrikli selenoid vana. Paslanmaz kum/tortu filtresi ile donatılmıştır.',
    specs: [
      { label: 'Besleme', value: '220V - 240V AC 50-60Hz' },
      { label: 'Çıkış Tipi', value: '2x 10mm Hortum Çıkışı' },
      { label: 'Giriş Rekoru', value: '3/4" Standart Musluk Rekor Dişi' },
      { label: 'İşletme Basıncı', value: '0.2 - 10 Bar' }
    ],
    compatibleModels: [
      'SMS43D02TR', 'DFN05311W', '6383 HC', 'BM 401', 'SMS44DW00T', 'SN236I00MT'
    ]
  },
  {
    id: 'pm-108',
    name: 'Ankastre Fırın Alt Isıtıcı Rezistans (1300W Çift Klemensli)',
    oemCode: '262900067 / 00684722',
    partType: 'Fırın Rezistansı',
    brand: 'Arçelik',
    category: 'firin',
    price: 360,
    originalPrice: 420,
    inStock: true,
    stockCount: 22,
    image: '/src/assets/images/product_heating_element_1793213949535.jpg',
    origin: 'A-Kalite OEM',
    warranty: '1 Yıl Garanti',
    rating: 4.87,
    reviewsCount: 41,
    badge: 'Homojen Isı Yayımı',
    description: 'Fırının alt taban tepsisinin altında yer alan ve alt pişirme performansı azaldığında veya hiç pişirmediğinde değiştirilen kaliteli rezistans.',
    specs: [
      { label: 'Güç', value: '1300 Watt' },
      { label: 'Boyutlar', value: '390 mm x 345 mm' },
      { label: 'Bağlantı Flanşı', value: '70 mm sabitleme kulağı' },
      { label: 'Termal Direnç', value: '800°C Sürekli Çalışma' }
    ],
    compatibleModels: [
      'AFM 130 S', 'HBN331E1T', '9651 NE', 'Beko BFC 430', 'Vestel Rustik Fırın'
    ]
  },
  {
    id: 'pm-109',
    name: 'Çamaşır Makinesi Amortisör Takımı (100N / 120N Çift Adet)',
    oemCode: '2816870400 / 00673541',
    partType: 'Amortisör',
    brand: 'Arçelik',
    category: 'camasir',
    price: 260,
    originalPrice: 320,
    inStock: true,
    stockCount: 42,
    image: '/src/assets/images/product_bearing_kit_1793213949296.jpg',
    origin: 'A-Kalite OEM',
    warranty: '1 Yıl Garanti',
    rating: 4.83,
    reviewsCount: 95,
    badge: 'Çift Adet Paket',
    description: 'Sıkma sırasında makinenin yürümesini, sallanmasını ve zıplamasını engelleyen hidrolik sürtünmeli titreşim emici takım. 2 adet amortisör ve sabitleme pimleri dahildir.',
    specs: [
      { label: 'Kuvvet Direnci', value: '110 Newton (Nominal)' },
      { label: 'Açık / Kapalı Boy', value: '265 mm / 185 mm' },
      { label: 'Pim Delik Çapı', value: '11 mm ve 13 mm burç uyumlu' },
      { label: 'Paket İçeriği', value: '2 Adet Amortisör + 4 Adet Montaj Pimi' }
    ],
    compatibleModels: [
      '8103 YP', '7103 HE', '9123 N', 'WAT24480TR', 'WGA142X0TR', 'Altus AL-1012'
    ]
  },
  {
    id: 'pm-110',
    name: 'Kurutma Makinesi Isı Pompası ve Tahliye Pompası Komple Modülü',
    oemCode: '2962510300',
    partType: 'Kurutma Pompası',
    brand: 'Beko',
    category: 'kurutma',
    price: 680,
    originalPrice: 790,
    inStock: true,
    stockCount: 16,
    image: '/src/assets/images/product_drain_pump_1793213948671.jpg',
    origin: 'Orijinal',
    warranty: '1 Yıl Garanti',
    rating: 4.9,
    reviewsCount: 38,
    badge: 'Şamandıra Sensörlü',
    description: 'Isı pompalı kurutma makinelerinde yoğuşan suyu üst tanka basan dahili şamandıralı mikro pompa ünitesi.',
    specs: [
      { label: 'Çalışma Prensibi', value: 'Mikro motorlu dikey basma' },
      { label: 'Dahili Sensör', value: 'Manyetik su seviye şamandırası' },
      { label: 'Voltaj', value: '230V AC' }
    ],
    compatibleModels: [
      'KM 80', 'Beko DPY 8405', 'Arçelik 3881 KT', 'Bosch WTW85410TR'
    ]
  },
  {
    id: 'pm-111',
    name: 'Buzdolabı Kapı Contası Mıknatıslı Geçmeli Tip (Özel Kesim)',
    oemCode: '4329200400',
    partType: 'Kapı Contası',
    brand: 'Arçelik',
    category: 'buzdolabi',
    price: 380,
    originalPrice: 450,
    inStock: true,
    stockCount: 29,
    image: '/src/assets/images/hero_appliance_parts_1793213948913.jpg',
    origin: 'A-Kalite OEM',
    warranty: '1 Yıl Garanti',
    rating: 4.75,
    reviewsCount: 52,
    badge: 'Güçlü Neodimyum Manyetik',
    description: 'Soğuk hava kaçağını ve motorun sürekli çalışmasını önleyen güçlü manyetik şeritli kanal geçme kapı fitili.',
    specs: [
      { label: 'Ölçü', value: '115 cm x 65 cm (Geçmeli Kanal Tipi)' },
      { label: 'Malzeme', value: 'Gıdaya Uygun Antibakteriyel PVC' },
      { label: 'Manyetik Güç', value: 'Yüksek tutunma katsayısı' }
    ],
    compatibleModels: [
      '270560 EI', 'RT46K6000WW', 'KDN56VW20N', 'Arçelik 5080 NF'
    ]
  },
  {
    id: 'pm-112',
    name: 'Süpürge HEPA 13 Filtre & Motor Koruma Filtre Seti (Yıkanabilir)',
    oemCode: 'FC8009/01 / 9178004812',
    partType: 'Filtre Seti',
    brand: 'Philips',
    category: 'supurge',
    price: 210,
    originalPrice: 260,
    inStock: true,
    stockCount: 88,
    image: '/src/assets/images/product_bearing_kit_1793213949296.jpg',
    origin: 'A-Kalite OEM',
    warranty: 'Garantili Kalite',
    rating: 4.96,
    reviewsCount: 312,
    badge: '%99.95 Partikül Tutucu',
    description: 'Toz torbasız ve torbalı süpürgelerde emiş gücünü ilk günkü haline getiren yıkanabilir HEPA 13 egzoz ve sünger motor giriş filtre kiti.',
    specs: [
      { label: 'Filtre Sınıfı', value: 'True HEPA Class H13' },
      { label: 'Yıkanabilirlik', value: 'Ilık su ile durulanıp kurutulabilir' },
      { label: 'Paket İçeriği', value: '1x Kaset HEPA + 1x Giriş Süngeri' }
    ],
    compatibleModels: [
      'Philips Marathon Ultimate', 'PowerPro Expert', 'Arçelik Imperium', 'Rowenta Silence'
    ]
  }
];

export const MOCK_CITIES_TURKEY = [
  'İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana', 
  'Konya', 'Kocaeli', 'Gaziantep', 'Mersin', 'Kayseri', 'Eskişehir', 
  'Samsun', 'Trabzon', 'Diyarbakır', 'Denizli', 'Sakarya', 'Balıkesir'
];
