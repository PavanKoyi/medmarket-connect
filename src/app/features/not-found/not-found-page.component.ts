import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';

@Component({
  selector: 'mmc-not-found-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `<mmc-feature-placeholder title="Not found" subtitle="404" body="This page does not exist." />`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPageComponent {}

