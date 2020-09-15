import { InjectionToken } from '@angular/core';

export const defaultErrors = {
  matDatepickerParse: () => 'Must be a valid date in the format MM/DD/YYYY',
  matDatepickerMax: () => `Date cannot be after today`,
  matDatepickerMin: ({ min }) => {
    const date = new Date(min);
    return `Date cannot be before ${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
  },
  required: () => 'This field is required',
  min: ({ min }) => `Expected a minimum of ${min}`,
  max: ({ max }) => `Expected a maximum of ${max}`,
  minlength: ({ requiredLength, actualLength }) =>
    `Expected ${requiredLength} but got ${actualLength}`,
  maxlength: ({ requiredLength, actualLength }) =>
    `Expected ${requiredLength} but got ${actualLength}`,
  invalidDate: () => `Date is not valid`
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
