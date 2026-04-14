import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-supplier-dashboard-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="Supplier Dashboard"
      subtitle="Supplier portal simulation (mocked)"
      body="Add supplier KPIs (fill rate, delivery performance, invoice accuracy) and incoming orders queue."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierDashboardPageComponent {}

