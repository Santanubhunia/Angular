import { Component, OnInit, Inject } from '@angular/core';
import { Person } from '../models/person.model';
import { Child } from '../models/child.model';
import { Adult } from '../models/adult.model';
import { ID } from '@datorama/akita';
import { Observable } from 'rxjs';
import { PersonService } from '../state/person.service';
import { tap, switchMap } from 'rxjs/operators';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import { PersonEditDialogComponent } from '../person-edit-dialog/person-edit-dialog.component';
import { PersonQuery } from '../state/person.query';
import { NgFormsManager } from '@ngneat/forms-manager';
import { FormBuilder } from '@angular/forms';

interface MatDialogData {
  personId: ID;
  isChild: boolean;
}

@Component({
  selector: 'app-person-view-dialog',
  templateUrl: './person-view-dialog.component.html',
  styleUrls: ['./person-view-dialog.component.scss']
})
export class PersonViewDialogComponent implements OnInit {
  person$: Observable<Person>;
  child: Child;
  adult: Adult;

  constructor(
    private personQuery: PersonQuery,
    private personService: PersonService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private formsManager: NgFormsManager<AppForms>,
    @Inject(MAT_DIALOG_DATA) public data: MatDialogData,
    private dialogRef: MatDialogRef<PersonViewDialogComponent>
  ) {}

  ngOnInit(): void {
    this.person$ = this.personService
      .getPerson(this.data.isChild, this.data.personId)
      .pipe(
        switchMap(() => {
          if (this.data.isChild) {
            return this.personQuery.activeChild$;
          }

          return this.personQuery.activeAdult$;
        }),
        tap(person => {
          if (this.data.isChild) {
            this.child = person as Child;
          } else {
            this.adult = person as Adult;
          }
        })
      );
  }

  close() {
    if (this.data.isChild) {
      this.formsManager.destroy('childForm');
    }

    this.dialogRef.close();
  }

  editPerson(person: Person) {
    this.dialog.open(PersonEditDialogComponent, {
      minWidth: '60vw',
      maxHeight: '90vh',
      panelClass: 'no-padding-dialog',
      disableClose: true,
      data: {
        person,
        isChild: this.data.isChild
      }
    });
  }

  viewAdult(adultId: ID) {
    if (this.child.addresses?.length) {
      this.formsManager.upsert(
        'childForm',
        this.fb.group({
          addresses: this.fb.array([this.fb.group(this.child.addresses[0])])
        }),
        {
          arrControlFactory: {
            addresses: value => this.fb.group(value)
          }
        }
      );
    }
    this.dialog.open(PersonViewDialogComponent, {
      minWidth: '60vw',
      autoFocus: false,
      disableClose: true,
      data: {
        personId: adultId,
        isChild: false
      }
    });
  }
}
