import React, { useState } from 'react';
import { PartProduct } from '../types';
import { ShoppingBag, CheckCircle, Shield, ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: PartProduct;
  onSelectProduct: (product: PartProduct) => void;
  onAddToCart: (product: PartProduct, e: React.MouseEvent) => void;
  onCheckCompatibility: (product: PartProduct, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  onCheckCompatibility,
}) => {
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <div 
      onClick={() => onSelectProduct(product)}
      className="group bg-white border border-slate-200/90 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 flex flex-col cursor-pointer transform hover:-translate-y-0.5"
    >
      {/* Product Image Slot: 65% - 75% height on neutral solid backdrop */}
      <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden flex items-center justify-center p-4 border-b border-slate-100">
        {imageLoaded ? (
          <img 
            src={product.image} 
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageLoaded(false)}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100 p-4 text-center">
            <Shield className="w-8 h-8 text-slate-300 mb-1" />
            <span className="text-xs font-medium text-slate-500">{product.name}</span>
          </div>
        )}

        {/* Quiet top corner badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-900 text-white tracking-wide">
            {product.origin}
          </span>
          {product.badge && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              {product.badge}
            </span>
          )}
        </div>

        {/* Quick model check trigger */}
        <button
          type="button"
          onClick={(e) => onCheckCompatibility(product, e)}
          className="absolute bottom-2.5 right-2.5 opacity-90 group-hover:opacity-100 bg-white/95 text-slate-800 hover:text-blue-600 px-2 py-1 rounded text-[11px] font-semibold shadow-xs border border-slate-200 flex items-center gap-1 transition-colors"
          title="Bu parçanın makinenize uyup uymadığını kontrol edin"
        >
          <span>Uyum Sorgula</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Clean Unboxed Metadata with typographic separators */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1 font-medium">
            <span className="uppercase tracking-wider text-slate-700 font-bold">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.partType}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px]">{product.oemCode.split('/')[0]}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Compatible models sample kicker */}
          <div className="text-[11px] text-slate-500 line-clamp-1 mb-3">
            <span className="text-slate-400">Uyumlu Modeller: </span>
            {product.compatibleModels.slice(0, 3).join(', ')}
            {product.compatibleModels.length > 3 && ` +${product.compatibleModels.length - 3}`}
          </div>
        </div>

        {/* Footer info: Price & CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                {product.price.toLocaleString('tr-TR')} ₺
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  {product.originalPrice.toLocaleString('tr-TR')} ₺
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
              <CheckCircle className="w-3 h-3" />
              <span>Stokta ({product.stockCount} adet)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => onAddToCart(product, e)}
            className="p-2 sm:px-3 sm:py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            title="Sepete Ekle"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sepete Ekle</span>
          </button>
        </div>
      </div>
    </div>
  );
};
