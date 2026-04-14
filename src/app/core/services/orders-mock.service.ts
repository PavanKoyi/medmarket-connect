import { Injectable, computed, signal } from '@angular/core';
import { CartSupplierGroup } from '../models/cart.models';
import { OrderFilters, PurchaseOrder, PurchaseOrderDetail, PurchaseOrderStatus } from '../models/orders.models';
import { ORDERS_MOCK } from '../../mock-data/orders/orders.mock';

const ORDERS_STORAGE_KEY = 'mmc.orders.v1';

const DEFAULT_FILTERS: OrderFilters = {
  query: '',
  supplierId: 'ALL',
  status: 'ALL'
};

@Injectable({ providedIn: 'root' })
export class OrdersMockService {
  private readonly _orders = signal<PurchaseOrderDetail[]>(this.hydrate());
  private readonly _filters = signal<OrderFilters>({ ...DEFAULT_FILTERS });

  readonly filters = this._filters.asReadonly();

  readonly orders = computed<PurchaseOrder[]>(() =>
    this._orders()
      .map((o) => ({
        id: o.id,
        poNumber: o.poNumber,
        supplierId: o.supplierId,
        supplierName: o.supplierName,
        status: o.status,
        totalAmount: o.totalAmount,
        createdAt: o.createdAt,
        pharmacyId: o.pharmacyId,
        itemCount: o.itemCount
      }))
      .filter((o) => this.matchesFilters(o))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  );

  patchFilters(patch: Partial<OrderFilters>): void {
    this._filters.set({ ...this._filters(), ...patch });
  }

  resetFilters(): void {
    this._filters.set({ ...DEFAULT_FILTERS });
  }

  getOrderDetail(id: string): PurchaseOrderDetail | null {
    return this._orders().find((o) => o.id === id) ?? null;
  }

  createOrdersFromCart(groups: CartSupplierGroup[], pharmacyId = 'pharmacy_demo_1'): string[] {
    const createdIds: string[] = [];
    const nextOrders = [...this._orders()];

    for (const group of groups) {
      const id = crypto.randomUUID();
      const poNumber = `PO-${Math.floor(Math.random() * 90000) + 10000}`;
      const now = new Date().toISOString();
      const totalAmount = group.subtotal;
      const detail: PurchaseOrderDetail = {
        id,
        poNumber,
        supplierId: group.supplierId,
        supplierName: group.supplierName,
        status: 'SUBMITTED',
        totalAmount,
        createdAt: now,
        pharmacyId,
        itemCount: group.items.length,
        lines: group.items.map((i) => ({
          ndc11: i.ndc11,
          drugName: i.drugName,
          quantity: i.quantity,
          packagePrice: i.packagePrice
        })),
        timeline: [
          {
            id: crypto.randomUUID(),
            status: 'DRAFT',
            title: 'Draft created',
            description: 'Generated from cart.',
            occurredAt: now
          },
          {
            id: crypto.randomUUID(),
            status: 'SUBMITTED',
            title: 'Order submitted',
            description: 'PO submitted to supplier.',
            occurredAt: now
          }
        ],
        shipment: {
          carrier: 'TBD',
          trackingNumber: 'Pending',
          estimatedArrival: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10)
        },
        invoice: {
          invoiceNumber: `INV-${poNumber.slice(3)}`,
          issuedAt: now.slice(0, 10),
          amount: totalAmount,
          paid: false
        },
        reconciliation: {
          matched: true,
          poTotal: totalAmount,
          invoiceTotal: totalAmount,
          discrepancy: 0
        },
        auditLog: [
          {
            id: crypto.randomUUID(),
            actor: 'System',
            action: 'SUBMIT_PO',
            message: 'Purchase order submitted from cart checkout.',
            createdAt: now
          }
        ]
      };

      nextOrders.push(detail);
      createdIds.push(id);
    }

    this.persist(nextOrders);
    return createdIds;
  }

  transitionOrder(id: string, status: PurchaseOrderStatus): void {
    const next = this._orders().map((order) => {
      if (order.id !== id) return order;
      const now = new Date().toISOString();
      return {
        ...order,
        status,
        timeline: [
          ...order.timeline,
          {
            id: crypto.randomUUID(),
            status,
            title: this.toTitle(status),
            description: `Status updated to ${status}.`,
            occurredAt: now
          }
        ],
        auditLog: [
          ...order.auditLog,
          {
            id: crypto.randomUUID(),
            actor: 'Demo User',
            action: 'STATUS_UPDATE',
            message: `Changed status to ${status}.`,
            createdAt: now
          }
        ]
      };
    });
    this.persist(next);
  }

  private toTitle(status: PurchaseOrderStatus): string {
    return status.charAt(0) + status.slice(1).toLowerCase();
  }

  private matchesFilters(o: PurchaseOrder): boolean {
    const f = this._filters();
    if (f.supplierId !== 'ALL' && o.supplierId !== f.supplierId) return false;
    if (f.status !== 'ALL' && o.status !== f.status) return false;
    const query = f.query.trim().toLowerCase();
    if (!query) return true;
    return `${o.poNumber} ${o.supplierName}`.toLowerCase().includes(query);
  }

  private hydrate(): PurchaseOrderDetail[] {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return ORDERS_MOCK;
    try {
      const parsed = JSON.parse(raw) as PurchaseOrderDetail[];
      return Array.isArray(parsed) ? parsed : ORDERS_MOCK;
    } catch {
      return ORDERS_MOCK;
    }
  }

  private persist(orders: PurchaseOrderDetail[]): void {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    this._orders.set(orders);
  }
}

