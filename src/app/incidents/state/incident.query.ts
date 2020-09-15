import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { IncidentStore, IncidentState } from './incident.store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IncidentQuery extends QueryEntity<IncidentState> {
  sort$ = this.select(state => state.ui.sort);
  paging$ = this.select(state => state.ui.paging);
  isCreatingNew$ = this.select(state => state.isCreatingNew);
  activeStep$ = this.select(state => state.ui.activeStep);
  activeIncidents$ = this.selectAll().pipe(
    map(incidents => incidents.filter(incident => incident.statusId < 4))
  );
  activeIncidentCount$ = this.activeIncidents$.pipe(
    map(incidents => incidents.length)
  );
  recentlyUpdatedIncidents$ = this.selectAll().pipe(
    map(incidents =>
      incidents.filter(incident => {
        const updatedDate = new Date(incident.updatedDate);
        const recentDate = new Date();
        recentDate.setHours(0, 0, 0, 0);
        recentDate.setDate(recentDate.getDate() - 5);

        return updatedDate >= recentDate;
      })
    )
  );
  recentlyUpdatedIncidentCount$ = this.recentlyUpdatedIncidents$.pipe(
    map(incidents => incidents.length)
  );

  constructor(protected store: IncidentStore) {
    super(store);
  }
}
