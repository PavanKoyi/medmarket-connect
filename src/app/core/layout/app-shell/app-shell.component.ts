import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { BreadcrumbsService } from '../breadcrumbs/breadcrumbs.service';
import { NavService } from '../navigation/nav.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'mmc-app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule
  ],
  template: `
    <mat-sidenav-container class="shell">
      <mat-sidenav
        class="sidenav"
        mode="side"
        [opened]="!collapsed()"
        [fixedInViewport]="true"
        fixedTopGap="56"
      >
        <div class="nav-header">
          <div class="product">MedMarket Connect</div>
          <div class="env-badge">DEMO</div>
        </div>

        <mat-divider />

        <mat-nav-list>
          @for (item of navItems(); track item.route) {
            <a mat-list-item [routerLink]="item.route" routerLinkActive="active">
              <mat-icon matListItemIcon>{{ item.icon }}</mat-icon>
              <span matListItemTitle>{{ item.label }}</span>
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary" class="topbar">
          <button mat-icon-button type="button" (click)="collapsed.set(!collapsed())" aria-label="Toggle navigation">
            <mat-icon>menu</mat-icon>
          </button>

          <div class="topbar-title">
            <span class="brand">MedMarket Connect</span>
            <span class="pill">DEMO</span>
          </div>

          <span class="spacer"></span>

          <button mat-icon-button type="button" aria-label="Notifications" [matBadge]="3" matBadgeColor="warn">
            <mat-icon>notifications</mat-icon>
          </button>

          <button mat-button [matMenuTriggerFor]="profileMenu">
            <mat-icon>account_circle</mat-icon>
            <span class="profile-name">{{ displayName() }}</span>
          </button>
          <mat-menu #profileMenu="matMenu">
            <button mat-menu-item [routerLink]="'/app/profile'">
              <mat-icon>person</mat-icon>
              <span>Profile</span>
            </button>
            <button mat-menu-item (click)="auth.logout()">
              <mat-icon>logout</mat-icon>
              <span>Logout</span>
            </button>
          </mat-menu>
        </mat-toolbar>

        <div class="breadcrumb-bar">
          @for (c of crumbs(); track c.url) {
            <a [routerLink]="c.url">{{ c.label }}</a>
            @if (!$last) {
              <span class="sep">/</span>
            }
          }
        </div>

        <main class="content">
          <router-outlet />
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrl: './app-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent {
  readonly collapsed = signal(false);

  readonly navItems = computed(() => this.nav.items());
  readonly crumbs = computed(() => this.breadcrumbs.crumbs());
  readonly displayName = computed(() => {
    const user = this.auth.user();
    return user ? `${user.name} (${user.role})` : 'Guest';
  });

  constructor(
    readonly auth: AuthService,
    private readonly nav: NavService,
    private readonly breadcrumbs: BreadcrumbsService
  ) {}
}

