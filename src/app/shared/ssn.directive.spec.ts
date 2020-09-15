import { SsnDirective } from './ssn.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SsnDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, SsnDirective],
      imports: [ReactiveFormsModule]
    }).createComponent(TestComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have 3 characters', () => {
    component.ssn.setValue('123');

    expect(component.ssn.value).toBe('123');
    expect(component.ssn.value.length).toBe(3);
  });

  it('should have 5 characters', () => {
    component.ssn.setValue('1234');

    const input = fixture.debugElement.query(By.directive(SsnDirective))
      .nativeElement as HTMLInputElement;
    input.dispatchEvent(new Event('input'));

    expect(component.ssn.value).toBe('123-4');
    expect(component.ssn.value.length).toBe(5);
  });

  it('should have 6 characters', () => {
    component.ssn.setValue('12345');

    const input = fixture.debugElement.query(By.directive(SsnDirective))
      .nativeElement as HTMLInputElement;
    input.dispatchEvent(new Event('input'));

    expect(component.ssn.value).toBe('123-45');
    expect(component.ssn.value.length).toBe(6);
  });

  it('should have 8 characters', () => {
    component.ssn.setValue('123456');

    const input = fixture.debugElement.query(By.directive(SsnDirective))
      .nativeElement as HTMLInputElement;
    input.dispatchEvent(new Event('input'));

    expect(component.ssn.value).toBe('123-45-6');
    expect(component.ssn.value.length).toBe(8);
  });

  it('should have 11 characters', () => {
    component.ssn.setValue('123456789');

    const input = fixture.debugElement.query(By.directive(SsnDirective))
      .nativeElement as HTMLInputElement;
    input.dispatchEvent(new Event('input'));

    expect(component.ssn.value).toBe('123-45-6789');
    expect(component.ssn.value.length).toBe(11);
  });
});

@Component({
  template: `
    <input [formControl]="ssn" appSsn />
  `
})
class TestComponent {
  ssn = new FormControl('');
}
