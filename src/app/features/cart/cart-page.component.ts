import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-cart-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="Cart"
      subtitle="Multi-supplier cart (mocked)"
      body="Group items by supplier, show approval threshold warnings, and provide checkout review and PO submission (mock)."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartPageComponent {}

