import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-marketplace-search-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="Marketplace Search"
      subtitle="Search + filters + price comparison (mocked)"
      body="Implement drug search by name/NDC, filters (brand/generic, supplier, contract, GPO, availability), and a price comparison table with margin insights."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketplaceSearchPageComponent {}

