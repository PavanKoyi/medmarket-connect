import { PurchaseOrderDetail } from '../../core/models/orders.models';

export const ORDERS_MOCK: PurchaseOrderDetail[] = [
  {
    id: 'ord_10483',
    poNumber: 'PO-10483',
    supplierId: 'sup_cardinal',
    supplierName: 'Cardinal',
    status: 'SUBMITTED',
    totalAmount: 12480,
    createdAt: '2026-04-13T12:24:00.000Z',
    pharmacyId: 'pharmacy_demo_1',
    itemCount: 4,
    lines: [
      { ndc11: '65862042099', drugName: 'Atorvastatin 20mg Tablet', quantity: 20, packagePrice: 110 },
      { ndc11: '00574052101', drugName: 'Amoxicillin 500mg Capsule', quantity: 10, packagePrice: 70 }
    ],
    timeline: [
      {
        id: 'ev_1',
        status: 'DRAFT',
        title: 'Draft created',
        description: 'Buyer prepared order basket.',
        occurredAt: '2026-04-13T12:20:00.000Z'
      },
      {
        id: 'ev_2',
        status: 'SUBMITTED',
        title: 'Order submitted',
        description: 'PO sent to supplier.',
        occurredAt: '2026-04-13T12:24:00.000Z'
      }
    ],
    shipment: {
      carrier: 'FedEx',
      trackingNumber: 'FX-7789001234',
      estimatedArrival: '2026-04-16'
    },
    invoice: {
      invoiceNumber: 'INV-10483',
      issuedAt: '2026-04-14',
      amount: 12480,
      paid: false
    },
    reconciliation: {
      matched: true,
      poTotal: 12480,
      invoiceTotal: 12480,
      discrepancy: 0
    },
    auditLog: [
      {
        id: 'aud_1',
        actor: 'Admin User',
        action: 'CREATE_PO',
        message: 'Created purchase order.',
        createdAt: '2026-04-13T12:20:00.000Z'
      }
    ]
  },
  {
    id: 'ord_10482',
    poNumber: 'PO-10482',
    supplierId: 'sup_mckesson',
    supplierName: 'McKesson',
    status: 'SHIPPED',
    totalAmount: 8190,
    createdAt: '2026-04-12T09:14:00.000Z',
    pharmacyId: 'pharmacy_demo_1',
    itemCount: 2,
    lines: [{ ndc11: '00093074256', drugName: 'Metformin ER 500mg Tablet', quantity: 60, packagePrice: 90 }],
    timeline: [
      {
        id: 'ev_3',
        status: 'DRAFT',
        title: 'Draft created',
        description: 'Order drafted.',
        occurredAt: '2026-04-12T08:50:00.000Z'
      },
      {
        id: 'ev_4',
        status: 'SUBMITTED',
        title: 'Order submitted',
        description: 'PO sent.',
        occurredAt: '2026-04-12T09:14:00.000Z'
      },
      {
        id: 'ev_5',
        status: 'ACKNOWLEDGED',
        title: 'Supplier acknowledged',
        description: 'Supplier accepted order.',
        occurredAt: '2026-04-12T10:00:00.000Z'
      },
      {
        id: 'ev_6',
        status: 'SHIPPED',
        title: 'Shipped',
        description: 'Order shipped from warehouse.',
        occurredAt: '2026-04-13T06:30:00.000Z'
      }
    ],
    shipment: {
      carrier: 'UPS',
      trackingNumber: '1Z009AF334433',
      estimatedArrival: '2026-04-15',
      shippedAt: '2026-04-13T06:30:00.000Z'
    },
    invoice: {
      invoiceNumber: 'INV-10482',
      issuedAt: '2026-04-13',
      amount: 8190,
      paid: false
    },
    reconciliation: {
      matched: false,
      poTotal: 8190,
      invoiceTotal: 8150,
      discrepancy: -40
    },
    auditLog: [
      {
        id: 'aud_2',
        actor: 'Purchasing Manager',
        action: 'SUBMIT_PO',
        message: 'Submitted PO to supplier.',
        createdAt: '2026-04-12T09:14:00.000Z'
      }
    ]
  }
];

