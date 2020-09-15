import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseNotesListComponent } from './case-notes-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CaseNotesListComponent', () => {
  let component: CaseNotesListComponent;
  let fixture: ComponentFixture<CaseNotesListComponent>;

  const data = { caseNotes: [] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      declarations: [
        CaseNotesListComponent,
        MatIconStubComponent,
        CaseNotesEditorStubComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseNotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ selector: 'app-case-notes-editor', template: '' })
class CaseNotesEditorStubComponent {
  @Input() caseId: any;
  @Input() note: any;
  @Input() closeOnAdd: boolean;
  @Input() defaultSelectedValue: any;
  @Output() closeForm = new EventEmitter();
}

// tslint:disable-next-line: component-selector
@Component({ selector: 'mat-icon', template: '' })
class MatIconStubComponent {
  @Input() svgIcon: string;
}
