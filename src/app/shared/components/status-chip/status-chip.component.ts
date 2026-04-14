import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'mmc-status-chip',
  standalone: true,
  imports: [MatChipsModule],
  template: `<mat-chip [highlighted]="true" [class]="chipClass()">{{ label() }}</mat-chip>`,
  styles: [
    `
      .ok {
        background: rgba(46, 125, 50, 0.14);
      }
      .warn {
        background: rgba(245, 124, 0, 0.16);
      }
      .bad {
        background: rgba(198, 40, 40, 0.16);
      }
      .neutral {
        background: rgba(2, 136, 209, 0.14);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusChipComponent {
  readonly label = input.required<string>();

  readonly chipClass = computed(() => {
    const value = this.label().toUpperCase();
    if (value.includes('IN_STOCK') || value.includes('RECONCILED') || value.includes('ACKNOWLEDGED')) return 'ok';
    if (value.includes('LOW_STOCK') || value.includes('SUBMITTED') || value.includes('SHIPPED')) return 'warn';
    if (value.includes('BACKORDER') || value.includes('ALLOCATED') || value.includes('EXCEPTION')) return 'bad';
    return 'neutral';
  });
}

