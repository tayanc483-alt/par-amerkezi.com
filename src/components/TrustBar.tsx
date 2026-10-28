import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';

export const TrustBar: React.FC = () => {
  return (
    <section id="guarantee" className="border-t border-b border-slate-200 bg-white py-10 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Aynı Gün Hızlı Kargo</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Saat 16:00'ya kadar verilen siparişler aynı gün anlaşmalı kargo ile yola çıkar.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">%100 Uyum Garantisi</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cihaz modelinize uygun seçilen parçalarda birebir uyumluluk taahhüdü veriyoruz.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">14 Gün Kolay İade</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Yanlış sipariş veya vazgeçme durumunda 14 gün boyunca sorgusuz değişim imkanı.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Uzman Teknik Destek</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Arıza tespiti ve doğru parça seçimi için deneyimli ustalarımızdan ücretsiz destek alın.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
