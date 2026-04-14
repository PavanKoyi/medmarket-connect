import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OrdersMockService } from '../../core/services/orders-mock.service';
import { StatusChipComponent } from '../../shared/components/status-chip/status-chip.component';
import { PurchaseOrderStatus } from '../../core/models/orders.models';

@Component({
  selector: 'mmc-order-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatSnackBarModule, StatusChipComponent],
  template: `
    <a mat-button [routerLink]="['/app/orders']">Back to orders</a>

    @if (detail()) {
      <div class="layout">
        <mat-card appearance="outlined">
          <mat-card-header>
            <mat-card-title>{{ detail()!.poNumber }}</mat-card-title>
            <mat-card-subtitle>{{ detail()!.supplierName }} • {{ detail()!.createdAt | date: 'medium' }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <mmc-status-chip [label]="detail()!.status" />
            <div class="line-items">
              @for (line of detail()!.lines; track line.ndc11) {
                <div class="row">
                  <span>{{ line.drugName }}</span>
                  <span>Qty {{ line.quantity }}</span>
                  <strong>\${{ line.packagePrice * line.quantity | number: '1.2-2' }}</strong>
                </div>
              }
            </div>
            <div class="actions">
              <button mat-stroked-button type="button" (click)="transition('ACKNOWLEDGED')">Acknowledge</button>
              <button mat-stroked-button type="button" (click)="transition('SHIPPED')">Mark shipped</button>
              <button mat-stroked-button type="button" (click)="transition('INVOICED')">Mark invoiced</button>
              <button mat-flat-button color="primary" type="button" (click)="transition('RECONCILED')">Reconcile</button>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card appearance="outlined">
          <mat-card-header><mat-card-title>Lifecycle timeline</mat-card-title></mat-card-header>
          <mat-card-content>
            @for (event of detail()!.timeline; track event.id) {
              <div class="event">
                <mmc-status-chip [label]="event.status" />
                <div>
                  <div class="title">{{ event.title }}</div>
                  <div class="muted">{{ event.description }} • {{ event.occurredAt | date: 'short' }}</div>
                </div>
              </div>
            }
          </mat-card-content>
        </mat-card>

        <mat-card appearance="outlined">
          <mat-card-header><mat-card-title>Shipment / Invoice / Reconciliation</mat-card-title></mat-card-header>
          <mat-card-content class="meta">
            <div><strong>Carrier:</strong> {{ detail()!.shipment.carrier }}</div>
            <div><strong>Tracking:</strong> {{ detail()!.shipment.trackingNumber }}</div>
            <div><strong>ETA:</strong> {{ detail()!.shipment.estimatedArrival }}</div>
            <div><strong>Invoice:</strong> {{ detail()!.invoice.invoiceNumber }}</div>
            <div><strong>Invoice amount:</strong> \${{ detail()!.invoice.amount | number: '1.2-2' }}</div>
            <div><strong>Discrepancy:</strong> \${{ detail()!.reconciliation.discrepancy | number: '1.2-2' }}</div>
          </mat-card-content>
        </mat-card>

        <mat-card appearance="outlined">
          <mat-card-header><mat-card-title>Audit trail</mat-card-title></mat-card-header>
          <mat-card-content>
            @for (audit of detail()!.auditLog; track audit.id) {
              <div class="audit">
                <div class="title">{{ audit.action }}</div>
                <div class="muted">{{ audit.actor }} • {{ audit.createdAt | date: 'short' }}</div>
                <div>{{ audit.message }}</div>
              </div>
            }
          </mat-card-content>
        </mat-card>
      </div>
    } @else {
      <mat-card appearance="outlined"><mat-card-content>Order not found.</mat-card-content></mat-card>
    }
  `,
  styles: [
    `
      .layout {
        display: grid;
        gap: 12px;
      }
      .line-items {
        margin-top: 10px;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr auto auto;
        gap: 10px;
        padding: 8px 0;
      }
      .actions {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        margin-top: 10px;
      }
      .event {
        display: grid;
        grid-template-columns: 120px 1fr;
        gap: 10px;
        padding: 8px 0;
      }
      .title {
        font-weight: 600;
      }
      .muted {
        color: rgba(0, 0, 0, 0.62);
      }
      .meta {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
      }
      .audit {
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        padding: 8px 0;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailPageComponent {
  readonly orderId = computed(() => this.route.snapshot.paramMap.get('id') ?? '—');
  readonly detail = computed(() => this.orders.getOrderDetail(this.orderId()));

  constructor(
    private readonly route: ActivatedRoute,
    private readonly orders: OrdersMockService,
    private readonly snackBar: MatSnackBar
  ) {}

  transition(status: PurchaseOrderStatus): void {
    this.orders.transitionOrder(this.orderId(), status);
    this.snackBar.open(`Order status changed to ${status}.`, 'Close', { duration: 2200 });
  }
}

