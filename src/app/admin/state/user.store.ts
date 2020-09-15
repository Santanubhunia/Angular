import { Injectable } from '@angular/core';
import { User } from './user.model';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState,
  ID
} from '@datorama/akita';
import { LookupType } from 'src/app/shared/models/lookup.model';

export interface Configuration {
  roles: string[];
  locations: string[];
}

export interface UserState extends EntityState<User>, ActiveState {
  active: ID | null;
  configuration: Configuration;
  users: LookupType[];
}

const initialState = {
  active: null,
  configuration: {
    roles: null,
    locations: null
  },
  users: [],
  loading: false
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user', cache: { ttl: 3600000 } })
export class UserStore extends EntityStore<UserState> {
  constructor() {
    super(initialState);
  }
}
