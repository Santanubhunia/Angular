import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ID,
  setLoading,
  cacheable,
  applyTransaction,
  arrayAdd
} from '@datorama/akita';
import { tap, concatMap } from 'rxjs/operators';
import { Case } from './case.model';
import { CaseStore } from './case.store';
import { environment } from 'src/environments/environment';
import { patchModel } from 'src/app/shared/utilities/model-helpers';
import { of, Observable, zip } from 'rxjs';
import { Paging } from 'src/app/shared/models/paging.model';
import { Sort } from '@angular/material/sort';
import { ChildDetail } from 'src/app/shared/models/child-details.model';

@Injectable({ providedIn: 'root' })
export class CaseService {
  private readonly api = `${environment.apiUrl}/casemgmt/case`;

  constructor(private store: CaseStore, private http: HttpClient) {}

  addCase(newCase: Case) {
    return this.http.post<Case>(this.api, newCase).pipe(
      setLoading(this.store),
      tap(createdCase => {
        this.store.add(createdCase);
      })
    );
  }

  getCases() {
    const request = this.http.get<Case[]>(this.api).pipe(
      setLoading(this.store),
      tap(cases => {
        this.store.set(cases);
      })
    );

    return cacheable(this.store, request);
  }

  getCase(caseId: ID) {
    return this.http.get<Case>(`${this.api}/${caseId}`).pipe(
      setLoading(this.store),
      concatMap(loadedCase =>
        zip(
          of(loadedCase),
          this.http.get<ChildDetail[]>(
            `${environment.apiUrl}/casemgmt/childincidentdetails/child/${loadedCase.child.id}`
          )
        )
      ),
      tap(([loadedCase, childDetails]) => {
        loadedCase.child.childDetails = childDetails;

        applyTransaction(() => {
          this.store.upsert(caseId, loadedCase);
          this.store.setActive(caseId);
        });
      })
    );
  }

  patchCase(caseToUpdate: Case, updates: Partial<Case>) {
    const patchedModel = patchModel<Case>(caseToUpdate, updates);

    if (patchedModel.length) {
      return this.http
        .patch<Case>(`${this.api}/${caseToUpdate.id}`, patchedModel)
        .pipe(
          tap(patchedCase => {
            this.store.replace(caseToUpdate.id, patchedCase);
          })
        );
    }

    return of(null) as Observable<Case>;
  }

  addChildDetailsToCase(caseId: ID, childIncidentDetailsId: ID) {
    return this.http
      .post<Case>(
        `${this.api}/${caseId}/childdetails/${childIncidentDetailsId}`,
        {}
      )
      .pipe(
        tap(() => {
          this.store.update(caseId, entity => ({
            childIncidentDetails: arrayAdd(
              entity.childIncidentDetails,
              childIncidentDetailsId
            )
          }));
        })
      );
  }

  updateCase(caseId: ID, caseToUpdate: Case) {
    return this.http.put<Case>(`${this.api}/${caseId}`, caseToUpdate).pipe(
      setLoading(this.store),
      tap(() => this.store.update(caseId, caseToUpdate))
    );
  }

  updatePaging(paging: Paging) {
    this.store.updatePaging(paging);
  }

  updateSort(sort: Sort) {
    this.store.updateSort(sort);
  }

  setActive(id: ID) {
    this.store.setActive(id);
  }
}
