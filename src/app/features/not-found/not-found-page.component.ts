import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeaturePlaceholderComponent } from '../../shared/components/feature-placeholder/feature-placeholder.component';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'mmc-not-found-page',
  standalone: true,
  imports: [FeaturePlaceholderComponent],
  template: `<mmc-feature-placeholder title="Not found" subtitle="404" body="This page does not exist." />`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPageComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
}

