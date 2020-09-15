import { Injectable } from '@angular/core';
import { SessionStore } from './session.store';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../auth.config';
import { Router } from '@angular/router';
import { resetStores, coerceArray } from '@datorama/akita';
import { ConfigurationService } from 'src/app/shared/state/configuration.service';
import { BehaviorSubject, of } from 'rxjs';
import { ROLE, USERNAME } from 'src/app/shared/utilities/constants';
import { UserService } from 'src/app/admin/state/user.service';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(
    this.oauthService.hasValidAccessToken()
  );
  private errorSubject = new BehaviorSubject<string>(null);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  get redirectUrl() {
    return localStorage.getItem('redirectUrl');
  }

  set redirectUrl(value: string) {
    if (value) {
      localStorage.setItem('redirectUrl', value);
    } else {
      localStorage.removeItem('redirectUrl');
    }
  }

  constructor(
    private sessionStore: SessionStore,
    private configurationService: ConfigurationService,
    private userService: UserService,
    private oauthService: OAuthService,
    private router: Router
  ) {}

  async initAuth() {
    this.oauthService.configure(authConfig);
    this.sessionStore.setLoading(true);

    await this.oauthService.loadDiscoveryDocument().finally(() => {
      this.sessionStore.setLoading(false);
    });

    this.oauthService.setupAutomaticSilentRefresh();

    if (this.oauthService.hasValidAccessToken()) {
      this.loadUserProfile(true);
    } else {
      this.clearData();
    }
  }

  initLogin() {
    this.oauthService.initLoginFlow();
  }

  async login() {
    let success = false;
    this.sessionStore.setLoading(true);

    try {
      await this.oauthService.loadDiscoveryDocumentAndTryLogin();

      if (this.oauthService.hasValidAccessToken()) {
        if (!this.redirectUrl) {
          this.redirectUrl = '/home';
        }
        await this.loadUserProfile();
        success = true;
      }
    } catch {
      this.clearData();
    } finally {
      this.sessionStore.setLoading(false);
    }

    return success;
  }

  async loadUserProfile(redirect = false) {
    try {
      const userInfo = await this.oauthService.loadUserProfile();

      this.sessionStore.update({ roles: this.userRoles });
      await this.configurationService.getConfiguration().toPromise();
      this.userService.getAllUsers().subscribe();
      this.sessionStore.update({ userInfo });

      if (redirect && this.redirectUrl) {
        this.router.navigateByUrl(this.redirectUrl);
        this.redirectUrl = null;
      }
    } catch {
      this.clearData();
    }
  }

  consented() {
    let redirected: Promise<boolean> = of(true).toPromise();

    this.isLoggedInSubject.next(true);

    if (this.redirectUrl) {
      redirected = this.router.navigateByUrl(this.redirectUrl);
      this.redirectUrl = null;
    }

    return redirected;
  }

  logout() {
    this.router.navigate(['/auth', 'redirecting'], {
      state: { redirecting: true }
    });
    this.clearData();
    this.oauthService.revokeTokenAndLogout();
  }

  getToken() {
    return this.oauthService.getAccessToken();
  }

  private clearData() {
    this.isLoggedInSubject.next(false);
    resetStores({
      exclude: ['configuration']
    });
  }

  private get userRoles(): string[] {
    const claims = this.oauthService.getIdentityClaims();

    return coerceArray(claims?.[ROLE] || '').map(r => r.toLowerCase());
  }
}
