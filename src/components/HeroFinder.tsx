import React, { useState } from 'react';
import { Search, CheckCircle2, ChevronRight, HelpCircle, ShieldCheck, Zap } from 'lucide-react';
import { BRANDS_LIST, CATEGORIES_CONFIG, HERO_IMAGE, POPULAR_APPLIANCE_MODELS } from '../data/partsData';
import { ApplianceCategory } from '../types';

interface HeroFinderProps {
  onSearch: (brand: string, category: ApplianceCategory, query: string) => void;
  onOpenModelGuide: () => void;
}

export const HeroFinder: React.FC<HeroFinderProps> = ({
  onSearch,
  onOpenModelGuide,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>('Tümü');
  const [selectedCategory, setSelectedCategory] = useState<ApplianceCategory>('all');
  const [query, setQuery] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedBrand, selectedCategory, query);
  };

  const handleSelectSuggestion = (modelNumber: string, brand: string, category: ApplianceCategory) => {
    setSelectedBrand(brand);
    setSelectedCategory(category);
    setQuery(modelNumber);
    setShowSuggestions(false);
    onSearch(brand, category, modelNumber);
  };

  const filteredSuggestions = POPULAR_APPLIANCE_MODELS.filter(item => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return item.modelNumber.toLowerCase().includes(q) || 
           item.brand.toLowerCase().includes(q) || 
           item.title.toLowerCase().includes(q);
  }).slice(0, 5);

  return (
    <div id="hero" className="relative bg-slate-900 text-white overflow-hidden border-b border-slate-800">
      {/* Background Hero Asset with Scrim Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={HERO_IMAGE} 
          alt="ParçaMerkezi Beyaz Eşya Yedek Parça Tezgahı" 
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-12 lg:py-16">
        <div className="max-w-3xl">
          
          {/* Natural human editorial kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 mb-3 tracking-wide">
            <Zap className="w-4 h-4 text-blue-400" />
            <span>TÜRKİYE'NİN LİDER BEYAZ EŞYA YEDEK PARÇA PLATFORMU</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 text-balance leading-tight">
            Cihazınız İçin Doğru Parçayı <span className="text-blue-400">Tek Seferde</span> Bulun.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal mb-8 leading-relaxed max-w-2xl">
            Arçelik, Beko, Bosch, Siemens ve Vestel başta olmak üzere tüm markaların çamaşır, bulaşık ve buzdolabı yedek parçaları. Model kodunuzu girin, %100 uyumlu parçayı hemen keşfedin.
          </p>

          {/* Smart Model Finder Card */}
          <div className="bg-white rounded-xl shadow-2xl p-4 sm:p-5 text-slate-900 border border-slate-200/80">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-600">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Model Uyumluluk Sorgu Motoru
              </span>
              <button 
                type="button"
                onClick={onOpenModelGuide}
                className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium underline-offset-2 hover:underline"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                Model etiketimi nasıl bulurum?
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
                
                {/* Brand select */}
                <div className="sm:col-span-3">
                  <label htmlFor="brand-select" className="block text-[11px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">
                    1. Marka
                  </label>
                  <select
                    id="brand-select"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  >
                    {BRANDS_LIST.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Category select */}
                <div className="sm:col-span-3">
                  <label htmlFor="category-select" className="block text-[11px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">
                    2. Cihaz Türü
                  </label>
                  <select
                    id="category-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value as ApplianceCategory)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  >
                    {CATEGORIES_CONFIG.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                {/* Model or Part input */}
                <div className="sm:col-span-4 relative">
                  <label htmlFor="model-input" className="block text-[11px] font-semibold text-slate-500 mb-1 uppercase tracking-wider">
                    3. Model No veya Parça Adı
                  </label>
                  <div className="relative">
                    <input
                      id="model-input"
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                      placeholder="Örn: 8103 YP, Pompa, WAT24480..."
                      className="w-full h-11 pl-9 pr-3 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                  </div>

                  {/* Autocomplete suggestions dropdown */}
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-slate-200 rounded-lg shadow-xl z-30 py-1 overflow-hidden">
                      <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 bg-slate-50">
                        Önerilen Cihaz Modelleri
                      </div>
                      {filteredSuggestions.map((item) => (
                        <button
                          key={item.modelNumber}
                          type="button"
                          onClick={() => handleSelectSuggestion(item.modelNumber, item.brand, item.category)}
                          className="w-full px-3 py-2 text-left text-xs hover:bg-blue-50 flex items-center justify-between transition-colors border-b border-slate-100 last:border-b-0"
                        >
                          <div>
                            <span className="font-bold text-slate-900">{item.brand} {item.modelNumber}</span>
                            <span className="text-slate-500 text-[11px] ml-1.5">({item.categoryName})</span>
                          </div>
                          <span className="text-[11px] text-blue-600 font-medium">Uyumlu Parçaları Seç</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <div className="sm:col-span-2 flex items-end">
                  <button
                    type="submit"
                    className="w-full h-11 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <span>Sorgula</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </form>

            {/* Quick Filter buttons */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium mr-1 text-[11px]">Hızlı Örnekler:</span>
              {[
                { label: 'Arçelik 8103 YP', brand: 'Arçelik', cat: 'camasir' as ApplianceCategory, q: '8103 YP' },
                { label: 'Bosch Serie 6 WAT', brand: 'Bosch', cat: 'camasir' as ApplianceCategory, q: 'WAT24480TR' },
                { label: 'Beko Bulaşık Sirkülasyon', brand: 'Beko', cat: 'bulasik' as ApplianceCategory, q: 'Sirkülasyon' },
                { label: 'Kazan Rulman & Keçe', brand: 'Tümü', cat: 'camasir' as ApplianceCategory, q: 'Rulman' },
                { label: 'Isıtıcı Rezistans', brand: 'Tümü', cat: 'camasir' as ApplianceCategory, q: 'Rezistans' }
              ].map((pill, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedBrand(pill.brand);
                    setSelectedCategory(pill.cat);
                    setQuery(pill.q);
                    onSearch(pill.brand, pill.cat, pill.q);
                  }}
                  className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors whitespace-nowrap shrink-0"
                >
                  {pill.label}
                </button>
              ))}
            </div>

          </div>

          {/* Quantitative Claim Proof strip adjacent to claim */}
          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span><strong className="text-white font-semibold">%100 Uyum</strong> ve Değişim Garantisi</span>
            </div>
            <div className="hidden sm:inline text-slate-600">·</div>
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-bold tabular-nums">48.000+</span>
              <span>Kayıtlı Parça & Model Veritabanı</span>
            </div>
            <div className="hidden sm:inline text-slate-600">·</div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold tabular-nums">%99.4</span>
              <span>Müşteri Memnuniyeti</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
