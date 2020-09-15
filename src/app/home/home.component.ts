import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IncidentQuery } from '../incidents/state/incident.query';
import { IncidentService } from '../incidents/state/incident.service';
import { MatDialog } from '@angular/material/dialog';
import { CaseNotesListComponent } from '../case-management/case-notes-list/case-notes-list.component';
import { BreadcrumbService } from '../breadcrumbs/breadcrumb.service';
import { BACK_TO } from '../shared/utilities/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  activeIncidentCount$: Observable<number>;
  recentlyUpdatedIncidentCount$: Observable<number>;

  constructor(
    private inicidentQuery: IncidentQuery,
    private incidentService: IncidentService,
    private breadcrumbService: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.breadcrumbService.updateLabels({
      [BACK_TO]: { label: 'Home', url: '/home' }
    });
    this.activeIncidentCount$ = this.inicidentQuery.activeIncidentCount$;
    this.recentlyUpdatedIncidentCount$ = this.inicidentQuery.recentlyUpdatedIncidentCount$;
  }

  createNewIncident() {
    this.incidentService.createIncident();
  }
}
