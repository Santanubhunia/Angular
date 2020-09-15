import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileInputComponent } from './file-input.component';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { requiredFileTypesValidator } from '../validation/required-file-types.directive';
import { By } from '@angular/platform-browser';

describe('FileInputComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let fileUpload: FileInputComponent;
  const fakePdf = new File([''], 'test.pdf', { type: 'application/pdf' });
  const fakeDoc = new File([''], 'test.doc', { type: 'text/html' });
  const fakeTxt = new File([''], 'test.txt', { type: 'text/html' });
  const fakeMp3 = new File([''], 'test.mp3', { type: 'audio' });

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [FileInputComponent, TestComponent],
      imports: [ReactiveFormsModule]
    }).createComponent(TestComponent);

    component = fixture.componentInstance;
    fileUpload = fixture.debugElement.query(By.css('app-file-input'))
      .nativeElement as FileInputComponent;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid', () => {
    component.file.setValue([fakeDoc]);

    expect(component.file.value[0].name).toBe('test.doc');
    expect(component.file.invalid).toBeTrue();

    component.file.setValue([fakeMp3]);

    expect(component.file.value[0].name).toBe('test.mp3');
    expect(component.file.invalid).toBeTrue();
  });

  it('should be valid', () => {
    component.file.setValue([fakeTxt]);

    expect(component.file.value[0].name).toBe('test.txt');
    expect(component.file.valid).toBeTrue();

    component.file.setValue([fakePdf]);

    expect(component.file.value[0].name).toBe('test.pdf');
    expect(component.file.valid).toBeTrue();
  });
});

@Component({
  template: ` <app-file-input [formControl]="file"></app-file-input> `
})
class TestComponent {
  file = new FormControl(null, requiredFileTypesValidator(['pdf', 'txt']));
}
