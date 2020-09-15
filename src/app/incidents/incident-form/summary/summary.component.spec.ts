import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryComponent } from './summary.component';
import { IncidentService } from '../../state/incident.service';
import { MockIncidentService } from 'src/testing/mock.services';
import { MockLookupPipe } from 'src/testing/lookup.pipe';
import { Component, Input } from '@angular/core';
import { createModel } from 'src/app/shared/utilities/model-helpers';
import { Incident } from '../../state/incident.model';
import { Referral } from 'src/app/shared/models/referral.model';

describe('SummaryComponent', () => {
  let component: SummaryComponent;
  let fixture: ComponentFixture<SummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryComponent, MockLookupPipe, MatIconStubComponent],
      providers: [{ provide: IncidentService, useValue: MockIncidentService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryComponent);
    component = fixture.componentInstance;

    component.incidentForm = createModel<Incident>({
      childIncidentDetails: [],
      referralSource: createModel<Referral>({})
    });

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
