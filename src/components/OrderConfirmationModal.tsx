import React from 'react';
import { OrderDetails } from '../types';
import { CheckCircle2, PackageCheck, Printer, ArrowRight, ShieldCheck } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Banner */}
        <div className="bg-emerald-600 text-white p-6 sm:p-8 text-center">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold mb-1">
            Siparişiniz Başarıyla Alındı!
          </h3>
          <p className="text-emerald-100 text-xs sm:text-sm">
            Depomuz parçalarınızı hazırlamaya başladı. Takip detayları SMS ile iletilecektir.
          </p>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Tracking info strip */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-bold">Sipariş Numarası</span>
              <span className="text-slate-900 font-mono font-bold text-sm">{order.orderId}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase font-bold">Sipariş Tarihi</span>
              <span className="text-slate-800 font-medium">{order.createdAt}</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-lg font-medium">
              <PackageCheck className="w-4 h-4" />
              <span>Aynı Gün Kargoda</span>
            </div>
          </div>

          {/* Purchased Items */}
          <div>
            <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider mb-2.5">
              Sipariş Edilen Yedek Parçalar ({order.items.length})
            </h4>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white text-xs">
              {order.items.map(item => (
                <div key={item.product.id} className="p-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-12 h-12 object-contain bg-slate-50 rounded border border-slate-200 p-1"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">{item.product.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{item.product.oemCode} · Adet: {item.quantity}</div>
                    </div>
                  </div>
                  <div className="font-bold tabular-nums text-slate-900">
                    {(item.product.price * item.quantity).toLocaleString('tr-TR')} ₺
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Teslimat Adresi</span>
              <div className="font-bold text-slate-900">{order.fullName}</div>
              <div className="text-slate-600">{order.address}</div>
              <div className="text-slate-600">{order.district} / {order.city}</div>
              <div className="text-slate-600 mt-1 font-mono">{order.phone}</div>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Ödeme Bilgisi</span>
              <div className="font-bold text-slate-900 capitalize">
                {order.paymentMethod === 'credit_card' && 'Kredi Kartı (Onaylandı)'}
                {order.paymentMethod === 'wire_transfer' && 'Havale / EFT (Hesap Bekleniyor)'}
                {order.paymentMethod === 'cash_on_delivery' && 'Kapıda Ödeme'}
              </div>
              <div className="flex justify-between text-slate-600 mt-2">
                <span>Ara Toplam:</span>
                <span className="font-semibold tabular-nums">{order.subtotal.toLocaleString('tr-TR')} ₺</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Kargo:</span>
                <span className="font-semibold tabular-nums">{order.shipping === 0 ? 'Ücretsiz' : `${order.shipping} ₺`}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-extrabold pt-1.5 border-t border-slate-200 mt-1.5">
                <span>Toplam:</span>
                <span className="text-blue-700 tabular-nums">{order.total.toLocaleString('tr-TR')} ₺</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900">
            <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
            <span>Tüm siparişleriniz ParçaMerkezi 1 Yıl Birebir Değişim Garantisi kapsamındadır.</span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Makbuzu Yazdır</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-colors"
          >
            <span>Alışverişe Devam Et</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
