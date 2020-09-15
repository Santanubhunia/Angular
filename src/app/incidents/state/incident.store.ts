import { Injectable } from '@angular/core';
import { Incident } from './incident.model';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  ActiveState,
  ID
} from '@datorama/akita';
import { SortDirection, Sort } from '@angular/material/sort';
import { Paging } from 'src/app/shared/models/paging.model';
import {
  Pager,
  PagerEntityStore
} from 'src/app/shared/utilities/pager-entity.store';

export interface IncidentState
  extends EntityState<Incident>,
    ActiveState,
    Pager {
  active: ID | null;
  ui: {
    sort: Sort;
    paging: Paging;
    activeStep: number;
  };
  isCreatingNew: boolean;
}

const initalState = {
  active: null,
  ui: {
    sort: {
      active: 'incidentDate',
      direction: 'desc' as SortDirection
    },
    paging: {
      pageIndex: 0,
      pageSize: 10
    },
    activeStep: 0
  },
  loading: false,
  isCreatingNew: false
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'incident', cache: { ttl: 300000 } })
export class IncidentStore extends PagerEntityStore<IncidentState> {
  constructor() {
    super(initalState);
  }

  nextStep() {
    this.update(state => ({
      ...state,
      ui: {
        ...state.ui,
        activeStep: state.ui.activeStep + 1
      }
    }));
  }

  previousStep() {
    this.update(state => ({
      ...state,
      ui: {
        ...state.ui,
        activeStep: state.ui.activeStep - 1
      }
    }));
  }

  setActiveStep(activeStep: number) {
    this.update(state => ({
      ...state,
      ui: {
        ...state.ui,
        activeStep
      }
    }));
  }
}
