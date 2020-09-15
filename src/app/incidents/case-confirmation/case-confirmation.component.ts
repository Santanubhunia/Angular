import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Case } from 'src/app/case-management/state/case.model';

interface DialogData {
  case: Case;
  childName: string;
}

@Component({
  selector: 'app-case-confirmation',
  templateUrl: './case-confirmation.component.html'
})
export class CaseConfirmationComponent {
  constructor(
    private dialogRef: MatDialogRef<CaseConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  close() {
    this.dialogRef.close();
  }
}
