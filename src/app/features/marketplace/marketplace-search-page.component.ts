import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MarketplaceMockService } from '../../core/services/marketplace-mock.service';
import { CartMockService } from '../../core/services/cart-mock.service';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';
import { MarketplaceFilters, PriceQuote } from '../../core/models/marketplace.models';

@Component({
  selector: 'mmc-marketplace-search-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatSnackBarModule,
    StatusChipComponent
  ],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>Marketplace Search</mat-card-title>
        <mat-card-subtitle>Fully mock implemented price comparison workflow</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div class="filters">
          <mat-form-field appearance="outline">
            <mat-label>Search drug / NDC / category</mat-label>
            <input
              matInput
              [ngModel]="filters().query"
              (ngModelChange)="setFilter('query', $event)"
              placeholder="e.g. atorvastatin or 65862042099"
            />
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Supplier</mat-label>
            <mat-select [ngModel]="filters().supplierId" (ngModelChange)="setFilter('supplierId', $event)">
              <mat-option value="ALL">All suppliers</mat-option>
              @for (supplier of suppliers(); track supplier.id) {
                <mat-option [value]="supplier.id">{{ supplier.name }}</mat-option>
              }
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Brand / Generic</mat-label>
            <mat-select [ngModel]="filters().brandType" (ngModelChange)="setFilter('brandType', $event)">
              <mat-option value="ALL">All</mat-option>
              <mat-option value="BRAND">Brand</mat-option>
              <mat-option value="GENERIC">Generic</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Availability</mat-label>
            <mat-select [ngModel]="filters().availability" (ngModelChange)="setFilter('availability', $event)">
              <mat-option value="ALL">All</mat-option>
              <mat-option value="IN_STOCK">In stock</mat-option>
              <mat-option value="LOW_STOCK">Low stock</mat-option>
              <mat-option value="BACKORDER">Backorder</mat-option>
              <mat-option value="ALLOCATED">Allocated</mat-option>
            </mat-select>
          </mat-form-field>

          <div class="checks">
            <mat-checkbox [ngModel]="filters().gpoOnly" (ngModelChange)="setFilter('gpoOnly', $event)">GPO only</mat-checkbox>
            <mat-checkbox [ngModel]="filters().addVerifiedOnly" (ngModelChange)="setFilter('addVerifiedOnly', $event)">
              ADD verified suppliers
            </mat-checkbox>
            <button mat-stroked-button type="button" (click)="marketplace.resetFilters()">Reset</button>
          </div>
        </div>

        <div class="table-tools">
          <mat-form-field appearance="outline">
            <mat-label>Sort by</mat-label>
            <mat-select [ngModel]="sortBy" (ngModelChange)="sortBy = $event">
              <mat-option value="drug">Drug</mat-option>
              <mat-option value="price">Best price</mat-option>
              <mat-option value="margin">Margin</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Direction</mat-label>
            <mat-select [ngModel]="sortDir" (ngModelChange)="sortDir = $event">
              <mat-option value="asc">Ascending</mat-option>
              <mat-option value="desc">Descending</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Rows per page</mat-label>
            <mat-select [ngModel]="pageSize" (ngModelChange)="setPageSize($event)">
              <mat-option [value]="5">5</mat-option>
              <mat-option [value]="10">10</mat-option>
              <mat-option [value]="20">20</mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <table mat-table [dataSource]="pagedRows()" class="table">
          <ng-container matColumnDef="drug">
            <th mat-header-cell *matHeaderCellDef>Drug</th>
            <td mat-cell *matCellDef="let row">
              <div class="drug-title">{{ row.product.drugName }}</div>
              <div class="drug-sub">{{ row.product.ndc11 }} • {{ row.product.manufacturer }}</div>
            </td>
          </ng-container>

          <ng-container matColumnDef="bestQuote">
            <th mat-header-cell *matHeaderCellDef>Best quote</th>
            <td mat-cell *matCellDef="let row">
              @if (row.bestQuote) {
                <div>\${{ row.bestQuote.packagePrice | number: '1.2-2' }} ({{ row.bestQuote.supplierName }})</div>
                <mmc-status-chip [label]="row.bestQuote.availability" />
              } @else {
                <span class="muted">No quotes</span>
              }
            </td>
          </ng-container>

          <ng-container matColumnDef="margin">
            <th mat-header-cell *matHeaderCellDef>Estimated margin</th>
            <td mat-cell *matCellDef="let row">
              @if (row.margin) {
                <div>\${{ row.margin.estimatedMargin | number: '1.2-2' }}</div>
                <div class="drug-sub">Reimburse: \${{ row.margin.reimbursement }}</div>
              } @else {
                <span class="muted">N/A</span>
              }
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let row">
              @if (row.bestQuote) {
                <button mat-flat-button color="primary" type="button" (click)="addToCart(row.product.drugName, row.bestQuote)">
                  Add to cart
                </button>
                <a mat-button [routerLink]="['/app/marketplace/compare']" [queryParams]="{ ndc11: row.product.ndc11 }">Compare</a>
              }
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="cols"></tr>
          <tr mat-row *matRowDef="let row; columns: cols"></tr>
        </table>

        <div class="pager">
          <span>Showing {{ pageStart() + 1 }}-{{ pageEnd() }} of {{ sortedRows().length }}</span>
          <div class="pager-actions">
            <button mat-stroked-button type="button" [disabled]="pageIndex === 0" (click)="pageIndex = pageIndex - 1">Prev</button>
            <button
              mat-stroked-button
              type="button"
              [disabled]="pageEnd() >= sortedRows().length"
              (click)="pageIndex = pageIndex + 1"
            >
              Next
            </button>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .filters {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 10px;
        margin-bottom: 12px;
      }
      .checks {
        grid-column: 1 / -1;
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 10px;
        border: 1px solid rgba(29, 78, 216, 0.15);
        border-radius: 12px;
        background: rgba(29, 78, 216, 0.04);
      }
      .table-tools {
        display: grid;
        grid-template-columns: repeat(3, 220px);
        gap: 10px;
      }
      .table {
        width: 100%;
      }
      .pager {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .pager-actions {
        display: flex;
        gap: 8px;
      }
      .drug-title {
        font-weight: 600;
      }
      .drug-sub {
        font-size: 12px;
        color: rgba(0, 0, 0, 0.6);
      }
      .muted {
        color: rgba(0, 0, 0, 0.55);
      }
      @media (max-width: 1200px) {
        .filters {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .table-tools {
          grid-template-columns: 1fr;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceSearchPageComponent {
  readonly filters = computed(() => this.marketplace.filters());
  readonly suppliers = computed(() => this.marketplace.suppliers());
  readonly rows = computed(() => this.marketplace.rows());
  sortBy: 'drug' | 'price' | 'margin' = 'price';
  sortDir: 'asc' | 'desc' = 'asc';
  pageSize = 10;
  pageIndex = 0;
  readonly sortedRows = computed(() => {
    const rows = [...this.rows()];
    rows.sort((a, b) => {
      let av = 0;
      let bv = 0;
      if (this.sortBy === 'drug') {
        return this.sortDir === 'asc'
          ? a.product.drugName.localeCompare(b.product.drugName)
          : b.product.drugName.localeCompare(a.product.drugName);
      }
      if (this.sortBy === 'price') {
        av = a.bestQuote?.packagePrice ?? Number.POSITIVE_INFINITY;
        bv = b.bestQuote?.packagePrice ?? Number.POSITIVE_INFINITY;
      } else {
        av = a.margin?.estimatedMargin ?? Number.NEGATIVE_INFINITY;
        bv = b.margin?.estimatedMargin ?? Number.NEGATIVE_INFINITY;
      }
      return this.sortDir === 'asc' ? av - bv : bv - av;
    });
    return rows;
  });
  readonly pagedRows = computed(() => {
    const start = this.pageIndex * this.pageSize;
    return this.sortedRows().slice(start, start + this.pageSize);
  });
  readonly pageStart = computed(() => this.pageIndex * this.pageSize);
  readonly pageEnd = computed(() => Math.min(this.pageStart() + this.pageSize, this.sortedRows().length));
  readonly cols = ['drug', 'bestQuote', 'margin', 'actions'];

  constructor(
    readonly marketplace: MarketplaceMockService,
    private readonly cart: CartMockService,
    private readonly snackBar: MatSnackBar
  ) {}

  setFilter<K extends keyof MarketplaceFilters>(key: K, value: MarketplaceFilters[K]): void {
    this.marketplace.patchFilters({ [key]: value } as Pick<MarketplaceFilters, K>);
    this.pageIndex = 0;
  }

  addToCart(drugName: string, quote: PriceQuote): void {
    this.cart.addFromQuote(drugName, quote);
    this.snackBar.open(`${drugName} added to cart.`, 'Close', { duration: 2000 });
  }

  setPageSize(value: number): void {
    this.pageSize = Number(value);
    this.pageIndex = 0;
  }
}

