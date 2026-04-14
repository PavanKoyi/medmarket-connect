import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../core/auth/auth.service';
import { DEMO_ACCOUNTS } from '../../../mock-data/auth/demo-accounts';

@Component({
  selector: 'mmc-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule
  ],
  template: `
    <div class="login-grid">
      <mat-card class="login-card" appearance="outlined">
        <mat-card-header>
          <mat-card-title>MedMarket Connect</mat-card-title>
          <mat-card-subtitle>Demo login (mocked)</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="login-form">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" autocomplete="username" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Password</mat-label>
              <input
                matInput
                [type]="showPassword() ? 'text' : 'password'"
                formControlName="password"
                autocomplete="current-password"
              />
              <button
                mat-icon-button
                matSuffix
                type="button"
                [attr.aria-label]="showPassword() ? 'Hide password' : 'Show password'"
                (click)="showPassword.set(!showPassword())"
              >
                <mat-icon>{{ showPassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
            </mat-form-field>

            @if (error()) {
              <div class="error">{{ error() }}</div>
            }

            <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid || submitting()">
              Sign in
            </button>

            <a class="forgot" [routerLink]="['/login']" (click)="$event.preventDefault()">Forgot password (placeholder)</a>
          </form>

          <mat-divider class="divider" />

          <div class="demo-panel">
            <div class="demo-title">Quick login</div>
            <div class="demo-buttons">
              @for (acct of demoAccounts(); track acct.email) {
                <button mat-stroked-button type="button" (click)="quickLogin(acct.email, acct.password)">
                  {{ acct.role }}
                </button>
              }
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <div class="right-rail">
        <div class="badge">DEMO</div>
        <h2>Enterprise Angular 19 shell</h2>
        <p>
          Standalone components, role-aware routing, mock data services, and enterprise layout patterns. No backend
          integrations in this phase.
        </p>
      </div>
    </div>
  `,
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  private readonly fb = inject(FormBuilder);

  readonly showPassword = signal(false);
  readonly submitting = signal(false);
  readonly error = signal<string | null>(null);

  readonly demoAccounts = computed(() => DEMO_ACCOUNTS);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private readonly auth: AuthService) {}

  quickLogin(email: string, password: string): void {
    this.form.setValue({ email, password });
    this.onSubmit();
  }

  onSubmit(): void {
    this.error.set(null);
    if (this.form.invalid) return;

    this.submitting.set(true);
    const { email, password } = this.form.getRawValue();
    const result = this.auth.login(email, password);
    this.submitting.set(false);

    if (!result.ok) {
      this.error.set(result.message);
      return;
    }
    this.auth.redirectAfterLogin(result.user);
  }
}

