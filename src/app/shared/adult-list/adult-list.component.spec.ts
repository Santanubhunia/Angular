import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultListComponent } from './adult-list.component';
import { PersonService } from '../state/person.service';
import { MockPersonService } from 'src/testing/mock.services';

describe('AdultListComponent', () => {
  let component: AdultListComponent;
  let fixture: ComponentFixture<AdultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdultListComponent],
      providers: [{ provide: PersonService, useValue: MockPersonService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
