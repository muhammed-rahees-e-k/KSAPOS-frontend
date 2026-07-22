import React from 'react';
import { UserPlus, Info } from 'lucide-react';
import type { Customer } from '@/types/pos';
import { Button } from '@/components/ui/button';

interface CustomerCardProps {
  invoiceNumber: string;
  customer: Customer | null;
  saleType: 'CASH' | 'CARD' | 'MADA' | 'SPLIT';
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ invoiceNumber, customer, saleType }) => {
  return (
    <div className="bg-white px-4 md:px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between z-20 gap-4 sm:gap-0">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Invoice</p>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-black text-slate-800 tracking-tight">{invoiceNumber}</span>
            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">
              {saleType}
            </span>
          </div>
        </div>
        
        <div className="hidden sm:block w-px h-10 bg-slate-200" />
        
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {customer ? (
            <div className="flex items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-200/60 shadow-sm w-full sm:w-auto">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20 mr-3 shrink-0">
                {customer.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-800 leading-tight">{customer.name}</p>
                <p className="text-xs text-slate-500 font-medium">{customer.phone}</p>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 hover:bg-white rounded-full ml-4 -mr-2 transition-all">
                <Info className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 rounded-xl font-bold transition-all shadow-sm w-full sm:w-auto justify-center">
              <UserPlus className="w-4 h-4 mr-2" />
              Assign Customer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
