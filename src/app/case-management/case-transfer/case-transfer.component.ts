import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigurationQuery } from 'src/app/shared/state/configuration.query';
import { Observable, zip, of } from 'rxjs';
import { LookupType } from 'src/app/shared/models/lookup.model';
import { Installation } from 'src/app/shared/models/installation.model';
import { tap, switchMap, concatMap, map, startWith } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-case-transfer',
  templateUrl: './case-transfer.component.html',
  styleUrls: ['./case-transfer.component.scss']
})
export class CaseTransferComponent implements OnInit {
  militaryBranches$: Observable<LookupType[]>;
  installations$: Observable<Installation[]>;
  caseTransferForm: FormGroup;
  transferInitiated = false;
  maxDate = new Date();

  constructor(
    private configurationQuery: ConfigurationQuery,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createCaseTransferForm();

    this.militaryBranches$ = this.configurationQuery.militaryBranches$;
    this.installations$ = this.caseTransferForm
      .get('militaryBranchId')
      .valueChanges.pipe(
        untilDestroyed(this),
        startWith(null as Installation),
        concatMap(militaryBranchId =>
          zip(of(militaryBranchId), this.configurationQuery.installations$)
        ),
        map(([militaryBranchId, installations]) =>
          installations.filter(
            installation =>
              militaryBranchId === null ||
              installation.militaryBranchId === null ||
              installation.militaryBranchId === militaryBranchId
          )
        )
      );
    this.configurationQuery.installations$.pipe(
      tap(value => console.log(value))
    );
  }

  createCaseTransferForm() {
    this.caseTransferForm = this.fb.group({
      militaryBranchId: this.fb.control(null, Validators.required),
      installationId: this.fb.control(null, Validators.required),
      effectiveDate: this.fb.control(null, Validators.required),
      notes: this.fb.control(null)
    });
  }
}
