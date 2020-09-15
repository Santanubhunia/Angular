import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentViewComponent } from './incident-view.component';
import { IncidentService } from '../state/incident.service';
import {
  MockIncidentService,
  MockBreadcrumbService
} from 'src/testing/mock.services';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BreadcrumbService } from 'src/app/breadcrumbs/breadcrumb.service';

describe('IncidentViewComponent', () => {
  let component: IncidentViewComponent;
  let fixture: ComponentFixture<IncidentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        NoopAnimationsModule,
        RouterTestingModule,
        MatCardModule,
        MatDialogModule,
        FontAwesomeModule
      ],
      declarations: [IncidentViewComponent],
      providers: [
        { provide: IncidentService, useValue: MockIncidentService },
        { provide: BreadcrumbService, useValue: MockBreadcrumbService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
