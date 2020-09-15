import { Pipe, PipeTransform } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Pipe({
  name: 'role'
})
export class RolePipe extends TitleCasePipe implements PipeTransform {
  constructor() {
    super();
  }

  transform(value: string): string {
    value = super.transform(value);
    return value.replace('Fap', 'FAP').replace('Non-clinical', 'Non-Clinical');
  }
}
