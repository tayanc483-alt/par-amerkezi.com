import React, { useMemo } from 'react';
import { PartProduct, ApplianceCategory } from '../types';
import { ProductCard } from './ProductCard';
import { BRANDS_LIST } from '../data/partsData';
import { Search, SlidersHorizontal, RotateCcw, HelpCircle } from 'lucide-react';

interface ProductCatalogProps {
  products: PartProduct[];
  selectedCategory: ApplianceCategory;
  selectedBrand: string;
  searchQuery: string;
  sortBy: 'popular' | 'price-asc' | 'price-desc' | 'rating';
  inStockOnly: boolean;
  onSelectBrand: (brand: string) => void;
  onSearchChange: (q: string) => void;
  onSortChange: (sort: 'popular' | 'price-asc' | 'price-desc' | 'rating') => void;
  onToggleInStock: (val: boolean) => void;
  onResetFilters: () => void;
  onSelectProduct: (product: PartProduct) => void;
  onAddToCart: (product: PartProduct, e: React.MouseEvent) => void;
  onCheckCompatibility: (product: PartProduct, e: React.MouseEvent) => void;
  onOpenPartRequest: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  selectedBrand,
  searchQuery,
  sortBy,
  inStockOnly,
  onSelectBrand,
  onSearchChange,
  onSortChange,
  onToggleInStock,
  onResetFilters,
  onSelectProduct,
  onAddToCart,
  onCheckCompatibility,
  onOpenPartRequest,
}) => {
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by Brand
    if (selectedBrand !== 'Tümü') {
      result = result.filter(p => p.brand === selectedBrand);
    }

    // Filter by inStock
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Filter by search query or model compatibility
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => {
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesOem = p.oemCode.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesType = p.partType.toLowerCase().includes(q);
        const matchesModels = p.compatibleModels.some(m => m.toLowerCase().includes(q));
        return matchesName || matchesOem || matchesBrand || matchesType || matchesModels;
      });
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular
    });

    return result;
  }, [products, selectedCategory, selectedBrand, searchQuery, sortBy, inStockOnly]);

  const hasActiveFilters = selectedCategory !== 'all' || selectedBrand !== 'Tümü' || searchQuery !== '' || inStockOnly;

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
      
      {/* Top Filter & Toolbar Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 mb-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Field */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Parça adı, OEM kodu (örn: 2880401800) veya model..."
              className="w-full h-10 pl-9 pr-8 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Controls: Brand, Sort, In-Stock, Reset */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Brand Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium">Marka:</span>
              <select
                value={selectedBrand}
                onChange={(e) => onSelectBrand(e.target.value)}
                className="h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {BRANDS_LIST.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-slate-500 font-medium">Sırala:</span>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                className="h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="popular">En Çok Satanlar</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="rating">Müşteri Puanı</option>
              </select>
            </div>

            {/* In stock toggle */}
            <label className="flex items-center gap-1.5 text-xs text-slate-700 font-medium h-10 px-3 bg-slate-50 border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => onToggleInStock(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Sadece Stoktakiler</span>
            </label>

            {/* Reset Button if active */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1 h-10 px-3 text-xs font-medium text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
                title="Tüm Filtreleri Temizle"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Temizle</span>
              </button>
            )}
          </div>

        </div>

        {/* Counter & quick search context */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Toplam <strong className="text-slate-900 font-bold tabular-nums">{filteredProducts.length}</strong> parça bulundu</span>
            {searchQuery && (
              <span className="text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded">
                "{searchQuery}" için sonuçlar
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400">Tüm parçalar test edilmiş & garantilidir</span>
        </div>
      </div>

      {/* Product Grid: 3-column desktop */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
              onCheckCompatibility={onCheckCompatibility}
            />
          ))}
        </div>
      ) : (
        /* Empty State with proactive Part Request CTA */
        <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Aradığınız Kriterlere Uygun Parça Bulunamadı
          </h3>
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            "{searchQuery}" için doğrudan eşleşen ürün bulunamadı. Endişelenmeyin! Stoklarımızda 48.000'den fazla parça bulunmaktadır. Cihaz model etiketinizi bize iletin, teknisyenlerimiz 15 dakika içinde parçanızı bulsun.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenPartRequest}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-colors"
            >
              Parça Talep Formunu Aç
            </button>
            <button
              onClick={onResetFilters}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-medium rounded-lg transition-colors"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
