import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralsComponent } from './referrals.component';
import {
  ValidationErrors,
  FormGroup,
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';
import { IncidentService } from '../../state/incident.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { Component, Input } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MockIncidentService } from 'src/testing/mock.services';

describe('ReferralsComponent', () => {
  let component: ReferralsComponent;
  let fixture: ComponentFixture<ReferralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReferralsComponent, ErrorsStubComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      providers: [{ provide: IncidentService, useValue: MockIncidentService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralsComponent);
    component = fixture.componentInstance;

    component.referralsGroup = new FormGroup({
      referralSource: new FormGroup({
        referralOrganizationId: new FormControl(null),
        referralComments: new FormControl(null),
        referralDate: new FormControl(null),
        referralPOC: new FormControl(null)
      }),
      referralOut: new FormGroup({
        referralOrganizationId: new FormControl(null),
        referralComments: new FormControl(null),
        referralDate: new FormControl(null),
        referralPOC: new FormControl(null)
      })
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
