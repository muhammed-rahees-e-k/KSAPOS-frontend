
import React from 'react';
import { Delete } from 'lucide-react';
import { motion } from 'framer-motion';

interface NumericKeypadProps {
  onKeyPress: (key: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  darkTheme?: boolean;
  isCompact?: boolean;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({ 
  onKeyPress, 
  onBackspace,
  darkTheme = true,
  isCompact = false,
}) => {
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];

  const buttonHeight = isCompact 
    ? 'h-7 sm:h-7.5 md:h-8 xl:h-8.5 text-sm sm:text-base xl:text-lg' 
    : 'h-8 sm:h-9 md:h-9.5 xl:h-10.5 2xl:h-11 text-base sm:text-lg xl:text-xl 2xl:text-2xl';

  return (
    <div className="grid grid-cols-3 gap-1 select-none">
      {keys.map((key) => (
        <motion.button
          key={key}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.94 }}
          type="button"
          className={`w-full ${buttonHeight} font-extrabold rounded-lg shadow-xs cursor-pointer flex items-center justify-center transition-all ${
            darkTheme
              ? 'bg-[#475569] hover:bg-[#64748B] text-white border border-[#64748B]/50'
              : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/80'
          }`}
          onClick={() => onKeyPress(key)}
        >
          {key}
        </motion.button>
      ))}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.94 }}
        type="button"
        className={`w-full ${buttonHeight} rounded-lg shadow-xs cursor-pointer flex items-center justify-center transition-all ${
          darkTheme
            ? 'bg-[#7F1D1D] hover:bg-[#991B1B] text-white border border-red-900/60'
            : 'bg-red-50/80 hover:bg-red-100 text-red-600 border border-red-200/60'
        }`}
        onClick={onBackspace}
        title="Backspace"
      >
        <Delete className={isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4 sm:w-5 sm:h-5'} />
      </motion.button>
    </div>
  );
};




