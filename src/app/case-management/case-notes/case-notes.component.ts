import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaseNotesListComponent } from '../case-notes-list/case-notes-list.component';
import { createModel } from 'src/app/shared/utilities/model-helpers';
import { Comment } from 'src/app/shared/models/comment.model';
import { ID } from '@datorama/akita';

@Component({
  selector: 'app-case-notes',
  templateUrl: './case-notes.component.html',
  styleUrls: ['./case-notes.component.scss']
})
export class CaseNotesComponent implements OnInit {
  @Input() caseId: ID;
  @Input() caseNotes: Comment[] = [];
  index = 0;

  get disablePrevious() {
    return this.index <= 0;
  }

  get disableNext() {
    return this.index === this.caseNotes.length - 1;
  }

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.caseNotes = [...this.caseNotes].sort((a, b) => {
      return (
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
      );
    });
  }

  manageCaseNotes() {
    this.dialog.open(CaseNotesListComponent, {
      width: '750px',
      height: '90vh',
      data: {
        caseId: this.caseId
      }
    });
  }

  next() {
    if (this.index !== this.caseNotes.length) {
      this.index++;
    }
  }

  previous() {
    if (this.index !== 0) {
      this.index--;
    }
  }
}
