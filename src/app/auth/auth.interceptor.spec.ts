import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import { SessionService } from './state/session.service';

describe('AuthInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: SessionService, useValue: { getToken: () => null } }
      ]
    })
  );

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
