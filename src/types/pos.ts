export interface Product {
  id: string;
  name: string;
  category?: string;
  price: number;
  stock?: number;
  barcode?: string;
  image?: string;
}

export interface CartItem {
  id: string; // unique id for the cart row
  product: Product;
  quantity: number;
  rate: number;
  total: number;
}

export interface Customer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface ShiftInfo {
  id: string;
  user: string;
  startTime: string;
  status: 'OPEN' | 'CLOSED';
}

export interface POSState {
  invoiceNumber: string;
  customer: Customer | null;
  items: CartItem[];
  subtotal: number;
  vat: number;
  discount: number;
  amountDue: number;
}
