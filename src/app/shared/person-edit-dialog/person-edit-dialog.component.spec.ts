import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonEditDialogComponent } from './person-edit-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createModel } from '../utilities/model-helpers';
import { Person } from '../models/person.model';
import { Component, Input } from '@angular/core';

describe('PersonEditDialogComponent', () => {
  let component: PersonEditDialogComponent;
  let fixture: ComponentFixture<PersonEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonEditDialogComponent, PersonFormStubComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { person: createModel<Person>({}), isChild: true }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ selector: 'app-person-form', template: '' })
class PersonFormStubComponent {
  @Input() person: any;
  @Input() isChild: any;
  @Input() isDialog: any;
}
