import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ConfigurationQuery } from 'src/app/shared/state/configuration.query';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-classified-banner',
  template: `
    <div
      [ngStyle]="{
        'background-color': color
      }"
      class="text-center mat-typography classification"
      fxLayout="row"
      [fxLayoutAlign]="
        data.buildNumber ? 'space-between center' : 'center center'
      "
      *ngIf="{ buildNumber: buildNumber$ | async } as data"
    >
      <div>{{ classification | uppercase }}</div>
      <ng-container *ngIf="data.buildNumber">
        <div>
          <strong>THIS SYSTEM IS NOT ACCREDITED FOR PII</strong>
        </div>
        <div>Version: {{ data.buildNumber }}</div>
      </ng-container>
    </div>
  `,
  styles: [
    `
      .classification {
        color: white;
        text-shadow: 1px 1px black;
        height: 20px;
        padding: 0 5px;
      }
    `
  ]
})
export class ClassifiedBannerComponent implements OnInit {
  buildNumber$: Observable<string>;
  classification = environment.classification;
  color = environment.classificationColor;

  constructor(private configurationQuery: ConfigurationQuery) {}

  ngOnInit(): void {
    this.buildNumber$ = this.configurationQuery.buildNumber$;
  }
}
