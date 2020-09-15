import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  FormArray
} from '@angular/forms';
import { IncidentService } from '../../state/incident.service';
import {
  MockIncidentService,
  MockArtifactService,
  MockUserService
} from 'src/testing/mock.services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { FileInputComponent } from 'src/app/shared/file-input/file-input.component';
import { Component, Input } from '@angular/core';
import { ArtifactService } from '../../state/artifact.service';
import { UserService } from 'src/app/admin/state/user.service';
import { of } from 'rxjs';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  const mockUserService = MockUserService;
  mockUserService.getAssignableUsers.and.returnValue(of([{}]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailsComponent,
        MatIconStubComponent,
        ErrorsStubComponent,
        FileInputComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule
      ],
      providers: [
        { provide: IncidentService, useValue: MockIncidentService },
        { provide: ArtifactService, useValue: MockArtifactService },
        { provide: UserService, useValue: mockUserService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;

    component.detailsGroup = new FormGroup({
      occurredOnAnInstallation: new FormControl(false),
      allegations: new FormControl(''),
      safetyImpactLevel: new FormControl(false),
      lawEnforcementContacted: new FormControl(false),
      safetyPlan: new FormControl(null),
      servicesOffered: new FormControl(false),
      servicesAccepted: new FormControl(false),
      assignedTo: new FormControl(null),
      qaReviewedBy: new FormControl(null),
      qaReviewDate: new FormControl(null),
      qaReviewNotes: new FormControl(null),
      fileBinary: new FormControl(null),
      artifacts: new FormArray([]),
      locationId: new FormControl(null)
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ selector: 'app-errors', template: '' })
class ErrorsStubComponent {
  @Input() errors: ValidationErrors;
  @Input() customErrors = {};
}

// tslint:disable-next-line: component-selector
@Component({ selector: 'mat-icon', template: '' })
class MatIconStubComponent {
  @Input() svgIcon: string;
}
