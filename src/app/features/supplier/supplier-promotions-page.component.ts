import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-supplier-promotions-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="Promotions"
      subtitle="Promotion management (mocked)"
      body="Add promotions panel to create and manage promotional pricing and highlight pharmacy-facing opportunities (mocked)."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierPromotionsPageComponent {}

