import { DemoAccount } from '../../core/models/auth.models';

export const DEMO_ACCOUNTS: DemoAccount[] = [
  { email: 'admin@primerxmarket.demo', password: 'Demo@123', role: 'OWNER_ADMIN', name: 'Admin User' },
  { email: 'pic@primerxmarket.demo', password: 'Demo@123', role: 'PIC', name: 'PIC User' },
  {
    email: 'pharmacist@primerxmarket.demo',
    password: 'Demo@123',
    role: 'STAFF_PHARMACIST',
    name: 'Staff Pharmacist'
  },
  { email: 'tech@primerxmarket.demo', password: 'Demo@123', role: 'TECHNICIAN', name: 'Technician User' },
  {
    email: 'purchasing@primerxmarket.demo',
    password: 'Demo@123',
    role: 'PURCHASING_MANAGER',
    name: 'Purchasing Manager'
  },
  {
    email: 'compliance@primerxmarket.demo',
    password: 'Demo@123',
    role: 'COMPLIANCE_OFFICER',
    name: 'Compliance Officer'
  },
  { email: 'supplier@primerxmarket.demo', password: 'Demo@123', role: 'SUPPLIER_USER', name: 'Supplier User' }
];

