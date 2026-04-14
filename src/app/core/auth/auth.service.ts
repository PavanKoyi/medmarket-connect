import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DEMO_ACCOUNTS } from '../../mock-data/auth/demo-accounts';
import { UserProfile, UserRole } from '../models/auth.models';

const STORAGE_KEY = 'mmc.session.v1';

type Session = {
  user: UserProfile;
  createdAt: string;
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<UserProfile | null>(null);

  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);
  readonly role = computed<UserRole | null>(() => this._user()?.role ?? null);

  constructor(private readonly router: Router) {
    this.hydrateFromStorage();
  }

  login(email: string, password: string): { ok: true; user: UserProfile } | { ok: false; message: string } {
    const account = DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === email.toLowerCase());
    if (!account || account.password !== password) {
      return { ok: false, message: 'Invalid email or password.' };
    }

    const user: UserProfile = {
      id: crypto.randomUUID(),
      name: account.name,
      email: account.email,
      role: account.role,
      pharmacyId: account.role === 'SUPPLIER_USER' ? undefined : 'pharmacy_demo_1',
      supplierId: account.role === 'SUPPLIER_USER' ? 'supplier_demo_1' : undefined,
      permissions: this.seedPermissions(account.role)
    };

    this.setSession({ user, createdAt: new Date().toISOString() });
    return { ok: true, user };
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this._user.set(null);
    void this.router.navigateByUrl('/login');
  }

  redirectAfterLogin(user: UserProfile): void {
    const target = user.role === 'SUPPLIER_USER' ? '/supplier/dashboard' : '/app/dashboard';
    void this.router.navigateByUrl(target);
  }

  private hydrateFromStorage(): void {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const session = JSON.parse(raw) as Session;
      if (!session?.user?.role || !session?.user?.email) return;
      this._user.set(session.user);
    } catch {
      // ignore
    }
  }

  private setSession(session: Session): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    this._user.set(session.user);
  }

  private seedPermissions(role: UserRole): string[] {
    if (role === 'SUPPLIER_USER') {
      return ['SUPPLIER_DASHBOARD_VIEW', 'SUPPLIER_CATALOG_EDIT', 'SUPPLIER_ORDERS_VIEW'];
    }
    switch (role) {
      case 'OWNER_ADMIN':
        return ['APP_ADMIN', 'APP_ORDERS_VIEW', 'APP_MARKETPLACE_VIEW', 'APP_ANALYTICS_VIEW', 'APP_COMPLIANCE_VIEW'];
      case 'PIC':
        return ['APP_ORDERS_VIEW', 'APP_MARKETPLACE_VIEW', 'APP_COMPLIANCE_VIEW'];
      case 'PURCHASING_MANAGER':
        return ['APP_ORDERS_VIEW', 'APP_MARKETPLACE_VIEW', 'APP_ANALYTICS_VIEW'];
      case 'COMPLIANCE_OFFICER':
        return ['APP_COMPLIANCE_VIEW', 'APP_AUDIT_VIEW'];
      default:
        return ['APP_ORDERS_VIEW', 'APP_MARKETPLACE_VIEW'];
    }
  }
}

