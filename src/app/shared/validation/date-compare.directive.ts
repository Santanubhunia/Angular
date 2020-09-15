import { FormControl } from '@angular/forms';

export function compareDatesValidator(before: boolean, dateToCompare: Date) {
  return (formControl: FormControl) => {
    const date = new Date(formControl.value);

    if (date && before) {
      return date <= dateToCompare ? null : { invalidDate: true };
    }

    return date >= dateToCompare ? null : { invalidDate: true };
  };
}
