import React from 'react';
import { ShoppingBag, Search, PhoneCall, ShieldCheck, Wrench } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenModelGuide: () => void;
  onOpenPartRequest: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenModelGuide,
  onOpenPartRequest,
  onNavigateSection,
}) => {
  return (
    <>
      {/* Slim Top Service Bar (< 40px) */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-slate-200 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              16:00'a Kadar Verilen Siparişlerde Aynı Gün Kargo
            </span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <span className="text-slate-400 hidden sm:inline">500 TL Üzeri Ücretsiz Kargo</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a 
              href="tel:08503089494" 
              className="hover:text-white transition-colors flex items-center gap-1 font-medium tabular-nums"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              0850 308 94 94
            </a>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400 hidden md:inline">Hafta İçi: 08:30 - 18:30</span>
          </div>
        </div>
      </div>

      {/* Main Top Bar strictly obeying Top Bar Contract: 3 zones, gap-8, single line */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single element brand wordmark */}
          <button 
            onClick={() => onNavigateSection('hero')} 
            className="flex items-center gap-2.5 text-left group shrink-0 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none block">
                Parça<span className="text-blue-600">Merkezi</span>
              </span>
              <span className="text-[10px] tracking-wider text-slate-400 uppercase font-semibold block mt-0.5">
                Beyaz Eşya Yedek Parça
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button 
              onClick={() => onNavigateSection('catalog')} 
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Yedek Parça Kataloğu
            </button>
            <button 
              onClick={() => onNavigateSection('finder')} 
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Model Uyumluluk Sorgu
            </button>
            <button 
              onClick={onOpenModelGuide} 
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Model Etiketi Nerede?
            </button>
            <button 
              onClick={onOpenPartRequest} 
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Özel Parça Talebi
            </button>
            <button 
              onClick={() => onNavigateSection('guarantee')} 
              className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              Garanti & İade
            </button>
          </nav>

          {/* Zone 3: 1 primary action (Cart & Fast search trigger) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenPartRequest}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              Parça Bulamadım
            </button>

            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
              aria-label="Sepeti Görüntüle"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Sepetim</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-blue-700 text-xs font-bold flex items-center justify-center tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </header>
    </>
  );
};
