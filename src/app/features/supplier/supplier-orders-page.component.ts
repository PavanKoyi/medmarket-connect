import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-supplier-orders-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="Supplier Orders"
      subtitle="Incoming orders queue (mocked)"
      body="Add supplier-side order queue, acknowledgements, shipment updates, and invoice accuracy metrics (mocked)."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierOrdersPageComponent {}

