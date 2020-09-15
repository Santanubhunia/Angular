import { PipeTransform, Pipe } from '@angular/core';
import { of } from 'rxjs';

@Pipe({ name: 'lookup' })
export class MockLookupPipe implements PipeTransform {
  transform(value: any) {
    return of((value || '').toString());
  }
}
