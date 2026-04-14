import { Supplier } from '../../core/models/marketplace.models';

export const SUPPLIERS_MOCK: Supplier[] = [
  {
    id: 'sup_cardinal',
    name: 'Cardinal',
    addVerified: true,
    deaVerified: true,
    dscsaCompliant: true,
    statesLicensed: ['CA', 'TX', 'FL', 'NY'],
    fillRate: 98.6,
    invoiceAccuracy: 99.1,
    avgDeliveryDays: 2,
    category: 'Primary Wholesaler'
  },
  {
    id: 'sup_mckesson',
    name: 'McKesson',
    addVerified: true,
    deaVerified: true,
    dscsaCompliant: true,
    statesLicensed: ['CA', 'AZ', 'NV', 'OR'],
    fillRate: 97.8,
    invoiceAccuracy: 98.7,
    avgDeliveryDays: 2,
    category: 'Primary Wholesaler'
  },
  {
    id: 'sup_abc',
    name: 'AmerisourceBergen',
    addVerified: true,
    deaVerified: true,
    dscsaCompliant: true,
    statesLicensed: ['CA', 'WA', 'CO', 'UT'],
    fillRate: 96.9,
    invoiceAccuracy: 98.4,
    avgDeliveryDays: 3,
    category: 'Primary Wholesaler'
  },
  {
    id: 'sup_hd',
    name: 'HD Smith',
    addVerified: false,
    deaVerified: true,
    dscsaCompliant: true,
    statesLicensed: ['CA', 'NV', 'ID'],
    fillRate: 94.2,
    invoiceAccuracy: 97.2,
    avgDeliveryDays: 3,
    category: 'Secondary'
  }
];

