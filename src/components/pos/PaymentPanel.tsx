import React from 'react';
import { CreditCard, Banknote, SplitSquareHorizontal, Percent } from 'lucide-react';
import { NumericKeypad } from './NumericKeypad';
import { QuickCashButtons } from './QuickCashButtons';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentPanelProps {
  amountDue: number;
  cashTendered: string;
  paymentMethod: 'CASH' | 'CARD' | 'MADA' | 'SPLIT';
  onPaymentMethodChange: (method: 'CASH' | 'CARD' | 'MADA' | 'SPLIT') => void;
  onKeypadPress: (key: string) => void;
  onKeypadBackspace: () => void;
  onQuickAmount: (amount: number) => void;
  onClearTendered: () => void;
}

export const PaymentPanel: React.FC<PaymentPanelProps> = ({
  amountDue,
  cashTendered,
  paymentMethod,
  onPaymentMethodChange,
  onKeypadPress,
  onKeypadBackspace,
  onQuickAmount,
  onClearTendered,
}) => {
  const tenderedAmount = parseFloat(cashTendered) || 0;
  const change = Math.max(0, tenderedAmount - amountDue);

  return (
    <div className="flex flex-col h-full bg-slate-50 lg:border-l border-slate-200/60 relative">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 opacity-5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex-1 overflow-visible lg:overflow-y-auto p-4 lg:p-5 space-y-4 lg:space-y-5 z-10 pb-6">
        {/* Payment Methods */}
        <div className="grid grid-cols-4 gap-2 lg:gap-3">
          <Button
            variant="outline"
            className={`relative h-16 lg:h-20 flex flex-col items-center justify-center space-y-1 lg:space-y-1.5 rounded-xl lg:rounded-2xl transition-all duration-300 border-0 ${
              paymentMethod === 'CASH' 
                ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-2 ring-blue-500 text-blue-600 scale-[1.03]' 
                : 'bg-white/60 text-slate-500 shadow-sm hover:bg-white hover:shadow-md'
            }`}
            onClick={() => onPaymentMethodChange('CASH')}
          >
            {paymentMethod === 'CASH' && (
              <motion.div layoutId="active-payment" className="absolute inset-0 bg-blue-50/50 rounded-xl lg:rounded-2xl pointer-events-none" />
            )}
            <Banknote className={`w-5 h-5 lg:w-6 lg:h-6 z-10 transition-colors ${paymentMethod === 'CASH' ? 'text-blue-500' : 'text-slate-400'}`} />
            <span className="text-[9px] lg:text-[11px] font-black tracking-wider z-10">CASH</span>
          </Button>
          <Button
            variant="outline"
            className={`relative h-16 lg:h-20 flex flex-col items-center justify-center space-y-1 lg:space-y-1.5 rounded-xl lg:rounded-2xl transition-all duration-300 border-0 ${
              paymentMethod === 'CARD' 
                ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-2 ring-blue-500 text-blue-600 scale-[1.03]' 
                : 'bg-white/60 text-slate-500 shadow-sm hover:bg-white hover:shadow-md'
            }`}
            onClick={() => onPaymentMethodChange('CARD')}
          >
            {paymentMethod === 'CARD' && (
              <motion.div layoutId="active-payment" className="absolute inset-0 bg-blue-50/50 rounded-xl lg:rounded-2xl pointer-events-none" />
            )}
            <CreditCard className={`w-5 h-5 lg:w-6 lg:h-6 z-10 transition-colors ${paymentMethod === 'CARD' ? 'text-blue-500' : 'text-slate-400'}`} />
            <span className="text-[9px] lg:text-[11px] font-black tracking-wider z-10">CARD</span>
          </Button>
          <Button
            variant="outline"
            className={`relative h-16 lg:h-20 flex flex-col items-center justify-center space-y-1 lg:space-y-1.5 rounded-xl lg:rounded-2xl transition-all duration-300 border-0 ${
              paymentMethod === 'MADA' 
                ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-2 ring-blue-500 text-blue-600 scale-[1.03]' 
                : 'bg-white/60 text-slate-500 shadow-sm hover:bg-white hover:shadow-md'
            }`}
            onClick={() => onPaymentMethodChange('MADA')}
          >
            {paymentMethod === 'MADA' && (
              <motion.div layoutId="active-payment" className="absolute inset-0 bg-blue-50/50 rounded-xl lg:rounded-2xl pointer-events-none" />
            )}
            <CreditCard className={`w-5 h-5 lg:w-6 lg:h-6 z-10 transition-colors ${paymentMethod === 'MADA' ? 'text-blue-500' : 'text-slate-400'}`} />
            <span className="text-[9px] lg:text-[11px] font-black tracking-wider z-10">MADA</span>
          </Button>
          <Button
            variant="outline"
            className={`relative h-16 lg:h-20 flex flex-col items-center justify-center space-y-1 lg:space-y-1.5 rounded-xl lg:rounded-2xl transition-all duration-300 border-0 ${
              paymentMethod === 'SPLIT' 
                ? 'bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] ring-2 ring-blue-500 text-blue-600 scale-[1.03]' 
                : 'bg-white/60 text-slate-500 shadow-sm hover:bg-white hover:shadow-md'
            }`}
            onClick={() => onPaymentMethodChange('SPLIT')}
          >
            {paymentMethod === 'SPLIT' && (
              <motion.div layoutId="active-payment" className="absolute inset-0 bg-blue-50/50 rounded-xl lg:rounded-2xl pointer-events-none" />
            )}
            <SplitSquareHorizontal className={`w-5 h-5 lg:w-6 lg:h-6 z-10 transition-colors ${paymentMethod === 'SPLIT' ? 'text-blue-500' : 'text-slate-400'}`} />
            <span className="text-[9px] lg:text-[11px] font-black tracking-wider z-10">SPLIT</span>
          </Button>
        </div>

        {/* Input Area (LCD Display Style) */}
        <div className="bg-slate-900 p-4 lg:p-5 rounded-2xl shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] border-t-2 border-l-2 border-slate-800/80 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-1/2 bg-white/5 pointer-events-none" />
          <div className="flex justify-between items-center mb-2 pl-2 relative z-10">
            <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Tendered</span>
            <span className="text-emerald-400 font-bold text-xs bg-emerald-900/50 px-2 py-0.5 rounded border border-emerald-800/50">SAR</span>
          </div>
          <div className="text-[2.25rem] lg:text-[2.75rem] font-black text-emerald-400 tracking-tight h-10 lg:h-12 overflow-hidden text-right leading-none pl-2 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)] relative z-10">
            {cashTendered || '0.00'}
          </div>
        </div>

        {/* Change Display */}
        <AnimatePresence>
          {change > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              className="bg-emerald-50/80 backdrop-blur-md p-4 rounded-2xl border border-emerald-100 flex justify-between items-center shadow-sm"
            >
              <span className="text-emerald-700 font-bold uppercase tracking-widest text-[10px]">Change</span>
              <span className="text-xl lg:text-2xl font-black text-emerald-600">
                {change.toFixed(2)}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <QuickCashButtons onAmountClick={onQuickAmount} onClear={onClearTendered} />
        
        <div className="pt-2">
          <NumericKeypad 
            onKeyPress={onKeypadPress} 
            onBackspace={onKeypadBackspace}
            onClear={onClearTendered}
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="sticky bottom-0 p-4 lg:p-5 bg-white/90 backdrop-blur-xl border-t border-slate-200/60 flex gap-3 z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <Button className="flex-1 h-14 lg:h-16 font-bold bg-white text-slate-700 hover:bg-slate-50 text-base lg:text-lg rounded-xl lg:rounded-2xl shadow-[0_4px_14px_0_rgb(0,0,0,0.05)] border border-slate-200 transition-all active:scale-[0.98]">
          <Percent className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-slate-400" />
          Discount
        </Button>
        <Button className="flex-[2] h-14 lg:h-16 font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg lg:text-xl rounded-xl lg:rounded-2xl shadow-[0_8px_25px_rgba(79,70,229,0.3)] transition-all active:scale-[0.98] border-0 overflow-hidden relative group">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />
          <span className="relative z-10 flex items-center justify-center">
            Pay SAR {amountDue.toFixed(2)}
          </span>
        </Button>
      </div>
    </div>
  );
};



