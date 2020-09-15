import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseIncidentsComponent } from './case-incidents.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

describe('CaseIncidentsComponent', () => {
  let component: CaseIncidentsComponent;
  let fixture: ComponentFixture<CaseIncidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseIncidentsComponent],
      imports: [MatCardModule, MatButtonModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
