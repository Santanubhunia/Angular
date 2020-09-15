import { Component, OnInit, Input, Inject } from '@angular/core';
import { Comment } from 'src/app/shared/models/comment.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CaseQuery } from '../state/case.query';
import { ID } from '@datorama/akita';

interface DialogData {
  caseId: ID;
}

@Component({
  selector: 'app-case-notes-list',
  templateUrl: './case-notes-list.component.html',
  styleUrls: ['./case-notes-list.component.scss']
})
export class CaseNotesListComponent implements OnInit {
  caseNotes$: Observable<Comment[]>;

  constructor(
    private caseQuery: CaseQuery,
    private dialogRef: MatDialogRef<CaseNotesListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.caseNotes$ = this.caseQuery.activeCaseNotes$;
  }

  onCloseForm() {
    this.dialogRef.close();
  }
}
