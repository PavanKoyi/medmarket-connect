import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-supplier-catalog-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="Catalog"
      subtitle="Catalog management (mocked)"
      body="Implement supplier catalog table, inventory status, and pricing submission workflow (mocked)."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierCatalogPageComponent {}

