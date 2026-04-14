export type PurchaseOrderStatus =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'ACKNOWLEDGED'
  | 'SHIPPED'
  | 'INVOICED'
  | 'RECONCILED'
  | 'EXCEPTION';

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  status: PurchaseOrderStatus;
  totalAmount: number;
  createdAt: string;
  pharmacyId: string;
  itemCount: number;
}

export interface OrderTimelineEvent {
  id: string;
  status: PurchaseOrderStatus;
  title: string;
  description: string;
  occurredAt: string;
}

export interface ShipmentInfo {
  carrier: string;
  trackingNumber: string;
  estimatedArrival: string;
  shippedAt?: string;
}

export interface InvoiceInfo {
  invoiceNumber: string;
  issuedAt: string;
  amount: number;
  paid: boolean;
}

export interface ReconciliationSummary {
  matched: boolean;
  poTotal: number;
  invoiceTotal: number;
  discrepancy: number;
}

export interface OrderAuditEvent {
  id: string;
  actor: string;
  action: string;
  message: string;
  createdAt: string;
}

export interface PurchaseOrderDetail extends PurchaseOrder {
  lines: Array<{
    ndc11: string;
    drugName: string;
    quantity: number;
    packagePrice: number;
  }>;
  timeline: OrderTimelineEvent[];
  shipment: ShipmentInfo;
  invoice: InvoiceInfo;
  reconciliation: ReconciliationSummary;
  auditLog: OrderAuditEvent[];
}

export interface OrderFilters {
  query: string;
  supplierId: string | 'ALL';
  status: PurchaseOrderStatus | 'ALL';
}

