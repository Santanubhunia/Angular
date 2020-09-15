import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ValidatorFn,
  FormControl,
  ValidationErrors
} from '@angular/forms';
import { IncidentService } from '../state/incident.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { Incident } from '../state/incident.model';
import { NgFormsManager } from '@ngneat/forms-manager';
import { IncidentQuery } from '../state/incident.query';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { compareDatesValidator } from 'src/app/shared/validation/date-compare.directive';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { debounceTime, tap, filter } from 'rxjs/operators';
import { SessionQuery } from 'src/app/auth/state/session.query';
import { BreadcrumbService } from 'src/app/breadcrumbs/breadcrumb.service';
import { Location } from '@angular/common';

interface Step {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  completed: boolean;
  controls?: string[];
}

@UntilDestroy()
@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.scss'],
  animations: [
    trigger('enterTrigger', [
      state(
        'fadeIn',
        style({
          opacity: '1'
        })
      ),
      transition('void => *', [style({ opacity: '0' }), animate('500ms')])
    ])
  ]
})
export class IncidentFormComponent implements OnInit {
  activeStep$: Observable<number>;
  incident: Incident = null;
  incidentValue: Partial<Incident> = {};
  incidentForm: FormGroup;
  hasIncidentForm: boolean;
  saveAsDraftDisabled = true;
  changeFromSave = true;
  isEdit = false;
  maxDate = new Date();
  steps: Step[] = [
    {
      id: 'startIntake',
      label: 'Start Intake',
      title: 'Start Incident Intake',
      subtitle:
        'Please enter the required information to start the data collection process for this incident',
      completed: false,
      controls: ['incidentDate', 'riskId']
    },
    {
      id: 'involvedChildren',
      label: 'Involved Children',
      title: 'Involved Children',
      subtitle:
        'Provide information on the involved children, starting with the number of children involved. Add children using the "Add Child" button or by looking up an existing child.',
      completed: false,
      controls: ['childIncidentDetails', 'numberOfChildrenInvolved']
    },
    {
      id: 'details',
      label: 'Incident Details',
      title: 'Incident Details',
      subtitle:
        'Please describe the incident in as much detail as possible using the form below',
      completed: false,
      controls: ['allegations']
    },
    {
      id: 'referrals',
      label: 'Incident Source',
      title: 'Incident Source',
      subtitle: 'Provide details about the report source for this incident',
      completed: false,
      controls: ['referralSource']
    },
    {
      id: 'summary',
      label: 'Summary',
      title: 'Summary',
      completed: false
    }
  ];

  constructor(
    private incidentQuery: IncidentQuery,
    private incidentService: IncidentService,
    private notificationService: NotificationService,
    private sessionQuery: SessionQuery,
    private breadcrumbService: BreadcrumbService,
    private formsManager: NgFormsManager<AppForms>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  get artifacts() {
    return this.incidentForm.get('artifacts') as FormArray;
  }

  get childIncidentDetails() {
    return this.incidentForm?.get('childIncidentDetails') as FormArray;
  }

  ngOnInit(): void {
    this.activeStep$ = this.incidentQuery.activeStep$;
    this.hasIncidentForm = this.formsManager.hasControl('incidentForm');
    this.createIncidentForm();
    this.watchForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');

      if (id && this.incidentQuery.getActiveId() !== id) {
        this.incidentService.getIncident(id).subscribe();
      }
    });

    this.incidentQuery
      .selectActive()
      .pipe(
        untilDestroyed(this),
        filter(incident => !!incident)
      )
      .subscribe((incident: Incident) => {
        this.isEdit = incident && incident.statusId !== 5;

        if (incident?.childIncidentDetails?.length) {
          this.childIncidentDetails.clear();
          for (const childDetail of incident.childIncidentDetails) {
            this.childIncidentDetails.push(
              this.fb.group({
                id: childDetail.id,
                ageAtIncident: childDetail.ageAtIncident,
                child: childDetail.child,
                childTypeId: childDetail.childTypeId,
                educationSupportPlan: childDetail.educationSupportPlan
              })
            );
          }
        }

        if (incident?.artifacts.length) {
          this.artifacts.clear();
          for (const artifact of incident.artifacts) {
            this.artifacts.push(
              this.fb.group({
                id: artifact.id,
                name: artifact.name,
                fileName: artifact.fileName,
                fileSize: artifact.fileSize
              })
            );
          }
        }

        if (incident && !this.incident && !this.hasIncidentForm) {
          this.breadcrumbService.updateLabels({
            incidentNumber: { label: incident.incidentNumber }
          });
          this.incidentForm.patchValue(incident);
          this.updateSteps();
        }

        this.incident = incident;
      });
  }

  createIncidentForm() {
    this.incidentForm = this.fb.group(
      {
        statusId: 5,
        approximateDate: false,
        incidentDate: [
          null,
          [Validators.required, compareDatesValidator(true, new Date())]
        ],
        riskId: [null, Validators.required],
        childIncidentDetails: this.fb.array([], Validators.required),
        numberOfChildrenInvolved: [
          null,
          [
            Validators.required,
            Validators.pattern('[0-9]*'),
            Validators.min(1),
            this.involvedPartiesValidator
          ]
        ],
        occurredOnAnInstallation: false,
        allegations: [null, Validators.required],
        safetyImpactLevel: false,
        lawEnforcementContacted: false,
        safetyPlan: null,
        servicesOffered: false,
        servicesAccepted: false,
        assignedTo: this.sessionQuery.getUserId(),
        qaReviewedBy: null,
        qaReviewDate: null,
        qaReviewNotes: null,
        fileBinary: null,
        artifacts: this.fb.array([]),
        locationId: null,
        referralSource: this.fb.group({
          id: null,
          referralOrganizationId: [null, Validators.required],
          referralComments: null,
          referralDate: [null, Validators.required],
          referralPOC: null
        })
      },
      { validators: this.requireChildrenValidator }
    );

    this.upsertForm();
  }

  watchForm() {
    let change: 'incidentForm' | 'activeStep';

    combineLatest([
      this.incidentForm.valueChanges.pipe(
        debounceTime(300),
        tap(_ => (change = 'incidentForm'))
      ),
      this.activeStep$.pipe(tap(() => (change = 'activeStep')))
    ])
      .pipe(untilDestroyed(this))
      .subscribe(([_, activeStep]) => {
        this.steps[activeStep].completed = this.getStepCompleted(
          this.steps[activeStep].controls
        );

        if (this.changeFromSave && change === 'incidentForm') {
          this.changeFromSave = false;
        } else if (change === 'incidentForm') {
          this.saveAsDraftDisabled = false;
        }
      });
  }

  upsertForm() {
    this.formsManager.upsert('incidentForm', this.incidentForm, {
      arrControlFactory: {
        childIncidentDetails: value => this.fb.group(value),
        artifacts: value => this.fb.group(value)
      },
      persistState: true
    });

    this.updateSteps();
  }

  stepClick(step: number, activeStep: number) {
    const currentStepValid =
      activeStep === 4 ||
      this.getStepCompleted(this.steps[activeStep].controls);

    const previousStepValid =
      step === 0 || this.getStepCompleted(this.steps[step - 1].controls);

    this.steps[activeStep].completed = currentStepValid;

    if ((currentStepValid && previousStepValid) || step < activeStep) {
      this.incidentService.setActiveStep(step);
    }
  }

  cancel() {
    this.formsManager.destroy('incidentForm');
    this.incidentService.setActive(null);
    this.location.back();
  }

  nextStep() {
    this.updateSteps();
    this.incidentService.nextStep();
  }

  previousStep() {
    this.updateSteps();
    this.incidentService.previousStep();
  }

  saveAsDraft() {
    this.saveIncident(true);
    this.saveAsDraftDisabled = true;
  }

  submit() {
    if (this.incidentForm.valid) {
      this.saveIncident();
    }
  }

  private updateSteps() {
    for (const step of this.steps) {
      if (step.id !== 'summary') {
        step.completed = this.getStepCompleted(step.controls);
      } else {
        step.completed = this.incidentForm.valid;
      }
    }
  }

  private saveIncident(saveAsDraft = false) {
    this.changeFromSave = true;

    if (!saveAsDraft && this.incidentForm.get('statusId').value === 5) {
      this.incidentForm.patchValue({ statusId: 1 });
    }

    this.incidentService
      .saveIncident({
        incidentId: this.incident?.id,
        incident: {
          id: this.incident?.id,
          ...this.incidentForm.value
        },
        type: this.incident ? 'update' : 'add'
      })
      .subscribe(
        incident => {
          this.notificationService.showNotificationAlert({
            severity: 'success',
            message: `Incident ${
              incident?.incidentNumber || this.incident.incidentNumber
            } was successfully saved!`
          });

          if (!saveAsDraft) {
            this.router.navigate(['/incidents', 'view', incident.id]);
          }
        },
        () =>
          this.notificationService.showNotificationAlert({
            severity: 'error',
            message:
              'There was a problem saving the incident. Please try again.'
          })
      );
  }

  private getStepCompleted(controls?: string[]) {
    return !controls?.some(control => this.incidentForm.get(control).invalid);
  }

  private involvedPartiesValidator: ValidatorFn = (
    control: FormControl
  ): ValidationErrors | null => {
    const children = this.childIncidentDetails?.length || 0;

    return control && control.value && children > +control.value
      ? { incorrectNumberOfPeople: true }
      : null;
  };

  private requireChildrenValidator: ValidatorFn = (
    group: FormGroup
  ): ValidationErrors | null => {
    const numberOfChildren = group.get('numberOfChildrenInvolved');
    return numberOfChildren &&
      numberOfChildren.value &&
      !this.childIncidentDetails?.length
      ? { childrenRequired: true }
      : null;
  };
}
