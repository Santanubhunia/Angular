import { FormControl } from '@angular/forms';
import { coerceArray } from '@datorama/akita';

export function requiredFileTypesValidator(types: string | string[]) {
  return (control: FormControl) => {
    const files: File[] = control.value;

    if (files) {
      for (const file of files) {
        const paths = file.name.split('.');
        const extension = paths[paths.length - 1].toLowerCase();

        if (
          !coerceArray(types)
            .map(type => type.toLowerCase())
            .includes(extension)
        ) {
          return { requiredFileType: true };
        }
      }
    }

    return null;
  };
}
