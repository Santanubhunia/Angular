import { Component, OnInit, Input } from '@angular/core';
import { Case } from '../state/case.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MtdFormComponent } from './mtd-form/mtd-form.component';

@Component({
  selector: 'app-mdt',
  templateUrl: './mdt.component.html',
  styleUrls: ['./mdt.component.scss']
})
export class MdtComponent implements OnInit {
  @Input() case: Case;
  datasource = new MatTableDataSource<Case>();
  displayedColumns = ['meetingDate', 'participantName', 'organization', 'mdtNotes', 'nextSteps'];
  dateReferredToMDT: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.datasource.data = this.case.mdt;
    this.dateReferredToMDT = this.case.mdt[0].meetingDate;
  }
  selectMtd(mtd: any) {
    const dialogRef = this.dialog.open(MtdFormComponent, {
      width: '75%',
      data: mtd
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
