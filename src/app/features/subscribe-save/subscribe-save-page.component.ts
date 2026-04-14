import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-subscribe-save-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="Subscribe & Save"
      subtitle="Automated reorder rules (mocked)"
      body="Implement subscription rules table + form (frequency, thresholds), pending review queue, forecast spend summary, and cycle history."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscribeSavePageComponent {}

