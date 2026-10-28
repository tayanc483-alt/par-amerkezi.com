import React, { useState } from 'react';
import { X, Wrench, CheckCircle, Upload, Send } from 'lucide-react';
import { BRANDS_LIST, CATEGORIES_CONFIG } from '../data/partsData';

interface PartRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartRequestModal: React.FC<PartRequestModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    brand: 'Arçelik',
    category: 'camasir',
    modelNumber: '',
    partDescription: '',
    hasPhoto: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      brand: 'Arçelik',
      category: 'camasir',
      modelNumber: '',
      partDescription: '',
      hasPhoto: false
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Parça Talebiniz Başarıyla Alındı!
            </h3>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600">
              Talep Referans Kodu: <strong className="text-slate-900 font-mono">TRP-98412</strong>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Sayın <strong>{formData.name}</strong>, teknik uzmanlarımız <strong>{formData.brand}</strong> makineniz için uyumlu parçayı depolarımızda sorgulamaktadır. 15-20 dakika içinde <strong>{formData.phone}</strong> numaranıza parça satın alma linki iletilecektir.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors"
            >
              Tamam, Kapat
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Özel Parça Arama Talebi
                </h3>
                <p className="text-xs text-slate-500">
                  Aradığınız parçayı bulamadınız mı? Bilgileri girin, biz bulup iletelim.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Cihaz Markası
                  </label>
                  <select
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {BRANDS_LIST.filter(b => b !== 'Tümü').map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Cihaz Türü
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {CATEGORIES_CONFIG.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Model No / Etiket Kodu (Varsa)
                </label>
                <input
                  type="text"
                  value={formData.modelNumber}
                  onChange={(e) => setFormData({ ...formData, modelNumber: e.target.value })}
                  placeholder="Örn: WAT24480TR, 8103 YP, vb."
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  İhtiyacınız Olan Parça & Arıza Belirtisi
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.partDescription}
                  onChange={(e) => setFormData({ ...formData, partDescription: e.target.value })}
                  placeholder="Örn: Sıkma yaparken çok ses yapıyor, kazan rulman takımı ve körük contası lazım..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Simulated Label Photo Attachment */}
              <div className="border border-dashed border-slate-300 rounded-lg p-3 bg-slate-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-slate-600">
                    {formData.hasPhoto ? 'Model Etiketi Eklendi ✓' : 'Model Etiketi Fotoğrafı Ekle (Önerilen)'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, hasPhoto: !formData.hasPhoto })}
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded transition-colors ${
                    formData.hasPhoto 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {formData.hasPhoto ? 'Kaldır' : 'Dosya Seç'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Adınız Soyadınız
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Adınız Soyadınız"
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Telefon (WhatsApp Uyumlu)
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="05XX XXX XX XX"
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 mt-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Parçayı Sorgula & Gönder</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
