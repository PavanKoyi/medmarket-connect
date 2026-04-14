import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-admin-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `
    <mmc-feature-placeholder
      title="Admin & Configuration"
      subtitle="Users, roles, approvals, preferences (mocked)"
      body="Add user management, role assignment, approval threshold settings, preferred suppliers, and location switching (mocked)."
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPageComponent {}

