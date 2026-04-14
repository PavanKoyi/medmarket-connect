import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-alerts-center-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="Alerts Center"
      subtitle="Notifications & alerts (mocked)"
      body="Implement alerts feed list with filters and detail drawer: shortages, price increases, approvals required, cutoff reminders, and formulary changes."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsCenterPageComponent {}

