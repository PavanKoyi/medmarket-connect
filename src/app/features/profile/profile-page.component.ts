import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'mmc-profile-page',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>Profile</mat-card-title>
        <mat-card-subtitle>Mocked session profile</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        @if (user()) {
          <div class="row"><span class="k">Name</span><span class="v">{{ user()!.name }}</span></div>
          <div class="row"><span class="k">Email</span><span class="v">{{ user()!.email }}</span></div>
          <div class="row"><span class="k">Role</span><span class="v">{{ user()!.role }}</span></div>
        } @else {
          <p class="muted">Not signed in.</p>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .row {
        display: grid;
        grid-template-columns: 160px 1fr;
        padding: 8px 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      }
      .k {
        font-weight: 600;
        color: rgba(0, 0, 0, 0.65);
      }
      .v {
        color: rgba(0, 0, 0, 0.85);
      }
      .muted {
        margin: 0;
        color: rgba(0, 0, 0, 0.65);
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent {
  readonly user = computed(() => this.auth.user());
  constructor(private readonly auth: AuthService) {}
}

