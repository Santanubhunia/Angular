import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartIntakeComponent } from './start-intake.component';
import {
  FormGroup,
  FormControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';

describe('StartIntakeComponent', () => {
  let component: StartIntakeComponent;
  let fixture: ComponentFixture<StartIntakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartIntakeComponent, ErrorsStubComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        NoopAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartIntakeComponent);
    component = fixture.componentInstance;

    component.startIntakeGroup = new FormGroup({
      incidentDate: new FormControl(new Date()),
      riskId: new FormControl(1),
      approximateDate: new FormControl(false)
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
