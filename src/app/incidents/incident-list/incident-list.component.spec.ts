import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IncidentListComponent } from './incident-list.component';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { MockLookupPipe } from 'src/testing/lookup.pipe';
import {
  MockIncidentService,
  MockBreadcrumbService
} from 'src/testing/mock.services';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { createModel } from 'src/app/shared/utilities/model-helpers';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IncidentStore } from '../state/incident.store';
import { IncidentQuery } from '../state/incident.query';
import { IncidentService } from '../state/incident.service';
import { Incident } from '../state/incident.model';
import { Component, Input } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BreadcrumbService } from 'src/app/breadcrumbs/breadcrumb.service';

describe('IncidentListComponent', () => {
  let component: IncidentListComponent;
  let incidentStore: IncidentStore;
  let fixture: ComponentFixture<IncidentListComponent>;

  const mockIncidentService = MockIncidentService;
  mockIncidentService.getIncidents.and.returnValue(of());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IncidentListComponent,
        MatIconStubComponent,
        MockLookupPipe
      ],
      imports: [
        MatTableModule,
        MatSortModule,
        HttpClientTestingModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatPaginatorModule,
        NoopAnimationsModule
      ],
      providers: [
        IncidentQuery,
        {
          provide: IncidentService,
          useValue: mockIncidentService
        },
        { provide: BreadcrumbService, useValue: MockBreadcrumbService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentListComponent);
    component = fixture.componentInstance;
    incidentStore = TestBed.inject(IncidentStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 0 incidents', () => {
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('mat-row');
    expect(rows.length).toBe(0);
  });

  it('should have 2 incidents', () => {
    incidentStore.set([
      createModel<Incident>({ id: 1 }),
      createModel<Incident>({ id: 2 })
    ]);

    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('mat-row');
    expect(rows.length).toBe(2);
  });
});

// tslint:disable-next-line: component-selector
@Component({ selector: 'mat-icon', template: '' })
class MatIconStubComponent {
  @Input() svgIcon: string;
}
