import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LookupType } from 'src/app/shared/models/lookup.model';
import { ConfigurationQuery } from 'src/app/shared/state/configuration.query';
import { IncidentService } from '../../state/incident.service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit {
  @Input() referralsGroup: FormGroup;
  referralOrganizations$: Observable<LookupType[]>;
  maxDate = new Date();

  constructor(
    private configurationQuery: ConfigurationQuery,
    private incidentService: IncidentService
  ) {}

  ngOnInit() {
    this.referralOrganizations$ = this.configurationQuery.referralSourceOrganizations$;
  }

  previousStep() {
    this.incidentService.previousStep();
  }

  nextStep() {
    this.incidentService.nextStep();
  }
}
