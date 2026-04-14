import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-smartintegration-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="SmartIntegration"
      subtitle="Embedded workflow simulation (mocked)"
      body="Simulate Rx entry workflow with an embedded MARKET sidebar: adjudication info, inline quotes, alternatives, and one-click add-to-cart."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartIntegrationPageComponent {}

