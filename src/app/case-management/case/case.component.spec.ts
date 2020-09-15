import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseComponent } from './case.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, Input } from '@angular/core';
import { MockLookupPipe } from 'src/testing/lookup.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseService } from '../state/case.service';
import {
  MockCaseService,
  MockBreadcrumbService
} from 'src/testing/mock.services';
import { BreadcrumbService } from 'src/app/breadcrumbs/breadcrumb.service';

describe('CaseComponent', () => {
  let component: CaseComponent;
  let fixture: ComponentFixture<CaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CaseComponent,
        CaseInformationStubComponent,
        MdtStubComponent,
        CaseReviewStubComponent,
        CaseTransferStubComponent,
        CaseTimelineStubComponent,
        CaseIncidentsStubComponent,
        AppointmentsStubComponent,
        ReferralsStubComponent,
        MockLookupPipe
      ],
      imports: [
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        NoopAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: CaseService, useValue: MockCaseService },
        { provide: BreadcrumbService, useValue: MockBreadcrumbService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ selector: 'app-case-information', template: '' })
class CaseInformationStubComponent {
  @Input() case: any;
}

@Component({ selector: 'app-mdt', template: '' })
class MdtStubComponent {}

@Component({ selector: 'app-case-review', template: '' })
class CaseReviewStubComponent {}

@Component({ selector: 'app-case-transfer', template: '' })
class CaseTransferStubComponent {}

@Component({ selector: 'app-case-timeline', template: '' })
class CaseTimelineStubComponent {}

@Component({ selector: 'app-case-incidents', template: '' })
class CaseIncidentsStubComponent {}

@Component({ selector: 'app-appointments', template: '' })
class AppointmentsStubComponent {}

@Component({ selector: 'app-referrals', template: '' })
class ReferralsStubComponent {}
