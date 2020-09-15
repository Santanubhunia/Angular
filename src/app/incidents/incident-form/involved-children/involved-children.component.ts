import {
  Component,
  OnInit,
  Input,
  Optional,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChildIncidentDetailsFormComponent } from './child-incident-details-form/child-incident-details-form.component';
import { ChildDetail } from 'src/app/shared/models/child-details.model';
import { Child } from 'src/app/shared/models/child.model';
import { createModel } from 'src/app/shared/utilities/model-helpers';
import { PersonQuery } from 'src/app/shared/state/person.query';
import { take } from 'rxjs/operators';
import { IncidentService } from '../../state/incident.service';
import { PersonService } from 'src/app/shared/state/person.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { ID } from '@datorama/akita';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@UntilDestroy()
@Component({
  selector: 'app-involved-children',
  templateUrl: './involved-children.component.html',
  styleUrls: ['./involved-children.component.scss']
})
export class InvolvedChildrenComponent implements OnInit {
  @Optional() @Input() incidentId: ID;
  @Input() involvedChildrenGroup: FormGroup;
  @Input() showEducationSupportPlan: boolean;
  @Output() gotoIncident = new EventEmitter<ID>();

  customErrors = {
    incorrectNumberOfPeople:
      'This cannot be lower than then the listed children below',
    pattern: 'Value must be a number'
  };

  constructor(
    private childQuery: PersonQuery,
    private incidentService: IncidentService,
    private personService: PersonService,
    private notificationService: NotificationService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  get childIncidentDetails() {
    return this.involvedChildrenGroup.get('childIncidentDetails') as FormArray;
  }

  ngOnInit() {
    this.childQuery.child$.pipe(take(1)).subscribe(child => {
      if (child) {
        this.addChildDetail(child);
      }
    });

    this.childIncidentDetails.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        const numberOfChildrenInvolved = this.involvedChildrenGroup.get(
          'numberOfChildrenInvolved'
        ).value;

        if (numberOfChildrenInvolved < (value?.length || 0)) {
          this.involvedChildrenGroup.patchValue({
            numberOfChildrenInvolved: value.length
          });
        }

        this.involvedChildrenGroup.updateValueAndValidity();
        this.involvedChildrenGroup
          .get('numberOfChildrenInvolved')
          .updateValueAndValidity();
      });
  }

  onChildSelected(child: Child) {
    if (
      child &&
      !this.childIncidentDetails.value.some(
        (cd: ChildDetail) => cd.child.id === child.id
      )
    ) {
      this.addChildDetail(child);
    } else {
      this.notificationService.showNotificationAlert({
        message: 'Child already added!',
        severity: 'info'
      });
    }
  }

  addChildDetail(child: Child) {
    const dialogRef = this.dialog.open(ChildIncidentDetailsFormComponent, {
      width: '600px',
      disableClose: true,
      data: {
        childDetail: createModel<ChildDetail>({ child }),
        showEducationSupportPlan: this.showEducationSupportPlan
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.handleChildDetail(result);
    });
  }

  previous() {
    this.incidentService.previousStep();
  }

  next() {
    if (this.involvedChildrenGroup.valid) {
      this.incidentService.nextStep();
    }
  }

  removeChildDetail(index: number) {
    this.childIncidentDetails.removeAt(index);
  }

  handleChildDetail(result: { index: number; childDetail: ChildDetail }) {
    if (result && result.childDetail) {
      const { index, childDetail } = result;

      if (index >= 0) {
        this.childIncidentDetails.at(index).patchValue(childDetail);
      } else {
        const incidentDate = new Date(
          this.involvedChildrenGroup.get('incidentDate').value || new Date()
        );

        this.childIncidentDetails.push(
          this.fb.group({
            ageAtIncident: this.calculateAgeAtIncident(
              incidentDate,
              new Date(childDetail.child.dateOfBirth)
            ),
            child: childDetail.child,
            childTypeId: childDetail.childTypeId,
            educationSupportPlan: childDetail.educationSupportPlan
          })
        );
      }
    }

    this.personService.resetState();
  }

  onGotoIncident(id: ID) {
    this.gotoIncident.emit(id);
  }

  private calculateAgeAtIncident(incidentDate: Date, dateOfBirth: Date) {
    // tslint:disable-next-line: no-bitwise
    return ~~((incidentDate.getTime() - dateOfBirth.getTime()) / 31557600000);
  }
}
