import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-order-detail-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      [title]="title()"
      subtitle="Lifecycle timeline + shipment + invoice + reconciliation (mocked)"
      body="Implement order detail view: status timeline (Draft → Submitted → Acknowledged → Shipped → Invoiced → Reconciled), shipment tracking mock, invoice panel, and audit log."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailPageComponent {
  readonly orderId = computed(() => this.route.snapshot.paramMap.get('id') ?? '—');
  readonly title = computed(() => `Order ${this.orderId()}`);

  constructor(private readonly route: ActivatedRoute) {}
}

