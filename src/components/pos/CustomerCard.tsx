import React from 'react';
import { Calendar, FileText, UserPlus } from 'lucide-react';
import type { Customer } from '@/types/pos';
import { Button } from '@/components/ui/button';

interface CustomerCardProps {
  invoiceNumber: string;
  customer: Customer | null;
  saleType: 'CASH' | 'CARD' | 'MADA' | 'SPLIT' | 'CREDIT';
  onAssignCustomer?: () => void;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({ 
  invoiceNumber, 
  customer, 
  saleType,
  onAssignCustomer 
}) => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '-');

  return (
    <div className="bg-slate-50/90 text-slate-800 px-4 py-1.5 border-b border-slate-200/80 z-20 select-none shrink-0 h-10 flex items-center">
      <div className="w-full flex items-center justify-between text-xs font-semibold space-x-2">
        
        {/* Left: Invoice Number & Customer Info (Single Row) */}
        <div className="flex items-center space-x-2.5 whitespace-nowrap">
          <div className="flex items-center space-x-1 bg-white px-2 py-0.5 rounded border border-slate-200 font-mono text-[11px] text-slate-800 shadow-2xs">
            <span className="text-slate-400 font-sans font-medium">No.</span>
            <span className="font-bold text-slate-900 tracking-wide">{invoiceNumber || 'INV-000044'}</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 font-medium">To:</span>
            <span className="font-bold text-slate-800 truncate max-w-[120px]">
              {customer ? customer.name : 'General Customer'}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onAssignCustomer}
              className="h-6 text-[11px] font-bold text-blue-600 hover:bg-blue-50 rounded px-1.5 py-0 cursor-pointer"
            >
              <UserPlus className="w-3 h-3 mr-0.5" />
              {customer ? 'Change' : 'Assign'}
            </Button>
          </div>
        </div>

        {/* Center: Sales Invoice Header & Type */}
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <div className="flex items-center space-x-1 font-black text-slate-800 uppercase tracking-wider text-xs">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>SALES INVOICE</span>
          </div>
          <span className="px-2 py-0.2 bg-blue-50 text-blue-700 rounded font-extrabold uppercase text-[10px] border border-blue-100">
            {saleType}
          </span>
        </div>

        {/* Right: Date Badge */}
        <div className="flex items-center space-x-1 text-[11px] text-slate-600 whitespace-nowrap bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
          <Calendar className="w-3 h-3 text-slate-400" />
          <span className="text-slate-400 font-sans">Date:</span>
          <span className="font-bold text-slate-800 font-mono">{currentDate}</span>
        </div>

      </div>
    </div>
  );
};





