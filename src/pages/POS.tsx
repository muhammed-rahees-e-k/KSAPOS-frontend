import { useState } from 'react';
import { Header } from '@/components/pos/Header';
import { CustomerCard } from '@/components/pos/CustomerCard';
import { ProductTable } from '@/components/pos/ProductTable';
import { PaymentPanel } from '@/components/pos/PaymentPanel';
import { Favorites } from '@/components/pos/Favorites';
import { SummaryCards } from '@/components/pos/SummaryCards';
import type { CartItem, Product, Customer } from '@/types/pos';

// Mock favorites for testing
const MOCK_FAVORITES: Product[] = [
  { id: 'PRD-001', name: 'Pepsi 330ml', price: 2.50, category: 'Beverages', barcode: '12345' },
  { id: 'PRD-002', name: 'Lays Classic', price: 1.50, category: 'Snacks', barcode: '12346' },
  { id: 'PRD-003', name: 'Water 500ml', price: 1.00, category: 'Beverages', barcode: '12347' },
  { id: 'PRD-004', name: 'Snickers', price: 3.00, category: 'Snacks', barcode: '12348' },
  { id: 'PRD-005', name: 'Red Bull', price: 8.00, category: 'Beverages', barcode: '12349' },
  { id: 'PRD-006', name: 'Doritos', price: 2.00, category: 'Snacks', barcode: '12350' },
];

export default function POS() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customer] = useState<Customer | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'MADA' | 'SPLIT'>('CASH');
  const [cashTendered, setCashTendered] = useState('');

  // Derived state
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;
  const discount = 0; // Simplified for now
  const amountDue = total - discount;

  // Handlers
  const handleAddProduct = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.rate }
            : item
        );
      }
      return [...prev, {
        id: Math.random().toString(),
        product,
        quantity: 1,
        rate: product.price,
        total: product.price
      }];
    });
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity: newQty, total: newQty * item.rate } : item
    ));
  };



  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Numpad Handlers
  const handleKeypadPress = (key: string) => {
    if (cashTendered.includes('.') && key === '.') return;
    if (cashTendered === '0' && key !== '.') {
      setCashTendered(key);
    } else {
      setCashTendered(prev => prev + key);
    }
  };

  const handleKeypadBackspace = () => {
    setCashTendered(prev => prev.slice(0, -1));
  };

  const handleQuickAmount = (amount: number) => {
    setCashTendered(amount.toString());
  };

  const handleClearTendered = () => {
    setCashTendered('');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 overflow-hidden font-sans">
      <Header />
      
      <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden">
        {/* Left Panel: Invoice Area (55%) */}
        <div className="w-full lg:w-[55%] flex flex-col min-h-[60vh] lg:h-full bg-white relative">
          <CustomerCard 
            invoiceNumber="INV-2023-001" 
            customer={customer}
            saleType={paymentMethod}
          />
          <ProductTable 
            items={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
          <SummaryCards 
            totalQty={totalQty}
            subtotal={subtotal}
            vat={vat}
            discount={discount}
            total={total}
            amountDue={amountDue}
          />
        </div>

        {/* Right Panel: Payment Area (45%) */}
        <div className="w-full lg:w-[45%] flex flex-col h-auto lg:h-full bg-slate-50 relative border-t-2 lg:border-t-0 lg:border-l-2 border-slate-200/60 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-slate-100/40 backdrop-blur-[2px] pointer-events-none z-0" />
          <div className="relative z-10 flex-1 flex flex-col overflow-visible lg:overflow-hidden">
            <Favorites 
              favorites={MOCK_FAVORITES} 
              onAddProduct={handleAddProduct} 
            />
            <div className="flex-1 overflow-visible lg:overflow-hidden border-t border-slate-200/60 shadow-[0_-4px_20px_rgb(0,0,0,0.02)]">
              <PaymentPanel 
                amountDue={amountDue}
                cashTendered={cashTendered}
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                onKeypadPress={handleKeypadPress}
                onKeypadBackspace={handleKeypadBackspace}
                onQuickAmount={handleQuickAmount}
                onClearTendered={handleClearTendered}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
