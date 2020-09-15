import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseNotesEditorComponent } from './case-notes-editor.component';
import { ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';
import { CaseNoteService } from '../state/case-note.service';
import { MockCaseNoteService } from 'src/testing/mock.services';

describe('CaseNotesEditorComponent', () => {
  let component: CaseNotesEditorComponent;
  let fixture: ComponentFixture<CaseNotesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        NoopAnimationsModule
      ],
      declarations: [CaseNotesEditorComponent, ErrorsStubComponent],
      providers: [{ provide: CaseNoteService, useValue: MockCaseNoteService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseNotesEditorComponent);
    component = fixture.componentInstance;
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
