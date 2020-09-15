import { EntityStore } from '@datorama/akita';
import { Sort } from '@angular/material/sort';
import { Paging } from '../models/paging.model';

export interface Pager {
  ui: {
    sort: Sort;
    paging: Paging;
  };
}

export class PagerEntityStore<T extends Pager> extends EntityStore<T> {
  constructor(initialState?: Partial<T>) {
    super(initialState);
  }

  updatePaging(paging: Paging) {
    this.update(state => ({
      ...state,
      ui: {
        ...state.ui,
        paging
      }
    }));
  }

  updateSort(sort: Sort) {
    this.update(state => ({
      ...state,
      ui: {
        ...state.ui,
        sort
      }
    }));
  }
}
