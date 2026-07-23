import React, { useState, useRef } from 'react';
import type { Product } from '@/types/pos';
import { Star, Tag, ChevronDown, ChevronUp, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FavoritesProps {
  favorites: Product[];
  onAddProduct: (product: Product) => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ favorites, onAddProduct }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50/90 border-t border-slate-200/80 select-none px-4 py-1.5 transition-all shrink-0">
      {/* Header Bar with Collapse Toggle */}
      <div className="flex items-center justify-between">
        <div 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 cursor-pointer group py-0.5"
        >
          <div className="w-4 h-4 bg-amber-100 rounded flex items-center justify-center shadow-2xs group-hover:bg-amber-200 transition-colors">
            <Star className="w-2.5 h-2.5 text-amber-600 fill-amber-500" />
          </div>
          <h3 className="text-[11px] font-black text-slate-700 uppercase tracking-wider group-hover:text-slate-900">
            Quick Favorites
          </h3>
          <span className="bg-slate-200 text-slate-700 text-[9px] font-bold px-1.5 py-0.1 rounded-full font-mono">
            {favorites.length}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Scroll Navigation Buttons (Visible when expanded) */}
          {isExpanded && (
            <div className="flex items-center space-x-1 border-r border-slate-200 pr-2">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-5 h-5 bg-white hover:bg-slate-200 text-slate-600 rounded flex items-center justify-center border border-slate-200 shadow-2xs cursor-pointer transition-colors"
                title="Scroll Left"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-5 h-5 bg-white hover:bg-slate-200 text-slate-600 rounded flex items-center justify-center border border-slate-200 shadow-2xs cursor-pointer transition-colors"
                title="Scroll Right"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Toggle Expand/Hide */}
          <button 
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center space-x-1 font-semibold cursor-pointer px-1.5 py-0.5 rounded hover:bg-slate-200/70 transition-colors"
          >
            <span>{isExpanded ? 'Hide' : 'Quick Add +'}</span>
            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Horizontal Strip for Favorites (Hidden Native Scrollbar) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2 pb-1"
          >
            <div 
              ref={scrollContainerRef}
              className="flex items-center space-x-2.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-0.5 py-0.5"
            >
              {favorites.map((product) => (
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  key={product.id}
                  onClick={() => onAddProduct(product)}
                  className="flex items-center space-x-2.5 px-3 py-1.5 bg-white hover:bg-blue-50/70 rounded-xl border border-slate-200/90 hover:border-blue-400 shadow-2xs hover:shadow-xs transition-all text-left cursor-pointer shrink-0 group"
                >
                  <div className="w-5 h-5 bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white rounded-full flex items-center justify-center transition-colors">
                    <Plus className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-blue-700 whitespace-nowrap uppercase tracking-tight">
                    {product.name}
                  </span>
                  <span className="text-[11px] font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100/80 flex items-center font-mono shadow-2xs">
                    <Tag className="w-2.5 h-2.5 mr-1 opacity-70" />
                    {product.price.toFixed(2)}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};








