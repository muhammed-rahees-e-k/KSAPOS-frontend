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
  onHold?: () => void;
  onRecall?: () => void;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  totalQty,
  subtotal,
  vat,
  discount,
  total,
  amountDue,
  onHold,
  onRecall,
}) => {
  return (
    <div className="px-4 py-2 bg-slate-900 text-slate-100 border-t border-slate-800 z-30 select-none shrink-0 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        
        {/* Left Side: Inline Metrics (Qty, Subtotal, VAT, Total, Disc) */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="flex items-center space-x-1">
            <span className="text-slate-400 font-sans text-[11px]">Qty:</span>
            <span className="font-extrabold text-white">{totalQty}</span>
          </div>

          <div className="h-3 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center space-x-1">
            <span className="text-slate-400 font-sans text-[11px]">Sub:</span>
            <span className="font-bold text-slate-200">{subtotal.toFixed(2)}</span>
          </div>

          <div className="h-3 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center space-x-1">
            <span className="text-slate-400 font-sans text-[11px]">VAT (15%):</span>
            <span className="font-bold text-slate-200">{vat.toFixed(2)}</span>
          </div>

          <div className="h-3 w-px bg-slate-800 hidden sm:block" />

          <div className="flex items-center space-x-1">
            <span className="text-slate-400 font-sans text-[11px]">Total:</span>
            <span className="font-bold text-slate-200">{total.toFixed(2)}</span>
          </div>

          <div className="h-3 w-px bg-slate-800 hidden md:block" />

          <div className="hidden md:flex items-center space-x-1">
            <span className="text-slate-400 font-sans text-[11px]">Disc:</span>
            <span className="font-bold text-slate-200">{discount.toFixed(2)}</span>
          </div>
        </div>

        {/* Right Side: Amount Due & Quick Control Buttons */}
        <div className="flex items-center space-x-3 ml-auto">
          {/* Glowing Amount Due */}
          <div className="flex items-center space-x-1.5 bg-slate-800/90 px-3 py-1 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-sans text-[10px] uppercase font-bold tracking-wider">Due:</span>
            <span className="text-base sm:text-lg font-black text-emerald-400 font-mono">
              SAR {amountDue.toFixed(2)}
            </span>
          </div>

          {/* Action Buttons: Hold & Recall */}
          <div className="flex items-center space-x-1.5">
            <Button 
              type="button" 
              onClick={onHold}
              className="h-8 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs rounded-lg border border-amber-500/40 px-2.5 cursor-pointer transition-all active:scale-95"
            >
              <PauseCircle className="w-3.5 h-3.5 mr-1 text-amber-400" /> Hold
            </Button>

            <Button 
              type="button" 
              onClick={onRecall}
              className="h-8 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-bold text-xs rounded-lg border border-indigo-500/40 px-2.5 cursor-pointer transition-all active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1 text-indigo-400" /> Recall
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};





