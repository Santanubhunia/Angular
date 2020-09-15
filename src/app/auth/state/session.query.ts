import { Query } from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';
import { Injectable } from '@angular/core';
import { USERNAME } from 'src/app/shared/utilities/constants';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  userInfo$ = this.select(state => state.userInfo);
  roles$ = this.select(state => state.roles);

  constructor(protected store: SessionStore) {
    super(store);
  }

  getUserId(): string {
    const userInfo = this.getValue()?.userInfo;

    return userInfo?.[USERNAME];
  }
}
