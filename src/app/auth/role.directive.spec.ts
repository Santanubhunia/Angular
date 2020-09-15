import { RoleDirective } from './role.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionService } from './state/session.service';
import { of } from 'rxjs';

describe('RoleDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, RoleDirective],
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).createComponent(TestComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `<div *appRole="{ roles: 'fap admin' }"><h1>Test</h1></div>`
})
class TestComponent {}
