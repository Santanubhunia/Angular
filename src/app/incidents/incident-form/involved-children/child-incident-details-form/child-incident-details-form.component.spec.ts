import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildIncidentDetailsFormComponent } from './child-incident-details-form.component';
import {
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IncidentStore } from '../../../state/incident.store';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChildDetailService } from '../../../state/child-detail.service';
import { MockChildService, MockPersonService } from 'src/testing/mock.services';
import { Component, Input } from '@angular/core';
import { MockLookupPipe } from 'src/testing/lookup.pipe';
import { createModel } from 'src/app/shared/utilities/model-helpers';
import { ChildDetail } from 'src/app/shared/models/child-details.model';
import { Child } from 'src/app/shared/models/child.model';
import { MatRadioModule } from '@angular/material/radio';
import { PersonService } from 'src/app/shared/state/person.service';

describe('ChildIncidentDetailsFormComponent', () => {
  let component: ChildIncidentDetailsFormComponent;
  let incidentStore: IncidentStore;
  let fixture: ComponentFixture<ChildIncidentDetailsFormComponent>;

  const data = {
    incidentId: 1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChildIncidentDetailsFormComponent,
        ErrorsStubComponent,
        MockLookupPipe
      ],
      imports: [
        CommonModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule
      ],
      providers: [
        { provide: ChildDetailService, useValue: MockChildService },
        { provide: PersonService, useValue: MockPersonService },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const child = createModel<Child>({
      firstName: 'Test',
      dateOfBirth: new Date(),
      lastName: 'Test',
      associatedAdults: []
    });
    const childDetail = createModel<ChildDetail>({ child });
    incidentStore = TestBed.inject(IncidentStore);
    fixture = TestBed.createComponent(ChildIncidentDetailsFormComponent);
    component = fixture.componentInstance;
    component.data.childDetail = childDetail;
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
