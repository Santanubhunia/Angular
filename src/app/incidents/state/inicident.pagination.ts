import { InjectionToken, inject } from '@angular/core';
import { Paginator } from '@datorama/akita';
import { IncidentState } from './incident.store';
import { IncidentQuery } from './incident.query';

export const INCIDENT_PAGINATOR = new InjectionToken('INCIDENT_PAGINATOR', {
  providedIn: 'root',
  factory: () => {
    return new Paginator<IncidentState>(inject(IncidentQuery))
      .withControls()
      .withRange();
  }
});
