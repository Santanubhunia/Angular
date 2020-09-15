import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonViewDialogComponent } from './person-view-dialog.component';
import { PersonService } from '../state/person.service';
import { MockPersonService } from 'src/testing/mock.services';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MockLookupPipe } from 'src/testing/lookup.pipe';
import { of } from 'rxjs';

describe('PersonViewDialogComponent', () => {
  let component: PersonViewDialogComponent;
  let fixture: ComponentFixture<PersonViewDialogComponent>;

  const mockPersonService = MockPersonService;
  mockPersonService.getPerson.and.returnValue(of());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, ReactiveFormsModule],
      declarations: [PersonViewDialogComponent],
      providers: [
        { provide: PersonService, useValue: mockPersonService },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { personId: 0, isChild: true } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
