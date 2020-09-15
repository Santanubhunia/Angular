import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mtd-form',
  templateUrl: './mtd-form.component.html',
  styleUrls: ['./mtd-form.component.scss']
})
export class MtdFormComponent implements OnInit {
  mtdForm: FormGroup;
  // mtdData: any;
  constructor(public dialogRef: MatDialogRef<MtdFormComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public mtd: any
  ) { }

  ngOnInit(): void {
    this.createMtdForm();
    this.mtdForm.patchValue(this.mtd);
  }

  createMtdForm() {
    this.mtdForm = this.fb.group({
      meetingDate: ['', Validators.required],
      participantName: ['', Validators.required],
      organization: ['', Validators.required],
      mdtNotes: [null, Validators.required],
      nextSteps: [null, Validators.required]
    });
  }

  submitMtdForm() {
    if (this.mtdForm.valid) {
      // let addOrUpdate$: Observable<any>;
      // const user = createModel<User>(this.userForm.value);

      // const userRoles: string[] = [this.userForm.get('role').value];

      // delete user[ROLE];

      // user.roles = userRoles;
      // user.location = this.userForm.get('location').value;

      // if (this.userId) {
      //   addOrUpdate$ = this.userService.putUser(this.userId, user);
      // } else {
      //   addOrUpdate$ = this.userService.addUser(user);
      // }

      // addOrUpdate$.subscribe(() => {
      //   this.router.navigate(['/admin']);
      // });
    }
  }

}
