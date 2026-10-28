import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { MOCK_CITIES_TURKEY } from '../data/partsData';
import { X, ShieldCheck, CreditCard, Banknote, Building2, Lock, ArrowRight } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 500;
  const SHIPPING_COST = 45;

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const isFreeShipping = rawSubtotal >= FREE_SHIPPING_THRESHOLD;
  const shipping = isFreeShipping ? 0 : SHIPPING_COST;

  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'wire_transfer' | 'cash_on_delivery'>('credit_card');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'İstanbul',
    district: '',
    address: '',
    notes: '',
    cardNumber: '5428 •••• •••• 9102',
    cardExpiry: '11/28',
    cardCvv: '392',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Havale gives 5% discount, Kapıda adds 25 TL fee
  const paymentAdjustment = 
    paymentMethod === 'wire_transfer' ? -(rawSubtotal * 0.05) :
    paymentMethod === 'cash_on_delivery' ? 25 : 0;

  const grandTotal = Math.max(0, rawSubtotal + shipping + paymentAdjustment);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `PM-${Math.floor(10000 + Math.random() * 90000)}`;
      const completedOrder: OrderDetails = {
        orderId,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        district: formData.district,
        address: formData.address,
        notes: formData.notes,
        paymentMethod,
        items,
        subtotal: rawSubtotal,
        shipping,
        total: grandTotal,
        createdAt: new Date().toLocaleDateString('tr-TR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      setIsSubmitting(false);
      onOrderCompleted(completedOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Güvenli Sipariş Tamamlama
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto space-y-6">
            
            {/* Step 1: Teslimat Bilgileri */}
            <div>
              <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">1</span>
                Teslimat & İletişim Bilgileri
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Ad Soyad *</label>
                  <input
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ahmet Yılmaz"
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Telefon Numarası *</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0532 123 45 67"
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">E-Posta Adresi</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ornek@mail.com"
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">İl *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {MOCK_CITIES_TURKEY.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">İlçe & Mahalle *</label>
                  <input
                    required
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="Örn: Kadıköy, Moda Mah."
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">Açık Adres (Cadde, Sokak, No, Daire) *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Örn: Caferağa Mah. Şair Nefi Sok. No: 14 Daire: 5"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Ödeme Yöntemi */}
            <div>
              <h4 className="text-xs uppercase font-bold text-slate-900 tracking-wider mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center">2</span>
                Ödeme Yöntemi Seçin
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className={`w-4 h-4 ${paymentMethod === 'credit_card' ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span className="text-[10px] font-bold text-emerald-600">Peşin Fiyatına Taksit</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Kredi / Banka Kartı</div>
                    <div className="text-[11px] text-slate-500">Mastercard, Visa, Troy</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('wire_transfer')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'wire_transfer'
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Building2 className={`w-4 h-4 ${paymentMethod === 'wire_transfer' ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span className="text-[10px] font-bold text-emerald-600">%5 İndirim</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Havale / EFT</div>
                    <div className="text-[11px] text-slate-500">Tüm Türk Bankaları</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash_on_delivery')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'cash_on_delivery'
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Banknote className={`w-4 h-4 ${paymentMethod === 'cash_on_delivery' ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span className="text-[10px] font-bold text-slate-500">+25 ₺ Hizmet</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Kapıda Ödeme</div>
                    <div className="text-[11px] text-slate-500">Nakit veya Pos Cihazı</div>
                  </div>
                </button>
              </div>

              {/* Conditional Card inputs */}
              {paymentMethod === 'credit_card' && (
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2.5">
                  <div className="flex justify-between items-center text-slate-600 font-medium">
                    <span>Kart Bilgileri (256-Bit Şifreli)</span>
                    <span className="text-[11px] text-emerald-600 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 3D Secure Korumalı
                    </span>
                  </div>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    placeholder="Kart Numarası (16 Hane)"
                    className="w-full h-9 px-3 bg-white border border-slate-300 rounded-lg font-mono tabular-nums text-slate-900"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formData.cardExpiry}
                      onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                      placeholder="Ay / Yıl (AA/YY)"
                      className="w-full h-9 px-3 bg-white border border-slate-300 rounded-lg font-mono tabular-nums text-slate-900"
                    />
                    <input
                      type="password"
                      maxLength={3}
                      value={formData.cardCvv}
                      onChange={(e) => setFormData({ ...formData, cardCvv: e.target.value })}
                      placeholder="CVV Güvenlik Kodu"
                      className="w-full h-9 px-3 bg-white border border-slate-300 rounded-lg font-mono tabular-nums text-slate-900"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'wire_transfer' && (
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                  Siparişiniz onaylandığında IBAN hesap bilgileri ekranda ve SMS ile gönderilecektir. Açıklama kısmına sipariş kodunuzu yazmanız yeterlidir.
                </div>
              )}

              {paymentMethod === 'cash_on_delivery' && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                  Kargonuz kapınıza geldiğinde Aras / Yurtiçi Kargo kuryesine nakit veya kredi kartıyla ödeme yapabilirsiniz.
                </div>
              )}
            </div>

            {/* Summary List */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
              <div className="font-bold text-slate-900 mb-1">Sipariş Özeti ({items.length} Kalem)</div>
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-slate-600">
                  <span className="truncate pr-4">{item.quantity}x {item.product.name}</span>
                  <span className="font-semibold tabular-nums text-slate-900 shrink-0">
                    {(item.product.price * item.quantity).toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-600">
                <span>Kargo Bedeli</span>
                <span className="font-semibold tabular-nums text-slate-900">
                  {shipping === 0 ? 'Ücretsiz' : `${shipping} ₺`}
                </span>
              </div>
              {paymentAdjustment !== 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Ödeme Seçeneği Farkı</span>
                  <span className={`font-semibold tabular-nums ${paymentAdjustment < 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                    {paymentAdjustment < 0 ? `${paymentAdjustment.toFixed(0)} ₺ (%5 Havale İndirimi)` : `+${paymentAdjustment} ₺`}
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-slate-900">
                <span>Toplam Ödenecek Tutar</span>
                <span className="text-blue-700 text-base tabular-nums">
                  {grandTotal.toLocaleString('tr-TR')} ₺
                </span>
              </div>
            </div>

          </div>

          {/* Submit Footer */}
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Vazgeç / Düzenle
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-colors flex items-center gap-2"
            >
              <span>{isSubmitting ? 'Sipariş İşleniyor...' : `Siparişi Onayla (${grandTotal.toLocaleString('tr-TR')} ₺)`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
