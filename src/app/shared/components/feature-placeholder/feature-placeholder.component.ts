import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'mmc-feature-placeholder',
  standalone: true,
  imports: [MatCardModule],
  template: `
    <mat-card appearance="outlined">
      <mat-card-header>
        <mat-card-title>{{ title() }}</mat-card-title>
        @if (subtitle()) {
          <mat-card-subtitle>{{ subtitle() }}</mat-card-subtitle>
        }
      </mat-card-header>
      <mat-card-content>
        <p class="body">{{ body() }}</p>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .body {
        margin: 0;
        color: rgba(0, 0, 0, 0.72);
        line-height: 1.5;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturePlaceholderComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string | null>(null);
  readonly body = input<string>('Mocked placeholder page. Wire mock data + UI components next.');
}

