import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';

@Component({
  selector: 'mmc-supplier-orders-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, StatusChipComponent],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header><mat-card-title>Supplier Orders Queue</mat-card-title></mat-card-header>
      <mat-card-content>
        @for (o of orders(); track o.id) {
          <div class="row">
            <div>
              <div class="title">{{ o.poNumber }}</div>
              <div class="muted">{{ o.pharmacy }}</div>
            </div>
            <mmc-status-chip [label]="o.status" />
            <button mat-stroked-button type="button" (click)="advance(o.id)">Advance status</button>
          </div>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .row { display: grid; grid-template-columns: 1fr auto auto; gap: 10px; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,.06); }
      .title { font-weight: 600; }
      .muted { color: rgba(0,0,0,.62); }
      @media (max-width: 900px){ .row { grid-template-columns: 1fr; } }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierOrdersPageComponent {
  readonly orders = signal([
    { id: 'so1', poNumber: 'PO-10490', pharmacy: 'PrimeRx LA', status: 'SUBMITTED' },
    { id: 'so2', poNumber: 'PO-10491', pharmacy: 'PrimeRx NY', status: 'ACKNOWLEDGED' }
  ]);

  advance(id: string): void {
    const nextMap: Record<string, string> = {
      SUBMITTED: 'ACKNOWLEDGED',
      ACKNOWLEDGED: 'SHIPPED',
      SHIPPED: 'INVOICED',
      INVOICED: 'RECONCILED',
      RECONCILED: 'RECONCILED'
    };
    this.orders.set(this.orders().map((o) => (o.id === id ? { ...o, status: nextMap[o.status] ?? o.status } : o)));
  }
}

