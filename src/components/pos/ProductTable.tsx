import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import type { CartItem } from '@/types/pos';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductTableProps {
  items: CartItem[];
  selectedItemId?: string | null;
  onSelectItem?: (id: string) => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ 
  items, 
  selectedItemId,
  onSelectItem,
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col h-full bg-white relative select-none">
      <table className="w-full text-xs text-left border-collapse">
        <thead className="text-[11px] text-slate-500 font-extrabold sticky top-0 z-10 bg-slate-50/95 backdrop-blur-xs border-b border-slate-200 uppercase tracking-wider">
          <tr>
            <th className="px-4 py-2.5 w-16 text-slate-500">ID</th>
            <th className="px-4 py-2.5 text-slate-500">Item Description</th>
            <th className="px-4 py-2.5 w-16 text-center text-slate-500">Unit</th>
            <th className="px-4 py-2.5 w-28 text-center text-slate-500">Quantity</th>
            <th className="px-4 py-2.5 w-24 text-right text-slate-500">Rate (SAR)</th>
            <th className="px-4 py-2.5 w-28 text-right text-slate-500">Total (SAR)</th>
            <th className="px-4 py-2.5 w-10 text-center"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <AnimatePresence initial={false}>
            {items.length === 0 ? (
              <motion.tr 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <td colSpan={7} className="px-4 py-24 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-2.5 shadow-inner">
                      <ShoppingBag className="w-6 h-6 text-slate-300" />
                    </div>
                    <p className="text-sm font-bold text-slate-500">Cart is empty</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Scan barcode or tap quick favorites to add items</p>
                  </div>
                </td>
              </motion.tr>
            ) : (
              items.map((item) => {
                const isSelected = selectedItemId === item.id;
                return (
                  <motion.tr 
                    key={item.id} 
                    onClick={() => onSelectItem?.(item.id)}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -15, transition: { duration: 0.15 } }}
                    className={`transition-colors cursor-pointer text-slate-800 font-semibold group ${
                      isSelected 
                        ? 'bg-blue-50/90 border-l-4 border-l-blue-600 shadow-2xs' 
                        : 'bg-white hover:bg-slate-50/90'
                    }`}
                  >
                  <td className="px-4 py-2.5 text-slate-400 font-mono text-[11px]">{item.product.id}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-800 text-xs uppercase tracking-tight truncate max-w-[260px] group-hover:text-blue-600 transition-colors">
                        {item.product.name}
                      </span>
                      {item.product.category && (
                        <span className="inline-block px-1.5 py-0.2 bg-blue-50 text-blue-600 rounded text-[9px] font-extrabold uppercase tracking-wider shrink-0 border border-blue-100/60">
                          {item.product.category}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-center text-slate-400 font-medium text-[11px]">Piece</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center justify-between bg-slate-50 rounded-lg border border-slate-200/80 p-0.5 w-24 mx-auto shadow-2xs">
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 bg-white shadow-2xs rounded border border-slate-200 text-slate-600 hover:bg-slate-100 p-0"
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </Button>
                      <input 
                        type="number"
                        min="1"
                        className="w-8 text-center border-none shadow-none font-extrabold text-xs p-0 bg-transparent text-slate-800 focus:outline-none font-mono" 
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val > 0) onUpdateQuantity(item.id, val);
                        }}
                      />
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="w-6 h-6 bg-white shadow-2xs rounded border border-slate-200 text-slate-600 hover:bg-slate-100 p-0"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-right text-slate-600 font-mono text-xs font-semibold">
                    {item.rate.toFixed(2)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-black text-slate-900 font-mono text-xs">
                    {item.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-2.5 text-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-400 hover:text-red-600 hover:bg-red-50 h-7 w-7 rounded-md transition-all p-0"
                      onClick={() => onRemoveItem(item.id)}
                      title="Remove Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </motion.tr>
              );
            })
          )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};






