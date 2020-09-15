import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  Route,
  UrlSegment,
  CanActivateChild
} from '@angular/router';
import { SessionQuery } from './state/session.query';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { userHasRoles } from './state/session.utils';
import { SessionService } from './state/session.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private sessionQuery: SessionQuery,
    private sessionService: SessionService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const rolesToCheck: string[] = next.data.roles;
    const disableAdmin: boolean = next.data.disableAdmin;
    const inclusive = next.data.inclusive || false;

    return this.sessionQuery.roles$.pipe(
      map(roles => {
        if (
          !rolesToCheck ||
          userHasRoles(rolesToCheck, roles, inclusive, disableAdmin)
        ) {
          return true;
        }

        if (!this.sessionService.redirectUrl) {
          this.sessionService.redirectUrl = state.url;
        }
        return this.router.createUrlTree(['/']);
      })
    );
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    const rolesToCheck: string[] = route.data.roles;
    const disableAdmin: boolean = route.data.disableAdmin;
    const inclusive = route.data.inclusive || false;

    return this.sessionQuery.roles$.pipe(
      map(roles => {
        if (
          !rolesToCheck ||
          userHasRoles(rolesToCheck, roles, inclusive, disableAdmin)
        ) {
          return true;
        }

        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
