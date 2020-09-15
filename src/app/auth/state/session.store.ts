import { StoreConfig, Store } from '@datorama/akita';
import { UserInfo } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';

export interface SessionState {
  userInfo: UserInfo;
  roles: string[];
}

export function createInitialState(): SessionState {
  return {
    userInfo: null,
    roles: null
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
