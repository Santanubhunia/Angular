import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authConfig: AuthConfig = {
  issuer: environment.issuer,
  clientId: 'spa',
  redirectUri: `${window.location.origin}/auth/callback`,
  postLogoutRedirectUri: window.location.origin,
  responseType: 'code',
  scope: 'openid profile api offline_access',
  silentRefreshRedirectUri: `${window.location.origin}/silent-refresh.html`,
  sessionChecksEnabled: true,
  sessionCheckIntervall: 1000 * 60 * 5
};
