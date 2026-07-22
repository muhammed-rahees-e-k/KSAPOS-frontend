
import React from 'react';
import { Delete } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface NumericKeypadProps {
  onKeyPress: (key: string) => void;
  onClear: () => void;
  onBackspace: () => void;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({ onKeyPress, onBackspace }) => {
  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];

  return (
    <div className="grid grid-cols-3 gap-2 lg:gap-3">
      {keys.map((key) => (
        <motion.div key={key} whileTap={{ scale: 0.94 }}>
          <Button
            variant="outline"
            className="w-full h-16 text-[1.75rem] font-black bg-white hover:bg-slate-50 text-slate-800 border-0 shadow-[0_4px_0_rgb(226,232,240)] hover:translate-y-[2px] hover:shadow-[0_2px_0_rgb(226,232,240)] active:translate-y-[4px] active:shadow-none rounded-xl lg:rounded-2xl transition-all"
            onClick={() => onKeyPress(key)}
          >
            {key}
          </Button>
        </motion.div>
      ))}
      <motion.div whileTap={{ scale: 0.94 }}>
        <Button
          variant="destructive"
          className="w-full h-16 bg-red-50 hover:bg-red-100 text-red-500 border-0 shadow-[0_4px_0_rgb(254,202,202)] hover:translate-y-[2px] hover:shadow-[0_2px_0_rgb(254,202,202)] active:translate-y-[4px] active:shadow-none rounded-xl lg:rounded-2xl transition-all"
          onClick={onBackspace}
        >
          <Delete className="w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  );
};


