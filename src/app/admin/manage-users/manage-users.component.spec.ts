import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersComponent } from './manage-users.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../state/user.service';
import { of } from 'rxjs';
import { Component } from '@angular/core';

describe('ManageUsersComponent', () => {
  let component: ManageUsersComponent;
  let fixture: ComponentFixture<ManageUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageUsersComponent, LoaderMockComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: UserService, useValue: { getUsers: () => of() } }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ selector: 'app-loader', template: '' })
class LoaderMockComponent {}
