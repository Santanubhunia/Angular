import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { Directive, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IncidentService } from '../incidents/state/incident.service';
import { BreadcrumbService } from '../breadcrumbs/breadcrumb.service';
import {
  MockBreadcrumbService,
  MockIncidentService
} from 'src/testing/mock.services';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [HomeComponent, RoleMockDirective],
      providers: [
        { provide: IncidentService, useValue: MockIncidentService },
        { provide: BreadcrumbService, useValue: MockBreadcrumbService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Directive({
  selector: '[appRole]'
})
class RoleMockDirective {
  @Input('appRole') roles: any;
}
