export type Language = 'EN' | 'AR';

export const translations = {
  EN: {
    // Header & Navigation
    searchPlaceholder: 'Scan barcode or search items...',
    returns: 'Returns',
    closeShift: 'Close Shift',
    signOut: 'Sign Out',
    hq: 'HQ',
    pos01: 'POS-01',
    
    // Customer Card
    invoiceNo: 'Invoice No',
    date: 'Date',
    customer: 'Customer',
    walkInCustomer: 'Walk-in Customer',

    // Product Table & Favorites
    barcode: 'Barcode',
    itemDescription: 'Item Description',
    qty: 'Qty',
    rate: 'Rate (SAR)',
    total: 'Total (SAR)',
    actions: 'Actions',
    favoriteItems: 'Favorite Items',
    noItemsInCart: 'No items in cart',

    // Summary Cards
    totalQty: 'Total Qty',
    subtotal: 'Subtotal',
    vat15: 'VAT (15%)',
    amountDue: 'Amount Due',
    holdOrder: 'Hold Order',
    recallOrder: 'Recall Order',

    // Payment & Keypad Panel
    cashSale: 'CASH SALE',
    cardSale: 'CARD SALE',
    madaSale: 'MADA SALE',
    splitSale: 'SPLIT SALE',
    creditSale: 'CREDIT SALE',
    
    cash: 'Cash',
    card: 'Card',
    mada: 'mada',
    split: 'Split',
    credit: 'Credit',
    discount: 'Discount',

    quantity: 'Quantity',
    price: 'Price',
    next: 'Next',
    addToCart: 'Add to cart',
    pay: 'Pay',
    tender: 'Tender',
    backToSale: 'Back to sale',
    
    cardAmount: 'Card Amount',
    paidAmount: 'Paid Amount',
    cashTendered: 'Cash Tendered',
    change: 'Change',
    selectCustomer: 'Select Customer',
    selectCustomerPlaceholder: 'Select Customer...',
    applyDiscount: 'Apply discount',
    
    save: 'Save',
    saveAndPrint: 'Save & Print',
    newSale: 'New Sale',

    // Thermal Receipt
    simplifiedTaxInvoice: 'Simplified Tax Invoice',
    receiptNo: 'Receipt No',
    time: 'Time',
    thankYou: 'Thank you for your visit',
  },
  AR: {
    // Header & Navigation
    searchPlaceholder: 'امسح الباركوود أو ابحث عن الأصناف...',
    returns: 'المرتجعات',
    closeShift: 'إغلاق الورقية',
    signOut: 'تسجيل الخروج',
    hq: 'المركز الرئيسي',
    pos01: 'نقطة-01',

    // Customer Card
    invoiceNo: 'رقم الفاتورة',
    date: 'التاريخ',
    customer: 'العميل',
    walkInCustomer: 'عميل نقدي',

    // Product Table & Favorites
    barcode: 'البار كود',
    itemDescription: 'وصف الصنف',
    qty: 'الكمية',
    rate: 'السعر (ر.س)',
    total: 'الإجمالي (ر.س)',
    actions: 'إجراءات',
    favoriteItems: 'الأصناف المفضلة',
    noItemsInCart: 'لا توجد أصناف في السلة',

    // Summary Cards
    totalQty: 'إجمالي الكمية',
    subtotal: 'المجموع الفرعي',
    vat15: 'ضريبة (15%)',
    amountDue: 'المبلغ المستحق',
    holdOrder: 'تعليق الطلب',
    recallOrder: 'استرجاع المعلق',

    // Payment & Keypad Panel
    cashSale: 'بيع نقدي',
    cardSale: 'بيع بطاقة',
    madaSale: 'بيع مدى',
    splitSale: 'بيع مجزأ',
    creditSale: 'بيع آجل',
    
    cash: 'نقدي',
    card: 'بطاقة',
    mada: 'مدى',
    split: 'تقسيم',
    credit: 'آجل',
    discount: 'خصم',

    quantity: 'الكمية',
    price: 'السعر',
    next: 'التالي',
    addToCart: 'إضافة للسلة',
    pay: 'دفع',
    tender: 'تسوية',
    backToSale: 'العودة للبيع',
    
    cardAmount: 'مبلغ البطاقة',
    paidAmount: 'المبلغ المدفوع',
    cashTendered: 'المبلغ المستلم',
    change: 'الباقي',
    selectCustomer: 'اختر العميل',
    selectCustomerPlaceholder: 'اختر العميل...',
    applyDiscount: 'تطبيق الخصم',
    
    save: 'حفظ',
    saveAndPrint: 'حفظ وطباعة',
    newSale: 'عملية جديدة',

    // Thermal Receipt
    simplifiedTaxInvoice: 'فاتورة ضريبية مبسطة',
    receiptNo: 'رقم الإيصال',
    time: 'الوقت',
    thankYou: 'شكراً لزيارتكم',
  }
};
