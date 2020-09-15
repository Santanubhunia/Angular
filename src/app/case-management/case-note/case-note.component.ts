import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comment } from 'src/app/shared/models/comment.model';
import { ID } from '@datorama/akita';

interface DialogData {
  caseId: ID;
  defaultSelectedValue: number;
  note: Comment;
}

@Component({
  selector: 'app-case-note',
  template: ` <h2 mat-dialog-title>Add Note</h2>
    <mat-dialog-content>
      <app-case-notes-editor
        [closeOnAdd]="true"
        [caseId]="data.caseId"
        [note]="data.note"
        [defaultSelectedValue]="data.defaultSelectedValue"
        (closeForm)="onCloseForm()"
      ></app-case-notes-editor>
    </mat-dialog-content>`
})
export class CaseNoteComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<CaseNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  onCloseForm() {
    this.dialogRef.close();
  }
}
