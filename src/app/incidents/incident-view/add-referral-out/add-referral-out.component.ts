import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IncidentService } from '../../state/incident.service';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { LookupType } from 'src/app/shared/models/lookup.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { ConfigurationQuery } from 'src/app/shared/state/configuration.query';

interface MatDialogData {
  incidentId: ID;
}

@Component({
  selector: 'app-add-referral-out',
  templateUrl: './add-referral-out.component.html',
  styleUrls: ['./add-referral-out.component.scss']
})
export class AddReferralOutComponent implements OnInit {
  referralToForm: FormGroup;
  referralOrganizations$: Observable<LookupType[]>;
  maxDate = new Date();

  constructor(
    private configurationQuery: ConfigurationQuery,
    private incidentService: IncidentService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddReferralOutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialogData
  ) {}

  ngOnInit(): void {
    this.referralOrganizations$ = this.configurationQuery.referralToOrganizations$;

    this.createReferralToForm();
  }

  createReferralToForm() {
    this.referralToForm = this.fb.group({
      id: null,
      referralOrganizationId: [null, Validators.required],
      referralComments: null,
      referralDate: [null, Validators.required],
      referralPOC: null,
      incidentId: this.data.incidentId
    });
  }

  submit() {
    if (this.referralToForm.valid) {
      this.incidentService
        .addReferralTo(this.referralToForm.value)
        .subscribe(() => {
          this.notificationService.showNotificationAlert({
            message: 'Incident successfully updated',
            severity: 'success'
          });
        });

      this.dialogRef.close();
    }
  }
}
