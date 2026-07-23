import React, { useState } from 'react';
import { X, Tag, Barcode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface PriceCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PriceCheckModal: React.FC<PriceCheckModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [searchedProduct, setSearchedProduct] = useState<{
    name: string;
    price: number;
    vat: number;
    total: number;
    barcode: string;
    category: string;
    stock: number;
  } | null>({
    name: 'ALMARAI HALLOUMI CHEESE FF 225G',
    price: 14.35,
    vat: 2.15,
    total: 16.50,
    barcode: '32383',
    category: 'Dairy',
    stock: 48,
  });

  const handleSearch = () => {
    if (!query.trim()) return;
    // Simple demo lookup
    setSearchedProduct({
      name: query.toUpperCase(),
      price: 12.50,
      vat: 1.88,
      total: 14.38,
      barcode: '9940284',
      category: 'General',
      stock: 24,
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white border border-slate-200 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                <Tag className="w-4.5 h-4.5 text-blue-400" />
              </div>
              <h3 className="font-extrabold text-xl tracking-wide text-white">Price Check [F8]</h3>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Scan Barcode or Search Product
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Scan item or type barcode..."
                    className="h-11 bg-slate-50 border-slate-300 text-slate-900 font-mono text-sm pl-4 pr-9 focus:bg-white rounded-xl"
                  />
                  <Barcode className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
                <Button
                  onClick={handleSearch}
                  className="h-11 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                >
                  Check
                </Button>
              </div>
            </div>

            {searchedProduct && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-mono uppercase">
                    {searchedProduct.category}
                  </span>
                  <h4 className="text-base font-black text-slate-900 mt-1 uppercase leading-tight">
                    {searchedProduct.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">Barcode: {searchedProduct.barcode}</p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200/80 text-center font-mono">
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-sans uppercase font-bold">Base Price</span>
                    <p className="text-sm font-bold text-slate-800">SAR {searchedProduct.price.toFixed(2)}</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-400 font-sans uppercase font-bold">15% VAT</span>
                    <p className="text-sm font-bold text-slate-800">SAR {searchedProduct.vat.toFixed(2)}</p>
                  </div>
                  <div className="bg-slate-900 text-white p-2 rounded-lg shadow-xs">
                    <span className="text-[10px] text-slate-400 font-sans uppercase font-bold">Total Incl. VAT</span>
                    <p className="text-sm font-black text-emerald-400">SAR {searchedProduct.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
