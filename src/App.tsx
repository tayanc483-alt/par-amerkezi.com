import React, { useState } from 'react';
import { PartProduct, ApplianceCategory, CartItem, OrderDetails } from './types';
import { PRODUCTS_DATA } from './data/partsData';
import { Header } from './components/Header';
import { HeroFinder } from './components/HeroFinder';
import { CategoryNav } from './components/CategoryNav';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { ModelGuideModal } from './components/ModelGuideModal';
import { PartRequestModal } from './components/PartRequestModal';
import { TrustBar } from './components/TrustBar';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';

export default function App() {
  const [products] = useState<PartProduct[]>(PRODUCTS_DATA);
  const [selectedCategory, setSelectedCategory] = useState<ApplianceCategory>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Modals & Drawers state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<PartProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isModelGuideOpen, setIsModelGuideOpen] = useState<boolean>(false);
  const [isPartRequestOpen, setIsPartRequestOpen] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart operations
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: PartProduct, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.name.slice(0, 32)}..." sepete eklendi.`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleBuyNow = (product: PartProduct, quantity = 1) => {
    handleAddToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  const handleHeroSearch = (brand: string, category: ApplianceCategory, query: string) => {
    setSelectedBrand(brand);
    setSelectedCategory(category);
    setSearchQuery(query);
    const catalogElem = document.getElementById('catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('Tümü');
    setSearchQuery('');
    setInStockOnly(false);
  };

  const handleNavigateSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-800 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header conforming to Top Bar Contract */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenModelGuide={() => setIsModelGuideOpen(true)}
        onOpenPartRequest={() => setIsPartRequestOpen(true)}
        onNavigateSection={handleNavigateSection}
      />

      <main className="flex-1">
        {/* Hero Section with Interactive Model Finder Engine */}
        <HeroFinder
          onSearch={handleHeroSearch}
          onOpenModelGuide={() => setIsModelGuideOpen(true)}
        />

        {/* Appliance Category Segmented Control Bar */}
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            handleNavigateSection('catalog');
          }}
        />

        {/* Product Catalog Grid & Filter Toolbar */}
        <ProductCatalog
          products={products}
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          searchQuery={searchQuery}
          sortBy={sortBy}
          inStockOnly={inStockOnly}
          onSelectBrand={setSelectedBrand}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
          onToggleInStock={setInStockOnly}
          onResetFilters={handleResetFilters}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
          onCheckCompatibility={(p, e) => {
            if (e) e.stopPropagation();
            setSelectedProduct(p);
          }}
          onOpenPartRequest={() => setIsPartRequestOpen(true)}
        />

        {/* Trust & Service Guarantees strip */}
        <TrustBar />
      </main>

      {/* Footer with working category anchors & contacts */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleNavigateSection('catalog');
        }}
        onOpenModelGuide={() => setIsModelGuideOpen(true)}
        onOpenPartRequest={() => setIsPartRequestOpen(true)}
      />

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        onBuyNow={(p, qty) => handleBuyNow(p, qty)}
        onOpenModelGuide={() => {
          setSelectedProduct(null);
          setIsModelGuideOpen(true);
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        onOrderCompleted={(order) => {
          setIsCheckoutOpen(false);
          setCart([]);
          setConfirmedOrder(order);
        }}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      <ModelGuideModal
        isOpen={isModelGuideOpen}
        onClose={() => setIsModelGuideOpen(false)}
        onOpenPartRequest={() => {
          setIsModelGuideOpen(false);
          setIsPartRequestOpen(true);
        }}
      />

      <PartRequestModal
        isOpen={isPartRequestOpen}
        onClose={() => setIsPartRequestOpen(false)}
      />

    </div>
  );
}
