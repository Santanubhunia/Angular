import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ID } from '@datorama/akita';
import { ConfigurationQuery } from 'src/app/shared/state/configuration.query';
import { LookupType } from 'src/app/shared/models/lookup.model';
import { ChildDetailService } from '../../../state/child-detail.service';
import { ChildDetail } from 'src/app/shared/models/child-details.model';
import { PersonService } from 'src/app/shared/state/person.service';

interface DialogData {
  index: number;
  childDetail: ChildDetail;
  showEducationSupportPlan: boolean;
}

@Component({
  selector: 'app-child-incident-details-form',
  templateUrl: './child-incident-details-form.component.html',
  styleUrls: ['./child-incident-details-form.component.scss']
})
export class ChildIncidentDetailsFormComponent implements OnInit {
  genders$: Observable<LookupType[]>;
  childTypes$: Observable<LookupType[]>;
  childDetailForm: FormGroup;

  constructor(
    private configurationQuery: ConfigurationQuery,
    private personService: PersonService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChildIncidentDetailsFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.genders$ = this.configurationQuery.genders$;
    this.childTypes$ = this.configurationQuery.childTypes$;
    this.createChildForm();

    if (this.data.childDetail) {
      this.childDetailForm.patchValue(this.data.childDetail);
    }
  }

  createChildForm() {
    this.childDetailForm = this.fb.group({
      childTypeId: [null, Validators.required],
      ageAtIncident: null,
      educationSupportPlan: null
    });
  }

  close() {
    this.personService.resetState();
    this.dialogRef.close();
  }

  save() {
    if (this.childDetailForm.valid) {
      this.dialogRef.close({
        index: this.data.index,
        childDetail: {
          ...this.data.childDetail,
          ...this.childDetailForm.value
        }
      });
    }
  }
}
