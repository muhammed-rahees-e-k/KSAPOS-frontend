import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import type { CartItem } from '@/types/pos';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductTableProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  return (
    <div className="flex-1 overflow-x-auto flex flex-col h-full bg-white relative">
      <table className="w-full min-w-[600px] text-sm text-left">
        <thead className="text-[11px] text-slate-400 font-bold sticky top-0 z-10 bg-slate-50 border-b border-slate-100 uppercase tracking-widest">
          <tr>
            <th className="px-5 py-4 w-16">ID</th>
            <th className="px-5 py-4">Item</th>
            <th className="px-5 py-4 w-20 text-center">Unit</th>
            <th className="px-5 py-4 w-32 text-center">Qty</th>
            <th className="px-5 py-4 w-24 text-right">Rate</th>
            <th className="px-5 py-4 w-28 text-right">Total</th>
            <th className="px-5 py-4 w-12 text-center"></th>
          </tr>
        </thead>
        <tbody className="overflow-y-auto">
          <AnimatePresence initial={false}>
            {items.length === 0 ? (
              <motion.tr 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <td colSpan={7} className="px-4 py-32 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 shadow-inner">
                      <Trash2 className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="text-xl font-bold text-slate-400 tracking-tight">Cart is empty</p>
                    <p className="text-sm mt-1 text-slate-400/80">Tap items from favorites to add</p>
                  </div>
                </td>
              </motion.tr>
            ) : (
              items.map((item) => (
                <motion.tr 
                  key={item.id} 
                  initial={{ opacity: 0, y: -10, backgroundColor: 'rgba(239, 246, 255, 0.5)' }}
                  animate={{ opacity: 1, y: 0, backgroundColor: 'rgba(255, 255, 255, 1)' }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.2 }}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors group text-slate-700 font-semibold"
                >
                  <td className="px-5 py-4 text-slate-400 font-medium text-xs">{item.product.id}</td>
                  <td className="px-5 py-4">
                    <p className="leading-tight mb-1 text-slate-800 font-bold">{item.product.name}</p>
                    {item.product.category && (
                      <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-black uppercase tracking-widest">
                        {item.product.category}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center text-slate-400 font-medium text-xs">Piece</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-between bg-slate-50 rounded-xl border border-slate-200/60 p-1 w-28 mx-auto shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 bg-white shadow-sm rounded-lg"
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </Button>
                      <input 
                        className="w-8 text-center border-none shadow-none font-bold text-sm p-0 bg-transparent text-slate-800 focus:outline-none" 
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val > 0) onUpdateQuantity(item.id, val);
                        }}
                      />
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="w-7 h-7 bg-white shadow-sm rounded-lg"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right text-slate-500 font-medium">{item.rate.toFixed(2)}</td>
                  <td className="px-5 py-4 text-right font-black text-slate-800 text-base">
                    {item.total.toFixed(2)}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 rounded-lg transition-all hover:scale-110"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};



