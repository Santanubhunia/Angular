import { Injectable } from '@angular/core';
import { IncidentStore } from './incident.store';
import { tap } from 'rxjs/operators';
import {
  ID,
  cacheable,
  withTransaction,
  applyTransaction,
  setLoading,
  arrayAdd
} from '@datorama/akita';
import { Incident } from './incident.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { patchModel } from 'src/app/shared/utilities/model-helpers';
import { of, Observable } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/shared/state/person.service';
import { Paging } from 'src/app/shared/models/paging.model';
import { NgFormsManager } from '@ngneat/forms-manager';
import { ReferralTo } from 'src/app/shared/models/referral-to.model';

interface AddOrUpdateIncident {
  incidentId?: ID;
  incident: Incident;
  updates?: Partial<Incident>;
  type: 'add' | 'update' | 'patch';
}

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private readonly api = `${environment.apiUrl}/casemgmt/incident`;

  constructor(
    private store: IncidentStore,
    private personService: PersonService,
    private formsManager: NgFormsManager<AppForms>,
    private http: HttpClient,
    private router: Router
  ) {}

  createIncident() {
    this.resetIntakeForm();
    this.router.navigate(['/incidents/new']);
  }

  editIncident(incidentId: ID) {
    this.resetIntakeForm();
    this.router.navigate(['/incidents', 'edit', incidentId]);
  }

  viewIncident(incidentId: ID) {
    this.resetIntakeForm();
    this.router.navigate(['/incidents', 'view', incidentId]);
  }

  getIncidents() {
    const request = this.http.get<Incident[]>(this.api).pipe(
      setLoading(this.store),
      tap(incidents => {
        this.store.set(incidents);
      })
    );

    return cacheable(this.store, request);
  }

  getIncident(incidentId: ID) {
    return this.http.get<Incident>(`${this.api}/${incidentId}`).pipe(
      setLoading(this.store),
      tap(incident => {
        applyTransaction(() => {
          this.store.upsert(incidentId, incident);
          this.store.setActive(incidentId);
        });
      })
    );
  }

  getChildIncidents(childId: ID) {
    return this.http.get<Incident[]>(
      `${environment.apiUrl}/casemgmt/children/${childId}/incidents`
    );
  }

  saveIncident({ incidentId, incident, updates, type }: AddOrUpdateIncident) {
    switch (type) {
      case 'add':
        return this.addIncident(incident);
      case 'update':
        return this.updateIncident(incidentId, incident);
      case 'patch':
        return this.patchIncident(incident, updates);
    }
  }

  private addIncident(newIncident: Incident) {
    return this.http.post<Incident>(this.api, newIncident).pipe(
      setLoading(this.store),
      withTransaction(incident => {
        this.store.add(incident);
        this.store.setActive(incident.id);
        this.personService.resetState();
      })
    );
  }

  private patchIncident(incident: Incident, updates: Partial<Incident>) {
    const patchedModel = patchModel<Incident>(incident, updates);

    if (patchedModel.length) {
      return this.http
        .patch<Incident>(`${this.api}/${incident.id}`, patchedModel)
        .pipe(
          setLoading(this.store),
          tap(patchedIncident => {
            this.store.update(incident.id, patchedIncident);
          })
        );
    }

    return of(null) as Observable<Incident>;
  }

  private updateIncident(incidentId: ID, incidentToUpdate: Incident) {
    return this.http
      .put<Incident>(
        `${this.api}/${incidentId.toString().toUpperCase()}`,
        incidentToUpdate
      )
      .pipe(
        setLoading(this.store),
        withTransaction(incident => {
          this.store.update(incidentId, incident);
          this.personService.resetState();
        })
      );
  }

  addReferralTo(newReferralTo: ReferralTo) {
    if (newReferralTo.incidentId) {
      return this.http
        .post<ReferralTo>(
          `${environment.apiUrl}/casemgmt/referralto`,
          newReferralTo
        )
        .pipe(
          setLoading(this.store),
          tap(referralTo => {
            this.store.update(newReferralTo.incidentId, entity => ({
              referralsTo: arrayAdd(entity.referralsTo, referralTo)
            }));
          })
        );
    }
  }

  updatePaging(paging: Paging) {
    this.store.updatePaging(paging);
  }

  updateSort(sort: Sort) {
    this.store.updateSort(sort);
  }

  nextStep() {
    this.store.nextStep();
  }

  previousStep() {
    this.store.previousStep();
  }

  setActiveStep(activeStep: number) {
    this.store.setActiveStep(activeStep);
  }

  setActive(id: ID) {
    this.store.setActive(id);
  }

  private resetIntakeForm() {
    this.formsManager.destroy('incidentForm');

    applyTransaction(() => {
      this.store.setActive(null);
      this.setActiveStep(0);
    });
  }
}
