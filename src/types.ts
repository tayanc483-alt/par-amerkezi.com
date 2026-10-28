export type ApplianceCategory = 
  | 'all'
  | 'camasir'
  | 'bulasik'
  | 'buzdolabi'
  | 'firin'
  | 'kurutma'
  | 'supurge';

export type BrandName = 
  | 'Tümü'
  | 'Arçelik'
  | 'Beko'
  | 'Bosch'
  | 'Siemens'
  | 'Profilo'
  | 'Vestel'
  | 'Samsung'
  | 'LG'
  | 'Altus';

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface PartProduct {
  id: string;
  name: string;
  oemCode: string; // e.g. 2880401800, 00145787
  partType: string; // Pompa Motoru, Rezistans, Rulman Seti
  brand: BrandName | string;
  category: ApplianceCategory;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  stockCount: number;
  image: string;
  origin: 'Orijinal' | 'A-Kalite OEM';
  warranty: string;
  description: string;
  specs: TechnicalSpec[];
  compatibleModels: string[]; // List of appliance models this part fits
  rating: number;
  reviewsCount: number;
  badge?: string;
}

export interface CartItem {
  product: PartProduct;
  quantity: number;
}

export interface ApplianceModelReference {
  modelNumber: string;
  brand: string;
  category: ApplianceCategory;
  categoryName: string;
  title: string;
}

export interface OrderDetails {
  orderId: string;
  fullName: string;
  phone: string;
  email: string;
  city: string;
  district: string;
  address: string;
  notes?: string;
  paymentMethod: 'credit_card' | 'wire_transfer' | 'cash_on_delivery';
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
}
