import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartMockService } from '../../core/services/cart-mock.service';

@Component({
  selector: 'mmc-cart-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSnackBarModule],
  template: `
    <div class="layout">
      <mat-card appearance="outlined">
        <mat-card-header>
          <mat-card-title>Multi-supplier cart</mat-card-title>
          <mat-card-subtitle>Editable quantities, grouped by supplier</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          @if (!groups().length) {
            <p class="muted">Cart is empty. Add items from Marketplace.</p>
          } @else {
            @for (group of groups(); track group.supplierId) {
              <section class="group">
                <div class="group-header">
                  <h3>{{ group.supplierName }}</h3>
                  <button mat-button color="warn" type="button" (click)="clearSupplier(group.supplierId)">
                    Remove supplier
                  </button>
                </div>

                @for (item of group.items; track item.id) {
                  <div class="row">
                    <div>
                      <div class="title">{{ item.drugName }}</div>
                      <div class="muted">{{ item.ndc11 }} • ETA {{ item.estimatedDelivery }}</div>
                    </div>
                    <div class="qty">
                      <button mat-icon-button type="button" (click)="changeQty(item.id, item.quantity - 1)">
                        <mat-icon>remove</mat-icon>
                      </button>
                      <input
                        matInput
                        type="number"
                        [ngModel]="item.quantity"
                        (ngModelChange)="changeQty(item.id, +$event)"
                      />
                      <button mat-icon-button type="button" (click)="changeQty(item.id, item.quantity + 1)">
                        <mat-icon>add</mat-icon>
                      </button>
                    </div>
                    <div class="price">\${{ item.packagePrice * item.quantity | number: '1.2-2' }}</div>
                    <button mat-icon-button type="button" (click)="removeItem(item.id)">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                }

                <div class="subtotal">Supplier subtotal: \${{ group.subtotal | number: '1.2-2' }}</div>
              </section>
            }
          }
        </mat-card-content>
      </mat-card>

      <mat-card appearance="outlined">
        <mat-card-header>
          <mat-card-title>Checkout review</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="summary-row"><span>Item count</span><strong>{{ totals().itemCount }}</strong></div>
          <div class="summary-row"><span>Subtotal</span><strong>\${{ totals().subtotal | number: '1.2-2' }}</strong></div>
          <div class="summary-row"><span>Estimated fees</span><strong>\${{ totals().estimatedFees | number: '1.2-2' }}</strong></div>
          <div class="summary-row total"><span>Total</span><strong>\${{ totals().grandTotal | number: '1.2-2' }}</strong></div>

          @if (requiresApproval()) {
            <div class="warning">Approval required: checkout total exceeds configured threshold.</div>
          }

          <div class="actions">
            <button mat-stroked-button color="warn" type="button" (click)="clearAll()">Clear cart</button>
            <button mat-flat-button color="primary" type="button" [disabled]="!groups().length" (click)="goToCheckout()">
              Continue to checkout
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .layout {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 12px;
      }
      .group {
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 10px;
        background: linear-gradient(180deg, #ffffff 0%, #fafdff 100%);
      }
      .group-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 130px 140px 40px;
        align-items: center;
        gap: 10px;
        padding: 8px 0;
      }
      .qty {
        display: grid;
        grid-template-columns: 36px 1fr 36px;
        align-items: center;
      }
      .qty input {
        text-align: center;
      }
      .title {
        font-weight: 600;
      }
      .price {
        font-weight: 650;
      }
      .subtotal {
        text-align: right;
        font-weight: 650;
      }
      .summary-row {
        display: flex;
        justify-content: space-between;
        padding: 8px 0;
      }
      .total {
        border-top: 1px solid rgba(0, 0, 0, 0.08);
      }
      .actions {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
      }
      .warning {
        background: rgba(245, 124, 0, 0.14);
        padding: 10px;
        border-radius: 8px;
        margin-top: 10px;
        border: 1px solid rgba(245, 124, 0, 0.25);
      }
      .muted {
        color: rgba(0, 0, 0, 0.6);
        margin: 0;
      }
      @media (max-width: 1100px) {
        .layout {
          grid-template-columns: 1fr;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent {
  readonly groups = computed(() => this.cart.supplierGroups());
  readonly totals = computed(() => this.cart.totals());
  readonly requiresApproval = computed(() => this.cart.requiresApproval());

  constructor(
    readonly cart: CartMockService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  changeQty(itemId: string, quantity: number): void {
    this.cart.updateQuantity(itemId, quantity);
  }

  removeItem(itemId: string): void {
    this.cart.removeItem(itemId);
    this.snackBar.open('Item removed from cart.', 'Close', { duration: 2000 });
  }

  clearSupplier(supplierId: string): void {
    this.cart.clearSupplier(supplierId);
    this.snackBar.open('Supplier group removed.', 'Close', { duration: 2000 });
  }

  clearAll(): void {
    this.cart.clearAll();
    this.snackBar.open('Cart cleared.', 'Close', { duration: 2000 });
  }

  goToCheckout(): void {
    void this.router.navigate(['/app/cart/checkout']);
  }
}

