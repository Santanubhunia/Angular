import { Component, OnInit } from '@angular/core';
import {
  faFileExclamation,
  faShieldCheck,
  faShieldAlt,
  faWineBottle,
  faMapPin,
  faMap,
  faEllipsisH
} from '@fortawesome/pro-duotone-svg-icons';
import { Observable } from 'rxjs';
import { Incident } from '../state/incident.model';
import { IncidentService } from '../state/incident.service';
import { IncidentQuery } from '../state/incident.query';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ID } from '@datorama/akita';
import { MatDialog } from '@angular/material/dialog';
import { UpdateStatusAssignmentComponent } from './update-status-assignment/update-status-assignment.component';
import { BreadcrumbService } from 'src/app/breadcrumbs/breadcrumb.service';
import { AddReferralOutComponent } from './add-referral-out/add-referral-out.component';

@Component({
  selector: 'app-incident-view',
  templateUrl: './incident-view.component.html',
  styleUrls: ['./incident-view.component.scss']
})
export class IncidentViewComponent implements OnInit {
  incident$: Observable<Incident>;
  index = 0;
  faFileExclamation = faFileExclamation;
  faShieldCheck = faShieldCheck;
  faShieldAlt = faShieldAlt;
  faWineBottle = faWineBottle;
  faMapPin = faMapPin;
  faMap = faMap;
  faEllipsisH = faEllipsisH;

  constructor(
    private incidentService: IncidentService,
    private incidentQuery: IncidentQuery,
    private breadcrumbsService: BreadcrumbService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id !== this.incidentQuery.getActiveId()) {
        this.incidentService.getIncident(id).subscribe();
      }
    });

    this.incident$ = this.incidentQuery.selectActive().pipe(
      tap(incident => {
        if (incident) {
          this.breadcrumbsService.updateLabels({
            incidentNumber: { label: incident.incidentNumber }
          });
        }
      })
    );
  }

  addReferralTo(incidentId: ID) {
    this.dialog.open(AddReferralOutComponent, {
      minWidth: '50vw',
      data: { incidentId }
    });
  }

  editIncident(incidentId: ID) {
    this.incidentService.editIncident(incidentId);
  }

  next(length: number) {
    if (this.index !== length) {
      this.index++;
    }
  }

  previous() {
    if (this.index !== 0) {
      this.index--;
    }
  }

  updateStatusAndAssignment(incident: Incident) {
    this.dialog.open(UpdateStatusAssignmentComponent, {
      data: { incident }
    });
  }
}
