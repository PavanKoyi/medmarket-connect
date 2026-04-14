import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MarketplaceMockService } from '../../core/services/marketplace-mock.service';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';
import { CartMockService } from '../../core/services/cart-mock.service';
import { PriceQuote } from '../../core/models/marketplace.models';

@Component({
  selector: 'mmc-marketplace-compare-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatSnackBarModule, StatusChipComponent],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>Compare quotes</mat-card-title>
        <mat-card-subtitle>Equivalent NDC and supplier pricing comparison</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        @if (selectedProduct()) {
          <div class="heading">
            <div>
              <div class="title">{{ selectedProduct()!.drugName }}</div>
              <div class="sub">{{ selectedProduct()!.ndc11 }} • {{ selectedProduct()!.genericName }}</div>
            </div>
            <a mat-stroked-button [routerLink]="['/app/marketplace/search']">Back to search</a>
          </div>

          <div class="quote-grid">
            @for (quote of quotes(); track quote.id) {
              <mat-card appearance="outlined">
                <mat-card-title>{{ quote.supplierName }}</mat-card-title>
                <mat-card-content>
                  <div class="price">\${{ quote.packagePrice | number: '1.2-2' }}</div>
                  <div class="sub">Unit \${{ quote.unitPrice | number: '1.2-2' }}</div>
                  <mmc-status-chip [label]="quote.availability" />
                  <div class="chips">
                    @if (quote.contractPrice) {
                      <span class="pill">Contract</span>
                    }
                    @if (quote.gpoPrice) {
                      <span class="pill">GPO</span>
                    }
                  </div>
                  <button mat-flat-button color="primary" type="button" (click)="addToCart(quote)">Add to cart</button>
                </mat-card-content>
              </mat-card>
            }
          </div>

          <h3>Equivalent NDC suggestions</h3>
          <div class="equivalents">
            @for (eq of equivalents(); track eq.id) {
              <div class="eq-row">
                <div>{{ eq.drugName }} ({{ eq.ndc11 }})</div>
                <div class="sub">{{ eq.manufacturer }} • {{ eq.releaseType }}</div>
              </div>
            }
          </div>
        } @else {
          <p class="sub">No product selected. Use Compare from marketplace search.</p>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;
      }
      .title {
        font-size: 18px;
        font-weight: 650;
      }
      .sub {
        color: rgba(0, 0, 0, 0.62);
      }
      .quote-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
        margin-bottom: 16px;
      }
      .price {
        font-size: 22px;
        font-weight: 700;
        margin: 6px 0;
      }
      .chips {
        display: flex;
        gap: 6px;
        margin: 8px 0;
      }
      .pill {
        font-size: 11px;
        padding: 3px 7px;
        border-radius: 999px;
        background: rgba(30, 136, 229, 0.14);
      }
      .equivalents {
        display: grid;
        gap: 8px;
      }
      .eq-row {
        padding: 8px 10px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 8px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceComparePageComponent {
  private readonly ndc11 = computed(() => this.route.snapshot.queryParamMap.get('ndc11') ?? '');

  readonly selectedProduct = computed(() => this.marketplace.products().find((p) => p.ndc11 === this.ndc11()) ?? null);
  readonly quotes = computed(() => this.marketplace.getQuotesByNdc(this.ndc11()));
  readonly equivalents = computed(() => {
    const selected = this.selectedProduct();
    if (!selected) return [];
    return this.marketplace.getEquivalentProducts(selected.genericName, selected.ndc11);
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly marketplace: MarketplaceMockService,
    private readonly cart: CartMockService,
    private readonly snackBar: MatSnackBar
  ) {}

  addToCart(quote: PriceQuote): void {
    if (!this.selectedProduct()) return;
    this.cart.addFromQuote(this.selectedProduct()!.drugName, quote);
    this.snackBar.open(`${this.selectedProduct()!.drugName} added to cart.`, 'Close', { duration: 2000 });
  }
}

