import { Component, Input, Inject } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { FORM_ERRORS } from './errors';

const matDatepickerParse = 'matDatepickerParse';

@Component({
  selector: 'app-errors',
  template: `{{ error }}`
})
export class ErrorsComponent {
  @Input() errors: ValidationErrors;
  @Input() customErrors = {};

  constructor(
    @Inject(FORM_ERRORS)
    private formErrors: [{ [key: string]: (error: Error) => string }]
  ) {}

  get error() {
    if (this.errors) {
      const firstKey = this.errors[matDatepickerParse]
        ? matDatepickerParse
        : Object.keys(this.errors)[0];
      const getError = this.formErrors[firstKey];
      return this.customErrors[firstKey] || getError(this.errors[firstKey]);
    }

    return '';
  }
}
