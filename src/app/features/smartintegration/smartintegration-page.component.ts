import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'mmc-smartintegration-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  template: `
    <div class="layout">
      <mat-card appearance="outlined">
        <mat-card-header>
          <mat-card-title>Rx Workflow Panel</mat-card-title>
          <mat-card-subtitle>Mock dispensing + adjudication context</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="form">
          <mat-form-field appearance="outline">
            <mat-label>Patient ID</mat-label>
            <input matInput [(ngModel)]="patientId" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Prescribed Drug</mat-label>
            <input matInput [(ngModel)]="drugName" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>NDC</mat-label>
            <input matInput [(ngModel)]="ndc11" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Reimbursement</mat-label>
            <input matInput type="number" [(ngModel)]="reimbursement" />
          </mat-form-field>
          <button mat-flat-button color="primary" type="button" (click)="runEvaluation()">Run inline market check</button>
        </mat-card-content>
      </mat-card>

      <mat-card appearance="outlined">
        <mat-card-header>
          <mat-card-title>Embedded Market Sidebar</mat-card-title>
          <mat-card-subtitle>Recommended lower-cost alternatives</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          @for (rec of recommendations(); track rec.ndc11) {
            <div class="rec">
              <div>
                <div class="title">{{ rec.drug }}</div>
                <div class="muted">{{ rec.ndc11 }} • {{ rec.supplier }}</div>
              </div>
              <div class="right">
                <div class="price">\${{ rec.acquisitionCost }}</div>
                <div class="margin">Margin \${{ reimbursement - rec.acquisitionCost }}</div>
                <button mat-stroked-button type="button" (click)="pickRecommendation(rec.drug)">Recommend</button>
              </div>
            </div>
          }
          <div class="banner">Final purchase recommendation: {{ selectedRecommendation() || 'Pending selection' }}</div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .layout { display: grid; grid-template-columns: 1.1fr 1fr; gap: 12px; }
      .form { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .rec { display: grid; grid-template-columns: 1fr auto; gap: 10px; border: 1px solid rgba(0,0,0,.08); padding: 10px; border-radius: 10px; margin-bottom: 8px; }
      .title { font-weight: 600; }
      .muted { color: rgba(0,0,0,.62); }
      .right { text-align: right; display: grid; gap: 4px; }
      .price { font-size: 18px; font-weight: 700; }
      .margin { color: #1b5e20; }
      .banner { margin-top: 10px; padding: 10px; border-radius: 10px; background: rgba(29, 78, 216, .10); font-weight: 600; }
      @media (max-width: 1100px) { .layout { grid-template-columns: 1fr; } .form { grid-template-columns: 1fr; } }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartIntegrationPageComponent {
  patientId = 'PT-10029';
  drugName = 'Atorvastatin 20mg Tablet';
  ndc11 = '65862042099';
  reimbursement = 165;

  readonly selectedRecommendation = signal('');
  readonly recommendations = signal([
    { ndc11: '65862042099', drug: 'Atorvastatin Generic', supplier: 'Cardinal', acquisitionCost: 110 },
    { ndc11: '01722310880', drug: 'Lipitor Brand', supplier: 'AmerisourceBergen', acquisitionCost: 162 }
  ]);

  constructor(private readonly snackBar: MatSnackBar) {}

  runEvaluation(): void {
    this.snackBar.open('Inline price and margin evaluation complete.', 'Close', { duration: 2200 });
  }

  pickRecommendation(drug: string): void {
    this.selectedRecommendation.set(drug);
    this.snackBar.open(`${drug} marked as recommendation.`, 'Close', { duration: 2000 });
  }
}

