import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Optional,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { Location } from '@angular/common';
import { PersonService } from '../state/person.service';
import { PersonQuery } from '../state/person.query';
import { switchMap, take, tap, filter, map } from 'rxjs/operators';
import { ConfigurationQuery } from '../state/configuration.query';
import { Observable } from 'rxjs';
import { LookupType } from '../models/lookup.model';
import { Adult } from '../models/adult.model';
import { NgFormsManager } from '@ngneat/forms-manager';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Person } from '../models/person.model';
import { ASSOCIATED_ADULTS } from '../utilities/constants';
import { MatDialog } from '@angular/material/dialog';
import { PersonEditDialogComponent } from '../person-edit-dialog/person-edit-dialog.component';
import { Address } from '../models/address.model';

@UntilDestroy()
@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit, OnDestroy {
  @Input() isDialog = false;
  @Optional() @Input() person: Person;
  @Optional() @Input() isChild: boolean;
  @Output() closeDialog = new EventEmitter<boolean>();
  adultTypes$: Observable<LookupType[]>;
  employmentStatuses$: Observable<LookupType[]>;
  genders$: Observable<LookupType[]>;
  prefixes$: Observable<LookupType[]>;
  suffixes$: Observable<LookupType[]>;
  states$: Observable<LookupType[]>;
  militaryBranches$: Observable<LookupType[]>;
  installations$: Observable<LookupType[]>;
  ranks$: Observable<LookupType[]>;
  commands$: Observable<LookupType[]>;
  payGrades$: Observable<LookupType[]>;
  adults$: Observable<Adult[]>;
  personForm: FormGroup;
  alternateIdControl = this.fb.control(false);
  sameAddress = this.fb.control(true);
  ssnBaseValidators = [
    Validators.maxLength(11),
    Validators.pattern(/^\d{3}-\d{2}-\d{4}$/)
  ];
  maxDate = new Date();
  customErrors = {
    pattern: 'Must be a valid value in the format 123-45-6789',
    email: 'Must be a valid email address'
  };

  constructor(
    private configurationQuery: ConfigurationQuery,
    private personQuery: PersonQuery,
    private personService: PersonService,
    private formsManager: NgFormsManager<AppForms>,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  get addresses() {
    return this.personForm.get('addresses') as FormArray;
  }

  get phoneNumbers() {
    return this.personForm.get('phoneNumbers') as FormArray;
  }

  get emailAddresses() {
    return this.personForm.get('emailAddresses') as FormArray;
  }

  get protectedInformation() {
    return this.personForm.get('protectedInformation') as FormArray;
  }

  ngOnInit() {
    this.adultTypes$ = this.personQuery.adults$.pipe(
      switchMap(adults => {
        return this.configurationQuery.adultTypes$.pipe(
          map(adultTypes => {
            if (adults.some(a => a.adultTypeId === 1)) {
              return adultTypes.filter(at => at.id !== 1);
            }

            return adultTypes;
          })
        );
      })
    );
    this.employmentStatuses$ = this.configurationQuery.employmentStatuses$;
    this.genders$ = this.configurationQuery.genders$;
    this.prefixes$ = this.configurationQuery.prefixes$;
    this.suffixes$ = this.configurationQuery.suffixes$;
    this.states$ = this.configurationQuery.states$;
    this.militaryBranches$ = this.configurationQuery.militaryBranches$;
    this.installations$ = this.configurationQuery.installations$;
    this.ranks$ = this.configurationQuery.ranks$;
    this.commands$ = this.configurationQuery.commands$;
    this.payGrades$ = this.configurationQuery.payGrades$;
    this.adults$ = this.personQuery.adults$;

    this.isChild =
      this.isChild === undefined
        ? this.route.snapshot.data?.child || false
        : this.isChild;

    this.createForm();
  }

  createForm() {
    if (this.isChild) {
      this.formsManager.upsert('alternateId', this.alternateIdControl);
    }

    this.personForm = this.fb.group({
      id: null,
      prefix: null,
      firstName: [null, Validators.required],
      middleName: null,
      lastName: [null, Validators.required],
      suffix: null,
      dateOfBirth: [null, Validators.required],
      genderId: [null, Validators.required],
      protectedInformation: this.fb.array([
        this.fb.group({
          id: null,
          protectedInformationType: 1,
          value: [
            null,
            this.isChild && !this.alternateIdControl.value
              ? [Validators.required, ...this.ssnBaseValidators]
              : [...this.ssnBaseValidators]
          ]
        })
      ]),
      doDId: [
        null,
        this.isChild && !this.alternateIdControl.value
          ? Validators.maxLength(20)
          : [Validators.required, Validators.maxLength(20)]
      ],
      addresses: this.fb.array([
        this.fb.group({
          id: null,
          street: null,
          city: null,
          stateId: null,
          zipCode: null,
          country: null
        })
      ]),
      ...(this.isChild
        ? {
            beneficiary: true,
            contactEmailAddress: this.fb.group({
              id: null,
              address: [null, Validators.email]
            }),
            contactPhoneNumber: this.fb.group({
              id: null,
              number: null
            })
          }
        : {
            adultTypeId: [null, Validators.required],
            employmentStatusId: [null, Validators.required],
            militaryBranchId: [null, Validators.required],
            installationId: [null, Validators.required],
            payGradeId: null,
            rankId: null,
            commandId: null,
            unit: null,
            phoneNumbers: this.fb.array([
              this.fb.group({
                id: null,
                number: null
              })
            ]),
            emailAddresses: this.fb.array([
              this.fb.group({
                id: null,
                address: null
              })
            ])
          })
    });

    if (this.person) {
      this.personForm.patchValue(this.person);

      if (this.person.hasOwnProperty(ASSOCIATED_ADULTS)) {
        this.personService.setAdults(this.person[ASSOCIATED_ADULTS]);
      }
    }

    if (this.isChild) {
      this.formsManager.upsert('childForm', this.personForm, {
        arrControlFactory: {
          protectedInformation: value => this.fb.group(value),
          addresses: value => this.fb.group(value),
          associatedAdults: value => this.fb.control(value)
        },
        persistState: true
      });
    } else {
      document.getElementsByTagName('mat-sidenav-content')?.[0]?.scrollTo(0, 0);

      const address: Address = this.addresses.at(0)?.value;

      if (
        address.street ||
        address.city ||
        address.unit ||
        address.zipCode ||
        address.stateId !== null
      ) {
        this.sameAddress.patchValue(false);
      } else {
        this.onAddressChange({ checked: true, source: null });
      }

      this.personForm
        .get('employmentStatusId')
        .valueChanges.pipe(untilDestroyed(this))
        .subscribe(value => {
          for (const controlName of [
            'commandId',
            'rankId',
            'payGradeId',
            'unit'
          ]) {
            const control = this.personForm.get(controlName);

            if (value === 1) {
              control.setValidators(Validators.required);
            } else {
              control.clearValidators();
              control.setValue(null);
            }

            control.updateValueAndValidity();
          }
        });
    }
  }

  goBack() {
    if (this.isChild) {
      this.formsManager.destroy(['alternateId', 'childForm']);

      if (!this.isDialog) {
        this.personService.resetState();
      }
    }

    if (this.isDialog) {
      this.closeDialog.emit(false);
    } else {
      this.location.back();
    }
  }

  addPerson() {
    if (this.isDialog) {
      this.dialog.open(PersonEditDialogComponent, {
        minWidth: '60vw',
        maxHeight: '90vh',
        panelClass: 'no-padding-dialog',
        disableClose: true,
        data: {
          isChild: false
        }
      });
    } else {
      this.router.navigateByUrl(this.router.url.replace('child', 'person'));
    }
  }

  onAddressChange(useSameAddress: MatCheckboxChange) {
    if (useSameAddress.checked) {
      const value = this.formsManager.getControl('childForm', 'addresses')
        ?.value?.[0];

      this.addresses.setControl(
        0,
        this.fb.group(
          value
            ? { ...value, id: null }
            : {
                id: null,
                street: null,
                city: null,
                stateId: null,
                zipCode: null,
                country: null
              }
        )
      );
    } else {
      this.addresses.setControl(
        0,
        this.fb.group({
          id: null,
          street: null,
          city: null,
          stateId: null,
          zipCode: null,
          country: null
        })
      );
    }
  }

  onAlternateIdChecked(useAlternateId: MatSlideToggleChange) {
    const ssn = this.protectedInformation.controls[0].get('value');
    const dodId = this.personForm.get('doDId');

    if (this.isChild) {
      ssn.setValidators(
        useAlternateId.checked
          ? [...this.ssnBaseValidators]
          : [Validators.required, ...this.ssnBaseValidators]
      );
      dodId.setValidators(
        useAlternateId.checked
          ? [Validators.required, Validators.maxLength(20)]
          : Validators.maxLength(20)
      );
    } else {
      ssn.setValidators(
        useAlternateId.checked
          ? [Validators.required, ...this.ssnBaseValidators]
          : [...this.ssnBaseValidators]
      );
      dodId.setValidators(
        useAlternateId.checked
          ? Validators.maxLength(20)
          : [Validators.required, Validators.maxLength(20)]
      );
    }

    ssn.updateValueAndValidity();
    dodId.updateValueAndValidity();
  }

  onPersonSelected(adult: Adult) {
    this.personService.addAdultToState(adult);
  }

  onSubmit() {
    if (this.personForm.valid) {
      if (this.isChild) {
        this.personService.saveChild(this.personForm.value).subscribe(() => {
          if (this.isDialog) {
            this.closeDialog.emit(true);
          } else {
            this.router.navigateByUrl(this.router.url.replace('/child', ''));
          }
        });
      } else {
        this.formsManager.patchValue(
          'childForm',
          this.formsManager.getControl('childForm') as any
        );
        this.personService.saveAdult(this.personForm.value).subscribe(() => {
          if (this.isDialog) {
            this.closeDialog.emit(true);
          } else {
            this.router.navigateByUrl(
              this.router.url.replace('person', 'child')
            );
          }
        });
      }
    }
  }

  ngOnDestroy() {
    this.formsManager.unsubscribe(['alternateId', 'childForm']);
  }
}
