import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';

@Component({
  selector: 'mmc-compliance-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, StatusChipComponent],
  template: `
    <div class="layout">
      <mat-card appearance="outlined">
        <mat-card-header><mat-card-title>Supplier Compliance</mat-card-title></mat-card-header>
        <mat-card-content>
          @for (row of suppliers(); track row.id) {
            <div class="row">
              <span>{{ row.name }}</span>
              <mmc-status-chip [label]="row.dscsa ? 'DSCSA_OK' : 'EXCEPTION'" />
              <mmc-status-chip [label]="row.dea ? 'DEA_OK' : 'EXCEPTION'" />
              <mmc-status-chip [label]="row.add ? 'ADD_VERIFIED' : 'LOW_STOCK'" />
            </div>
          }
        </mat-card-content>
      </mat-card>
      <mat-card appearance="outlined">
        <mat-card-header><mat-card-title>Audit Log Explorer</mat-card-title></mat-card-header>
        <mat-card-content>
          @for (log of auditLogs(); track log.id) {
            <div class="log">
              <div class="title">{{ log.action }}</div>
              <div class="muted">{{ log.actor }} • {{ log.time }}</div>
              <div>{{ log.message }}</div>
            </div>
          }
          <button mat-stroked-button type="button" (click)="addAudit()">Add mock event</button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .layout { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      .row { display: grid; grid-template-columns: 1fr auto auto auto; align-items: center; gap: 8px; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,.06); }
      .log { padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,.06); }
      .title { font-weight: 600; }
      .muted { color: rgba(0,0,0,.62); font-size: 12px; }
      @media (max-width: 1100px){ .layout { grid-template-columns: 1fr; } .row { grid-template-columns: 1fr; } }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompliancePageComponent {
  readonly suppliers = signal([
    { id: 's1', name: 'Cardinal', dscsa: true, dea: true, add: true },
    { id: 's2', name: 'McKesson', dscsa: true, dea: true, add: true },
    { id: 's3', name: 'HD Smith', dscsa: true, dea: true, add: false }
  ]);
  readonly auditLogs = signal([
    { id: 'a1', action: 'PO_SUBMITTED', actor: 'Admin User', time: '2026-04-14 09:14', message: 'Submitted PO-10483.' },
    { id: 'a2', action: 'ROLE_CHANGE', actor: 'Owner Admin', time: '2026-04-14 08:30', message: 'Updated buyer permissions.' }
  ]);

  addAudit(): void {
    this.auditLogs.set([
      {
        id: crypto.randomUUID(),
        action: 'SECURITY_REVIEW',
        actor: 'Compliance Officer',
        time: new Date().toISOString().slice(0, 16).replace('T', ' '),
        message: 'Reviewed recent portal access events.'
      },
      ...this.auditLogs()
    ]);
  }
}

