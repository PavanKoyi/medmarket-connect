import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-orders-list-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="Orders"
      subtitle="Order list + filters (mocked)"
      body="Add an order list with filters (supplier/date/status/NDC), and link into order detail pages with status timeline and audit trail."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListPageComponent {}

