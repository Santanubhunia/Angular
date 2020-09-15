import { Component, OnInit, Inject } from '@angular/core';
import { Child } from 'src/app/shared/models/child.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ID, applyTransaction } from '@datorama/akita';
import { IncidentService } from '../state/incident.service';
import { Observable } from 'rxjs';
import { Incident } from '../state/incident.model';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

interface DialogData {
  child: Child;
}

@Component({
  selector: 'app-prior-reports',
  templateUrl: './prior-reports.component.html',
  styleUrls: ['./prior-reports.component.scss']
})
export class PriorReportsComponent implements OnInit {
  incidents$: Observable<Incident[]>;

  constructor(
    private incidentService: IncidentService,
    private router: Router,
    private dialogRef: MatDialogRef<PriorReportsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.incidents$ = this.incidentService
      .getChildIncidents(this.data.child.id)
      .pipe(
        map(incidents => incidents.filter(incident => incident.statusId !== 5))
      );
  }

  close() {
    this.dialogRef.close();
  }

  gotoIncident(incidentId: ID) {
    applyTransaction(() => {
      this.incidentService.setActive(null);
      this.incidentService.setActiveStep(0);
    });
    this.dialogRef.close();
    this.router.navigate(['/incidents', 'view', incidentId]);
  }
}
