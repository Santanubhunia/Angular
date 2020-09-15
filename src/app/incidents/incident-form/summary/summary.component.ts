import { Component, OnInit, Input, Optional } from '@angular/core';
import { IncidentService } from '../../state/incident.service';
import { ChildDetail } from 'src/app/shared/models/child-details.model';
import { Incident } from '../../state/incident.model';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Optional() @Input() incident: Incident;
  @Input() incidentForm: Incident;
  impactedChildren: ChildDetail[];
  exhibitingChildren: ChildDetail[];
  impactedAndExhibitingChildren: ChildDetail[];
  attachments: string;
  showDetails: boolean;

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.impactedChildren = this.incidentForm.childIncidentDetails.filter(
      cd => cd.childTypeId === 1
    );
    this.exhibitingChildren = this.incidentForm.childIncidentDetails.filter(
      cd => cd.childTypeId === 2
    );
    this.impactedAndExhibitingChildren = this.incidentForm.childIncidentDetails.filter(
      cd => cd.childTypeId === 3
    );
    this.attachments = this.incidentForm.artifacts
      ?.map(a => a.fileName)
      .sort((a, b) => a.localeCompare(b))
      .join(', ');
    this.showDetails = this.incidentForm.riskId !== 1;
  }

  editSection(step: number) {
    this.incidentService.setActiveStep(step);
  }
}
