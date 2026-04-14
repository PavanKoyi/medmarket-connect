import { UserRole } from './auth.models';

export type NavGroup = 'APP' | 'SUPPLIER';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
  group: NavGroup;
  roles?: UserRole[];
}

