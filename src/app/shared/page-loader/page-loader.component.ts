import { Component, OnInit } from '@angular/core';
import { IncidentQuery } from 'src/app/incidents/state/incident.query';
import { ConfigurationQuery } from '../state/configuration.query';
import { PersonQuery } from '../state/person.query';
import { UserQuery } from 'src/app/admin/state/user.query';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CaseQuery } from 'src/app/case-management/state/case.query';

@Component({
  selector: 'app-page-loader',
  template: `
    <div class="page-loader" *ngIf="loading$ | async">
      <app-loader></app-loader>
    </div>
  `,
  styles: [
    `
      .page-loader {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1001;
        background-color: rgba(0, 0, 0, 0.7);
      }

      app-loader {
        z-index: 1002;
        opacity: 1;
      }
    `
  ]
})
export class PageLoaderComponent implements OnInit {
  loading$: Observable<boolean>;

  constructor(
    private incidentQuery: IncidentQuery,
    private configurationQuery: ConfigurationQuery,
    private personQuery: PersonQuery,
    private userQuery: UserQuery,
    private caseQuery: CaseQuery
  ) {}

  ngOnInit(): void {
    this.loading$ = combineLatest([
      this.incidentQuery.selectLoading(),
      this.configurationQuery.selectLoading(),
      this.personQuery.selectLoading(),
      this.userQuery.selectLoading(),
      this.caseQuery.selectLoading()
    ]).pipe(
      map(
        ([
          incidentLoading,
          configurationLoading,
          personLoading,
          userLoading,
          caseLoading
        ]) => {
          return (
            incidentLoading ||
            configurationLoading ||
            personLoading ||
            userLoading ||
            caseLoading
          );
        }
      )
    );
  }
}
