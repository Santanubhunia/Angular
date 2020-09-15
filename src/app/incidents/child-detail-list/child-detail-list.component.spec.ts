import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDetailListComponent } from './child-detail-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import {
  MockChildService,
  MockNotificationService
} from 'src/testing/mock.services';
import { RouterTestingModule } from '@angular/router/testing';
import { ChildDetailService } from 'src/app/incidents/state/child-detail.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotificationService } from 'src/app/shared/notification/notification.service';

describe('ChildDetailListComponent', () => {
  let component: ChildDetailListComponent;
  let fixture: ComponentFixture<ChildDetailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChildDetailListComponent],
      imports: [MatDialogModule, RouterTestingModule, FontAwesomeModule],
      providers: [
        { provide: ChildDetailService, useValue: MockChildService },
        { provide: NotificationService, useValue: MockNotificationService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
