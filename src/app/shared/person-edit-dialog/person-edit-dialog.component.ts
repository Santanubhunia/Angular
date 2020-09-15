import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Person } from '../models/person.model';

interface MatDialogData {
  person: Person;
  isChild: boolean;
}

@Component({
  selector: 'app-person-edit-dialog',
  templateUrl: './person-edit-dialog.component.html',
  styleUrls: ['./person-edit-dialog.component.scss']
})
export class PersonEditDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MatDialogData,
    private dialogRef: MatDialogRef<PersonEditDialogComponent>
  ) {}

  onCloseDialog() {
    this.dialogRef.close();
  }
}
