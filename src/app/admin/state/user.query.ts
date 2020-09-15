import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UserStore, UserState } from './user.store';
import { RouterQuery } from '@datorama/akita-ng-router-store';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserQuery extends QueryEntity<UserState> {
  allUsers$ = this.select(state => state.users);
  roles$ = this.select(state => state.roles);
  locations$ = this.select(state => state.locations);
  selectUser$ = this.routerQuery
    .selectParams('id')
    .pipe(switchMap(id => this.selectEntity(id)));

  constructor(protected store: UserStore, private routerQuery: RouterQuery) {
    super(store);
  }

  getRoles() {
    return this.store.getValue().roles;
  }
}
