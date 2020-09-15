import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReferralOutComponent } from './add-referral-out.component';
import {
  MockIncidentService,
  MockNotificationService
} from 'src/testing/mock.services';
import { IncidentService } from '../../state/incident.service';
import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Input } from '@angular/core';

describe('AddReferralOutComponent', () => {
  let component: AddReferralOutComponent;
  let fixture: ComponentFixture<AddReferralOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NoopAnimationsModule,
        MatDialogModule
      ],
      declarations: [AddReferralOutComponent, ErrorsStubComponent],
      providers: [
        { provide: IncidentService, useValue: MockIncidentService },
        { provide: NotificationService, useValue: MockNotificationService },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { incidentId: 0 } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReferralOutComponent);
    component = fixture.componentInstance;
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
