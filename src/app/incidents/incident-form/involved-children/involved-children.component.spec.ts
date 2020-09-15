import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InvolvedChildrenComponent } from './involved-children.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ChildDetail } from 'src/app/shared/models/child-details.model';
import { createModel } from 'src/app/shared/utilities/model-helpers';
import { Incident } from '../../state/incident.model';
import { IncidentService } from '../../state/incident.service';
import {
  ReactiveFormsModule,
  ValidationErrors,
  FormGroup,
  FormControl,
  FormArray
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { PersonService } from 'src/app/shared/state/person.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Person } from 'src/app/shared/models/person.model';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { MockNotificationService } from 'src/testing/mock.services';

describe('InvolvedChildrenComponent', () => {
  let component: InvolvedChildrenComponent;
  let fixture: ComponentFixture<InvolvedChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InvolvedChildrenComponent,
        ChildDetailListStubComponent,
        ErrorsStubComponent,
        PersonLookupStubComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatCardModule,
        MatDialogModule,
        RouterTestingModule
      ],
      providers: [
        { provide: IncidentService, useValue: {} },
        { provide: PersonService, useValue: {} },
        { provide: NotificationService, useValue: MockNotificationService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const incident = createModel<Incident>({ id: 1, childIncidentDetails: [] });
    fixture = TestBed.createComponent(InvolvedChildrenComponent);
    component = fixture.componentInstance;

    component.involvedChildrenGroup = new FormGroup({
      numberOfChildrenInvolved: new FormControl(null),
      childIncidentDetails: new FormArray([])
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ selector: 'app-child-detail-list', template: '' })
class ChildDetailListStubComponent {
  @Input() index: number;
  @Input() childDetails: ChildDetail[];
}

@Component({ selector: 'app-errors', template: '' })
class ErrorsStubComponent {
  @Input() errors: ValidationErrors;
  @Input() customErrors = {};
}

@Component({ selector: 'app-person-lookup', template: '' })
class PersonLookupStubComponent {
  @Input() isChild = false;
  @Output() personSelected = new EventEmitter<Person>();
}
