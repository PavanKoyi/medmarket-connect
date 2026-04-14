import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { AppShellComponent } from './core/layout/app-shell/app-shell.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { UserRole } from './core/models/auth.models';
import { LoginPageComponent } from './features/auth/login/login-page.component';
import { DashboardPageComponent } from './features/dashboard/dashboard-page.component';
import { MarketplaceSearchPageComponent } from './features/marketplace/marketplace-search-page.component';
import { MarketplaceComparePageComponent } from './features/marketplace/marketplace-compare-page.component';
import { CartPageComponent } from './features/cart/cart-page.component';
import { CheckoutReviewPageComponent } from './features/cart/checkout-review-page.component';
import { OrdersListPageComponent } from './features/orders/orders-list-page.component';
import { OrderDetailPageComponent } from './features/orders/order-detail-page.component';
import { SmartIntegrationPageComponent } from './features/smartintegration/smartintegration-page.component';
import { SubscribeSavePageComponent } from './features/subscribe-save/subscribe-save-page.component';
import { AnalyticsPageComponent } from './features/analytics/analytics-page.component';
import { CompliancePageComponent } from './features/compliance/compliance-page.component';
import { AlertsCenterPageComponent } from './features/alerts/alerts-center-page.component';
import { AdminPageComponent } from './features/admin/admin-page.component';
import { ProfilePageComponent } from './features/profile/profile-page.component';
import { SupplierDashboardPageComponent } from './features/supplier/supplier-dashboard-page.component';
import { SupplierCatalogPageComponent } from './features/supplier/supplier-catalog-page.component';
import { SupplierOrdersPageComponent } from './features/supplier/supplier-orders-page.component';
import { SupplierPerformancePageComponent } from './features/supplier/supplier-performance-page.component';
import { SupplierPromotionsPageComponent } from './features/supplier/supplier-promotions-page.component';
import { NotFoundPageComponent } from './features/not-found/not-found-page.component';

const APP_ROLES: UserRole[] = [
  'OWNER_ADMIN',
  'PIC',
  'STAFF_PHARMACIST',
  'TECHNICIAN',
  'PURCHASING_MANAGER',
  'COMPLIANCE_OFFICER'
] as const;

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [{ path: '', component: LoginPageComponent, title: 'Login' }]
  },

  {
    path: 'app',
    canActivate: [authGuard, roleGuard(APP_ROLES)],
    component: AppShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardPageComponent, title: 'Dashboard', data: { breadcrumb: 'Dashboard' } },
      {
        path: 'marketplace',
        data: { breadcrumb: 'Marketplace' },
        children: [
          {
            path: 'search',
            component: MarketplaceSearchPageComponent,
            title: 'Marketplace Search',
            data: { breadcrumb: 'Search' }
          },
          {
            path: 'compare',
            component: MarketplaceComparePageComponent,
            title: 'Compare',
            data: { breadcrumb: 'Compare' }
          },
          { path: '', pathMatch: 'full', redirectTo: 'search' }
        ]
      },
      { path: 'cart', component: CartPageComponent, title: 'Cart', data: { breadcrumb: 'Cart' } },
      {
        path: 'cart/checkout',
        component: CheckoutReviewPageComponent,
        title: 'Checkout Review',
        data: { breadcrumb: 'Checkout' }
      },
      { path: 'orders', component: OrdersListPageComponent, title: 'Orders', data: { breadcrumb: 'Orders' } },
      {
        path: 'orders/:id',
        component: OrderDetailPageComponent,
        title: 'Order Detail',
        data: { breadcrumb: 'Detail' }
      },
      {
        path: 'smartintegration',
        component: SmartIntegrationPageComponent,
        title: 'SmartIntegration',
        data: { breadcrumb: 'SmartIntegration' }
      },
      {
        path: 'subscribe-save',
        component: SubscribeSavePageComponent,
        title: 'Subscribe & Save',
        data: { breadcrumb: 'Subscribe & Save' }
      },
      { path: 'analytics', component: AnalyticsPageComponent, title: 'Analytics', data: { breadcrumb: 'Analytics' } },
      {
        path: 'compliance',
        component: CompliancePageComponent,
        title: 'Compliance',
        data: { breadcrumb: 'Compliance' }
      },
      { path: 'alerts', component: AlertsCenterPageComponent, title: 'Alerts', data: { breadcrumb: 'Alerts' } },
      { path: 'admin', component: AdminPageComponent, title: 'Admin', data: { breadcrumb: 'Admin' } },
      { path: 'profile', component: ProfilePageComponent, title: 'Profile', data: { breadcrumb: 'Profile' } }
    ]
  },

  {
    path: 'supplier',
    canActivate: [authGuard, roleGuard(['SUPPLIER_USER'])],
    component: AppShellComponent,
    data: { breadcrumb: 'Supplier' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        component: SupplierDashboardPageComponent,
        title: 'Supplier Dashboard',
        data: { breadcrumb: 'Dashboard' }
      },
      { path: 'catalog', component: SupplierCatalogPageComponent, title: 'Catalog', data: { breadcrumb: 'Catalog' } },
      { path: 'orders', component: SupplierOrdersPageComponent, title: 'Orders', data: { breadcrumb: 'Orders' } },
      {
        path: 'performance',
        component: SupplierPerformancePageComponent,
        title: 'Performance',
        data: { breadcrumb: 'Performance' }
      },
      {
        path: 'promotions',
        component: SupplierPromotionsPageComponent,
        title: 'Promotions',
        data: { breadcrumb: 'Promotions' }
      }
    ]
  },

  { path: '**', component: NotFoundPageComponent, title: 'Not Found' }
];
