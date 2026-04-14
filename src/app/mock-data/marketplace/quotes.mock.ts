import { MarginInsight, PriceQuote } from '../../core/models/marketplace.models';

export const PRICE_QUOTES_MOCK: PriceQuote[] = [
  {
    id: 'q1',
    ndc11: '65862042099',
    supplierId: 'sup_cardinal',
    supplierName: 'Cardinal',
    unitPrice: 0.22,
    packagePrice: 110,
    availability: 'IN_STOCK',
    contractPrice: true,
    gpoPrice: true,
    estimatedDelivery: '2026-04-16'
  },
  {
    id: 'q2',
    ndc11: '65862042099',
    supplierId: 'sup_mckesson',
    supplierName: 'McKesson',
    unitPrice: 0.24,
    packagePrice: 120,
    availability: 'LOW_STOCK',
    contractPrice: false,
    gpoPrice: true,
    estimatedDelivery: '2026-04-17'
  },
  {
    id: 'q3',
    ndc11: '01722310880',
    supplierId: 'sup_abc',
    supplierName: 'AmerisourceBergen',
    unitPrice: 1.8,
    packagePrice: 162,
    availability: 'IN_STOCK',
    contractPrice: false,
    gpoPrice: false,
    estimatedDelivery: '2026-04-17'
  },
  {
    id: 'q4',
    ndc11: '00093074256',
    supplierId: 'sup_cardinal',
    supplierName: 'Cardinal',
    unitPrice: 0.09,
    packagePrice: 90,
    availability: 'IN_STOCK',
    contractPrice: true,
    gpoPrice: true,
    estimatedDelivery: '2026-04-16'
  },
  {
    id: 'q5',
    ndc11: '00093074256',
    supplierId: 'sup_hd',
    supplierName: 'HD Smith',
    unitPrice: 0.1,
    packagePrice: 100,
    availability: 'BACKORDER',
    contractPrice: false,
    gpoPrice: false,
    estimatedDelivery: '2026-04-20'
  },
  {
    id: 'q6',
    ndc11: '07810150510',
    supplierId: 'sup_mckesson',
    supplierName: 'McKesson',
    unitPrice: 245,
    packagePrice: 245,
    availability: 'ALLOCATED',
    contractPrice: true,
    gpoPrice: true,
    estimatedDelivery: '2026-04-21',
    minQty: 2
  },
  {
    id: 'q7',
    ndc11: '00574052101',
    supplierId: 'sup_cardinal',
    supplierName: 'Cardinal',
    unitPrice: 0.14,
    packagePrice: 70,
    availability: 'IN_STOCK',
    contractPrice: true,
    gpoPrice: true,
    estimatedDelivery: '2026-04-16'
  },
  {
    id: 'q8',
    ndc11: '00574052101',
    supplierId: 'sup_abc',
    supplierName: 'AmerisourceBergen',
    unitPrice: 0.16,
    packagePrice: 80,
    availability: 'IN_STOCK',
    contractPrice: false,
    gpoPrice: false,
    estimatedDelivery: '2026-04-18'
  },
  {
    id: 'q9',
    ndc11: '00093015056',
    supplierId: 'sup_mckesson',
    supplierName: 'McKesson',
    unitPrice: 1.45,
    packagePrice: 145,
    availability: 'LOW_STOCK',
    contractPrice: false,
    gpoPrice: false,
    estimatedDelivery: '2026-04-19'
  }
];

export const MARGIN_INSIGHTS_MOCK: MarginInsight[] = [
  { ndc11: '65862042099', reimbursement: 165, acquisitionCost: 110, estimatedMargin: 55, formularyCovered: true },
  { ndc11: '01722310880', reimbursement: 210, acquisitionCost: 162, estimatedMargin: 48, formularyCovered: true },
  { ndc11: '00093074256', reimbursement: 140, acquisitionCost: 90, estimatedMargin: 50, formularyCovered: true },
  { ndc11: '07810150510', reimbursement: 300, acquisitionCost: 245, estimatedMargin: 55, formularyCovered: false },
  { ndc11: '00574052101', reimbursement: 120, acquisitionCost: 70, estimatedMargin: 50, formularyCovered: true },
  { ndc11: '00093015056', reimbursement: 180, acquisitionCost: 145, estimatedMargin: 35, formularyCovered: false }
];

