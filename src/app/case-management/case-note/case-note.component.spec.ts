import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CaseNoteComponent } from './case-note.component';

describe('CaseNoteComponent', () => {
  let component: CaseNoteComponent;
  let fixture: ComponentFixture<CaseNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseNoteComponent, CaseNotesEditorStubComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { caseId: 1, caseNotes: [] } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseNoteComponent);
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
