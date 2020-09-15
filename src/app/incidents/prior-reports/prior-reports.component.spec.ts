import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorReportsComponent } from './prior-reports.component';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { createModel } from 'src/app/shared/utilities/model-helpers';
import { Child } from 'src/app/shared/models/child.model';
import { IncidentService } from '../state/incident.service';
import { MockIncidentService } from 'src/testing/mock.services';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('PriorReportsComponent', () => {
  let component: PriorReportsComponent;
  let fixture: ComponentFixture<PriorReportsComponent>;

  const mockIncidentService = MockIncidentService;
  mockIncidentService.getChildIncidents.and.returnValue(of());

  const data = {
    child: createModel<Child>({
      childDetails: []
    })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PriorReportsComponent, AppLoaderStubComponent],
      imports: [MatDialogModule, RouterTestingModule],
      providers: [
        { provide: IncidentService, useValue: mockIncidentService },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ selector: 'app-loader', template: '' })
class AppLoaderStubComponent {}
