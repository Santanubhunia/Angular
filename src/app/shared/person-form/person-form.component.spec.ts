import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFormComponent } from './person-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PersonService } from '../state/person.service';
import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Person } from '../models/person.model';

describe('PersonFormComponent', () => {
  let component: PersonFormComponent;
  let fixture: ComponentFixture<PersonFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        NoopAnimationsModule,
        MatCardModule,
        FlexLayoutModule
      ],
      declarations: [
        PersonFormComponent,
        ErrorsStubComponent,
        PersonLookupStubComponent
      ],
      providers: [{ provide: PersonService, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFormComponent);
    component = fixture.componentInstance;
    component.isChild = true;
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

@Component({ selector: 'app-person-lookup', template: '' })
class PersonLookupStubComponent {
  @Input() isChild = false;
  @Output() personSelected = new EventEmitter<Person>();
}
