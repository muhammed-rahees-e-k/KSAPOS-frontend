import React, { useState } from 'react';
import { PlusCircle, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/types/pos';

interface QuickProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct?: (product: Product) => void;
}

export const QuickProductModal: React.FC<QuickProductModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [barcode, setBarcode] = useState('');
  const [category, setCategory] = useState('General');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price.trim()) return;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      price: parseFloat(price) || 0,
      category,
      barcode: barcode.trim() || `BC-${Date.now().toString().slice(-6)}`,
    };

    setIsSuccess(true);
    if (onAddProduct) {
      onAddProduct(newProduct);
    }
  };

  const handleReset = () => {
    setName('');
    setPrice('');
    setBarcode('');
    setIsSuccess(false);
    onClose();
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
              <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-500/30">
                <PlusCircle className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <h3 className="font-extrabold text-xl tracking-wide text-white">Quick Add Product [F4]</h3>
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

          {/* Form */}
          <div className="p-6 space-y-4">
            {isSuccess ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-extrabold text-slate-900">Product Added & Scanned to Cart!</h4>
                <Button
                  onClick={handleReset}
                  className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm cursor-pointer"
                >
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Product Name *</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Fresh Orange Juice 500ml"
                    required
                    className="h-10 bg-slate-50 border-slate-300 text-slate-900 font-semibold text-sm rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">Price (SAR) *</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      required
                      className="h-10 bg-slate-50 border-slate-300 text-slate-900 font-mono font-bold text-sm rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-10 bg-slate-50 border border-slate-300 text-slate-900 font-semibold rounded-xl text-xs px-2.5 focus:outline-none"
                    >
                      <option value="General">General</option>
                      <option value="Dairy">Dairy</option>
                      <option value="Beverages">Beverages</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Bakery">Bakery</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Barcode (Optional)</label>
                  <Input
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    placeholder="Auto-generated if empty"
                    className="h-10 bg-slate-50 border-slate-300 text-slate-900 font-mono text-xs rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md cursor-pointer mt-2"
                >
                  Save & Add to Cart
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
