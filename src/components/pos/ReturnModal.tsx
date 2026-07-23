import React, { useState } from 'react';
import { RotateCcw, Search, X, CheckCircle2, ArrowRight, CreditCard, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';

interface ReturnModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProcessRefund?: (refundData: any) => void;
}

interface MockInvoiceItem {
  id: string;
  name: string;
  rate: number;
  maxQty: number;
  returnQty: number;
}

export const ReturnModal: React.FC<ReturnModalProps> = ({
  isOpen,
  onClose,
  onProcessRefund,
}) => {
  const [receiptNumber, setReceiptNumber] = useState('INV-000044');
  const [hasLookedUp, setHasLookedUp] = useState(false);
  const [returnReason, setReturnReason] = useState('Defective / Damaged');
  const [refundMethod, setRefundMethod] = useState<'CASH' | 'CARD'>('CASH');
  const [isSuccess, setIsSuccess] = useState(false);

  const [invoiceItems, setInvoiceItems] = useState<MockInvoiceItem[]>([
    { id: '32383', name: 'ALMARAI HALLOUMI CHEESE FF 225G', rate: 14.35, maxQty: 2, returnQty: 1 },
    { id: '32384', name: 'MEMORIES VANILACREAM', rate: 5.50, maxQty: 1, returnQty: 0 },
  ]);

  const handleLookup = () => {
    if (!receiptNumber.trim()) return;
    setHasLookedUp(true);
    setIsSuccess(false);
  };

  const handleQtyChange = (id: string, delta: number) => {
    setInvoiceItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(0, Math.min(item.maxQty, item.returnQty + delta));
          return { ...item, returnQty: newQty };
        }
        return item;
      })
    );
  };

  const subtotalRefund = invoiceItems.reduce((sum, item) => sum + item.rate * item.returnQty, 0);
  const vatRefund = subtotalRefund * 0.15;
  const totalRefund = subtotalRefund + vatRefund;

  const handleConfirmRefund = () => {
    if (totalRefund <= 0) return;
    setIsSuccess(true);
    if (onProcessRefund) {
      onProcessRefund({
        receiptNumber,
        totalRefund,
        refundMethod,
        reason: returnReason,
      });
    }
  };

  const handleReset = () => {
    setHasLookedUp(false);
    setIsSuccess(false);
    setReceiptNumber('INV-000044');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center border border-amber-500/30">
                <RotateCcw className="w-4.5 h-4.5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-extrabold text-base tracking-wide">Return / Refund Item</h3>
                <p className="text-[11px] text-slate-400 font-mono">Process order returns & issue refunds</p>
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

          {/* Modal Body */}
          <div className="p-5 space-y-4">
            {isSuccess ? (
              /* Success State */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-xs">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="text-xl font-extrabold text-slate-900">Refund Processed!</h4>
                  <p className="text-xs text-slate-500 mt-1 font-mono">Receipt: {receiptNumber}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-sm font-mono max-w-xs mx-auto">
                  <div className="flex justify-between text-slate-600">
                    <span>Refund Amount:</span>
                    <span className="font-extrabold text-emerald-600">SAR {totalRefund.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Refund Method:</span>
                    <span className="font-bold text-blue-600">{refundMethod}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 text-xs pt-1 border-t border-slate-200">
                    <span>Reason:</span>
                    <span className="font-semibold text-slate-700">{returnReason}</span>
                  </div>
                </div>

                <Button
                  onClick={handleReset}
                  className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm cursor-pointer mt-2"
                >
                  Done
                </Button>
              </div>
            ) : (
              /* Search & Return Selection Form */
              <>
                {/* Search Row */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Original Receipt / Invoice Number
                  </label>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Input
                        value={receiptNumber}
                        onChange={(e) => setReceiptNumber(e.target.value)}
                        placeholder="e.g. INV-000044"
                        className="h-10 bg-slate-50 border-slate-200 text-slate-900 font-mono font-semibold rounded-xl text-sm pl-3 pr-8 focus:bg-white"
                      />
                      <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <Button
                      onClick={handleLookup}
                      className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                    >
                      Look Up
                    </Button>
                  </div>

                  {/* Demo Quick Select Pills */}
                  <div className="flex items-center space-x-2 pt-1">
                    <span className="text-[10px] text-slate-400 font-medium">Quick Demo:</span>
                    {['INV-000044', 'INV-000043'].map((inv) => (
                      <button
                        key={inv}
                        type="button"
                        onClick={() => {
                          setReceiptNumber(inv);
                          setHasLookedUp(true);
                        }}
                        className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2 py-0.5 rounded cursor-pointer transition-colors"
                      >
                        {inv}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Found Invoice Items List */}
                {hasLookedUp && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 pt-2 border-t border-slate-200/80"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                      <span>Select Items to Return:</span>
                      <span className="text-slate-400 font-mono">Invoice Date: 23-07-2026</span>
                    </div>

                    {/* Items List */}
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {invoiceItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs"
                        >
                          <div className="flex-1 pr-2">
                            <p className="font-bold text-slate-800 uppercase line-clamp-1">{item.name}</p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                              SAR {item.rate.toFixed(2)} / unit
                            </p>
                          </div>

                          {/* Return Qty Counter */}
                          <div className="flex items-center space-x-2 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => handleQtyChange(item.id, -1)}
                              className="w-5 h-5 bg-slate-100 hover:bg-slate-200 rounded font-bold text-slate-700 flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-mono font-extrabold text-slate-900 w-4 text-center">
                              {item.returnQty}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQtyChange(item.id, 1)}
                              className="w-5 h-5 bg-slate-100 hover:bg-slate-200 rounded font-bold text-slate-700 flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reason for Return */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Reason for Return</label>
                      <select
                        value={returnReason}
                        onChange={(e) => setReturnReason(e.target.value)}
                        className="w-full h-9 bg-slate-50 border border-slate-200 text-slate-800 rounded-lg text-xs font-medium px-2.5 focus:outline-none"
                      >
                        <option value="Defective / Damaged">Defective / Damaged Item</option>
                        <option value="Customer Changed Mind">Customer Changed Mind</option>
                        <option value="Wrong Item Purchased">Wrong Item Purchased</option>
                        <option value="Expired Product">Expired Product</option>
                      </select>
                    </div>

                    {/* Refund Payment Method */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Refund Method</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setRefundMethod('CASH')}
                          className={`h-9 rounded-lg border text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer transition-all ${
                            refundMethod === 'CASH'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-2xs'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <DollarSign className="w-3.5 h-3.5" />
                          <span>Cash Refund</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setRefundMethod('CARD')}
                          className={`h-9 rounded-lg border text-xs font-bold flex items-center justify-center space-x-1.5 cursor-pointer transition-all ${
                            refundMethod === 'CARD'
                              ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-2xs'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Card Refund</span>
                        </button>
                      </div>
                    </div>

                    {/* Refund Summary & Action */}
                    <div className="bg-slate-900 text-white p-3.5 rounded-xl flex items-center justify-between shadow-md">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                          Total Refund
                        </span>
                        <p className="text-xl font-black text-emerald-400 font-mono">
                          SAR {totalRefund.toFixed(2)}
                        </p>
                      </div>

                      <Button
                        disabled={totalRefund <= 0}
                        onClick={handleConfirmRefund}
                        className="h-10 px-5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs rounded-lg shadow-md cursor-pointer disabled:opacity-50"
                      >
                        <span>Process Refund</span>
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
