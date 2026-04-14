import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'mmc-supplier-performance-page',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <div class="grid">
      <mat-card appearance="outlined"><mat-card-content><h4>Fill Rate</h4><p>{{ perf().fill }}%</p></mat-card-content></mat-card>
      <mat-card appearance="outlined"><mat-card-content><h4>On-time Delivery</h4><p>{{ perf().delivery }}%</p></mat-card-content></mat-card>
      <mat-card appearance="outlined"><mat-card-content><h4>Invoice Accuracy</h4><p>{{ perf().invoice }}%</p></mat-card-content></mat-card>
      <mat-card appearance="outlined"><mat-card-content><h4>Promo Uplift</h4><p>{{ perf().promo }}%</p></mat-card-content></mat-card>
    </div>
    <mat-card appearance="outlined">
      <mat-card-header><mat-card-title>Monthly SLA Trend</mat-card-title></mat-card-header>
      <mat-card-content>
        @for (m of months(); track m.month) {
          <div class="row">
            <span>{{ m.month }}</span><span>Fill {{ m.fill }}%</span><span>Delivery {{ m.delivery }}%</span><span>Invoice {{ m.invoice }}%</span>
          </div>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .grid { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 10px; margin-bottom: 10px; }
      h4 { margin: 0; font-size: 12px; text-transform: uppercase; color: rgba(0,0,0,.65); }
      p { margin: 4px 0 0; font-size: 22px; font-weight: 700; }
      .row { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,.06); }
      @media (max-width: 1100px){ .grid { grid-template-columns: repeat(2,minmax(0,1fr)); } .row { grid-template-columns: 1fr; } }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierPerformancePageComponent {
  readonly perf = signal({ fill: 98.6, delivery: 96.2, invoice: 99.1, promo: 5.4 });
  readonly months = signal([
    { month: 'Jan', fill: 97.8, delivery: 95.4, invoice: 98.8 },
    { month: 'Feb', fill: 98.1, delivery: 95.9, invoice: 98.9 },
    { month: 'Mar', fill: 98.6, delivery: 96.2, invoice: 99.1 }
  ]);
}

