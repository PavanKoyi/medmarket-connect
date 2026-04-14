import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'mmc-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="auth-shell">
      <div class="auth-content">
        <router-outlet />
      </div>
    </div>
  `,
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent {}

