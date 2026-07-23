import React, { useState } from 'react';
import { Play, ChevronLeft, Banknote, CreditCard, Plus, Save, Printer, X } from 'lucide-react';
import { NumericKeypad } from './NumericKeypad';
import { MadaLogo } from './MadaLogo';
import { translations, type Language } from '@/utils/translations';

interface PaymentPanelProps {
  amountDue: number;
  cashTendered: string;
  cartCount?: number;
  entryMode?: 'QTY' | 'PRICE';
  displayValue?: string;
  panelMode?: 'ENTRY' | 'CHECKOUT' | 'TENDER';
  paymentMethod: 'CASH' | 'CARD' | 'MADA' | 'SPLIT' | 'CREDIT';
  language?: Language;
  onPaymentMethodChange: (method: 'CASH' | 'CARD' | 'MADA' | 'SPLIT' | 'CREDIT') => void;
  onKeypadPress: (key: string) => void;
  onKeypadBackspace: () => void;
  onQuickAmount: (amount: number) => void;
  onClearTendered: () => void;
  onNextOrAddClick?: () => void;
  onPayClick?: () => void;
  onTenderClick?: () => void;
  onNewSaleClick?: () => void;
  onBackToSaleClick?: () => void;
  onSaveClick?: () => void;
  onSaveAndPrintClick?: () => void;
  onDiscountClick?: () => void;
}

export const PaymentPanel: React.FC<PaymentPanelProps> = ({
  amountDue,
  cashTendered,
  cartCount,
  entryMode = 'QTY',
  displayValue = '1',
  panelMode = 'ENTRY',
  paymentMethod,
  language = 'EN',
  onPaymentMethodChange,
  onKeypadPress,
  onKeypadBackspace,
  onQuickAmount,
  onClearTendered,
  onNextOrAddClick,
  onPayClick,
  onTenderClick,
  onNewSaleClick,
  onBackToSaleClick,
  onSaveClick,
  onSaveAndPrintClick,
  onDiscountClick,
}) => {
  const t = translations[language];
  const [isDiscountActive, setIsDiscountActive] = useState(false);
  const [discountType, setDiscountType] = useState<'SAR' | 'PERCENT'>('SAR');
  const [discountValue, setDiscountValue] = useState('');

  const isCartEmpty = cartCount !== undefined ? cartCount === 0 : amountDue <= 0;
  const displayAmount = amountDue.toFixed(2);
  const tenderedVal = cashTendered ? parseFloat(cashTendered) : 0;
  const changeVal = Math.max(0, tenderedVal - amountDue);

  const handleKeypadPress = (key: string) => {
    if (isDiscountActive) {
      if (key === '.' && discountValue.includes('.')) return;
      setDiscountValue(prev => prev + key);
    } else {
      onKeypadPress(key);
    }
  };

  const handleKeypadBackspace = () => {
    if (isDiscountActive) {
      setDiscountValue(prev => prev.slice(0, -1));
    } else {
      onKeypadBackspace();
    }
  };

  const handleClear = () => {
    if (isDiscountActive) {
      setDiscountValue('');
    } else {
      onClearTendered();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#23303F] border-l border-slate-700/80 select-none relative overflow-hidden text-white">
      
      {/* Top Header Title / Back to Sale */}
      {panelMode !== 'ENTRY' ? (
        <div className="py-1.5 px-3 flex items-center justify-between border-b border-slate-700/60 shrink-0">
          <button
            type="button"
            onClick={onBackToSaleClick}
            className="bg-[#334155] hover:bg-[#475569] text-white font-bold text-[10px] sm:text-[11px] px-2 py-0.5 rounded-lg flex items-center space-x-1 cursor-pointer transition-colors shadow-2xs"
          >
            <ChevronLeft className="w-3 h-3" />
            <span>{t.backToSale}</span>
          </button>

          <h2 className="text-base sm:text-lg font-black text-[#38BDF8] tracking-wider uppercase">
            {paymentMethod === 'CASH' ? t.cashSale : paymentMethod === 'CARD' ? t.cardSale : paymentMethod === 'MADA' ? t.madaSale : paymentMethod === 'SPLIT' ? t.splitSale : t.creditSale}
          </h2>
        </div>
      ) : (
        <div className="py-1.5 px-4 text-center shrink-0">
          <h2 className="text-lg sm:text-xl font-black text-[#38BDF8] tracking-wider uppercase">
            {paymentMethod === 'CASH' ? t.cashSale : paymentMethod === 'CARD' ? t.cardSale : paymentMethod === 'MADA' ? t.madaSale : paymentMethod === 'SPLIT' ? t.splitSale : t.creditSale}
          </h2>
        </div>
      )}

      {/* Amount Due / Display Bar */}
      <div className="bg-[#1E293B] px-3 py-1.5 flex items-center justify-between border-b border-slate-700/80 shadow-2xs shrink-0">
        <span className="text-amber-400/90 font-extrabold text-[11px] uppercase tracking-wider">
          {t.amountDue}
        </span>
        <div className="flex items-baseline space-x-1">
          <span className="text-xl sm:text-2xl font-black text-[#F97316] font-mono tracking-tight">
            {displayAmount}
          </span>
          <span className="text-slate-400 font-bold text-xs ml-1 font-mono">
            ر.س
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-between p-2 space-y-1 overflow-hidden">
        
        {panelMode === 'TENDER' ? (
          /* TENDER CASH / BREAKDOWN INTERFACE MATCHING USER SCREENSHOT */
          <>
            {/* Payment Method Cards */}
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                onClick={() => onPaymentMethodChange('CASH')}
                className={`py-1 px-2 rounded-xl flex flex-col items-center justify-center space-y-0.5 cursor-pointer transition-all ${
                  paymentMethod === 'CASH'
                    ? 'bg-[#0284C7] text-white shadow-md font-black'
                    : 'bg-[#334155] text-slate-200 hover:bg-[#475569]'
                }`}
              >
                <Banknote className="w-4 h-4" />
                <span className="text-[11px] font-extrabold">Cash</span>
              </button>

              <button
                type="button"
                onClick={() => onPaymentMethodChange('CARD')}
                className={`py-1 px-2 rounded-xl flex flex-col items-center justify-center space-y-0.5 cursor-pointer transition-all ${
                  paymentMethod === 'CARD'
                    ? 'bg-[#0284C7] text-white shadow-md font-black'
                    : 'bg-[#334155] text-slate-200 hover:bg-[#475569]'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-[11px] font-extrabold">Card</span>
              </button>

              <button
                type="button"
                onClick={() => onPaymentMethodChange('MADA')}
                className={`py-1.5 px-2 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                  paymentMethod === 'MADA'
                    ? 'bg-[#0284C7] text-white shadow-md font-black'
                    : 'bg-[#334155] text-slate-200 hover:bg-[#475569]'
                }`}
              >
                <MadaLogo className="h-6 sm:h-7 w-auto my-auto" lightText={true} />
              </button>
            </div>

            {/* Sub Actions: Split, Credit, + Discount */}
            <div className={`grid ${isDiscountActive ? 'grid-cols-2' : 'grid-cols-3'} gap-1`}>
              <button
                type="button"
                onClick={() => onPaymentMethodChange('SPLIT')}
                className={`py-1 rounded-lg text-center cursor-pointer transition-all ${
                  paymentMethod === 'SPLIT'
                    ? 'bg-[#0284C7] text-white border-2 border-[#38BDF8] font-black text-[11px] shadow-md'
                    : 'bg-[#334155] hover:bg-[#475569] text-white font-extrabold text-[10px] sm:text-[11px]'
                }`}
              >
                Split
              </button>

              <button
                type="button"
                onClick={() => onPaymentMethodChange('CREDIT')}
                className={`py-1 rounded-lg text-center cursor-pointer transition-all ${
                  paymentMethod === 'CREDIT'
                    ? 'bg-[#0284C7] text-white border-2 border-[#38BDF8] font-black text-[11px] shadow-md'
                    : 'bg-[#334155] hover:bg-[#475569] text-white font-extrabold text-[10px] sm:text-[11px]'
                }`}
              >
                Credit
              </button>

              {!isDiscountActive && (
                <button
                  type="button"
                  onClick={() => {
                    setIsDiscountActive(true);
                    if (onDiscountClick) onDiscountClick();
                  }}
                  className="py-1 bg-[#334155] hover:bg-[#475569] text-white font-extrabold text-[10px] sm:text-[11px] rounded-lg text-center cursor-pointer transition-all flex items-center justify-center space-x-0.5"
                >
                  <Plus className="w-3 h-3" />
                  <span>Discount</span>
                </button>
              )}
            </div>

            {/* DISCOUNT INPUT CONTAINER BOX (WHEN DISCOUNT IS ACTIVE) */}
            {isDiscountActive ? (
              <>
                {paymentMethod === 'CREDIT' && (
                  <div className="space-y-1 pt-0.5">
                    <label className="text-slate-400 font-sans text-xs font-semibold block">
                      Select Customer
                    </label>
                    <select
                      className="w-full bg-[#1E293B] border border-slate-700/80 text-white text-xs sm:text-sm font-semibold rounded-xl p-2 outline-none focus:border-[#38BDF8] cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled>Select Customer...</option>
                      <option value="walkin">Walk-in Customer</option>
                      <option value="othaim">Al-Othaim Corp</option>
                      <option value="mansoor">Ahmad Al-Mansoor</option>
                      <option value="suhail">Suhail Trading Co.</option>
                    </select>
                  </div>
                )}

                {/* Discount Header + Pill Toggles + Input + Apply Button Box */}
                <div className="bg-[#1E293B] border border-slate-700/80 rounded-xl p-2 space-y-1.5 shadow-inner">
                  {/* Top Bar: Discount label + (SAR / %) pills + Close Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-sans text-xs font-semibold">Discount</span>
                    
                    <div className="flex items-center space-x-1.5">
                      <div className="bg-[#334155] p-0.5 rounded-lg flex items-center space-x-0.5">
                        <button
                          type="button"
                          onClick={() => setDiscountType('SAR')}
                          className={`px-2 py-0.5 text-[10px] sm:text-xs font-extrabold rounded-md transition-all cursor-pointer ${
                            discountType === 'SAR'
                              ? 'bg-[#0284C7] text-white shadow-xs'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          ر.س
                        </button>
                        <button
                          type="button"
                          onClick={() => setDiscountType('PERCENT')}
                          className={`px-2 py-0.5 text-[10px] sm:text-xs font-extrabold rounded-md transition-all cursor-pointer ${
                            discountType === 'PERCENT'
                              ? 'bg-[#0284C7] text-white shadow-xs'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          %
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setIsDiscountActive(false);
                          setDiscountValue('');
                        }}
                        className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                        title="Close discount box"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Input Box Displaying Keypad Input */}
                  <div className="bg-[#0F172A] border border-slate-700/90 rounded-lg py-1.5 px-3 flex items-center justify-end text-right min-h-[34px]">
                    <span className="font-mono font-bold text-xs sm:text-sm text-white">
                      {discountValue ? (
                        <>
                          {discountValue} <span className="text-[10px] text-slate-400 font-sans">{discountType === 'SAR' ? 'SAR' : '%'}</span>
                        </>
                      ) : (
                        <span className="text-slate-500 text-xs font-sans">
                          Discount amount ({discountType === 'SAR' ? 'SAR' : '%'})
                        </span>
                      )}
                    </span>
                  </div>

                  {/* Apply Discount Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsDiscountActive(false);
                    }}
                    className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-extrabold text-xs py-1.5 rounded-lg border border-[#38BDF8] shadow-md cursor-pointer transition-all active:scale-98"
                  >
                    Apply discount
                  </button>
                </div>

                {/* Keypad bound to Discount value */}
                <div className="py-0">
                  <NumericKeypad 
                    onKeyPress={handleKeypadPress} 
                    onBackspace={handleKeypadBackspace}
                    onClear={handleClear}
                    darkTheme={true}
                    isCompact={true}
                  />
                </div>

                {/* Paid Amount Summary Box */}
                <div className="bg-[#1E293B] text-slate-300 p-2 rounded-xl border border-slate-700/80 font-mono text-xs shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-sans text-xs font-semibold">Paid Amount</span>
                    <span className="font-bold text-white">{displayAmount}</span>
                  </div>
                </div>

                {/* Save & Save & Print Action Buttons */}
                <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                  <button
                    type="button"
                    onClick={onSaveClick}
                    className="h-9 sm:h-9.5 bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg border-2 border-[#38BDF8] flex items-center justify-center space-x-1 cursor-pointer active:scale-95 transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>

                  <button
                    type="button"
                    onClick={onSaveAndPrintClick}
                    className="h-9 sm:h-9.5 bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg border-2 border-[#38BDF8] flex items-center justify-center space-x-1 cursor-pointer active:scale-95 transition-all"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Save & Print</span>
                  </button>
                </div>
              </>
            ) : paymentMethod === 'CREDIT' ? (
              /* CREDIT SALE INTERFACE MATCHING USER SCREENSHOT */
              <>
                {/* Select Customer Section */}
                <div className="space-y-1 pt-1">
                  <label className="text-slate-400 font-sans text-xs font-semibold block">
                    Select Customer
                  </label>
                  <select
                    className="w-full bg-[#1E293B] border border-slate-700/80 text-white text-xs sm:text-sm font-semibold rounded-xl p-2.5 outline-none focus:border-[#38BDF8] cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>Select Customer...</option>
                    <option value="walkin">Walk-in Customer</option>
                    <option value="othaim">Al-Othaim Corp</option>
                    <option value="mansoor">Ahmad Al-Mansoor</option>
                    <option value="suhail">Suhail Trading Co.</option>
                  </select>
                </div>

                {/* Paid Amount Box */}
                <div className="bg-[#1E293B] text-slate-300 p-3 rounded-xl border border-slate-700/80 font-mono text-sm shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-sans text-xs font-semibold">Paid Amount</span>
                    <span className="font-bold text-white">{displayAmount}</span>
                  </div>
                </div>

                <div className="flex-1" />

                {/* Save & Save & Print Action Buttons */}
                <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                  <button
                    type="button"
                    onClick={onSaveClick}
                    className="h-10 sm:h-11 bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-lg border-2 border-[#38BDF8] flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>

                  <button
                    type="button"
                    onClick={onSaveAndPrintClick}
                    className="h-10 sm:h-11 bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-lg border-2 border-[#38BDF8] flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Save & Print</span>
                  </button>
                </div>
              </>
            ) : paymentMethod === 'CARD' || paymentMethod === 'MADA' ? (
              /* CARD / MADA PAYMENT SELECTION INTERFACE MATCHING USER IMAGE */
              <>
                {/* Card Amount & Paid Amount Summary Box */}
                <div className="bg-[#1E293B] text-slate-300 p-3 rounded-xl border border-slate-700/80 font-mono text-sm space-y-2.5 shadow-inner">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-sans text-xs font-semibold">Card Amount</span>
                    <span className="font-bold text-white">{displayAmount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-sans text-xs font-semibold">Paid Amount</span>
                    <span className="font-bold text-white">{displayAmount}</span>
                  </div>
                </div>

                <div className="flex-1" />

                {/* Save & Save & Print Action Buttons */}
                <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                  <button
                    type="button"
                    onClick={onSaveClick}
                    className="h-10 sm:h-11 bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-lg border-2 border-[#38BDF8] flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>

                  <button
                    type="button"
                    onClick={onSaveAndPrintClick}
                    className="h-10 sm:h-11 bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-lg border-2 border-[#38BDF8] flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-all"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Save & Print</span>
                  </button>
                </div>
              </>
            ) : (
              /* CASH OR SPLIT INTERFACE WITH KEYPAD */
              <>
                {/* Dual Display Cards: Cash Tendered / Card Amount & Change */}
                <div className="grid grid-cols-2 gap-1.5">
                  {/* Tendered / Card Amount Box */}
                  <div className="bg-[#1E293B] text-white py-1 px-2 rounded-xl border border-slate-700 flex flex-col justify-between shadow-inner">
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold">
                      {paymentMethod === 'SPLIT' ? 'Card Amount' : 'Cash Tendered'}
                    </span>
                    <div className="text-right">
                      <span className="font-mono font-black text-base sm:text-lg text-white">
                        {cashTendered ? parseFloat(cashTendered).toFixed(2) : '0.00'}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono ml-1">ر.س</span>
                    </div>
                  </div>

                  {/* Change Box */}
                  <div className="bg-[#1E293B] text-white py-1 px-2 rounded-xl border border-slate-700 flex flex-col justify-between shadow-inner">
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-bold text-right">Change</span>
                    <div className="text-right">
                      <span className="font-mono font-black text-base sm:text-lg text-slate-400">
                        {changeVal > 0 ? changeVal.toFixed(2) : '—'}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono ml-1">ر.س</span>
                    </div>
                  </div>
                </div>

                {/* Quick SAR Denominations (1, 5, 10, 50, 100, 200, 500, Clear) */}
                <div className="grid grid-cols-4 gap-1">
                  {[1, 5, 10, 50, 100, 200, 500].map((denom) => (
                    <button
                      key={denom}
                      type="button"
                      onClick={() => onQuickAmount(denom)}
                      className="py-1 bg-[#475569] hover:bg-[#64748B] text-white font-extrabold text-[11px] rounded-lg cursor-pointer transition-all active:scale-95 border-0"
                    >
                      {denom}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={onClearTendered}
                    className="py-1 bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-[11px] rounded-lg cursor-pointer transition-all active:scale-95 border-0"
                  >
                    Clear
                  </button>
                </div>

                {/* Keypad */}
                <div className="py-0">
                  <NumericKeypad 
                    onKeyPress={onKeypadPress} 
                    onBackspace={onKeypadBackspace}
                    onClear={onClearTendered}
                    darkTheme={true}
                    isCompact={paymentMethod === 'SPLIT'}
                  />
                </div>

                {/* Split Breakdown Box (when SPLIT is selected) */}
                {paymentMethod === 'SPLIT' && (
                  <div className="bg-[#1E293B] text-slate-300 p-2 rounded-xl border border-slate-700/80 font-mono text-[11px] space-y-1 shadow-inner">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-sans">Card Amount</span>
                      <span className="font-bold text-white">
                        {cashTendered ? parseFloat(cashTendered).toFixed(2) : '0.00'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-sans">Cash Amount</span>
                      <span className="font-bold text-white">
                        {Math.max(0, amountDue - (cashTendered ? parseFloat(cashTendered) : 0)).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-700/60 pt-0.5">
                      <span className="text-slate-400 font-sans">Paid Amount</span>
                      <span className="font-bold text-white">{displayAmount}</span>
                    </div>
                  </div>
                )}

                {/* Save & Save & Print Action Buttons */}
                <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                  <button
                    type="button"
                    onClick={onSaveClick}
                    className="h-9 sm:h-9.5 bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg border-2 border-[#38BDF8] flex items-center justify-center space-x-1 cursor-pointer active:scale-95 transition-all"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>

                  <button
                    type="button"
                    onClick={onSaveAndPrintClick}
                    className="h-9 sm:h-9.5 bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-xs sm:text-sm rounded-xl shadow-lg border-2 border-[#38BDF8] flex items-center justify-center space-x-1 cursor-pointer active:scale-95 transition-all"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Save & Print</span>
                  </button>
                </div>
              </>
            )}
          </>
        ) : panelMode === 'CHECKOUT' ? (
          /* PAYMENT CHECKOUT INTERFACE */
          <>
            {/* 3 Payment Method Cards (Cash, Card, mada) */}
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => onPaymentMethodChange('CASH')}
                className={`p-2.5 rounded-xl flex flex-col items-center justify-center space-y-1 cursor-pointer transition-all ${
                  paymentMethod === 'CASH'
                    ? 'bg-[#0284C7] text-white shadow-md font-black'
                    : 'bg-[#334155] text-slate-200 hover:bg-[#475569]'
                }`}
              >
                <Banknote className="w-5 h-5" />
                <span className="text-xs font-extrabold">Cash</span>
              </button>

              <button
                type="button"
                onClick={() => onPaymentMethodChange('CARD')}
                className={`p-2.5 rounded-xl flex flex-col items-center justify-center space-y-1 cursor-pointer transition-all ${
                  paymentMethod === 'CARD'
                    ? 'bg-[#0284C7] text-white shadow-md font-black'
                    : 'bg-[#334155] text-slate-200 hover:bg-[#475569]'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-xs font-extrabold">Card</span>
              </button>

              <button
                type="button"
                onClick={() => onPaymentMethodChange('MADA')}
                className={`py-1.5 px-2 rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                  paymentMethod === 'MADA'
                    ? 'bg-[#0284C7] text-white shadow-md font-black'
                    : 'bg-[#334155] text-slate-200 hover:bg-[#475569]'
                }`}
              >
                <MadaLogo className="h-6 sm:h-7 w-auto my-auto" lightText={true} />
              </button>
            </div>

            {/* + Discount Button */}
            <button
              type="button"
              onClick={onDiscountClick}
              className="w-full py-1.5 bg-[#334155] hover:bg-[#475569] text-white font-extrabold text-xs rounded-xl flex items-center justify-center space-x-1 cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Discount</span>
            </button>

            {/* Helper Instruction */}
            <p className="text-[10px] text-slate-400 text-center font-medium">
              Scan or search to add items
            </p>

            {/* Keypad */}
            <div className="py-0.5">
              <NumericKeypad 
                onKeyPress={onKeypadPress} 
                onBackspace={onKeypadBackspace}
                onClear={onClearTendered}
                darkTheme={true}
              />
            </div>

            {/* Tender Button */}
            <button
              type="button"
              onClick={onTenderClick}
              className="w-full h-10 bg-[#1E293B] hover:bg-[#334155] text-white font-extrabold text-sm rounded-xl shadow-md flex items-center justify-center space-x-1.5 cursor-pointer border border-slate-700 active:scale-98 transition-all"
            >
              <span>Tender</span>
              <Play className="w-3.5 h-3.5 fill-white text-white" />
            </button>

            {/* Save & Save & Print Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <button
                type="button"
                onClick={onSaveClick}
                className="h-11 bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg border-2 border-[#38BDF8] flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>

              <button
                type="button"
                onClick={onSaveAndPrintClick}
                className="h-11 bg-[#0284C7] hover:bg-[#0369A1] text-white font-black text-xs sm:text-sm rounded-2xl shadow-lg border-2 border-[#38BDF8] flex items-center justify-center space-x-1.5 cursor-pointer active:scale-95 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Save & Print</span>
              </button>
            </div>
          </>
        ) : (
          /* ITEM ENTRY SCREEN INTERFACE */
          <>
            {/* Dynamic Qty or Price Display Box */}
            <div className="bg-[#1E293B] text-white px-3 py-2 rounded-xl border border-slate-700 flex justify-between items-center shadow-inner">
              <span className="text-[11px] text-amber-400 font-extrabold uppercase tracking-wider">
                {entryMode === 'QTY' ? 'Quantity' : 'Price'}
              </span>
              <div className="flex items-baseline space-x-1">
                <span className="font-mono font-black text-2xl text-white">
                  {displayValue}
                </span>
                {entryMode === 'PRICE' && (
                  <span className="text-xs text-slate-400 font-mono font-bold">SAR</span>
                )}
              </div>
            </div>

            {/* Payment method selector tabs */}
            <div className="grid grid-cols-4 gap-1 bg-[#1E293B] p-1 rounded-xl border border-slate-700">
              {(['CASH', 'CARD', 'MADA', 'SPLIT'] as const).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => onPaymentMethodChange(method)}
                  className={`py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    paymentMethod === method
                      ? 'bg-[#0284C7] text-white shadow-2xs font-extrabold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {/* Keypad */}
            <div className="py-0.5">
              <NumericKeypad 
                onKeyPress={onKeypadPress} 
                onBackspace={onKeypadBackspace}
                onClear={() => {}}
                darkTheme={true}
              />
            </div>

            {/* Next / Add to Cart Dynamic Action Button */}
            <button
              type="button"
              onClick={onNextOrAddClick}
              className="w-full h-10 bg-[#0284C7] hover:bg-[#0369A1] text-white font-extrabold text-base rounded-xl shadow-md cursor-pointer active:scale-98 transition-all border-0 flex items-center justify-center space-x-1.5"
            >
              <span>{entryMode === 'QTY' ? 'Next' : 'Add to cart'}</span>
            </button>

            {/* Action Buttons: Pay ► & Tender ► */}
            <div className="flex items-center space-x-2 pt-0.5">
              <button
                type="button"
                onClick={onPayClick}
                disabled={isCartEmpty}
                className={`flex-1 h-10 bg-[#0284C7] hover:bg-[#0369A1] text-white font-extrabold text-sm sm:text-base rounded-xl shadow-md flex items-center justify-center space-x-1.5 transition-all border-0 ${
                  isCartEmpty
                    ? 'opacity-40 cursor-not-allowed pointer-events-none'
                    : 'cursor-pointer active:scale-95'
                }`}
              >
                <span>Pay</span>
                <Play className="w-3.5 h-3.5 fill-white text-white" />
              </button>

              <button
                type="button"
                onClick={onTenderClick}
                disabled={isCartEmpty}
                className={`flex-1 h-10 bg-[#334155] hover:bg-[#475569] text-white font-extrabold text-sm sm:text-base rounded-xl shadow-2xs flex items-center justify-center space-x-1.5 transition-all border-0 ${
                  isCartEmpty
                    ? 'opacity-40 cursor-not-allowed pointer-events-none'
                    : 'cursor-pointer active:scale-95'
                }`}
              >
                <span>Tender</span>
                <Play className="w-3.5 h-3.5 fill-white text-white" />
              </button>
            </div>
          </>
        )}

        {/* New Sale Button */}
        <button
          type="button"
          onClick={onNewSaleClick}
          className="w-full h-8.5 bg-[#475569]/60 hover:bg-[#475569] text-slate-200 font-extrabold text-xs rounded-xl shadow-2xs cursor-pointer transition-all border-0"
        >
          New Sale
        </button>
      </div>
    </div>
  );
};
