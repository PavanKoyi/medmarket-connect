import { DrugProduct } from '../../core/models/marketplace.models';

export const DRUG_PRODUCTS_MOCK: DrugProduct[] = [
  {
    id: 'drug_1',
    ndc11: '65862042099',
    drugName: 'Atorvastatin 20mg Tablet',
    genericName: 'atorvastatin',
    manufacturer: 'Teva',
    dosageForm: 'Tablet',
    strength: '20mg',
    packageSize: 'Bottle 500',
    releaseType: 'IR',
    category: 'Cardiovascular',
    specialty: false,
    brand: false
  },
  {
    id: 'drug_2',
    ndc11: '01722310880',
    drugName: 'Lipitor 20mg Tablet',
    genericName: 'atorvastatin',
    manufacturer: 'Pfizer',
    dosageForm: 'Tablet',
    strength: '20mg',
    packageSize: 'Bottle 90',
    releaseType: 'IR',
    category: 'Cardiovascular',
    specialty: false,
    brand: true
  },
  {
    id: 'drug_3',
    ndc11: '00093074256',
    drugName: 'Metformin ER 500mg Tablet',
    genericName: 'metformin',
    manufacturer: 'Aurobindo',
    dosageForm: 'Tablet',
    strength: '500mg',
    packageSize: 'Bottle 1000',
    releaseType: 'ER',
    category: 'Diabetes',
    specialty: false,
    brand: false
  },
  {
    id: 'drug_4',
    ndc11: '07810150510',
    drugName: 'Ozempic 1mg Pen',
    genericName: 'semaglutide',
    manufacturer: 'Novo Nordisk',
    dosageForm: 'Injection',
    strength: '1mg',
    packageSize: '1 Pen',
    releaseType: 'XR',
    category: 'Diabetes',
    specialty: true,
    brand: true
  },
  {
    id: 'drug_5',
    ndc11: '00574052101',
    drugName: 'Amoxicillin 500mg Capsule',
    genericName: 'amoxicillin',
    manufacturer: 'Sandoz',
    dosageForm: 'Capsule',
    strength: '500mg',
    packageSize: 'Bottle 500',
    releaseType: 'IR',
    category: 'Antibiotics',
    specialty: false,
    brand: false
  },
  {
    id: 'drug_6',
    ndc11: '00093015056',
    drugName: 'Adderall XR 20mg Capsule',
    genericName: 'amphetamine salts',
    manufacturer: 'Takeda',
    dosageForm: 'Capsule',
    strength: '20mg',
    packageSize: 'Bottle 100',
    releaseType: 'XR',
    category: 'CNS',
    specialty: false,
    brand: true
  }
];

