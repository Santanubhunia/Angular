import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseAttachmentsComponent } from './case-attachments.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

describe('CaseAttachmentsComponent', () => {
  let component: CaseAttachmentsComponent;
  let fixture: ComponentFixture<CaseAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseAttachmentsComponent],
      imports: [MatCardModule, MatButtonModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
