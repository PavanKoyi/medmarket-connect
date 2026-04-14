import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-compliance-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="Compliance & Audit"
      subtitle="DSCSA, DEA, ADD, audit explorer (mocked)"
      body="Add compliance indicators, supplier licensure table, security events card, and audit log explorer aligned to 21 CFR Part 11 UI patterns."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompliancePageComponent {}

