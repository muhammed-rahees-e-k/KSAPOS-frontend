import React, { useState } from 'react';
import { LogOut, Store, Monitor, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface OpenShiftModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onOpenShift: (shiftData: { branch: string; terminal: string; openingCash: number }) => void;
  onSignOut?: () => void;
}

export const OpenShiftModal: React.FC<OpenShiftModalProps> = ({
  isOpen,
  onOpenShift,
  onSignOut,
}) => {
  const [branch, setBranch] = useState('HQ — HQ');
  const [terminal, setTerminal] = useState('POS-01 — POS 1');
  const [openingCashInput, setOpeningCashInput] = useState('0.00');

  const handleStartShift = () => {
    const openingCash = parseFloat(openingCashInput) || 0.00;
    onOpenShift({
      branch,
      terminal,
      openingCash,
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white border border-slate-200 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header Bar */}
          <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
            <h3 className="font-extrabold text-2xl tracking-wide text-white">Open Shift</h3>
            
            <button
              type="button"
              onClick={onSignOut}
              className="text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors flex items-center space-x-1 cursor-pointer"
            >
              <span>Sign Out</span>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-5">
            {/* Branch Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1">
                <Store className="w-3.5 h-3.5 text-blue-600" />
                <span>Branch <span className="text-red-500">*</span></span>
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full h-11 bg-slate-50 border border-slate-300 text-slate-900 font-semibold rounded-xl text-sm px-3.5 focus:bg-white focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer"
              >
                <option value="HQ — HQ">HQ — HQ</option>
                <option value="JED — Jeddah Store">JED — Jeddah Store</option>
                <option value="RIY — Riyadh Store">RIY — Riyadh Store</option>
                <option value="DMM — Dammam Store">DMM — Dammam Store</option>
              </select>
            </div>

            {/* Terminal Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1">
                <Monitor className="w-3.5 h-3.5 text-blue-600" />
                <span>Terminal <span className="text-red-500">*</span></span>
              </label>
              <select
                value={terminal}
                onChange={(e) => setTerminal(e.target.value)}
                className="w-full h-11 bg-slate-50 border border-slate-300 text-slate-900 font-semibold rounded-xl text-sm px-3.5 focus:bg-white focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer"
              >
                <option value="POS-01 — POS 1">POS-01 — POS 1</option>
                <option value="POS-02 — POS 2">POS-02 — POS 2</option>
                <option value="POS-03 — POS Express">POS-03 — POS Express</option>
              </select>
            </div>

            {/* Opening Cash (SAR) Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Opening Cash (SAR)</span>
              </label>
              <Input
                type="number"
                step="0.01"
                value={openingCashInput}
                onChange={(e) => setOpeningCashInput(e.target.value)}
                placeholder="0.00"
                className="h-11 bg-slate-50 border-slate-300 text-slate-900 font-mono font-extrabold text-base pl-4 focus:bg-white rounded-xl shadow-inner"
              />
            </div>

            {/* Open Shift Action Button */}
            <div className="pt-2">
              <Button
                onClick={handleStartShift}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base rounded-xl shadow-lg shadow-blue-500/25 cursor-pointer active:scale-98 transition-all border-0"
              >
                Open Shift
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
