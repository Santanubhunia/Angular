import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CaseStore, CaseState } from './case.store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CaseQuery extends QueryEntity<CaseState> {
  sort$ = this.select(state => state.ui.sort);
  paging$ = this.select(state => state.ui.paging);
  activeCaseNotes$ = this.selectActive().pipe(map(caseFile => caseFile?.notes));

  constructor(protected store: CaseStore) {
    super(store);
  }
}
