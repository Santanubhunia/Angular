import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseNotesComponent } from './case-notes.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Component, Input } from '@angular/core';

describe('CaseNotesComponent', () => {
  let component: CaseNotesComponent;
  let fixture: ComponentFixture<CaseNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseNotesComponent, MatIconStubComponent],
      imports: [MatCardModule, MatButtonModule, MatDialogModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// tslint:disable-next-line: component-selector
@Component({ selector: 'mat-icon', template: '' })
class MatIconStubComponent {
  @Input() svgIcon: string;
}
