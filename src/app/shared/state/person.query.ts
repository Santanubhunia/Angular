import { Query } from '@datorama/akita';
import { PersonState, PersonStore } from './person.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PersonQuery extends Query<PersonState> {
  activeChild$ = this.select(state => state.activeChild);
  activeAdult$ = this.select(state => state.activeAdult);
  child$ = this.select(state => state.child);
  adults$ = this.select(state => state.adults);

  constructor(protected store: PersonStore) {
    super(store);
  }
}
