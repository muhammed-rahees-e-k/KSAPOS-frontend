import React from 'react';
import type { Product } from '@/types/pos';
import { Heart, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

interface FavoritesProps {
  favorites: Product[];
  onAddProduct: (product: Product) => void;
}

export const Favorites: React.FC<FavoritesProps> = ({ favorites, onAddProduct }) => {
  return (
    <div className="p-4 lg:p-5 bg-slate-50/50">
      <div className="flex items-center mb-4 px-1">
        <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center mr-3 shadow-sm">
          <Heart className="w-4 h-4 text-blue-600 fill-blue-500" />
        </div>
        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Favorites</h3>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
        {favorites.map((product) => (
          <motion.button
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            key={product.id}
            onClick={() => onAddProduct(product)}
            className="flex flex-col items-start p-3 lg:p-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-blue-500 hover:shadow-[0_8px_20px_rgb(59,130,246,0.2)] transition-all text-left shadow-md group relative overflow-hidden h-24 justify-between"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-colors pointer-events-none" />
            
            <span className="text-xs lg:text-sm font-bold text-white line-clamp-2 leading-tight z-10">{product.name}</span>
            <div className="flex justify-between items-end w-full z-10 mt-2">
              <span className="text-[10px] text-slate-400 font-medium">{product.id}</span>
              <span className="text-xs font-black text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded-md flex items-center">
                <Tag className="w-3 h-3 mr-1 opacity-70" />
                {product.price.toFixed(2)}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};


