import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'mmc-subscribe-save-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  template: `
    <div class="layout">
      <mat-card appearance="outlined">
        <mat-card-header><mat-card-title>Subscription Rules</mat-card-title></mat-card-header>
        <mat-card-content>
          @for (rule of rules(); track rule.id) {
            <div class="row">
              <span>{{ rule.drug }}</span>
              <span>{{ rule.frequency }}</span>
              <span>Threshold \${{ rule.threshold }}</span>
              <button mat-button type="button" (click)="toggle(rule.id)">{{ rule.active ? 'Disable' : 'Enable' }}</button>
            </div>
          }
        </mat-card-content>
      </mat-card>
      <mat-card appearance="outlined">
        <mat-card-header><mat-card-title>Create Rule</mat-card-title></mat-card-header>
        <mat-card-content class="form">
          <mat-form-field appearance="outline"><mat-label>Drug</mat-label><input matInput [(ngModel)]="draftDrug" /></mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Frequency</mat-label>
            <mat-select [(ngModel)]="draftFrequency">
              <mat-option value="daily">daily</mat-option>
              <mat-option value="weekly">weekly</mat-option>
              <mat-option value="biweekly">biweekly</mat-option>
              <mat-option value="monthly">monthly</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline"><mat-label>Price threshold</mat-label><input matInput type="number" [(ngModel)]="draftThreshold" /></mat-form-field>
          <button mat-flat-button color="primary" type="button" (click)="addRule()">Add subscription rule</button>
          <div class="summary">Forecasted monthly spend: \${{ forecastSpend() }}</div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: 12px; }
      .row { display: grid; grid-template-columns: 1fr 120px 160px auto; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,.06); }
      .form { display: grid; gap: 10px; }
      .summary { padding: 10px; border-radius: 10px; background: rgba(29, 78, 216, .10); font-weight: 600; }
      @media (max-width: 1100px) { .layout { grid-template-columns: 1fr; } .row { grid-template-columns: 1fr; gap: 6px; } }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscribeSavePageComponent {
  readonly rules = signal([
    { id: 'r1', drug: 'Atorvastatin 20mg', frequency: 'weekly', threshold: 130, active: true },
    { id: 'r2', drug: 'Metformin ER 500mg', frequency: 'biweekly', threshold: 95, active: true },
    { id: 'r3', drug: 'Amoxicillin 500mg', frequency: 'monthly', threshold: 78, active: false }
  ]);

  draftDrug = '';
  draftFrequency = 'weekly';
  draftThreshold = 100;

  forecastSpend(): number {
    return this.rules().filter((r) => r.active).reduce((sum, r) => sum + r.threshold * 4, 0);
  }

  toggle(id: string): void {
    this.rules.set(this.rules().map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  }

  addRule(): void {
    if (!this.draftDrug.trim()) return;
    this.rules.set([
      ...this.rules(),
      {
        id: crypto.randomUUID(),
        drug: this.draftDrug.trim(),
        frequency: this.draftFrequency,
        threshold: this.draftThreshold,
        active: true
      }
    ]);
    this.draftDrug = '';
  }
}

