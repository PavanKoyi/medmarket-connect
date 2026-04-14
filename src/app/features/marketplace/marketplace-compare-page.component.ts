import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-marketplace-compare-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="Compare"
      subtitle="Equivalent NDC comparisons"
      body="Add a compare view to show equivalent NDCs, substitutions, shortage indicators, and highlight cheapest/contract options across suppliers."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceComparePageComponent {}

