export type UserRole =
  | 'OWNER_ADMIN'
  | 'PIC'
  | 'STAFF_PHARMACIST'
  | 'TECHNICIAN'
  | 'PURCHASING_MANAGER'
  | 'COMPLIANCE_OFFICER'
  | 'SUPPLIER_USER';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  pharmacyId?: string;
  supplierId?: string;
  permissions: string[];
}

export interface DemoAccount {
  email: string;
  password: string;
  role: UserRole;
  name: string;
}

