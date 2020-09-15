import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Incident } from '../../state/incident.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IncidentService } from '../../state/incident.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { Observable } from 'rxjs';
import { LookupType } from 'src/app/shared/models/lookup.model';
import { User } from 'src/app/admin/state/user.model';
import { addEmptyItem } from 'src/app/shared/utilities/form-helpers';
import { UserService } from 'src/app/admin/state/user.service';
import { ConfigurationQuery } from 'src/app/shared/state/configuration.query';

interface MatDialogData {
  incident: Incident;
}

@Component({
  selector: 'app-update-status-assignment',
  templateUrl: './update-status-assignment.component.html',
  styleUrls: ['./update-status-assignment.component.scss']
})
export class UpdateStatusAssignmentComponent implements OnInit {
  statuses$: Observable<LookupType[]>;
  assignableUsers$: Observable<User[]>;
  updateForm: FormGroup;

  get comments() {
    return this.updateForm.get('comments') as FormArray;
  }

  constructor(
    private configurationQuery: ConfigurationQuery,
    private incidentService: IncidentService,
    private notificationService: NotificationService,
    private userService: UserService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: MatDialogData,
    private dialogRef: MatDialogRef<UpdateStatusAssignmentComponent>
  ) {}

  ngOnInit(): void {
    this.statuses$ = this.configurationQuery.statuses$;
    this.assignableUsers$ = this.userService
      .getAssignableUsers()
      .pipe(addEmptyItem());

    this.createUpdateForm();
  }

  createUpdateForm() {
    this.updateForm = this.fb.group({
      statusId: this.fb.control(
        this.data?.incident?.statusId,
        Validators.required
      ),
      assignedTo: this.fb.control(this.data?.incident?.assignedTo),
      comments: this.fb.array([
        this.fb.group({
          value: this.fb.control('')
        })
      ])
    });
  }

  submit() {
    if (this.updateForm.valid) {
      const incident = {
        ...this.data.incident,
        ...this.updateForm.value,
        comments: [
          ...this.data.incident.comments,
          ...this.updateForm.value.comments
        ]
      };

      this.incidentService
        .saveIncident({
          incident: this.data.incident,
          updates: incident,
          type: 'patch'
        })
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
