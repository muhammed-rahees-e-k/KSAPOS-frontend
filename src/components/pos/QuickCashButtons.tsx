import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface QuickCashButtonsProps {
  onAmountClick: (amount: number) => void;
  onClear: () => void;
}

export const QuickCashButtons: React.FC<QuickCashButtonsProps> = ({ onAmountClick, onClear }) => {
  const amounts = [1, 5, 10, 50, 100, 200, 500];

  return (
    <div className="grid grid-cols-4 gap-2 mb-2">
      {amounts.map((amount) => (
        <motion.div key={amount} whileTap={{ scale: 0.94 }}>
          <Button
            variant="outline"
            className="w-full h-14 bg-gradient-to-br from-emerald-50 to-emerald-100/50 hover:from-emerald-100 hover:to-emerald-200 text-emerald-800 border border-emerald-200/60 font-black shadow-[0_4px_10px_rgb(16,185,129,0.1)] transition-all text-base rounded-xl flex flex-col justify-center items-center p-0"
            onClick={() => onAmountClick(amount)}
          >
            <span className="text-[9px] text-emerald-600/80 font-bold -mb-1">SAR</span>
            <span>{amount}</span>
          </Button>
        </motion.div>
      ))}
      <motion.div whileTap={{ scale: 0.94 }}>
        <Button
          variant="outline"
          className="w-full h-14 bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 font-bold shadow-[0_4px_10px_rgb(0,0,0,0.03)] transition-all text-base rounded-xl"
          onClick={onClear}
        >
          Clear
        </Button>
      </motion.div>
    </div>
  );
};

