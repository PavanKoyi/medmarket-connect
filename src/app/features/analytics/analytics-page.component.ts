import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-analytics-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="Analytics & Reporting"
      subtitle="Spend, savings, variance, performance (mocked)"
      body="Add spend analysis dashboard, savings attribution, supplier scorecards, contract compliance, benchmarks, and price trend placeholders."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsPageComponent {}

