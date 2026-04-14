import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mmc-supplier-dashboard-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="kpi">
      <mat-card appearance="outlined"><mat-card-content><h4>Fill Rate</h4><p>{{ metrics().fillRate }}%</p></mat-card-content></mat-card>
      <mat-card appearance="outlined"><mat-card-content><h4>Delivery SLA</h4><p>{{ metrics().delivery }}%</p></mat-card-content></mat-card>
      <mat-card appearance="outlined"><mat-card-content><h4>Invoice Accuracy</h4><p>{{ metrics().invoice }}%</p></mat-card-content></mat-card>
    </div>
    <mat-card appearance="outlined">
      <mat-card-header><mat-card-title>Incoming Orders Queue</mat-card-title></mat-card-header>
      <mat-card-content>
        @for (q of queue(); track q.id) {
          <div class="row">
            <span>{{ q.po }} • {{ q.pharmacy }}</span>
            <span>\${{ q.total }}</span>
            <button mat-stroked-button type="button" (click)="ack(q.id)">Acknowledge</button>
          </div>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .kpi { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 10px; margin-bottom: 10px; }
      h4 { margin: 0; font-size: 12px; text-transform: uppercase; color: rgba(0,0,0,.65); }
      p { margin: 4px 0 0; font-size: 24px; font-weight: 700; }
      .row { display: grid; grid-template-columns: 1fr 120px auto; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,.06); }
      @media (max-width: 1100px){ .kpi { grid-template-columns: 1fr; } .row { grid-template-columns: 1fr; } }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierDashboardPageComponent {
  readonly metrics = signal({ fillRate: 98.6, delivery: 96.2, invoice: 99.1 });
  readonly queue = signal([
    { id: 'sq1', po: 'PO-10490', pharmacy: 'PrimeRx LA', total: 8340 },
    { id: 'sq2', po: 'PO-10491', pharmacy: 'PrimeRx NY', total: 5120 }
  ]);

  ack(id: string): void {
    this.queue.set(this.queue().filter((q) => q.id !== id));
  }
}

