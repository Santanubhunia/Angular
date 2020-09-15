import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseListComponent } from './case-list.component';
import { CaseStore } from '../state/case.store';
import { MockLookupPipe } from 'src/testing/lookup.pipe';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CaseService } from '../state/case.service';
import { Component, Input } from '@angular/core';
import {
  MockCaseService,
  MockBreadcrumbService
} from 'src/testing/mock.services';
import { of } from 'rxjs';
import { Case } from '../state/case.model';
import { createModel } from 'src/app/shared/utilities/model-helpers';
import { RouterTestingModule } from '@angular/router/testing';
import { BreadcrumbService } from 'src/app/breadcrumbs/breadcrumb.service';

describe('CaseListComponent', () => {
  let component: CaseListComponent;
  let fixture: ComponentFixture<CaseListComponent>;
  let caseStore: CaseStore;

  const mockCaseService = MockCaseService;
  mockCaseService.getCases.and.returnValue(of());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseListComponent, MatIconStubComponent, MockLookupPipe],
      imports: [
        MatTableModule,
        MatSortModule,
        HttpClientTestingModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatPaginatorModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: CaseService,
          useValue: mockCaseService
        },
        { provide: BreadcrumbService, useValue: MockBreadcrumbService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseListComponent);
    component = fixture.componentInstance;
    caseStore = TestBed.inject(CaseStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 0 cases', () => {
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('mat-row');
    expect(rows.length).toBe(0);
  });

  it('should have 2 cases', () => {
    caseStore.set([createModel<Case>({ id: 1 }), createModel<Case>({ id: 2 })]);

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
