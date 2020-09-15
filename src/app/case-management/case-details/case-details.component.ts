import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Case } from '../state/case.model';
import { DateSelectComponent } from 'src/app/shared/date-select/date-select.component';
import { createModel } from 'src/app/shared/utilities/model-helpers';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { CaseService } from '../state/case.service';
import { CaseNoteComponent } from '../case-note/case-note.component';

@UntilDestroy()
@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent implements OnInit {
  @Input() case: Case;
  @ViewChild('facatRequested') facatRequested: MatSlideToggle;
  @ViewChild('facatApproved') facatApproved: MatSlideToggle;
  caseDetailsForm: FormGroup;
  date = new Date();
  oldValue: any;

  constructor(
    private caseService: CaseService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.caseDetailsForm.valueChanges
      .pipe(untilDestroyed(this), debounceTime(300))
      .subscribe(value => {
        const changedKey = this.showNoteDialog(value);

        this.oldValue = value;

        if (changedKey && typeof value[changedKey] !== 'object') {
          this.dialog.open(CaseNoteComponent, {
            width: '50vw',
            data: {
              caseId: this.case.id,
              defaultSelectedValue: this.getNoteType(changedKey)
            }
          });
        }

        this.caseService
          .patchCase(this.case, this.caseDetailsForm.value)
          .subscribe();
      });
  }

  handleDate(change: MatCheckboxChange) {
    const checkedId = change.source.id;

    if (change.checked) {
      const dialogRef = this.dialog.open(DateSelectComponent, {
        data: {
          title: `Select date FACAT was ${
            checkedId === 'facatRequested' ? 'requested' : 'approved'
          }`
        }
      });

      dialogRef.afterClosed().subscribe(date => {
        this.caseDetailsForm.patchValue({
          [checkedId]: date || null
        });

        if (!date && this[checkedId] instanceof MatSlideToggle) {
          this[checkedId].checked = false;
        }
      });
    } else {
      this.caseDetailsForm.patchValue({
        [checkedId]: null
      });
    }
  }

  createForm() {
    this.caseDetailsForm = this.fb.group({
      educationSupportPlan: this.case.educationSupportPlan,
      safetyPlan: this.case.safetyPlan,
      priorFAPInvolvement: this.case.priorFAPInvolvement,
      facatRequested: this.case.facatRequested,
      facatApproved: this.case.facatApproved,
      substanceUse: this.case.substanceUse,
      specialNeeds: this.case.specialNeeds,
      reasonableCANDA: this.case.reasonableCANDA,
      cooccurringCANDA: this.case.cooccurringCANDA
    });

    this.oldValue = this.caseDetailsForm.value;
  }

  private showNoteDialog(newValue: any) {
    if (!this.oldValue) {
      for (const key of Object.keys(newValue)) {
        if (newValue[key]) {
          return key;
        }
      }

      return;
    }

    for (const key of Object.keys(newValue)) {
      if (!this.oldValue[key] && newValue[key]) {
        return key;
      }
    }
  }

  private getNoteType(field: string) {
    switch (field) {
      case 'educationSupportPlan':
        return 3;
      case 'safetyPlan':
        return 6;
      case 'priorFAPInvolvement':
        return 5;
      case 'substanceUse':
        return 9;
      case 'specialNeeds':
        return 7;
      case 'reasonableCANDA':
        return 1;
      case 'cooccurringCANDA':
        return 2;
      default:
        return 4;
    }
  }
}
