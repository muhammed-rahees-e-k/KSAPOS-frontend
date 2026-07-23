import React from 'react';
import { X, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keys: string[];
  description: string;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const shortcuts: ShortcutItem[] = [
    { keys: ['F9'], description: 'Pay — open the tender screen' },
    { keys: ['F10'], description: 'Fast-save — exact cash, then print' },
    { keys: ['F8'], description: 'Price check' },
    { keys: ['F4'], description: 'Quick-create a product' },
    { keys: ['Enter'], description: 'Qty → Price → add the line' },
    { keys: ['Esc'], description: 'Cancel / exit the current mode' },
    { keys: ['N', '×'], description: 'Quantity multiplier — type a number, ×, then scan' },
    { keys: ['F3'], description: 'Focus barcode scan or item search bar' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-4 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center border border-cyan-500/30">
                <Keyboard className="w-4.5 h-4.5 text-cyan-400" />
              </div>
              <h3 className="font-extrabold text-xl tracking-wide text-white">Keyboard shortcuts</h3>
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

          {/* Shortcuts List Content */}
          <div className="p-6 space-y-3.5 max-h-[70vh] overflow-y-auto">
            {shortcuts.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 p-3 rounded-xl border border-slate-200/80 transition-colors"
              >
                {/* Keys Badges */}
                <div className="flex items-center space-x-1.5 shrink-0">
                  {item.keys.map((k, keyIdx) => (
                    <kbd
                      key={keyIdx}
                      className="px-2.5 py-1 bg-white border border-slate-300/90 rounded-md font-mono text-xs font-extrabold text-slate-800 shadow-2xs"
                    >
                      {k}
                    </kbd>
                  ))}
                </div>

                {/* Description */}
                <span className="text-xs font-semibold text-slate-700 text-right ml-4">
                  {item.description}
                </span>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-center">
            <p className="text-[11px] text-slate-400 font-medium">
              Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono font-bold text-slate-700">Esc</kbd> anytime to close dialogs.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
