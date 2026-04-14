import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartMockService } from '../../core/services/cart-mock.service';
import { OrdersMockService } from '../../core/services/orders-mock.service';

@Component({
  selector: 'mmc-checkout-review-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatSnackBarModule],
  template: `
    <a mat-button [routerLink]="['/app/cart']">Back to cart</a>
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>Checkout confirmation</mat-card-title>
        <mat-card-subtitle>Final review before submitting mock purchase order(s)</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        @if (!groups().length) {
          <p class="muted">Cart is empty. Add items before checkout.</p>
        } @else {
          @for (group of groups(); track group.supplierId) {
            <section class="group">
              <h3>{{ group.supplierName }}</h3>
              @for (item of group.items; track item.id) {
                <div class="row">
                  <span>{{ item.drugName }} ({{ item.ndc11 }})</span>
                  <span>Qty {{ item.quantity }}</span>
                  <strong>\${{ item.quantity * item.packagePrice | number: '1.2-2' }}</strong>
                </div>
              }
              <div class="subtotal">Supplier subtotal: \${{ group.subtotal | number: '1.2-2' }}</div>
            </section>
          }

          <div class="summary">
            <div><span>Items</span><strong>{{ totals().itemCount }}</strong></div>
            <div><span>Subtotal</span><strong>\${{ totals().subtotal | number: '1.2-2' }}</strong></div>
            <div><span>Fees</span><strong>\${{ totals().estimatedFees | number: '1.2-2' }}</strong></div>
            <div class="total"><span>Total</span><strong>\${{ totals().grandTotal | number: '1.2-2' }}</strong></div>
          </div>

          <div class="actions">
            <button mat-stroked-button type="button" [routerLink]="['/app/cart']">Edit cart</button>
            <button mat-flat-button color="primary" type="button" (click)="confirmSubmit()">Confirm & submit mock PO</button>
          </div>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .group {
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 10px;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 10px;
        padding: 6px 0;
      }
      .subtotal {
        text-align: right;
        font-weight: 650;
      }
      .summary {
        margin-top: 14px;
        border-top: 1px solid rgba(0, 0, 0, 0.08);
        padding-top: 10px;
      }
      .summary > div {
        display: flex;
        justify-content: space-between;
        padding: 6px 0;
      }
      .total {
        font-weight: 700;
      }
      .actions {
        margin-top: 14px;
        display: flex;
        justify-content: space-between;
      }
      .muted {
        color: rgba(0, 0, 0, 0.62);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutReviewPageComponent {
  readonly groups = computed(() => this.cart.supplierGroups());
  readonly totals = computed(() => this.cart.totals());

  constructor(
    private readonly cart: CartMockService,
    private readonly orders: OrdersMockService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar
  ) {}

  confirmSubmit(): void {
    const groups = this.cart.supplierGroups();
    if (!groups.length) return;
    const createdIds = this.orders.createOrdersFromCart(groups);
    this.cart.clearAll();
    this.snackBar.open(`Submitted ${createdIds.length} mock order(s).`, 'Close', { duration: 3000 });
    void this.router.navigate(createdIds.length ? ['/app/orders', createdIds[0]] : ['/app/orders']);
  }
}

