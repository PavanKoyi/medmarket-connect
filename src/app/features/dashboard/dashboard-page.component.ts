import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MetricCardComponent } from '../../shared/components/metric-card/metric-card.component';

type RecentOrderRow = {
  poNumber: string;
  supplier: string;
  status: string;
  total: string;
  createdAt: string;
};

@Component({
  selector: 'mmc-dashboard-page',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MetricCardComponent],
  template: `
    <mat-card appearance="outlined" class="hero">
      <mat-card-content class="hero-content">
        <div>
          <h2>Investor Demo View</h2>
          <p>
            MedMarket Connect gives pharmacy buyers a live-style sourcing workspace: supplier comparison, margin-aware
            carting, and full PO lifecycle visibility in one platform.
          </p>
        </div>
        <div class="hero-badges">
          <span>Multi-supplier Marketplace</span>
          <span>Automated Procurement Workflow</span>
          <span>Compliance-ready Data Trail</span>
        </div>
      </mat-card-content>
    </mat-card>

    <div class="grid">
      <mmc-metric-card label="Monthly spend" value="$182,450" hint="Across 4 suppliers" />
      <mmc-metric-card label="Monthly savings" value="$14,120" hint="Estimated vs baseline" />
      <mmc-metric-card label="Open orders" value="18" hint="3 need attention" />
      <mmc-metric-card label="Pending approvals" value="5" hint="Threshold exceeded" />
      <mmc-metric-card label="Shortage alerts" value="7" hint="2 critical" />
      <mmc-metric-card label="Subscribe & Save rules" value="12" hint="3 cycles upcoming" />
    </div>

    <div class="lower">
      <mat-card appearance="outlined">
        <mat-card-header>
          <mat-card-title>Recent orders</mat-card-title>
          <mat-card-subtitle>Mock static data</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="recentOrders" class="table">
            <ng-container matColumnDef="poNumber">
              <th mat-header-cell *matHeaderCellDef>PO #</th>
              <td mat-cell *matCellDef="let r">{{ r.poNumber }}</td>
            </ng-container>

            <ng-container matColumnDef="supplier">
              <th mat-header-cell *matHeaderCellDef>Supplier</th>
              <td mat-cell *matCellDef="let r">{{ r.supplier }}</td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let r">{{ r.status }}</td>
            </ng-container>

            <ng-container matColumnDef="total">
              <th mat-header-cell *matHeaderCellDef>Total</th>
              <td mat-cell *matCellDef="let r">{{ r.total }}</td>
            </ng-container>

            <ng-container matColumnDef="createdAt">
              <th mat-header-cell *matHeaderCellDef>Created</th>
              <td mat-cell *matCellDef="let r">{{ r.createdAt }}</td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="cols"></tr>
            <tr mat-row *matRowDef="let row; columns: cols"></tr>
          </table>
        </mat-card-content>
      </mat-card>

      <mat-card appearance="outlined">
        <mat-card-header>
          <mat-card-title>Alerts panel</mat-card-title>
          <mat-card-subtitle>Placeholder</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p class="muted">Add shortage watchlist, approvals queue, and price variance trend widgets next.</p>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-columns: repeat(6, minmax(0, 1fr));
        gap: 12px;
        margin-bottom: 14px;
      }
      .hero {
        margin-bottom: 14px;
      }
      .hero-content {
        display: grid;
        grid-template-columns: 1.6fr 1fr;
        gap: 16px;
        align-items: center;
      }
      .hero h2 {
        margin: 0 0 8px;
        font-size: 24px;
      }
      .hero p {
        margin: 0;
        color: rgba(0, 0, 0, 0.68);
      }
      .hero-badges {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .hero-badges span {
        font-size: 12px;
        font-weight: 600;
        border-radius: 999px;
        padding: 6px 10px;
        background: rgba(29, 78, 216, 0.12);
        color: #0f3fbf;
      }
      .lower {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 12px;
      }
      .table {
        width: 100%;
      }
      .muted {
        margin: 0;
        color: rgba(0, 0, 0, 0.68);
      }
      @media (max-width: 1200px) {
        .grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
        .hero-content {
          grid-template-columns: 1fr;
        }
        .lower {
          grid-template-columns: 1fr;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  readonly cols = ['poNumber', 'supplier', 'status', 'total', 'createdAt'] as const;

  readonly recentOrders: RecentOrderRow[] = [
    { poNumber: 'PO-10483', supplier: 'Cardinal', status: 'Submitted', total: '$12,480', createdAt: '2026-04-13' },
    { poNumber: 'PO-10482', supplier: 'McKesson', status: 'Acknowledged', total: '$8,190', createdAt: '2026-04-12' },
    { poNumber: 'PO-10481', supplier: 'AmerisourceBergen', status: 'Shipped', total: '$4,650', createdAt: '2026-04-12' },
    { poNumber: 'PO-10480', supplier: 'HD Smith', status: 'Invoiced', total: '$2,110', createdAt: '2026-04-11' }
  ];
}

