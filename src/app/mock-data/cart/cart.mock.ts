import { CartItem } from '../../core/models/cart.models';

export const CART_INITIAL_ITEMS_MOCK: CartItem[] = [
  {
    id: 'cart_1',
    ndc11: '65862042099',
    drugName: 'Atorvastatin 20mg Tablet',
    supplierId: 'sup_cardinal',
    supplierName: 'Cardinal',
    quantity: 1,
    packagePrice: 110,
    estimatedDelivery: '2026-04-16',
    contractPrice: true
  },
  {
    id: 'cart_2',
    ndc11: '00574052101',
    drugName: 'Amoxicillin 500mg Capsule',
    supplierId: 'sup_abc',
    supplierName: 'AmerisourceBergen',
    quantity: 2,
    packagePrice: 80,
    estimatedDelivery: '2026-04-18',
    contractPrice: false
  }
];

