import React, { useState } from 'react';
import { X, HelpCircle, Check, Info } from 'lucide-react';

interface ModelGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPartRequest: () => void;
}

export const ModelGuideModal: React.FC<ModelGuideModalProps> = ({
  isOpen,
  onClose,
  onOpenPartRequest,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'camasir' | 'bulasik' | 'buzdolabi' | 'firin'>('camasir');

  const guideData = {
    camasir: {
      title: 'Çamaşır Makinesi Model Etiketi',
      location: 'Kapak İç Kenarı veya Pompa Kapağı Arkası',
      steps: [
        'Makinenizin ön yükleme kapağını sonuna kadar açın.',
        'Kapağın iç menteşe tarafındaki veya kapak kilidinin altındaki gümüş renkli etikete bakın.',
        'Eğer orada yoksa, makinenin sağ alt köşesindeki tahliye pompa kapağını açın; kapağın iç yüzeyinde küçük beyaz etiket bulunur.',
        'Etikette yazan "Model", "Type" veya "E-Nr" kodunu (Örn: WAT24480TR/01 veya 8103 YP) not edin.'
      ],
      sampleCode: 'E-Nr: WAT24480TR / 24 · Model: 8103 YP'
    },
    bulasik: {
      title: 'Bulaşık Makinesi Model Etiketi',
      location: 'Kapak Üst Metal Sac Kenarı',
      steps: [
        'Bulaşık makinesinin kapağını tamamen aşağı doğru açın.',
        'Kapağın en üst metal sac kenarına eğilerek bakın (kumanda panelinin hemen arkasındaki metal yüzey).',
        'Lazerle kazınmış veya yapıştırılmış gümüş renkli etikette "Model" ya da "E-Nr / Typ" numarasını bulun.',
        'Örnek: "SMS43D02TR/01" veya "DFN05311W".'
      ],
      sampleCode: 'Model: DFN05311W · E-Nr: SMS43D02TR/52'
    },
    buzdolabi: {
      title: 'Buzdolabı Model Etiketi',
      location: 'Sol İç Duvar (Sebzelik Arkası)',
      steps: [
        'Buzdolabınızın soğutucu (alt) kapısını açın.',
        'En alttaki sebzelik / meyvelik çekmecesini çekerek tamamen dışarı çıkarın.',
        'Çekmecenin arkasında kalan sol iç plastik duvara yapıştırılmış büyük beyaz bilgi etiketini göreceksiniz.',
        'Bu etikette "Model Kodu", "Seri No" ve "Ürün No (7 haneli)" yer alır.'
      ],
      sampleCode: 'Model: RT46K6000WW · Ürün No: 7205620100'
    },
    firin: {
      title: 'Fırın & Ocak Model Etiketi',
      location: 'Kapak Çerçevesi veya Alt Çekmece',
      steps: [
        'Fırın kapağını açın ve fırın gövdesinin iç kapak conta çerçevesini inceleyin.',
        'Eğer ankastre fırınsa ve orada yoksa alt saklama çekmecesini çekin.',
        'Etikette yer alan "Typ" ve model kodunu not edin.'
      ],
      sampleCode: 'Model: HBN331E1T · Typ: AFM 130 S'
    }
  };

  const current = guideData[activeTab];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Model Numarası Nerede Yazar?
              </h3>
              <p className="text-xs text-slate-500">
                Cihazınızın fabrika etiketini bulup doğru yedek parçayı tespit edin
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Device selector tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-5 pt-3 gap-2 overflow-x-auto">
          {[
            { id: 'camasir', label: 'Çamaşır Makinesi' },
            { id: 'bulasik', label: 'Bulaşık Makinesi' },
            { id: 'buzdolabi', label: 'Buzdolabı' },
            { id: 'firin', label: 'Fırın & Ocak' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div className="bg-blue-50/70 border border-blue-200/60 rounded-xl p-3.5 flex items-center gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="text-xs text-slate-700">
              <strong className="text-slate-900">Etikette Aranacak Bilgi: </strong>
              Genellikle <em>"Model"</em>, <em>"E-Nr"</em>, <em>"Prod No"</em> veya <em>"PNC"</em> ibarelerinin yanındaki harf ve rakamlar grubudur.
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 mb-1">{current.title}</h4>
            <div className="text-xs font-semibold text-blue-600 mb-3">
              Konum: {current.location}
            </div>

            <ol className="space-y-2 text-xs text-slate-600">
              {current.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-slate-900 text-white rounded-lg p-3 text-xs flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Örnek Model Kodu Formatı</span>
              <span className="font-mono font-semibold text-blue-300">{current.sampleCode}</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> %100 Doğru Parça
            </span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-500">
            Etiketi bulamadınız mı veya okunmuyor mu?
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenPartRequest();
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Etiket Fotoğrafı Gönderin (Biz Bulalım)
          </button>
        </div>

      </div>
    </div>
  );
};
