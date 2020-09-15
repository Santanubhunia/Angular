import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { UserService } from './state/user.service';
import { Configuration } from './state/user.store';

@Injectable({ providedIn: 'root' })
export class ConfigurationResolver implements Resolve<Configuration> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.getConfiguration();
  }
}
