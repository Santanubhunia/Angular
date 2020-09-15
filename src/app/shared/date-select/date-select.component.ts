import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  title: string;
}

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html'
})
export class DateSelectComponent implements OnInit {
  maxDate = new Date();
  selectedDate: Date;

  constructor(
    private dialogRef: MatDialogRef<DateSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  saveDate() {
    this.dialogRef.close(this.selectedDate);
  }
}
