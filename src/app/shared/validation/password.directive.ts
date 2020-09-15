import { FormControl } from '@angular/forms';

export function passwordValidator(control: FormControl) {
  if (control.value !== null) {
    const minLength = control.value.length >= 6;
    const hasNumber = /\d/.test(control.value);
    const hasUpper = /[A-Z]/.test(control.value);
    const hasLower = /[a-z]/.test(control.value);

    return minLength && hasNumber && hasUpper && hasLower
      ? null
      : { strong: true };
  }

  return null;
}
