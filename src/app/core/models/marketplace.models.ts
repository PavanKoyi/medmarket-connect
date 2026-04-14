export type AvailabilityStatus = 'IN_STOCK' | 'LOW_STOCK' | 'BACKORDER' | 'ALLOCATED';

export interface Supplier {
  id: string;
  name: string;
  addVerified: boolean;
  deaVerified: boolean;
  dscsaCompliant: boolean;
  statesLicensed: string[];
  fillRate: number;
  invoiceAccuracy: number;
  avgDeliveryDays: number;
  category: string;
}

export interface DrugProduct {
  id: string;
  ndc11: string;
  drugName: string;
  genericName: string;
  manufacturer: string;
  dosageForm: string;
  strength: string;
  packageSize: string;
  releaseType: 'IR' | 'ER' | 'XR' | 'DR';
  category: string;
  specialty: boolean;
  brand: boolean;
}

export interface PriceQuote {
  id: string;
  ndc11: string;
  supplierId: string;
  supplierName: string;
  unitPrice: number;
  packagePrice: number;
  availability: AvailabilityStatus;
  contractPrice: boolean;
  gpoPrice: boolean;
  estimatedDelivery: string;
  minQty?: number;
}

export interface MarginInsight {
  ndc11: string;
  reimbursement: number;
  acquisitionCost: number;
  estimatedMargin: number;
  formularyCovered: boolean;
}

export interface MarketplaceFilters {
  query: string;
  supplierId: string | 'ALL';
  brandType: 'ALL' | 'BRAND' | 'GENERIC';
  contractType: 'ALL' | 'CONTRACT' | 'OPEN_MARKET';
  gpoOnly: boolean;
  addVerifiedOnly: boolean;
  availability: 'ALL' | AvailabilityStatus;
  specialty: 'ALL' | 'SPECIALTY' | 'NON_SPECIALTY';
}

