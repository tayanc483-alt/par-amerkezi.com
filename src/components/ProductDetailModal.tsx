import React, { useState } from 'react';
import { PartProduct } from '../types';
import { X, CheckCircle, AlertTriangle, ShieldCheck, Truck, RefreshCw, ShoppingBag, ArrowRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: PartProduct | null;
  onClose: () => void;
  onAddToCart: (product: PartProduct, quantity: number) => void;
  onBuyNow: (product: PartProduct, quantity: number) => void;
  onOpenModelGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  onOpenModelGuide,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState<number>(1);
  const [modelTestInput, setModelTestInput] = useState<string>('');
  const [testResult, setTestResult] = useState<'idle' | 'compatible' | 'incompatible'>('idle');

  const handleTestCompatibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelTestInput.trim()) return;

    const trimmed = modelTestInput.toLowerCase().trim();
    const isMatch = product.compatibleModels.some(m => 
      m.toLowerCase().includes(trimmed) || trimmed.includes(m.toLowerCase())
    );

    setTestResult(isMatch ? 'compatible' : 'incompatible');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors focus:outline-none"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100 max-h-[90vh] overflow-y-auto">
          
          {/* Left Column: Image & Technical Specs */}
          <div className="md:col-span-6 p-6 sm:p-8 bg-slate-50/50 flex flex-col justify-between">
            <div>
              {/* Product Image */}
              <div className="relative aspect-[4/3] bg-white rounded-xl border border-slate-200 p-4 mb-6 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
                <span className="absolute top-3 left-3 text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-900 text-white">
                  {product.origin}
                </span>
                {product.badge && (
                  <span className="absolute top-3 right-3 text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Technical Specifications */}
              <div className="mb-6">
                <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider mb-2.5">
                  Teknik Özellikler
                </h4>
                <div className="bg-white rounded-lg border border-slate-200/80 overflow-hidden divide-y divide-slate-100 text-xs">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between py-2 px-3">
                      <span className="text-slate-500 font-medium">{spec.label}</span>
                      <span className="text-slate-900 font-semibold text-right tabular-nums">{spec.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between py-2 px-3">
                    <span className="text-slate-500 font-medium">OEM Parça Kodu</span>
                    <span className="text-slate-900 font-mono font-semibold text-right">{product.oemCode}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Strip */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-200 text-center text-[11px] text-slate-600">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-blue-600 mb-1" />
                <span>Aynı Gün Kargo</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                <span>{product.warranty}</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw className="w-4 h-4 text-slate-600 mb-1" />
                <span>14 Gün İade</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module & Live Compatibility Checker */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Brand Metadata */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1 font-medium">
                <span className="uppercase tracking-wider text-slate-900 font-bold">{product.brand}</span>
                <span aria-hidden="true">·</span>
                <span>{product.partType}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">Stokta Mevcut</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-3">
                {product.name}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Price Block */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                    {product.price.toLocaleString('tr-TR')} ₺
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 line-through tabular-nums">
                      {product.originalPrice.toLocaleString('tr-TR')} ₺
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-normal ml-auto">KDV Dahil</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-medium">
                  500 TL üzeri alışverişlerde kargo ücretsiz
                </div>
              </div>

              {/* Interactive Live Compatibility Checker */}
              <div className="bg-blue-50/60 rounded-xl p-4 border border-blue-100 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    Bu Parça Benim Cihazıma Uyar mı?
                  </span>
                  <button
                    type="button"
                    onClick={onOpenModelGuide}
                    className="text-[11px] text-blue-700 hover:underline font-medium"
                  >
                    Model Nerede?
                  </button>
                </div>

                <form onSubmit={handleTestCompatibility} className="flex gap-2">
                  <input
                    type="text"
                    value={modelTestInput}
                    onChange={(e) => {
                      setModelTestInput(e.target.value);
                      setTestResult('idle');
                    }}
                    placeholder="Örn: 8103 YP veya WAT24480TR..."
                    className="flex-1 h-9 px-3 bg-white border border-blue-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <button
                    type="submit"
                    className="h-9 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
                  >
                    Test Et
                  </button>
                </form>

                {/* Compatibility Outcome */}
                {testResult === 'compatible' && (
                  <div className="mt-2.5 p-2.5 bg-emerald-100/70 border border-emerald-300 rounded-lg text-xs text-emerald-900 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                    <div>
                      <strong>%100 Uyumlu:</strong> "{modelTestInput.toUpperCase()}" modeliyle birebir uyumludur. Gönül rahatlığıyla sipariş verebilirsiniz.
                    </div>
                  </div>
                )}

                {testResult === 'incompatible' && (
                  <div className="mt-2.5 p-2.5 bg-amber-100/70 border border-amber-300 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>Uyum Listesinde Bulunamadı:</strong> "{modelTestInput}" modeli sistem kayıtlarında eşleşmedi. Doğru parça tespiti için lütfen WhatsApp hattımızdan etiket fotoğrafı ile danışın.
                    </div>
                  </div>
                )}

                <div className="mt-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Doğrulanmış Uyumlu Bazı Modeller: </span>
                  {product.compatibleModels.join(', ')}
                </div>
              </div>
            </div>

            {/* Actions: Quantity Stepper & Add to Cart */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50 h-11 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full text-slate-600 hover:bg-slate-200 transition-colors font-bold text-sm"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="w-10 h-full text-slate-600 hover:bg-slate-200 transition-colors font-bold text-sm"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product, quantity);
                    onClose();
                  }}
                  className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Sepete Ekle ({(product.price * quantity).toLocaleString('tr-TR')} ₺)</span>
                </button>
              </div>

              {/* Direct Buy Now Button */}
              <button
                type="button"
                onClick={() => {
                  onBuyNow(product, quantity);
                  onClose();
                }}
                className="w-full h-10 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Hemen Sipariş Ver</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
