import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mmc-analytics-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <div class="grid">
      <mat-card appearance="outlined"><mat-card-content><h3>Spend Analysis</h3><p>\${{ kpi().spend }}</p></mat-card-content></mat-card>
      <mat-card appearance="outlined"><mat-card-content><h3>Savings Attribution</h3><p>\${{ kpi().savings }}</p></mat-card-content></mat-card>
      <mat-card appearance="outlined"><mat-card-content><h3>Variance Index</h3><p>{{ kpi().variance }}%</p></mat-card-content></mat-card>
      <mat-card appearance="outlined"><mat-card-content><h3>Contract Compliance</h3><p>{{ kpi().compliance }}%</p></mat-card-content></mat-card>
    </div>
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>Benchmark Snapshot</mat-card-title>
        <mat-card-subtitle>Interactive mock views</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <div class="tabs">
          <button mat-stroked-button type="button" (click)="view.set('supplier')">Supplier scorecard</button>
          <button mat-stroked-button type="button" (click)="view.set('trend')">Price trend</button>
          <button mat-stroked-button type="button" (click)="view.set('margin')">Net margin</button>
        </div>
        @if (view() === 'supplier') {
          <div class="panel">Top supplier this month: Cardinal (fill-rate 98.6%, invoice accuracy 99.1%).</div>
        } @else if (view() === 'trend') {
          <div class="panel">Price trend for top 20 SKUs is down 3.4% vs previous cycle.</div>
        } @else {
          <div class="panel">Net margin by Rx improved +4.8% after supplier optimization.</div>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 10px; margin-bottom: 10px; }
      h3 { margin: 0 0 4px; font-size: 13px; color: rgba(0,0,0,.65); text-transform: uppercase; letter-spacing: .06em; }
      p { margin: 0; font-size: 24px; font-weight: 700; }
      .tabs { display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }
      .panel { padding: 12px; border-radius: 10px; background: rgba(14,165,233,.10); font-weight: 600; }
      @media (max-width: 1100px){ .grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsPageComponent {
  readonly kpi = signal({ spend: '182,450', savings: '14,120', variance: 6.2, compliance: 93.8 });
  readonly view = signal<'supplier' | 'trend' | 'margin'>('supplier');
}

