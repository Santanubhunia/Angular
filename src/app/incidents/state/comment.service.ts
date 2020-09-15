import { Injectable } from '@angular/core';
import { IncidentStore } from './incident.store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  ID,
  arrayAdd,
  arrayUpdate,
  arrayRemove,
  setLoading
} from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { Comment } from 'src/app/shared/models/comment.model';
import { patchModel } from 'src/app/shared/utilities/model-helpers';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly api = `${environment.apiUrl}/casemgmt/incidentcomment`;

  constructor(private store: IncidentStore, private http: HttpClient) {}

  addComment(incidentId: ID, newComment: Comment) {
    return this.http
      .post<Comment>(`${this.api}/${incidentId}`, newComment)
      .pipe(
        setLoading(this.store),
        tap(comment => {
          this.store.update(incidentId, entity => ({
            comments: arrayAdd(entity.comments, comment)
          }));
        })
      );
  }

  patchComment(incidentId: ID, comment: Comment, updates: Partial<Comment>) {
    const patchedModel = patchModel<Comment>(comment, updates);

    if (patchedModel.length) {
      return this.http
        .patch<Comment>(
          `${this.api}/${incidentId}/comment/${comment.id}`,
          patchedModel
        )
        .pipe(
          setLoading(this.store),
          tap(patchedComment => {
            this.store.update(incidentId, entity => ({
              comments: arrayUpdate(entity.comments, comment.id, patchedComment)
            }));
          })
        );
    }

    return of(null) as Observable<Comment>;
  }

  deleteComment(incidentId: ID, commentId: ID) {
    return this.http
      .delete(`${this.api}/${incidentId}/comment/${commentId}`)
      .pipe(
        setLoading(this.store),
        tap(() => {
          this.store.update(incidentId, entity => ({
            comments: arrayRemove(entity.comments, commentId)
          }));
        })
      );
  }
}
