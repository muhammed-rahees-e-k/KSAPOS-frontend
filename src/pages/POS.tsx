import { useState, useEffect } from 'react';
import { Header } from '@/components/pos/Header';
import { CustomerCard } from '@/components/pos/CustomerCard';
import { ProductTable } from '@/components/pos/ProductTable';
import { PaymentPanel } from '@/components/pos/PaymentPanel';
import { Favorites } from '@/components/pos/Favorites';
import { SummaryCards } from '@/components/pos/SummaryCards';
import { ReturnModal } from '@/components/pos/ReturnModal';
import { CloseShiftModal } from '@/components/pos/CloseShiftModal';
import { OpenShiftModal } from '@/components/pos/OpenShiftModal';
import { KeyboardShortcutsModal } from '@/components/pos/KeyboardShortcutsModal';
import { PriceCheckModal } from '@/components/pos/PriceCheckModal';
import { QuickProductModal } from '@/components/pos/QuickProductModal';
import { PrintableReceipt } from '@/components/pos/PrintableReceipt';
import type { CartItem, Product, Customer } from '@/types/pos';
import { CheckCircle2, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock favorites matching the reference screenshot
const MOCK_FAVORITES: Product[] = [
  { id: '32383', name: 'ALMARAI HALLOUMI CHEESE FF 225G', price: 14.35, category: 'Dairy', barcode: '32383' },
  { id: '32384', name: 'MEMORIES VANILACREAM', price: 5.50, category: 'Snacks', barcode: '32384' },
  { id: '32385', name: 'SWISS ROLL CHOC', price: 3.00, category: 'Bakery', barcode: '32385' },
  { id: '32386', name: 'PEPSI 330ML', price: 2.50, category: 'Beverages', barcode: '32386' },
  { id: '32387', name: 'LAYS CLASSIC 50G', price: 1.50, category: 'Snacks', barcode: '32387' },
];

// Initial default cart item matching the reference screenshot (Almarai Cheese 14.35 + 2.15 VAT = 16.50 Amount Due)
const INITIAL_CART: CartItem[] = [
  {
    id: 'cart-1',
    product: MOCK_FAVORITES[0],
    quantity: 1,
    rate: 14.35,
    total: 14.35,
  }
];

export default function POS() {
  const [language, setLanguage] = useState<'EN' | 'AR'>('EN');
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [customer] = useState<Customer | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CARD' | 'MADA' | 'SPLIT' | 'CREDIT'>('CASH');

  useEffect(() => {
    document.documentElement.dir = language === 'AR' ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'AR' ? 'ar' : 'en';
  }, [language]);
  const [cashTendered, setCashTendered] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [panelMode, setPanelMode] = useState<'ENTRY' | 'CHECKOUT' | 'TENDER'>('ENTRY');
  const [selectedCartItemId, setSelectedCartItemId] = useState<string | null>('cart-1');
  const [activeQuantity, setActiveQuantity] = useState<string>('1');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isCloseShiftModalOpen, setIsCloseShiftModalOpen] = useState(false);
  const [isOpenShiftModalOpen, setIsOpenShiftModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isPriceCheckModalOpen, setIsPriceCheckModalOpen] = useState(false);
  const [isQuickProductModalOpen, setIsQuickProductModalOpen] = useState(false);
  const [lastPaymentInfo, setLastPaymentInfo] = useState<{ amount: number; change: number } | null>(null);
  const [heldOrdersCount, setHeldOrdersCount] = useState(0);
  const [lastPrintedOrder, setLastPrintedOrder] = useState<{
    cart: CartItem[];
    subtotal: number;
    vat: number;
    total: number;
    paymentMethod: string;
    cashTendered: string;
  } | null>(null);

  // Derived state calculations
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
  const vat = subtotal * 0.15; // 15% Saudi VAT
  const total = subtotal + vat;
  const discount = 0;
  const amountDue = total - discount;

  const handleSaveClick = () => {
    handleNewSale();
  };

  const handleSaveAndPrintClick = () => {
    // Preserve current order snapshot for printing
    const activeSnapshot = {
      cart: cart.length > 0 ? [...cart] : INITIAL_CART,
      subtotal,
      vat,
      total: amountDue,
      paymentMethod,
      cashTendered,
    };
    setLastPrintedOrder(activeSnapshot);

    setTimeout(() => {
      window.print();
    }, 100);

    handleNewSale();
  };

  // Global Physical Keyboard Shortcut Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // F3: Focus barcode scan search input
      if (e.key === 'F3') {
        e.preventDefault();
        const searchInput = document.querySelector<HTMLInputElement>('input[placeholder*="Scan barcode"]');
        searchInput?.focus();
      }
      // F9: Execute payment / Complete transaction
      else if (e.key === 'F9') {
        e.preventDefault();
        if (cart.length > 0) {
          handleCompletePayment();
        }
      }
      // F10: Fast-Save (exact cash & instant complete)
      else if (e.key === 'F10') {
        e.preventDefault();
        if (cart.length > 0) {
          setCashTendered(amountDue.toString());
          const paidAmount = amountDue;
          setLastPaymentInfo({ amount: paidAmount, change: 0 });
          setShowSuccessModal(true);
        }
      }
      // F8: Price Check
      else if (e.key === 'F8') {
        e.preventDefault();
        setIsPriceCheckModalOpen(true);
      }
      // F4: Quick Create Product
      else if (e.key === 'F4') {
        e.preventDefault();
        setIsQuickProductModalOpen(true);
      }
      // Esc: Cancel / Close any active modal
      else if (e.key === 'Escape') {
        setIsReturnModalOpen(false);
        setIsCloseShiftModalOpen(false);
        setIsOpenShiftModalOpen(false);
        setIsHelpModalOpen(false);
        setIsPriceCheckModalOpen(false);
        setIsQuickProductModalOpen(false);
        setShowSuccessModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [amountDue, cart.length]);

  const [entryMode, setEntryMode] = useState<'QTY' | 'PRICE'>('QTY');
  const [activePrice, setActivePrice] = useState<string>('14.35');

  // Handlers
  const handleSelectCartItem = (id: string) => {
    setSelectedCartItemId(id);
    setEntryMode('QTY');
    const found = cart.find(item => item.id === id);
    if (found) {
      setActiveQuantity(found.quantity.toString());
      setActivePrice(found.rate.toFixed(2));
    }
  };

  const handleAddProduct = (product: Product) => {
    setEntryMode('QTY');
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      const newQty = existing.quantity + 1;
      setCart(prev =>
        prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: newQty, total: newQty * item.rate }
            : item
        )
      );
      setSelectedCartItemId(existing.id);
      setActiveQuantity(newQty.toString());
      setActivePrice(existing.rate.toFixed(2));
    } else {
      const newId = `cart-${Date.now()}`;
      const newItem: CartItem = {
        id: newId,
        product,
        quantity: 1,
        rate: product.price,
        total: product.price,
      };
      setCart(prev => [...prev, newItem]);
      setSelectedCartItemId(newId);
      setActiveQuantity('1');
      setActivePrice(product.price.toFixed(2));
    }
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: newQty, total: newQty * item.rate }
          : item
      )
    );
  };

  const handleUpdatePrice = (id: string, newRate: number) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, rate: newRate, total: item.quantity * newRate }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
    if (selectedCartItemId === id) {
      setSelectedCartItemId(null);
      setActiveQuantity('1');
      setEntryMode('QTY');
    }
  };

  // Numpad Handlers
  const handleKeypadPress = (key: string) => {
    if (entryMode === 'QTY') {
      let newQtyStr = activeQuantity;
      if (key === '.') {
        if (!activeQuantity.includes('.')) {
          newQtyStr = activeQuantity + '.';
        }
      } else {
        if (activeQuantity === '1' || activeQuantity === '0') {
          newQtyStr = key;
        } else {
          newQtyStr = activeQuantity + key;
        }
      }
      setActiveQuantity(newQtyStr);

      if (selectedCartItemId) {
        const parsedQty = parseFloat(newQtyStr) || 1;
        handleUpdateQuantity(selectedCartItemId, parsedQty);
      }
    } else {
      // PRICE Mode
      let newPriceStr = activePrice;
      if (key === '.') {
        if (!activePrice.includes('.')) {
          newPriceStr = activePrice + '.';
        }
      } else {
        if (activePrice === '0' || activePrice === '14.35') {
          newPriceStr = key;
        } else {
          newPriceStr = activePrice + key;
        }
      }
      setActivePrice(newPriceStr);

      if (selectedCartItemId) {
        const parsedPrice = parseFloat(newPriceStr) || 0;
        handleUpdatePrice(selectedCartItemId, parsedPrice);
      }
    }
  };

  const handleKeypadBackspace = () => {
    if (entryMode === 'QTY') {
      const newQtyStr = activeQuantity.length > 1 ? activeQuantity.slice(0, -1) : '1';
      setActiveQuantity(newQtyStr);
      if (selectedCartItemId) {
        const parsedQty = parseFloat(newQtyStr) || 1;
        handleUpdateQuantity(selectedCartItemId, parsedQty);
      }
    } else {
      const newPriceStr = activePrice.length > 1 ? activePrice.slice(0, -1) : '0';
      setActivePrice(newPriceStr);
      if (selectedCartItemId) {
        const parsedPrice = parseFloat(newPriceStr) || 0;
        handleUpdatePrice(selectedCartItemId, parsedPrice);
      }
    }
  };

  const handleNextOrAddClick = () => {
    if (entryMode === 'QTY') {
      // Advance to PRICE mode (Step 2)
      setEntryMode('PRICE');
      const selectedItem = cart.find(item => item.id === selectedCartItemId);
      if (selectedItem) {
        setActivePrice(selectedItem.rate.toFixed(2));
      }
    } else {
      // Add to cart / Confirm item (Step 2 -> Step 1 reset)
      setEntryMode('QTY');
      setActiveQuantity('1');
    }
  };

  const handleNewSale = () => {
    setCart([]);
    setCashTendered('');
    setSelectedCartItemId(null);
    setActiveQuantity('1');
    setEntryMode('QTY');
    setPanelMode('ENTRY');
  };

  const handleQuickAmount = (amount: number) => {
    setCashTendered(amount.toString());
  };

  const handleClearTendered = () => {
    setCashTendered('');
  };

  const handleCompletePayment = () => {
    const paidAmount = cashTendered ? parseFloat(cashTendered) : amountDue;
    const change = Math.max(0, paidAmount - amountDue);
    setLastPaymentInfo({ amount: paidAmount, change });
    setShowSuccessModal(true);
  };

  const handleNewTransaction = () => {
    setShowSuccessModal(false);
    setPanelMode('ENTRY');
    setCart([]);
    setCashTendered('');
  };

  const handleHoldOrder = () => {
    if (cart.length === 0) return;
    setHeldOrdersCount(prev => prev + 1);
    setCart([]);
    alert('Order held successfully! You can recall it anytime.');
  };

  const handleRecallOrder = () => {
    if (heldOrdersCount === 0) {
      alert('No held orders found.');
      return;
    }
    setHeldOrdersCount(prev => Math.max(0, prev - 1));
    setCart(INITIAL_CART);
    alert('Held order recalled to cart.');
  };

  // Handle Search Input Enter
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) return;

    const match = MOCK_FAVORITES.find(
      p => p.name.toLowerCase().includes(query.toLowerCase()) || p.barcode === query || p.id === query
    );
    if (match) {
      handleAddProduct(match);
      setSearchQuery('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-100 overflow-hidden font-sans select-none text-slate-800">
      {/* Top Navigation Header */}
      <Header 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onReturnsClick={() => setIsReturnModalOpen(true)}
        onCloseShiftClick={() => setIsCloseShiftModalOpen(true)}
        onHelpClick={() => setIsHelpModalOpen(true)}
        onSignOutClick={() => alert('Sign out')}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      {/* Main Split Layout: Left 65% Invoice Area, Right 35% Payment Panel */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden bg-slate-100">
        
        {/* Left Panel: Invoice Details, Cart Table, Favorites, Summary */}
        <div className="w-full lg:w-[63%] xl:w-[67%] 2xl:w-[70%] flex flex-col h-full bg-white relative border-r border-slate-200/80 shadow-xs">
          <CustomerCard 
            invoiceNumber="INV-000044" 
            customer={customer}
            saleType={paymentMethod}
          />
          <ProductTable 
            items={cart}
            selectedItemId={selectedCartItemId}
            onSelectItem={handleSelectCartItem}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
          <Favorites 
            favorites={MOCK_FAVORITES} 
            onAddProduct={handleAddProduct} 
          />
          <SummaryCards 
            totalQty={totalQty}
            subtotal={subtotal}
            vat={vat}
            discount={discount}
            total={total}
            amountDue={amountDue}
            onHold={handleHoldOrder}
            onRecall={handleRecallOrder}
          />
        </div>

        {/* Right Panel: Payment Controls & Keypad */}
        <div className="w-full lg:w-[37%] xl:w-[33%] 2xl:w-[30%] max-w-full 2xl:max-w-[480px] flex flex-col h-full bg-[#23303F] shrink-0 overflow-hidden">
          <PaymentPanel 
            amountDue={amountDue}
            cashTendered={cashTendered}
            cartCount={cart.length}
            entryMode={entryMode}
            displayValue={entryMode === 'QTY' ? activeQuantity : activePrice}
            panelMode={panelMode}
            paymentMethod={paymentMethod}
            language={language}
            onPaymentMethodChange={setPaymentMethod}
            onKeypadPress={handleKeypadPress}
            onKeypadBackspace={handleKeypadBackspace}
            onQuickAmount={handleQuickAmount}
            onClearTendered={handleClearTendered}
            onNextOrAddClick={handleNextOrAddClick}
            onPayClick={() => setPanelMode('CHECKOUT')}
            onTenderClick={() => setPanelMode('TENDER')}
            onBackToSaleClick={() => setPanelMode('ENTRY')}
            onSaveClick={handleSaveClick}
            onSaveAndPrintClick={handleSaveAndPrintClick}
            onDiscountClick={() => alert('Discount module active')}
            onNewSaleClick={handleNewSale}
          />
        </div>
      </div>

      {/* Return / Refund Modal */}
      <ReturnModal 
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        onProcessRefund={(data) => {
          console.log('Refund processed:', data);
        }}
      />

      {/* Close Shift Modal */}
      <CloseShiftModal 
        isOpen={isCloseShiftModalOpen}
        onClose={() => setIsCloseShiftModalOpen(false)}
        cashSalesTotal={9524.72}
        onConfirmCloseShift={(summary) => {
          console.log('Shift closed:', summary);
          setIsCloseShiftModalOpen(false);
          setIsOpenShiftModalOpen(true);
        }}
      />

      {/* Open Shift Modal */}
      <OpenShiftModal 
        isOpen={isOpenShiftModalOpen}
        onClose={() => setIsOpenShiftModalOpen(false)}
        onOpenShift={(shiftData) => {
          setIsOpenShiftModalOpen(false);
          alert(`New Shift Opened!\nBranch: ${shiftData.branch}\nTerminal: ${shiftData.terminal}\nOpening Cash: SAR ${shiftData.openingCash.toFixed(2)}`);
        }}
        onSignOut={() => {
          setIsOpenShiftModalOpen(false);
          alert('Signed out successfully.');
        }}
      />

      {/* Keyboard Shortcuts Help Modal */}
      <KeyboardShortcutsModal 
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      {/* Price Check Modal [F8] */}
      <PriceCheckModal 
        isOpen={isPriceCheckModalOpen}
        onClose={() => setIsPriceCheckModalOpen(false)}
      />

      {/* Quick Add Product Modal [F4] */}
      <QuickProductModal 
        isOpen={isQuickProductModalOpen}
        onClose={() => setIsQuickProductModalOpen(false)}
        onAddProduct={(newProduct) => {
          handleAddProduct(newProduct);
        }}
      />

      {/* Light Theme Payment Receipt Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Payment Successful</h3>
              <p className="text-xs text-slate-500 mt-1 font-mono">Invoice No. INV-000044</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-sm font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Amount Paid:</span>
                <span className="font-bold text-slate-900">SAR {lastPaymentInfo?.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Payment Method:</span>
                <span className="font-bold text-blue-600">{paymentMethod}</span>
              </div>
              {lastPaymentInfo && lastPaymentInfo.change > 0 && (
                <div className="flex justify-between text-emerald-600 pt-2 border-t border-slate-200">
                  <span>Change Due:</span>
                  <span className="font-extrabold text-lg">SAR {lastPaymentInfo.change.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-3 pt-2">
              <Button 
                onClick={handleNewTransaction}
                className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl text-base shadow-lg shadow-blue-500/20 cursor-pointer"
              >
                <Receipt className="w-4 h-4 mr-2" /> New Transaction
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Hidden Printable Thermal Receipt for Browser window.print() */}
      <PrintableReceipt 
        cart={lastPrintedOrder?.cart || (cart.length > 0 ? cart : INITIAL_CART)}
        subtotal={lastPrintedOrder?.subtotal ?? subtotal}
        vat={lastPrintedOrder?.vat ?? vat}
        total={lastPrintedOrder?.total ?? amountDue}
        paymentMethod={lastPrintedOrder?.paymentMethod || paymentMethod}
        cashTendered={lastPrintedOrder?.cashTendered || cashTendered}
      />
    </div>
  );
}
