import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseCreationComponent } from './case-creation.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MockLookupPipe } from 'src/testing/lookup.pipe';

describe('CaseCreationComponent', () => {
  let component: CaseCreationComponent;
  let fixture: ComponentFixture<CaseCreationComponent>;

  const data = {
    childName: 'Test Child',
    dateOfBirth: new Date(),
    sponsorName: 'Test Sponsor',
    childTypeId: 1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseCreationComponent, MockLookupPipe],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
