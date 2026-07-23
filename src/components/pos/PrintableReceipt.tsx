import React from 'react';
import type { CartItem } from '@/types/pos';

interface PrintableReceiptProps {
  invoiceNumber?: string;
  cart: CartItem[];
  subtotal: number;
  vat: number;
  total: number;
  paymentMethod: string;
  cashTendered?: string;
}

export const PrintableReceipt: React.FC<PrintableReceiptProps> = ({
  invoiceNumber = 'INV-000045',
  cart,
  subtotal,
  vat,
  total,
  paymentMethod,
  cashTendered,
}) => {
  const currentDate = new Date().toLocaleDateString('ar-SA-u-ca-gregory', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div id="printable-receipt" className="hidden print:block text-black bg-white font-mono text-xs p-4 w-[80mm] mx-auto leading-tight">
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-receipt, #printable-receipt * {
            visibility: visible !important;
          }
          #printable-receipt {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 80mm !important;
            margin: 0 !important;
            padding: 8mm !important;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="text-center space-y-1 mb-3">
        <h1 className="text-base font-black tracking-widest uppercase">KSAPOS</h1>
        <p className="text-xs font-bold">فاتورة ضريبية مبسطة</p>
        <p className="text-[10px] text-gray-600 uppercase tracking-wider">Simplified Tax Invoice</p>
      </div>

      <div className="border-b border-dashed border-gray-400 my-2" />

      {/* Receipt Details */}
      <div className="space-y-1 text-[11px] mb-2">
        <div className="flex justify-between">
          <span>Receipt No:</span>
          <span className="font-bold">{invoiceNumber}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Date / التاريخ:</span>
          <span>{currentDate}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>Time / الوقت:</span>
          <span>{currentTime}</span>
        </div>
      </div>

      <div className="border-b border-dashed border-gray-400 my-2" />

      {/* Cart Items Table */}
      <div className="space-y-2 mb-3 text-[11px]">
        {cart.length === 0 ? (
          <div className="flex justify-between">
            <div>
              <p className="font-bold">SWISS ROLL CHOC</p>
              <p className="text-[10px] text-gray-600">1 x 15.00</p>
            </div>
            <span className="font-bold">15.00</span>
          </div>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <div>
                <p className="font-bold uppercase">{item.product.name}</p>
                <p className="text-[10px] text-gray-600">{item.quantity} x {item.rate.toFixed(2)}</p>
              </div>
              <span className="font-bold">{item.total.toFixed(2)}</span>
            </div>
          ))
        )}
      </div>

      <div className="border-b border-dashed border-gray-400 my-2" />

      {/* Totals Breakdown */}
      <div className="space-y-1 text-[11px]">
        <div className="flex justify-between text-gray-700">
          <span>Subtotal / المجموع الفرعي:</span>
          <span>{(total > 0 ? subtotal : 13.04).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-700">
          <span>VAT 15% / ضريبة القيمة المضافة:</span>
          <span>{(total > 0 ? vat : 1.96).toFixed(2)}</span>
        </div>
        
        <div className="border-b border-gray-300 my-1" />

        <div className="flex justify-between font-extrabold text-xs pt-0.5">
          <span>Total / الإجمالي:</span>
          <span>{(total > 0 ? total : 15.00).toFixed(2)} ر.س</span>
        </div>

        <div className="flex justify-between text-gray-700 pt-1">
          <span>{paymentMethod || 'Cash'} / نقداً:</span>
          <span>{cashTendered ? parseFloat(cashTendered).toFixed(2) : (total > 0 ? total : 15.00).toFixed(2)}</span>
        </div>
      </div>

      <div className="border-b border-dashed border-gray-400 my-3" />

      {/* ZATCA QR Code Placeholder */}
      <div className="text-center my-3 space-y-1.5">
        <div className="w-24 h-24 border-2 border-black p-1 mx-auto flex items-center justify-center bg-white">
          <div className="grid grid-cols-5 gap-0.5 w-full h-full p-1 bg-gray-100">
            <div className="bg-black col-span-2 row-span-2" />
            <div className="bg-black col-span-1" />
            <div className="bg-black col-span-2 row-span-2" />
            <div className="bg-black col-span-1" />
            <div className="bg-black col-span-3" />
            <div className="bg-black col-span-2 row-span-2" />
            <div className="bg-black col-span-2" />
          </div>
        </div>
        <p className="text-[9px] font-bold text-gray-700">رمز الاستجابة السريعة ZATCA QR</p>
      </div>

      <div className="text-center text-[9px] text-gray-500 pt-2 border-t border-dashed border-gray-300">
        <p>شكراً لزيارتكم • Thank you for your visit</p>
      </div>
    </div>
  );
};
