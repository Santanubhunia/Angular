import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentFormComponent } from './incident-form.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { IncidentService } from '../state/incident.service';
import {
  MockIncidentService,
  MockNotificationService,
  MockBreadcrumbService
} from 'src/testing/mock.services';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { BreadcrumbService } from 'src/app/breadcrumbs/breadcrumb.service';

describe('IncidentFormComponent', () => {
  let component: IncidentFormComponent;
  let fixture: ComponentFixture<IncidentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IncidentFormComponent,
        MatIconStubComponent,
        StartIntakeStubComponent
      ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        RouterTestingModule,
        MatCardModule
      ],
      providers: [
        { provide: IncidentService, useValue: MockIncidentService },
        { provide: NotificationService, useValue: MockNotificationService },
        { provide: BreadcrumbService, useValue: MockBreadcrumbService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentFormComponent);
    component = fixture.componentInstance;
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

@Component({ selector: 'app-start-intake', template: '' })
class StartIntakeStubComponent {
  @Input() startIntakeGroup: FormGroup;
  @Input() maxDate: Date = new Date();
  @Output() cancel = new EventEmitter();
}
