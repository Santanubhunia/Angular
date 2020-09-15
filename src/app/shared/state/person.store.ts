import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { Child } from '../models/child.model';
import { Adult } from '../models/adult.model';

export interface PersonState {
  activeChild: Child;
  activeAdult: Adult;
  child: Child;
  adults: Adult[];
  loading: boolean;
}

export function createInitialState(): PersonState {
  return {
    activeChild: null,
    activeAdult: null,
    child: null,
    adults: [],
    loading: false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'person' })
export class PersonStore extends Store<PersonState> {
  constructor() {
    super(createInitialState());
  }
}
