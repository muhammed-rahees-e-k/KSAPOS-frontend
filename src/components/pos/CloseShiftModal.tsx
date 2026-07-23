import React, { useState } from 'react';
import { Clock, X, CheckCircle2, AlertTriangle, Printer, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface CloseShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  cashSalesTotal?: number;
  onConfirmCloseShift?: (summaryData: any) => void;
}

export const CloseShiftModal: React.FC<CloseShiftModalProps> = ({
  isOpen,
  onClose,
  cashSalesTotal = 9524.72,
  onConfirmCloseShift,
}) => {
  const openingFloat = 0.00;
  const expectedCash = openingFloat + cashSalesTotal;

  const [countedCashInput, setCountedCashInput] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const countedCash = parseFloat(countedCashInput) || 0.00;
  const variance = countedCash - expectedCash;

  const handleConfirmClose = () => {
    setIsSuccess(true);
    if (onConfirmCloseShift) {
      onConfirmCloseShift({
        openingFloat,
        cashSales: cashSalesTotal,
        expectedCash,
        countedCash,
        variance,
      });
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setCountedCashInput('');
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
          <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/30">
                <Clock className="w-4.5 h-4.5 text-red-400" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg tracking-wide text-white">Close Shift</h3>
                <p className="text-[11px] text-slate-400 font-mono">Drawer Reconciliation & Z-Report</p>
              </div>
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

          {/* Modal Content */}
          <div className="p-5 space-y-4">
            {isSuccess ? (
              /* Success Shift Summary State */
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-slate-900">Shift Closed Successfully!</h4>
                  <p className="text-xs text-slate-500 mt-1 font-mono">Z-Report #ZR-2026-0042 Generated</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs font-mono text-left max-w-xs mx-auto">
                  <div className="flex justify-between text-slate-600">
                    <span>Expected Cash:</span>
                    <span className="font-bold text-slate-900">SAR {expectedCash.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Counted Cash:</span>
                    <span className="font-bold text-slate-900">SAR {countedCash.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 font-bold">
                    <span>Variance:</span>
                    <span className={variance < 0 ? 'text-red-600 font-extrabold' : 'text-emerald-600 font-extrabold'}>
                      SAR {variance.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button
                    onClick={() => alert('Z-Report printing...')}
                    className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                  >
                    <Printer className="w-4 h-4 mr-1.5" /> Print Z-Report
                  </Button>
                  <Button
                    onClick={handleReset}
                    className="flex-1 h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-1.5" /> Exit Shift
                  </Button>
                </div>
              </div>
            ) : (
              /* Close Shift Reconciliation Form */
              <>
                {/* Summary Card Box */}
                <div className="bg-slate-900 text-white p-4 rounded-xl space-y-2.5 font-mono shadow-md border border-slate-800">
                  <div className="flex justify-between items-center text-xs text-slate-300">
                    <span>Opening float</span>
                    <span className="font-bold text-white">{openingFloat.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-300">
                    <span>Cash sales</span>
                    <span className="font-bold text-white">{cashSalesTotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-800">
                    <span className="font-bold text-amber-400">Expected cash</span>
                    <span className="font-black text-amber-400 text-base">{expectedCash.toFixed(2)}</span>
                  </div>
                </div>

                {/* Counted Cash Input Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Counted cash (SAR)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    value={countedCashInput}
                    onChange={(e) => setCountedCashInput(e.target.value)}
                    placeholder="0.00"
                    className="h-12 bg-slate-50 border-slate-300 text-slate-900 font-mono font-black text-xl text-left pl-4 focus:bg-white rounded-xl shadow-inner"
                  />
                </div>

                {/* Variance Display */}
                <div className="flex items-center justify-between px-1 py-1 font-mono text-sm">
                  <span className="font-bold text-slate-600">Variance:</span>
                  <span className={`font-black text-base ${
                    variance < 0 
                      ? 'text-red-600' 
                      : variance > 0 
                        ? 'text-emerald-600' 
                        : 'text-slate-800'
                  }`}>
                    {variance.toFixed(2)}
                  </span>
                </div>

                {/* Warning Alert if Negative Variance */}
                {variance < 0 && countedCashInput !== '' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-2.5 rounded-xl text-xs flex items-center space-x-2 font-medium">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>Warning: Cash shortage of SAR {Math.abs(variance).toFixed(2)} detected.</span>
                  </div>
                )}

                {/* Action Buttons: Confirm Close & Cancel */}
                <div className="space-y-2 pt-2">
                  <Button
                    onClick={handleConfirmClose}
                    className="w-full h-12 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-base rounded-xl shadow-lg shadow-red-500/25 cursor-pointer border-0 active:scale-98 transition-all"
                  >
                    Confirm Close
                  </Button>

                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="w-full h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl border border-slate-200 cursor-pointer transition-all"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
