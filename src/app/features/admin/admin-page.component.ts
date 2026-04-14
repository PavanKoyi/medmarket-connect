import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'mmc-admin-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="layout">
      <mat-card appearance="outlined">
        <mat-card-header><mat-card-title>User Management</mat-card-title></mat-card-header>
        <mat-card-content>
          @for (u of users(); track u.id) {
            <div class="row">
              <span>{{ u.name }}</span>
              <span>{{ u.email }}</span>
              <mat-form-field appearance="outline">
                <mat-label>Role</mat-label>
                <mat-select [ngModel]="u.role" (ngModelChange)="setRole(u.id, $event)">
                  <mat-option value="OWNER_ADMIN">OWNER_ADMIN</mat-option>
                  <mat-option value="PIC">PIC</mat-option>
                  <mat-option value="PURCHASING_MANAGER">PURCHASING_MANAGER</mat-option>
                  <mat-option value="COMPLIANCE_OFFICER">COMPLIANCE_OFFICER</mat-option>
                </mat-select>
              </mat-form-field>
            </div>
          }
        </mat-card-content>
      </mat-card>
      <mat-card appearance="outlined">
        <mat-card-header><mat-card-title>Approval Settings</mat-card-title></mat-card-header>
        <mat-card-content class="form">
          <mat-form-field appearance="outline"><mat-label>Order approval threshold</mat-label><input matInput type="number" [(ngModel)]="threshold" /></mat-form-field>
          <mat-form-field appearance="outline"><mat-label>Preferred supplier</mat-label><input matInput [(ngModel)]="preferredSupplier" /></mat-form-field>
          <button mat-flat-button color="primary" type="button" (click)="save()">Save configuration</button>
          <div class="msg">{{ message() }}</div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .layout { display: grid; grid-template-columns: 1.6fr 1fr; gap: 12px; }
      .row { display: grid; grid-template-columns: 1fr 1fr 260px; gap: 10px; align-items: center; border-bottom: 1px solid rgba(0,0,0,.06); padding: 6px 0; }
      .form { display: grid; gap: 10px; }
      .msg { color: #1b5e20; font-weight: 600; min-height: 20px; }
      @media (max-width: 1100px){ .layout { grid-template-columns: 1fr; } .row { grid-template-columns: 1fr; } }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPageComponent {
  readonly users = signal([
    { id: 'u1', name: 'Admin User', email: 'admin@primerxmarket.demo', role: 'OWNER_ADMIN' },
    { id: 'u2', name: 'PIC User', email: 'pic@primerxmarket.demo', role: 'PIC' },
    { id: 'u3', name: 'Purchasing Manager', email: 'purchasing@primerxmarket.demo', role: 'PURCHASING_MANAGER' }
  ]);

  threshold = 15000;
  preferredSupplier = 'Cardinal';
  readonly message = signal('');

  setRole(id: string, role: string): void {
    this.users.set(this.users().map((u) => (u.id === id ? { ...u, role } : u)));
  }

  save(): void {
    this.message.set('Configuration saved for demo session.');
  }
}

