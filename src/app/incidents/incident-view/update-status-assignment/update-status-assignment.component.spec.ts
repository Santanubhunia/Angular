import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusAssignmentComponent } from './update-status-assignment.component';
import { IncidentService } from '../../state/incident.service';
import {
  MockIncidentService,
  MockNotificationService,
  MockUserService
} from 'src/testing/mock.services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { UserService } from 'src/app/admin/state/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UpdateStatusAssignmentComponent', () => {
  let component: UpdateStatusAssignmentComponent;
  let fixture: ComponentFixture<UpdateStatusAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatDialogModule
      ],
      declarations: [UpdateStatusAssignmentComponent],
      providers: [
        { provide: IncidentService, useValue: MockIncidentService },
        { provide: NotificationService, useValue: MockNotificationService },
        { provide: UserService, useValue: MockUserService },
        { provide: MAT_DIALOG_DATA, useValue: { incident: {} } },
        { provide: MatDialogRef, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStatusAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
