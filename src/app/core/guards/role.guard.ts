import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserRole } from '../models/auth.models';

export function roleGuard(allowed: UserRole[]): CanActivateFn {
  return (): boolean | UrlTree => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const role = auth.role();
    if (!role) return router.parseUrl('/login');
    return allowed.includes(role) ? true : router.parseUrl('/app/dashboard');
  };
}

