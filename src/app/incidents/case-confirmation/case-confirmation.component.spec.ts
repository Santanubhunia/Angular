import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseConfirmationComponent } from './case-confirmation.component';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { createModel } from 'src/app/shared/utilities/model-helpers';
import { Case } from 'src/app/case-management/state/case.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('CaseConfirmationComponent', () => {
  let component: CaseConfirmationComponent;
  let fixture: ComponentFixture<CaseConfirmationComponent>;

  const data = {
    case: createModel<Case>({}),
    childName: 'Test Child'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseConfirmationComponent],
      imports: [MatDialogModule, RouterTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
