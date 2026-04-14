import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'mmc-metric-card',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card appearance="outlined" class="metric">
      <div class="label">{{ label() }}</div>
      <div class="value">{{ value() }}</div>
      @if (hint()) {
        <div class="hint">{{ hint() }}</div>
      }
    </mat-card>
  `,
  styles: [
    `
      .metric {
        padding: 14px 14px;
      }
      .label {
        font-size: 12px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(0, 0, 0, 0.55);
        margin-bottom: 6px;
      }
      .value {
        font-size: 22px;
        font-weight: 700;
        letter-spacing: 0.2px;
      }
      .hint {
        margin-top: 6px;
        font-size: 13px;
        color: rgba(0, 0, 0, 0.65);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricCardComponent {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly hint = input<string | null>(null);
}

