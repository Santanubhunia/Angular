import { TestBed } from '@angular/core/testing';

import { OptionsInterceptor } from './options.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('OptionsInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [OptionsInterceptor]
    })
  );

  it('should be created', () => {
    const interceptor: OptionsInterceptor = TestBed.inject(OptionsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
