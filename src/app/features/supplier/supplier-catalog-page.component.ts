import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'mmc-supplier-catalog-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatInputModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header><mat-card-title>Supplier Catalog</mat-card-title></mat-card-header>
      <mat-card-content>
        @for (item of catalog(); track item.id) {
          <div class="row">
            <span>{{ item.drug }}</span>
            <input matInput type="number" [ngModel]="item.price" (ngModelChange)="update(item.id, 'price', +$event)" />
            <input matInput type="number" [ngModel]="item.stock" (ngModelChange)="update(item.id, 'stock', +$event)" />
            <button mat-stroked-button type="button" (click)="markUpdated(item.id)">Save</button>
          </div>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .row { display: grid; grid-template-columns: 1fr 140px 140px auto; gap: 10px; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,.06); }
      @media (max-width: 900px){ .row { grid-template-columns: 1fr; } }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierCatalogPageComponent {
  readonly catalog = signal([
    { id: 'c1', drug: 'Atorvastatin 20mg', price: 110, stock: 420, updated: false },
    { id: 'c2', drug: 'Metformin ER 500mg', price: 90, stock: 560, updated: false },
    { id: 'c3', drug: 'Amoxicillin 500mg', price: 70, stock: 230, updated: false }
  ]);

  update(id: string, key: 'price' | 'stock', value: number): void {
    this.catalog.set(this.catalog().map((i) => (i.id === id ? { ...i, [key]: value } : i)));
  }

  markUpdated(id: string): void {
    this.catalog.set(this.catalog().map((i) => (i.id === id ? { ...i, updated: true } : i)));
  }
}

