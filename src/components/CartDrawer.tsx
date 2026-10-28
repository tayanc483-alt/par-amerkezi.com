import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 500;
  const SHIPPING_COST = 45;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = items.length === 0 ? 0 : (isFreeShipping ? 0 : SHIPPING_COST);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Alışveriş Sepetim ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium">
            <span className="flex items-center gap-1.5 text-slate-700">
              <Truck className="w-3.5 h-3.5 text-blue-600" />
              {isFreeShipping ? (
                <strong className="text-emerald-700">Tebrikler! Kargo Ücretsiz!</strong>
              ) : (
                <span>Kargo Bedava İçin: <strong className="text-blue-700 tabular-nums">{remainingForFreeShipping} ₺</strong> daha ekleyin</span>
              )}
            </span>
            <span className="text-[11px] text-slate-400 tabular-nums">500 ₺</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-300 ${isFreeShipping ? 'bg-emerald-500' : 'bg-blue-600'}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Itemized List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-400">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Sepetiniz Boş</h4>
              <p className="text-xs text-slate-500 mb-4 max-w-xs">
                Cihazınız için aradığınız yedek parçaları sepete ekleyerek siparişinizi hemen oluşturabilirsiniz.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Kataloğu İncele
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="py-3.5 flex gap-3 items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 object-contain bg-slate-50 rounded-lg border border-slate-200 p-1 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{product.brand}</span>
                    <span className="text-xs font-bold text-slate-900 tabular-nums">
                      {(product.price * quantity).toLocaleString('tr-TR')} ₺
                    </span>
                  </div>

                  <h5 className="text-xs font-semibold text-slate-900 truncate mb-1" title={product.name}>
                    {product.name}
                  </h5>

                  <div className="flex items-center justify-between text-xs">
                    {/* Quantity steppers */}
                    <div className="flex items-center border border-slate-200 rounded-md bg-slate-50 h-7">
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="px-2 h-full text-slate-600 hover:bg-slate-200"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold tabular-nums text-slate-900">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="px-2 h-full text-slate-600 hover:bg-slate-200"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                      title="Sepetten Çıkar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Ara Toplam</span>
                <span className="font-semibold tabular-nums text-slate-900">{subtotal.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Kargo Bedeli</span>
                <span className={`font-semibold tabular-nums ${isFreeShipping ? 'text-emerald-700' : 'text-slate-900'}`}>
                  {isFreeShipping ? 'Ücretsiz' : `${SHIPPING_COST} ₺`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                <span>Genel Toplam</span>
                <span className="tabular-nums text-blue-700 text-base">{total.toLocaleString('tr-TR')} ₺</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>Siparişi Tamamla</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit SSL ile %100 Güvenli Ödeme</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
