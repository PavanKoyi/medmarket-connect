export interface CartItem {
  id: string;
  ndc11: string;
  drugName: string;
  supplierId: string;
  supplierName: string;
  quantity: number;
  packagePrice: number;
  estimatedDelivery: string;
  contractPrice: boolean;
}

export interface CartSupplierGroup {
  supplierId: string;
  supplierName: string;
  items: CartItem[];
  subtotal: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  estimatedFees: number;
  grandTotal: number;
}

