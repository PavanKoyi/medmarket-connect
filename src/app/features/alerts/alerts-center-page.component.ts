import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';

@Component({
  selector: 'mmc-alerts-center-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatSelectModule, MatButtonModule, StatusChipComponent],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>Alerts Center</mat-card-title>
        <mat-card-subtitle>Filterable notification feed</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <mat-form-field appearance="outline">
          <mat-label>Filter by type</mat-label>
          <mat-select [(ngModel)]="typeFilter">
            <mat-option value="ALL">All</mat-option>
            <mat-option value="SHORTAGE">Shortage</mat-option>
            <mat-option value="PRICE">Price</mat-option>
            <mat-option value="APPROVAL">Approval</mat-option>
          </mat-select>
        </mat-form-field>

        @for (a of filteredAlerts(); track a.id) {
          <div class="alert">
            <div>
              <div class="title">{{ a.title }}</div>
              <div class="muted">{{ a.message }}</div>
            </div>
            <div class="actions">
              <mmc-status-chip [label]="a.read ? 'RECONCILED' : 'SUBMITTED'" />
              <button mat-stroked-button type="button" (click)="toggleRead(a.id)">{{ a.read ? 'Mark unread' : 'Mark read' }}</button>
            </div>
          </div>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .alert { display: grid; grid-template-columns: 1fr auto; gap: 10px; padding: 10px; border: 1px solid rgba(0,0,0,.08); border-radius: 10px; margin-bottom: 8px; }
      .title { font-weight: 600; }
      .muted { color: rgba(0,0,0,.62); }
      .actions { display: flex; align-items: center; gap: 8px; }
      @media (max-width: 900px){ .alert { grid-template-columns: 1fr; } .actions { justify-content: flex-start; } }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertsCenterPageComponent {
  typeFilter: 'ALL' | 'SHORTAGE' | 'PRICE' | 'APPROVAL' = 'ALL';
  readonly alerts = signal([
    { id: 'al1', type: 'SHORTAGE', title: 'Drug Shortage Alert', message: 'Metformin ER low stock at 2 suppliers.', read: false },
    { id: 'al2', type: 'PRICE', title: 'Price Increase Alert', message: 'Atorvastatin up 5.1% this week.', read: false },
    { id: 'al3', type: 'APPROVAL', title: 'Approval Required', message: 'Checkout total exceeds policy threshold.', read: true }
  ]);

  readonly filteredAlerts = computed(() =>
    this.alerts().filter((a) => this.typeFilter === 'ALL' || a.type === this.typeFilter)
  );

  toggleRead(id: string): void {
    this.alerts.set(this.alerts().map((a) => (a.id === id ? { ...a, read: !a.read } : a)));
  }
}

