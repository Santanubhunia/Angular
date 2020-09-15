import {
  Component,
  OnInit,
  Optional,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LookupType } from 'src/app/shared/models/lookup.model';
import { ConfigurationQuery } from 'src/app/shared/state/configuration.query';
import { CommentForm } from 'src/app/shared/forms/comment.form';
import { Comment } from 'src/app/shared/models/comment.model';
import { ID } from '@datorama/akita';
import { CaseNoteService } from '../state/case-note.service';

@Component({
  selector: 'app-case-notes-editor',
  templateUrl: './case-notes-editor.component.html'
})
export class CaseNotesEditorComponent implements OnInit, OnChanges {
  @Input() caseId: ID;
  @Input() closeOnAdd = false;
  @Input() defaultSelectedValue = 4;
  @Optional() @Input() note: Comment;
  @Output() closeForm = new EventEmitter();
  caseNotesForm = new CommentForm();
  relatesTo$: Observable<LookupType[]>;

  constructor(
    private configurationQuery: ConfigurationQuery,
    private caseNoteService: CaseNoteService
  ) {}

  ngOnInit(): void {
    this.relatesTo$ = this.configurationQuery.relatesTo$;

    this.caseNotesForm.patchValue({ commentTypeId: this.defaultSelectedValue });

    this.caseNotesForm.get('commentTypeId').setValidators(Validators.required);
  }

  ngOnChanges() {
    if (this.note) {
      this.caseNotesForm.patchValue(this.note);
    }
  }

  close() {
    this.closeForm.emit();
  }

  addNote() {
    if (this.caseNotesForm.valid) {
      let addOrUpdate$: Observable<Comment> = null;

      if (this.note) {
        addOrUpdate$ = this.caseNoteService.patchNote(
          this.caseId,
          this.note,
          this.caseNotesForm.value
        );
      } else {
        addOrUpdate$ = this.caseNoteService.addNote(
          this.caseId,
          this.caseNotesForm.value
        );
      }

      addOrUpdate$.subscribe();

      if (this.closeOnAdd) {
        this.closeForm.emit();
      } else {
        this.caseNotesForm.reset({ commentTypeId: 4 });
      }
    }
  }
}
