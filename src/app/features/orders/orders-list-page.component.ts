import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrdersMockService } from '../../core/services/orders-mock.service';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';
import { MarketplaceMockService } from '../../core/services/marketplace-mock.service';
import { OrderFilters } from '../../core/models/orders.models';

@Component({
  selector: 'mmc-orders-list-page',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatSnackBarModule,
    StatusChipComponent
  ],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>Orders</mat-card-title>
        <mat-card-subtitle>Mock order management list</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div class="filters">
          <mat-form-field appearance="outline">
            <mat-label>Search PO / supplier</mat-label>
            <input matInput [ngModel]="filters().query" (ngModelChange)="setFilter('query', $event)" />
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
            <mat-label>Status</mat-label>
            <mat-select [ngModel]="filters().status" (ngModelChange)="setFilter('status', $event)">
              <mat-option value="ALL">All</mat-option>
              <mat-option value="DRAFT">Draft</mat-option>
              <mat-option value="SUBMITTED">Submitted</mat-option>
              <mat-option value="ACKNOWLEDGED">Acknowledged</mat-option>
              <mat-option value="SHIPPED">Shipped</mat-option>
              <mat-option value="INVOICED">Invoiced</mat-option>
              <mat-option value="RECONCILED">Reconciled</mat-option>
              <mat-option value="EXCEPTION">Exception</mat-option>
            </mat-select>
          </mat-form-field>

          <button mat-stroked-button type="button" (click)="orders.resetFilters()">Reset</button>
        </div>

        <div class="table-tools">
          <mat-form-field appearance="outline">
            <mat-label>Sort by</mat-label>
            <mat-select [ngModel]="sortBy" (ngModelChange)="sortBy = $event">
              <mat-option value="createdAt">Created</mat-option>
              <mat-option value="poNumber">PO #</mat-option>
              <mat-option value="supplier">Supplier</mat-option>
              <mat-option value="totalAmount">Total</mat-option>
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
          <ng-container matColumnDef="poNumber">
            <th mat-header-cell *matHeaderCellDef>PO #</th>
            <td mat-cell *matCellDef="let order">
              <a [routerLink]="['/app/orders', order.id]">{{ order.poNumber }}</a>
            </td>
          </ng-container>

          <ng-container matColumnDef="supplier">
            <th mat-header-cell *matHeaderCellDef>Supplier</th>
            <td mat-cell *matCellDef="let order">{{ order.supplierName }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let order"><mmc-status-chip [label]="order.status" /></td>
          </ng-container>

          <ng-container matColumnDef="itemCount">
            <th mat-header-cell *matHeaderCellDef>Items</th>
            <td mat-cell *matCellDef="let order">{{ order.itemCount }}</td>
          </ng-container>

          <ng-container matColumnDef="totalAmount">
            <th mat-header-cell *matHeaderCellDef>Total</th>
            <td mat-cell *matCellDef="let order">\${{ order.totalAmount | number: '1.2-2' }}</td>
          </ng-container>

          <ng-container matColumnDef="createdAt">
            <th mat-header-cell *matHeaderCellDef>Created</th>
            <td mat-cell *matCellDef="let order">{{ order.createdAt | date: 'medium' }}</td>
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
        grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
      }
      .table {
        width: 100%;
      }
      .table-tools {
        display: grid;
        grid-template-columns: repeat(3, 220px);
        gap: 10px;
        margin-bottom: 8px;
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
      @media (max-width: 1200px) {
        .filters {
          grid-template-columns: 1fr;
        }
        .table-tools {
          grid-template-columns: 1fr;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListPageComponent {
  readonly orderRows = computed(() => this.orders.orders());
  readonly filters = computed(() => this.orders.filters());
  readonly suppliers = computed(() => this.marketplace.suppliers());
  sortBy: 'createdAt' | 'poNumber' | 'supplier' | 'totalAmount' = 'createdAt';
  sortDir: 'asc' | 'desc' = 'desc';
  pageSize = 10;
  pageIndex = 0;
  readonly sortedRows = computed(() => {
    const rows = [...this.orderRows()];
    rows.sort((a, b) => {
      let cmp = 0;
      if (this.sortBy === 'createdAt') cmp = a.createdAt.localeCompare(b.createdAt);
      if (this.sortBy === 'poNumber') cmp = a.poNumber.localeCompare(b.poNumber);
      if (this.sortBy === 'supplier') cmp = a.supplierName.localeCompare(b.supplierName);
      if (this.sortBy === 'totalAmount') cmp = a.totalAmount - b.totalAmount;
      return this.sortDir === 'asc' ? cmp : -cmp;
    });
    return rows;
  });
  readonly pagedRows = computed(() => {
    const start = this.pageIndex * this.pageSize;
    return this.sortedRows().slice(start, start + this.pageSize);
  });
  readonly pageStart = computed(() => this.pageIndex * this.pageSize);
  readonly pageEnd = computed(() => Math.min(this.pageStart() + this.pageSize, this.sortedRows().length));
  readonly cols = ['poNumber', 'supplier', 'status', 'itemCount', 'totalAmount', 'createdAt'];

  constructor(
    readonly orders: OrdersMockService,
    private readonly marketplace: MarketplaceMockService
  ) {}

  setFilter<K extends keyof OrderFilters>(key: K, value: OrderFilters[K]): void {
    this.orders.patchFilters({ [key]: value } as Pick<OrderFilters, K>);
    this.pageIndex = 0;
  }

  setPageSize(value: number): void {
    this.pageSize = Number(value);
    this.pageIndex = 0;
  }
}

