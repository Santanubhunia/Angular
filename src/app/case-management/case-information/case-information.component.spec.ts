import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseInformationComponent } from './case-information.component';
import { Component, Input } from '@angular/core';
import { createCase } from '../state/case.model';

describe('CaseInformationComponent', () => {
  let component: CaseInformationComponent;
  let fixture: ComponentFixture<CaseInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CaseInformationComponent,
        CaseNotesStubComponent,
        CaseAttachmentsStubComponent,
        CaseDetailsStubComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseInformationComponent);
    component = fixture.componentInstance;
    component.case = createCase({ id: 1, notes: [] });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ selector: 'app-case-notes', template: '' })
class CaseNotesStubComponent {
  @Input() caseId: any;
  @Input() caseNotes: any;
}

@Component({ selector: 'app-case-attachments', template: '' })
class CaseAttachmentsStubComponent {}

@Component({ selector: 'app-case-details', template: '' })
class CaseDetailsStubComponent {
  @Input() case: any;
}
