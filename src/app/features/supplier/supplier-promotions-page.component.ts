import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mmc-supplier-promotions-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="layout">
      <mat-card appearance="outlined">
        <mat-card-header><mat-card-title>Create Promotion</mat-card-title></mat-card-header>
        <mat-card-content class="form">
          <mat-form-field appearance="outline"><mat-label>Promotion name</mat-label><input matInput [(ngModel)]="name" /></mat-form-field>
          <mat-form-field appearance="outline"><mat-label>Discount %</mat-label><input matInput type="number" [(ngModel)]="discount" /></mat-form-field>
          <button mat-flat-button color="primary" type="button" (click)="create()">Create promotion</button>
        </mat-card-content>
      </mat-card>
      <mat-card appearance="outlined">
        <mat-card-header><mat-card-title>Active Promotions</mat-card-title></mat-card-header>
        <mat-card-content>
          @for (p of promotions(); track p.id) {
            <div class="row">
              <span>{{ p.name }}</span><span>{{ p.discount }}%</span>
              <button mat-stroked-button type="button" (click)="toggle(p.id)">{{ p.active ? 'Deactivate' : 'Activate' }}</button>
            </div>
          }
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .layout { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .form { display: grid; gap: 10px; }
      .row { display: grid; grid-template-columns: 1fr 100px auto; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,.06); }
      @media (max-width: 900px){ .layout { grid-template-columns: 1fr; } .row { grid-template-columns: 1fr; } }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierPromotionsPageComponent {
  name = '';
  discount = 5;
  readonly promotions = signal([
    { id: 'p1', name: 'Quarter-end Generic Push', discount: 8, active: true },
    { id: 'p2', name: 'CNS Category Campaign', discount: 5, active: false }
  ]);

  create(): void {
    if (!this.name.trim()) return;
    this.promotions.set([
      ...this.promotions(),
      { id: crypto.randomUUID(), name: this.name.trim(), discount: this.discount, active: true }
    ]);
    this.name = '';
    this.discount = 5;
  }

  toggle(id: string): void {
    this.promotions.set(this.promotions().map((p) => (p.id === id ? { ...p, active: !p.active } : p)));
  }
}

