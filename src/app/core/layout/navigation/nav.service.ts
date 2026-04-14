import { Injectable, computed } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { NavItem } from '../../models/nav.models';

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: 'dashboard', route: '/app/dashboard', group: 'APP' },
  { label: 'Marketplace', icon: 'search', route: '/app/marketplace/search', group: 'APP' },
  { label: 'Cart', icon: 'shopping_cart', route: '/app/cart', group: 'APP' },
  { label: 'Orders', icon: 'receipt_long', route: '/app/orders', group: 'APP' },
  { label: 'SmartIntegration', icon: 'view_sidebar', route: '/app/smartintegration', group: 'APP' },
  { label: 'Subscribe & Save', icon: 'autorenew', route: '/app/subscribe-save', group: 'APP' },
  { label: 'Analytics', icon: 'bar_chart', route: '/app/analytics', group: 'APP' },
  { label: 'Compliance', icon: 'verified_user', route: '/app/compliance', group: 'APP' },
  { label: 'Alerts', icon: 'notifications', route: '/app/alerts', group: 'APP' },
  { label: 'Admin', icon: 'admin_panel_settings', route: '/app/admin', group: 'APP', roles: ['OWNER_ADMIN'] },

  { label: 'Supplier Dashboard', icon: 'space_dashboard', route: '/supplier/dashboard', group: 'SUPPLIER' },
  { label: 'Catalog', icon: 'inventory_2', route: '/supplier/catalog', group: 'SUPPLIER' },
  { label: 'Orders', icon: 'local_shipping', route: '/supplier/orders', group: 'SUPPLIER' },
  { label: 'Performance', icon: 'insights', route: '/supplier/performance', group: 'SUPPLIER' },
  { label: 'Promotions', icon: 'sell', route: '/supplier/promotions', group: 'SUPPLIER' }
];

@Injectable({ providedIn: 'root' })
export class NavService {
  readonly items = computed(() => {
    const role = this.auth.role();
    const isSupplier = role === 'SUPPLIER_USER';
    const group = isSupplier ? 'SUPPLIER' : 'APP';
    return NAV_ITEMS.filter((i) => i.group === group).filter((i) => !i.roles || (role && i.roles.includes(role)));
  });

  constructor(private readonly auth: AuthService) {}
}

