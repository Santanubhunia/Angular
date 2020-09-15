import { TestBed } from '@angular/core/testing';

import { UnauthorizedInterceptor } from './unauthorized.interceptor';
import { SessionService } from './state/session.service';

describe('UnauthorizedInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        UnauthorizedInterceptor,
        { provide: SessionService, useValue: { logout: () => null } }
      ]
    })
  );

  it('should be created', () => {
    const interceptor: UnauthorizedInterceptor = TestBed.inject(
      UnauthorizedInterceptor
    );
    expect(interceptor).toBeTruthy();
  });
});
