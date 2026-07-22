import React from 'react';
import { Button } from '@/components/ui/button';
import { PauseCircle, RotateCcw } from 'lucide-react';

interface SummaryCardsProps {
  totalQty: number;
  subtotal: number;
  vat: number;
  discount: number;
  total: number;
  amountDue: number;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalQty,
  subtotal,
  vat,
  discount,
  total,
  amountDue
}) => {
  return (
    <div className="p-4 md:p-5 flex flex-col space-y-4 bg-white/80 backdrop-blur-md rounded-t-3xl border-t border-white shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-20 relative mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm px-2 gap-4 md:gap-0">
        <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 text-slate-600 font-semibold w-full md:w-auto">
          <span className="flex flex-col">
            <span className="text-slate-400 text-[10px] uppercase tracking-widest mb-1 font-bold">Qty</span>
            <span className="text-lg text-slate-700 font-black">{totalQty}</span>
          </span>
          <span className="flex flex-col">
            <span className="text-slate-400 text-[10px] uppercase tracking-widest mb-1 font-bold">Subtotal</span>
            <span className="text-lg text-slate-700 font-black">{subtotal.toFixed(2)}</span>
          </span>
          <span className="flex flex-col">
            <span className="text-slate-400 text-[10px] uppercase tracking-widest mb-1 font-bold">VAT 15%</span>
            <span className="text-lg text-slate-700 font-black">{vat.toFixed(2)}</span>
          </span>
          <span className="flex flex-col">
            <span className="text-slate-400 text-[10px] uppercase tracking-widest mb-1 font-bold">Total</span>
            <span className="text-lg text-slate-700 font-black">{total.toFixed(2)}</span>
          </span>
          <span className="flex flex-col text-red-500">
            <span className="text-red-400/80 text-[10px] uppercase tracking-widest mb-1 font-bold">Disc.</span>
            <span className="text-lg font-black">{discount.toFixed(2)}</span>
          </span>
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto justify-end md:justify-start border-t md:border-0 border-slate-200 pt-3 md:pt-0">
          <div className="flex flex-col items-end">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Amount Due</span>
            <span className="text-[2.5rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-500 leading-none drop-shadow-sm">
              {amountDue.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex space-x-3 pt-2">
        <Button variant="outline" className="flex-1">
          <PauseCircle /> Hold
        </Button>
        <Button variant="outline" className="flex-1">
          <RotateCcw /> Recall
        </Button>
      </div>
    </div>
  );
};

