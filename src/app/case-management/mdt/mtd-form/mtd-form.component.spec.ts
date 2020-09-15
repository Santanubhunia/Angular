import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtdFormComponent } from './mtd-form.component';

describe('MtdFormComponent', () => {
  let component: MtdFormComponent;
  let fixture: ComponentFixture<MtdFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtdFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
