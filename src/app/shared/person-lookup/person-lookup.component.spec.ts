import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonLookupComponent } from './person-lookup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '../state/person.service';

describe('PersonLookupDialogComponent', () => {
  let component: PersonLookupComponent;
  let fixture: ComponentFixture<PersonLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonLookupComponent],
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDialogModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: PersonService, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { isChild: true } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
