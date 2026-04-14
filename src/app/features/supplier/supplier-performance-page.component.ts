import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-supplier-performance-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="Performance"
      subtitle="Fill-rate and delivery performance (mocked)"
      body="Add performance cards, SLA trends, and promotion impact insights (mocked)."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierPerformancePageComponent {}

