import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  childName: string;
  dateOfBirth: Date;
  sponsorName: string;
  childTypeId: number;
}

@Component({
  selector: 'app-case-creation',
  templateUrl: './case-creation.component.html',
  styleUrls: ['./case-creation.component.scss']
})
export class CaseCreationComponent {
  constructor(
    private dialogRef: MatDialogRef<CaseCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  close() {
    this.dialogRef.close();
  }
}
