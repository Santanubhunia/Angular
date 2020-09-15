import { Injectable } from '@angular/core';
import { Artifact } from 'src/app/shared/models/artifact.model';
import { IncidentStore } from './incident.store';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  ID,
  arrayAdd,
  arrayUpdate,
  arrayRemove,
  setLoading
} from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { patchModel } from 'src/app/shared/utilities/model-helpers';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {
  private readonly api = `${environment.apiUrl}/casemgmt/incidentartifact`;

  constructor(private store: IncidentStore, private http: HttpClient) {}

  addArtifact(incidentId: ID, artifact: FormData) {
    return this.http
      .post<Artifact>(`${this.api}/${incidentId}`, artifact, {
        reportProgress: true,
        observe: 'events'
      })
      .pipe(
        setLoading(this.store),
        tap(event => {
          if (event.type === HttpEventType.Response) {
            this.store.update(incidentId, entity => ({
              artifacts: arrayAdd(entity.artifacts, event.body)
            }));
          }
        })
      );
  }

  patchArtifact(
    incidentId: ID,
    artifact: Artifact,
    updates: Partial<Artifact>
  ) {
    const patchedModel = patchModel<Artifact>(artifact, updates);

    if (patchedModel.length) {
      return this.http
        .patch<Artifact>(`${this.api}/${artifact.id}`, patchedModel)
        .pipe(
          setLoading(this.store),
          tap(patchedArtifact => {
            this.store.update(incidentId, entity => ({
              artifacts: arrayUpdate(
                entity.artifacts,
                artifact.id,
                patchedArtifact
              )
            }));
          })
        );
    }

    return of(null) as Observable<Artifact>;
  }

  deleteArtifact(incidentId: ID, artifactId: ID) {
    return this.http.delete(`${this.api}/${artifactId}`).pipe(
      setLoading(this.store),
      tap(() => {
        this.store.update(incidentId, entity => ({
          artifacts: arrayRemove(entity.artifacts, artifactId)
        }));
      })
    );
  }
}
