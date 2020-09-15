import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsBasicComponent } from './details-basic.component';
import { IncidentService } from '../../state/incident.service';
import {
  ReactiveFormsModule,
  ValidationErrors,
  FormGroup,
  FormControl
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Component, Input } from '@angular/core';
import { FileInputComponent } from 'src/app/shared/file-input/file-input.component';
import {
  MockIncidentService,
  MockArtifactService
} from 'src/testing/mock.services';
import { ArtifactService } from '../../state/artifact.service';

describe('DetailsBasicComponent', () => {
  let component: DetailsBasicComponent;
  let fixture: ComponentFixture<DetailsBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailsBasicComponent,
        ErrorsStubComponent,
        FileInputComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
        MatSlideToggleModule
      ],
      providers: [
        { provide: IncidentService, useValue: MockIncidentService },
        { provide: ArtifactService, useValue: MockArtifactService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsBasicComponent);
    component = fixture.componentInstance;

    component.detailsGroup = new FormGroup({
      occurredOnAnInstallation: new FormControl(false),
      allegations: new FormControl(''),
      fileBinary: new FormControl(null)
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ selector: 'app-errors', template: '' })
class ErrorsStubComponent {
  @Input() errors: ValidationErrors;
  @Input() customErrors = {};
}
