import React from 'react';
import { Wrench, PhoneCall, Mail, MapPin, MessageSquareText } from 'lucide-react';
import { ApplianceCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ApplianceCategory) => void;
  onOpenModelGuide: () => void;
  onOpenPartRequest: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenModelGuide,
  onOpenPartRequest,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Parça<span className="text-blue-500">Merkezi</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Türkiye'nin her iline beyaz eşya yedek parça tedariği. Çamaşır makinesi, bulaşık makinesi, buzdolabı ve fırın parçalarında garantili orijinal ve OEM ürünler.
            </p>
            <div className="pt-2 flex flex-col gap-1.5 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                İkitelli Organize Sanayi Bölgesi, Demirciler San. Sit., Başakşehir / İstanbul
              </span>
              <a href="tel:08503089494" className="flex items-center gap-2 hover:text-white transition-colors">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                0850 308 94 94 (Santral)
              </a>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                destek@parcamerkezi.com.tr
              </span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Yedek Parça Grupları
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onSelectCategory('camasir')} className="hover:text-white transition-colors">
                  Çamaşır Makinesi Parçaları
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('bulasik')} className="hover:text-white transition-colors">
                  Bulaşık Makinesi Parçaları
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('buzdolabi')} className="hover:text-white transition-colors">
                  Buzdolabı Fan & Contaları
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('firin')} className="hover:text-white transition-colors">
                  Fırın & Ocak Rezistansları
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('kurutma')} className="hover:text-white transition-colors">
                  Kurutma Makinesi Parçaları
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('supurge')} className="hover:text-white transition-colors">
                  Süpürge Filtre & Motorları
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Help & Guides */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Yardım & Kılavuzlar
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenModelGuide} className="hover:text-white transition-colors text-left">
                  Model Numarası Nerede Yazar?
                </button>
              </li>
              <li>
                <button onClick={onOpenPartRequest} className="hover:text-white transition-colors text-left">
                  Aradığım Parçayı Bulamadım
                </button>
              </li>
              <li>
                <span className="text-slate-500">Aynı Gün Kargo Şartları</span>
              </li>
              <li>
                <span className="text-slate-500">1 Yıl Garanti & Değişim</span>
              </li>
              <li>
                <span className="text-slate-500">Montaj ve Tamir İpuçları</span>
              </li>
            </ul>
          </div>

          {/* Direct WhatsApp Tech Assistance */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              WhatsApp Destek Hattı
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Cihazınızın arızalı parçasının veya model etiketinin fotoğrafını çekip bize gönderin, anında doğru ürünü iletelim.
            </p>
            <button
              onClick={onOpenPartRequest}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>Etiket Gönder (WhatsApp)</span>
            </button>
          </div>

        </div>

        {/* Bottom Copyright & Security */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 ParçaMerkezi Yedek Parça Dağıtım ve Tic. Ltd. Şti. Tüm hakları saklıdır.
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-slate-300">TROY</span>
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-slate-300">VISA</span>
            <span className="px-2 py-1 bg-slate-800 rounded font-bold text-slate-300">MASTERCARD</span>
            <span className="text-slate-600">·</span>
            <span>256-Bit SSL Güvenli Altyapı</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
