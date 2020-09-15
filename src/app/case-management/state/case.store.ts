import { Injectable } from '@angular/core';
import { EntityState, StoreConfig, ActiveState, ID } from '@datorama/akita';
import { Case } from './case.model';
import { SortDirection } from '@angular/material/sort';
import {
  Pager,
  PagerEntityStore
} from 'src/app/shared/utilities/pager-entity.store';

export interface CaseState extends EntityState<Case>, ActiveState, Pager {
  active: ID | null;
}

const initalState: CaseState = {
  active: null,
  ui: {
    sort: {
      active: 'createdDate',
      direction: 'desc' as SortDirection
    },
    paging: {
      pageIndex: 0,
      pageSize: 10
    }
  },
  loading: false
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'case', cache: { ttl: 300000 } })
export class CaseStore extends PagerEntityStore<CaseState> {
  constructor() {
    super(initalState);
  }
}
