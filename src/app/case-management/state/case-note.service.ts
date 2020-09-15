import { Injectable } from '@angular/core';
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
import { CaseStore } from './case.store';

@Injectable({
  providedIn: 'root'
})
export class CaseNoteService {
  private readonly api = `${environment.apiUrl}/casemgmt/casenote`;

  constructor(private store: CaseStore, private http: HttpClient) {}

  addNote(caseId: ID, newNote: Comment) {
    return this.http.post<Comment>(`${this.api}/${caseId}`, newNote).pipe(
      setLoading(this.store),
      tap(note => {
        this.store.update(caseId, entity => ({
          notes: arrayAdd(entity.notes, note)
        }));
      })
    );
  }

  patchNote(caseId: ID, note: Comment, updates: Partial<Comment>) {
    const patchedModel = patchModel<Comment>(note, updates);

    if (patchedModel.length) {
      return this.http
        .patch<Comment>(`${this.api}/${caseId}/note/${note.id}`, patchedModel)
        .pipe(
          setLoading(this.store),
          tap(patchedComment => {
            this.store.update(caseId, entity => ({
              notes: arrayUpdate(entity.notes, note.id, patchedComment)
            }));
          })
        );
    }

    return of(null) as Observable<Comment>;
  }

  deleteNote(caseId: ID, noteId: ID) {
    return this.http.delete(`${this.api}/${caseId}/note/${noteId}`).pipe(
      setLoading(this.store),
      tap(() => {
        this.store.update(caseId, entity => ({
          notes: arrayRemove(entity.notes, noteId)
        }));
      })
    );
  }
}
