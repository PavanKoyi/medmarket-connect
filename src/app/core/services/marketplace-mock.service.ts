import { Injectable, computed, signal } from '@angular/core';
import {
  DrugProduct,
  MarginInsight,
  MarketplaceFilters,
  PriceQuote,
  Supplier
} from '../models/marketplace.models';
import { DRUG_PRODUCTS_MOCK } from '../../mock-data/marketplace/drugs.mock';
import { MARGIN_INSIGHTS_MOCK, PRICE_QUOTES_MOCK } from '../../mock-data/marketplace/quotes.mock';
import { SUPPLIERS_MOCK } from '../../mock-data/marketplace/suppliers.mock';

const DEFAULT_FILTERS: MarketplaceFilters = {
  query: '',
  supplierId: 'ALL',
  brandType: 'ALL',
  contractType: 'ALL',
  gpoOnly: false,
  addVerifiedOnly: false,
  availability: 'ALL',
  specialty: 'ALL'
};

export interface MarketplaceResultRow {
  product: DrugProduct;
  quotes: PriceQuote[];
  bestQuote: PriceQuote | null;
  margin: MarginInsight | null;
}

@Injectable({ providedIn: 'root' })
export class MarketplaceMockService {
  readonly suppliers = signal<Supplier[]>(SUPPLIERS_MOCK);
  readonly products = signal<DrugProduct[]>(DRUG_PRODUCTS_MOCK);
  readonly quotes = signal<PriceQuote[]>(PRICE_QUOTES_MOCK);
  readonly margins = signal<MarginInsight[]>(MARGIN_INSIGHTS_MOCK);
  readonly filters = signal<MarketplaceFilters>({ ...DEFAULT_FILTERS });

  readonly rows = computed<MarketplaceResultRow[]>(() => {
    const products = this.products();
    const quotes = this.quotes();
    const filters = this.filters();
    const supplierMap = new Map(this.suppliers().map((s) => [s.id, s]));

    return products
      .filter((p) => this.matchesProduct(filters, p))
      .map((product) => {
        const productQuotes = quotes
          .filter((q) => q.ndc11 === product.ndc11)
          .filter((q) => this.matchesQuote(filters, q, supplierMap.get(q.supplierId) ?? null));
        const bestQuote = this.pickBestQuote(productQuotes);
        const margin = this.margins().find((m) => m.ndc11 === product.ndc11) ?? null;
        return { product, quotes: productQuotes, bestQuote, margin };
      })
      .filter((row) => row.quotes.length > 0 || filters.query.trim().length > 0);
  });

  patchFilters(patch: Partial<MarketplaceFilters>): void {
    this.filters.set({ ...this.filters(), ...patch });
  }

  resetFilters(): void {
    this.filters.set({ ...DEFAULT_FILTERS });
  }

  getQuotesByNdc(ndc11: string): PriceQuote[] {
    return this.quotes()
      .filter((q) => q.ndc11 === ndc11)
      .sort((a, b) => a.packagePrice - b.packagePrice);
  }

  getEquivalentProducts(genericName: string, skipNdc11?: string): DrugProduct[] {
    return this.products().filter((p) => p.genericName === genericName && p.ndc11 !== skipNdc11);
  }

  private matchesProduct(filters: MarketplaceFilters, p: DrugProduct): boolean {
    const query = filters.query.trim().toLowerCase();
    if (query) {
      const target = `${p.drugName} ${p.genericName} ${p.ndc11} ${p.category}`.toLowerCase();
      if (!target.includes(query)) return false;
    }
    if (filters.brandType === 'BRAND' && !p.brand) return false;
    if (filters.brandType === 'GENERIC' && p.brand) return false;
    if (filters.specialty === 'SPECIALTY' && !p.specialty) return false;
    if (filters.specialty === 'NON_SPECIALTY' && p.specialty) return false;
    return true;
  }

  private matchesQuote(filters: MarketplaceFilters, q: PriceQuote, supplier: Supplier | null): boolean {
    if (filters.supplierId !== 'ALL' && q.supplierId !== filters.supplierId) return false;
    if (filters.contractType === 'CONTRACT' && !q.contractPrice) return false;
    if (filters.contractType === 'OPEN_MARKET' && q.contractPrice) return false;
    if (filters.gpoOnly && !q.gpoPrice) return false;
    if (filters.availability !== 'ALL' && q.availability !== filters.availability) return false;
    if (filters.addVerifiedOnly && !supplier?.addVerified) return false;
    return true;
  }

  private pickBestQuote(quotes: PriceQuote[]): PriceQuote | null {
    if (!quotes.length) return null;
    return quotes.reduce((best, current) => (current.packagePrice < best.packagePrice ? current : best), quotes[0]);
  }
}

