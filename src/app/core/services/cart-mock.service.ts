import { Injectable, computed, signal } from '@angular/core';
import { CartItem, CartSupplierGroup, CartTotals } from '../models/cart.models';
import { PriceQuote } from '../models/marketplace.models';
import { CART_INITIAL_ITEMS_MOCK } from '../../mock-data/cart/cart.mock';

const CART_STORAGE_KEY = 'mmc.cart.v1';

@Injectable({ providedIn: 'root' })
export class CartMockService {
  private readonly _items = signal<CartItem[]>(this.hydrate());
  readonly items = this._items.asReadonly();

  readonly supplierGroups = computed<CartSupplierGroup[]>(() => {
    const groups = new Map<string, CartSupplierGroup>();
    for (const item of this._items()) {
      if (!groups.has(item.supplierId)) {
        groups.set(item.supplierId, {
          supplierId: item.supplierId,
          supplierName: item.supplierName,
          items: [],
          subtotal: 0
        });
      }
      const group = groups.get(item.supplierId)!;
      group.items.push(item);
      group.subtotal += item.packagePrice * item.quantity;
    }
    return Array.from(groups.values()).sort((a, b) => a.supplierName.localeCompare(b.supplierName));
  });

  readonly totals = computed<CartTotals>(() => {
    const itemCount = this._items().reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = this._items().reduce((sum, i) => sum + i.packagePrice * i.quantity, 0);
    const estimatedFees = subtotal * 0.018;
    return { itemCount, subtotal, estimatedFees, grandTotal: subtotal + estimatedFees };
  });

  readonly requiresApproval = computed(() => this.totals().grandTotal > 15000);

  addFromQuote(drugName: string, quote: PriceQuote): void {
    const existing = this._items().find((i) => i.ndc11 === quote.ndc11 && i.supplierId === quote.supplierId);
    if (existing) {
      this.updateQuantity(existing.id, existing.quantity + 1);
      return;
    }
    const item: CartItem = {
      id: crypto.randomUUID(),
      ndc11: quote.ndc11,
      drugName,
      supplierId: quote.supplierId,
      supplierName: quote.supplierName,
      quantity: 1,
      packagePrice: quote.packagePrice,
      estimatedDelivery: quote.estimatedDelivery,
      contractPrice: quote.contractPrice
    };
    this.setItems([...this._items(), item]);
  }

  updateQuantity(itemId: string, quantity: number): void {
    const nextQty = Math.max(1, Math.floor(quantity));
    this.setItems(this._items().map((i) => (i.id === itemId ? { ...i, quantity: nextQty } : i)));
  }

  removeItem(itemId: string): void {
    this.setItems(this._items().filter((i) => i.id !== itemId));
  }

  clearSupplier(supplierId: string): void {
    this.setItems(this._items().filter((i) => i.supplierId !== supplierId));
  }

  clearAll(): void {
    this.setItems([]);
  }

  private hydrate(): CartItem[] {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return CART_INITIAL_ITEMS_MOCK;
    try {
      const parsed = JSON.parse(raw) as CartItem[];
      return Array.isArray(parsed) ? parsed : CART_INITIAL_ITEMS_MOCK;
    } catch {
      return CART_INITIAL_ITEMS_MOCK;
    }
  }

  private setItems(items: CartItem[]): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    this._items.set(items);
  }
}

