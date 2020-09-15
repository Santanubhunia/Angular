import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ID,
  arrayUpdate,
  arrayAdd,
  arrayRemove,
  setLoading,
  withTransaction
} from '@datorama/akita';
import { environment } from 'src/environments/environment';
import { IncidentStore } from './incident.store';
import { patchModel } from 'src/app/shared/utilities/model-helpers';
import { tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Incident } from './incident.model';
import { ChildDetail } from 'src/app/shared/models/child-details.model';
import { PersonService } from 'src/app/shared/state/person.service';
import { CaseService } from 'src/app/case-management/state/case.service';
import { createCase } from 'src/app/case-management/state/case.model';

@Injectable({
  providedIn: 'root'
})
export class ChildDetailService {
  private readonly api = `${environment.apiUrl}/casemgmt/childincidentdetails`;

  constructor(
    private store: IncidentStore,
    private personService: PersonService,
    private caseService: CaseService,
    private http: HttpClient
  ) {}

  getChildDetails(childId: ID) {
    return this.http.get<ChildDetail[]>(`${this.api}/child/${childId}`);
  }

  addChildDetail(incidentId: ID, newChildDetail: ChildDetail) {
    return this.http
      .post<ChildDetail>(`${this.api}/${incidentId}`, newChildDetail)
      .pipe(
        setLoading(this.store),
        withTransaction(childDetail => {
          this.store.update(incidentId, entity => ({
            childIncidentDetails: arrayAdd(
              entity.childIncidentDetails,
              childDetail
            )
          }));
          this.personService.resetState();
        })
      );
  }

  patchChildDetail(
    incidentId: ID,
    childDetail: ChildDetail,
    updates: Partial<ChildDetail>
  ) {
    const patchedModel = patchModel<ChildDetail>(childDetail, updates);

    if (patchedModel.length) {
      return this.http
        .patch<ChildDetail>(`${this.api}/${childDetail.id}`, patchedModel)
        .pipe(
          setLoading(this.store),
          tap(patchedChildDetail => {
            if (!patchedChildDetail.educationSupportPlan) {
              patchedChildDetail.educationSupportPlan = null;
            }

            this.store.update(incidentId, entity => ({
              childIncidentDetails: arrayUpdate(
                entity.childIncidentDetails,
                childDetail.id,
                patchedChildDetail
              )
            }));
          })
        );
    }

    return of(null) as Observable<Incident>;
  }

  deleteChildDetail(incidentId: ID, childDetailId: ID) {
    return this.http.delete(`${this.api}/${childDetailId}`).pipe(
      setLoading(this.store),
      tap(() => {
        this.store.update(incidentId, entity => ({
          childIncidentDetails: arrayRemove(
            entity.childIncidentDetails,
            childDetailId
          )
        }));
      })
    );
  }

  createCase(incidentId: ID, childDetail: ChildDetail) {
    return this.caseService
      .addCase(
        createCase({
          child: childDetail.child,
          childIncidentDetails: [childDetail.id]
        })
      )
      .pipe(
        setLoading(this.store),
        tap(newCase => {
          const updatedChildDetail = {
            ...childDetail,
            child: { ...childDetail.child, case: newCase }
          };

          this.store.update(incidentId, entity => ({
            childIncidentDetails: arrayUpdate(
              entity.childIncidentDetails,
              childDetail.id,
              updatedChildDetail
            )
          }));
        })
      );
  }

  addChildDetailsToCase(incidentId: ID, caseId: ID, childDetail: ChildDetail) {
    return this.caseService.addChildDetailsToCase(caseId, childDetail.id).pipe(
      setLoading(this.store),
      tap(() => {
        const updatedChildDetail = {
          ...childDetail,
          child: {
            ...childDetail.child,
            case: {
              ...childDetail.child.case,
              childIncidentDetails: [
                childDetail.id,
                ...childDetail.child.case.childIncidentDetails
              ]
            }
          }
        };

        this.store.update(incidentId, entity => ({
          childIncidentDetails: arrayUpdate(
            entity.childIncidentDetails,
            childDetail.id,
            updatedChildDetail
          )
        }));
      })
    );
  }
}
